// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        gameInfo : null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameInfo = cc.find("gameInfo").getComponent("gameInfo");
        this.showPlayerTroops();
    },

    start () {

    },

    showPlayerTroops : function() {
        if (this.gameInfo.getPlayer() != null && this.gameInfo.getPlayer().troops != null) {
            // 首先销毁已有的显示节点
            this.node.children.forEach(function(child) {
                child.destroy();
            });
            var troops = this.gameInfo.getPlayer().troops;
            var self = this;
            troops.forEach(function(unit, iter) {
                var url = cc.url.raw("resources/image/UNIT_" + unit.unit.toUpperCase() + ".png");
                var unitTexture = cc.textureCache.addImage(url);
                var unitNode = new cc.Node();
                var unitSprite = unitNode.addComponent(cc.Sprite);
                unitSprite.spriteFrame = new cc.SpriteFrame(unitTexture);
                unitNode.setScaleY(0.666);
                self.node.addChild(unitNode);
                cc.log(iter);
            })
            cc.log(this.node);
        } else {
            cc.log("...player has no troops...");
        }
    }
});
