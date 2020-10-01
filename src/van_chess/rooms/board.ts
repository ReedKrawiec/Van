import {room,room_i} from "../../lib/room";
import {piece} from "../../van_chess/objects/piece";
import {Knight} from "../../van_chess/objects/knight";
import {Rook} from "../../van_chess/objects/rook";
import {move} from "../../van_chess/objects/move";
import {obj} from "../../lib/object";
import { Bishop } from "../../van_chess/objects/bishop";
import { Queen } from "../../van_chess/objects/queen";
import { King } from "../../van_chess/objects/king";
import { Pawn } from "../../van_chess/objects/pawn";
import { getGame, GetViewportDimensions } from "../../van";

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
  background_url="./sprites/board.png";
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
    for(let a = 0;a < row2.length;a++){
      let pawn1 = new Pawn([a,1],side.white);
      let pawn2 = new Pawn([a,6],side.black);
      this.objects.push(row7[a]);
      this.objects.push(pawn1);
      this.objects.push(row2[a]);
      this.objects.push(pawn2);
      this.state.pieces.push(pawn2);
      this.state.pieces.push(row7[a]);
      this.state.pieces.push(pawn1);
      this.state.pieces.push(row2[a]);
      
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
    for(let x of this.state.pieces){
      if(x.state.side === side.white){
        x.bind_controls();
      }
    }
    
  }
  get_meta(a:[number,number],s:side){
    if(a[0] >= 0 && a[0] < 8 && a[1] >= 0 && a[1] < 8){
      if(s === side.white){
        return this.state.white_board[a[0]][a[1]];
      }
      return this.state.black_board[a[0]][a[1]];
    }
    return null;
  }
  change_side(s:side){
    let to_bind;
    let to_unbind;
    
    if(s == side.white){
      to_bind = s;
      to_unbind = side.black;
      
      this.clear_enpassent_board(this.state.white_board);
      
      this.clear_attacked_board(this.state.black_board);
      
      this.calculate_attacked_board(this.state.black_board,side.black);
      
    }
    else{
      to_bind = side.black;
      to_unbind = side.white;
      
      this.clear_enpassent_board(this.state.black_board);
      
      this.clear_attacked_board(this.state.white_board);
      
      this.calculate_attacked_board(this.state.white_board,side.white);

      
    }
    for(let x of this.state.pieces){
      if(x.state.side === to_bind){
        x.bind_controls();
      }
      else{
        x.unbind_controls();
      }
    }
    this.state.turn = s;
  }
  clear_enpassent_board(x:Array<Array<space_state>>){
    for(let a = 0;a<8;a++){
      for(let b = 0;b<8;b++){
        x[a][b].enpassent = false;
      }
    }
  }
  calculate_attacked_board(x:Array<Array<space_state>>,s:side){
    for(let a of this.state.pieces){
      if(a.state.side == s){
        let attacked = a.getAttacking();
        for(let b of attacked){
          x[b[0]][b[1]].attacked = true;
        }
      }
    } 
  }
  clear_attacked_board(x:Array<Array<space_state>>){
    for(let a = 0;a<8;a++){
      for(let b = 0;b<8;b++){
        x[a][b].attacked = false;
      }
    }
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
  async add_piece(a:piece){
    await a.load();
    this.objects.unshift(a);
    this.state.pieces.unshift(a);
  }
  remove_piece(a:piece){
    for(let b = 0;b < this.state.pieces.length;b++){
      if(a.id === this.state.pieces[b].id){
        this.state.pieces.splice(b,1);
      }   
    }
    a.delete();
  }
  get_piece(a:[number,number]):Array<piece>{
    return (this.check_collisions({
      x:a[0] * 100 + 50 - 400,
      y:a[1] * 100 + 50 - 400,
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
}