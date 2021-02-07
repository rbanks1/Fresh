// FRESH. Copyright 2012. Richard Banks
// Good general P5JS 3D reference
// https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5
// Example from Creative Coding of noise+3D landscape
// https://editor.p5js.org/generative-design/sketches/M_1_4_01

var xoff = 0.0;
var cam;
var numberOfTulipsOnEachSide = 1;
var numberOfTulipsOnEachSideMin = 1;
var numberOfTulipsOnEachSideMax = 8;
var numberOfTulipsOnEachSideStep = 1;

var tulipGap = 300;
var tulipGapMin = 200;
var tulipGapMax = 1000;
var tulipGapStep = 10;

var planeSize;
var gui;

var myFont;


function preload() {
  myFont = loadFont('assets/segoeui.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cursor(CROSS);
  noiseDetail(1, 0.2);

  gui = createGui("Settings").setPosition(10, 140);
  gui.addGlobals(
    "numberOfTulipsOnEachSide",
    "tulipGap"
  );
  gui.hide();
  guiVisible = false;

}

function draw() {
  background(color("lightblue"));
  ambientLight(200);
  directionalLight(250, 250, 250, height / 2, width / 2, -250);
  camera(mouseX*3, -1500, mouseX*3, 0, -1000, 0, 0, 1, 0);

  drawInstructions();

  xoff = xoff + 0.1;
  let n = noise(xoff) * 10;

  // Draw base plane
  push();
  rotateX((2 * PI) / 4);
  fill(color("white"));
  noStroke();
  planeSize = (numberOfTulipsOnEachSide-1) * tulipGap + (tulipGap*2);
  plane(planeSize, planeSize);
  pop();

  push();
  var tulipOffset = ((numberOfTulipsOnEachSide-1)*tulipGap)/2
  translate(-tulipOffset, 0, -tulipOffset);
  for (let i = 0; i < numberOfTulipsOnEachSide; i++) {
    for (let j = 0; j < numberOfTulipsOnEachSide; j++) {
      push();
      translate(i * tulipGap, 0, j*tulipGap)
      drawTulip(n);
      pop();
    }
  }
  pop();
}

function drawTulip(n){
    // Draw Stem
    stroke(color("green"));
    strokeWeight(25);
    line(0, 0, 0, 0, -310, 50);
    line(0, -300, 50, 50, -710, 100);
    line(50, -700, 100, 0 + n, -1010, 0 + n);
  
    // Draw leaf 1
    push();
    translate(0,-300,50);
    scale(.5, 2, .5);
    noStroke();
    fill(color("green"));
    drawPetal();
    pop();
  
    push();
    // Draw red petals
    translate(0 + n, -1000, 0 + n);
    fill(color("red"));
    noStroke();
    for (let i = 0; i < 4; i++) {
      drawPetal();
      rotateY((2 * PI) / 4);
    }
  
    // Draw yellow petals
    scale(0.6);
    translate(0, -120, 0);
    fill(color("yellow"));
    for (let i = 0; i < 4; i++) {
      drawPetal();
      rotateY((2 * PI) / 4);
    }

        // Draw white petals
        scale(0.4);
        translate(0, -120, 0);
        fill(color("white"));
        for (let i = 0; i < 4; i++) {
          drawPetal();
          rotateY((2 * PI) / 4);
        }
  
    pop();
}

function drawPetal(){
  beginShape(TRIANGLE_STRIP);
  vertex(0, 0, 0); // Bottom
  vertex(0, -100, 150); // Middle
  vertex(100, -100, 100); // Right
  vertex(100, -200, 100); //Right Up
  vertex(0, -300, 100); // Top
  vertex(0, -100, 150); // Middle
  vertex(-100, -200, 80); // Left Up
  vertex(-100, -100, 80); // Left
  vertex(0, -100, 150); // Middle
  vertex(0, 0, 00); // Bottom
  endShape();
}

function keyReleased() {

  if (keyCode == 187) { // '+'
    numberOfTulipsOnEachSide+=numberOfTulipsOnEachSideStep;
    if (numberOfTulipsOnEachSide > numberOfTulipsOnEachSideMax) numberOfTulipsOnEachSide = numberOfTulipsOnEachSideMax;
    gui.prototype.setValue("numberOfTulipsOnEachSide", numberOfTulipsOnEachSide);
  }
  if (keyCode == 189) { // '-'
    numberOfTulipsOnEachSide-=numberOfTulipsOnEachSideStep;
    if (numberOfTulipsOnEachSide < numberOfTulipsOnEachSideMin) numberOfTulipsOnEachSide = numberOfTulipsOnEachSideMin;
    gui.prototype.setValue("numberOfTulipsOnEachSide", numberOfTulipsOnEachSide);
  }
  if (keyCode == 221){
    tulipGap += tulipGapStep;
    if (tulipGap > tulipGapMax) tulipGap = tulipGapMax;
    gui.prototype.setValue("tulipGap", tulipGap);
  }
  if (keyCode == 219){
    tulipGap -= tulipGapStep;
    if (tulipGap < tulipGapMin) tulipGap = tulipGapMin;
    gui.prototype.setValue("tulipGap", tulipGap);
  }
  if (key == "s" || key == "S") saveCanvas("Tulip", "png");
  if (key == "g" || key == "G") {
    if (guiVisible) {
      gui.hide();
      guiVisible = false;
    } else {
      gui.show();
      guiVisible = true;
    }
  }
}

// ** UTILITY **
//----------------------------

// Write the instructions in the top-left of the page
function drawInstructions(){
  push();
  fill(50);
  noStroke();
  textFont(myFont);
  textSize(18);
  textAlign(RIGHT, TOP);
  var textX = (numberOfTulipsOnEachSide-1) * tulipGap + (tulipGap*2);
  rotateY((2*PI)/5);
  text("+|-: Add/Remove Tulips", -textX, -1140);
  text("[ ]: Increase/Decrease Spacing", -textX, -1120);
  text("S: Save Canvas", -textX, -1100);
  text("G: Show/Hide Settings", -textX, -1080);
  pop();
}
