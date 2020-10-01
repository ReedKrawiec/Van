import {piece,side,piece_type} from "./piece";
import {getGame} from "../../van";
import {Board} from "../rooms/board";

export class Queen extends piece{
  sprite_url = "./sprites/queen.png"
  constructor(pos:[number,number],side:side){
    super(pos,side,piece_type.queen);
  }
  getAttacking():Array<[number,number]>{
    return this.attackDiagonal().concat(this.attackCardinal());
  }
}