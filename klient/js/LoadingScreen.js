function LS()
{
    var that = this;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
        45, // kąt patrzenia kamery (FOV - field of view)
        0.8*window.innerWidth / window.innerHeight, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1, // minimalna renderowana odległość
        10000 // maxymalna renderowana odległość
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x76716A);
    this.renderer.setSize( window.innerWidth, window.innerHeight);
    var a = "76716A";
    var axis = new THREE.AxisHelper(200000000);
    this.scene.add(axis);
    var light = new THREE.SpotLight(0xffffff, 100,500, 3.14);
    light.position.set(0, -101, 100);
    this.scene.add(light);
    document.getElementById("LoadingScreen").appendChild(this.renderer.domElement);
    this.camera.position.x = 0;
    this.camera.position.y = 120;
    this.camera.position.z = -150;
    this.camera.lookAt(0,100, 250);
    function Model() {
        var daeModel
        this.loadModel = function (url, callback) {
            var loader = new THREE.ColladaLoader();
            loader.load(url, function (collada) {
                daeModel = collada.scene;
                daeModel.scale.set(10, 10, 10)
                daeModel.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                                        
                    }
                });
                callback(daeModel)
            })
        }
        this.getModel = function () {
            return daeModel
        }
    }
    var model = new Model();
    var witch = null;
    model.loadModel ("model/Witcher2.xml", function (modelData) {
        witch =  modelData;
        modelData.position.y -= 100;
        modelData.position.z -= 250;
        modelData.rotation.y = Math.PI;
        //modelData.position.z -= 50;
        that.scene.add(modelData)
        var newpos = new THREE.Vector3(modelData.position.x,modelData.position.y+50,modelData.position.z)
        that.camera.lookAt(newpos);
        that.camera.position.z -= 30;
        /*function animateScene() {
            requestAnimationFrame(animateScene);
            modelData.rotation.z += 0.005
        }
        animateScene();*/
    })
    this.stop = false;
    function animateScene() {
        if(!that.stop)
        {
            requestAnimationFrame(animateScene);
        }
        if(witch)
        {
            //that.camera.position.z -= 1;
            //witch.position.z -= 0.1;
            witch.rotation.z += 0.005;
        }
        that.renderer.render(scene, camera);
    }
    animateScene();
}