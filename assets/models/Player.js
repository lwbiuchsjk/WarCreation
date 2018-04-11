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
        players : [],
        battleProp : null,
        webSocket : null
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    addNewPlayer : function(player) {
        this.players.push(player);
    },

    checkPlayerNumberLegel : function() {
        return this.players.length <= 2;
    },

    getPlayersNumber : function() {
        return this.players.length;
    },

    getPlayer : function(iter) {
        return this.players[iter];
    },

    getNowPlayer : function() {
        return this.players[this.players.length - 1];
    }

    // update (dt) {},
});
