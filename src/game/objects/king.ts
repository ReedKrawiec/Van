import {piece,side,piece_type} from "./piece";
import {getGame} from "../../van";
import {Board} from "../rooms/board";

export class King extends piece{
  sprite_url = "http://localhost/src/game/sprites/king.png"
  constructor(pos:[number,number],side:side){
    super(pos,side,piece_type.king);
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
          /*
          for(let a of room.state.attacked){
            if(a[0] === cords[0] && a[1] === cords[1]){
              safe = false;
            }
          }
          */
          if(safe && piece.length === 0 || piece[0].state.side !== this.state.side){
            attacked.push([cords[0] + x, cords[1] + y]);
          }
        }
      }
    }
    return attacked;
  }
}