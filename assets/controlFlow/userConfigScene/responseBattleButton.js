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
        gameInfo : null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameInfo = cc.find("gameInfo").getComponent("gameInfo");
        this.node.on(cc.Node.EventType.MOUSE_UP, this.responseBattleCallback, this);
        this.node.opacity = 0;
    },

    start () {
        this.node.pauseSystemEvents(true);
    },

    responseBattleCallback : function() {
        this.gameInfo.getPlayer().battleID = this.gameInfo.battleID;
        this.gameInfo.getPlayer().faction = armyTemplate.faction.defenceFaction;
        var battleMsg = new lsb.BattleMsg(this.gameInfo.battleID, this.gameInfo.battleProp);
        battleMsg.defenceFaction = this.gameInfo.getPlayer().playerID;
        this.gameInfo.webSocket.send(new lsb.WebMsg(lsb.WebMsg.TYPE_CLASS.BATTLE_DATA, battleMsg.getMsg()).toJSON());
    }
});
