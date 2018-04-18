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
        //this.faction = armyTemplate.faction.attackFaction;
        //cc.find("Canvas/backGround").color = this[this.faction + "Color"];
        this.myTroops = new Array(10);
        this.myTroops.forEach(function(unit) {
            unit = null;
        })
    },

    start () {
    },

    getBlankUnitIter : function() {
        return this.currentUnitIter;
    },

    addUnit : function(unit) {
        this.myTroops[this.currentUnitIter] = unit;
        this.currentUnitIter = null;
        for (var iter = 0; iter < this.myTroops.length; iter++) {
            if (this.myTroops[iter] == null) {
                this.currentUnitIter = iter;
                break;
            }
        }
        if (this.currentUnitIter != null) {
            cc.find("Canvas/troops/unit_" + this.currentUnitIter).getComponent("selectBlankButton").setUnitImage("ON");
        }
        cc.log(this.myTroops);
    },

    removeUnit : function(iter) {
        var removedUnit = this.myTroops[iter];
        cc.log(removedUnit);
        
        if (this.currentUnitIter != null) {
            cc.find("Canvas/troops/unit_" + this.currentUnitIter).getComponent("selectBlankButton").setUnitImage("OFF");
        }
        cc.find("Canvas/unitList/" + removedUnit.sequence + "List/" + removedUnit.unit).getComponent("selectUnitButton").clearUnitTitle(iter);

        this.myTroops[iter] = null;
        this.currentUnitIter = iter;
    },

    getTroops : function() {
        return this.myTroops;
    }

});
