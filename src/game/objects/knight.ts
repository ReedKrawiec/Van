import {piece,side,piece_type} from "./piece";

export class Knight extends piece{
  sprite_url = "http://localhost/src/game/sprites/knight.png"
  constructor(pos:[number,number],side:side){
    super(pos,side,piece_type.knight);
  }
  getAttacking():Array<[number,number]>{
    let cords = this.getCords();
    let attacked:Array<[number,number]> = [];
    attacked.push([cords[0] + 1,cords[1] + 2]);
    attacked.push([cords[0] - 1,cords[1] + 2]);
    attacked.push([cords[0] + 2,cords[1] + 1]);
    attacked.push([cords[0] + 2,cords[1] - 1]);
    attacked.push([cords[0] + 1,cords[1] - 2]);
    attacked.push([cords[0] - 1,cords[1] - 2]);
    attacked.push([cords[0] - 2,cords[1] + 1]);
    attacked.push([cords[0] - 2,cords[1] - 1]);
    return(attacked.filter((x)=>x[0] >= 0 && x[0] < 8 && x[1] >= 0 && x[1] < 8));
  }
}