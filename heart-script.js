console.clear();

/* SETUP */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* CONTROLS */
const controlsWebGL = new THREE.OrbitControls(camera, renderer.domElement);
controlsWebGL.autoRotate = true;
controlsWebGL.autoRotateSpeed = 2;

/* PARTICLES */
const tl = gsap.timeline({
    repeat: -1,
    yoyo: true
});

const path = document.querySelector("path");
const length = path.getTotalLength();
const vertices = [];

for (let i = 0; i < length; i += 0.1) {
    const point = path.getPointAt(i / length);
    vertices.push(
        new THREE.Vector3(point.x - 300, -(point.y - 276), 0)
    );
}

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(vertices);

const material = new THREE.PointsMaterial({
    color: 0xff69b4,
    size: 3,
    sizeAttenuation: true
});

const particlesData = [];
vertices.forEach((vertex) => {
    const offsetX = (Math.random() - 0.5) * 100;
    const offsetY = (Math.random() - 0.5) * 100;
    const offsetZ = (Math.random() - 0.5) * 100;

    particlesData.push({
        originalPos: vertex.clone(),
        randomPos: new THREE.Vector3(
            vertex.x + offsetX,
            vertex.y + offsetY,
            vertex.z + offsetZ
        )
    });
});

geometry.setAttribute('position', new THREE.BufferAttribute(
    new Float32Array(vertices.flatMap(v => [v.x, v.y, v.z])),
    3
));

const particles = new THREE.Points(geometry, material);
scene.add(particles);

const positionAttribute = geometry.getAttribute('position');

particlesData.forEach((data, index) => {
    tl.to(positionAttribute.array, {
        [index * 3]: data.randomPos.x,
        [index * 3 + 1]: data.randomPos.y,
        [index * 3 + 2]: data.randomPos.z,
        duration: 2
    }, 0);
});

function animateParticles() {
    positionAttribute.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animateParticles);
}

animateParticles();

/* RESIZE */
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
