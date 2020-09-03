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

/***/ "./src/game/objects/box.ts":
/*!*********************************!*\
  !*** ./src/game/objects/box.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
class Box extends object_1.gravity_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "http://localhost/src/game/objects/box.png";
        this.collision = true;
        this.height = 64;
        this.width = 500;
        this.gravity = false;
        if (id != undefined) {
            this.id = id;
        }
        this.state = {
            position: {
                x,
                y
            },
            velocity: {
                x: 0,
                y: 0
            }
        };
    }
    register_controls() {
        this.bindControl("mouse1", controls_1.exec_type.once, () => {
            this.delete();
        });
    }
}
exports.Box = Box;


/***/ }),

/***/ "./src/game/objects/goomba.ts":
/*!************************************!*\
  !*** ./src/game/objects/goomba.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StandingGoomba = exports.Goomba = void 0;
const sprite_1 = __webpack_require__(/*! ../../lib/sprite */ "./src/lib/sprite.ts");
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
var direction;
(function (direction) {
    direction[direction["left"] = 0] = "left";
    direction[direction["right"] = 1] = "right";
})(direction || (direction = {}));
class Goomba extends object_1.gravity_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "http://localhost/src/game/objects/goomba.png";
        this.height = 64;
        this.width = 64;
        this.collision = true;
        if (id != undefined) {
            this.id = id;
        }
        this.state = {
            direction: direction.left,
            position: {
                x,
                y
            },
            velocity: {
                x: 0,
                y: 0
            },
            selected: false
        };
    }
    renderf(t) {
        let sprites = sprite_1.sprite_gen(this.sprite_sheet, this.width, this.height);
        if (Math.floor(t / 250) % 2 == 0) {
            return sprites[0];
        }
        else {
            return sprites[1];
        }
    }
    register_controls() {
        /*
        this.bindControl("Mouse1",()=>{
          this.state.velocity.x = 0;
          this.state.velocity.y = 0;
          this.state.selected = !this.state.selected;
          this.gravity = !this.gravity;
        });
        */
        this.bindControl("KeyA", controls_1.exec_type.repeat, () => {
            console.log("a");
            this.state.velocity.x = -3;
        });
        this.bindControl("KeyD", controls_1.exec_type.once, () => {
            console.log("d");
            this.state.velocity.x = 3;
        });
        this.bindControl("KeyW", controls_1.exec_type.once, () => {
            console.log("w");
            if (!this.state.selected) {
                this.state.velocity.y += 15;
            }
            this.state.selected = true;
        });
    }
    statef(time) {
        let jumping_check = this.collision_check({
            x: this.state.position.x,
            y: this.state.position.y - 1,
            width: this.width,
            height: 1
        }).length > 0;
        if (jumping_check) {
            this.state.selected = false;
        }
    }
}
exports.Goomba = Goomba;
class StandingGoomba extends object_1.gravity_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "http://localhost/src/game/objects/goomba.png";
        this.height = 64;
        this.width = 64;
        this.collision = true;
        if (id) {
            this.id = id;
        }
        this.state = {
            direction: direction.left,
            position: {
                x,
                y
            },
            velocity: {
                x: 0,
                y: 0
            },
            selected: false
        };
    }
    register_controls() {
        this.bindControl("mouse1", controls_1.exec_type.once, () => {
            this.state.selected = !this.state.selected;
            this.gravity = !this.gravity;
        });
    }
    statef(time) {
        if (this.state.selected) {
            let mouse_position = controls_1.Poll_Mouse();
            if (mouse_position.y > mouse_position.last.y) {
                if (this.collision_check({
                    x: this.state.position.x,
                    y: this.state.position.y + this.height,
                    width: this.width,
                    height: 1
                }).length == 0) {
                    this.state.position.y = mouse_position.y - this.height / 2;
                }
            }
            else if (mouse_position.y < mouse_position.last.y) {
                if (this.collision_check({
                    x: this.state.position.x,
                    y: this.state.position.y - 1,
                    width: this.width,
                    height: 1
                }).length == 0) {
                    this.state.position.y = mouse_position.y - this.height / 2;
                }
            }
            if (mouse_position.x < mouse_position.last.x) {
                if (this.collision_check({
                    x: this.state.position.x - 1,
                    y: this.state.position.y,
                    width: 1,
                    height: this.height
                }).length == 0) {
                    this.state.position.x = mouse_position.x - this.width / 2;
                }
            }
            else if (mouse_position.x > mouse_position.last.x) {
                if (this.collision_check({
                    x: this.state.position.x + this.width,
                    y: this.state.position.y,
                    width: 1,
                    height: this.height
                }).length == 0) {
                    this.state.position.x = mouse_position.x - this.width / 2;
                }
            }
        }
    }
}
exports.StandingGoomba = StandingGoomba;


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
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
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
        this.bindControl("mouse1", controls_1.exec_type.once, () => {
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
                if (s.state.type === piece_1.piece_type.pawn && !s.state.has_moved && s.state.side === board_1.side.white && this.getCords()[1] === 3) {
                    room.state.white_board[this.getCords()[0]][this.getCords()[1] - 1].enpassent = true;
                }
                if (s.state.type === piece_1.piece_type.pawn && !s.state.has_moved && s.state.side === board_1.side.black && this.getCords()[1] === 4) {
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
            console.log(left_en);
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
        this.bindControl("mouse1", controls_1.exec_type.once, () => {
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

/***/ "./src/game/objects/room_loader.ts":
/*!*****************************************!*\
  !*** ./src/game/objects/room_loader.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Door = void 0;
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
class Door extends object_1.gravity_obj {
    constructor(a, z) {
        super();
        this.sprite_url = "http://localhost/src/game/objects/door.png";
        this.height = 128;
        this.width = 64;
        this.gravity = false;
        this.collision = false;
        this.state = {
            getRoom: z,
            position: {
                x: a[0],
                y: a[1],
            },
            velocity: {
                x: 0,
                y: 0
            }
        };
    }
    create_room() {
        return new this.state.getRoom;
    }
    transport() {
        van_1.getGame().loadRoom(this.create_room());
    }
    register_controls() {
        this.bindControl("mouse1", controls_1.exec_type.once, () => {
            this.transport();
        });
    }
}
exports.Door = Door;


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

/***/ "./src/game/rooms/overworld.ts":
/*!*************************************!*\
  !*** ./src/game/rooms/overworld.ts ***!
  \*************************************/
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
exports.Overworld = void 0;
const room_1 = __webpack_require__(/*! ../../lib/room */ "./src/lib/room.ts");
const goomba_1 = __webpack_require__(/*! ../objects/goomba */ "./src/game/objects/goomba.ts");
const box_1 = __webpack_require__(/*! ../objects/box */ "./src/game/objects/box.ts");
const collision_1 = __webpack_require__(/*! ../../lib/collision */ "./src/lib/collision.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
const room_loader_1 = __webpack_require__(/*! ../objects/room_loader */ "./src/game/objects/room_loader.ts");
const board_1 = __webpack_require__(/*! ./board */ "./src/game/rooms/board.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class Overworld extends room_1.room {
    constructor() {
        super();
        this.background_url = "https://img.wallpapersafari.com/desktop/1920/1080/8/51/imD41l.jpg";
        this.objects = [new box_1.Box(500, 0, "box"), new room_loader_1.Door([500, 64], board_1.Board), new goomba_1.Goomba(800, 800, "player"), new goomba_1.StandingGoomba(801, 900), new goomba_1.StandingGoomba(0, 0, "cursor"), new box_1.Box(0, 0) /*,new StandingGoomba(801,1000),new StandingGoomba(801,1100),new StandingGoomba(801,1200)*/];
        this.state = {
            player: undefined
        };
    }
    register_controls() {
        this.bindControl("mousedown", controls_1.exec_type.repeat, () => __awaiter(this, void 0, void 0, function* () {
            console.log("yep");
            let mouse_pos = controls_1.Poll_Mouse();
            if (this.check_collisions({
                x: mouse_pos.x,
                y: mouse_pos.y,
                width: 500,
                height: 64
            }).length == 0) {
                let b = new box_1.Box(mouse_pos.x, mouse_pos.y);
                yield b.load();
                this.objects.unshift(b);
            }
        }));
    }
    statef(time) {
        for (let a = 0; a < this.objects.length; a++) {
            room_1.apply_gravity(this.objects[a], -.5, -15);
            collision_1.velocity_collision_check(this.objects[a], this.objects);
            this.objects[a].statef(time);
        }
        let player = this.getObj("player");
        let cursor = this.getObj("cursor");
        if (player) {
            let camera = van_1.getGame().state.camera;
            //console.log(camera.state.dimensions.width);
            camera.x = player.state.position.x - (camera.state.dimensions.width / 2);
            camera.y = player.state.position.y - (camera.state.dimensions.height / 2);
        }
        if (cursor) {
            cursor.collision = false;
            cursor.gravity = false;
            let mouse = controls_1.Poll_Mouse();
            cursor.state.position.x = mouse.x - cursor.width / 2;
            cursor.state.position.y = mouse.y - cursor.height / 2;
        }
    }
}
exports.Overworld = Overworld;
//, new Box(0,0)


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
exports.Bind = exports.exec_type = exports.Unbind = exports.ExecuteRepeatBinds = exports.Poll_Mouse = void 0;
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
        if (selected.type === btype.mouse && selected.key === "mouse1" && selected.execute == exec_type.once) {
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
target.addEventListener("mousedown", (e) => {
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.mouse && selected.key === e.type && !selected.executed) {
            if (selected.execute === exec_type.once) {
                selected.function();
            }
            else if (selected.execute === exec_type.repeat) {
                active_binds.push(selected);
            }
            selected.executed = true;
        }
    }
});
target.addEventListener("mouseup", (e) => {
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.mouse && (selected.key === e.type || selected.key == "mousedown") && selected.executed) {
            if (selected.execute === exec_type.once) {
                selected.executed = false;
            }
            else if (selected.execute === exec_type.repeat) {
                let g = [...active_binds];
                for (let a = 0; a < g.length; a++) {
                    if (g[a].id === selected.id) {
                        selected.executed = false;
                        active_binds.splice(a, 1);
                        break;
                    }
                }
            }
        }
    }
});
window.addEventListener("keydown", (e) => {
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.keyboard && selected.key === e.code && !selected.executed) {
            if (selected.execute === exec_type.once) {
                selected.function();
            }
            else if (selected.execute === exec_type.repeat) {
                active_binds.push(selected);
            }
            selected.executed = true;
        }
    }
});
window.addEventListener("keyup", (e) => {
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.keyboard && selected.key === e.code && selected.executed) {
            if (selected.execute === exec_type.once) {
                selected.executed = false;
            }
            else if (selected.execute === exec_type.repeat) {
                let g = [...active_binds];
                for (let a = 0; a < g.length; a++) {
                    if (g[a].id === selected.id) {
                        selected.executed = false;
                        active_binds.splice(a, 1);
                        break;
                    }
                }
            }
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
let active_binds = [];
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
function ExecuteRepeatBinds() {
    for (let a of active_binds) {
        if (a.execute === exec_type.repeat) {
            a.function();
        }
    }
}
exports.ExecuteRepeatBinds = ExecuteRepeatBinds;
function Unbind(bind_id) {
    for (let a = 0; a < all_binds.length; a++) {
        if (all_binds[a].id == bind_id) {
            all_binds.splice(a, 1);
            break;
        }
    }
}
exports.Unbind = Unbind;
var exec_type;
(function (exec_type) {
    exec_type[exec_type["once"] = 0] = "once";
    exec_type[exec_type["repeat"] = 1] = "repeat";
})(exec_type = exports.exec_type || (exports.exec_type = {}));
let id = 0;
function Bind(keyname, func, type, object) {
    if (keyname.slice(0, 5) === "mouse") {
        all_binds.push({
            key: keyname,
            type: btype.mouse,
            id,
            function: func,
            obj: object,
            execute: type,
            executed: false
        });
    }
    else {
        all_binds.push({
            key: keyname,
            type: btype.keyboard,
            id,
            function: func,
            execute: type,
            executed: false
        });
    }
    id++;
    return id - 1;
}
exports.Bind = Bind;


/***/ }),

/***/ "./src/lib/hud.ts":
/*!************************!*\
  !*** ./src/lib/hud.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.HUD = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
class HUD {
    constructor() {
        this.graphic_elements = [];
        this.text_elements = [];
        this.text_elements.push(new Text({
            position: {
                x: 10,
                y: 750
            },
            size: 44,
            font: "Alata",
            color: "white"
        }, () => {
            let x = van_1.getGame().getRoom().getObj("player");
            return x.state.selected + "";
        }));
    }
    statef(a) {
        for (let x of this.graphic_elements) {
            x.statef(a);
        }
        for (let x of this.text_elements) {
            x.statef(a);
        }
    }
}
exports.HUD = HUD;
class Text {
    constructor(a, b) {
        this.state = a;
        if (!this.state.text) {
            this.state.text = "";
        }
        this.get_func = b;
    }
    statef(a) {
        this.state.text = this.get_func();
    }
    renderf(a) {
        let { size, color, font, text } = this.state;
        return {
            size,
            color,
            font,
            text
        };
    }
}
exports.Text = Text;


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
    bindControl(key, x, func) {
        if (key == "mouse1") {
            let b = controls_1.Bind(key, func, x, this);
            this.binds.push(b);
        }
        else {
            this.binds.push(controls_1.Bind(key, func, x));
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
exports.rect_renderer = exports.sprite_renderer = exports.text_renderer = exports.Camera = void 0;
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
exports.text_renderer = (r, s) => {
    let vheight = van_1.GetViewportDimensions().height;
    r.context.font = `${s.font.size}px ${s.font.font}`;
    if (s.font.max_width) {
        r.context.fillText(s.font.text, s.x, vheight - s.y, s.font.max_width);
    }
    else {
        r.context.fillText(s.font.text, s.x, vheight - s.y);
    }
};
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
    bindControl(key, x, func) {
        controls_1.Bind(key, func, x);
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
const hud_1 = __webpack_require__(/*! ./lib/hud */ "./src/lib/hud.ts");
const controls_1 = __webpack_require__(/*! ./lib/controls */ "./src/lib/controls.ts");
const overworld_1 = __webpack_require__(/*! ./game/rooms/overworld */ "./src/game/rooms/overworld.ts");
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
    constructor(ctx, a, h) {
        this.state = {
            canvas: canvas_element,
            logic: undefined,
            context: ctx,
            camera: new render_1.Camera(0, 0, vwidth, vheight, 1, false),
            current_room: undefined,
            hud: h,
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
        let graphics = this.state.hud.graphic_elements;
        let text_elements = this.state.hud.text_elements;
        for (let a of graphics) {
            let st = a.state;
            if (a.render) {
                render_1.sprite_renderer(render_args, {
                    sprite: a.renderf(t),
                    x: st.position.x,
                    y: st.position.y
                });
            }
        }
        for (let a of text_elements) {
            let st = a.state;
            render_1.text_renderer(render_args, {
                x: st.position.x,
                y: st.position.y,
                font: a.renderf(t)
            });
        }
        requestAnimationFrame((a) => { this.render(a); });
    }
    start_logic(a) {
        return setInterval(() => {
            let new_time = new Date();
            let time_since = new_time.getTime() - last_time.getTime();
            last_time = new_time;
            this.state.current_room.statef(new_time.getTime());
            this.state.hud.statef(new_time.getTime());
            controls_1.ExecuteRepeatBinds();
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
let game_inst = new game(context, new overworld_1.Overworld(), new hud_1.HUD());
function getGame() {
    return game_inst;
}
exports.getGame = getGame;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9iaXNob3AudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9ib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9nb29tYmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9raW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL29iamVjdHMva25pZ2h0LnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL29iamVjdHMvbW92ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9vYmplY3RzL3Bhd24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9waWVjZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9vYmplY3RzL3F1ZWVuLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL29iamVjdHMvcm9vay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9vYmplY3RzL3Jvb21fbG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL3Jvb21zL2JvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL3Jvb21zL292ZXJ3b3JsZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbnRyb2xzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvaHVkLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvb2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcm9vbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3Nwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7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QVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE9BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztDQUNGO0FBbEJELHdCQWtCQzs7Ozs7Ozs7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LENBQUMsT0FBTyxFQUFXLENBQUM7UUFDeEMsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxZQUFJLENBQUMsS0FBSyxFQUFDO1lBQy9CLElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDO2dCQUN0RCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDO29CQUMvRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4QzthQUNGO1lBQ0QsSUFBSSxVQUFVLEdBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxXQUFXLEdBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFD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QUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLGVBQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxXQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOU8sSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLFdBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksZUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxXQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksZUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLGVBQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxXQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOU8sS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDaEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFD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QUFDLEVBQUM7b0JBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDN0M7YUFDRjtZQUNELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUM1QixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBQztnQkFDL0IsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDakM7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDO1lBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsQ0FBQztLQUFBO0NBQ0Y7QUExR0Qsb0JBMEdDO0FBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUkscUJBQVMsRUFBRSxFQUFDLElBQUksU0FBRyxFQUFFLENBQUMsQ0FBQztBQUU1RCxTQUFnQixPQUFPO0lBQ3JCLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFGRCwwQkFFQyIsImZpbGUiOiJ2YW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy92YW4udHNcIik7XG4iLCJpbXBvcnQge3BpZWNlLHNpZGUscGllY2VfdHlwZX0gZnJvbSBcIi4vcGllY2VcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gXCIuLi9yb29tcy9ib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJpc2hvcCBleHRlbmRzIHBpZWNle1xyXG4gIHNwcml0ZV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvc3ByaXRlcy9iaXNob3AucG5nXCJcclxuICBjb25zdHJ1Y3Rvcihwb3M6W251bWJlcixudW1iZXJdLHNpZGU6c2lkZSl7XHJcbiAgICBzdXBlcihwb3Msc2lkZSxwaWVjZV90eXBlLmJpc2hvcCk7XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2tEaWFnb25hbCgpO1xyXG4gIH1cclxufSIsImltcG9ydCB7Z3Jhdml0eV9vYmp9IGZyb20gXCIuLi8uLi9saWIvb2JqZWN0XCI7XHJcbmltcG9ydCB7b2JqX3N0YXRlfSBmcm9tIFwiLi4vLi4vbGliL3N0YXRlXCI7XHJcbmltcG9ydCB7IGV4ZWNfdHlwZSB9IGZyb20gXCIuLi8uLi9saWIvY29udHJvbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3ggZXh0ZW5kcyBncmF2aXR5X29iajxvYmpfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvb2JqZWN0cy9ib3gucG5nXCJcclxuICBjb2xsaXNpb24gPSB0cnVlXHJcbiAgaGVpZ2h0ID0gNjQ7XHJcbiAgd2lkdGggPSA1MDA7XHJcbiAgZ3Jhdml0eSA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKHg6bnVtYmVyLCB5Om51bWJlciwgaWQ6c3RyaW5nID0gdW5kZWZpbmVkKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZihpZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeCxcclxuICAgICAgICB5XHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpe1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIm1vdXNlMVwiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIHRoaXMuZGVsZXRlKCk7XHJcbiAgICB9KVxyXG4gIH1cclxufSIsImltcG9ydCB7dmVsb2NpdHksb2JqX3N0YXRlLHN0YXRlX2Z1bmN9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHtzcHJpdGUsc3ByaXRlX2dlbn0gZnJvbSBcIi4uLy4uL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHtncmF2aXR5X29iaixvYmp9IGZyb20gXCIuLi8uLi9saWIvb2JqZWN0XCI7XHJcbmltcG9ydCB7UG9sbF9Nb3VzZSwgZXhlY190eXBlfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7Y29sbGlzaW9uX2JveH0gZnJvbSBcIi4uLy4uL2xpYi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtCaW5kfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5pbXBvcnQge092ZXJ3b3JsZH0gZnJvbSBcIi4uL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmVudW0gZGlyZWN0aW9ue1xyXG4gIGxlZnQsXHJcbiAgcmlnaHRcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBnb29tYmFfc3RhdGUgZXh0ZW5kcyBvYmpfc3RhdGV7XHJcbiAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXHJcbiAgdmVsb2NpdHk6dmVsb2NpdHksXHJcbiAgc2VsZWN0ZWQ6Ym9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR29vbWJhIGV4dGVuZHMgZ3Jhdml0eV9vYmo8Z29vbWJhX3N0YXRlPntcclxuICBzcHJpdGVfdXJsID0gXCJodHRwOi8vbG9jYWxob3N0L3NyYy9nYW1lL29iamVjdHMvZ29vbWJhLnBuZ1wiO1xyXG4gIGhlaWdodCA9IDY0O1xyXG4gIHdpZHRoID0gNjQ7XHJcbiAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcixpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRpcmVjdGlvbjpkaXJlY3Rpb24ubGVmdCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBzZWxlY3RlZDpmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXJmKHQ6bnVtYmVyKTpzcHJpdGV7XHJcbiAgICBsZXQgc3ByaXRlczpBcnJheTxzcHJpdGU+ID0gc3ByaXRlX2dlbih0aGlzLnNwcml0ZV9zaGVldCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIGlmKE1hdGguZmxvb3IodC8yNTApICUgMiA9PSAwKXtcclxuICAgICAgcmV0dXJuIHNwcml0ZXNbMF07XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gc3ByaXRlc1sxXTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIC8qXHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiTW91c2UxXCIsKCk9PntcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS54ID0gMDtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ID0gMDtcclxuICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCA9ICF0aGlzLnN0YXRlLnNlbGVjdGVkO1xyXG4gICAgICB0aGlzLmdyYXZpdHkgPSAhdGhpcy5ncmF2aXR5O1xyXG4gICAgfSk7XHJcbiAgICAqL1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIktleUFcIixleGVjX3R5cGUucmVwZWF0LCgpPT57XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYVwiKTtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS54ID0gLTM7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJLZXlEXCIsZXhlY190eXBlLm9uY2UsKCk9PntcclxuICAgICAgY29uc29sZS5sb2coXCJkXCIpO1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSAzO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiS2V5V1wiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIGNvbnNvbGUubG9nKFwid1wiKTtcclxuICAgICAgaWYoIXRoaXMuc3RhdGUuc2VsZWN0ZWQpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSArPSAxNTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBcclxuICBzdGF0ZWYodGltZTpudW1iZXIpe1xyXG4gICAgbGV0IGp1bXBpbmdfY2hlY2sgPSB0aGlzLmNvbGxpc2lvbl9jaGVjayh7XHJcbiAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSAtIDEsXHJcbiAgICAgIHdpZHRoOnRoaXMud2lkdGgsXHJcbiAgICAgIGhlaWdodDoxXHJcbiAgICB9KS5sZW5ndGggPiAwO1xyXG4gICAgaWYoanVtcGluZ19jaGVjayl7XHJcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFuZGluZ0dvb21iYSBleHRlbmRzIGdyYXZpdHlfb2JqPGdvb21iYV9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9vYmplY3RzL2dvb21iYS5wbmdcIjtcclxuICBoZWlnaHQgPSA2NDtcclxuICB3aWR0aCA9IDY0O1xyXG4gIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoeDpudW1iZXIseTpudW1iZXIsaWQ6c3RyaW5nID0gdW5kZWZpbmVkKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZihpZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH0gICAgXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBkaXJlY3Rpb246ZGlyZWN0aW9uLmxlZnQsXHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4LFxyXG4gICAgICAgIHlcclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfSxcclxuICAgICAgc2VsZWN0ZWQ6ZmFsc2VcclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJtb3VzZTFcIixleGVjX3R5cGUub25jZSwoKT0+e1xyXG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gIXRoaXMuc3RhdGUuc2VsZWN0ZWQ7XHJcbiAgICAgIHRoaXMuZ3Jhdml0eSA9ICF0aGlzLmdyYXZpdHk7XHJcbiAgICB9KVxyXG4gIH1cclxuICBzdGF0ZWYodGltZTpudW1iZXIpe1xyXG4gICAgaWYodGhpcy5zdGF0ZS5zZWxlY3RlZCl7XHJcbiAgICAgIGxldCBtb3VzZV9wb3NpdGlvbiA9IFBvbGxfTW91c2UoKTtcclxuICAgICAgaWYobW91c2VfcG9zaXRpb24ueSA+IG1vdXNlX3Bvc2l0aW9uLmxhc3QueSl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0LFxyXG4gICAgICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDoxXHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0gbW91c2VfcG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYobW91c2VfcG9zaXRpb24ueSA8IG1vdXNlX3Bvc2l0aW9uLmxhc3QueSl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSAtIDEsXHJcbiAgICAgICAgICB3aWR0aDp0aGlzLndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OjFcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnkgPSBtb3VzZV9wb3NpdGlvbi55IC0gdGhpcy5oZWlnaHQvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYobW91c2VfcG9zaXRpb24ueCA8IG1vdXNlX3Bvc2l0aW9uLmxhc3QueCl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggLSAxLFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgICAgICB3aWR0aDoxLFxyXG4gICAgICAgICAgaGVpZ2h0OnRoaXMuaGVpZ2h0XHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2VfcG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZihtb3VzZV9wb3NpdGlvbi54ID4gbW91c2VfcG9zaXRpb24ubGFzdC54KXtcclxuICAgICAgICBpZih0aGlzLmNvbGxpc2lvbl9jaGVjayh7XHJcbiAgICAgICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCArIHRoaXMud2lkdGgsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSxcclxuICAgICAgICAgIHdpZHRoOjEsXHJcbiAgICAgICAgICBoZWlnaHQ6dGhpcy5oZWlnaHRcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnggPSBtb3VzZV9wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHtwaWVjZSxzaWRlLHBpZWNlX3R5cGV9IGZyb20gXCIuL3BpZWNlXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5pbXBvcnQge0JvYXJkfSBmcm9tIFwiLi4vcm9vbXMvYm9hcmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLaW5nIGV4dGVuZHMgcGllY2V7XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9zcHJpdGVzL2tpbmcucG5nXCJcclxuICBjb25zdHJ1Y3Rvcihwb3M6W251bWJlcixudW1iZXJdLHNpZGU6c2lkZSl7XHJcbiAgICBzdXBlcihwb3Msc2lkZSxwaWVjZV90eXBlLmtpbmcpO1xyXG4gIH1cclxuICBjaGVja19sZWZ0X2Nhc3RsZShyb29tOkJvYXJkLGNvcmRzOltudW1iZXIsbnVtYmVyXSl7XHJcbiAgICBpZighdGhpcy5zdGF0ZS5oYXNfbW92ZWQgJiYgcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdIC0gMSxjb3Jkc1sxXV0pLmxlbmd0aCA9PSAwICYmIHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSAtIDIsY29yZHNbMV1dKS5sZW5ndGggPT0gMCAmJiByb29tLmdldF9waWVjZShbY29yZHNbMF0gLSAzLCBjb3Jkc1sxXV0pLmxlbmd0aCA9PSAwKXtcclxuICAgICAgbGV0IHJvb2sgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0gLSA0LGNvcmRzWzFdXSk7XHJcbiAgICAgIGlmKHJvb2subGVuZ3RoID4gMCAmJiAhcm9va1swXS5zdGF0ZS5oYXNfbW92ZWQpe1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGNoZWNrX3JpZ2h0X2Nhc3RsZShyb29tOkJvYXJkLGNvcmRzOltudW1iZXIsbnVtYmVyXSl7XHJcbiAgICBpZighdGhpcy5zdGF0ZS5oYXNfbW92ZWQgJiYgcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdICsgMSxjb3Jkc1sxXV0pLmxlbmd0aCA9PSAwICYmIHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSArIDIsY29yZHNbMV1dKS5sZW5ndGggPT0gMCl7XHJcbiAgICAgIGxldCByb29rID0gcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdICsgMyxjb3Jkc1sxXV0pO1xyXG4gICAgICBpZihyb29rLmxlbmd0aCA+IDAgJiYgIXJvb2tbMF0uc3RhdGUuaGFzX21vdmVkKXtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBnZXRBdHRhY2tpbmcoKTpBcnJheTxbbnVtYmVyLG51bWJlcl0+e1xyXG4gICAgbGV0IGNvcmRzID0gdGhpcy5nZXRDb3JkcygpO1xyXG4gICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpIGFzIEJvYXJkO1xyXG4gICAgbGV0IGF0dGFja2VkOkFycmF5PFtudW1iZXIsbnVtYmVyXT4gPSBbXTtcclxuICAgIGZvcihsZXQgeCA9IC0xO3ggPD0gMTsgeCsrKXtcclxuICAgICAgZm9yKGxldCB5ID0gLTE7eSA8PSAxOyB5Kyspe1xyXG4gICAgICAgIGlmKCh4ICE9PSAwIHx8IHkgIT09IDApICYmIGNvcmRzWzBdICsgeCA+PSAwICYmIGNvcmRzWzBdICsgeCA8IDggJiYgY29yZHNbMV0gKyB5ID49IDAgJiYgY29yZHNbMV0gKyB5IDwgOCl7XHJcbiAgICAgICAgICBsZXQgcGllY2UgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0gKyB4LCBjb3Jkc1sxXSArIHldKTtcclxuICAgICAgICAgIGxldCBzYWZlID0gdHJ1ZTtcclxuICAgICAgICAgIGlmKHNhZmUgJiYgcGllY2UubGVuZ3RoID09PSAwIHx8IHBpZWNlWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdICsgeCwgY29yZHNbMV0gKyB5XSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvL2Nhc3RsZSBjaGVjayBsZWZ0XHJcbiAgICBpZih0aGlzLmNoZWNrX2xlZnRfY2FzdGxlKHJvb20sY29yZHMpKXtcclxuICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSAyLGNvcmRzWzFdXSk7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmNoZWNrX3JpZ2h0X2Nhc3RsZShyb29tLGNvcmRzKSl7XHJcbiAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdICsgMixjb3Jkc1sxXV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0dGFja2VkO1xyXG4gIH1cclxufSIsImltcG9ydCB7cGllY2Usc2lkZSxwaWVjZV90eXBlfSBmcm9tIFwiLi9waWVjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEtuaWdodCBleHRlbmRzIHBpZWNle1xyXG4gIHNwcml0ZV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvc3ByaXRlcy9rbmlnaHQucG5nXCJcclxuICBjb25zdHJ1Y3Rvcihwb3M6W251bWJlcixudW1iZXJdLHNpZGU6c2lkZSl7XHJcbiAgICBzdXBlcihwb3Msc2lkZSxwaWVjZV90eXBlLmtuaWdodCk7XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICBsZXQgY29yZHMgPSB0aGlzLmdldENvcmRzKCk7XHJcbiAgICBsZXQgYXR0YWNrZWQ6QXJyYXk8W251bWJlcixudW1iZXJdPiA9IFtdO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyAxLGNvcmRzWzFdICsgMl0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSAxLGNvcmRzWzFdICsgMl0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyAyLGNvcmRzWzFdICsgMV0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyAyLGNvcmRzWzFdIC0gMV0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyAxLGNvcmRzWzFdIC0gMl0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSAxLGNvcmRzWzFdIC0gMl0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSAyLGNvcmRzWzFdICsgMV0pO1xyXG4gICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSAyLGNvcmRzWzFdIC0gMV0pO1xyXG4gICAgcmV0dXJuKGF0dGFja2VkLmZpbHRlcigoeCk9PnhbMF0gPj0gMCAmJiB4WzBdIDwgOCAmJiB4WzFdID49IDAgJiYgeFsxXSA8IDgpKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7Qm9hcmQsc2lkZX0gZnJvbSBcIi4uL3Jvb21zL2JvYXJkXCI7XHJcbmltcG9ydCB7cGllY2UscGllY2VfdHlwZX0gZnJvbSBcIi4vcGllY2VcIjtcclxuaW1wb3J0IHsgUXVlZW4gfSBmcm9tIFwiLi9xdWVlblwiO1xyXG5pbXBvcnQgeyBleGVjX3R5cGUgfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5pbnRlcmZhY2UgbW92ZV9zdGF0ZXtcclxuICBwb3NpdGlvbjp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgbW92ZSBleHRlbmRzIG9iajxtb3ZlX3N0YXRlPntcclxuICBzcHJpdGVfdXJsPVwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9zcHJpdGVzL2F0dGFja2VkLnBuZ1wiO1xyXG4gIGhlaWdodCA9IDEwMDtcclxuICB3aWR0aCA9IDEwMDtcclxuICByZW5kZXIgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihhOltudW1iZXIsbnVtYmVyXSl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6YVswXSAqIHRoaXMud2lkdGgsXHJcbiAgICAgICAgeTphWzFdICogdGhpcy5oZWlnaHRcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDb3JkcygpOltudW1iZXIsbnVtYmVyXXtcclxuICAgIHJldHVybiBbdGhpcy5zdGF0ZS5wb3NpdGlvbi54LzEwMCx0aGlzLnN0YXRlLnBvc2l0aW9uLnkvMTAwXTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJtb3VzZTFcIixleGVjX3R5cGUub25jZSwoKT0+e1xyXG4gICAgICBpZih0aGlzLnJlbmRlcil7XHJcbiAgICAgICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuc3RhdGUuY3VycmVudF9yb29tIGFzIEJvYXJkO1xyXG4gICAgICAgIGxldCBwID0gcm9vbS5nZXRfcGllY2UodGhpcy5nZXRDb3JkcygpKSBhcyBwaWVjZVtdO1xyXG4gICAgICAgIGxldCBzID0gcm9vbS5zdGF0ZS5zZWxlY3RlZDtcclxuICAgICAgICBpZihzLnN0YXRlLnR5cGUgPT09IHBpZWNlX3R5cGUua2luZyAmJiAhcy5zdGF0ZS5oYXNfbW92ZWQgJiYgdGhpcy5nZXRDb3JkcygpWzBdID09PSA2KXtcclxuICAgICAgICAgIGxldCByb29rcyA9IHJvb20uZ2V0X3BpZWNlKFs3LHMuZ2V0Q29yZHMoKVsxXV0pO1xyXG4gICAgICAgICAgcm9va3NbMF0ubW92ZXRvQ29yZHMoWzUscy5nZXRDb3JkcygpWzFdXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHMuc3RhdGUudHlwZSA9PT0gcGllY2VfdHlwZS5raW5nICYmICFzLnN0YXRlLmhhc19tb3ZlZCAmJiB0aGlzLmdldENvcmRzKClbMF0gPT09IDIpe1xyXG4gICAgICAgICAgbGV0IHJvb2tzID0gcm9vbS5nZXRfcGllY2UoWzAscy5nZXRDb3JkcygpWzFdXSk7XHJcbiAgICAgICAgICByb29rc1swXS5tb3ZldG9Db3JkcyhbMyxzLmdldENvcmRzKClbMV1dKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocy5zdGF0ZS50eXBlID09PSBwaWVjZV90eXBlLnBhd24gJiYgIXMuc3RhdGUuaGFzX21vdmVkICYmIHMuc3RhdGUuc2lkZSA9PT0gc2lkZS53aGl0ZSAmJiB0aGlzLmdldENvcmRzKClbMV0gPT09IDMpe1xyXG4gICAgICAgICAgcm9vbS5zdGF0ZS53aGl0ZV9ib2FyZFt0aGlzLmdldENvcmRzKClbMF1dW3RoaXMuZ2V0Q29yZHMoKVsxXSAtIDFdLmVucGFzc2VudCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHMuc3RhdGUudHlwZSA9PT0gcGllY2VfdHlwZS5wYXduICYmICFzLnN0YXRlLmhhc19tb3ZlZCAmJiBzLnN0YXRlLnNpZGUgPT09IHNpZGUuYmxhY2sgJiYgdGhpcy5nZXRDb3JkcygpWzFdID09PSA0KXtcclxuICAgICAgICAgIHJvb20uc3RhdGUuYmxhY2tfYm9hcmRbdGhpcy5nZXRDb3JkcygpWzBdXVt0aGlzLmdldENvcmRzKClbMV0gKyAxXS5lbnBhc3NlbnQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzLnN0YXRlLnR5cGUgPT09IHBpZWNlX3R5cGUucGF3biAmJiBzLnN0YXRlLnNpZGUgPT0gc2lkZS5ibGFjayAmJiByb29tLmdldF9tZXRhKHRoaXMuZ2V0Q29yZHMoKSxzaWRlLndoaXRlKS5lbnBhc3NlbnQpe1xyXG4gICAgICAgICAgbGV0IGYgPSByb29tLmdldF9waWVjZShbdGhpcy5nZXRDb3JkcygpWzBdLHRoaXMuZ2V0Q29yZHMoKVsxXSArIDFdKTtcclxuICAgICAgICAgIHJvb20ucmVtb3ZlX3BpZWNlKGZbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzLnN0YXRlLnR5cGUgPT09IHBpZWNlX3R5cGUucGF3biAmJiBzLnN0YXRlLnNpZGUgPT0gc2lkZS53aGl0ZSAmJiByb29tLmdldF9tZXRhKHRoaXMuZ2V0Q29yZHMoKSxzaWRlLmJsYWNrKS5lbnBhc3NlbnQpe1xyXG4gICAgICAgICAgbGV0IGYgPSByb29tLmdldF9waWVjZShbdGhpcy5nZXRDb3JkcygpWzBdLHRoaXMuZ2V0Q29yZHMoKVsxXSAtIDFdKTtcclxuICAgICAgICAgIHJvb20ucmVtb3ZlX3BpZWNlKGZbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzLnN0YXRlLmhhc19tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgaWYocC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIHJvb20ucmVtb3ZlX3BpZWNlKHBbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZigodGhpcy5nZXRDb3JkcygpWzFdID09IDcgfHwgdGhpcy5nZXRDb3JkcygpWzFdID09IDApICYmIHMuc3RhdGUudHlwZSA9PT0gcGllY2VfdHlwZS5wYXduKXtcclxuICAgICAgICAgIGxldCBxdSA9IG5ldyBRdWVlbih0aGlzLmdldENvcmRzKCkscy5zdGF0ZS5zaWRlKTtcclxuICAgICAgICAgIHF1LmxvYWQoKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgIHJvb20uYWRkX3BpZWNlKHF1KTtcclxuICAgICAgICAgICAgcm9vbS5yZW1vdmVfcGllY2Uocyk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzLnN0YXRlLnNpZGUgPT09IHNpZGUud2hpdGUpe1xyXG4gICAgICAgICAgcm9vbS5jaGFuZ2Vfc2lkZShzaWRlLmJsYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihzLnN0YXRlLnNpZGUgPT09IHNpZGUuYmxhY2spe1xyXG4gICAgICAgICAgcm9vbS5jaGFuZ2Vfc2lkZShzaWRlLndoaXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcm9vbS5jbGVhcl9hdHRhY2tlZCgpO1xyXG4gICAgICAgIHJvb20uc3RhdGUuc2VsZWN0ZWQubW92ZXRvQ29yZHModGhpcy5nZXRDb3JkcygpKTtcclxuICAgICAgICBcclxuICAgICAgICByb29tLnN0YXRlLmF0dGFja2VkID0gW107XHJcbiAgICAgICAgcm9vbS5zdGF0ZS5zZWxlY3RlZCA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn0iLCJpbXBvcnQge3BpZWNlLHNpZGUscGllY2VfdHlwZX0gZnJvbSBcIi4vcGllY2VcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gXCIuLi9yb29tcy9ib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhd24gZXh0ZW5kcyBwaWVjZXtcclxuICBzcHJpdGVfdXJsID0gXCJodHRwOi8vbG9jYWxob3N0L3NyYy9nYW1lL3Nwcml0ZXMvcGF3bi5wbmdcIlxyXG4gIGNvbnN0cnVjdG9yKHBvczpbbnVtYmVyLG51bWJlcl0sc2lkZTpzaWRlKXtcclxuICAgIHN1cGVyKHBvcyxzaWRlLHBpZWNlX3R5cGUucGF3bik7XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICBsZXQgYXR0YWNrZWQ6QXJyYXk8W251bWJlcixudW1iZXJdPiA9IFtdO1xyXG4gICAgbGV0IGNvcmRzID0gdGhpcy5nZXRDb3JkcygpO1xyXG4gICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpIGFzIEJvYXJkO1xyXG4gICAgaWYodGhpcy5zdGF0ZS5zaWRlID09IHNpZGUud2hpdGUpe1xyXG4gICAgICBpZihyb29tLmdldF9waWVjZShbY29yZHNbMF0sY29yZHNbMV0gKyAxXSkubGVuZ3RoID09PSAwKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSxjb3Jkc1sxXSArIDFdKTtcclxuICAgICAgICBpZighdGhpcy5zdGF0ZS5oYXNfbW92ZWQgJiYgcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdLGNvcmRzWzFdICsgMl0pLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSxjb3Jkc1sxXSArIDJdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbGV0IGxlZnRfY29yZHM6W251bWJlcixudW1iZXJdID0gW2NvcmRzWzBdLSAxLGNvcmRzWzFdICsgMV07XHJcbiAgICAgIGxldCByaWdodF9jb3JkczpbbnVtYmVyLG51bWJlcl0gPSBbY29yZHNbMF0rIDEsY29yZHNbMV0gKyAxXTsgXHJcbiAgICAgIGxldCBsZWZ0ID0gcm9vbS5nZXRfcGllY2UobGVmdF9jb3Jkcyk7XHJcbiAgICAgIGxldCByaWdodCA9IHJvb20uZ2V0X3BpZWNlKHJpZ2h0X2NvcmRzKTtcclxuICAgICAgbGV0IGxlZnRfZW4gPSByb29tLmdldF9tZXRhKGxlZnRfY29yZHMsc2lkZS5ibGFjayk7XHJcbiAgICAgIGxldCByaWdodF9lbiA9IHJvb20uZ2V0X21ldGEocmlnaHRfY29yZHMsc2lkZS5ibGFjayk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGxlZnRfZW4pO1xyXG4gICAgICBjb25zb2xlLmxvZyhyaWdodF9lbik7XHJcbiAgICAgIGlmKChjb3Jkc1swXSAtIDEgPj0gMCkgJiYgKChsZWZ0Lmxlbmd0aCA+IDAgJiYgbGVmdFswXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpIHx8IChsZWZ0X2VuICYmIGxlZnRfZW4uZW5wYXNzZW50KSkpe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2gobGVmdF9jb3Jkcyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYoKGNvcmRzWzBdICsgMSA8IDgpICYmICgocmlnaHQubGVuZ3RoID4gMCAmJiByaWdodFswXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpIHx8IChyaWdodF9lbiAmJiByaWdodF9lbi5lbnBhc3NlbnQpKSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChyaWdodF9jb3Jkcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBpZihyb29tLmdldF9waWVjZShbY29yZHNbMF0sY29yZHNbMV0gLSAxXSkubGVuZ3RoID09PSAwKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSxjb3Jkc1sxXSAtIDFdKTtcclxuICAgICAgICBpZighdGhpcy5zdGF0ZS5oYXNfbW92ZWQgJiYgcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdLGNvcmRzWzFdIC0gMl0pLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSxjb3Jkc1sxXSAtIDJdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbGV0IGxlZnRfY29yZHM6W251bWJlcixudW1iZXJdID0gW2NvcmRzWzBdIC0gMSxjb3Jkc1sxXSAtIDFdO1xyXG4gICAgICBsZXQgcmlnaHRfY29yZHM6W251bWJlcixudW1iZXJdID0gW2NvcmRzWzBdKyAxLGNvcmRzWzFdIC0gMV07XHJcbiAgICAgIGxldCBsZWZ0ID0gcm9vbS5nZXRfcGllY2UobGVmdF9jb3Jkcyk7XHJcbiAgICAgIGxldCByaWdodCA9IHJvb20uZ2V0X3BpZWNlKHJpZ2h0X2NvcmRzKTtcclxuICAgICAgbGV0IGxlZnRfZW4gPSByb29tLmdldF9tZXRhKGxlZnRfY29yZHMsc2lkZS53aGl0ZSk7XHJcbiAgICAgIGxldCByaWdodF9lbiA9IHJvb20uZ2V0X21ldGEocmlnaHRfY29yZHMsc2lkZS53aGl0ZSk7XHJcbiAgICAgIGlmKChjb3Jkc1swXSAtIDEgPj0gMCkgJiYgKChsZWZ0Lmxlbmd0aCA+IDAgJiYgbGVmdFswXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpIHx8IChsZWZ0X2VuICYmIGxlZnRfZW4uZW5wYXNzZW50KSkpe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2gobGVmdF9jb3Jkcyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYoKGNvcmRzWzBdICsgMSA8IDgpICYmICgocmlnaHQubGVuZ3RoID4gMCAmJiByaWdodFswXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpIHx8IChyaWdodF9lbiAmJiByaWdodF9lbi5lbnBhc3NlbnQpKSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChyaWdodF9jb3Jkcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhdHRhY2tlZDtcclxuICB9XHJcbn0iLCJpbXBvcnQge29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtzcHJpdGUsc3ByaXRlX2dlbn0gZnJvbSBcIi4uLy4uL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHtib2FyZF9zdGF0ZSwgQm9hcmR9IGZyb20gXCIuLi9yb29tcy9ib2FyZFwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuaW1wb3J0IHsgVW5iaW5kLCBleGVjX3R5cGUgfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5leHBvcnQgZW51bSBzaWRle1xyXG4gIHdoaXRlLFxyXG4gIGJsYWNrXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIHBpZWNlX3R5cGV7XHJcbiAgcGF3bixcclxuICByb29rLFxyXG4gIGJpc2hvcCxcclxuICBxdWVlbixcclxuICBraW5nLFxyXG4gIGtuaWdodFxyXG59XHJcblxyXG5pbnRlcmZhY2UgcGllY2Vfc3RhdGV7XHJcbiAgcG9zaXRpb246e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH0sXHJcbiAgc2lkZTpzaWRlLFxyXG4gIHR5cGU6cGllY2VfdHlwZSxcclxuICBoYXNfbW92ZWQ6Ym9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgcGllY2UgZXh0ZW5kcyBvYmo8cGllY2Vfc3RhdGU+e1xyXG4gIGhlaWdodCA9IDEwMDtcclxuICB3aWR0aCA9IDEwMDtcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKHBvczpbbnVtYmVyLG51bWJlcl0sc2lkZTpzaWRlLHR5cGU6cGllY2VfdHlwZSl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6cG9zWzBdICogdGhpcy53aWR0aCxcclxuICAgICAgICB5OnBvc1sxXSAqIHRoaXMuaGVpZ2h0XHJcbiAgICAgIH0sXHJcbiAgICAgIHNpZGUsXHJcbiAgICAgIHR5cGUsXHJcbiAgICAgIGhhc19tb3ZlZDpmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICBtb3ZldG9Db3JkcyhhOltudW1iZXIsbnVtYmVyXSl7XHJcbiAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnggPSBhWzBdICogdGhpcy53aWR0aDtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueSA9IGFbMV0gKiB0aGlzLmhlaWdodDtcclxuICB9XHJcbiAgZ2V0Q29yZHMoKTpbbnVtYmVyLG51bWJlcl17XHJcbiAgICByZXR1cm4gW3RoaXMuc3RhdGUucG9zaXRpb24ueC8xMDAsdGhpcy5zdGF0ZS5wb3NpdGlvbi55LzEwMF07XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG4gIHJlbmRlcmYodDpudW1iZXIpe1xyXG4gICAgbGV0IHNwcml0ZXMgPSBzcHJpdGVfZ2VuKHRoaXMuc3ByaXRlX3NoZWV0LHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG4gICAgaWYodGhpcy5zdGF0ZS5zaWRlID09PSBzaWRlLndoaXRlKXtcclxuICAgICAgcmV0dXJuIHNwcml0ZXNbMF07XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gc3ByaXRlc1sxXTtcclxuICAgIH1cclxuICB9XHJcbiAgYXR0YWNrRGlhZ29uYWwoKXtcclxuICAgIGxldCBjb3JkcyA9IHRoaXMuZ2V0Q29yZHMoKTtcclxuICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKSBhcyBCb2FyZDtcclxuICAgIGxldCBhdHRhY2tlZDpBcnJheTxbbnVtYmVyLG51bWJlcl0+ID0gW107XHJcbiAgICBmb3IobGV0IGEgPSAxO2EgPCA4O2ErKyl7XHJcbiAgICAgIGlmKGNvcmRzWzBdIC0gYSA+PSAwICYmIGNvcmRzWzBdIC0gYSA8IDggJiYgY29yZHNbMV0gLSBhID49IDAgJiYgY29yZHNbMV0gLSBhIDwgOCl7XHJcbiAgICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSAtIGEsY29yZHNbMV0gLSBhXSk7XHJcbiAgICAgICAgaWYocGllY2VzLmxlbmd0aCA9PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gLSBhLGNvcmRzWzFdIC0gYV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH0gIFxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBhID0gMTthIDwgODthKyspe1xyXG4gICAgICBpZihjb3Jkc1swXSAtIGEgPj0gMCAmJiBjb3Jkc1swXSAtIGEgPCA4ICYmIGNvcmRzWzFdICsgYSA+PSAwICYmIGNvcmRzWzFdICsgYSA8IDgpe1xyXG4gICAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0gLSBhLGNvcmRzWzFdICsgYV0pO1xyXG4gICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdIC0gYSxjb3Jkc1sxXSArIGFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGllY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICBcclxuICAgIH1cclxuICAgIGZvcihsZXQgYSA9IDE7YSA8IDg7YSsrKXtcclxuICAgICAgaWYoY29yZHNbMF0gKyBhID49IDAgJiYgY29yZHNbMF0gKyBhIDwgOCAmJiBjb3Jkc1sxXSArIGEgPj0gMCAmJiBjb3Jkc1sxXSArIGEgPCA4KXtcclxuICAgICAgICBsZXQgcGllY2VzID0gcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdICsgYSxjb3Jkc1sxXSArIGFdKTtcclxuICAgICAgICBpZihwaWVjZXMubGVuZ3RoID09IDAgfHwgcGllY2VzWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSArIGEsY29yZHNbMV0gKyBhXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gIFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGEgPSAxO2EgPCA4O2ErKyl7XHJcbiAgICAgIGlmKGNvcmRzWzBdICsgYSA+PSAwICYmIGNvcmRzWzBdICsgYSA8IDggJiYgY29yZHNbMV0gLSBhID49IDAgJiYgY29yZHNbMV0gLSBhIDwgOCl7XHJcbiAgICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSArIGEsY29yZHNbMV0gLSBhXSk7XHJcbiAgICAgICAgaWYocGllY2VzLmxlbmd0aCA9PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyBhLGNvcmRzWzFdIC0gYV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9ICBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0dGFja2VkO1xyXG4gIH1cclxuICBhdHRhY2tDYXJkaW5hbCgpe1xyXG4gICAgbGV0IGNvcmRzID0gdGhpcy5nZXRDb3JkcygpO1xyXG4gICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpIGFzIEJvYXJkO1xyXG4gICAgbGV0IGF0dGFja2VkOkFycmF5PFtudW1iZXIsbnVtYmVyXT4gPSBbXTtcclxuICAgIGZvcihsZXQgYSA9IGNvcmRzWzBdIC0gMTthID49IDA7YS0tKXtcclxuICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFthLGNvcmRzWzFdXSk7XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT09IDAgfHwgcGllY2VzWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChbYSxjb3Jkc1sxXV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBhID0gY29yZHNbMF0gKyAxO2EgPCA4O2ErKyl7XHJcbiAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShbYSxjb3Jkc1sxXV0pO1xyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID09PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2goW2EsY29yZHNbMV1dKTtcclxuICAgICAgfVxyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZvcihsZXQgYSA9IGNvcmRzWzFdIC0gMTthID49IDA7YS0tKXtcclxuICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSxhXSk7XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT09IDAgfHwgcGllY2VzWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0sYV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHBpZWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBhID0gY29yZHNbMV0gKyAxO2EgPCA4O2ErKyl7XHJcbiAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0sYV0pO1xyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID09PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdLGFdKTtcclxuICAgICAgfVxyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhdHRhY2tlZDtcclxuICB9XHJcbiAgdW5iaW5kX2NvbnRyb2xzKCl7XHJcbiAgICBmb3IobGV0IGEgb2YgdGhpcy5iaW5kcyl7XHJcbiAgICAgIFVuYmluZChhKTtcclxuICAgIH1cclxuICB9XHJcbiAgYmluZF9jb250cm9scygpe1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIm1vdXNlMVwiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIGxldCByb29tID0gZ2V0R2FtZSgpLnN0YXRlLmN1cnJlbnRfcm9vbSBhcyBCb2FyZDtcclxuICAgICAgaWYocm9vbS5zdGF0ZS50dXJuID09PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgIHJvb20uc3RhdGUuc2VsZWN0ZWQgPSB0aGlzO1xyXG4gICAgICAgIHJvb20uY2xlYXJfYXR0YWNrZWQoKTtcclxuICAgICAgICBsZXQgdmFsaWRfYXR0YWNrZWQgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGcgb2YgdGhpcy5nZXRBdHRhY2tpbmcoKSl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShnKTtcclxuICAgICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICAgICAgdmFsaWRfYXR0YWNrZWQucHVzaChnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcm9vbS5zdGF0ZS5hdHRhY2tlZCA9IHZhbGlkX2F0dGFja2VkO1xyXG4gICAgICAgIHJvb20uYXR0YWNrKHZhbGlkX2F0dGFja2VkKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn0iLCJpbXBvcnQge3BpZWNlLHNpZGUscGllY2VfdHlwZX0gZnJvbSBcIi4vcGllY2VcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gXCIuLi9yb29tcy9ib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZWVuIGV4dGVuZHMgcGllY2V7XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9zcHJpdGVzL3F1ZWVuLnBuZ1wiXHJcbiAgY29uc3RydWN0b3IocG9zOltudW1iZXIsbnVtYmVyXSxzaWRlOnNpZGUpe1xyXG4gICAgc3VwZXIocG9zLHNpZGUscGllY2VfdHlwZS5xdWVlbik7XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2tEaWFnb25hbCgpLmNvbmNhdCh0aGlzLmF0dGFja0NhcmRpbmFsKCkpO1xyXG4gIH1cclxufSIsImltcG9ydCB7cGllY2Usc2lkZSxwaWVjZV90eXBlfSBmcm9tIFwiLi9waWVjZVwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSBcIi4uL3Jvb21zL2JvYXJkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUm9vayBleHRlbmRzIHBpZWNle1xyXG4gIHNwcml0ZV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvc3ByaXRlcy9yb29rLnBuZ1wiXHJcbiAgY29uc3RydWN0b3IocG9zOltudW1iZXIsbnVtYmVyXSxzaWRlOnNpZGUpe1xyXG4gICAgc3VwZXIocG9zLHNpZGUscGllY2VfdHlwZS5yb29rKTtcclxuICB9XHJcbiAgZ2V0QXR0YWNraW5nKCk6QXJyYXk8W251bWJlcixudW1iZXJdPntcclxuICAgIHJldHVybiB0aGlzLmF0dGFja0NhcmRpbmFsKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtncmF2aXR5X29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtyb29tfSBmcm9tIFwiLi4vLi4vbGliL3Jvb21cIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7IGV4ZWNfdHlwZSB9IGZyb20gXCIuLi8uLi9saWIvY29udHJvbHNcIjtcclxuXHJcbmludGVyZmFjZSBsb2FkZXJfZnVuY3tcclxuICAoKTpyb29tPHVua25vd24+XHJcbn1cclxuXHJcbmludGVyZmFjZSBsb2FkZXJfc3RhdGV7XHJcbiAgZ2V0Um9vbTphbnksXHJcbiAgcG9zaXRpb246e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH1cclxuICB2ZWxvY2l0eTp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRG9vciBleHRlbmRzIGdyYXZpdHlfb2JqPGxvYWRlcl9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9vYmplY3RzL2Rvb3IucG5nXCI7XHJcbiAgaGVpZ2h0ID0gMTI4XHJcbiAgd2lkdGggPSA2NFxyXG4gIGdyYXZpdHkgPSBmYWxzZVxyXG4gIGNvbGxpc2lvbiA9IGZhbHNlXHJcbiAgY29uc3RydWN0b3IoYTpbbnVtYmVyLG51bWJlcl0sejphbnkpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGdldFJvb206eixcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6YVswXSxcclxuICAgICAgICB5OmFbMV0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBjcmVhdGVfcm9vbSgpe1xyXG4gICAgcmV0dXJuIG5ldyB0aGlzLnN0YXRlLmdldFJvb207XHJcbiAgfVxyXG4gIHByaXZhdGUgdHJhbnNwb3J0KCl7XHJcbiAgICBnZXRHYW1lKCkubG9hZFJvb20odGhpcy5jcmVhdGVfcm9vbSgpKTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJtb3VzZTFcIixleGVjX3R5cGUub25jZSwgKCk9PntcclxuICAgICAgdGhpcy50cmFuc3BvcnQoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7cm9vbSxyb29tX2l9IGZyb20gXCIuLi8uLi9saWIvcm9vbVwiO1xyXG5pbXBvcnQge3BpZWNlfSBmcm9tIFwiLi4vLi4vZ2FtZS9vYmplY3RzL3BpZWNlXCI7XHJcbmltcG9ydCB7S25pZ2h0fSBmcm9tIFwiLi4vLi4vZ2FtZS9vYmplY3RzL2tuaWdodFwiO1xyXG5pbXBvcnQge1Jvb2t9IGZyb20gXCIuLi8uLi9nYW1lL29iamVjdHMvcm9va1wiO1xyXG5pbXBvcnQge21vdmV9IGZyb20gXCIuLi8uLi9nYW1lL29iamVjdHMvbW92ZVwiO1xyXG5pbXBvcnQge29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHsgQmlzaG9wIH0gZnJvbSBcIi4uL29iamVjdHMvYmlzaG9wXCI7XHJcbmltcG9ydCB7IFF1ZWVuIH0gZnJvbSBcIi4uL29iamVjdHMvcXVlZW5cIjtcclxuaW1wb3J0IHsgS2luZyB9IGZyb20gXCIuLi9vYmplY3RzL2tpbmdcIjtcclxuaW1wb3J0IHsgUGF3biB9IGZyb20gXCIuLi9vYmplY3RzL3Bhd25cIjtcclxuXHJcbmV4cG9ydCBlbnVtIHNpZGV7XHJcbiAgd2hpdGUsXHJcbiAgYmxhY2tcclxufVxyXG5cclxuaW50ZXJmYWNlIHNwYWNlX3N0YXRle1xyXG4gIGVucGFzc2VudDpib29sZWFuLFxyXG4gIGF0dGFja2VkOmJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBib2FyZF9zdGF0ZXtcclxuICB0dXJuOnNpZGUsXHJcbiAgd2hpdGVfYm9hcmQ6QXJyYXk8QXJyYXk8c3BhY2Vfc3RhdGU+PixcclxuICBibGFja19ib2FyZDpBcnJheTxBcnJheTxzcGFjZV9zdGF0ZT4+XHJcbiAgc2VsZWN0ZWQ6cGllY2UsXHJcbiAgc3F1YXJlczpBcnJheTxBcnJheTxtb3ZlPj4sXHJcbiAgcGllY2VzOkFycmF5PHBpZWNlPixcclxuICBhdHRhY2tlZDpBcnJheTxbbnVtYmVyLG51bWJlcl0+XHJcbn1cclxuZXhwb3J0IGNsYXNzIEJvYXJkIGV4dGVuZHMgcm9vbTxib2FyZF9zdGF0ZT57XHJcbiAgYmFja2dyb3VuZF91cmw9XCJodHRwOi8vbG9jYWxob3N0L3NyYy9nYW1lL3Jvb21zL2JvYXJkLnBuZ1wiO1xyXG4gIG9iamVjdHM6QXJyYXk8b2JqPHVua25vd24+PiA9IFtdO1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgdHVybjpzaWRlLndoaXRlLFxyXG4gICAgICB3aGl0ZV9ib2FyZDpbXSxcclxuICAgICAgYmxhY2tfYm9hcmQ6W10sXHJcbiAgICAgIHNlbGVjdGVkOnVuZGVmaW5lZCxcclxuICAgICAgc3F1YXJlczpbXSxcclxuICAgICAgcGllY2VzOltdLFxyXG4gICAgICBhdHRhY2tlZDpbXVxyXG4gICAgfTtcclxuICAgIGxldCByb3cyID0gW25ldyBSb29rKFswLDddLHNpZGUuYmxhY2spLG5ldyBLbmlnaHQoWzEsN10sc2lkZS5ibGFjayksbmV3IEJpc2hvcChbMiw3XSxzaWRlLmJsYWNrKSxuZXcgUXVlZW4oWzMsN10sc2lkZS5ibGFjayksbmV3IEtpbmcoWzQsN10sc2lkZS5ibGFjayksbmV3IEJpc2hvcChbNSw3XSxzaWRlLmJsYWNrKSxuZXcgS25pZ2h0KFs2LDddLHNpZGUuYmxhY2spLG5ldyBSb29rKFs3LDddLHNpZGUuYmxhY2spXTtcclxuICAgIGxldCByb3c3ID0gW25ldyBSb29rKFswLDBdLHNpZGUud2hpdGUpLG5ldyBLbmlnaHQoWzEsMF0sc2lkZS53aGl0ZSksbmV3IEJpc2hvcChbMiwwXSxzaWRlLndoaXRlKSxuZXcgUXVlZW4oWzMsMF0sc2lkZS53aGl0ZSksbmV3IEtpbmcoWzQsMF0sc2lkZS53aGl0ZSksbmV3IEJpc2hvcChbNSwwXSxzaWRlLndoaXRlKSxuZXcgS25pZ2h0KFs2LDBdLHNpZGUud2hpdGUpLG5ldyBSb29rKFs3LDBdLHNpZGUud2hpdGUpXTtcclxuICAgIGZvcihsZXQgYSA9IDA7YSA8IHJvdzIubGVuZ3RoO2ErKyl7XHJcbiAgICAgIGxldCBwYXduMSA9IG5ldyBQYXduKFthLDFdLHNpZGUud2hpdGUpO1xyXG4gICAgICBsZXQgcGF3bjIgPSBuZXcgUGF3bihbYSw2XSxzaWRlLmJsYWNrKTtcclxuICAgICAgdGhpcy5vYmplY3RzLnB1c2gocm93N1thXSk7XHJcbiAgICAgIHRoaXMub2JqZWN0cy5wdXNoKHBhd24xKTtcclxuICAgICAgdGhpcy5vYmplY3RzLnB1c2gocm93MlthXSk7XHJcbiAgICAgIHRoaXMub2JqZWN0cy5wdXNoKHBhd24yKTtcclxuICAgICAgdGhpcy5zdGF0ZS5waWVjZXMucHVzaChwYXduMik7XHJcbiAgICAgIHRoaXMuc3RhdGUucGllY2VzLnB1c2gocm93N1thXSk7XHJcbiAgICAgIHRoaXMuc3RhdGUucGllY2VzLnB1c2gocGF3bjEpO1xyXG4gICAgICB0aGlzLnN0YXRlLnBpZWNlcy5wdXNoKHJvdzJbYV0pO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIGZvcihsZXQgYSA9IDA7YTw4O2ErKyl7XHJcbiAgICAgIGxldCBtdl9yb3c6QXJyYXk8bW92ZT4gPSBbXTtcclxuICAgICAgZm9yKGxldCBiID0gMDtiPDg7YisrKXtcclxuICAgICAgICBsZXQgZCA9IGE7XHJcbiAgICAgICAgKCgpPT4ge1xyXG4gICAgICAgICAgbGV0IG1vdmVfbyA9IG5ldyBtb3ZlKFthLGJdKTtcclxuICAgICAgICAgIG12X3Jvdy5wdXNoKG1vdmVfbyk7XHJcbiAgICAgICAgICB0aGlzLm9iamVjdHMucHVzaChtb3ZlX28pO1xyXG4gICAgICAgIH0pKClcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0YXRlLnNxdWFyZXMucHVzaChtdl9yb3cpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGF0ZS5ibGFja19ib2FyZCA9IHRoaXMuYmxhbmtfYm9hcmQoKTtcclxuICAgIHRoaXMuc3RhdGUud2hpdGVfYm9hcmQgPSB0aGlzLmJsYW5rX2JvYXJkKCk7XHJcbiAgICBmb3IobGV0IHggb2YgdGhpcy5zdGF0ZS5waWVjZXMpe1xyXG4gICAgICBpZih4LnN0YXRlLnNpZGUgPT09IHNpZGUud2hpdGUpe1xyXG4gICAgICAgIHguYmluZF9jb250cm9scygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldF9tZXRhKGE6W251bWJlcixudW1iZXJdLHM6c2lkZSl7XHJcbiAgICBpZihhWzBdID49IDAgJiYgYVswXSA8IDggJiYgYVsxXSA+PSAwICYmIGFbMV0gPCA4KXtcclxuICAgICAgaWYocyA9PT0gc2lkZS53aGl0ZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUud2hpdGVfYm9hcmRbYVswXV1bYVsxXV07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYmxhY2tfYm9hcmRbYVswXV1bYVsxXV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuICBjaGFuZ2Vfc2lkZShzOnNpZGUpe1xyXG4gICAgbGV0IHRvX2JpbmQ7XHJcbiAgICBsZXQgdG9fdW5iaW5kO1xyXG4gICAgXHJcbiAgICBpZihzID09IHNpZGUud2hpdGUpe1xyXG4gICAgICB0b19iaW5kID0gcztcclxuICAgICAgdG9fdW5iaW5kID0gc2lkZS5ibGFjaztcclxuICAgICAgXHJcbiAgICAgIHRoaXMuY2xlYXJfZW5wYXNzZW50X2JvYXJkKHRoaXMuc3RhdGUud2hpdGVfYm9hcmQpO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5jbGVhcl9hdHRhY2tlZF9ib2FyZCh0aGlzLnN0YXRlLmJsYWNrX2JvYXJkKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlX2F0dGFja2VkX2JvYXJkKHRoaXMuc3RhdGUuYmxhY2tfYm9hcmQsc2lkZS5ibGFjayk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgdG9fYmluZCA9IHNpZGUuYmxhY2s7XHJcbiAgICAgIHRvX3VuYmluZCA9IHNpZGUud2hpdGU7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmNsZWFyX2VucGFzc2VudF9ib2FyZCh0aGlzLnN0YXRlLmJsYWNrX2JvYXJkKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuY2xlYXJfYXR0YWNrZWRfYm9hcmQodGhpcy5zdGF0ZS53aGl0ZV9ib2FyZCk7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmNhbGN1bGF0ZV9hdHRhY2tlZF9ib2FyZCh0aGlzLnN0YXRlLndoaXRlX2JvYXJkLHNpZGUud2hpdGUpO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLndoaXRlX2JvYXJkKTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBmb3IobGV0IHggb2YgdGhpcy5zdGF0ZS5waWVjZXMpe1xyXG4gICAgICBpZih4LnN0YXRlLnNpZGUgPT09IHRvX2JpbmQpe1xyXG4gICAgICAgIHguYmluZF9jb250cm9scygpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7XHJcbiAgICAgICAgeC51bmJpbmRfY29udHJvbHMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zdGF0ZS50dXJuID0gcztcclxuICB9XHJcbiAgY2xlYXJfZW5wYXNzZW50X2JvYXJkKHg6QXJyYXk8QXJyYXk8c3BhY2Vfc3RhdGU+Pil7XHJcbiAgICBmb3IobGV0IGEgPSAwO2E8ODthKyspe1xyXG4gICAgICBmb3IobGV0IGIgPSAwO2I8ODtiKyspe1xyXG4gICAgICAgIHhbYV1bYl0uZW5wYXNzZW50ID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgY2FsY3VsYXRlX2F0dGFja2VkX2JvYXJkKHg6QXJyYXk8QXJyYXk8c3BhY2Vfc3RhdGU+PixzOnNpZGUpe1xyXG4gICAgZm9yKGxldCBhIG9mIHRoaXMuc3RhdGUucGllY2VzKXtcclxuICAgICAgaWYoYS5zdGF0ZS5zaWRlID09IHMpe1xyXG4gICAgICAgIGxldCBhdHRhY2tlZCA9IGEuZ2V0QXR0YWNraW5nKCk7XHJcbiAgICAgICAgZm9yKGxldCBiIG9mIGF0dGFja2VkKXtcclxuICAgICAgICAgIHhbYlswXV1bYlsxXV0uYXR0YWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBcclxuICB9XHJcbiAgY2xlYXJfYXR0YWNrZWRfYm9hcmQoeDpBcnJheTxBcnJheTxzcGFjZV9zdGF0ZT4+KXtcclxuICAgIGZvcihsZXQgYSA9IDA7YTw4O2ErKyl7XHJcbiAgICAgIGZvcihsZXQgYiA9IDA7Yjw4O2IrKyl7XHJcbiAgICAgICAgeFthXVtiXS5hdHRhY2tlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGJsYW5rX2JvYXJkKCl7XHJcbiAgICBsZXQgYm9hcmQgPSBbXTtcclxuICAgIGZvcihsZXQgYSA9IDA7YTw4O2ErKyl7XHJcbiAgICAgIGxldCByb3cgPSBbXTtcclxuICAgICAgZm9yKGxldCBiID0gMDtiPDg7YisrKXtcclxuICAgICAgICByb3cucHVzaCh7XHJcbiAgICAgICAgICBlbnBhc3NlbnQ6ZmFsc2UsXHJcbiAgICAgICAgICBhdHRhY2tlZDpmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGJvYXJkLnB1c2gocm93KTtcclxuICAgIH1cclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcbiAgYXN5bmMgYWRkX3BpZWNlKGE6cGllY2Upe1xyXG4gICAgYXdhaXQgYS5sb2FkKCk7XHJcbiAgICB0aGlzLm9iamVjdHMudW5zaGlmdChhKTtcclxuICAgIHRoaXMuc3RhdGUucGllY2VzLnVuc2hpZnQoYSk7XHJcbiAgfVxyXG4gIHJlbW92ZV9waWVjZShhOnBpZWNlKXtcclxuICAgIGZvcihsZXQgYiA9IDA7YiA8IHRoaXMuc3RhdGUucGllY2VzLmxlbmd0aDtiKyspe1xyXG4gICAgICBpZihhLmlkID09PSB0aGlzLnN0YXRlLnBpZWNlc1tiXS5pZCl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5waWVjZXMuc3BsaWNlKGIsMSk7XHJcbiAgICAgIH0gICBcclxuICAgIH1cclxuICAgIGEuZGVsZXRlKCk7XHJcbiAgfVxyXG4gIGdldF9waWVjZShhOltudW1iZXIsbnVtYmVyXSk6QXJyYXk8cGllY2U+e1xyXG4gICAgcmV0dXJuICh0aGlzLmNoZWNrX2NvbGxpc2lvbnMoe1xyXG4gICAgICB4OmFbMF0gKiAxMDAsXHJcbiAgICAgIHk6YVsxXSAqIDEwMCxcclxuICAgICAgaGVpZ2h0OjEwMCxcclxuICAgICAgd2lkdGg6MTAwXHJcbiAgICB9KSBhcyBBcnJheTxwaWVjZT4pO1xyXG4gIH1cclxuICBjbGVhcl9hdHRhY2tlZCgpe1xyXG4gICAgZm9yKGxldCBhIG9mIHRoaXMuc3RhdGUuYXR0YWNrZWQpe1xyXG4gICAgICB0aGlzLnN0YXRlLnNxdWFyZXNbYVswXV1bYVsxXV0ucmVuZGVyID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGF0dGFjayh4OkFycmF5PFtudW1iZXIsbnVtYmVyXT4pe1xyXG4gICAgZm9yKGxldCBhIG9mIHgpe1xyXG4gICAgICB0aGlzLnN0YXRlLnNxdWFyZXNbYVswXV1bYVsxXV0ucmVuZGVyID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgYXN5bmMgc3RhdGVmKGE6bnVtYmVyKXtcclxuICAgIC8vY29uc29sZS5sb2codGhpcy5vYmplY3RzKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge3Jvb20sYXBwbHlfZ3Jhdml0eX0gZnJvbSBcIi4uLy4uL2xpYi9yb29tXCI7XHJcbmltcG9ydCB7U3RhbmRpbmdHb29tYmEsR29vbWJhLCBnb29tYmFfc3RhdGV9IGZyb20gXCIuLi9vYmplY3RzL2dvb21iYVwiO1xyXG5pbXBvcnQge0JveH0gZnJvbSBcIi4uL29iamVjdHMvYm94XCI7IFxyXG5pbXBvcnQge3ZlbG9jaXR5X2NvbGxpc2lvbl9jaGVja30gZnJvbSBcIi4uLy4uL2xpYi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHsgZ3Jhdml0eV9vYmogfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge1BvbGxfTW91c2UsIGV4ZWNfdHlwZX0gZnJvbSBcIi4uLy4uL2xpYi9jb250cm9sc1wiO1xyXG5pbXBvcnQge0Rvb3J9IGZyb20gXCIuLi9vYmplY3RzL3Jvb21fbG9hZGVyXCI7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gXCIuL2JvYXJkXCI7XHJcbmltcG9ydCB7IGdldEdhbWUgfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcblxyXG5pbnRlcmZhY2Ugb3ZlcndvcmxkX2l7XHJcbiAgcGxheWVyOmdyYXZpdHlfb2JqPHVua25vd24+XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPdmVyd29ybGQgZXh0ZW5kcyByb29tPG92ZXJ3b3JsZF9pPntcclxuICBiYWNrZ3JvdW5kX3VybD1cImh0dHBzOi8vaW1nLndhbGxwYXBlcnNhZmFyaS5jb20vZGVza3RvcC8xOTIwLzEwODAvOC81MS9pbUQ0MWwuanBnXCI7XHJcbiAgb2JqZWN0cyA9IFtuZXcgQm94KDUwMCwwLFwiYm94XCIpLG5ldyBEb29yKFs1MDAsNjRdLEJvYXJkKSxuZXcgR29vbWJhKDgwMCw4MDAsXCJwbGF5ZXJcIiksbmV3IFN0YW5kaW5nR29vbWJhKDgwMSw5MDApLG5ldyBTdGFuZGluZ0dvb21iYSgwLDAsXCJjdXJzb3JcIiksbmV3IEJveCgwLDApLyosbmV3IFN0YW5kaW5nR29vbWJhKDgwMSwxMDAwKSxuZXcgU3RhbmRpbmdHb29tYmEoODAxLDExMDApLG5ldyBTdGFuZGluZ0dvb21iYSg4MDEsMTIwMCkqL11cclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBsYXllcjp1bmRlZmluZWRcclxuICAgIH07XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCl7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwibW91c2Vkb3duXCIsZXhlY190eXBlLnJlcGVhdCxhc3luYyAoKT0+e1xyXG4gICAgICBjb25zb2xlLmxvZyhcInllcFwiKTtcclxuICAgICAgbGV0IG1vdXNlX3BvcyA9IFBvbGxfTW91c2UoKTtcclxuICAgICAgaWYodGhpcy5jaGVja19jb2xsaXNpb25zKHtcclxuICAgICAgICB4Om1vdXNlX3Bvcy54LFxyXG4gICAgICAgIHk6bW91c2VfcG9zLnksXHJcbiAgICAgICAgd2lkdGg6NTAwLFxyXG4gICAgICAgIGhlaWdodDo2NFxyXG4gICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGIgPSBuZXcgQm94KG1vdXNlX3Bvcy54LG1vdXNlX3Bvcy55KTtcclxuICAgICAgICBhd2FpdCBiLmxvYWQoKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMudW5zaGlmdChiKTtcclxuICAgICAgICBcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGZvcihsZXQgYSA9IDA7YSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKyl7XHJcbiAgICAgIFxyXG4gICAgICBhcHBseV9ncmF2aXR5KHRoaXMub2JqZWN0c1thXSwtLjUsLTE1KTtcclxuICAgICAgdmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrKHRoaXMub2JqZWN0c1thXSx0aGlzLm9iamVjdHMpO1xyXG5cclxuICAgICAgdGhpcy5vYmplY3RzW2FdLnN0YXRlZih0aW1lKTtcclxuICAgIH1cclxuICAgIGxldCBwbGF5ZXIgPSB0aGlzLmdldE9iaihcInBsYXllclwiKSBhcyBHb29tYmE7XHJcbiAgICBsZXQgY3Vyc29yID0gdGhpcy5nZXRPYmooXCJjdXJzb3JcIikgYXMgR29vbWJhO1xyXG4gICAgaWYocGxheWVyKXtcclxuICAgICAgXHJcbiAgICAgIGxldCBjYW1lcmEgPSBnZXRHYW1lKCkuc3RhdGUuY2FtZXJhO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoKTtcclxuICAgICAgY2FtZXJhLnggPSBwbGF5ZXIuc3RhdGUucG9zaXRpb24ueCAtIChjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aC8yKTtcclxuICAgICAgY2FtZXJhLnkgPSBwbGF5ZXIuc3RhdGUucG9zaXRpb24ueSAtIChjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQvMik7XHJcbiAgICB9XHJcbiAgICBpZihjdXJzb3Ipe1xyXG4gICAgICBjdXJzb3IuY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICAgIGN1cnNvci5ncmF2aXR5ID0gZmFsc2U7XHJcbiAgICAgIGxldCBtb3VzZSA9IFBvbGxfTW91c2UoKTtcclxuICAgICAgY3Vyc29yLnN0YXRlLnBvc2l0aW9uLnggPSBtb3VzZS54IC0gY3Vyc29yLndpZHRoLzI7XHJcbiAgICAgIGN1cnNvci5zdGF0ZS5wb3NpdGlvbi55ID0gbW91c2UueSAtIGN1cnNvci5oZWlnaHQvMjtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbn1cclxuXHJcbi8vLCBuZXcgQm94KDAsMCkiLCJpbXBvcnQge29iaixnZXRJZH0gZnJvbSBcIi4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuLi9saWIvc3RhdGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY29sbGlzaW9uX2JveHtcclxuICB4Om51bWJlcjtcclxuICB5Om51bWJlcjtcclxuICB3aWR0aDpudW1iZXI7XHJcbiAgaGVpZ2h0Om51bWJlcjtcclxufVxyXG5cclxuZW51bSBkaXJlY3Rpb257XHJcbiAgbGVmdCxcclxuICByaWdodCxcclxuICB1cCxcclxuICBkb3duXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja19hbGxfb2JqZWN0cyhjOiBjb2xsaXNpb25fYm94LG9ianM6QXJyYXk8b2JqPHVua25vd24+PixleGVtcHRpb246c3RyaW5nKTpBcnJheTxvYmo8dW5rbm93bj4+e1xyXG4gIGxldCBtYXRjaGVkID0gW107XHJcbiAgZm9yIChsZXQgYSBvZiBvYmpzKSB7XHJcbiAgICBpZiAoYS5pZCAhPT0gZXhlbXB0aW9uICYmIGEuY29sbGlkZXNfd2l0aF9ib3goYykpIHtcclxuICAgICAgbWF0Y2hlZC5wdXNoKGEpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbWF0Y2hlZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tfYWxsX2NvbGxpc2lvbnMoYzogY29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sZXhlbXB0aW9uOnN0cmluZyk6QXJyYXk8b2JqPHVua25vd24+PntcclxuICBsZXQgbWF0Y2hlZCA9IFtdO1xyXG4gIGZvciAobGV0IGEgb2Ygb2Jqcykge1xyXG4gICAgaWYgKGEuaWQgIT09IGV4ZW1wdGlvbiAmJiBhLmNvbGxpc2lvbiAmJiBhLmNvbGxpZGVzX3dpdGhfYm94KGMpKSB7XHJcbiAgICAgIG1hdGNoZWQucHVzaChhKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG1hdGNoZWRcclxufVxyXG4vL0NoZWNrcyB1cCB0byB0aGUgZmlyc3QgY29sbGlzaW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja19jb2xsaXNpb25zKGM6IGNvbGxpc2lvbl9ib3gsIG9ianM6IEFycmF5PG9iajx1bmtub3duPj4sIGV4ZW1wdGlvbjpzdHJpbmcpIHtcclxuICBmb3IgKGxldCBhIG9mIG9ianMpIHtcclxuICAgIGlmIChhLmlkICE9PSBleGVtcHRpb24gJiYgYS5jb2xsaXNpb24gJiYgYS5jb2xsaWRlc193aXRoX2JveChjKSkge1xyXG4gICAgICByZXR1cm4gYTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmVsb2NpdHlfbWF4KHZlbG9jaXR5Om51bWJlcixib3g6Y29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sIGV4ZW1wdGlvbjpzdHJpbmcsZGlyOmRpcmVjdGlvbil7XHJcbiAgbGV0IGNvbGxpc2lvbiA9IGNoZWNrX2NvbGxpc2lvbnMoYm94LCBvYmpzLCBleGVtcHRpb24pO1xyXG4gIGlmKGNvbGxpc2lvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgcmV0dXJuIHZlbG9jaXR5O1xyXG4gIH1cclxuICBlbHNle1xyXG4gICAgbGV0IGNvbGxpZGVyID0gY29sbGlzaW9uO1xyXG4gICAgbGV0IG9yaWdpbiA9IGdldElkKG9ianMsZXhlbXB0aW9uKTtcclxuICAgIGxldCBvcmlnX3N0ID0gb3JpZ2luLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBjb2xsaWRlcl9zdCA9IGNvbGxpZGVyLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICAgIGlmKGRpciA9PSBkaXJlY3Rpb24ubGVmdCl7XHJcbiAgICAgIHJldHVybiBvcmlnX3N0LnBvc2l0aW9uLnggLSAoY29sbGlkZXJfc3QucG9zaXRpb24ueCArIGNvbGxpZGVyLndpZHRoKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZGlyID09IGRpcmVjdGlvbi5yaWdodCl7XHJcbiAgICAgIHJldHVybiBjb2xsaWRlcl9zdC5wb3NpdGlvbi54IC0gKG9yaWdfc3QucG9zaXRpb24ueCArIG9yaWdpbi53aWR0aCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGRpciA9PSBkaXJlY3Rpb24uZG93bil7XHJcbiAgICAgIHJldHVybiBvcmlnX3N0LnBvc2l0aW9uLnkgLSAoY29sbGlkZXJfc3QucG9zaXRpb24ueSArIGNvbGxpZGVyLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGRpciA9PSBkaXJlY3Rpb24udXApe1xyXG4gICAgICByZXR1cm4gY29sbGlkZXJfc3QucG9zaXRpb24ueSAtIChvcmlnX3N0LnBvc2l0aW9uLnkgKyBvcmlnaW4uaGVpZ2h0KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2sob2JqZWN0Om9iajx1bmtub3duPixsaXN0OkFycmF5PG9iajx1bmtub3duPj4pIHtcclxuICBsZXQgb2IgPSBvYmplY3Q7XHJcbiAgbGV0IHN0ID0gb2JqZWN0LmdldFN0YXRlKCkgYXMgb2JqX3N0YXRlO1xyXG4gIGxldCB4X3ZlbCA9IHN0LnZlbG9jaXR5Lng7XHJcbiAgbGV0IHlfdmVsID0gc3QudmVsb2NpdHkueTtcclxuICBpZiAoeF92ZWwgPiAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54ICsgb2Iud2lkdGgsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOiB4X3ZlbCxcclxuICAgICAgaGVpZ2h0OiBvYi5oZWlnaHRcclxuICAgIH07XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LngsYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLnJpZ2h0KTtcclxuICAgIGlmKHZlbCA+IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi54ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnggPSAwOyAgXHJcbiAgICB9XHJcbiAgfVxyXG4gIGVsc2UgaWYgKHhfdmVsIDwgMCkge1xyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgeDogeF92ZWwgKyBzdC5wb3NpdGlvbi54LFxyXG4gICAgICB5OiBzdC5wb3NpdGlvbi55LFxyXG4gICAgICB3aWR0aDogLTEgKiB4X3ZlbCxcclxuICAgICAgaGVpZ2h0OiBvYi5oZWlnaHRcclxuICAgIH1cclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueCxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24ubGVmdCk7XHJcbiAgICBpZih2ZWwgPCAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueCArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS54ID0gMDsgXHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmICh5X3ZlbCA+IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnkgKyBvYi5oZWlnaHQsXHJcbiAgICAgIHdpZHRoOiBvYi53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB5X3ZlbFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS55LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi51cCk7XHJcbiAgICBpZih2ZWwgPiAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueSArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS55ID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSBpZiAoeV92ZWwgPCAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54LFxyXG4gICAgICB5OiB5X3ZlbCArIHN0LnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOiBvYi53aWR0aCxcclxuICAgICAgaGVpZ2h0OiAtMSAqIHlfdmVsXHJcbiAgICB9XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LnksYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLmRvd24pO1xyXG4gICAgaWYodmVsIDwgMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnkgKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueSA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtHZXRTY3JlZW5EaW1lbnNpb25zLEdldFZpZXdwb3J0RGltZW5zaW9ucyxnZXRHYW1lfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7IGNvbGxpc2lvbl9ib3ggfSBmcm9tIFwiLi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtvYmp9IGZyb20gXCIuL29iamVjdFwiO1xyXG5cclxuaW50ZXJmYWNlIG1vdXNlUG9ze1xyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyLFxyXG4gIGxhc3Q6e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGNvbnRyb2xfZnVuY3tcclxuICAoKTp2b2lkXHJcbn1cclxuXHJcbmludGVyZmFjZSBtb3VzZUJpbmRze1xyXG4gIFtrZXk6c3RyaW5nXTogQXJyYXk8W2NvbnRyb2xfZnVuYyxvYmo8dW5rbm93bj5dPlxyXG59XHJcblxyXG5pbnRlcmZhY2Uga2V5QmluZHN7XHJcbiAgW2tleTpzdHJpbmddOiBBcnJheTxjb250cm9sX2Z1bmM+XHJcbn1cclxubGV0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFyZ2V0XCIpO1xyXG50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT57XHJcbiAgbGV0IG1vdXNlID0gUG9sbF9Nb3VzZSgpO1xyXG4gIGxldCBib3g6Y29sbGlzaW9uX2JveCA9IHtcclxuICAgIHg6bW91c2UueCxcclxuICAgIHk6bW91c2UueSxcclxuICAgIGhlaWdodDoxLFxyXG4gICAgd2lkdGg6MVxyXG4gIH07XHJcbiAgbGV0IGQgPSBbLi4uYWxsX2JpbmRzXTtcclxuICBmb3IobGV0IGEgPSAwO2EgPCBkLmxlbmd0aDthKyspe1xyXG4gICAgbGV0IHNlbGVjdGVkID0gZFthXTtcclxuICAgIGlmKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLm1vdXNlICYmIHNlbGVjdGVkLmtleSA9PT0gXCJtb3VzZTFcIiAmJiBzZWxlY3RlZC5leGVjdXRlID09IGV4ZWNfdHlwZS5vbmNlKXtcclxuICAgICAgaWYoc2VsZWN0ZWQub2JqICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKHNlbGVjdGVkLm9iai5jb2xsaWRlc193aXRoX2JveChib3gpKXtcclxuICAgICAgICAgIHNlbGVjdGVkLmZ1bmN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2V7XHJcbiAgICAgICAgc2VsZWN0ZWQuZnVuY3Rpb24oKTsgICAgICAgIFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSAgXHJcbn0pXHJcblxyXG50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbGxfYmluZHMubGVuZ3RoOyBhKyspIHtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZiAoc2VsZWN0ZWQudHlwZSA9PT0gYnR5cGUubW91c2UgJiYgc2VsZWN0ZWQua2V5ID09PSBlLnR5cGUgICYmICFzZWxlY3RlZC5leGVjdXRlZCkge1xyXG4gICAgICBpZihzZWxlY3RlZC5leGVjdXRlID09PSBleGVjX3R5cGUub25jZSl7XHJcbiAgICAgICAgc2VsZWN0ZWQuZnVuY3Rpb24oKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5yZXBlYXQpe1xyXG4gICAgICAgIGFjdGl2ZV9iaW5kcy5wdXNoKHNlbGVjdGVkKTtcclxuICAgICAgfVxyXG4gICAgICBzZWxlY3RlZC5leGVjdXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChlKSA9PiB7XHJcbiAgbGV0IGQgPSBbLi4uYWxsX2JpbmRzXTtcclxuICBmb3IgKGxldCBhID0gMDsgYSA8IGFsbF9iaW5kcy5sZW5ndGg7IGErKykge1xyXG4gICAgbGV0IHNlbGVjdGVkID0gZFthXTtcclxuICAgIGlmIChzZWxlY3RlZC50eXBlID09PSBidHlwZS5tb3VzZSAmJiAoc2VsZWN0ZWQua2V5ID09PSBlLnR5cGUgfHwgc2VsZWN0ZWQua2V5ID09IFwibW91c2Vkb3duXCIpICYmIHNlbGVjdGVkLmV4ZWN1dGVkKSB7XHJcbiAgICAgIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5vbmNlICl7XHJcbiAgICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5yZXBlYXQpe1xyXG4gICAgICAgIGxldCBnID0gWy4uLmFjdGl2ZV9iaW5kc107XHJcbiAgICAgICAgZm9yKGxldCBhID0gMDsgYSA8IGcubGVuZ3RoO2ErKyl7XHJcbiAgICAgICAgICBpZihnW2FdLmlkID09PSBzZWxlY3RlZC5pZCl7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkLmV4ZWN1dGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGFjdGl2ZV9iaW5kcy5zcGxpY2UoYSwxKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XHJcbiAgbGV0IGQgPSBbLi4uYWxsX2JpbmRzXTtcclxuICBmb3IgKGxldCBhID0gMDsgYSA8IGFsbF9iaW5kcy5sZW5ndGg7IGErKykge1xyXG4gICAgbGV0IHNlbGVjdGVkID0gZFthXTtcclxuICAgIGlmIChzZWxlY3RlZC50eXBlID09PSBidHlwZS5rZXlib2FyZCAmJiBzZWxlY3RlZC5rZXkgPT09IGUuY29kZSAgJiYgIXNlbGVjdGVkLmV4ZWN1dGVkKSB7XHJcbiAgICAgIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5vbmNlKXtcclxuICAgICAgICBzZWxlY3RlZC5mdW5jdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYoc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgICAgYWN0aXZlX2JpbmRzLnB1c2goc2VsZWN0ZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIHNlbGVjdGVkLmV4ZWN1dGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbn0pXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcclxuICBsZXQgZCA9IFsuLi5hbGxfYmluZHNdO1xyXG4gIGZvciAobGV0IGEgPSAwOyBhIDwgYWxsX2JpbmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWQgPSBkW2FdO1xyXG4gICAgaWYgKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLmtleWJvYXJkICYmIHNlbGVjdGVkLmtleSA9PT0gZS5jb2RlICYmIHNlbGVjdGVkLmV4ZWN1dGVkKSB7XHJcbiAgICAgIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5vbmNlICl7XHJcbiAgICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5yZXBlYXQpe1xyXG4gICAgICAgIGxldCBnID0gWy4uLmFjdGl2ZV9iaW5kc107XHJcbiAgICAgICAgZm9yKGxldCBhID0gMDsgYSA8IGcubGVuZ3RoO2ErKyl7XHJcbiAgICAgICAgICBpZihnW2FdLmlkID09PSBzZWxlY3RlZC5pZCl7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkLmV4ZWN1dGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGFjdGl2ZV9iaW5kcy5zcGxpY2UoYSwxKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSlcclxubGV0IHRyYWNrZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKTtcclxudHJhY2tlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChlKSA9PiB7XHJcbiAgdmFyIHJlY3QgPSAoZS50YXJnZXQgYXMgSFRNTENhbnZhc0VsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDtcclxuICBcclxuICBsYXN0X3ggPSB4O1xyXG4gIGxhc3RfeSA9IHk7XHJcbiAgeCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDsgLy94IHBvc2l0aW9uIHdpdGhpbiB0aGUgZWxlbWVudC5cclxuICB5ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7ICAvL3kgcG9zaXRpb24gd2l0aGluIHRoZSBlbGVtZW50LlxyXG5cclxufSlcclxuXHJcbmVudW0gYnR5cGV7XHJcbiAgbW91c2UsXHJcbiAga2V5Ym9hcmRcclxufVxyXG5cclxuaW50ZXJmYWNlIGJpbmR7XHJcbiAga2V5OnN0cmluZyxcclxuICB0eXBlOmJ0eXBlLFxyXG4gIGlkOm51bWJlcixcclxuICBmdW5jdGlvbjpjb250cm9sX2Z1bmMsXHJcbiAgZXhlY3V0ZTpleGVjX3R5cGUsXHJcbiAgb2JqPzpvYmo8dW5rbm93bj4sXHJcbiAgZXhlY3V0ZWQ/OmJvb2xlYW5cclxufVxyXG5cclxubGV0IHggPSAwO1xyXG5sZXQgeSA9IDA7XHJcbmxldCBsYXN0X3ggPSAwO1xyXG5sZXQgbGFzdF95ID0gMDtcclxubGV0IGJpbmRzOmtleUJpbmRzID0ge307XHJcbmxldCBtb3VzZUJpbmRzOm1vdXNlQmluZHMgPSB7fTtcclxubGV0IGJpbmRfY291bnQgPSAwO1xyXG5cclxubGV0IGFsbF9iaW5kczpBcnJheTxiaW5kPiA9IFtdXHJcblxyXG5sZXQgYWN0aXZlX2JpbmRzOkFycmF5PGJpbmQ+ID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUG9sbF9Nb3VzZSgpOm1vdXNlUG9ze1xyXG4gIGxldCBoZWlnaHQgPSBHZXRWaWV3cG9ydERpbWVuc2lvbnMoKS5oZWlnaHQ7XHJcbiAgbGV0IGNhbnZhcyA9IGdldEdhbWUoKS5zdGF0ZS5jYW52YXM7XHJcbiAgbGV0IHdyYXRpbyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoY2FudmFzKS53aWR0aCkvR2V0Vmlld3BvcnREaW1lbnNpb25zKCkud2lkdGg7XHJcbiAgbGV0IHZyYXRpbyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoY2FudmFzKS5oZWlnaHQpL0dldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICBsZXQgY2FtZXJhID0gZ2V0R2FtZSgpLnN0YXRlLmNhbWVyYTtcclxuICByZXR1cm4gKHtcclxuICAgIHg6ICh4L3dyYXRpby9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54KSAsXHJcbiAgICB5OiAoKGhlaWdodCAtIHkvdnJhdGlvKS9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KSxcclxuICAgIGxhc3Q6e1xyXG4gICAgICB4OiAoeC93cmF0aW8vY2FtZXJhLnN0YXRlLnNjYWxpbmcgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCksXHJcbiAgICAgIHk6ICgoaGVpZ2h0IC0geS92cmF0aW8pL2NhbWVyYS5zdGF0ZS5zY2FsaW5nICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnkpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEV4ZWN1dGVSZXBlYXRCaW5kcygpe1xyXG4gIGZvcihsZXQgYSBvZiBhY3RpdmVfYmluZHMpe1xyXG4gICAgaWYoYS5leGVjdXRlID09PSBleGVjX3R5cGUucmVwZWF0KXtcclxuICAgICAgYS5mdW5jdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFVuYmluZChiaW5kX2lkOm51bWJlcil7XHJcbiAgZm9yKGxldCBhID0gMDthIDwgYWxsX2JpbmRzLmxlbmd0aDsgYSsrKXtcclxuICAgIGlmKGFsbF9iaW5kc1thXS5pZCA9PSBiaW5kX2lkKXtcclxuICAgICAgYWxsX2JpbmRzLnNwbGljZShhLDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBleGVjX3R5cGV7XHJcbiAgb25jZSxcclxuICByZXBlYXRcclxufVxyXG5cclxubGV0IGlkID0gMDtcclxuZXhwb3J0IGZ1bmN0aW9uIEJpbmQoa2V5bmFtZTpzdHJpbmcsZnVuYzpjb250cm9sX2Z1bmMsdHlwZTpleGVjX3R5cGUsb2JqZWN0PzpvYmo8dW5rbm93bj4pOm51bWJlcntcclxuICBpZihrZXluYW1lLnNsaWNlKDAsNSkgPT09IFwibW91c2VcIil7XHJcbiAgICBhbGxfYmluZHMucHVzaCh7XHJcbiAgICAgIGtleTprZXluYW1lLFxyXG4gICAgICB0eXBlOmJ0eXBlLm1vdXNlLFxyXG4gICAgICBpZCxcclxuICAgICAgZnVuY3Rpb246ZnVuYyxcclxuICAgICAgb2JqOm9iamVjdCxcclxuICAgICAgZXhlY3V0ZTp0eXBlLFxyXG4gICAgICBleGVjdXRlZDpmYWxzZVxyXG4gICAgfSlcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGFsbF9iaW5kcy5wdXNoKHtcclxuICAgICAga2V5OmtleW5hbWUsXHJcbiAgICAgIHR5cGU6YnR5cGUua2V5Ym9hcmQsXHJcbiAgICAgIGlkLFxyXG4gICAgICBmdW5jdGlvbjpmdW5jLFxyXG4gICAgICBleGVjdXRlOnR5cGUsXHJcbiAgICAgIGV4ZWN1dGVkOmZhbHNlXHJcbiAgICB9KVxyXG4gIH1cclxuICBpZCsrO1xyXG4gIHJldHVybiBpZCAtIDE7XHJcbn0iLCJpbXBvcnQge29ian0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQgeyBHb29tYmEgfSBmcm9tIFwiLi4vZ2FtZS9vYmplY3RzL2dvb21iYVwiO1xyXG5cclxuaW50ZXJmYWNlIEh1ZFRleHRHZXRGdW5je1xyXG4gICgpOnN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRleHRTZXR0aW5ne1xyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyLFxyXG4gIGZvbnQ6Rm9udFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZvbnR7XHJcbiAgbWF4X3dpZHRoPzpudW1iZXIsXHJcbiAgc2l6ZTpudW1iZXIsXHJcbiAgZm9udDpzdHJpbmcsXHJcbiAgY29sb3I6c3RyaW5nLFxyXG4gIHRleHQ6c3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSHVkVGV4dHtcclxuICBtYXhfd2lkdGg/Om51bWJlcixcclxuICBwb3NpdGlvbjp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG4gIHNpemU6bnVtYmVyO1xyXG4gIGZvbnQ6c3RyaW5nO1xyXG4gIGNvbG9yOnN0cmluZztcclxuICB0ZXh0PzpzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIEhVRHtcclxuICBncmFwaGljX2VsZW1lbnRzOkFycmF5PG9iajx1bmtub3duPj4gPSBbXTtcclxuICB0ZXh0X2VsZW1lbnRzOkFycmF5PFRleHQ+ID0gW107XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgdGhpcy50ZXh0X2VsZW1lbnRzLnB1c2gobmV3IFRleHQoe1xyXG4gICAgcG9zaXRpb246e1xyXG4gICAgICB4OjEwLFxyXG4gICAgICB5Ojc1MFxyXG4gICAgfSxcclxuICAgIHNpemU6NDQsXHJcbiAgICBmb250OiBcIkFsYXRhXCIsXHJcbiAgICBjb2xvcjpcIndoaXRlXCJcclxuICAgfSwoKT0+IHtcclxuICAgICBsZXQgeCA9IGdldEdhbWUoKS5nZXRSb29tKCkuZ2V0T2JqKFwicGxheWVyXCIpIGFzIEdvb21iYTtcclxuICAgICByZXR1cm4geC5zdGF0ZS5zZWxlY3RlZCArIFwiXCI7XHJcbiAgICB9KSk7IFxyXG4gIH1cclxuICBzdGF0ZWYoYTpudW1iZXIpe1xyXG4gICAgZm9yKGxldCB4IG9mIHRoaXMuZ3JhcGhpY19lbGVtZW50cyl7XHJcbiAgICAgIHguc3RhdGVmKGEpO1xyXG4gICAgfVxyXG4gICAgZm9yKGxldCB4IG9mIHRoaXMudGV4dF9lbGVtZW50cyl7XHJcbiAgICAgIHguc3RhdGVmKGEpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHR7XHJcbiAgZ2V0X2Z1bmM6SHVkVGV4dEdldEZ1bmM7XHJcbiAgc3RhdGU6SHVkVGV4dDtcclxuICBjb25zdHJ1Y3RvcihhOkh1ZFRleHQsYjpIdWRUZXh0R2V0RnVuYyl7XHJcbiAgICB0aGlzLnN0YXRlID0gYTtcclxuICAgIGlmKCF0aGlzLnN0YXRlLnRleHQpe1xyXG4gICAgICB0aGlzLnN0YXRlLnRleHQgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nZXRfZnVuYyA9IGI7XHJcbiAgfVxyXG4gIHN0YXRlZihhOm51bWJlcil7XHJcbiAgIHRoaXMuc3RhdGUudGV4dCA9IHRoaXMuZ2V0X2Z1bmMoKTtcclxuICB9XHJcbiAgcmVuZGVyZihhOm51bWJlcik6Rm9udHtcclxuICAgIGxldCB7c2l6ZSxjb2xvcixmb250LHRleHR9ID0gdGhpcy5zdGF0ZTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNpemUsXHJcbiAgICAgIGNvbG9yLFxyXG4gICAgICBmb250LFxyXG4gICAgICB0ZXh0XHJcbiAgICB9O1xyXG4gIH1cclxufSIsImltcG9ydCB7c3RhdGVfZnVuYyxvYmpfc3RhdGV9IGZyb20gXCIuL3N0YXRlXCI7XHJcbmltcG9ydCB7cmVuZGVyX2Z1bmN9IGZyb20gXCIuL3JlbmRlclwiO1xyXG5pbXBvcnQge3Nwcml0ZX0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7Y29sbGlzaW9uX2JveH0gZnJvbSBcIi4vY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQge1VuYmluZCxCaW5kLGNvbnRyb2xfZnVuYywgZXhlY190eXBlfSBmcm9tIFwiLi9jb250cm9sc1wiO1xyXG5cclxuaW50ZXJmYWNlIG9ial9pPFQ+e1xyXG4gIHN0YXRlZjpzdGF0ZV9mdW5jPFQ+LFxyXG4gIHJlbmRlcmY6cmVuZGVyX2Z1bmNcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldElkKGE6QXJyYXk8b2JqPHVua25vd24+PixpZDpzdHJpbmcpOm9iajx1bmtub3duPntcclxuICBmb3IobGV0IGIgPSAwO2IgPCBhLmxlbmd0aDsgYisrKXtcclxuICAgIGlmKGFbYl0uaWQgPT0gaWQpe1xyXG4gICAgICByZXR1cm4gYVtiXTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxubGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIG9iajxUPntcclxuICBzcHJpdGVfdXJsID0gXCJcIjtcclxuICBzcHJpdGVfc2hlZXQ6SFRNTEltYWdlRWxlbWVudDtcclxuICBzdGF0ZTpUO1xyXG4gIGhlaWdodDpudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgd2lkdGg6bnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIGNvbGxpc2lvbjpib29sZWFuID0gZmFsc2U7XHJcbiAgaWQ6c3RyaW5nO1xyXG4gIGJpbmRzOkFycmF5PG51bWJlcj47XHJcbiAgcmVuZGVyID0gdHJ1ZTtcclxuICBnZXRTdGF0ZSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XHJcbiAgfVxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB0aGlzLmlkID0gXCJcIitjb3VudGVyO1xyXG4gICAgdGhpcy5iaW5kcyA9IFtdOyAgXHJcbiAgICBjb3VudGVyKys7XHJcbiAgICB0aGlzLnJlZ2lzdGVyX2NvbnRyb2xzKCk7XHJcbiAgfVxyXG4gIGxvYWQoKXtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCBhID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGEuc3JjID0gdGhpcy5zcHJpdGVfdXJsO1xyXG4gICAgICBhLm9ubG9hZCA9ICgoKT0+e1xyXG4gICAgICAgIF90aGlzLnNwcml0ZV9zaGVldCA9IGE7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIGJpbmRDb250cm9sKGtleTpzdHJpbmcseDpleGVjX3R5cGUsZnVuYzpjb250cm9sX2Z1bmMpe1xyXG4gICAgaWYoa2V5ID09IFwibW91c2UxXCIpe1xyXG4gICAgICBsZXQgYiA9IEJpbmQoa2V5LGZ1bmMseCx0aGlzKTtcclxuICAgICAgdGhpcy5iaW5kcy5wdXNoKGIpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgdGhpcy5iaW5kcy5wdXNoKEJpbmQoa2V5LGZ1bmMseCkpOyBcclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuXHJcbiAgfVxyXG4gIGRlbGV0ZSgpe1xyXG4gICAgZm9yKGxldCBhIG9mIHRoaXMuYmluZHMpe1xyXG4gICAgICBVbmJpbmQoYSk7XHJcbiAgICB9XHJcbiAgICBnZXRHYW1lKCkuZ2V0Um9vbSgpLmRlbGV0ZUl0ZW0odGhpcy5pZCk7XHJcbiAgfVxyXG4gIGNvbGxpc2lvbl9jaGVjayhhOmNvbGxpc2lvbl9ib3gpOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgICBpZih0aGlzLmNvbGxpc2lvbil7XHJcbiAgICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKTtcclxuICAgICAgcmV0dXJuIHJvb20uY2hlY2tfY29sbGlzaW9ucyhhLHRoaXMuaWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuICBzdGF0ZWYodGltZTpudW1iZXIpe1xyXG4gIH1cclxuICBjb2xsaWRlc193aXRoX2JveChhOmNvbGxpc2lvbl9ib3gpOmJvb2xlYW57XHJcbiAgICBsZXQgc3QgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IGhjb2xsaWRlcyA9IGZhbHNlLCB2Y29sbGlkZXMgPSBmYWxzZTtcclxuICAgIGlmKHN0LnBvc2l0aW9uLnggPj0gYS54ICYmIHN0LnBvc2l0aW9uLnggPCAoYS54ICsgYS53aWR0aCkpe1xyXG4gICAgICBoY29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYoYS54ID4gc3QucG9zaXRpb24ueCAmJiBhLnggPCAoc3QucG9zaXRpb24ueCArIHRoaXMud2lkdGgpKXtcclxuICAgICAgaGNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKHN0LnBvc2l0aW9uLnkgPj0gYS55ICYmIHN0LnBvc2l0aW9uLnkgPCAoYS55ICsgYS5oZWlnaHQpKXtcclxuICAgICAgdmNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKGEueSA+IHN0LnBvc2l0aW9uLnkgJiYgYS55IDwgKHN0LnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCkpe1xyXG4gICAgICB2Y29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhjb2xsaWRlcyAmJiB2Y29sbGlkZXM7XHJcbiAgfVxyXG4gIGNvbGxpZGVzX3dpdGgoYTpvYmo8dW5rbm93bj4pOmJvb2xlYW57XHJcbiAgICBsZXQgc3QgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IHN0XzIgPSBhLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBoY29sbGlkZXMgPSBmYWxzZSwgdmNvbGxpZGVzID0gZmFsc2U7XHJcbiAgICBpZihzdC5wb3NpdGlvbi54ID4gc3RfMi5wb3NpdGlvbi54ICYmIHN0LnBvc2l0aW9uLnggPCAoc3RfMi5wb3NpdGlvbi54ICsgYS53aWR0aCkpe1xyXG4gICAgICBoY29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYoc3RfMi5wb3NpdGlvbi54ID4gc3QucG9zaXRpb24ueCAmJiBzdF8yLnBvc2l0aW9uLnggPCAoc3QucG9zaXRpb24ueCArIGEud2lkdGgpKXtcclxuICAgICAgaGNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKHN0LnBvc2l0aW9uLnkgPiBzdF8yLnBvc2l0aW9uLnkgJiYgc3QucG9zaXRpb24ueSA8IChzdF8yLnBvc2l0aW9uLnkgKyBhLndpZHRoKSl7XHJcbiAgICAgIHZjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihzdF8yLnBvc2l0aW9uLnkgPiBzdC5wb3NpdGlvbi55ICYmIHN0XzIucG9zaXRpb24ueSA8IChzdC5wb3NpdGlvbi55ICsgYS53aWR0aCkpe1xyXG4gICAgICB2Y29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhjb2xsaWRlcyAmJiB2Y29sbGlkZXM7XHJcbiAgfVxyXG4gIHJlbmRlcmYodGltZTpudW1iZXIpOnNwcml0ZXtcclxuICAgIGxldCBzdCA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgc3ByaXRlX2hlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgbGV0IHNwcml0ZV93aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICBpZih0aGlzLmhlaWdodCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICBzcHJpdGVfaGVpZ2h0ID0gdGhpcy5zcHJpdGVfc2hlZXQuaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy53aWR0aCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICBzcHJpdGVfd2lkdGggPSB0aGlzLnNwcml0ZV9zaGVldC53aWR0aDtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNwcml0ZV9zaGVldDp0aGlzLnNwcml0ZV9zaGVldCxcclxuICAgICAgbGVmdDowLFxyXG4gICAgICB0b3A6MCxcclxuICAgICAgc3ByaXRlX3dpZHRoLFxyXG4gICAgICBzcHJpdGVfaGVpZ2h0XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3Mgc3RhdGljX29iantcclxuICBzcHJpdGVfdXJsID0gXCJcIjtcclxuICBzcHJpdGU6SFRNTEltYWdlRWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGdyYXZpdHlfb2JqPFQ+IGV4dGVuZHMgb2JqPFQ+e1xyXG4gIGdyYXZpdHkgPSB0cnVlXHJcbn0iLCJpbXBvcnQge3Nwcml0ZX0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7R2V0Vmlld3BvcnREaW1lbnNpb25zfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7b2JqfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuL3N0YXRlXCI7XHJcbmltcG9ydCB7SHVkVGV4dCxUZXh0U2V0dGluZ30gZnJvbSBcIi4vaHVkXCI7XHJcblxyXG5pbnRlcmZhY2UgY2FtZXJhX3N0YXRle1xyXG4gIHNjYWxpbmc6bnVtYmVyLFxyXG4gIHN0cmV0Y2g6Ym9vbGVhbixcclxuICBwb3NpdGlvbjp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG4gIGRpbWVuc2lvbnM6e1xyXG4gICAgd2lkdGg6bnVtYmVyLFxyXG4gICAgaGVpZ2h0Om51bWJlclxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhbWVyYXtcclxuICBzdGF0ZTpjYW1lcmFfc3RhdGVcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcix3aWR0aDpudW1iZXIsaGVpZ2h0Om51bWJlcixzY2FsaW5nOm51bWJlcixzdHJldGNoOmJvb2xlYW4pe1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2NhbGluZyxcclxuICAgICAgc3RyZXRjaCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6eC9zY2FsaW5nLFxyXG4gICAgICAgIHk6eS9zY2FsaW5nXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpbWVuc2lvbnM6e1xyXG4gICAgICAgIHdpZHRoOndpZHRoIC8gc2NhbGluZyxcclxuICAgICAgICBoZWlnaHQ6aGVpZ2h0IC8gc2NhbGluZ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldCB4KHg6bnVtYmVyKXtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueCA9IHg7XHJcbiAgfVxyXG4gIHNldCB5KHk6bnVtYmVyKXtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueSA9IHkgXHJcbiAgfVxyXG4gIGdldCB4KCl7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wb3NpdGlvbi54O1xyXG4gIH1cclxuICBnZXQgeSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucG9zaXRpb24ueTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHJlbmRlcl9mdW5je1xyXG4gICh4Om51bWJlcix5Om51bWJlcixzY2FsaW5nOm51bWJlcik6dm9pZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgcmVjdGFuZ2xle1xyXG4gIHdpZHRoOm51bWJlcixcclxuICBoZWlnaHQ6bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBzcHJpdGVfYXJnc3tcclxuICBzcHJpdGU6c3ByaXRlLFxyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSByZW5kZXJlcl9hcmdze1xyXG4gIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxyXG4gIGNhbWVyYTpDYW1lcmFcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRleHRfcmVuZGVyZXIgPSAocjpyZW5kZXJlcl9hcmdzLHM6VGV4dFNldHRpbmcpID0+IHtcclxuICBsZXQgdmhlaWdodCA9IEdldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICByLmNvbnRleHQuZm9udCA9IGAke3MuZm9udC5zaXplfXB4ICR7cy5mb250LmZvbnR9YDtcclxuICBpZihzLmZvbnQubWF4X3dpZHRoKXtcclxuICAgIHIuY29udGV4dC5maWxsVGV4dChzLmZvbnQudGV4dCxzLngsdmhlaWdodCAtIHMueSxzLmZvbnQubWF4X3dpZHRoKTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIHIuY29udGV4dC5maWxsVGV4dChzLmZvbnQudGV4dCxzLngsdmhlaWdodCAtIHMueSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3ByaXRlX3JlbmRlcmVyID0gKHI6cmVuZGVyZXJfYXJncyxzOnNwcml0ZV9hcmdzKSA9PiB7XHJcbiAgbGV0IGNhbWVyYSA9IHIuY2FtZXJhO1xyXG4gIGxldCB2aGVpZ2h0ID0gR2V0Vmlld3BvcnREaW1lbnNpb25zKCkuaGVpZ2h0O1xyXG4gIGxldCBmaW5hbF94ID0gKChzLnggLSBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCkgKiByLmNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgZmluYWxfeSA9ICgodmhlaWdodCAtIHMueSAtIHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueSkgKiByLmNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgaGVpZ2h0ID0gcy5zcHJpdGUuc3ByaXRlX2hlaWdodCAqIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IHdpZHRoID0gcy5zcHJpdGUuc3ByaXRlX3dpZHRoICogci5jYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICByLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgcy5zcHJpdGUuc3ByaXRlX3NoZWV0LFxyXG4gICAgcy5zcHJpdGUubGVmdCxcclxuICAgIHMuc3ByaXRlLnRvcCxcclxuICAgIHMuc3ByaXRlLnNwcml0ZV93aWR0aCxcclxuICAgIHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQsXHJcbiAgICBmaW5hbF94LFxyXG4gICAgZmluYWxfeSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVjdF9yZW5kZXJlciA9IChjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxyZWN0OnJlY3RhbmdsZSx4Om51bWJlcix5Om51bWJlcixjb2xvcjpzdHJpbmcsY2FtZXJhOkNhbWVyYSkgPT4ge1xyXG4gIGxldCB2aGVpZ2h0ID0gR2V0Vmlld3BvcnREaW1lbnNpb25zKCkuaGVpZ2h0O1xyXG4gIGxldCBmaW5hbF94ID0gKCh4IC0gY2FtZXJhLnN0YXRlLnBvc2l0aW9uLngpICogY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBmaW5hbF95ID0gKCh2aGVpZ2h0IC0geSAtIHJlY3QuaGVpZ2h0ICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnkpICogY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBoZWlnaHQgPSByZWN0LmhlaWdodCAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGxldCB3aWR0aCA9IHJlY3Qud2lkdGggKiBjYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgY29udGV4dC5zdHJva2VSZWN0KGZpbmFsX3gsZmluYWxfeSxyZWN0LndpZHRoLGhlaWdodCk7XHJcbn0iLCJpbXBvcnQgeyBncmF2aXR5X29iaixvYmogfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuaW1wb3J0IHsgc3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7IG9ial9zdGF0ZSB9IGZyb20gXCIuL3N0YXRlXCI7XHJcbmltcG9ydCB7IHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayxjaGVja19jb2xsaXNpb25zLGNvbGxpc2lvbl9ib3gsY2hlY2tfYWxsX2NvbGxpc2lvbnMsY2hlY2tfYWxsX29iamVjdHN9IGZyb20gXCIuL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge3JlbmRlcl9jb2xsaXNpb25fYm94LERFQlVHfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7QmluZCxjb250cm9sX2Z1bmMsIGV4ZWNfdHlwZX0gZnJvbSBcIi4vY29udHJvbHNcIjtcclxuaW1wb3J0IHsgT3ZlcndvcmxkIH0gZnJvbSBcIi4uL2dhbWUvcm9vbXMvb3ZlcndvcmxkXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlfZ3Jhdml0eShvYjpncmF2aXR5X29iajx1bmtub3duPixncmF2X2NvbnN0Om51bWJlciwgZ3Jhdl9tYXg6bnVtYmVyKXtcclxuICBsZXQgc3QgPSBvYi5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgaWYob2IuZ3Jhdml0eSAmJiBzdC52ZWxvY2l0eS55ID4gZ3Jhdl9tYXgpe1xyXG4gICAgc3QudmVsb2NpdHkueSArPSBncmF2X2NvbnN0O1xyXG4gIH1cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIHJvb21faTxUPntcclxuICBiYWNrZ3JvdW5kX3VybDpzdHJpbmcsXHJcbiAgb2JqZWN0czpBcnJheTxvYmo8dW5rbm93bj4+XHJcbiAgc3RhdGU6VFxyXG59XHJcbmV4cG9ydCBjbGFzcyByb29tPFQ+e1xyXG4gIGJhY2tncm91bmRfdXJsOiBzdHJpbmc7XHJcbiAgYmFja2dyb3VuZDogSFRNTEltYWdlRWxlbWVudDtcclxuICBvYmplY3RzOiBBcnJheTxvYmo8dW5rbm93bj4+XHJcbiAgc3RhdGU6IFRcclxuICBsb2FkKCkge1xyXG4gICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCBhID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGxldCB0b19hd2FpdCA9IHRoaXMub2JqZWN0cy5tYXAoKGEpID0+IGEubG9hZCgpKTtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodG9fYXdhaXQpO1xyXG4gICAgICBhLnNyYyA9IHRoaXMuYmFja2dyb3VuZF91cmw7XHJcbiAgICAgIGEub25lcnJvciA9ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBsb2FkaW5nIHVybDpcIiArIHRoaXMuYmFja2dyb3VuZF91cmwpO1xyXG4gICAgICB9KVxyXG4gICAgICBhLm9ubG9hZCA9ICgoKSA9PiB7XHJcbiAgICAgICAgX3RoaXMuYmFja2dyb3VuZCA9IGE7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIGRlbGV0ZUl0ZW0oaWQ6c3RyaW5nKXtcclxuICAgIGZvcihsZXQgYSA9IDA7YSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7YSsrKXtcclxuICAgICAgaWYodGhpcy5vYmplY3RzW2FdLmlkID09PSBpZCl7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzID0gdGhpcy5vYmplY3RzLnNsaWNlKDAsYSkuY29uY2F0KHRoaXMub2JqZWN0cy5zbGljZShhKzEpKTtcclxuICAgICAgICBhLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgYmluZENvbnRyb2woa2V5OnN0cmluZyx4OmV4ZWNfdHlwZSxmdW5jOmNvbnRyb2xfZnVuYyl7XHJcbiAgICBCaW5kKGtleSxmdW5jLHgpOyBcclxuICB9XHJcbiAgY2hlY2tfY29sbGlzaW9ucyhib3g6Y29sbGlzaW9uX2JveCxleGVtcHQ/OnN0cmluZyk6QXJyYXk8b2JqPHVua25vd24+PntcclxuICAgIGlmKERFQlVHKXtcclxuICAgICAgcmVuZGVyX2NvbGxpc2lvbl9ib3goYm94KTtcclxuICAgIH1cclxuICAgIHJldHVybiBjaGVja19hbGxfY29sbGlzaW9ucyhib3gsdGhpcy5vYmplY3RzLGV4ZW1wdCk7XHJcbiAgfVxyXG4gIGNoZWNrX29iamVjdHMoYm94OmNvbGxpc2lvbl9ib3gsZXhlbXB0PzpzdHJpbmcpe1xyXG4gICAgaWYoREVCVUcpe1xyXG4gICAgICByZW5kZXJfY29sbGlzaW9uX2JveChib3gpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoZWNrX2FsbF9vYmplY3RzKGJveCx0aGlzLm9iamVjdHMsZXhlbXB0KTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuXHJcbiAgfVxyXG4gIGNsZWFudXAoKXtcclxuXHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOiBudW1iZXIpIHtcclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgIHRoaXMub2JqZWN0c1thXS5zdGF0ZWYodGltZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE9iaihpZDpzdHJpbmcpe1xyXG4gICAgZm9yKGxldCBhID0gMDsgYSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKyl7XHJcbiAgICAgIGlmKHRoaXMub2JqZWN0c1thXS5pZCA9PSBpZCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0c1thXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZW5kZXJmKHRpbWU6IG51bWJlcik6IHNwcml0ZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzcHJpdGVfc2hlZXQ6IHRoaXMuYmFja2dyb3VuZCxcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBzcHJpdGVfaGVpZ2h0OiB0aGlzLmJhY2tncm91bmQuaGVpZ2h0LFxyXG4gICAgICBzcHJpdGVfd2lkdGg6IHRoaXMuYmFja2dyb3VuZC53aWR0aFxyXG4gICAgfVxyXG4gIH1cclxufSIsImV4cG9ydCBpbnRlcmZhY2Ugc3ByaXRle1xyXG4gIHNwcml0ZV9zaGVldDpIVE1MSW1hZ2VFbGVtZW50LFxyXG4gIGxlZnQ6bnVtYmVyLFxyXG4gIHRvcDpudW1iZXIsXHJcbiAgc3ByaXRlX3dpZHRoOm51bWJlcixcclxuICBzcHJpdGVfaGVpZ2h0Om51bWJlclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3ByaXRlX2dlbihzcHJpdGVfc2hlZXQ6SFRNTEltYWdlRWxlbWVudCxzcHJpdGVfd2lkdGg6bnVtYmVyLHNwcml0ZV9oZWlnaHQ6bnVtYmVyKTpBcnJheTxzcHJpdGU+e1xyXG4gIGxldCB3aWR0aCA9IHNwcml0ZV9zaGVldC53aWR0aDtcclxuICBsZXQgc3ByaXRlczpBcnJheTxzcHJpdGU+ID0gW107XHJcbiAgZm9yKGxldCBhID0gMDsgYSA8IHdpZHRoO2EgKz0gc3ByaXRlX3dpZHRoKXtcclxuICAgIHNwcml0ZXMucHVzaCh7XHJcbiAgICAgIHNwcml0ZV9zaGVldCxcclxuICAgICAgbGVmdDphLFxyXG4gICAgICB0b3A6MCxcclxuICAgICAgc3ByaXRlX2hlaWdodCxcclxuICAgICAgc3ByaXRlX3dpZHRoXHJcbiAgICB9KVxyXG4gIH1cclxuICByZXR1cm4gc3ByaXRlcztcclxufSIsImV4cG9ydCBjb25zdCBERUJVRyA9IHRydWU7XHJcblxyXG5pbXBvcnQge29ian0gZnJvbSBcIi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4vbGliL3N0YXRlXCI7XHJcbmltcG9ydCB7cm9vbX0gZnJvbSBcIi4vbGliL3Jvb21cIjtcclxuaW1wb3J0IHtzcHJpdGV9IGZyb20gXCIuL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHsgY29sbGlzaW9uX2JveCB9IGZyb20gXCIuL2xpYi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtzcHJpdGVfcmVuZGVyZXIscmVjdF9yZW5kZXJlciwgdGV4dF9yZW5kZXJlciwgQ2FtZXJhfSBmcm9tIFwiLi9saWIvcmVuZGVyXCI7XHJcbmltcG9ydCB7SFVEfSBmcm9tIFwiLi9saWIvaHVkXCI7XHJcbmltcG9ydCB7RXhlY3V0ZVJlcGVhdEJpbmRzfSBmcm9tIFwiLi9saWIvY29udHJvbHNcIjtcclxuXHJcbmltcG9ydCB7T3ZlcndvcmxkfSBmcm9tIFwiLi9nYW1lL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5pbXBvcnQge0JvYXJkfSBmcm9tIFwiLi9nYW1lL3Jvb21zL2JvYXJkXCI7XHJcblxyXG5sZXQgY2FudmFzX2VsZW1lbnQ6SFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxubGV0IGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzX2VsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuXHJcbmxldCBzY3JlZW5fd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxubGV0IHNjcmVlbl9oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG5sZXQgdndpZHRoID0gY2FudmFzX2VsZW1lbnQud2lkdGg7XHJcbmxldCB2aGVpZ2h0ID0gY2FudmFzX2VsZW1lbnQuaGVpZ2h0O1xyXG5cclxuXHJcbi8vSG93IG9mdGVuIHRoZSBnYW1lIGxvZ2ljIGxvb3Agc2hvdWxkIHJ1biwgaW4gbWlsbGlzZWNvbmRzXHJcbmxldCBsb2dpY19sb29wX2ludGVydmFsOm51bWJlciA9IDEwMDAvNjA7ICBcclxuXHJcbmxldCBsYXN0X3RpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuaW50ZXJmYWNlIGRpbWVuc2lvbnN7XHJcbiAgaGVpZ2h0Om51bWJlcixcclxuICB3aWR0aDpudW1iZXJcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHZXRTY3JlZW5EaW1lbnNpb25zICgpOmRpbWVuc2lvbnN7XHJcbiAgcmV0dXJuKHtcclxuICAgIHdpZHRoOnNjcmVlbl93aWR0aCxcclxuICAgIGhlaWdodDpzY3JlZW5faGVpZ2h0XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldFZpZXdwb3J0RGltZW5zaW9ucyAoKTpkaW1lbnNpb25ze1xyXG4gIHJldHVybih7XHJcbiAgICBoZWlnaHQ6dmhlaWdodCxcclxuICAgIHdpZHRoOnZ3aWR0aFxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJfY29sbGlzaW9uX2JveCA9IChhOmNvbGxpc2lvbl9ib3gpID0+IHtcclxuICBib3hlcy5wdXNoKGEpO1xyXG59XHJcblxyXG5sZXQgYm94ZXM6QXJyYXk8Y29sbGlzaW9uX2JveD4gPSBbXTtcclxuXHJcbmxldCBkZWVwID0gKGE6YW55KSA9PntcclxuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhKSk7XHJcbn1cclxuXHJcbmludGVyZmFjZSBnYW1lX3N0YXRle1xyXG4gIGxvZ2ljOm51bWJlcixcclxuICBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICBjdXJyZW50X3Jvb206cm9vbTx1bmtub3duPixcclxuICBjYW1lcmE6Q2FtZXJhLFxyXG4gIGNhbnZhczpIVE1MQ2FudmFzRWxlbWVudCxcclxuICBodWQ6SFVELFxyXG4gIHBsYXllcl9zdGF0ZTp7XHJcbiAgICBwb3dlcjpudW1iZXJcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBnYW1le1xyXG4gIHN0YXRlOmdhbWVfc3RhdGU7XHJcbiAgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgY29uc3RydWN0b3IoY3R4OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxhOnJvb208dW5rbm93bj4saDpIVUQpe1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY2FudmFzOmNhbnZhc19lbGVtZW50LFxyXG4gICAgICBsb2dpYzp1bmRlZmluZWQsXHJcbiAgICAgIGNvbnRleHQ6Y3R4LFxyXG4gICAgICBjYW1lcmE6bmV3IENhbWVyYSgwLDAsdndpZHRoLHZoZWlnaHQsMSxmYWxzZSksXHJcbiAgICAgIGN1cnJlbnRfcm9vbTogdW5kZWZpbmVkLFxyXG4gICAgICBodWQ6aCxcclxuICAgICAgcGxheWVyX3N0YXRlOntcclxuICAgICAgICBwb3dlcjowXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubG9hZFJvb20oYSk7XHJcbiAgfVxyXG4gIHJlbmRlcih0Om51bWJlcil7XHJcbiAgICB0aGlzLnN0YXRlLmNvbnRleHQuY2xlYXJSZWN0KDAsMCx2d2lkdGgsdmhlaWdodCk7XHJcbiAgICB0aGlzLnN0YXRlLmNvbnRleHQuZmlsbFN0eWxlPVwiYmxhY2tcIjtcclxuICAgIHRoaXMuc3RhdGUuY29udGV4dC5maWxsUmVjdCgwLDAsdndpZHRoLHZoZWlnaHQpO1xyXG4gICAgbGV0IGNhbWVyYV9jb2xsaWRlcnMgPSB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5jaGVja19vYmplY3RzKHtcclxuICAgICAgeDp0aGlzLnN0YXRlLmNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICB5OnRoaXMuc3RhdGUuY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOnRoaXMuc3RhdGUuY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgsXHJcbiAgICAgIGhlaWdodDp0aGlzLnN0YXRlLmNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodFxyXG4gICAgfSk7XHJcbiAgICBsZXQgcmVuZGVyX2FyZ3MgPSB7XHJcbiAgICAgIGNvbnRleHQ6dGhpcy5zdGF0ZS5jb250ZXh0LFxyXG4gICAgICBjYW1lcmE6dGhpcy5zdGF0ZS5jYW1lcmEsXHJcbiAgICB9O1xyXG4gICAgc3ByaXRlX3JlbmRlcmVyKHJlbmRlcl9hcmdzLHtcclxuICAgICAgc3ByaXRlOnRoaXMuc3RhdGUuY3VycmVudF9yb29tLnJlbmRlcmYodCksXHJcbiAgICAgIHg6MCxcclxuICAgICAgeTowXHJcbiAgICB9KTtcclxuICAgIGZvciAobGV0IGEgb2YgY2FtZXJhX2NvbGxpZGVycyl7XHJcbiAgICAgIGxldCBzdCA9IGEuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgICBpZihhLnJlbmRlcil7XHJcbiAgICAgICAgc3ByaXRlX3JlbmRlcmVyKHJlbmRlcl9hcmdzLHtcclxuICAgICAgICAgIHNwcml0ZTphLnJlbmRlcmYodCksXHJcbiAgICAgICAgICB4OnN0LnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnN0LnBvc2l0aW9uLnlcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IGJveDpjb2xsaXNpb25fYm94O1xyXG4gICAgd2hpbGUoYm94ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgIGxldCBib3ggPSBib3hlcy5wb3AoKTtcclxuICAgICAgbGV0IHJlY3QgPSB7XHJcbiAgICAgICAgd2lkdGg6Ym94LndpZHRoLFxyXG4gICAgICAgIGhlaWdodDpib3guaGVpZ2h0XHJcbiAgICAgIH1cclxuICAgICAgcmVjdF9yZW5kZXJlcihjb250ZXh0LHJlY3QsYm94LngsYm94LnksXCIjRkYwMDAwXCIsdGhpcy5zdGF0ZS5jYW1lcmEpO1xyXG4gICAgfVxyXG4gICAgbGV0IGdyYXBoaWNzID0gdGhpcy5zdGF0ZS5odWQuZ3JhcGhpY19lbGVtZW50cztcclxuICAgIGxldCB0ZXh0X2VsZW1lbnRzID0gdGhpcy5zdGF0ZS5odWQudGV4dF9lbGVtZW50cztcclxuICAgIGZvcihsZXQgYSBvZiBncmFwaGljcyl7XHJcbiAgICAgIGxldCBzdCA9IGEuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgICBpZihhLnJlbmRlcil7XHJcbiAgICAgICAgc3ByaXRlX3JlbmRlcmVyKHJlbmRlcl9hcmdzLHtcclxuICAgICAgICAgIHNwcml0ZTphLnJlbmRlcmYodCksXHJcbiAgICAgICAgICB4OnN0LnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnN0LnBvc2l0aW9uLnlcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBhIG9mIHRleHRfZWxlbWVudHMpe1xyXG4gICAgICBsZXQgc3QgPSBhLnN0YXRlO1xyXG4gICAgICB0ZXh0X3JlbmRlcmVyKHJlbmRlcl9hcmdzLHtcclxuICAgICAgICB4OnN0LnBvc2l0aW9uLngsXHJcbiAgICAgICAgeTpzdC5wb3NpdGlvbi55LFxyXG4gICAgICAgIGZvbnQ6YS5yZW5kZXJmKHQpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKGEpPT57dGhpcy5yZW5kZXIoYSl9KTsgXHJcbiAgfVxyXG4gIHN0YXJ0X2xvZ2ljKGE6bnVtYmVyKXtcclxuICAgIHJldHVybiBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICBsZXQgbmV3X3RpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBsZXQgdGltZV9zaW5jZSA9IG5ld190aW1lLmdldFRpbWUoKSAtIGxhc3RfdGltZS5nZXRUaW1lKCk7XHJcbiAgICAgIGxhc3RfdGltZSA9IG5ld190aW1lO1xyXG4gICAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5zdGF0ZWYobmV3X3RpbWUuZ2V0VGltZSgpKTtcclxuICAgICAgdGhpcy5zdGF0ZS5odWQuc3RhdGVmKG5ld190aW1lLmdldFRpbWUoKSk7XHJcbiAgICAgIEV4ZWN1dGVSZXBlYXRCaW5kcygpO1xyXG4gICAgfSxhKTtcclxuICB9XHJcbiAgZ2V0Um9vbSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuY3VycmVudF9yb29tO1xyXG4gIH1cclxuICBhc3luYyBsb2FkUm9vbSh4OnJvb208dW5rbm93bj4pe1xyXG5cclxuICAgIGlmKHRoaXMuc3RhdGUuY3VycmVudF9yb29tICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICB3aGlsZSh0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5vYmplY3RzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIHRoaXMuc3RhdGUuY3VycmVudF9yb29tLm9iamVjdHNbMF0uZGVsZXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBuZXdfcm9vbSA9IGF3YWl0IHgubG9hZCgpO1xyXG4gICAgeC5yZWdpc3Rlcl9jb250cm9scygpO1xyXG4gICAgdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20gPSB4O1xyXG4gICAgaWYodGhpcy5zdGF0ZS5sb2dpYyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUubG9naWMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGF0ZS5sb2dpYyA9IHRoaXMuc3RhcnRfbG9naWMobG9naWNfbG9vcF9pbnRlcnZhbClcclxuICAgIHRoaXMucmVuZGVyKDApO1xyXG4gIH1cclxufVxyXG5cclxubGV0IGdhbWVfaW5zdCA9IG5ldyBnYW1lKGNvbnRleHQsbmV3IE92ZXJ3b3JsZCgpLG5ldyBIVUQoKSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2FtZSgpe1xyXG4gIHJldHVybiBnYW1lX2luc3Q7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9