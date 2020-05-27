
import SpaEngine from "@core/SpaEngine.js";

let config = {
    public_asset:[
        "./modules/static/app.css",
        "./modules/static/tool.js"
    ],
    views:[
        {
            name:"person",
            class:"Person",
            router:"/",
            template:"./modules/views/person/person.html"
        },
        {
            name:"car",
            router:"/car",
            class:"Car",
            template:"./modules/views/car/car.html"
        }
    ]
}

let spa_enging = new SpaEngine(config);
window.spa_enging = spa_enging;

spa_enging.run($("#app"));