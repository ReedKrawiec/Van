import {GetScreenDimensions,GetViewportDimensions,getGame} from "../van";
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
let target = document.getElementById("target");
target.addEventListener("click",(e)=>{
  let mouse = Poll_Mouse();
  let box:collision_box = {
    x:mouse.x,
    y:mouse.y,
    height:1,
    width:1
  };
  let d = [...all_binds];
  for(let a = 0;a < d.length;a++){
    let selected = d[a];
    if(selected.type === btype.mouse && selected.key === "mouse1" && selected.execute == exec_type.once){
      if(selected.obj !== undefined){
        if(selected.obj.collides_with_box(box)){
          selected.function();
        }
      }
      else{
        selected.function();        
      }
    }
  }  
})

target.addEventListener("mousedown", (e) => {
  e.preventDefault();
  let d = [...all_binds];
  for (let a = 0; a < all_binds.length; a++) {
    let selected = d[a];
    if (selected.type === btype.mouse && selected.key === ("mouse" + e.button + "down")  && !selected.executed) {
      if(selected.execute === exec_type.once){
        selected.function();
      }
      else if(selected.execute === exec_type.repeat){
        selected.repeat_timer.active = true;
      }
      selected.executed = true;
    }
  }
})

target.addEventListener("mouseup", (e) => {
  let d = [...all_binds];
  for (let a = 0; a < all_binds.length; a++) {
    let selected = d[a];
    if (selected.type === btype.mouse && (selected.key === e.type) && selected.executed && selected.execute === exec_type.once) {
       selected.executed = false;
      
    }
    else if(selected.type === btype.mouse && (selected.key === ("mouse" + e.button + "down") || selected.key == "mousedown") && selected.executed && selected.execute === exec_type.repeat){
      let g = [...repeat_binds];
      for(let a = 0; a < g.length;a++){
        if(g[a].bind.id === selected.id){
          selected.executed = false;
          g[a].active = false;
          break;
        }
      }
    }
  }
})

window.addEventListener("keydown", (e) => {
  let d = [...all_binds];
  for (let a = 0; a < all_binds.length; a++) {
    let selected = d[a];
    if (selected.type === btype.keyboard && selected.key === e.code  && !selected.executed) {
      if(selected.execute === exec_type.once){
        selected.function();
      }
      else if(selected.execute === exec_type.repeat){
        for(let c of repeat_binds){
          if(c.bind.id == selected.id){
            c.active = true;
            break;
          }
        }
      }
      selected.executed = true;
    }
  }
  
})
window.addEventListener("keyup", (e) => {
  let d = [...all_binds];
  for (let a = 0; a < all_binds.length; a++) {
    let selected = d[a];
    if (selected.type === btype.keyboard && selected.key === e.code && selected.executed) {
      if(selected.execute === exec_type.once ){
        selected.executed = false;
      }
      else if(selected.execute === exec_type.repeat){
        let g = [...repeat_binds];
        for(let a = 0; a < g.length;a++){
          if(g[a].bind.id === selected.id){
            selected.executed = false;
            g[a].active = false;
            break;
          }
        }
      }
    }
  }

})
let tracker = document.getElementById("target");
tracker.addEventListener("mousemove", (e) => {
  var rect = (e.target as HTMLCanvasElement).getBoundingClientRect() ;
  
  last_x = x;
  last_y = y;
  x = e.clientX - rect.left; //x position within the element.
  y = e.clientY - rect.top;  //y position within the element.

})

enum btype{
  mouse,
  keyboard
}

interface bind{
  key:string,
  type:btype,
  id:number,
  function:control_func,
  execute:exec_type,
  repeat_timer?:repeat_bind,
  obj?:obj<unknown>,
  executed?:boolean,
  interval?:number
}

interface repeat_bind{
  bind:bind,
  timer:number,
  interval:number,
  active:boolean
}

let x = 0;
let y = 0;
let last_x = 0;
let last_y = 0;
let binds:keyBinds = {};
let mouseBinds:mouseBinds = {};
let bind_count = 0;

let all_binds:Array<bind> = []

let repeat_binds:Array<repeat_bind> = [];

export function Poll_Mouse():mousePos{
  let height = GetViewportDimensions().height;
  let canvas = getGame().state.canvas;
  let wratio = parseFloat(window.getComputedStyle(canvas).width)/GetViewportDimensions().width;
  let vratio = parseFloat(window.getComputedStyle(canvas).height)/GetViewportDimensions().height;
  let camera = getGame().state.cameras[0];
  return ({
    x: (x/wratio/camera.state.scaling + camera.state.position.x - camera.state.dimensions.width/2) ,
    y: ((height - y/vratio)/camera.state.scaling + camera.state.position.y - camera.state.dimensions.height/2),
    last:{
      x: (x/wratio/camera.state.scaling + camera.state.position.x),
      y: ((height - y/vratio)/camera.state.scaling + camera.state.position.y)
    }
  })
}

export function ExecuteRepeatBinds(b:number){
  for(let a of repeat_binds){
    if(a.bind.execute === exec_type.repeat && a.timer == 0 && a.active){
      a.bind.function();
    }
    if(a.active || (!a.active && a.timer != 0))
      a.timer += b;
    if(a.timer > a.interval){
      a.timer = 0; 
    }
  }
}

export function Unbind(bind_id:number){
  for(let a = 0;a < all_binds.length; a++){
    if(all_binds[a].id == bind_id){
      all_binds.splice(a,1);
      break;
    }
  }

}

export enum exec_type{
  once,
  repeat
}

let id = 0;
export function Bind(keyname:string,func:control_func,type:exec_type,interval:number,object?:obj<unknown>):number{
  if(keyname.slice(0,5) === "mouse"){
    let b:bind = {
      key:keyname,
      type:btype.mouse,
      id,
      function:func,
      obj:object,
      execute:type,
      executed:false,
      interval
    };
    if(type == exec_type.repeat){
      b.repeat_timer = {
        bind:b,
        timer:0,
        interval,
        active:false
      }
      repeat_binds.push(b.repeat_timer);
    }
    all_binds.push(b);

  }
  else{
    let b:bind = {
      key:keyname,
      type:btype.keyboard,
      id,
      function:func,
      execute:type,
      executed:false,
      interval
    }
    if(type == exec_type.repeat){
      b.repeat_timer = {
        bind:b,
        timer:0,
        interval,
        active:false
      }
      repeat_binds.push(b.repeat_timer);
    }
    all_binds.push(b);
  }
  id++;
  return id - 1;
}