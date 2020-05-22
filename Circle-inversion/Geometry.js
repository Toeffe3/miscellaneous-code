class Geometry {

  dist(x,y) {
    return Math.sqrt((this.x-x)**2+(this.y-y)**2);
  }

  move(x,y) {
    this.x = x;
    this.y = y;
  }

  intersect(shape) {

    if(this.constructor == shape.constructor) {
      if(this instanceof Circle) {  // Circle - Circle
        let d = [shape.x-this.x, shape.y-this.y], l = Math.hypot(...d);
        if (l > (this.r+shape.r)) return [];
        if (l < Math.abs(this.r-shape.r)) return [];
        else if (l == 0) return [Infinity];

        let a = ((this.r**2)-(shape.r**2)+(l**2))/(2*l**2),
            [p, h] = [[this.x+(a)*(shape.x-this.x), this.y+(a)*(shape.y-this.y)], Math.sqrt((this.r**2)-(a*l)**2)/l];

        return [new Point(p[0]-d[1]*h, p[1]+d[0]*h), new Point(p[0]+d[1]*h, p[1]-d[0]*h)];

      } else if(this instanceof Line) { // Line - Line
        return 0;
      }
    } else if (this instanceof Line && shape instanceof Circle) {
      let d = new SimVec(this.bx, this.by, this.ax, this.ay),
          f = new SimVec(shape.x, shape.y, this.ax, this.ay),
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
}

class Circle extends Geometry {

  constructor(x,y,r,b=1) {
    super();
    this.x = x;
    this.y = y;
    this.r = r;
    this.b = b;
  }

  draw(strokeStyle="#ff0000") {
    ctx.strokeStyle=strokeStyle;
    ctx.lineWidth=this.b+"";
    ctx.beginPath();
    ctx.ellipse(this.x,this.y,this.r,this.r,0,0,Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }

  resize(r, b) {
    this.r = r;
    this.b = b||this.b;
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
}

class Line extends Geometry {

  constructor(x,y,a=0,b=1) {
    super();
    this.a = a;
    this.b = b >= 3 ? b : 3;
    this.l = 100;
    this.move(x,y);
  }

  draw(strokeStyle="#00ff00") {
    ctx.strokeStyle=strokeStyle;
    ctx.lineWidth=this.b+"";
    ctx.beginPath();
    ctx.moveTo(this.ax, this.ay);
    ctx.lineTo(this.bx,this.by);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle="#ff0000";
    ctx.beginPath();
    ctx.ellipse(this.x,this.y,3,3,0,0,Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }

  rotate(a) {
    this.a = a;
  }

  move(x,y) {
    super.move(x,y);
    this.ax = -this.l*Math.cos(this.a)+this.x;
    this.ay = -this.l*Math.sin(this.a)+this.y;
    this.bx = this.l*Math.cos(this.a)+this.x;
    this.by = this.l*Math.sin(this.a)+this.y;
  }

  collide(x,y,mode=ENTIRE,b=0) {
    switch (mode) {
      case INFILL: return 0;
      default: return ((y-this.y-(this.b+b)<Math.tan(this.a)*(x-this.x)&&y-this.y+(this.b+b)>Math.tan(this.a)*(x-this.x)));
    }
  }

}

class Point extends Geometry {

  constructor(x,y,b=3) {
    super();
    this.x = x;
    this.y = y;
    this.b = b;
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
