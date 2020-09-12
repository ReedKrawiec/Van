import {velocity,obj_state,state_func} from "../../lib/state";
import {sprite,sprite_gen} from "../../lib/sprite";
import {obj,rotation_length} from "../../lib/object";
import {platformer_obj,plat_state} from "./platformer_obj";
import {Poll_Mouse, exec_type} from "../../lib/controls";
import {collision_box} from "../../lib/collision";
import {Bind} from "../../lib/controls";

import {Overworld} from "../rooms/overworld";
import {getGame} from "../../van";

enum direction{
  left,
  right
}

export interface goomba_state extends obj_state,plat_state{
  direction: direction,
  velocity:velocity,
  jumping:boolean
}

export class Cursor extends platformer_obj<obj_state>{
  sprite_url = "http://localhost/src/game/sprites/cursor.png";
  height = 64;
  width = 64;
  collision = true;
  render = true;
  constructor(id:string){
    super();
    this.id = id;
    this.state = {
      position:{
        x:0,
        y:0
      },
      velocity:{
        x:0,
        y:0
      }
    }
  }
  statef(){
  }
}

export class Goomba extends platformer_obj<goomba_state>{
  sprite_url = "http://localhost/src/game/objects/goomba.png";
  height = 64;
  width = 64;
  collision = true;
  constructor(x:number,y:number,id:string = undefined){
    super();
    if(id != undefined){
      this.id = id;
    }
    this.state = {
      direction:direction.left,
      position:{
        x,
        y
      },
      velocity:{
        x:0,
        y:0
      },
      jumping:false,
      health:100
    }
  }
  register_animations(){
    let sprites = sprite_gen(this.sprite_sheet,this.width,this.height);
    this.animations.add("walk1",[
      [0,sprites[0][0]],
      [1000,sprites[0][1]]
    ],2000)
  }
  register_audio(){
    this.audio.add("slime","http://localhost/src/game/sounds/goomba/slimeball.wav");
  }
  register_controls(){
    this.bindControl("mousedown",exec_type.repeat,()=>{
      this.audio.play("slime",0.01)
    },100)
    this.bindControl("KeyA",exec_type.repeat,()=>{
      if(this.state.velocity.x > -10){
        this.state.velocity.x = this.state.velocity.x - 0.5;
      }
    });
    this.bindControl("KeyD",exec_type.repeat,()=>{
      if(this.state.velocity.x < 10){
        this.state.velocity.x = this.state.velocity.x + 0.5;
      }
    });
    this.bindControl("Space",exec_type.once,()=>{
      this.animations.play("walk1");
      this.audio.play("slime",0.1);
      if(!this.state.jumping){
        this.state.velocity.y += 15;
      }
    });
  }
  
  statef(time:number){
    let cursor = getGame().getRoom().getObj("cursor");
    this.rotation = this.angleTowards(cursor);
    let bottom_collisions = this.collision_check({
      x:this.state.position.x,
      y:this.state.position.y - 1 - this.height/2,
      width:this.width,
      height:1
    });
    let jumping_check = bottom_collisions.length > 0;
    if(jumping_check){
      this.state.jumping = false;
    }
    else{
      this.state.jumping = true;
      
    }
    if(this.state.velocity.x > 0 ){
      this.state.velocity.x = this.state.velocity.x - 0.2;
      if(this.state.velocity.x < 0){
        this.state.velocity.x = 0;
      }
    }
    else if(this.state.velocity.x < 0){
      this.state.velocity.x = this.state.velocity.x + 0.2;
      if(this.state.velocity.x > 0){
        this.state.velocity.x = 0;
      }
    }
  }
}

export class StandingGoomba extends platformer_obj<goomba_state>{
  sprite_url = "http://localhost/src/game/objects/goomba.png";
  height = 64;
  width = 64;
  collision = true;
  enemy = true;
  constructor(x:number,y:number,id:string = undefined){
    super();
    if(id){
      this.id = id;
    }    
    this.state = {
      direction:direction.left,
      position:{
        x,
        y
      },
      velocity:{
        x:0,
        y:0
      },
      jumping:false,
      health:100
    }
  }
  statef(time:number){
    if(this.state.jumping){
      let mouse_position = Poll_Mouse();
      if(mouse_position.y > mouse_position.last.y){
        if(this.collision_check({
          x:this.state.position.x,
          y:this.state.position.y + this.height,
          width:this.width,
          height:1
        }).length == 0){
          this.state.position.y = mouse_position.y - this.height/2;
        }
      }
      else if(mouse_position.y < mouse_position.last.y){
        if(this.collision_check({
          x:this.state.position.x,
          y:this.state.position.y - 1,
          width:this.width,
          height:1
        }).length == 0){
          this.state.position.y = mouse_position.y - this.height/2;
        }
      }
      if(mouse_position.x < mouse_position.last.x){
        if(this.collision_check({
          x:this.state.position.x - 1,
          y:this.state.position.y,
          width:1,
          height:this.height
        }).length == 0){
          this.state.position.x = mouse_position.x - this.width/2;
        }
      }
      else if(mouse_position.x > mouse_position.last.x){
        if(this.collision_check({
          x:this.state.position.x + this.width,
          y:this.state.position.y,
          width:1,
          height:this.height
        }).length == 0){
          this.state.position.x = mouse_position.x - this.width/2;
        }
      }
    }
    super.statef(time);
  }
}

