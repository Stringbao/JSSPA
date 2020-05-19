
import SpaEngine from "@core/SpaEngine.js";

let config = {
    public_asset:{
        css:["./modules/static/app.css"],
        js:["./modules/static/tool.js"]
    },
    views:[
        {
            key:"person",
            router:"plist",
            store:"./modules/stores/person.js",
            template:"./modules/views/person.html",
            controller:".",
            dependencies:[]
        }
    ]
}

let spa_enging = new SpaEngine(config);
spa_enging.run()