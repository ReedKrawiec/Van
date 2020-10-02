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
exports.Bullet = void 0;
const platformer_obj_1 = __webpack_require__(/*! ./platformer_obj */ "./src/game/objects/platformer_obj.ts");
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class Bullet extends platformer_obj_1.platformer_obj {
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
    statef() {
        this.state.velocity = object_1.rotation_length(this.state.speed, this.state.rotation);
        this.state.distance += this.state.speed;
        if (this.state.distance > this.max_distance) {
            this.delete();
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
        }
    }
    register_controls() {
    }
}
exports.Bullet = Bullet;


/***/ }),

/***/ "./src/game/objects/goomba.ts":
/*!************************************!*\
  !*** ./src/game/objects/goomba.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StandingGoomba = exports.Goomba = exports.Cursor = exports.Gun = void 0;
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
class Gun extends platformer_obj_1.platformer_obj {
    constructor() {
        super();
        this.sprite_url = "./sprites/folder/gun.png";
        this.height = 50;
        this.width = 20;
        this.collision = true;
        this.render = true;
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
        let rot = object_1.rotation_length(140, angle);
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
        this.bindControl("KeyA", controls_1.exec_type.repeat, () => {
            if (this.state.velocity.x > -10) {
                this.state.velocity.x = this.state.velocity.x - 1;
            }
        });
        this.bindControl("KeyW", controls_1.exec_type.once, () => {
            if (this.state.direction == direction.left) {
                this.animations.play("walk1");
            }
            else
                this.animations.play("walk2");
            this.state.velocity.y = this.state.velocity.y + 0.1;
        });
        this.bindControl("KeyW", controls_1.exec_type.repeat, () => {
            if (this.state.velocity.y < 10) {
                this.state.velocity.y = this.state.velocity.y + 1;
            }
        });
        this.bindControl("KeyS", controls_1.exec_type.once, () => {
            if (this.state.direction == direction.left)
                this.animations.play("walk1");
            else
                this.animations.play("walk2");
            this.state.velocity.y = this.state.velocity.y - 0.1;
        });
        this.bindControl("KeyS", controls_1.exec_type.repeat, () => {
            if (this.state.velocity.y > -10) {
                this.state.velocity.y = this.state.velocity.y - 1;
            }
        });
        this.bindControl("KeyA", controls_1.exec_type.once, () => {
            this.animations.play("walk1");
            this.state.direction = direction.left;
            this.state.velocity.x = this.state.velocity.x - 0.1;
        });
        this.bindControl("mousedown", controls_1.exec_type.repeat, () => {
            this.audio.play("slime", 0.01);
        }, 1000);
        this.bindControl("KeyD", controls_1.exec_type.repeat, () => {
            if (this.state.velocity.x < 10) {
                this.state.velocity.x = this.state.velocity.x + 1;
            }
        });
        this.bindControl("KeyD", controls_1.exec_type.once, () => {
            this.animations.play("walk2");
            this.state.direction = direction.right;
            this.state.velocity.x = this.state.velocity.x + 0.1;
        });
        this.bindControl("Space", controls_1.exec_type.once, () => {
            if (!this.state.jumping) {
                this.state.velocity.y += 15;
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
        let cursor = van_1.getGame().getRoom().getObj("cursor");
        if (this.state.velocity.y > 0) {
            this.state.velocity.y = this.state.velocity.y - 0.4;
            if (this.state.velocity.y < 0)
                this.state.velocity.y = 0;
        }
        if (this.state.velocity.y < 0) {
            this.state.velocity.y = this.state.velocity.y + 0.4;
            if (this.state.velocity.y > 0)
                this.state.velocity.y = 0;
        }
        if (this.state.velocity.x > 0) {
            this.state.velocity.x = this.state.velocity.x - 0.4;
            if (this.state.velocity.x < 0) {
                this.state.velocity.x = 0;
            }
        }
        else if (this.state.velocity.x < 0) {
            this.state.velocity.x = this.state.velocity.x + 0.4;
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
exports.platformer_obj = void 0;
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
            van_1.getGame().loadRoom(new Overworld());
        });
        this.bindControl("mousedown", controls_1.exec_type.repeat, () => {
            let gun = this.getObj("gun");
            let muzzle = object_1.rotation_length(40, gun.state.rotation);
            let position = {
                x: gun.state.position.x + muzzle.x,
                y: gun.state.position.y + muzzle.y
            };
            let bullets = [];
            for (let a = 0; a < 1; a++) {
                bullets.push(new bullet_1.Bullet([position.x, position.y], gun.state.rotation)); //+ (a * 50/15) - 25));
            }
            if (this.state.locked_bullet == null) {
                this.state.locked_bullet = bullets[0];
            }
            this.addItems(bullets);
        }, 1000);
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
    statef(time) {
        if (!this.state.paused) {
            for (let a = 0; a < this.objects.length; a++) {
                //apply_gravity(this.objects[a], -.5, -15);
                collision_1.velocity_collision_check(this.objects[a], this.objects);
                this.objects[a].statef(time);
            }
            let player = this.getObj("player");
            let cursor = this.getObj("cursor");
            let cameras = van_1.getGame().state.cameras;
            let room = van_1.getGame().getRoom();
            if (player) {
                cameras[0].x = player.state.position.x;
                cameras[0].y = player.state.position.y + (cameras[0].state.dimensions.height / 2 - player.height / 2 - 100);
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
function check_all_collisions(c, objs, exemption = []) {
    let matched = [];
    for (let a of objs) {
        if (exemption.indexOf(a.id) == -1 && a.collision && a.collides_with_box(c)) {
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
exports.gravity_obj = exports.static_obj = exports.obj = exports.getId = exports.rotation_length = void 0;
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
    bindControl(key, x, func, interval = 1) {
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
    render_track(time) {
        let rendered = this.renderf(time - this.last_render);
        this.last_render = time;
        return rendered;
    }
    renderf(time) {
        if (!this.animations.current) {
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
        return this.animations.renderf(time);
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
exports.rect_renderer = exports.stroked_rect_renderer = exports.sprite_renderer = exports.text_renderer = exports.renderer = exports.Camera = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
class Camera {
    constructor(x, y, width, height, scaling, v) {
        this.state = {
            scaling,
            position: {
                x: x / scaling,
                y: y / scaling
            },
            dimensions: {
                width: width / scaling,
                height: height / scaling
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
    /*if((s.x - s.sprite.sprite_width/2) < (r.camera.state.position.x - r.camera.state.dimensions.width/2)){
      cut_off = (r.camera.state.position.x - r.camera.state.dimensions.width/2) - (s.x - s.sprite.sprite_width/2);
    }
    
    else if((s.x + s.sprite.sprite_width/2) > (r.camera.state.position.x + r.camera.state.dimensions.width/2)){
      cut_off =   (r.camera.state.position.x + r.camera.state.dimensions.width/2) - (s.x + s.sprite.sprite_width/2);
    }
    */
    if (true) {
        r.context.save();
        r.context.translate(final_x + cut_off + (s.sprite.sprite_width - cut_off) / 2, final_y + s.sprite.sprite_height / 2);
        let radians = s.rotation * (Math.PI / 180);
        r.context.rotate(radians);
        if (s.sprite.sprite_width == 149 && cut_off > 0)
            console.log(cut_off);
        r.context.drawImage(s.sprite.sprite_sheet, s.sprite.left + cut_off, s.sprite.top, (s.sprite.sprite_width - cut_off), s.sprite.sprite_height, -(s.sprite.sprite_width - cut_off) / 2, -s.sprite.sprite_height / 2, width - cut_off, height);
        r.context.restore();
    }
    else {}
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
    addItem(o) {
        return __awaiter(this, void 0, void 0, function* () {
            yield o.load();
            this.objects.push(o);
        });
    }
    addItems(o) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(o.map((a) => a.load()));
            this.objects.push(...o);
        });
    }
    deleteItem(id) {
        for (let a = 0; a < this.objects.length; a++) {
            if (this.objects[a].id === id) {
                this.objects = this.objects.slice(0, a).concat(this.objects.slice(a + 1));
                a--;
            }
        }
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
        return null;
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
                sprite_width
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
        /*
        let h = Math.max(...this.state.cameras.map(x=>x.state.dimensions.height));
        let w = Math.max(...this.state.cameras.map(x=>x.state.dimensions.width))
        this.offscreen_canvas.height = h;
        this.offscreen_canvas.width = w;
        */
        this.loadRoom(a);
    }
    render(t) {
        let time = t - last_render_time;
        last_render_time = t;
        for (let camera of this.state.cameras) {
            //this.offscreen_context.clearRect(0,0,camera.state.dimensions.width,camera.state.dimensions.height);
            this.offscreen_context.fillStyle = "black";
            //this.offscreen_context.fillRect(0,0,camera.state.dimensions.width,camera.state.dimensions.height);
            this.offscreen_canvas.height = camera.state.dimensions.height;
            this.offscreen_canvas.width = camera.state.dimensions.width;
            let camera_box = {
                x: camera.state.position.x,
                y: camera.state.position.y,
                width: camera.state.dimensions.width,
                height: camera.state.dimensions.height
            };
            let camera_colliders = this.state.current_room.check_objects(camera_box);
            let render_args = {
                context: this.offscreen_context,
                camera: camera,
            };
            render_1.sprite_renderer(render_args, {
                sprite: this.state.current_room.renderf(time),
                x: camera.state.viewport.x,
                y: camera.state.viewport.y,
                rotation: 0
            });
            for (let a of camera_colliders) {
                let st = a.state;
                if (a.render) {
                    render_1.sprite_renderer(render_args, {
                        sprite: a.render_track(t),
                        x: st.position.x,
                        y: st.position.y,
                        rotation: a.rotation
                    });
                }
            }
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
            if (this.state.current_room.hud) {
                let graphics = this.state.current_room.hud.graphic_elements;
                let text_elements = this.state.current_room.hud.text_elements;
                for (let a of graphics) {
                    let st = a.state;
                    if (a.render) {
                        render_1.sprite_renderer(render_args, {
                            sprite: a.renderf(t),
                            x: st.position.x,
                            y: st.position.y,
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
            let data = this.offscreen_context.getImageData(0, 0, camera.state.dimensions.width, camera.state.dimensions.height);
            this.state.context.putImageData(data, camera.state.viewport.x, camera.state.viewport.y);
        }
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9ib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9idWxsZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9nb29tYmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9wbGF0Zm9ybWVyX29iai50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9vYmplY3RzL3RhcmdldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9yb29tcy9vdmVyd29ybGQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9hdWRpby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbnRyb2xzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvaHVkLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvb2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvcm9vbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3Nwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3N0YXRlLnRzIiwid2VicGFjazovLy8uL3NyYy92YW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMv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LFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQztZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNwRCxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzdCO1FBQ0QsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3BELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtTQUNGO2FBQ0ksSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3BELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENB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LENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztlQUM3RSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyRixPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRTtTQUN6SDtRQUNELElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7ZUFDN0UsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRTtZQUNuRixPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFR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QUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxxQkFBUyxFQUFFLENBQUcsQ0FBQztBQUVwRCxTQUFnQixPQUFPO0lBQ3JCLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFGRCwwQkFFQyIsImZpbGUiOiJ2YW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy92YW4udHNcIik7XG4iLCJpbXBvcnQge3BsYXRmb3JtZXJfb2JqLHBsYXRfc3RhdGV9IGZyb20gXCIuL3BsYXRmb3JtZXJfb2JqXCI7XHJcbmltcG9ydCB7b2JqX3N0YXRlfSBmcm9tIFwiLi4vLi4vbGliL3N0YXRlXCI7XHJcbmltcG9ydCB7IGV4ZWNfdHlwZSB9IGZyb20gXCIuLi8uLi9saWIvY29udHJvbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3ggZXh0ZW5kcyBwbGF0Zm9ybWVyX29iajxwbGF0X3N0YXRlPntcclxuICBzcHJpdGVfdXJsID0gXCIuL3Nwcml0ZXMvYm94LnBuZ1wiXHJcbiAgY29sbGlzaW9uID0gdHJ1ZVxyXG4gIGhlaWdodCA9IDY0O1xyXG4gIHdpZHRoID0gNTAwO1xyXG4gIGdyYXZpdHkgPSBmYWxzZTtcclxuICBlbmVteSA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6bnVtYmVyLCBpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4LFxyXG4gICAgICAgIHlcclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfSxcclxuICAgICAgaGVhbHRoOjEwMDBcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQge3BsYXRmb3JtZXJfb2JqLCBwbGF0X3N0YXRlfSBmcm9tIFwiLi9wbGF0Zm9ybWVyX29ialwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4uLy4uL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQgeyBleGVjX3R5cGUgfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7cm90YXRpb25fbGVuZ3RofSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmludGVyZmFjZSBidWxsZXRfc3RhdGUgZXh0ZW5kcyBvYmpfc3RhdGV7XHJcbiAgcm90YXRpb246bnVtYmVyLFxyXG4gIGRpc3RhbmNlOm51bWJlcixcclxuICBzcGVlZDpudW1iZXIsXHJcbiAgZGFtYWdlOm51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgcG9zaXRpb257XHJcbiAgeDpudW1iZXIsXHJcbiAgeTpudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJ1bGxldCBleHRlbmRzIHBsYXRmb3JtZXJfb2JqPGJ1bGxldF9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL2J1bGxldC5wbmdcIjtcclxuICBoZWlnaHQgPSAyMDtcclxuICB3aWR0aCA9IDEwO1xyXG4gIGdyYXZpdHkgPSBmYWxzZTtcclxuICBtYXhfZGlzdGFuY2UgPSAyMDAwO1xyXG4gIHRhZ3MgPSBbXCJidWxsZXRcIl1cclxuICBjb25zdHJ1Y3Rvcih4OltudW1iZXIsbnVtYmVyXSwgYW5nbGU6bnVtYmVyLCBpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4OnhbMF0sXHJcbiAgICAgICAgeTp4WzFdXHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH0sXHJcbiAgICAgIHNwZWVkOjEwLFxyXG4gICAgICByb3RhdGlvbjphbmdsZSxcclxuICAgICAgZGlzdGFuY2U6MCxcclxuICAgICAgZGFtYWdlOjVcclxuICAgIH1cclxuICAgIHRoaXMucm90YXRpb24gPSBhbmdsZTtcclxuICB9XHJcbiAgc3RhdGVmKCl7XHJcbiAgICB0aGlzLnN0YXRlLnZlbG9jaXR5ID0gcm90YXRpb25fbGVuZ3RoKHRoaXMuc3RhdGUuc3BlZWQsdGhpcy5zdGF0ZS5yb3RhdGlvbik7XHJcbiAgICB0aGlzLnN0YXRlLmRpc3RhbmNlICs9IHRoaXMuc3RhdGUuc3BlZWQ7XHJcbiAgICBpZih0aGlzLnN0YXRlLmRpc3RhbmNlID4gdGhpcy5tYXhfZGlzdGFuY2Upe1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuc3RhdGUuY3VycmVudF9yb29tO1xyXG4gICAgbGV0IGNvbGxpc2lvbnMgPSByb29tLmNoZWNrX2NvbGxpc2lvbnMoe1xyXG4gICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCxcclxuICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOnRoaXMud2lkdGgsXHJcbiAgICAgIGhlaWdodDp0aGlzLmhlaWdodFxyXG4gICAgfSxbXCJwbGF5ZXJcIixcImd1blwiXSk7XHJcbiAgICBpZihjb2xsaXNpb25zLmxlbmd0aCA+IDApe1xyXG4gICAgICBmb3IobGV0IGNvbGxpc2lvbiBvZiBjb2xsaXNpb25zKXtcclxuICAgICAgICBsZXQgc3QgPSBjb2xsaXNpb24uc3RhdGUgYXMgdW5rbm93biBhcyBwbGF0X3N0YXRlO1xyXG4gICAgICAgIGlmKCg8cGxhdGZvcm1lcl9vYmo8b2JqX3N0YXRlPj5jb2xsaXNpb24pLmVuZW15KXtcclxuICAgICAgICAgIHN0LmhlYWx0aCAtPSB0aGlzLnN0YXRlLmRhbWFnZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdGF0ZS5kaXN0YW5jZSA9IHRoaXMubWF4X2Rpc3RhbmNlO1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpe1xyXG5cclxuICB9XHJcbn0iLCJpbXBvcnQge3ZlbG9jaXR5LG9ial9zdGF0ZSxwb3NpdGlvbl9pbml0LHN0YXRlX2Z1bmN9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHtzcHJpdGUsc3ByaXRlX2dlbn0gZnJvbSBcIi4uLy4uL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHtvYmoscm90YXRpb25fbGVuZ3RofSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge3BsYXRmb3JtZXJfb2JqLHBsYXRfc3RhdGV9IGZyb20gXCIuL3BsYXRmb3JtZXJfb2JqXCI7XHJcbmltcG9ydCB7UG9sbF9Nb3VzZSwgZXhlY190eXBlfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7Y29sbGlzaW9uX2JveH0gZnJvbSBcIi4uLy4uL2xpYi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtCaW5kfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5pbXBvcnQge092ZXJ3b3JsZH0gZnJvbSBcIi4uL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmVudW0gZGlyZWN0aW9ue1xyXG4gIGxlZnQsXHJcbiAgcmlnaHRcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBnb29tYmFfc3RhdGUgZXh0ZW5kcyBvYmpfc3RhdGUscGxhdF9zdGF0ZXtcclxuICBkaXJlY3Rpb246IGRpcmVjdGlvbixcclxuICB2ZWxvY2l0eTp2ZWxvY2l0eSxcclxuICBqdW1waW5nOmJvb2xlYW5cclxufVxyXG5cclxuaW50ZXJmYWNlIGd1bl9zdGF0ZSBleHRlbmRzIG9ial9zdGF0ZXtcclxuICByb3RhdGlvbjpudW1iZXIgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR3VuIGV4dGVuZHMgcGxhdGZvcm1lcl9vYmo8Z3VuX3N0YXRlPntcclxuICBzcHJpdGVfdXJsID0gXCIuL3Nwcml0ZXMvZm9sZGVyL2d1bi5wbmdcIjtcclxuICBoZWlnaHQgPSA1MDtcclxuICB3aWR0aCA9IDIwO1xyXG4gIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgcmVuZGVyID0gdHJ1ZTtcclxuICBwbGF5ZXI6R29vbWJhO1xyXG4gIGN1cnNvcjpDdXJzb3I7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmlkID0gXCJndW5cIjtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOnBvc2l0aW9uX2luaXQoKS5wb3NpdGlvbixcclxuICAgICAgdmVsb2NpdHk6cG9zaXRpb25faW5pdCgpLnZlbG9jaXR5LFxyXG4gICAgICByb3RhdGlvbjotMVxyXG4gICAgfVxyXG4gIH1cclxuICBzdGF0ZWYodDpudW1iZXIpe1xyXG4gICAgaWYoIXRoaXMucGxheWVyKXtcclxuICAgICAgbGV0IHJvb20gPSBnZXRHYW1lKCkuZ2V0Um9vbSgpO1xyXG4gICAgICB0aGlzLnBsYXllciA9IDxHb29tYmE+cm9vbS5nZXRPYmooXCJwbGF5ZXJcIik7XHJcbiAgICAgIHRoaXMuY3Vyc29yID0gPEN1cnNvcj5yb29tLmdldE9iaihcImN1cnNvclwiKTtcclxuICAgIH1cclxuICAgIGxldCBhbmdsZSA9IHRoaXMucGxheWVyLmFuZ2xlVG93YXJkcyh0aGlzLmN1cnNvcik7XHJcbiAgICBsZXQgcm90ID0gcm90YXRpb25fbGVuZ3RoKDE0MCxhbmdsZSk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gYW5nbGU7XHJcbiAgICB0aGlzLnN0YXRlLnJvdGF0aW9uID0gYW5nbGU7XHJcbiAgICB0aGlzLnN0YXRlLnBvc2l0aW9uID0ge1xyXG4gICAgICB4OnJvdC54ICsgdGhpcy5wbGF5ZXIuc3RhdGUucG9zaXRpb24ueCxcclxuICAgICAgeTpyb3QueSArIHRoaXMucGxheWVyLnN0YXRlLnBvc2l0aW9uLnlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDdXJzb3IgZXh0ZW5kcyBwbGF0Zm9ybWVyX29iajxvYmpfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcIi4vc3ByaXRlcy9jdXJzb3IucG5nXCI7XHJcbiAgaGVpZ2h0ID0gNjQ7XHJcbiAgd2lkdGggPSA2NDtcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIHJlbmRlciA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoaWQ6c3RyaW5nKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHN0YXRlZigpe1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdvb21iYSBleHRlbmRzIHBsYXRmb3JtZXJfb2JqPGdvb21iYV9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiLi9zcHJpdGVzL2ZvbGRlci9yb2JvdC5wbmdcIjtcclxuICBoZWlnaHQgPSAxNDk7XHJcbiAgd2lkdGggPSAxNDk7XHJcbiAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcixpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRpcmVjdGlvbjpkaXJlY3Rpb24ubGVmdCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBqdW1waW5nOmZhbHNlLFxyXG4gICAgICBoZWFsdGg6MTAwXHJcbiAgICB9XHJcbiAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcIndhbGsxXCIpO1xyXG4gIH1cclxuICByZWdpc3Rlcl9hbmltYXRpb25zKCl7XHJcbiAgICBsZXQgc3ByaXRlcyA9IHNwcml0ZV9nZW4odGhpcy5zcHJpdGVfc2hlZXQsdGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKFwid2FsazFcIixbXHJcbiAgICAgIFswLHNwcml0ZXNbMF1bMF1dLFxyXG4gICAgICBbMTAwLHNwcml0ZXNbMF1bMV1dLFxyXG4gICAgICBbNDAwLHNwcml0ZXNbMF1bMF1dLFxyXG4gICAgICBbNTAwLHNwcml0ZXNbMF1bMl1dXHJcbiAgICBdLDgwMClcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoXCJ3YWxrMlwiLFtcclxuICAgICAgWzAsc3ByaXRlc1swXVs1XV0sXHJcbiAgICAgIFsxMDAsc3ByaXRlc1swXVs0XV0sXHJcbiAgICAgIFs0MDAsc3ByaXRlc1swXVs1XV0sXHJcbiAgICAgIFs1MDAsc3ByaXRlc1swXVszXV1cclxuICAgIF0sODAwKVxyXG4gICAgdGhpcy5hbmltYXRpb25zLmFkZChcImlkbGVsZWZ0XCIsW1xyXG4gICAgICBbMCxzcHJpdGVzWzBdWzBdXVxyXG4gICAgXSwxKTtcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2lkbGVyaWdodCcsW1xyXG4gICAgICBbMCxzcHJpdGVzWzBdWzVdXSBcclxuICAgIF0sMSk7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2F1ZGlvKCl7XHJcbiAgICB0aGlzLmF1ZGlvLmFkZChcInNsaW1lXCIsXCIuL3NvdW5kcy9nb29tYmEvc2xpbWViYWxsLndhdlwiKTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJLZXlBXCIsZXhlY190eXBlLnJlcGVhdCwoKT0+e1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnggPiAtMTApe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IHRoaXMuc3RhdGUudmVsb2NpdHkueCAtIDE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIktleVdcIixleGVjX3R5cGUub25jZSwoKT0+e1xyXG4gICAgICBpZih0aGlzLnN0YXRlLmRpcmVjdGlvbiA9PSBkaXJlY3Rpb24ubGVmdCl7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoXCJ3YWxrMVwiKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoXCJ3YWxrMlwiKTtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ID0gdGhpcy5zdGF0ZS52ZWxvY2l0eS55ICsgMC4xO1xyXG4gICAgfSlcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJLZXlXXCIsZXhlY190eXBlLnJlcGVhdCwoKT0+e1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPCAxMCl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ID0gdGhpcy5zdGF0ZS52ZWxvY2l0eS55ICsgMTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiS2V5U1wiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUuZGlyZWN0aW9uID09IGRpcmVjdGlvbi5sZWZ0KVxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwid2FsazFcIik7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcIndhbGsyXCIpO1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPSB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgLSAwLjE7XHJcbiAgICB9KVxyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIktleVNcIixleGVjX3R5cGUucmVwZWF0LCgpPT57XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueSA+IC0xMCl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ID0gdGhpcy5zdGF0ZS52ZWxvY2l0eS55IC0gMTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiS2V5QVwiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwid2FsazFcIik7XHJcbiAgICAgIHRoaXMuc3RhdGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uLmxlZnQ7XHJcbiAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IHRoaXMuc3RhdGUudmVsb2NpdHkueCAtIDAuMTtcclxuICAgIH0pXHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwibW91c2Vkb3duXCIsZXhlY190eXBlLnJlcGVhdCwgKCk9PntcclxuICAgICAgdGhpcy5hdWRpby5wbGF5KFwic2xpbWVcIiwwLjAxKTtcclxuICAgIH0sMTAwMCk7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiS2V5RFwiLGV4ZWNfdHlwZS5yZXBlYXQsKCk9PntcclxuICAgICAgaWYodGhpcy5zdGF0ZS52ZWxvY2l0eS54IDwgMTApe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IHRoaXMuc3RhdGUudmVsb2NpdHkueCArIDE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIktleURcIixleGVjX3R5cGUub25jZSwoKT0+e1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbnMucGxheShcIndhbGsyXCIpO1xyXG4gICAgICB0aGlzLnN0YXRlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5yaWdodDtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS54ID0gdGhpcy5zdGF0ZS52ZWxvY2l0eS54ICsgMC4xO1xyXG4gICAgfSlcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJTcGFjZVwiLGV4ZWNfdHlwZS5vbmNlLCgpPT57XHJcbiAgICAgIGlmKCF0aGlzLnN0YXRlLmp1bXBpbmcpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSArPSAxNTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXkoXCJzbGltZVwiLDAuMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICByZW5kZXJmKHQ6bnVtYmVyKXtcclxuICAgIGlmKHRoaXMuc3RhdGUudmVsb2NpdHkueCA9PSAwICYmIHRoaXMuc3RhdGUudmVsb2NpdHkueSA9PSAwKXtcclxuICAgICAgbGV0IGFuaW1hdGlvbiA9IHRoaXMuc3RhdGUuZGlyZWN0aW9uPT1kaXJlY3Rpb24ubGVmdCA/IFwiaWRsZWxlZnRcIiA6IFwiaWRsZXJpZ2h0XCI7XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9ucy5wbGF5KGFuaW1hdGlvbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIucmVuZGVyZih0KTtcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGxldCBjdXJzb3IgPSBnZXRHYW1lKCkuZ2V0Um9vbSgpLmdldE9iaihcImN1cnNvclwiKTtcclxuXHJcbiAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPiAwKXtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ID0gdGhpcy5zdGF0ZS52ZWxvY2l0eS55IC0gMC40O1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPCAwKVxyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSA9IDA7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPCAwKXtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ID0gdGhpcy5zdGF0ZS52ZWxvY2l0eS55ICsgMC40O1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPiAwKVxyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSA9IDA7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnggPiAwICl7XHJcbiAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IHRoaXMuc3RhdGUudmVsb2NpdHkueCAtIDAuNDtcclxuICAgICAgaWYodGhpcy5zdGF0ZS52ZWxvY2l0eS54IDwgMCl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS54ID0gMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnggPCAwKXtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS54ID0gdGhpcy5zdGF0ZS52ZWxvY2l0eS54ICsgMC40O1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnZlbG9jaXR5LnggPiAwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhbmRpbmdHb29tYmEgZXh0ZW5kcyBwbGF0Zm9ybWVyX29iajxnb29tYmFfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvb2JqZWN0cy9nb29tYmEucG5nXCI7XHJcbiAgaGVpZ2h0ID0gNjQ7XHJcbiAgd2lkdGggPSA2NDtcclxuICBjb2xsaXNpb24gPSB0cnVlO1xyXG4gIGVuZW15ID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcixpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkKXtcclxuICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfSAgICBcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRpcmVjdGlvbjpkaXJlY3Rpb24ubGVmdCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBqdW1waW5nOmZhbHNlLFxyXG4gICAgICBoZWFsdGg6MTAwXHJcbiAgICB9XHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOm51bWJlcil7XHJcbiAgICBpZih0aGlzLnN0YXRlLmp1bXBpbmcpe1xyXG4gICAgICBsZXQgbW91c2VfcG9zaXRpb24gPSBQb2xsX01vdXNlKCk7XHJcbiAgICAgIGlmKG1vdXNlX3Bvc2l0aW9uLnkgPiBtb3VzZV9wb3NpdGlvbi5sYXN0Lnkpe1xyXG4gICAgICAgIGlmKHRoaXMuY29sbGlzaW9uX2NoZWNrKHtcclxuICAgICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCxcclxuICAgICAgICAgIHdpZHRoOnRoaXMud2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQ6MVxyXG4gICAgICAgIH0pLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueSA9IG1vdXNlX3Bvc2l0aW9uLnkgLSB0aGlzLmhlaWdodC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKG1vdXNlX3Bvc2l0aW9uLnkgPCBtb3VzZV9wb3NpdGlvbi5sYXN0Lnkpe1xyXG4gICAgICAgIGlmKHRoaXMuY29sbGlzaW9uX2NoZWNrKHtcclxuICAgICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnkgLSAxLFxyXG4gICAgICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDoxXHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0gbW91c2VfcG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKG1vdXNlX3Bvc2l0aW9uLnggPCBtb3VzZV9wb3NpdGlvbi5sYXN0Lngpe1xyXG4gICAgICAgIGlmKHRoaXMuY29sbGlzaW9uX2NoZWNrKHtcclxuICAgICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54IC0gMSxcclxuICAgICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICAgICAgd2lkdGg6MSxcclxuICAgICAgICAgIGhlaWdodDp0aGlzLmhlaWdodFxyXG4gICAgICAgIH0pLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueCA9IG1vdXNlX3Bvc2l0aW9uLnggLSB0aGlzLndpZHRoLzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYobW91c2VfcG9zaXRpb24ueCA+IG1vdXNlX3Bvc2l0aW9uLmxhc3QueCl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgICAgICB3aWR0aDoxLFxyXG4gICAgICAgICAgaGVpZ2h0OnRoaXMuaGVpZ2h0XHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2VfcG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHN1cGVyLnN0YXRlZih0aW1lKTtcclxuICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7Z3Jhdml0eV9vYmp9IGZyb20gXCIuLi8uLi9saWIvb2JqZWN0XCI7XHJcbmltcG9ydCB7b2JqX3N0YXRlfSBmcm9tIFwiLi4vLi4vbGliL3N0YXRlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHBsYXRfc3RhdGUgZXh0ZW5kcyBvYmpfc3RhdGV7XHJcbiAgaGVhbHRoOm51bWJlciAgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBwbGF0Zm9ybWVyX29iajx0PiBleHRlbmRzIGdyYXZpdHlfb2JqPHQ+e1xyXG4gIGVuZW15ID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG4gIHN0YXRlZihhOm51bWJlcil7XHJcbiAgICBsZXQgc3RhdGUgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgcGxhdF9zdGF0ZTtcclxuICAgIGlmKHN0YXRlLmhlYWx0aCA8PSAwKXtcclxuICAgICAgdGhpcy5kZWxldGUoKTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQge3ZlbG9jaXR5LG9ial9zdGF0ZSxzdGF0ZV9mdW5jfSBmcm9tIFwiLi4vLi4vbGliL3N0YXRlXCI7XHJcbmltcG9ydCB7c3ByaXRlLHNwcml0ZV9nZW59IGZyb20gXCIuLi8uLi9saWIvc3ByaXRlXCI7XHJcbmltcG9ydCB7b2JqLHJvdGF0aW9uX2xlbmd0aH0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtwbGF0Zm9ybWVyX29iaixwbGF0X3N0YXRlfSBmcm9tIFwiLi9wbGF0Zm9ybWVyX29ialwiO1xyXG5pbXBvcnQge1BvbGxfTW91c2UsIGV4ZWNfdHlwZX0gZnJvbSBcIi4uLy4uL2xpYi9jb250cm9sc1wiO1xyXG5pbXBvcnQge2NvbGxpc2lvbl9ib3h9IGZyb20gXCIuLi8uLi9saWIvY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7QmluZH0gZnJvbSBcIi4uLy4uL2xpYi9jb250cm9sc1wiO1xyXG5cclxuaW1wb3J0IHtPdmVyd29ybGR9IGZyb20gXCIuLi9yb29tcy9vdmVyd29ybGRcIjtcclxuaW1wb3J0IHtnZXRHYW1lfSBmcm9tIFwiLi4vLi4vdmFuXCI7XHJcblxyXG5pbnRlcmZhY2UgdGFyZ2V0X3N0YXRlIGV4dGVuZHMgb2JqX3N0YXRle1xyXG4gIGhlYWx0aDpudW1iZXI7XHJcbiAgYnJlYWtpbmc6Ym9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFyZ2V0IGV4dGVuZHMgcGxhdGZvcm1lcl9vYmo8dGFyZ2V0X3N0YXRlPntcclxuICBzcHJpdGVfdXJsID0gXCIuL3Nwcml0ZXMvdGFyZ2V0LnBuZ1wiO1xyXG4gIGhlaWdodCA9IDY0O1xyXG4gIHdpZHRoID0gNjQ7XHJcbiAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICBncmF2aXR5ID0gZmFsc2U7XHJcbiAgcmVuZGVyID0gdHJ1ZTtcclxuICBlbmVteSA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoYTpbbnVtYmVyLG51bWJlcl0pe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4OmFbMF0sXHJcbiAgICAgICAgeTphWzFdXHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH0sXHJcbiAgICAgIGhlYWx0aDoyMCxcclxuICAgICAgYnJlYWtpbmc6ZmFsc2VcclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJfYXVkaW8oKXtcclxuICAgIHRoaXMuYXVkaW8uYWRkKFwiYnJlYWtcIixcIi4vc291bmRzL3RhcmdldC9oaXRzb3VuZF8yNzQubXAzXCIpO1xyXG4gIH1cclxuICByZWdpc3Rlcl9hbmltYXRpb25zKCl7XHJcbiAgICBsZXQgc3ByaXRlcyA9IHNwcml0ZV9nZW4odGhpcy5zcHJpdGVfc2hlZXQsdGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICB0aGlzLmFuaW1hdGlvbnMuYWRkKFwiYnJlYWtcIixbXHJcbiAgICAgIFswLHNwcml0ZXNbMF1bMV1dLFxyXG4gICAgICBbNTAsc3ByaXRlc1swXVsyXV0sXHJcbiAgICAgIFsxMDAsc3ByaXRlc1swXVszXV0sXHJcbiAgICAgIFsxNTAsc3ByaXRlc1swXVs0XV1cclxuICAgIF0sMjAwKVxyXG4gIH1cclxuICBzdGF0ZWYoKXtcclxuICAgIGlmKHRoaXMuc3RhdGUuaGVhbHRoIDw9IDAgJiYgIXRoaXMuc3RhdGUuYnJlYWtpbmcpe1xyXG4gICAgICB0aGlzLnN0YXRlLmJyZWFraW5nID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hbmltYXRpb25zLnBsYXkoXCJicmVha1wiLCgpPT57XHJcbiAgICAgICAgdGhpcy5kZWxldGUoKTtcclxuICAgICAgfSlcclxuICAgICAgdGhpcy5hdWRpby5wbGF5KFwiYnJlYWtcIiwwLjEpO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7IHJvb20sIGFwcGx5X2dyYXZpdHkgfSBmcm9tIFwiLi4vLi4vbGliL3Jvb21cIjtcclxuaW1wb3J0IHsgU3RhbmRpbmdHb29tYmEsR3VuLCBHb29tYmEsIGdvb21iYV9zdGF0ZSwgQ3Vyc29yIH0gZnJvbSBcIi4uL29iamVjdHMvZ29vbWJhXCI7XHJcbmltcG9ydCB7IEJveCB9IGZyb20gXCIuLi9vYmplY3RzL2JveFwiO1xyXG5pbXBvcnQgeyB2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2sgfSBmcm9tIFwiLi4vLi4vbGliL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQgeyBncmF2aXR5X29iaiwgcm90YXRpb25fbGVuZ3RoIH0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHsgUG9sbF9Nb3VzZSwgZXhlY190eXBlIH0gZnJvbSBcIi4uLy4uL2xpYi9jb250cm9sc1wiO1xyXG5pbXBvcnQgeyBEb29yIH0gZnJvbSBcIi4uL29iamVjdHMvcm9vbV9sb2FkZXJcIjtcclxuaW1wb3J0IHsgSFVELCBUZXh0IH0gZnJvbSBcIi4uLy4uL2xpYi9odWRcIjtcclxuaW1wb3J0IHsgZ2V0R2FtZSB9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuaW1wb3J0IHtCdWxsZXR9IGZyb20gXCIuLi9vYmplY3RzL2J1bGxldFwiO1xyXG5pbXBvcnQge1RhcmdldH0gZnJvbSBcIi4uL29iamVjdHMvdGFyZ2V0XCI7XHJcblxyXG5pbnRlcmZhY2Ugb3ZlcndvcmxkX2kge1xyXG4gIHBsYXllcjogZ3Jhdml0eV9vYmo8dW5rbm93bj4sXHJcbiAgcGF1c2VkOiBib29sZWFuLFxyXG4gIGxvY2tlZF9idWxsZXQ6QnVsbGV0XHJcbn1cclxuXHJcbmNsYXNzIE92ZXJ3b3JsZF9IVUQgZXh0ZW5kcyBIVUQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMudGV4dF9lbGVtZW50cy5wdXNoKG5ldyBUZXh0KHtcclxuICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICB4OiAxMCxcclxuICAgICAgICB5OiA3MTBcclxuICAgICAgfSxcclxuICAgICAgc2l6ZTogNDQsXHJcbiAgICAgIGZvbnQ6IFwiQWxhdGFcIixcclxuICAgICAgY29sb3I6IFwid2hpdGVcIixcclxuICAgICAgYWxpZ246XCJsZWZ0XCJcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgbGV0IHggPSBnZXRHYW1lKCkuZ2V0Um9vbSgpLmdldE9iaihcInBsYXllclwiKSBhcyBHb29tYmE7XHJcbiAgICAgIHJldHVybiBgWDoke01hdGgucm91bmQoeC5zdGF0ZS5wb3NpdGlvbi54KX1gO1xyXG4gICAgfSkpO1xyXG4gICAgdGhpcy50ZXh0X2VsZW1lbnRzLnB1c2gobmV3IFRleHQoe1xyXG4gICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgIHg6IDEwLFxyXG4gICAgICAgIHk6IDc1MFxyXG4gICAgICB9LFxyXG4gICAgICBzaXplOiA0NCxcclxuICAgICAgZm9udDogXCJBbGF0YVwiLFxyXG4gICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgICBhbGlnbjogXCJsZWZ0XCJcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgbGV0IHggPSBnZXRHYW1lKCkuZ2V0Um9vbSgpLmdldE9iaihcInBsYXllclwiKSBhcyBHb29tYmE7XHJcbiAgICAgIHJldHVybiBgWToke01hdGgucm91bmQoeC5zdGF0ZS5wb3NpdGlvbi55KX1gO1xyXG4gICAgfSkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE92ZXJ3b3JsZCBleHRlbmRzIHJvb208b3ZlcndvcmxkX2k+e1xyXG4gIGJhY2tncm91bmRfdXJsID0gXCIuL3Nwcml0ZXMvaW1ENDFsLmpwZ1wiO1xyXG4gIG9iamVjdHMgPSBbbmV3IEdvb21iYSg4MDAsIDE1MCwgXCJwbGF5ZXJcIiksbmV3IEJveCg2MDAsMCxcInBsYXRmb3JtXCIpLG5ldyBHdW4oKSxuZXcgVGFyZ2V0KFsyMDAsMTAwXSksbmV3IFRhcmdldChbMjAwLDIwMF0pLG5ldyBUYXJnZXQoWzEwMDAsMTAwXSksbmV3IFRhcmdldChbMTAwMCwyMDBdKSxuZXcgQ3Vyc29yKFwiY3Vyc29yXCIpXVxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBsYXllcjogdW5kZWZpbmVkLFxyXG4gICAgICBwYXVzZWQ6IGZhbHNlLFxyXG4gICAgICBsb2NrZWRfYnVsbGV0Om51bGxcclxuICAgIH07XHJcbiAgfVxyXG4gIHJlZ2lzdGVySFVEKCkge1xyXG4gICAgcmV0dXJuIG5ldyBPdmVyd29ybGRfSFVEKCk7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCkge1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIkVzY2FwZVwiLCBleGVjX3R5cGUub25jZSwgKCkgPT4ge1xyXG4gICAgICBnZXRHYW1lKCkubG9hZFJvb20obmV3IE92ZXJ3b3JsZCgpKTtcclxuICAgIH0pXHJcbiAgICBcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJtb3VzZWRvd25cIiwgZXhlY190eXBlLnJlcGVhdCwoKSA9PiB7XHJcbiAgICAgIGxldCBndW4gPSB0aGlzLmdldE9iaihcImd1blwiKSBhcyBHdW47XHJcbiAgICAgIGxldCBtdXp6bGUgPSByb3RhdGlvbl9sZW5ndGgoNDAsZ3VuLnN0YXRlLnJvdGF0aW9uKTtcclxuICAgICAgbGV0IHBvc2l0aW9uID0ge1xyXG4gICAgICAgIHg6Z3VuLnN0YXRlLnBvc2l0aW9uLnggKyBtdXp6bGUueCxcclxuICAgICAgICB5Omd1bi5zdGF0ZS5wb3NpdGlvbi55ICsgbXV6emxlLnlcclxuICAgICAgfVxyXG4gICAgICBsZXQgYnVsbGV0cyA9IFtdO1xyXG4gICAgICBmb3IobGV0IGEgPSAwO2EgPCAxO2ErKyl7XHJcbiAgICAgICAgYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQoW3Bvc2l0aW9uLngscG9zaXRpb24ueV0sZ3VuLnN0YXRlLnJvdGF0aW9uKSk7IC8vKyAoYSAqIDUwLzE1KSAtIDI1KSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYodGhpcy5zdGF0ZS5sb2NrZWRfYnVsbGV0ID09IG51bGwpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUubG9ja2VkX2J1bGxldCA9IGJ1bGxldHNbMF07XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5hZGRJdGVtcyhidWxsZXRzKTtcclxuICAgIH0sMTAwMClcclxuICAgIGxldCBjYW1lcmEzID0gZ2V0R2FtZSgpLnN0YXRlLmNhbWVyYXNbMV07XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiQXJyb3dMZWZ0XCIsZXhlY190eXBlLnJlcGVhdCwgKCkgPT4ge1xyXG4gICAgICBjYW1lcmEzLnN0YXRlLnBvc2l0aW9uLnggLT0gMTA7XHJcbiAgICB9LDEwKVxyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIkFycm93UmlnaHRcIixleGVjX3R5cGUucmVwZWF0LCAoKSA9PiB7XHJcbiAgICAgIGNhbWVyYTMuc3RhdGUucG9zaXRpb24ueCArPSAxMDtcclxuICAgIH0sMTApXHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiQXJyb3dEb3duXCIsZXhlY190eXBlLnJlcGVhdCwgKCkgPT4ge1xyXG4gICAgICBjYW1lcmEzLnN0YXRlLnBvc2l0aW9uLnkgLT0gMTA7XHJcbiAgICB9LDEwKVxyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIkFycm93VXBcIixleGVjX3R5cGUucmVwZWF0LCAoKSA9PiB7XHJcbiAgICAgIGNhbWVyYTMuc3RhdGUucG9zaXRpb24ueSArPSAxMDtcclxuICAgIH0sMTApXHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5zdGF0ZS5wYXVzZWQpIHtcclxuICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICAvL2FwcGx5X2dyYXZpdHkodGhpcy5vYmplY3RzW2FdLCAtLjUsIC0xNSk7XHJcbiAgICAgICAgdmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrKHRoaXMub2JqZWN0c1thXSwgdGhpcy5vYmplY3RzKTtcclxuICAgICAgICB0aGlzLm9iamVjdHNbYV0uc3RhdGVmKHRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmdldE9iaihcInBsYXllclwiKSBhcyBHb29tYmE7XHJcbiAgICAgIGxldCBjdXJzb3IgPSB0aGlzLmdldE9iaihcImN1cnNvclwiKSBhcyBDdXJzb3I7XHJcbiAgICAgIGxldCBjYW1lcmFzID0gZ2V0R2FtZSgpLnN0YXRlLmNhbWVyYXM7XHJcbiAgICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKTtcclxuICAgICAgaWYgKHBsYXllcikgeyAgICAgICAgXHJcbiAgICAgICAgY2FtZXJhc1swXS54ID0gcGxheWVyLnN0YXRlLnBvc2l0aW9uLng7XHJcbiAgICAgICAgY2FtZXJhc1swXS55ID0gcGxheWVyLnN0YXRlLnBvc2l0aW9uLnkgKyAoY2FtZXJhc1swXS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodC8yIC0gcGxheWVyLmhlaWdodC8yIC0gMTAwKTsgICAgICAgIFxyXG4gICAgICB9XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUubG9ja2VkX2J1bGxldCAhPSBudWxsKXtcclxuICAgICAgICBsZXQgYnVsbGV0ID0gdGhpcy5zdGF0ZS5sb2NrZWRfYnVsbGV0O1xyXG4gICAgICAgIGlmKGJ1bGxldC5zdGF0ZS5kaXN0YW5jZSA8IGJ1bGxldC5tYXhfZGlzdGFuY2Upe1xyXG4gICAgICAgICAgY2FtZXJhc1sxXS5zdGF0ZS5wb3NpdGlvbi54ID0gYnVsbGV0LnN0YXRlLnBvc2l0aW9uLng7XHJcbiAgICAgICAgICBjYW1lcmFzWzFdLnN0YXRlLnBvc2l0aW9uLnkgPSBidWxsZXQuc3RhdGUucG9zaXRpb24ueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgIHRoaXMuc3RhdGUubG9ja2VkX2J1bGxldCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiAgICAgIGlmIChjdXJzb3IpIHtcclxuICAgICAgICBjdXJzb3IuY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgY3Vyc29yLmdyYXZpdHkgPSBmYWxzZTtcclxuICAgICAgICBsZXQgbW91c2UgPSBQb2xsX01vdXNlKCk7XHJcbiAgICAgICAgY3Vyc29yLnN0YXRlLnBvc2l0aW9uLnggPSBtb3VzZS54O1xyXG4gICAgICAgIGN1cnNvci5zdGF0ZS5wb3NpdGlvbi55ID0gbW91c2UueTtcclxuICAgICAgICBjYW1lcmFzWzJdLnN0YXRlLnBvc2l0aW9uLnggPSBtb3VzZS54O1xyXG4gICAgICAgIGNhbWVyYXNbMl0uc3RhdGUucG9zaXRpb24ueSA9IG1vdXNlLnk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbnRlcmZhY2Ugc291bmRfc3RvcmFnZSB7XHJcbiAgW2luZGV4OiBzdHJpbmddOiBIVE1MQXVkaW9FbGVtZW50XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBhdWRpbyB7XHJcbiAgc291bmRzOiBzb3VuZF9zdG9yYWdlID0ge307XHJcbiAgYWRkKG5hbWU6IHN0cmluZywgczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNvdW5kc1tuYW1lXSA9IG5ldyBBdWRpbyhzKTtcclxuICB9XHJcbiAgbG9hZCgpIHtcclxuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5zb3VuZHMpO1xyXG4gICAgbGV0IHByb21pc2VzID0ga2V5cy5tYXAoKGtleSkgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc291bmRzW2tleV0uYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG4gIH1cclxuICBwbGF5KG5hbWU6c3RyaW5nLHZvbHVtZTpudW1iZXIpe1xyXG4gICAgbGV0IGEgPSB0aGlzLnNvdW5kc1tuYW1lXTtcclxuICAgIGEucGF1c2UoKVxyXG4gICAgYS5jdXJyZW50VGltZSA9IDA7XHJcbiAgICBhLnZvbHVtZSA9IHZvbHVtZTtcclxuICAgIGEucGxheSgpO1xyXG4gIH1cclxufSIsImltcG9ydCB7b2JqLGdldElkfSBmcm9tIFwiLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4uL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQge2RlZXB9IGZyb20gXCIuLi92YW5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY29sbGlzaW9uX2JveHtcclxuICB4Om51bWJlcjtcclxuICB5Om51bWJlcjtcclxuICB3aWR0aDpudW1iZXI7XHJcbiAgaGVpZ2h0Om51bWJlcjtcclxufVxyXG5cclxuZW51bSBkaXJlY3Rpb257XHJcbiAgbGVmdCxcclxuICByaWdodCxcclxuICB1cCxcclxuICBkb3duXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja19hbGxfb2JqZWN0cyhjOiBjb2xsaXNpb25fYm94LG9ianM6QXJyYXk8b2JqPHVua25vd24+PixleGVtcHRpb246c3RyaW5nKTpBcnJheTxvYmo8dW5rbm93bj4+e1xyXG4gIGxldCBtYXRjaGVkID0gW107XHJcbiAgZm9yIChsZXQgYSBvZiBvYmpzKSB7XHJcbiAgICBpZiAoYS5pZCAhPT0gZXhlbXB0aW9uICYmIGEuY29sbGlkZXNfd2l0aF9ib3goYykpIHtcclxuICAgICAgbWF0Y2hlZC5wdXNoKGEpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbWF0Y2hlZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tfYWxsX2NvbGxpc2lvbnMoYzogY29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sZXhlbXB0aW9uOnN0cmluZ1tdID0gW10pOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgbGV0IG1hdGNoZWQgPSBbXTtcclxuICBmb3IgKGxldCBhIG9mIG9ianMpIHtcclxuICAgIGlmIChleGVtcHRpb24uaW5kZXhPZihhLmlkKSA9PSAtMSAmJiBhLmNvbGxpc2lvbiAmJiBhLmNvbGxpZGVzX3dpdGhfYm94KGMpKSB7XHJcbiAgICAgIG1hdGNoZWQucHVzaChhKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG1hdGNoZWRcclxufVxyXG4vL0NoZWNrcyB1cCB0byB0aGUgZmlyc3QgY29sbGlzaW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja19jb2xsaXNpb25zKGM6IGNvbGxpc2lvbl9ib3gsIG9ianM6IEFycmF5PG9iajx1bmtub3duPj4sIGV4ZW1wdGlvbjpzdHJpbmcpIHtcclxuICBmb3IgKGxldCBhIG9mIG9ianMpIHtcclxuICAgIGlmIChhLmlkICE9PSBleGVtcHRpb24gJiYgYS5jb2xsaXNpb24gJiYgYS5jb2xsaWRlc193aXRoX2JveChjKSkge1xyXG4gICAgICByZXR1cm4gYTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlbG9jaXR5X21heCh2ZWxvY2l0eTpudW1iZXIsYm94OmNvbGxpc2lvbl9ib3gsb2JqczpBcnJheTxvYmo8dW5rbm93bj4+LCBleGVtcHRpb246c3RyaW5nLGRpcjpkaXJlY3Rpb24pe1xyXG4gIGxldCBjb2xsaXNpb24gPSBjaGVja19jb2xsaXNpb25zKGJveCwgb2JqcywgZXhlbXB0aW9uKTtcclxuICBpZihjb2xsaXNpb24gPT0gbnVsbCl7XHJcbiAgICByZXR1cm4gdmVsb2NpdHk7XHJcbiAgfVxyXG4gIGVsc2V7XHJcbiAgICBsZXQgY29sbGlkZXIgPSBjb2xsaXNpb247XHJcbiAgICBsZXQgb3JpZ2luID0gZ2V0SWQob2JqcyxleGVtcHRpb24pO1xyXG4gICAgbGV0IG9yaWdfc3QgPSBvcmlnaW4uc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IGNvbGxpZGVyX3N0ID0gY29sbGlkZXIuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgaWYoZGlyID09IGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgcmV0dXJuIChvcmlnX3N0LnBvc2l0aW9uLnggLSBvcmlnaW4ud2lkdGgvMikgLSAoY29sbGlkZXJfc3QucG9zaXRpb24ueCArIGNvbGxpZGVyLndpZHRoLzIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgcmV0dXJuIChjb2xsaWRlcl9zdC5wb3NpdGlvbi54IC0gY29sbGlkZXIud2lkdGgvMikgLSAob3JpZ19zdC5wb3NpdGlvbi54ICsgb3JpZ2luLndpZHRoLzIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLmRvd24pe1xyXG4gICAgICByZXR1cm4gKG9yaWdfc3QucG9zaXRpb24ueSAtIG9yaWdpbi5oZWlnaHQvMikgLSAoY29sbGlkZXJfc3QucG9zaXRpb24ueSArIGNvbGxpZGVyLmhlaWdodC8yKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZGlyID09IGRpcmVjdGlvbi51cCl7XHJcbiAgICAgIHJldHVybiAoY29sbGlkZXJfc3QucG9zaXRpb24ueSAtIGNvbGxpZGVyLmhlaWdodC8yKSAtIChvcmlnX3N0LnBvc2l0aW9uLnkgKyBvcmlnaW4uaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayhvYmplY3Q6b2JqPHVua25vd24+LGxpc3Q6QXJyYXk8b2JqPHVua25vd24+Pikge1xyXG4gIGxpc3QgPSBbLi4ubGlzdF07XHJcbiAgbGV0IG9iID0gb2JqZWN0O1xyXG4gIGxldCBzdCA9IG9iamVjdC5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgbGV0IHhfdmVsID0gc3QudmVsb2NpdHkueDtcclxuICBsZXQgeV92ZWwgPSBzdC52ZWxvY2l0eS55O1xyXG4gIGlmKCFvYi5jb2xsaXNpb24pe1xyXG4gICAgKDxvYmpfc3RhdGU+b2Iuc3RhdGUpLnBvc2l0aW9uLnggKz0gKDxvYmpfc3RhdGU+b2Iuc3RhdGUpLnZlbG9jaXR5Lng7XHJcbiAgICAoPG9ial9zdGF0ZT5vYi5zdGF0ZSkucG9zaXRpb24ueSArPSAoPG9ial9zdGF0ZT5vYi5zdGF0ZSkudmVsb2NpdHkueTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgaWYgKHhfdmVsID4gMCkge1xyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgeDogc3QucG9zaXRpb24ueCArIG9iLndpZHRoLzIgKyB4X3ZlbC8yLFxyXG4gICAgICB5OiBzdC5wb3NpdGlvbi55LFxyXG4gICAgICB3aWR0aDogeF92ZWwsXHJcbiAgICAgIGhlaWdodDogb2IuaGVpZ2h0XHJcbiAgICB9O1xyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS54LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi5yaWdodCk7XHJcbiAgICBpZih2ZWwgPiAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueCArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS54ID0gMDsgIFxyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIGlmICh4X3ZlbCA8IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHhfdmVsLzIgKyBzdC5wb3NpdGlvbi54IC0gb2Iud2lkdGgvMixcclxuICAgICAgeTogc3QucG9zaXRpb24ueSxcclxuICAgICAgd2lkdGg6IC0xICogeF92ZWwsXHJcbiAgICAgIGhlaWdodDogb2IuaGVpZ2h0XHJcbiAgICB9XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LngsYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLmxlZnQpO1xyXG4gICAgaWYodmVsIDwgMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnggKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueCA9IDA7IFxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoeV92ZWwgPiAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54LFxyXG4gICAgICB5OiBzdC5wb3NpdGlvbi55ICsgb2IuaGVpZ2h0LzIgKyB5X3ZlbC8yLFxyXG4gICAgICB3aWR0aDogb2Iud2lkdGgsXHJcbiAgICAgIGhlaWdodDogeV92ZWxcclxuICAgIH1cclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueSxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24udXApO1xyXG4gICAgaWYodmVsID4gMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnkgKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueSA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGVsc2UgaWYgKHlfdmVsIDwgMCkge1xyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgeDogc3QucG9zaXRpb24ueCxcclxuICAgICAgeTogeV92ZWwvMiArIHN0LnBvc2l0aW9uLnkgLSBvYi5oZWlnaHQvMixcclxuICAgICAgd2lkdGg6IG9iLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IC0xICogeV92ZWxcclxuICAgIH1cclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueSxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24uZG93bik7XHJcbiAgICBpZih2ZWwgPCAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueSArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS55ID0gMDtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQge0dldFNjcmVlbkRpbWVuc2lvbnMsR2V0Vmlld3BvcnREaW1lbnNpb25zLGdldEdhbWV9IGZyb20gXCIuLi92YW5cIjtcclxuaW1wb3J0IHsgY29sbGlzaW9uX2JveCB9IGZyb20gXCIuL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge29ian0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcblxyXG5pbnRlcmZhY2UgbW91c2VQb3N7XHJcbiAgeDpudW1iZXIsXHJcbiAgeTpudW1iZXIsXHJcbiAgbGFzdDp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY29udHJvbF9mdW5je1xyXG4gICgpOnZvaWRcclxufVxyXG5cclxuaW50ZXJmYWNlIG1vdXNlQmluZHN7XHJcbiAgW2tleTpzdHJpbmddOiBBcnJheTxbY29udHJvbF9mdW5jLG9iajx1bmtub3duPl0+XHJcbn1cclxuXHJcbmludGVyZmFjZSBrZXlCaW5kc3tcclxuICBba2V5OnN0cmluZ106IEFycmF5PGNvbnRyb2xfZnVuYz5cclxufVxyXG5sZXQgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXJnZXRcIik7XHJcbnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZSk9PntcclxuICBsZXQgbW91c2UgPSBQb2xsX01vdXNlKCk7XHJcbiAgbGV0IGJveDpjb2xsaXNpb25fYm94ID0ge1xyXG4gICAgeDptb3VzZS54LFxyXG4gICAgeTptb3VzZS55LFxyXG4gICAgaGVpZ2h0OjEsXHJcbiAgICB3aWR0aDoxXHJcbiAgfTtcclxuICBsZXQgZCA9IFsuLi5hbGxfYmluZHNdO1xyXG4gIGZvcihsZXQgYSA9IDA7YSA8IGQubGVuZ3RoO2ErKyl7XHJcbiAgICBsZXQgc2VsZWN0ZWQgPSBkW2FdO1xyXG4gICAgaWYoc2VsZWN0ZWQudHlwZSA9PT0gYnR5cGUubW91c2UgJiYgc2VsZWN0ZWQua2V5ID09PSBcIm1vdXNlMVwiICYmIHNlbGVjdGVkLmV4ZWN1dGUgPT0gZXhlY190eXBlLm9uY2Upe1xyXG4gICAgICBpZihzZWxlY3RlZC5vYmogIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYoc2VsZWN0ZWQub2JqLmNvbGxpZGVzX3dpdGhfYm94KGJveCkpe1xyXG4gICAgICAgICAgc2VsZWN0ZWQuZnVuY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBzZWxlY3RlZC5mdW5jdGlvbigpOyAgICAgICAgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9ICBcclxufSlcclxuXHJcbnRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGxldCBkID0gWy4uLmFsbF9iaW5kc107XHJcbiAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbGxfYmluZHMubGVuZ3RoOyBhKyspIHtcclxuICAgIGxldCBzZWxlY3RlZCA9IGRbYV07XHJcbiAgICBpZiAoc2VsZWN0ZWQudHlwZSA9PT0gYnR5cGUubW91c2UgJiYgc2VsZWN0ZWQua2V5ID09PSBlLnR5cGUgICYmICFzZWxlY3RlZC5leGVjdXRlZCkge1xyXG4gICAgICBpZihzZWxlY3RlZC5leGVjdXRlID09PSBleGVjX3R5cGUub25jZSl7XHJcbiAgICAgICAgc2VsZWN0ZWQuZnVuY3Rpb24oKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5yZXBlYXQpe1xyXG4gICAgICAgIHNlbGVjdGVkLnJlcGVhdF90aW1lci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHNlbGVjdGVkLmV4ZWN1dGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKGUpID0+IHtcclxuICBsZXQgZCA9IFsuLi5hbGxfYmluZHNdO1xyXG4gIGZvciAobGV0IGEgPSAwOyBhIDwgYWxsX2JpbmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWQgPSBkW2FdO1xyXG4gICAgaWYgKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLm1vdXNlICYmIChzZWxlY3RlZC5rZXkgPT09IGUudHlwZSkgJiYgc2VsZWN0ZWQuZXhlY3V0ZWQgJiYgc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLm9uY2UpIHtcclxuICAgICAgIHNlbGVjdGVkLmV4ZWN1dGVkID0gZmFsc2U7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihzZWxlY3RlZC50eXBlID09PSBidHlwZS5tb3VzZSAmJiAoc2VsZWN0ZWQua2V5ID09PSBlLnR5cGUgfHwgc2VsZWN0ZWQua2V5ID09IFwibW91c2Vkb3duXCIpICYmIHNlbGVjdGVkLmV4ZWN1dGVkICYmIHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5yZXBlYXQpe1xyXG4gICAgICBsZXQgZyA9IFsuLi5yZXBlYXRfYmluZHNdO1xyXG4gICAgICBmb3IobGV0IGEgPSAwOyBhIDwgZy5sZW5ndGg7YSsrKXtcclxuICAgICAgICBpZihnW2FdLmJpbmQuaWQgPT09IHNlbGVjdGVkLmlkKXtcclxuICAgICAgICAgIHNlbGVjdGVkLmV4ZWN1dGVkID0gZmFsc2U7XHJcbiAgICAgICAgICBnW2FdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XHJcbiAgbGV0IGQgPSBbLi4uYWxsX2JpbmRzXTtcclxuICBmb3IgKGxldCBhID0gMDsgYSA8IGFsbF9iaW5kcy5sZW5ndGg7IGErKykge1xyXG4gICAgbGV0IHNlbGVjdGVkID0gZFthXTtcclxuICAgIGlmIChzZWxlY3RlZC50eXBlID09PSBidHlwZS5rZXlib2FyZCAmJiBzZWxlY3RlZC5rZXkgPT09IGUuY29kZSAgJiYgIXNlbGVjdGVkLmV4ZWN1dGVkKSB7XHJcbiAgICAgIGlmKHNlbGVjdGVkLmV4ZWN1dGUgPT09IGV4ZWNfdHlwZS5vbmNlKXtcclxuICAgICAgICBzZWxlY3RlZC5mdW5jdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYoc2VsZWN0ZWQuZXhlY3V0ZSA9PT0gZXhlY190eXBlLnJlcGVhdCl7XHJcbiAgICAgICAgZm9yKGxldCBjIG9mIHJlcGVhdF9iaW5kcyl7XHJcbiAgICAgICAgICBpZihjLmJpbmQuaWQgPT0gc2VsZWN0ZWQuaWQpe1xyXG4gICAgICAgICAgICBjLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzZWxlY3RlZC5leGVjdXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG59KVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XHJcbiAgbGV0IGQgPSBbLi4uYWxsX2JpbmRzXTtcclxuICBmb3IgKGxldCBhID0gMDsgYSA8IGFsbF9iaW5kcy5sZW5ndGg7IGErKykge1xyXG4gICAgbGV0IHNlbGVjdGVkID0gZFthXTtcclxuICAgIGlmIChzZWxlY3RlZC50eXBlID09PSBidHlwZS5rZXlib2FyZCAmJiBzZWxlY3RlZC5rZXkgPT09IGUuY29kZSAmJiBzZWxlY3RlZC5leGVjdXRlZCkge1xyXG4gICAgICBpZihzZWxlY3RlZC5leGVjdXRlID09PSBleGVjX3R5cGUub25jZSApe1xyXG4gICAgICAgIHNlbGVjdGVkLmV4ZWN1dGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZihzZWxlY3RlZC5leGVjdXRlID09PSBleGVjX3R5cGUucmVwZWF0KXtcclxuICAgICAgICBsZXQgZyA9IFsuLi5yZXBlYXRfYmluZHNdO1xyXG4gICAgICAgIGZvcihsZXQgYSA9IDA7IGEgPCBnLmxlbmd0aDthKyspe1xyXG4gICAgICAgICAgaWYoZ1thXS5iaW5kLmlkID09PSBzZWxlY3RlZC5pZCl7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkLmV4ZWN1dGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGdbYV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pXHJcbmxldCB0cmFja2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXJnZXRcIik7XHJcbnRyYWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZSkgPT4ge1xyXG4gIHZhciByZWN0ID0gKGUudGFyZ2V0IGFzIEhUTUxDYW52YXNFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA7XHJcbiAgXHJcbiAgbGFzdF94ID0geDtcclxuICBsYXN0X3kgPSB5O1xyXG4gIHggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7IC8veCBwb3NpdGlvbiB3aXRoaW4gdGhlIGVsZW1lbnQuXHJcbiAgeSA9IGUuY2xpZW50WSAtIHJlY3QudG9wOyAgLy95IHBvc2l0aW9uIHdpdGhpbiB0aGUgZWxlbWVudC5cclxuXHJcbn0pXHJcblxyXG5lbnVtIGJ0eXBle1xyXG4gIG1vdXNlLFxyXG4gIGtleWJvYXJkXHJcbn1cclxuXHJcbmludGVyZmFjZSBiaW5ke1xyXG4gIGtleTpzdHJpbmcsXHJcbiAgdHlwZTpidHlwZSxcclxuICBpZDpudW1iZXIsXHJcbiAgZnVuY3Rpb246Y29udHJvbF9mdW5jLFxyXG4gIGV4ZWN1dGU6ZXhlY190eXBlLFxyXG4gIHJlcGVhdF90aW1lcj86cmVwZWF0X2JpbmQsXHJcbiAgb2JqPzpvYmo8dW5rbm93bj4sXHJcbiAgZXhlY3V0ZWQ/OmJvb2xlYW4sXHJcbiAgaW50ZXJ2YWw/Om51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgcmVwZWF0X2JpbmR7XHJcbiAgYmluZDpiaW5kLFxyXG4gIHRpbWVyOm51bWJlcixcclxuICBpbnRlcnZhbDpudW1iZXIsXHJcbiAgYWN0aXZlOmJvb2xlYW5cclxufVxyXG5cclxubGV0IHggPSAwO1xyXG5sZXQgeSA9IDA7XHJcbmxldCBsYXN0X3ggPSAwO1xyXG5sZXQgbGFzdF95ID0gMDtcclxubGV0IGJpbmRzOmtleUJpbmRzID0ge307XHJcbmxldCBtb3VzZUJpbmRzOm1vdXNlQmluZHMgPSB7fTtcclxubGV0IGJpbmRfY291bnQgPSAwO1xyXG5cclxubGV0IGFsbF9iaW5kczpBcnJheTxiaW5kPiA9IFtdXHJcblxyXG5sZXQgcmVwZWF0X2JpbmRzOkFycmF5PHJlcGVhdF9iaW5kPiA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBvbGxfTW91c2UoKTptb3VzZVBvc3tcclxuICBsZXQgaGVpZ2h0ID0gR2V0Vmlld3BvcnREaW1lbnNpb25zKCkuaGVpZ2h0O1xyXG4gIGxldCBjYW52YXMgPSBnZXRHYW1lKCkuc3RhdGUuY2FudmFzO1xyXG4gIGxldCB3cmF0aW8gPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcykud2lkdGgpL0dldFZpZXdwb3J0RGltZW5zaW9ucygpLndpZHRoO1xyXG4gIGxldCB2cmF0aW8gPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcykuaGVpZ2h0KS9HZXRWaWV3cG9ydERpbWVuc2lvbnMoKS5oZWlnaHQ7XHJcbiAgbGV0IGNhbWVyYSA9IGdldEdhbWUoKS5zdGF0ZS5jYW1lcmFzWzBdO1xyXG4gIHJldHVybiAoe1xyXG4gICAgeDogKHgvd3JhdGlvL2NhbWVyYS5zdGF0ZS5zY2FsaW5nICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnggLSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aC8yKSAsXHJcbiAgICB5OiAoKGhlaWdodCAtIHkvdnJhdGlvKS9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55IC0gY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0LzIpLFxyXG4gICAgbGFzdDp7XHJcbiAgICAgIHg6ICh4L3dyYXRpby9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54KSxcclxuICAgICAgeTogKChoZWlnaHQgLSB5L3ZyYXRpbykvY2FtZXJhLnN0YXRlLnNjYWxpbmcgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueSlcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRXhlY3V0ZVJlcGVhdEJpbmRzKGI6bnVtYmVyKXtcclxuICBmb3IobGV0IGEgb2YgcmVwZWF0X2JpbmRzKXtcclxuICAgIGlmKGEuYmluZC5leGVjdXRlID09PSBleGVjX3R5cGUucmVwZWF0ICYmIGEudGltZXIgPT0gMCAmJiBhLmFjdGl2ZSl7XHJcbiAgICAgIGEuYmluZC5mdW5jdGlvbigpO1xyXG4gICAgfVxyXG4gICAgaWYoYS5hY3RpdmUgfHwgKCFhLmFjdGl2ZSAmJiBhLnRpbWVyICE9IDApKVxyXG4gICAgICBhLnRpbWVyICs9IGI7XHJcbiAgICBpZihhLnRpbWVyID4gYS5pbnRlcnZhbCl7XHJcbiAgICAgIGEudGltZXIgPSAwOyBcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBVbmJpbmQoYmluZF9pZDpudW1iZXIpe1xyXG4gIGZvcihsZXQgYSA9IDA7YSA8IGFsbF9iaW5kcy5sZW5ndGg7IGErKyl7XHJcbiAgICBpZihhbGxfYmluZHNbYV0uaWQgPT0gYmluZF9pZCl7XHJcbiAgICAgIGFsbF9iaW5kcy5zcGxpY2UoYSwxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gZXhlY190eXBle1xyXG4gIG9uY2UsXHJcbiAgcmVwZWF0XHJcbn1cclxuXHJcbmxldCBpZCA9IDA7XHJcbmV4cG9ydCBmdW5jdGlvbiBCaW5kKGtleW5hbWU6c3RyaW5nLGZ1bmM6Y29udHJvbF9mdW5jLHR5cGU6ZXhlY190eXBlLGludGVydmFsOm51bWJlcixvYmplY3Q/Om9iajx1bmtub3duPik6bnVtYmVye1xyXG4gIGlmKGtleW5hbWUuc2xpY2UoMCw1KSA9PT0gXCJtb3VzZVwiKXtcclxuICAgIGxldCBiOmJpbmQgPSB7XHJcbiAgICAgIGtleTprZXluYW1lLFxyXG4gICAgICB0eXBlOmJ0eXBlLm1vdXNlLFxyXG4gICAgICBpZCxcclxuICAgICAgZnVuY3Rpb246ZnVuYyxcclxuICAgICAgb2JqOm9iamVjdCxcclxuICAgICAgZXhlY3V0ZTp0eXBlLFxyXG4gICAgICBleGVjdXRlZDpmYWxzZSxcclxuICAgICAgaW50ZXJ2YWxcclxuICAgIH07XHJcbiAgICBpZih0eXBlID09IGV4ZWNfdHlwZS5yZXBlYXQpe1xyXG4gICAgICBiLnJlcGVhdF90aW1lciA9IHtcclxuICAgICAgICBiaW5kOmIsXHJcbiAgICAgICAgdGltZXI6MCxcclxuICAgICAgICBpbnRlcnZhbCxcclxuICAgICAgICBhY3RpdmU6ZmFsc2VcclxuICAgICAgfVxyXG4gICAgICByZXBlYXRfYmluZHMucHVzaChiLnJlcGVhdF90aW1lcik7XHJcbiAgICB9XHJcbiAgICBhbGxfYmluZHMucHVzaChiKTtcclxuXHJcbiAgfVxyXG4gIGVsc2V7XHJcbiAgICBsZXQgYjpiaW5kID0ge1xyXG4gICAgICBrZXk6a2V5bmFtZSxcclxuICAgICAgdHlwZTpidHlwZS5rZXlib2FyZCxcclxuICAgICAgaWQsXHJcbiAgICAgIGZ1bmN0aW9uOmZ1bmMsXHJcbiAgICAgIGV4ZWN1dGU6dHlwZSxcclxuICAgICAgZXhlY3V0ZWQ6ZmFsc2UsXHJcbiAgICAgIGludGVydmFsXHJcbiAgICB9XHJcbiAgICBpZih0eXBlID09IGV4ZWNfdHlwZS5yZXBlYXQpe1xyXG4gICAgICBiLnJlcGVhdF90aW1lciA9IHtcclxuICAgICAgICBiaW5kOmIsXHJcbiAgICAgICAgdGltZXI6MCxcclxuICAgICAgICBpbnRlcnZhbCxcclxuICAgICAgICBhY3RpdmU6ZmFsc2VcclxuICAgICAgfVxyXG4gICAgICByZXBlYXRfYmluZHMucHVzaChiLnJlcGVhdF90aW1lcik7XHJcbiAgICB9XHJcbiAgICBhbGxfYmluZHMucHVzaChiKTtcclxuICB9XHJcbiAgaWQrKztcclxuICByZXR1cm4gaWQgLSAxO1xyXG59IiwiaW1wb3J0IHtvYmp9IGZyb20gXCIuL29iamVjdFwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi92YW5cIjtcclxuaW1wb3J0IHsgR29vbWJhIH0gZnJvbSBcIi4uL2dhbWUvb2JqZWN0cy9nb29tYmFcIjtcclxuXHJcbmludGVyZmFjZSBIdWRUZXh0R2V0RnVuY3tcclxuICAoKTpzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZXh0U2V0dGluZ3tcclxuICB4Om51bWJlcixcclxuICB5Om51bWJlcixcclxuICBmb250OkZvbnRcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGb250e1xyXG4gIG1heF93aWR0aD86bnVtYmVyLFxyXG4gIHNpemU6bnVtYmVyLFxyXG4gIGZvbnQ6c3RyaW5nLFxyXG4gIGNvbG9yOnN0cmluZyxcclxuICB0ZXh0OnN0cmluZyxcclxuICBhbGlnbjpDYW52YXNUZXh0QWxpZ25cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIdWRUZXh0e1xyXG4gIG1heF93aWR0aD86bnVtYmVyLFxyXG4gIHBvc2l0aW9uOntcclxuICAgIHg6bnVtYmVyLFxyXG4gICAgeTpudW1iZXJcclxuICB9XHJcbiAgc2l6ZTpudW1iZXI7XHJcbiAgZm9udDpzdHJpbmc7XHJcbiAgY29sb3I6c3RyaW5nO1xyXG4gIHRleHQ/OnN0cmluZztcclxuICBhbGlnbj86Q2FudmFzVGV4dEFsaWduO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBIVUR7XHJcbiAgZ3JhcGhpY19lbGVtZW50czpBcnJheTxvYmo8dW5rbm93bj4+ID0gW107XHJcbiAgdGV4dF9lbGVtZW50czpBcnJheTxUZXh0PiA9IFtdO1xyXG4gIHN0YXRlZihhOm51bWJlcil7XHJcbiAgICBmb3IobGV0IHggb2YgdGhpcy5ncmFwaGljX2VsZW1lbnRzKXtcclxuICAgICAgeC5zdGF0ZWYoYSk7XHJcbiAgICB9XHJcbiAgICBmb3IobGV0IHggb2YgdGhpcy50ZXh0X2VsZW1lbnRzKXtcclxuICAgICAgeC5zdGF0ZWYoYSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dHtcclxuICBnZXRfZnVuYzpIdWRUZXh0R2V0RnVuYztcclxuICBzdGF0ZTpIdWRUZXh0O1xyXG4gIGNvbnN0cnVjdG9yKGE6SHVkVGV4dCxiOkh1ZFRleHRHZXRGdW5jKXtcclxuICAgIGlmKCFhLmFsaWduKXtcclxuICAgICAgYS5hbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlID0gYTtcclxuICAgIGlmKCF0aGlzLnN0YXRlLnRleHQpe1xyXG4gICAgICB0aGlzLnN0YXRlLnRleHQgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nZXRfZnVuYyA9IGI7XHJcbiAgfVxyXG4gIHN0YXRlZihhOm51bWJlcil7XHJcbiAgIHRoaXMuc3RhdGUudGV4dCA9IHRoaXMuZ2V0X2Z1bmMoKTtcclxuICB9XHJcbiAgcmVuZGVyZihhOm51bWJlcik6Rm9udHtcclxuICAgIGxldCB7c2l6ZSxjb2xvcixmb250LHRleHQsbWF4X3dpZHRoLGFsaWdufSA9IHRoaXMuc3RhdGU7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzaXplLFxyXG4gICAgICBjb2xvcixcclxuICAgICAgZm9udCxcclxuICAgICAgdGV4dCxcclxuICAgICAgbWF4X3dpZHRoLFxyXG4gICAgICBhbGlnblxyXG4gICAgfTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBzdGF0ZV9mdW5jLCBvYmpfc3RhdGUgfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5pbXBvcnQgeyByZW5kZXJfZnVuYyB9IGZyb20gXCIuL3JlbmRlclwiO1xyXG5pbXBvcnQgeyBzcHJpdGUsIHNwcml0ZV9nZW4gfSBmcm9tIFwiLi9zcHJpdGVcIjtcclxuaW1wb3J0IHsgY29sbGlzaW9uX2JveCB9IGZyb20gXCIuL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQgeyBnZXRHYW1lIH0gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQgeyBVbmJpbmQsIEJpbmQsIGNvbnRyb2xfZnVuYywgZXhlY190eXBlIH0gZnJvbSBcIi4vY29udHJvbHNcIjtcclxuaW1wb3J0IHthdWRpb30gZnJvbSBcIi4vYXVkaW9cIjtcclxuXHJcbmludGVyZmFjZSBvYmpfaTxUPiB7XHJcbiAgc3RhdGVmOiBzdGF0ZV9mdW5jPFQ+LFxyXG4gIHJlbmRlcmY6IHJlbmRlcl9mdW5jXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByb3RhdGlvbl9sZW5ndGgobGVuZ3RoOiBudW1iZXIsIGRlZ3JlZTogbnVtYmVyKSB7XHJcbiAgbGV0IGFfbGVuID0gbGVuZ3RoICogTWF0aC5zaW4oZGVncmVlICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgbGV0IGJfbGVuID0gbGVuZ3RoICogTWF0aC5jb3MoZGVncmVlICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHg6IGFfbGVuLFxyXG4gICAgeTogYl9sZW5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJZChhOiBBcnJheTxvYmo8dW5rbm93bj4+LCBpZDogc3RyaW5nKTogb2JqPHVua25vd24+IHtcclxuICBmb3IgKGxldCBiID0gMDsgYiA8IGEubGVuZ3RoOyBiKyspIHtcclxuICAgIGlmIChhW2JdLmlkID09IGlkKSB7XHJcbiAgICAgIHJldHVybiBhW2JdO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5sZXQgY291bnRlciA9IDA7XHJcblxyXG5pbnRlcmZhY2UgYW5pbV9zdG9yYWdlIHtcclxuICBbaW5kZXg6IHN0cmluZ106IFtBcnJheTxbbnVtYmVyLCBzcHJpdGVdPiwgbnVtYmVyXVxyXG59XHJcblxyXG5pbnRlcmZhY2Ugdm9pZF9mdW5jIHtcclxuICAoKTogdm9pZFxyXG59XHJcblxyXG5jbGFzcyBhbmltYXRpb25zIHtcclxuICBhbmltYXRpb25zOiBhbmltX3N0b3JhZ2UgPSB7fTtcclxuICBhbmltYXRpb25fdHJhY2tlciA9IDA7XHJcbiAgY3VycmVudDogc3RyaW5nO1xyXG4gIGNhbGxiYWNrOiB2b2lkX2Z1bmM7XHJcbiAgYWRkKG5hbWU6IHN0cmluZywgczogQXJyYXk8W251bWJlciwgc3ByaXRlXT4sIGxlbmd0aDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmFuaW1hdGlvbnNbbmFtZV0gPSBbcywgbGVuZ3RoXTtcclxuICB9XHJcbiAgcGxheShuYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogdm9pZF9mdW5jKSB7XHJcbiAgICB0aGlzLmN1cnJlbnQgPSBuYW1lO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgdGhpcy5hbmltYXRpb25fdHJhY2tlciA9IDA7XHJcbiAgfVxyXG4gIHJlbmRlcmYodDogbnVtYmVyKTogc3ByaXRlIHtcclxuICAgIGxldCBjdXJyX2FuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9uc1t0aGlzLmN1cnJlbnRdWzBdO1xyXG4gICAgbGV0IGxlbmd0aDogbnVtYmVyID0gdGhpcy5hbmltYXRpb25zW3RoaXMuY3VycmVudF1bMV07XHJcbiAgICBsZXQgaW5kZXg7XHJcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBjdXJyX2FuaW1hdGlvbi5sZW5ndGggLSAxOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmFuaW1hdGlvbl90cmFja2VyID49IGN1cnJfYW5pbWF0aW9uW2luZGV4XVswXSAmJiB0aGlzLmFuaW1hdGlvbl90cmFja2VyIDwgY3Vycl9hbmltYXRpb25baW5kZXggKyAxXVswXSkge1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uX3RyYWNrZXIgPSB0aGlzLmFuaW1hdGlvbl90cmFja2VyICsgdDtcclxuICAgICAgICByZXR1cm4gY3Vycl9hbmltYXRpb25baW5kZXhdWzFdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICB0aGlzLmNhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5hbmltYXRpb25fdHJhY2tlciA+PSBsZW5ndGgpIHtcclxuICAgICAgdGhpcy5hbmltYXRpb25fdHJhY2tlciA9IDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5hbmltYXRpb25fdHJhY2tlciArPSB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJfYW5pbWF0aW9uW2luZGV4XVsxXTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBvYmo8VD57XHJcbiAgc3ByaXRlX3VybCA9IFwiXCI7XHJcbiAgc3ByaXRlX3NoZWV0OiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIHN0YXRlOiBUO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgY29sbGlzaW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY29sbGlzaW9uX2JveDogY29sbGlzaW9uX2JveFxyXG4gIGlkOiBzdHJpbmc7XHJcbiAgYmluZHM6IEFycmF5PG51bWJlcj47XHJcbiAgcm90YXRpb246IG51bWJlciA9IDA7XHJcbiAgcmVuZGVyID0gdHJ1ZTtcclxuICBhbmltYXRpb25zID0gbmV3IGFuaW1hdGlvbnMoKTtcclxuICBhdWRpbyA9IG5ldyBhdWRpbygpO1xyXG4gIGxhc3RfcmVuZGVyOm51bWJlciA9IDA7XHJcbiAgZ2V0U3RhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfYW5pbWF0aW9ucygpIHtcclxuXHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2F1ZGlvKCkge1xyXG5cclxuICB9XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmlkID0gXCJcIiArIGNvdW50ZXI7XHJcbiAgICB0aGlzLmJpbmRzID0gW107XHJcbiAgICBjb3VudGVyKys7XHJcbiAgICB0aGlzLnJlZ2lzdGVyX2NvbnRyb2xzKCk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyX2F1ZGlvKCk7XHJcbiAgfVxyXG4gIGxvYWQoKSB7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IGEgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgYS5zcmMgPSB0aGlzLnNwcml0ZV91cmw7XHJcbiAgICAgIGEub25sb2FkID0gKGFzeW5jICgpID0+IHtcclxuICAgICAgICBfdGhpcy5zcHJpdGVfc2hlZXQgPSBhO1xyXG4gICAgICAgIF90aGlzLnJlZ2lzdGVyX2FuaW1hdGlvbnMoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmF1ZGlvLmxvYWQoKTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9XHJcbiAgYW5nbGVUb3dhcmRzKGE6IG9iajx1bmtub3duPik6IG51bWJlciB7XHJcbiAgICBsZXQgYiA9IGEgYXMgb2JqPG9ial9zdGF0ZT47XHJcbiAgICBsZXQgc3RhdGUgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgaWYgKHN0YXRlLnBvc2l0aW9uLnggPCBiLnN0YXRlLnBvc2l0aW9uLnggJiYgc3RhdGUucG9zaXRpb24ueSA+IGIuc3RhdGUucG9zaXRpb24ueVxyXG4gICAgICB8fCAoc3RhdGUucG9zaXRpb24ueCA8IGIuc3RhdGUucG9zaXRpb24ueCAmJiBzdGF0ZS5wb3NpdGlvbi55IDwgYi5zdGF0ZS5wb3NpdGlvbi55KSkge1xyXG4gICAgICByZXR1cm4gOTAgLSBNYXRoLmF0YW4oKGIuc3RhdGUucG9zaXRpb24ueSAtIHN0YXRlLnBvc2l0aW9uLnkpIC8gKGIuc3RhdGUucG9zaXRpb24ueCAtIHN0YXRlLnBvc2l0aW9uLngpKSAqIDE4MCAvIE1hdGguUElcclxuICAgIH1cclxuICAgIGlmIChzdGF0ZS5wb3NpdGlvbi54ID4gYi5zdGF0ZS5wb3NpdGlvbi54ICYmIHN0YXRlLnBvc2l0aW9uLnkgPCBiLnN0YXRlLnBvc2l0aW9uLnlcclxuICAgICAgfHwgc3RhdGUucG9zaXRpb24ueCA+IGIuc3RhdGUucG9zaXRpb24ueCAmJiBzdGF0ZS5wb3NpdGlvbi55ID4gYi5zdGF0ZS5wb3NpdGlvbi55KSB7XHJcbiAgICAgIHJldHVybiAyNzAgLSBNYXRoLmF0YW4oKGIuc3RhdGUucG9zaXRpb24ueSAtIHN0YXRlLnBvc2l0aW9uLnkpIC8gKGIuc3RhdGUucG9zaXRpb24ueCAtIHN0YXRlLnBvc2l0aW9uLngpKSAqIDE4MCAvIE1hdGguUElcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuICBiaW5kQ29udHJvbChrZXk6IHN0cmluZywgeDogZXhlY190eXBlLCBmdW5jOiBjb250cm9sX2Z1bmMsIGludGVydmFsID0gMSkge1xyXG4gICAgaWYgKGtleSA9PSBcIm1vdXNlMVwiKSB7XHJcbiAgICAgIGxldCBiID0gQmluZChrZXksIGZ1bmMsIHgsIGludGVydmFsLCB0aGlzKTtcclxuICAgICAgdGhpcy5iaW5kcy5wdXNoKGIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuYmluZHMucHVzaChCaW5kKGtleSwgZnVuYywgeCwgaW50ZXJ2YWwpKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKSB7XHJcblxyXG4gIH1cclxuICBkZWxldGUoKSB7XHJcbiAgICBmb3IgKGxldCBhIG9mIHRoaXMuYmluZHMpIHtcclxuICAgICAgVW5iaW5kKGEpO1xyXG4gICAgfVxyXG4gICAgZ2V0R2FtZSgpLmdldFJvb20oKS5kZWxldGVJdGVtKHRoaXMuaWQpO1xyXG4gIH1cclxuICBjb2xsaXNpb25fY2hlY2soYTogY29sbGlzaW9uX2JveCk6IEFycmF5PG9iajx1bmtub3duPj4ge1xyXG4gICAgaWYgKHRoaXMuY29sbGlzaW9uKSB7XHJcbiAgICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKTtcclxuICAgICAgcmV0dXJuIHJvb20uY2hlY2tfY29sbGlzaW9ucyhhLCBbdGhpcy5pZF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuICBzdGF0ZWYodGltZTogbnVtYmVyKSB7XHJcbiAgfVxyXG4gIGNvbGxpZGVzX3dpdGhfYm94KGE6IGNvbGxpc2lvbl9ib3gpOiBib29sZWFuIHtcclxuICAgIGxldCBzdCA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgaGNvbGxpZGVzID0gZmFsc2UsIHZjb2xsaWRlcyA9IGZhbHNlO1xyXG4gICAgbGV0IG9iID0ge1xyXG4gICAgICBsZWZ0OiAoc3QucG9zaXRpb24ueCAtIHRoaXMud2lkdGggLyAyKSxcclxuICAgICAgcmlnaHQ6IChzdC5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCAvIDIpLFxyXG4gICAgICB0b3A6IChzdC5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQgLyAyKSxcclxuICAgICAgYm90dG9tOiAoc3QucG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0IC8gMilcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICBsZWZ0OiAoYS54IC0gYS53aWR0aCAvIDIpLFxyXG4gICAgICByaWdodDogKGEueCArIGEud2lkdGggLyAyKSxcclxuICAgICAgdG9wOiAoYS55ICsgYS5oZWlnaHQgLyAyKSxcclxuICAgICAgYm90dG9tOiAoYS55IC0gYS5oZWlnaHQgLyAyKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICgob2IubGVmdCA+PSBib3gubGVmdCAmJiBvYi5sZWZ0IDwgYm94LnJpZ2h0KSB8fCAoYm94LmxlZnQgPiBvYi5sZWZ0ICYmIGJveC5sZWZ0IDwgb2IucmlnaHQpKSB7XHJcbiAgICAgIGhjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoKG9iLmJvdHRvbSA+PSBib3guYm90dG9tICYmIG9iLmJvdHRvbSA8IGJveC50b3ApIHx8IChib3guYm90dG9tID4gb2IuYm90dG9tICYmIGJveC5ib3R0b20gPCBvYi50b3ApKXtcclxuICAgICAgdmNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBoY29sbGlkZXMgJiYgdmNvbGxpZGVzO1xyXG4gIH1cclxuICByZW5kZXJfdHJhY2sodGltZTpudW1iZXIpe1xyXG4gICAgbGV0IHJlbmRlcmVkID0gdGhpcy5yZW5kZXJmKHRpbWUgLSB0aGlzLmxhc3RfcmVuZGVyKTtcclxuICAgIHRoaXMubGFzdF9yZW5kZXIgPSB0aW1lO1xyXG4gICAgcmV0dXJuIHJlbmRlcmVkO1xyXG4gIH1cclxuICByZW5kZXJmKHRpbWU6IG51bWJlcik6IHNwcml0ZSB7XHJcbiAgICBpZiAoIXRoaXMuYW5pbWF0aW9ucy5jdXJyZW50KSB7XHJcbiAgICAgIGxldCBzdCA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICAgIGxldCBzcHJpdGVfaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgIGxldCBzcHJpdGVfd2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICBpZiAodGhpcy5oZWlnaHQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3ByaXRlX2hlaWdodCA9IHRoaXMuc3ByaXRlX3NoZWV0LmhlaWdodDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy53aWR0aCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzcHJpdGVfd2lkdGggPSB0aGlzLnNwcml0ZV9zaGVldC53aWR0aDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNwcml0ZV9zaGVldDogdGhpcy5zcHJpdGVfc2hlZXQsXHJcbiAgICAgICAgbGVmdDogMCxcclxuICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgc3ByaXRlX3dpZHRoLFxyXG4gICAgICAgIHNwcml0ZV9oZWlnaHRcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbnMucmVuZGVyZih0aW1lKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBzdGF0aWNfb2JqIHtcclxuICBzcHJpdGVfdXJsID0gXCJcIjtcclxuICBzcHJpdGU6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBncmF2aXR5X29iajxUPiBleHRlbmRzIG9iajxUPntcclxuICBncmF2aXR5ID0gdHJ1ZVxyXG59IiwiaW1wb3J0IHtzcHJpdGV9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQge0dldFZpZXdwb3J0RGltZW5zaW9uc30gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQge29ian0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcbmltcG9ydCB7b2JqX3N0YXRlfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5pbXBvcnQge0h1ZFRleHQsVGV4dFNldHRpbmd9IGZyb20gXCIuL2h1ZFwiO1xyXG5cclxuaW50ZXJmYWNlIGNhbWVyYV9zdGF0ZXtcclxuICBzY2FsaW5nOm51bWJlcixcclxuICBwb3NpdGlvbjp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG4gIGRpbWVuc2lvbnM6e1xyXG4gICAgd2lkdGg6bnVtYmVyLFxyXG4gICAgaGVpZ2h0Om51bWJlclxyXG4gIH0sXHJcbiAgdmlld3BvcnQ6dmlld3BvcnRcclxufVxyXG5cclxuaW50ZXJmYWNlIHZpZXdwb3J0e1xyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyLFxyXG4gIHdpZHRoOm51bWJlcixcclxuICBoZWlnaHQ6bnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYW1lcmF7XHJcbiAgc3RhdGU6Y2FtZXJhX3N0YXRlXHJcbiAgY29uc3RydWN0b3IoeDpudW1iZXIseTpudW1iZXIsd2lkdGg6bnVtYmVyLGhlaWdodDpudW1iZXIsc2NhbGluZzpudW1iZXIsdjp2aWV3cG9ydCl7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzY2FsaW5nLFxyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeDp4L3NjYWxpbmcsXHJcbiAgICAgICAgeTp5L3NjYWxpbmdcclxuICAgICAgfSxcclxuICAgICAgZGltZW5zaW9uczp7XHJcbiAgICAgICAgd2lkdGg6d2lkdGggLyBzY2FsaW5nLFxyXG4gICAgICAgIGhlaWdodDpoZWlnaHQgLyBzY2FsaW5nXHJcbiAgICAgIH0sXHJcbiAgICAgIHZpZXdwb3J0OnZcclxuICAgIH1cclxuICB9XHJcbiAgc2V0IHgoeDpudW1iZXIpe1xyXG4gICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi54ID0geDtcclxuICB9XHJcbiAgc2V0IHkoeTpudW1iZXIpe1xyXG4gICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0geSBcclxuICB9XHJcbiAgZ2V0IHgoKXtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLnBvc2l0aW9uLng7XHJcbiAgfVxyXG4gIGdldCB5KCl7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wb3NpdGlvbi55O1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcmVuZGVyX2Z1bmN7XHJcbiAgKHg6bnVtYmVyLHk6bnVtYmVyLHNjYWxpbmc6bnVtYmVyKTp2b2lkXHJcbn1cclxuXHJcbmludGVyZmFjZSByZWN0YW5nbGV7XHJcbiAgd2lkdGg6bnVtYmVyLFxyXG4gIGhlaWdodDpudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIHNwcml0ZV9hcmdze1xyXG4gIHNwcml0ZTpzcHJpdGUsXHJcbiAgeDpudW1iZXIsXHJcbiAgeTpudW1iZXIsXHJcbiAgcm90YXRpb246bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSByZW5kZXJlcl9hcmdze1xyXG4gIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxyXG4gIGNhbWVyYTpDYW1lcmFcclxufVxyXG5cclxuZXhwb3J0IGVudW0gcmVuZGVyZXJ7XHJcbiAgdGV4dCxcclxuICBzcHJpdGUsXHJcbiAgcmVjdCxcclxuICBzdHJva2VfcmVjdFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdGV4dF9yZW5kZXJlciA9IChyOnJlbmRlcmVyX2FyZ3MsczpUZXh0U2V0dGluZykgPT4ge1xyXG4gIGxldCB2aGVpZ2h0ID0gR2V0Vmlld3BvcnREaW1lbnNpb25zKCkuaGVpZ2h0O1xyXG4gIHIuY29udGV4dC5mb250ID0gYCR7cy5mb250LnNpemV9cHggJHtzLmZvbnQuZm9udH1gO1xyXG4gIHIuY29udGV4dC5maWxsU3R5bGUgPSBzLmZvbnQuY29sb3I7XHJcbiAgci5jb250ZXh0LnRleHRBbGlnbiA9IHMuZm9udC5hbGlnbjtcclxuICBpZihzLmZvbnQubWF4X3dpZHRoKXtcclxuICAgIHIuY29udGV4dC5maWxsVGV4dChzLmZvbnQudGV4dCxzLngsdmhlaWdodCAtIHMueSxzLmZvbnQubWF4X3dpZHRoKTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIHIuY29udGV4dC5maWxsVGV4dChzLmZvbnQudGV4dCxzLngsdmhlaWdodCAtIHMueSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3ByaXRlX3JlbmRlcmVyID0gKHI6cmVuZGVyZXJfYXJncyxzOnNwcml0ZV9hcmdzKSA9PiB7XHJcbiAgbGV0IGNhbWVyYSA9IHIuY2FtZXJhO1xyXG4gIGxldCB2aGVpZ2h0ID0gci5jYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQvIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IGZpbmFsX3ggPSAoKHMueCAtIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54ICsgY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgvMiAtIHMuc3ByaXRlLnNwcml0ZV93aWR0aC8yKSAqIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBmaW5hbF95ID0gKCh2aGVpZ2h0IC0gcy55IC0gY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0LzIgLSBzLnNwcml0ZS5zcHJpdGVfaGVpZ2h0LzIgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueSkgKiByLmNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgaGVpZ2h0ID0gcy5zcHJpdGUuc3ByaXRlX2hlaWdodCAqIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IHdpZHRoID0gcy5zcHJpdGUuc3ByaXRlX3dpZHRoICogci5jYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBsZXQgY3V0X29mZiA9IDA7XHJcbiAgLyppZigocy54IC0gcy5zcHJpdGUuc3ByaXRlX3dpZHRoLzIpIDwgKHIuY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnggLSByLmNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoLzIpKXtcclxuICAgIGN1dF9vZmYgPSAoci5jYW1lcmEuc3RhdGUucG9zaXRpb24ueCAtIHIuY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgvMikgLSAocy54IC0gcy5zcHJpdGUuc3ByaXRlX3dpZHRoLzIpO1xyXG4gIH1cclxuICBcclxuICBlbHNlIGlmKChzLnggKyBzLnNwcml0ZS5zcHJpdGVfd2lkdGgvMikgPiAoci5jYW1lcmEuc3RhdGUucG9zaXRpb24ueCArIHIuY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgvMikpe1xyXG4gICAgY3V0X29mZiA9ICAgKHIuY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnggKyByLmNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoLzIpIC0gKHMueCArIHMuc3ByaXRlLnNwcml0ZV93aWR0aC8yKTtcclxuICB9XHJcbiAgKi9cclxuICBcclxuICBpZih0cnVlKXtcclxuICAgIHIuY29udGV4dC5zYXZlKCk7XHJcbiAgICByLmNvbnRleHQudHJhbnNsYXRlKGZpbmFsX3ggKyBjdXRfb2ZmICsgKHMuc3ByaXRlLnNwcml0ZV93aWR0aCAtIGN1dF9vZmYpLzIsZmluYWxfeSArIHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQvMilcclxuICAgIGxldCByYWRpYW5zID0gcy5yb3RhdGlvbiAqIChNYXRoLlBJLzE4MCk7XHJcbiAgICByLmNvbnRleHQucm90YXRlKHJhZGlhbnMpO1xyXG4gICAgaWYocy5zcHJpdGUuc3ByaXRlX3dpZHRoID09IDE0OSAmJiBjdXRfb2ZmID4gMClcclxuICAgICAgY29uc29sZS5sb2coY3V0X29mZik7XHJcbiAgICByLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICBzLnNwcml0ZS5zcHJpdGVfc2hlZXQsXHJcbiAgICAgIHMuc3ByaXRlLmxlZnQgKyBjdXRfb2ZmLFxyXG4gICAgICBzLnNwcml0ZS50b3AsXHJcbiAgICAgIChzLnNwcml0ZS5zcHJpdGVfd2lkdGggLSBjdXRfb2ZmKSxcclxuICAgICAgcy5zcHJpdGUuc3ByaXRlX2hlaWdodCxcclxuICAgICAgLShzLnNwcml0ZS5zcHJpdGVfd2lkdGggLSBjdXRfb2ZmKS8yLFxyXG4gICAgICAtcy5zcHJpdGUuc3ByaXRlX2hlaWdodC8yLFxyXG4gICAgICB3aWR0aCAtIGN1dF9vZmYsXHJcbiAgICAgIGhlaWdodFxyXG4gICAgKVxyXG4gICAgci5jb250ZXh0LnJlc3RvcmUoKTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIHIuY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgIHMuc3ByaXRlLnNwcml0ZV9zaGVldCxcclxuICAgICAgcy5zcHJpdGUubGVmdCxcclxuICAgICAgcy5zcHJpdGUudG9wLFxyXG4gICAgICBzLnNwcml0ZS5zcHJpdGVfd2lkdGgsXHJcbiAgICAgIHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQsXHJcbiAgICAgIGZpbmFsX3gsXHJcbiAgICAgIGZpbmFsX3ksXHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHRcclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzdHJva2VkX3JlY3RfcmVuZGVyZXIgPSAoY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQscmVjdDpyZWN0YW5nbGUseDpudW1iZXIseTpudW1iZXIsY29sb3I6c3RyaW5nLGNhbWVyYTpDYW1lcmEpID0+IHtcclxuICBsZXQgdmhlaWdodCA9IGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodC9jYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBsZXQgZmluYWxfeCA9ICgoeCAtIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54ICsgY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgvMiAtIHJlY3Qud2lkdGgvMikgKiBjYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGZpbmFsX3kgPSAoKHZoZWlnaHQgLSB5IC0gcmVjdC5oZWlnaHQvMiAtIGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodC8yICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnkpICogY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBoZWlnaHQgPSByZWN0LmhlaWdodCAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGxldCB3aWR0aCA9IHJlY3Qud2lkdGggKiBjYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgY29udGV4dC5zdHJva2VSZWN0KGZpbmFsX3gsZmluYWxfeSxyZWN0LndpZHRoLGhlaWdodCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZWN0X3JlbmRlcmVyID0gKGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJELHJlY3Q6cmVjdGFuZ2xlLHg6bnVtYmVyLHk6bnVtYmVyLGNvbG9yOnN0cmluZyxjYW1lcmE6Q2FtZXJhKSA9PiB7XHJcbiAgbGV0IHZoZWlnaHQgPSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQvY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IGZpbmFsX3ggPSAoKHggLSBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCArIGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoLzIgLSByZWN0LndpZHRoLzIpICogY2FtZXJhLnN0YXRlLnNjYWxpbmcpO1xyXG4gIGxldCBmaW5hbF95ID0gKCh2aGVpZ2h0IC0geSAtIHJlY3QuaGVpZ2h0LzIgLSBjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQvMiArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KSAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nKSA7XHJcbiAgbGV0IGhlaWdodCA9IHJlY3QuaGVpZ2h0ICogY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgbGV0IHdpZHRoID0gcmVjdC53aWR0aCAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICBjb250ZXh0LmZpbGxSZWN0KGZpbmFsX3gsZmluYWxfeSxyZWN0LndpZHRoLGhlaWdodCk7XHJcbn0iLCJpbXBvcnQgeyBncmF2aXR5X29iaixvYmogfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuaW1wb3J0IHsgc3ByaXRlIH0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7IG9ial9zdGF0ZSB9IGZyb20gXCIuL3N0YXRlXCI7XHJcbmltcG9ydCB7IHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayxjaGVja19jb2xsaXNpb25zLGNvbGxpc2lvbl9ib3gsY2hlY2tfYWxsX2NvbGxpc2lvbnMsY2hlY2tfYWxsX29iamVjdHN9IGZyb20gXCIuL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge3JlbmRlcl9jb2xsaXNpb25fYm94LERFQlVHfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7QmluZCxjb250cm9sX2Z1bmMsIGV4ZWNfdHlwZX0gZnJvbSBcIi4vY29udHJvbHNcIjtcclxuaW1wb3J0IHsgT3ZlcndvcmxkIH0gZnJvbSBcIi4uL2dhbWUvcm9vbXMvb3ZlcndvcmxkXCI7XHJcbmltcG9ydCB7SFVEfSBmcm9tIFwiLi9odWRcIjtcclxuaW1wb3J0IHthdWRpb30gZnJvbSBcIi4vYXVkaW9cIlxyXG5cclxuaW50ZXJmYWNlIHBvc2l0aW9ue1xyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseV9ncmF2aXR5KG9iOmdyYXZpdHlfb2JqPHVua25vd24+LGdyYXZfY29uc3Q6bnVtYmVyLCBncmF2X21heDpudW1iZXIpe1xyXG4gIGxldCBzdCA9IG9iLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICBpZihvYi5ncmF2aXR5ICYmIHN0LnZlbG9jaXR5LnkgPiBncmF2X21heCl7XHJcbiAgICBzdC52ZWxvY2l0eS55ICs9IGdyYXZfY29uc3Q7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHJvb21faTxUPntcclxuICBiYWNrZ3JvdW5kX3VybDpzdHJpbmcsXHJcbiAgb2JqZWN0czpBcnJheTxvYmo8dW5rbm93bj4+XHJcbiAgc3RhdGU6VFxyXG59XHJcbmV4cG9ydCBjbGFzcyByb29tPFQ+e1xyXG4gIGJhY2tncm91bmRfdXJsOiBzdHJpbmc7XHJcbiAgYmFja2dyb3VuZDogSFRNTEltYWdlRWxlbWVudDtcclxuICBvYmplY3RzOiBBcnJheTxvYmo8dW5rbm93bj4+XHJcbiAgc3RhdGU6IFQ7XHJcbiAgaHVkOkhVRDtcclxuICBhdWRpbyA9IG5ldyBhdWRpbygpO1xyXG4gIGxvYWQoKSB7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IGEgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgbGV0IHRvX2F3YWl0ID0gdGhpcy5vYmplY3RzLm1hcCgoYSkgPT4gYS5sb2FkKCkpO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbCh0b19hd2FpdCk7XHJcbiAgICAgIGEuc3JjID0gdGhpcy5iYWNrZ3JvdW5kX3VybDtcclxuICAgICAgYS5vbmVycm9yID0gKCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIGxvYWRpbmcgdXJsOlwiICsgdGhpcy5iYWNrZ3JvdW5kX3VybCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIGEub25sb2FkID0gKGFzeW5jKCkgPT4ge1xyXG4gICAgICAgIF90aGlzLmJhY2tncm91bmQgPSBhO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuYXVkaW8ubG9hZCgpO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gIH1cclxuICBhc3luYyBhZGRJdGVtKG86b2JqPG9ial9zdGF0ZT4pe1xyXG4gICAgYXdhaXQgby5sb2FkKCk7XHJcbiAgICB0aGlzLm9iamVjdHMucHVzaChvKTtcclxuICB9XHJcbiAgYXN5bmMgYWRkSXRlbXMobzpvYmo8b2JqX3N0YXRlPltdKXtcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKG8ubWFwKChhKT0+YS5sb2FkKCkpKTtcclxuICAgIHRoaXMub2JqZWN0cy5wdXNoKC4uLm8pO1xyXG4gIH1cclxuICBkZWxldGVJdGVtKGlkOnN0cmluZyl7XHJcbiAgICBmb3IobGV0IGEgPSAwO2EgPCB0aGlzLm9iamVjdHMubGVuZ3RoO2ErKyl7XHJcbiAgICAgIGlmKHRoaXMub2JqZWN0c1thXS5pZCA9PT0gaWQpe1xyXG4gICAgICAgIHRoaXMub2JqZWN0cyA9IHRoaXMub2JqZWN0cy5zbGljZSgwLGEpLmNvbmNhdCh0aGlzLm9iamVjdHMuc2xpY2UoYSsxKSk7XHJcbiAgICAgICAgYS0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlZ2lzdGVySFVEKCk6SFVEe1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgYmluZENvbnRyb2woa2V5OnN0cmluZyx4OmV4ZWNfdHlwZSxmdW5jOmNvbnRyb2xfZnVuYyxpbnRlcnZhbDpudW1iZXIgPSAxKXtcclxuICAgIEJpbmQoa2V5LGZ1bmMseCxpbnRlcnZhbCk7IFxyXG4gIH1cclxuICBjaGVja19jb2xsaXNpb25zKGJveDpjb2xsaXNpb25fYm94LGV4ZW1wdD86QXJyYXk8c3RyaW5nPik6QXJyYXk8b2JqPHVua25vd24+PntcclxuICAgIGlmKERFQlVHKXtcclxuICAgICAgcmVuZGVyX2NvbGxpc2lvbl9ib3goYm94KTtcclxuICAgIH1cclxuICAgIHJldHVybiBjaGVja19hbGxfY29sbGlzaW9ucyhib3gsdGhpcy5vYmplY3RzLGV4ZW1wdCk7XHJcbiAgfVxyXG4gIGNoZWNrX29iamVjdHMoYm94OmNvbGxpc2lvbl9ib3gsZXhlbXB0PzpzdHJpbmcpe1xyXG4gICAgaWYoREVCVUcpe1xyXG4gICAgICByZW5kZXJfY29sbGlzaW9uX2JveChib3gpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoZWNrX2FsbF9vYmplY3RzKGJveCx0aGlzLm9iamVjdHMsZXhlbXB0KTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuXHJcbiAgfVxyXG4gIGNsZWFudXAoKXtcclxuXHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOiBudW1iZXIpIHtcclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgIHRoaXMub2JqZWN0c1thXS5zdGF0ZWYodGltZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE9iaihpZDpzdHJpbmcpe1xyXG4gICAgZm9yKGxldCBhID0gMDsgYSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKyl7XHJcbiAgICAgIGlmKHRoaXMub2JqZWN0c1thXS5pZCA9PSBpZCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0c1thXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJlbmRlcmYodGltZTogbnVtYmVyKTogc3ByaXRlIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNwcml0ZV9zaGVldDogdGhpcy5iYWNrZ3JvdW5kLFxyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIHNwcml0ZV9oZWlnaHQ6IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQsXHJcbiAgICAgIHNwcml0ZV93aWR0aDogdGhpcy5iYWNrZ3JvdW5kLndpZHRoXHJcbiAgICB9XHJcbiAgfVxyXG59IiwiZXhwb3J0IGludGVyZmFjZSBzcHJpdGV7XHJcbiAgc3ByaXRlX3NoZWV0OkhUTUxJbWFnZUVsZW1lbnQsXHJcbiAgbGVmdDpudW1iZXIsXHJcbiAgdG9wOm51bWJlcixcclxuICBzcHJpdGVfd2lkdGg6bnVtYmVyLFxyXG4gIHNwcml0ZV9oZWlnaHQ6bnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzcHJpdGVfZ2VuKHNwcml0ZV9zaGVldDpIVE1MSW1hZ2VFbGVtZW50LHNwcml0ZV93aWR0aDpudW1iZXIsc3ByaXRlX2hlaWdodDpudW1iZXIpOkFycmF5PEFycmF5PHNwcml0ZT4+e1xyXG4gIGxldCB3aWR0aCA9IHNwcml0ZV9zaGVldC53aWR0aDtcclxuICBsZXQgaGVpZ2h0ID0gc3ByaXRlX3NoZWV0LmhlaWdodDtcclxuICBsZXQgc3ByaXRlczpBcnJheTxBcnJheTxzcHJpdGU+PiA9IFtdO1xyXG4gIGZvcihsZXQgYiA9IDA7IGIgPCBoZWlnaHQ7YiArPSBzcHJpdGVfaGVpZ2h0KXtcclxuICAgIHNwcml0ZXMucHVzaChbXSk7XHJcbiAgICBmb3IobGV0IGEgPSAwOyBhIDwgd2lkdGg7YSArPSBzcHJpdGVfd2lkdGgpe1xyXG4gICAgICBzcHJpdGVzW2JdLnB1c2goe1xyXG4gICAgICAgIHNwcml0ZV9zaGVldCxcclxuICAgICAgICBsZWZ0OmEsXHJcbiAgICAgICAgdG9wOmIgKiBzcHJpdGVfaGVpZ2h0LFxyXG4gICAgICAgIHNwcml0ZV9oZWlnaHQsXHJcbiAgICAgICAgc3ByaXRlX3dpZHRoXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBzcHJpdGVzO1xyXG59XHJcblxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIHN0YXRlX2Z1bmM8VD57XHJcbiAgKGxhc3RfdGltZTpudW1iZXIsY3VycmVudF9zdGF0ZTpUKTpUXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgdmVsb2NpdHl7XHJcbiAgeDpudW1iZXI7XHJcbiAgeTpudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgcG9zaXRpb257XHJcbiAgeDpudW1iZXI7XHJcbiAgeTpudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugb2JqX3N0YXRle1xyXG4gIHBvc2l0aW9uOnBvc2l0aW9uO1xyXG4gIHZlbG9jaXR5OnZlbG9jaXR5O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHJvb21fc3RhdGV7XHJcbiAgb2JqZWN0czogQXJyYXk8b2JqX3N0YXRlPlxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb25faW5pdCgpOm9ial9zdGF0ZXtcclxuICByZXR1cm4ge1xyXG4gICAgcG9zaXRpb246e1xyXG4gICAgICB4OjAsXHJcbiAgICAgIHk6MFxyXG4gICAgfSxcclxuICAgIHZlbG9jaXR5OntcclxuICAgICAgeDowLFxyXG4gICAgICB5OjBcclxuICAgIH1cclxuXHJcbiAgfSAgXHJcbn0iLCJleHBvcnQgY29uc3QgREVCVUcgPSBmYWxzZTtcclxuXHJcbmltcG9ydCB7b2JqfSBmcm9tIFwiLi9saWIvb2JqZWN0XCI7XHJcbmltcG9ydCB7b2JqX3N0YXRlfSBmcm9tIFwiLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHtyb29tfSBmcm9tIFwiLi9saWIvcm9vbVwiO1xyXG5pbXBvcnQge3Nwcml0ZX0gZnJvbSBcIi4vbGliL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBjb2xsaXNpb25fYm94IH0gZnJvbSBcIi4vbGliL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge3Nwcml0ZV9yZW5kZXJlcixyZWN0X3JlbmRlcmVyLCBzdHJva2VkX3JlY3RfcmVuZGVyZXIsIHRleHRfcmVuZGVyZXIsIENhbWVyYX0gZnJvbSBcIi4vbGliL3JlbmRlclwiO1xyXG5pbXBvcnQge0hVRH0gZnJvbSBcIi4vbGliL2h1ZFwiO1xyXG5pbXBvcnQge0V4ZWN1dGVSZXBlYXRCaW5kc30gZnJvbSBcIi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5pbXBvcnQge092ZXJ3b3JsZH0gZnJvbSBcIi4vZ2FtZS9yb29tcy9vdmVyd29ybGRcIjtcclxuXHJcbmxldCBjYW52YXNfZWxlbWVudDpIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFyZ2V0XCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG5sZXQgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXNfZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG5cclxubGV0IHNjcmVlbl93aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5sZXQgc2NyZWVuX2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbmxldCB2d2lkdGggPSBjYW52YXNfZWxlbWVudC53aWR0aDtcclxubGV0IHZoZWlnaHQgPSBjYW52YXNfZWxlbWVudC5oZWlnaHQ7XHJcblxyXG5cclxuLy9Ib3cgb2Z0ZW4gdGhlIGdhbWUgbG9naWMgbG9vcCBzaG91bGQgcnVuLCBpbiBtaWxsaXNlY29uZHNcclxubGV0IGxvZ2ljX2xvb3BfaW50ZXJ2YWw6bnVtYmVyID0gMTAwMC82MDsgIFxyXG5cclxubGV0IGxhc3RfdGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG5sZXQgbGFzdF9yZW5kZXJfdGltZSA9IDA7XHJcblxyXG5pbnRlcmZhY2UgZGltZW5zaW9uc3tcclxuICBoZWlnaHQ6bnVtYmVyLFxyXG4gIHdpZHRoOm51bWJlclxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldFNjcmVlbkRpbWVuc2lvbnMgKCk6ZGltZW5zaW9uc3tcclxuICByZXR1cm4oe1xyXG4gICAgd2lkdGg6c2NyZWVuX3dpZHRoLFxyXG4gICAgaGVpZ2h0OnNjcmVlbl9oZWlnaHRcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2V0Vmlld3BvcnREaW1lbnNpb25zICgpOmRpbWVuc2lvbnN7XHJcbiAgcmV0dXJuKHtcclxuICAgIGhlaWdodDp2aGVpZ2h0LFxyXG4gICAgd2lkdGg6dndpZHRoXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlcl9jb2xsaXNpb25fYm94ID0gKGE6Y29sbGlzaW9uX2JveCkgPT4ge1xyXG4gIGJveGVzLnB1c2goYSk7XHJcbn1cclxuXHJcbmxldCBib3hlczpBcnJheTxjb2xsaXNpb25fYm94PiA9IFtdO1xyXG5cclxuZXhwb3J0IGxldCBkZWVwID0gKGE6YW55KSA9PntcclxuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhKSk7XHJcbn1cclxuXHJcbmludGVyZmFjZSBnYW1lX3N0YXRle1xyXG4gIGxvZ2ljOm51bWJlcixcclxuICBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICBjdXJyZW50X3Jvb206cm9vbTx1bmtub3duPixcclxuICBjYW1lcmFzOkFycmF5PENhbWVyYT4sXHJcbiAgY2FudmFzOkhUTUxDYW52YXNFbGVtZW50LFxyXG4gIHBsYXllcl9zdGF0ZTp7XHJcbiAgICBwb3dlcjpudW1iZXJcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBnYW1le1xyXG4gIHN0YXRlOmdhbWVfc3RhdGU7XHJcbiAgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgb2Zmc2NyZWVuX2NhbnZhczpIVE1MQ2FudmFzRWxlbWVudDtcclxuICBvZmZzY3JlZW5fY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgY29uc3RydWN0b3IoY3R4OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxhOnJvb208dW5rbm93bj4pe1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY2FudmFzOmNhbnZhc19lbGVtZW50LFxyXG4gICAgICBsb2dpYzp1bmRlZmluZWQsXHJcbiAgICAgIGNvbnRleHQ6Y3R4LFxyXG4gICAgICBjYW1lcmFzOltuZXcgQ2FtZXJhKDAsMCx2d2lkdGgvMix2aGVpZ2h0LDEse1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjAsXHJcbiAgICAgICAgd2lkdGg6MC41LFxyXG4gICAgICAgIGhlaWdodDowLjVcclxuICAgICAgfSksXHJcbiAgICAgIG5ldyBDYW1lcmEoMCwxMDAsdndpZHRoLzIsdmhlaWdodC8yLDEse1xyXG4gICAgICAgIHg6dndpZHRoLzIsXHJcbiAgICAgICAgeTowLFxyXG4gICAgICAgIHdpZHRoOjAuNSxcclxuICAgICAgICBoZWlnaHQ6MC41XHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgQ2FtZXJhKDAsMTAwLHZ3aWR0aC8yLHZoZWlnaHQvMiwxLHtcclxuICAgICAgICB4OnZ3aWR0aC8yLFxyXG4gICAgICAgIHk6dmhlaWdodC8yLFxyXG4gICAgICAgIHdpZHRoOjAuNSxcclxuICAgICAgICBoZWlnaHQ6MC41XHJcbiAgICAgIH0pXHJcbiAgICAgIF0sXHJcbiAgICAgIGN1cnJlbnRfcm9vbTogdW5kZWZpbmVkLFxyXG4gICAgICBwbGF5ZXJfc3RhdGU6e1xyXG4gICAgICAgIHBvd2VyOjBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5vZmZzY3JlZW5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgIHRoaXMub2Zmc2NyZWVuX2NvbnRleHQgPSB0aGlzLm9mZnNjcmVlbl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgLypcclxuICAgIGxldCBoID0gTWF0aC5tYXgoLi4udGhpcy5zdGF0ZS5jYW1lcmFzLm1hcCh4PT54LnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0KSk7XHJcbiAgICBsZXQgdyA9IE1hdGgubWF4KC4uLnRoaXMuc3RhdGUuY2FtZXJhcy5tYXAoeD0+eC5zdGF0ZS5kaW1lbnNpb25zLndpZHRoKSlcclxuICAgIHRoaXMub2Zmc2NyZWVuX2NhbnZhcy5oZWlnaHQgPSBoO1xyXG4gICAgdGhpcy5vZmZzY3JlZW5fY2FudmFzLndpZHRoID0gdztcclxuICAgICovXHJcbiAgICB0aGlzLmxvYWRSb29tKGEpO1xyXG4gIH1cclxuICByZW5kZXIodDpudW1iZXIpe1xyXG4gICAgbGV0IHRpbWUgPSB0IC0gbGFzdF9yZW5kZXJfdGltZVxyXG4gICAgbGFzdF9yZW5kZXJfdGltZSA9IHQ7XHJcbiAgICBmb3IobGV0IGNhbWVyYSBvZiB0aGlzLnN0YXRlLmNhbWVyYXMpe1xyXG4gICAgICAvL3RoaXMub2Zmc2NyZWVuX2NvbnRleHQuY2xlYXJSZWN0KDAsMCxjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aCxjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy5oZWlnaHQpO1xyXG4gICAgICB0aGlzLm9mZnNjcmVlbl9jb250ZXh0LmZpbGxTdHlsZT1cImJsYWNrXCI7XHJcbiAgICAgIC8vdGhpcy5vZmZzY3JlZW5fY29udGV4dC5maWxsUmVjdCgwLDAsY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgsY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0KTtcclxuICAgICAgdGhpcy5vZmZzY3JlZW5fY2FudmFzLmhlaWdodCA9IGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodDtcclxuICAgICAgdGhpcy5vZmZzY3JlZW5fY2FudmFzLndpZHRoID0gY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGg7XHJcbiAgICAgIGxldCBjYW1lcmFfYm94ID0ge1xyXG4gICAgICAgIHg6Y2FtZXJhLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgeTpjYW1lcmEuc3RhdGUucG9zaXRpb24ueSxcclxuICAgICAgICB3aWR0aDpjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6Y2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0XHJcbiAgICAgIH07XHJcbiAgICAgIGxldCBjYW1lcmFfY29sbGlkZXJzID0gdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20uY2hlY2tfb2JqZWN0cyhjYW1lcmFfYm94KTtcclxuICAgICAgbGV0IHJlbmRlcl9hcmdzID0ge1xyXG4gICAgICAgIGNvbnRleHQ6dGhpcy5vZmZzY3JlZW5fY29udGV4dCxcclxuICAgICAgICBjYW1lcmE6Y2FtZXJhLFxyXG4gICAgICB9O1xyXG4gICAgICBzcHJpdGVfcmVuZGVyZXIocmVuZGVyX2FyZ3Mse1xyXG4gICAgICAgIHNwcml0ZTp0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5yZW5kZXJmKHRpbWUpLFxyXG4gICAgICAgIHg6Y2FtZXJhLnN0YXRlLnZpZXdwb3J0LngsXHJcbiAgICAgICAgeTpjYW1lcmEuc3RhdGUudmlld3BvcnQueSxcclxuICAgICAgICByb3RhdGlvbjowXHJcbiAgICAgIH0pO1xyXG4gICAgICBmb3IgKGxldCBhIG9mIGNhbWVyYV9jb2xsaWRlcnMpe1xyXG4gICAgICAgIGxldCBzdCA9IGEuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgICAgIGlmKGEucmVuZGVyKXtcclxuICAgICAgICAgIHNwcml0ZV9yZW5kZXJlcihyZW5kZXJfYXJncyx7XHJcbiAgICAgICAgICAgIHNwcml0ZTphLnJlbmRlcl90cmFjayh0KSxcclxuICAgICAgICAgICAgeDpzdC5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgICB5OnN0LnBvc2l0aW9uLnksXHJcbiAgICAgICAgICAgIHJvdGF0aW9uOmEucm90YXRpb25cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBsZXQgYm94OmNvbGxpc2lvbl9ib3g7XHJcbiAgICAgIGxldCBib3hlc19jb3B5ID0gWy4uLmJveGVzXVxyXG4gICAgICB3aGlsZShib3hlc19jb3B5Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgIGxldCBib3ggPSBib3hlc19jb3B5LnBvcCgpO1xyXG4gICAgICAgIGxldCByZWN0ID0ge1xyXG4gICAgICAgICAgd2lkdGg6Ym94LndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OmJveC5oZWlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgc3Ryb2tlZF9yZWN0X3JlbmRlcmVyKHRoaXMub2Zmc2NyZWVuX2NvbnRleHQscmVjdCxib3gueCxib3gueSxcIiNGRjAwMDBcIixjYW1lcmEpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUuY3VycmVudF9yb29tLmh1ZCl7XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20uaHVkLmdyYXBoaWNfZWxlbWVudHM7XHJcbiAgICAgICAgbGV0IHRleHRfZWxlbWVudHMgPSB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5odWQudGV4dF9lbGVtZW50cztcclxuICAgICAgICBmb3IobGV0IGEgb2YgZ3JhcGhpY3Mpe1xyXG4gICAgICAgICAgbGV0IHN0ID0gYS5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICAgICAgICBpZihhLnJlbmRlcil7XHJcbiAgICAgICAgICAgIHNwcml0ZV9yZW5kZXJlcihyZW5kZXJfYXJncyx7XHJcbiAgICAgICAgICAgICAgc3ByaXRlOmEucmVuZGVyZih0KSxcclxuICAgICAgICAgICAgICB4OnN0LnBvc2l0aW9uLngsXHJcbiAgICAgICAgICAgICAgeTpzdC5wb3NpdGlvbi55LFxyXG4gICAgICAgICAgICAgIHJvdGF0aW9uOmEucm90YXRpb25cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlbmRlcl9hcmdzLmNvbnRleHQgPSB0aGlzLnN0YXRlLmNvbnRleHQ7XHJcbiAgICAgICAgZm9yKGxldCBhIG9mIHRleHRfZWxlbWVudHMpe1xyXG4gICAgICAgICAgbGV0IHN0ID0gYS5zdGF0ZTtcclxuICAgICAgICAgIHRleHRfcmVuZGVyZXIocmVuZGVyX2FyZ3Mse1xyXG4gICAgICAgICAgICB4OnN0LnBvc2l0aW9uLngsXHJcbiAgICAgICAgICAgIHk6c3QucG9zaXRpb24ueSxcclxuICAgICAgICAgICAgZm9udDphLnJlbmRlcmYodClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGxldCBkYXRhID0gdGhpcy5vZmZzY3JlZW5fY29udGV4dC5nZXRJbWFnZURhdGEoMCwwLGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLndpZHRoLGNhbWVyYS5zdGF0ZS5kaW1lbnNpb25zLmhlaWdodCk7XHJcbiAgICAgIHRoaXMuc3RhdGUuY29udGV4dC5wdXRJbWFnZURhdGEoZGF0YSxjYW1lcmEuc3RhdGUudmlld3BvcnQueCxjYW1lcmEuc3RhdGUudmlld3BvcnQueSk7XHJcbiAgICB9XHJcbiAgICBib3hlcyA9IFtdO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKChhKT0+e3RoaXMucmVuZGVyKGEpfSk7IFxyXG4gIH1cclxuICBzdGFydF9sb2dpYyhhOm51bWJlcil7XHJcbiAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgbGV0IG5ld190aW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgbGV0IHRpbWVfc2luY2UgPSBuZXdfdGltZS5nZXRUaW1lKCkgLSBsYXN0X3RpbWUuZ2V0VGltZSgpO1xyXG4gICAgICBsYXN0X3RpbWUgPSBuZXdfdGltZTtcclxuICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20uc3RhdGVmKHRpbWVfc2luY2UpO1xyXG4gICAgICBpZih0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5odWQpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUuY3VycmVudF9yb29tLmh1ZC5zdGF0ZWYodGltZV9zaW5jZSk7XHJcbiAgICAgIH1cclxuICAgICAgICBFeGVjdXRlUmVwZWF0QmluZHMoYSk7XHJcbiAgICB9LGEpO1xyXG4gIH1cclxuICBnZXRSb29tKCl7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb207XHJcbiAgfVxyXG4gIGFzeW5jIGxvYWRSb29tKHg6cm9vbTx1bmtub3duPil7XHJcbiAgICB4Lmh1ZCA9IHgucmVnaXN0ZXJIVUQoKTtcclxuICAgIGlmKHRoaXMuc3RhdGUuY3VycmVudF9yb29tICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICB3aGlsZSh0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5vYmplY3RzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIHRoaXMuc3RhdGUuY3VycmVudF9yb29tLm9iamVjdHNbMF0uZGVsZXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBuZXdfcm9vbSA9IGF3YWl0IHgubG9hZCgpO1xyXG4gICAgeC5yZWdpc3Rlcl9jb250cm9scygpO1xyXG4gICAgdGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20gPSB4O1xyXG4gICAgaWYodGhpcy5zdGF0ZS5sb2dpYyAhPSB1bmRlZmluZWQpe1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUubG9naWMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGF0ZS5sb2dpYyA9IHRoaXMuc3RhcnRfbG9naWMobG9naWNfbG9vcF9pbnRlcnZhbClcclxuICAgIHRoaXMucmVuZGVyKDApO1xyXG4gIH1cclxufVxyXG5cclxubGV0IGdhbWVfaW5zdCA9IG5ldyBnYW1lKGNvbnRleHQsbmV3IE92ZXJ3b3JsZCgpICApO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEdhbWUoKXtcclxuICByZXR1cm4gZ2FtZV9pbnN0O1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==