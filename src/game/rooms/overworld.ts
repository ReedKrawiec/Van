import { room, apply_gravity } from "../../lib/room";
import { StandingGoomba,Gun, Goomba, goomba_state, Cursor } from "../objects/goomba";
import { Box } from "../objects/box";
import { velocity_collision_check } from "../../lib/collision";
import { gravity_obj, rotation_length } from "../../lib/object";
import { Poll_Mouse, exec_type } from "../../lib/controls";
import { Door } from "../objects/room_loader";
import { HUD, Text } from "../../lib/hud";
import { getGame } from "../../van";
import {Bullet} from "../objects/bullet";
import {Target} from "../objects/target";

interface overworld_i {
  player: gravity_obj<unknown>,
  paused: boolean,
  locked_bullet:Bullet
}

class Overworld_HUD extends HUD {
  constructor() {
    super();
    this.text_elements.push(new Text({
      position: {
        x: 10,
        y: 710
      },
      size: 44,
      font: "Alata",
      color: "white",
      align:"left"
    }, () => {
      let x = getGame().getRoom().getObj("player") as Goomba;
      return `X:${Math.round(x.state.position.x)}`;
    }));
    this.text_elements.push(new Text({
      position: {
        x: 10,
        y: 750
      },
      size: 44,
      font: "Alata",
      color: "white",
      align: "left"
    }, () => {
      let x = getGame().getRoom().getObj("player") as Goomba;
      return `Y:${Math.round(x.state.position.y)}`;
    }));
  }
}

export class Overworld extends room<overworld_i>{
  background_url = "./sprites/imD41l.jpg";
  objects = [new Goomba(800, 150, "player"),new Box(600,0,"platform"),new Gun(),new Target([200,100]),new Target([200,200]),new Target([1000,100]),new Target([1000,200]),new Cursor("cursor")]
  constructor() {
    super();
    this.state = {
      player: undefined,
      paused: false,
      locked_bullet:null
    };
  }
  registerHUD() {
    return new Overworld_HUD();
  }
  register_controls() {
    this.bindControl("Escape", exec_type.once, () => {
      getGame().loadRoom(new Overworld());
    })
    
    this.bindControl("mousedown", exec_type.repeat,() => {
      let gun = this.getObj("gun") as Gun;
      let muzzle = rotation_length(40,gun.state.rotation);
      let position = {
        x:gun.state.position.x + muzzle.x,
        y:gun.state.position.y + muzzle.y
      }
      let bullets = [];
      for(let a = 0;a < 1;a++){
        bullets.push(new Bullet([position.x,position.y],gun.state.rotation)); //+ (a * 50/15) - 25));
      }
      if(this.state.locked_bullet == null){
        this.state.locked_bullet = bullets[0];
      }
      this.addItems(bullets);
    },1000)
    let camera3 = getGame().state.cameras[1];
    this.bindControl("ArrowLeft",exec_type.repeat, () => {
      camera3.state.position.x -= 10;
    },10)
    this.bindControl("ArrowRight",exec_type.repeat, () => {
      camera3.state.position.x += 10;
    },10)
    this.bindControl("ArrowDown",exec_type.repeat, () => {
      camera3.state.position.y -= 10;
    },10)
    this.bindControl("ArrowUp",exec_type.repeat, () => {
      camera3.state.position.y += 10;
    },10)
  }
  statef(time: number) {
    if (!this.state.paused) {
      for (let a = 0; a < this.objects.length; a++) {
        //apply_gravity(this.objects[a], -.5, -15);
        velocity_collision_check(this.objects[a], this.objects);
        this.objects[a].statef(time);
      }
      let player = this.getObj("player") as Goomba;
      let cursor = this.getObj("cursor") as Cursor;
      let cameras = getGame().state.cameras;
      let room = getGame().getRoom();
      if (player) {        
        cameras[0].x = player.state.position.x;
        cameras[0].y = player.state.position.y + (cameras[0].state.dimensions.height/2 - player.height/2 - 100);        
      }
      if(this.state.locked_bullet != null){
        let bullet = this.state.locked_bullet;
        if(bullet.state.distance < bullet.max_distance){
          cameras[1].state.position.x = bullet.state.position.x;
          cameras[1].state.position.y = bullet.state.position.y;
        }
        else{
          this.state.locked_bullet = null;
        }
        
      }
      if (cursor) {
        cursor.collision = false;
        cursor.gravity = false;
        let mouse = Poll_Mouse();
        cursor.state.position.x = mouse.x;
        cursor.state.position.y = mouse.y;
        cameras[2].state.position.x = mouse.x;
        cameras[2].state.position.y = mouse.y;
      }
      
    }
  }

}
