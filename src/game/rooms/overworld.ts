import { room, apply_gravity } from "../../lib/room";
import { StandingGoomba, Goomba, goomba_state } from "../objects/goomba";
import { Box } from "../objects/box";
import { velocity_collision_check } from "../../lib/collision";
import { gravity_obj } from "../../lib/object";
import { Poll_Mouse, exec_type } from "../../lib/controls";
import { Door } from "../objects/room_loader";
import { HUD, Text } from "../../lib/hud";
import { getGame } from "../../van";

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
      align:"left",
      max_width:50
    }, () => {
      let x = getGame().getRoom().getObj("player") as Goomba;
      return Math.round(x.state.position.x) + "";
    }));
    this.text_elements.push(new Text({
      position: {
        x: 140,
        y: 750
      },
      size: 44,
      font: "Alata",
      color: "white",
      max_width:50
    }, () => {
      let x = getGame().getRoom().getObj("player") as Goomba;
      return Math.round(x.state.position.y) + "";
    }));
  }
}

export class Overworld extends room<overworld_i>{
  background_url = "https://img.wallpapersafari.com/desktop/1920/1080/8/51/imD41l.jpg";
  objects = [new Box(800, 0, "box"), new Box(600, 65, "box"), new Goomba(800, 800, "player"), new StandingGoomba(801, 900), new StandingGoomba(0, 0, "cursor"), new Box(0, 0)/*,new StandingGoomba(801,1000),new StandingGoomba(801,1100),new StandingGoomba(801,1200)*/]
  //objects:Array<Box|Goomba> = [new Goomba(0,0,"player")]
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
  }
  statef(time: number) {
    if (!this.state.paused) {
      for (let a = 0; a < this.objects.length; a++) {
        apply_gravity(this.objects[a], -.5, -15);
        velocity_collision_check(this.objects[a], this.objects);
        this.objects[a].statef(time);
      }
      let player = this.getObj("player") as Goomba;
      let cursor = this.getObj("cursor") as Goomba;
      if (player) {

        let camera = getGame().state.camera;
        //console.log(camera.state.dimensions.width);
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

//, new Box(0,0)