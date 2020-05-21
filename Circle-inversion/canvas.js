const ENTIRE = 0, INFILL = 1, BORDER = 2;

// Setup
document.oncontextmenu = function() {return false}
const c = document.getElementById("canvas")
c.w=window.innerWidth;
c.h=window.innerHeight;
c.width=window.innerWidth;
c.height=window.innerHeight;
const ctx = c.getContext("2d");


// Actual code
let cir1 = new Circle(100,100,50,3);
let cir2 = new Circle(200,150,50,3);
let line = new Line(400,400,0,5);

loop((data) => {

  ctx.clearRect(0,0,c.w,c.h);

  if(data.mouse.button==1 && cir1.collide(data.mouse.x, data.mouse.y, INFILL))
    cir1.move(data.mouse.x, data.mouse.y);
  else if(data.mouse.button==2 && cir1.collide(data.mouse.x, data.mouse.y, INFILL))
    cir1.resize(cir1.dist(data.mouse.x, data.mouse.y)+5);

  else if(data.mouse.button==1 && line.collide(data.mouse.x, data.mouse.y, ENTIRE, 20))
    line.move(data.mouse.x, data.mouse.y);
  else if(data.mouse.button==2 && line.collide(data.mouse.x, data.mouse.y, ENTIRE, 20)) {
    line.rotate(Math.atan((data.mouse.y+1-line.y)/((data.mouse.x+1-line.x)||1)));
  }

  cir1.draw();
  cir2.draw();
  line.draw();

  cir2.intersect(cir1).forEach(i => i.draw())
  line.intersect(cir1).forEach(i => {
    if(i instanceof Point) i.draw()
  });
  line.intersect(cir2).forEach(i => {
    if(i instanceof Point) i.draw()
  });

}, 60);
