class NeonCanvas extends HTMLCanvasElement {
  constructor() {
    super();
    this.ctx = this.getContext('2d');
    this.Neon = new Neon(16, this, this.ctx);
    // this.width = this.getAttribute('width')
    // this.height = this.getAttribute('height')
  }

  connectedCallback() {
    // window.width = this.width;
    // window.height = this.height;
    // window.ctx = this.ctx;

    window.onload = () => {
      var entities = this.getElementsByTagName('neon-entity');
      console.log(this['neon-box'])
      for (var i = 0; i < entities.length; i++) {
        let type = entities[i].attributes.type.value;
        let posx = parseFloat(entities[i].attributes.x.value);
        let posy = parseFloat(entities[i].attributes.y.value);
        switch (type) {
          case 'box':
            this.neon.createBox(posx, posy, 100, 100);
            break;
          case 'cloth':
            this.neon.createCloth(posx, posy, 200, 200, 10, 1);
            break;
          case 'hexagon':
            this.neon.createHexagon(posx, posy, 10, 50, 1, 4)
            break;
        }
      }
    }

    const animate = () => {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.neon.update();
      this.neon.render();
      this.neon.interact();

      this.neon.renderPointIndex();

      requestAnimationFrame(animate);
    }
    animate();
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
  }
}

// Define the new element
// customElements.define('neon-canvas', NeonCanvas);
// document.createElement("canvas", { is: "neon-canvas" })
customElements.define('neon-canvas', NeonCanvas, { extends: "canvas" });

class NeonBox extends HTMLElement {
  constructor(x, y, w, h) {
    super();
    const box = new Entity(this.iterations);

    box.addPoint(x, y, 0, 0);
    box.addPoint(x + w, y, 0, 0);
    box.addPoint(x + w, y + h, 0, 0);
    box.addPoint(x, y + h, 0, 0);
    box.addStick(0, 1);
    box.addStick(1, 2);
    box.addStick(2, 3);
    box.addStick(3, 0);
    box.addStick(3, 1);

    console.log(box);
    return this;
    // return box;
  }
}
customElements.define('neon-box', NeonBox);
