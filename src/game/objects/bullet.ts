import {platformer_obj, plat_state} from "./platformer_obj";
import {obj_state} from "../../lib/state";
import { exec_type } from "../../lib/controls";
import {rotation_length, obj} from "../../lib/object";
import { Goomba } from "./goomba";
import {g} from "../main";

interface bullet_state extends obj_state{
  rotation:number,
  distance:number,
  speed:number,
  damage:number
}

interface position{
  x:number,
  y:number
}

export class Bullet extends obj<bullet_state>{
  sprite_url = "./sprites/bullet.png";
  height = 20;
  width = 10;
  gravity = false;
  max_distance = 2000;
  tags = ["bullet"];
  constructor(x:[number,number], angle:number, id:string = undefined){
    super();
    if(id != undefined){
      this.id = id;
    }
    this.state = {
      position:{
        x:x[0],
        y:x[1]
      },
      velocity:{
        x:0,
        y:0
      },
      speed:10,
      rotation:angle,
      distance:0,
      damage:5
    }
    this.rotation = angle;
  }
  statef(time:number){
    this.state.velocity = rotation_length(this.state.speed,this.state.rotation);
    this.state.distance += this.state.speed;
    if(this.state.distance > this.max_distance){
      this.delete();
    }
  }
  register_controls(){

  }
}

export class Rocket extends Bullet{
  sprite_url = "./sprites/folder/rocket.png";
  height = 67;
  width = 16;
  particle_timer = 0;
  particle_frequency = 5;
  max_distance = 5000;
  tags = ["Rocket"]
  hitbox = {
    x_offset:0,
    y_offset:0,
    width:16,
    height:16
  }
  constructor(x:[number,number],angle:number){
    super(x,angle);
    this.state.speed = 15;
    this.state.damage = 20;
  }
  register_audio(){
    this.audio.add("explosion","./sounds/explosion2.mp3");
  }
  statef(time:number){
    super.statef(time);
    if(this.particle_timer == 0){
      let offset = rotation_length(30,this.rotation + 180);
      this.emit_particle("smoke",offset, 400, 12);
    }
    this.particle_timer += time;
    if(this.particle_timer > this.particle_frequency){
     this.particle_timer = 0; 
    }
    let room = g.state.current_room;
    let collisions = room.check_collisions(this.create_collision_box(),["gun","player"]);
    if(collisions.length > 0){
      for(let collision of collisions){
        let st = collision.state as unknown as plat_state;
        if((<platformer_obj<obj_state>>collision).enemy){
          st.health -= this.state.damage;
        }
        if(collision.tags.indexOf("dummy") > -1){
          let dummy = collision as Goomba;
          if(dummy.state.jumping){
            dummy.state.times_airshot++;
          }
        }
      }
      this.state.distance = this.max_distance;
      this.delete();
      let explosion_collisions = room.check_collisions({
        x:this.state.position.x,
        y:this.state.position.y,
        width:256,
        height:256
      },["static"])
      for(let collider of explosion_collisions){
        let distance = this.distance(collider);
        let multiplyer = 1 - distance/300;
        if(multiplyer < 0)
          multiplyer = 0;
        let o_state = collider.state as obj_state;
        let velocities = rotation_length(multiplyer * 100, this.angleTowards(collider));
        o_state.velocity.x += velocities.x;
        o_state.velocity.y += velocities.y;
      }
      this.emit_particle("explosion",{x:0,y:0},500,0);
      this.audio.play("explosion",0.2);
    }
  }
}