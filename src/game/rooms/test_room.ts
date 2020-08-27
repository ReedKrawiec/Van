import {Goomba,StandingGoomba} from "../objects/goomba";
import {Box} from "../objects/box";
import {room,apply_gravity} from "../../lib/room";
import {velocity_collision_check} from "../../lib/collision";
import {Door} from "../objects/room_loader";
import {Overworld} from "./overworld";
import {Poll_Mouse} from "../../lib/controls";
import { getGame } from "../../van";

export class Tester extends room<{}>{
  background_url = "http://localhost/src/game/rooms/Tester.jpg";
objects = [new Box(500,500,"box"),new Door([500,564],Overworld),new Goomba(800,1300,"player"),new StandingGoomba(801,1400),new StandingGoomba(801,1500),new StandingGoomba(801,1600),new StandingGoomba(801,1700)]
  constructor(){
    super();
    this.state = {
      player:undefined
    };
  }
  register_controls(){
    this.bindControl("Mouse1",async ()=>{
      let mouse_pos = Poll_Mouse();
      if(this.check_collisions({
        x:mouse_pos.x,
        y:mouse_pos.y,
        width:500,
        height:64
      }).length == 0){
        let b = new Box(mouse_pos.x,mouse_pos.y);
        await b.load();
        this.objects.unshift(b);
      }
    })
  }
  statef(time:number){
    for(let a = 0;a < this.objects.length; a++){
      apply_gravity(this.objects[a],-.5,-15);
      velocity_collision_check(this.objects[a],this.objects);
      this.objects[a].statef(time);
    }
    let player = this.getObj("player") as Goomba;
    if(player){
      let camera = getGame().state.camera;
      camera.state.position.x = player.state.position.x - (camera.state.dimensions.width/2);
      camera.state.position.y = player.state.position.y - 64;
    }
  }
}