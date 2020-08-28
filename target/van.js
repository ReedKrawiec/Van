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
    check_left_castle(room, cords) {
        if (!this.state.has_moved && room.get_piece([cords[0] - 1, cords[1]]).length == 0 && room.get_piece([cords[0] - 2, cords[1]]).length == 0 && room.get_piece([cords[0] - 3, cords[1]]).length == 0) {
            let rook = room.get_piece([cords[0] - 4, cords[1]]);
            if (rook.length > 0 && !rook[0].state.has_moved) {
                return true;
            }
        }
        return false;
    }
    check_right_castle(room, cords) {
        if (!this.state.has_moved && room.get_piece([cords[0] + 1, cords[1]]).length == 0 && room.get_piece([cords[0] + 2, cords[1]]).length == 0) {
            let rook = room.get_piece([cords[0] + 3, cords[1]]);
            if (rook.length > 0 && !rook[0].state.has_moved) {
                return true;
            }
        }
        return false;
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
                    if (safe && piece.length === 0 || piece[0].state.side !== this.state.side) {
                        attacked.push([cords[0] + x, cords[1] + y]);
                    }
                }
            }
        }
        //castle check left
        if (this.check_left_castle(room, cords)) {
            attacked.push([cords[0] - 2, cords[1]]);
        }
        if (this.check_right_castle(room, cords)) {
            attacked.push([cords[0] + 2, cords[1]]);
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
                if (s.state.type === piece_1.piece_type.king && !s.state.has_moved && this.getCords()[0] === 6) {
                    let rooks = room.get_piece([7, s.getCords()[1]]);
                    rooks[0].movetoCords([5, s.getCords()[1]]);
                }
                if (s.state.type === piece_1.piece_type.king && !s.state.has_moved && this.getCords()[0] === 2) {
                    let rooks = room.get_piece([0, s.getCords()[1]]);
                    rooks[0].movetoCords([3, s.getCords()[1]]);
                }
                if (s.state.type === piece_1.piece_type.pawn && !s.state.has_moved && s.state.side === board_1.side.white && this.getCords()[0] === 3) {
                    room.state.white_board[this.getCords()[0]][this.getCords()[1] - 1].enpassent = true;
                }
                if (s.state.type === piece_1.piece_type.pawn && !s.state.has_moved && s.state.side === board_1.side.black && this.getCords()[0] === 4) {
                    room.state.black_board[this.getCords()[0]][this.getCords()[1] + 1].enpassent = true;
                }
                if (s.state.type === piece_1.piece_type.pawn && s.state.side == board_1.side.black && room.get_meta(this.getCords(), board_1.side.white).enpassent) {
                    let f = room.get_piece([this.getCords()[0], this.getCords()[1] + 1]);
                    room.remove_piece(f[0]);
                }
                if (s.state.type === piece_1.piece_type.pawn && s.state.side == board_1.side.white && room.get_meta(this.getCords(), board_1.side.black).enpassent) {
                    let f = room.get_piece([this.getCords()[0], this.getCords()[1] - 1]);
                    room.remove_piece(f[0]);
                }
                s.state.has_moved = true;
                if (p.length > 0) {
                    room.remove_piece(p[0]);
                }
                if ((this.getCords()[1] == 7 || this.getCords()[1] == 0) && s.state.type === piece_1.piece_type.pawn) {
                    let qu = new queen_1.Queen(this.getCords(), s.state.side);
                    qu.load().then(() => {
                        room.add_piece(qu);
                        room.remove_piece(s);
                    });
                }
                if (s.state.side === board_1.side.white) {
                    room.change_side(board_1.side.black);
                }
                else if (s.state.side === board_1.side.black) {
                    room.change_side(board_1.side.white);
                }
                room.clear_attacked();
                room.state.selected.movetoCords(this.getCords());
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
                if (!this.state.has_moved && room.get_piece([cords[0], cords[1] + 2]).length === 0) {
                    attacked.push([cords[0], cords[1] + 2]);
                }
            }
            let left_cords = [cords[0] - 1, cords[1] + 1];
            let right_cords = [cords[0] + 1, cords[1] + 1];
            let left = room.get_piece(left_cords);
            let right = room.get_piece(right_cords);
            let left_en = room.get_meta(left_cords, piece_1.side.black);
            let right_en = room.get_meta(right_cords, piece_1.side.black);
            console.log(right_en);
            if ((cords[0] - 1 >= 0) && ((left.length > 0 && left[0].state.side !== this.state.side) || (left_en && left_en.enpassent))) {
                attacked.push(left_cords);
            }
            if ((cords[0] + 1 < 8) && ((right.length > 0 && right[0].state.side !== this.state.side) || (right_en && right_en.enpassent))) {
                attacked.push(right_cords);
            }
        }
        else {
            if (room.get_piece([cords[0], cords[1] - 1]).length === 0) {
                attacked.push([cords[0], cords[1] - 1]);
                if (!this.state.has_moved && room.get_piece([cords[0], cords[1] - 2]).length === 0) {
                    attacked.push([cords[0], cords[1] - 2]);
                }
            }
            let left_cords = [cords[0] - 1, cords[1] - 1];
            let right_cords = [cords[0] + 1, cords[1] - 1];
            let left = room.get_piece(left_cords);
            let right = room.get_piece(right_cords);
            let left_en = room.get_meta(left_cords, piece_1.side.white);
            let right_en = room.get_meta(right_cords, piece_1.side.white);
            console.log(right_en);
            if ((cords[0] - 1 >= 0) && ((left.length > 0 && left[0].state.side !== this.state.side) || (left_en && left_en.enpassent))) {
                attacked.push(left_cords);
            }
            if ((cords[0] + 1 < 8) && ((right.length > 0 && right[0].state.side !== this.state.side) || (right_en && right_en.enpassent))) {
                attacked.push(right_cords);
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
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
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
            type,
            has_moved: false
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
    unbind_controls() {
        for (let a of this.binds) {
            controls_1.Unbind(a);
        }
    }
    bind_controls() {
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
        for (let a = 0; a < row2.length; a++) {
            let pawn1 = new pawn_1.Pawn([a, 1], side.white);
            let pawn2 = new pawn_1.Pawn([a, 6], side.black);
            this.objects.push(row7[a]);
            this.objects.push(pawn1);
            this.objects.push(row2[a]);
            this.objects.push(pawn2);
            this.state.pieces.push(pawn2);
            this.state.pieces.push(row7[a]);
            this.state.pieces.push(pawn1);
            this.state.pieces.push(row2[a]);
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
        for (let x of this.state.pieces) {
            if (x.state.side === side.white) {
                x.bind_controls();
            }
        }
    }
    get_meta(a, s) {
        if (a[0] >= 0 && a[0] < 8 && a[1] >= 0 && a[1] < 8) {
            if (s === side.white) {
                return this.state.white_board[a[0]][a[1]];
            }
            return this.state.black_board[a[0]][a[1]];
        }
        return undefined;
    }
    change_side(s) {
        let to_bind;
        let to_unbind;
        if (s == side.white) {
            to_bind = s;
            to_unbind = side.black;
            this.clear_enpassent_board(this.state.white_board);
            this.clear_attacked_board(this.state.black_board);
            this.calculate_attacked_board(this.state.black_board, side.black);
        }
        else {
            to_bind = side.black;
            to_unbind = side.white;
            this.clear_enpassent_board(this.state.black_board);
            this.clear_attacked_board(this.state.white_board);
            this.calculate_attacked_board(this.state.white_board, side.white);
            console.log(this.state.white_board);
        }
        for (let x of this.state.pieces) {
            if (x.state.side === to_bind) {
                x.bind_controls();
            }
            else {
                x.unbind_controls();
            }
        }
        this.state.turn = s;
    }
    clear_enpassent_board(x) {
        for (let a = 0; a < 8; a++) {
            for (let b = 0; b < 8; b++) {
                x[a][b].enpassent = false;
            }
        }
    }
    calculate_attacked_board(x, s) {
        for (let a of this.state.pieces) {
            if (a.state.side == s) {
                let attacked = a.getAttacking();
                for (let b of attacked) {
                    x[b[0]][b[1]].attacked = true;
                }
            }
        }
    }
    clear_attacked_board(x) {
        for (let a = 0; a < 8; a++) {
            for (let b = 0; b < 8; b++) {
                x[a][b].attacked = false;
            }
        }
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
    add_piece(a) {
        return __awaiter(this, void 0, void 0, function* () {
            yield a.load();
            this.objects.unshift(a);
            this.state.pieces.unshift(a);
        });
    }
    remove_piece(a) {
        for (let b = 0; b < this.state.pieces.length; b++) {
            if (a.id === this.state.pieces[b].id) {
                this.state.pieces.splice(b, 1);
            }
        }
        a.delete();
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
            //console.log(this.objects);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9iaXNob3AudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9raW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL29iamVjdHMva25pZ2h0LnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL29iamVjdHMvbW92ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9vYmplY3RzL3Bhd24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9waWVjZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9vYmplY3RzL3F1ZWVuLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL29iamVjdHMvcm9vay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9yb29tcy9ib2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbnRyb2xzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvb2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcm9vbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3Nwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURB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LENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE9BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxF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QUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksZUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxXQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksZUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLGVBQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxXQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOU8sSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLFdBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksZUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxXQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUks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aEYsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNsQjtRQUNELElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUM7WUFDaEYsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNsQjtRQUNELElBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUM7WUFDaEYsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNsQjtRQUNELElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUM7WUFDaEYsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNsQjtRQUNELE9BQU8sU0FBUyxJQUFJLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsT0FBTyxDQUFDLElBQVc7UUFDakIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQTZCLENBQUM7UUFDNUMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUM7WUFDMUIsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1NBQzFDO1FBQ0QsSUFBRyxJQUFJLENB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QUssSUFBSSxTQUFTLEVBQUM7Z0JBQy9CLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pDO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7S0FBQTtDQUNGO0FBbkZELG9CQW1GQztBQUVELElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLGFBQUssRUFBRSxDQUFDLENBQUM7QUFFOUMsU0FBZ0IsT0FBTztJQUNyQixPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBRkQsMEJBRUMiLCJmaWxlIjoidmFuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdmFuLnRzXCIpO1xuIiwiaW1wb3J0IHtwaWVjZSxzaWRlLHBpZWNlX3R5cGV9IGZyb20gXCIuL3BpZWNlXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5pbXBvcnQge0JvYXJkfSBmcm9tIFwiLi4vcm9vbXMvYm9hcmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCaXNob3AgZXh0ZW5kcyBwaWVjZXtcclxuICBzcHJpdGVfdXJsID0gXCJodHRwOi8vbG9jYWxob3N0L3NyYy9nYW1lL3Nwcml0ZXMvYmlzaG9wLnBuZ1wiXHJcbiAgY29uc3RydWN0b3IocG9zOltudW1iZXIsbnVtYmVyXSxzaWRlOnNpZGUpe1xyXG4gICAgc3VwZXIocG9zLHNpZGUscGllY2VfdHlwZS5iaXNob3ApO1xyXG4gIH1cclxuICBnZXRBdHRhY2tpbmcoKTpBcnJheTxbbnVtYmVyLG51bWJlcl0+e1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0YWNrRGlhZ29uYWwoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge3BpZWNlLHNpZGUscGllY2VfdHlwZX0gZnJvbSBcIi4vcGllY2VcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gXCIuLi9yb29tcy9ib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEtpbmcgZXh0ZW5kcyBwaWVjZXtcclxuICBzcHJpdGVfdXJsID0gXCJodHRwOi8vbG9jYWxob3N0L3NyYy9nYW1lL3Nwcml0ZXMva2luZy5wbmdcIlxyXG4gIGNvbnN0cnVjdG9yKHBvczpbbnVtYmVyLG51bWJlcl0sc2lkZTpzaWRlKXtcclxuICAgIHN1cGVyKHBvcyxzaWRlLHBpZWNlX3R5cGUua2luZyk7XHJcbiAgfVxyXG4gIGNoZWNrX2xlZnRfY2FzdGxlKHJvb206Qm9hcmQsY29yZHM6W251bWJlcixudW1iZXJdKXtcclxuICAgIGlmKCF0aGlzLnN0YXRlLmhhc19tb3ZlZCAmJiByb29tLmdldF9waWVjZShbY29yZHNbMF0gLSAxLGNvcmRzWzFdXSkubGVuZ3RoID09IDAgJiYgcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdIC0gMixjb3Jkc1sxXV0pLmxlbmd0aCA9PSAwICYmIHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSAtIDMsIGNvcmRzWzFdXSkubGVuZ3RoID09IDApe1xyXG4gICAgICBsZXQgcm9vayA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSAtIDQsY29yZHNbMV1dKTtcclxuICAgICAgaWYocm9vay5sZW5ndGggPiAwICYmICFyb29rWzBdLnN0YXRlLmhhc19tb3ZlZCl7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgY2hlY2tfcmlnaHRfY2FzdGxlKHJvb206Qm9hcmQsY29yZHM6W251bWJlcixudW1iZXJdKXtcclxuICAgIGlmKCF0aGlzLnN0YXRlLmhhc19tb3ZlZCAmJiByb29tLmdldF9waWVjZShbY29yZHNbMF0gKyAxLGNvcmRzWzFdXSkubGVuZ3RoID09IDAgJiYgcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdICsgMixjb3Jkc1sxXV0pLmxlbmd0aCA9PSAwKXtcclxuICAgICAgbGV0IHJvb2sgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0gKyAzLGNvcmRzWzFdXSk7XHJcbiAgICAgIGlmKHJvb2subGVuZ3RoID4gMCAmJiAhcm9va1swXS5zdGF0ZS5oYXNfbW92ZWQpe1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICBsZXQgY29yZHMgPSB0aGlzLmdldENvcmRzKCk7XHJcbiAgICBsZXQgcm9vbSA9IGdldEdhbWUoKS5nZXRSb29tKCkgYXMgQm9hcmQ7XHJcbiAgICBsZXQgYXR0YWNrZWQ6QXJyYXk8W251bWJlcixudW1iZXJdPiA9IFtdO1xyXG4gICAgZm9yKGxldCB4ID0gLTE7eCA8PSAxOyB4Kyspe1xyXG4gICAgICBmb3IobGV0IHkgPSAtMTt5IDw9IDE7IHkrKyl7XHJcbiAgICAgICAgaWYoKHggIT09IDAgfHwgeSAhPT0gMCkgJiYgY29yZHNbMF0gKyB4ID49IDAgJiYgY29yZHNbMF0gKyB4IDwgOCAmJiBjb3Jkc1sxXSArIHkgPj0gMCAmJiBjb3Jkc1sxXSArIHkgPCA4KXtcclxuICAgICAgICAgIGxldCBwaWVjZSA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSArIHgsIGNvcmRzWzFdICsgeV0pO1xyXG4gICAgICAgICAgbGV0IHNhZmUgPSB0cnVlO1xyXG4gICAgICAgICAgaWYoc2FmZSAmJiBwaWVjZS5sZW5ndGggPT09IDAgfHwgcGllY2VbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyB4LCBjb3Jkc1sxXSArIHldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vY2FzdGxlIGNoZWNrIGxlZnRcclxuICAgIGlmKHRoaXMuY2hlY2tfbGVmdF9jYXN0bGUocm9vbSxjb3Jkcykpe1xyXG4gICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSAtIDIsY29yZHNbMV1dKTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuY2hlY2tfcmlnaHRfY2FzdGxlKHJvb20sY29yZHMpKXtcclxuICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyAyLGNvcmRzWzFdXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXR0YWNrZWQ7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtwaWVjZSxzaWRlLHBpZWNlX3R5cGV9IGZyb20gXCIuL3BpZWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS25pZ2h0IGV4dGVuZHMgcGllY2V7XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9zcHJpdGVzL2tuaWdodC5wbmdcIlxyXG4gIGNvbnN0cnVjdG9yKHBvczpbbnVtYmVyLG51bWJlcl0sc2lkZTpzaWRlKXtcclxuICAgIHN1cGVyKHBvcyxzaWRlLHBpZWNlX3R5cGUua25pZ2h0KTtcclxuICB9XHJcbiAgZ2V0QXR0YWNraW5nKCk6QXJyYXk8W251bWJlcixudW1iZXJdPntcclxuICAgIGxldCBjb3JkcyA9IHRoaXMuZ2V0Q29yZHMoKTtcclxuICAgIGxldCBhdHRhY2tlZDpBcnJheTxbbnVtYmVyLG51bWJlcl0+ID0gW107XHJcbiAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSArIDEsY29yZHNbMV0gKyAyXSk7XHJcbiAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSAtIDEsY29yZHNbMV0gKyAyXSk7XHJcbiAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSArIDIsY29yZHNbMV0gKyAxXSk7XHJcbiAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSArIDIsY29yZHNbMV0gLSAxXSk7XHJcbiAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSArIDEsY29yZHNbMV0gLSAyXSk7XHJcbiAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSAtIDEsY29yZHNbMV0gLSAyXSk7XHJcbiAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSAtIDIsY29yZHNbMV0gKyAxXSk7XHJcbiAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSAtIDIsY29yZHNbMV0gLSAxXSk7XHJcbiAgICByZXR1cm4oYXR0YWNrZWQuZmlsdGVyKCh4KT0+eFswXSA+PSAwICYmIHhbMF0gPCA4ICYmIHhbMV0gPj0gMCAmJiB4WzFdIDwgOCkpO1xyXG4gIH1cclxufSIsImltcG9ydCB7b2JqfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuaW1wb3J0IHtCb2FyZCxzaWRlfSBmcm9tIFwiLi4vcm9vbXMvYm9hcmRcIjtcclxuaW1wb3J0IHtwaWVjZSxwaWVjZV90eXBlfSBmcm9tIFwiLi9waWVjZVwiO1xyXG5pbXBvcnQgeyBRdWVlbiB9IGZyb20gXCIuL3F1ZWVuXCI7XHJcblxyXG5pbnRlcmZhY2UgbW92ZV9zdGF0ZXtcclxuICBwb3NpdGlvbjp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgbW92ZSBleHRlbmRzIG9iajxtb3ZlX3N0YXRlPntcclxuICBzcHJpdGVfdXJsPVwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9zcHJpdGVzL2F0dGFja2VkLnBuZ1wiO1xyXG4gIGhlaWdodCA9IDEwMDtcclxuICB3aWR0aCA9IDEwMDtcclxuICByZW5kZXIgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihhOltudW1iZXIsbnVtYmVyXSl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6YVswXSAqIHRoaXMud2lkdGgsXHJcbiAgICAgICAgeTphWzFdICogdGhpcy5oZWlnaHRcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDb3JkcygpOltudW1iZXIsbnVtYmVyXXtcclxuICAgIHJldHVybiBbdGhpcy5zdGF0ZS5wb3NpdGlvbi54LzEwMCx0aGlzLnN0YXRlLnBvc2l0aW9uLnkvMTAwXTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJNb3VzZTFcIiwoKT0+e1xyXG4gICAgICBpZih0aGlzLnJlbmRlcil7XHJcbiAgICAgICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuc3RhdGUuY3VycmVudF9yb29tIGFzIEJvYXJkO1xyXG4gICAgICAgIGxldCBwID0gcm9vbS5nZXRfcGllY2UodGhpcy5nZXRDb3JkcygpKSBhcyBwaWVjZVtdO1xyXG4gICAgICAgIGxldCBzID0gcm9vbS5zdGF0ZS5zZWxlY3RlZDtcclxuICAgICAgICBpZihzLnN0YXRlLnR5cGUgPT09IHBpZWNlX3R5cGUua2luZyAmJiAhcy5zdGF0ZS5oYXNfbW92ZWQgJiYgdGhpcy5nZXRDb3JkcygpWzBdID09PSA2KXtcclxuICAgICAgICAgIGxldCByb29rcyA9IHJvb20uZ2V0X3BpZWNlKFs3LHMuZ2V0Q29yZHMoKVsxXV0pO1xyXG4gICAgICAgICAgcm9va3NbMF0ubW92ZXRvQ29yZHMoWzUscy5nZXRDb3JkcygpWzFdXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHMuc3RhdGUudHlwZSA9PT0gcGllY2VfdHlwZS5raW5nICYmICFzLnN0YXRlLmhhc19tb3ZlZCAmJiB0aGlzLmdldENvcmRzKClbMF0gPT09IDIpe1xyXG4gICAgICAgICAgbGV0IHJvb2tzID0gcm9vbS5nZXRfcGllY2UoWzAscy5nZXRDb3JkcygpWzFdXSk7XHJcbiAgICAgICAgICByb29rc1swXS5tb3ZldG9Db3JkcyhbMyxzLmdldENvcmRzKClbMV1dKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocy5zdGF0ZS50eXBlID09PSBwaWVjZV90eXBlLnBhd24gJiYgIXMuc3RhdGUuaGFzX21vdmVkICYmIHMuc3RhdGUuc2lkZSA9PT0gc2lkZS53aGl0ZSAmJiB0aGlzLmdldENvcmRzKClbMF0gPT09IDMpe1xyXG4gICAgICAgICAgcm9vbS5zdGF0ZS53aGl0ZV9ib2FyZFt0aGlzLmdldENvcmRzKClbMF1dW3RoaXMuZ2V0Q29yZHMoKVsxXSAtIDFdLmVucGFzc2VudCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHMuc3RhdGUudHlwZSA9PT0gcGllY2VfdHlwZS5wYXduICYmICFzLnN0YXRlLmhhc19tb3ZlZCAmJiBzLnN0YXRlLnNpZGUgPT09IHNpZGUuYmxhY2sgJiYgdGhpcy5nZXRDb3JkcygpWzBdID09PSA0KXtcclxuICAgICAgICAgIHJvb20uc3RhdGUuYmxhY2tfYm9hcmRbdGhpcy5nZXRDb3JkcygpWzBdXVt0aGlzLmdldENvcmRzKClbMV0gKyAxXS5lbnBhc3NlbnQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzLnN0YXRlLnR5cGUgPT09IHBpZWNlX3R5cGUucGF3biAmJiBzLnN0YXRlLnNpZGUgPT0gc2lkZS5ibGFjayAmJiByb29tLmdldF9tZXRhKHRoaXMuZ2V0Q29yZHMoKSxzaWRlLndoaXRlKS5lbnBhc3NlbnQpe1xyXG4gICAgICAgICAgbGV0IGYgPSByb29tLmdldF9waWVjZShbdGhpcy5nZXRDb3JkcygpWzBdLHRoaXMuZ2V0Q29yZHMoKVsxXSArIDFdKTtcclxuICAgICAgICAgIHJvb20ucmVtb3ZlX3BpZWNlKGZbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzLnN0YXRlLnR5cGUgPT09IHBpZWNlX3R5cGUucGF3biAmJiBzLnN0YXRlLnNpZGUgPT0gc2lkZS53aGl0ZSAmJiByb29tLmdldF9tZXRhKHRoaXMuZ2V0Q29yZHMoKSxzaWRlLmJsYWNrKS5lbnBhc3NlbnQpe1xyXG4gICAgICAgICAgbGV0IGYgPSByb29tLmdldF9waWVjZShbdGhpcy5nZXRDb3JkcygpWzBdLHRoaXMuZ2V0Q29yZHMoKVsxXSAtIDFdKTtcclxuICAgICAgICAgIHJvb20ucmVtb3ZlX3BpZWNlKGZbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzLnN0YXRlLmhhc19tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgaWYocC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIHJvb20ucmVtb3ZlX3BpZWNlKHBbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZigodGhpcy5nZXRDb3JkcygpWzFdID09IDcgfHwgdGhpcy5nZXRDb3JkcygpWzFdID09IDApICYmIHMuc3RhdGUudHlwZSA9PT0gcGllY2VfdHlwZS5wYXduKXtcclxuICAgICAgICAgIGxldCBxdSA9IG5ldyBRdWVlbih0aGlzLmdldENvcmRzKCkscy5zdGF0ZS5zaWRlKTtcclxuICAgICAgICAgIHF1LmxvYWQoKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgIHJvb20uYWRkX3BpZWNlKHF1KTtcclxuICAgICAgICAgICAgcm9vbS5yZW1vdmVfcGllY2Uocyk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzLnN0YXRlLnNpZGUgPT09IHNpZGUud2hpdGUpe1xyXG4gICAgICAgICAgcm9vbS5jaGFuZ2Vfc2lkZShzaWRlLmJsYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihzLnN0YXRlLnNpZGUgPT09IHNpZGUuYmxhY2spe1xyXG4gICAgICAgICAgcm9vbS5jaGFuZ2Vfc2lkZShzaWRlLndoaXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcm9vbS5jbGVhcl9hdHRhY2tlZCgpO1xyXG4gICAgICAgIHJvb20uc3RhdGUuc2VsZWN0ZWQubW92ZXRvQ29yZHModGhpcy5nZXRDb3JkcygpKTtcclxuICAgICAgICBcclxuICAgICAgICByb29tLnN0YXRlLmF0dGFja2VkID0gW107XHJcbiAgICAgICAgcm9vbS5zdGF0ZS5zZWxlY3RlZCA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn0iLCJpbXBvcnQge3BpZWNlLHNpZGUscGllY2VfdHlwZX0gZnJvbSBcIi4vcGllY2VcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gXCIuLi9yb29tcy9ib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhd24gZXh0ZW5kcyBwaWVjZXtcclxuICBzcHJpdGVfdXJsID0gXCJodHRwOi8vbG9jYWxob3N0L3NyYy9nYW1lL3Nwcml0ZXMvcGF3bi5wbmdcIlxyXG4gIGNvbnN0cnVjdG9yKHBvczpbbnVtYmVyLG51bWJlcl0sc2lkZTpzaWRlKXtcclxuICAgIHN1cGVyKHBvcyxzaWRlLHBpZWNlX3R5cGUucGF3bik7XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICBsZXQgYXR0YWNrZWQ6QXJyYXk8W251bWJlcixudW1iZXJdPiA9IFtdO1xyXG4gICAgbGV0IGNvcmRzID0gdGhpcy5nZXRDb3JkcygpO1xyXG4gICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpIGFzIEJvYXJkO1xyXG4gICAgbGV0IGxlZnQ7XHJcbiAgICBsZXQgcmlnaHQ7XHJcbiAgICBsZXQgZm9yd2FyZDtcclxuICAgIGlmKHRoaXMuc3RhdGUuc2lkZSA9PSBzaWRlLndoaXRlKXtcclxuICAgICAgaWYocm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdLGNvcmRzWzFdICsgMV0pLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0sY29yZHNbMV0gKyAxXSk7XHJcbiAgICAgICAgaWYoIXRoaXMuc3RhdGUuaGFzX21vdmVkICYmIHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSxjb3Jkc1sxXSArIDJdKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0sY29yZHNbMV0gKyAyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGxldCBsZWZ0X2NvcmRzOltudW1iZXIsbnVtYmVyXSA9IFtjb3Jkc1swXS0gMSxjb3Jkc1sxXSArIDFdO1xyXG4gICAgICBsZXQgcmlnaHRfY29yZHM6W251bWJlcixudW1iZXJdID0gW2NvcmRzWzBdKyAxLGNvcmRzWzFdICsgMV07IFxyXG4gICAgICBsZXQgbGVmdCA9IHJvb20uZ2V0X3BpZWNlKGxlZnRfY29yZHMpO1xyXG4gICAgICBsZXQgcmlnaHQgPSByb29tLmdldF9waWVjZShyaWdodF9jb3Jkcyk7XHJcbiAgICAgIGxldCBsZWZ0X2VuID0gcm9vbS5nZXRfbWV0YShsZWZ0X2NvcmRzLHNpZGUuYmxhY2spO1xyXG4gICAgICBsZXQgcmlnaHRfZW4gPSByb29tLmdldF9tZXRhKHJpZ2h0X2NvcmRzLHNpZGUuYmxhY2spO1xyXG4gICAgICBjb25zb2xlLmxvZyhyaWdodF9lbik7XHJcbiAgICAgIGlmKChjb3Jkc1swXSAtIDEgPj0gMCkgJiYgKChsZWZ0Lmxlbmd0aCA+IDAgJiYgbGVmdFswXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpIHx8IChsZWZ0X2VuICYmIGxlZnRfZW4uZW5wYXNzZW50KSkpe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2gobGVmdF9jb3Jkcyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYoKGNvcmRzWzBdICsgMSA8IDgpICYmICgocmlnaHQubGVuZ3RoID4gMCAmJiByaWdodFswXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpIHx8IChyaWdodF9lbiAmJiByaWdodF9lbi5lbnBhc3NlbnQpKSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChyaWdodF9jb3Jkcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBpZihyb29tLmdldF9waWVjZShbY29yZHNbMF0sY29yZHNbMV0gLSAxXSkubGVuZ3RoID09PSAwKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSxjb3Jkc1sxXSAtIDFdKTtcclxuICAgICAgICBpZighdGhpcy5zdGF0ZS5oYXNfbW92ZWQgJiYgcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdLGNvcmRzWzFdIC0gMl0pLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSxjb3Jkc1sxXSAtIDJdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbGV0IGxlZnRfY29yZHM6W251bWJlcixudW1iZXJdID0gW2NvcmRzWzBdIC0gMSxjb3Jkc1sxXSAtIDFdO1xyXG4gICAgICBsZXQgcmlnaHRfY29yZHM6W251bWJlcixudW1iZXJdID0gW2NvcmRzWzBdKyAxLGNvcmRzWzFdIC0gMV07XHJcbiAgICAgIGxldCBsZWZ0ID0gcm9vbS5nZXRfcGllY2UobGVmdF9jb3Jkcyk7XHJcbiAgICAgIGxldCByaWdodCA9IHJvb20uZ2V0X3BpZWNlKHJpZ2h0X2NvcmRzKTtcclxuICAgICAgbGV0IGxlZnRfZW4gPSByb29tLmdldF9tZXRhKGxlZnRfY29yZHMsc2lkZS53aGl0ZSk7XHJcbiAgICAgIGxldCByaWdodF9lbiA9IHJvb20uZ2V0X21ldGEocmlnaHRfY29yZHMsc2lkZS53aGl0ZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJpZ2h0X2VuKTtcclxuICAgICAgaWYoKGNvcmRzWzBdIC0gMSA+PSAwKSAmJiAoKGxlZnQubGVuZ3RoID4gMCAmJiBsZWZ0WzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSkgfHwgKGxlZnRfZW4gJiYgbGVmdF9lbi5lbnBhc3NlbnQpKSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChsZWZ0X2NvcmRzKTtcclxuICAgICAgfVxyXG4gICAgICBpZigoY29yZHNbMF0gKyAxIDwgOCkgJiYgKChyaWdodC5sZW5ndGggPiAwICYmIHJpZ2h0WzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSkgfHwgKHJpZ2h0X2VuICYmIHJpZ2h0X2VuLmVucGFzc2VudCkpKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKHJpZ2h0X2NvcmRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0dGFja2VkO1xyXG4gIH1cclxufSIsImltcG9ydCB7b2JqfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge3Nwcml0ZSxzcHJpdGVfZ2VufSBmcm9tIFwiLi4vLi4vbGliL3Nwcml0ZVwiO1xyXG5pbXBvcnQge2JvYXJkX3N0YXRlLCBCb2FyZH0gZnJvbSBcIi4uL3Jvb21zL2JvYXJkXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5pbXBvcnQgeyBVbmJpbmQgfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5leHBvcnQgZW51bSBzaWRle1xyXG4gIHdoaXRlLFxyXG4gIGJsYWNrXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIHBpZWNlX3R5cGV7XHJcbiAgcGF3bixcclxuICByb29rLFxyXG4gIGJpc2hvcCxcclxuICBxdWVlbixcclxuICBraW5nLFxyXG4gIGtuaWdodFxyXG59XHJcblxyXG5pbnRlcmZhY2UgcGllY2Vfc3RhdGV7XHJcbiAgcG9zaXRpb246e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH0sXHJcbiAgc2lkZTpzaWRlLFxyXG4gIHR5cGU6cGllY2VfdHlwZSxcclxuICBoYXNfbW92ZWQ6Ym9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgcGllY2UgZXh0ZW5kcyBvYmo8cGllY2Vfc3RhdGU+e1xyXG4gIGhlaWdodCA9IDEwMDtcclxuICB3aWR0aCA9IDEwMDtcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKHBvczpbbnVtYmVyLG51bWJlcl0sc2lkZTpzaWRlLHR5cGU6cGllY2VfdHlwZSl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6cG9zWzBdICogdGhpcy53aWR0aCxcclxuICAgICAgICB5OnBvc1sxXSAqIHRoaXMuaGVpZ2h0XHJcbiAgICAgIH0sXHJcbiAgICAgIHNpZGUsXHJcbiAgICAgIHR5cGUsXHJcbiAgICAgIGhhc19tb3ZlZDpmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICBtb3ZldG9Db3JkcyhhOltudW1iZXIsbnVtYmVyXSl7XHJcbiAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnggPSBhWzBdICogdGhpcy53aWR0aDtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueSA9IGFbMV0gKiB0aGlzLmhlaWdodDtcclxuICB9XHJcbiAgZ2V0Q29yZHMoKTpbbnVtYmVyLG51bWJlcl17XHJcbiAgICByZXR1cm4gW3RoaXMuc3RhdGUucG9zaXRpb24ueC8xMDAsdGhpcy5zdGF0ZS5wb3NpdGlvbi55LzEwMF07XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG4gIHJlbmRlcmYodDpudW1iZXIpe1xyXG4gICAgbGV0IHNwcml0ZXMgPSBzcHJpdGVfZ2VuKHRoaXMuc3ByaXRlX3NoZWV0LHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG4gICAgaWYodGhpcy5zdGF0ZS5zaWRlID09PSBzaWRlLndoaXRlKXtcclxuICAgICAgcmV0dXJuIHNwcml0ZXNbMF07XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gc3ByaXRlc1sxXTtcclxuICAgIH1cclxuICB9XHJcbiAgYXR0YWNrRGlhZ29uYWwoKXtcclxuICAgIGxldCBjb3JkcyA9IHRoaXMuZ2V0Q29yZHMoKTtcclxuICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKSBhcyBCb2FyZDtcclxuICAgIGxldCBhdHRhY2tlZDpBcnJheTxbbnVtYmVyLG51bWJlcl0+ID0gW107XHJcbiAgICBmb3IobGV0IGEgPSAxO2EgPCA4O2ErKyl7XHJcbiAgICAgIGlmKGNvcmRzWzBdIC0gYSA+PSAwICYmIGNvcmRzWzBdIC0gYSA8IDggJiYgY29yZHNbMV0gLSBhID49IDAgJiYgY29yZHNbMV0gLSBhIDwgOCl7XHJcbiAgICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSAtIGEsY29yZHNbMV0gLSBhXSk7XHJcbiAgICAgICAgaWYocGllY2VzLmxlbmd0aCA9PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSBhLGNvcmRzWzFdIC0gYV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH0gIFxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBhID0gMTthIDwgODthKyspe1xyXG4gICAgICBpZihjb3Jkc1swXSAtIGEgPj0gMCAmJiBjb3Jkc1swXSAtIGEgPCA4ICYmIGNvcmRzWzFdICsgYSA+PSAwICYmIGNvcmRzWzFdICsgYSA8IDgpe1xyXG4gICAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0gLSBhLGNvcmRzWzFdICsgYV0pO1xyXG4gICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdIC0gYSxjb3Jkc1sxXSArIGFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGllY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICBcclxuICAgIH1cclxuICAgIGZvcihsZXQgYSA9IDE7YSA8IDg7YSsrKXtcclxuICAgICAgaWYoY29yZHNbMF0gKyBhID49IDAgJiYgY29yZHNbMF0gKyBhIDwgOCAmJiBjb3Jkc1sxXSArIGEgPj0gMCAmJiBjb3Jkc1sxXSArIGEgPCA4KXtcclxuICAgICAgICBsZXQgcGllY2VzID0gcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdICsgYSxjb3Jkc1sxXSArIGFdKTtcclxuICAgICAgICBpZihwaWVjZXMubGVuZ3RoID09IDAgfHwgcGllY2VzWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSArIGEsY29yZHNbMV0gKyBhXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gIFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGEgPSAxO2EgPCA4O2ErKyl7XHJcbiAgICAgIGlmKGNvcmRzWzBdICsgYSA+PSAwICYmIGNvcmRzWzBdICsgYSA8IDggJiYgY29yZHNbMV0gLSBhID49IDAgJiYgY29yZHNbMV0gLSBhIDwgOCl7XHJcbiAgICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSArIGEsY29yZHNbMV0gLSBhXSk7XHJcbiAgICAgICAgaWYocGllY2VzLmxlbmd0aCA9PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyBhLGNvcmRzWzFdIC0gYV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9ICBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0dGFja2VkO1xyXG4gIH1cclxuICBhdHRhY2tDYXJkaW5hbCgpe1xyXG4gICAgbGV0IGNvcmRzID0gdGhpcy5nZXRDb3JkcygpO1xyXG4gICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpIGFzIEJvYXJkO1xyXG4gICAgbGV0IGF0dGFja2VkOkFycmF5PFtudW1iZXIsbnVtYmVyXT4gPSBbXTtcclxuICAgIGZvcihsZXQgYSA9IGNvcmRzWzBdIC0gMTthID49IDA7YS0tKXtcclxuICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFthLGNvcmRzWzFdXSk7XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT09IDAgfHwgcGllY2VzWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChbYSxjb3Jkc1sxXV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBhID0gY29yZHNbMF0gKyAxO2EgPCA4O2ErKyl7XHJcbiAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShbYSxjb3Jkc1sxXV0pO1xyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID09PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2goW2EsY29yZHNbMV1dKTtcclxuICAgICAgfVxyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZvcihsZXQgYSA9IGNvcmRzWzFdIC0gMTthID49IDA7YS0tKXtcclxuICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSxhXSk7XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT09IDAgfHwgcGllY2VzWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0sYV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBhID0gY29yZHNbMV0gKyAxO2EgPCA4O2ErKyl7XHJcbiAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0sYV0pO1xyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID09PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdLGFdKTtcclxuICAgICAgfVxyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhdHRhY2tlZDtcclxuICB9XHJcbiAgdW5iaW5kX2NvbnRyb2xzKCl7XHJcbiAgICBmb3IobGV0IGEgb2YgdGhpcy5iaW5kcyl7XHJcbiAgICAgIFVuYmluZChhKTtcclxuICAgIH1cclxuICB9XHJcbiAgYmluZF9jb250cm9scygpe1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIk1vdXNlMVwiLCgpPT57XHJcbiAgICAgIGxldCByb29tID0gZ2V0R2FtZSgpLnN0YXRlLmN1cnJlbnRfcm9vbSBhcyBCb2FyZDtcclxuICAgICAgaWYocm9vbS5zdGF0ZS50dXJuID09PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgIHJvb20uc3RhdGUuc2VsZWN0ZWQgPSB0aGlzO1xyXG4gICAgICAgIHJvb20uY2xlYXJfYXR0YWNrZWQoKTtcclxuICAgICAgICBsZXQgdmFsaWRfYXR0YWNrZWQgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGcgb2YgdGhpcy5nZXRBdHRhY2tpbmcoKSl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShnKTtcclxuICAgICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICAgICAgdmFsaWRfYXR0YWNrZWQucHVzaChnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcm9vbS5zdGF0ZS5hdHRhY2tlZCA9IHZhbGlkX2F0dGFja2VkO1xyXG4gICAgICAgIHJvb20uYXR0YWNrKHZhbGlkX2F0dGFja2VkKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn0iLCJpbXBvcnQge3BpZWNlLHNpZGUscGllY2VfdHlwZX0gZnJvbSBcIi4vcGllY2VcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gXCIuLi9yb29tcy9ib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZWVuIGV4dGVuZHMgcGllY2V7XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9zcHJpdGVzL3F1ZWVuLnBuZ1wiXHJcbiAgY29uc3RydWN0b3IocG9zOltudW1iZXIsbnVtYmVyXSxzaWRlOnNpZGUpe1xyXG4gICAgc3VwZXIocG9zLHNpZGUscGllY2VfdHlwZS5xdWVlbik7XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2tEaWFnb25hbCgpLmNvbmNhdCh0aGlzLmF0dGFja0NhcmRpbmFsKCkpO1xyXG4gIH1cclxufSIsImltcG9ydCB7cGllY2Usc2lkZSxwaWVjZV90eXBlfSBmcm9tIFwiLi9waWVjZVwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSBcIi4uL3Jvb21zL2JvYXJkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm9vayBleHRlbmRzIHBpZWNle1xyXG4gIHNwcml0ZV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvc3ByaXRlcy9yb29rLnBuZ1wiXHJcbiAgY29uc3RydWN0b3IocG9zOltudW1iZXIsbnVtYmVyXSxzaWRlOnNpZGUpe1xyXG4gICAgc3VwZXIocG9zLHNpZGUscGllY2VfdHlwZS5yb29rKTtcclxuICB9XHJcbiAgZ2V0QXR0YWNraW5nKCk6QXJyYXk8W251bWJlcixudW1iZXJdPntcclxuICAgIHJldHVybiB0aGlzLmF0dGFja0NhcmRpbmFsKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtyb29tLHJvb21faX0gZnJvbSBcIi4uLy4uL2xpYi9yb29tXCI7XHJcbmltcG9ydCB7cGllY2V9IGZyb20gXCIuLi8uLi9nYW1lL29iamVjdHMvcGllY2VcIjtcclxuaW1wb3J0IHtLbmlnaHR9IGZyb20gXCIuLi8uLi9nYW1lL29iamVjdHMva25pZ2h0XCI7XHJcbmltcG9ydCB7Um9va30gZnJvbSBcIi4uLy4uL2dhbWUvb2JqZWN0cy9yb29rXCI7XHJcbmltcG9ydCB7bW92ZX0gZnJvbSBcIi4uLy4uL2dhbWUvb2JqZWN0cy9tb3ZlXCI7XHJcbmltcG9ydCB7b2JqfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQgeyBCaXNob3AgfSBmcm9tIFwiLi4vb2JqZWN0cy9iaXNob3BcIjtcclxuaW1wb3J0IHsgUXVlZW4gfSBmcm9tIFwiLi4vb2JqZWN0cy9xdWVlblwiO1xyXG5pbXBvcnQgeyBLaW5nIH0gZnJvbSBcIi4uL29iamVjdHMva2luZ1wiO1xyXG5pbXBvcnQgeyBQYXduIH0gZnJvbSBcIi4uL29iamVjdHMvcGF3blwiO1xyXG5cclxuZXhwb3J0IGVudW0gc2lkZXtcclxuICB3aGl0ZSxcclxuICBibGFja1xyXG59XHJcblxyXG5pbnRlcmZhY2Ugc3BhY2Vfc3RhdGV7XHJcbiAgZW5wYXNzZW50OmJvb2xlYW4sXHJcbiAgYXR0YWNrZWQ6Ym9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGJvYXJkX3N0YXRle1xyXG4gIHR1cm46c2lkZSxcclxuICB3aGl0ZV9ib2FyZDpBcnJheTxBcnJheTxzcGFjZV9zdGF0ZT4+LFxyXG4gIGJsYWNrX2JvYXJkOkFycmF5PEFycmF5PHNwYWNlX3N0YXRlPj5cclxuICBzZWxlY3RlZDpwaWVjZSxcclxuICBzcXVhcmVzOkFycmF5PEFycmF5PG1vdmU+PixcclxuICBwaWVjZXM6QXJyYXk8cGllY2U+LFxyXG4gIGF0dGFja2VkOkFycmF5PFtudW1iZXIsbnVtYmVyXT5cclxufVxyXG5leHBvcnQgY2xhc3MgQm9hcmQgZXh0ZW5kcyByb29tPGJvYXJkX3N0YXRlPntcclxuICBiYWNrZ3JvdW5kX3VybD1cImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvcm9vbXMvYm9hcmQucG5nXCI7XHJcbiAgb2JqZWN0czpBcnJheTxvYmo8dW5rbm93bj4+ID0gW107XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICB0dXJuOnNpZGUud2hpdGUsXHJcbiAgICAgIHdoaXRlX2JvYXJkOltdLFxyXG4gICAgICBibGFja19ib2FyZDpbXSxcclxuICAgICAgc2VsZWN0ZWQ6dW5kZWZpbmVkLFxyXG4gICAgICBzcXVhcmVzOltdLFxyXG4gICAgICBwaWVjZXM6W10sXHJcbiAgICAgIGF0dGFja2VkOltdXHJcbiAgICB9O1xyXG4gICAgbGV0IHJvdzIgPSBbbmV3IFJvb2soWzAsN10sc2lkZS5ibGFjayksbmV3IEtuaWdodChbMSw3XSxzaWRlLmJsYWNrKSxuZXcgQmlzaG9wKFsyLDddLHNpZGUuYmxhY2spLG5ldyBRdWVlbihbMyw3XSxzaWRlLmJsYWNrKSxuZXcgS2luZyhbNCw3XSxzaWRlLmJsYWNrKSxuZXcgQmlzaG9wKFs1LDddLHNpZGUuYmxhY2spLG5ldyBLbmlnaHQoWzYsN10sc2lkZS5ibGFjayksbmV3IFJvb2soWzcsN10sc2lkZS5ibGFjayldO1xyXG4gICAgbGV0IHJvdzcgPSBbbmV3IFJvb2soWzAsMF0sc2lkZS53aGl0ZSksbmV3IEtuaWdodChbMSwwXSxzaWRlLndoaXRlKSxuZXcgQmlzaG9wKFsyLDBdLHNpZGUud2hpdGUpLG5ldyBRdWVlbihbMywwXSxzaWRlLndoaXRlKSxuZXcgS2luZyhbNCwwXSxzaWRlLndoaXRlKSxuZXcgQmlzaG9wKFs1LDBdLHNpZGUud2hpdGUpLG5ldyBLbmlnaHQoWzYsMF0sc2lkZS53aGl0ZSksbmV3IFJvb2soWzcsMF0sc2lkZS53aGl0ZSldO1xyXG4gICAgZm9yKGxldCBhID0gMDthIDwgcm93Mi5sZW5ndGg7YSsrKXtcclxuICAgICAgbGV0IHBhd24xID0gbmV3IFBhd24oW2EsMV0sc2lkZS53aGl0ZSk7XHJcbiAgICAgIGxldCBwYXduMiA9IG5ldyBQYXduKFthLDZdLHNpZGUuYmxhY2spO1xyXG4gICAgICB0aGlzLm9iamVjdHMucHVzaChyb3c3W2FdKTtcclxuICAgICAgdGhpcy5vYmplY3RzLnB1c2gocGF3bjEpO1xyXG4gICAgICB0aGlzLm9iamVjdHMucHVzaChyb3cyW2FdKTtcclxuICAgICAgdGhpcy5vYmplY3RzLnB1c2gocGF3bjIpO1xyXG4gICAgICB0aGlzLnN0YXRlLnBpZWNlcy5wdXNoKHBhd24yKTtcclxuICAgICAgdGhpcy5zdGF0ZS5waWVjZXMucHVzaChyb3c3W2FdKTtcclxuICAgICAgdGhpcy5zdGF0ZS5waWVjZXMucHVzaChwYXduMSk7XHJcbiAgICAgIHRoaXMuc3RhdGUucGllY2VzLnB1c2gocm93MlthXSk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBhID0gMDthPDg7YSsrKXtcclxuICAgICAgbGV0IG12X3JvdzpBcnJheTxtb3ZlPiA9IFtdO1xyXG4gICAgICBmb3IobGV0IGIgPSAwO2I8ODtiKyspe1xyXG4gICAgICAgIGxldCBkID0gYTtcclxuICAgICAgICAoKCk9PiB7XHJcbiAgICAgICAgICBsZXQgbW92ZV9vID0gbmV3IG1vdmUoW2EsYl0pO1xyXG4gICAgICAgICAgbXZfcm93LnB1c2gobW92ZV9vKTtcclxuICAgICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG1vdmVfbyk7XHJcbiAgICAgICAgfSkoKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RhdGUuc3F1YXJlcy5wdXNoKG12X3Jvdyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlLmJsYWNrX2JvYXJkID0gdGhpcy5ibGFua19ib2FyZCgpO1xyXG4gICAgdGhpcy5zdGF0ZS53aGl0ZV9ib2FyZCA9IHRoaXMuYmxhbmtfYm9hcmQoKTtcclxuICAgIGZvcihsZXQgeCBvZiB0aGlzLnN0YXRlLnBpZWNlcyl7XHJcbiAgICAgIGlmKHguc3RhdGUuc2lkZSA9PT0gc2lkZS53aGl0ZSl7XHJcbiAgICAgICAgeC5iaW5kX2NvbnRyb2xzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0X21ldGEoYTpbbnVtYmVyLG51bWJlcl0sczpzaWRlKXtcclxuICAgIGlmKGFbMF0gPj0gMCAmJiBhWzBdIDwgOCAmJiBhWzFdID49IDAgJiYgYVsxXSA8IDgpe1xyXG4gICAgICBpZihzID09PSBzaWRlLndoaXRlKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS53aGl0ZV9ib2FyZFthWzBdXVthWzFdXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5zdGF0ZS5ibGFja19ib2FyZFthWzBdXVthWzFdXTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIGNoYW5nZV9zaWRlKHM6c2lkZSl7XHJcbiAgICBsZXQgdG9fYmluZDtcclxuICAgIGxldCB0b191bmJpbmQ7XHJcbiAgICBcclxuICAgIGlmKHMgPT0gc2lkZS53aGl0ZSl7XHJcbiAgICAgIHRvX2JpbmQgPSBzO1xyXG4gICAgICB0b191bmJpbmQgPSBzaWRlLmJsYWNrO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5jbGVhcl9lbnBhc3NlbnRfYm9hcmQodGhpcy5zdGF0ZS53aGl0ZV9ib2FyZCk7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmNsZWFyX2F0dGFja2VkX2JvYXJkKHRoaXMuc3RhdGUuYmxhY2tfYm9hcmQpO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5jYWxjdWxhdGVfYXR0YWNrZWRfYm9hcmQodGhpcy5zdGF0ZS5ibGFja19ib2FyZCxzaWRlLmJsYWNrKTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB0b19iaW5kID0gc2lkZS5ibGFjaztcclxuICAgICAgdG9fdW5iaW5kID0gc2lkZS53aGl0ZTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuY2xlYXJfZW5wYXNzZW50X2JvYXJkKHRoaXMuc3RhdGUuYmxhY2tfYm9hcmQpO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5jbGVhcl9hdHRhY2tlZF9ib2FyZCh0aGlzLnN0YXRlLndoaXRlX2JvYXJkKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlX2F0dGFja2VkX2JvYXJkKHRoaXMuc3RhdGUud2hpdGVfYm9hcmQsc2lkZS53aGl0ZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUud2hpdGVfYm9hcmQpO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIGZvcihsZXQgeCBvZiB0aGlzLnN0YXRlLnBpZWNlcyl7XHJcbiAgICAgIGlmKHguc3RhdGUuc2lkZSA9PT0gdG9fYmluZCl7XHJcbiAgICAgICAgeC5iaW5kX2NvbnRyb2xzKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICB4LnVuYmluZF9jb250cm9scygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlLnR1cm4gPSBzO1xyXG4gIH1cclxuICBjbGVhcl9lbnBhc3NlbnRfYm9hcmQoeDpBcnJheTxBcnJheTxzcGFjZV9zdGF0ZT4+KXtcclxuICAgIGZvcihsZXQgYSA9IDA7YTw4O2ErKyl7XHJcbiAgICAgIGZvcihsZXQgYiA9IDA7Yjw4O2IrKyl7XHJcbiAgICAgICAgeFthXVtiXS5lbnBhc3NlbnQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBjYWxjdWxhdGVfYXR0YWNrZWRfYm9hcmQoeDpBcnJheTxBcnJheTxzcGFjZV9zdGF0ZT4+LHM6c2lkZSl7XHJcbiAgICBmb3IobGV0IGEgb2YgdGhpcy5zdGF0ZS5waWVjZXMpe1xyXG4gICAgICBpZihhLnN0YXRlLnNpZGUgPT0gcyl7XHJcbiAgICAgICAgbGV0IGF0dGFja2VkID0gYS5nZXRBdHRhY2tpbmcoKTtcclxuICAgICAgICBmb3IobGV0IGIgb2YgYXR0YWNrZWQpe1xyXG4gICAgICAgICAgeFtiWzBdXVtiWzFdXS5hdHRhY2tlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gIH1cclxuICBjbGVhcl9hdHRhY2tlZF9ib2FyZCh4OkFycmF5PEFycmF5PHNwYWNlX3N0YXRlPj4pe1xyXG4gICAgZm9yKGxldCBhID0gMDthPDg7YSsrKXtcclxuICAgICAgZm9yKGxldCBiID0gMDtiPDg7YisrKXtcclxuICAgICAgICB4W2FdW2JdLmF0dGFja2VkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgYmxhbmtfYm9hcmQoKXtcclxuICAgIGxldCBib2FyZCA9IFtdO1xyXG4gICAgZm9yKGxldCBhID0gMDthPDg7YSsrKXtcclxuICAgICAgbGV0IHJvdyA9IFtdO1xyXG4gICAgICBmb3IobGV0IGIgPSAwO2I8ODtiKyspe1xyXG4gICAgICAgIHJvdy5wdXNoKHtcclxuICAgICAgICAgIGVucGFzc2VudDpmYWxzZSxcclxuICAgICAgICAgIGF0dGFja2VkOmZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgYm9hcmQucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuICBhc3luYyBhZGRfcGllY2UoYTpwaWVjZSl7XHJcbiAgICBhd2FpdCBhLmxvYWQoKTtcclxuICAgIHRoaXMub2JqZWN0cy51bnNoaWZ0KGEpO1xyXG4gICAgdGhpcy5zdGF0ZS5waWVjZXMudW5zaGlmdChhKTtcclxuICB9XHJcbiAgcmVtb3ZlX3BpZWNlKGE6cGllY2Upe1xyXG4gICAgZm9yKGxldCBiID0gMDtiIDwgdGhpcy5zdGF0ZS5waWVjZXMubGVuZ3RoO2IrKyl7XHJcbiAgICAgIGlmKGEuaWQgPT09IHRoaXMuc3RhdGUucGllY2VzW2JdLmlkKXtcclxuICAgICAgICB0aGlzLnN0YXRlLnBpZWNlcy5zcGxpY2UoYiwxKTtcclxuICAgICAgfSAgIFxyXG4gICAgfVxyXG4gICAgYS5kZWxldGUoKTtcclxuICB9XHJcbiAgZ2V0X3BpZWNlKGE6W251bWJlcixudW1iZXJdKTpBcnJheTxwaWVjZT57XHJcbiAgICByZXR1cm4gKHRoaXMuY2hlY2tfY29sbGlzaW9ucyh7XHJcbiAgICAgIHg6YVswXSAqIDEwMCxcclxuICAgICAgeTphWzFdICogMTAwLFxyXG4gICAgICBoZWlnaHQ6MTAwLFxyXG4gICAgICB3aWR0aDoxMDBcclxuICAgIH0pIGFzIEFycmF5PHBpZWNlPik7XHJcbiAgfVxyXG4gIGNsZWFyX2F0dGFja2VkKCl7XHJcbiAgICBmb3IobGV0IGEgb2YgdGhpcy5zdGF0ZS5hdHRhY2tlZCl7XHJcbiAgICAgIHRoaXMuc3RhdGUuc3F1YXJlc1thWzBdXVthWzFdXS5yZW5kZXIgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgYXR0YWNrKHg6QXJyYXk8W251bWJlcixudW1iZXJdPil7XHJcbiAgICBmb3IobGV0IGEgb2YgeCl7XHJcbiAgICAgIHRoaXMuc3RhdGUuc3F1YXJlc1thWzBdXVthWzFdXS5yZW5kZXIgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuICBhc3luYyBzdGF0ZWYoYTpudW1iZXIpe1xyXG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLm9iamVjdHMpO1xyXG4gIH1cclxufSIsImltcG9ydCB7b2JqLGdldElkfSBmcm9tIFwiLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4uL2xpYi9zdGF0ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBjb2xsaXNpb25fYm94e1xyXG4gIHg6bnVtYmVyO1xyXG4gIHk6bnVtYmVyO1xyXG4gIHdpZHRoOm51bWJlcjtcclxuICBoZWlnaHQ6bnVtYmVyO1xyXG59XHJcblxyXG5lbnVtIGRpcmVjdGlvbntcclxuICBsZWZ0LFxyXG4gIHJpZ2h0LFxyXG4gIHVwLFxyXG4gIGRvd25cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrX2FsbF9vYmplY3RzKGM6IGNvbGxpc2lvbl9ib3gsb2JqczpBcnJheTxvYmo8dW5rbm93bj4+LGV4ZW1wdGlvbjpzdHJpbmcpOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgbGV0IG1hdGNoZWQgPSBbXTtcclxuICBmb3IgKGxldCBhIG9mIG9ianMpIHtcclxuICAgIGlmIChhLmlkICE9PSBleGVtcHRpb24gJiYgYS5jb2xsaWRlc193aXRoX2JveChjKSkge1xyXG4gICAgICBtYXRjaGVkLnB1c2goYSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBtYXRjaGVkXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja19hbGxfY29sbGlzaW9ucyhjOiBjb2xsaXNpb25fYm94LG9ianM6QXJyYXk8b2JqPHVua25vd24+PixleGVtcHRpb246c3RyaW5nKTpBcnJheTxvYmo8dW5rbm93bj4+e1xyXG4gIGxldCBtYXRjaGVkID0gW107XHJcbiAgZm9yIChsZXQgYSBvZiBvYmpzKSB7XHJcbiAgICBpZiAoYS5pZCAhPT0gZXhlbXB0aW9uICYmIGEuY29sbGlzaW9uICYmIGEuY29sbGlkZXNfd2l0aF9ib3goYykpIHtcclxuICAgICAgbWF0Y2hlZC5wdXNoKGEpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbWF0Y2hlZFxyXG59XHJcbi8vQ2hlY2tzIHVwIHRvIHRoZSBmaXJzdCBjb2xsaXNpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrX2NvbGxpc2lvbnMoYzogY29sbGlzaW9uX2JveCwgb2JqczogQXJyYXk8b2JqPHVua25vd24+PiwgZXhlbXB0aW9uOnN0cmluZykge1xyXG4gIGZvciAobGV0IGEgb2Ygb2Jqcykge1xyXG4gICAgaWYgKGEuaWQgIT09IGV4ZW1wdGlvbiAmJiBhLmNvbGxpc2lvbiAmJiBhLmNvbGxpZGVzX3dpdGhfYm94KGMpKSB7XHJcbiAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2ZWxvY2l0eV9tYXgodmVsb2NpdHk6bnVtYmVyLGJveDpjb2xsaXNpb25fYm94LG9ianM6QXJyYXk8b2JqPHVua25vd24+PiwgZXhlbXB0aW9uOnN0cmluZyxkaXI6ZGlyZWN0aW9uKXtcclxuICBsZXQgY29sbGlzaW9uID0gY2hlY2tfY29sbGlzaW9ucyhib3gsIG9ianMsIGV4ZW1wdGlvbik7XHJcbiAgaWYoY29sbGlzaW9uID09IHVuZGVmaW5lZCl7XHJcbiAgICByZXR1cm4gdmVsb2NpdHk7XHJcbiAgfVxyXG4gIGVsc2V7XHJcbiAgICBsZXQgY29sbGlkZXIgPSBjb2xsaXNpb247XHJcbiAgICBsZXQgb3JpZ2luID0gZ2V0SWQob2JqcyxleGVtcHRpb24pO1xyXG4gICAgbGV0IG9yaWdfc3QgPSBvcmlnaW4uc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IGNvbGxpZGVyX3N0ID0gY29sbGlkZXIuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgaWYoZGlyID09IGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgcmV0dXJuIG9yaWdfc3QucG9zaXRpb24ueCAtIChjb2xsaWRlcl9zdC5wb3NpdGlvbi54ICsgY29sbGlkZXIud2lkdGgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgcmV0dXJuIGNvbGxpZGVyX3N0LnBvc2l0aW9uLnggLSAob3JpZ19zdC5wb3NpdGlvbi54ICsgb3JpZ2luLndpZHRoKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZGlyID09IGRpcmVjdGlvbi5kb3duKXtcclxuICAgICAgcmV0dXJuIG9yaWdfc3QucG9zaXRpb24ueSAtIChjb2xsaWRlcl9zdC5wb3NpdGlvbi55ICsgY29sbGlkZXIuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZGlyID09IGRpcmVjdGlvbi51cCl7XHJcbiAgICAgIHJldHVybiBjb2xsaWRlcl9zdC5wb3NpdGlvbi55IC0gKG9yaWdfc3QucG9zaXRpb24ueSArIG9yaWdpbi5oZWlnaHQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayhvYmplY3Q6b2JqPHVua25vd24+LGxpc3Q6QXJyYXk8b2JqPHVua25vd24+Pikge1xyXG4gIGxldCBvYiA9IG9iamVjdDtcclxuICBsZXQgc3QgPSBvYmplY3QuZ2V0U3RhdGUoKSBhcyBvYmpfc3RhdGU7XHJcbiAgbGV0IHhfdmVsID0gc3QudmVsb2NpdHkueDtcclxuICBsZXQgeV92ZWwgPSBzdC52ZWxvY2l0eS55O1xyXG4gIGlmICh4X3ZlbCA+IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLnggKyBvYi53aWR0aCxcclxuICAgICAgeTogc3QucG9zaXRpb24ueSxcclxuICAgICAgd2lkdGg6IHhfdmVsLFxyXG4gICAgICBoZWlnaHQ6IG9iLmhlaWdodFxyXG4gICAgfTtcclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueCxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24ucmlnaHQpO1xyXG4gICAgaWYodmVsID4gMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnggKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueCA9IDA7ICBcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSBpZiAoeF92ZWwgPCAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiB4X3ZlbCArIHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOiAtMSAqIHhfdmVsLFxyXG4gICAgICBoZWlnaHQ6IG9iLmhlaWdodFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS54LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi5sZWZ0KTtcclxuICAgIGlmKHZlbCA8IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi54ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnggPSAwOyBcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHlfdmVsID4gMCkge1xyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgeDogc3QucG9zaXRpb24ueCxcclxuICAgICAgeTogc3QucG9zaXRpb24ueSArIG9iLmhlaWdodCxcclxuICAgICAgd2lkdGg6IG9iLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHlfdmVsXHJcbiAgICB9XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LnksYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLnVwKTtcclxuICAgIGlmKHZlbCA+IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi55ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIGlmICh5X3ZlbCA8IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHlfdmVsICsgc3QucG9zaXRpb24ueSxcclxuICAgICAgd2lkdGg6IG9iLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IC0xICogeV92ZWxcclxuICAgIH1cclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueSxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24uZG93bik7XHJcbiAgICBpZih2ZWwgPCAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueSArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS55ID0gMDtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQge0dldFNjcmVlbkRpbWVuc2lvbnMsR2V0Vmlld3BvcnREaW1lbnNpb25zLGdldEdhbWV9IGZyb20gXCIuLi92YW5cIjtcclxuaW1wb3J0IHsgY29sbGlzaW9uX2JveCB9IGZyb20gXCIuL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge29ian0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcblxyXG5pbnRlcmZhY2UgbW91c2VQb3N7XHJcbiAgeDpudW1iZXIsXHJcbiAgeTpudW1iZXIsXHJcbiAgbGFzdDp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY29udHJvbF9mdW5je1xyXG4gICgpOnZvaWRcclxufVxyXG5cclxuaW50ZXJmYWNlIG1vdXNlQmluZHN7XHJcbiAgW2tleTpzdHJpbmddOiBBcnJheTxbY29udHJvbF9mdW5jLG9iajx1bmtub3duPl0+XHJcbn1cclxuXHJcbmludGVyZmFjZSBrZXlCaW5kc3tcclxuICBba2V5OnN0cmluZ106IEFycmF5PGNvbnRyb2xfZnVuYz5cclxufVxyXG5sZXQgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXJnZXRcIik7XHJcbnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZSk9PntcclxuICBsZXQgbW91c2UgPSBQb2xsX01vdXNlKCk7XHJcbiAgbGV0IGJveDpjb2xsaXNpb25fYm94ID0ge1xyXG4gICAgeDptb3VzZS54LFxyXG4gICAgeTptb3VzZS55LFxyXG4gICAgaGVpZ2h0OjEsXHJcbiAgICB3aWR0aDoxXHJcbiAgfTtcclxuICBsZXQgZCA9IFsuLi5hbGxfYmluZHNdO1xyXG4gIGZvcihsZXQgYSA9IDA7YSA8IGQubGVuZ3RoO2ErKyl7XHJcbiAgICBsZXQgc2VsZWN0ZWQgPSBkW2FdO1xyXG4gICAgaWYoc2VsZWN0ZWQudHlwZSA9PT0gYnR5cGUubW91c2UgJiYgc2VsZWN0ZWQua2V5ID09PSBcIk1vdXNlMVwiKXtcclxuICAgICAgaWYoc2VsZWN0ZWQub2JqICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHNlbGVjdGVkLm9iai5jb2xsaWRlc193aXRoX2JveChib3gpKXtcclxuICAgICAgICAgIHNlbGVjdGVkLmZ1bmN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7XHJcbiAgICAgICAgc2VsZWN0ZWQuZnVuY3Rpb24oKTsgICAgICAgIFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSAgXHJcbn0pXHJcblxyXG5cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbGxfYmluZHMubGVuZ3RoOyBhKyspIHtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZiAoc2VsZWN0ZWQudHlwZSA9PT0gYnR5cGUua2V5Ym9hcmQgJiYgc2VsZWN0ZWQua2V5ID09PSBlLmNvZGUpIHtcclxuICAgICAgc2VsZWN0ZWQuZnVuY3Rpb24oKTtcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbmxldCB0cmFja2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXJnZXRcIik7XHJcbnRyYWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZSkgPT4ge1xyXG4gIHZhciByZWN0ID0gKGUudGFyZ2V0IGFzIEhUTUxDYW52YXNFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA7XHJcbiAgXHJcbiAgbGFzdF94ID0geDtcclxuICBsYXN0X3kgPSB5O1xyXG4gIHggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7IC8veCBwb3NpdGlvbiB3aXRoaW4gdGhlIGVsZW1lbnQuXHJcbiAgeSA9IGUuY2xpZW50WSAtIHJlY3QudG9wOyAgLy95IHBvc2l0aW9uIHdpdGhpbiB0aGUgZWxlbWVudC5cclxuXHJcbn0pXHJcblxyXG5lbnVtIGJ0eXBle1xyXG4gIG1vdXNlLFxyXG4gIGtleWJvYXJkXHJcbn1cclxuXHJcbmludGVyZmFjZSBiaW5ke1xyXG4gIGtleTpzdHJpbmcsXHJcbiAgdHlwZTpidHlwZSxcclxuICBpZDpudW1iZXIsXHJcbiAgZnVuY3Rpb246Y29udHJvbF9mdW5jLFxyXG4gIG9iaj86b2JqPHVua25vd24+XHJcbn1cclxuXHJcbmxldCB4ID0gMDtcclxubGV0IHkgPSAwO1xyXG5sZXQgbGFzdF94ID0gMDtcclxubGV0IGxhc3RfeSA9IDA7XHJcbmxldCBiaW5kczprZXlCaW5kcyA9IHt9O1xyXG5sZXQgbW91c2VCaW5kczptb3VzZUJpbmRzID0ge307XHJcbmxldCBiaW5kX2NvdW50ID0gMDtcclxuXHJcbmxldCBhbGxfYmluZHM6QXJyYXk8YmluZD4gPSBbXVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQb2xsX01vdXNlKCk6bW91c2VQb3N7XHJcbiAgbGV0IGhlaWdodCA9IEdldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICBsZXQgY2FudmFzID0gZ2V0R2FtZSgpLnN0YXRlLmNhbnZhcztcclxuICBsZXQgd3JhdGlvID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpLndpZHRoKS9HZXRWaWV3cG9ydERpbWVuc2lvbnMoKS53aWR0aDtcclxuICBsZXQgdnJhdGlvID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpLmhlaWdodCkvR2V0Vmlld3BvcnREaW1lbnNpb25zKCkuaGVpZ2h0O1xyXG4gIGxldCBjYW1lcmEgPSBnZXRHYW1lKCkuc3RhdGUuY2FtZXJhO1xyXG4gIHJldHVybiAoe1xyXG4gICAgeDogKHgvd3JhdGlvL2NhbWVyYS5zdGF0ZS5zY2FsaW5nICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLngpICxcclxuICAgIHk6ICgoaGVpZ2h0IC0geS92cmF0aW8pL2NhbWVyYS5zdGF0ZS5zY2FsaW5nICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnkpLFxyXG4gICAgbGFzdDp7XHJcbiAgICAgIHg6ICh4L3dyYXRpby9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54KSxcclxuICAgICAgeTogKChoZWlnaHQgLSB5L3ZyYXRpbykvY2FtZXJhLnN0YXRlLnNjYWxpbmcgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueSlcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVW5iaW5kKGJpbmRfaWQ6bnVtYmVyKXtcclxuICBmb3IobGV0IGEgPSAwO2EgPCBhbGxfYmluZHMubGVuZ3RoOyBhKyspe1xyXG4gICAgaWYoYWxsX2JpbmRzW2FdLmlkID09IGJpbmRfaWQpe1xyXG4gICAgICBhbGxfYmluZHMuc3BsaWNlKGEsMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmxldCBpZCA9IDA7XHJcbmV4cG9ydCBmdW5jdGlvbiBCaW5kKGtleW5hbWU6c3RyaW5nLGZ1bmM6Y29udHJvbF9mdW5jLG9iamVjdD86b2JqPHVua25vd24+KTpudW1iZXJ7XHJcbiAgaWYoa2V5bmFtZS5zbGljZSgwLDUpID09PSBcIk1vdXNlXCIpe1xyXG4gICAgYWxsX2JpbmRzLnB1c2goe1xyXG4gICAgICBrZXk6a2V5bmFtZSxcclxuICAgICAgdHlwZTpidHlwZS5tb3VzZSxcclxuICAgICAgaWQ6aWQsXHJcbiAgICAgIGZ1bmN0aW9uOmZ1bmMsXHJcbiAgICAgIG9iajpvYmplY3RcclxuICAgIH0pXHJcbiAgfVxyXG4gIGVsc2V7XHJcbiAgICBhbGxfYmluZHMucHVzaCh7XHJcbiAgICAgIGtleTprZXluYW1lLFxyXG4gICAgICB0eXBlOmJ0eXBlLmtleWJvYXJkLFxyXG4gICAgICBpZDppZCxcclxuICAgICAgZnVuY3Rpb246ZnVuY1xyXG4gICAgfSlcclxuICB9XHJcbiAgaWQrKztcclxuICByZXR1cm4gaWQgLSAxO1xyXG59IiwiaW1wb3J0IHtzdGF0ZV9mdW5jLG9ial9zdGF0ZX0gZnJvbSBcIi4vc3RhdGVcIjtcclxuaW1wb3J0IHtyZW5kZXJfZnVuY30gZnJvbSBcIi4vcmVuZGVyXCI7XHJcbmltcG9ydCB7c3ByaXRlfSBmcm9tIFwiLi9zcHJpdGVcIjtcclxuaW1wb3J0IHtjb2xsaXNpb25fYm94fSBmcm9tIFwiLi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7VW5iaW5kLEJpbmQsY29udHJvbF9mdW5jfSBmcm9tIFwiLi9jb250cm9sc1wiO1xyXG5cclxuaW50ZXJmYWNlIG9ial9pPFQ+e1xyXG4gIHN0YXRlZjpzdGF0ZV9mdW5jPFQ+LFxyXG4gIHJlbmRlcmY6cmVuZGVyX2Z1bmNcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldElkKGE6QXJyYXk8b2JqPHVua25vd24+PixpZDpzdHJpbmcpOm9iajx1bmtub3duPntcclxuICBmb3IobGV0IGIgPSAwO2IgPCBhLmxlbmd0aDsgYisrKXtcclxuICAgIGlmKGFbYl0uaWQgPT0gaWQpe1xyXG4gICAgICByZXR1cm4gYVtiXTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxubGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIG9iajxUPntcclxuICBzcHJpdGVfdXJsID0gXCJcIjtcclxuICBzcHJpdGVfc2hlZXQ6SFRNTEltYWdlRWxlbWVudDtcclxuICBzdGF0ZTpUO1xyXG4gIGhlaWdodDpudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgd2lkdGg6bnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIGNvbGxpc2lvbjpib29sZWFuID0gZmFsc2U7XHJcbiAgaWQ6c3RyaW5nO1xyXG4gIGJpbmRzOkFycmF5PG51bWJlcj47XHJcbiAgcmVuZGVyID0gdHJ1ZTtcclxuICBnZXRTdGF0ZSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XHJcbiAgfVxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB0aGlzLmlkID0gXCJcIitjb3VudGVyO1xyXG4gICAgdGhpcy5iaW5kcyA9IFtdOyAgXHJcbiAgICBjb3VudGVyKys7XHJcbiAgICB0aGlzLnJlZ2lzdGVyX2NvbnRyb2xzKCk7XHJcbiAgfVxyXG4gIGxvYWQoKXtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCBhID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGEuc3JjID0gdGhpcy5zcHJpdGVfdXJsO1xyXG4gICAgICBhLm9ubG9hZCA9ICgoKT0+e1xyXG4gICAgICAgIF90aGlzLnNwcml0ZV9zaGVldCA9IGE7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIGJpbmRDb250cm9sKGtleTpzdHJpbmcsZnVuYzpjb250cm9sX2Z1bmMpe1xyXG4gICAgaWYoa2V5ID09IFwiTW91c2UxXCIpe1xyXG4gICAgICBsZXQgYiA9IEJpbmQoa2V5LGZ1bmMsdGhpcyk7XHJcbiAgICAgIHRoaXMuYmluZHMucHVzaChiKTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHRoaXMuYmluZHMucHVzaChCaW5kKGtleSxmdW5jKSk7IFxyXG4gICAgfVxyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpe1xyXG5cclxuICB9XHJcbiAgZGVsZXRlKCl7XHJcbiAgICBmb3IobGV0IGEgb2YgdGhpcy5iaW5kcyl7XHJcbiAgICAgIFVuYmluZChhKTtcclxuICAgIH1cclxuICAgIGdldEdhbWUoKS5nZXRSb29tKCkuZGVsZXRlSXRlbSh0aGlzLmlkKTtcclxuICB9XHJcbiAgY29sbGlzaW9uX2NoZWNrKGE6Y29sbGlzaW9uX2JveCk6QXJyYXk8b2JqPHVua25vd24+PntcclxuICAgIGlmKHRoaXMuY29sbGlzaW9uKXtcclxuICAgICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpO1xyXG4gICAgICByZXR1cm4gcm9vbS5jaGVja19jb2xsaXNpb25zKGEsdGhpcy5pZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOm51bWJlcil7XHJcbiAgfVxyXG4gIGNvbGxpZGVzX3dpdGhfYm94KGE6Y29sbGlzaW9uX2JveCk6Ym9vbGVhbntcclxuICAgIGxldCBzdCA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgaGNvbGxpZGVzID0gZmFsc2UsIHZjb2xsaWRlcyA9IGZhbHNlO1xyXG4gICAgaWYoc3QucG9zaXRpb24ueCA+PSBhLnggJiYgc3QucG9zaXRpb24ueCA8IChhLnggKyBhLndpZHRoKSl7XHJcbiAgICAgIGhjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihhLnggPiBzdC5wb3NpdGlvbi54ICYmIGEueCA8IChzdC5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCkpe1xyXG4gICAgICBoY29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYoc3QucG9zaXRpb24ueSA+PSBhLnkgJiYgc3QucG9zaXRpb24ueSA8IChhLnkgKyBhLmhlaWdodCkpe1xyXG4gICAgICB2Y29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYoYS55ID4gc3QucG9zaXRpb24ueSAmJiBhLnkgPCAoc3QucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0KSl7XHJcbiAgICAgIHZjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGNvbGxpZGVzICYmIHZjb2xsaWRlcztcclxuICB9XHJcbiAgY29sbGlkZXNfd2l0aChhOm9iajx1bmtub3duPik6Ym9vbGVhbntcclxuICAgIGxldCBzdCA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgc3RfMiA9IGEuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IGhjb2xsaWRlcyA9IGZhbHNlLCB2Y29sbGlkZXMgPSBmYWxzZTtcclxuICAgIGlmKHN0LnBvc2l0aW9uLnggPiBzdF8yLnBvc2l0aW9uLnggJiYgc3QucG9zaXRpb24ueCA8IChzdF8yLnBvc2l0aW9uLnggKyBhLndpZHRoKSl7XHJcbiAgICAgIGhjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihzdF8yLnBvc2l0aW9uLnggPiBzdC5wb3NpdGlvbi54ICYmIHN0XzIucG9zaXRpb24ueCA8IChzdC5wb3NpdGlvbi54ICsgYS53aWR0aCkpe1xyXG4gICAgICBoY29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYoc3QucG9zaXRpb24ueSA+IHN0XzIucG9zaXRpb24ueSAmJiBzdC5wb3NpdGlvbi55IDwgKHN0XzIucG9zaXRpb24ueSArIGEud2lkdGgpKXtcclxuICAgICAgdmNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKHN0XzIucG9zaXRpb24ueSA+IHN0LnBvc2l0aW9uLnkgJiYgc3RfMi5wb3NpdGlvbi55IDwgKHN0LnBvc2l0aW9uLnkgKyBhLndpZHRoKSl7XHJcbiAgICAgIHZjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGNvbGxpZGVzICYmIHZjb2xsaWRlcztcclxuICB9XHJcbiAgcmVuZGVyZih0aW1lOm51bWJlcik6c3ByaXRle1xyXG4gICAgbGV0IHN0ID0gdGhpcy5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBzcHJpdGVfaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICBsZXQgc3ByaXRlX3dpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIGlmKHRoaXMuaGVpZ2h0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgIHNwcml0ZV9oZWlnaHQgPSB0aGlzLnNwcml0ZV9zaGVldC5oZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLndpZHRoID09IHVuZGVmaW5lZCl7XHJcbiAgICAgIHNwcml0ZV93aWR0aCA9IHRoaXMuc3ByaXRlX3NoZWV0LndpZHRoO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3ByaXRlX3NoZWV0OnRoaXMuc3ByaXRlX3NoZWV0LFxyXG4gICAgICBsZWZ0OjAsXHJcbiAgICAgIHRvcDowLFxyXG4gICAgICBzcHJpdGVfd2lkdGgsXHJcbiAgICAgIHNwcml0ZV9oZWlnaHRcclxuICAgIH07XHJcbiAgICBcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBzdGF0aWNfb2Jqe1xyXG4gIHNwcml0ZV91cmwgPSBcIlwiO1xyXG4gIHNwcml0ZTpIVE1MSW1hZ2VFbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgZ3Jhdml0eV9vYmo8VD4gZXh0ZW5kcyBvYmo8VD57XHJcbiAgZ3Jhdml0eSA9IHRydWVcclxufSIsImltcG9ydCB7c3ByaXRlfSBmcm9tIFwiLi9zcHJpdGVcIjtcclxuaW1wb3J0IHtHZXRWaWV3cG9ydERpbWVuc2lvbnN9IGZyb20gXCIuLi92YW5cIjtcclxuaW1wb3J0IHtvYmp9IGZyb20gXCIuL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4vc3RhdGVcIjtcclxuXHJcbmludGVyZmFjZSBjYW1lcmFfc3RhdGV7XHJcbiAgc2NhbGluZzpudW1iZXIsXHJcbiAgc3RyZXRjaDpib29sZWFuLFxyXG4gIHBvc2l0aW9uOntcclxuICAgIHg6bnVtYmVyLFxyXG4gICAgeTpudW1iZXJcclxuICB9XHJcbiAgZGltZW5zaW9uczp7XHJcbiAgICB3aWR0aDpudW1iZXIsXHJcbiAgICBoZWlnaHQ6bnVtYmVyXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FtZXJhe1xyXG4gIHN0YXRlOmNhbWVyYV9zdGF0ZVxyXG4gIGNvbnN0cnVjdG9yKHg6bnVtYmVyLHk6bnVtYmVyLHdpZHRoOm51bWJlcixoZWlnaHQ6bnVtYmVyLHNjYWxpbmc6bnVtYmVyLHN0cmV0Y2g6Ym9vbGVhbil7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzY2FsaW5nLFxyXG4gICAgICBzdHJldGNoLFxyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeDp4L3NjYWxpbmcsXHJcbiAgICAgICAgeTp5L3NjYWxpbmdcclxuICAgICAgfSxcclxuICAgICAgZGltZW5zaW9uczp7XHJcbiAgICAgICAgd2lkdGg6d2lkdGggLyBzY2FsaW5nLFxyXG4gICAgICAgIGhlaWdodDpoZWlnaHQgLyBzY2FsaW5nXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgc2V0IHgoeDpudW1iZXIpe1xyXG4gICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi54ID0geDtcclxuICB9XHJcbiAgc2V0IHkoeTpudW1iZXIpe1xyXG4gICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0geSBcclxuICB9XHJcbiAgZ2V0IHgoKXtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLnBvc2l0aW9uLng7XHJcbiAgfVxyXG4gIGdldCB5KCl7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wb3NpdGlvbi55O1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcmVuZGVyX2Z1bmN7XHJcbiAgKHg6bnVtYmVyLHk6bnVtYmVyLHNjYWxpbmc6bnVtYmVyKTp2b2lkXHJcbn1cclxuXHJcbmludGVyZmFjZSByZWN0YW5nbGV7XHJcbiAgd2lkdGg6bnVtYmVyLFxyXG4gIGhlaWdodDpudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIHNwcml0ZV9hcmdze1xyXG4gIHNwcml0ZTpzcHJpdGUsXHJcbiAgeDpudW1iZXIsXHJcbiAgeTpudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIHJlbmRlcmVyX2FyZ3N7XHJcbiAgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcbiAgY2FtZXJhOkNhbWVyYVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3ByaXRlX3JlbmRlcmVyID0gKHI6cmVuZGVyZXJfYXJncyxzOnNwcml0ZV9hcmdzKSA9PiB7XHJcbiAgbGV0IGNhbWVyYSA9IHIuY2FtZXJhO1xyXG4gIGxldCB2aGVpZ2h0ID0gR2V0Vmlld3BvcnREaW1lbnNpb25zKCkuaGVpZ2h0O1xyXG4gIGxldCBmaW5hbF94ID0gKChzLnggLSBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCkgKiByLmNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgZmluYWxfeSA9ICgodmhlaWdodCAtIHMueSAtIHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueSkgKiByLmNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgaGVpZ2h0ID0gcy5zcHJpdGUuc3ByaXRlX2hlaWdodCAqIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IHdpZHRoID0gcy5zcHJpdGUuc3ByaXRlX3dpZHRoICogci5jYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICByLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgcy5zcHJpdGUuc3ByaXRlX3NoZWV0LFxyXG4gICAgcy5zcHJpdGUubGVmdCxcclxuICAgIHMuc3ByaXRlLnRvcCxcclxuICAgIHMuc3ByaXRlLnNwcml0ZV93aWR0aCxcclxuICAgIHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQsXHJcbiAgICBmaW5hbF94LFxyXG4gICAgZmluYWxfeSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVjdF9yZW5kZXJlciA9IChjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxyZWN0OnJlY3RhbmdsZSx4Om51bWJlcix5Om51bWJlcixjb2xvcjpzdHJpbmcsY2FtZXJhOkNhbWVyYSkgPT4ge1xyXG4gIGxldCB2aGVpZ2h0ID0gR2V0Vmlld3BvcnREaW1lbnNpb25zKCkuaGVpZ2h0O1xyXG4gIGxldCBmaW5hbF94ID0gKCh4IC0gY2FtZXJhLnN0YXRlLnBvc2l0aW9uLngpICogY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBmaW5hbF95ID0gKCh2aGVpZ2h0IC0geSAtIHJlY3QuaGVpZ2h0ICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnkpICogY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBoZWlnaHQgPSByZWN0LmhlaWdodCAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGxldCB3aWR0aCA9IHJlY3Qud2lkdGggKiBjYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgY29udGV4dC5zdHJva2VSZWN0KGZpbmFsX3gsZmluYWxfeSxyZWN0LndpZHRoLGhlaWdodCk7XHJcbn0iLCJpbXBvcnQgeyBncmF2aXR5X29iaixvYmogfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuaW1wb3J0IHsgc3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7IG9ial9zdGF0ZSB9IGZyb20gXCIuL3N0YXRlXCI7XHJcbmltcG9ydCB7IHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayxjaGVja19jb2xsaXNpb25zLGNvbGxpc2lvbl9ib3gsY2hlY2tfYWxsX2NvbGxpc2lvbnMsY2hlY2tfYWxsX29iamVjdHN9IGZyb20gXCIuL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge3JlbmRlcl9jb2xsaXNpb25fYm94LERFQlVHfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7QmluZCxjb250cm9sX2Z1bmN9IGZyb20gXCIuL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7IE92ZXJ3b3JsZCB9IGZyb20gXCIuLi9nYW1lL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5X2dyYXZpdHkob2I6Z3Jhdml0eV9vYmo8dW5rbm93bj4sZ3Jhdl9jb25zdDpudW1iZXIsIGdyYXZfbWF4Om51bWJlcil7XHJcbiAgbGV0IHN0ID0gb2Iuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gIGlmKG9iLmdyYXZpdHkgJiYgc3QudmVsb2NpdHkueSA+IGdyYXZfbWF4KXtcclxuICAgIHN0LnZlbG9jaXR5LnkgKz0gZ3Jhdl9jb25zdDtcclxuICB9XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSByb29tX2k8VD57XHJcbiAgYmFja2dyb3VuZF91cmw6c3RyaW5nLFxyXG4gIG9iamVjdHM6QXJyYXk8b2JqPHVua25vd24+PlxyXG4gIHN0YXRlOlRcclxufVxyXG5leHBvcnQgY2xhc3Mgcm9vbTxUPntcclxuICBiYWNrZ3JvdW5kX3VybDogc3RyaW5nO1xyXG4gIGJhY2tncm91bmQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgb2JqZWN0czogQXJyYXk8b2JqPHVua25vd24+PlxyXG4gIHN0YXRlOiBUXHJcbiAgbG9hZCgpIHtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBsZXQgYSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBsZXQgdG9fYXdhaXQgPSB0aGlzLm9iamVjdHMubWFwKChhKSA9PiBhLmxvYWQoKSk7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRvX2F3YWl0KTtcclxuICAgICAgYS5zcmMgPSB0aGlzLmJhY2tncm91bmRfdXJsO1xyXG4gICAgICBhLm9uZXJyb3IgPSAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgbG9hZGluZyB1cmw6XCIgKyB0aGlzLmJhY2tncm91bmRfdXJsKTtcclxuICAgICAgfSlcclxuICAgICAgYS5vbmxvYWQgPSAoKCkgPT4ge1xyXG4gICAgICAgIF90aGlzLmJhY2tncm91bmQgPSBhO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gIH1cclxuICBkZWxldGVJdGVtKGlkOnN0cmluZyl7XHJcbiAgICBmb3IobGV0IGEgPSAwO2EgPCB0aGlzLm9iamVjdHMubGVuZ3RoO2ErKyl7XHJcbiAgICAgIGlmKHRoaXMub2JqZWN0c1thXS5pZCA9PT0gaWQpe1xyXG4gICAgICAgIHRoaXMub2JqZWN0cyA9IHRoaXMub2JqZWN0cy5zbGljZSgwLGEpLmNvbmNhdCh0aGlzLm9iamVjdHMuc2xpY2UoYSsxKSk7XHJcbiAgICAgICAgYS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGJpbmRDb250cm9sKGtleTpzdHJpbmcsZnVuYzpjb250cm9sX2Z1bmMpe1xyXG4gICAgQmluZChrZXksZnVuYyk7IFxyXG4gIH1cclxuICBjaGVja19jb2xsaXNpb25zKGJveDpjb2xsaXNpb25fYm94LGV4ZW1wdD86c3RyaW5nKTpBcnJheTxvYmo8dW5rbm93bj4+e1xyXG4gICAgaWYoREVCVUcpe1xyXG4gICAgICByZW5kZXJfY29sbGlzaW9uX2JveChib3gpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoZWNrX2FsbF9jb2xsaXNpb25zKGJveCx0aGlzLm9iamVjdHMsZXhlbXB0KTtcclxuICB9XHJcbiAgY2hlY2tfb2JqZWN0cyhib3g6Y29sbGlzaW9uX2JveCxleGVtcHQ/OnN0cmluZyl7XHJcbiAgICBpZihERUJVRyl7XHJcbiAgICAgIHJlbmRlcl9jb2xsaXNpb25fYm94KGJveCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hlY2tfYWxsX29iamVjdHMoYm94LHRoaXMub2JqZWN0cyxleGVtcHQpO1xyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpe1xyXG5cclxuICB9XHJcbiAgY2xlYW51cCgpe1xyXG5cclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6IG51bWJlcikge1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgdGhpcy5vYmplY3RzW2FdLnN0YXRlZih0aW1lKTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0T2JqKGlkOnN0cmluZyl7XHJcbiAgICBmb3IobGV0IGEgPSAwOyBhIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgYSsrKXtcclxuICAgICAgaWYodGhpcy5vYmplY3RzW2FdLmlkID09IGlkKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzW2FdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJlbmRlcmYodGltZTogbnVtYmVyKTogc3ByaXRlIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNwcml0ZV9zaGVldDogdGhpcy5iYWNrZ3JvdW5kLFxyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIHNwcml0ZV9oZWlnaHQ6IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQsXHJcbiAgICAgIHNwcml0ZV93aWR0aDogdGhpcy5iYWNrZ3JvdW5kLndpZHRoXHJcbiAgICB9XHJcbiAgfVxyXG59IiwiZXhwb3J0IGludGVyZmFjZSBzcHJpdGV7XHJcbiAgc3ByaXRlX3NoZWV0OkhUTUxJbWFnZUVsZW1lbnQsXHJcbiAgbGVmdDpudW1iZXIsXHJcbiAgdG9wOm51bWJlcixcclxuICBzcHJpdGVfd2lkdGg6bnVtYmVyLFxyXG4gIHNwcml0ZV9oZWlnaHQ6bnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzcHJpdGVfZ2VuKHNwcml0ZV9zaGVldDpIVE1MSW1hZ2VFbGVtZW50LHNwcml0ZV93aWR0aDpudW1iZXIsc3ByaXRlX2hlaWdodDpudW1iZXIpOkFycmF5PHNwcml0ZT57XHJcbiAgbGV0IHdpZHRoID0gc3ByaXRlX3NoZWV0LndpZHRoO1xyXG4gIGxldCBzcHJpdGVzOkFycmF5PHNwcml0ZT4gPSBbXTtcclxuICBmb3IobGV0IGEgPSAwOyBhIDwgd2lkdGg7YSArPSBzcHJpdGVfd2lkdGgpe1xyXG4gICAgc3ByaXRlcy5wdXNoKHtcclxuICAgICAgc3ByaXRlX3NoZWV0LFxyXG4gICAgICBsZWZ0OmEsXHJcbiAgICAgIHRvcDowLFxyXG4gICAgICBzcHJpdGVfaGVpZ2h0LFxyXG4gICAgICBzcHJpdGVfd2lkdGhcclxuICAgIH0pXHJcbiAgfVxyXG4gIHJldHVybiBzcHJpdGVzO1xyXG59IiwiZXhwb3J0IGNvbnN0IERFQlVHID0gdHJ1ZTtcclxuXHJcbmltcG9ydCB7b2JqfSBmcm9tIFwiLi9saWIvb2JqZWN0XCI7XHJcbmltcG9ydCB7b2JqX3N0YXRlfSBmcm9tIFwiLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHtyb29tfSBmcm9tIFwiLi9saWIvcm9vbVwiO1xyXG5pbXBvcnQge3Nwcml0ZX0gZnJvbSBcIi4vbGliL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBjb2xsaXNpb25fYm94IH0gZnJvbSBcIi4vbGliL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge3Nwcml0ZV9yZW5kZXJlcixyZWN0X3JlbmRlcmVyLCBDYW1lcmF9IGZyb20gXCIuL2xpYi9yZW5kZXJcIjtcclxuXHJcbmltcG9ydCB7T3ZlcndvcmxkfSBmcm9tIFwiLi9nYW1lL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5pbXBvcnQge0JvYXJkfSBmcm9tIFwiLi9nYW1lL3Jvb21zL2JvYXJkXCI7XHJcblxyXG5sZXQgY2FudmFzX2VsZW1lbnQ6SFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxubGV0IGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzX2VsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuXHJcbmxldCBzY3JlZW5fd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxubGV0IHNjcmVlbl9oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG5sZXQgdndpZHRoID0gY2FudmFzX2VsZW1lbnQud2lkdGg7XHJcbmxldCB2aGVpZ2h0ID0gY2FudmFzX2VsZW1lbnQuaGVpZ2h0O1xyXG5cclxuXHJcbi8vSG93IG9mdGVuIHRoZSBnYW1lIGxvZ2ljIGxvb3Agc2hvdWxkIHJ1biwgaW4gbWlsbGlzZWNvbmRzXHJcbmxldCBsb2dpY19sb29wX2ludGVydmFsOm51bWJlciA9IDEwMDAvNjA7ICBcclxuXHJcbmxldCBsYXN0X3RpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuaW50ZXJmYWNlIGRpbWVuc2lvbnN7XHJcbiAgaGVpZ2h0Om51bWJlcixcclxuICB3aWR0aDpudW1iZXJcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHZXRTY3JlZW5EaW1lbnNpb25zICgpOmRpbWVuc2lvbnN7XHJcbiAgcmV0dXJuKHtcclxuICAgIHdpZHRoOnNjcmVlbl93aWR0aCxcclxuICAgIGhlaWdodDpzY3JlZW5faGVpZ2h0XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldFZpZXdwb3J0RGltZW5zaW9ucyAoKTpkaW1lbnNpb25ze1xyXG4gIHJldHVybih7XHJcbiAgICBoZWlnaHQ6dmhlaWdodCxcclxuICAgIHdpZHRoOnZ3aWR0aFxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJfY29sbGlzaW9uX2JveCA9IChhOmNvbGxpc2lvbl9ib3gpID0+IHtcclxuICBib3hlcy5wdXNoKGEpO1xyXG59XHJcblxyXG5sZXQgYm94ZXM6QXJyYXk8Y29sbGlzaW9uX2JveD4gPSBbXTtcclxuXHJcbmxldCBkZWVwID0gKGE6YW55KSA9PntcclxuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhKSk7XHJcbn1cclxuXHJcbmludGVyZmFjZSBnYW1lX3N0YXRle1xyXG4gIGxvZ2ljOm51bWJlcixcclxuICBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICBjdXJyZW50X3Jvb206cm9vbTx1bmtub3duPixcclxuICBjYW1lcmE6Q2FtZXJhLFxyXG4gIGNhbnZhczpIVE1MQ2FudmFzRWxlbWVudCxcclxuICBwbGF5ZXJfc3RhdGU6e1xyXG4gICAgcG93ZXI6bnVtYmVyXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgZ2FtZXtcclxuICBzdGF0ZTpnYW1lX3N0YXRlO1xyXG4gIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gIGNvbnN0cnVjdG9yKGN0eDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsYTpyb29tPHVua25vd24+KXtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGNhbnZhczpjYW52YXNfZWxlbWVudCxcclxuICAgICAgbG9naWM6dW5kZWZpbmVkLFxyXG4gICAgICBjb250ZXh0OmN0eCxcclxuICAgICAgY2FtZXJhOm5ldyBDYW1lcmEoMCwwLHZ3aWR0aCx2aGVpZ2h0LDEsZmFsc2UpLFxyXG4gICAgICBjdXJyZW50X3Jvb206IHVuZGVmaW5lZCxcclxuICAgICAgcGxheWVyX3N0YXRlOntcclxuICAgICAgICBwb3dlcjowXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubG9hZFJvb20oYSk7XHJcbiAgfVxyXG4gIHJlbmRlcih0Om51bWJlcil7XHJcbiAgICB0aGlzLnN0YXRlLmNvbnRleHQuY2xlYXJSZWN0KDAsMCx2d2lkdGgsdmhlaWdodCk7XHJcbiAgICB0aGlzLnN0YXRlLmNvbnRleHQuZmlsbFN0eWxlPVwiYmxhY2tcIjtcclxuICAgIHRoaXMuc3RhdGUuY29udGV4dC5maWxsUmVjdCgwLDAsdndpZHRoLHZoZWlnaHQpO1xyXG4gICAgbGV0IGNhbWVyYV9jb2xsaWRlcnMgPSB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5jaGVja19vYmplY3RzKHtcclxuICAgICAgeDp0aGlzLnN0YXRlLmNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICB5OnRoaXMuc3RhdGUuY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOnRoaXMuc3RhdGUuY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgsXHJcbiAgICAgIGhlaWdodDp0aGlzLnN0YXRlLmNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodFxyXG4gICAgfSk7XHJcbiAgICBsZXQgcmVuZGVyX2FyZ3MgPSB7XHJcbiAgICAgIGNvbnRleHQ6dGhpcy5zdGF0ZS5jb250ZXh0LFxyXG4gICAgICBjYW1lcmE6dGhpcy5zdGF0ZS5jYW1lcmEsXHJcbiAgICB9O1xyXG4gICAgc3ByaXRlX3JlbmRlcmVyKHJlbmRlcl9hcmdzLHtcclxuICAgICAgc3ByaXRlOnRoaXMuc3RhdGUuY3VycmVudF9yb29tLnJlbmRlcmYodCksXHJcbiAgICAgIHg6MCxcclxuICAgICAgeTowXHJcbiAgICB9KTtcclxuICAgIGZvciAobGV0IGEgb2YgY2FtZXJhX2NvbGxpZGVycyl7XHJcbiAgICAgIGxldCBzdCA9IGEuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgICBpZihhLnJlbmRlcil7XHJcbiAgICAgICAgc3ByaXRlX3JlbmRlcmVyKHJlbmRlcl9hcmdzLHtcclxuICAgICAgICAgIHNwcml0ZTphLnJlbmRlcmYodCksXHJcbiAgICAgICAgICB4OnN0LnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnN0LnBvc2l0aW9uLnlcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGJveDpjb2xsaXNpb25fYm94O1xyXG4gICAgd2hpbGUoYm94ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgIGxldCBib3ggPSBib3hlcy5wb3AoKTtcclxuICAgICAgbGV0IHJlY3QgPSB7XHJcbiAgICAgICAgd2lkdGg6Ym94LndpZHRoLFxyXG4gICAgICAgIGhlaWdodDpib3guaGVpZ2h0XHJcbiAgICAgIH1cclxuICAgICAgcmVjdF9yZW5kZXJlcihjb250ZXh0LHJlY3QsYm94LngsYm94LnksXCIjRkYwMDAwXCIsdGhpcy5zdGF0ZS5jYW1lcmEpO1xyXG4gICAgfVxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKChhKT0+e3RoaXMucmVuZGVyKGEpfSk7IFxyXG4gIH1cclxuICBzdGFydF9sb2dpYyhhOm51bWJlcil7XHJcbiAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgbGV0IG5ld190aW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgbGV0IHRpbWVfc2luY2UgPSBuZXdfdGltZS5nZXRUaW1lKCkgLSBsYXN0X3RpbWUuZ2V0VGltZSgpO1xyXG4gICAgICBsYXN0X3RpbWUgPSBuZXdfdGltZTtcclxuICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20uc3RhdGVmKG5ld190aW1lLmdldFRpbWUoKSk7XHJcbiAgICB9LGEpO1xyXG4gIH1cclxuICBnZXRSb29tKCl7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb207XHJcbiAgfVxyXG4gIGFzeW5jIGxvYWRSb29tKHg6cm9vbTx1bmtub3duPil7XHJcblxyXG4gICAgaWYodGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20gIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgIHdoaWxlKHRoaXMuc3RhdGUuY3VycmVudF9yb29tLm9iamVjdHMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20ub2JqZWN0c1swXS5kZWxldGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IG5ld19yb29tID0gYXdhaXQgeC5sb2FkKCk7XHJcbiAgICB4LnJlZ2lzdGVyX2NvbnRyb2xzKCk7XHJcbiAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbSA9IHg7XHJcbiAgICBpZih0aGlzLnN0YXRlLmxvZ2ljICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5sb2dpYyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlLmxvZ2ljID0gdGhpcy5zdGFydF9sb2dpYyhsb2dpY19sb29wX2ludGVydmFsKVxyXG4gICAgdGhpcy5yZW5kZXIoMCk7XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgZ2FtZV9pbnN0ID0gbmV3IGdhbWUoY29udGV4dCxuZXcgQm9hcmQoKSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2FtZSgpe1xyXG4gIHJldHVybiBnYW1lX2luc3Q7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9