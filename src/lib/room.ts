import { gravity_obj,obj } from "./object";
import { sprite } from "./sprite";
import { obj_state } from "./state";
import { velocity_collision_check,check_collisions,collision_box,check_all_collisions,check_all_objects} from "./collision";
import {render_collision_box,DEBUG} from "../van";
import {Bind,control_func, exec_type} from "./controls";
import { Overworld } from "../game/rooms/overworld";
import {HUD} from "../lib/hud";

interface position{
  x:number,
  y:number
}

export function apply_gravity(ob:gravity_obj<unknown>,grav_const:number, grav_max:number){
  let st = ob.state as obj_state;
  if(ob.gravity && st.velocity.y > grav_max){
    st.velocity.y += grav_const;
  }
}

export interface room_i<T>{
  background_url:string,
  objects:Array<obj<unknown>>
  state:T
}
export class room<T>{
  background_url: string;
  background: HTMLImageElement;
  objects: Array<obj<unknown>>
  state: T;
  hud:HUD
  load() {
    let _this = this;
    return new Promise(async (resolve, reject) => {
      let a = new Image();
      let to_await = this.objects.map((a) => a.load());
      await Promise.all(to_await);
      a.src = this.background_url;
      a.onerror = (() => {
        console.log("error loading url:" + this.background_url);
      })
      a.onload = (() => {
        _this.background = a;
        resolve();
      });
    })
  }
  async addItem(o:obj<obj_state>){
    await o.load();
    this.objects.push(o);
  }
  deleteItem(id:string){
    for(let a = 0;a < this.objects.length;a++){
      if(this.objects[a].id === id){
        this.objects = this.objects.slice(0,a).concat(this.objects.slice(a+1));
        a--;
      }
    }
  }
  registerHUD():HUD{
    return undefined;
  }
  bindControl(key:string,x:exec_type,func:control_func){
    Bind(key,func,x); 
  }
  check_collisions(box:collision_box,exempt?:string):Array<obj<unknown>>{
    if(DEBUG){
      render_collision_box(box);
    }
    return check_all_collisions(box,this.objects,exempt);
  }
  check_objects(box:collision_box,exempt?:string){
    if(DEBUG){
      render_collision_box(box);
    }
    return check_all_objects(box,this.objects,exempt);
  }
  register_controls(){

  }
  cleanup(){

  }
  statef(time: number) {
    for (let a = 0; a < this.objects.length; a++) {
      this.objects[a].statef(time);
    }
  }
  getObj(id:string){
    for(let a = 0; a < this.objects.length; a++){
      if(this.objects[a].id == id){
        return this.objects[a];
      }
    }
    return null;
  }
  renderf(time: number): sprite {
    return {
      sprite_sheet: this.background,
      left: 0,
      top: 0,
      sprite_height: this.background.height,
      sprite_width: this.background.width
    }
  }
}