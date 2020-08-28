/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/van.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game/objects/bishop.ts":
/*!************************************!*\
  !*** ./src/game/objects/bishop.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Bishop = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/game/objects/piece.ts");
class Bishop extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.bishop);
        this.sprite_url = "http://localhost/src/game/sprites/bishop.png";
    }
    getAttacking() {
        return this.attackDiagonal();
    }
}
exports.Bishop = Bishop;


/***/ }),

/***/ "./src/game/objects/king.ts":
/*!**********************************!*\
  !*** ./src/game/objects/king.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.King = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/game/objects/piece.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class King extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.king);
        this.sprite_url = "http://localhost/src/game/sprites/king.png";
    }
    getAttacking() {
        let cords = this.getCords();
        let room = van_1.getGame().getRoom();
        let attacked = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if ((x !== 0 || y !== 0) && cords[0] + x >= 0 && cords[0] + x < 8 && cords[1] + y >= 0 && cords[1] + y < 8) {
                    let piece = room.get_piece([cords[0] + x, cords[1] + y]);
                    let safe = true;
                    /*
                    for(let a of room.state.attacked){
                      if(a[0] === cords[0] && a[1] === cords[1]){
                        safe = false;
                      }
                    }
                    */
                    if (safe && piece.length === 0 || piece[0].state.side !== this.state.side) {
                        attacked.push([cords[0] + x, cords[1] + y]);
                    }
                }
            }
        }
        return attacked;
    }
}
exports.King = King;


/***/ }),

/***/ "./src/game/objects/knight.ts":
/*!************************************!*\
  !*** ./src/game/objects/knight.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Knight = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/game/objects/piece.ts");
class Knight extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.knight);
        this.sprite_url = "http://localhost/src/game/sprites/knight.png";
    }
    getAttacking() {
        let cords = this.getCords();
        let attacked = [];
        attacked.push([cords[0] + 1, cords[1] + 2]);
        attacked.push([cords[0] - 1, cords[1] + 2]);
        attacked.push([cords[0] + 2, cords[1] + 1]);
        attacked.push([cords[0] + 2, cords[1] - 1]);
        attacked.push([cords[0] + 1, cords[1] - 2]);
        attacked.push([cords[0] - 1, cords[1] - 2]);
        attacked.push([cords[0] - 2, cords[1] + 1]);
        attacked.push([cords[0] - 2, cords[1] - 1]);
        return (attacked.filter((x) => x[0] >= 0 && x[0] < 8 && x[1] >= 0 && x[1] < 8));
    }
}
exports.Knight = Knight;


/***/ }),

/***/ "./src/game/objects/move.ts":
/*!**********************************!*\
  !*** ./src/game/objects/move.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.move = void 0;
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
const board_1 = __webpack_require__(/*! ../rooms/board */ "./src/game/rooms/board.ts");
const piece_1 = __webpack_require__(/*! ./piece */ "./src/game/objects/piece.ts");
const queen_1 = __webpack_require__(/*! ./queen */ "./src/game/objects/queen.ts");
class move extends object_1.obj {
    constructor(a) {
        super();
        this.sprite_url = "http://localhost/src/game/sprites/attacked.png";
        this.height = 100;
        this.width = 100;
        this.render = false;
        this.state = {
            position: {
                x: a[0] * this.width,
                y: a[1] * this.height
            }
        };
    }
    getCords() {
        return [this.state.position.x / 100, this.state.position.y / 100];
    }
    register_controls() {
        this.bindControl("Mouse1", () => {
            if (this.render) {
                let room = van_1.getGame().state.current_room;
                let p = room.get_piece(this.getCords());
                let s = room.state.selected;
                console.log(room.state.selected);
                console.log(this.getCords());
                if ((this.getCords()[1] == 7 || this.getCords()[1] == 0) && s.state.type === piece_1.piece_type.pawn) {
                    let qu = new queen_1.Queen(this.getCords(), s.state.side);
                    qu.load().then(() => {
                        room.objects.push(qu);
                        room.state.pieces.push(qu);
                        s.delete();
                    });
                }
                console.log(room.state.selected.getCords());
                console.log(this.getCords());
                if (s.state.side === board_1.side.white) {
                    room.state.turn = board_1.side.black;
                }
                else if (s.state.side === board_1.side.black) {
                    room.state.turn = board_1.side.white;
                }
                room.state.selected.movetoCords(this.getCords());
                room.clear_attacked();
                room.state.attacked = [];
                room.state.selected = undefined;
            }
        });
    }
}
exports.move = move;


/***/ }),

/***/ "./src/game/objects/pawn.ts":
/*!**********************************!*\
  !*** ./src/game/objects/pawn.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/game/objects/piece.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class Pawn extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.pawn);
        this.sprite_url = "http://localhost/src/game/sprites/pawn.png";
    }
    getAttacking() {
        let attacked = [];
        let cords = this.getCords();
        let room = van_1.getGame().getRoom();
        let left;
        let right;
        let forward;
        if (this.state.side == piece_1.side.white) {
            if (room.get_piece([cords[0], cords[1] + 1]).length === 0) {
                attacked.push([cords[0], cords[1] + 1]);
            }
            let left = room.get_piece([cords[0] - 1, cords[1] + 1]);
            let right = room.get_piece([cords[0] + 1, cords[1] + 1]);
            if ((cords[0] - 1 >= 0) && left.length > 0 && left[0].state.side !== this.state.side) {
                attacked.push([cords[0] - 1, cords[1] + 1]);
            }
            if ((cords[0] + 1 < 8) && right.length > 0 && right[0].state.side !== this.state.side) {
                attacked.push([cords[0] + 1, cords[1] + 1]);
            }
        }
        else {
            if (room.get_piece([cords[0], cords[1] - 1]).length === 0) {
                attacked.push([cords[0], cords[1] - 1]);
            }
            let left = room.get_piece([cords[0] - 1, cords[1] - 1]);
            let right = room.get_piece([cords[0] + 1, cords[1] - 1]);
            if ((cords[0] - 1 >= 0) && left.length > 0 && left[0].state.side !== this.state.side) {
                attacked.push([cords[0] - 1, cords[1] - 1]);
            }
            if ((cords[0] + 1 < 8) && right.length > 0 && right[0].state.side !== this.state.side) {
                attacked.push([cords[0] + 1, cords[1] - 1]);
            }
        }
        return attacked;
    }
}
exports.Pawn = Pawn;


/***/ }),

/***/ "./src/game/objects/piece.ts":
/*!***********************************!*\
  !*** ./src/game/objects/piece.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.piece = exports.piece_type = exports.side = void 0;
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const sprite_1 = __webpack_require__(/*! ../../lib/sprite */ "./src/lib/sprite.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
var side;
(function (side) {
    side[side["white"] = 0] = "white";
    side[side["black"] = 1] = "black";
})(side = exports.side || (exports.side = {}));
var piece_type;
(function (piece_type) {
    piece_type[piece_type["pawn"] = 0] = "pawn";
    piece_type[piece_type["rook"] = 1] = "rook";
    piece_type[piece_type["bishop"] = 2] = "bishop";
    piece_type[piece_type["queen"] = 3] = "queen";
    piece_type[piece_type["king"] = 4] = "king";
    piece_type[piece_type["knight"] = 5] = "knight";
})(piece_type = exports.piece_type || (exports.piece_type = {}));
class piece extends object_1.obj {
    constructor(pos, side, type) {
        super();
        this.height = 100;
        this.width = 100;
        this.collision = true;
        this.state = {
            position: {
                x: pos[0] * this.width,
                y: pos[1] * this.height
            },
            side,
            type
        };
    }
    movetoCords(a) {
        this.state.position.x = a[0] * this.width;
        this.state.position.y = a[1] * this.height;
    }
    getCords() {
        return [this.state.position.x / 100, this.state.position.y / 100];
    }
    getAttacking() {
        return [];
    }
    renderf(t) {
        let sprites = sprite_1.sprite_gen(this.sprite_sheet, this.width, this.height);
        if (this.state.side === side.white) {
            return sprites[0];
        }
        else {
            return sprites[1];
        }
    }
    attackDiagonal() {
        let cords = this.getCords();
        let room = van_1.getGame().getRoom();
        let attacked = [];
        for (let a = 1; a < 8; a++) {
            if (cords[0] - a >= 0 && cords[0] - a < 8 && cords[1] - a >= 0 && cords[1] - a < 8) {
                let pieces = room.get_piece([cords[0] - a, cords[1] - a]);
                if (pieces.length == 0 || pieces[0].state.side !== this.state.side) {
                    attacked.push([cords[0] - a, cords[1] - a]);
                }
                if (pieces.length > 0) {
                    break;
                }
            }
        }
        for (let a = 1; a < 8; a++) {
            if (cords[0] - a >= 0 && cords[0] - a < 8 && cords[1] + a >= 0 && cords[1] + a < 8) {
                let pieces = room.get_piece([cords[0] - a, cords[1] + a]);
                if (pieces.length == 0 || pieces[0].state.side !== this.state.side) {
                    attacked.push([cords[0] - a, cords[1] + a]);
                }
                if (pieces.length > 0) {
                    break;
                }
            }
        }
        for (let a = 1; a < 8; a++) {
            if (cords[0] + a >= 0 && cords[0] + a < 8 && cords[1] + a >= 0 && cords[1] + a < 8) {
                let pieces = room.get_piece([cords[0] + a, cords[1] + a]);
                if (pieces.length == 0 || pieces[0].state.side !== this.state.side) {
                    attacked.push([cords[0] + a, cords[1] + a]);
                }
                if (pieces.length > 0) {
                    break;
                }
            }
        }
        for (let a = 1; a < 8; a++) {
            if (cords[0] + a >= 0 && cords[0] + a < 8 && cords[1] - a >= 0 && cords[1] - a < 8) {
                let pieces = room.get_piece([cords[0] + a, cords[1] - a]);
                if (pieces.length == 0 || pieces[0].state.side !== this.state.side) {
                    attacked.push([cords[0] + a, cords[1] - a]);
                }
                if (pieces.length > 0) {
                    break;
                }
            }
        }
        return attacked;
    }
    attackCardinal() {
        let cords = this.getCords();
        let room = van_1.getGame().getRoom();
        let attacked = [];
        for (let a = cords[0] - 1; a >= 0; a--) {
            let pieces = room.get_piece([a, cords[1]]);
            if (pieces.length === 0 || pieces[0].state.side !== this.state.side) {
                attacked.push([a, cords[1]]);
            }
            if (pieces.length > 0) {
                break;
            }
        }
        for (let a = cords[0] + 1; a < 8; a++) {
            let pieces = room.get_piece([a, cords[1]]);
            if (pieces.length === 0 || pieces[0].state.side !== this.state.side) {
                attacked.push([a, cords[1]]);
            }
            if (pieces.length > 0) {
                break;
            }
        }
        for (let a = cords[1] - 1; a >= 0; a--) {
            let pieces = room.get_piece([cords[0], a]);
            if (pieces.length === 0 || pieces[0].state.side !== this.state.side) {
                attacked.push([cords[0], a]);
            }
            if (pieces.length > 0) {
                break;
            }
        }
        for (let a = cords[1] + 1; a < 8; a++) {
            let pieces = room.get_piece([cords[0], a]);
            if (pieces.length === 0 || pieces[0].state.side !== this.state.side) {
                attacked.push([cords[0], a]);
            }
            if (pieces.length > 0) {
                break;
            }
        }
        return attacked;
    }
    register_controls() {
        this.bindControl("Mouse1", () => {
            let room = van_1.getGame().state.current_room;
            if (room.state.turn === this.state.side) {
                room.state.selected = this;
                room.clear_attacked();
                let valid_attacked = [];
                for (let g of this.getAttacking()) {
                    let pieces = room.get_piece(g);
                    if (pieces.length == 0 || pieces[0].state.side !== this.state.side) {
                        valid_attacked.push(g);
                    }
                }
                room.state.attacked = valid_attacked;
                room.attack(valid_attacked);
            }
            else {
                if (room.state.selected) {
                    for (let g of room.state.selected.getAttacking()) {
                        if (g[0] === this.getCords()[0] && g[1] === this.getCords()[1]) {
                            room.state.turn = this.state.side;
                            this.delete();
                        }
                    }
                }
            }
        });
    }
}
exports.piece = piece;


/***/ }),

/***/ "./src/game/objects/queen.ts":
/*!***********************************!*\
  !*** ./src/game/objects/queen.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Queen = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/game/objects/piece.ts");
class Queen extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.queen);
        this.sprite_url = "http://localhost/src/game/sprites/queen.png";
    }
    getAttacking() {
        return this.attackDiagonal().concat(this.attackCardinal());
    }
}
exports.Queen = Queen;


/***/ }),

/***/ "./src/game/objects/rook.ts":
/*!**********************************!*\
  !*** ./src/game/objects/rook.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Rook = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/game/objects/piece.ts");
class Rook extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.rook);
        this.sprite_url = "http://localhost/src/game/sprites/rook.png";
    }
    getAttacking() {
        return this.attackCardinal();
    }
}
exports.Rook = Rook;


/***/ }),

/***/ "./src/game/rooms/board.ts":
/*!*********************************!*\
  !*** ./src/game/rooms/board.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.side = void 0;
const room_1 = __webpack_require__(/*! ../../lib/room */ "./src/lib/room.ts");
const knight_1 = __webpack_require__(/*! ../../game/objects/knight */ "./src/game/objects/knight.ts");
const rook_1 = __webpack_require__(/*! ../../game/objects/rook */ "./src/game/objects/rook.ts");
const move_1 = __webpack_require__(/*! ../../game/objects/move */ "./src/game/objects/move.ts");
const bishop_1 = __webpack_require__(/*! ../objects/bishop */ "./src/game/objects/bishop.ts");
const queen_1 = __webpack_require__(/*! ../objects/queen */ "./src/game/objects/queen.ts");
const king_1 = __webpack_require__(/*! ../objects/king */ "./src/game/objects/king.ts");
const pawn_1 = __webpack_require__(/*! ../objects/pawn */ "./src/game/objects/pawn.ts");
var side;
(function (side) {
    side[side["white"] = 0] = "white";
    side[side["black"] = 1] = "black";
})(side = exports.side || (exports.side = {}));
class Board extends room_1.room {
    constructor() {
        super();
        this.background_url = "http://localhost/src/game/rooms/board.png";
        this.objects = [];
        this.state = {
            turn: side.white,
            white_board: [],
            black_board: [],
            selected: undefined,
            squares: [],
            pieces: [],
            attacked: []
        };
        let row2 = [new rook_1.Rook([0, 7], side.black), new knight_1.Knight([1, 7], side.black), new bishop_1.Bishop([2, 7], side.black), new queen_1.Queen([3, 7], side.black), new king_1.King([4, 7], side.black), new bishop_1.Bishop([5, 7], side.black), new knight_1.Knight([6, 7], side.black), new rook_1.Rook([7, 7], side.black)];
        let row7 = [new rook_1.Rook([0, 0], side.white), new knight_1.Knight([1, 0], side.white), new bishop_1.Bishop([2, 0], side.white), new queen_1.Queen([3, 0], side.white), new king_1.King([4, 0], side.white), new bishop_1.Bishop([5, 0], side.white), new knight_1.Knight([6, 0], side.white), new rook_1.Rook([7, 0], side.white)];
        for (let a = 0; a < row7.length; a++) {
            this.objects.push(row7[a]);
            this.objects.push(new pawn_1.Pawn([a, 1], side.white));
            this.objects.push(row2[a]);
            this.objects.push(new pawn_1.Pawn([a, 6], side.black));
        }
        for (let a = 0; a < 8; a++) {
            let mv_row = [];
            for (let b = 0; b < 8; b++) {
                let d = a;
                (() => {
                    let move_o = new move_1.move([a, b]);
                    mv_row.push(move_o);
                    this.objects.push(move_o);
                })();
            }
            this.state.squares.push(mv_row);
        }
        this.state.black_board = this.blank_board();
        this.state.white_board = this.blank_board();
    }
    blank_board() {
        let board = [];
        for (let a = 0; a < 8; a++) {
            let row = [];
            for (let b = 0; b < 8; b++) {
                row.push({
                    enpassent: false,
                    attacked: false
                });
            }
            board.push(row);
        }
        return board;
    }
    get_piece(a) {
        return this.check_collisions({
            x: a[0] * 100,
            y: a[1] * 100,
            height: 100,
            width: 100
        });
    }
    clear_attacked() {
        for (let a of this.state.attacked) {
            this.state.squares[a[0]][a[1]].render = false;
        }
    }
    attack(x) {
        for (let a of x) {
            this.state.squares[a[0]][a[1]].render = true;
        }
    }
    statef(a) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.objects);
        });
    }
}
exports.Board = Board;


