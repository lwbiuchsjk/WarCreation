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
        player : null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("editing-did-began", this.editPlayerBoxBegin, this);
        this.node.on("editing-did-ended", this.editPlayerBoxEnd, this);
        this.node.on("text-changed", this.editPlayerBoxChanged, this);
        this.node.on("editing-return", this.editPlayerBoxReturn, this);

        this.player = cc.find("gameInfo").getComponent("Player");
        this.player.webSocket.onmessage = function(msg) {
            cc.log(msg);
            var parsedMsg = new lsb.WebMsg(msg.data);
            switch(parsedMsg.type) {
                case lsb.WebMsg.TYPE_CLASS.UNIT_DATA : {
                    cc.log("...get unit data...");
                    cc.log(parsedMsg.value);
                    break;
                }
                default : {
                    cc.log("...other data...");
                    cc.log(parsedMsg.value);
                }
            }
        }

        cc.log(this.player.webSocket);
    },

    start () {

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

        cc.log(new lsb.PlayerMsg(playerID).getMsg());

        this.player.webSocket.send(new lsb.WebMsg(lsb.WebMsg.TYPE_CLASS.PLAYER_DATA, new lsb.PlayerMsg(playerID).getMsg()).toJSON());
    },
});
