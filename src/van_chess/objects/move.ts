import {obj} from "../../lib/object";
import {getGame} from "../../van";
import {Board,side} from "../rooms/board";
import {piece,piece_type} from "./piece";
import { Queen } from "./queen";
import { exec_type } from "../../lib/controls";

interface move_state{
  position:{
    x:number,
    y:number
  }
}

export class move extends obj<move_state>{
  sprite_url="./sprites/attacked.png";
  height = 100;
  width = 100;
  render = false;
  constructor(a:[number,number]){
    super();
    this.state = {
      position:{
        x:(a[0] -4) * this.width + this.width/2,
        y:(a[1] -4) * this.height + this.height/2
      }
    }
  }
  getCords():[number,number]{
    let x = (this.state.position.x - this.width/2)/100 + 4;
    let y = (this.state.position.y - this.height/2)/100 + 4;
    return [x,y];
  }
  register_controls(){
    this.bindControl("mouse1",exec_type.once,()=>{
      if(this.render){
        let room = getGame().state.current_room as Board;
        let p = room.get_piece(this.getCords()) as piece[];
        let s = room.state.selected;
        if(s.state.type === piece_type.king && !s.state.has_moved && this.getCords()[0] === 6){
          let rooks = room.get_piece([7,s.getCords()[1]]);
          rooks[0].movetoCords([5,s.getCords()[1]]);
        }
        if(s.state.type === piece_type.king && !s.state.has_moved && this.getCords()[0] === 2){
          let rooks = room.get_piece([0,s.getCords()[1]]);
          rooks[0].movetoCords([3,s.getCords()[1]]);
        }
        if(s.state.type === piece_type.pawn && !s.state.has_moved && s.state.side === side.white && this.getCords()[1] === 3){
          room.state.white_board[this.getCords()[0]][this.getCords()[1] - 1].enpassent = true;
        }
        if(s.state.type === piece_type.pawn && !s.state.has_moved && s.state.side === side.black && this.getCords()[1] === 4){
          room.state.black_board[this.getCords()[0]][this.getCords()[1] + 1].enpassent = true;
        }
        if(s.state.type === piece_type.pawn && s.state.side == side.black && room.get_meta(this.getCords(),side.white).enpassent){
          let f = room.get_piece([this.getCords()[0],this.getCords()[1] + 1]);
          room.remove_piece(f[0]);
        }
        if(s.state.type === piece_type.pawn && s.state.side == side.white && room.get_meta(this.getCords(),side.black).enpassent){
          let f = room.get_piece([this.getCords()[0],this.getCords()[1] - 1]);
          room.remove_piece(f[0]);
        }
        s.state.has_moved = true;
        if(p.length > 0){
          room.remove_piece(p[0]);
        }
        if((this.getCords()[1] == 7 || this.getCords()[1] == 0) && s.state.type === piece_type.pawn){
          let qu = new Queen(this.getCords(),s.state.side);
          qu.load().then(()=>{
            room.add_piece(qu);
            room.remove_piece(s);
          })
        }
        if(s.state.side === side.white){
          room.change_side(side.black);
        }
        else if(s.state.side === side.black){
          room.change_side(side.white);
        }
        room.clear_attacked();
        room.state.selected.movetoCords(this.getCords());
        
        room.state.attacked = [];
        room.state.selected = undefined;
      }
    })
  }
}