import {piece,side,piece_type} from "./piece";
import {getGame} from "../../van";
import {Board} from "../rooms/board";

export class Rook extends piece{
  sprite_url = "./sprites/rook.png"
  constructor(pos:[number,number],side:side){
    super(pos,side,piece_type.rook);
  }
  getAttacking():Array<[number,number]>{
    return this.attackCardinal();
  }
}