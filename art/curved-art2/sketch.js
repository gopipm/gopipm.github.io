// Credits : https://openprocessing.org/sketch/1241191 : Combinaisons by Roni Kaufman



/***************************************************************************************
 * INITIALIZE CONFIG PARAMS
 ***************************************************************************************/
var config = config || null;

function initConfig() {

    if (config == null) {
        config = {};

        config.seed = Math.floor(Math.random() * 1000);
        config.grid_size = Math.floor(Math.random() * 12);
        config.diverseness = Math.floor(Math.random() * MAX_TILES);
        config.palette = Math.floor(Math.random() * (palettes.length - 1));
        config.flip_colors = Math.floor(Math.random() * (20)) % 2;
        config.line_only = Math.floor(Math.random() * (20)) % 2;
        config.line_thickness = Math.random() * 1;
    }

}




// You can pass a url to a config json file as input. Its not used in openprocessing playground
// But could be used with the exported sketch.
// usage: <host site path>/index.html?configURL=<path to the config url>
//
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
            config = data;

        })
        .catch(error => {
            console.error("Failed to fetch the JSON file:", error);
        });

}





/***************************************************************************************
 * ONETIME SETUP
 ***************************************************************************************/
var jsonURLInput;

function loadJSONData() {
    let url = jsonURLInput.value();
    console.log(url);
    loadJSON(url, dataLoaded);
    pixelDensity(2);
    imageMode(CENTER);

    textSize(20);
    fill(0, 255, 0);
}

function dataLoaded(data) {
    // This function is called when the JSON data is loaded
    jsonData = data;

    // Now you can use the jsonData object in your sketch
    //console.log(jsonData);

    // Example: Access specific properties
    config = data;
    // ...

    draw();
}




function setup() {
    /*
        jsonURLInput = createInput(" ");
        jsonURLInput.position(10 + 500, height + 10);

        let loadButton = createButton("Load JSON");
        loadButton.position(jsonURLInput.x + jsonURLInput.width, jsonURLInput.y);
        loadButton.mousePressed(loadJSONData);
    */
    initConfig();

    createCanvas(windowWidth, windowHeight);
    pixelDensity(2);
    imageMode(CENTER);

    textSize(20);
    fill(0, 255, 0);

}




/***************************************************************************************
 * EVENT HANDLERS
 * -- 'j' or 'J' keypress generates thumbnail, json file for config and markdown for website
 ***************************************************************************************/
function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

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


function captureAndSaveThumbnail(thumbnailParams) {
    let thumbnail = createImage(thumbnailParams.width, thumbnailParams.height);
    thumbnail.copy(get(thumbnailParams.x, thumbnailParams.y, thumbnailParams.width, thumbnailParams.height), 0, 0, thumbnailParams.width, thumbnailParams.height, 0, 0, thumbnailParams.width, thumbnailParams.height);
    thumbnail.save(thumbnailParams.filename);
}

function captureAndAddThumbnailToZip1(zip, thumbnailParams) {
    let thumbnail = createImage(thumbnailParams.width, thumbnailParams.height);
    thumbnail.copy(get(thumbnailParams.x, thumbnailParams.y, thumbnailParams.width, thumbnailParams.height), 0, 0, thumbnailParams.width, thumbnailParams.height, 0, 0, thumbnailParams.width, thumbnailParams.height);

    // Add the thumbnail to the zip file
    zip.createFile(thumbnailParams.filename).write(loadBytes(thumbnail.canvas.toDataURL()));
}


function addFileToZip(zip, filename, content, encoding = "text/plain") {
    // Add the file to the zip
    zip.file(filename, content, { base64: encoding === "base64" });
}

function captureAndAddThumbnailToZip(zip, thumbnailParams) {
    let thumbnail = createImage(thumbnailParams.width, thumbnailParams.height);
    thumbnail.copy(get(thumbnailParams.x, thumbnailParams.y, thumbnailParams.width, thumbnailParams.height), 0, 0, thumbnailParams.width, thumbnailParams.height, 0, 0, thumbnailParams.width, thumbnailParams.height);

    // Convert the thumbnail to a data URL and add it to the zip
    let thumbnailData = thumbnail.canvas.toDataURL("image/png").split(",")[1];
    addFileToZip(zip, thumbnailParams.filename, thumbnailData, "base64");
}

