import {obj} from "../../lib/object";
import {getGame} from "../../van";
import {Board,side} from "../rooms/board";
import {piece,piece_type} from "./piece";
import { Queen } from "./queen";

interface move_state{
  position:{
    x:number,
    y:number
  }
}

export class move extends obj<move_state>{
  sprite_url="http://localhost/src/game/sprites/attacked.png";
  height = 100;
  width = 100;
  render = false;
  constructor(a:[number,number]){
    super();
    this.state = {
      position:{
        x:a[0] * this.width,
        y:a[1] * this.height
      }
    }
  }
  getCords():[number,number]{
    return [this.state.position.x/100,this.state.position.y/100];
  }
  register_controls(){
    this.bindControl("Mouse1",()=>{
      if(this.render){
        let room = getGame().state.current_room as Board;
        let p = room.get_piece(this.getCords()) as piece[];
        let s = room.state.selected;
        console.log(room.state.selected);
        console.log(this.getCords());
        if((this.getCords()[1] == 7 || this.getCords()[1] == 0) && s.state.type === piece_type.pawn){
          let qu = new Queen(this.getCords(),s.state.side);
          qu.load().then(()=>{
            room.objects.push(qu);
            room.state.pieces.push(qu);
            s.delete();
          })
        }
        
        console.log(room.state.selected.getCords());
        console.log(this.getCords());
        if(s.state.side === side.white){
          room.state.turn = side.black;
        }
        else if(s.state.side === side.black){
          room.state.turn = side.white;
        }
        room.state.selected.movetoCords(this.getCords());
        room.clear_attacked();
        room.state.attacked = [];
        room.state.selected = undefined;
      }
    })
  }
}