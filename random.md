---
layout: default
title: "Random"
---

A scratch page for experiments.

## 3D probe

<div id="game-canvas" style="width: 480px; height: 320px; border: 1px dashed #666; margin: 1em 0;"></div>

<style>
  #game-canvas { background: #111; touch-action: none; }
</style>

<script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
<script>
(function () {
  if (typeof THREE === 'undefined') {
    document.getElementById('game-canvas').textContent = 'THREE failed to load (offline or blocked)';
    return;
  }
  var host = document.getElementById('game-canvas');
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, 480 / 320, 0.1, 100);
  camera.position.set(0, 1.5, 4);
  camera.lookAt(0, 0.5, 0);

  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(480, 320);
  host.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  var dir = new THREE.DirectionalLight(0xffffff, 1.0);
  dir.position.set(3, 5, 4);
  scene.add(dir);

  var cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x4488ff, metalness: 0.3, roughness: 0.4 })
  );
  cube.position.y = 0.5;
  scene.add(cube);

  var key = {};
  window.addEventListener('keydown', function (e) { key[e.key.toLowerCase()] = true; });
  window.addEventListener('keyup', function (e) { key[e.key.toLowerCase()] = false; });

  var dragging = false, px = 0, py = 0;
  host.addEventListener('pointerdown', function (e) { dragging = true; px = e.clientX; py = e.clientY; });
  window.addEventListener('pointerup', function () { dragging = false; });
  window.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    cube.rotation.y += (e.clientX - px) * 0.01;
    cube.rotation.x += (e.clientY - py) * 0.01;
    px = e.clientX; py = e.clientY;
  });

  function tick() {
    requestAnimationFrame(tick);
    if (!dragging) cube.rotation.y += 0.01;
    if (key['arrowup'] || key['w']) cube.position.z -= 0.02;
    if (key['arrowdown'] || key['s']) cube.position.z += 0.02;
    cube.position.z = Math.max(-6, Math.min(8, cube.position.z));
    renderer.render(scene, camera);
  }
  tick();
})();
</script>

Drag the cube; move it with W/S or arrow keys.
