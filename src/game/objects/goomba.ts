import {velocity,obj_state,state_func} from "../../lib/state";
import {sprite,sprite_gen} from "../../lib/sprite";
import {gravity_obj} from "../../lib/object";

enum direction{
  left,
  right
}

export interface goomba_state extends obj_state{
  direction: direction,
  velocity:velocity
}

export class Goomba extends gravity_obj<goomba_state>{
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
      }
    }
  }
  renderf(t:number):sprite{
    let sprites:Array<sprite> = sprite_gen(this.sprite_sheet,this.width,this.height);
    if(Math.floor(t/250) % 2 == 0){
      return sprites[0];
    }
    else{
      return sprites[1];
    }
  }
  statef(time:number){
    /*
    if(this.state.direction == direction.right){
      this.state.velocity.x = 3;
      if(this.state.position.x >= 1000 - this.width){
        this.state.direction = direction.left;
      }
    }
    if(this.state.direction == direction.left){
      this.state.velocity.x = -3;
      if(this.state.position.x <= 0){
        this.state.direction = direction.right;
      }
    }
    */
    
  }
}

export class StandingGoomba extends gravity_obj<goomba_state>{
  sprite_url = "http://localhost/src/game/objects/goomba.png";
  height = 64;
  width = 64;
  collision = true;
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
      }
    }
  }
  statef(time:number){
    console.log(this.state.position.y);
  }
}