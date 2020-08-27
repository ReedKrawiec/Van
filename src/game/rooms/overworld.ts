import {room,apply_gravity} from "../../lib/room";
import {StandingGoomba,Goomba, goomba_state} from "../objects/goomba";
import {Box} from "../objects/box"; 
import {velocity_collision_check} from "../../lib/collision";
import { gravity_obj } from "../../lib/object";
import {Poll_Mouse} from "../../lib/controls";
import {Door} from "../objects/room_loader";
import {Tester} from "./test_room";
import { getGame } from "../../van";

interface overworld_i{
  player:gravity_obj<unknown>
}

export class Overworld extends room<overworld_i>{
  background_url="https://img.wallpapersafari.com/desktop/1920/1080/8/51/imD41l.jpg";
  objects = [new Box(500,0,"box"),new Door([500,64],Tester),new Goomba(800,800,"player"),new StandingGoomba(801,900),new StandingGoomba(0,0,"cursor"),new Box(0,0)/*,new StandingGoomba(801,1000),new StandingGoomba(801,1100),new StandingGoomba(801,1200)*/]
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
    let cursor = this.getObj("cursor") as Goomba;
    if(player){
      
      let camera = getGame().state.camera;
      //console.log(camera.state.dimensions.width);
      camera.x = player.state.position.x - (camera.state.dimensions.width/2);
      camera.y = player.state.position.y - (camera.state.dimensions.height/2);
    }
    if(cursor){
      cursor.collision = false;
      cursor.gravity = false;
      let mouse = Poll_Mouse();
      cursor.state.position.x = mouse.x - cursor.width/2;
      cursor.state.position.y = mouse.y - cursor.height/2;
    }
  }
  
}

//, new Box(0,0)