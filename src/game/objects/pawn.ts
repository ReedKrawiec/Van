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
    if(this.state.side == side.white){
      if(room.get_piece([cords[0],cords[1] + 1]).length === 0){
        attacked.push([cords[0],cords[1] + 1]);
        if(!this.state.has_moved && room.get_piece([cords[0],cords[1] + 2]).length === 0){
          attacked.push([cords[0],cords[1] + 2]);
        }
      }
      let left_cords:[number,number] = [cords[0]- 1,cords[1] + 1];
      let right_cords:[number,number] = [cords[0]+ 1,cords[1] + 1]; 
      let left = room.get_piece(left_cords);
      let right = room.get_piece(right_cords);
      let left_en = room.get_meta(left_cords,side.black);
      let right_en = room.get_meta(right_cords,side.black);
      console.log(left_en);
      console.log(right_en);
      if((cords[0] - 1 >= 0) && ((left.length > 0 && left[0].state.side !== this.state.side) || (left_en && left_en.enpassent))){
        attacked.push(left_cords);
      }
      if((cords[0] + 1 < 8) && ((right.length > 0 && right[0].state.side !== this.state.side) || (right_en && right_en.enpassent))){
        attacked.push(right_cords);
      }
    }
    else {
      if(room.get_piece([cords[0],cords[1] - 1]).length === 0){
        attacked.push([cords[0],cords[1] - 1]);
        if(!this.state.has_moved && room.get_piece([cords[0],cords[1] - 2]).length === 0){
          attacked.push([cords[0],cords[1] - 2]);
        }
      }
      let left_cords:[number,number] = [cords[0] - 1,cords[1] - 1];
      let right_cords:[number,number] = [cords[0]+ 1,cords[1] - 1];
      let left = room.get_piece(left_cords);
      let right = room.get_piece(right_cords);
      let left_en = room.get_meta(left_cords,side.white);
      let right_en = room.get_meta(right_cords,side.white);
      if((cords[0] - 1 >= 0) && ((left.length > 0 && left[0].state.side !== this.state.side) || (left_en && left_en.enpassent))){
        attacked.push(left_cords);
      }
      if((cords[0] + 1 < 8) && ((right.length > 0 && right[0].state.side !== this.state.side) || (right_en && right_en.enpassent))){
        attacked.push(right_cords);
      }
    }
    return attacked;
  }
}