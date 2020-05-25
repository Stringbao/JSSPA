let Car = function(){
    this.registerAsset = function(){
        this.registerStyle(["./modules/views/car/car.css"]);
        this.registerScript(["./modules/views/car/1.js","./modules/views/car/2.js","./modules/stores/car.js"]);
    }

    this.onReady = function(){
        let that = this;
        this.$event("click","#aaa",function(e){
            console.log(456);
            that.onBtnClick();
        })
    }

    this.onBtnClick = function(){
        spa_enging.switchView("/");
    }
}

//不能直接在构造函数里面使用 CoreView.call(this,null), CoreView经过编译后变成了一个函数
Car.prototype = new CoreView();