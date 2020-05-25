
let Person = function(){
    this.registerAsset = function(){
        this.registerStyle(["./modules/views/person/person.css"]);
        this.registerScript(["./modules/views/person/pp.js","./modules/stores/person.js"]);
    }

    this.onReady = function(){
        let that = this;
        this.$("#person").click(function(){
            that.onBtnClick();
        })
    }

    this.onBtnClick = function(){
        spa_enging.switchView("/car");
    }
}

//不能直接在构造函数里面使用 CoreView.call(this,null), CoreView经过编译后变成了一个函数
Person.prototype = new CoreView();