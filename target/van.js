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

/***/ "./src/game/objects/box.ts":
/*!*********************************!*\
  !*** ./src/game/objects/box.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const platformer_obj_1 = __webpack_require__(/*! ./platformer_obj */ "./src/game/objects/platformer_obj.ts");
class Box extends platformer_obj_1.platformer_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "./sprites/box.png";
        this.collision = true;
        this.height = 64;
        this.width = 500;
        this.gravity = false;
        this.enemy = true;
        this.tags = ["static"];
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
            },
            health: 1000
        };
    }
}
exports.Box = Box;


/***/ }),

/***/ "./src/game/objects/bullet.ts":
/*!************************************!*\
  !*** ./src/game/objects/bullet.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Rocket = exports.Bullet = void 0;
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class Bullet extends object_1.obj {
    constructor(x, angle, id = undefined) {
        super();
        this.sprite_url = "./sprites/bullet.png";
        this.height = 20;
        this.width = 10;
        this.gravity = false;
        this.max_distance = 2000;
        this.tags = ["bullet"];
        if (id != undefined) {
            this.id = id;
        }
        this.state = {
            position: {
                x: x[0],
                y: x[1]
            },
            velocity: {
                x: 0,
                y: 0
            },
            speed: 10,
            rotation: angle,
            distance: 0,
            damage: 5
        };
        this.rotation = angle;
    }
    statef(time) {
        this.state.velocity = object_1.rotation_length(this.state.speed, this.state.rotation);
        this.state.distance += this.state.speed;
        if (this.state.distance > this.max_distance) {
            this.delete();
        }
    }
    register_controls() {
    }
}
exports.Bullet = Bullet;
class Rocket extends Bullet {
    constructor(x, angle) {
        super(x, angle);
        this.sprite_url = "./sprites/folder/rocket.png";
        this.height = 67;
        this.width = 16;
        this.particle_timer = 0;
        this.particle_frequency = 5;
        this.state.speed = 15;
        this.state.damage = 20;
    }
    register_audio() {
        this.audio.add("explosion", "./sounds/explosion.mp3");
    }
    statef(time) {
        super.statef(time);
        if (this.particle_timer == 0) {
            let offset = object_1.rotation_length(30, this.rotation + 180);
            this.emit_particle("smoke", offset, 400, 12);
        }
        this.particle_timer += time;
        if (this.particle_timer > this.particle_frequency) {
            this.particle_timer = 0;
        }
        let room = van_1.getGame().state.current_room;
        let collisions = room.check_collisions({
            x: this.state.position.x,
            y: this.state.position.y,
            width: this.width,
            height: this.height
        }, ["player", "gun"]);
        if (collisions.length > 0) {
            for (let collision of collisions) {
                let st = collision.state;
                if (collision.enemy) {
                    st.health -= this.state.damage;
                }
            }
            this.state.distance = this.max_distance;
            this.delete();
            let explosion_collisions = room.check_collisions({
                x: this.state.position.x,
                y: this.state.position.y,
                width: 64,
                height: 64
            }, ["static"]);
            for (let collider of explosion_collisions) {
                let distance = this.distance(collider);
                let multiplyer = 1 - distance / 32;
                let o_state = collider.state;
                let velocities = object_1.rotation_length(multiplyer * 25, 180 + this.angleTowards(collider));
                o_state.velocity.x += velocities.x;
                o_state.velocity.y += velocities.y;
            }
            this.emit_particle("explosion", { x: 0, y: 0 }, 500, 0);
            this.audio.play("explosion", 0.5);
        }
    }
}
exports.Rocket = Rocket;


/***/ }),

/***/ "./src/game/objects/goomba.ts":
/*!************************************!*\
  !*** ./src/game/objects/goomba.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StandingGoomba = exports.Goomba = exports.Cursor = exports.Gun = exports.BigStanding = void 0;
const state_1 = __webpack_require__(/*! ../../lib/state */ "./src/lib/state.ts");
const sprite_1 = __webpack_require__(/*! ../../lib/sprite */ "./src/lib/sprite.ts");
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const platformer_obj_1 = __webpack_require__(/*! ./platformer_obj */ "./src/game/objects/platformer_obj.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
var direction;
(function (direction) {
    direction[direction["left"] = 0] = "left";
    direction[direction["right"] = 1] = "right";
})(direction || (direction = {}));
class BigStanding extends object_1.composite_obj {
    constructor(a) {
        super();
        this.collision = true;
        this.enemy = true;
        this.gracity = true;
        this.state = {
            health: 100,
            direction: direction.left,
            jumping: false,
            position: {
                x: a[0],
                y: a[1]
            },
            velocity: {
                x: 0,
                y: 0
            }
        };
        this.statics.push({
            x: 0,
            y: 0,
            obj: new StandingGoomba(0, 0)
        });
        this.statics.push({
            x: 250,
            y: 0,
            obj: new StandingGoomba(0, 0)
        });
    }
    statef(t) {
        super.statef(t);
        this.state.velocity.y = 3;
        if (this.state.health <= 0) {
            this.delete();
        }
    }
}
exports.BigStanding = BigStanding;
class Gun extends platformer_obj_1.platformer_obj {
    constructor() {
        super();
        this.sprite_url = "./sprites/folder/gun.png";
        this.height = 50;
        this.width = 20;
        this.collision = false;
        this.render = true;
        this.tags = ["gun"];
        this.id = "gun";
        this.state = {
            position: state_1.position_init().position,
            velocity: state_1.position_init().velocity,
            rotation: -1
        };
    }
    statef(t) {
        if (!this.player) {
            let room = van_1.getGame().getRoom();
            this.player = room.getObj("player");
            this.cursor = room.getObj("cursor");
        }
        let angle = this.player.angleTowards(this.cursor);
        let rot = object_1.rotation_length(50, angle);
        this.rotation = angle;
        this.state.rotation = angle;
        this.state.position = {
            x: rot.x + this.player.state.position.x,
            y: rot.y + this.player.state.position.y
        };
    }
}
exports.Gun = Gun;
class Cursor extends platformer_obj_1.platformer_obj {
    constructor(id) {
        super();
        this.sprite_url = "./sprites/cursor.png";
        this.height = 64;
        this.width = 64;
        this.collision = true;
        this.render = true;
        this.id = id;
        this.state = {
            position: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0
            }
        };
    }
    statef() {
    }
}
exports.Cursor = Cursor;
class Goomba extends platformer_obj_1.platformer_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "./sprites/folder/robot.png";
        this.height = 149;
        this.width = 149;
        this.tags = ["player"];
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
            jumping: false,
            health: 100
        };
        this.animations.play("walk1");
    }
    register_animations() {
        let sprites = sprite_1.sprite_gen(this.sprite_sheet, this.width, this.height);
        this.animations.add("walk1", [
            [0, sprites[0][0]],
            [100, sprites[0][1]],
            [400, sprites[0][0]],
            [500, sprites[0][2]]
        ], 800);
        this.animations.add("walk2", [
            [0, sprites[0][5]],
            [100, sprites[0][4]],
            [400, sprites[0][5]],
            [500, sprites[0][3]]
        ], 800);
        this.animations.add("idleleft", [
            [0, sprites[0][0]]
        ], 1);
        this.animations.add('idleright', [
            [0, sprites[0][5]]
        ], 1);
    }
    register_audio() {
        this.audio.add("slime", "./sounds/goomba/slimeball.wav");
    }
    register_controls() {
        this.bind_control("KeyA", controls_1.exec_type.repeat, () => {
            if (this.state.velocity.x > -10) {
                this.state.velocity.x = this.state.velocity.x - 1;
            }
        });
        this.bind_control("KeyW", controls_1.exec_type.once, () => {
            if (this.state.direction == direction.left) {
                this.animations.play("walk1");
            }
            else
                this.animations.play("walk2");
            this.state.velocity.y = this.state.velocity.y + 0.2;
        });
        /*this.bind_control("KeyW",exec_type.repeat,()=>{
          if(this.state.velocity.y < 10){
            this.state.velocity.y = this.state.velocity.y + 1;
          }
        });*/
        this.bind_control("KeyS", controls_1.exec_type.once, () => {
            if (this.state.direction == direction.left)
                this.animations.play("walk1");
            else
                this.animations.play("walk2");
            this.state.velocity.y = this.state.velocity.y - 0.1;
        });
        /*
        this.bind_control("KeyS",exec_type.repeat,()=>{
          if(this.state.velocity.y > -10){
            this.state.velocity.y = this.state.velocity.y - 1;
          }
        });
        */
        this.bind_control("KeyA", controls_1.exec_type.once, () => {
            this.animations.play("walk1");
            this.state.direction = direction.left;
            this.state.velocity.x = this.state.velocity.x - 0.1;
        });
        this.bind_control("mousedown", controls_1.exec_type.repeat, () => {
            this.audio.play("slime", 0.01);
        }, 600);
        this.bind_control("KeyD", controls_1.exec_type.repeat, () => {
            if (this.state.velocity.x < 10) {
                this.state.velocity.x = this.state.velocity.x + 1;
            }
        });
        this.bind_control("KeyD", controls_1.exec_type.once, () => {
            this.animations.play("walk2");
            this.state.direction = direction.right;
            this.state.velocity.x = this.state.velocity.x + 0.1;
        });
        this.bind_control("Space", controls_1.exec_type.once, () => {
            if (!this.state.jumping) {
                this.state.velocity.y += 25;
                this.audio.play("slime", 0.1);
            }
        });
    }
    renderf(t) {
        if (this.state.velocity.x == 0 && this.state.velocity.y == 0) {
            let animation = this.state.direction == direction.left ? "idleleft" : "idleright";
            this.animations.play(animation);
        }
        return super.renderf(t);
    }
    statef(time) {
        let room = van_1.getGame().getRoom();
        let cursor = room.getObj("cursor");
        if (room.check_collisions({
            width: this.width,
            height: 1,
            x: this.state.position.x,
            y: this.state.position.y - this.height / 2 - 1,
        }).length > 0) {
            this.state.jumping = false;
        }
        else {
            this.state.jumping = true;
        }
        if (this.state.velocity.y > 0) {
            this.state.velocity.y = this.state.velocity.y - 0.4 * 16 / time;
            ;
            if (this.state.velocity.y < 0)
                this.state.velocity.y = 0;
        }
        if (this.state.velocity.y < 0) {
            this.state.velocity.y = this.state.velocity.y + 0.4 * 16 / time;
            if (this.state.velocity.y > 0)
                this.state.velocity.y = 0;
        }
        if (this.state.velocity.x > 0) {
            this.state.velocity.x = this.state.velocity.x - 0.4 * 16 / time;
            ;
            if (this.state.velocity.x < 0) {
                this.state.velocity.x = 0;
            }
        }
        else if (this.state.velocity.x < 0) {
            this.state.velocity.x = this.state.velocity.x + 0.4 * 16 / time;
            ;
            if (this.state.velocity.x > 0) {
                this.state.velocity.x = 0;
            }
        }
    }
}
exports.Goomba = Goomba;
class StandingGoomba extends platformer_obj_1.platformer_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "http://localhost/src/game/objects/goomba.png";
        this.height = 64;
        this.width = 64;
        this.collision = true;
        this.enemy = true;
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
            jumping: false,
            health: 100
        };
    }
    statef(time) {
        if (this.state.jumping) {
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
        super.statef(time);
    }
}
exports.StandingGoomba = StandingGoomba;


/***/ }),

/***/ "./src/game/objects/platformer_obj.ts":
/*!********************************************!*\
  !*** ./src/game/objects/platformer_obj.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.platformer_obj_composite = exports.platformer_obj = void 0;
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
class platformer_obj extends object_1.gravity_obj {
    constructor() {
        super();
        this.enemy = false;
    }
    statef(a) {
        let state = this.state;
        if (state.health <= 0) {
            this.delete();
        }
    }
}
exports.platformer_obj = platformer_obj;
class platformer_obj_composite extends object_1.composite_obj {
    constructor() {
        super();
        this.enemy = false;
    }
    statef(a) {
        let state = this.state;
        if (state.health <= 0) {
            this.delete();
        }
    }
}
exports.platformer_obj_composite = platformer_obj_composite;


/***/ }),

/***/ "./src/game/objects/target.ts":
/*!************************************!*\
  !*** ./src/game/objects/target.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Target = void 0;
const sprite_1 = __webpack_require__(/*! ../../lib/sprite */ "./src/lib/sprite.ts");
const platformer_obj_1 = __webpack_require__(/*! ./platformer_obj */ "./src/game/objects/platformer_obj.ts");
class Target extends platformer_obj_1.platformer_obj {
    constructor(a) {
        super();
        this.sprite_url = "./sprites/target.png";
        this.height = 64;
        this.width = 64;
        this.collision = true;
        this.gravity = false;
        this.render = true;
        this.enemy = true;
        this.state = {
            position: {
                x: a[0],
                y: a[1]
            },
            velocity: {
                x: 0,
                y: 0
            },
            health: 20,
            breaking: false
        };
    }
    register_audio() {
        this.audio.add("break", "./sounds/target/hitsound_274.mp3");
    }
    register_animations() {
        let sprites = sprite_1.sprite_gen(this.sprite_sheet, this.width, this.height);
        this.animations.add("break", [
            [0, sprites[0][1]],
            [50, sprites[0][2]],
            [100, sprites[0][3]],
            [150, sprites[0][4]]
        ], 200);
    }
    statef() {
        if (this.state.health <= 0 && !this.state.breaking) {
            this.state.breaking = true;
            this.animations.play("break", () => {
                this.delete();
            });
            this.audio.play("break", 0.1);
        }
    }
}
exports.Target = Target;


/***/ }),

/***/ "./src/game/rooms/overworld.ts":
/*!*************************************!*\
  !*** ./src/game/rooms/overworld.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Overworld = void 0;
const room_1 = __webpack_require__(/*! ../../lib/room */ "./src/lib/room.ts");
const goomba_1 = __webpack_require__(/*! ../objects/goomba */ "./src/game/objects/goomba.ts");
const box_1 = __webpack_require__(/*! ../objects/box */ "./src/game/objects/box.ts");
const collision_1 = __webpack_require__(/*! ../../lib/collision */ "./src/lib/collision.ts");
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
const hud_1 = __webpack_require__(/*! ../../lib/hud */ "./src/lib/hud.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
const bullet_1 = __webpack_require__(/*! ../objects/bullet */ "./src/game/objects/bullet.ts");
const target_1 = __webpack_require__(/*! ../objects/target */ "./src/game/objects/target.ts");
const board_1 = __webpack_require__(/*! ../../van_chess/rooms/board */ "./src/van_chess/rooms/board.ts");
class Overworld_HUD extends hud_1.HUD {
    constructor() {
        super();
        this.text_elements.push(new hud_1.Text({
            position: {
                x: 10,
                y: 710
            },
            size: 44,
            font: "Alata",
            color: "white",
            align: "left"
        }, () => {
            let x = van_1.getGame().getRoom().getObj("player");
            return `X:${Math.round(x.state.position.x)}`;
        }));
        this.text_elements.push(new hud_1.Text({
            position: {
                x: 10,
                y: 750
            },
            size: 44,
            font: "Alata",
            color: "white",
            align: "left"
        }, () => {
            let x = van_1.getGame().getRoom().getObj("player");
            return `Y:${Math.round(x.state.position.y)}`;
        }));
    }
}
class Overworld extends room_1.room {
    constructor() {
        super();
        this.background_url = "./sprites/imD41l.jpg";
        this.objects = [new goomba_1.Goomba(800, 150, "player"), new box_1.Box(600, 0, "platform"), new goomba_1.Gun(), new target_1.Target([200, 100]), new target_1.Target([200, 200]), new target_1.Target([1000, 100]), new target_1.Target([1000, 200]), new goomba_1.Cursor("cursor")];
        this.state = {
            player: undefined,
            paused: false,
            locked_bullet: null
        };
    }
    registerHUD() {
        return new Overworld_HUD();
    }
    register_controls() {
        this.bindControl("Escape", controls_1.exec_type.once, () => {
            van_1.getGame().loadRoom(new board_1.Board());
        });
        this.bindControl("mousedown", controls_1.exec_type.repeat, () => {
            let gun = this.getObj("gun");
            if (gun) {
                let muzzle = object_1.rotation_length(40, gun.state.rotation);
                let position = {
                    x: gun.state.position.x + muzzle.x,
                    y: gun.state.position.y + muzzle.y
                };
                let bullets = [];
                for (let a = 0; a < 1; a++) {
                    bullets.push(new bullet_1.Rocket([position.x, position.y], gun.state.rotation));
                }
                if (this.state.locked_bullet == null)
                    this.state.locked_bullet = bullets[0];
                this.addItems(bullets);
            }
        }, 400);
        let camera3 = van_1.getGame().state.cameras[1];
        this.bindControl("ArrowLeft", controls_1.exec_type.repeat, () => {
            camera3.state.position.x -= 10;
        }, 10);
        this.bindControl("ArrowRight", controls_1.exec_type.repeat, () => {
            camera3.state.position.x += 10;
        }, 10);
        this.bindControl("ArrowDown", controls_1.exec_type.repeat, () => {
            camera3.state.position.y -= 10;
        }, 10);
        this.bindControl("ArrowUp", controls_1.exec_type.repeat, () => {
            camera3.state.position.y += 10;
        }, 10);
    }
    registerParticles() {
        this.particles["smoke"] = {
            sprite: "./sprites/folder/smoke.png",
            height: 64,
            width: 64
        };
        this.particles["explosion"] = {
            sprite: "./sprites/folder/explosion.png",
            height: 64,
            width: 64
        };
    }
    statef(time) {
        if (!this.state.paused) {
            for (let a = 0; a < this.objects.length; a++) {
                room_1.apply_gravity(this.objects[a], -1, -15);
                collision_1.velocity_collision_check(this.objects[a], this.objects);
                this.objects[a].statef(time);
            }
            for (let particle of this.particles_arr) {
                particle.statef(time);
            }
            let player = this.getObj("player");
            let cursor = this.getObj("cursor");
            let cameras = van_1.getGame().state.cameras;
            if (player) {
                cameras[0].x = player.state.position.x;
                cameras[0].y = player.state.position.y; /*+ (cameras[0].state.dimensions.height/2 - player.height/2 - 100);     */
            }
            if (this.state.locked_bullet != null) {
                let bullet = this.state.locked_bullet;
                if (bullet.state.distance < bullet.max_distance) {
                    cameras[1].state.position.x = bullet.state.position.x;
                    cameras[1].state.position.y = bullet.state.position.y;
                }
                else {
                    this.state.locked_bullet = null;
                }
            }
            if (cursor) {
                cursor.collision = false;
                cursor.gravity = false;
                let mouse = controls_1.Poll_Mouse();
                cursor.state.position.x = mouse.x;
                cursor.state.position.y = mouse.y;
                cameras[2].state.position.x = mouse.x;
                cameras[2].state.position.y = mouse.y;
            }
        }
    }
}
exports.Overworld = Overworld;


/***/ }),

/***/ "./src/lib/audio.ts":
/*!**************************!*\
  !*** ./src/lib/audio.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.audio = void 0;
class audio {
    constructor() {
        this.sounds = {};
    }
    add(name, s) {
        this.sounds[name] = new Audio(s);
    }
    load() {
        let keys = Object.keys(this.sounds);
        let promises = keys.map((key) => {
            return new Promise((resolve, reject) => {
                this.sounds[key].addEventListener("canplaythrough", (e) => {
                    resolve();
                });
            });
        });
        return Promise.all(promises);
    }
    play(name, volume) {
        let a = this.sounds[name];
        a.pause();
        a.currentTime = 0;
        a.volume = volume;
        a.play();
    }
}
exports.audio = audio;


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
function check_all_objects(c, objs, exemption = []) {
    return objs.filter((a) => (!exemption.some((b) => a.tags.indexOf(b) !== -1) && a.collides_with_box(c)));
}
exports.check_all_objects = check_all_objects;
function check_all_collisions(c, objs, exemption = []) {
    let matched = [];
    for (let a of objs) {
        if (!exemption.some((b) => a.tags.indexOf(b) !== -1) && a.collision && a.collides_with_box(c)) {
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
    return null;
}
exports.check_collisions = check_collisions;
function velocity_max(velocity, box, objs, exemption, dir) {
    let collision = check_collisions(box, objs, exemption);
    if (collision == null) {
        return velocity;
    }
    else {
        let collider = collision;
        let origin = object_1.getId(objs, exemption);
        let orig_st = origin.state;
        let collider_st = collider.state;
        if (dir == direction.left) {
            return (orig_st.position.x - origin.width / 2) - (collider_st.position.x + collider.width / 2);
        }
        else if (dir == direction.right) {
            return (collider_st.position.x - collider.width / 2) - (orig_st.position.x + origin.width / 2);
        }
        else if (dir == direction.down) {
            return (orig_st.position.y - origin.height / 2) - (collider_st.position.y + collider.height / 2);
        }
        else if (dir == direction.up) {
            return (collider_st.position.y - collider.height / 2) - (orig_st.position.y + origin.height / 2);
        }
    }
}
function velocity_collision_check(object, list) {
    list = [...list];
    let ob = object;
    let st = object.state;
    let x_vel = st.velocity.x;
    let y_vel = st.velocity.y;
    if (!ob.collision) {
        ob.state.position.x += ob.state.velocity.x;
        ob.state.position.y += ob.state.velocity.y;
        return;
    }
    if (x_vel > 0) {
        let box = {
            x: st.position.x + ob.width / 2 + x_vel / 2,
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
            x: x_vel / 2 + st.position.x - ob.width / 2,
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
            y: st.position.y + ob.height / 2 + y_vel / 2,
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
            y: y_vel / 2 + st.position.y - ob.height / 2,
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
    e.preventDefault();
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.mouse && selected.key === e.type && !selected.executed) {
            if (selected.execute === exec_type.once) {
                selected.function();
            }
            else if (selected.execute === exec_type.repeat) {
                selected.repeat_timer.active = true;
            }
            selected.executed = true;
        }
    }
});
target.addEventListener("mouseup", (e) => {
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.mouse && (selected.key === e.type) && selected.executed && selected.execute === exec_type.once) {
            selected.executed = false;
        }
        else if (selected.type === btype.mouse && (selected.key === e.type || selected.key == "mousedown") && selected.executed && selected.execute === exec_type.repeat) {
            let g = [...repeat_binds];
            for (let a = 0; a < g.length; a++) {
                if (g[a].bind.id === selected.id) {
                    selected.executed = false;
                    g[a].active = false;
                    break;
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
                for (let c of repeat_binds) {
                    if (c.bind.id == selected.id) {
                        c.active = true;
                        break;
                    }
                }
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
                let g = [...repeat_binds];
                for (let a = 0; a < g.length; a++) {
                    if (g[a].bind.id === selected.id) {
                        selected.executed = false;
                        g[a].active = false;
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
let repeat_binds = [];
function Poll_Mouse() {
    let height = van_1.GetViewportDimensions().height;
    let canvas = van_1.getGame().state.canvas;
    let wratio = parseFloat(window.getComputedStyle(canvas).width) / van_1.GetViewportDimensions().width;
    let vratio = parseFloat(window.getComputedStyle(canvas).height) / van_1.GetViewportDimensions().height;
    let camera = van_1.getGame().state.cameras[0];
    return ({
        x: (x / wratio / camera.state.scaling + camera.state.position.x - camera.state.dimensions.width / 2),
        y: ((height - y / vratio) / camera.state.scaling + camera.state.position.y - camera.state.dimensions.height / 2),
        last: {
            x: (x / wratio / camera.state.scaling + camera.state.position.x),
            y: ((height - y / vratio) / camera.state.scaling + camera.state.position.y)
        }
    });
}
exports.Poll_Mouse = Poll_Mouse;
function ExecuteRepeatBinds(b) {
    for (let a of repeat_binds) {
        if (a.bind.execute === exec_type.repeat && a.timer == 0 && a.active) {
            a.bind.function();
        }
        if (a.active || (!a.active && a.timer != 0))
            a.timer += b;
        if (a.timer > a.interval) {
            a.timer = 0;
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
function Bind(keyname, func, type, interval, object) {
    if (keyname.slice(0, 5) === "mouse") {
        let b = {
            key: keyname,
            type: btype.mouse,
            id,
            function: func,
            obj: object,
            execute: type,
            executed: false,
            interval
        };
        if (type == exec_type.repeat) {
            b.repeat_timer = {
                bind: b,
                timer: 0,
                interval,
                active: false
            };
            repeat_binds.push(b.repeat_timer);
        }
        all_binds.push(b);
    }
    else {
        let b = {
            key: keyname,
            type: btype.keyboard,
            id,
            function: func,
            execute: type,
            executed: false,
            interval
        };
        if (type == exec_type.repeat) {
            b.repeat_timer = {
                bind: b,
                timer: 0,
                interval,
                active: false
            };
            repeat_binds.push(b.repeat_timer);
        }
        all_binds.push(b);
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
class HUD {
    constructor() {
        this.graphic_elements = [];
        this.text_elements = [];
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
        if (!a.align) {
            a.align = "center";
        }
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
        let { size, color, font, text, max_width, align } = this.state;
        return {
            size,
            color,
            font,
            text,
            max_width,
            align
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
exports.gravity_obj = exports.static_obj = exports.composite_obj = exports.obj = exports.getId = exports.rotation_length = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
const controls_1 = __webpack_require__(/*! ./controls */ "./src/lib/controls.ts");
const audio_1 = __webpack_require__(/*! ./audio */ "./src/lib/audio.ts");
function rotation_length(length, degree) {
    let a_len = length * Math.sin(degree * Math.PI / 180);
    let b_len = length * Math.cos(degree * Math.PI / 180);
    return {
        x: a_len,
        y: b_len
    };
}
exports.rotation_length = rotation_length;
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
class animations {
    constructor() {
        this.animations = {};
        this.animation_tracker = 0;
    }
    add(name, s, length) {
        this.animations[name] = [s, length];
    }
    play(name, callback) {
        this.current = name;
        this.callback = callback;
        this.animation_tracker = 0;
    }
    renderf(t) {
        let curr_animation = this.animations[this.current][0];
        let length = this.animations[this.current][1];
        let index;
        for (index = 0; index < curr_animation.length - 1; index++) {
            if (this.animation_tracker >= curr_animation[index][0] && this.animation_tracker < curr_animation[index + 1][0]) {
                this.animation_tracker = this.animation_tracker + t;
                return curr_animation[index][1];
            }
        }
        if (this.callback) {
            this.callback();
        }
        if (this.animation_tracker >= length) {
            this.animation_tracker = 0;
        }
        else {
            this.animation_tracker += t;
        }
        return curr_animation[index][1];
    }
}
class obj {
    constructor() {
        this.sprite_url = "";
        this.collision = false;
        this.tags = [];
        this.rotation = 0;
        this.render = true;
        this.animations = new animations();
        this.audio = new audio_1.audio();
        this.last_render = 0;
        this.id = "" + counter;
        this.binds = [];
        counter++;
        this.register_controls();
        this.register_audio();
    }
    getState() {
        return this.state;
    }
    register_animations() {
    }
    register_audio() {
    }
    load() {
        let _this = this;
        return new Promise((resolve, reject) => {
            let a = new Image();
            a.src = this.sprite_url;
            a.onload = (() => __awaiter(this, void 0, void 0, function* () {
                _this.sprite_sheet = a;
                _this.register_animations();
                yield this.audio.load();
                resolve();
            }));
        });
    }
    distance(a) {
        let o_st = a.state;
        let st = this.state;
        return Math.sqrt(Math.pow(st.position.x - o_st.position.x, 2) + Math.pow(st.position.y - o_st.position.y, 2));
    }
    angleTowards(a) {
        let b = a;
        let state = this.state;
        if (state.position.x < b.state.position.x && state.position.y > b.state.position.y
            || (state.position.x < b.state.position.x && state.position.y < b.state.position.y)) {
            return 90 - Math.atan((b.state.position.y - state.position.y) / (b.state.position.x - state.position.x)) * 180 / Math.PI;
        }
        if (state.position.x > b.state.position.x && state.position.y < b.state.position.y
            || state.position.x > b.state.position.x && state.position.y > b.state.position.y) {
            return 270 - Math.atan((b.state.position.y - state.position.y) / (b.state.position.x - state.position.x)) * 180 / Math.PI;
        }
        return 0;
    }
    bind_control(key, x, func, interval = 1) {
        if (key == "mouse1") {
            let b = controls_1.Bind(key, func, x, interval, this);
            this.binds.push(b);
        }
        else {
            this.binds.push(controls_1.Bind(key, func, x, interval));
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
            return room.check_collisions(a, [this.id]);
        }
        return [];
    }
    statef(time) {
    }
    collides_with_box(a) {
        let st = this.state;
        let hcollides = false, vcollides = false;
        let ob = {
            left: (st.position.x - this.width / 2),
            right: (st.position.x + this.width / 2),
            top: (st.position.y + this.height / 2),
            bottom: (st.position.y - this.height / 2)
        };
        let box = {
            left: (a.x - a.width / 2),
            right: (a.x + a.width / 2),
            top: (a.y + a.height / 2),
            bottom: (a.y - a.height / 2)
        };
        if ((ob.left >= box.left && ob.left < box.right) || (box.left > ob.left && box.left < ob.right)) {
            hcollides = true;
        }
        else {
            return false;
        }
        if ((ob.bottom >= box.bottom && ob.bottom < box.top) || (box.bottom > ob.bottom && box.bottom < ob.top)) {
            vcollides = true;
        }
        else {
            return false;
        }
        return hcollides && vcollides;
    }
    emit_particle(name, offset, lifetime, range) {
        let room = van_1.getGame().getRoom();
        let st = this.state;
        let final_position = {
            x: st.position.x + offset.x,
            y: st.position.y + offset.y
        };
        room.emit_particle(name, final_position, lifetime, range);
    }
    render_track(time) {
        let rendered = this.renderf(time - this.last_render);
        this.last_render = time;
        return rendered;
    }
    renderf(time) {
        let st = this.state;
        if (!this.animations.current) {
            let sprite_height = this.height;
            let sprite_width = this.width;
            if (this.height == undefined) {
                sprite_height = this.sprite_sheet.height;
            }
            if (this.width == undefined) {
                sprite_width = this.sprite_sheet.width;
            }
            return {
                sprite: {
                    sprite_sheet: this.sprite_sheet,
                    left: 0,
                    top: 0,
                    sprite_width,
                    sprite_height,
                    opacity: 1
                },
                x: st.position.x,
                y: st.position.y
            };
        }
        return {
            sprite: this.animations.renderf(time),
            x: st.position.x,
            y: st.position.y
        };
    }
}
exports.obj = obj;
class composite_obj extends obj {
    constructor() {
        super(...arguments);
        this.objects = [];
        this.statics = [];
    }
    load() {
        return Promise.all([...this.objects.map((a) => a.load()), ...this.statics.map(a => a.obj.load())]);
    }
    renderf(time) {
        let arr = [];
        for (let obj of this.objects) {
            let rendered = obj.render_track(time);
            if (Array.isArray(rendered)) {
                arr.push(...rendered);
            }
            else {
                arr.push(rendered);
            }
        }
        for (let o of this.statics) {
            let rendered = o.obj.render_track(time);
            if (Array.isArray(rendered)) {
                arr.push(...rendered);
            }
            else {
                arr.push(rendered);
            }
        }
        return arr;
    }
    delete() {
        for (let a of this.objects) {
            a.delete();
        }
        for (let a of this.statics) {
            a.obj.delete();
        }
        super.delete();
    }
    statef(time) {
        for (let obj of this.objects) {
            obj.statef(time);
        }
        for (let a of this.statics) {
            a.obj.statef(time);
            let obj_st = a.obj.state;
            let st = this.state;
            obj_st.position.x = st.position.x + a.x;
            obj_st.position.y = st.position.y + a.y;
        }
    }
    collides_with_box(a) {
        for (let obj of this.objects) {
            if (obj.collides_with_box(a))
                return true;
        }
        for (let o of this.statics) {
            if (o.obj.collides_with_box(a))
                return true;
        }
        return false;
    }
}
exports.composite_obj = composite_obj;
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

