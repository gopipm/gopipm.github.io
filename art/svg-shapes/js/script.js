import { SVGRender } from "./SVGRender.js";
import { Shapes, initShapesAndRender } from "./Shapes.js";
import { setupMenu } from "./settings.js";

var Canvas;
const size = Math.max(window.innerWidth, window.innerHeight);


/***************************************************************************************
 * Key parameters for the app
 ***************************************************************************************/
var params = {
    "size": size,
    "psize": 100,
    "width": size,
    "height": size,
    "cols": 10,
    "rows": 10,
    "circle": { "fill": "#FFD53D", "stroke": "#FFD53D" },
    "line": { "fill": "#1D1934", "stroke": "#1D1934" },
    "rect": { "fill": "#F25C54", "stroke": "#F25C54" },
    "shapes": {},
    "credits": "Copyright (c) 2023 George Francis (https://codepen.io/georgedoescode/pen/NWjqbZj),\n \
                 Other packages used: Quicksettings (https://github.com/bit101/quicksettings),\n \
                 JSZIP : (https://stuk.github.io/jszip/)"
};


/***************************************************************************************
 * Handle key events. 's' : to save/download svg, json, md files as zip
 ***************************************************************************************/
function handleKeyDown(event) {
    if (event.key === "s") {
        handleSave(Canvas, params);
    }
}


/***************************************************************************************
 * main function
 ***************************************************************************************/
function main() {

    Canvas = new SVGRender(params.width, params.height, "body");

    setupMenu(params, Canvas);

    initShapesAndRender(params, Canvas);

    // Add the event listener to the constructor
    document.addEventListener("keydown", (event) => handleKeyDown(event));
}


main();