class Geometry {

  dist(x,y) {
    if(x instanceof Geometry) {y = x.y; x = x.x};
    return Math.sqrt((this.x-x)**2+(this.y-y)**2);
  }

  move(x,y) {
    this.x = x;
    this.y = y;
  }

  rotate(deg) {
    this.deg = deg;
  }

  pivot(point, v) {
    let vec = SimVec.rotate(new SimVec(point.x, point.y, this.x, this.y), v);
    this.x = vec.x;
    this.y = vec.y;
  }

  resize(r, b) {
    this.r = r;
    this.b = b||this.b;
  }

  moveParallel(point, distance) {
    let deg = Math.atan2(point.x - this.x, point.y - this.y);
    this.move(distance*Math.sin(deg) + this.x, distance*Math.cos(deg) + this.y);
  }

  associative3() {
    return [
      new Point(this.x, this.y),
      new Point(this.x, this.y),
      new Point(this.x, this.y)
    ];
  }

  intersect(shape) {
    return new Point(null, null, 3)
  }
}

class Circle extends Geometry {

  constructor(x,y,r,b=1) {
    super();
    this.x = x;
    this.y = y;
    this.r = r;
    this.b = b;
    this.deg = 0;
  }

  draw(strokeStyle="#ff0000") {
    ctx.strokeStyle=strokeStyle;
    ctx.lineWidth=this.b+"";
    ctx.beginPath();
    ctx.ellipse(this.x,this.y,this.r,this.r,0,0,Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }

  associative3() {
    return [
      new Point(this.r*Math.cos(Math.PI*2)+this.x, this.r*Math.sin(Math.PI*2)+this.y),
      new Point(this.r*Math.cos(Math.PI*2*1/3)+this.x, this.r*Math.sin(Math.PI*2*1/3)+this.y),
      new Point(this.r*Math.cos(Math.PI*2*2/3)+this.x, this.r*Math.sin(Math.PI*2*2/3)+this.y),
    ];
  }

  intersect(shape) {
    if(shape instanceof Circle) { // Circle - Circle
      let d = [shape.x-this.x, shape.y-this.y], l = Math.hypot(...d);
      if (l > (this.r+shape.r)) return [];
      if (l < Math.abs(this.r-shape.r)) return [];
      else if (l == 0) return [Infinity];

      let a = ((this.r**2)-(shape.r**2)+(l**2))/(2*l**2),
        [p, h] = [[this.x+(a)*(shape.x-this.x), this.y+(a)*(shape.y-this.y)], Math.sqrt((this.r**2)-(a*l)**2)/l];

      return [new Point(p[0]-d[1]*h, p[1]+d[0]*h), new Point(p[0]+d[1]*h, p[1]-d[0]*h)];
    }
  }

  collide(x,y, mode=ENTIRE) {
    switch (mode) {
      case ENTIRE: return(x < (this.x + this.r) &&
                          x > (this.x - this.r) &&
                          y < (this.y + this.r) &&
                          y > (this.y - this.r));

      case INFILL: return(x < (this.x + this.r - this.b) &&
                          x > (this.x - this.r + this.b) &&
                          y < (this.y + this.r - this.b) &&
                          y > (this.y - this.r + this.b));

      case BORDER: return 0;
    }
  }

  inverse(shape) {
    let pc = new Point(this.x, this.y);
    let pe = new Point(this.x-shape.r, this.y-shape.r);
    pc.moveParallel(shape,  this.r**2 / (this.dist(shape)))
    let c = new Circle(pc.x, pc.y, this.r**2 / (this.dist(shape)))
    return c
  }
}

class Line extends Geometry {

  constructor(x,y,l,deg=0,b=1) {
    super();
    this.deg = deg;
    this.b = b >= 3 ? b : 3;
    this.r = 100;
    this.move(x,y);
  }

  draw(strokeStyle="#00ff00") {
    ctx.strokeStyle=strokeStyle;
    ctx.lineWidth=this.b+"";
    ctx.beginPath();
    ctx.moveTo(this.x - this.r*Math.cos(this.deg), this.y - this.r*Math.sin(this.deg));
    ctx.lineTo(this.x + this.r*Math.cos(this.deg), this.y + this.r*Math.sin(this.deg));
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle="#ff0000";
    ctx.beginPath();
    ctx.ellipse(this.x,this.y,3,3,0,0,Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }

  associative3() {
    return [
      new Point(this.x - this.r*Math.cos(this.deg), this.y - this.r*Math.sin(this.deg)),
      new Point(this.x, this.y),
      new Point(this.x + this.r*Math.cos(this.deg), this.y + this.r*Math.sin(this.deg))
    ];
  }

  intersect(shape) {
    if (shape instanceof Circle) {
      let d = new SimVec(this.x + this.r*Math.cos(this.deg), this.y + this.r*Math.sin(this.deg), this.x - this.r*Math.cos(this.deg), this.y - this.r*Math.sin(this.deg)),
          f = new SimVec(shape.x, shape.y, this.x - this.r*Math.cos(this.deg), this.y - this.r*Math.sin(this.deg)),
          a = SimVec.dotP(d,d),
          b = 2 * SimVec.dotP(f, d),
          c = SimVec.dotP(f, f) - shape.r**2,
          dis = b**2 - 4*a*c;

      if(dis < 0) return [-1];
      else {
        let t = [0];
        dis = Math.sqrt(dis);
        let sol = [
          (dis + b)/(2*a),
          (-dis + b)/(2*a),
        ];
        if (sol[0] >= 0 && sol[0] <= 1) t = sol[0];
        else if (sol[1] >= 0 && sol[1] <= 1) t = sol[1];
        else return t;
        return [
          new Point(this.ax + sol[0]*d.point.x, this.ay + sol[0]*d.point.y),
          new Point(this.ax + sol[1]*d.point.x, this.ay + sol[1]*d.point.y),
        ];
      }
    }
  }

  move(x,y) {
    super.move(x,y);
    this.ax = -this.l*Math.cos(this.deg)+this.x;
    this.ay = -this.l*Math.sin(this.deg)+this.y;
    this.bx =  this.l*Math.cos(this.deg)+this.x;
    this.by =  this.l*Math.sin(this.deg)+this.y;
  }

  collide(x,y,mode=ENTIRE,b=0) {
    switch (mode) {
      case INFILL: return 0;
      default: return ((y-this.y-(this.b+b)<Math.tan(this.deg)*(x-this.x)&&y-this.y+(this.b+b)>Math.tan(this.deg)*(x-this.x)));
    }
  }

}

class Point extends Geometry {

  constructor(x,y,b=3) {
    super();
    this.x = x;
    this.y = y;
    this.b = b;
    this.deg = 0;
  }

  draw() {
    ctx.strokeStyle="#0000ff";
    ctx.lineWidth=this.b+"";
    ctx.closePath();
    ctx.beginPath();
    ctx.ellipse(this.x,this.y,this.b,this.b,0,0,Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }

}
