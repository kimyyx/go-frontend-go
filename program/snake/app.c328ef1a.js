// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/components/Painter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Painter =
/*#__PURE__*/
function () {
  function Painter(context2d) {
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;

    _classCallCheck(this, Painter);

    this.ctx = context2d;
    this.unit = unit;
  }

  _createClass(Painter, [{
    key: "drawRect",
    value: function drawRect(x, y) {
      var ctx = this.ctx,
          unit = this.unit;
      ctx.fillRect(x * unit, y * unit, unit, unit);
    }
  }, {
    key: "drawSnake",
    value: function drawSnake(snake) {
      var self = this;
      var ctx = this.ctx,
          drawRect = this.drawRect; // 画蛇头

      ctx.save();
      ctx.fillStyle = '#21bd73';
      var _snake$ = snake[0],
          x = _snake$.x,
          y = _snake$.y;
      self.drawRect(x, y);
      ctx.restore(); // 画蛇身

      ctx.save();
      ctx.fillStyle = '#89ce97';
      snake.forEach(function (block, index) {
        index > 0 && self.drawRect(block.x, block.y);
      });
      ctx.restore();
    }
  }, {
    key: "drawFood",
    value: function drawFood(foods) {
      var self = this;
      var ctx = this.ctx;
      ctx.save();
      ctx.fillStyle = 'gold';
      foods.forEach(function (_ref) {
        var x = _ref.x,
            y = _ref.y;
        self.drawRect(x, y);
      });
      ctx.restore();
      return this;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ctx.clearRect(0, 0, 1000, 1000);
      return this;
    }
  }]);

  return Painter;
}();

exports.default = Painter;
},{}],"src/components/Snake.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Snake =
/*#__PURE__*/
function () {
  function Snake(_ref) {
    var length = _ref.length,
        position = _ref.position;

    _classCallCheck(this, Snake);

    var x = position.x,
        y = position.y;
    this.body = new Array(length).fill({
      x: x,
      y: y
    });
    this.direction = null;
  }

  _createClass(Snake, [{
    key: "move",
    value: function move() {
      var body = this.body,
          direction = this.direction;
      var head = Object.assign({}, body[0]);

      if (direction) {
        var axis = direction.axis,
            step = direction.step;
        head[axis] += step;
        body.unshift(head);
        this.tail = body.pop();
      } else {// 没有设置移动的方向
      }

      return head;
    }
  }, {
    key: "eat",
    value: function eat() {
      var body = this.body,
          tail = this.tail;
      body.push(tail);
    }
  }, {
    key: "go",
    value: function go(direction) {
      if (direction) {
        if (!this.direction || direction.axis !== this.direction.axis) {
          this.direction = direction;
        } else {// 不能180°掉头
        }
      } else {
        this.direction = this.lastDirection;
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.lastDirection = Object.assign({}, this.direction);
      this.direction = null;
    }
  }]);

  return Snake;
}();

exports.default = Snake;
},{}],"src/components/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Painter = _interopRequireDefault(require("./Painter"));

