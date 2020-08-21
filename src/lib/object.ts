import {state_func,obj_state} from "./state";
import {render_func} from "./render";
import {sprite} from "./sprite";
import {collision_box} from "./collision";
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
  height:number = undefined;
  width:number = undefined;
  collision:boolean = false;
  id:string;
  getState(){
    return this.state;
  }
  constructor(){
    this.id = ""+counter;
    counter++;
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
  statef(time:number){
  }
  collides_with_box(a:collision_box):boolean{
    let st = this.state as unknown as obj_state;
    let hcollides = false, vcollides = false;
    if(st.position.x >= a.x && st.position.x < (a.x + a.width)){
      hcollides = true;
    }
    if(a.x > st.position.x && a.x < (st.position.x + this.width)){
      hcollides = true;
    }
    if(st.position.y >= a.y && st.position.y < (a.y + a.height)){
      vcollides = true;
    }
    if(a.y > st.position.y && a.y < (st.position.y + this.height)){
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