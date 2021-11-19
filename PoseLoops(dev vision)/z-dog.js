
// create illo
const illo = new Zdog.Illustration({
    // set canvas with selector
    element: '.zdog-canvas',
    zoom: 4,
  });
  
  // circle
  new Zdog.Ellipse({
    addTo: illo,
    diameter: 12,
    translate: { z: 6 },
    stroke: 3,
    color: '#636',
  });
  
  new Zdog.Ellipse({
    addTo: illo,
    diameter: 12,
    translate: { z: -6 },
    stroke: 3,
    color: '#C52',
  });
  
  
  function animate() {
    illo.rotate.y += 0.03;
    illo.rotate.x += 0.01;
    illo.updateRenderGraph();
    requestAnimationFrame( animate );
  }
  
  animate();