var _Snake = _interopRequireDefault(require("./Snake"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// KEY CODE
// const KEY_ENTER = 13
var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_TOP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

var Game =
/*#__PURE__*/
function () {
  /**
   * Create a game
   * @param {Object} config - The game's configuration
   * @param {Object} config.snake - The snake's configuration
   * @param {number} config.snake.length - The length of snake
   * @param {Object} config.snake.position - The snake's start position
   * @param {number} config.snake.position.x
   * @param {number} config.snake.position.y
   * @param {Object} config.food - The food's configuration
   * @param {number} config.count - 地图上食物的数量
   */
  function Game(config) {
    _classCallCheck(this, Game);

    var _config = this._config = Object.assign({}, {
      snake: {
        length: 3,
        position: {
          x: 0,
          y: 0
        }
      },
      food: {
        count: 1
      }
    }, config);

    this.painter = new _Painter.default(document.getElementById('canvas').getContext('2d'), 20);
    this.snake = new _Snake.default(_config.snake);
    this.status = 1;
    this.foods = [];
    this.chessboard = [];
    this.tipElm = document.querySelector('.tip');
    this.initEvent().initChessboard().initSnake().initFood().layout().draw();
  }

  _createClass(Game, [{
    key: "reset",
    value: function reset() {
      this.snake = new _Snake.default(this._config.snake);
      this.status = 1;
      this.foods = [];
      this.chessboard = [];
      this.initChessboard().initSnake().initFood().layout().draw();
    }
  }, {
    key: "initEvent",
    value: function initEvent() {
      var self = this;
      document.addEventListener('keydown', function (evt) {
        var keyCode = evt.keyCode;
        var snake = self.snake,
            tipElm = self.tipElm,
            status = self.status; // console.log(keyCode)

        if (keyCode === KEY_SPACE) {
          if (status === 1) {
            if (snake.direction) {
              snake.stop();
              tipElm.innerHTML = '按空格键继续游戏';
            } else {
              snake.go();
              tipElm.innerHTML = '按空格键暂停游戏';
            } // snake.direction ? snake.stop() : snake.go()

          } else {
            self.reset();
          }
        } else if (keyCode > 36 && keyCode < 41 && status === 1) {
          tipElm.innerHTML = '按空格键暂停游戏';

          if (keyCode === KEY_TOP) {
            snake.go({
              axis: 'y',
              step: -1
            });
          } else if (keyCode === KEY_DOWN) {
            snake.go({
              axis: 'y',
              step: 1
            });
          } else if (keyCode === KEY_LEFT) {
            snake.go({
              axis: 'x',
              step: -1
            });
          } else if (keyCode === KEY_RIGHT) {
            snake.go({
              axis: 'x',
              step: 1
            });
          }
        } else {// TODO
        }
      });
      return this;
    }
  }, {
    key: "initChessboard",
    value: function initChessboard() {
      var chessboard = this.chessboard;

      for (var i = 0; i < 30; i++) {
        chessboard[i] = new Array(30).fill(0);
      }

      return this;
    }
  }, {
    key: "initSnake",
    value: function initSnake() {
      var _this$_config$snake$p = this._config.snake.position,
          x = _this$_config$snake$p.x,
          y = _this$_config$snake$p.y;
      var chessboard = this.chessboard;
      chessboard[x] = [];
      chessboard[x][y] = 1;
      return this;
    }
  }, {
    key: "initFood",
    value: function initFood() {
      var len = this._config.food.count;

      for (var i = 0; i < len; i++) {
        var food = this.addFood();
        this.foods.push(food);
      }

      return this;
    }
  }, {
    key: "addFood",
    value: function addFood() {
      var chessboard = this.chessboard;
      var food = {
        status: 1
      };
      var flag = true;

      while (flag) {
        var x = Math.round(Math.random() * 30);
        var y = Math.round(Math.random() * 30);

        if (chessboard[x][y] === 0) {
          food.x = x;
          food.y = y;
          flag = false;
        }
      }

      return food;
    }
  }, {
    key: "layout",
    value: function layout() {
      var chessboard = this.chessboard,
          snake = this.snake,
          foods = this.foods;

      for (var i = 0; i < 30; i++) {
        chessboard[i] = new Array(30).fill(0);
      }

      snake.body.forEach(function (_ref) {
        var x = _ref.x,
            y = _ref.y;
        chessboard[x][y] = 1;
      });
      foods.forEach(function (_ref2) {
        var status = _ref2.status,
            x = _ref2.x,
            y = _ref2.y;
        status && (chessboard[x][y] = 2);
      }); // console.log(chessboard)

      return this;
    }
  }, {
    key: "draw",
    value: function draw() {
      var painter = this.painter,
          snake = this.snake,
          foods = this.foods;
      painter.clear().drawFood(foods).drawSnake(snake.body);
    }
  }, {
    key: "step",
    value: function step() {
      var snake = this.snake,
          chessboard = this.chessboard,
          foods = this.foods,
          tipElm = this.tipElm;

      if (snake.direction) {
        var _snake$move = snake.move(),
            x = _snake$move.x,
            y = _snake$move.y;

        var body = snake.body;
        var isBiteSelf = false;

        for (var i = 4; i < body.length; i++) {
          if (x === body[i].x && y === body[i].y) {
            isBiteSelf = true;
            break;
          }
        }

        var message = '';

        if (x < 0 || y < 0 || x === 30 || y === 30) {
          // 超出边界
          message = '撞墙啦';
        } else if (isBiteSelf) {
          // 撞自己的身体
          message = '咬到自己啦';
        } else if (chessboard[x][y] === 2) {
          // console.log('吃到食物了')
          for (var _i = 0; _i < foods.length; _i++) {
            var food = foods[_i];

            if (food.x === x && food.y === y) {
              foods.splice(_i, 1);
              snake.eat();
              foods.push(this.addFood());
              break;
            }
          }
        }

        if (message) {
          snake.stop();
          alert(message);
          tipElm.innerHTML = '按空格键重新开始游戏';
          this.status = 0; // 游戏结束
        } else {
          this.layout().draw();
        }
      }
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./Painter":"src/components/Painter.js","./Snake":"src/components/Snake.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _Game = _interopRequireDefault(require("./src/components/Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lastTimestamp;
var level = 5;
var speed = 500 / level;

function step(timestamp) {
  if (!lastTimestamp || timestamp - lastTimestamp > speed) {
    lastTimestamp = timestamp;
    game.step();
  }

  window.requestAnimationFrame(step);
}

var game = new _Game.default({
  snake: {
    length: 5,
    position: {
      x: 15,
      y: 15
    }
  }
});
window.requestAnimationFrame(step);
},{"./src/components/Game":"src/components/Game.js"}],"../../../../Softwares/nvm/v8.15.1/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53207" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../Softwares/nvm/v8.15.1/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map