// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var unitConfigScene = cc.Class({
    extends: cc.Component,

    properties: {
        faction: null,
        myTroops : null,
        currentUnitIter : 0,

        attackFactionColor : cc.color(217, 150, 144),
        defenceFactionColor : cc.color(147, 205, 221)
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.faction = armyTemplate.faction.attackFaction;
        cc.find("Canvas/backGround").color = this[this.faction + "Color"];
        this.myTroops = new Array(10);
    },

    start () {

    },

    getBlankUnitIter : function() {
        return this.currentUnitIter;
    },

    addUnit : function(unit) {
        var tmpIter = this.currentUnitIter;
        this.myTroops[this.currentUnitIter] = unit;
        for (var iter = 0; iter < this.myTroops.length; iter++) {
            if (this.myTroops[iter] == null) {
                this.currentUnitIter = iter;
                break;
            }
        }
        if (this.currentUnitIter === tmpIter) {
            this.currentUnitIter = null;
        }
    },

    removeUnit : function(iter) {
        var unit = this.myTroops[iter];
        this.myTroops[iter] = null;
        this.currentUnitIter = iter;
        return unit;
    },

    // update (dt) {},
});
