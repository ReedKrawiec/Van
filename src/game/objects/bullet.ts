import {platformer_obj} from "./platformer_obj";
import {obj_state} from "../../lib/state";
import { exec_type } from "../../lib/controls";
import {rotation_velocity} from "../../lib/object";

interface bullet_state extends obj_state{
  rotation:number,
  distance:number
}

interface position{
  x:number,
  y:number
}

export class Bullet extends platformer_obj<bullet_state>{
  sprite_url = "http://localhost/src/game/objects/attacked.png"
  collision = false
  height = 100;
  width = 100;
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
      rotation:angle,
      distance:0
    }
  }
  statef(){
    this.state.velocity = rotation_velocity(30,this.state.rotation);
    this.state.distance += 30;
    if(this.state.distance > 2000){
      this.delete();
    }
  }
  register_controls(){

  }
}