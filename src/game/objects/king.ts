import {piece,side,piece_type} from "./piece";
import {getGame} from "../../van";
import {Board} from "../rooms/board";

export class King extends piece{
  sprite_url = "http://localhost/src/game/sprites/king.png"
  constructor(pos:[number,number],side:side){
    super(pos,side,piece_type.king);
  }
  check_left_castle(room:Board,cords:[number,number]){
    if(!this.state.has_moved && room.get_piece([cords[0] - 1,cords[1]]).length == 0 && room.get_piece([cords[0] - 2,cords[1]]).length == 0 && room.get_piece([cords[0] - 3, cords[1]]).length == 0){
      let rook = room.get_piece([cords[0] - 4,cords[1]]);
      if(rook.length > 0 && !rook[0].state.has_moved){
        return true;
      }
    }
    return false;
  }
  check_right_castle(room:Board,cords:[number,number]){
    if(!this.state.has_moved && room.get_piece([cords[0] + 1,cords[1]]).length == 0 && room.get_piece([cords[0] + 2,cords[1]]).length == 0){
      let rook = room.get_piece([cords[0] + 3,cords[1]]);
      if(rook.length > 0 && !rook[0].state.has_moved){
        return true;
      }
    }
    return false;
  }
  getAttacking():Array<[number,number]>{
    let cords = this.getCords();
    let room = getGame().getRoom() as Board;
    let attacked:Array<[number,number]> = [];
    for(let x = -1;x <= 1; x++){
      for(let y = -1;y <= 1; y++){
        if((x !== 0 || y !== 0) && cords[0] + x >= 0 && cords[0] + x < 8 && cords[1] + y >= 0 && cords[1] + y < 8){
          let piece = room.get_piece([cords[0] + x, cords[1] + y]);
          let safe = true;
          if(safe && piece.length === 0 || piece[0].state.side !== this.state.side){
            attacked.push([cords[0] + x, cords[1] + y]);
          }
        }
      }
    }
    //castle check left
    if(this.check_left_castle(room,cords)){
      attacked.push([cords[0] - 2,cords[1]]);
    }
    if(this.check_right_castle(room,cords)){
      attacked.push([cords[0] + 2,cords[1]]);
    }
    return attacked;
  }
}