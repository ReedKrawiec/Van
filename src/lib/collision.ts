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

function check_collisions(c: collision_box, objs: Array<obj<unknown>>, exemption:string) {
  for (let a of objs) {
    if (a.id !== exemption && a.collision && a.collides_with_box(c)) {
      return a.id;
    }
  }
  return undefined;
}

function velocity_max(velocity:number,box:collision_box,objs:Array<obj<unknown>>, exemption:string,dir:direction){
  let collision_id = check_collisions(box, objs, exemption);
  if(collision_id == undefined){
    return velocity;
  }
  else{
    let collider = getId(objs,collision_id);
    let origin = getId(objs,exemption);
    let orig_st = origin.state as obj_state;
    let collider_st = collider.state as obj_state;
    if(dir == direction.left){
      console.log(collider);
      console.log(origin);
      return orig_st.position.x - (collider_st.position.x + collider.width);
    }
    else if(dir == direction.right){
      return collider_st.position.x - (orig_st.position.x + origin.width) - 1;
    }
    else if(dir == direction.down){
      return orig_st.position.y - (collider_st.position.y + collider.height);
    }
    else if(dir == direction.up){
      return collider_st.position.y - (orig_st.position.y + origin.height) - 1;
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
    console.log(vel);
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