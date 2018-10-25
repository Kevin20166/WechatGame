/**
 * 节点触摸移动的方法
 */

// 横向移动的缩放值
var touchMoveScaleX = 0.5;
// 回滚初始位置的速度
var speed = 200;
// 纵向移动的峰值
var maxMoveY = 2;


var NodeTouchUtil = function(){}

NodeTouchUtil.New = function(node) {
    var inst = new NodeTouchUtil()
    inst.img = node
    var touchNode = new cc.Node()
    touchNode.setContentSize(cc.director.getWinSize().width, 700)
    touchNode.parent = inst.img
    // inst.img = node.getChildByName('img')
    inst.localPos = inst.img.getPosition()
    inst.localRotate = inst.img.getRotation()
    inst.initTouchFunction(touchNode)
}

NodeTouchUtil.prototype.initTouchFunction = function(node) {
    node.on(cc.Node.EventType.TOUCH_START, (event)=>{
        if ( this.hasChoose ) { return }
        // this.img.setPosition(this.localPos)
        // this.img.setRotation(this.localRotate)

        var p = event.touch._point
        this._lastTouchPoint = p
        this._rotation = 0


    })
    
    node.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{
        if ( this.hasChoose ) { return }
        var p1 = this._lastTouchPoint
        var p2 = event.touch._point
        var dx = (p2.x - p1.x) * touchMoveScaleX
        var dy = (p2.y - p1.y)
        if ( dx != 0 ) { this._rotation = this._rotation + dx/Math.abs(dx)*0.4 }

        if ( this.img.getPosition().y < -maxMoveY + this.localPos.y ) {
            if ( dy < 0 ) { dy = 0}
        } else if ( this.img.getPosition().y > maxMoveY + this.localPos.y ) {
            if ( dy > 0 ) { dy = 0}
        }

        if ( dy > maxMoveY ) { dy = maxMoveY }
        else if (dy < -maxMoveY ) { dy = -maxMoveY }
        console.log(dx)

        if ( Math.abs(dx > 10) ) {
            this.img.setPosition(this.img.getPosition().x + dx, this.img.getPosition().y + dy)
        } else {
            this.img.runAction(cc.moveTo(0.2, cc.p(this.img.getPosition().x + dx, this.img.getPosition().y+dy)).easing(cc.easeSineIn()))
        }

        if  (Math.abs(dx) > 20 ) { 
            this.hasChoose = true 
            this.direction = dx > 0 ? 1 : -1
            this.img.stopAllActions()
            var posX = this.img.getPosition().x + this.direction * cc.director.getWinSize().width/2 + this.direction*this.img.getContentSize().width
            this.img.runAction(cc.moveTo(0.3, cc.p(posX, this.img.getPosition().y)).easing(cc.easeSineIn()))
        }
        // this.img.runAction( cc.easeBounceOut(cc.sequence ) )
        
        this.img.setRotation(this._rotation)

        // this.img.runAction(cc.moveBy(cc.p(dx/100, 0), 0.2))
        // this.img.setPosition(this.img.getPosition().x + dx, this.img.getPosition().y)
        // this.img.runAction( cc.moveBy(cc.p(dx,0), 0.1) ).easing(cc.easeInOut())
        this._lastTouchPoint = cc.p(p2.x, p2.y)
    })


    var touchend = () => {
        if ( this.hasChoose ) { 
            //调用已经选择的方法
            return 
        }
        this._lastTouchPoint = cc.p(0,0)
        this.img.stopAllActions()
        var dt = Math.abs(this._lastTouchPoint.x - this.localPos.x)/speed
        dt = 0.3
        this.img.runAction(cc.moveTo(dt, this.localPos).easing(cc.easeIn(3)))
        this.img.runAction(cc.rotateTo(dt, 0, 0).easing(cc.easeIn(3)))
    }

    node.on(cc.Node.EventType.TOUCH_END, (event)=>{
        touchend()
    })

    node.on(cc.Node.EventType.TOUCH_CANCEL, (event)=>{
        touchend()
    })



}




module.exports = NodeTouchUtil
