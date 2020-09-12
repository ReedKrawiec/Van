import {platformer_obj, plat_state} from "./platformer_obj";
import {obj_state} from "../../lib/state";
import { exec_type } from "../../lib/controls";
import {rotation_length} from "../../lib/object";
import {getGame} from "../../van";

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

export class Bullet extends platformer_obj<bullet_state>{
  sprite_url = "http://localhost/src/game/sprites/bullet.png"
  collision = false
  height = 20;
  width = 10;
  gravity = false;
  constructor(x:position, angle:number, id:string = undefined){
    super();
    if(id != undefined){
      this.id = id;
    }
    this.state = {
      position:x,
      velocity:{
        x:0,
        y:0
      },
      speed:40,
      rotation:angle,
      distance:0,
      damage:5
    }
    this.rotation = angle;
  }
  statef(){
    this.state.velocity = rotation_length(this.state.speed,this.state.rotation);
    this.state.distance += this.state.speed;
    if(this.state.distance > 2000){
      this.delete();
    }
    let room = getGame().state.current_room;
    let collisions = room.check_collisions({
      x:this.state.position.x,
      y:this.state.position.y,
      width:this.width,
      height:this.height
    },["player","bullet"]);
    if(collisions.length > 0){
      for(let collision of collisions){
        let st = collision.state as unknown as plat_state;
        if((<platformer_obj<obj_state>>collision).enemy){
          st.health -= this.state.damage;
        }
      }
      this.delete();
    }
  }
  register_controls(){

  }
}