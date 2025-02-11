class Stick {
  constructor(p1, p2, length, stiffness) {
    this.startPoint = p1;
    this.endPoint = p2;
    this.stiffness = stiffness || 2;
    this.color = '#f5476a';
    if (!length) {
      this.length = this.startPoint.pos.dist(this.endPoint.pos);
    } else {
      this.length = length;
    }
    this.startPoint.sticks.push(this);
    this.endPoint.sticks.push(this);
  }

  update(stepCoef) {
    // not gonna use vectors for performance optimization
    
    // let dx = this.endPoint.pos.x - this.startPoint.pos.x;
    // let dy = this.endPoint.pos.y - this.startPoint.pos.y;
    // let dist = Math.sqrt(dx * dx + dy * dy);
    // let diff = this.length - dist;
    // let percent = diff / dist / 2;
    // let offsetx = (dx * percent);
    // let offsety = (dy * percent);
    // if (!this.startPoint.pinned) {
    //   this.startPoint.pos.x -= offsetx;
    //   this.startPoint.pos.y -= offsety;
    // }
    // if (!this.endPoint.pinned) {
    //   this.endPoint.pos.x += offsetx;
    //   this.endPoint.pos.y += offsety;
    // }
    
    // ----- algo two

    // algo three
    let dx = this.endPoint.pos.x - this.startPoint.pos.x;
    let dy = this.endPoint.pos.y - this.startPoint.pos.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let diff = (this.length - dist) / dist * this.stiffness;

    let offsetx = dx * diff * 0.5;
    let offsety = dy * diff * 0.5;

    // calculate mass
    let m1 = this.startPoint.mass + this.endPoint.mass;
    let m2 = this.startPoint.mass / m1;
    m1 = this.endPoint.mass / m1;

    if (!this.startPoint.pinned) {
      this.startPoint.pos.x -= offsetx * m1;
      this.startPoint.pos.y -= offsety * m1;
    }
    if (!this.endPoint.pinned) {
      this.endPoint.pos.x += offsetx * m2;
      this.endPoint.pos.y += offsety * m2;
    }

    
    // calculate mass
    // var m1 = this.startPoint.mass + this.endPoint.mass;
    // var m2 = this.startPoint.mass / m1;
    // m1 = this.endPoint.mass / m1;
    
    // var normal = Vector.sub(this.startPoint.pos, this.endPoint.pos);
    // var m = normal.magSq();
    // let diff = ((this.length * this.length) - m);
    // normal.mult((diff / m) * this.stiffness * stepCoef);
    
    // if (!this.startPoint.pinned) {
    //   this.startPoint.pos.add(normal);
    // }
    // if (!this.endPoint.pinned) {
    //   this.endPoint.pos.sub(normal);
    // }
  }

  render() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
    ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
    ctx.stroke();
    ctx.closePath();
  }
}
