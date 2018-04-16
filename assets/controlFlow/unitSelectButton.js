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
        iter : null,
        troops : null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.iter = Number(this.node.name.slice(this.node.name.indexOf("_") + 1, this.node.name.length)) - 1;
        this.troops = cc.find("Canvas/backGround").getComponent("unitConfigScene");
        cc.log(this.iter);
        this.node.on("click", this.selectUnitCallback, this);

        if (this.troops.getBlankUnitIter() === this.iter) {
            var url = cc.url.raw("resources/image/UNIT_DONE.png");
            var unitTexture = cc.textureCache.addImage(url);
            this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(unitTexture);
        }
    },

    start () {
        

    },

    selectUnitCallback : function(event) {
        var blankIter = this.troops.getBlankUnitIter;
        if (blankIter !== this.iter) {
            var removedUnit = this.troops.removeUnit(this.iter);
            if (removedUnit != null) {
                cc.find("Canvas/unitList/" + removedUnit.sequence + "List/" + removedUnit.unit).getComponent("unitConfigButton").clearUnitTitle(this.iter);
            }
        }
    }

    // update (dt) {},
});
