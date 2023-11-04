class Shapes {
    constructor(width, height, cols, rows) {
        this.shapes = [];
        this.shapes.push({ type: "world", x: 0, y: 0, w: width, h: height, cols: cols, rows: rows });

        this.width = width;
        this.height = height;
        this.cols = cols;
        this.rows = rows;
        this.colSize = width / cols;
        this.rowSize = height / rows;

    }



    addShape(shape) {
        this.shapes.push(shape);
    }

    getShapes() {
        return (this.shapes);
    }


    createRandomGridShapes(params = {
        rect: { fill: "#F25C54", stroke: "#F25C54" },
        line: { fill: "#1D1934", stroke: "#1D1934" },
        circle: { fill: "#FFD53D", stroke: "#1D1934" }
    }) {

        for (let x = 0; x < this.width; x += this.colSize) {
            for (let y = 0; y < this.height; y += this.rowSize) {
                const choice = Math.floor(Math.random() * 6 + 1);
                var shape = {};

                switch (choice) {
                    case 1:
                        shape = { type: "rect", x: x, y: y, w: this.colSize, h: this.rowSize, fill: params.rect.fill, stroke: params.rect.stroke, scale: 0.75 };
                        break;
                    case 2:
                        shape = { type: "line", x: x, y: y, w: this.colSize, h: this.rowSize, fill: params.line.fill, stroke: params.line.stroke, scale: 0.75 };
                        break;
                    case 3:
                        shape = { type: "circle", x: x, y: y, w: this.colSize, h: this.rowSize, fill: params.circle.fill, stroke: params.circle.stroke, scale: 0.75 };
                        break;
                }

                if (Object.keys(shape).length > 0) { this.shapes.push(shape); }
            }
        }
    }

}

/***************************************************************************************
 * initialize shape structures as json object
 ***************************************************************************************/
function initShapesAndRender(params, Canvas) {
    // Get the SVG element
    const svgElement = document.querySelector('svg'); // Replace with your selector

    // Remove all child elements
    while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
    }

    params.shapes = new Shapes(params.width, params.height, params.cols, params.rows);
    params.shapes.createRandomGridShapes();
    Canvas.renderGrid(params.shapes.getShapes(), params);

}

export { Shapes, initShapesAndRender };