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
        titledUnit : null,
        unitName : null,
        troops : null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log(this.node.name);
        this.unitName = this.node.name;
        this.node.on("click", this.clickCallback, this);
        this.troops = cc.find("Canvas/backGround").getComponent("unitConfigScene");
        this.titledUnit = new Array(6);
        this.titledUnit.forEach(function(unit) {
            unit = null;
        })
    },

    start () {

    },

    clickCallback : function(event) {
        var unit = new lsb.Unit();
        unit.unit = this.unitName;
        var unitIter = this.troops.getBlankUnitIter();
        if (unitIter != null) {
            for (var iter = 0; iter < this.titledUnit.length; iter++) {
                // 在这里检查titled unit array是否已满
                if (this.titledUnit[iter] == null) {
                    this.titledUnit[iter] = unitIter;
                    unit.title = iter;
                    break;
                }
            }
            cc.log(this.titledUnit);
            if (unit.title != null) {
                // 如果titled unit array未满，那么继续
                cc.log(unit);
                unit.loadUnit();
                unit.life = unit.maxLife;
                var unitInLine = cc.find("Canvas/troops/unit_" + unitIter).getComponent("selectBlankButton");
                unitInLine.setUnitImage(unit.unit.toUpperCase());
                this.troops.addUnit(unit);
                for (var iter = 0; iter < this.titledUnit.length; iter++) {
                    // 在这里检查titled unit array是否已满
                    if (this.titledUnit[iter] == null) {
                        return;
                    }
                }
                this._setTitleUnitImage("OFF_");
                cc.log("...titled unit is full...");
            } 
        } else {
            cc.log("...troops is full...");
        }
        
    },

    clearUnitTitle : function(unitNum) {
        for (var iter = 0; iter < this.titledUnit.length; iter++) {
            if (this.titledUnit[iter] == unitNum) {
                this.titledUnit[iter] = null;
                break;
            }
        }
        this._setTitleUnitImage("");    
    },

    _setTitleUnitImage : function(FLAG) {
        /*
         * @arguments : FLAG = OFF_ | null
         */ 
        var url = cc.url.raw("resources/image/UNIT_" + FLAG + this.unitName + ".png");
        var unitTexture = cc.textureCache.addImage(url);
        this.node.getComponent(cc.Button).normalSprite = new cc.SpriteFrame(unitTexture);
    }

    // update (dt) {},
});
