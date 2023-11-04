import { initShapesAndRender } from "./Shapes.js";

function setupMenu(params, Canvas) {


    var menu = QuickSettings.create(0, 0, 'Settings Panel')

    menu.addRange("SVG Scale", 10, 200, params.psize, 10, function(v) {

        // Get the svg element using a selector, e.g., by class or ID
        const svgElement = document.querySelector('svg'); // Change the selector as needed

        // Set the new width and height values
        const newWidth = v + 'vmin'; // Change this to your desired width
        const newHeight = v + 'vmin'; // Change this to your desired height

        //console.log(newWidth);

        // Update the width and height using the style property
        svgElement.style.width = newWidth;
        svgElement.style.height = newHeight;

    })

    menu.addRange("Cell Size", 1, 102, params.cols, 2, function(v) {

        params.cols = v;
        params.rows = v;

        initShapesAndRender(params, Canvas);

    })

    menu.addColor("Circle Fill", "#FFD53D", function(v) {


        params["circle"]["fill"] = v;
        params["circle"]["stroke"] = v

        Canvas.renderGrid(params.shapes.getShapes(), params);
    });

    menu.addColor("Rect Fill", "#F25C54", function(v) {


        params["rect"]["fill"] = v;
        params["rect"]["stroke"] = v

        Canvas.renderGrid(params.shapes.getShapes(), params);
    });

    menu.addColor("Line Color", "#1D1934", function(v) {


        params["line"]["fill"] = v;
        params["line"]["stroke"] = v

        Canvas.renderGrid(params.shapes.getShapes(), params);
    });

    menu.addHTML("Key Map", "\
        <table style='\
                width: 100 % '>\
          <tr>\
            <th>Key</th>\
            <th>Action</th>\
          </tr>\
          <tr>\
            <td>' s '</td>\
            <td>Save/Download the SVG  </td>\
          </tr>\
          <tr>\
            <td>' m '</td>\
            <td>Hide/Show this panel  </td>\
          </tr>\
        </table>\
        ");


    menu.setKey('m');

}



export { setupMenu };