import {room,apply_gravity} from "../../lib/room";
import {StandingGoomba,Goomba, goomba_state} from "../objects/goomba";
import {Box} from "../objects/box"; 
import {velocity_collision_check} from "../../lib/collision";
import {Bind} from "../../lib/controls";
import { gravity_obj } from "../../lib/object";

interface overworld_i{
  player:gravity_obj<unknown>
}

export class Overworld extends room<overworld_i>{
  background_url="https://img.wallpapersafari.com/desktop/1920/1080/8/51/imD41l.jpg";
  objects = [new Goomba(800,800,"player"),new StandingGoomba(801,400),new StandingGoomba(801,464),new StandingGoomba(801,528),new StandingGoomba(801,592),new StandingGoomba(801,656), new Box(500,0,"box")]
  constructor(){
    super();
    this.state = {
      player:undefined
    };
  }
  statef(time:number){
    for(let a = 0;a < this.objects.length; a++){
      velocity_collision_check(this.objects[a],this.objects);
      apply_gravity(this.objects[a],-.5,-15);
      this.objects[a].statef(time);
    }
  }
  register_controls(){
    let _this = this;
    this.state.player = this.getObj("player") as gravity_obj<unknown>;
    
    Bind("KeyW",()=>{
      let st = _this.state.player.state as goomba_state;
      if(st.velocity.y < 15){
        st.velocity.y += 15
      }
    })
    Bind("KeyA",()=>{
      let st = _this.state.player.state as goomba_state;
      if(st.velocity.x > 0){
        st.velocity.x = 0;
      }
      if(st.velocity.x > -6){
        if(st.velocity.x === 0){
          st.velocity.x = - 3;
        }
        else{
          st.velocity.x -= 1.5
        }
      }
    })
    Bind("KeyD",()=>{
      let st = _this.state.player.state as goomba_state;
      if(st.velocity.x < 0){
        st.velocity.x = 0;
      }
      if(st.velocity.x < 6){
        if(st.velocity.x === 0){
          st.velocity.x = 3;
        }
        else{
          st.velocity.x += 1.5
        }
      }
    })
  }
}

//, new Box(0,0)