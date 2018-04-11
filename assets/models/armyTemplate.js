/*
 * armyTemplate作为数据库存在。正常情况下，应该使用一个独立数据库来存储数据。
 * Army应当是一个独立的类，通过参数来索引数据库中的相关条目，然后创建一个独立的army结构。
 *
 * 当前的存储方式，只能手工创建与导入。还没有找到自动化的方法。
 * 另外，当前的engage属性还没有利用起来。
 */
window.armyTemplate = {
    sequences : {
        HEAVY_INFANTRY : "heavyInfantry",
        LIGHT_INFANTRY : "lightInfantry",
        HEAVY_CAVALVY : "heavyCavalvy",
        LIGHT_CAVALVY : "lightCavalvy"
    },
    status : {
        ////////////////////////////////////
        // 所有新增的单位状态都需要在这里备案
        UNIQUE_MOVEMENT : "uniqueMovement",
        DEFENCE : "defence",                                  //近距离防御姿态
        DEFENCE_CHARGE_FACE : "defenceCharge_face",          //近距离防御姿态，进攻方正在正面冲锋
        ATTACK : "attack",                                    //近距离进攻姿态
        ATTACK_CHARGE : "attackCharge",                      //近距离进攻_冲锋姿态
        ATTACK_CHARGE_ADVANTAGE : "attackCharge_advantage",  //近距离进攻_冲锋_优势位置姿态
        ATTACK_ENGAGE : "attackEngage",                      //进攻_目标正在交火状态
        ATTACK_REMOTE : "attackRemote",                      //远程攻击姿态
        DEFENCE_REMOTE: "defenceRemote",                     //远程防御姿态
        MOVE : "move"                                        // 移动
    },
    position : {
        FACE : "face",
        SIDE : "side",
        BACK : "back",
        FACE_REMOTE : "face_remote"
    },
    units : {
        SHIELD_MAN : "shieldMan",
        PIKE_MAN : "pikeMan",
        SPEAR_MAN : "spearMan",
        BOW_MAN : "bowMan",

        ATTACKER : "attacker",
        CHARGER : "charger",
        INTERCEPTOR : "interceptor",
        SHOOTER : "shooter",

        IMPACT_HORSE : "impactHorse",
        SHOOT_HORSE : "shootHorse",
        DRAGON_HORSE : "dragonHorse",

        HUNT_MOUNT : "huntMount",
        BOW_MOUNT : "bowMount",
        ATTACK_MOUNT : "attackMount"
    },
    faction : {
        attackFaction : "attackFaction",
        defenceFaction: "defenceFaction"
    },
    troops : null                                             //读入兵种信息后，将数据装载在这里
};