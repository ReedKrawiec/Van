export interface state_func<T>{
  (last_time:number,current_state:T):T
}

export interface velocity{
  x:number;
  y:number;
}

export interface position{
  x:number;
  y:number;
}

export interface obj_state{
  position:position;
  velocity:velocity;
}

export interface room_state{
  objects: Array<obj_state>
}

export interface player_state{
  position:position;
}
