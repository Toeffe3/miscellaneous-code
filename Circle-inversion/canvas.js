const ENTIRE = 0, INFILL = 1, BORDER = 2;
const [RED, GREEN, BLUE, YELLOW, PINK, AQUA] = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
]

// Setup
document.oncontextmenu = function() {return false}
const canvas = document.getElementById("canvas")
canvas.w=window.innerWidth;
canvas.h=window.innerHeight;
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const ctx = canvas.getContext("2d");


// Actual code
let cir1 = new Circle(100,100,50,3);
let cir2 = new Circle(200,150,50,3);
let line = new Line(400,400,0,5);

loop((data) => {

  ctx.clearRect(0,0,canvas.w,canvas.h);

  if(data.mouse.button==1 && cir1.collide(data.mouse.x, data.mouse.y, INFILL))
    cir1.move(data.mouse.x, data.mouse.y);
  else if(data.mouse.button==2 && cir1.collide(data.mouse.x, data.mouse.y, INFILL))
    cir1.resize(cir1.dist(data.mouse.x, data.mouse.y)+5);

  else if(data.mouse.button==1 && line.collide(data.mouse.x, data.mouse.y, ENTIRE, 20))
    line.move(data.mouse.x, data.mouse.y);
  else if(data.mouse.button==2 && line.collide(data.mouse.x, data.mouse.y, ENTIRE, 20)) {
    line.rotate(Math.atan((data.mouse.y+1-line.y)/((data.mouse.x+1-line.x)||1)));
  }

  cir1.draw(RED);
  cir2.draw(RED);
  line.draw(GREEN);

  cir2.intersect(cir1).forEach(i => {
    if(i instanceof Point) i.draw()
    if(i == Infinity) {
      cir2.draw(PINK);
      cir1.draw(PINK);
    }
  });

  line.intersect(cir1).forEach(i => {
    if(i instanceof Point) i.draw()
  });

  line.intersect(cir2).forEach(i => {
    if(i instanceof Point) i.draw()
  });

}, 60);
