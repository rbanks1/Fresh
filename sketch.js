// FRESH. Copyright 2012. Richard Banks

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

  xoff = xoff + 0.1;
  let n = noise(xoff) * 10;

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

function mousePressed() {}

function keyReleased() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
  if (key == " ") noiseSeed(floor(random(100000)));
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
