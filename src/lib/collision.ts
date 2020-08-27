import {obj,getId} from "../lib/object";
import {obj_state} from "../lib/state";

export interface collision_box{
  x:number;
  y:number;
  width:number;
  height:number;
}

enum direction{
  left,
  right,
  up,
  down
}

export function check_all_objects(c: collision_box,objs:Array<obj<unknown>>,exemption:string):Array<obj<unknown>>{
  let matched = [];
  for (let a of objs) {
    if (a.id !== exemption && a.collides_with_box(c)) {
      matched.push(a);
    }
  }
  return matched
}

export function check_all_collisions(c: collision_box,objs:Array<obj<unknown>>,exemption:string):Array<obj<unknown>>{
  let matched = [];
  for (let a of objs) {
    if (a.id !== exemption && a.collision && a.collides_with_box(c)) {
      matched.push(a);
    }
  }
  return matched
}
//Checks up to the first collision
export function check_collisions(c: collision_box, objs: Array<obj<unknown>>, exemption:string) {
  for (let a of objs) {
    if (a.id !== exemption && a.collision && a.collides_with_box(c)) {
      return a;
    }
  }
  return undefined;
}

function velocity_max(velocity:number,box:collision_box,objs:Array<obj<unknown>>, exemption:string,dir:direction){
  let collision = check_collisions(box, objs, exemption);
  if(collision == undefined){
    return velocity;
  }
  else{
    let collider = collision;
    let origin = getId(objs,exemption);
    let orig_st = origin.state as obj_state;
    let collider_st = collider.state as obj_state;
    if(dir == direction.left){
      return orig_st.position.x - (collider_st.position.x + collider.width);
    }
    else if(dir == direction.right){
      return collider_st.position.x - (orig_st.position.x + origin.width);
    }
    else if(dir == direction.down){
      return orig_st.position.y - (collider_st.position.y + collider.height);
    }
    else if(dir == direction.up){
      return collider_st.position.y - (orig_st.position.y + origin.height);
    }
  }
}

export function velocity_collision_check(object:obj<unknown>,list:Array<obj<unknown>>) {
  let ob = object;
  let st = object.getState() as obj_state;
  let x_vel = st.velocity.x;
  let y_vel = st.velocity.y;
  if (x_vel > 0) {
    let box = {
      x: st.position.x + ob.width,
      y: st.position.y,
      width: x_vel,
      height: ob.height
    };
    let vel = velocity_max(st.velocity.x,box,list,ob.id,direction.right);
    if(vel > 0){
      st.position.x += vel;
    }
    else{
      st.velocity.x = 0;  
    }
  }
  else if (x_vel < 0) {
    let box = {
      x: x_vel + st.position.x,
      y: st.position.y,
      width: -1 * x_vel,
      height: ob.height
    }
    let vel = velocity_max(st.velocity.x,box,list,ob.id,direction.left);
    if(vel < 0){
      st.position.x += vel;
    }
    else{
      st.velocity.x = 0; 
    }
  }
  if (y_vel > 0) {
    let box = {
      x: st.position.x,
      y: st.position.y + ob.height,
      width: ob.width,
      height: y_vel
    }
    let vel = velocity_max(st.velocity.y,box,list,ob.id,direction.up);
    if(vel > 0){
      st.position.y += vel;
    }
    else{
      st.velocity.y = 0;
    }
  }
  else if (y_vel < 0) {
    let box = {
      x: st.position.x,
      y: y_vel + st.position.y,
      width: ob.width,
      height: -1 * y_vel
    }
    let vel = velocity_max(st.velocity.y,box,list,ob.id,direction.down);
    if(vel < 0){
      st.position.y += vel;
    }
    else{
      st.velocity.y = 0;
    }
  }
}