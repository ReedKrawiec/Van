import {obj} from "./lib/object";
import {obj_state} from "./lib/state";
import {sprite} from "./lib/sprite";
import {Overworld} from "./game/rooms/overworld";

let canvas_element:HTMLCanvasElement = document.getElementById("target") as HTMLCanvasElement;
let context:CanvasRenderingContext2D = canvas_element.getContext("2d");

let vheight = 1000;
let vwidth = 1000;

//How often the game logic loop should run, in milliseconds
let logic_loop_interval:number = 1000/60;  

let last_time = new Date();

let Room = Overworld;
let curr_room = new Room();
setInterval(()=>{
  let new_time = new Date();
  let time_since = new_time.getTime() - last_time.getTime();
  last_time = new_time;
  curr_room.statef(new_time.getTime());
},logic_loop_interval);

const renderer = (sprite:sprite,x:number,y:number,scaling:number) => {
  let final_x = x;
  let final_y = vheight - y - sprite.sprite_height;
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
  context.clearRect(0,0,vwidth,vheight);
  let object_to_render = curr_room.objects;
  renderer(curr_room.renderf(t),0,0,1);
  let index = 0;
  for (let a of object_to_render){
    renderer(a.renderf(t),a.state.position.x,a.state.position.y,1);
    index++;
  }
  requestAnimationFrame(renderLoop) 
}

window.addEventListener("keydown",(e)=>{
  console.log(e);
})

async function main(){
  await curr_room.load();
  curr_room.register_controls();
  requestAnimationFrame(renderLoop);
}



main();
