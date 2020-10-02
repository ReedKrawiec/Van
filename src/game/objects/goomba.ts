import {velocity,obj_state,position_init,state_func} from "../../lib/state";
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

interface gun_state extends obj_state{
  rotation:number  
}

export class Gun extends platformer_obj<gun_state>{
  sprite_url = "./sprites/folder/gun.png";
  height = 50;
  width = 20;
  collision = true;
  render = true;
  player:Goomba;
  cursor:Cursor;
  constructor(){
    super();
    this.id = "gun";
    this.state = {
      position:position_init().position,
      velocity:position_init().velocity,
      rotation:-1
    }
  }
  statef(t:number){
    if(!this.player){
      let room = getGame().getRoom();
      this.player = <Goomba>room.getObj("player");
      this.cursor = <Cursor>room.getObj("cursor");
    }
    let angle = this.player.angleTowards(this.cursor);
    let rot = rotation_length(140,angle);
    this.rotation = angle;
    this.state.rotation = angle;
    this.state.position = {
      x:rot.x + this.player.state.position.x,
      y:rot.y + this.player.state.position.y
    }
  }
}

export class Cursor extends platformer_obj<obj_state>{
  sprite_url = "./sprites/cursor.png";
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
  sprite_url = "./sprites/folder/robot.png";
  height = 149;
  width = 149;
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
    this.animations.play("walk1");
  }
  register_animations(){
    let sprites = sprite_gen(this.sprite_sheet,this.width,this.height);
    this.animations.add("walk1",[
      [0,sprites[0][0]],
      [100,sprites[0][1]],
      [400,sprites[0][0]],
      [500,sprites[0][2]]
    ],800)
    this.animations.add("walk2",[
      [0,sprites[0][5]],
      [100,sprites[0][4]],
      [400,sprites[0][5]],
      [500,sprites[0][3]]
    ],800)
    this.animations.add("idleleft",[
      [0,sprites[0][0]]
    ],1);
    this.animations.add('idleright',[
      [0,sprites[0][5]] 
    ],1);
  }
  register_audio(){
    this.audio.add("slime","./sounds/goomba/slimeball.wav");
  }
  register_controls(){
    this.bindControl("KeyA",exec_type.repeat,()=>{
      if(this.state.velocity.x > -10){
        this.state.velocity.x = this.state.velocity.x - 1;
      }
    });
    this.bindControl("KeyW",exec_type.once,()=>{
      if(this.state.direction == direction.left){
        this.animations.play("walk1");
      }
      else
        this.animations.play("walk2");
      this.state.velocity.y = this.state.velocity.y + 0.1;
    })
    this.bindControl("KeyW",exec_type.repeat,()=>{
      if(this.state.velocity.y < 10){
        this.state.velocity.y = this.state.velocity.y + 1;
      }
    });
    this.bindControl("KeyS",exec_type.once,()=>{
      if(this.state.direction == direction.left)
        this.animations.play("walk1");
      else
        this.animations.play("walk2");
      this.state.velocity.y = this.state.velocity.y - 0.1;
    })
    this.bindControl("KeyS",exec_type.repeat,()=>{
      if(this.state.velocity.y > -10){
        this.state.velocity.y = this.state.velocity.y - 1;
      }
    });
    this.bindControl("KeyA",exec_type.once,()=>{
      this.animations.play("walk1");
      this.state.direction = direction.left;
      this.state.velocity.x = this.state.velocity.x - 0.1;
    })
    this.bindControl("mousedown",exec_type.repeat, ()=>{
      this.audio.play("slime",0.01);
    },1000);
    this.bindControl("KeyD",exec_type.repeat,()=>{
      if(this.state.velocity.x < 10){
        this.state.velocity.x = this.state.velocity.x + 1;
      }
    });
    this.bindControl("KeyD",exec_type.once,()=>{
      this.animations.play("walk2");
      this.state.direction = direction.right;
      this.state.velocity.x = this.state.velocity.x + 0.1;
    })
    this.bindControl("Space",exec_type.once,()=>{
      if(!this.state.jumping){
        this.state.velocity.y += 15;
        this.audio.play("slime",0.1);
      }
    });
  }
  renderf(t:number){
    if(this.state.velocity.x == 0 && this.state.velocity.y == 0){
      let animation = this.state.direction==direction.left ? "idleleft" : "idleright";
      this.animations.play(animation);
    }
    return super.renderf(t);
  }
  statef(time:number){
    let cursor = getGame().getRoom().getObj("cursor");

    if(this.state.velocity.y > 0){
      this.state.velocity.y = this.state.velocity.y - 0.4;
      if(this.state.velocity.y < 0)
        this.state.velocity.y = 0;
    }
    if(this.state.velocity.y < 0){
      this.state.velocity.y = this.state.velocity.y + 0.4;
      if(this.state.velocity.y > 0)
        this.state.velocity.y = 0;
    }
    if(this.state.velocity.x > 0 ){
      this.state.velocity.x = this.state.velocity.x - 0.4;
      if(this.state.velocity.x < 0){
        this.state.velocity.x = 0;
      }
    }
    else if(this.state.velocity.x < 0){
      this.state.velocity.x = this.state.velocity.x + 0.4;
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

