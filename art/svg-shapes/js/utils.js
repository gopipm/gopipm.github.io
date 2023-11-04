/***************************************************************************************
 * MarkdownGenerator  Class
 ***************************************************************************************/
class MarkdownGenerator {
    generateMarkdownContent(config, JSONData) {
        // Generate and return the .md content
        let textToSave = this.convertJSONToText(config);
        let markdownContent = `${textToSave}\n\n~~~javascript\n${JSONData}\n~~~\n\n# [Combinaisons](https://openprocessing.org/sketch/2066485)\n## Credits : [https://openprocessing.org/sketch/1241191](https://openprocessing.org/sketch/1241191) : Combinaisons by Roni Kaufman\n`;
        return markdownContent;
    }

    convertJSONToText(obj) {
        // Convert JSON object to text
        let text = "+++\n";
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                let value = obj[key];
                if (typeof value === 'string') {
                    text += key + ' = "' + value + '"\n';
                } else {
                    text += key + ' = ' + value + '\n';
                }
            }
        }
        text += "+++\n";
        return text;
    }
}



function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const str = generateRandomString(4);

    const timestamp = `${year}-${month}-${date}-${hours}-${minutes}-${seconds}-${str}`;
    return timestamp;
}

function saveSvgAndJsonToZip(svgContent, jsonString, markdownContent, zipFileName) {
    // Create a new instance of JSZip
    const zip = new JSZip();

    // Add the SVG content to the zip as a file
    zip.file(zipFileName + '.svg', svgContent);

    // Add the JSON content to the zip as a file
    zip.file(zipFileName + '.json', jsonString);

    // Add the Markdown content to the zip as a file
    zip.file(zipFileName + '.md', markdownContent);


    // Generate the zip file
    zip.generateAsync({ type: 'blob' }).then(function(content) {
        // Create a download link for the zip file
        const link = document.createElement('a');
        link.download = zipFileName + '.zip'; // Specify the zip file name
        link.href = URL.createObjectURL(content);
        link.click();
    });
}

function handleSave(Canvas, params) {

    // Create the timestamp
    let timestamp = generateTimestamp();

    // Create a unique filename for the sketch
    const zipFileName = 'config-' + timestamp;


    // Create a data URL for the SVG content
    const svgContent = new XMLSerializer().serializeToString(Canvas.svg.node);


    const markdownGenerator = new MarkdownGenerator();

    // Convert the JSON object to a JSON string
    const jsonString = JSON.stringify(params, null, 2);

    let markdownContent = markdownGenerator.convertJSONToText(params);

    markdownContent = markdownContent + "\n\n~~~javascript" + jsonString + "~~~" + "\n\n";


    // Call the function to save the SVG and JSON to a zip file
    saveSvgAndJsonToZip(svgContent, jsonString, markdownContent, zipFileName);

}