
import View from "../../../src/core/View.js";

export default class Person extends View {
    constructor(name){
        super(name);
    }

    registerAsset(){
        this.importStyle("./modules/views/person/person.css");
        this.importScript(["./modules/stores/person.js"]);
    }

    onReady(){
        let that = this;
        this.$("#aaa").click(function(){
            that.onBtnClick();
        })
    }

    onBtnClick(){
        spa_enging.switchViewByHash("/car");
    }
}