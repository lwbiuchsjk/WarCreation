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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var playerNode = cc.find("gameInfo");
        cc.game.addPersistRootNode(playerNode);

        var url = cc.url.raw(messageCode.CONFIG_FILE);
        cc.loader.load(url, function(err, data) {
            console.log(data["server"]);
            messageCode.COMMUNICATION_ADDRESS = data["server"];
            var webSocket = new WebSocket(messageCode.COMMUNICATION_ADDRESS);
            webSocket.onopen = function() {
                console.log("...websocket begin...");
                webSocket.send(new lsb.WebMsg(lsb.WebMsg.TYPE_CLASS.CODE_DATA, messageCode.LOAD_UNIT_TEMPLATE).toJSON());
            }
            webSocket.onmessage = function(msg) {
                var paresMsg;
                try {
                    paresMsg = new lsb.WebMsg(msg.data);
                } catch (error) {
                    console.log(error);
                    return;
                }
                switch (paresMsg.type) {
                    case lsb.WebMsg.TYPE_CLASS.CODE_DATA : {
                        console.log(paresMsg.value);
                        break;
                    }
                    case lsb.WebMsg.TYPE_CLASS.UNIT_DATA : {
                        var troops = {};
                        for (var iter in paresMsg.value) {
                            var unit = paresMsg.value[iter].unit;
                            troops[unit] = paresMsg.value[iter];
                            delete troops["createdAt"];
                            delete troops["updatedAt"];
                        }
                        armyTemplate.troops = troops;
                        console.log(armyTemplate.troops);
                        break;
                    }
                    default : {
                        console.log(paresMsg.type + " type msg with: ");
                        console.log(paresMsg.value);
                    }
                }
            }
            playerNode.getComponent("Player").webSocket = webSocket;
            cc.director.loadScene("userConfigScene");
        });
    },

    start () {

    },

    // update (dt) {},
});