function addMarkdownToZip(mdFile, textToSave, JSONData) {

    // Write .md content directly to the .md file in the zip
    mdFile.write(textToSave + "\n\n");
    mdFile.write("~~~javascript");
    mdFile.write(JSONData);
    mdFile.write("~~~\n\n");
    mdFile.write("# [Combinaisons](https://openprocessing.org/sketch/2066485)\n");
    mdFile.write("## Credits : [https://openprocessing.org/sketch/1241191](https://openprocessing.org/sketch/1241191) : Combinaisons by Roni Kaufman\n");
}


function generateMarkdownContent() {
    // Generate and return the .md content
    let textToSave = convertJSONToText(config);
    let markdownContent = `${textToSave}\n\n~~~javascript\n${JSONData}\n~~~\n\n# [Combinaisons](https://openprocessing.org/sketch/2066485)\n## Credits : [https://openprocessing.org/sketch/1241191](https://openprocessing.org/sketch/1241191) : Combinaisons by Roni Kaufman\n`;
    return markdownContent;
}

function keyPressed() {
    if (key === 'j' || key === 'J') {

        // Create the timestamp
        let now = new Date();
        let timestamp = now.getFullYear() +
            '-' + nf(now.getMonth() + 1, 2) +
            '-' + nf(now.getDate(), 2) +
            '-' + nf(now.getHours(), 2) +
            '-' + nf(now.getMinutes(), 2) +
            '-' + nf(now.getSeconds(), 2) +
            '-' + generateRandomString(4); // Generate a random alphanumeric string of length 4


        config.image = "thumbnail-" + timestamp + ".png";
        config.type = "p5js";
        config.title = "Combinaisons";
        config.credits = "Credits : https://openprocessing.org/sketch/1241191 : Combinaisons by Roni Kaufman";





        // Convert the canvas data to JSON
        var JSONData = JSON.stringify(config, null, 2);


        // Create a unique filename for the sketch
        var filename = 'config-' + timestamp;

        // Save the JSON data to a file
        saveJSON(config, filename + ".json");


        let textToSave = convertJSONToText(config);

        let writer = createWriter(filename + ".md");
        writer.print(textToSave);
        writer.print("\n\n");
        writer.print("~~~javascript");
        writer.print(JSONData);
        writer.print("~~~");
        writer.print("\n\n");
        writer.print("# [Combinaisons](https://openprocessing.org/sketch/2066485)\n");
        writer.print("## Credits : [https://openprocessing.org/sketch/1241191](https://openprocessing.org/sketch/1241191) : Combinaisons by Roni Kaufman \n");
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
}

// Handle window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}




/***************************************************************************************
 * DRAW LOOP
 ***************************************************************************************/

let colors;
let tile;
let possibilities;
const MAX_TILES = 6;
const palettes = [
    ["#f5dc23", "#ed225d", "#1c1c1c"],
    ["#fe01ec", "#8a07da", "#102340"],
    ["#0d40bf", "#f4e361", "#f24679"],
    ["#ffffff", "#000000", "#ffe819"],
    ["#021d34", "#228fca", "#dcedf0"],
    ["#3cd86b", "#ebf7cd", "#0d150b"]
];

function printText(data) {
    var dy = -10;
    for (const key in data) {
        text(key + ": " + data[key], 20, dy);
        dy -= 20;
    }
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

    let realSize = floor(min(windowWidth, windowHeight));
    let xCorner = width / 2 - realSize / 2;
    let yCorner = height / 2 - realSize / 2;
    let s = floor(realSize / config.grid_size);
    let sw = map(config.line_thickness, 0, 1, 0, s / 15);

    translate(xCorner - 500, yCorner);

    background(colors[0]);
    //background(0);
    textSize(20);
    stroke(0);
    fill(0, 255, 0);
    //write my text
    //printText(config);



    tile = createGraphics(s, s);
    for (let i = 0; i < 2.2 * config.grid_size; i++) {
        for (let j = 0; j < config.grid_size; j++) {
            makeTile(i * s, j * s, s, sw);
        }
    }


    noLoop();

}







/***************************************************************************************
 * OTHER UTILITIES
 ***************************************************************************************/

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