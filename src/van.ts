export const DEBUG = false;

import {obj} from "./lib/object";
import {obj_state} from "./lib/state";
import {room} from "./lib/room";
import {sprite} from "./lib/sprite";
import { collision_box } from "./lib/collision";
import {sprite_renderer,rect_renderer, text_renderer, Camera} from "./lib/render";
import {HUD} from "./lib/hud";
import {ExecuteRepeatBinds} from "./lib/controls";

import {Overworld} from "./game/rooms/overworld";

let canvas_element:HTMLCanvasElement = document.getElementById("target") as HTMLCanvasElement;
let context:CanvasRenderingContext2D = canvas_element.getContext("2d");


let screen_width = window.innerWidth;
let screen_height = window.innerHeight;

let vwidth = canvas_element.width;
let vheight = canvas_element.height;


//How often the game logic loop should run, in milliseconds
let logic_loop_interval:number = 1000/60;  

let last_time = new Date();

let last_render_time = 0;

interface dimensions{
  height:number,
  width:number
}


export function GetScreenDimensions ():dimensions{
  return({
    width:screen_width,
    height:screen_height
  })
}

export function GetViewportDimensions ():dimensions{
  return({
    height:vheight,
    width:vwidth
  })
}

export const render_collision_box = (a:collision_box) => {
  boxes.push(a);
}

let boxes:Array<collision_box> = [];

export let deep = (a:any) =>{
  return JSON.parse(JSON.stringify(a));
}

interface game_state{
  logic:number,
  context:CanvasRenderingContext2D,
  current_room:room<unknown>,
  camera:Camera,
  canvas:HTMLCanvasElement,
  player_state:{
    power:number
  }
}

export class game{
  state:game_state;
  context:CanvasRenderingContext2D;
  constructor(ctx:CanvasRenderingContext2D,a:room<unknown>){
    this.state = {
      canvas:canvas_element,
      logic:undefined,
      context:ctx,
      camera:new Camera(0,0,vwidth,vheight,1,false),
      current_room: undefined,
      player_state:{
        power:0
      }
    }
    this.loadRoom(a);
  }
  render(t:number){
    let time = t - last_render_time
    last_render_time = t;
    this.state.context.clearRect(0,0,vwidth,vheight);
    this.state.context.fillStyle="black";
    this.state.context.fillRect(0,0,vwidth,vheight);
    let camera_colliders = this.state.current_room.check_objects({
      x:this.state.camera.state.position.x,
      y:this.state.camera.state.position.y,
      width:this.state.camera.state.dimensions.width,
      height:this.state.camera.state.dimensions.height
    });
    let render_args = {
      context:this.state.context,
      camera:this.state.camera,
    };
    sprite_renderer(render_args,{
      sprite:this.state.current_room.renderf(time),
      x:0,
      y:0,
      rotation:0
    });
    for (let a of camera_colliders){
      let st = a.state as obj_state;
      if(a.render){
        sprite_renderer(render_args,{
          sprite:a.renderf(time),
          x:st.position.x,
          y:st.position.y,
          rotation:a.rotation
        });
      }
    }
    let box:collision_box;
    while(boxes.length > 0){
      let box = boxes.pop();
      let rect = {
        width:box.width,
        height:box.height
      }
      rect_renderer(context,rect,box.x,box.y,"#FF0000",this.state.camera);
    }
    if(this.state.current_room.hud){
      let graphics = this.state.current_room.hud.graphic_elements;
      let text_elements = this.state.current_room.hud.text_elements;
      for(let a of graphics){
        let st = a.state as obj_state;
        if(a.render){
          sprite_renderer(render_args,{
            sprite:a.renderf(t),
            x:st.position.x,
            y:st.position.y,
            rotation:a.rotation
          });
        }
      }
      for(let a of text_elements){
        let st = a.state;
        text_renderer(render_args,{
          x:st.position.x,
          y:st.position.y,
          font:a.renderf(t)
        })
      }
    }
    requestAnimationFrame((a)=>{this.render(a)}); 
  }
  start_logic(a:number){
    return setInterval(()=>{
      let new_time = new Date();
      let time_since = new_time.getTime() - last_time.getTime();
      last_time = new_time;
      this.state.current_room.statef(new_time.getTime());
      if(this.state.current_room.hud){
        this.state.current_room.hud.statef(new_time.getTime());
      }
        ExecuteRepeatBinds(a);
    },a);
  }
  getRoom(){
    return this.state.current_room;
  }
  async loadRoom(x:room<unknown>){
    x.hud = x.registerHUD();
    if(this.state.current_room !== undefined){
      while(this.state.current_room.objects.length > 0){
        this.state.current_room.objects[0].delete();
      }
    }
    let new_room = await x.load();
    x.register_controls();
    this.state.current_room = x;
    if(this.state.logic != undefined){
      clearInterval(this.state.logic);
    }
    this.state.logic = this.start_logic(logic_loop_interval)
    this.render(0);
  }
}

let game_inst = new game(context,new Overworld());

export function getGame(){
  return game_inst;
}