// var touchMoveScaleX = 0.5;
// var speed = 200;
// var maxMoveY = 2;
var NodeTouchUtil = require("NodeTouchUtil")
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        img : {
            default: null,
            type: cc.Node
        },

        touchNode: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;

        NodeTouchUtil.New(this.img);

        // var localPos = this.img.getPosition()
        // var localRotate = this.img.getRotation()
        
        // this.touchNode.on(cc.Node.EventType.TOUCH_START, (event)=>{
        //     // this.img.setPosition(localPos)
        //     // this.img.setRotation(localRotate)

        //     var p = event.touch._point
        //     this._lastTouchPoint = p
        //     this._rotation = 0


        // })
        
        // this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{
        //     var p1 = this._lastTouchPoint
        //     var p2 = event.touch._point
        //     var dx = (p2.x - p1.x) * touchMoveScaleX
        //     var dy = (p2.y - p1.y)
        //     if ( dx != 0 ) { this._rotation = this._rotation + dx/Math.abs(dx)*0.4 }

        //     if ( this.img.getPosition().y < -maxMoveY + localPos.y ) {
        //         if ( dy < 0 ) { dy = 0}
        //     } else if ( this.img.getPosition().y > maxMoveY + localPos.y ) {
        //         if ( dy > 0 ) { dy = 0}
        //     }

        //     if ( dy > maxMoveY ) { dy = maxMoveY }
        //     else if (dy < -maxMoveY ) { dy = -maxMoveY }
        //     console.log(dy)


        //     // this.img.runAction( cc.easeBounceOut(cc.sequence ) )
            
        //     this.img.runAction(cc.moveTo(0.5, cc.p(this.img.getPosition().x + dx, this.img.getPosition().y+dy)).easing(cc.easeSineIn()))
        //     this.img.setRotation(this._rotation)

        //     // this.img.runAction(cc.moveBy(cc.p(dx/100, 0), 0.2))
        //     // this.img.setPosition(this.img.getPosition().x + dx, this.img.getPosition().y)
        //     // this.img.runAction( cc.moveBy(cc.p(dx,0), 0.1) ).easing(cc.easeInOut())
        //     this._lastTouchPoint = cc.p(p2.x, p2.y)
        // })


        // var touchend = () => {
        //     this._lastTouchPoint = cc.p(0,0)
        //     this.img.stopAllActions()
        //     var dt = Math.abs(this._lastTouchPoint.x - localPos.x)/speed
        //     dt = 0.3
        //     this.img.runAction(cc.moveTo(dt, localPos).easing(cc.easeIn(3)))
        //     this.img.runAction(cc.rotateTo(dt, 0, 0).easing(cc.easeIn(3)))
        // }

        // this.touchNode.on(cc.Node.EventType.TOUCH_END, (event)=>{
        //     touchend()
        // })

        // this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, (event)=>{
        //     touchend()
        // })




    },

    // called every frame
    update: function (dt) {

    },
});
