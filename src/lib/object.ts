import { state_func, obj_state } from "./state";
import { render_func } from "./render";
import { sprite, sprite_gen } from "./sprite";
import { collision_box } from "./collision";
import { getGame } from "../van";
import { Unbind, Bind, control_func, exec_type } from "./controls";
import {audio} from "./audio";

interface obj_i<T> {
  statef: state_func<T>,
  renderf: render_func
}

export function rotation_length(length: number, degree: number) {
  let a_len = length * Math.sin(degree * Math.PI / 180);
  let b_len = length * Math.cos(degree * Math.PI / 180);
  return {
    x: a_len,
    y: b_len
  }
}

export function getId(a: Array<obj<unknown>>, id: string): obj<unknown> {
  for (let b = 0; b < a.length; b++) {
    if (a[b].id == id) {
      return a[b];
    }
  }
  return undefined;
}

let counter = 0;

interface anim_storage {
  [index: string]: [Array<[number, sprite]>, number]
}

interface void_func {
  (): void
}

class animations {
  animations: anim_storage = {};
  animation_tracker = 0;
  current: string;
  callback: void_func;
  add(name: string, s: Array<[number, sprite]>, length: number) {
    this.animations[name] = [s, length];
  }
  play(name: string, callback?: void_func) {
    this.current = name;
    this.callback = callback;
    this.animation_tracker = 0;
  }
  renderf(t: number): sprite {
    let curr_animation = this.animations[this.current][0];
    let length: number = this.animations[this.current][1];
    let index;
    for (index = 0; index < curr_animation.length - 1; index++) {
      if (this.animation_tracker >= curr_animation[index][0] && this.animation_tracker < curr_animation[index + 1][0]) {
        this.animation_tracker = this.animation_tracker + t;
        return curr_animation[index][1];
      }
    }
    if (this.callback) {
      this.callback();
    }
    if (this.animation_tracker >= length) {
      this.animation_tracker = 0;
    }
    else {
      this.animation_tracker += t;
    }
    return curr_animation[index][1];
  }
}

export class obj<T>{
  sprite_url = "";
  sprite_sheet: HTMLImageElement;
  state: T;
  height: number;
  width: number;
  collision: boolean = false;
  collision_box: collision_box
  id: string;
  binds: Array<number>;
  rotation: number = 0;
  render = true;
  animations = new animations();
  audio = new audio();
  last_render:number = 0;
  getState() {
    return this.state;
  }
  register_animations() {

  }
  register_audio() {

  }
  constructor() {
    this.id = "" + counter;
    this.binds = [];
    counter++;
    this.register_controls();
    this.register_audio();
  }
  load() {
    let _this = this;
    return new Promise((resolve, reject) => {
      let a = new Image();
      a.src = this.sprite_url;
      a.onload = (async () => {
        _this.sprite_sheet = a;
        _this.register_animations();
        await this.audio.load();
        resolve();
      });
    })
  }
  angleTowards(a: obj<unknown>): number {
    let b = a as obj<obj_state>;
    let state = this.state as unknown as obj_state;
    if (state.position.x < b.state.position.x && state.position.y > b.state.position.y
      || (state.position.x < b.state.position.x && state.position.y < b.state.position.y)) {
      return 90 - Math.atan((b.state.position.y - state.position.y) / (b.state.position.x - state.position.x)) * 180 / Math.PI
    }
    if (state.position.x > b.state.position.x && state.position.y < b.state.position.y
      || state.position.x > b.state.position.x && state.position.y > b.state.position.y) {
      return 270 - Math.atan((b.state.position.y - state.position.y) / (b.state.position.x - state.position.x)) * 180 / Math.PI
    }
    return 0;
  }
  bindControl(key: string, x: exec_type, func: control_func, interval = 1) {
    if (key == "mouse1") {
      let b = Bind(key, func, x, interval, this);
      this.binds.push(b);
    }
    else {
      this.binds.push(Bind(key, func, x, interval));
    }
  }
  register_controls() {

  }
  delete() {
    for (let a of this.binds) {
      Unbind(a);
    }
    getGame().getRoom().deleteItem(this.id);
  }
  collision_check(a: collision_box): Array<obj<unknown>> {
    if (this.collision) {
      let room = getGame().getRoom();
      return room.check_collisions(a, [this.id]);
    }
    return [];
  }
  statef(time: number) {
  }
  collides_with_box(a: collision_box): boolean {
    let st = this.state as unknown as obj_state;
    let hcollides = false, vcollides = false;
    let ob = {
      left: (st.position.x - this.width / 2),
      right: (st.position.x + this.width / 2),
      top: (st.position.y + this.height / 2),
      bottom: (st.position.y - this.height / 2)
    }

    let box = {
      left: (a.x - a.width / 2),
      right: (a.x + a.width / 2),
      top: (a.y + a.height / 2),
      bottom: (a.y - a.height / 2)
    }

    if ((ob.left >= box.left && ob.left < box.right) || (box.left > ob.left && box.left < ob.right)) {
      hcollides = true;
    }
    else{
      return false;
    }
    if ((ob.bottom >= box.bottom && ob.bottom < box.top) || (box.bottom > ob.bottom && box.bottom < ob.top)){
      vcollides = true;
    }
    else{
      return false;
    }
    return hcollides && vcollides;
  }
  render_track(time:number){
    let rendered = this.renderf(time - this.last_render);
    this.last_render = time;
    return rendered;
  }
  renderf(time: number): sprite {
    if (!this.animations.current) {
      let st = this.state as unknown as obj_state;
      let sprite_height = this.height;
      let sprite_width = this.width;
      if (this.height == undefined) {
        sprite_height = this.sprite_sheet.height;
      }
      if (this.width == undefined) {
        sprite_width = this.sprite_sheet.width;
      }
      return {
        sprite_sheet: this.sprite_sheet,
        left: 0,
        top: 0,
        sprite_width,
        sprite_height
      };
    }
    return this.animations.renderf(time);
  }
}

export class static_obj {
  sprite_url = "";
  sprite: HTMLImageElement;
}

export class gravity_obj<T> extends obj<T>{
  gravity = true
}