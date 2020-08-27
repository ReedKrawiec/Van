import {gravity_obj} from "../../lib/object";
import {obj_state} from "../../lib/state";

export class Box extends gravity_obj<obj_state>{
  sprite_url = "http://localhost/src/game/objects/box.png"
  collision = true
  height = 64;
  width = 500;
  gravity = false;
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
      }
    }
    
  }
  register_controls(){
    this.bindControl("Mouse1",()=>{
      this.delete();
    })
  }
}