/***/ }),

/***/ "./src/lib/collision.ts":
/*!******************************!*\
  !*** ./src/lib/collision.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.velocity_collision_check = exports.check_collisions = exports.check_all_collisions = exports.check_all_objects = void 0;
const object_1 = __webpack_require__(/*! ../lib/object */ "./src/lib/object.ts");
var direction;
(function (direction) {
    direction[direction["left"] = 0] = "left";
    direction[direction["right"] = 1] = "right";
    direction[direction["up"] = 2] = "up";
    direction[direction["down"] = 3] = "down";
})(direction || (direction = {}));
function check_all_objects(c, objs, exemption) {
    let matched = [];
    for (let a of objs) {
        if (a.id !== exemption && a.collides_with_box(c)) {
            matched.push(a);
        }
    }
    return matched;
}
exports.check_all_objects = check_all_objects;
function check_all_collisions(c, objs, exemption) {
    let matched = [];
    for (let a of objs) {
        if (a.id !== exemption && a.collision && a.collides_with_box(c)) {
            matched.push(a);
        }
    }
    return matched;
}
exports.check_all_collisions = check_all_collisions;
//Checks up to the first collision
function check_collisions(c, objs, exemption) {
    for (let a of objs) {
        if (a.id !== exemption && a.collision && a.collides_with_box(c)) {
            return a;
        }
    }
    return undefined;
}
exports.check_collisions = check_collisions;
function velocity_max(velocity, box, objs, exemption, dir) {
    let collision = check_collisions(box, objs, exemption);
    if (collision == undefined) {
        return velocity;
    }
    else {
        let collider = collision;
        let origin = object_1.getId(objs, exemption);
        let orig_st = origin.state;
        let collider_st = collider.state;
        if (dir == direction.left) {
            return orig_st.position.x - (collider_st.position.x + collider.width);
        }
        else if (dir == direction.right) {
            return collider_st.position.x - (orig_st.position.x + origin.width);
        }
        else if (dir == direction.down) {
            return orig_st.position.y - (collider_st.position.y + collider.height);
        }
        else if (dir == direction.up) {
            return collider_st.position.y - (orig_st.position.y + origin.height);
        }
    }
}
function velocity_collision_check(object, list) {
    let ob = object;
    let st = object.getState();
    let x_vel = st.velocity.x;
    let y_vel = st.velocity.y;
    if (x_vel > 0) {
        let box = {
            x: st.position.x + ob.width,
            y: st.position.y,
            width: x_vel,
            height: ob.height
        };
        let vel = velocity_max(st.velocity.x, box, list, ob.id, direction.right);
        if (vel > 0) {
            st.position.x += vel;
        }
        else {
            st.velocity.x = 0;
        }
    }
    else if (x_vel < 0) {
        let box = {
            x: x_vel + st.position.x,
            y: st.position.y,
            width: -1 * x_vel,
            height: ob.height
        };
        let vel = velocity_max(st.velocity.x, box, list, ob.id, direction.left);
        if (vel < 0) {
            st.position.x += vel;
        }
        else {
            st.velocity.x = 0;
        }
    }
    if (y_vel > 0) {
        let box = {
            x: st.position.x,
            y: st.position.y + ob.height,
            width: ob.width,
            height: y_vel
        };
        let vel = velocity_max(st.velocity.y, box, list, ob.id, direction.up);
        if (vel > 0) {
            st.position.y += vel;
        }
        else {
            st.velocity.y = 0;
        }
    }
    else if (y_vel < 0) {
        let box = {
            x: st.position.x,
            y: y_vel + st.position.y,
            width: ob.width,
            height: -1 * y_vel
        };
        let vel = velocity_max(st.velocity.y, box, list, ob.id, direction.down);
        if (vel < 0) {
            st.position.y += vel;
        }
        else {
            st.velocity.y = 0;
        }
    }
}
exports.velocity_collision_check = velocity_collision_check;


/***/ }),

/***/ "./src/lib/controls.ts":
/*!*****************************!*\
  !*** ./src/lib/controls.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Bind = exports.Unbind = exports.Poll_Mouse = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
let target = document.getElementById("target");
target.addEventListener("click", (e) => {
    let mouse = Poll_Mouse();
    let box = {
        x: mouse.x,
        y: mouse.y,
        height: 1,
        width: 1
    };
    let d = [...all_binds];
    for (let a = 0; a < d.length; a++) {
        let selected = d[a];
        if (selected.type === btype.mouse && selected.key === "Mouse1") {
            if (selected.obj !== undefined) {
                if (selected.obj.collides_with_box(box)) {
                    selected.function();
                }
            }
            else {
                selected.function();
            }
        }
    }
});
window.addEventListener("keydown", (e) => {
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.keyboard && selected.key === e.code) {
            selected.function();
        }
    }
});
let tracker = document.getElementById("target");
tracker.addEventListener("mousemove", (e) => {
    var rect = e.target.getBoundingClientRect();
    last_x = x;
    last_y = y;
    x = e.clientX - rect.left; //x position within the element.
    y = e.clientY - rect.top; //y position within the element.
});
var btype;
(function (btype) {
    btype[btype["mouse"] = 0] = "mouse";
    btype[btype["keyboard"] = 1] = "keyboard";
})(btype || (btype = {}));
let x = 0;
let y = 0;
let last_x = 0;
let last_y = 0;
let binds = {};
let mouseBinds = {};
let bind_count = 0;
let all_binds = [];
function Poll_Mouse() {
    let height = van_1.GetViewportDimensions().height;
    let canvas = van_1.getGame().state.canvas;
    let wratio = parseFloat(window.getComputedStyle(canvas).width) / van_1.GetViewportDimensions().width;
    let vratio = parseFloat(window.getComputedStyle(canvas).height) / van_1.GetViewportDimensions().height;
    let camera = van_1.getGame().state.camera;
    return ({
        x: (x / wratio / camera.state.scaling + camera.state.position.x),
        y: ((height - y / vratio) / camera.state.scaling + camera.state.position.y),
        last: {
            x: (x / wratio / camera.state.scaling + camera.state.position.x),
            y: ((height - y / vratio) / camera.state.scaling + camera.state.position.y)
        }
    });
}
exports.Poll_Mouse = Poll_Mouse;
function Unbind(bind_id) {
    for (let a = 0; a < all_binds.length; a++) {
        if (all_binds[a].id == bind_id) {
            all_binds.splice(a, 1);
            break;
        }
    }
}
exports.Unbind = Unbind;
let id = 0;
function Bind(keyname, func, object) {
    if (keyname.slice(0, 5) === "Mouse") {
        all_binds.push({
            key: keyname,
            type: btype.mouse,
            id: id,
            function: func,
            obj: object
        });
    }
    else {
        all_binds.push({
            key: keyname,
            type: btype.keyboard,
            id: id,
            function: func
        });
    }
    id++;
    return id - 1;
}
exports.Bind = Bind;


/***/ }),

/***/ "./src/lib/object.ts":
/*!***************************!*\
  !*** ./src/lib/object.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.gravity_obj = exports.static_obj = exports.obj = exports.getId = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
const controls_1 = __webpack_require__(/*! ./controls */ "./src/lib/controls.ts");
function getId(a, id) {
    for (let b = 0; b < a.length; b++) {
        if (a[b].id == id) {
            return a[b];
        }
    }
    return undefined;
}
exports.getId = getId;
let counter = 0;
class obj {
    constructor() {
        this.sprite_url = "";
        this.height = undefined;
        this.width = undefined;
        this.collision = false;
        this.render = true;
        this.id = "" + counter;
        this.binds = [];
        counter++;
        this.register_controls();
    }
    getState() {
        return this.state;
    }
    load() {
        let _this = this;
        return new Promise((resolve, reject) => {
            let a = new Image();
            a.src = this.sprite_url;
            a.onload = (() => {
                _this.sprite_sheet = a;
                resolve();
            });
        });
    }
    bindControl(key, func) {
        if (key == "Mouse1") {
            let b = controls_1.Bind(key, func, this);
            this.binds.push(b);
        }
        else {
            this.binds.push(controls_1.Bind(key, func));
        }
    }
    register_controls() {
    }
    delete() {
        for (let a of this.binds) {
            controls_1.Unbind(a);
        }
        van_1.getGame().getRoom().deleteItem(this.id);
    }
    collision_check(a) {
        if (this.collision) {
            let room = van_1.getGame().getRoom();
            return room.check_collisions(a, this.id);
        }
        return [];
    }
    statef(time) {
    }
    collides_with_box(a) {
        let st = this.state;
        let hcollides = false, vcollides = false;
        if (st.position.x >= a.x && st.position.x < (a.x + a.width)) {
            hcollides = true;
        }
        if (a.x > st.position.x && a.x < (st.position.x + this.width)) {
            hcollides = true;
        }
        if (st.position.y >= a.y && st.position.y < (a.y + a.height)) {
            vcollides = true;
        }
        if (a.y > st.position.y && a.y < (st.position.y + this.height)) {
            vcollides = true;
        }
        return hcollides && vcollides;
    }
    collides_with(a) {
        let st = this.state;
        let st_2 = a.state;
        let hcollides = false, vcollides = false;
        if (st.position.x > st_2.position.x && st.position.x < (st_2.position.x + a.width)) {
            hcollides = true;
        }
        if (st_2.position.x > st.position.x && st_2.position.x < (st.position.x + a.width)) {
            hcollides = true;
        }
        if (st.position.y > st_2.position.y && st.position.y < (st_2.position.y + a.width)) {
            vcollides = true;
        }
        if (st_2.position.y > st.position.y && st_2.position.y < (st.position.y + a.width)) {
            vcollides = true;
        }
        return hcollides && vcollides;
    }
    renderf(time) {
        let st = this.state;
        let sprite_height = this.height;
        let sprite_width = this.width;
        if (this.height == undefined) {
            sprite_height = this.sprite_sheet.height;
        }
        if (this.width == undefined) {
            sprite_width = this.sprite_sheet.width;
        }
        return {
            sprite_sheet: this.sprite_sheet,
            left: 0,
            top: 0,
            sprite_width,
            sprite_height
        };
    }
}
exports.obj = obj;
class static_obj {
    constructor() {
        this.sprite_url = "";
    }
}
exports.static_obj = static_obj;
class gravity_obj extends obj {
    constructor() {
        super(...arguments);
        this.gravity = true;
    }
}
exports.gravity_obj = gravity_obj;


/***/ }),

/***/ "./src/lib/render.ts":
/*!***************************!*\
  !*** ./src/lib/render.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.rect_renderer = exports.sprite_renderer = exports.Camera = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
class Camera {
    constructor(x, y, width, height, scaling, stretch) {
        this.state = {
            scaling,
            stretch,
            position: {
                x: x / scaling,
                y: y / scaling
            },
            dimensions: {
                width: width / scaling,
                height: height / scaling
            }
        };
    }
    set x(x) {
        this.state.position.x = x;
    }
    set y(y) {
        this.state.position.y = y;
    }
    get x() {
        return this.state.position.x;
    }
    get y() {
        return this.state.position.y;
    }
}
exports.Camera = Camera;
exports.sprite_renderer = (r, s) => {
    let camera = r.camera;
    let vheight = van_1.GetViewportDimensions().height;
    let final_x = ((s.x - camera.state.position.x) * r.camera.state.scaling);
    let final_y = ((vheight - s.y - s.sprite.sprite_height + camera.state.position.y) * r.camera.state.scaling);
    let height = s.sprite.sprite_height * r.camera.state.scaling;
    let width = s.sprite.sprite_width * r.camera.state.scaling;
    r.context.drawImage(s.sprite.sprite_sheet, s.sprite.left, s.sprite.top, s.sprite.sprite_width, s.sprite.sprite_height, final_x, final_y, width, height);
};
exports.rect_renderer = (context, rect, x, y, color, camera) => {
    let vheight = van_1.GetViewportDimensions().height;
    let final_x = ((x - camera.state.position.x) * camera.state.scaling);
    let final_y = ((vheight - y - rect.height + camera.state.position.y) * camera.state.scaling);
    let height = rect.height * camera.state.scaling;
    let width = rect.width * camera.state.scaling;
    context.strokeStyle = color;
    context.strokeRect(final_x, final_y, rect.width, height);
};


/***/ }),

/***/ "./src/lib/room.ts":
/*!*************************!*\
  !*** ./src/lib/room.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.room = exports.apply_gravity = void 0;
const collision_1 = __webpack_require__(/*! ./collision */ "./src/lib/collision.ts");
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
const controls_1 = __webpack_require__(/*! ./controls */ "./src/lib/controls.ts");
function apply_gravity(ob, grav_const, grav_max) {
    let st = ob.state;
    if (ob.gravity && st.velocity.y > grav_max) {
        st.velocity.y += grav_const;
    }
}
exports.apply_gravity = apply_gravity;
class room {
    load() {
        let _this = this;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let a = new Image();
            let to_await = this.objects.map((a) => a.load());
            yield Promise.all(to_await);
            a.src = this.background_url;
            a.onerror = (() => {
                console.log("error loading url:" + this.background_url);
            });
            a.onload = (() => {
                _this.background = a;
                resolve();
            });
        }));
    }
    deleteItem(id) {
        for (let a = 0; a < this.objects.length; a++) {
            if (this.objects[a].id === id) {
                this.objects = this.objects.slice(0, a).concat(this.objects.slice(a + 1));
                a--;
            }
        }
    }
    bindControl(key, func) {
        controls_1.Bind(key, func);
    }
    check_collisions(box, exempt) {
        if (van_1.DEBUG) {
            van_1.render_collision_box(box);
        }
        return collision_1.check_all_collisions(box, this.objects, exempt);
    }
    check_objects(box, exempt) {
        if (van_1.DEBUG) {
            van_1.render_collision_box(box);
        }
        return collision_1.check_all_objects(box, this.objects, exempt);
    }
    register_controls() {
    }
    cleanup() {
    }
    statef(time) {
        for (let a = 0; a < this.objects.length; a++) {
            this.objects[a].statef(time);
        }
    }
    getObj(id) {
        for (let a = 0; a < this.objects.length; a++) {
            if (this.objects[a].id == id) {
                return this.objects[a];
            }
        }
        return false;
    }
    renderf(time) {
        return {
            sprite_sheet: this.background,
            left: 0,
            top: 0,
            sprite_height: this.background.height,
            sprite_width: this.background.width
        };
    }
}
exports.room = room;


