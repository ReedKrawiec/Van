export const DEBUG = true;

import {obj} from "./lib/object";
import {obj_state} from "./lib/state";
import {room} from "./lib/room";
import {sprite} from "./lib/sprite";
import {Overworld} from "./game/rooms/overworld";
import {Tester} from "./game/rooms/test_room";
import { collision_box } from "./lib/collision";
import {sprite_renderer,rect_renderer, Camera} from "./lib/render";

let canvas_element:HTMLCanvasElement = document.getElementById("target") as HTMLCanvasElement;
let context:CanvasRenderingContext2D = canvas_element.getContext("2d");



let screen_width = window.innerWidth;
let screen_height = window.innerHeight;

/*
let vheight = 1200;
let vwidth = vheight * (16/9);
canvas.width = vwidth;
canvas.height = vheight;
*/

let vwidth = 800;
let vheight = 400;


//How often the game logic loop should run, in milliseconds
let logic_loop_interval:number = 1000/60;  

let last_time = new Date();

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

let deep = (a:any) =>{
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
      sprite:this.state.current_room.renderf(t),
      x:0,
      y:0
    });
    for (let a of camera_colliders){
      let st = a.state as obj_state;
      if(a.render){
        sprite_renderer(render_args,{
          sprite:a.renderf(t),
          x:st.position.x,
          y:st.position.y
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
    requestAnimationFrame((a)=>{this.render(a)}); 
  }
  start_logic(a:number){
    return setInterval(()=>{
      let new_time = new Date();
      let time_since = new_time.getTime() - last_time.getTime();
      last_time = new_time;
      this.state.current_room.statef(new_time.getTime());
    },a);
  }
  getRoom(){
    return this.state.current_room;
  }
  async loadRoom(x:room<unknown>){

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