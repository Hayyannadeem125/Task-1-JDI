document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;

    document.getElementById('next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    document.getElementById('prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            showPopup(`Model ${index + 1} Information`);
        });
    });

    document.getElementById('closePopup').addEventListener('click', () => {
        document.getElementById('popup').style.display = 'none';
    });

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    function showPopup(text) {
        document.getElementById('popupText').innerText = text;
        document.getElementById('popup').style.display = 'block';
    }

    function initThreeJS(containerId, modelPath) {
        const container = document.getElementById(containerId);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const light = new THREE.AmbientLight(0x404040);
        scene.add(light);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        scene.add(directionalLight);

        const loader = new THREE.GLTFLoader();
        loader.load(modelPath, function (gltf) {
            scene.add(gltf.scene);
            gltf.scene.rotation.y = Math.PI;

            function animate() {
                requestAnimationFrame(animate);
                gltf.scene.rotation.y += 0.01; // Rotate the model
                renderer.render(scene, camera);
            }

            animate();
        });

        camera.position.z = 3; // Move camera closer to make model appear larger
    }

    initThreeJS('model1', './images/model-1/scene.gltf');
    initThreeJS('model2', './images/model-2/scene.gltf');
    initThreeJS('model3', './images/model-3/scene.gltf');
});
