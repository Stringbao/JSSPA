
import View from "../../../src/core/View.js";

export default class Car extends View {
    constructor(name){
        super(name);
    }

    registerAsset(){
        this.importStyle("./modules/views/car/car.css");
        this.importScript(["./modules/stores/car.js"]);
    }

    onReady(){
        let that = this;
        this.$("#btn").click(function(){
            that.onBtnClick();
        })
    }

    onBtnClick(){
        spa_enging.switchViewByHash("/");
    }
}