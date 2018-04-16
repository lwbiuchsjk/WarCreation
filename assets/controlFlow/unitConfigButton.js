// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var lsb = require("unit");

cc.Class({
    extends: cc.Component,

    properties: {
        titledUnit : new Array(6),
        unit : null,
        troops : null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.unit = this.node.name;
        this.node.on("click", this.clickCallback, this);
        this.troops = cc.find("Canvas/backGround").getComponent("unitConfigScene");
    },

    start () {

    },

    clickCallback : function(event) {
        var unit = new lsb.Unit();
        unit.unit = event.detail.name;
        var unitIter = this.troops.getBlankUnitIter();
        if (unitIter != null) {
            for (var iter; iter < this.titledUnit.length; iter++) {
                if (this.titledUnit[iter] == null) {
                    this.titledUnit[iter] = unitIter;
                    unit.title = iter;
                    break;
                }
            }
            unit.loadUnit();
            unit.life = unit.maxLife;
            cc.find("Canvas/troops/unit_" + unitIter).getComponent("unitSelectButton").setUnitImage(unit);
            this.troops.addUnit(unit);
        } else {
            cc.log("...troops is full...");
        }
        
    },

    clearUnitTitle : function(iter) {
        this.titledUnit[iter] = null;
    }

    // update (dt) {},
});
