export const DEBUG = true;

import {obj} from "./lib/object";
import {obj_state} from "./lib/state";
import {room} from "./lib/room";
import {sprite} from "./lib/sprite";
import {Overworld} from "./game/rooms/overworld";
import { collision_box } from "./lib/collision";

let canvas_element:HTMLCanvasElement = document.getElementById("target") as HTMLCanvasElement;
let context:CanvasRenderingContext2D = canvas_element.getContext("2d");

let vheight = 1000;
let vwidth = 1800;

//How often the game logic loop should run, in milliseconds
let logic_loop_interval:number = 1000/60;  

let last_time = new Date();

interface dimensions{
  height:number,
  width:number
}

export function GetScreenDimensions ():dimensions{
  return({
    height:vheight,
    width:vwidth
  })
}

export function GetCurrentRoom():room<unknown>{
  return curr_room;
}

export const render_collision_box = (a:collision_box) => {
  boxes.push(a);
}

let boxes:Array<collision_box> = [];
let curr_room:room<unknown>;
let logic:number;

const start_logic = (a:number) => {
  return setInterval(()=>{
    let new_time = new Date();
    let time_since = new_time.getTime() - last_time.getTime();
    last_time = new_time;
    curr_room.statef(new_time.getTime());
  },a);
}

const renderer = (sprite:sprite,x:number,y:number,scaling:number) => {
  let final_x = x * scaling;
  let final_y = vheight - y - sprite.sprite_height * scaling;
  let height = sprite.sprite_height * scaling;
  let width = sprite.sprite_width * scaling;
  context.drawImage(
    sprite.sprite_sheet,
    sprite.left,
    sprite.top,
    sprite.sprite_width,
    sprite.sprite_height,
    final_x,
    final_y,
    width,
    height
  )
}

const renderLoop = (t:number)=>{
  let scaling = 1;

  context.clearRect(0,0,vwidth,vheight);
  let object_to_render = curr_room.objects;
  renderer(curr_room.renderf(t),0,0,scaling);
  let index = 0;
  for (let a of object_to_render){
    let st = a.state as obj_state;
    renderer(a.renderf(t),st.position.x,st.position.y,scaling);
    index++;
  }
  let box;
  while(box = boxes.pop()){
    let x = box.x * scaling;
    let y = vheight - box.y - box.height * scaling;
    context.fillRect(x * scaling,y * scaling,box.width * scaling,box.height * scaling);
  }

  requestAnimationFrame(renderLoop) 
}

export async function loadRoom(x:room<unknown>){
  let new_room = await x.load();
  x.register_controls();
  curr_room = x;
  if(logic != undefined){
    clearInterval(logic);
  }
  main();
}

async function main(){
  logic = start_logic(logic_loop_interval);
  requestAnimationFrame(renderLoop);
}

loadRoom(new Overworld());
