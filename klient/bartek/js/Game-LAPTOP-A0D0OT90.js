/*
    klasa Game
*/
var camera = new THREE.PerspectiveCamera(
   35, // kąt patrzenia kamery (FOV - field of view)
   window.innerWidth / window.innerHeight, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
   0.1, // minimalna renderowana odległość
   100000 // maxymalna renderowana odległość
   );

function Game() {
    
    var pionki = [];
    var scene = new THREE.Scene();
    console.log(scene)
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    var stopnie = 90
    var rzadmattab = []
    Math.radians = function (degrees) {
        return degrees * Math.PI / 180;
    };
    var materials1 = [
    new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/1.png') }),
    new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/1.png') })
    ]
    var materials2 = [
    new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/2.png') }),
    new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/2.png') }),
    ]
    var materials3 = [
     new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/3.png') }),
     new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/3.png') }),
    ]
    var rzadmat = [
        new THREE.MeshFaceMaterial(materials1),
        new THREE.MeshFaceMaterial(materials2),
        new THREE.MeshFaceMaterial(materials3),
        new THREE.MeshFaceMaterial(materials3),
        new THREE.MeshFaceMaterial(materials2),
        new THREE.MeshFaceMaterial(materials1),
        new THREE.MeshBasicMaterial({ color: 0x7F7E7D, side: THREE.DoubleSide, wireframe: false }),
    ]
    
        
       
        


    

  
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000, side: THREE.DoubleSide, wireframe: false
    });



    // szachownica

    function rzedy() {
        for (var i = 0; i < 7; i++) {
            
            var rzadg = new THREE.PlaneGeometry(2000, 240);
            var rzadm = rzadmat[i]
            var rzad = new THREE.Mesh(rzadg, rzadm);
           
            var rzadpkt = new THREE.Object3D();
            rzadpkt.add(rzad)
            scene.add(rzadpkt)
            rzadpkt.position.y = 10
            rzadpkt.position.x = 0
            rzadpkt.position.z = -700+(250*i)
            rzadpkt.rotateX(Math.radians(stopnie));

        }
        
       
    
    }
    rzedy();
    camera.position.x = 0;
    camera.position.y = 3000;
    camera.position.z = 0;
    camera.lookAt(0, 0, 0);


    var materials = []
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/woodtext.jpg') }));
    materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/woodtext.jpg') }));
    var planszag = new THREE.PlaneGeometry(4000, 4000);
    var planszam = new THREE.MeshFaceMaterial(materials);
    var plansza = new THREE.Mesh(planszag, planszam);
    scene.add(plansza)
    plansza.position.y = -10
    plansza.rotateX(Math.radians(stopnie));
    console.log(plansza.position)
    var genkarta
    console.log(karta);
    for (var i=0; i < 20; i++) {
        genkarta = karta.funkcja3()
        scene.add(genkarta)
        genkarta.position.y = 50+10*i
        genkarta.position.x = 1500
        genkarta.position.z = 600
        genkarta.rotateX(Math.radians(1*stopnie));
        genkarta.rotateZ(Math.radians(2*stopnie));
        genkarta.rotateY(Math.radians(2 * stopnie));
        console.log(genkarta.position)
    }
    function dociaganie() {
        console.log(scene.children)
        for (var i = 0; i < 10; i++) {
            genkarta = karta.funkcja().grafika
            scene.add(genkarta)
            genkarta.position.y = 40
            genkarta.position.x = -900 + 200*i
            genkarta.position.z = 780
            genkarta.rotateX(Math.radians(1 * stopnie));
            genkarta.rotateZ(Math.radians(2 * stopnie));
            console.log(genkarta.position)
        }
    }
   dociaganie()

    document.addEventListener("mousedown", onMouseDown, false);
    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
  var mouseVector = new THREE.Vector2() // wektor (x,y) wykorzystany będzie do określenie pozycji myszy na ekran
  console.log(scene.children)
  function onMouseDown(event) {
  
      mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseVector, camera);

      var intersects = raycaster.intersectObjects(scene.children);
      console.log(intersects)
      console.log(intersects.length)
      console.log(scene.children)
      if (intersects.length > 0) {

          console.log(intersects[0].object);
          console.log(intersects[0].position)
          if (karta.funkcja().rzad == "Up") {
              genkarta.position.z = 50
          }
          else if (karta.funkcja().rzad == "Medium") {
              genkarta.position.z = 300
          }
          else if (karta.funkcja().rzad == "Down") {
              genkarta.position.z = 550
          }


      
      }

  }
  function onMouseUp(event) {
      console.log("lala")
  }

    //console.log(pkolor)*/
    /*function tab_create() {
        document.getElementById("tablica").innerHTML = JSON.stringify(pkolor)
    }


    this.tab_update = function (tab) {
        pkolor = tab;
        document.getElementById("tablica").innerHTML = JSON.stringify(pkolor);
        for (i = 0; i < 16; i++) {
            scene.remove(pionki[i]);

        }
        pionki = [];
        game.pionki();
    }

    var sim;
    this.similar = function () {
        sim = setInterval(function () {
            var polecenie = "SIM_TAB"
            console.log("pytam")
            var value = "";
            //net.sendData(polecenie, value, JSON.stringify(pkolor))
        }, 500);
    }*/

    function init() {

        document.getElementById("scene").appendChild(renderer.domElement);

        camera.lookAt(scene.position);

        function animateScene() {

            requestAnimationFrame(animateScene);

            renderer.render(scene, camera);
        }
        animateScene();
    }

    init();


}