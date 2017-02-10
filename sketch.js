// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
var capture;
var tracker
var w = 640, h = 480;
var slider1;
var slider2;
var checkbox;
var grayscale;

function setup() {
  checkbox = createCheckbox('Gray Scale', false);
  checkbox.changed(myCheckedEvent);
  slider1 = createSlider(50, 300, 150);
  slider1.position(20, 520);
  slider2 = createSlider(0, 255, 255);
  slider2.position(20, 550);
  capture = createCapture(VIDEO);
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();
  colorMode(HSB);
  // loadPixels();
  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(capture.elt);
    
}

function draw() {
var circleradius = slider1.value();
var bcolor = slider2.value();
  image(capture, 0, 0, w, h);
  loadPixels();
  var positions = tracker.getCurrentPosition();

  // noFill();
  // stroke(255);
  // beginShape();
  // for (var i=0; i<positions.length; i++) {
  //   vertex(positions[i][0], positions[i][1]);
  // }
  // endShape();

  // noStroke();
  // for (var i=0; i<positions.length; i++) {
  //   fill(map(i, 0, positions.length, 0, 360), 50, 100);
  //   ellipse(positions[i][0], positions[i][1], 4, 4);
  //   text(i, positions[i][0], positions[i][1]);
  // }
  
  if(positions.length > 0) {
    // var mouthLeft = createVector(positions[44][0], positions[44][1]);
    // var mouthRight = createVector(positions[50][0], positions[50][1]);
    // var smile = mouthLeft.dist(mouthRight);
    // console.log(true);
    for (var z = 0; z < width*height*4; z += 4) {
    // // console.log("truez");
      if (dist(positions[41][0], positions[41][1], getpixelcoordx(z), getpixelcoordy(z)) > circleradius) {
      if (grayscale == 1) {
    var   pixcolor = (pixels[z] + pixels[z + 1] + pixels[z + 2]) / 3;
      pixels[z] = (pixcolor);
      pixels[z + 1] = (pixcolor);
      pixels[z + 2] = (pixcolor);
      }
      else {
         pixels[z] = (bcolor);
      pixels[z + 1] = (bcolor);
      pixels[z + 2] = (bcolor);
      }
      }
    }
    // rect(20, 20, smile * 3, 20);
  }
  updatePixels();
}
function getpixelcoordx(pixelplace) {
  if (pixelplace / 4 > w) {
    pixelplace = (pixelplace / 4 % w) * 4;
  }
  return pixelplace / 4;

}

function getpixelcoordy(pixelplace) {
  return floor((pixelplace / 4) / w);
}
function myCheckedEvent() {
  if (this.checked()) {
    grayscale = 1;
  } else {
    grayscale = 0;
  }
}