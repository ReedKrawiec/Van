import {state_func,obj_state} from "./state";
import {render_func} from "./render";
import {sprite} from "./sprite";
import {collision_box} from "./collision";
import {getGame} from "../van";
import {Unbind,Bind,control_func, exec_type} from "./controls";

interface obj_i<T>{
  statef:state_func<T>,
  renderf:render_func
}

export function getId(a:Array<obj<unknown>>,id:string):obj<unknown>{
  for(let b = 0;b < a.length; b++){
    if(a[b].id == id){
      return a[b];
    }
  }
  return undefined;
}

let counter = 0;

export class obj<T>{
  sprite_url = "";
  sprite_sheet:HTMLImageElement;
  state:T;
  height:number;
  width:number;
  collision:boolean = false;
  collision_box:collision_box
  id:string;
  binds:Array<number>;
  rotation:number = 0;
  render = true;
  getState(){
    return this.state;
  }
  constructor(){
    this.id = ""+counter;
    this.binds = [];  
    counter++;
    this.register_controls();
  }
  load(){
    let _this = this;
    return new Promise((resolve,reject) => {
      let a = new Image();
      a.src = this.sprite_url;
      a.onload = (()=>{
        _this.sprite_sheet = a;
        resolve();
      });
    })
  }
  bindControl(key:string,x:exec_type,func:control_func){
    if(key == "mouse1"){
      let b = Bind(key,func,x,this);
      this.binds.push(b);
    }
    else{
      this.binds.push(Bind(key,func,x)); 
    }
  }
  register_controls(){

  }
  delete(){
    for(let a of this.binds){
      Unbind(a);
    }
    getGame().getRoom().deleteItem(this.id);
  }
  collision_check(a:collision_box):Array<obj<unknown>>{
    if(this.collision){
      let room = getGame().getRoom();
      return room.check_collisions(a,this.id);
    }
    return [];
  }
  statef(time:number){
  }
  collides_with_box(a:collision_box):boolean{
    let st = this.state as unknown as obj_state;
    let hcollides = false, vcollides = false;
    let ob = {
      left:(st.position.x - this.width/2),
      right:(st.position.x + this.width/2),
      top:(st.position.y + this.height/2),
      bottom:(st.position.y - this.height/2)
    }
    
    let box = {
      left:(a.x - a.width/2),
      right:(a.x + a.width/2),
      top:(a.y + a.height/2),
      bottom:(a.y - a.height/2)
    }

    if(ob.left >= box.left && ob.left < box.right){
      hcollides = true;
    }
    if(box.left > ob.left && box.left < ob.right){
      hcollides = true;
    }
    if(ob.bottom >= box.bottom && ob.bottom < box.top){
      vcollides = true;
    }
    if(box.bottom > ob.bottom && box.bottom < ob.top){
      vcollides = true;
    }
    return hcollides && vcollides;
  }
  collides_with(a:obj<unknown>):boolean{
    let st = this.state as unknown as obj_state;
    let st_2 = a.state as obj_state;
    let hcollides = false, vcollides = false;
    if(st.position.x > st_2.position.x && st.position.x < (st_2.position.x + a.width)){
      hcollides = true;
    }
    if(st_2.position.x > st.position.x && st_2.position.x < (st.position.x + a.width)){
      hcollides = true;
    }
    if(st.position.y > st_2.position.y && st.position.y < (st_2.position.y + a.width)){
      vcollides = true;
    }
    if(st_2.position.y > st.position.y && st_2.position.y < (st.position.y + a.width)){
      vcollides = true;
    }
    return hcollides && vcollides;
  }
  renderf(time:number):sprite{
    let st = this.state as unknown as obj_state;
    let sprite_height = this.height;
    let sprite_width = this.width;
    if(this.height == undefined){
      sprite_height = this.sprite_sheet.height;
    }
    if(this.width == undefined){
      sprite_width = this.sprite_sheet.width;
    }
    return {
      sprite_sheet:this.sprite_sheet,
      left:0,
      top:0,
      sprite_width,
      sprite_height
    };
    
  }
}

export class static_obj{
  sprite_url = "";
  sprite:HTMLImageElement;
}

export class gravity_obj<T> extends obj<T>{
  gravity = true
}