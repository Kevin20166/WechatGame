(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/NodeTouchUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '94340Mj04NPI6wtQnOvCYIV', 'NodeTouchUtil', __filename);
// Script/NodeTouchUtil.js

"use strict";

/**
 * 节点触摸移动的方法
 */

// 横向移动的缩放值
var touchMoveScaleX = 0.5;
// 回滚初始位置的速度
var speed = 200;
// 纵向移动的峰值
var maxMoveY = 2;

var NodeTouchUtil = function NodeTouchUtil() {};

NodeTouchUtil.New = function (node) {
    var inst = new NodeTouchUtil();
    inst.img = node;
    var touchNode = new cc.Node();
    touchNode.setContentSize(cc.director.getWinSize().width, 700);
    touchNode.parent = inst.img;
    // inst.img = node.getChildByName('img')
    inst.localPos = inst.img.getPosition();
    inst.localRotate = inst.img.getRotation();
    inst.initTouchFunction(touchNode);
};

NodeTouchUtil.prototype.initTouchFunction = function (node) {
    var _this = this;

    node.on(cc.Node.EventType.TOUCH_START, function (event) {
        if (_this.hasChoose) {
            return;
        }
        // this.img.setPosition(this.localPos)
        // this.img.setRotation(this.localRotate)

        var p = event.touch._point;
        _this._lastTouchPoint = p;
        _this._rotation = 0;
    });

    node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
        if (_this.hasChoose) {
            return;
        }
        var p1 = _this._lastTouchPoint;
        var p2 = event.touch._point;
        var dx = (p2.x - p1.x) * touchMoveScaleX;
        var dy = p2.y - p1.y;
        if (dx != 0) {
            _this._rotation = _this._rotation + dx / Math.abs(dx) * 0.4;
        }

        if (_this.img.getPosition().y < -maxMoveY + _this.localPos.y) {
            if (dy < 0) {
                dy = 0;
            }
        } else if (_this.img.getPosition().y > maxMoveY + _this.localPos.y) {
            if (dy > 0) {
                dy = 0;
            }
        }

        if (dy > maxMoveY) {
            dy = maxMoveY;
        } else if (dy < -maxMoveY) {
            dy = -maxMoveY;
        }
        console.log(dx);

        if (Math.abs(dx > 10)) {
            _this.img.setPosition(_this.img.getPosition().x + dx, _this.img.getPosition().y + dy);
        } else {
            _this.img.runAction(cc.moveTo(0.2, cc.p(_this.img.getPosition().x + dx, _this.img.getPosition().y + dy)).easing(cc.easeSineIn()));
        }

        if (Math.abs(dx) > 20) {
            _this.hasChoose = true;
            _this.direction = dx > 0 ? 1 : -1;
            _this.img.stopAllActions();
            var posX = _this.img.getPosition().x + _this.direction * cc.director.getWinSize().width / 2 + _this.direction * _this.img.getContentSize().width;
            _this.img.runAction(cc.moveTo(0.3, cc.p(posX, _this.img.getPosition().y)).easing(cc.easeSineIn()));
        }
        // this.img.runAction( cc.easeBounceOut(cc.sequence ) )

        _this.img.setRotation(_this._rotation);

        // this.img.runAction(cc.moveBy(cc.p(dx/100, 0), 0.2))
        // this.img.setPosition(this.img.getPosition().x + dx, this.img.getPosition().y)
        // this.img.runAction( cc.moveBy(cc.p(dx,0), 0.1) ).easing(cc.easeInOut())
        _this._lastTouchPoint = cc.p(p2.x, p2.y);
    });

    var touchend = function touchend() {
        if (_this.hasChoose) {
            //调用已经选择的方法
            return;
        }
        _this._lastTouchPoint = cc.p(0, 0);
        _this.img.stopAllActions();
        var dt = Math.abs(_this._lastTouchPoint.x - _this.localPos.x) / speed;
        dt = 0.3;
        _this.img.runAction(cc.moveTo(dt, _this.localPos).easing(cc.easeIn(3)));
        _this.img.runAction(cc.rotateTo(dt, 0, 0).easing(cc.easeIn(3)));
    };

    node.on(cc.Node.EventType.TOUCH_END, function (event) {
        touchend();
    });

    node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
        touchend();
    });
};

module.exports = NodeTouchUtil;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=NodeTouchUtil.js.map
        