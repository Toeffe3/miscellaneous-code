class SimVec {
  constructor(ox, oy, x, y) {
    this.origin = new Point(ox, oy);
    this.point = new Point(ox - x, oy - y);
  }

  static dotP(a, b) {
    return a.point.x*b.point.x + a.point.y*b.point.y;
  }
}
