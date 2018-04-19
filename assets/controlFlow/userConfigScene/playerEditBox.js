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
        this.node.on("editing-did-began", this.editPlayerBoxBegin, this);
        this.node.on("editing-did-ended", this.editPlayerBoxEnd, this);
        this.node.on("text-changed", this.editPlayerBoxChanged, this);
        this.node.on("editing-return", this.editPlayerBoxReturn, this);

        var self = this;

        this.gameInfo = cc.find("gameInfo").getComponent("gameInfo");
        this.gameInfo.webSocket.onmessage = function(msg) {
            cc.log(msg);
            var parsedMsg = new lsb.WebMsg(msg.data);
            switch(parsedMsg.type) {
                case lsb.WebMsg.TYPE_CLASS.PLAYER_DATA : {
                    var playerMsg = parsedMsg.value;
                    cc.log("...get unit data...");
                    cc.log(playerMsg);

                    if (playerMsg.troops != null) {
                        self.gameInfo.getPlayer().troops = playerMsg.troops;
                        cc.find("Canvas/troops").getComponent("playerTroopsDisplayer").showPlayerTroops();
                        if (self.gameInfo.battleID == null) {
                            // 在这里根据情况展示按钮。事实上还需要查看battleProp。这里简化为local battle的情况。
                            self._showNewTroops();
                            self._showAttackButton();
                        } else {
                            self._showNewTroops();
                            self._showDefenceButton();
                        } 
                    } else {
                        self._showNewTroops();
                    }
                    break;
                }
                default : {
                    cc.log("...other data...");
                    cc.log(parsedMsg.value);
                }
            }
        }

        cc.log(this.gameInfo.webSocket);
    },

    start () {
        if (this.gameInfo.getPlayer() != null) {
            this.node.getComponent(cc.EditBox).string = this.gameInfo.getPlayer().playerID;
            this._activePlayer();
            this.gameInfo.webSocket.send(new lsb.WebMsg(lsb.WebMsg.TYPE_CLASS.PLAYER_DATA, this.gameInfo.getPlayer().getMsg()).toJSON());            
        }
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
        var playerID = editbox.string;
        this.gameInfo.addNewPlayer(new lsb.PlayerMsg(playerID));

        cc.log(this.gameInfo.getPlayer());
        this._activePlayer();
        this.gameInfo.webSocket.send(new lsb.WebMsg(lsb.WebMsg.TYPE_CLASS.PLAYER_DATA, this.gameInfo.getPlayer().getMsg()).toJSON());
    },

    _showAttackButton : function() {
        var createLocalBattle = cc.find("Canvas/createLocalBattle"),
            createRemoteBattle = cc.find("Canvas/createRemoteBattle");    
        createLocalBattle.opacity = 255;
        createLocalBattle.resumeSystemEvents(true);
        //createRemoteBattle.opacity = 255;
        //createRemoteBattle.resumeSystemEvents(true);
        
    },

    _showNewTroops : function() {
        var newTroopButton = cc.find("Canvas/newTroop");
        newTroopButton.opacity = 255;
        newTroopButton.resumeSystemEvents(true);
    },

    _showDefenceButton : function(attackFaction) {
        var responseButton = cc.find("Canvas/responseBattle"),
            attackFaction = cc.find("Canvas/attackFaction");
        responseButton.resumeSystemEvents(true);
        responseButton.opacity = 255;
        attackFaction.opacity = 255;
        attackFaction.string = attackFaction;
    },

    _showContinueButton : function() {
        var continueBattle = cc.find("Canvas/continueBattle"),
            exitBattle = cc.find("Canvas/exitBattle");
        continueBattle.opacity = 255;
        continueBattle.resumeSystemEvents(true);
        exitBattle.opacity = 255;
        exitBattle.resumeSystemEvents(true);
    },

    _activePlayer : function() {
        //this.gameInfo.getPlayer().active = lsb.PlayerMsg.STATUS.ACTIVE;
    }
});
