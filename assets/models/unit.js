function Unit(rawData) {
    this.unit = null;
    this.life = null;
    this.status = null;
    this.position = null;
    this.engage = null;
    this.title = null;
    this.faction = null;
    this._serialNumber = "";         // 序列号，最后两位为数组下标
    this._serialLength = 0;
    this.attackWeapon = null;
    this.attackFormation = null;
    this.defenceWeapon = null;
    this.defenceFormation = null;
    this.fleeLife = null;
    this.maxLife = null;
    this.speciality = null;
    this.position = null;
    this.sequence = null;
    this.engage = null;
    this.ability = null;

    if (rawData) {
        for (var prop in rawData) {
            if (prop in this) {
                this[prop] = rawData[prop];
            }
            if (prop == "serialNumber") {
                this._serialNumber = rawData[prop];
            }
        }
    }
    this._serialGenerator(10);
    this._nowLife = this.maxLife;
}

Unit.prototype = {
    _inArray : function(array, ele) {
        for (var i in array) {
            if (array[i] === ele)
                return true;
        }
        return false;
    },

    _serialGenerator : function(serialLength) {
        // 输入参数为初始序列号长度，而实际序列号长度为serialLength + 2。这是因为会将数组下标加在最后两位
        // 只有在serialNumber为空的时候才创造。
        if (this._serialNumber === "") {
            var serialTmp = Math.floor(Math.random() * Math.pow(10, serialLength));
            var serialString = String(serialTmp);
            var serialBlank = "";
            if (serialString.length < serialLength) {
                for (var iter = 0; iter < serialLength - serialString.length; iter++) {
                    serialBlank += "0";
                }
            }
            this._serialNumber = serialBlank + serialString;
        }
        this._serialLength = serialLength + 2;
    },

    set serial(value) {
        var bar = 2;
        var stringValue = value < 10 ? "0" + value : value;
        if (this._serialNumber.length === this._serialLength - bar) {
            this._serialNumber += stringValue;
        } else if (this._serialNumber.length === this._serialLength) {
            this._serialNumber = this._serialNumber.slice(0, this._serialLength - 2) + stringValue;
        } else {
            throw new Error("serial number has wrong index message!!!")
        }
    },

    get serial() {
        var bar = 2;
        if (this._serialNumber.length === this._serialLength - bar) {
            return 0;
        } else if (this._serialNumber.length === this._serialLength){
            return Number(this._serialNumber.slice(this._serialLength - 2, this._serialLength));
        } else {
            throw new Error("Wrong timing to ger serial!!")
        }
    },

    get serialNumber() {
        return this._serialNumber;
    },

    loadUnit : function() {
        /*
         * 因为loadUnit的时机是在display阶段，导致unit没有status信息。因而判断中取消对status的判断。
         */
        var squad = armyTemplate.troops[this.unit];
        this.attackWeapon = squad.attackWeapon;
        this.attackFormation = squad.attackFormation;
        this.defenceWeapon = squad.defenceWeapon;
        this.defenceFormation = squad.defenceFormation;
        this.fleeLife = squad.fleeLife;
        this.maxLife = squad.maxLife;
        this.speciality = squad.speciality;
        if (this.position == null || !this._inArray(armyTemplate.position, this.position))
            this.position = armyTemplate.position.FACE;
        this.sequence = squad.sequence;
        this.engage = [];
        this.ability = [];
        // 装载nowLife记录。该记录用于战斗中存储实际生命值。而life则用于暂存计算所得生命值。
    },

    checkStatus : function() {
        // 用于输入attackStatus时检测status的合法性
        for (var iter = 0; iter < this.speciality.length; iter++) {
            if (this.speciality[iter].indexOf(this.status) >= 0) {
                console.log(this.speciality[iter]);
                return true;
            }
        }
        return false;
    },

    setEngage : function(unit) {
        this.engage.push(unit.serial);
    },
    resetEngage : function() {
        this.engage = [];
    },

    toString : function() {
        // 本方法返回的只是带有属性的类，属性的类型为number或string。类中没有方法。可以作为数据库记录的输入。
        var tmp = {};
        for (var iter in this) {
            if (this[iter] instanceof Function)
                continue;
            var prop = "";
            if (this[iter] instanceof Array) {
                for (var num in this[iter]) {
                    prop += this[iter][num]
                }
            } else {
                prop = this[iter];
            }
            tmp[iter] = prop;
        }
        return tmp;
    },
    toUnit : function() {
        // 本方法返回的是一个Unit类，将所有Array类型的属性都还原，方便读取。
        // 判断Array类型的属性的依据为观察输入String中是否包含";"字符.
        if (typeof this.engage === "string")
            this.engage = this._string2Array("engage");
        if (typeof this.ability === "string")
            this.ability = this._string2Array("ability");
        if (typeof this.speciality === "string")
            this.speciality = this._string2Array("speciality");
        return this;
    },
    _string2Array : function(prop) {
        var array = this[prop].split(";");
        return array.slice(0, array.length - 1);
    },

    set nowLife (value) {
        this._nowLife = value;
    },
    get nowLife () {
        return this._nowLife;
    }
};

exports.Unit = Unit;