/***/ "./src/lib/rand.ts":
/*!*************************!*\
  !*** ./src/lib/rand.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandInt = void 0;
function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.getRandInt = getRandInt;


/***/ }),

/***/ "./src/lib/render.ts":
/*!***************************!*\
  !*** ./src/lib/render.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.rect_renderer = exports.stroked_rect_renderer = exports.sprite_renderer = exports.text_renderer = exports.renderer = exports.Camera = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
class Camera {
    constructor(x, y, width, height, scaling, v) {
        this.state = {
            scaling,
            position: {
                x: x * scaling,
                y: y * scaling
            },
            dimensions: {
                width: width * scaling,
                height: height * scaling
            },
            viewport: v
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
var renderer;
(function (renderer) {
    renderer[renderer["text"] = 0] = "text";
    renderer[renderer["sprite"] = 1] = "sprite";
    renderer[renderer["rect"] = 2] = "rect";
    renderer[renderer["stroke_rect"] = 3] = "stroke_rect";
})(renderer = exports.renderer || (exports.renderer = {}));
exports.text_renderer = (r, s) => {
    let vheight = van_1.GetViewportDimensions().height;
    r.context.font = `${s.font.size}px ${s.font.font}`;
    r.context.fillStyle = s.font.color;
    r.context.textAlign = s.font.align;
    if (s.font.max_width) {
        r.context.fillText(s.font.text, s.x, vheight - s.y, s.font.max_width);
    }
    else {
        r.context.fillText(s.font.text, s.x, vheight - s.y);
    }
};
exports.sprite_renderer = (r, s) => {
    let camera = r.camera;
    let vheight = r.camera.state.dimensions.height / r.camera.state.scaling;
    let final_x = ((s.x - camera.state.position.x + camera.state.dimensions.width / 2 - s.sprite.sprite_width / 2) * r.camera.state.scaling);
    let final_y = ((vheight - s.y - camera.state.dimensions.height / 2 - s.sprite.sprite_height / 2 + camera.state.position.y) * r.camera.state.scaling);
    let height = s.sprite.sprite_height * r.camera.state.scaling;
    let width = s.sprite.sprite_width * r.camera.state.scaling;
    let cut_off = 0;
    r.context.save();
    r.context.globalAlpha = s.sprite.opacity;
    r.context.translate(final_x + cut_off + (s.sprite.sprite_width - cut_off) / 2, final_y + s.sprite.sprite_height / 2);
    let radians = s.rotation * (Math.PI / 180);
    r.context.rotate(radians);
    r.context.drawImage(s.sprite.sprite_sheet, s.sprite.left + cut_off, s.sprite.top, (s.sprite.sprite_width - cut_off), s.sprite.sprite_height, -(s.sprite.sprite_width - cut_off) / 2, -s.sprite.sprite_height / 2, width - cut_off, height);
    r.context.restore();
};
exports.stroked_rect_renderer = (context, rect, x, y, color, camera) => {
    let vheight = camera.state.dimensions.height / camera.state.scaling;
    let final_x = ((x - camera.state.position.x + camera.state.dimensions.width / 2 - rect.width / 2) * camera.state.scaling);
    let final_y = ((vheight - y - rect.height / 2 - camera.state.dimensions.height / 2 + camera.state.position.y) * camera.state.scaling);
    let height = rect.height * camera.state.scaling;
    let width = rect.width * camera.state.scaling;
    context.strokeStyle = color;
    context.strokeRect(final_x, final_y, rect.width, height);
};
exports.rect_renderer = (context, rect, x, y, color, camera) => {
    let vheight = camera.state.dimensions.height / camera.state.scaling;
    let final_x = ((x - camera.state.position.x + camera.state.dimensions.width / 2 - rect.width / 2) * camera.state.scaling);
    let final_y = ((vheight - y - rect.height / 2 - camera.state.dimensions.height / 2 + camera.state.position.y) * camera.state.scaling);
    let height = rect.height * camera.state.scaling;
    let width = rect.width * camera.state.scaling;
    context.strokeStyle = color;
    context.fillRect(final_x, final_y, rect.width, height);
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
const sprite_1 = __webpack_require__(/*! ./sprite */ "./src/lib/sprite.ts");
const collision_1 = __webpack_require__(/*! ./collision */ "./src/lib/collision.ts");
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
const controls_1 = __webpack_require__(/*! ./controls */ "./src/lib/controls.ts");
const audio_1 = __webpack_require__(/*! ./audio */ "./src/lib/audio.ts");
function apply_gravity(ob, grav_const, grav_max) {
    let st = ob.state;
    if (ob.gravity && st.velocity.y > grav_max) {
        st.velocity.y += grav_const;
    }
}
exports.apply_gravity = apply_gravity;
class room {
    constructor() {
        this.objects = [];
        this.particles = {};
        this.particles_arr = [];
        this.audio = new audio_1.audio();
    }
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
            a.onload = (() => __awaiter(this, void 0, void 0, function* () {
                _this.background = a;
                yield this.audio.load();
                resolve();
            }));
        }));
    }
    addItem(o, list = this.objects) {
        return __awaiter(this, void 0, void 0, function* () {
            yield o.load();
            list.push(o);
        });
    }
    addItems(o, list = this.objects) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(o.map((a) => a.load()));
            list.push(...o);
        });
    }
    deleteItem(id, list = this.objects) {
        for (let a = 0; a < list.length; a++) {
            if (list[a].id === id) {
                list.splice(a, 1);
                a--;
            }
        }
    }
    registerParticles() {
    }
    registerHUD() {
        return undefined;
    }
    bindControl(key, x, func, interval = 1) {
        controls_1.Bind(key, func, x, interval);
    }
    check_collisions(box, exempt) {
        if (van_1.DEBUG) {
            van_1.render_collision_box(box);
        }
        return collision_1.check_all_collisions(box, this.objects, exempt);
    }
    check_objects(box, exempt, list = this.objects) {
        if (van_1.DEBUG) {
            van_1.render_collision_box(box);
        }
        return collision_1.check_all_objects(box, list, exempt);
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
    emit_particle(name, pos, lifetime, pos_range) {
        this.addItem(new sprite_1.Particle(this.particles[name], pos, lifetime, pos_range), this.particles_arr);
    }
    getObj(id) {
        for (let a = 0; a < this.objects.length; a++) {
            if (this.objects[a].id == id) {
                return this.objects[a];
            }
        }
        return null;
    }
    renderf(time) {
        return {
            sprite_sheet: this.background,
            left: 0,
            top: 0,
            sprite_height: this.background.height,
            sprite_width: this.background.width,
            opacity: 1
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
exports.sprite_gen = exports.Particle = void 0;
const object_1 = __webpack_require__(/*! ./object */ "./src/lib/object.ts");
const rand_1 = __webpack_require__(/*! ./rand */ "./src/lib/rand.ts");
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
class Particle extends object_1.obj {
    constructor(part, pos, lifetime, random_range) {
        super();
        this.collision = false;
        this.state = {
            lifetime: 0,
            position: {
                x: pos.x + rand_1.getRandInt(-random_range, random_range),
                y: pos.y + rand_1.getRandInt(-random_range, random_range)
            },
            velocity: {
                x: 0,
                y: 0
            }
        };
        this.sprite_url = part.sprite;
        this.height = part.height;
        this.width = part.width;
        this.max_lifetime = lifetime;
        this.random_range = random_range;
    }
    delete() {
        let room = van_1.getGame().getRoom();
        room.deleteItem(this.id, room.particles_arr);
    }
    statef(time) {
        this.state.lifetime += time;
        if (this.state.lifetime > this.max_lifetime) {
            this.delete();
        }
    }
    renderf(time) {
        if (!this.selected_sprite) {
            let sprites = sprite_gen(this.sprite_sheet, this.width, this.height);
            let random_row = rand_1.getRandInt(0, sprites.length);
            let random_col = rand_1.getRandInt(0, sprites[random_row].length);
            this.selected_sprite = sprites[random_row][random_col];
        }
        this.selected_sprite.opacity = 1 - this.state.lifetime / this.max_lifetime;
        return {
            x: this.state.position.x,
            y: this.state.position.y,
            sprite: this.selected_sprite
        };
    }
}
exports.Particle = Particle;
function sprite_gen(sprite_sheet, sprite_width, sprite_height) {
    let width = sprite_sheet.width;
    let height = sprite_sheet.height;
    let sprites = [];
    for (let b = 0; b < height; b += sprite_height) {
        sprites.push([]);
        for (let a = 0; a < width; a += sprite_width) {
            sprites[b].push({
                sprite_sheet,
                left: a,
                top: b * sprite_height,
                sprite_height,
                sprite_width,
                opacity: 1
            });
        }
    }
    return sprites;
}
exports.sprite_gen = sprite_gen;


/***/ }),

/***/ "./src/lib/state.ts":
/*!**************************!*\
  !*** ./src/lib/state.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.position_init = void 0;
function position_init() {
    return {
        position: {
            x: 0,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0
        }
    };
}
exports.position_init = position_init;


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
exports.getGame = exports.game = exports.deep = exports.render_collision_box = exports.GetViewportDimensions = exports.GetScreenDimensions = exports.DEBUG = void 0;
exports.DEBUG = false;
const render_1 = __webpack_require__(/*! ./lib/render */ "./src/lib/render.ts");
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
let last_render_time = 0;
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
exports.deep = (a) => {
    return JSON.parse(JSON.stringify(a));
};
class game {
    constructor(ctx, a) {
        this.state = {
            canvas: canvas_element,
            logic: undefined,
            context: ctx,
            cameras: [new render_1.Camera(0, 0, vwidth / 2, vheight, 1, {
                    x: 0,
                    y: 0,
                    width: 0.5,
                    height: 0.5
                }),
                new render_1.Camera(0, 100, vwidth / 2, vheight / 2, 1, {
                    x: vwidth / 2,
                    y: 0,
                    width: 0.5,
                    height: 0.5
                }),
                new render_1.Camera(0, 100, vwidth / 2, vheight / 2, 1, {
                    x: vwidth / 2,
                    y: vheight / 2,
                    width: 0.5,
                    height: 0.5
                })
            ],
            current_room: undefined,
            player_state: {
                power: 0
            }
        };
        this.offscreen_canvas = document.createElement("canvas");
        this.offscreen_context = this.offscreen_canvas.getContext("2d");
        this.loadRoom(a);
    }
    render(t) {
        let time = t - last_render_time;
        last_render_time = t;
        for (let camera of this.state.cameras) {
            this.offscreen_canvas.height = camera.state.dimensions.height;
            this.offscreen_canvas.width = camera.state.dimensions.width;
            this.offscreen_context.clearRect(0, 0, camera.state.dimensions.width, camera.state.dimensions.height);
            this.offscreen_context.fillStyle = "black";
            this.offscreen_context.fillRect(0, 0, camera.state.dimensions.width, camera.state.dimensions.height);
            let camera_box = {
                x: camera.state.position.x,
                y: camera.state.position.y,
                width: camera.state.dimensions.width,
                height: camera.state.dimensions.height
            };
            let particle_collides = this.state.current_room.check_objects(camera_box, [], this.state.current_room.particles_arr);
            let camera_colliders = [...this.state.current_room.check_objects(camera_box), ...particle_collides];
            let render_args = {
                context: this.offscreen_context,
                camera: camera,
            };
            render_1.sprite_renderer(render_args, {
                sprite: this.state.current_room.renderf(time),
                x: 0,
                y: 0,
                rotation: 0
            });
            for (let a of camera_colliders.filter((b) => b.render)) {
                let rendered = a.render_track(t);
                if (Array.isArray(rendered)) {
                    for (let positioned_sprite of rendered)
                        render_1.sprite_renderer(render_args, {
                            sprite: positioned_sprite.sprite,
                            x: positioned_sprite.x,
                            y: positioned_sprite.y,
                            rotation: a.rotation
                        });
                }
                else {
                    let positioned_sprite = rendered;
                    render_1.sprite_renderer(render_args, {
                        sprite: positioned_sprite.sprite,
                        x: positioned_sprite.x,
                        y: positioned_sprite.y,
                        rotation: a.rotation
                    });
                }
            }
            if (exports.DEBUG) {
                let box;
                let boxes_copy = [...boxes];
                while (boxes_copy.length > 0) {
                    let box = boxes_copy.pop();
                    let rect = {
                        width: box.width,
                        height: box.height
                    };
                    render_1.stroked_rect_renderer(this.offscreen_context, rect, box.x, box.y, "#FF0000", camera);
                }
            }
            if (this.state.current_room.hud) {
                let graphics = this.state.current_room.hud.graphic_elements;
                let text_elements = this.state.current_room.hud.text_elements;
                for (let a of graphics) {
                    let rendered = a.render_track(t);
                    if (Array.isArray(rendered) && a.render) {
                        for (let positioned_sprite of rendered) {
                            render_1.sprite_renderer(render_args, {
                                sprite: positioned_sprite.sprite,
                                x: positioned_sprite.x,
                                y: positioned_sprite.y,
                                rotation: a.rotation
                            });
                        }
                    }
                    else if (a.render) {
                        let pos = rendered;
                        render_1.sprite_renderer(render_args, {
                            sprite: pos.sprite,
                            x: pos.x,
                            y: pos.y,
                            rotation: a.rotation
                        });
                    }
                }
                render_args.context = this.state.context;
                for (let a of text_elements) {
                    let st = a.state;
                    render_1.text_renderer(render_args, {
                        x: st.position.x,
                        y: st.position.y,
                        font: a.renderf(t)
                    });
                }
            }
            this.state.context.drawImage(this.offscreen_canvas, camera.state.viewport.x, camera.state.viewport.y);
        }
        if (exports.DEBUG)
            boxes = [];
        requestAnimationFrame((a) => { this.render(a); });
    }
    start_logic(a) {
        return setInterval(() => {
            let new_time = new Date();
            let time_since = new_time.getTime() - last_time.getTime();
            last_time = new_time;
            this.state.current_room.statef(time_since);
            if (this.state.current_room.hud) {
                this.state.current_room.hud.statef(time_since);
            }
            controls_1.ExecuteRepeatBinds(a);
        }, a);
    }
    getRoom() {
        return this.state.current_room;
    }
    loadRoom(x) {
        return __awaiter(this, void 0, void 0, function* () {
            x.hud = x.registerHUD();
            if (this.state.current_room !== undefined) {
                while (this.state.current_room.objects.length > 0) {
                    this.state.current_room.objects[0].delete();
                }
            }
            let new_room = yield x.load();
            x.register_controls();
            x.registerParticles();
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
let game_inst = new game(context, new overworld_1.Overworld());
function getGame() {
    return game_inst;
}
exports.getGame = getGame;


/***/ }),

/***/ "./src/van_chess/objects/bishop.ts":
/*!*****************************************!*\
  !*** ./src/van_chess/objects/bishop.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Bishop = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/van_chess/objects/piece.ts");
class Bishop extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.bishop);
        this.sprite_url = "./sprites/bishop.png";
    }
    getAttacking() {
        return this.attackDiagonal();
    }
}
exports.Bishop = Bishop;


/***/ }),

