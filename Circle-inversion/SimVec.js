class SimVec {
  constructor(ox, oy, x, y) {
    this.origin = new Point(ox, oy);
    this.point = new Point(x, y);
  }

  draw(strokeStyle="#0f0") {
    ctx.strokeStyle=strokeStyle;
    ctx.lineWidth=this.b+"";
    ctx.beginPath();
    ctx.moveTo(this.origin.x, this.origin.y);
    ctx.lineTo(this.point.x,this.point.y);
    ctx.stroke();
    ctx.closePath();
  }

  static dotP(a, b) {
    return a.point.x*b.point.x + a.point.y*b.point.y;
  }

  static rotate(a, v) {
    return new Point(Math.hypot(a.point.x, a.origin.x)*Math.cos(v)+a.origin.x, Math.hypot(a.point.x, a.origin.x)*Math.sin(v)+a.origin.y);
  }

}