/***/ }),

/***/ "./src/lib/sprite.ts":
/*!***************************!*\
  !*** ./src/lib/sprite.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sprite_gen = void 0;
function sprite_gen(sprite_sheet, sprite_width, sprite_height) {
    let width = sprite_sheet.width;
    let sprites = [];
    for (let a = 0; a < width; a += sprite_width) {
        sprites.push({
            sprite_sheet,
            left: a,
            top: 0,
            sprite_height,
            sprite_width
        });
    }
    return sprites;
}
exports.sprite_gen = sprite_gen;


/***/ }),

/***/ "./src/van.ts":
/*!********************!*\
  !*** ./src/van.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGame = exports.game = exports.render_collision_box = exports.GetViewportDimensions = exports.GetScreenDimensions = exports.DEBUG = void 0;
exports.DEBUG = true;
const render_1 = __webpack_require__(/*! ./lib/render */ "./src/lib/render.ts");
const board_1 = __webpack_require__(/*! ./game/rooms/board */ "./src/game/rooms/board.ts");
let canvas_element = document.getElementById("target");
let context = canvas_element.getContext("2d");
let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
let vwidth = canvas_element.width;
let vheight = canvas_element.height;
//How often the game logic loop should run, in milliseconds
let logic_loop_interval = 1000 / 60;
let last_time = new Date();
function GetScreenDimensions() {
    return ({
        width: screen_width,
        height: screen_height
    });
}
exports.GetScreenDimensions = GetScreenDimensions;
function GetViewportDimensions() {
    return ({
        height: vheight,
        width: vwidth
    });
}
exports.GetViewportDimensions = GetViewportDimensions;
exports.render_collision_box = (a) => {
    boxes.push(a);
};
let boxes = [];
let deep = (a) => {
    return JSON.parse(JSON.stringify(a));
};
class game {
    constructor(ctx, a) {
        this.state = {
            canvas: canvas_element,
            logic: undefined,
            context: ctx,
            camera: new render_1.Camera(0, 0, vwidth, vheight, 1, false),
            current_room: undefined,
            player_state: {
                power: 0
            }
        };
        this.loadRoom(a);
    }
    render(t) {
        this.state.context.clearRect(0, 0, vwidth, vheight);
        this.state.context.fillStyle = "black";
        this.state.context.fillRect(0, 0, vwidth, vheight);
        let camera_colliders = this.state.current_room.check_objects({
            x: this.state.camera.state.position.x,
            y: this.state.camera.state.position.y,
            width: this.state.camera.state.dimensions.width,
            height: this.state.camera.state.dimensions.height
        });
        let render_args = {
            context: this.state.context,
            camera: this.state.camera,
        };
        render_1.sprite_renderer(render_args, {
            sprite: this.state.current_room.renderf(t),
            x: 0,
            y: 0
        });
        for (let a of camera_colliders) {
            let st = a.state;
            if (a.render) {
                render_1.sprite_renderer(render_args, {
                    sprite: a.renderf(t),
                    x: st.position.x,
                    y: st.position.y
                });
            }
        }
        let box;
        while (boxes.length > 0) {
            let box = boxes.pop();
            let rect = {
                width: box.width,
                height: box.height
            };
            render_1.rect_renderer(context, rect, box.x, box.y, "#FF0000", this.state.camera);
        }
        requestAnimationFrame((a) => { this.render(a); });
    }
    start_logic(a) {
        return setInterval(() => {
            let new_time = new Date();
            let time_since = new_time.getTime() - last_time.getTime();
            last_time = new_time;
            this.state.current_room.statef(new_time.getTime());
        }, a);
    }
    getRoom() {
        return this.state.current_room;
    }
    loadRoom(x) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.current_room !== undefined) {
                while (this.state.current_room.objects.length > 0) {
                    this.state.current_room.objects[0].delete();
                }
            }
            let new_room = yield x.load();
            x.register_controls();
            this.state.current_room = x;
            if (this.state.logic != undefined) {
                clearInterval(this.state.logic);
            }
            this.state.logic = this.start_logic(logic_loop_interval);
            this.render(0);
        });
    }
}
exports.game = game;
let game_inst = new game(context, new board_1.Board());
function getGame() {
    return game_inst;
}
exports.getGame = getGame;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9iaXNob3AudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9raW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL29iamVjdHMva25pZ2h0LnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL29iamVjdHMvbW92ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9vYmplY3RzL3Bhd24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9waWVjZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9vYmplY3RzL3F1ZWVuLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL29iamVjdHMvcm9vay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9yb29tcy9ib2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbnRyb2xzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvb2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcm9vbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3Nwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURB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QUMsR0FBRyxFQUFDLElBQUksRUFBQyxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRnBDLGVBQVUsR0FBRyw4Q0FBOEM7SUFHM0QsQ0FBQztJQUNELFlBQVk7UUFDVixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxRQUFRLEdBQTBCLEVBQUUsQ0FBQztRQUN6QyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFB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Q0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsSUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7Z0JBQ25GLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1NBQ0Y7YUFDSTtZQUNILElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDO2dCQUN0RCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7Z0JBQ2xGLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsSUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7Z0JBQ25GLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1NBQ0Y7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUF4Q0Qsb0JBd0NDOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUNELG9GQUFxQztBQUNyQyxvRkFBbUQ7QUFFbkQsbUVBQWtDO0FBRWxDLElBQVksSUFHWDtBQUhELFdBQVksSUFBSTtJQUNkLGlDQUFLO0lBQ0wsaUNBQUs7QUFDUCxDQUFDLEVBSFcsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBR2Y7QUFFRCxJQUFZLFVBT1g7QUFQRCxXQUFZLFVBQVU7SUFDcEIsMkNBQUk7SUFDSiwyQ0FBSTtJQUNKLCtDQUFNO0lBQ04sNkNBQUs7SUFDTCwyQ0FBSTtJQUNKLCtDQUFNO0FBQ1IsQ0FBQyxFQVBXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBT3JCO0FBV0QsTUFBYSxLQUFNLFNBQVEsWUFBZ0I7SUFJekMsWUFBWSxHQUFtQixFQUFDLElBQVMsRUFBQyxJQUFlO1FBQ3ZELEtBQUssRUFBRSxDQUFDO1FBSlYsV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUNiLFVBQUssR0FBRyxHQUFHLENBQUM7UUFDWixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBR2YsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLFFBQVEsRUFBQztnQkFDUCxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLO2dCQUNyQixDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNO2FBQ3ZCO1lBQ0QsSUFBSTtZQUNKLElBQUk7U0FDTDtJQUNILENBQUM7SUFDRCxXQUFXLENBQUMsQ0FBaUI7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM3QyxDQUFDO0lBQ0QsUUFBUTtRQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0QsWUFBWTtRQUNWLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUNELE9BQU8sQ0FBQyxDQUFRO1FBQ2QsSUFBSSxPQUFPLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25FLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBQztZQUNoQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQjthQUNHO1lBQ0YsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBQ0QsY0FBYztRQUNaLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLElBQUksR0FBRyxhQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQVcsQ0FBQztRQUN4QyxJQUFJLFFBQVEsR0FBMEIsRUFBRSxDQUFDO1FBQ3pDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDdEIsSUFBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFDaEYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELElBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7b0JBQ2hFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO29CQUNuQixNQUFNO2lCQUNQO2FBQ0Y7U0FDRjtRQUNELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDdEIsSUFBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFDaEYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELElBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7b0JBQ2hFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO29CQUNuQixNQUFNO2lCQUNQO2FBQ0Y7U0FDRjtRQUNELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDdEIsSUFBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFDaEYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELElBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7b0JBQ2hFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO29CQUNuQixNQUFNO2lCQUNQO2FBQ0Y7U0FDRjtRQUNELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDdEIsSUFBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFDaEYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELElBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7b0JBQ2hFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO29CQUNuQixNQUFNO2lCQUNQO2FBQ0Y7U0FDRjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxjQUFjO1FBQ1osSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxHQUFHLGFBQU8sRUFBRSxDQUFDLE9BQU8sRUFBVyxDQUFDO1FBQ3hDLElBQUksUUFBUSxHQUEwQixFQUFFLENBQUM7UUFDekMsS0FBSSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7Z0JBQ2pFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ25CLE1BQU07YUFDUDtTQUNGO1FBQ0QsS0FBSSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDakMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7Z0JBQ2pFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ25CLE1BQU07YUFDUDtTQUNGO1FBQ0QsS0FBSSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7Z0JBQ2pFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ25CLE1BQU07YUFDUDtTQUNGO1FBQ0QsS0FBSSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDakMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7Z0JBQ2pFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7Z0JBQ25CLE1BQU07YUFDUDtTQUNGO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUNELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFDLEdBQUUsRUFBRTtZQUM1QixJQUFJLElBQUksR0FBRyxhQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBcUIsQ0FBQztZQUNqRCxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDO2dCQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixLQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBQztvQkFFL0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsSUFBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQzt3QkFDaEUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDeEI7aUJBQ0Y7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzdCO2lCQUNHO2dCQUNGLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUM7b0JBQ3JCLEtBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUM7d0JBQzlDLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDOzRCQUM1RCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs0QkFDbEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3lCQUNmO3FCQUNGO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUEzSkQsc0JBMkpDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkxELGtGQUE4QztBQUk5QyxNQUFhLEtBQU0sU0FBUSxhQUFLO0lBRTlCLFlBQVksR0FBbUIsRUFBQyxJQUFTO1FBQ3ZDLEtBQUssQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFGbkMsZUFBVSxHQUFHLDZDQUE2QztJQUcxRCxDQUFDO0lBQ0QsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0Y7QUFSRCxzQkFRQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1pELGtGQUE4QztBQUk5QyxNQUFhLElBQUssU0FBUSxhQUFLO0lBRTdCLFlBQVksR0FBbUIsRUFBQyxJQUFTO1FBQ3ZDLEtBQUssQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLGtCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFGbEMsZUFBVSxHQUFHLDRDQUE0QztJQUd6RCxDQUFDO0lBQ0QsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQy9CLENBQUM7Q0FDRjtBQVJELG9CQVFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWkQsOEVBQTJDO0FBRTNDLHNHQUFpRDtBQUNqRCxnR0FBNkM7QUFDN0MsZ0dBQTZDO0FBRTdDLDhGQUEyQztBQUMzQywyRkFBeUM7QUFDekMsd0ZBQXVDO0FBQ3ZDLHdGQUF1QztBQUV2QyxJQUFZLElBR1g7QUFIRCxXQUFZLElBQUk7SUFDZCxpQ0FBSztJQUNMLGlDQUFLO0FBQ1AsQ0FBQyxFQUhXLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQUdmO0FBZ0JELE1BQWEsS0FBTSxTQUFRLFdBQWlCO0lBRzFDO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFIVixtQkFBYyxHQUFDLDJDQUEyQyxDQUFDO1FBQzNELFlBQU8sR0FBdUIsRUFBRSxDQUFDO1FBRy9CLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCxJQUFJLEVBQUMsSUFBSSxDQUFDLEtBQUs7WUFDZixXQUFXLEVBQUMsRUFBRTtZQUNkLFdBQVcsRUFBQyxFQUFFO1lBQ2QsUUFBUSxFQUFDLFNBQVM7WUFDbEIsT0FBTyxFQUFDLEVBQUU7WUFDVixNQUFNLEVBQUMsRUFBRTtZQUNULFFBQVEsRUFBQyxFQUFFO1NBQ1osQ0FBQztRQUNGLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxXQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksZUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLGVBQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxhQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksV0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLGVBQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksV0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlPLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxXQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksZUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLGVBQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxhQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksV0FBSSxDQUFDLENBQUMsQ0FBQyxF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QUcsSUFBSSxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxTQUFTLElBQUksU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxhQUFhLENBQUMsQ0FBYztRQUMxQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBNkIsQ0FBQztRQUM1QyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBa0IsQ0FBQztRQUNoQyxJQUFJLFNBQVMsR0FBRyxLQUFLLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QyxJQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDO1lBQ2hGLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFDRCxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDO1lBQ2hGLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFDRCxJQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDO1lBQ2hGLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFDRCxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFB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QUFlOztZQUU1QixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBQztnQkFDdkMsT0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztvQkFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUM3QzthQUNGO1lBQ0QsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFDO2dCQUMvQixhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqQztZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUM7WUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixDQUFDO0tBQUE7Q0FDRjtBQW5GRCxvQkFtRkM7QUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxhQUFLLEVBQUUsQ0FBQyxDQUFDO0FBRTlDLFNBQWdCLE9BQU87SUFDckIsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUZELDBCQUVDIiwiZmlsZSI6InZhbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Zhbi50c1wiKTtcbiIsImltcG9ydCB7cGllY2Usc2lkZSxwaWVjZV90eXBlfSBmcm9tIFwiLi9waWVjZVwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSBcIi4uL3Jvb21zL2JvYXJkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmlzaG9wIGV4dGVuZHMgcGllY2V7XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9zcHJpdGVzL2Jpc2hvcC5wbmdcIlxyXG4gIGNvbnN0cnVjdG9yKHBvczpbbnVtYmVyLG51bWJlcl0sc2lkZTpzaWRlKXtcclxuICAgIHN1cGVyKHBvcyxzaWRlLHBpZWNlX3R5cGUuYmlzaG9wKTtcclxuICB9XHJcbiAgZ2V0QXR0YWNraW5nKCk6QXJyYXk8W251bWJlcixudW1iZXJdPntcclxuICAgIHJldHVybiB0aGlzLmF0dGFja0RpYWdvbmFsKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtwaWVjZSxzaWRlLHBpZWNlX3R5cGV9IGZyb20gXCIuL3BpZWNlXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5pbXBvcnQge0JvYXJkfSBmcm9tIFwiLi4vcm9vbXMvYm9hcmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLaW5nIGV4dGVuZHMgcGllY2V7XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9zcHJpdGVzL2tpbmcucG5nXCJcclxuICBjb25zdHJ1Y3Rvcihwb3M6W251bWJlcixudW1iZXJdLHNpZGU6c2lkZSl7XHJcbiAgICBzdXBlcihwb3Msc2lkZSxwaWVjZV90eXBlLmtpbmcpO1xyXG4gIH1cclxuICBnZXRBdHRhY2tpbmcoKTpBcnJheTxbbnVtYmVyLG51bWJlcl0+e1xyXG4gICAgbGV0IGNvcmRzID0gdGhpcy5nZXRDb3JkcygpO1xyXG4gICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpIGFzIEJvYXJkO1xyXG4gICAgbGV0IGF0dGFja2VkOkFycmF5PFtudW1iZXIsbnVtYmVyXT4gPSBbXTtcclxuICAgIGZvcihsZXQgeCA9IC0xO3ggPD0gMTsgeCsrKXtcclxuICAgICAgZm9yKGxldCB5ID0gLTE7eSA8PSAxOyB5Kyspe1xyXG4gICAgICAgIGlmKCh4ICE9PSAwIHx8IHkgIT09IDApICYmIGNvcmRzWzBdICsgeCA+PSAwICYmIGNvcmRzWzBdICsgeCA8IDggJiYgY29yZHNbMV0gKyB5ID49IDAgJiYgY29yZHNbMV0gKyB5IDwgOCl7XHJcbiAgICAgICAgICBsZXQgcGllY2UgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0gKyB4LCBjb3Jkc1sxXSArIHldKTtcclxuICAgICAgICAgIGxldCBzYWZlID0gdHJ1ZTtcclxuICAgICAgICAgIC8qXHJcbiAgICAgICAgICBmb3IobGV0IGEgb2Ygcm9vbS5zdGF0ZS5hdHRhY2tlZCl7XHJcbiAgICAgICAgICAgIGlmKGFbMF0gPT09IGNvcmRzWzBdICYmIGFbMV0gPT09IGNvcmRzWzFdKXtcclxuICAgICAgICAgICAgICBzYWZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgICovXHJcbiAgICAgICAgICBpZihzYWZlICYmIHBpZWNlLmxlbmd0aCA9PT0gMCB8fCBwaWVjZVswXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSArIHgsIGNvcmRzWzFdICsgeV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0dGFja2VkO1xyXG4gIH1cclxufSIsImltcG9ydCB7cGllY2Usc2lkZSxwaWVjZV90eXBlfSBmcm9tIFwiLi9waWVjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEtuaWdodCBleHRlbmRzIHBpZWNle1xyXG4gIHNwcml0ZV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvc3ByaXRlcy9rbmlnaHQucG5nXCJcclxuICBjb25zdHJ1Y3Rvcihwb3M6W251bWJlcixudW1iZXJdLHNpZGU6c2lkZSl7XHJcbiAgICBzdXBlcihwb3Msc2lkZSxwaWVjZV90eXBlLmtuaWdodCk7XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICBsZXQgY29yZHMgPSB0aGlzLmdldENvcmRzKCk7XHJcbiAgICBsZXQgYXR0YWNrZWQ6QXJyYXk8W251bWJlcixudW1iZXJdPiA9IFtdO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyAxLGNvcmRzWzFdICsgMl0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSAxLGNvcmRzWzFdICsgMl0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyAyLGNvcmRzWzFdICsgMV0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyAyLGNvcmRzWzFdIC0gMV0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyAxLGNvcmRzWzFdIC0gMl0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSAxLGNvcmRzWzFdIC0gMl0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSAyLGNvcmRzWzFdICsgMV0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSAyLGNvcmRzWzFdIC0gMV0pO1xyXG4gICAgcmV0dXJuKGF0dGFja2VkLmZpbHRlcigoeCk9PnhbMF0gPj0gMCAmJiB4WzBdIDwgOCAmJiB4WzFdID49IDAgJiYgeFsxXSA8IDgpKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7Qm9hcmQsc2lkZX0gZnJvbSBcIi4uL3Jvb21zL2JvYXJkXCI7XHJcbmltcG9ydCB7cGllY2UscGllY2VfdHlwZX0gZnJvbSBcIi4vcGllY2VcIjtcclxuaW1wb3J0IHsgUXVlZW4gfSBmcm9tIFwiLi9xdWVlblwiO1xyXG5cclxuaW50ZXJmYWNlIG1vdmVfc3RhdGV7XHJcbiAgcG9zaXRpb246e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIG1vdmUgZXh0ZW5kcyBvYmo8bW92ZV9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybD1cImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvc3ByaXRlcy9hdHRhY2tlZC5wbmdcIjtcclxuICBoZWlnaHQgPSAxMDA7XHJcbiAgd2lkdGggPSAxMDA7XHJcbiAgcmVuZGVyID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoYTpbbnVtYmVyLG51bWJlcl0pe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4OmFbMF0gKiB0aGlzLndpZHRoLFxyXG4gICAgICAgIHk6YVsxXSAqIHRoaXMuaGVpZ2h0XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0Q29yZHMoKTpbbnVtYmVyLG51bWJlcl17XHJcbiAgICByZXR1cm4gW3RoaXMuc3RhdGUucG9zaXRpb24ueC8xMDAsdGhpcy5zdGF0ZS5wb3NpdGlvbi55LzEwMF07XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCl7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiTW91c2UxXCIsKCk9PntcclxuICAgICAgaWYodGhpcy5yZW5kZXIpe1xyXG4gICAgICAgIGxldCByb29tID0gZ2V0R2FtZSgpLnN0YXRlLmN1cnJlbnRfcm9vbSBhcyBCb2FyZDtcclxuICAgICAgICBsZXQgcCA9IHJvb20uZ2V0X3BpZWNlKHRoaXMuZ2V0Q29yZHMoKSkgYXMgcGllY2VbXTtcclxuICAgICAgICBsZXQgcyA9IHJvb20uc3RhdGUuc2VsZWN0ZWQ7XHJcbiAgICAgICAgY29uc29sZS5sb2cocm9vbS5zdGF0ZS5zZWxlY3RlZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5nZXRDb3JkcygpKTtcclxuICAgICAgICBpZigodGhpcy5nZXRDb3JkcygpWzFdID09IDcgfHwgdGhpcy5nZXRDb3JkcygpWzFdID09IDApICYmIHMuc3RhdGUudHlwZSA9PT0gcGllY2VfdHlwZS5wYXduKXtcclxuICAgICAgICAgIGxldCBxdSA9IG5ldyBRdWVlbih0aGlzLmdldENvcmRzKCkscy5zdGF0ZS5zaWRlKTtcclxuICAgICAgICAgIHF1LmxvYWQoKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgIHJvb20ub2JqZWN0cy5wdXNoKHF1KTtcclxuICAgICAgICAgICAgcm9vbS5zdGF0ZS5waWVjZXMucHVzaChxdSk7XHJcbiAgICAgICAgICAgIHMuZGVsZXRlKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhyb29tLnN0YXRlLnNlbGVjdGVkLmdldENvcmRzKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0Q29yZHMoKSk7XHJcbiAgICAgICAgaWYocy5zdGF0ZS5zaWRlID09PSBzaWRlLndoaXRlKXtcclxuICAgICAgICAgIHJvb20uc3RhdGUudHVybiA9IHNpZGUuYmxhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocy5zdGF0ZS5zaWRlID09PSBzaWRlLmJsYWNrKXtcclxuICAgICAgICAgIHJvb20uc3RhdGUudHVybiA9IHNpZGUud2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJvb20uc3RhdGUuc2VsZWN0ZWQubW92ZXRvQ29yZHModGhpcy5nZXRDb3JkcygpKTtcclxuICAgICAgICByb29tLmNsZWFyX2F0dGFja2VkKCk7XHJcbiAgICAgICAgcm9vbS5zdGF0ZS5hdHRhY2tlZCA9IFtdO1xyXG4gICAgICAgIHJvb20uc3RhdGUuc2VsZWN0ZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59IiwiaW1wb3J0IHtwaWVjZSxzaWRlLHBpZWNlX3R5cGV9IGZyb20gXCIuL3BpZWNlXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5pbXBvcnQge0JvYXJkfSBmcm9tIFwiLi4vcm9vbXMvYm9hcmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXduIGV4dGVuZHMgcGllY2V7XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9zcHJpdGVzL3Bhd24ucG5nXCJcclxuICBjb25zdHJ1Y3Rvcihwb3M6W251bWJlcixudW1iZXJdLHNpZGU6c2lkZSl7XHJcbiAgICBzdXBlcihwb3Msc2lkZSxwaWVjZV90eXBlLnBhd24pO1xyXG4gIH1cclxuICBnZXRBdHRhY2tpbmcoKTpBcnJheTxbbnVtYmVyLG51bWJlcl0+e1xyXG4gICAgbGV0IGF0dGFja2VkOkFycmF5PFtudW1iZXIsbnVtYmVyXT4gPSBbXTtcclxuICAgIGxldCBjb3JkcyA9IHRoaXMuZ2V0Q29yZHMoKTtcclxuICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKSBhcyBCb2FyZDtcclxuICAgIGxldCBsZWZ0O1xyXG4gICAgbGV0IHJpZ2h0O1xyXG4gICAgbGV0IGZvcndhcmQ7XHJcbiAgICBpZih0aGlzLnN0YXRlLnNpZGUgPT0gc2lkZS53aGl0ZSl7XHJcbiAgICAgIGlmKHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSxjb3Jkc1sxXSArIDFdKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdLGNvcmRzWzFdICsgMV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBsZWZ0ID0gcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdLSAxLGNvcmRzWzFdICsgMV0pO1xyXG4gICAgICBsZXQgcmlnaHQgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0rIDEsY29yZHNbMV0gKyAxXSk7XHJcbiAgICAgIGlmKChjb3Jkc1swXSAtIDEgPj0gMCkgJiYgbGVmdC5sZW5ndGggPiAwICYmIGxlZnRbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSAtIDEsY29yZHNbMV0gKyAxXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYoKGNvcmRzWzBdICsgMSA8IDgpICYmIHJpZ2h0Lmxlbmd0aCA+IDAgJiYgcmlnaHRbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSArIDEsY29yZHNbMV0gKyAxXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBpZihyb29tLmdldF9waWVjZShbY29yZHNbMF0sY29yZHNbMV0gLSAxXSkubGVuZ3RoID09PSAwKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSxjb3Jkc1sxXSAtIDFdKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgbGVmdCA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSAtIDEsY29yZHNbMV0gLSAxXSk7XHJcbiAgICAgIGxldCByaWdodCA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSsgMSxjb3Jkc1sxXSAtIDFdKTtcclxuICAgICAgaWYoKGNvcmRzWzBdIC0gMSA+PSAwKSAmJiBsZWZ0Lmxlbmd0aCA+IDAgJiYgbGVmdFswXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdIC0gMSxjb3Jkc1sxXSAtIDFdKTtcclxuICAgICAgfVxyXG4gICAgICBpZigoY29yZHNbMF0gKyAxIDwgOCkgJiYgcmlnaHQubGVuZ3RoID4gMCAmJiByaWdodFswXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdICsgMSxjb3Jkc1sxXSAtIDFdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0dGFja2VkO1xyXG4gIH1cclxufSIsImltcG9ydCB7b2JqfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge3Nwcml0ZSxzcHJpdGVfZ2VufSBmcm9tIFwiLi4vLi4vbGliL3Nwcml0ZVwiO1xyXG5pbXBvcnQge2JvYXJkX3N0YXRlLCBCb2FyZH0gZnJvbSBcIi4uL3Jvb21zL2JvYXJkXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5cclxuZXhwb3J0IGVudW0gc2lkZXtcclxuICB3aGl0ZSxcclxuICBibGFja1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBwaWVjZV90eXBle1xyXG4gIHBhd24sXHJcbiAgcm9vayxcclxuICBiaXNob3AsXHJcbiAgcXVlZW4sXHJcbiAga2luZyxcclxuICBrbmlnaHRcclxufVxyXG5cclxuaW50ZXJmYWNlIHBpZWNlX3N0YXRle1xyXG4gIHBvc2l0aW9uOntcclxuICAgIHg6bnVtYmVyLFxyXG4gICAgeTpudW1iZXJcclxuICB9LFxyXG4gIHNpZGU6c2lkZSxcclxuICB0eXBlOnBpZWNlX3R5cGVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHBpZWNlIGV4dGVuZHMgb2JqPHBpZWNlX3N0YXRlPntcclxuICBoZWlnaHQgPSAxMDA7XHJcbiAgd2lkdGggPSAxMDA7XHJcbiAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcihwb3M6W251bWJlcixudW1iZXJdLHNpZGU6c2lkZSx0eXBlOnBpZWNlX3R5cGUpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4OnBvc1swXSAqIHRoaXMud2lkdGgsXHJcbiAgICAgICAgeTpwb3NbMV0gKiB0aGlzLmhlaWdodFxyXG4gICAgICB9LFxyXG4gICAgICBzaWRlLFxyXG4gICAgICB0eXBlXHJcbiAgICB9XHJcbiAgfVxyXG4gIG1vdmV0b0NvcmRzKGE6W251bWJlcixudW1iZXJdKXtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueCA9IGFbMF0gKiB0aGlzLndpZHRoO1xyXG4gICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0gYVsxXSAqIHRoaXMuaGVpZ2h0O1xyXG4gIH1cclxuICBnZXRDb3JkcygpOltudW1iZXIsbnVtYmVyXXtcclxuICAgIHJldHVybiBbdGhpcy5zdGF0ZS5wb3NpdGlvbi54LzEwMCx0aGlzLnN0YXRlLnBvc2l0aW9uLnkvMTAwXTtcclxuICB9XHJcbiAgZ2V0QXR0YWNraW5nKCk6QXJyYXk8W251bWJlcixudW1iZXJdPntcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcbiAgcmVuZGVyZih0Om51bWJlcil7XHJcbiAgICBsZXQgc3ByaXRlcyA9IHNwcml0ZV9nZW4odGhpcy5zcHJpdGVfc2hlZXQsdGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICBpZih0aGlzLnN0YXRlLnNpZGUgPT09IHNpZGUud2hpdGUpe1xyXG4gICAgICByZXR1cm4gc3ByaXRlc1swXTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHJldHVybiBzcHJpdGVzWzFdO1xyXG4gICAgfVxyXG4gIH1cclxuICBhdHRhY2tEaWFnb25hbCgpe1xyXG4gICAgbGV0IGNvcmRzID0gdGhpcy5nZXRDb3JkcygpO1xyXG4gICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpIGFzIEJvYXJkO1xyXG4gICAgbGV0IGF0dGFja2VkOkFycmF5PFtudW1iZXIsbnVtYmVyXT4gPSBbXTtcclxuICAgIGZvcihsZXQgYSA9IDE7YSA8IDg7YSsrKXtcclxuICAgICAgaWYoY29yZHNbMF0gLSBhID49IDAgJiYgY29yZHNbMF0gLSBhIDwgOCAmJiBjb3Jkc1sxXSAtIGEgPj0gMCAmJiBjb3Jkc1sxXSAtIGEgPCA4KXtcclxuICAgICAgICBsZXQgcGllY2VzID0gcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdIC0gYSxjb3Jkc1sxXSAtIGFdKTtcclxuICAgICAgICBpZihwaWVjZXMubGVuZ3RoID09IDAgfHwgcGllY2VzWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSAtIGEsY29yZHNbMV0gLSBhXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSAgXHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGEgPSAxO2EgPCA4O2ErKyl7XHJcbiAgICAgIGlmKGNvcmRzWzBdIC0gYSA+PSAwICYmIGNvcmRzWzBdIC0gYSA8IDggJiYgY29yZHNbMV0gKyBhID49IDAgJiYgY29yZHNbMV0gKyBhIDwgOCl7XHJcbiAgICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSAtIGEsY29yZHNbMV0gKyBhXSk7XHJcbiAgICAgICAgaWYocGllY2VzLmxlbmd0aCA9PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSBhLGNvcmRzWzFdICsgYV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH0gIFxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBhID0gMTthIDwgODthKyspe1xyXG4gICAgICBpZihjb3Jkc1swXSArIGEgPj0gMCAmJiBjb3Jkc1swXSArIGEgPCA4ICYmIGNvcmRzWzFdICsgYSA+PSAwICYmIGNvcmRzWzFdICsgYSA8IDgpe1xyXG4gICAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0gKyBhLGNvcmRzWzFdICsgYV0pO1xyXG4gICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdICsgYSxjb3Jkc1sxXSArIGFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGllY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfSAgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZvcihsZXQgYSA9IDE7YSA8IDg7YSsrKXtcclxuICAgICAgaWYoY29yZHNbMF0gKyBhID49IDAgJiYgY29yZHNbMF0gKyBhIDwgOCAmJiBjb3Jkc1sxXSAtIGEgPj0gMCAmJiBjb3Jkc1sxXSAtIGEgPCA4KXtcclxuICAgICAgICBsZXQgcGllY2VzID0gcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdICsgYSxjb3Jkc1sxXSAtIGFdKTtcclxuICAgICAgICBpZihwaWVjZXMubGVuZ3RoID09IDAgfHwgcGllY2VzWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSArIGEsY29yZHNbMV0gLSBhXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gIFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXR0YWNrZWQ7XHJcbiAgfVxyXG4gIGF0dGFja0NhcmRpbmFsKCl7XHJcbiAgICBsZXQgY29yZHMgPSB0aGlzLmdldENvcmRzKCk7XHJcbiAgICBsZXQgcm9vbSA9IGdldEdhbWUoKS5nZXRSb29tKCkgYXMgQm9hcmQ7XHJcbiAgICBsZXQgYXR0YWNrZWQ6QXJyYXk8W251bWJlcixudW1iZXJdPiA9IFtdO1xyXG4gICAgZm9yKGxldCBhID0gY29yZHNbMF0gLSAxO2EgPj0gMDthLS0pe1xyXG4gICAgICBsZXQgcGllY2VzID0gcm9vbS5nZXRfcGllY2UoW2EsY29yZHNbMV1dKTtcclxuICAgICAgaWYocGllY2VzLmxlbmd0aCA9PT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKFthLGNvcmRzWzFdXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYocGllY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGEgPSBjb3Jkc1swXSArIDE7YSA8IDg7YSsrKXtcclxuICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFthLGNvcmRzWzFdXSk7XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT09IDAgfHwgcGllY2VzWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChbYSxjb3Jkc1sxXV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBhID0gY29yZHNbMV0gLSAxO2EgPj0gMDthLS0pe1xyXG4gICAgICBsZXQgcGllY2VzID0gcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdLGFdKTtcclxuICAgICAgaWYocGllY2VzLmxlbmd0aCA9PT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSxhXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYocGllY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGEgPSBjb3Jkc1sxXSArIDE7YSA8IDg7YSsrKXtcclxuICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSxhXSk7XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT09IDAgfHwgcGllY2VzWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0sYV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0dGFja2VkO1xyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpe1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIk1vdXNlMVwiLCgpPT57XHJcbiAgICAgIGxldCByb29tID0gZ2V0R2FtZSgpLnN0YXRlLmN1cnJlbnRfcm9vbSBhcyBCb2FyZDtcclxuICAgICAgaWYocm9vbS5zdGF0ZS50dXJuID09PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgIHJvb20uc3RhdGUuc2VsZWN0ZWQgPSB0aGlzO1xyXG4gICAgICAgIHJvb20uY2xlYXJfYXR0YWNrZWQoKTtcclxuICAgICAgICBsZXQgdmFsaWRfYXR0YWNrZWQgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGcgb2YgdGhpcy5nZXRBdHRhY2tpbmcoKSl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShnKTtcclxuICAgICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICAgICAgdmFsaWRfYXR0YWNrZWQucHVzaChnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcm9vbS5zdGF0ZS5hdHRhY2tlZCA9IHZhbGlkX2F0dGFja2VkO1xyXG4gICAgICAgIHJvb20uYXR0YWNrKHZhbGlkX2F0dGFja2VkKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGlmKHJvb20uc3RhdGUuc2VsZWN0ZWQpe1xyXG4gICAgICAgICAgZm9yKGxldCBnIG9mIHJvb20uc3RhdGUuc2VsZWN0ZWQuZ2V0QXR0YWNraW5nKCkpe1xyXG4gICAgICAgICAgICBpZihnWzBdID09PSB0aGlzLmdldENvcmRzKClbMF0gJiYgZ1sxXSA9PT0gdGhpcy5nZXRDb3JkcygpWzFdKXtcclxuICAgICAgICAgICAgICByb29tLnN0YXRlLnR1cm4gPSB0aGlzLnN0YXRlLnNpZGU7XHJcbiAgICAgICAgICAgICAgdGhpcy5kZWxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59IiwiaW1wb3J0IHtwaWVjZSxzaWRlLHBpZWNlX3R5cGV9IGZyb20gXCIuL3BpZWNlXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5pbXBvcnQge0JvYXJkfSBmcm9tIFwiLi4vcm9vbXMvYm9hcmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVlbiBleHRlbmRzIHBpZWNle1xyXG4gIHNwcml0ZV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvc3ByaXRlcy9xdWVlbi5wbmdcIlxyXG4gIGNvbnN0cnVjdG9yKHBvczpbbnVtYmVyLG51bWJlcl0sc2lkZTpzaWRlKXtcclxuICAgIHN1cGVyKHBvcyxzaWRlLHBpZWNlX3R5cGUucXVlZW4pO1xyXG4gIH1cclxuICBnZXRBdHRhY2tpbmcoKTpBcnJheTxbbnVtYmVyLG51bWJlcl0+e1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0YWNrRGlhZ29uYWwoKS5jb25jYXQodGhpcy5hdHRhY2tDYXJkaW5hbCgpKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge3BpZWNlLHNpZGUscGllY2VfdHlwZX0gZnJvbSBcIi4vcGllY2VcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gXCIuLi9yb29tcy9ib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvb2sgZXh0ZW5kcyBwaWVjZXtcclxuICBzcHJpdGVfdXJsID0gXCJodHRwOi8vbG9jYWxob3N0L3NyYy9nYW1lL3Nwcml0ZXMvcm9vay5wbmdcIlxyXG4gIGNvbnN0cnVjdG9yKHBvczpbbnVtYmVyLG51bWJlcl0sc2lkZTpzaWRlKXtcclxuICAgIHN1cGVyKHBvcyxzaWRlLHBpZWNlX3R5cGUucm9vayk7XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2tDYXJkaW5hbCgpO1xyXG4gIH1cclxufSIsImltcG9ydCB7cm9vbSxyb29tX2l9IGZyb20gXCIuLi8uLi9saWIvcm9vbVwiO1xyXG5pbXBvcnQge3BpZWNlfSBmcm9tIFwiLi4vLi4vZ2FtZS9vYmplY3RzL3BpZWNlXCI7XHJcbmltcG9ydCB7S25pZ2h0fSBmcm9tIFwiLi4vLi4vZ2FtZS9vYmplY3RzL2tuaWdodFwiO1xyXG5pbXBvcnQge1Jvb2t9IGZyb20gXCIuLi8uLi9nYW1lL29iamVjdHMvcm9va1wiO1xyXG5pbXBvcnQge21vdmV9IGZyb20gXCIuLi8uLi9nYW1lL29iamVjdHMvbW92ZVwiO1xyXG5pbXBvcnQge29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHsgQmlzaG9wIH0gZnJvbSBcIi4uL29iamVjdHMvYmlzaG9wXCI7XHJcbmltcG9ydCB7IFF1ZWVuIH0gZnJvbSBcIi4uL29iamVjdHMvcXVlZW5cIjtcclxuaW1wb3J0IHsgS2luZyB9IGZyb20gXCIuLi9vYmplY3RzL2tpbmdcIjtcclxuaW1wb3J0IHsgUGF3biB9IGZyb20gXCIuLi9vYmplY3RzL3Bhd25cIjtcclxuXHJcbmV4cG9ydCBlbnVtIHNpZGV7XHJcbiAgd2hpdGUsXHJcbiAgYmxhY2tcclxufVxyXG5cclxuaW50ZXJmYWNlIHNwYWNlX3N0YXRle1xyXG4gIGVucGFzc2VudDpib29sZWFuLFxyXG4gIGF0dGFja2VkOmJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBib2FyZF9zdGF0ZXtcclxuICB0dXJuOnNpZGUsXHJcbiAgd2hpdGVfYm9hcmQ6QXJyYXk8QXJyYXk8c3BhY2Vfc3RhdGU+PixcclxuICBibGFja19ib2FyZDpBcnJheTxBcnJheTxzcGFjZV9zdGF0ZT4+XHJcbiAgc2VsZWN0ZWQ6cGllY2UsXHJcbiAgc3F1YXJlczpBcnJheTxBcnJheTxtb3ZlPj4sXHJcbiAgcGllY2VzOkFycmF5PHBpZWNlPixcclxuICBhdHRhY2tlZDpBcnJheTxbbnVtYmVyLG51bWJlcl0+XHJcbn1cclxuZXhwb3J0IGNsYXNzIEJvYXJkIGV4dGVuZHMgcm9vbTxib2FyZF9zdGF0ZT57XHJcbiAgYmFja2dyb3VuZF91cmw9XCJodHRwOi8vbG9jYWxob3N0L3NyYy9nYW1lL3Jvb21zL2JvYXJkLnBuZ1wiO1xyXG4gIG9iamVjdHM6QXJyYXk8b2JqPHVua25vd24+PiA9IFtdO1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgdHVybjpzaWRlLndoaXRlLFxyXG4gICAgICB3aGl0ZV9ib2FyZDpbXSxcclxuICAgICAgYmxhY2tfYm9hcmQ6W10sXHJcbiAgICAgIHNlbGVjdGVkOnVuZGVmaW5lZCxcclxuICAgICAgc3F1YXJlczpbXSxcclxuICAgICAgcGllY2VzOltdLFxyXG4gICAgICBhdHRhY2tlZDpbXVxyXG4gICAgfTtcclxuICAgIGxldCByb3cyID0gW25ldyBSb29rKFswLDddLHNpZGUuYmxhY2spLG5ldyBLbmlnaHQoWzEsN10sc2lkZS5ibGFjayksbmV3IEJpc2hvcChbMiw3XSxzaWRlLmJsYWNrKSxuZXcgUXVlZW4oWzMsN10sc2lkZS5ibGFjayksbmV3IEtpbmcoWzQsN10sc2lkZS5ibGFjayksbmV3IEJpc2hvcChbNSw3XSxzaWRlLmJsYWNrKSxuZXcgS25pZ2h0KFs2LDddLHNpZGUuYmxhY2spLG5ldyBSb29rKFs3LDddLHNpZGUuYmxhY2spXTtcclxuICAgIGxldCByb3c3ID0gW25ldyBSb29rKFswLDBdLHNpZGUud2hpdGUpLG5ldyBLbmlnaHQoWzEsMF0sc2lkZS53aGl0ZSksbmV3IEJpc2hvcChbMiwwXSxzaWRlLndoaXRlKSxuZXcgUXVlZW4oWzMsMF0sc2lkZS53aGl0ZSksbmV3IEtpbmcoWzQsMF0sc2lkZS53aGl0ZSksbmV3IEJpc2hvcChbNSwwXSxzaWRlLndoaXRlKSxuZXcgS25pZ2h0KFs2LDBdLHNpZGUud2hpdGUpLG5ldyBSb29rKFs3LDBdLHNpZGUud2hpdGUpXTtcclxuICAgIGZvcihsZXQgYSA9IDA7YSA8IHJvdzcubGVuZ3RoO2ErKyl7XHJcbiAgICAgIHRoaXMub2JqZWN0cy5wdXNoKHJvdzdbYV0pO1xyXG4gICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgUGF3bihbYSwxXSxzaWRlLndoaXRlKSk7XHJcbiAgICAgIHRoaXMub2JqZWN0cy5wdXNoKHJvdzJbYV0pO1xyXG4gICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgUGF3bihbYSw2XSxzaWRlLmJsYWNrKSk7XHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGEgPSAwO2E8ODthKyspe1xyXG4gICAgICBsZXQgbXZfcm93OkFycmF5PG1vdmU+ID0gW107XHJcbiAgICAgIGZvcihsZXQgYiA9IDA7Yjw4O2IrKyl7XHJcbiAgICAgICAgbGV0IGQgPSBhO1xyXG4gICAgICAgICgoKT0+IHtcclxuICAgICAgICAgIGxldCBtb3ZlX28gPSBuZXcgbW92ZShbYSxiXSk7XHJcbiAgICAgICAgICBtdl9yb3cucHVzaChtb3ZlX28pO1xyXG4gICAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobW92ZV9vKTtcclxuICAgICAgICB9KSgpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdGF0ZS5zcXVhcmVzLnB1c2gobXZfcm93KTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUuYmxhY2tfYm9hcmQgPSB0aGlzLmJsYW5rX2JvYXJkKCk7XHJcbiAgICB0aGlzLnN0YXRlLndoaXRlX2JvYXJkID0gdGhpcy5ibGFua19ib2FyZCgpO1xyXG4gIH1cclxuICBibGFua19ib2FyZCgpe1xyXG4gICAgbGV0IGJvYXJkID0gW107XHJcbiAgICBmb3IobGV0IGEgPSAwO2E8ODthKyspe1xyXG4gICAgICBsZXQgcm93ID0gW107XHJcbiAgICAgIGZvcihsZXQgYiA9IDA7Yjw4O2IrKyl7XHJcbiAgICAgICAgcm93LnB1c2goe1xyXG4gICAgICAgICAgZW5wYXNzZW50OmZhbHNlLFxyXG4gICAgICAgICAgYXR0YWNrZWQ6ZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBib2FyZC5wdXNoKHJvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG4gIGdldF9waWVjZShhOltudW1iZXIsbnVtYmVyXSk6QXJyYXk8cGllY2U+e1xyXG4gICAgcmV0dXJuICh0aGlzLmNoZWNrX2NvbGxpc2lvbnMoe1xyXG4gICAgICB4OmFbMF0gKiAxMDAsXHJcbiAgICAgIHk6YVsxXSAqIDEwMCxcclxuICAgICAgaGVpZ2h0OjEwMCxcclxuICAgICAgd2lkdGg6MTAwXHJcbiAgICB9KSBhcyBBcnJheTxwaWVjZT4pO1xyXG4gIH1cclxuICBjbGVhcl9hdHRhY2tlZCgpe1xyXG4gICAgZm9yKGxldCBhIG9mIHRoaXMuc3RhdGUuYXR0YWNrZWQpe1xyXG4gICAgICB0aGlzLnN0YXRlLnNxdWFyZXNbYVswXV1bYVsxXV0ucmVuZGVyID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGF0dGFjayh4OkFycmF5PFtudW1iZXIsbnVtYmVyXT4pe1xyXG4gICAgZm9yKGxldCBhIG9mIHgpe1xyXG4gICAgICB0aGlzLnN0YXRlLnNxdWFyZXNbYVswXV1bYVsxXV0ucmVuZGVyID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgYXN5bmMgc3RhdGVmKGE6bnVtYmVyKXtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMub2JqZWN0cyk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtvYmosZ2V0SWR9IGZyb20gXCIuLi9saWIvb2JqZWN0XCI7XHJcbmltcG9ydCB7b2JqX3N0YXRlfSBmcm9tIFwiLi4vbGliL3N0YXRlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGNvbGxpc2lvbl9ib3h7XHJcbiAgeDpudW1iZXI7XHJcbiAgeTpudW1iZXI7XHJcbiAgd2lkdGg6bnVtYmVyO1xyXG4gIGhlaWdodDpudW1iZXI7XHJcbn1cclxuXHJcbmVudW0gZGlyZWN0aW9ue1xyXG4gIGxlZnQsXHJcbiAgcmlnaHQsXHJcbiAgdXAsXHJcbiAgZG93blxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tfYWxsX29iamVjdHMoYzogY29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sZXhlbXB0aW9uOnN0cmluZyk6QXJyYXk8b2JqPHVua25vd24+PntcclxuICBsZXQgbWF0Y2hlZCA9IFtdO1xyXG4gIGZvciAobGV0IGEgb2Ygb2Jqcykge1xyXG4gICAgaWYgKGEuaWQgIT09IGV4ZW1wdGlvbiAmJiBhLmNvbGxpZGVzX3dpdGhfYm94KGMpKSB7XHJcbiAgICAgIG1hdGNoZWQucHVzaChhKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG1hdGNoZWRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrX2FsbF9jb2xsaXNpb25zKGM6IGNvbGxpc2lvbl9ib3gsb2JqczpBcnJheTxvYmo8dW5rbm93bj4+LGV4ZW1wdGlvbjpzdHJpbmcpOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgbGV0IG1hdGNoZWQgPSBbXTtcclxuICBmb3IgKGxldCBhIG9mIG9ianMpIHtcclxuICAgIGlmIChhLmlkICE9PSBleGVtcHRpb24gJiYgYS5jb2xsaXNpb24gJiYgYS5jb2xsaWRlc193aXRoX2JveChjKSkge1xyXG4gICAgICBtYXRjaGVkLnB1c2goYSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBtYXRjaGVkXHJcbn1cclxuLy9DaGVja3MgdXAgdG8gdGhlIGZpcnN0IGNvbGxpc2lvblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tfY29sbGlzaW9ucyhjOiBjb2xsaXNpb25fYm94LCBvYmpzOiBBcnJheTxvYmo8dW5rbm93bj4+LCBleGVtcHRpb246c3RyaW5nKSB7XHJcbiAgZm9yIChsZXQgYSBvZiBvYmpzKSB7XHJcbiAgICBpZiAoYS5pZCAhPT0gZXhlbXB0aW9uICYmIGEuY29sbGlzaW9uICYmIGEuY29sbGlkZXNfd2l0aF9ib3goYykpIHtcclxuICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlbG9jaXR5X21heCh2ZWxvY2l0eTpudW1iZXIsYm94OmNvbGxpc2lvbl9ib3gsb2JqczpBcnJheTxvYmo8dW5rbm93bj4+LCBleGVtcHRpb246c3RyaW5nLGRpcjpkaXJlY3Rpb24pe1xyXG4gIGxldCBjb2xsaXNpb24gPSBjaGVja19jb2xsaXNpb25zKGJveCwgb2JqcywgZXhlbXB0aW9uKTtcclxuICBpZihjb2xsaXNpb24gPT0gdW5kZWZpbmVkKXtcclxuICAgIHJldHVybiB2ZWxvY2l0eTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGxldCBjb2xsaWRlciA9IGNvbGxpc2lvbjtcclxuICAgIGxldCBvcmlnaW4gPSBnZXRJZChvYmpzLGV4ZW1wdGlvbik7XHJcbiAgICBsZXQgb3JpZ19zdCA9IG9yaWdpbi5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgY29sbGlkZXJfc3QgPSBjb2xsaWRlci5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICBpZihkaXIgPT0gZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICByZXR1cm4gb3JpZ19zdC5wb3NpdGlvbi54IC0gKGNvbGxpZGVyX3N0LnBvc2l0aW9uLnggKyBjb2xsaWRlci53aWR0aCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGRpciA9PSBkaXJlY3Rpb24ucmlnaHQpe1xyXG4gICAgICByZXR1cm4gY29sbGlkZXJfc3QucG9zaXRpb24ueCAtIChvcmlnX3N0LnBvc2l0aW9uLnggKyBvcmlnaW4ud2lkdGgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLmRvd24pe1xyXG4gICAgICByZXR1cm4gb3JpZ19zdC5wb3NpdGlvbi55IC0gKGNvbGxpZGVyX3N0LnBvc2l0aW9uLnkgKyBjb2xsaWRlci5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLnVwKXtcclxuICAgICAgcmV0dXJuIGNvbGxpZGVyX3N0LnBvc2l0aW9uLnkgLSAob3JpZ19zdC5wb3NpdGlvbi55ICsgb3JpZ2luLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrKG9iamVjdDpvYmo8dW5rbm93bj4sbGlzdDpBcnJheTxvYmo8dW5rbm93bj4+KSB7XHJcbiAgbGV0IG9iID0gb2JqZWN0O1xyXG4gIGxldCBzdCA9IG9iamVjdC5nZXRTdGF0ZSgpIGFzIG9ial9zdGF0ZTtcclxuICBsZXQgeF92ZWwgPSBzdC52ZWxvY2l0eS54O1xyXG4gIGxldCB5X3ZlbCA9IHN0LnZlbG9jaXR5Lnk7XHJcbiAgaWYgKHhfdmVsID4gMCkge1xyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgeDogc3QucG9zaXRpb24ueCArIG9iLndpZHRoLFxyXG4gICAgICB5OiBzdC5wb3NpdGlvbi55LFxyXG4gICAgICB3aWR0aDogeF92ZWwsXHJcbiAgICAgIGhlaWdodDogb2IuaGVpZ2h0XHJcbiAgICB9O1xyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS54LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi5yaWdodCk7XHJcbiAgICBpZih2ZWwgPiAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueCArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS54ID0gMDsgIFxyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIGlmICh4X3ZlbCA8IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHhfdmVsICsgc3QucG9zaXRpb24ueCxcclxuICAgICAgeTogc3QucG9zaXRpb24ueSxcclxuICAgICAgd2lkdGg6IC0xICogeF92ZWwsXHJcbiAgICAgIGhlaWdodDogb2IuaGVpZ2h0XHJcbiAgICB9XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LngsYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLmxlZnQpO1xyXG4gICAgaWYodmVsIDwgMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnggKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueCA9IDA7IFxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoeV92ZWwgPiAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54LFxyXG4gICAgICB5OiBzdC5wb3NpdGlvbi55ICsgb2IuaGVpZ2h0LFxyXG4gICAgICB3aWR0aDogb2Iud2lkdGgsXHJcbiAgICAgIGhlaWdodDogeV92ZWxcclxuICAgIH1cclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueSxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24udXApO1xyXG4gICAgaWYodmVsID4gMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnkgKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueSA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGVsc2UgaWYgKHlfdmVsIDwgMCkge1xyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgeDogc3QucG9zaXRpb24ueCxcclxuICAgICAgeTogeV92ZWwgKyBzdC5wb3NpdGlvbi55LFxyXG4gICAgICB3aWR0aDogb2Iud2lkdGgsXHJcbiAgICAgIGhlaWdodDogLTEgKiB5X3ZlbFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS55LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi5kb3duKTtcclxuICAgIGlmKHZlbCA8IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi55ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7R2V0U2NyZWVuRGltZW5zaW9ucyxHZXRWaWV3cG9ydERpbWVuc2lvbnMsZ2V0R2FtZX0gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQgeyBjb2xsaXNpb25fYm94IH0gZnJvbSBcIi4vY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7b2JqfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuXHJcbmludGVyZmFjZSBtb3VzZVBvc3tcclxuICB4Om51bWJlcixcclxuICB5Om51bWJlcixcclxuICBsYXN0OntcclxuICAgIHg6bnVtYmVyLFxyXG4gICAgeTpudW1iZXJcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBjb250cm9sX2Z1bmN7XHJcbiAgKCk6dm9pZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgbW91c2VCaW5kc3tcclxuICBba2V5OnN0cmluZ106IEFycmF5PFtjb250cm9sX2Z1bmMsb2JqPHVua25vd24+XT5cclxufVxyXG5cclxuaW50ZXJmYWNlIGtleUJpbmRze1xyXG4gIFtrZXk6c3RyaW5nXTogQXJyYXk8Y29udHJvbF9mdW5jPlxyXG59XHJcbmxldCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKTtcclxudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKT0+e1xyXG4gIGxldCBtb3VzZSA9IFBvbGxfTW91c2UoKTtcclxuICBsZXQgYm94OmNvbGxpc2lvbl9ib3ggPSB7XHJcbiAgICB4Om1vdXNlLngsXHJcbiAgICB5Om1vdXNlLnksXHJcbiAgICBoZWlnaHQ6MSxcclxuICAgIHdpZHRoOjFcclxuICB9O1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yKGxldCBhID0gMDthIDwgZC5sZW5ndGg7YSsrKXtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZihzZWxlY3RlZC50eXBlID09PSBidHlwZS5tb3VzZSAmJiBzZWxlY3RlZC5rZXkgPT09IFwiTW91c2UxXCIpe1xyXG4gICAgICBpZihzZWxlY3RlZC5vYmogIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYoc2VsZWN0ZWQub2JqLmNvbGxpZGVzX3dpdGhfYm94KGJveCkpe1xyXG4gICAgICAgICAgc2VsZWN0ZWQuZnVuY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBzZWxlY3RlZC5mdW5jdGlvbigpOyAgICAgICAgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9ICBcclxufSlcclxuXHJcblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XHJcbiAgbGV0IGQgPSBbLi4uYWxsX2JpbmRzXTtcclxuICBmb3IgKGxldCBhID0gMDsgYSA8IGFsbF9iaW5kcy5sZW5ndGg7IGErKykge1xyXG4gICAgbGV0IHNlbGVjdGVkID0gZFthXTtcclxuICAgIGlmIChzZWxlY3RlZC50eXBlID09PSBidHlwZS5rZXlib2FyZCAmJiBzZWxlY3RlZC5rZXkgPT09IGUuY29kZSkge1xyXG4gICAgICBzZWxlY3RlZC5mdW5jdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxufSlcclxubGV0IHRyYWNrZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKTtcclxudHJhY2tlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChlKSA9PiB7XHJcbiAgdmFyIHJlY3QgPSAoZS50YXJnZXQgYXMgSFRNTENhbnZhc0VsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDtcclxuICBcclxuICBsYXN0X3ggPSB4O1xyXG4gIGxhc3RfeSA9IHk7XHJcbiAgeCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDsgLy94IHBvc2l0aW9uIHdpdGhpbiB0aGUgZWxlbWVudC5cclxuICB5ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7ICAvL3kgcG9zaXRpb24gd2l0aGluIHRoZSBlbGVtZW50LlxyXG5cclxufSlcclxuXHJcbmVudW0gYnR5cGV7XHJcbiAgbW91c2UsXHJcbiAga2V5Ym9hcmRcclxufVxyXG5cclxuaW50ZXJmYWNlIGJpbmR7XHJcbiAga2V5OnN0cmluZyxcclxuICB0eXBlOmJ0eXBlLFxyXG4gIGlkOm51bWJlcixcclxuICBmdW5jdGlvbjpjb250cm9sX2Z1bmMsXHJcbiAgb2JqPzpvYmo8dW5rbm93bj5cclxufVxyXG5cclxubGV0IHggPSAwO1xyXG5sZXQgeSA9IDA7XHJcbmxldCBsYXN0X3ggPSAwO1xyXG5sZXQgbGFzdF95ID0gMDtcclxubGV0IGJpbmRzOmtleUJpbmRzID0ge307XHJcbmxldCBtb3VzZUJpbmRzOm1vdXNlQmluZHMgPSB7fTtcclxubGV0IGJpbmRfY291bnQgPSAwO1xyXG5cclxubGV0IGFsbF9iaW5kczpBcnJheTxiaW5kPiA9IFtdXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBvbGxfTW91c2UoKTptb3VzZVBvc3tcclxuICBsZXQgaGVpZ2h0ID0gR2V0Vmlld3BvcnREaW1lbnNpb25zKCkuaGVpZ2h0O1xyXG4gIGxldCBjYW52YXMgPSBnZXRHYW1lKCkuc3RhdGUuY2FudmFzO1xyXG4gIGxldCB3cmF0aW8gPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcykud2lkdGgpL0dldFZpZXdwb3J0RGltZW5zaW9ucygpLndpZHRoO1xyXG4gIGxldCB2cmF0aW8gPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcykuaGVpZ2h0KS9HZXRWaWV3cG9ydERpbWVuc2lvbnMoKS5oZWlnaHQ7XHJcbiAgbGV0IGNhbWVyYSA9IGdldEdhbWUoKS5zdGF0ZS5jYW1lcmE7XHJcbiAgcmV0dXJuICh7XHJcbiAgICB4OiAoeC93cmF0aW8vY2FtZXJhLnN0YXRlLnNjYWxpbmcgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCkgLFxyXG4gICAgeTogKChoZWlnaHQgLSB5L3ZyYXRpbykvY2FtZXJhLnN0YXRlLnNjYWxpbmcgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueSksXHJcbiAgICBsYXN0OntcclxuICAgICAgeDogKHgvd3JhdGlvL2NhbWVyYS5zdGF0ZS5zY2FsaW5nICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLngpLFxyXG4gICAgICB5OiAoKGhlaWdodCAtIHkvdnJhdGlvKS9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBVbmJpbmQoYmluZF9pZDpudW1iZXIpe1xyXG4gIGZvcihsZXQgYSA9IDA7YSA8IGFsbF9iaW5kcy5sZW5ndGg7IGErKyl7XHJcbiAgICBpZihhbGxfYmluZHNbYV0uaWQgPT0gYmluZF9pZCl7XHJcbiAgICAgIGFsbF9iaW5kcy5zcGxpY2UoYSwxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxubGV0IGlkID0gMDtcclxuZXhwb3J0IGZ1bmN0aW9uIEJpbmQoa2V5bmFtZTpzdHJpbmcsZnVuYzpjb250cm9sX2Z1bmMsb2JqZWN0PzpvYmo8dW5rbm93bj4pOm51bWJlcntcclxuICBpZihrZXluYW1lLnNsaWNlKDAsNSkgPT09IFwiTW91c2VcIil7XHJcbiAgICBhbGxfYmluZHMucHVzaCh7XHJcbiAgICAgIGtleTprZXluYW1lLFxyXG4gICAgICB0eXBlOmJ0eXBlLm1vdXNlLFxyXG4gICAgICBpZDppZCxcclxuICAgICAgZnVuY3Rpb246ZnVuYyxcclxuICAgICAgb2JqOm9iamVjdFxyXG4gICAgfSlcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGFsbF9iaW5kcy5wdXNoKHtcclxuICAgICAga2V5OmtleW5hbWUsXHJcbiAgICAgIHR5cGU6YnR5cGUua2V5Ym9hcmQsXHJcbiAgICAgIGlkOmlkLFxyXG4gICAgICBmdW5jdGlvbjpmdW5jXHJcbiAgICB9KVxyXG4gIH1cclxuICBpZCsrO1xyXG4gIHJldHVybiBpZCAtIDE7XHJcbn0iLCJpbXBvcnQge3N0YXRlX2Z1bmMsb2JqX3N0YXRlfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5pbXBvcnQge3JlbmRlcl9mdW5jfSBmcm9tIFwiLi9yZW5kZXJcIjtcclxuaW1wb3J0IHtzcHJpdGV9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQge2NvbGxpc2lvbl9ib3h9IGZyb20gXCIuL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi92YW5cIjtcclxuaW1wb3J0IHtVbmJpbmQsQmluZCxjb250cm9sX2Z1bmN9IGZyb20gXCIuL2NvbnRyb2xzXCI7XHJcblxyXG5pbnRlcmZhY2Ugb2JqX2k8VD57XHJcbiAgc3RhdGVmOnN0YXRlX2Z1bmM8VD4sXHJcbiAgcmVuZGVyZjpyZW5kZXJfZnVuY1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWQoYTpBcnJheTxvYmo8dW5rbm93bj4+LGlkOnN0cmluZyk6b2JqPHVua25vd24+e1xyXG4gIGZvcihsZXQgYiA9IDA7YiA8IGEubGVuZ3RoOyBiKyspe1xyXG4gICAgaWYoYVtiXS5pZCA9PSBpZCl7XHJcbiAgICAgIHJldHVybiBhW2JdO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5sZXQgY291bnRlciA9IDA7XHJcblxyXG5leHBvcnQgY2xhc3Mgb2JqPFQ+e1xyXG4gIHNwcml0ZV91cmwgPSBcIlwiO1xyXG4gIHNwcml0ZV9zaGVldDpIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIHN0YXRlOlQ7XHJcbiAgaGVpZ2h0Om51bWJlciA9IHVuZGVmaW5lZDtcclxuICB3aWR0aDpudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgY29sbGlzaW9uOmJvb2xlYW4gPSBmYWxzZTtcclxuICBpZDpzdHJpbmc7XHJcbiAgYmluZHM6QXJyYXk8bnVtYmVyPjtcclxuICByZW5kZXIgPSB0cnVlO1xyXG4gIGdldFN0YXRlKCl7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICB9XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHRoaXMuaWQgPSBcIlwiK2NvdW50ZXI7XHJcbiAgICB0aGlzLmJpbmRzID0gW107ICBcclxuICAgIGNvdW50ZXIrKztcclxuICAgIHRoaXMucmVnaXN0ZXJfY29udHJvbHMoKTtcclxuICB9XHJcbiAgbG9hZCgpe1xyXG4gICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpID0+IHtcclxuICAgICAgbGV0IGEgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgYS5zcmMgPSB0aGlzLnNwcml0ZV91cmw7XHJcbiAgICAgIGEub25sb2FkID0gKCgpPT57XHJcbiAgICAgICAgX3RoaXMuc3ByaXRlX3NoZWV0ID0gYTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9XHJcbiAgYmluZENvbnRyb2woa2V5OnN0cmluZyxmdW5jOmNvbnRyb2xfZnVuYyl7XHJcbiAgICBpZihrZXkgPT0gXCJNb3VzZTFcIil7XHJcbiAgICAgIGxldCBiID0gQmluZChrZXksZnVuYyx0aGlzKTtcclxuICAgICAgdGhpcy5iaW5kcy5wdXNoKGIpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgdGhpcy5iaW5kcy5wdXNoKEJpbmQoa2V5LGZ1bmMpKTsgXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCl7XHJcblxyXG4gIH1cclxuICBkZWxldGUoKXtcclxuICAgIGZvcihsZXQgYSBvZiB0aGlzLmJpbmRzKXtcclxuICAgICAgVW5iaW5kKGEpO1xyXG4gICAgfVxyXG4gICAgZ2V0R2FtZSgpLmdldFJvb20oKS5kZWxldGVJdGVtKHRoaXMuaWQpO1xyXG4gIH1cclxuICBjb2xsaXNpb25fY2hlY2soYTpjb2xsaXNpb25fYm94KTpBcnJheTxvYmo8dW5rbm93bj4+e1xyXG4gICAgaWYodGhpcy5jb2xsaXNpb24pe1xyXG4gICAgICBsZXQgcm9vbSA9IGdldEdhbWUoKS5nZXRSb29tKCk7XHJcbiAgICAgIHJldHVybiByb29tLmNoZWNrX2NvbGxpc2lvbnMoYSx0aGlzLmlkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICB9XHJcbiAgY29sbGlkZXNfd2l0aF9ib3goYTpjb2xsaXNpb25fYm94KTpib29sZWFue1xyXG4gICAgbGV0IHN0ID0gdGhpcy5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBoY29sbGlkZXMgPSBmYWxzZSwgdmNvbGxpZGVzID0gZmFsc2U7XHJcbiAgICBpZihzdC5wb3NpdGlvbi54ID49IGEueCAmJiBzdC5wb3NpdGlvbi54IDwgKGEueCArIGEud2lkdGgpKXtcclxuICAgICAgaGNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKGEueCA+IHN0LnBvc2l0aW9uLnggJiYgYS54IDwgKHN0LnBvc2l0aW9uLnggKyB0aGlzLndpZHRoKSl7XHJcbiAgICAgIGhjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihzdC5wb3NpdGlvbi55ID49IGEueSAmJiBzdC5wb3NpdGlvbi55IDwgKGEueSArIGEuaGVpZ2h0KSl7XHJcbiAgICAgIHZjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihhLnkgPiBzdC5wb3NpdGlvbi55ICYmIGEueSA8IChzdC5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQpKXtcclxuICAgICAgdmNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBoY29sbGlkZXMgJiYgdmNvbGxpZGVzO1xyXG4gIH1cclxuICBjb2xsaWRlc193aXRoKGE6b2JqPHVua25vd24+KTpib29sZWFue1xyXG4gICAgbGV0IHN0ID0gdGhpcy5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBzdF8yID0gYS5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgaGNvbGxpZGVzID0gZmFsc2UsIHZjb2xsaWRlcyA9IGZhbHNlO1xyXG4gICAgaWYoc3QucG9zaXRpb24ueCA+IHN0XzIucG9zaXRpb24ueCAmJiBzdC5wb3NpdGlvbi54IDwgKHN0XzIucG9zaXRpb24ueCArIGEud2lkdGgpKXtcclxuICAgICAgaGNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKHN0XzIucG9zaXRpb24ueCA+IHN0LnBvc2l0aW9uLnggJiYgc3RfMi5wb3NpdGlvbi54IDwgKHN0LnBvc2l0aW9uLnggKyBhLndpZHRoKSl7XHJcbiAgICAgIGhjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihzdC5wb3NpdGlvbi55ID4gc3RfMi5wb3NpdGlvbi55ICYmIHN0LnBvc2l0aW9uLnkgPCAoc3RfMi5wb3NpdGlvbi55ICsgYS53aWR0aCkpe1xyXG4gICAgICB2Y29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYoc3RfMi5wb3NpdGlvbi55ID4gc3QucG9zaXRpb24ueSAmJiBzdF8yLnBvc2l0aW9uLnkgPCAoc3QucG9zaXRpb24ueSArIGEud2lkdGgpKXtcclxuICAgICAgdmNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBoY29sbGlkZXMgJiYgdmNvbGxpZGVzO1xyXG4gIH1cclxuICByZW5kZXJmKHRpbWU6bnVtYmVyKTpzcHJpdGV7XHJcbiAgICBsZXQgc3QgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IHNwcml0ZV9oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgIGxldCBzcHJpdGVfd2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgaWYodGhpcy5oZWlnaHQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgc3ByaXRlX2hlaWdodCA9IHRoaXMuc3ByaXRlX3NoZWV0LmhlaWdodDtcclxuICAgIH1cclxuICAgIGlmKHRoaXMud2lkdGggPT0gdW5kZWZpbmVkKXtcclxuICAgICAgc3ByaXRlX3dpZHRoID0gdGhpcy5zcHJpdGVfc2hlZXQud2lkdGg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzcHJpdGVfc2hlZXQ6dGhpcy5zcHJpdGVfc2hlZXQsXHJcbiAgICAgIGxlZnQ6MCxcclxuICAgICAgdG9wOjAsXHJcbiAgICAgIHNwcml0ZV93aWR0aCxcclxuICAgICAgc3ByaXRlX2hlaWdodFxyXG4gICAgfTtcclxuICAgIFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHN0YXRpY19vYmp7XHJcbiAgc3ByaXRlX3VybCA9IFwiXCI7XHJcbiAgc3ByaXRlOkhUTUxJbWFnZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBncmF2aXR5X29iajxUPiBleHRlbmRzIG9iajxUPntcclxuICBncmF2aXR5ID0gdHJ1ZVxyXG59IiwiaW1wb3J0IHtzcHJpdGV9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQge0dldFZpZXdwb3J0RGltZW5zaW9uc30gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQge29ian0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcbmltcG9ydCB7b2JqX3N0YXRlfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5cclxuaW50ZXJmYWNlIGNhbWVyYV9zdGF0ZXtcclxuICBzY2FsaW5nOm51bWJlcixcclxuICBzdHJldGNoOmJvb2xlYW4sXHJcbiAgcG9zaXRpb246e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH1cclxuICBkaW1lbnNpb25zOntcclxuICAgIHdpZHRoOm51bWJlcixcclxuICAgIGhlaWdodDpudW1iZXJcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYW1lcmF7XHJcbiAgc3RhdGU6Y2FtZXJhX3N0YXRlXHJcbiAgY29uc3RydWN0b3IoeDpudW1iZXIseTpudW1iZXIsd2lkdGg6bnVtYmVyLGhlaWdodDpudW1iZXIsc2NhbGluZzpudW1iZXIsc3RyZXRjaDpib29sZWFuKXtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHNjYWxpbmcsXHJcbiAgICAgIHN0cmV0Y2gsXHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4Ongvc2NhbGluZyxcclxuICAgICAgICB5Onkvc2NhbGluZ1xyXG4gICAgICB9LFxyXG4gICAgICBkaW1lbnNpb25zOntcclxuICAgICAgICB3aWR0aDp3aWR0aCAvIHNjYWxpbmcsXHJcbiAgICAgICAgaGVpZ2h0OmhlaWdodCAvIHNjYWxpbmdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBzZXQgeCh4Om51bWJlcil7XHJcbiAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnggPSB4O1xyXG4gIH1cclxuICBzZXQgeSh5Om51bWJlcil7XHJcbiAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnkgPSB5IFxyXG4gIH1cclxuICBnZXQgeCgpe1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucG9zaXRpb24ueDtcclxuICB9XHJcbiAgZ2V0IHkoKXtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLnBvc2l0aW9uLnk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSByZW5kZXJfZnVuY3tcclxuICAoeDpudW1iZXIseTpudW1iZXIsc2NhbGluZzpudW1iZXIpOnZvaWRcclxufVxyXG5cclxuaW50ZXJmYWNlIHJlY3RhbmdsZXtcclxuICB3aWR0aDpudW1iZXIsXHJcbiAgaGVpZ2h0Om51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2Ugc3ByaXRlX2FyZ3N7XHJcbiAgc3ByaXRlOnNwcml0ZSxcclxuICB4Om51bWJlcixcclxuICB5Om51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgcmVuZGVyZXJfYXJnc3tcclxuICBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICBjYW1lcmE6Q2FtZXJhXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzcHJpdGVfcmVuZGVyZXIgPSAocjpyZW5kZXJlcl9hcmdzLHM6c3ByaXRlX2FyZ3MpID0+IHtcclxuICBsZXQgY2FtZXJhID0gci5jYW1lcmE7XHJcbiAgbGV0IHZoZWlnaHQgPSBHZXRWaWV3cG9ydERpbWVuc2lvbnMoKS5oZWlnaHQ7XHJcbiAgbGV0IGZpbmFsX3ggPSAoKHMueCAtIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54KSAqIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBmaW5hbF95ID0gKCh2aGVpZ2h0IC0gcy55IC0gcy5zcHJpdGUuc3ByaXRlX2hlaWdodCArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KSAqIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBoZWlnaHQgPSBzLnNwcml0ZS5zcHJpdGVfaGVpZ2h0ICogci5jYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBsZXQgd2lkdGggPSBzLnNwcml0ZS5zcHJpdGVfd2lkdGggKiByLmNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIHIuY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICBzLnNwcml0ZS5zcHJpdGVfc2hlZXQsXHJcbiAgICBzLnNwcml0ZS5sZWZ0LFxyXG4gICAgcy5zcHJpdGUudG9wLFxyXG4gICAgcy5zcHJpdGUuc3ByaXRlX3dpZHRoLFxyXG4gICAgcy5zcHJpdGUuc3ByaXRlX2hlaWdodCxcclxuICAgIGZpbmFsX3gsXHJcbiAgICBmaW5hbF95LFxyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHRcclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZWN0X3JlbmRlcmVyID0gKGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJELHJlY3Q6cmVjdGFuZ2xlLHg6bnVtYmVyLHk6bnVtYmVyLGNvbG9yOnN0cmluZyxjYW1lcmE6Q2FtZXJhKSA9PiB7XHJcbiAgbGV0IHZoZWlnaHQgPSBHZXRWaWV3cG9ydERpbWVuc2lvbnMoKS5oZWlnaHQ7XHJcbiAgbGV0IGZpbmFsX3ggPSAoKHggLSBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCkgKiBjYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGZpbmFsX3kgPSAoKHZoZWlnaHQgLSB5IC0gcmVjdC5oZWlnaHQgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueSkgKiBjYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGhlaWdodCA9IHJlY3QuaGVpZ2h0ICogY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IHdpZHRoID0gcmVjdC53aWR0aCAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICBjb250ZXh0LnN0cm9rZVJlY3QoZmluYWxfeCxmaW5hbF95LHJlY3Qud2lkdGgsaGVpZ2h0KTtcclxufSIsImltcG9ydCB7IGdyYXZpdHlfb2JqLG9iaiB9IGZyb20gXCIuL29iamVjdFwiO1xyXG5pbXBvcnQgeyBzcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVcIjtcclxuaW1wb3J0IHsgb2JqX3N0YXRlIH0gZnJvbSBcIi4vc3RhdGVcIjtcclxuaW1wb3J0IHsgdmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrLGNoZWNrX2NvbGxpc2lvbnMsY29sbGlzaW9uX2JveCxjaGVja19hbGxfY29sbGlzaW9ucyxjaGVja19hbGxfb2JqZWN0c30gZnJvbSBcIi4vY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7cmVuZGVyX2NvbGxpc2lvbl9ib3gsREVCVUd9IGZyb20gXCIuLi92YW5cIjtcclxuaW1wb3J0IHtCaW5kLGNvbnRyb2xfZnVuY30gZnJvbSBcIi4vY29udHJvbHNcIjtcclxuaW1wb3J0IHsgT3ZlcndvcmxkIH0gZnJvbSBcIi4uL2dhbWUvcm9vbXMvb3ZlcndvcmxkXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlfZ3Jhdml0eShvYjpncmF2aXR5X29iajx1bmtub3duPixncmF2X2NvbnN0Om51bWJlciwgZ3Jhdl9tYXg6bnVtYmVyKXtcclxuICBsZXQgc3QgPSBvYi5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgaWYob2IuZ3Jhdml0eSAmJiBzdC52ZWxvY2l0eS55ID4gZ3Jhdl9tYXgpe1xyXG4gICAgc3QudmVsb2NpdHkueSArPSBncmF2X2NvbnN0O1xyXG4gIH1cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIHJvb21faTxUPntcclxuICBiYWNrZ3JvdW5kX3VybDpzdHJpbmcsXHJcbiAgb2JqZWN0czpBcnJheTxvYmo8dW5rbm93bj4+XHJcbiAgc3RhdGU6VFxyXG59XHJcbmV4cG9ydCBjbGFzcyByb29tPFQ+e1xyXG4gIGJhY2tncm91bmRfdXJsOiBzdHJpbmc7XHJcbiAgYmFja2dyb3VuZDogSFRNTEltYWdlRWxlbWVudDtcclxuICBvYmplY3RzOiBBcnJheTxvYmo8dW5rbm93bj4+XHJcbiAgc3RhdGU6IFRcclxuICBsb2FkKCkge1xyXG4gICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCBhID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGxldCB0b19hd2FpdCA9IHRoaXMub2JqZWN0cy5tYXAoKGEpID0+IGEubG9hZCgpKTtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodG9fYXdhaXQpO1xyXG4gICAgICBhLnNyYyA9IHRoaXMuYmFja2dyb3VuZF91cmw7XHJcbiAgICAgIGEub25lcnJvciA9ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBsb2FkaW5nIHVybDpcIiArIHRoaXMuYmFja2dyb3VuZF91cmwpO1xyXG4gICAgICB9KVxyXG4gICAgICBhLm9ubG9hZCA9ICgoKSA9PiB7XHJcbiAgICAgICAgX3RoaXMuYmFja2dyb3VuZCA9IGE7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIGRlbGV0ZUl0ZW0oaWQ6c3RyaW5nKXtcclxuICAgIGZvcihsZXQgYSA9IDA7YSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7YSsrKXtcclxuICAgICAgaWYodGhpcy5vYmplY3RzW2FdLmlkID09PSBpZCl7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzID0gdGhpcy5vYmplY3RzLnNsaWNlKDAsYSkuY29uY2F0KHRoaXMub2JqZWN0cy5zbGljZShhKzEpKTtcclxuICAgICAgICBhLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgYmluZENvbnRyb2woa2V5OnN0cmluZyxmdW5jOmNvbnRyb2xfZnVuYyl7XHJcbiAgICBCaW5kKGtleSxmdW5jKTsgXHJcbiAgfVxyXG4gIGNoZWNrX2NvbGxpc2lvbnMoYm94OmNvbGxpc2lvbl9ib3gsZXhlbXB0PzpzdHJpbmcpOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgICBpZihERUJVRyl7XHJcbiAgICAgIHJlbmRlcl9jb2xsaXNpb25fYm94KGJveCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hlY2tfYWxsX2NvbGxpc2lvbnMoYm94LHRoaXMub2JqZWN0cyxleGVtcHQpO1xyXG4gIH1cclxuICBjaGVja19vYmplY3RzKGJveDpjb2xsaXNpb25fYm94LGV4ZW1wdD86c3RyaW5nKXtcclxuICAgIGlmKERFQlVHKXtcclxuICAgICAgcmVuZGVyX2NvbGxpc2lvbl9ib3goYm94KTtcclxuICAgIH1cclxuICAgIHJldHVybiBjaGVja19hbGxfb2JqZWN0cyhib3gsdGhpcy5vYmplY3RzLGV4ZW1wdCk7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCl7XHJcblxyXG4gIH1cclxuICBjbGVhbnVwKCl7XHJcblxyXG4gIH1cclxuICBzdGF0ZWYodGltZTogbnVtYmVyKSB7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKykge1xyXG4gICAgICB0aGlzLm9iamVjdHNbYV0uc3RhdGVmKHRpbWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRPYmooaWQ6c3RyaW5nKXtcclxuICAgIGZvcihsZXQgYSA9IDA7IGEgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBhKyspe1xyXG4gICAgICBpZih0aGlzLm9iamVjdHNbYV0uaWQgPT0gaWQpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdHNbYV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmVuZGVyZih0aW1lOiBudW1iZXIpOiBzcHJpdGUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3ByaXRlX3NoZWV0OiB0aGlzLmJhY2tncm91bmQsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgc3ByaXRlX2hlaWdodDogdGhpcy5iYWNrZ3JvdW5kLmhlaWdodCxcclxuICAgICAgc3ByaXRlX3dpZHRoOiB0aGlzLmJhY2tncm91bmQud2lkdGhcclxuICAgIH1cclxuICB9XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIHNwcml0ZXtcclxuICBzcHJpdGVfc2hlZXQ6SFRNTEltYWdlRWxlbWVudCxcclxuICBsZWZ0Om51bWJlcixcclxuICB0b3A6bnVtYmVyLFxyXG4gIHNwcml0ZV93aWR0aDpudW1iZXIsXHJcbiAgc3ByaXRlX2hlaWdodDpudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNwcml0ZV9nZW4oc3ByaXRlX3NoZWV0OkhUTUxJbWFnZUVsZW1lbnQsc3ByaXRlX3dpZHRoOm51bWJlcixzcHJpdGVfaGVpZ2h0Om51bWJlcik6QXJyYXk8c3ByaXRlPntcclxuICBsZXQgd2lkdGggPSBzcHJpdGVfc2hlZXQud2lkdGg7XHJcbiAgbGV0IHNwcml0ZXM6QXJyYXk8c3ByaXRlPiA9IFtdO1xyXG4gIGZvcihsZXQgYSA9IDA7IGEgPCB3aWR0aDthICs9IHNwcml0ZV93aWR0aCl7XHJcbiAgICBzcHJpdGVzLnB1c2goe1xyXG4gICAgICBzcHJpdGVfc2hlZXQsXHJcbiAgICAgIGxlZnQ6YSxcclxuICAgICAgdG9wOjAsXHJcbiAgICAgIHNwcml0ZV9oZWlnaHQsXHJcbiAgICAgIHNwcml0ZV93aWR0aFxyXG4gICAgfSlcclxuICB9XHJcbiAgcmV0dXJuIHNwcml0ZXM7XHJcbn0iLCJleHBvcnQgY29uc3QgREVCVUcgPSB0cnVlO1xyXG5cclxuaW1wb3J0IHtvYmp9IGZyb20gXCIuL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQge3Jvb219IGZyb20gXCIuL2xpYi9yb29tXCI7XHJcbmltcG9ydCB7c3ByaXRlfSBmcm9tIFwiLi9saWIvc3ByaXRlXCI7XHJcbmltcG9ydCB7IGNvbGxpc2lvbl9ib3ggfSBmcm9tIFwiLi9saWIvY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7c3ByaXRlX3JlbmRlcmVyLHJlY3RfcmVuZGVyZXIsIENhbWVyYX0gZnJvbSBcIi4vbGliL3JlbmRlclwiO1xyXG5cclxuaW1wb3J0IHtPdmVyd29ybGR9IGZyb20gXCIuL2dhbWUvcm9vbXMvb3ZlcndvcmxkXCI7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gXCIuL2dhbWUvcm9vbXMvYm9hcmRcIjtcclxuXHJcbmxldCBjYW52YXNfZWxlbWVudDpIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFyZ2V0XCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG5sZXQgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXNfZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG5cclxubGV0IHNjcmVlbl93aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5sZXQgc2NyZWVuX2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbmxldCB2d2lkdGggPSBjYW52YXNfZWxlbWVudC53aWR0aDtcclxubGV0IHZoZWlnaHQgPSBjYW52YXNfZWxlbWVudC5oZWlnaHQ7XHJcblxyXG5cclxuLy9Ib3cgb2Z0ZW4gdGhlIGdhbWUgbG9naWMgbG9vcCBzaG91bGQgcnVuLCBpbiBtaWxsaXNlY29uZHNcclxubGV0IGxvZ2ljX2xvb3BfaW50ZXJ2YWw6bnVtYmVyID0gMTAwMC82MDsgIFxyXG5cclxubGV0IGxhc3RfdGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG5pbnRlcmZhY2UgZGltZW5zaW9uc3tcclxuICBoZWlnaHQ6bnVtYmVyLFxyXG4gIHdpZHRoOm51bWJlclxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldFNjcmVlbkRpbWVuc2lvbnMgKCk6ZGltZW5zaW9uc3tcclxuICByZXR1cm4oe1xyXG4gICAgd2lkdGg6c2NyZWVuX3dpZHRoLFxyXG4gICAgaGVpZ2h0OnNjcmVlbl9oZWlnaHRcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2V0Vmlld3BvcnREaW1lbnNpb25zICgpOmRpbWVuc2lvbnN7XHJcbiAgcmV0dXJuKHtcclxuICAgIGhlaWdodDp2aGVpZ2h0LFxyXG4gICAgd2lkdGg6dndpZHRoXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlcl9jb2xsaXNpb25fYm94ID0gKGE6Y29sbGlzaW9uX2JveCkgPT4ge1xyXG4gIGJveGVzLnB1c2goYSk7XHJcbn1cclxuXHJcbmxldCBib3hlczpBcnJheTxjb2xsaXNpb25fYm94PiA9IFtdO1xyXG5cclxubGV0IGRlZXAgPSAoYTphbnkpID0+e1xyXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGEpKTtcclxufVxyXG5cclxuaW50ZXJmYWNlIGdhbWVfc3RhdGV7XHJcbiAgbG9naWM6bnVtYmVyLFxyXG4gIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxyXG4gIGN1cnJlbnRfcm9vbTpyb29tPHVua25vd24+LFxyXG4gIGNhbWVyYTpDYW1lcmEsXHJcbiAgY2FudmFzOkhUTUxDYW52YXNFbGVtZW50LFxyXG4gIHBsYXllcl9zdGF0ZTp7XHJcbiAgICBwb3dlcjpudW1iZXJcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBnYW1le1xyXG4gIHN0YXRlOmdhbWVfc3RhdGU7XHJcbiAgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgY29uc3RydWN0b3IoY3R4OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxhOnJvb208dW5rbm93bj4pe1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY2FudmFzOmNhbnZhc19lbGVtZW50LFxyXG4gICAgICBsb2dpYzp1bmRlZmluZWQsXHJcbiAgICAgIGNvbnRleHQ6Y3R4LFxyXG4gICAgICBjYW1lcmE6bmV3IENhbWVyYSgwLDAsdndpZHRoLHZoZWlnaHQsMSxmYWxzZSksXHJcbiAgICAgIGN1cnJlbnRfcm9vbTogdW5kZWZpbmVkLFxyXG4gICAgICBwbGF5ZXJfc3RhdGU6e1xyXG4gICAgICAgIHBvd2VyOjBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkUm9vbShhKTtcclxuICB9XHJcbiAgcmVuZGVyKHQ6bnVtYmVyKXtcclxuICAgIHRoaXMuc3RhdGUuY29udGV4dC5jbGVhclJlY3QoMCwwLHZ3aWR0aCx2aGVpZ2h0KTtcclxuICAgIHRoaXMuc3RhdGUuY29udGV4dC5maWxsU3R5bGU9XCJibGFja1wiO1xyXG4gICAgdGhpcy5zdGF0ZS5jb250ZXh0LmZpbGxSZWN0KDAsMCx2d2lkdGgsdmhlaWdodCk7XHJcbiAgICBsZXQgY2FtZXJhX2NvbGxpZGVycyA9IHRoaXMuc3RhdGUuY3VycmVudF9yb29tLmNoZWNrX29iamVjdHMoe1xyXG4gICAgICB4OnRoaXMuc3RhdGUuY2FtZXJhLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgIHk6dGhpcy5zdGF0ZS5jYW1lcmEuc3RhdGUucG9zaXRpb24ueSxcclxuICAgICAgd2lkdGg6dGhpcy5zdGF0ZS5jYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aCxcclxuICAgICAgaGVpZ2h0OnRoaXMuc3RhdGUuY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0XHJcbiAgICB9KTtcclxuICAgIGxldCByZW5kZXJfYXJncyA9IHtcclxuICAgICAgY29udGV4dDp0aGlzLnN0YXRlLmNvbnRleHQsXHJcbiAgICAgIGNhbWVyYTp0aGlzLnN0YXRlLmNhbWVyYSxcclxuICAgIH07XHJcbiAgICBzcHJpdGVfcmVuZGVyZXIocmVuZGVyX2FyZ3Mse1xyXG4gICAgICBzcHJpdGU6dGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20ucmVuZGVyZih0KSxcclxuICAgICAgeDowLFxyXG4gICAgICB5OjBcclxuICAgIH0pO1xyXG4gICAgZm9yIChsZXQgYSBvZiBjYW1lcmFfY29sbGlkZXJzKXtcclxuICAgICAgbGV0IHN0ID0gYS5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICAgIGlmKGEucmVuZGVyKXtcclxuICAgICAgICBzcHJpdGVfcmVuZGVyZXIocmVuZGVyX2FyZ3Mse1xyXG4gICAgICAgICAgc3ByaXRlOmEucmVuZGVyZih0KSxcclxuICAgICAgICAgIHg6c3QucG9zaXRpb24ueCxcclxuICAgICAgICAgIHk6c3QucG9zaXRpb24ueVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgYm94OmNvbGxpc2lvbl9ib3g7XHJcbiAgICB3aGlsZShib3hlcy5sZW5ndGggPiAwKXtcclxuICAgICAgbGV0IGJveCA9IGJveGVzLnBvcCgpO1xyXG4gICAgICBsZXQgcmVjdCA9IHtcclxuICAgICAgICB3aWR0aDpib3gud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OmJveC5oZWlnaHRcclxuICAgICAgfVxyXG4gICAgICByZWN0X3JlbmRlcmVyKGNvbnRleHQscmVjdCxib3gueCxib3gueSxcIiNGRjAwMDBcIix0aGlzLnN0YXRlLmNhbWVyYSk7XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKGEpPT57dGhpcy5yZW5kZXIoYSl9KTsgXHJcbiAgfVxyXG4gIHN0YXJ0X2xvZ2ljKGE6bnVtYmVyKXtcclxuICAgIHJldHVybiBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICBsZXQgbmV3X3RpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBsZXQgdGltZV9zaW5jZSA9IG5ld190aW1lLmdldFRpbWUoKSAtIGxhc3RfdGltZS5nZXRUaW1lKCk7XHJcbiAgICAgIGxhc3RfdGltZSA9IG5ld190aW1lO1xyXG4gICAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5zdGF0ZWYobmV3X3RpbWUuZ2V0VGltZSgpKTtcclxuICAgIH0sYSk7XHJcbiAgfVxyXG4gIGdldFJvb20oKXtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbTtcclxuICB9XHJcbiAgYXN5bmMgbG9hZFJvb20oeDpyb29tPHVua25vd24+KXtcclxuXHJcbiAgICBpZih0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgd2hpbGUodGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20ub2JqZWN0cy5sZW5ndGggPiAwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5vYmplY3RzWzBdLmRlbGV0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3X3Jvb20gPSBhd2FpdCB4LmxvYWQoKTtcclxuICAgIHgucmVnaXN0ZXJfY29udHJvbHMoKTtcclxuICAgIHRoaXMuc3RhdGUuY3VycmVudF9yb29tID0geDtcclxuICAgIGlmKHRoaXMuc3RhdGUubG9naWMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmxvZ2ljKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUubG9naWMgPSB0aGlzLnN0YXJ0X2xvZ2ljKGxvZ2ljX2xvb3BfaW50ZXJ2YWwpXHJcbiAgICB0aGlzLnJlbmRlcigwKTtcclxuICB9XHJcbn1cclxuXHJcbmxldCBnYW1lX2luc3QgPSBuZXcgZ2FtZShjb250ZXh0LG5ldyBCb2FyZCgpKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRHYW1lKCl7XHJcbiAgcmV0dXJuIGdhbWVfaW5zdDtcclxufSJdLCJzb3VyY2VSb290IjoiIn0=