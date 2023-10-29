// Combinaisons
// Roni Kaufman, August 2021

var tt = 20
var fr = 0
const MAX_TILES = 6;
const palettes = [
    ["#f5dc23", "#ed225d", "#1c1c1c"],
    ["#fe01ec", "#8a07da", "#102340"],
    ["#0d40bf", "#f4e361", "#f24679"],
    ["#ffffff", "#000000", "#ffe819"],
    ["#021d34", "#228fca", "#dcedf0"],
    ["#3cd86b", "#ebf7cd", "#0d150b"]
];

/** OPC START **/
/*
OPC.slider('seed', Math.floor(Math.random()*1000), 0, 1000, 1);
OPC.slider('grid_size', 8, 4, 12, 1);
OPC.slider('diverseness', 3, 1, MAX_TILES, 1);
OPC.slider('palette', 0, 0, palettes.length-1, 1);
OPC.slider('flip_colors', 0, 0, 1, 1);
OPC.slider('line_only', 0, 0, 1, 1);
OPC.slider('line_thickness', 0.5, 0, 1, 0.25);
*/
/** OPC END**/

let config = null;

/*
// Function to parse the URL query parameters
function getQueryParam(name) {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Fetch and process the JSON configuration file
const configURL = getQueryParam("configURL");
//console.log(configURL);

if (configURL) {

    fetch(configURL)
        .then(response => response.json())
        .then(data => {
            // You can now use the 'data' object in your script
            console.log(data);
            // For example, access specific properties:
            config = data;
            // ...
        })
        .catch(error => {
            //console.error("Failed to fetch the JSON file:", error);
            config = {};

            config.seed = Math.floor(Math.random() * 1000);
            config.grid_size = Math.floor(Math.random() * 12);
            config.diverseness = Math.floor(Math.random() * MAX_TILES);
            config.palette = Math.floor(Math.random() * (palettes.length - 1));
            config.flip_colors = Math.floor(Math.random() * (20)) % 2;
            config.line_only = Math.floor(Math.random() * (20)) % 2;
            config.line_thickness = Math.random() * 1;
        });

}
*/

config = {};

config.seed = Math.floor(Math.random() * 1000);
config.grid_size = Math.floor(Math.random() * 12);
config.diverseness = Math.floor(Math.random() * MAX_TILES);
config.palette = Math.floor(Math.random() * (palettes.length - 1));
config.flip_colors = Math.floor(Math.random() * (20)) % 2;
config.line_only = Math.floor(Math.random() * (20)) % 2;
config.line_thickness = Math.random() * 1;


function loadJSONData() {
  let url = jsonURLInput.value();
	console.log(url);
  loadJSON(url, dataLoaded);
	pixelDensity(2);
  imageMode(CENTER);

  textSize(20);
  fill(0, 255, 0);
	
	draw();
}

function dataLoaded(data) {
  // This function is called when the JSON data is loaded
  jsonData = data;

  // Now you can use the jsonData object in your sketch
  //console.log(jsonData);

  // Example: Access specific properties
  config = data;
  // ...
}


/*
config = {
  "seed": 939,
  "grid_size": 11,
  "diverseness": 1,
  "palette": 2,
  "flip_colors": 1,
  "line_only": 0,
  "line_thickness": 0.7485147438328434
}
*/

/*
config = {
  "seed": 900,
  "grid_size": 11,
  "diverseness": 5,
  "palette": 0,
  "flip_colors": 0,
  "line_only": 0,
  "line_thickness": 0.7871023595097837
}
*/


// Function to convert JSON object to text
function convertJSONToText(obj) {
  let text = "+++\n";

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];
      if (typeof value === 'string') {
        // If the value is a string, enclose it in double quotes
        text += key + ' = "' + value + '"\n';
      } else {
        text += key + ' = ' + value + '\n';
      }
    }
  }

  text += "+++\n";
  return text;
}


