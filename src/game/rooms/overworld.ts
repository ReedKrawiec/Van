import { room, apply_gravity } from "../../lib/room";
import { StandingGoomba, Goomba, goomba_state, Cursor } from "../objects/goomba";
import { Box } from "../objects/box";
import { velocity_collision_check } from "../../lib/collision";
import { gravity_obj } from "../../lib/object";
import { Poll_Mouse, exec_type } from "../../lib/controls";
import { Door } from "../objects/room_loader";
import { HUD, Text } from "../../lib/hud";
import { getGame } from "../../van";
import {Bullet} from "../objects/bullet";

interface overworld_i {
  player: gravity_obj<unknown>,
  paused: boolean
}

class Overworld_HUD extends HUD {
  constructor() {
    super();
    this.text_elements.push(new Text({
      position: {
        x: 10,
        y: 750
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
        y: 790
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
  background_url = "https://img.wallpapersafari.com/desktop/1920/1080/8/51/imD41l.jpg";
  objects = [new Cursor("cursor"),new Goomba(800, 800, "player"),new Box(800,0),new StandingGoomba(800,900)]
  constructor() {
    super();
    this.state = {
      player: undefined,
      paused: false
    };
  }
  registerHUD() {
    return new Overworld_HUD();
  }
  register_controls() {
    this.bindControl("Escape", exec_type.once, () => {
      this.state.paused = !this.state.paused;
    })
    this.bindControl("mousedown", exec_type.repeat,() => {
      let player = this.getObj("player") as Goomba;
      let cursor = this.getObj("cursor");
      let position = {
        x:player.state.position.x,
        y:player.state.position.y
      }
      let bullet = new Bullet(position,player.angleTowards(cursor));
      this.addItem(bullet);
    },20)
  }
  statef(time: number) {
    if (!this.state.paused) {
      for (let a = 0; a < this.objects.length; a++) {
        apply_gravity(this.objects[a], -.5, -15);
        velocity_collision_check(this.objects[a], this.objects);
        this.objects[a].statef(time);
      }
      let player = this.getObj("player") as Goomba;
      let cursor = this.getObj("cursor") as Cursor;
      if (player) {

        let camera = getGame().state.camera;
        camera.x = player.state.position.x;
        camera.y = player.state.position.y;
      }
      if (cursor) {
        cursor.collision = false;
        cursor.gravity = false;
        let mouse = Poll_Mouse();
        cursor.state.position.x = mouse.x;
        cursor.state.position.y = mouse.y;
      }
    }
  }

}
