import {velocity,obj_state,room_state,player_state} from "../lib/state";

interface player extends player_state{
  power:number;
  velocity:velocity;
}

export interface game_state{
  player:player,
  room:room_state,
  obj_state:Array<obj_state>
}