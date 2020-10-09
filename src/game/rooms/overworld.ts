import { room, apply_gravity } from "../../lib/room";
import { Gun, Goomba,Cursor, ControlledPlayer } from "../objects/goomba";
import { Box, VertBox } from "../objects/box";
import { velocity_collision_check } from "../../lib/collision";
import { gravity_obj, rotation_length } from "../../lib/object";
import { Poll_Mouse, exec_type } from "../../lib/controls";
import { HUD, Text } from "../../lib/hud";
import { DEBUG, setDebug } from "../../van";
import {Bullet, Rocket} from "../objects/bullet";
import {Target} from "../objects/target";
import {g} from "../main";

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
        y: 910
      },
      size: 44,
      font: "Alata",
      color: "white",
      align:"left"
    }, () => {
      let x = g.getRoom().getObjByTag("dummy")[0] as Goomba;
      return `Times Airshot:${x.state.times_airshot}`;
    }));
    this.text_elements.push(new Text({
      position: {
        x: 10,
        y: 950
      },
      size: 44,
      font: "Alata",
      color: "white",
      align: "left"
    }, () => {
      let x = g.getRoom().getObjByTag("dummy")[0] as Goomba;
      return `Max Times Airshot:${Math.max(x.state.times_airshot,x.state.max_times_airshot)}`;
    }));
    
  }
}

export class Overworld extends room<overworld_i>{
  background_url = "./sprites/imD41l.jpg";
  objects:gravity_obj<unknown>[]
  constructor() {
    super();
    this.state = {
      player: undefined,
      paused: false,
      locked_bullet:null
    };
    for(let a = 0;a<10;a++){
      this.objects.push(new VertBox(320,250 + a * 500));
      this.objects.push(new VertBox(900,250 + a * 500));
    }
    this.addItems([new ControlledPlayer(700, 150, "player"),new Goomba(550,150),new Box(600,0,"platform"),new Gun(),new Target([200,100]),new Target([200,200]),new Target([1000,100]),new Target([1000,200]),new Cursor("cursor")])
  }
  registerHUD() {
    return new Overworld_HUD();
  }
  register_controls() {
    this.bindControl("Escape", exec_type.once, () => {
      setDebug(!DEBUG);
    })
    
    this.bindControl("mouse0down", exec_type.repeat,() => {
      let gun = this.getObj("gun") as Gun;
      if(gun){
        let muzzle = rotation_length(30,gun.state.rotation);
        let position = {
          x:gun.state.position.x + muzzle.x,
          y:gun.state.position.y + muzzle.y
        }
        let bullets = [];
        for(let a = 0;a < 1;a ++){
          bullets.push(new Rocket([position.x,position.y],gun.state.rotation));
        }
        
        if(this.state.locked_bullet == null)
          this.state.locked_bullet = bullets[0];
        this.addItems(bullets);
      }
    },400)
    let camera3 = g.state.cameras[1];
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
  registerParticles(){
    this.particles["smoke"] = {
      sprite:"./sprites/folder/smoke.png",
      height:64,
      width:64
    };
    this.particles["explosion"] = {
      sprite:"./sprites/folder/explosion.png",
      height:128,
      width:128
    }
  }
  statef(time: number) {
    if (!this.state.paused) {
      for (let a = 0; a < this.objects.length; a++) {
        apply_gravity(this.objects[a], -1, -15);
        velocity_collision_check(this.objects[a], this.objects);
        this.objects[a].statef(time);
      }
      for(let particle of this.particles_arr){
        particle.statef(time);
      }
      let player = this.getObj("player") as Goomba;
      let target = this.getObjByTag("dummy")[0] as Goomba;
      let cursor = this.getObj("cursor") as Cursor;
      let cameras = g.state.cameras;
      if (player) {        
        cameras[0].x = player.state.position.x;
        cameras[0].y = player.state.position.y + (cameras[0].state.dimensions.height/2 - player.height/2 - 100);     
      }

      cameras[1].state.position.x = target.state.position.x;
      cameras[1].state.position.y = target.state.position.y;

      if (cursor) {
        cursor.collision = false;
        cursor.gravity = false;
        let mouse = Poll_Mouse(this.game);
        cursor.state.position.x = mouse.x;
        cursor.state.position.y = mouse.y;
        cameras[2].state.position.x = mouse.x;
        cameras[2].state.position.y = mouse.y;
      }
      
    }
  }

}
