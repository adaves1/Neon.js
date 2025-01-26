/**
 * Neon Typography
 * @author <adaves1@yahoo.com>
 */

window.onload = function () {
  let canvas = document.getElementById('c');
  let ctx = canvas.getContext('2d');
  let width = 1200;
  let height = 500;
  canvas.width = width;
  canvas.height = height;
  let neon = new Neon(50, canvas, ctx);

  // URL = undefined;

  let urlText = 'HAPPY';
  let urlText2 = 'CODING';
  // check support
  if ('URL' in window && URL !== undefined) {
    let url = new URL(window.location.href);
    let query_string = url.search;
    let search_params = new URLSearchParams(query_string);
    urlText = search_params.get('text') || 'HAPPY';
    urlText2 = search_params.get('text2') || 'HOLI';
  }

  let word = new Text(urlText, 50, 100, 25);
  let word2 = new Text(urlText2, 700, 100, 25);

  // let A = new TypoGraphy(offsetX, center, 20, 'A');

  neon.addEntity(word.entity);
  neon.addEntity(word2.entity);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    neon.update();
    neon.render();
    neon.interact();
    // word.entity.renderPointsIndex()
    // neon.renderPointIndex();
    // word.entity.renderPointIndex();

    requestAnimationFrame(animate);
  }
  animate();
}
