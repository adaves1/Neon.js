window.onload = function () {
  let canvas = document.getElementById('c');
  let ctx = canvas.getContext('2d');
  let width = 600;
  let height = 600;
  canvas.width = width;
  canvas.height = height;

  let neon = new Neon(16, canvas, ctx);

  let cloth = neon.createCloth(200, 200, 300, 300, 20, 2);
  // let ragdoll = neon.createRagdoll(100, 100);
  neon.createBox(100, 100, 100, 100);
  
  function animate() {
    ctx.clearRect(0, 0, width, height);

    neon.update();
    neon.render();
    neon.interact();

    // verly.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}
