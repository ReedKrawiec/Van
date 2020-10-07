export let DEBUG = false;

import {obj} from "./lib/object";
import {obj_state} from "./lib/state";
import {room} from "./lib/room";
import {positioned_sprite, sprite} from "./lib/sprite";
import { collision_box } from "./lib/collision";
import {sprite_renderer,rect_renderer, stroked_rect_renderer, text_renderer, Camera} from "./lib/render";
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

export function setDebug(x:boolean){
  DEBUG = x;
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
  cameras:Array<Camera>,
  canvas:HTMLCanvasElement,
  player_state:{
    power:number
  }
}

export class game{
  state:game_state;
  context:CanvasRenderingContext2D;
  offscreen_canvas:HTMLCanvasElement;
  offscreen_context:CanvasRenderingContext2D;
  constructor(ctx:CanvasRenderingContext2D,a:room<unknown>){
    this.state = {
      canvas:canvas_element,
      logic:undefined,
      context:ctx,
      cameras:[new Camera(0,0,vwidth/2,vheight,1,{
        x:0,
        y:0,
        width:0.5,
        height:0.5
      }),
      new Camera(0,100,vwidth/2,vheight/2,1,{
        x:vwidth/2,
        y:0,
        width:0.5,
        height:0.5
      }),
      new Camera(0,100,vwidth/2,vheight/2,1,{
        x:vwidth/2,
        y:vheight/2,
        width:0.5,
        height:0.5
      })
      ],
      current_room: undefined,
      player_state:{
        power:0
      }
    }
    this.offscreen_canvas = document.createElement("canvas");
    this.offscreen_context = this.offscreen_canvas.getContext("2d");
    this.loadRoom(a);
  }
  render(t:number){
    let time = t - last_render_time
    last_render_time = t;
    for(let camera of this.state.cameras){
      
      this.offscreen_canvas.height = camera.state.dimensions.height;
      this.offscreen_canvas.width = camera.state.dimensions.width;
      this.offscreen_context.clearRect(0,0,camera.state.dimensions.width,camera.state.dimensions.height);
      this.offscreen_context.fillStyle="black";
      this.offscreen_context.fillRect(0,0,camera.state.dimensions.width,camera.state.dimensions.height);
      let camera_box = {
        x:camera.state.position.x,
        y:camera.state.position.y,
        width:camera.state.dimensions.width,
        height:camera.state.dimensions.height
      };
      let particle_collides = this.state.current_room.check_objects(camera_box,[],this.state.current_room.particles_arr);
      let camera_colliders = [...this.state.current_room.check_objects(camera_box),...particle_collides];
      let render_args = {
        context:this.offscreen_context,
        camera:camera,
      };
      sprite_renderer(render_args,{
        sprite:this.state.current_room.renderf(time),
        x: 0,
        y: 0,
        rotation: 0
      });
      let hitboxes:collision_box[] = [];
      for (let a of camera_colliders.filter((b) => b.render)) {
        let rendered = a.render_track(t);
        if (Array.isArray(rendered)) {
          for (let positioned_sprite of rendered)
            sprite_renderer(render_args, {
              sprite:positioned_sprite.sprite,
              x: positioned_sprite.x,
              y: positioned_sprite.y,
              rotation: a.rotation
            });
        }
        else {
          let positioned_sprite = rendered as positioned_sprite;
          sprite_renderer(render_args, {
            sprite: positioned_sprite.sprite,
            x: positioned_sprite.x,
            y: positioned_sprite.y,
            rotation: a.rotation
          });
        }
        if(DEBUG && a.collision){
          hitboxes.push(a.create_collision_box());
        }
      }
      if (DEBUG) {
        let box: collision_box;
        let boxes_copy = [...boxes]
        while(boxes_copy.length > 0){
          let box = boxes_copy.pop();
          let rect = {
            width:box.width,
            height:box.height
          }
          stroked_rect_renderer(this.offscreen_context,rect,box.x,box.y,"#FF0000",camera);
        }
        while(hitboxes.length > 0){
          let box = hitboxes.pop();
          let rect = {
            width:box.width,
            height:box.height
          }
          stroked_rect_renderer(this.offscreen_context,rect,box.x,box.y,"#008000",camera);
        }
      }
      if(this.state.current_room.hud){
        let graphics = this.state.current_room.hud.graphic_elements;
        let text_elements = this.state.current_room.hud.text_elements;
        for(let a of graphics){
          let rendered = a.render_track(t);
          if(Array.isArray(rendered) && a.render){
            for(let positioned_sprite of rendered){
              sprite_renderer(render_args,{
                sprite:positioned_sprite.sprite,
                x:positioned_sprite.x,
                y:positioned_sprite.y,
                rotation:a.rotation
              });
            }
          }
          else if(a.render){
            let pos = (<positioned_sprite>rendered);
            sprite_renderer(render_args,{
              sprite:pos.sprite,
              x:pos.x,
              y:pos.y,
              rotation:a.rotation
            });
          }
        }
        render_args.context = this.state.context;
        for(let a of text_elements){
          let st = a.state;
          text_renderer(render_args,{
            x:st.position.x,
            y:st.position.y,
            font:a.renderf(t)
          })
        }
      }
      this.state.context.drawImage(this.offscreen_canvas,camera.state.viewport.x,camera.state.viewport.y);
    }
    if(DEBUG)
      boxes = [];
    requestAnimationFrame((a)=>{this.render(a)}); 
  }
  start_logic(a:number){
    return setInterval(()=>{
      let new_time = new Date();
      let time_since = new_time.getTime() - last_time.getTime();
      last_time = new_time;
      this.state.current_room.statef(time_since);
      if(this.state.current_room.hud){
        this.state.current_room.hud.statef(time_since);
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
    x.registerParticles();
    this.state.current_room = x;
    if(this.state.logic != undefined){
      clearInterval(this.state.logic);
    }
    this.state.logic = this.start_logic(logic_loop_interval)
    this.render(0);
  }
}

let game_inst = new game(context,new Overworld()  );

export function getGame(){
  return game_inst;
}