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
  objects = [new Goomba(936,800,"player"),new StandingGoomba(936,1200),new StandingGoomba(0,800),new StandingGoomba(0,1000),new StandingGoomba(0,600), new Box(0,400), new Box(500,500)]
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
      console.log("w");
      let st = _this.state.player.state as goomba_state;
      console.log(st.velocity.y);
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