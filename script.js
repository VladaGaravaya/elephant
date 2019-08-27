/*This application reads the input file by lines and draws the specified shapes. By the first letters 
of the line, we determine which figure it is.
The fill goes from the given coordinates to eight sides until it meets the x sign using recursion.*/

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
    let arg = line.split(' ');
    switch(arg[0]) {
        case 'C':
            console.log("Draw canvas...");
            createCanvas(arg);
            break;
        case 'L':
            if(CANVAS.length != 0) {
                console.log("Draw line...");
                addFig(arg);
            } else {
                console.log("Please, create canvas.");
            }
            break;
        case 'R':
            if(CANVAS.length != 0) {
                console.log("Draw rectangle...");
                addFig(arg);
            } else {
                console.log("Please, create canvas.");
            }
            break;
        case 'B':
            if(CANVAS.length != 0) {
                console.log("Bucket Fill.");
                bucketFill(arg);
            } else {
                console.log("Please, create canvas.");
            }
            break;
        default:
            console.log( "Next example.");
    }
});

let CANVAS = [];
let BAR;
let CHOOSEDCHAR;
let LINES;
let COLUMNS;

function createCanvas(arg) {
    COLUMNS = +arg[1];
    LINES = +arg[2];
    BAR = "";

    for( let i = 0; i < COLUMNS + 2; i++) {
        BAR+= "-";
    }

    for( let i = 0; i < LINES; i++) {
        CANVAS[i] = [];
        for( let j = 0; j < COLUMNS; j++) {
            CANVAS[i][j] = " ";
        }
    }
    
    console.log("Finish.");
    outputCanvas();
}

function outputCanvas() {
    const fs = require("fs");
    fs.appendFileSync("output.txt", BAR + "\n");
    for( let i = 0; i < LINES; i++) {
        fs.appendFileSync("output.txt", "|" + CANVAS[i].join("") + "|" + "\n");
    }
    fs.appendFileSync("output.txt", BAR + "\n");
}

function addFig(arg) {

    let x0 = +arg[1];
    let y0 = +arg[2];
    let x1 = +arg[3];
    let y1 = +arg[4];
    
    if(CANVAS[y0 - 1][x0 - 1]) {
        for( let i = y0 - 1; i < y1; i++) {
            for( let j = x0 - 1; j < x1; j++) {
                if(i > y0 - 1 && i < y1 - 1 && j > x0 - 1 && j < x1 - 1) {
                    continue;
                }
                else CANVAS[i][j] = "x";
            }
        }
        console.log("Finish.");
        outputCanvas();
    } else {
        console.log("Please, input correct coordinates.");
    }
}

function bucketFill(arg) {
    let x0 = arg[1] - 1;
    let y0 = arg[2] - 1;
    let color = arg[3];
    CHOOSEDCHAR = CANVAS[y0][x0];
    moveTo(x0, y0, color);
    outputCanvas();
}

function moveTo(x0, y0, color) {
    if(x0 < COLUMNS && x0 >= 0 && y0 < LINES && y0 >= 0) {
        if(CANVAS[y0][x0] == CHOOSEDCHAR) {
            CANVAS[y0][x0] = color;
            moveTo(x0 - 1, y0 - 1, color);
            moveTo(x0, y0 - 1, color);
            moveTo(x0 + 1, y0 - 1, color);
            moveTo(x0 - 1, y0, color);
            moveTo(x0 + 1, y0, color);
            moveTo(x0 - 1, y0 + 1, color);
            moveTo(x0, y0 + 1, color);
            moveTo(x0 + 1, y0 + 1, color);
        }
    }
}