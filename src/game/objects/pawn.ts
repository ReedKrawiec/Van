import {piece,side,piece_type} from "./piece";
import {getGame} from "../../van";
import {Board} from "../rooms/board";

export class Pawn extends piece{
  sprite_url = "http://localhost/src/game/sprites/pawn.png"
  constructor(pos:[number,number],side:side){
    super(pos,side,piece_type.pawn);
  }
  getAttacking():Array<[number,number]>{
    let attacked:Array<[number,number]> = [];
    let cords = this.getCords();
    let room = getGame().getRoom() as Board;
    let left;
    let right;
    let forward;
    if(this.state.side == side.white){
      if(room.get_piece([cords[0],cords[1] + 1]).length === 0){
        attacked.push([cords[0],cords[1] + 1]);
      }
      let left = room.get_piece([cords[0]- 1,cords[1] + 1]);
      let right = room.get_piece([cords[0]+ 1,cords[1] + 1]);
      if((cords[0] - 1 >= 0) && left.length > 0 && left[0].state.side !== this.state.side){
        attacked.push([cords[0] - 1,cords[1] + 1]);
      }
      if((cords[0] + 1 < 8) && right.length > 0 && right[0].state.side !== this.state.side){
        attacked.push([cords[0] + 1,cords[1] + 1]);
      }
    }
    else {
      if(room.get_piece([cords[0],cords[1] - 1]).length === 0){
        attacked.push([cords[0],cords[1] - 1]);
      }
      let left = room.get_piece([cords[0] - 1,cords[1] - 1]);
      let right = room.get_piece([cords[0]+ 1,cords[1] - 1]);
      if((cords[0] - 1 >= 0) && left.length > 0 && left[0].state.side !== this.state.side){
        attacked.push([cords[0] - 1,cords[1] - 1]);
      }
      if((cords[0] + 1 < 8) && right.length > 0 && right[0].state.side !== this.state.side){
        attacked.push([cords[0] + 1,cords[1] - 1]);
      }
    }
    return attacked;
  }
}