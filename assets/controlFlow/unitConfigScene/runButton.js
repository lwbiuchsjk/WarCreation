// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var lsb = require("messageModels");

cc.Class({
    extends: cc.Component,

    properties: {
        troops : null,
        gameInfo : null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.troops = cc.find("Canvas/backGround").getComponent("unitConfigScene");
        this.gameInfo = cc.find("gameInfo").getComponent("gameInfo");
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.runButtonCallback, this);
    },

    start () {

    },

    runButtonCallback : function(event) {
        var troops = this.troops.getTroops();
        this.gameInfo.getPlayer().troops = troops;
        cc.director.loadScene("userConfigScene");
    }
    // update (dt) {},
});
