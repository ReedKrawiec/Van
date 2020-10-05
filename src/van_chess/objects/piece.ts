import {obj} from "../../lib/object";
import {positioned_sprite, sprite,sprite_gen} from "../../lib/sprite";
import {board_state, Board} from "../rooms/board";
import {getGame} from "../../van";
import { Unbind, exec_type } from "../../lib/controls";

export enum side{
  white,
  black
}

export enum piece_type{
  pawn,
  rook,
  bishop,
  queen,
  king,
  knight
}

interface piece_state{
  position:{
    x:number,
    y:number
  },
  side:side,
  type:piece_type,
  has_moved:boolean
}

export class piece extends obj<piece_state>{
  height = 100;
  width = 100;
  collision = true;
  constructor(pos:[number,number],side:side,type:piece_type){
    super();
    this.state = {
      position:{
        x:(pos[0] -4) * this.width + this.width/2,
        y:(pos[1] -4) * this.height + this.height/2
      },
      side,
      type,
      has_moved:false
    }
  }
  movetoCords(a:[number,number]){
    this.state.position.x = (a[0] -4) * this.width + this.width/2;
    this.state.position.y = (a[1] -4) * this.height + this.height/2;
  }
  getCords():[number,number]{
    let x = (this.state.position.x - this.width/2)/100 + 4;
    let y = (this.state.position.y - this.height/2)/100 + 4;
    return [x,y];
  }
  getAttacking():Array<[number,number]>{
    return [];
  }
  renderf(t:number):positioned_sprite{
    let sprites = sprite_gen(this.sprite_sheet,this.width,this.height);
    if(this.state.side === side.white){
      return {
        sprite:sprites[0][0],
        x:this.state.position.x,
        y:this.state.position.y
      };
    }
    else{
      return {
        sprite:sprites[0][1],
        x:this.state.position.x,
        y:this.state.position.y
      };
    }
  }
  attackDiagonal(){
    let cords = this.getCords();
    let room = getGame().getRoom() as Board;
    let attacked:Array<[number,number]> = [];
    for(let a = 1;a < 8;a++){
      if(cords[0] - a >= 0 && cords[0] - a < 8 && cords[1] - a >= 0 && cords[1] - a < 8){
        let pieces = room.get_piece([cords[0] - a,cords[1] - a]);
        if(pieces.length == 0 || pieces[0].state.side !== this.state.side){
          attacked.push([cords[0] - a,cords[1] - a]);
        }
        if(pieces.length > 0){
          break;
        }
      }  
    }
    for(let a = 1;a < 8;a++){
      if(cords[0] - a >= 0 && cords[0] - a < 8 && cords[1] + a >= 0 && cords[1] + a < 8){
        let pieces = room.get_piece([cords[0] - a,cords[1] + a]);
        if(pieces.length == 0 || pieces[0].state.side !== this.state.side){
          attacked.push([cords[0] - a,cords[1] + a]);
        }
        if(pieces.length > 0){
          break;
        }
      }  
    }
    for(let a = 1;a < 8;a++){
      if(cords[0] + a >= 0 && cords[0] + a < 8 && cords[1] + a >= 0 && cords[1] + a < 8){
        let pieces = room.get_piece([cords[0] + a,cords[1] + a]);
        if(pieces.length == 0 || pieces[0].state.side !== this.state.side){
          attacked.push([cords[0] + a,cords[1] + a]);
        }
        if(pieces.length > 0){
          break;
        }  
      }
    }
    for(let a = 1;a < 8;a++){
      if(cords[0] + a >= 0 && cords[0] + a < 8 && cords[1] - a >= 0 && cords[1] - a < 8){
        let pieces = room.get_piece([cords[0] + a,cords[1] - a]);
        if(pieces.length == 0 || pieces[0].state.side !== this.state.side){
          attacked.push([cords[0] + a,cords[1] - a]);
        }
        if(pieces.length > 0){
          break;
        }  
      }
    }
    return attacked;
  }
  attackCardinal(){
    let cords = this.getCords();
    let room = getGame().getRoom() as Board;
    let attacked:Array<[number,number]> = [];
    for(let a = cords[0] - 1;a >= 0;a--){
      let pieces = room.get_piece([a,cords[1]]);
      if(pieces.length === 0 || pieces[0].state.side !== this.state.side){
        attacked.push([a,cords[1]]);
      }
      if(pieces.length > 0){
        break;
      }
    }
    for(let a = cords[0] + 1;a < 8;a++){
      let pieces = room.get_piece([a,cords[1]]);
      if(pieces.length === 0 || pieces[0].state.side !== this.state.side){
        attacked.push([a,cords[1]]);
      }
      if(pieces.length > 0){
        break;
      }
    }
    for(let a = cords[1] - 1;a >= 0;a--){
      let pieces = room.get_piece([cords[0],a]);
      if(pieces.length === 0 || pieces[0].state.side !== this.state.side){
        attacked.push([cords[0],a]);
      }
      if(pieces.length > 0){
        break;
      }
    }
    for(let a = cords[1] + 1;a < 8;a++){
      let pieces = room.get_piece([cords[0],a]);
      if(pieces.length === 0 || pieces[0].state.side !== this.state.side){
        attacked.push([cords[0],a]);
      }
      if(pieces.length > 0){
        break;
      }
    }
    return attacked;
  }
  unbind_controls(){
    for(let a of this.binds){
      Unbind(a);
    }
  }
  bind_controls(){
    this.bind_control("mouse1",exec_type.once,()=>{
      let room = getGame().state.current_room as Board;
      if(room.state.turn === this.state.side){
        room.state.selected = this;
        room.clear_attacked();
        let valid_attacked = [];
        for(let g of this.getAttacking()){
          
          let pieces = room.get_piece(g);
          if(pieces.length == 0 || pieces[0].state.side !== this.state.side){
            valid_attacked.push(g);
          }
        }
        room.state.attacked = valid_attacked;
        room.attack(valid_attacked);
      }
    })
  }
}