/***/ "./src/van_chess/objects/king.ts":
/*!***************************************!*\
  !*** ./src/van_chess/objects/king.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.King = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/van_chess/objects/piece.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class King extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.king);
        this.sprite_url = "./sprites/king.png";
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

/***/ "./src/van_chess/objects/knight.ts":
/*!*****************************************!*\
  !*** ./src/van_chess/objects/knight.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Knight = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/van_chess/objects/piece.ts");
class Knight extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.knight);
        this.sprite_url = "./sprites/knight.png";
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

/***/ "./src/van_chess/objects/move.ts":
/*!***************************************!*\
  !*** ./src/van_chess/objects/move.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.move = void 0;
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
const board_1 = __webpack_require__(/*! ../rooms/board */ "./src/van_chess/rooms/board.ts");
const piece_1 = __webpack_require__(/*! ./piece */ "./src/van_chess/objects/piece.ts");
const queen_1 = __webpack_require__(/*! ./queen */ "./src/van_chess/objects/queen.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
class move extends object_1.obj {
    constructor(a) {
        super();
        this.sprite_url = "./sprites/attacked.png";
        this.height = 100;
        this.width = 100;
        this.render = false;
        this.state = {
            position: {
                x: (a[0] - 4) * this.width + this.width / 2,
                y: (a[1] - 4) * this.height + this.height / 2
            }
        };
    }
    getCords() {
        let x = (this.state.position.x - this.width / 2) / 100 + 4;
        let y = (this.state.position.y - this.height / 2) / 100 + 4;
        return [x, y];
    }
    register_controls() {
        this.bind_control("mouse1", controls_1.exec_type.once, () => {
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

/***/ "./src/van_chess/objects/pawn.ts":
/*!***************************************!*\
  !*** ./src/van_chess/objects/pawn.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/van_chess/objects/piece.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class Pawn extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.pawn);
        this.sprite_url = "./sprites/pawn.png";
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

/***/ "./src/van_chess/objects/piece.ts":
/*!****************************************!*\
  !*** ./src/van_chess/objects/piece.ts ***!
  \****************************************/
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
                x: (pos[0] - 4) * this.width + this.width / 2,
                y: (pos[1] - 4) * this.height + this.height / 2
            },
            side,
            type,
            has_moved: false
        };
    }
    movetoCords(a) {
        this.state.position.x = (a[0] - 4) * this.width + this.width / 2;
        this.state.position.y = (a[1] - 4) * this.height + this.height / 2;
    }
    getCords() {
        let x = (this.state.position.x - this.width / 2) / 100 + 4;
        let y = (this.state.position.y - this.height / 2) / 100 + 4;
        return [x, y];
    }
    getAttacking() {
        return [];
    }
    renderf(t) {
        let sprites = sprite_1.sprite_gen(this.sprite_sheet, this.width, this.height);
        if (this.state.side === side.white) {
            return {
                sprite: sprites[0][0],
                x: this.state.position.x,
                y: this.state.position.y
            };
        }
        else {
            return {
                sprite: sprites[0][1],
                x: this.state.position.x,
                y: this.state.position.y
            };
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
        this.bind_control("mouse1", controls_1.exec_type.once, () => {
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

/***/ "./src/van_chess/objects/queen.ts":
/*!****************************************!*\
  !*** ./src/van_chess/objects/queen.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Queen = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/van_chess/objects/piece.ts");
class Queen extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.queen);
        this.sprite_url = "./sprites/queen.png";
    }
    getAttacking() {
        return this.attackDiagonal().concat(this.attackCardinal());
    }
}
exports.Queen = Queen;


/***/ }),

/***/ "./src/van_chess/objects/rook.ts":
/*!***************************************!*\
  !*** ./src/van_chess/objects/rook.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Rook = void 0;
const piece_1 = __webpack_require__(/*! ./piece */ "./src/van_chess/objects/piece.ts");
class Rook extends piece_1.piece {
    constructor(pos, side) {
        super(pos, side, piece_1.piece_type.rook);
        this.sprite_url = "./sprites/rook.png";
    }
    getAttacking() {
        return this.attackCardinal();
    }
}
exports.Rook = Rook;


/***/ }),

/***/ "./src/van_chess/rooms/board.ts":
/*!**************************************!*\
  !*** ./src/van_chess/rooms/board.ts ***!
  \**************************************/
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
const knight_1 = __webpack_require__(/*! ../../van_chess/objects/knight */ "./src/van_chess/objects/knight.ts");
const rook_1 = __webpack_require__(/*! ../../van_chess/objects/rook */ "./src/van_chess/objects/rook.ts");
const move_1 = __webpack_require__(/*! ../../van_chess/objects/move */ "./src/van_chess/objects/move.ts");
const bishop_1 = __webpack_require__(/*! ../../van_chess/objects/bishop */ "./src/van_chess/objects/bishop.ts");
const queen_1 = __webpack_require__(/*! ../../van_chess/objects/queen */ "./src/van_chess/objects/queen.ts");
const king_1 = __webpack_require__(/*! ../../van_chess/objects/king */ "./src/van_chess/objects/king.ts");
const pawn_1 = __webpack_require__(/*! ../../van_chess/objects/pawn */ "./src/van_chess/objects/pawn.ts");
var side;
(function (side) {
    side[side["white"] = 0] = "white";
    side[side["black"] = 1] = "black";
})(side = exports.side || (exports.side = {}));
class Board extends room_1.room {
    constructor() {
        super();
        this.background_url = "./sprites/board.png";
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
        return null;
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
            x: a[0] * 100 + 50 - 400,
            y: a[1] * 100 + 50 - 400,
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
}
exports.Board = Board;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9ib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9idWxsZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9nb29tYmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9wbGF0Zm9ybWVyX29iai50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9vYmplY3RzL3RhcmdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9yb29tcy9vdmVyd29ybGQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9hdWRpby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbnRyb2xzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvaHVkLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvb2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcmFuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3JlbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3Jvb20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9zcHJpdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9zdGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFuLnRzIiwid2VicGFjazovLy8uL3NyYy92YW5fY2hlc3Mvb2JqZWN0cy9iaXNob3AudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zhbl9jaGVzcy9vYmplY3RzL2tpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zhbl9jaGVzcy9vYmplY3RzL2tuaWdodC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFuX2NoZXNzL29iamVjdHMvbW92ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFuX2NoZXNzL29iamVjdHMvcGF3bi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFuX2NoZXNzL29iamVjdHMvcGllY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zhbl9jaGVzcy9vYmplY3RzL3F1ZWVuLnRzIiwid2VicGFjazovLy8uL3NyYy92YW5fY2hlc3Mvb2JqZWN0cy9yb29rLnRzIiwid2VicGFjazovLy8uL3NyYy92YW5fY2hlc3Mvcm9vbXMvYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSw2R0FBMkQ7QUFJM0QsTUFBYSxHQUFJLFNBQVEsK0JBQTBCO0lBUWpELFlBQVksQ0FBUSxFQUFFLENBQVEsRUFBRSxLQUFZLFNBQVM7UUFDbkQsS0FBSyxFQUFFLENBQUM7UUFSVixlQUFVLEdBQUcsbUJBQW1CO1FBQ2hDLGNBQVMsR0FBRyxJQUFJO1FBQ2hCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ1osWUFBTyxH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Q0QsUUFBUSxDQUFDLENBQWM7UUFDckIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQTZCLENBQUM7UUFDM0MsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQTZCLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlHLENBQUM7SUFDRCxZQUFZLENBQUMsQ0FBZTtRQUMxQixJQUFJLENBQUMsR0FBRyxDQUFtQixDQUFDO1FBQzVCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUE2QixDQUFDO1FBQy9DLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7ZUFDN0UsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDckYsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFH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QUFDO1lBQ3RDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsSUFBSSxHQUFHLEdBQUc7WUFDUixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDMUIsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN6QixNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQzdCO1FBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMvRixTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO2FBQ0c7WUFDRixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBQztZQUN0RyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO2FBQ0c7WUFDRixPQUFPLEtBQUssQ0FBQztT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QUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxSCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUNoRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzVCLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFWSxxQkFBYSxHQUFHLENBQUMsT0FBaUMsRUFBRSxJQUFlLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLEVBQUU7SUFDdkksSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ3BFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxD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SUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxZQUFJLENBQUMsS0FBSyxFQUFDO1lBQy9CLElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDO2dCQUN0RCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDO29CQUMvRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4QzthQUNGO1lBQ0QsSUFBSSxVQUFVLEdBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxXQUFXLEdBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hDLElBQUksT0FBTyxHQUFHLElBQUks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QkFDakUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsSUFBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDbkIsTUFBTTthQUNQO1NBQ0Y7UUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBRyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQztnQkFDakUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsSUFBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDbkIsTUFBTTthQUNQO1NBQ0Y7UUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNqQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBRyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQztnQkFDakUs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QyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLGVBQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksYUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLFdBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksZUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLFdBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM5TyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNoQyxJQUFJLEtBQUssR0FBRyxJQUFJLFdBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUVqQztRQUNELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDcEIsSUFBSSxNQUFNLEdBQWUsRUFBRSxDQUFDO1lBQzVCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDVixDQUFDLEdBQUUsRUFBRTtvQkFDSCxJQUFJLE1BQU0sR0FBRyxJQUFJLFdBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLEVBQUU7YUFDTDtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUMsS0FBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQztZQUM3QixJQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUM7Z0JBQzdCLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUNuQjtTQUNGO0lBRUgsQ0FBQztJQUNELFFBQVEsQ0FBQyxDQUFpQixFQUFDLENBQU07UUFDL0IsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDO1lBQ2hELElBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUM7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0M7WUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsV0FBVyxDQUFDLENBQU07UUFDaEIsSUFBSSxPQUFPLENBQUM7UUFDWixJQUFJLFNBQVMsQ0FBQztRQUVkLElBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUM7WUFDakIsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNaLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXZCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRW5ELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWxELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FFbEU7YUFDRztZQUNGLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3JCLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXZCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRW5ELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWxELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FHbEU7UUFDRCxLQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDO1lBQzdCLElBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFDO2dCQUMxQixDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDbkI7aUJBQ0c7Z0JBQ0YsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3JCO1NBQ0Y7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNELHFCQUFxQixDQUFDLENBQTJCO1FBQy9DLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDcEIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDM0I7U0FDRjtJQUNILENBQUM7SUFDRCx3QkFBd0IsQ0FBQyxDQUEyQixFQUFDLENBQU07UUFDekQsS0FBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQztZQUM3QixJQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBQztnQkFDbkIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNoQyxLQUFJLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBQztvQkFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQy9CO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFDRCxvQkFBb0IsQ0FBQyxDQUEyQjtRQUM5QyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ3BCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQzFCO1NBQ0Y7SUFDSCxDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDcEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDUCxTQUFTLEVBQUMsS0FBSztvQkFDZixRQUFRLEVBQUMsS0FBSztpQkFDZixDQUFDLENBQUM7YUFDSjtZQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDakI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDSyxTQUFTLENBQUMsQ0FBTzs7WUFDckIsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQztLQUFBO0lBQ0QsWUFBWSxDQUFDLENBQU87UUFDbEIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUM3QyxJQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDO2dCQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7UUFDRCxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDYixDQUFDO0lBQ0QsU0FBUyxDQUFDLENBQWlCO1FBQ3pCLE9BQVEsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQzVCLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHO1lBQ3ZCLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHO1lBQ3ZCLE1BQU0sRUFBQyxHQUFHO1lBQ1YsS0FBSyxFQUFDLEdBQUc7U0FDVixDQUFrQixDQUFDO0lBQ3RCLENBQUM7SUFDRCxjQUFjO1FBQ1osS0FBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQztZQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUF3QjtRQUM3QixLQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDOUM7SUFDSCxDQUFDO0NBQ0Y7QUF0S0Qsc0JBc0tDIiwiZmlsZSI6InZhbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Zhbi50c1wiKTtcbiIsImltcG9ydCB7cGxhdGZvcm1lcl9vYmoscGxhdF9zdGF0ZX0gZnJvbSBcIi4vcGxhdGZvcm1lcl9vYmpcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHsgZXhlY190eXBlIH0gZnJvbSBcIi4uLy4uL2xpYi9jb250cm9sc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJveCBleHRlbmRzIHBsYXRmb3JtZXJfb2JqPHBsYXRfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcIi4vc3ByaXRlcy9ib3gucG5nXCJcclxuICBjb2xsaXNpb24gPSB0cnVlXHJcbiAgaGVpZ2h0ID0gNjQ7XHJcbiAgd2lkdGggPSA1MDA7XHJcbiAgZ3Jhdml0eSA9IGZhbHNlO1xyXG4gIGVuZW15ID0gdHJ1ZTtcclxuICB0YWdzID0gW1wic3RhdGljXCJdXHJcbiAgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6bnVtYmVyLCBpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4LFxyXG4gICAgICAgIHlcclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfSxcclxuICAgICAgaGVhbHRoOjEwMDBcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQge3BsYXRmb3JtZXJfb2JqLCBwbGF0X3N0YXRlfSBmcm9tIFwiLi9wbGF0Zm9ybWVyX29ialwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4uLy4uL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQgeyBleGVjX3R5cGUgfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7cm90YXRpb25fbGVuZ3RoLCBvYmp9IGZyb20gXCIuLi8uLi9saWIvb2JqZWN0XCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5cclxuaW50ZXJmYWNlIGJ1bGxldF9zdGF0ZSBleHRlbmRzIG9ial9zdGF0ZXtcclxuICByb3RhdGlvbjpudW1iZXIsXHJcbiAgZGlzdGFuY2U6bnVtYmVyLFxyXG4gIHNwZWVkOm51bWJlcixcclxuICBkYW1hZ2U6bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBwb3NpdGlvbntcclxuICB4Om51bWJlcixcclxuICB5Om51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgb2JqPGJ1bGxldF9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL2J1bGxldC5wbmdcIjtcclxuICBoZWlnaHQgPSAyMDtcclxuICB3aWR0aCA9IDEwO1xyXG4gIGdyYXZpdHkgPSBmYWxzZTtcclxuICBtYXhfZGlzdGFuY2UgPSAyMDAwO1xyXG4gIHRhZ3MgPSBbXCJidWxsZXRcIl07XHJcbiAgY29uc3RydWN0b3IoeDpbbnVtYmVyLG51bWJlcl0sIGFuZ2xlOm51bWJlciwgaWQ6c3RyaW5nID0gdW5kZWZpbmVkKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZihpZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeDp4WzBdLFxyXG4gICAgICAgIHk6eFsxXVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBzcGVlZDoxMCxcclxuICAgICAgcm90YXRpb246YW5nbGUsXHJcbiAgICAgIGRpc3RhbmNlOjAsXHJcbiAgICAgIGRhbWFnZTo1XHJcbiAgICB9XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gYW5nbGU7XHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOm51bWJlcil7XHJcbiAgICB0aGlzLnN0YXRlLnZlbG9jaXR5ID0gcm90YXRpb25fbGVuZ3RoKHRoaXMuc3RhdGUuc3BlZWQsdGhpcy5zdGF0ZS5yb3RhdGlvbik7XHJcbiAgICB0aGlzLnN0YXRlLmRpc3RhbmNlICs9IHRoaXMuc3RhdGUuc3BlZWQ7XHJcbiAgICBpZih0aGlzLnN0YXRlLmRpc3RhbmNlID4gdGhpcy5tYXhfZGlzdGFuY2Upe1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpe1xyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSb2NrZXQgZXh0ZW5kcyBCdWxsZXR7XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL2ZvbGRlci9yb2NrZXQucG5nXCI7XHJcbiAgaGVpZ2h0ID0gNjc7XHJcbiAgd2lkdGggPSAxNjtcclxuICBwYXJ0aWNsZV90aW1lciA9IDA7XHJcbiAgcGFydGljbGVfZnJlcXVlbmN5ID0gNTtcclxuICBjb25zdHJ1Y3Rvcih4OltudW1iZXIsbnVtYmVyXSxhbmdsZTpudW1iZXIpe1xyXG4gICAgc3VwZXIoeCxhbmdsZSk7XHJcbiAgICB0aGlzLnN0YXRlLnNwZWVkID0gMTU7XHJcbiAgICB0aGlzLnN0YXRlLmRhbWFnZSA9IDIwO1xyXG4gIH1cclxuICByZWdpc3Rlcl9hdWRpbygpe1xyXG4gICAgdGhpcy5hdWRpby5hZGQoXCJleHBsb3Npb25cIixcIi4vc291bmRzL2V4cGxvc2lvbi5tcDNcIik7XHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOm51bWJlcil7XHJcbiAgICBzdXBlci5zdGF0ZWYodGltZSk7XHJcbiAgICBpZih0aGlzLnBhcnRpY2xlX3RpbWVyID09IDApe1xyXG4gICAgICBsZXQgb2Zmc2V0ID0gcm90YXRpb25fbGVuZ3RoKDMwLHRoaXMucm90YXRpb24gKyAxODApO1xyXG4gICAgICB0aGlzLmVtaXRfcGFydGljbGUoXCJzbW9rZVwiLG9mZnNldCwgNDAwLCAxMik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhcnRpY2xlX3RpbWVyICs9IHRpbWU7XHJcbiAgICBpZih0aGlzLnBhcnRpY2xlX3RpbWVyID4gdGhpcy5wYXJ0aWNsZV9mcmVxdWVuY3kpe1xyXG4gICAgIHRoaXMucGFydGljbGVfdGltZXIgPSAwOyBcclxuICAgIH1cclxuICAgIGxldCByb29tID0gZ2V0R2FtZSgpLnN0YXRlLmN1cnJlbnRfcm9vbTtcclxuICAgIGxldCBjb2xsaXNpb25zID0gcm9vbS5jaGVja19jb2xsaXNpb25zKHtcclxuICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICB3aWR0aDp0aGlzLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6dGhpcy5oZWlnaHRcclxuICAgIH0sW1wicGxheWVyXCIsXCJndW5cIl0pO1xyXG4gICAgaWYoY29sbGlzaW9ucy5sZW5ndGggPiAwKXtcclxuICAgICAgZm9yKGxldCBjb2xsaXNpb24gb2YgY29sbGlzaW9ucyl7XHJcbiAgICAgICAgbGV0IHN0ID0gY29sbGlzaW9uLnN0YXRlIGFzIHVua25vd24gYXMgcGxhdF9zdGF0ZTtcclxuICAgICAgICBpZigoPHBsYXRmb3JtZXJfb2JqPG9ial9zdGF0ZT4+Y29sbGlzaW9uKS5lbmVteSl7XHJcbiAgICAgICAgICBzdC5oZWFsdGggLT0gdGhpcy5zdGF0ZS5kYW1hZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RhdGUuZGlzdGFuY2UgPSB0aGlzLm1heF9kaXN0YW5jZTtcclxuICAgICAgdGhpcy5kZWxldGUoKTtcclxuICAgICAgbGV0IGV4cGxvc2lvbl9jb2xsaXNpb25zID0gcm9vbS5jaGVja19jb2xsaXNpb25zKHtcclxuICAgICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCxcclxuICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSxcclxuICAgICAgICB3aWR0aDo2NCxcclxuICAgICAgICBoZWlnaHQ6NjRcclxuICAgICAgfSxbXCJzdGF0aWNcIl0pXHJcbiAgICAgIGZvcihsZXQgY29sbGlkZXIgb2YgZXhwbG9zaW9uX2NvbGxpc2lvbnMpe1xyXG4gICAgICAgIGxldCBkaXN0YW5jZSA9IHRoaXMuZGlzdGFuY2UoY29sbGlkZXIpO1xyXG4gICAgICAgIGxldCBtdWx0aXBseWVyID0gMSAtIGRpc3RhbmNlLzMyO1xyXG4gICAgICAgIGxldCBvX3N0YXRlID0gY29sbGlkZXIuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgICAgIGxldCB2ZWxvY2l0aWVzID0gcm90YXRpb25fbGVuZ3RoKG11bHRpcGx5ZXIgKiAyNSwgMTgwICsgdGhpcy5hbmdsZVRvd2FyZHMoY29sbGlkZXIpKTtcclxuICAgICAgICBvX3N0YXRlLnZlbG9jaXR5LnggKz0gdmVsb2NpdGllcy54O1xyXG4gICAgICAgIG9fc3RhdGUudmVsb2NpdHkueSArPSB2ZWxvY2l0aWVzLnk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lbWl0X3BhcnRpY2xlKFwiZXhwbG9zaW9uXCIse3g6MCx5OjB9LDUwMCwwKTtcclxuICAgICAgdGhpcy5hdWRpby5wbGF5KFwiZXhwbG9zaW9uXCIsMC41KTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQge3ZlbG9jaXR5LG9ial9zdGF0ZSxwb3NpdGlvbl9pbml0LHN0YXRlX2Z1bmN9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHtzcHJpdGUsc3ByaXRlX2dlbn0gZnJvbSBcIi4uLy4uL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHtvYmoscm90YXRpb25fbGVuZ3RoLCBjb21wb3NpdGVfb2JqfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge3BsYXRmb3JtZXJfb2JqLHBsYXRmb3JtZXJfb2JqX2NvbXBvc2l0ZSxwbGF0X3N0YXRlfSBmcm9tIFwiLi9wbGF0Zm9ybWVyX29ialwiO1xyXG5pbXBvcnQge1BvbGxfTW91c2UsIGV4ZWNfdHlwZX0gZnJvbSBcIi4uLy4uL2xpYi9jb250cm9sc1wiO1xyXG5pbXBvcnQge2NvbGxpc2lvbl9ib3h9IGZyb20gXCIuLi8uLi9saWIvY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7QmluZH0gZnJvbSBcIi4uLy4uL2xpYi9jb250cm9sc1wiO1xyXG5cclxuaW1wb3J0IHtPdmVyd29ybGR9IGZyb20gXCIuLi9yb29tcy9vdmVyd29ybGRcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcblxyXG5lbnVtIGRpcmVjdGlvbntcclxuICBsZWZ0LFxyXG4gIHJpZ2h0XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgZ29vbWJhX3N0YXRlIGV4dGVuZHMgb2JqX3N0YXRlLHBsYXRfc3RhdGV7XHJcbiAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXHJcbiAgdmVsb2NpdHk6dmVsb2NpdHksXHJcbiAganVtcGluZzpib29sZWFuXHJcbn1cclxuXHJcbmludGVyZmFjZSBndW5fc3RhdGUgZXh0ZW5kcyBvYmpfc3RhdGV7XHJcbiAgcm90YXRpb246bnVtYmVyICBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJpZ1N0YW5kaW5nIGV4dGVuZHMgY29tcG9zaXRlX29iajxnb29tYmFfc3RhdGU+e1xyXG4gIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgZW5lbXkgPSB0cnVlO1xyXG4gIGdyYWNpdHkgPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKGE6W251bWJlcixudW1iZXJdKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBoZWFsdGg6MTAwLFxyXG4gICAgICBkaXJlY3Rpb246ZGlyZWN0aW9uLmxlZnQsXHJcbiAgICAgIGp1bXBpbmc6ZmFsc2UsXHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4OmFbMF0sXHJcbiAgICAgICAgeTphWzFdXHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGljcy5wdXNoKHtcclxuICAgICAgeDowLFxyXG4gICAgICB5OjAsXHJcbiAgICAgIG9iajpuZXcgU3RhbmRpbmdHb29tYmEoMCwwKVxyXG4gICAgfSlcclxuICAgIHRoaXMuc3RhdGljcy5wdXNoKHtcclxuICAgICAgeDoyNTAsXHJcbiAgICAgIHk6MCxcclxuICAgICAgb2JqOm5ldyBTdGFuZGluZ0dvb21iYSgwLDApXHJcbiAgICB9KVxyXG4gIH1cclxuICBzdGF0ZWYodDpudW1iZXIpe1xyXG4gICAgc3VwZXIuc3RhdGVmKHQpO1xyXG4gICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ID0gMztcclxuICAgIGlmKHRoaXMuc3RhdGUuaGVhbHRoIDw9IDApe1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEd1biBleHRlbmRzIHBsYXRmb3JtZXJfb2JqPGd1bl9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL2ZvbGRlci9ndW4ucG5nXCI7XHJcbiAgaGVpZ2h0ID0gNTA7XHJcbiAgd2lkdGggPSAyMDtcclxuICBjb2xsaXNpb24gPSBmYWxzZTtcclxuICByZW5kZXIgPSB0cnVlO1xyXG4gIHBsYXllcjpHb29tYmE7XHJcbiAgY3Vyc29yOkN1cnNvcjtcclxuICB0YWdzID0gW1wiZ3VuXCJdXHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmlkID0gXCJndW5cIjtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOnBvc2l0aW9uX2luaXQoKS5wb3NpdGlvbixcclxuICAgICAgdmVsb2NpdHk6cG9zaXRpb25faW5pdCgpLnZlbG9jaXR5LFxyXG4gICAgICByb3RhdGlvbjotMVxyXG4gICAgfVxyXG4gIH1cclxuICBzdGF0ZWYodDpudW1iZXIpe1xyXG4gICAgaWYoIXRoaXMucGxheWVyKXtcclxuICAgICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpO1xyXG4gICAgICB0aGlzLnBsYXllciA9IDxHb29tYmE+cm9vbS5nZXRPYmooXCJwbGF5ZXJcIik7XHJcbiAgICAgIHRoaXMuY3Vyc29yID0gPEN1cnNvcj5yb29tLmdldE9iaihcImN1cnNvclwiKTtcclxuICAgIH1cclxuICAgIGxldCBhbmdsZSA9IHRoaXMucGxheWVyLmFuZ2xlVG93YXJkcyh0aGlzLmN1cnNvcik7XHJcbiAgICBsZXQgcm90ID0gcm90YXRpb25fbGVuZ3RoKDUwLGFuZ2xlKTtcclxuICAgIHRoaXMucm90YXRpb24gPSBhbmdsZTtcclxuICAgIHRoaXMuc3RhdGUucm90YXRpb24gPSBhbmdsZTtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24gPSB7XHJcbiAgICAgIHg6cm90LnggKyB0aGlzLnBsYXllci5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICB5OnJvdC55ICsgdGhpcy5wbGF5ZXIuc3RhdGUucG9zaXRpb24ueVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1cnNvciBleHRlbmRzIHBsYXRmb3JtZXJfb2JqPG9ial9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL2N1cnNvci5wbmdcIjtcclxuICBoZWlnaHQgPSA2NDtcclxuICB3aWR0aCA9IDY0O1xyXG4gIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgcmVuZGVyID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3RvcihpZDpzdHJpbmcpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGVmKCl7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR29vbWJhIGV4dGVuZHMgcGxhdGZvcm1lcl9vYmo8Z29vbWJhX3N0YXRlPntcclxuICBzcHJpdGVfdXJsID0gXCIuL3Nwcml0ZXMvZm9sZGVyL3JvYm90LnBuZ1wiO1xyXG4gIGhlaWdodCA9IDE0OTtcclxuICB3aWR0aCA9IDE0OTtcclxuICB0YWdzID0gW1wicGxheWVyXCJdXHJcbiAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcixpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRpcmVjdGlvbjpkaXJlY3Rpb24ubGVmdCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBqdW1waW5nOmZhbHNlLFxyXG4gICAgICBoZWFsdGg6MTAwXHJcbiAgICB9XHJcbiAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcIndhbGsxXCIpO1xyXG4gIH1cclxuICByZWdpc3Rlcl9hbmltYXRpb25zKCl7XHJcbiAgICBsZXQgc3ByaXRlcyA9IHNwcml0ZV9nZW4odGhpcy5zcHJpdGVfc2hlZXQsdGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKFwid2FsazFcIixbXHJcbiAgICAgIFswLHNwcml0ZXNbMF1bMF1dLFxyXG4gICAgICBbMTAwLHNwcml0ZXNbMF1bMV1dLFxyXG4gICAgICBbNDAwLHNwcml0ZXNbMF1bMF1dLFxyXG4gICAgICBbNTAwLHNwcml0ZXNbMF1bMl1dXHJcbiAgICBdLDgwMClcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXCJ3YWxrMlwiLFtcclxuICAgICAgWzAsc3ByaXRlc1swXVs1XV0sXHJcbiAgICAgIFsxMDAsc3ByaXRlc1swXVs0XV0sXHJcbiAgICAgIFs0MDAsc3ByaXRlc1swXVs1XV0sXHJcbiAgICAgIFs1MDAsc3ByaXRlc1swXVszXV1cclxuICAgIF0sODAwKVxyXG4gICAgdGhpcy5hbmltYXRpb25zLmFkZChcImlkbGVsZWZ0XCIsW1xyXG4gICAgICBbMCxzcHJpdGVzWzBdWzBdXVxyXG4gICAgXSwxKTtcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2lkbGVyaWdodCcsW1xyXG4gICAgICBbMCxzcHJpdGVzWzBdWzVdXSBcclxuICAgIF0sMSk7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2F1ZGlvKCl7XHJcbiAgICB0aGlzLmF1ZGlvLmFkZChcInNsaW1lXCIsXCIuL3NvdW5kcy9nb29tYmEvc2xpbWViYWxsLndhdlwiKTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZF9jb250cm9sKFwiS2V5QVwiLGV4ZWNfdHlwZS5yZXBlYXQsKCk9PntcclxuICAgICAgaWYodGhpcy5zdGF0ZS52ZWxvY2l0eS54ID4gLTEwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnggLSAxO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmluZF9jb250cm9sKFwiS2V5V1wiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUuZGlyZWN0aW9uID09IGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcIndhbGsxXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcIndhbGsyXCIpO1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgKyAwLjI7XHJcbiAgICB9KVxyXG4gICAgLyp0aGlzLmJpbmRfY29udHJvbChcIktleVdcIixleGVjX3R5cGUucmVwZWF0LCgpPT57XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueSA8IDEwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgKyAxO1xyXG4gICAgICB9XHJcbiAgICB9KTsqL1xyXG4gICAgdGhpcy5iaW5kX2NvbnRyb2woXCJLZXlTXCIsZXhlY190eXBlLm9uY2UsKCk9PntcclxuICAgICAgaWYodGhpcy5zdGF0ZS5kaXJlY3Rpb24gPT0gZGlyZWN0aW9uLmxlZnQpXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoXCJ3YWxrMVwiKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwid2FsazJcIik7XHJcbiAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSA9IHRoaXMuc3RhdGUudmVsb2NpdHkueSAtIDAuMTtcclxuICAgIH0pXHJcbiAgICAvKlxyXG4gICAgdGhpcy5iaW5kX2NvbnRyb2woXCJLZXlTXCIsZXhlY190eXBlLnJlcGVhdCwoKT0+e1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPiAtMTApe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSA9IHRoaXMuc3RhdGUudmVsb2NpdHkueSAtIDE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgKi9cclxuICAgIHRoaXMuYmluZF9jb250cm9sKFwiS2V5QVwiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwid2FsazFcIik7XHJcbiAgICAgIHRoaXMuc3RhdGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uLmxlZnQ7XHJcbiAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IHRoaXMuc3RhdGUudmVsb2NpdHkueCAtIDAuMTtcclxuICAgIH0pXHJcbiAgICB0aGlzLmJpbmRfY29udHJvbChcIm1vdXNlZG93blwiLGV4ZWNfdHlwZS5yZXBlYXQsICgpPT57XHJcbiAgICAgIHRoaXMuYXVkaW8ucGxheShcInNsaW1lXCIsMC4wMSk7XHJcbiAgICB9LDYwMCk7XHJcbiAgICB0aGlzLmJpbmRfY29udHJvbChcIktleURcIixleGVjX3R5cGUucmVwZWF0LCgpPT57XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueCA8IDEwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnggKyAxO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmluZF9jb250cm9sKFwiS2V5RFwiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwid2FsazJcIik7XHJcbiAgICAgIHRoaXMuc3RhdGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uLnJpZ2h0O1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnggKyAwLjE7XHJcbiAgICB9KVxyXG4gICAgdGhpcy5iaW5kX2NvbnRyb2woXCJTcGFjZVwiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIGlmKCF0aGlzLnN0YXRlLmp1bXBpbmcpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSArPSAyNTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXkoXCJzbGltZVwiLDAuMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICByZW5kZXJmKHQ6bnVtYmVyKXtcclxuICAgIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueCA9PSAwICYmIHRoaXMuc3RhdGUudmVsb2NpdHkueSA9PSAwKXtcclxuICAgICAgbGV0IGFuaW1hdGlvbiA9IHRoaXMuc3RhdGUuZGlyZWN0aW9uPT1kaXJlY3Rpb24ubGVmdCA/IFwiaWRsZWxlZnRcIiA6IFwiaWRsZXJpZ2h0XCI7XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KGFuaW1hdGlvbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIucmVuZGVyZih0KTtcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKTtcclxuICAgIGxldCBjdXJzb3IgPSByb29tLmdldE9iaihcImN1cnNvclwiKTtcclxuICAgIFxyXG4gICAgaWYocm9vbS5jaGVja19jb2xsaXNpb25zKHtcclxuICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgaGVpZ2h0OjEsXHJcbiAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzIgLSAxLFxyXG4gICAgfSkubGVuZ3RoID4gMCl7XHJcbiAgICAgIHRoaXMuc3RhdGUuanVtcGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgdGhpcy5zdGF0ZS5qdW1waW5nID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueSA+IDApe1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgLSAwLjQgKiAxNiAvIHRpbWU7O1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPCAwKVxyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSA9IDA7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPCAwKXtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ID0gdGhpcy5zdGF0ZS52ZWxvY2l0eS55ICsgMC40ICogMTYgLyB0aW1lO1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPiAwKVxyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSA9IDA7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnggPiAwICl7XHJcbiAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IHRoaXMuc3RhdGUudmVsb2NpdHkueCAtIDAuNCAqIDE2IC8gdGltZTs7XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueCA8IDApe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYodGhpcy5zdGF0ZS52ZWxvY2l0eS54IDwgMCl7XHJcbiAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IHRoaXMuc3RhdGUudmVsb2NpdHkueCArIDAuNCAqIDE2IC8gdGltZTs7XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueCA+IDApe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFuZGluZ0dvb21iYSBleHRlbmRzIHBsYXRmb3JtZXJfb2JqPGdvb21iYV9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9vYmplY3RzL2dvb21iYS5wbmdcIjtcclxuICBoZWlnaHQgPSA2NDtcclxuICB3aWR0aCA9IDY0O1xyXG4gIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgZW5lbXkgPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKHg6bnVtYmVyLHk6bnVtYmVyLGlkOnN0cmluZyA9IHVuZGVmaW5lZCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgaWYoaWQpe1xyXG4gICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9ICAgIFxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgZGlyZWN0aW9uOmRpcmVjdGlvbi5sZWZ0LFxyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeCxcclxuICAgICAgICB5XHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH0sXHJcbiAgICAgIGp1bXBpbmc6ZmFsc2UsXHJcbiAgICAgIGhlYWx0aDoxMDBcclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGlmKHRoaXMuc3RhdGUuanVtcGluZyl7XHJcbiAgICAgIGxldCBtb3VzZV9wb3NpdGlvbiA9IFBvbGxfTW91c2UoKTtcclxuICAgICAgaWYobW91c2VfcG9zaXRpb24ueSA+IG1vdXNlX3Bvc2l0aW9uLmxhc3QueSl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0LFxyXG4gICAgICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDoxXHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0gbW91c2VfcG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYobW91c2VfcG9zaXRpb24ueSA8IG1vdXNlX3Bvc2l0aW9uLmxhc3QueSl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSAtIDEsXHJcbiAgICAgICAgICB3aWR0aDp0aGlzLndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OjFcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnkgPSBtb3VzZV9wb3NpdGlvbi55IC0gdGhpcy5oZWlnaHQvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYobW91c2VfcG9zaXRpb24ueCA8IG1vdXNlX3Bvc2l0aW9uLmxhc3QueCl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggLSAxLFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgICAgICB3aWR0aDoxLFxyXG4gICAgICAgICAgaGVpZ2h0OnRoaXMuaGVpZ2h0XHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2VfcG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZihtb3VzZV9wb3NpdGlvbi54ID4gbW91c2VfcG9zaXRpb24ubGFzdC54KXtcclxuICAgICAgICBpZih0aGlzLmNvbGxpc2lvbl9jaGVjayh7XHJcbiAgICAgICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCArIHRoaXMud2lkdGgsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSxcclxuICAgICAgICAgIHdpZHRoOjEsXHJcbiAgICAgICAgICBoZWlnaHQ6dGhpcy5oZWlnaHRcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnggPSBtb3VzZV9wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3VwZXIuc3RhdGVmKHRpbWUpO1xyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHtjb21wb3NpdGVfb2JqLCBncmF2aXR5X29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcGxhdF9zdGF0ZSBleHRlbmRzIG9ial9zdGF0ZXtcclxuICBoZWFsdGg6bnVtYmVyICBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHBsYXRmb3JtZXJfb2JqPHQ+IGV4dGVuZHMgZ3Jhdml0eV9vYmo8dD57XHJcbiAgZW5lbXkgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbiAgc3RhdGVmKGE6bnVtYmVyKXtcclxuICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBwbGF0X3N0YXRlO1xyXG4gICAgaWYoc3RhdGUuaGVhbHRoIDw9IDApe1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHBsYXRmb3JtZXJfb2JqX2NvbXBvc2l0ZTx0PiBleHRlbmRzIGNvbXBvc2l0ZV9vYmo8dD57XHJcbiAgZW5lbXkgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbiAgc3RhdGVmKGE6bnVtYmVyKXtcclxuICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBwbGF0X3N0YXRlO1xyXG4gICAgaWYoc3RhdGUuaGVhbHRoIDw9IDApe1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7dmVsb2NpdHksb2JqX3N0YXRlLHN0YXRlX2Z1bmN9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHtzcHJpdGUsc3ByaXRlX2dlbn0gZnJvbSBcIi4uLy4uL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHtvYmoscm90YXRpb25fbGVuZ3RofSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge3BsYXRmb3JtZXJfb2JqLHBsYXRfc3RhdGV9IGZyb20gXCIuL3BsYXRmb3JtZXJfb2JqXCI7XHJcbmltcG9ydCB7UG9sbF9Nb3VzZSwgZXhlY190eXBlfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7Y29sbGlzaW9uX2JveH0gZnJvbSBcIi4uLy4uL2xpYi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtCaW5kfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5pbXBvcnQge092ZXJ3b3JsZH0gZnJvbSBcIi4uL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmludGVyZmFjZSB0YXJnZXRfc3RhdGUgZXh0ZW5kcyBvYmpfc3RhdGV7XHJcbiAgaGVhbHRoOm51bWJlcjtcclxuICBicmVha2luZzpib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYXJnZXQgZXh0ZW5kcyBwbGF0Zm9ybWVyX29iajx0YXJnZXRfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcIi4vc3ByaXRlcy90YXJnZXQucG5nXCI7XHJcbiAgaGVpZ2h0ID0gNjQ7XHJcbiAgd2lkdGggPSA2NDtcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIGdyYXZpdHkgPSBmYWxzZTtcclxuICByZW5kZXIgPSB0cnVlO1xyXG4gIGVuZW15ID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3RvcihhOltudW1iZXIsbnVtYmVyXSl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6YVswXSxcclxuICAgICAgICB5OmFbMV1cclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfSxcclxuICAgICAgaGVhbHRoOjIwLFxyXG4gICAgICBicmVha2luZzpmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICByZWdpc3Rlcl9hdWRpbygpe1xyXG4gICAgdGhpcy5hdWRpby5hZGQoXCJicmVha1wiLFwiLi9zb3VuZHMvdGFyZ2V0L2hpdHNvdW5kXzI3NC5tcDNcIik7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2FuaW1hdGlvbnMoKXtcclxuICAgIGxldCBzcHJpdGVzID0gc3ByaXRlX2dlbih0aGlzLnNwcml0ZV9zaGVldCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXCJicmVha1wiLFtcclxuICAgICAgWzAsc3ByaXRlc1swXVsxXV0sXHJcbiAgICAgIFs1MCxzcHJpdGVzWzBdWzJdXSxcclxuICAgICAgWzEwMCxzcHJpdGVzWzBdWzNdXSxcclxuICAgICAgWzE1MCxzcHJpdGVzWzBdWzRdXVxyXG4gICAgXSwyMDApXHJcbiAgfVxyXG4gIHN0YXRlZigpe1xyXG4gICAgaWYodGhpcy5zdGF0ZS5oZWFsdGggPD0gMCAmJiAhdGhpcy5zdGF0ZS5icmVha2luZyl7XHJcbiAgICAgIHRoaXMuc3RhdGUuYnJlYWtpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcImJyZWFrXCIsKCk9PntcclxuICAgICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmF1ZGlvLnBsYXkoXCJicmVha1wiLDAuMSk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgcm9vbSwgYXBwbHlfZ3Jhdml0eSB9IGZyb20gXCIuLi8uLi9saWIvcm9vbVwiO1xyXG5pbXBvcnQgeyBTdGFuZGluZ0dvb21iYSxHdW4sIEdvb21iYSxCaWdTdGFuZGluZywgZ29vbWJhX3N0YXRlLCBDdXJzb3IgfSBmcm9tIFwiLi4vb2JqZWN0cy9nb29tYmFcIjtcclxuaW1wb3J0IHsgQm94IH0gZnJvbSBcIi4uL29iamVjdHMvYm94XCI7XHJcbmltcG9ydCB7IHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayB9IGZyb20gXCIuLi8uLi9saWIvY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7IGdyYXZpdHlfb2JqLCByb3RhdGlvbl9sZW5ndGggfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQgeyBQb2xsX01vdXNlLCBleGVjX3R5cGUgfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7IERvb3IgfSBmcm9tIFwiLi4vb2JqZWN0cy9yb29tX2xvYWRlclwiO1xyXG5pbXBvcnQgeyBIVUQsIFRleHQgfSBmcm9tIFwiLi4vLi4vbGliL2h1ZFwiO1xyXG5pbXBvcnQgeyBnZXRHYW1lIH0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5pbXBvcnQge0J1bGxldCwgUm9ja2V0fSBmcm9tIFwiLi4vb2JqZWN0cy9idWxsZXRcIjtcclxuaW1wb3J0IHtUYXJnZXR9IGZyb20gXCIuLi9vYmplY3RzL3RhcmdldFwiO1xyXG5cclxuaW1wb3J0IHtCb2FyZH0gZnJvbSBcIi4uLy4uL3Zhbl9jaGVzcy9yb29tcy9ib2FyZFwiO1xyXG5cclxuaW50ZXJmYWNlIG92ZXJ3b3JsZF9pIHtcclxuICBwbGF5ZXI6IGdyYXZpdHlfb2JqPHVua25vd24+LFxyXG4gIHBhdXNlZDogYm9vbGVhbixcclxuICBsb2NrZWRfYnVsbGV0OkJ1bGxldFxyXG59XHJcblxyXG5jbGFzcyBPdmVyd29ybGRfSFVEIGV4dGVuZHMgSFVEIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBcclxuICAgIHRoaXMudGV4dF9lbGVtZW50cy5wdXNoKG5ldyBUZXh0KHtcclxuICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICB4OiAxMCxcclxuICAgICAgICB5OiA3MTBcclxuICAgICAgfSxcclxuICAgICAgc2l6ZTogNDQsXHJcbiAgICAgIGZvbnQ6IFwiQWxhdGFcIixcclxuICAgICAgY29sb3I6IFwid2hpdGVcIixcclxuICAgICAgYWxpZ246XCJsZWZ0XCJcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgbGV0IHggPSBnZXRHYW1lKCkuZ2V0Um9vbSgpLmdldE9iaihcInBsYXllclwiKSBhcyBHb29tYmE7XHJcbiAgICAgIHJldHVybiBgWDoke01hdGgucm91bmQoeC5zdGF0ZS5wb3NpdGlvbi54KX1gO1xyXG4gICAgfSkpO1xyXG4gICAgdGhpcy50ZXh0X2VsZW1lbnRzLnB1c2gobmV3IFRleHQoe1xyXG4gICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgIHg6IDEwLFxyXG4gICAgICAgIHk6IDc1MFxyXG4gICAgICB9LFxyXG4gICAgICBzaXplOiA0NCxcclxuICAgICAgZm9udDogXCJBbGF0YVwiLFxyXG4gICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgICBhbGlnbjogXCJsZWZ0XCJcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgbGV0IHggPSBnZXRHYW1lKCkuZ2V0Um9vbSgpLmdldE9iaihcInBsYXllclwiKSBhcyBHb29tYmE7XHJcbiAgICAgIHJldHVybiBgWToke01hdGgucm91bmQoeC5zdGF0ZS5wb3NpdGlvbi55KX1gO1xyXG4gICAgfSkpO1xyXG4gICAgXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3ZlcndvcmxkIGV4dGVuZHMgcm9vbTxvdmVyd29ybGRfaT57XHJcbiAgYmFja2dyb3VuZF91cmwgPSBcIi4vc3ByaXRlcy9pbUQ0MWwuanBnXCI7XHJcbiAgb2JqZWN0cyA9IFtuZXcgR29vbWJhKDgwMCwgMTUwLCBcInBsYXllclwiKSxuZXcgQm94KDYwMCwwLFwicGxhdGZvcm1cIiksbmV3IEd1bigpLG5ldyBUYXJnZXQoWzIwMCwxMDBdKSxuZXcgVGFyZ2V0KFsyMDAsMjAwXSksbmV3IFRhcmdldChbMTAwMCwxMDBdKSxuZXcgVGFyZ2V0KFsxMDAwLDIwMF0pLG5ldyBDdXJzb3IoXCJjdXJzb3JcIildXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcGxheWVyOiB1bmRlZmluZWQsXHJcbiAgICAgIHBhdXNlZDogZmFsc2UsXHJcbiAgICAgIGxvY2tlZF9idWxsZXQ6bnVsbFxyXG4gICAgfTtcclxuICB9XHJcbiAgcmVnaXN0ZXJIVUQoKSB7XHJcbiAgICByZXR1cm4gbmV3IE92ZXJ3b3JsZF9IVUQoKTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKSB7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiRXNjYXBlXCIsIGV4ZWNfdHlwZS5vbmNlLCAoKSA9PiB7XHJcbiAgICAgIGdldEdhbWUoKS5sb2FkUm9vbShuZXcgQm9hcmQoKSk7XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwibW91c2Vkb3duXCIsIGV4ZWNfdHlwZS5yZXBlYXQsKCkgPT4ge1xyXG4gICAgICBsZXQgZ3VuID0gdGhpcy5nZXRPYmooXCJndW5cIikgYXMgR3VuO1xyXG4gICAgICBpZihndW4pe1xyXG4gICAgICAgIGxldCBtdXp6bGUgPSByb3RhdGlvbl9sZW5ndGgoNDAsZ3VuLnN0YXRlLnJvdGF0aW9uKTtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSB7XHJcbiAgICAgICAgICB4Omd1bi5zdGF0ZS5wb3NpdGlvbi54ICsgbXV6emxlLngsXHJcbiAgICAgICAgICB5Omd1bi5zdGF0ZS5wb3NpdGlvbi55ICsgbXV6emxlLnlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJ1bGxldHMgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGEgPSAwO2EgPCAxO2EgKyspe1xyXG4gICAgICAgICAgYnVsbGV0cy5wdXNoKG5ldyBSb2NrZXQoW3Bvc2l0aW9uLngscG9zaXRpb24ueV0sZ3VuLnN0YXRlLnJvdGF0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuc3RhdGUubG9ja2VkX2J1bGxldCA9PSBudWxsKVxyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5sb2NrZWRfYnVsbGV0ID0gYnVsbGV0c1swXTtcclxuICAgICAgICB0aGlzLmFkZEl0ZW1zKGJ1bGxldHMpO1xyXG4gICAgICB9XHJcbiAgICB9LDQwMClcclxuICAgIGxldCBjYW1lcmEzID0gZ2V0R2FtZSgpLnN0YXRlLmNhbWVyYXNbMV07XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiQXJyb3dMZWZ0XCIsZXhlY190eXBlLnJlcGVhdCwgKCkgPT4ge1xyXG4gICAgICBjYW1lcmEzLnN0YXRlLnBvc2l0aW9uLnggLT0gMTA7XHJcbiAgICB9LDEwKVxyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIkFycm93UmlnaHRcIixleGVjX3R5cGUucmVwZWF0LCAoKSA9PiB7XHJcbiAgICAgIGNhbWVyYTMuc3RhdGUucG9zaXRpb24ueCArPSAxMDtcclxuICAgIH0sMTApXHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiQXJyb3dEb3duXCIsZXhlY190eXBlLnJlcGVhdCwgKCkgPT4ge1xyXG4gICAgICBjYW1lcmEzLnN0YXRlLnBvc2l0aW9uLnkgLT0gMTA7XHJcbiAgICB9LDEwKVxyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIkFycm93VXBcIixleGVjX3R5cGUucmVwZWF0LCAoKSA9PiB7XHJcbiAgICAgIGNhbWVyYTMuc3RhdGUucG9zaXRpb24ueSArPSAxMDtcclxuICAgIH0sMTApXHJcbiAgfVxyXG4gIHJlZ2lzdGVyUGFydGljbGVzKCl7XHJcbiAgICB0aGlzLnBhcnRpY2xlc1tcInNtb2tlXCJdID0ge1xyXG4gICAgICBzcHJpdGU6XCIuL3Nwcml0ZXMvZm9sZGVyL3Ntb2tlLnBuZ1wiLFxyXG4gICAgICBoZWlnaHQ6NjQsXHJcbiAgICAgIHdpZHRoOjY0XHJcbiAgICB9O1xyXG4gICAgdGhpcy5wYXJ0aWNsZXNbXCJleHBsb3Npb25cIl0gPSB7XHJcbiAgICAgIHNwcml0ZTpcIi4vc3ByaXRlcy9mb2xkZXIvZXhwbG9zaW9uLnBuZ1wiLFxyXG4gICAgICBoZWlnaHQ6NjQsXHJcbiAgICAgIHdpZHRoOjY0XHJcbiAgICB9XHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5zdGF0ZS5wYXVzZWQpIHtcclxuICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICBhcHBseV9ncmF2aXR5KHRoaXMub2JqZWN0c1thXSwgLTEsIC0xNSk7XHJcbiAgICAgICAgdmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrKHRoaXMub2JqZWN0c1thXSwgdGhpcy5vYmplY3RzKTtcclxuICAgICAgICB0aGlzLm9iamVjdHNbYV0uc3RhdGVmKHRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGZvcihsZXQgcGFydGljbGUgb2YgdGhpcy5wYXJ0aWNsZXNfYXJyKXtcclxuICAgICAgICBwYXJ0aWNsZS5zdGF0ZWYodGltZSk7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IHBsYXllciA9IHRoaXMuZ2V0T2JqKFwicGxheWVyXCIpIGFzIEdvb21iYTtcclxuICAgICAgbGV0IGN1cnNvciA9IHRoaXMuZ2V0T2JqKFwiY3Vyc29yXCIpIGFzIEN1cnNvcjtcclxuICAgICAgbGV0IGNhbWVyYXMgPSBnZXRHYW1lKCkuc3RhdGUuY2FtZXJhcztcclxuICAgICAgaWYgKHBsYXllcikgeyAgICAgICAgXHJcbiAgICAgICAgY2FtZXJhc1swXS54ID0gcGxheWVyLnN0YXRlLnBvc2l0aW9uLng7XHJcbiAgICAgICAgY2FtZXJhc1swXS55ID0gcGxheWVyLnN0YXRlLnBvc2l0aW9uLnkgLyorIChjYW1lcmFzWzBdLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0LzIgLSBwbGF5ZXIuaGVpZ2h0LzIgLSAxMDApOyAgICAgKi8gICBcclxuICAgICAgfVxyXG4gICAgICBpZih0aGlzLnN0YXRlLmxvY2tlZF9idWxsZXQgIT0gbnVsbCl7XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IHRoaXMuc3RhdGUubG9ja2VkX2J1bGxldDtcclxuICAgICAgICBpZihidWxsZXQuc3RhdGUuZGlzdGFuY2UgPCBidWxsZXQubWF4X2Rpc3RhbmNlKXtcclxuICAgICAgICAgIGNhbWVyYXNbMV0uc3RhdGUucG9zaXRpb24ueCA9IGJ1bGxldC5zdGF0ZS5wb3NpdGlvbi54O1xyXG4gICAgICAgICAgY2FtZXJhc1sxXS5zdGF0ZS5wb3NpdGlvbi55ID0gYnVsbGV0LnN0YXRlLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmxvY2tlZF9idWxsZXQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgfVxyXG4gICAgICBpZiAoY3Vyc29yKSB7XHJcbiAgICAgICAgY3Vyc29yLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIGN1cnNvci5ncmF2aXR5ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG1vdXNlID0gUG9sbF9Nb3VzZSgpO1xyXG4gICAgICAgIGN1cnNvci5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2UueDtcclxuICAgICAgICBjdXJzb3Iuc3RhdGUucG9zaXRpb24ueSA9IG1vdXNlLnk7XHJcbiAgICAgICAgY2FtZXJhc1syXS5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2UueDtcclxuICAgICAgICBjYW1lcmFzWzJdLnN0YXRlLnBvc2l0aW9uLnkgPSBtb3VzZS55O1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW50ZXJmYWNlIHNvdW5kX3N0b3JhZ2Uge1xyXG4gIFtpbmRleDogc3RyaW5nXTogSFRNTEF1ZGlvRWxlbWVudFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgYXVkaW8ge1xyXG4gIHNvdW5kczogc291bmRfc3RvcmFnZSA9IHt9O1xyXG4gIGFkZChuYW1lOiBzdHJpbmcsIHM6IHN0cmluZykge1xyXG4gICAgdGhpcy5zb3VuZHNbbmFtZV0gPSBuZXcgQXVkaW8ocyk7XHJcbiAgfVxyXG4gIGxvYWQoKSB7XHJcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuc291bmRzKTtcclxuICAgIGxldCBwcm9taXNlcyA9IGtleXMubWFwKChrZXkpID0+IHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0aGlzLnNvdW5kc1trZXldLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcclxuICB9XHJcbiAgcGxheShuYW1lOnN0cmluZyx2b2x1bWU6bnVtYmVyKXtcclxuICAgIGxldCBhID0gdGhpcy5zb3VuZHNbbmFtZV07XHJcbiAgICBhLnBhdXNlKClcclxuICAgIGEuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgYS52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICBhLnBsYXkoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge29iaixnZXRJZH0gZnJvbSBcIi4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHtkZWVwfSBmcm9tIFwiLi4vdmFuXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGNvbGxpc2lvbl9ib3h7XHJcbiAgeDpudW1iZXI7XHJcbiAgeTpudW1iZXI7XHJcbiAgd2lkdGg6bnVtYmVyO1xyXG4gIGhlaWdodDpudW1iZXI7XHJcbn1cclxuXHJcbmVudW0gZGlyZWN0aW9ue1xyXG4gIGxlZnQsXHJcbiAgcmlnaHQsXHJcbiAgdXAsXHJcbiAgZG93blxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tfYWxsX29iamVjdHMoYzogY29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sZXhlbXB0aW9uOnN0cmluZ1tdID0gW10pOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgcmV0dXJuIG9ianMuZmlsdGVyKChhKT0+KCFleGVtcHRpb24uc29tZSgoYik9PmEudGFncy5pbmRleE9mKGIpICE9PSAtMSkgJiYgYS5jb2xsaWRlc193aXRoX2JveChjKSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tfYWxsX2NvbGxpc2lvbnMoYzogY29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sZXhlbXB0aW9uOnN0cmluZ1tdID0gW10pOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgbGV0IG1hdGNoZWQgPSBbXTtcclxuICBmb3IgKGxldCBhIG9mIG9ianMpIHtcclxuICAgIGlmICghZXhlbXB0aW9uLnNvbWUoKGIpPT5hLnRhZ3MuaW5kZXhPZihiKSAhPT0gLTEpICYmIGEuY29sbGlzaW9uICYmIGEuY29sbGlkZXNfd2l0aF9ib3goYykpIHtcclxuICAgICAgbWF0Y2hlZC5wdXNoKGEpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbWF0Y2hlZFxyXG59XHJcbi8vQ2hlY2tzIHVwIHRvIHRoZSBmaXJzdCBjb2xsaXNpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrX2NvbGxpc2lvbnMoYzogY29sbGlzaW9uX2JveCwgb2JqczogQXJyYXk8b2JqPHVua25vd24+PiwgZXhlbXB0aW9uOnN0cmluZykge1xyXG4gIGZvciAobGV0IGEgb2Ygb2Jqcykge1xyXG4gICAgaWYgKGEuaWQgIT09IGV4ZW1wdGlvbiAmJiBhLmNvbGxpc2lvbiAmJiBhLmNvbGxpZGVzX3dpdGhfYm94KGMpKSB7XHJcbiAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmVsb2NpdHlfbWF4KHZlbG9jaXR5Om51bWJlcixib3g6Y29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sIGV4ZW1wdGlvbjpzdHJpbmcsZGlyOmRpcmVjdGlvbil7XHJcbiAgbGV0IGNvbGxpc2lvbiA9IGNoZWNrX2NvbGxpc2lvbnMoYm94LCBvYmpzLCBleGVtcHRpb24pO1xyXG4gIGlmKGNvbGxpc2lvbiA9PSBudWxsKXtcclxuICAgIHJldHVybiB2ZWxvY2l0eTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGxldCBjb2xsaWRlciA9IGNvbGxpc2lvbjtcclxuICAgIGxldCBvcmlnaW4gPSBnZXRJZChvYmpzLGV4ZW1wdGlvbik7XHJcbiAgICBsZXQgb3JpZ19zdCA9IG9yaWdpbi5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgY29sbGlkZXJfc3QgPSBjb2xsaWRlci5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICBpZihkaXIgPT0gZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICByZXR1cm4gKG9yaWdfc3QucG9zaXRpb24ueCAtIG9yaWdpbi53aWR0aC8yKSAtIChjb2xsaWRlcl9zdC5wb3NpdGlvbi54ICsgY29sbGlkZXIud2lkdGgvMik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGRpciA9PSBkaXJlY3Rpb24ucmlnaHQpe1xyXG4gICAgICByZXR1cm4gKGNvbGxpZGVyX3N0LnBvc2l0aW9uLnggLSBjb2xsaWRlci53aWR0aC8yKSAtIChvcmlnX3N0LnBvc2l0aW9uLnggKyBvcmlnaW4ud2lkdGgvMik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGRpciA9PSBkaXJlY3Rpb24uZG93bil7XHJcbiAgICAgIHJldHVybiAob3JpZ19zdC5wb3NpdGlvbi55IC0gb3JpZ2luLmhlaWdodC8yKSAtIChjb2xsaWRlcl9zdC5wb3NpdGlvbi55ICsgY29sbGlkZXIuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLnVwKXtcclxuICAgICAgcmV0dXJuIChjb2xsaWRlcl9zdC5wb3NpdGlvbi55IC0gY29sbGlkZXIuaGVpZ2h0LzIpIC0gKG9yaWdfc3QucG9zaXRpb24ueSArIG9yaWdpbi5oZWlnaHQvMik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrKG9iamVjdDpvYmo8dW5rbm93bj4sbGlzdDpBcnJheTxvYmo8dW5rbm93bj4+KSB7XHJcbiAgbGlzdCA9IFsuLi5saXN0XTtcclxuICBsZXQgb2IgPSBvYmplY3Q7XHJcbiAgbGV0IHN0ID0gb2JqZWN0LnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICBsZXQgeF92ZWwgPSBzdC52ZWxvY2l0eS54O1xyXG4gIGxldCB5X3ZlbCA9IHN0LnZlbG9jaXR5Lnk7XHJcbiAgaWYoIW9iLmNvbGxpc2lvbil7XHJcbiAgICAoPG9ial9zdGF0ZT5vYi5zdGF0ZSkucG9zaXRpb24ueCArPSAoPG9ial9zdGF0ZT5vYi5zdGF0ZSkudmVsb2NpdHkueDtcclxuICAgICg8b2JqX3N0YXRlPm9iLnN0YXRlKS5wb3NpdGlvbi55ICs9ICg8b2JqX3N0YXRlPm9iLnN0YXRlKS52ZWxvY2l0eS55O1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBpZiAoeF92ZWwgPiAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54ICsgb2Iud2lkdGgvMiArIHhfdmVsLzIsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOiB4X3ZlbCxcclxuICAgICAgaGVpZ2h0OiBvYi5oZWlnaHRcclxuICAgIH07XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LngsYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLnJpZ2h0KTtcclxuICAgIGlmKHZlbCA+IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi54ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnggPSAwOyAgXHJcbiAgICB9XHJcbiAgfVxyXG4gIGVsc2UgaWYgKHhfdmVsIDwgMCkge1xyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgeDogeF92ZWwvMiArIHN0LnBvc2l0aW9uLnggLSBvYi53aWR0aC8yLFxyXG4gICAgICB5OiBzdC5wb3NpdGlvbi55LFxyXG4gICAgICB3aWR0aDogLTEgKiB4X3ZlbCxcclxuICAgICAgaGVpZ2h0OiBvYi5oZWlnaHRcclxuICAgIH1cclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueCxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24ubGVmdCk7XHJcbiAgICBpZih2ZWwgPCAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueCArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS54ID0gMDsgXHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmICh5X3ZlbCA+IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnkgKyBvYi5oZWlnaHQvMiArIHlfdmVsLzIsXHJcbiAgICAgIHdpZHRoOiBvYi53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB5X3ZlbFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS55LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi51cCk7XHJcbiAgICBpZih2ZWwgPiAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueSArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS55ID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSBpZiAoeV92ZWwgPCAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54LFxyXG4gICAgICB5OiB5X3ZlbC8yICsgc3QucG9zaXRpb24ueSAtIG9iLmhlaWdodC8yLFxyXG4gICAgICB3aWR0aDogb2Iud2lkdGgsXHJcbiAgICAgIGhlaWdodDogLTEgKiB5X3ZlbFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS55LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi5kb3duKTtcclxuICAgIGlmKHZlbCA8IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi55ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7R2V0U2NyZWVuRGltZW5zaW9ucyxHZXRWaWV3cG9ydERpbWVuc2lvbnMsZ2V0R2FtZX0gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQgeyBjb2xsaXNpb25fYm94IH0gZnJvbSBcIi4vY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7b2JqfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuXHJcbmludGVyZmFjZSBtb3VzZVBvc3tcclxuICB4Om51bWJlcixcclxuICB5Om51bWJlcixcclxuICBsYXN0OntcclxuICAgIHg6bnVtYmVyLFxyXG4gICAgeTpudW1iZXJcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBjb250cm9sX2Z1bmN7XHJcbiAgKCk6dm9pZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgbW91c2VCaW5kc3tcclxuICBba2V5OnN0cmluZ106IEFycmF5PFtjb250cm9sX2Z1bmMsb2JqPHVua25vd24+XT5cclxufVxyXG5cclxuaW50ZXJmYWNlIGtleUJpbmRze1xyXG4gIFtrZXk6c3RyaW5nXTogQXJyYXk8Y29udHJvbF9mdW5jPlxyXG59XHJcbmxldCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKTtcclxudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKT0+e1xyXG4gIGxldCBtb3VzZSA9IFBvbGxfTW91c2UoKTtcclxuICBsZXQgYm94OmNvbGxpc2lvbl9ib3ggPSB7XHJcbiAgICB4Om1vdXNlLngsXHJcbiAgICB5Om1vdXNlLnksXHJcbiAgICBoZWlnaHQ6MSxcclxuICAgIHdpZHRoOjFcclxuICB9O1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yKGxldCBhID0gMDthIDwgZC5sZW5ndGg7YSsrKXtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZihzZWxlY3RlZC50eXBlID09PSBidHlwZS5tb3VzZSAmJiBzZWxlY3RlZC5rZXkgPT09IFwibW91c2UxXCIgJiYgc2VsZWN0ZWQuZXhlY3V0ZSA9PSBleGVjX3R5cGUub25jZSl7XHJcbiAgICAgIGlmKHNlbGVjdGVkLm9iaiAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBpZihzZWxlY3RlZC5vYmouY29sbGlkZXNfd2l0aF9ib3goYm94KSl7XHJcbiAgICAgICAgICBzZWxlY3RlZC5mdW5jdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIHNlbGVjdGVkLmZ1bmN0aW9uKCk7ICAgICAgICBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gIFxyXG59KVxyXG5cclxudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgbGV0IGQgPSBbLi4uYWxsX2JpbmRzXTtcclxuICBmb3IgKGxldCBhID0gMDsgYSA8IGFsbF9iaW5kcy5sZW5ndGg7IGErKykge1xyXG4gICAgbGV0IHNlbGVjdGVkID0gZFthXTtcclxuICAgIGlmIChzZWxlY3RlZC50eXBlID09PSBidHlwZS5tb3VzZSAmJiBzZWxlY3RlZC5rZXkgPT09IGUudHlwZSAgJiYgIXNlbGVjdGVkLmV4ZWN1dGVkKSB7XHJcbiAgICAgIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5vbmNlKXtcclxuICAgICAgICBzZWxlY3RlZC5mdW5jdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYoc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgICAgc2VsZWN0ZWQucmVwZWF0X3RpbWVyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZSkgPT4ge1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbGxfYmluZHMubGVuZ3RoOyBhKyspIHtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZiAoc2VsZWN0ZWQudHlwZSA9PT0gYnR5cGUubW91c2UgJiYgKHNlbGVjdGVkLmtleSA9PT0gZS50eXBlKSAmJiBzZWxlY3RlZC5leGVjdXRlZCAmJiBzZWxlY3RlZC5leGVjdXRlID09PSBleGVjX3R5cGUub25jZSkge1xyXG4gICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLm1vdXNlICYmIChzZWxlY3RlZC5rZXkgPT09IGUudHlwZSB8fCBzZWxlY3RlZC5rZXkgPT0gXCJtb3VzZWRvd25cIikgJiYgc2VsZWN0ZWQuZXhlY3V0ZWQgJiYgc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgIGxldCBnID0gWy4uLnJlcGVhdF9iaW5kc107XHJcbiAgICAgIGZvcihsZXQgYSA9IDA7IGEgPCBnLmxlbmd0aDthKyspe1xyXG4gICAgICAgIGlmKGdbYV0uYmluZC5pZCA9PT0gc2VsZWN0ZWQuaWQpe1xyXG4gICAgICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgIGdbYV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcclxuICBsZXQgZCA9IFsuLi5hbGxfYmluZHNdO1xyXG4gIGZvciAobGV0IGEgPSAwOyBhIDwgYWxsX2JpbmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWQgPSBkW2FdO1xyXG4gICAgaWYgKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLmtleWJvYXJkICYmIHNlbGVjdGVkLmtleSA9PT0gZS5jb2RlICAmJiAhc2VsZWN0ZWQuZXhlY3V0ZWQpIHtcclxuICAgICAgaWYoc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLm9uY2Upe1xyXG4gICAgICAgIHNlbGVjdGVkLmZ1bmN0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZihzZWxlY3RlZC5leGVjdXRlID09PSBleGVjX3R5cGUucmVwZWF0KXtcclxuICAgICAgICBmb3IobGV0IGMgb2YgcmVwZWF0X2JpbmRzKXtcclxuICAgICAgICAgIGlmKGMuYmluZC5pZCA9PSBzZWxlY3RlZC5pZCl7XHJcbiAgICAgICAgICAgIGMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNlbGVjdGVkLmV4ZWN1dGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbn0pXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcclxuICBsZXQgZCA9IFsuLi5hbGxfYmluZHNdO1xyXG4gIGZvciAobGV0IGEgPSAwOyBhIDwgYWxsX2JpbmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWQgPSBkW2FdO1xyXG4gICAgaWYgKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLmtleWJvYXJkICYmIHNlbGVjdGVkLmtleSA9PT0gZS5jb2RlICYmIHNlbGVjdGVkLmV4ZWN1dGVkKSB7XHJcbiAgICAgIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5vbmNlICl7XHJcbiAgICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5yZXBlYXQpe1xyXG4gICAgICAgIGxldCBnID0gWy4uLnJlcGVhdF9iaW5kc107XHJcbiAgICAgICAgZm9yKGxldCBhID0gMDsgYSA8IGcubGVuZ3RoO2ErKyl7XHJcbiAgICAgICAgICBpZihnW2FdLmJpbmQuaWQgPT09IHNlbGVjdGVkLmlkKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWQuZXhlY3V0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZ1thXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSlcclxubGV0IHRyYWNrZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKTtcclxudHJhY2tlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChlKSA9PiB7XHJcbiAgdmFyIHJlY3QgPSAoZS50YXJnZXQgYXMgSFRNTENhbnZhc0VsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDtcclxuICBcclxuICBsYXN0X3ggPSB4O1xyXG4gIGxhc3RfeSA9IHk7XHJcbiAgeCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDsgLy94IHBvc2l0aW9uIHdpdGhpbiB0aGUgZWxlbWVudC5cclxuICB5ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7ICAvL3kgcG9zaXRpb24gd2l0aGluIHRoZSBlbGVtZW50LlxyXG5cclxufSlcclxuXHJcbmVudW0gYnR5cGV7XHJcbiAgbW91c2UsXHJcbiAga2V5Ym9hcmRcclxufVxyXG5cclxuaW50ZXJmYWNlIGJpbmR7XHJcbiAga2V5OnN0cmluZyxcclxuICB0eXBlOmJ0eXBlLFxyXG4gIGlkOm51bWJlcixcclxuICBmdW5jdGlvbjpjb250cm9sX2Z1bmMsXHJcbiAgZXhlY3V0ZTpleGVjX3R5cGUsXHJcbiAgcmVwZWF0X3RpbWVyPzpyZXBlYXRfYmluZCxcclxuICBvYmo/Om9iajx1bmtub3duPixcclxuICBleGVjdXRlZD86Ym9vbGVhbixcclxuICBpbnRlcnZhbD86bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSByZXBlYXRfYmluZHtcclxuICBiaW5kOmJpbmQsXHJcbiAgdGltZXI6bnVtYmVyLFxyXG4gIGludGVydmFsOm51bWJlcixcclxuICBhY3RpdmU6Ym9vbGVhblxyXG59XHJcblxyXG5sZXQgeCA9IDA7XHJcbmxldCB5ID0gMDtcclxubGV0IGxhc3RfeCA9IDA7XHJcbmxldCBsYXN0X3kgPSAwO1xyXG5sZXQgYmluZHM6a2V5QmluZHMgPSB7fTtcclxubGV0IG1vdXNlQmluZHM6bW91c2VCaW5kcyA9IHt9O1xyXG5sZXQgYmluZF9jb3VudCA9IDA7XHJcblxyXG5sZXQgYWxsX2JpbmRzOkFycmF5PGJpbmQ+ID0gW11cclxuXHJcbmxldCByZXBlYXRfYmluZHM6QXJyYXk8cmVwZWF0X2JpbmQ+ID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUG9sbF9Nb3VzZSgpOm1vdXNlUG9ze1xyXG4gIGxldCBoZWlnaHQgPSBHZXRWaWV3cG9ydERpbWVuc2lvbnMoKS5oZWlnaHQ7XHJcbiAgbGV0IGNhbnZhcyA9IGdldEdhbWUoKS5zdGF0ZS5jYW52YXM7XHJcbiAgbGV0IHdyYXRpbyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoY2FudmFzKS53aWR0aCkvR2V0Vmlld3BvcnREaW1lbnNpb25zKCkud2lkdGg7XHJcbiAgbGV0IHZyYXRpbyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoY2FudmFzKS5oZWlnaHQpL0dldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICBsZXQgY2FtZXJhID0gZ2V0R2FtZSgpLnN0YXRlLmNhbWVyYXNbMF07XHJcbiAgcmV0dXJuICh7XHJcbiAgICB4OiAoeC93cmF0aW8vY2FtZXJhLnN0YXRlLnNjYWxpbmcgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCAtIGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoLzIpICxcclxuICAgIHk6ICgoaGVpZ2h0IC0geS92cmF0aW8pL2NhbWVyYS5zdGF0ZS5zY2FsaW5nICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnkgLSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQvMiksXHJcbiAgICBsYXN0OntcclxuICAgICAgeDogKHgvd3JhdGlvL2NhbWVyYS5zdGF0ZS5zY2FsaW5nICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLngpLFxyXG4gICAgICB5OiAoKGhlaWdodCAtIHkvdnJhdGlvKS9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBFeGVjdXRlUmVwZWF0QmluZHMoYjpudW1iZXIpe1xyXG4gIGZvcihsZXQgYSBvZiByZXBlYXRfYmluZHMpe1xyXG4gICAgaWYoYS5iaW5kLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5yZXBlYXQgJiYgYS50aW1lciA9PSAwICYmIGEuYWN0aXZlKXtcclxuICAgICAgYS5iaW5kLmZ1bmN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBpZihhLmFjdGl2ZSB8fCAoIWEuYWN0aXZlICYmIGEudGltZXIgIT0gMCkpXHJcbiAgICAgIGEudGltZXIgKz0gYjtcclxuICAgIGlmKGEudGltZXIgPiBhLmludGVydmFsKXtcclxuICAgICAgYS50aW1lciA9IDA7IFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFVuYmluZChiaW5kX2lkOm51bWJlcil7XHJcbiAgZm9yKGxldCBhID0gMDthIDwgYWxsX2JpbmRzLmxlbmd0aDsgYSsrKXtcclxuICAgIGlmKGFsbF9iaW5kc1thXS5pZCA9PSBiaW5kX2lkKXtcclxuICAgICAgYWxsX2JpbmRzLnNwbGljZShhLDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBleGVjX3R5cGV7XHJcbiAgb25jZSxcclxuICByZXBlYXRcclxufVxyXG5cclxubGV0IGlkID0gMDtcclxuZXhwb3J0IGZ1bmN0aW9uIEJpbmQoa2V5bmFtZTpzdHJpbmcsZnVuYzpjb250cm9sX2Z1bmMsdHlwZTpleGVjX3R5cGUsaW50ZXJ2YWw6bnVtYmVyLG9iamVjdD86b2JqPHVua25vd24+KTpudW1iZXJ7XHJcbiAgaWYoa2V5bmFtZS5zbGljZSgwLDUpID09PSBcIm1vdXNlXCIpe1xyXG4gICAgbGV0IGI6YmluZCA9IHtcclxuICAgICAga2V5OmtleW5hbWUsXHJcbiAgICAgIHR5cGU6YnR5cGUubW91c2UsXHJcbiAgICAgIGlkLFxyXG4gICAgICBmdW5jdGlvbjpmdW5jLFxyXG4gICAgICBvYmo6b2JqZWN0LFxyXG4gICAgICBleGVjdXRlOnR5cGUsXHJcbiAgICAgIGV4ZWN1dGVkOmZhbHNlLFxyXG4gICAgICBpbnRlcnZhbFxyXG4gICAgfTtcclxuICAgIGlmKHR5cGUgPT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgIGIucmVwZWF0X3RpbWVyID0ge1xyXG4gICAgICAgIGJpbmQ6YixcclxuICAgICAgICB0aW1lcjowLFxyXG4gICAgICAgIGludGVydmFsLFxyXG4gICAgICAgIGFjdGl2ZTpmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHJlcGVhdF9iaW5kcy5wdXNoKGIucmVwZWF0X3RpbWVyKTtcclxuICAgIH1cclxuICAgIGFsbF9iaW5kcy5wdXNoKGIpO1xyXG5cclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGxldCBiOmJpbmQgPSB7XHJcbiAgICAgIGtleTprZXluYW1lLFxyXG4gICAgICB0eXBlOmJ0eXBlLmtleWJvYXJkLFxyXG4gICAgICBpZCxcclxuICAgICAgZnVuY3Rpb246ZnVuYyxcclxuICAgICAgZXhlY3V0ZTp0eXBlLFxyXG4gICAgICBleGVjdXRlZDpmYWxzZSxcclxuICAgICAgaW50ZXJ2YWxcclxuICAgIH1cclxuICAgIGlmKHR5cGUgPT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgIGIucmVwZWF0X3RpbWVyID0ge1xyXG4gICAgICAgIGJpbmQ6YixcclxuICAgICAgICB0aW1lcjowLFxyXG4gICAgICAgIGludGVydmFsLFxyXG4gICAgICAgIGFjdGl2ZTpmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHJlcGVhdF9iaW5kcy5wdXNoKGIucmVwZWF0X3RpbWVyKTtcclxuICAgIH1cclxuICAgIGFsbF9iaW5kcy5wdXNoKGIpO1xyXG4gIH1cclxuICBpZCsrO1xyXG4gIHJldHVybiBpZCAtIDE7XHJcbn0iLCJpbXBvcnQge29ian0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQgeyBHb29tYmEgfSBmcm9tIFwiLi4vZ2FtZS9vYmplY3RzL2dvb21iYVwiO1xyXG5cclxuaW50ZXJmYWNlIEh1ZFRleHRHZXRGdW5je1xyXG4gICgpOnN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRleHRTZXR0aW5ne1xyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyLFxyXG4gIGZvbnQ6Rm9udFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZvbnR7XHJcbiAgbWF4X3dpZHRoPzpudW1iZXIsXHJcbiAgc2l6ZTpudW1iZXIsXHJcbiAgZm9udDpzdHJpbmcsXHJcbiAgY29sb3I6c3RyaW5nLFxyXG4gIHRleHQ6c3RyaW5nLFxyXG4gIGFsaWduOkNhbnZhc1RleHRBbGlnblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEh1ZFRleHR7XHJcbiAgbWF4X3dpZHRoPzpudW1iZXIsXHJcbiAgcG9zaXRpb246e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH1cclxuICBzaXplOm51bWJlcjtcclxuICBmb250OnN0cmluZztcclxuICBjb2xvcjpzdHJpbmc7XHJcbiAgdGV4dD86c3RyaW5nO1xyXG4gIGFsaWduPzpDYW52YXNUZXh0QWxpZ247XHJcbn1cclxuZXhwb3J0IGNsYXNzIEhVRHtcclxuICBncmFwaGljX2VsZW1lbnRzOkFycmF5PG9iajx1bmtub3duPj4gPSBbXTtcclxuICB0ZXh0X2VsZW1lbnRzOkFycmF5PFRleHQ+ID0gW107XHJcbiAgc3RhdGVmKGE6bnVtYmVyKXtcclxuICAgIGZvcihsZXQgeCBvZiB0aGlzLmdyYXBoaWNfZWxlbWVudHMpe1xyXG4gICAgICB4LnN0YXRlZihhKTtcclxuICAgIH1cclxuICAgIGZvcihsZXQgeCBvZiB0aGlzLnRleHRfZWxlbWVudHMpe1xyXG4gICAgICB4LnN0YXRlZihhKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0e1xyXG4gIGdldF9mdW5jOkh1ZFRleHRHZXRGdW5jO1xyXG4gIHN0YXRlOkh1ZFRleHQ7XHJcbiAgY29uc3RydWN0b3IoYTpIdWRUZXh0LGI6SHVkVGV4dEdldEZ1bmMpe1xyXG4gICAgaWYoIWEuYWxpZ24pe1xyXG4gICAgICBhLmFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSBhO1xyXG4gICAgaWYoIXRoaXMuc3RhdGUudGV4dCl7XHJcbiAgICAgIHRoaXMuc3RhdGUudGV4dCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdldF9mdW5jID0gYjtcclxuICB9XHJcbiAgc3RhdGVmKGE6bnVtYmVyKXtcclxuICAgdGhpcy5zdGF0ZS50ZXh0ID0gdGhpcy5nZXRfZnVuYygpO1xyXG4gIH1cclxuICByZW5kZXJmKGE6bnVtYmVyKTpGb250e1xyXG4gICAgbGV0IHtzaXplLGNvbG9yLGZvbnQsdGV4dCxtYXhfd2lkdGgsYWxpZ259ID0gdGhpcy5zdGF0ZTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNpemUsXHJcbiAgICAgIGNvbG9yLFxyXG4gICAgICBmb250LFxyXG4gICAgICB0ZXh0LFxyXG4gICAgICBtYXhfd2lkdGgsXHJcbiAgICAgIGFsaWduXHJcbiAgICB9O1xyXG4gIH1cclxufSIsImltcG9ydCB7IHN0YXRlX2Z1bmMsIG9ial9zdGF0ZSwgcG9zaXRpb24gfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5pbXBvcnQgeyByZW5kZXJfZnVuYyB9IGZyb20gXCIuL3JlbmRlclwiO1xyXG5pbXBvcnQgeyBQYXJ0aWNsZSwgcG9zaXRpb25lZF9zcHJpdGUsIHNwcml0ZSwgc3ByaXRlX2dlbiB9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBjb2xsaXNpb25fYm94IH0gZnJvbSBcIi4vY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7IGdldEdhbWUgfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7IFVuYmluZCwgQmluZCwgY29udHJvbF9mdW5jLCBleGVjX3R5cGUgfSBmcm9tIFwiLi9jb250cm9sc1wiO1xyXG5pbXBvcnQge2F1ZGlvfSBmcm9tIFwiLi9hdWRpb1wiO1xyXG5cclxuaW50ZXJmYWNlIG9ial9pPFQ+IHtcclxuICBzdGF0ZWY6IHN0YXRlX2Z1bmM8VD4sXHJcbiAgcmVuZGVyZjogcmVuZGVyX2Z1bmNcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0aW9uX2xlbmd0aChsZW5ndGg6IG51bWJlciwgZGVncmVlOiBudW1iZXIpIHtcclxuICBsZXQgYV9sZW4gPSBsZW5ndGggKiBNYXRoLnNpbihkZWdyZWUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICBsZXQgYl9sZW4gPSBsZW5ndGggKiBNYXRoLmNvcyhkZWdyZWUgKiBNYXRoLlBJIC8gMTgwKTtcclxuICByZXR1cm4ge1xyXG4gICAgeDogYV9sZW4sXHJcbiAgICB5OiBiX2xlblxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldElkKGE6IEFycmF5PG9iajx1bmtub3duPj4sIGlkOiBzdHJpbmcpOiBvYmo8dW5rbm93bj4ge1xyXG4gIGZvciAobGV0IGIgPSAwOyBiIDwgYS5sZW5ndGg7IGIrKykge1xyXG4gICAgaWYgKGFbYl0uaWQgPT0gaWQpIHtcclxuICAgICAgcmV0dXJuIGFbYl07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmxldCBjb3VudGVyID0gMDtcclxuXHJcbmludGVyZmFjZSBhbmltX3N0b3JhZ2Uge1xyXG4gIFtpbmRleDogc3RyaW5nXTogW0FycmF5PFtudW1iZXIsIHNwcml0ZV0+LCBudW1iZXJdXHJcbn1cclxuXHJcbmludGVyZmFjZSB2b2lkX2Z1bmMge1xyXG4gICgpOiB2b2lkXHJcbn1cclxuXHJcbmNsYXNzIGFuaW1hdGlvbnMge1xyXG4gIGFuaW1hdGlvbnM6IGFuaW1fc3RvcmFnZSA9IHt9O1xyXG4gIGFuaW1hdGlvbl90cmFja2VyID0gMDtcclxuICBjdXJyZW50OiBzdHJpbmc7XHJcbiAgY2FsbGJhY2s6IHZvaWRfZnVuYztcclxuICBhZGQobmFtZTogc3RyaW5nLCBzOiBBcnJheTxbbnVtYmVyLCBzcHJpdGVdPiwgbGVuZ3RoOiBudW1iZXIpIHtcclxuICAgIHRoaXMuYW5pbWF0aW9uc1tuYW1lXSA9IFtzLCBsZW5ndGhdO1xyXG4gIH1cclxuICBwbGF5KG5hbWU6IHN0cmluZywgY2FsbGJhY2s/OiB2b2lkX2Z1bmMpIHtcclxuICAgIHRoaXMuY3VycmVudCA9IG5hbWU7XHJcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB0aGlzLmFuaW1hdGlvbl90cmFja2VyID0gMDtcclxuICB9XHJcbiAgcmVuZGVyZih0OiBudW1iZXIpOiBzcHJpdGUge1xyXG4gICAgbGV0IGN1cnJfYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zW3RoaXMuY3VycmVudF1bMF07XHJcbiAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSB0aGlzLmFuaW1hdGlvbnNbdGhpcy5jdXJyZW50XVsxXTtcclxuICAgIGxldCBpbmRleDtcclxuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGN1cnJfYW5pbWF0aW9uLmxlbmd0aCAtIDE7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uX3RyYWNrZXIgPj0gY3Vycl9hbmltYXRpb25baW5kZXhdWzBdICYmIHRoaXMuYW5pbWF0aW9uX3RyYWNrZXIgPCBjdXJyX2FuaW1hdGlvbltpbmRleCArIDFdWzBdKSB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25fdHJhY2tlciA9IHRoaXMuYW5pbWF0aW9uX3RyYWNrZXIgKyB0O1xyXG4gICAgICAgIHJldHVybiBjdXJyX2FuaW1hdGlvbltpbmRleF1bMV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2soKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmFuaW1hdGlvbl90cmFja2VyID49IGxlbmd0aCkge1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbl90cmFja2VyID0gMDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbl90cmFja2VyICs9IHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3Vycl9hbmltYXRpb25baW5kZXhdWzFdO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIG9iajxUPntcclxuICBzcHJpdGVfdXJsID0gXCJcIjtcclxuICBzcHJpdGVfc2hlZXQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgc3RhdGU6IFQ7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBjb2xsaXNpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjb2xsaXNpb25fYm94OiBjb2xsaXNpb25fYm94XHJcbiAgaWQ6IHN0cmluZztcclxuICBiaW5kczogQXJyYXk8bnVtYmVyPjtcclxuICB0YWdzOnN0cmluZ1tdID0gW107XHJcbiAgcm90YXRpb246IG51bWJlciA9IDA7XHJcbiAgcmVuZGVyID0gdHJ1ZTtcclxuICBhbmltYXRpb25zID0gbmV3IGFuaW1hdGlvbnMoKTtcclxuICBhdWRpbyA9IG5ldyBhdWRpbygpO1xyXG4gIGxhc3RfcmVuZGVyOm51bWJlciA9IDA7XHJcbiAgZ2V0U3RhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfYW5pbWF0aW9ucygpIHtcclxuXHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2F1ZGlvKCkge1xyXG5cclxuICB9XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmlkID0gXCJcIiArIGNvdW50ZXI7XHJcbiAgICB0aGlzLmJpbmRzID0gW107XHJcbiAgICBjb3VudGVyKys7XHJcbiAgICB0aGlzLnJlZ2lzdGVyX2NvbnRyb2xzKCk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyX2F1ZGlvKCk7XHJcbiAgfVxyXG4gIGxvYWQoKSB7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IGEgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgYS5zcmMgPSB0aGlzLnNwcml0ZV91cmw7XHJcbiAgICAgIGEub25sb2FkID0gKGFzeW5jICgpID0+IHtcclxuICAgICAgICBfdGhpcy5zcHJpdGVfc2hlZXQgPSBhO1xyXG4gICAgICAgIF90aGlzLnJlZ2lzdGVyX2FuaW1hdGlvbnMoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmF1ZGlvLmxvYWQoKTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9XHJcbiAgZGlzdGFuY2UoYTpvYmo8dW5rbm93bj4pOm51bWJlcntcclxuICAgIGxldCBvX3N0ID0gYS5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBzdCA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHN0LnBvc2l0aW9uLnggLSBvX3N0LnBvc2l0aW9uLngsMikgKyBNYXRoLnBvdyhzdC5wb3NpdGlvbi55IC0gb19zdC5wb3NpdGlvbi55LDIpKTtcclxuICB9XHJcbiAgYW5nbGVUb3dhcmRzKGE6IG9iajx1bmtub3duPik6IG51bWJlciB7XHJcbiAgICBsZXQgYiA9IGEgYXMgb2JqPG9ial9zdGF0ZT47XHJcbiAgICBsZXQgc3RhdGUgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgaWYgKHN0YXRlLnBvc2l0aW9uLnggPCBiLnN0YXRlLnBvc2l0aW9uLnggJiYgc3RhdGUucG9zaXRpb24ueSA+IGIuc3RhdGUucG9zaXRpb24ueVxyXG4gICAgICB8fCAoc3RhdGUucG9zaXRpb24ueCA8IGIuc3RhdGUucG9zaXRpb24ueCAmJiBzdGF0ZS5wb3NpdGlvbi55IDwgYi5zdGF0ZS5wb3NpdGlvbi55KSkge1xyXG4gICAgICByZXR1cm4gOTAgLSBNYXRoLmF0YW4oKGIuc3RhdGUucG9zaXRpb24ueSAtIHN0YXRlLnBvc2l0aW9uLnkpIC8gKGIuc3RhdGUucG9zaXRpb24ueCAtIHN0YXRlLnBvc2l0aW9uLngpKSAqIDE4MCAvIE1hdGguUElcclxuICAgIH1cclxuICAgIGlmIChzdGF0ZS5wb3NpdGlvbi54ID4gYi5zdGF0ZS5wb3NpdGlvbi54ICYmIHN0YXRlLnBvc2l0aW9uLnkgPCBiLnN0YXRlLnBvc2l0aW9uLnlcclxuICAgICAgfHwgc3RhdGUucG9zaXRpb24ueCA+IGIuc3RhdGUucG9zaXRpb24ueCAmJiBzdGF0ZS5wb3NpdGlvbi55ID4gYi5zdGF0ZS5wb3NpdGlvbi55KSB7XHJcbiAgICAgIHJldHVybiAyNzAgLSBNYXRoLmF0YW4oKGIuc3RhdGUucG9zaXRpb24ueSAtIHN0YXRlLnBvc2l0aW9uLnkpIC8gKGIuc3RhdGUucG9zaXRpb24ueCAtIHN0YXRlLnBvc2l0aW9uLngpKSAqIDE4MCAvIE1hdGguUElcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuICBiaW5kX2NvbnRyb2woa2V5OiBzdHJpbmcsIHg6IGV4ZWNfdHlwZSwgZnVuYzogY29udHJvbF9mdW5jLCBpbnRlcnZhbCA9IDEpIHtcclxuICAgIGlmIChrZXkgPT0gXCJtb3VzZTFcIikge1xyXG4gICAgICBsZXQgYiA9IEJpbmQoa2V5LCBmdW5jLCB4LCBpbnRlcnZhbCwgdGhpcyk7XHJcbiAgICAgIHRoaXMuYmluZHMucHVzaChiKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmJpbmRzLnB1c2goQmluZChrZXksIGZ1bmMsIHgsIGludGVydmFsKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCkge1xyXG5cclxuICB9XHJcbiAgZGVsZXRlKCkge1xyXG4gICAgZm9yIChsZXQgYSBvZiB0aGlzLmJpbmRzKSB7XHJcbiAgICAgIFVuYmluZChhKTtcclxuICAgIH1cclxuICAgIGdldEdhbWUoKS5nZXRSb29tKCkuZGVsZXRlSXRlbSh0aGlzLmlkKTtcclxuICB9XHJcbiAgY29sbGlzaW9uX2NoZWNrKGE6IGNvbGxpc2lvbl9ib3gpOiBBcnJheTxvYmo8dW5rbm93bj4+IHtcclxuICAgIGlmICh0aGlzLmNvbGxpc2lvbikge1xyXG4gICAgICBsZXQgcm9vbSA9IGdldEdhbWUoKS5nZXRSb29tKCk7XHJcbiAgICAgIHJldHVybiByb29tLmNoZWNrX2NvbGxpc2lvbnMoYSwgW3RoaXMuaWRdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6IG51bWJlcikge1xyXG4gIH1cclxuICBjb2xsaWRlc193aXRoX2JveChhOiBjb2xsaXNpb25fYm94KTogYm9vbGVhbiB7XHJcbiAgICBsZXQgc3QgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IGhjb2xsaWRlcyA9IGZhbHNlLCB2Y29sbGlkZXMgPSBmYWxzZTtcclxuICAgIGxldCBvYiA9IHtcclxuICAgICAgbGVmdDogKHN0LnBvc2l0aW9uLnggLSB0aGlzLndpZHRoIC8gMiksXHJcbiAgICAgIHJpZ2h0OiAoc3QucG9zaXRpb24ueCArIHRoaXMud2lkdGggLyAyKSxcclxuICAgICAgdG9wOiAoc3QucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0IC8gMiksXHJcbiAgICAgIGJvdHRvbTogKHN0LnBvc2l0aW9uLnkgLSB0aGlzLmhlaWdodCAvIDIpXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgbGVmdDogKGEueCAtIGEud2lkdGggLyAyKSxcclxuICAgICAgcmlnaHQ6IChhLnggKyBhLndpZHRoIC8gMiksXHJcbiAgICAgIHRvcDogKGEueSArIGEuaGVpZ2h0IC8gMiksXHJcbiAgICAgIGJvdHRvbTogKGEueSAtIGEuaGVpZ2h0IC8gMilcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKG9iLmxlZnQgPj0gYm94LmxlZnQgJiYgb2IubGVmdCA8IGJveC5yaWdodCkgfHwgKGJveC5sZWZ0ID4gb2IubGVmdCAmJiBib3gubGVmdCA8IG9iLnJpZ2h0KSkge1xyXG4gICAgICBoY29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKChvYi5ib3R0b20gPj0gYm94LmJvdHRvbSAmJiBvYi5ib3R0b20gPCBib3gudG9wKSB8fCAoYm94LmJvdHRvbSA+IG9iLmJvdHRvbSAmJiBib3guYm90dG9tIDwgb2IudG9wKSl7XHJcbiAgICAgIHZjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGNvbGxpZGVzICYmIHZjb2xsaWRlcztcclxuICB9XHJcbiAgZW1pdF9wYXJ0aWNsZShuYW1lOnN0cmluZyxvZmZzZXQ6cG9zaXRpb24sbGlmZXRpbWU6bnVtYmVyLHJhbmdlOm51bWJlcil7XHJcbiAgICBsZXQgcm9vbSA9IGdldEdhbWUoKS5nZXRSb29tKCk7XHJcbiAgICBsZXQgc3QgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IGZpbmFsX3Bvc2l0aW9uOnBvc2l0aW9uID0ge1xyXG4gICAgICB4OnN0LnBvc2l0aW9uLnggKyBvZmZzZXQueCxcclxuICAgICAgeTpzdC5wb3NpdGlvbi55ICsgb2Zmc2V0LnlcclxuICAgIH1cclxuICAgIHJvb20uZW1pdF9wYXJ0aWNsZShuYW1lLGZpbmFsX3Bvc2l0aW9uLGxpZmV0aW1lLHJhbmdlKVxyXG4gIH1cclxuICByZW5kZXJfdHJhY2sodGltZTpudW1iZXIpe1xyXG4gICAgbGV0IHJlbmRlcmVkID0gdGhpcy5yZW5kZXJmKHRpbWUgLSB0aGlzLmxhc3RfcmVuZGVyKTtcclxuICAgIHRoaXMubGFzdF9yZW5kZXIgPSB0aW1lO1xyXG4gICAgcmV0dXJuIHJlbmRlcmVkO1xyXG4gIH1cclxuICByZW5kZXJmKHRpbWU6IG51bWJlcik6IHBvc2l0aW9uZWRfc3ByaXRlIHwgcG9zaXRpb25lZF9zcHJpdGVbXSB7XHJcbiAgICBsZXQgc3QgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbnMuY3VycmVudCkge1xyXG4gICAgICBsZXQgc3ByaXRlX2hlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgICBsZXQgc3ByaXRlX3dpZHRoID0gdGhpcy53aWR0aDtcclxuICAgICAgaWYgKHRoaXMuaGVpZ2h0ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNwcml0ZV9oZWlnaHQgPSB0aGlzLnNwcml0ZV9zaGVldC5oZWlnaHQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMud2lkdGggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3ByaXRlX3dpZHRoID0gdGhpcy5zcHJpdGVfc2hlZXQud2lkdGg7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzcHJpdGU6IHtcclxuICAgICAgICAgIHNwcml0ZV9zaGVldDogdGhpcy5zcHJpdGVfc2hlZXQsXHJcbiAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgc3ByaXRlX3dpZHRoLFxyXG4gICAgICAgICAgc3ByaXRlX2hlaWdodCxcclxuICAgICAgICAgIG9wYWNpdHk6MVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeDogc3QucG9zaXRpb24ueCxcclxuICAgICAgICB5OiBzdC5wb3NpdGlvbi55XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzcHJpdGU6dGhpcy5hbmltYXRpb25zLnJlbmRlcmYodGltZSksXHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnlcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgY29tcG9zaXRlX3N0YXRpY3tcclxuICB4Om51bWJlcixcclxuICB5Om51bWJlcixcclxuICBvYmo6b2JqPHVua25vd24+XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBjb21wb3NpdGVfb2JqPFQ+IGV4dGVuZHMgb2JqPFQ+e1xyXG4gIG9iamVjdHM6b2JqPHVua25vd24+W10gPSBbXTtcclxuICBzdGF0aWNzOmNvbXBvc2l0ZV9zdGF0aWNbXSA9IFtdO1xyXG4gIGxvYWQoKXtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChbLi4udGhpcy5vYmplY3RzLm1hcCgoYSk9PmEubG9hZCgpKSwuLi50aGlzLnN0YXRpY3MubWFwKGE9PmEub2JqLmxvYWQoKSldKTtcclxuICB9XHJcbiAgcmVuZGVyZih0aW1lOm51bWJlcik6cG9zaXRpb25lZF9zcHJpdGVbXXtcclxuICAgIGxldCBhcnI6cG9zaXRpb25lZF9zcHJpdGVbXSA9IFtdO1xyXG4gICAgZm9yKGxldCBvYmogb2YgdGhpcy5vYmplY3RzKXtcclxuICAgICAgbGV0IHJlbmRlcmVkID0gb2JqLnJlbmRlcl90cmFjayh0aW1lKTtcclxuICAgICAgaWYoQXJyYXkuaXNBcnJheShyZW5kZXJlZCkpe1xyXG4gICAgICAgIGFyci5wdXNoKC4uLnJlbmRlcmVkKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGFyci5wdXNoKHJlbmRlcmVkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBvIG9mIHRoaXMuc3RhdGljcyl7XHJcbiAgICAgIGxldCByZW5kZXJlZCA9IG8ub2JqLnJlbmRlcl90cmFjayh0aW1lKTtcclxuICAgICAgaWYoQXJyYXkuaXNBcnJheShyZW5kZXJlZCkpe1xyXG4gICAgICAgIGFyci5wdXNoKC4uLnJlbmRlcmVkKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGFyci5wdXNoKHJlbmRlcmVkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycjtcclxuICB9XHJcbiAgZGVsZXRlKCl7XHJcbiAgICBmb3IobGV0IGEgb2YgdGhpcy5vYmplY3RzKXtcclxuICAgICAgYS5kZWxldGUoKTtcclxuICAgIH1cclxuICAgIGZvcihsZXQgYSBvZiB0aGlzLnN0YXRpY3Mpe1xyXG4gICAgICBhLm9iai5kZWxldGUoKTtcclxuICAgIH1cclxuICAgIHN1cGVyLmRlbGV0ZSgpO1xyXG4gIH1cclxuICBzdGF0ZWYodGltZTpudW1iZXIpe1xyXG4gICAgZm9yKGxldCBvYmogb2YgdGhpcy5vYmplY3RzKXtcclxuICAgICAgb2JqLnN0YXRlZih0aW1lKTtcclxuICAgIH1cclxuICAgIGZvcihsZXQgYSBvZiB0aGlzLnN0YXRpY3Mpe1xyXG4gICAgICBhLm9iai5zdGF0ZWYodGltZSk7XHJcbiAgICAgIGxldCBvYmpfc3QgPSBhLm9iai5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICAgIGxldCBzdCA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICAgIG9ial9zdC5wb3NpdGlvbi54ID0gc3QucG9zaXRpb24ueCArIGEueDtcclxuICAgICAgb2JqX3N0LnBvc2l0aW9uLnkgPSBzdC5wb3NpdGlvbi55ICsgYS55O1xyXG4gICAgfVxyXG4gIH1cclxuICBjb2xsaWRlc193aXRoX2JveChhOiBjb2xsaXNpb25fYm94KTpib29sZWFue1xyXG4gICAgZm9yKGxldCBvYmogb2YgdGhpcy5vYmplY3RzKXtcclxuICAgICAgaWYob2JqLmNvbGxpZGVzX3dpdGhfYm94KGEpKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZm9yKGxldCBvIG9mIHRoaXMuc3RhdGljcyl7XHJcbiAgICAgIGlmKG8ub2JqLmNvbGxpZGVzX3dpdGhfYm94KGEpKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gIFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIHN0YXRpY19vYmoge1xyXG4gIHNwcml0ZV91cmwgPSBcIlwiO1xyXG4gIHNwcml0ZTogSFRNTEltYWdlRWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGdyYXZpdHlfb2JqPFQ+IGV4dGVuZHMgb2JqPFQ+e1xyXG4gIGdyYXZpdHkgPSB0cnVlXHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gZ2V0UmFuZEludChtaW46bnVtYmVyLCBtYXg6bnVtYmVyKSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICkgKyBtaW47XHJcbn0iLCJpbXBvcnQgeyBzcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVcIjtcclxuaW1wb3J0IHsgR2V0Vmlld3BvcnREaW1lbnNpb25zIH0gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQgeyBvYmogfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuaW1wb3J0IHsgb2JqX3N0YXRlIH0gZnJvbSBcIi4vc3RhdGVcIjtcclxuaW1wb3J0IHsgSHVkVGV4dCwgVGV4dFNldHRpbmcgfSBmcm9tIFwiLi9odWRcIjtcclxuXHJcbmludGVyZmFjZSBjYW1lcmFfc3RhdGUge1xyXG4gIHNjYWxpbmc6IG51bWJlcixcclxuICBwb3NpdGlvbjoge1xyXG4gICAgeDogbnVtYmVyLFxyXG4gICAgeTogbnVtYmVyXHJcbiAgfVxyXG4gIGRpbWVuc2lvbnM6IHtcclxuICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICBoZWlnaHQ6IG51bWJlclxyXG4gIH0sXHJcbiAgdmlld3BvcnQ6IHZpZXdwb3J0XHJcbn1cclxuXHJcbmludGVyZmFjZSB2aWV3cG9ydCB7XHJcbiAgeDogbnVtYmVyLFxyXG4gIHk6IG51bWJlcixcclxuICB3aWR0aDogbnVtYmVyLFxyXG4gIGhlaWdodDogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYW1lcmEge1xyXG4gIHN0YXRlOiBjYW1lcmFfc3RhdGVcclxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHNjYWxpbmc6IG51bWJlciwgdjogdmlld3BvcnQpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHNjYWxpbmcsXHJcbiAgICAgIHBvc2l0aW9uOiB7XHJcbiAgICAgICAgeDogeCAqIHNjYWxpbmcsXHJcbiAgICAgICAgeTogeSAqIHNjYWxpbmdcclxuICAgICAgfSxcclxuICAgICAgZGltZW5zaW9uczoge1xyXG4gICAgICAgIHdpZHRoOiB3aWR0aCAqIHNjYWxpbmcsXHJcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKiBzY2FsaW5nXHJcbiAgICAgIH0sXHJcbiAgICAgIHZpZXdwb3J0OiB2XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldCB4KHg6IG51bWJlcikge1xyXG4gICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi54ID0geDtcclxuICB9XHJcbiAgc2V0IHkoeTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnkgPSB5XHJcbiAgfVxyXG4gIGdldCB4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucG9zaXRpb24ueDtcclxuICB9XHJcbiAgZ2V0IHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wb3NpdGlvbi55O1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcmVuZGVyX2Z1bmMge1xyXG4gICh4OiBudW1iZXIsIHk6IG51bWJlciwgc2NhbGluZzogbnVtYmVyKTogdm9pZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgcmVjdGFuZ2xlIHtcclxuICB3aWR0aDogbnVtYmVyLFxyXG4gIGhlaWdodDogbnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBzcHJpdGVfYXJncyB7XHJcbiAgc3ByaXRlOiBzcHJpdGUsXHJcbiAgeDogbnVtYmVyLFxyXG4gIHk6IG51bWJlcixcclxuICByb3RhdGlvbjogbnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSByZW5kZXJlcl9hcmdzIHtcclxuICBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcbiAgY2FtZXJhOiBDYW1lcmFcclxufVxyXG5cclxuZXhwb3J0IGVudW0gcmVuZGVyZXIge1xyXG4gIHRleHQsXHJcbiAgc3ByaXRlLFxyXG4gIHJlY3QsXHJcbiAgc3Ryb2tlX3JlY3RcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRleHRfcmVuZGVyZXIgPSAocjogcmVuZGVyZXJfYXJncywgczogVGV4dFNldHRpbmcpID0+IHtcclxuICBsZXQgdmhlaWdodCA9IEdldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICByLmNvbnRleHQuZm9udCA9IGAke3MuZm9udC5zaXplfXB4ICR7cy5mb250LmZvbnR9YDtcclxuICByLmNvbnRleHQuZmlsbFN0eWxlID0gcy5mb250LmNvbG9yO1xyXG4gIHIuY29udGV4dC50ZXh0QWxpZ24gPSBzLmZvbnQuYWxpZ247XHJcbiAgaWYgKHMuZm9udC5tYXhfd2lkdGgpIHtcclxuICAgIHIuY29udGV4dC5maWxsVGV4dChzLmZvbnQudGV4dCwgcy54LCB2aGVpZ2h0IC0gcy55LCBzLmZvbnQubWF4X3dpZHRoKTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICByLmNvbnRleHQuZmlsbFRleHQocy5mb250LnRleHQsIHMueCwgdmhlaWdodCAtIHMueSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3ByaXRlX3JlbmRlcmVyID0gKHI6IHJlbmRlcmVyX2FyZ3MsIHM6IHNwcml0ZV9hcmdzKSA9PiB7XHJcbiAgbGV0IGNhbWVyYSA9IHIuY2FtZXJhO1xyXG4gIGxldCB2aGVpZ2h0ID0gci5jYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQgLyByLmNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGxldCBmaW5hbF94ID0gKChzLnggLSBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCArIGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoIC8gMiAtIHMuc3ByaXRlLnNwcml0ZV93aWR0aCAvIDIpICogci5jYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGZpbmFsX3kgPSAoKHZoZWlnaHQgLSBzLnkgLSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQgLyAyIC0gcy5zcHJpdGUuc3ByaXRlX2hlaWdodCAvIDIgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueSkgKiByLmNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgaGVpZ2h0ID0gcy5zcHJpdGUuc3ByaXRlX2hlaWdodCAqIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IHdpZHRoID0gcy5zcHJpdGUuc3ByaXRlX3dpZHRoICogci5jYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBsZXQgY3V0X29mZiA9IDA7XHJcbiAgci5jb250ZXh0LnNhdmUoKTtcclxuICByLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSBzLnNwcml0ZS5vcGFjaXR5O1xyXG4gIHIuY29udGV4dC50cmFuc2xhdGUoZmluYWxfeCArIGN1dF9vZmYgKyAocy5zcHJpdGUuc3ByaXRlX3dpZHRoIC0gY3V0X29mZikgLyAyLCBmaW5hbF95ICsgcy5zcHJpdGUuc3ByaXRlX2hlaWdodCAvIDIpXHJcbiAgbGV0IHJhZGlhbnMgPSBzLnJvdGF0aW9uICogKE1hdGguUEkgLyAxODApO1xyXG4gIHIuY29udGV4dC5yb3RhdGUocmFkaWFucyk7XHJcbiAgci5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgIHMuc3ByaXRlLnNwcml0ZV9zaGVldCxcclxuICAgIHMuc3ByaXRlLmxlZnQgKyBjdXRfb2ZmLFxyXG4gICAgcy5zcHJpdGUudG9wLFxyXG4gICAgKHMuc3ByaXRlLnNwcml0ZV93aWR0aCAtIGN1dF9vZmYpLFxyXG4gICAgcy5zcHJpdGUuc3ByaXRlX2hlaWdodCxcclxuICAgIC0ocy5zcHJpdGUuc3ByaXRlX3dpZHRoIC0gY3V0X29mZikgLyAyLFxyXG4gICAgLXMuc3ByaXRlLnNwcml0ZV9oZWlnaHQgLyAyLFxyXG4gICAgd2lkdGggLSBjdXRfb2ZmLFxyXG4gICAgaGVpZ2h0XHJcbiAgKVxyXG4gIHIuY29udGV4dC5yZXN0b3JlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzdHJva2VkX3JlY3RfcmVuZGVyZXIgPSAoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCByZWN0OiByZWN0YW5nbGUsIHg6IG51bWJlciwgeTogbnVtYmVyLCBjb2xvcjogc3RyaW5nLCBjYW1lcmE6IENhbWVyYSkgPT4ge1xyXG4gIGxldCB2aGVpZ2h0ID0gY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0IC8gY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IGZpbmFsX3ggPSAoKHggLSBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCArIGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoIC8gMiAtIHJlY3Qud2lkdGggLyAyKSAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgZmluYWxfeSA9ICgodmhlaWdodCAtIHkgLSByZWN0LmhlaWdodCAvIDIgLSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQgLyAyICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnkpICogY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBoZWlnaHQgPSByZWN0LmhlaWdodCAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGxldCB3aWR0aCA9IHJlY3Qud2lkdGggKiBjYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgY29udGV4dC5zdHJva2VSZWN0KGZpbmFsX3gsIGZpbmFsX3ksIHJlY3Qud2lkdGgsIGhlaWdodCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZWN0X3JlbmRlcmVyID0gKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcmVjdDogcmVjdGFuZ2xlLCB4OiBudW1iZXIsIHk6IG51bWJlciwgY29sb3I6IHN0cmluZywgY2FtZXJhOiBDYW1lcmEpID0+IHtcclxuICBsZXQgdmhlaWdodCA9IGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodCAvIGNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGxldCBmaW5hbF94ID0gKCh4IC0gY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnggKyBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aCAvIDIgLSByZWN0LndpZHRoIC8gMikgKiBjYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGZpbmFsX3kgPSAoKHZoZWlnaHQgLSB5IC0gcmVjdC5oZWlnaHQgLyAyIC0gY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0IC8gMiArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KSAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgaGVpZ2h0ID0gcmVjdC5oZWlnaHQgKiBjYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBsZXQgd2lkdGggPSByZWN0LndpZHRoICogY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gIGNvbnRleHQuZmlsbFJlY3QoZmluYWxfeCwgZmluYWxfeSwgcmVjdC53aWR0aCwgaGVpZ2h0KTtcclxufSIsImltcG9ydCB7IGdyYXZpdHlfb2JqLG9iaiB9IGZyb20gXCIuL29iamVjdFwiO1xyXG5pbXBvcnQgeyBQYXJ0aWNsZSwgc3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7IG9ial9zdGF0ZSB9IGZyb20gXCIuL3N0YXRlXCI7XHJcbmltcG9ydCB7IHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayxjaGVja19jb2xsaXNpb25zLGNvbGxpc2lvbl9ib3gsY2hlY2tfYWxsX2NvbGxpc2lvbnMsY2hlY2tfYWxsX29iamVjdHN9IGZyb20gXCIuL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge3JlbmRlcl9jb2xsaXNpb25fYm94LERFQlVHfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7QmluZCxjb250cm9sX2Z1bmMsIGV4ZWNfdHlwZX0gZnJvbSBcIi4vY29udHJvbHNcIjtcclxuaW1wb3J0IHsgT3ZlcndvcmxkIH0gZnJvbSBcIi4uL2dhbWUvcm9vbXMvb3ZlcndvcmxkXCI7XHJcbmltcG9ydCB7SFVEfSBmcm9tIFwiLi9odWRcIjtcclxuaW1wb3J0IHthdWRpb30gZnJvbSBcIi4vYXVkaW9cIlxyXG5cclxuaW50ZXJmYWNlIHBvc2l0aW9ue1xyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseV9ncmF2aXR5KG9iOmdyYXZpdHlfb2JqPHVua25vd24+LGdyYXZfY29uc3Q6bnVtYmVyLCBncmF2X21heDpudW1iZXIpe1xyXG4gIGxldCBzdCA9IG9iLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICBpZihvYi5ncmF2aXR5ICYmIHN0LnZlbG9jaXR5LnkgPiBncmF2X21heCl7XHJcbiAgICBzdC52ZWxvY2l0eS55ICs9IGdyYXZfY29uc3Q7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHBhcnRpY2xlX2VudHJ5e1xyXG4gIHNwcml0ZTpzdHJpbmcsXHJcbiAgaGVpZ2h0Om51bWJlcixcclxuICB3aWR0aDpudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIHBhcnRpY2xlc3tcclxuICBbaW5kZXg6c3RyaW5nXTpwYXJ0aWNsZV9lbnRyeVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHJvb21faTxUPntcclxuICBiYWNrZ3JvdW5kX3VybDpzdHJpbmcsXHJcbiAgb2JqZWN0czpBcnJheTxvYmo8dW5rbm93bj4+XHJcbiAgc3RhdGU6VFxyXG59XHJcbmV4cG9ydCBjbGFzcyByb29tPFQ+e1xyXG4gIGJhY2tncm91bmRfdXJsOiBzdHJpbmc7XHJcbiAgYmFja2dyb3VuZDogSFRNTEltYWdlRWxlbWVudDtcclxuICBvYmplY3RzOiBBcnJheTxvYmo8dW5rbm93bj4+ID0gW107XHJcbiAgcGFydGljbGVzOnBhcnRpY2xlcyA9IHt9O1xyXG4gIHBhcnRpY2xlc19hcnI6IEFycmF5PG9iajx1bmtub3duPj4gPSBbXTtcclxuICBzdGF0ZTogVDtcclxuICBodWQ6SFVEO1xyXG4gIGF1ZGlvID0gbmV3IGF1ZGlvKCk7XHJcbiAgbG9hZCgpIHtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBsZXQgYSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBsZXQgdG9fYXdhaXQgPSB0aGlzLm9iamVjdHMubWFwKChhKSA9PiBhLmxvYWQoKSk7XHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRvX2F3YWl0KTtcclxuICAgICAgYS5zcmMgPSB0aGlzLmJhY2tncm91bmRfdXJsO1xyXG4gICAgICBhLm9uZXJyb3IgPSAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgbG9hZGluZyB1cmw6XCIgKyB0aGlzLmJhY2tncm91bmRfdXJsKTtcclxuICAgICAgfSlcclxuICAgICAgYS5vbmxvYWQgPSAoYXN5bmMoKSA9PiB7XHJcbiAgICAgICAgX3RoaXMuYmFja2dyb3VuZCA9IGE7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5hdWRpby5sb2FkKCk7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIGFzeW5jIGFkZEl0ZW0obzpvYmo8b2JqX3N0YXRlPiwgbGlzdCA9IHRoaXMub2JqZWN0cyl7XHJcbiAgICBhd2FpdCBvLmxvYWQoKTtcclxuICAgIGxpc3QucHVzaChvKTtcclxuICB9XHJcbiAgYXN5bmMgYWRkSXRlbXMobzpvYmo8b2JqX3N0YXRlPltdLCBsaXN0ID0gdGhpcy5vYmplY3RzKXtcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKG8ubWFwKChhKT0+YS5sb2FkKCkpKTtcclxuICAgIGxpc3QucHVzaCguLi5vKTtcclxuICB9XHJcbiAgZGVsZXRlSXRlbShpZDpzdHJpbmcsIGxpc3QgPSB0aGlzLm9iamVjdHMpe1xyXG4gICAgZm9yKGxldCBhID0gMDthIDwgbGlzdC5sZW5ndGg7YSsrKXtcclxuICAgICAgaWYobGlzdFthXS5pZCA9PT0gaWQpe1xyXG4gICAgICAgIGxpc3Quc3BsaWNlKGEsMSlcclxuICAgICAgICBhLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJQYXJ0aWNsZXMoKXtcclxuXHJcbiAgfVxyXG4gIHJlZ2lzdGVySFVEKCk6SFVEe1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgYmluZENvbnRyb2woa2V5OnN0cmluZyx4OmV4ZWNfdHlwZSxmdW5jOmNvbnRyb2xfZnVuYyxpbnRlcnZhbDpudW1iZXIgPSAxKXtcclxuICAgIEJpbmQoa2V5LGZ1bmMseCxpbnRlcnZhbCk7IFxyXG4gIH1cclxuICBjaGVja19jb2xsaXNpb25zKGJveDpjb2xsaXNpb25fYm94LGV4ZW1wdD86QXJyYXk8c3RyaW5nPik6QXJyYXk8b2JqPHVua25vd24+PntcclxuICAgIGlmKERFQlVHKXtcclxuICAgICAgcmVuZGVyX2NvbGxpc2lvbl9ib3goYm94KTtcclxuICAgIH1cclxuICAgIHJldHVybiBjaGVja19hbGxfY29sbGlzaW9ucyhib3gsdGhpcy5vYmplY3RzLGV4ZW1wdCk7XHJcbiAgfVxyXG4gIGNoZWNrX29iamVjdHMoYm94OmNvbGxpc2lvbl9ib3gsZXhlbXB0PzpzdHJpbmdbXSxsaXN0PXRoaXMub2JqZWN0cyl7XHJcbiAgICBpZihERUJVRyl7XHJcbiAgICAgIHJlbmRlcl9jb2xsaXNpb25fYm94KGJveCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hlY2tfYWxsX29iamVjdHMoYm94LGxpc3QsZXhlbXB0KTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuXHJcbiAgfVxyXG4gIGNsZWFudXAoKXtcclxuXHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOiBudW1iZXIpIHtcclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgIHRoaXMub2JqZWN0c1thXS5zdGF0ZWYodGltZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGVtaXRfcGFydGljbGUobmFtZTpzdHJpbmcscG9zOnBvc2l0aW9uLGxpZmV0aW1lOm51bWJlcixwb3NfcmFuZ2U6bnVtYmVyKXtcclxuICAgIHRoaXMuYWRkSXRlbShuZXcgUGFydGljbGUodGhpcy5wYXJ0aWNsZXNbbmFtZV0scG9zLGxpZmV0aW1lLHBvc19yYW5nZSksIHRoaXMucGFydGljbGVzX2Fycik7XHJcbiAgfVxyXG4gIGdldE9iaihpZDpzdHJpbmcpe1xyXG4gICAgZm9yKGxldCBhID0gMDsgYSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKyl7XHJcbiAgICAgIGlmKHRoaXMub2JqZWN0c1thXS5pZCA9PSBpZCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0c1thXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJlbmRlcmYodGltZTogbnVtYmVyKTogc3ByaXRlIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNwcml0ZV9zaGVldDogdGhpcy5iYWNrZ3JvdW5kLFxyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIHNwcml0ZV9oZWlnaHQ6IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQsXHJcbiAgICAgIHNwcml0ZV93aWR0aDogdGhpcy5iYWNrZ3JvdW5kLndpZHRoLFxyXG4gICAgICBvcGFjaXR5OjFcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQgeyBvYmogfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuaW1wb3J0IHsgb2JqX3N0YXRlLCBwb3NpdGlvbiwgZGltZW5zaW9uc30gZnJvbSBcIi4vc3RhdGVcIjtcclxuaW1wb3J0IHtnZXRSYW5kSW50fSBmcm9tIFwiLi9yYW5kXCI7XHJcbmltcG9ydCB7cGFydGljbGVfZW50cnl9IGZyb20gXCIuL3Jvb21cIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vdmFuXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHNwcml0ZXtcclxuICBzcHJpdGVfc2hlZXQ6SFRNTEltYWdlRWxlbWVudCxcclxuICBsZWZ0Om51bWJlcixcclxuICB0b3A6bnVtYmVyLFxyXG4gIHNwcml0ZV93aWR0aDpudW1iZXIsXHJcbiAgc3ByaXRlX2hlaWdodDpudW1iZXIsXHJcbiAgb3BhY2l0eTpudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBwb3NpdGlvbmVkX3Nwcml0ZXtcclxuICBzcHJpdGU6c3ByaXRlLFxyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBQYXJ0aWNsZV9pe1xyXG4gIGxpZmV0aW1lOm51bWJlcjtcclxuICBwb3NpdGlvbjp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfSxcclxuICB2ZWxvY2l0eTp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFydGljbGUgZXh0ZW5kcyBvYmo8UGFydGljbGVfaT57XHJcbiAgY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgcmFuZG9tX3JhbmdlOm51bWJlcjtcclxuICBtYXhfbGlmZXRpbWU6bnVtYmVyO1xyXG4gIHNlbGVjdGVkX3Nwcml0ZTpzcHJpdGU7XHJcbiAgY29uc3RydWN0b3IocGFydDpwYXJ0aWNsZV9lbnRyeSxwb3M6cG9zaXRpb24sbGlmZXRpbWU6bnVtYmVyLHJhbmRvbV9yYW5nZTpudW1iZXIpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGxpZmV0aW1lOjAsXHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4OnBvcy54ICsgZ2V0UmFuZEludCgtcmFuZG9tX3JhbmdlLHJhbmRvbV9yYW5nZSksXHJcbiAgICAgICAgeTpwb3MueSArIGdldFJhbmRJbnQoLXJhbmRvbV9yYW5nZSxyYW5kb21fcmFuZ2UpXHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGlzLnNwcml0ZV91cmwgPSBwYXJ0LnNwcml0ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gcGFydC5oZWlnaHQ7XHJcbiAgICB0aGlzLndpZHRoID0gcGFydC53aWR0aDtcclxuICAgIHRoaXMubWF4X2xpZmV0aW1lID0gbGlmZXRpbWU7XHJcbiAgICB0aGlzLnJhbmRvbV9yYW5nZSA9IHJhbmRvbV9yYW5nZTtcclxuICB9XHJcbiAgZGVsZXRlKCl7XHJcbiAgICBsZXQgcm9vbSA9IGdldEdhbWUoKS5nZXRSb29tKCk7XHJcbiAgICByb29tLmRlbGV0ZUl0ZW0odGhpcy5pZCxyb29tLnBhcnRpY2xlc19hcnIpO1xyXG4gIH1cclxuICBzdGF0ZWYodGltZTpudW1iZXIpe1xyXG4gICAgdGhpcy5zdGF0ZS5saWZldGltZSArPSB0aW1lO1xyXG4gICAgaWYodGhpcy5zdGF0ZS5saWZldGltZSA+IHRoaXMubWF4X2xpZmV0aW1lKXtcclxuICAgICAgdGhpcy5kZWxldGUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyZih0aW1lOm51bWJlcik6cG9zaXRpb25lZF9zcHJpdGV7XHJcbiAgICBpZighdGhpcy5zZWxlY3RlZF9zcHJpdGUpe1xyXG4gICAgICBsZXQgc3ByaXRlcyA9IHNwcml0ZV9nZW4odGhpcy5zcHJpdGVfc2hlZXQsdGhpcy53aWR0aCx0aGlzLmhlaWdodClcclxuICAgICAgbGV0IHJhbmRvbV9yb3cgPSBnZXRSYW5kSW50KDAsc3ByaXRlcy5sZW5ndGgpO1xyXG4gICAgICBsZXQgcmFuZG9tX2NvbCA9IGdldFJhbmRJbnQoMCxzcHJpdGVzW3JhbmRvbV9yb3ddLmxlbmd0aCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRfc3ByaXRlID0gc3ByaXRlc1tyYW5kb21fcm93XVtyYW5kb21fY29sXTtcclxuICAgIH1cclxuICAgIHRoaXMuc2VsZWN0ZWRfc3ByaXRlLm9wYWNpdHkgPSAxIC0gdGhpcy5zdGF0ZS5saWZldGltZS90aGlzLm1heF9saWZldGltZTtcclxuICAgIHJldHVybntcclxuICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICBzcHJpdGU6dGhpcy5zZWxlY3RlZF9zcHJpdGVcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzcHJpdGVfZ2VuKHNwcml0ZV9zaGVldDpIVE1MSW1hZ2VFbGVtZW50LHNwcml0ZV93aWR0aDpudW1iZXIsc3ByaXRlX2hlaWdodDpudW1iZXIpOkFycmF5PEFycmF5PHNwcml0ZT4+e1xyXG4gIGxldCB3aWR0aCA9IHNwcml0ZV9zaGVldC53aWR0aDtcclxuICBsZXQgaGVpZ2h0ID0gc3ByaXRlX3NoZWV0LmhlaWdodDtcclxuICBsZXQgc3ByaXRlczpBcnJheTxBcnJheTxzcHJpdGU+PiA9IFtdO1xyXG4gIGZvcihsZXQgYiA9IDA7IGIgPCBoZWlnaHQ7YiArPSBzcHJpdGVfaGVpZ2h0KXtcclxuICAgIHNwcml0ZXMucHVzaChbXSk7XHJcbiAgICBmb3IobGV0IGEgPSAwOyBhIDwgd2lkdGg7YSArPSBzcHJpdGVfd2lkdGgpe1xyXG4gICAgICBzcHJpdGVzW2JdLnB1c2goe1xyXG4gICAgICAgIHNwcml0ZV9zaGVldCxcclxuICAgICAgICBsZWZ0OmEsXHJcbiAgICAgICAgdG9wOmIgKiBzcHJpdGVfaGVpZ2h0LFxyXG4gICAgICAgIHNwcml0ZV9oZWlnaHQsXHJcbiAgICAgICAgc3ByaXRlX3dpZHRoLFxyXG4gICAgICAgIG9wYWNpdHk6MVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gc3ByaXRlcztcclxufVxyXG5cclxuIiwiZXhwb3J0IGludGVyZmFjZSBzdGF0ZV9mdW5jPFQ+e1xyXG4gIChsYXN0X3RpbWU6bnVtYmVyLGN1cnJlbnRfc3RhdGU6VCk6VFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHZlbG9jaXR5e1xyXG4gIHg6bnVtYmVyO1xyXG4gIHk6bnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHBvc2l0aW9ue1xyXG4gIHg6bnVtYmVyO1xyXG4gIHk6bnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGRpbWVuc2lvbnN7XHJcbiAgaGVpZ2h0Om51bWJlcixcclxuICB3aWR0aDpudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBvYmpfc3RhdGV7XHJcbiAgcG9zaXRpb246cG9zaXRpb247XHJcbiAgdmVsb2NpdHk6dmVsb2NpdHk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugcm9vbV9zdGF0ZXtcclxuICBvYmplY3RzOiBBcnJheTxvYmpfc3RhdGU+XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbl9pbml0KCk6b2JqX3N0YXRle1xyXG4gIHJldHVybiB7XHJcbiAgICBwb3NpdGlvbjp7XHJcbiAgICAgIHg6MCxcclxuICAgICAgeTowXHJcbiAgICB9LFxyXG4gICAgdmVsb2NpdHk6e1xyXG4gICAgICB4OjAsXHJcbiAgICAgIHk6MFxyXG4gICAgfVxyXG5cclxuICB9ICBcclxufSIsImV4cG9ydCBjb25zdCBERUJVRyA9IGZhbHNlO1xyXG5cclxuaW1wb3J0IHtvYmp9IGZyb20gXCIuL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQge3Jvb219IGZyb20gXCIuL2xpYi9yb29tXCI7XHJcbmltcG9ydCB7cG9zaXRpb25lZF9zcHJpdGUsIHNwcml0ZX0gZnJvbSBcIi4vbGliL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBjb2xsaXNpb25fYm94IH0gZnJvbSBcIi4vbGliL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge3Nwcml0ZV9yZW5kZXJlcixyZWN0X3JlbmRlcmVyLCBzdHJva2VkX3JlY3RfcmVuZGVyZXIsIHRleHRfcmVuZGVyZXIsIENhbWVyYX0gZnJvbSBcIi4vbGliL3JlbmRlclwiO1xyXG5pbXBvcnQge0hVRH0gZnJvbSBcIi4vbGliL2h1ZFwiO1xyXG5pbXBvcnQge0V4ZWN1dGVSZXBlYXRCaW5kc30gZnJvbSBcIi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5pbXBvcnQge092ZXJ3b3JsZH0gZnJvbSBcIi4vZ2FtZS9yb29tcy9vdmVyd29ybGRcIjtcclxuXHJcblxyXG5sZXQgY2FudmFzX2VsZW1lbnQ6SFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxubGV0IGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzX2VsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuXHJcbmxldCBzY3JlZW5fd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxubGV0IHNjcmVlbl9oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG5sZXQgdndpZHRoID0gY2FudmFzX2VsZW1lbnQud2lkdGg7XHJcbmxldCB2aGVpZ2h0ID0gY2FudmFzX2VsZW1lbnQuaGVpZ2h0O1xyXG5cclxuXHJcbi8vSG93IG9mdGVuIHRoZSBnYW1lIGxvZ2ljIGxvb3Agc2hvdWxkIHJ1biwgaW4gbWlsbGlzZWNvbmRzXHJcbmxldCBsb2dpY19sb29wX2ludGVydmFsOm51bWJlciA9IDEwMDAvNjA7ICBcclxuXHJcbmxldCBsYXN0X3RpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxubGV0IGxhc3RfcmVuZGVyX3RpbWUgPSAwO1xyXG5cclxuaW50ZXJmYWNlIGRpbWVuc2lvbnN7XHJcbiAgaGVpZ2h0Om51bWJlcixcclxuICB3aWR0aDpudW1iZXJcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHZXRTY3JlZW5EaW1lbnNpb25zICgpOmRpbWVuc2lvbnN7XHJcbiAgcmV0dXJuKHtcclxuICAgIHdpZHRoOnNjcmVlbl93aWR0aCxcclxuICAgIGhlaWdodDpzY3JlZW5faGVpZ2h0XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldFZpZXdwb3J0RGltZW5zaW9ucyAoKTpkaW1lbnNpb25ze1xyXG4gIHJldHVybih7XHJcbiAgICBoZWlnaHQ6dmhlaWdodCxcclxuICAgIHdpZHRoOnZ3aWR0aFxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJfY29sbGlzaW9uX2JveCA9IChhOmNvbGxpc2lvbl9ib3gpID0+IHtcclxuICBib3hlcy5wdXNoKGEpO1xyXG59XHJcblxyXG5sZXQgYm94ZXM6QXJyYXk8Y29sbGlzaW9uX2JveD4gPSBbXTtcclxuXHJcbmV4cG9ydCBsZXQgZGVlcCA9IChhOmFueSkgPT57XHJcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYSkpO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgZ2FtZV9zdGF0ZXtcclxuICBsb2dpYzpudW1iZXIsXHJcbiAgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcbiAgY3VycmVudF9yb29tOnJvb208dW5rbm93bj4sXHJcbiAgY2FtZXJhczpBcnJheTxDYW1lcmE+LFxyXG4gIGNhbnZhczpIVE1MQ2FudmFzRWxlbWVudCxcclxuICBwbGF5ZXJfc3RhdGU6e1xyXG4gICAgcG93ZXI6bnVtYmVyXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgZ2FtZXtcclxuICBzdGF0ZTpnYW1lX3N0YXRlO1xyXG4gIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gIG9mZnNjcmVlbl9jYW52YXM6SFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgb2Zmc2NyZWVuX2NvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gIGNvbnN0cnVjdG9yKGN0eDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsYTpyb29tPHVua25vd24+KXtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGNhbnZhczpjYW52YXNfZWxlbWVudCxcclxuICAgICAgbG9naWM6dW5kZWZpbmVkLFxyXG4gICAgICBjb250ZXh0OmN0eCxcclxuICAgICAgY2FtZXJhczpbbmV3IENhbWVyYSgwLDAsdndpZHRoLzIsdmhlaWdodCwxLHtcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowLFxyXG4gICAgICAgIHdpZHRoOjAuNSxcclxuICAgICAgICBoZWlnaHQ6MC41XHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgQ2FtZXJhKDAsMTAwLHZ3aWR0aC8yLHZoZWlnaHQvMiwxLHtcclxuICAgICAgICB4OnZ3aWR0aC8yLFxyXG4gICAgICAgIHk6MCxcclxuICAgICAgICB3aWR0aDowLjUsXHJcbiAgICAgICAgaGVpZ2h0OjAuNVxyXG4gICAgICB9KSxcclxuICAgICAgbmV3IENhbWVyYSgwLDEwMCx2d2lkdGgvMix2aGVpZ2h0LzIsMSx7XHJcbiAgICAgICAgeDp2d2lkdGgvMixcclxuICAgICAgICB5OnZoZWlnaHQvMixcclxuICAgICAgICB3aWR0aDowLjUsXHJcbiAgICAgICAgaGVpZ2h0OjAuNVxyXG4gICAgICB9KVxyXG4gICAgICBdLFxyXG4gICAgICBjdXJyZW50X3Jvb206IHVuZGVmaW5lZCxcclxuICAgICAgcGxheWVyX3N0YXRlOntcclxuICAgICAgICBwb3dlcjowXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMub2Zmc2NyZWVuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICB0aGlzLm9mZnNjcmVlbl9jb250ZXh0ID0gdGhpcy5vZmZzY3JlZW5fY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIHRoaXMubG9hZFJvb20oYSk7XHJcbiAgfVxyXG4gIHJlbmRlcih0Om51bWJlcil7XHJcbiAgICBsZXQgdGltZSA9IHQgLSBsYXN0X3JlbmRlcl90aW1lXHJcbiAgICBsYXN0X3JlbmRlcl90aW1lID0gdDtcclxuICAgIGZvcihsZXQgY2FtZXJhIG9mIHRoaXMuc3RhdGUuY2FtZXJhcyl7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLm9mZnNjcmVlbl9jYW52YXMuaGVpZ2h0ID0gY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICB0aGlzLm9mZnNjcmVlbl9jYW52YXMud2lkdGggPSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aDtcclxuICAgICAgdGhpcy5vZmZzY3JlZW5fY29udGV4dC5jbGVhclJlY3QoMCwwLGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoLGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodCk7XHJcbiAgICAgIHRoaXMub2Zmc2NyZWVuX2NvbnRleHQuZmlsbFN0eWxlPVwiYmxhY2tcIjtcclxuICAgICAgdGhpcy5vZmZzY3JlZW5fY29udGV4dC5maWxsUmVjdCgwLDAsY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgsY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0KTtcclxuICAgICAgbGV0IGNhbWVyYV9ib3ggPSB7XHJcbiAgICAgICAgeDpjYW1lcmEuc3RhdGUucG9zaXRpb24ueCxcclxuICAgICAgICB5OmNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICAgIHdpZHRoOmNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDpjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHRcclxuICAgICAgfTtcclxuICAgICAgbGV0IHBhcnRpY2xlX2NvbGxpZGVzID0gdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20uY2hlY2tfb2JqZWN0cyhjYW1lcmFfYm94LFtdLHRoaXMuc3RhdGUuY3VycmVudF9yb29tLnBhcnRpY2xlc19hcnIpO1xyXG4gICAgICBsZXQgY2FtZXJhX2NvbGxpZGVycyA9IFsuLi50aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5jaGVja19vYmplY3RzKGNhbWVyYV9ib3gpLC4uLnBhcnRpY2xlX2NvbGxpZGVzXTtcclxuICAgICAgbGV0IHJlbmRlcl9hcmdzID0ge1xyXG4gICAgICAgIGNvbnRleHQ6dGhpcy5vZmZzY3JlZW5fY29udGV4dCxcclxuICAgICAgICBjYW1lcmE6Y2FtZXJhLFxyXG4gICAgICB9O1xyXG4gICAgICBzcHJpdGVfcmVuZGVyZXIocmVuZGVyX2FyZ3Mse1xyXG4gICAgICAgIHNwcml0ZTp0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5yZW5kZXJmKHRpbWUpLFxyXG4gICAgICAgIHg6IDAsXHJcbiAgICAgICAgeTogMCxcclxuICAgICAgICByb3RhdGlvbjogMFxyXG4gICAgICB9KTtcclxuICAgICAgZm9yIChsZXQgYSBvZiBjYW1lcmFfY29sbGlkZXJzLmZpbHRlcigoYikgPT4gYi5yZW5kZXIpKSB7XHJcbiAgICAgICAgbGV0IHJlbmRlcmVkID0gYS5yZW5kZXJfdHJhY2sodCk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVuZGVyZWQpKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBwb3NpdGlvbmVkX3Nwcml0ZSBvZiByZW5kZXJlZClcclxuICAgICAgICAgICAgc3ByaXRlX3JlbmRlcmVyKHJlbmRlcl9hcmdzLCB7XHJcbiAgICAgICAgICAgICAgc3ByaXRlOnBvc2l0aW9uZWRfc3ByaXRlLnNwcml0ZSxcclxuICAgICAgICAgICAgICB4OiBwb3NpdGlvbmVkX3Nwcml0ZS54LFxyXG4gICAgICAgICAgICAgIHk6IHBvc2l0aW9uZWRfc3ByaXRlLnksXHJcbiAgICAgICAgICAgICAgcm90YXRpb246IGEucm90YXRpb25cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgbGV0IHBvc2l0aW9uZWRfc3ByaXRlID0gcmVuZGVyZWQgYXMgcG9zaXRpb25lZF9zcHJpdGU7XHJcbiAgICAgICAgICBzcHJpdGVfcmVuZGVyZXIocmVuZGVyX2FyZ3MsIHtcclxuICAgICAgICAgICAgc3ByaXRlOiBwb3NpdGlvbmVkX3Nwcml0ZS5zcHJpdGUsXHJcbiAgICAgICAgICAgIHg6IHBvc2l0aW9uZWRfc3ByaXRlLngsXHJcbiAgICAgICAgICAgIHk6IHBvc2l0aW9uZWRfc3ByaXRlLnksXHJcbiAgICAgICAgICAgIHJvdGF0aW9uOiBhLnJvdGF0aW9uXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKERFQlVHKSB7XHJcbiAgICAgICAgbGV0IGJveDogY29sbGlzaW9uX2JveDtcclxuICAgICAgICBsZXQgYm94ZXNfY29weSA9IFsuLi5ib3hlc11cclxuICAgICAgICB3aGlsZShib3hlc19jb3B5Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgbGV0IGJveCA9IGJveGVzX2NvcHkucG9wKCk7XHJcbiAgICAgICAgICBsZXQgcmVjdCA9IHtcclxuICAgICAgICAgICAgd2lkdGg6Ym94LndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6Ym94LmhlaWdodFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3Ryb2tlZF9yZWN0X3JlbmRlcmVyKHRoaXMub2Zmc2NyZWVuX2NvbnRleHQscmVjdCxib3gueCxib3gueSxcIiNGRjAwMDBcIixjYW1lcmEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZih0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5odWQpe1xyXG4gICAgICAgIGxldCBncmFwaGljcyA9IHRoaXMuc3RhdGUuY3VycmVudF9yb29tLmh1ZC5ncmFwaGljX2VsZW1lbnRzO1xyXG4gICAgICAgIGxldCB0ZXh0X2VsZW1lbnRzID0gdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20uaHVkLnRleHRfZWxlbWVudHM7XHJcbiAgICAgICAgZm9yKGxldCBhIG9mIGdyYXBoaWNzKXtcclxuICAgICAgICAgIGxldCByZW5kZXJlZCA9IGEucmVuZGVyX3RyYWNrKHQpO1xyXG4gICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShyZW5kZXJlZCkgJiYgYS5yZW5kZXIpe1xyXG4gICAgICAgICAgICBmb3IobGV0IHBvc2l0aW9uZWRfc3ByaXRlIG9mIHJlbmRlcmVkKXtcclxuICAgICAgICAgICAgICBzcHJpdGVfcmVuZGVyZXIocmVuZGVyX2FyZ3Mse1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlOnBvc2l0aW9uZWRfc3ByaXRlLnNwcml0ZSxcclxuICAgICAgICAgICAgICAgIHg6cG9zaXRpb25lZF9zcHJpdGUueCxcclxuICAgICAgICAgICAgICAgIHk6cG9zaXRpb25lZF9zcHJpdGUueSxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOmEucm90YXRpb25cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZihhLnJlbmRlcil7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSAoPHBvc2l0aW9uZWRfc3ByaXRlPnJlbmRlcmVkKTtcclxuICAgICAgICAgICAgc3ByaXRlX3JlbmRlcmVyKHJlbmRlcl9hcmdzLHtcclxuICAgICAgICAgICAgICBzcHJpdGU6cG9zLnNwcml0ZSxcclxuICAgICAgICAgICAgICB4OnBvcy54LFxyXG4gICAgICAgICAgICAgIHk6cG9zLnksXHJcbiAgICAgICAgICAgICAgcm90YXRpb246YS5yb3RhdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVuZGVyX2FyZ3MuY29udGV4dCA9IHRoaXMuc3RhdGUuY29udGV4dDtcclxuICAgICAgICBmb3IobGV0IGEgb2YgdGV4dF9lbGVtZW50cyl7XHJcbiAgICAgICAgICBsZXQgc3QgPSBhLnN0YXRlO1xyXG4gICAgICAgICAgdGV4dF9yZW5kZXJlcihyZW5kZXJfYXJncyx7XHJcbiAgICAgICAgICAgIHg6c3QucG9zaXRpb24ueCxcclxuICAgICAgICAgICAgeTpzdC5wb3NpdGlvbi55LFxyXG4gICAgICAgICAgICBmb250OmEucmVuZGVyZih0KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdGF0ZS5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLm9mZnNjcmVlbl9jYW52YXMsY2FtZXJhLnN0YXRlLnZpZXdwb3J0LngsY2FtZXJhLnN0YXRlLnZpZXdwb3J0LnkpO1xyXG4gICAgfVxyXG4gICAgaWYoREVCVUcpXHJcbiAgICAgIGJveGVzID0gW107XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKGEpPT57dGhpcy5yZW5kZXIoYSl9KTsgXHJcbiAgfVxyXG4gIHN0YXJ0X2xvZ2ljKGE6bnVtYmVyKXtcclxuICAgIHJldHVybiBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICBsZXQgbmV3X3RpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBsZXQgdGltZV9zaW5jZSA9IG5ld190aW1lLmdldFRpbWUoKSAtIGxhc3RfdGltZS5nZXRUaW1lKCk7XHJcbiAgICAgIGxhc3RfdGltZSA9IG5ld190aW1lO1xyXG4gICAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5zdGF0ZWYodGltZV9zaW5jZSk7XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUuY3VycmVudF9yb29tLmh1ZCl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20uaHVkLnN0YXRlZih0aW1lX3NpbmNlKTtcclxuICAgICAgfVxyXG4gICAgICAgIEV4ZWN1dGVSZXBlYXRCaW5kcyhhKTtcclxuICAgIH0sYSk7XHJcbiAgfVxyXG4gIGdldFJvb20oKXtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbTtcclxuICB9XHJcbiAgYXN5bmMgbG9hZFJvb20oeDpyb29tPHVua25vd24+KXtcclxuICAgIHguaHVkID0geC5yZWdpc3RlckhVRCgpO1xyXG4gICAgaWYodGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20gIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgIHdoaWxlKHRoaXMuc3RhdGUuY3VycmVudF9yb29tLm9iamVjdHMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20ub2JqZWN0c1swXS5kZWxldGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IG5ld19yb29tID0gYXdhaXQgeC5sb2FkKCk7XHJcbiAgICB4LnJlZ2lzdGVyX2NvbnRyb2xzKCk7XHJcbiAgICB4LnJlZ2lzdGVyUGFydGljbGVzKCk7XHJcbiAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbSA9IHg7XHJcbiAgICBpZih0aGlzLnN0YXRlLmxvZ2ljICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5sb2dpYyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlLmxvZ2ljID0gdGhpcy5zdGFydF9sb2dpYyhsb2dpY19sb29wX2ludGVydmFsKVxyXG4gICAgdGhpcy5yZW5kZXIoMCk7XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgZ2FtZV9pbnN0ID0gbmV3IGdhbWUoY29udGV4dCxuZXcgT3ZlcndvcmxkKCkgICk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2FtZSgpe1xyXG4gIHJldHVybiBnYW1lX2luc3Q7XHJcbn0iLCJpbXBvcnQge3BpZWNlLHNpZGUscGllY2VfdHlwZX0gZnJvbSBcIi4vcGllY2VcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcbmltcG9ydCB7Qm9hcmR9IGZyb20gXCIuLi9yb29tcy9ib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJpc2hvcCBleHRlbmRzIHBpZWNle1xyXG4gIHNwcml0ZV91cmwgPSBcIi4vc3ByaXRlcy9iaXNob3AucG5nXCJcclxuICBjb25zdHJ1Y3Rvcihwb3M6W251bWJlcixudW1iZXJdLHNpZGU6c2lkZSl7XHJcbiAgICBzdXBlcihwb3Msc2lkZSxwaWVjZV90eXBlLmJpc2hvcCk7XHJcbiAgfVxyXG4gIGdldEF0dGFja2luZygpOkFycmF5PFtudW1iZXIsbnVtYmVyXT57XHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2tEaWFnb25hbCgpO1xyXG4gIH1cclxufSIsImltcG9ydCB7cGllY2Usc2lkZSxwaWVjZV90eXBlfSBmcm9tIFwiLi9waWVjZVwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSBcIi4uL3Jvb21zL2JvYXJkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2luZyBleHRlbmRzIHBpZWNle1xyXG4gIHNwcml0ZV91cmwgPSBcIi4vc3ByaXRlcy9raW5nLnBuZ1wiXHJcbiAgY29uc3RydWN0b3IocG9zOltudW1iZXIsbnVtYmVyXSxzaWRlOnNpZGUpe1xyXG4gICAgc3VwZXIocG9zLHNpZGUscGllY2VfdHlwZS5raW5nKTtcclxuICB9XHJcbiAgY2hlY2tfbGVmdF9jYXN0bGUocm9vbTpCb2FyZCxjb3JkczpbbnVtYmVyLG51bWJlcl0pe1xyXG4gICAgaWYoIXRoaXMuc3RhdGUuaGFzX21vdmVkICYmIHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSAtIDEsY29yZHNbMV1dKS5sZW5ndGggPT0gMCAmJiByb29tLmdldF9waWVjZShbY29yZHNbMF0gLSAyLGNvcmRzWzFdXSkubGVuZ3RoID09IDAgJiYgcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdIC0gMywgY29yZHNbMV1dKS5sZW5ndGggPT0gMCl7XHJcbiAgICAgIGxldCByb29rID0gcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdIC0gNCxjb3Jkc1sxXV0pO1xyXG4gICAgICBpZihyb29rLmxlbmd0aCA+IDAgJiYgIXJvb2tbMF0uc3RhdGUuaGFzX21vdmVkKXtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBjaGVja19yaWdodF9jYXN0bGUocm9vbTpCb2FyZCxjb3JkczpbbnVtYmVyLG51bWJlcl0pe1xyXG4gICAgaWYoIXRoaXMuc3RhdGUuaGFzX21vdmVkICYmIHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSArIDEsY29yZHNbMV1dKS5sZW5ndGggPT0gMCAmJiByb29tLmdldF9waWVjZShbY29yZHNbMF0gKyAyLGNvcmRzWzFdXSkubGVuZ3RoID09IDApe1xyXG4gICAgICBsZXQgcm9vayA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSArIDMsY29yZHNbMV1dKTtcclxuICAgICAgaWYocm9vay5sZW5ndGggPiAwICYmICFyb29rWzBdLnN0YXRlLmhhc19tb3ZlZCl7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgZ2V0QXR0YWNraW5nKCk6QXJyYXk8W251bWJlcixudW1iZXJdPntcclxuICAgIGxldCBjb3JkcyA9IHRoaXMuZ2V0Q29yZHMoKTtcclxuICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKSBhcyBCb2FyZDtcclxuICAgIGxldCBhdHRhY2tlZDpBcnJheTxbbnVtYmVyLG51bWJlcl0+ID0gW107XHJcbiAgICBmb3IobGV0IHggPSAtMTt4IDw9IDE7IHgrKyl7XHJcbiAgICAgIGZvcihsZXQgeSA9IC0xO3kgPD0gMTsgeSsrKXtcclxuICAgICAgICBpZigoeCAhPT0gMCB8fCB5ICE9PSAwKSAmJiBjb3Jkc1swXSArIHggPj0gMCAmJiBjb3Jkc1swXSArIHggPCA4ICYmIGNvcmRzWzFdICsgeSA+PSAwICYmIGNvcmRzWzFdICsgeSA8IDgpe1xyXG4gICAgICAgICAgbGV0IHBpZWNlID0gcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdICsgeCwgY29yZHNbMV0gKyB5XSk7XHJcbiAgICAgICAgICBsZXQgc2FmZSA9IHRydWU7XHJcbiAgICAgICAgICBpZihzYWZlICYmIHBpZWNlLmxlbmd0aCA9PT0gMCB8fCBwaWVjZVswXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSArIHgsIGNvcmRzWzFdICsgeV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9jYXN0bGUgY2hlY2sgbGVmdFxyXG4gICAgaWYodGhpcy5jaGVja19sZWZ0X2Nhc3RsZShyb29tLGNvcmRzKSl7XHJcbiAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdIC0gMixjb3Jkc1sxXV0pO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5jaGVja19yaWdodF9jYXN0bGUocm9vbSxjb3Jkcykpe1xyXG4gICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSArIDIsY29yZHNbMV1dKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhdHRhY2tlZDtcclxuICB9XHJcbn0iLCJpbXBvcnQge3BpZWNlLHNpZGUscGllY2VfdHlwZX0gZnJvbSBcIi4vcGllY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLbmlnaHQgZXh0ZW5kcyBwaWVjZXtcclxuICBzcHJpdGVfdXJsID0gXCIuL3Nwcml0ZXMva25pZ2h0LnBuZ1wiXHJcbiAgY29uc3RydWN0b3IocG9zOltudW1iZXIsbnVtYmVyXSxzaWRlOnNpZGUpe1xyXG4gICAgc3VwZXIocG9zLHNpZGUscGllY2VfdHlwZS5rbmlnaHQpO1xyXG4gIH1cclxuICBnZXRBdHRhY2tpbmcoKTpBcnJheTxbbnVtYmVyLG51bWJlcl0+e1xyXG4gICAgbGV0IGNvcmRzID0gdGhpcy5nZXRDb3JkcygpO1xyXG4gICAgbGV0IGF0dGFja2VkOkFycmF5PFtudW1iZXIsbnVtYmVyXT4gPSBbXTtcclxuICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdICsgMSxjb3Jkc1sxXSArIDJdKTtcclxuICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdIC0gMSxjb3Jkc1sxXSArIDJdKTtcclxuICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdICsgMixjb3Jkc1sxXSArIDFdKTtcclxuICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdICsgMixjb3Jkc1sxXSAtIDFdKTtcclxuICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdICsgMSxjb3Jkc1sxXSAtIDJdKTtcclxuICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdIC0gMSxjb3Jkc1sxXSAtIDJdKTtcclxuICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdIC0gMixjb3Jkc1sxXSArIDFdKTtcclxuICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdIC0gMixjb3Jkc1sxXSAtIDFdKTtcclxuICAgIHJldHVybihhdHRhY2tlZC5maWx0ZXIoKHgpPT54WzBdID49IDAgJiYgeFswXSA8IDggJiYgeFsxXSA+PSAwICYmIHhbMV0gPCA4KSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtvYmp9IGZyb20gXCIuLi8uLi9saWIvb2JqZWN0XCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5pbXBvcnQge0JvYXJkLHNpZGV9IGZyb20gXCIuLi9yb29tcy9ib2FyZFwiO1xyXG5pbXBvcnQge3BpZWNlLHBpZWNlX3R5cGV9IGZyb20gXCIuL3BpZWNlXCI7XHJcbmltcG9ydCB7IFF1ZWVuIH0gZnJvbSBcIi4vcXVlZW5cIjtcclxuaW1wb3J0IHsgZXhlY190eXBlIH0gZnJvbSBcIi4uLy4uL2xpYi9jb250cm9sc1wiO1xyXG5cclxuaW50ZXJmYWNlIG1vdmVfc3RhdGV7XHJcbiAgcG9zaXRpb246e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIG1vdmUgZXh0ZW5kcyBvYmo8bW92ZV9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybD1cIi4vc3ByaXRlcy9hdHRhY2tlZC5wbmdcIjtcclxuICBoZWlnaHQgPSAxMDA7XHJcbiAgd2lkdGggPSAxMDA7XHJcbiAgcmVuZGVyID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoYTpbbnVtYmVyLG51bWJlcl0pe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4OihhWzBdIC00KSAqIHRoaXMud2lkdGggKyB0aGlzLndpZHRoLzIsXHJcbiAgICAgICAgeTooYVsxXSAtNCkgKiB0aGlzLmhlaWdodCArIHRoaXMuaGVpZ2h0LzJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDb3JkcygpOltudW1iZXIsbnVtYmVyXXtcclxuICAgIGxldCB4ID0gKHRoaXMuc3RhdGUucG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMikvMTAwICsgNDtcclxuICAgIGxldCB5ID0gKHRoaXMuc3RhdGUucG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzIpLzEwMCArIDQ7XHJcbiAgICByZXR1cm4gW3gseV07XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCl7XHJcbiAgICB0aGlzLmJpbmRfY29udHJvbChcIm1vdXNlMVwiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIGlmKHRoaXMucmVuZGVyKXtcclxuICAgICAgICBsZXQgcm9vbSA9IGdldEdhbWUoKS5zdGF0ZS5jdXJyZW50X3Jvb20gYXMgQm9hcmQ7XHJcbiAgICAgICAgbGV0IHAgPSByb29tLmdldF9waWVjZSh0aGlzLmdldENvcmRzKCkpIGFzIHBpZWNlW107XHJcbiAgICAgICAgbGV0IHMgPSByb29tLnN0YXRlLnNlbGVjdGVkO1xyXG4gICAgICAgIGlmKHMuc3RhdGUudHlwZSA9PT0gcGllY2VfdHlwZS5raW5nICYmICFzLnN0YXRlLmhhc19tb3ZlZCAmJiB0aGlzLmdldENvcmRzKClbMF0gPT09IDYpe1xyXG4gICAgICAgICAgbGV0IHJvb2tzID0gcm9vbS5nZXRfcGllY2UoWzcscy5nZXRDb3JkcygpWzFdXSk7XHJcbiAgICAgICAgICByb29rc1swXS5tb3ZldG9Db3JkcyhbNSxzLmdldENvcmRzKClbMV1dKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocy5zdGF0ZS50eXBlID09PSBwaWVjZV90eXBlLmtpbmcgJiYgIXMuc3RhdGUuaGFzX21vdmVkICYmIHRoaXMuZ2V0Q29yZHMoKVswXSA9PT0gMil7XHJcbiAgICAgICAgICBsZXQgcm9va3MgPSByb29tLmdldF9waWVjZShbMCxzLmdldENvcmRzKClbMV1dKTtcclxuICAgICAgICAgIHJvb2tzWzBdLm1vdmV0b0NvcmRzKFszLHMuZ2V0Q29yZHMoKVsxXV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzLnN0YXRlLnR5cGUgPT09IHBpZWNlX3R5cGUucGF3biAmJiAhcy5zdGF0ZS5oYXNfbW92ZWQgJiYgcy5zdGF0ZS5zaWRlID09PSBzaWRlLndoaXRlICYmIHRoaXMuZ2V0Q29yZHMoKVsxXSA9PT0gMyl7XHJcbiAgICAgICAgICByb29tLnN0YXRlLndoaXRlX2JvYXJkW3RoaXMuZ2V0Q29yZHMoKVswXV1bdGhpcy5nZXRDb3JkcygpWzFdIC0gMV0uZW5wYXNzZW50ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocy5zdGF0ZS50eXBlID09PSBwaWVjZV90eXBlLnBhd24gJiYgIXMuc3RhdGUuaGFzX21vdmVkICYmIHMuc3RhdGUuc2lkZSA9PT0gc2lkZS5ibGFjayAmJiB0aGlzLmdldENvcmRzKClbMV0gPT09IDQpe1xyXG4gICAgICAgICAgcm9vbS5zdGF0ZS5ibGFja19ib2FyZFt0aGlzLmdldENvcmRzKClbMF1dW3RoaXMuZ2V0Q29yZHMoKVsxXSArIDFdLmVucGFzc2VudCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHMuc3RhdGUudHlwZSA9PT0gcGllY2VfdHlwZS5wYXduICYmIHMuc3RhdGUuc2lkZSA9PSBzaWRlLmJsYWNrICYmIHJvb20uZ2V0X21ldGEodGhpcy5nZXRDb3JkcygpLHNpZGUud2hpdGUpLmVucGFzc2VudCl7XHJcbiAgICAgICAgICBsZXQgZiA9IHJvb20uZ2V0X3BpZWNlKFt0aGlzLmdldENvcmRzKClbMF0sdGhpcy5nZXRDb3JkcygpWzFdICsgMV0pO1xyXG4gICAgICAgICAgcm9vbS5yZW1vdmVfcGllY2UoZlswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHMuc3RhdGUudHlwZSA9PT0gcGllY2VfdHlwZS5wYXduICYmIHMuc3RhdGUuc2lkZSA9PSBzaWRlLndoaXRlICYmIHJvb20uZ2V0X21ldGEodGhpcy5nZXRDb3JkcygpLHNpZGUuYmxhY2spLmVucGFzc2VudCl7XHJcbiAgICAgICAgICBsZXQgZiA9IHJvb20uZ2V0X3BpZWNlKFt0aGlzLmdldENvcmRzKClbMF0sdGhpcy5nZXRDb3JkcygpWzFdIC0gMV0pO1xyXG4gICAgICAgICAgcm9vbS5yZW1vdmVfcGllY2UoZlswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHMuc3RhdGUuaGFzX21vdmVkID0gdHJ1ZTtcclxuICAgICAgICBpZihwLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgcm9vbS5yZW1vdmVfcGllY2UocFswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCh0aGlzLmdldENvcmRzKClbMV0gPT0gNyB8fCB0aGlzLmdldENvcmRzKClbMV0gPT0gMCkgJiYgcy5zdGF0ZS50eXBlID09PSBwaWVjZV90eXBlLnBhd24pe1xyXG4gICAgICAgICAgbGV0IHF1ID0gbmV3IFF1ZWVuKHRoaXMuZ2V0Q29yZHMoKSxzLnN0YXRlLnNpZGUpO1xyXG4gICAgICAgICAgcXUubG9hZCgpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgcm9vbS5hZGRfcGllY2UocXUpO1xyXG4gICAgICAgICAgICByb29tLnJlbW92ZV9waWVjZShzKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHMuc3RhdGUuc2lkZSA9PT0gc2lkZS53aGl0ZSl7XHJcbiAgICAgICAgICByb29tLmNoYW5nZV9zaWRlKHNpZGUuYmxhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHMuc3RhdGUuc2lkZSA9PT0gc2lkZS5ibGFjayl7XHJcbiAgICAgICAgICByb29tLmNoYW5nZV9zaWRlKHNpZGUud2hpdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb29tLmNsZWFyX2F0dGFja2VkKCk7XHJcbiAgICAgICAgcm9vbS5zdGF0ZS5zZWxlY3RlZC5tb3ZldG9Db3Jkcyh0aGlzLmdldENvcmRzKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJvb20uc3RhdGUuYXR0YWNrZWQgPSBbXTtcclxuICAgICAgICByb29tLnN0YXRlLnNlbGVjdGVkID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufSIsImltcG9ydCB7cGllY2Usc2lkZSxwaWVjZV90eXBlfSBmcm9tIFwiLi9waWVjZVwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSBcIi4uL3Jvb21zL2JvYXJkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGF3biBleHRlbmRzIHBpZWNle1xyXG4gIHNwcml0ZV91cmwgPSBcIi4vc3ByaXRlcy9wYXduLnBuZ1wiXHJcbiAgY29uc3RydWN0b3IocG9zOltudW1iZXIsbnVtYmVyXSxzaWRlOnNpZGUpe1xyXG4gICAgc3VwZXIocG9zLHNpZGUscGllY2VfdHlwZS5wYXduKTtcclxuICB9XHJcbiAgZ2V0QXR0YWNraW5nKCk6QXJyYXk8W251bWJlcixudW1iZXJdPntcclxuICAgIGxldCBhdHRhY2tlZDpBcnJheTxbbnVtYmVyLG51bWJlcl0+ID0gW107XHJcbiAgICBsZXQgY29yZHMgPSB0aGlzLmdldENvcmRzKCk7XHJcbiAgICBsZXQgcm9vbSA9IGdldEdhbWUoKS5nZXRSb29tKCkgYXMgQm9hcmQ7XHJcbiAgICBpZih0aGlzLnN0YXRlLnNpZGUgPT0gc2lkZS53aGl0ZSl7XHJcbiAgICAgIGlmKHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSxjb3Jkc1sxXSArIDFdKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdLGNvcmRzWzFdICsgMV0pO1xyXG4gICAgICAgIGlmKCF0aGlzLnN0YXRlLmhhc19tb3ZlZCAmJiByb29tLmdldF9waWVjZShbY29yZHNbMF0sY29yZHNbMV0gKyAyXSkubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdLGNvcmRzWzFdICsgMl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBsZXQgbGVmdF9jb3JkczpbbnVtYmVyLG51bWJlcl0gPSBbY29yZHNbMF0tIDEsY29yZHNbMV0gKyAxXTtcclxuICAgICAgbGV0IHJpZ2h0X2NvcmRzOltudW1iZXIsbnVtYmVyXSA9IFtjb3Jkc1swXSsgMSxjb3Jkc1sxXSArIDFdOyBcclxuICAgICAgbGV0IGxlZnQgPSByb29tLmdldF9waWVjZShsZWZ0X2NvcmRzKTtcclxuICAgICAgbGV0IHJpZ2h0ID0gcm9vbS5nZXRfcGllY2UocmlnaHRfY29yZHMpO1xyXG4gICAgICBsZXQgbGVmdF9lbiA9IHJvb20uZ2V0X21ldGEobGVmdF9jb3JkcyxzaWRlLmJsYWNrKTtcclxuICAgICAgbGV0IHJpZ2h0X2VuID0gcm9vbS5nZXRfbWV0YShyaWdodF9jb3JkcyxzaWRlLmJsYWNrKTtcclxuICAgICAgaWYoKGNvcmRzWzBdIC0gMSA+PSAwKSAmJiAoKGxlZnQubGVuZ3RoID4gMCAmJiBsZWZ0WzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSkgfHwgKGxlZnRfZW4gJiYgbGVmdF9lbi5lbnBhc3NlbnQpKSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChsZWZ0X2NvcmRzKTtcclxuICAgICAgfVxyXG4gICAgICBpZigoY29yZHNbMF0gKyAxIDwgOCkgJiYgKChyaWdodC5sZW5ndGggPiAwICYmIHJpZ2h0WzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSkgfHwgKHJpZ2h0X2VuICYmIHJpZ2h0X2VuLmVucGFzc2VudCkpKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKHJpZ2h0X2NvcmRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmKHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSxjb3Jkc1sxXSAtIDFdKS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdLGNvcmRzWzFdIC0gMV0pO1xyXG4gICAgICAgIGlmKCF0aGlzLnN0YXRlLmhhc19tb3ZlZCAmJiByb29tLmdldF9waWVjZShbY29yZHNbMF0sY29yZHNbMV0gLSAyXSkubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdLGNvcmRzWzFdIC0gMl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBsZXQgbGVmdF9jb3JkczpbbnVtYmVyLG51bWJlcl0gPSBbY29yZHNbMF0gLSAxLGNvcmRzWzFdIC0gMV07XHJcbiAgICAgIGxldCByaWdodF9jb3JkczpbbnVtYmVyLG51bWJlcl0gPSBbY29yZHNbMF0rIDEsY29yZHNbMV0gLSAxXTtcclxuICAgICAgbGV0IGxlZnQgPSByb29tLmdldF9waWVjZShsZWZ0X2NvcmRzKTtcclxuICAgICAgbGV0IHJpZ2h0ID0gcm9vbS5nZXRfcGllY2UocmlnaHRfY29yZHMpO1xyXG4gICAgICBsZXQgbGVmdF9lbiA9IHJvb20uZ2V0X21ldGEobGVmdF9jb3JkcyxzaWRlLndoaXRlKTtcclxuICAgICAgbGV0IHJpZ2h0X2VuID0gcm9vbS5nZXRfbWV0YShyaWdodF9jb3JkcyxzaWRlLndoaXRlKTtcclxuICAgICAgaWYoKGNvcmRzWzBdIC0gMSA+PSAwKSAmJiAoKGxlZnQubGVuZ3RoID4gMCAmJiBsZWZ0WzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSkgfHwgKGxlZnRfZW4gJiYgbGVmdF9lbi5lbnBhc3NlbnQpKSl7XHJcbiAgICAgICAgYXR0YWNrZWQucHVzaChsZWZ0X2NvcmRzKTtcclxuICAgICAgfVxyXG4gICAgICBpZigoY29yZHNbMF0gKyAxIDwgOCkgJiYgKChyaWdodC5sZW5ndGggPiAwICYmIHJpZ2h0WzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSkgfHwgKHJpZ2h0X2VuICYmIHJpZ2h0X2VuLmVucGFzc2VudCkpKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKHJpZ2h0X2NvcmRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0dGFja2VkO1xyXG4gIH1cclxufSIsImltcG9ydCB7b2JqfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge3Bvc2l0aW9uZWRfc3ByaXRlLCBzcHJpdGUsc3ByaXRlX2dlbn0gZnJvbSBcIi4uLy4uL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHtib2FyZF9zdGF0ZSwgQm9hcmR9IGZyb20gXCIuLi9yb29tcy9ib2FyZFwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuaW1wb3J0IHsgVW5iaW5kLCBleGVjX3R5cGUgfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5leHBvcnQgZW51bSBzaWRle1xyXG4gIHdoaXRlLFxyXG4gIGJsYWNrXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIHBpZWNlX3R5cGV7XHJcbiAgcGF3bixcclxuICByb29rLFxyXG4gIGJpc2hvcCxcclxuICBxdWVlbixcclxuICBraW5nLFxyXG4gIGtuaWdodFxyXG59XHJcblxyXG5pbnRlcmZhY2UgcGllY2Vfc3RhdGV7XHJcbiAgcG9zaXRpb246e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH0sXHJcbiAgc2lkZTpzaWRlLFxyXG4gIHR5cGU6cGllY2VfdHlwZSxcclxuICBoYXNfbW92ZWQ6Ym9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgcGllY2UgZXh0ZW5kcyBvYmo8cGllY2Vfc3RhdGU+e1xyXG4gIGhlaWdodCA9IDEwMDtcclxuICB3aWR0aCA9IDEwMDtcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKHBvczpbbnVtYmVyLG51bWJlcl0sc2lkZTpzaWRlLHR5cGU6cGllY2VfdHlwZSl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6KHBvc1swXSAtNCkgKiB0aGlzLndpZHRoICsgdGhpcy53aWR0aC8yLFxyXG4gICAgICAgIHk6KHBvc1sxXSAtNCkgKiB0aGlzLmhlaWdodCArIHRoaXMuaGVpZ2h0LzJcclxuICAgICAgfSxcclxuICAgICAgc2lkZSxcclxuICAgICAgdHlwZSxcclxuICAgICAgaGFzX21vdmVkOmZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG4gIG1vdmV0b0NvcmRzKGE6W251bWJlcixudW1iZXJdKXtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueCA9IChhWzBdIC00KSAqIHRoaXMud2lkdGggKyB0aGlzLndpZHRoLzI7XHJcbiAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnkgPSAoYVsxXSAtNCkgKiB0aGlzLmhlaWdodCArIHRoaXMuaGVpZ2h0LzI7XHJcbiAgfVxyXG4gIGdldENvcmRzKCk6W251bWJlcixudW1iZXJde1xyXG4gICAgbGV0IHggPSAodGhpcy5zdGF0ZS5wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yKS8xMDAgKyA0O1xyXG4gICAgbGV0IHkgPSAodGhpcy5zdGF0ZS5wb3NpdGlvbi55IC0gdGhpcy5oZWlnaHQvMikvMTAwICsgNDtcclxuICAgIHJldHVybiBbeCx5XTtcclxuICB9XHJcbiAgZ2V0QXR0YWNraW5nKCk6QXJyYXk8W251bWJlcixudW1iZXJdPntcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcbiAgcmVuZGVyZih0Om51bWJlcik6cG9zaXRpb25lZF9zcHJpdGV7XHJcbiAgICBsZXQgc3ByaXRlcyA9IHNwcml0ZV9nZW4odGhpcy5zcHJpdGVfc2hlZXQsdGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICBpZih0aGlzLnN0YXRlLnNpZGUgPT09IHNpZGUud2hpdGUpe1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNwcml0ZTpzcHJpdGVzWzBdWzBdLFxyXG4gICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNwcml0ZTpzcHJpdGVzWzBdWzFdLFxyXG4gICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG4gIGF0dGFja0RpYWdvbmFsKCl7XHJcbiAgICBsZXQgY29yZHMgPSB0aGlzLmdldENvcmRzKCk7XHJcbiAgICBsZXQgcm9vbSA9IGdldEdhbWUoKS5nZXRSb29tKCkgYXMgQm9hcmQ7XHJcbiAgICBsZXQgYXR0YWNrZWQ6QXJyYXk8W251bWJlcixudW1iZXJdPiA9IFtdO1xyXG4gICAgZm9yKGxldCBhID0gMTthIDwgODthKyspe1xyXG4gICAgICBpZihjb3Jkc1swXSAtIGEgPj0gMCAmJiBjb3Jkc1swXSAtIGEgPCA4ICYmIGNvcmRzWzFdIC0gYSA+PSAwICYmIGNvcmRzWzFdIC0gYSA8IDgpe1xyXG4gICAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0gLSBhLGNvcmRzWzFdIC0gYV0pO1xyXG4gICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdIC0gYSxjb3Jkc1sxXSAtIGFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGllY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICBcclxuICAgIH1cclxuICAgIGZvcihsZXQgYSA9IDE7YSA8IDg7YSsrKXtcclxuICAgICAgaWYoY29yZHNbMF0gLSBhID49IDAgJiYgY29yZHNbMF0gLSBhIDwgOCAmJiBjb3Jkc1sxXSArIGEgPj0gMCAmJiBjb3Jkc1sxXSArIGEgPCA4KXtcclxuICAgICAgICBsZXQgcGllY2VzID0gcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdIC0gYSxjb3Jkc1sxXSArIGFdKTtcclxuICAgICAgICBpZihwaWVjZXMubGVuZ3RoID09IDAgfHwgcGllY2VzWzBdLnN0YXRlLnNpZGUgIT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSAtIGEsY29yZHNbMV0gKyBhXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSAgXHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGEgPSAxO2EgPCA4O2ErKyl7XHJcbiAgICAgIGlmKGNvcmRzWzBdICsgYSA+PSAwICYmIGNvcmRzWzBdICsgYSA8IDggJiYgY29yZHNbMV0gKyBhID49IDAgJiYgY29yZHNbMV0gKyBhIDwgOCl7XHJcbiAgICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKFtjb3Jkc1swXSArIGEsY29yZHNbMV0gKyBhXSk7XHJcbiAgICAgICAgaWYocGllY2VzLmxlbmd0aCA9PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgICAgYXR0YWNrZWQucHVzaChbY29yZHNbMF0gKyBhLGNvcmRzWzFdICsgYV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9ICBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBhID0gMTthIDwgODthKyspe1xyXG4gICAgICBpZihjb3Jkc1swXSArIGEgPj0gMCAmJiBjb3Jkc1swXSArIGEgPCA4ICYmIGNvcmRzWzFdIC0gYSA+PSAwICYmIGNvcmRzWzFdIC0gYSA8IDgpe1xyXG4gICAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0gKyBhLGNvcmRzWzFdIC0gYV0pO1xyXG4gICAgICAgIGlmKHBpZWNlcy5sZW5ndGggPT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdICsgYSxjb3Jkc1sxXSAtIGFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGllY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfSAgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhdHRhY2tlZDtcclxuICB9XHJcbiAgYXR0YWNrQ2FyZGluYWwoKXtcclxuICAgIGxldCBjb3JkcyA9IHRoaXMuZ2V0Q29yZHMoKTtcclxuICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKSBhcyBCb2FyZDtcclxuICAgIGxldCBhdHRhY2tlZDpBcnJheTxbbnVtYmVyLG51bWJlcl0+ID0gW107XHJcbiAgICBmb3IobGV0IGEgPSBjb3Jkc1swXSAtIDE7YSA+PSAwO2EtLSl7XHJcbiAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShbYSxjb3Jkc1sxXV0pO1xyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID09PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2goW2EsY29yZHNbMV1dKTtcclxuICAgICAgfVxyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZvcihsZXQgYSA9IGNvcmRzWzBdICsgMTthIDwgODthKyspe1xyXG4gICAgICBsZXQgcGllY2VzID0gcm9vbS5nZXRfcGllY2UoW2EsY29yZHNbMV1dKTtcclxuICAgICAgaWYocGllY2VzLmxlbmd0aCA9PT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKFthLGNvcmRzWzFdXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYocGllY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGEgPSBjb3Jkc1sxXSAtIDE7YSA+PSAwO2EtLSl7XHJcbiAgICAgIGxldCBwaWVjZXMgPSByb29tLmdldF9waWVjZShbY29yZHNbMF0sYV0pO1xyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID09PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgIGF0dGFja2VkLnB1c2goW2NvcmRzWzBdLGFdKTtcclxuICAgICAgfVxyXG4gICAgICBpZihwaWVjZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZvcihsZXQgYSA9IGNvcmRzWzFdICsgMTthIDwgODthKyspe1xyXG4gICAgICBsZXQgcGllY2VzID0gcm9vbS5nZXRfcGllY2UoW2NvcmRzWzBdLGFdKTtcclxuICAgICAgaWYocGllY2VzLmxlbmd0aCA9PT0gMCB8fCBwaWVjZXNbMF0uc3RhdGUuc2lkZSAhPT0gdGhpcy5zdGF0ZS5zaWRlKXtcclxuICAgICAgICBhdHRhY2tlZC5wdXNoKFtjb3Jkc1swXSxhXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYocGllY2VzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXR0YWNrZWQ7XHJcbiAgfVxyXG4gIHVuYmluZF9jb250cm9scygpe1xyXG4gICAgZm9yKGxldCBhIG9mIHRoaXMuYmluZHMpe1xyXG4gICAgICBVbmJpbmQoYSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGJpbmRfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZF9jb250cm9sKFwibW91c2UxXCIsZXhlY190eXBlLm9uY2UsKCk9PntcclxuICAgICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuc3RhdGUuY3VycmVudF9yb29tIGFzIEJvYXJkO1xyXG4gICAgICBpZihyb29tLnN0YXRlLnR1cm4gPT09IHRoaXMuc3RhdGUuc2lkZSl7XHJcbiAgICAgICAgcm9vbS5zdGF0ZS5zZWxlY3RlZCA9IHRoaXM7XHJcbiAgICAgICAgcm9vbS5jbGVhcl9hdHRhY2tlZCgpO1xyXG4gICAgICAgIGxldCB2YWxpZF9hdHRhY2tlZCA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgZyBvZiB0aGlzLmdldEF0dGFja2luZygpKXtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgbGV0IHBpZWNlcyA9IHJvb20uZ2V0X3BpZWNlKGcpO1xyXG4gICAgICAgICAgaWYocGllY2VzLmxlbmd0aCA9PSAwIHx8IHBpZWNlc1swXS5zdGF0ZS5zaWRlICE9PSB0aGlzLnN0YXRlLnNpZGUpe1xyXG4gICAgICAgICAgICB2YWxpZF9hdHRhY2tlZC5wdXNoKGcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByb29tLnN0YXRlLmF0dGFja2VkID0gdmFsaWRfYXR0YWNrZWQ7XHJcbiAgICAgICAgcm9vbS5hdHRhY2sodmFsaWRfYXR0YWNrZWQpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufSIsImltcG9ydCB7cGllY2Usc2lkZSxwaWVjZV90eXBlfSBmcm9tIFwiLi9waWVjZVwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuaW1wb3J0IHtCb2FyZH0gZnJvbSBcIi4uL3Jvb21zL2JvYXJkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlZW4gZXh0ZW5kcyBwaWVjZXtcclxuICBzcHJpdGVfdXJsID0gXCIuL3Nwcml0ZXMvcXVlZW4ucG5nXCJcclxuICBjb25zdHJ1Y3Rvcihwb3M6W251bWJlcixudW1iZXJdLHNpZGU6c2lkZSl7XHJcbiAgICBzdXBlcihwb3Msc2lkZSxwaWVjZV90eXBlLnF1ZWVuKTtcclxuICB9XHJcbiAgZ2V0QXR0YWNraW5nKCk6QXJyYXk8W251bWJlcixudW1iZXJdPntcclxuICAgIHJldHVybiB0aGlzLmF0dGFja0RpYWdvbmFsKCkuY29uY2F0KHRoaXMuYXR0YWNrQ2FyZGluYWwoKSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtwaWVjZSxzaWRlLHBpZWNlX3R5cGV9IGZyb20gXCIuL3BpZWNlXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uLy4uL3ZhblwiO1xyXG5pbXBvcnQge0JvYXJkfSBmcm9tIFwiLi4vcm9vbXMvYm9hcmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSb29rIGV4dGVuZHMgcGllY2V7XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL3Jvb2sucG5nXCJcclxuICBjb25zdHJ1Y3Rvcihwb3M6W251bWJlcixudW1iZXJdLHNpZGU6c2lkZSl7XHJcbiAgICBzdXBlcihwb3Msc2lkZSxwaWVjZV90eXBlLnJvb2spO1xyXG4gIH1cclxuICBnZXRBdHRhY2tpbmcoKTpBcnJheTxbbnVtYmVyLG51bWJlcl0+e1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0YWNrQ2FyZGluYWwoKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge3Jvb20scm9vbV9pfSBmcm9tIFwiLi4vLi4vbGliL3Jvb21cIjtcclxuaW1wb3J0IHtwaWVjZX0gZnJvbSBcIi4uLy4uL3Zhbl9jaGVzcy9vYmplY3RzL3BpZWNlXCI7XHJcbmltcG9ydCB7S25pZ2h0fSBmcm9tIFwiLi4vLi4vdmFuX2NoZXNzL29iamVjdHMva25pZ2h0XCI7XHJcbmltcG9ydCB7Um9va30gZnJvbSBcIi4uLy4uL3Zhbl9jaGVzcy9vYmplY3RzL3Jvb2tcIjtcclxuaW1wb3J0IHttb3ZlfSBmcm9tIFwiLi4vLi4vdmFuX2NoZXNzL29iamVjdHMvbW92ZVwiO1xyXG5pbXBvcnQge29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHsgQmlzaG9wIH0gZnJvbSBcIi4uLy4uL3Zhbl9jaGVzcy9vYmplY3RzL2Jpc2hvcFwiO1xyXG5pbXBvcnQgeyBRdWVlbiB9IGZyb20gXCIuLi8uLi92YW5fY2hlc3Mvb2JqZWN0cy9xdWVlblwiO1xyXG5pbXBvcnQgeyBLaW5nIH0gZnJvbSBcIi4uLy4uL3Zhbl9jaGVzcy9vYmplY3RzL2tpbmdcIjtcclxuaW1wb3J0IHsgUGF3biB9IGZyb20gXCIuLi8uLi92YW5fY2hlc3Mvb2JqZWN0cy9wYXduXCI7XHJcbmltcG9ydCB7IGdldEdhbWUsIEdldFZpZXdwb3J0RGltZW5zaW9ucyB9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmV4cG9ydCBlbnVtIHNpZGV7XHJcbiAgd2hpdGUsXHJcbiAgYmxhY2tcclxufVxyXG5cclxuaW50ZXJmYWNlIHNwYWNlX3N0YXRle1xyXG4gIGVucGFzc2VudDpib29sZWFuLFxyXG4gIGF0dGFja2VkOmJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBib2FyZF9zdGF0ZXtcclxuICB0dXJuOnNpZGUsXHJcbiAgd2hpdGVfYm9hcmQ6QXJyYXk8QXJyYXk8c3BhY2Vfc3RhdGU+PixcclxuICBibGFja19ib2FyZDpBcnJheTxBcnJheTxzcGFjZV9zdGF0ZT4+XHJcbiAgc2VsZWN0ZWQ6cGllY2UsXHJcbiAgc3F1YXJlczpBcnJheTxBcnJheTxtb3ZlPj4sXHJcbiAgcGllY2VzOkFycmF5PHBpZWNlPixcclxuICBhdHRhY2tlZDpBcnJheTxbbnVtYmVyLG51bWJlcl0+XHJcbn1cclxuZXhwb3J0IGNsYXNzIEJvYXJkIGV4dGVuZHMgcm9vbTxib2FyZF9zdGF0ZT57XHJcbiAgYmFja2dyb3VuZF91cmw9XCIuL3Nwcml0ZXMvYm9hcmQucG5nXCI7XHJcbiAgb2JqZWN0czpBcnJheTxvYmo8dW5rbm93bj4+ID0gW107XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHR1cm46c2lkZS53aGl0ZSxcclxuICAgICAgd2hpdGVfYm9hcmQ6W10sXHJcbiAgICAgIGJsYWNrX2JvYXJkOltdLFxyXG4gICAgICBzZWxlY3RlZDp1bmRlZmluZWQsXHJcbiAgICAgIHNxdWFyZXM6W10sXHJcbiAgICAgIHBpZWNlczpbXSxcclxuICAgICAgYXR0YWNrZWQ6W11cclxuICAgIH07XHJcbiAgICBsZXQgcm93MiA9IFtuZXcgUm9vayhbMCw3XSxzaWRlLmJsYWNrKSxuZXcgS25pZ2h0KFsxLDddLHNpZGUuYmxhY2spLG5ldyBCaXNob3AoWzIsN10sc2lkZS5ibGFjayksbmV3IFF1ZWVuKFszLDddLHNpZGUuYmxhY2spLG5ldyBLaW5nKFs0LDddLHNpZGUuYmxhY2spLG5ldyBCaXNob3AoWzUsN10sc2lkZS5ibGFjayksbmV3IEtuaWdodChbNiw3XSxzaWRlLmJsYWNrKSxuZXcgUm9vayhbNyw3XSxzaWRlLmJsYWNrKV07XHJcbiAgICBsZXQgcm93NyA9IFtuZXcgUm9vayhbMCwwXSxzaWRlLndoaXRlKSxuZXcgS25pZ2h0KFsxLDBdLHNpZGUud2hpdGUpLG5ldyBCaXNob3AoWzIsMF0sc2lkZS53aGl0ZSksbmV3IFF1ZWVuKFszLDBdLHNpZGUud2hpdGUpLG5ldyBLaW5nKFs0LDBdLHNpZGUud2hpdGUpLG5ldyBCaXNob3AoWzUsMF0sc2lkZS53aGl0ZSksbmV3IEtuaWdodChbNiwwXSxzaWRlLndoaXRlKSxuZXcgUm9vayhbNywwXSxzaWRlLndoaXRlKV07XHJcbiAgICBmb3IobGV0IGEgPSAwO2EgPCByb3cyLmxlbmd0aDthKyspe1xyXG4gICAgICBsZXQgcGF3bjEgPSBuZXcgUGF3bihbYSwxXSxzaWRlLndoaXRlKTtcclxuICAgICAgbGV0IHBhd24yID0gbmV3IFBhd24oW2EsNl0sc2lkZS5ibGFjayk7XHJcbiAgICAgIHRoaXMub2JqZWN0cy5wdXNoKHJvdzdbYV0pO1xyXG4gICAgICB0aGlzLm9iamVjdHMucHVzaChwYXduMSk7XHJcbiAgICAgIHRoaXMub2JqZWN0cy5wdXNoKHJvdzJbYV0pO1xyXG4gICAgICB0aGlzLm9iamVjdHMucHVzaChwYXduMik7XHJcbiAgICAgIHRoaXMuc3RhdGUucGllY2VzLnB1c2gocGF3bjIpO1xyXG4gICAgICB0aGlzLnN0YXRlLnBpZWNlcy5wdXNoKHJvdzdbYV0pO1xyXG4gICAgICB0aGlzLnN0YXRlLnBpZWNlcy5wdXNoKHBhd24xKTtcclxuICAgICAgdGhpcy5zdGF0ZS5waWVjZXMucHVzaChyb3cyW2FdKTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGEgPSAwO2E8ODthKyspe1xyXG4gICAgICBsZXQgbXZfcm93OkFycmF5PG1vdmU+ID0gW107XHJcbiAgICAgIGZvcihsZXQgYiA9IDA7Yjw4O2IrKyl7XHJcbiAgICAgICAgbGV0IGQgPSBhO1xyXG4gICAgICAgICgoKT0+IHtcclxuICAgICAgICAgIGxldCBtb3ZlX28gPSBuZXcgbW92ZShbYSxiXSk7XHJcbiAgICAgICAgICBtdl9yb3cucHVzaChtb3ZlX28pO1xyXG4gICAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobW92ZV9vKTtcclxuICAgICAgICB9KSgpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdGF0ZS5zcXVhcmVzLnB1c2gobXZfcm93KTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUuYmxhY2tfYm9hcmQgPSB0aGlzLmJsYW5rX2JvYXJkKCk7XHJcbiAgICB0aGlzLnN0YXRlLndoaXRlX2JvYXJkID0gdGhpcy5ibGFua19ib2FyZCgpO1xyXG4gICAgZm9yKGxldCB4IG9mIHRoaXMuc3RhdGUucGllY2VzKXtcclxuICAgICAgaWYoeC5zdGF0ZS5zaWRlID09PSBzaWRlLndoaXRlKXtcclxuICAgICAgICB4LmJpbmRfY29udHJvbHMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG4gIGdldF9tZXRhKGE6W251bWJlcixudW1iZXJdLHM6c2lkZSl7XHJcbiAgICBpZihhWzBdID49IDAgJiYgYVswXSA8IDggJiYgYVsxXSA+PSAwICYmIGFbMV0gPCA4KXtcclxuICAgICAgaWYocyA9PT0gc2lkZS53aGl0ZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUud2hpdGVfYm9hcmRbYVswXV1bYVsxXV07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYmxhY2tfYm9hcmRbYVswXV1bYVsxXV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgY2hhbmdlX3NpZGUoczpzaWRlKXtcclxuICAgIGxldCB0b19iaW5kO1xyXG4gICAgbGV0IHRvX3VuYmluZDtcclxuICAgIFxyXG4gICAgaWYocyA9PSBzaWRlLndoaXRlKXtcclxuICAgICAgdG9fYmluZCA9IHM7XHJcbiAgICAgIHRvX3VuYmluZCA9IHNpZGUuYmxhY2s7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmNsZWFyX2VucGFzc2VudF9ib2FyZCh0aGlzLnN0YXRlLndoaXRlX2JvYXJkKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuY2xlYXJfYXR0YWNrZWRfYm9hcmQodGhpcy5zdGF0ZS5ibGFja19ib2FyZCk7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmNhbGN1bGF0ZV9hdHRhY2tlZF9ib2FyZCh0aGlzLnN0YXRlLmJsYWNrX2JvYXJkLHNpZGUuYmxhY2spO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHRvX2JpbmQgPSBzaWRlLmJsYWNrO1xyXG4gICAgICB0b191bmJpbmQgPSBzaWRlLndoaXRlO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5jbGVhcl9lbnBhc3NlbnRfYm9hcmQodGhpcy5zdGF0ZS5ibGFja19ib2FyZCk7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmNsZWFyX2F0dGFja2VkX2JvYXJkKHRoaXMuc3RhdGUud2hpdGVfYm9hcmQpO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5jYWxjdWxhdGVfYXR0YWNrZWRfYm9hcmQodGhpcy5zdGF0ZS53aGl0ZV9ib2FyZCxzaWRlLndoaXRlKTtcclxuXHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgZm9yKGxldCB4IG9mIHRoaXMuc3RhdGUucGllY2VzKXtcclxuICAgICAgaWYoeC5zdGF0ZS5zaWRlID09PSB0b19iaW5kKXtcclxuICAgICAgICB4LmJpbmRfY29udHJvbHMoKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIHgudW5iaW5kX2NvbnRyb2xzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUudHVybiA9IHM7XHJcbiAgfVxyXG4gIGNsZWFyX2VucGFzc2VudF9ib2FyZCh4OkFycmF5PEFycmF5PHNwYWNlX3N0YXRlPj4pe1xyXG4gICAgZm9yKGxldCBhID0gMDthPDg7YSsrKXtcclxuICAgICAgZm9yKGxldCBiID0gMDtiPDg7YisrKXtcclxuICAgICAgICB4W2FdW2JdLmVucGFzc2VudCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNhbGN1bGF0ZV9hdHRhY2tlZF9ib2FyZCh4OkFycmF5PEFycmF5PHNwYWNlX3N0YXRlPj4sczpzaWRlKXtcclxuICAgIGZvcihsZXQgYSBvZiB0aGlzLnN0YXRlLnBpZWNlcyl7XHJcbiAgICAgIGlmKGEuc3RhdGUuc2lkZSA9PSBzKXtcclxuICAgICAgICBsZXQgYXR0YWNrZWQgPSBhLmdldEF0dGFja2luZygpO1xyXG4gICAgICAgIGZvcihsZXQgYiBvZiBhdHRhY2tlZCl7XHJcbiAgICAgICAgICB4W2JbMF1dW2JbMV1dLmF0dGFja2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gXHJcbiAgfVxyXG4gIGNsZWFyX2F0dGFja2VkX2JvYXJkKHg6QXJyYXk8QXJyYXk8c3BhY2Vfc3RhdGU+Pil7XHJcbiAgICBmb3IobGV0IGEgPSAwO2E8ODthKyspe1xyXG4gICAgICBmb3IobGV0IGIgPSAwO2I8ODtiKyspe1xyXG4gICAgICAgIHhbYV1bYl0uYXR0YWNrZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBibGFua19ib2FyZCgpe1xyXG4gICAgbGV0IGJvYXJkID0gW107XHJcbiAgICBmb3IobGV0IGEgPSAwO2E8ODthKyspe1xyXG4gICAgICBsZXQgcm93ID0gW107XHJcbiAgICAgIGZvcihsZXQgYiA9IDA7Yjw4O2IrKyl7XHJcbiAgICAgICAgcm93LnB1c2goe1xyXG4gICAgICAgICAgZW5wYXNzZW50OmZhbHNlLFxyXG4gICAgICAgICAgYXR0YWNrZWQ6ZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBib2FyZC5wdXNoKHJvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG4gIGFzeW5jIGFkZF9waWVjZShhOnBpZWNlKXtcclxuICAgIGF3YWl0IGEubG9hZCgpO1xyXG4gICAgdGhpcy5vYmplY3RzLnVuc2hpZnQoYSk7XHJcbiAgICB0aGlzLnN0YXRlLnBpZWNlcy51bnNoaWZ0KGEpO1xyXG4gIH1cclxuICByZW1vdmVfcGllY2UoYTpwaWVjZSl7XHJcbiAgICBmb3IobGV0IGIgPSAwO2IgPCB0aGlzLnN0YXRlLnBpZWNlcy5sZW5ndGg7YisrKXtcclxuICAgICAgaWYoYS5pZCA9PT0gdGhpcy5zdGF0ZS5waWVjZXNbYl0uaWQpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUucGllY2VzLnNwbGljZShiLDEpO1xyXG4gICAgICB9ICAgXHJcbiAgICB9XHJcbiAgICBhLmRlbGV0ZSgpO1xyXG4gIH1cclxuICBnZXRfcGllY2UoYTpbbnVtYmVyLG51bWJlcl0pOkFycmF5PHBpZWNlPntcclxuICAgIHJldHVybiAodGhpcy5jaGVja19jb2xsaXNpb25zKHtcclxuICAgICAgeDphWzBdICogMTAwICsgNTAgLSA0MDAsXHJcbiAgICAgIHk6YVsxXSAqIDEwMCArIDUwIC0gNDAwLFxyXG4gICAgICBoZWlnaHQ6MTAwLFxyXG4gICAgICB3aWR0aDoxMDBcclxuICAgIH0pIGFzIEFycmF5PHBpZWNlPik7XHJcbiAgfVxyXG4gIGNsZWFyX2F0dGFja2VkKCl7XHJcbiAgICBmb3IobGV0IGEgb2YgdGhpcy5zdGF0ZS5hdHRhY2tlZCl7XHJcbiAgICAgIHRoaXMuc3RhdGUuc3F1YXJlc1thWzBdXVthWzFdXS5yZW5kZXIgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgYXR0YWNrKHg6QXJyYXk8W251bWJlcixudW1iZXJdPil7XHJcbiAgICBmb3IobGV0IGEgb2YgeCl7XHJcbiAgICAgIHRoaXMuc3RhdGUuc3F1YXJlc1thWzBdXVthWzFdXS5yZW5kZXIgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=