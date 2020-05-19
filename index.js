
import SpaEngine from "@core/SpaEngine.js";

let config = {
    public_asset:[
        "./modules/static/app.css",
        "./modules/static/tool.js"
    ],
    views:[
        {
            
            key:"person",
            router:{
                default:true,
                url:"/",
                beforeEnter:(data)=>{
                    console.log("ready enter to:" + data._key);
                },
                afterEnter:(data)=>{

                }
            },
            store:"./modules/stores/person.js",
            template:"./modules/views/person.html",
            controller:"./modules/controllers/person.js",
            dependencies:[
                "./modules/services/person.js"
            ]
        },
        {
            key:"car",
            router:{
                url:"/clist",
                beforeEnter:(data)=>{
                    console.log("ready enter to:" + data._key);
                }
            },
            store:"./modules/stores/car.js",
            template:"./modules/views/car.html",
            controller:"./modules/controllers/car.js",
            dependencies:[
                "./modules/services/car.js"
            ]
        },
    ]
}

let spa_enging = new SpaEngine(config);
window.spa_enging = spa_enging;
spa_enging.run($("#app"));
