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
//var messageCode = require("messageCode");

var UserConfigScene = cc.Class({
    extends: cc.Component,

    properties: {
        playerID : null,
        battleID : null,
        battleProp : null,
        faction : null,
        webSocket : null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (this.node.name ===  "userInput") {
            this.node.on("editing-did-began", this.editPlayerBoxBegin, this);
            this.node.on("editing-did-ended", this.editPlayerBoxEnd, this);
            this.node.on("text-changed", this.editPlayerBoxChanged, this);
            this.node.on("editing-return", this.editPlayerBoxReturn, this);
        }
        if (this.node.name === "battleInput" ) {
            this.node.on("editing-did-began", this.editPlayerBoxBegin, this);
            this.node.on("editing-did-ended", this.editPlayerBoxEnd, this);
            this.node.on("text-changed", this.editPlayerBoxChanged, this);
            this.node.on("editing-return", this.editBattleBoxReturn, this);
        }
        if (this.node.name === "defenceFactionButton" || this.node.name === "attackFactionButton") {
            this.node.on("click", this.buttonClickCallback, this);
        }
        this.webSocket = cc.director.getScene().getChildByName("gameInfo").getComponent("Player").webSocket;
    },

    start () {
        console.log("well done!!!");
    },

    editPlayerBoxBegin: function (event) {
        var editbox = event.detail;
        console.log("editBoxDidBegin !");
    },
    editPlayerBoxEnd : function(event) {
        var editbox = event.detail;
        console.log("editBoxDidEnd !");
    },
    editPlayerBoxChanged : function(event) {
        var editbox = event.detail;
        console.log("editBox TextChanged, text: " + editbox.string);
    },
    editPlayerBoxReturn : function(event) {
        var editbox = event.detail;
        console.log("editBoxwas returned !");
        var playerID = Number(editbox.string);
        this.playerID = playerID;

        this._addNewPlayer();
    },

    editBattleBoxReturn : function(event) {
        var editbox = event.detail;
        console.log("editBoxwas returned !");
        var battleID = Number(editbox.string);

        this.battleID = battleID;
        this.battleProp = messageCode.SET_SINGLE_BATTLE;

        var battleInfo = new lsb.BattleMsg(battleID);
        battleInfo.battleProp = messageCode.SET_SINGLE_BATTLE;
        this.webSocket.send(new lsb.WebMsg(lsb.WebMsg.TYPE_CLASS.BATTLE_DATA, battleInfo.getMsg()).toJSON());

        this._addNewPlayer();
    },

    buttonClickCallback : function(event) {
        console.log(event.detail.name);
        this.faction = faction;
        console.log(this.faction);

        this._addNewPlayer();
    },

    _checkPlayerInfoReady : function() {
        return this.battleID != null && this.playerID != null && this.faction != null;
    },

    _addNewPlayer : function() {
        if (this._checkPlayerInfoReady()) {
            var playerInfo = new lsb.PlayerMsg(this.battleID)
            playerInfo.playerID = this.playerID;
            playerInfo.faction = this.faction;
            var playerNode = cc.director.getScene().getChildByName("gameInfo").getComponent("Player");
            playerNode.battleProp = this.battleProp;
            playerNode.addNewPlayer(playerInfo);
        }
    }

    // update (dt) {},
});
