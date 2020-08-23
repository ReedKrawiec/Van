import {GetScreenDimensions} from "../van";
import { collision_box } from "./collision";
import {obj} from "./object";

interface mousePos{
  x:number,
  y:number,
  last:{
    x:number,
    y:number
  }
}

export interface control_func{
  ():void
}

interface mouseBinds{
  [key:string]: Array<[control_func,obj<unknown>]>
}

interface keyBinds{
  [key:string]: Array<control_func>
}

window.addEventListener("click",(e)=>{
  let dimen = GetScreenDimensions();
  let box:collision_box = {
    x:e.clientX,
    y:dimen.height - e.clientY,
    height:1,
    width:1
  };
  if("Mouse1" in mouseBinds){
    for(let a = 0;a < mouseBinds["Mouse1"].length;a++){
      console.log(mouseBinds["Mouse1"][a]);
      if(mouseBinds["Mouse1"][a][1] !== undefined){
        if(mouseBinds["Mouse1"][a][1].collides_with_box(box)){
         mouseBinds["Mouse1"][a][0]();
        }
      }
      else{
        mouseBinds["Mouse1"][a][0]();
      }
    }
  }
  
})

window.addEventListener("keydown",(e)=>{
  if(e.code in binds){
    for(let a = 0;a < binds[e.code].length;a++){
      binds[e.code][a]();
    }
  }
})

window.addEventListener("mousemove",(e)=>{
  last_x = x;
  last_y = y;
  x = e.clientX;
  y = e.clientY;
})

let x = 0;
let y = 0;
let last_x = 0;
let last_y = 0;
let binds:keyBinds = {};
let mouseBinds:mouseBinds = {};

export function Poll_Mouse():mousePos{
  let height = GetScreenDimensions().height;
  return ({
    x,
    y: height - y,
    last:{
      x:last_x,
      y: height - last_y
    }
  })
}

export function Bind(keyname:string,func:control_func,object?:obj<unknown>){
  if(keyname.slice(0,5) !== "Mouse"){
    if(binds[keyname] == undefined){
      binds[keyname] = [];
    }
    binds[keyname].push(func);
  }
  else{
    if(mouseBinds[keyname] == undefined){
      mouseBinds[keyname] = [];
    }
    mouseBinds[keyname].push([func,object])
  }
}