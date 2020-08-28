import {obj} from "../../lib/object";
import {sprite,sprite_gen} from "../../lib/sprite";
import {board_state, Board} from "../rooms/board";
import {getGame} from "../../van";

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
  type:piece_type
}

export class piece extends obj<piece_state>{
  height = 100;
  width = 100;
  collision = true;
  constructor(pos:[number,number],side:side,type:piece_type){
    super();
    this.state = {
      position:{
        x:pos[0] * this.width,
        y:pos[1] * this.height
      },
      side,
      type
    }
  }
  movetoCords(a:[number,number]){
    this.state.position.x = a[0] * this.width;
    this.state.position.y = a[1] * this.height;
  }
  getCords():[number,number]{
    return [this.state.position.x/100,this.state.position.y/100];
  }
  getAttacking():Array<[number,number]>{
    return [];
  }
  renderf(t:number){
    let sprites = sprite_gen(this.sprite_sheet,this.width,this.height);
    if(this.state.side === side.white){
      return sprites[0];
    }
    else{
      return sprites[1];
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
  register_controls(){
    this.bindControl("Mouse1",()=>{
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
      else{
        if(room.state.selected){
          for(let g of room.state.selected.getAttacking()){
            if(g[0] === this.getCords()[0] && g[1] === this.getCords()[1]){
              room.state.turn = this.state.side;
              this.delete();
            }
          } 
        }
      }
    })
  }
}