function keyPressed() {
    if (key === 'j' || key === 'J') {
        // Convert the canvas data to JSON
        var JSONData = JSON.stringify(config);

        // Create the timestamp
        let now = new Date();
        let timestamp = now.getFullYear() +
            '-' + nf(now.getMonth() + 1, 2) +
            '-' + nf(now.getDate(), 2) +
            '-' + nf(now.getHours(), 2) +
            '-' + nf(now.getMinutes(), 2) +
            '-' + nf(now.getSeconds(), 2) +
            '-' + generateRandomString(4); // Generate a random alphanumeric string of length 4


        // Create a unique filename for the sketch
        var filename = 'config-' + timestamp;

        // Save the JSON data to a file
        saveJSON(config, filename + ".json");
			
			  config.image = "thumbnail-"+timestamp+".png";
        config.type = "p5js";
			
			  let textToSave = convertJSONToText(config);
			
			  let writer = createWriter(filename + ".md");
        writer.print(textToSave);
        writer.close();

        var size = 700;

        captureAndSaveThumbnail({
            "filename": "thumbnail-" + timestamp + ".png",
            "x": windowWidth / 2 - size / 2, // X-coordinate of the bounding box
            "y": windowHeight / 2 - size / 2, // Y-coordinate of the bounding box
            "width": size, // Width of the bounding box
            "height": size, // Height of the bounding box
        });
    }

    if (key === 's' || key === 'S') {

        // Create the timestamp
        let now = new Date();
        let timestamp = now.getFullYear() +
            '-' + nf(now.getMonth() + 1, 2) +
            '-' + nf(now.getDate(), 2) +
            '-' + nf(now.getHours(), 2) +
            '-' + nf(now.getMinutes(), 2) +
            '-' + nf(now.getSeconds(), 2) +
            '-' + generateRandomString(4); // Generate a random alphanumeric string of length 4

        var size = 700;

        captureAndSaveThumbnail({
            "filename": "thumbnail-" + timestamp + ".png",
            "x": windowWidth / 2 - size / 2, // X-coordinate of the bounding box
            "y": windowHeight / 2 - size / 2, // Y-coordinate of the bounding box
            "width": size, // Width of the bounding box
            "height": size, // Height of the bounding box
        });
    }
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function captureAndSaveThumbnail(thumbnailParams) {
    let thumbnail = createImage(thumbnailParams.width, thumbnailParams.height);
    thumbnail.copy(get(thumbnailParams.x, thumbnailParams.y, thumbnailParams.width, thumbnailParams.height), 0, 0, thumbnailParams.width, thumbnailParams.height, 0, 0, thumbnailParams.width, thumbnailParams.height);
    thumbnail.save(thumbnailParams.filename);
}

let colors;
let tile;
let possibilities;

function setup() {
	  jsonURLInput = createInput(" ");
    jsonURLInput.position(10+500, height + 10);

    let loadButton = createButton("Load JSON");
    loadButton.position(jsonURLInput.x + jsonURLInput.width, jsonURLInput.y);
    loadButton.mousePressed(loadJSONData);
	
    createCanvas(windowWidth, windowHeight);
    pixelDensity(2);
    imageMode(CENTER);

    textSize(20);
    fill(0, 255, 0);

}

function draw() {


    randomSeed(config.seed);

    colors = palettes[config.palette];
    if (config.flip_colors == 1) {
        colors = [colors[1], colors[0], colors[2]];
    }
    if (config.line_only == 1) {
        colors = [colors[0], colors[0], colors[2]];
        if (config.line_thickness == 0) {
            colors = [colors[0], colors[2], colors[2]];
        }
    }

    possibilities = [];
    for (let k = 0; k < MAX_TILES; k++) {
        possibilities.push(k);
    }
    for (let k = config.diverseness; k < MAX_TILES; k++) {
        possibilities.splice(floor(random(possibilities.length)), 1);
    }

    let realSize = floor(min(windowWidth, windowHeight) * 0.8);
    let xCorner = width / 2 - realSize / 2;
    let yCorner = height / 2 - realSize / 2 + 50;
    let s = floor(realSize / config.grid_size);
    let sw = map(config.line_thickness, 0, 1, 0, s / 15);

    translate(xCorner - 500, yCorner);

    //background(colors[0]);
    background(0);
    textSize(20);
    stroke(0);
    fill(0, 255, 0);
    //write my text
    printText(config);


    //fill(colors[1]);
    /*
    fill(0);
    strokeWeight(sw);
    stroke(colors[2]);
    for (let i = 0; i < config.grid_size; i++) {
        circle(i*s+3*s/10, 0, s/5);
        circle(i*s+3*s/10, config.grid_size*s, s/5);
        circle(i*s+7*s/10, 0, s/5);
        circle(i*s+7*s/10, config.grid_size*s, s/5);
        circle(0, i*s+3*s/10, s/5);
        circle(config.grid_size*s, i*s+3*s/10, s/5);
        circle(0, i*s+7*s/10, s/5);
        circle(config.grid_size*s, i*s+7*s/10, s/5);
    }
    */

    tile = createGraphics(s, s);
    for (let i = 0; i < 2.2 * config.grid_size; i++) {
        for (let j = 0; j < config.grid_size; j++) {
            makeTile(i * s, j * s, s, sw);
        }
    }

    /*
        if(tt > 20) {
        fr = round(frameRate())
        tt = 0
    }else{
        tt += 1
    }
        text(fr, 5, 5)
        */

	 noLoop();

}

function printText(data) {
    var dy = -10;
    for (const key in data) {
        text(key + ": " + data[key], 20, dy);
        dy -= 20;
    }
}

function makeTile(x, y, s, sw) {
    push();
    translate(x + s / 2, y + s / 2);
    rotate(random([0, PI / 2, PI, 3 * PI / 2]));

    let r = random(possibilities);
    tile.stroke(colors[2]);
    tile.strokeWeight(sw);
    let u = s / 5;
    switch (r) {
        case 0:
            tile.background(colors[0]);
            tile.fill(colors[1]);
            tile.circle(0, 0, 4 * u);
            tile.circle(s, 0, 4 * u);
            tile.circle(0, s, 4 * u);
            tile.circle(s, s, 4 * u);
            tile.circle(s / 2, s / 2, 2 * u);
            tile.fill(colors[0]);
            tile.circle(0, 0, 2 * u);
            tile.circle(s, 0, 2 * u);
            tile.circle(0, s, 2 * u);
            tile.circle(s, s, 2 * u);
            break;
        case 1:
            tile.background(colors[1]);
            tile.fill(colors[0]);
            tile.circle(0, 0, 6 * u);
            tile.circle(s, 0, 2 * u);
            tile.circle(0, s, 2 * u);
            tile.circle(s, s, 6 * u);
            tile.fill(colors[1]);
            tile.circle(s, s, 4 * u);
            tile.circle(0, 0, 4 * u);
            tile.fill(colors[0]);
            tile.circle(0, 0, 2 * u);
            tile.circle(s, s, 2 * u);
            break;
        case 2:
            tile.background(colors[0]);
            tile.fill(colors[1]);
            tile.circle(0, 0, 8 * u);
            tile.circle(s, 3 / 2 * u, u);
            tile.circle(3 / 2 * u, s, u);
            tile.fill(colors[0]);
            tile.circle(0, 0, 6 * u);
            tile.fill(colors[1]);
            tile.circle(0, 0, 4 * u);
            tile.circle(s, s, 4 * u);
            tile.fill(colors[0]);
            tile.circle(0, 0, 2 * u);
            tile.circle(s, s, 2 * u);
            break;
        case 3:
            tile.background(colors[0]);
            tile.fill(colors[1]);
            tile.circle(s / 2, 0, 3 * u);
            tile.circle(s, s / 2, 3 * u);
            tile.circle(s / 2, s, 3 * u);
            tile.circle(0, s / 2, 3 * u);
            tile.fill(colors[0]);
            tile.circle(s / 2, 0, u);
            tile.circle(s, s / 2, u);
            tile.circle(s / 2, s, u);
            tile.circle(0, s / 2, u);
            break;
        case 4:
            tile.background(colors[1]);
            tile.fill(colors[0]);
            tile.circle(0, 0, 2 * u);
            tile.circle(s / 2, 0, u);
            tile.circle(s, 0, 2 * u);
            tile.circle(0, s, 2 * u);
            tile.circle(s / 2, s, u);
            tile.circle(s, s, 2 * u);
            tile.rect(-sw, 2 * u, s + 2 * sw, u);
            break;
        case 5:
            tile.background(colors[0]);
            tile.fill(colors[1]);
            tile.circle(0, 0, 4 * u);
            tile.circle(0, s, 4 * u);
            tile.circle(s, s, 4 * u);
            tile.circle(7 / 2 * u, 0, u);
            tile.circle(s, 3 / 2 * u, u);
            tile.circle(s / 2, s / 2, 2 * u);
            tile.fill(colors[0]);
            tile.circle(0, 0, 2 * u);
            tile.circle(0, s, 2 * u);
            tile.circle(s, s, 2 * u);
            break;
    }
    image(tile, 0, 0);

    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}