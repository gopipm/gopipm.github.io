import { SVG } from "./svgjs.js";

class SVGRender {
    constructor(width, height, element) {
        this.width = width;
        this.height = height;
        this.svg = SVG().viewbox(0, 0, width, height).addTo(element);
    }

    renderShape(shape, params = {}) {
        var { type, x, y, w, h, stroke, fill, scale, cols, rows } = shape;

        if (type in params) {

            stroke = params[type].stroke;
            fill = params[type].fill;

            //console.log(stroke, fill);
        }



        switch (type) {
            case "rect":
                this.svg
                    .rect(w, h)
                    .x(x)
                    .y(y)
                    .stroke(stroke)
                    .fill(fill)
                    .scale(scale);
                break;
            case "line":
                this.svg
                    .line(x, y, x + w, y + h)
                    .stroke(stroke)
                    .scale(scale);
                break;
            case "circle":
                this.svg
                    .circle(w, h)
                    .x(x)
                    .y(y)
                    .stroke(stroke)
                    .fill(fill)
                    .scale(scale);
                break;
            case "world":
                console.log("World Parameters : ", shape);
                break;
            default:
                console.log("Unknown shape type", shape);
        }
    }

    renderGrid(shapes, params = {}) {
        for (const shape of shapes) {
            this.renderShape(shape, params);
        }
    }


}


export { SVGRender };