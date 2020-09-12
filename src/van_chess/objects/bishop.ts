import {piece,side,piece_type} from "./piece";
import {getGame} from "../../van";
import {Board} from "../rooms/board";

export class Bishop extends piece{
  sprite_url = "http://localhost/src/van_chess/sprites/bishop.png"
  constructor(pos:[number,number],side:side){
    super(pos,side,piece_type.bishop);
  }
  getAttacking():Array<[number,number]>{
    return this.attackDiagonal();
  }
}