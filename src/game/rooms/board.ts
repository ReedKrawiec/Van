import {room,room_i} from "../../lib/room";
import {piece} from "../../game/objects/piece";
import {Knight} from "../../game/objects/knight";
import {Rook} from "../../game/objects/rook";
import {move} from "../../game/objects/move";
import {obj} from "../../lib/object";
import { Bishop } from "../objects/bishop";
import { Queen } from "../objects/queen";
import { King } from "../objects/king";
import { Pawn } from "../objects/pawn";

export enum side{
  white,
  black
}

interface space_state{
  enpassent:boolean,
  attacked:boolean
}

export interface board_state{
  turn:side,
  white_board:Array<Array<space_state>>,
  black_board:Array<Array<space_state>>
  selected:piece,
  squares:Array<Array<move>>,
  pieces:Array<piece>,
  attacked:Array<[number,number]>
}
export class Board extends room<board_state>{
  background_url="http://localhost/src/game/rooms/board.png";
  objects:Array<obj<unknown>> = [];
  constructor(){
    super();
    this.state = {
      turn:side.white,
      white_board:[],
      black_board:[],
      selected:undefined,
      squares:[],
      pieces:[],
      attacked:[]
    };
    let row2 = [new Rook([0,7],side.black),new Knight([1,7],side.black),new Bishop([2,7],side.black),new Queen([3,7],side.black),new King([4,7],side.black),new Bishop([5,7],side.black),new Knight([6,7],side.black),new Rook([7,7],side.black)];
    let row7 = [new Rook([0,0],side.white),new Knight([1,0],side.white),new Bishop([2,0],side.white),new Queen([3,0],side.white),new King([4,0],side.white),new Bishop([5,0],side.white),new Knight([6,0],side.white),new Rook([7,0],side.white)];
    for(let a = 0;a < row7.length;a++){
      this.objects.push(row7[a]);
      this.objects.push(new Pawn([a,1],side.white));
      this.objects.push(row2[a]);
      this.objects.push(new Pawn([a,6],side.black));
    }
    for(let a = 0;a<8;a++){
      let mv_row:Array<move> = [];
      for(let b = 0;b<8;b++){
        let d = a;
        (()=> {
          let move_o = new move([a,b]);
          mv_row.push(move_o);
          this.objects.push(move_o);
        })()
      }
      this.state.squares.push(mv_row);
    }
    this.state.black_board = this.blank_board();
    this.state.white_board = this.blank_board();
  }
  blank_board(){
    let board = [];
    for(let a = 0;a<8;a++){
      let row = [];
      for(let b = 0;b<8;b++){
        row.push({
          enpassent:false,
          attacked:false
        });
      }
      board.push(row);
    }
    return board;
  }
  get_piece(a:[number,number]):Array<piece>{
    return (this.check_collisions({
      x:a[0] * 100,
      y:a[1] * 100,
      height:100,
      width:100
    }) as Array<piece>);
  }
  clear_attacked(){
    for(let a of this.state.attacked){
      this.state.squares[a[0]][a[1]].render = false;
    }
  }
  attack(x:Array<[number,number]>){
    for(let a of x){
      this.state.squares[a[0]][a[1]].render = true;
    }
  }
  async statef(a:number){
    console.log(this.objects);
  }
}