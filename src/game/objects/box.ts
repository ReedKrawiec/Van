import {platformer_obj,plat_state} from "./platformer_obj";
import {obj_state} from "../../lib/state";
import { exec_type } from "../../lib/controls";

export class Box extends platformer_obj<plat_state>{
  sprite_url = "http://localhost/src/game/objects/box.png"
  collision = true
  height = 64;
  width = 500;
  gravity = false;
  enemy = true;
  constructor(x:number, y:number, id:string = undefined){
    super();
    if(id != undefined){
      this.id = id;
    }
    this.state = {
      position:{
        x,
        y
      },
      velocity:{
        x:0,
        y:0
      },
      health:1000
    }
  }
}