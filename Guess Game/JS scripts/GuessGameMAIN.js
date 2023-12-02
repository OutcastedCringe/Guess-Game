import MediaSelection from "/Sbuttons.js"
import { GamePlayer } from "./Sbuttons.js";
import "verify.js"

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete"){
        initApp();
    }
})

const initApp = () => {


    selector();
}


