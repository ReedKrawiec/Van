import {Goomba,StandingGoomba} from "../objects/goomba";
import {Box} from "../objects/box";
import {room,apply_gravity} from "../../lib/room";
import {velocity_collision_check} from "../../lib/collision";

export class Tester extends room<{}>{
  background_url = "http://localhost/src/game/rooms/Tester.jpg";
  objects = [new Box(500,0,"box"),new Goomba(800,800,"player"),new StandingGoomba(801,900),new StandingGoomba(801,1000),new StandingGoomba(801,1100),new StandingGoomba(801,1200)]
  constructor(){
    super();
    this.state = {
      player:undefined
    };
  }
  statef(time:number){
    for(let a = 0;a < this.objects.length; a++){
      apply_gravity(this.objects[a],-.5,-15);
      velocity_collision_check(this.objects[a],this.objects);
      this.objects[a].statef(time);
    }
  }
}