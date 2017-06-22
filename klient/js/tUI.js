

function _Game() {
    var that = this;
    this.cards = [];
    this.actRows = [];
    this.GenerateFromDeck = function (params) {
        for (var i = 0; i < params.oDeck.Cards.length; i++)
        {
            var id = params.oDeck.Cards[i];
            params.oDeck.Cards[i] = Data.cards.find(function (elem) { return elem.Id == id });
            //console.log(params.oDeck
            var karta = new Card.get({ pkt: params.oDeck.Cards[i].Power, img: params.oDeck.Cards[i].Image });
            karta.model.position.y = 50 + 10 * i
            karta.model.position.x = 1500
            karta.model.position.z = 600;
            karta.model.rotateX(Math.PI /2);
            //karta.model.rotateZ(Math.PI);
            //karta.model.rotateY(Math.PI);
            //that.cards.push(karta.model);
            that.scene.add(karta.model)
            //console.log(genkarta.position)
        }
        var leaderId = params.oDeck.Leader;
        var lunit = Data.cards.find(function (elem) { return elem.Id == leaderId });
        var lcard = new Card.get({ pkt: lunit.Power, img: lunit.Image });
        lcard.model.position.set(-1500,50,600);
        lcard.model.rotateX(Math.PI /2);
        that.scene.add(lcard.model);
        for (var i = 0; i < params.eDeck.Cards.length; i++)
        {
            var id = params.eDeck.Cards[i];
            params.eDeck.Cards[i] = Data.cards.find(function (elem) { return elem.Id == id });
            //console.log(params.oDeck
            var karta = new Card.get({ pkt: params.eDeck.Cards[i].Power, img: params.eDeck.Cards[i].Image });
            karta.model.position.y = 50 + 10 * i
            karta.model.position.x = 1500
            karta.model.position.z = -600;
            karta.model.rotateX(Math.PI /2);
            //karta.model.rotateZ(Math.PI);
            //karta.model.rotateY(Math.PI);
            //that.cards.push(karta.model);
            that.scene.add(karta.model)
            //console.log(genkarta.position)
        }
        var eleaderId = params.eDeck.Leader;
        var elunit = Data.cards.find(function (elem) { return elem.Id == eleaderId });
        var elcard = new Card.get({ pkt: elunit.Power, img: elunit.Image });
        elcard.model.position.set(-1500,50,-600);
        elcard.model.rotateX(Math.PI /2);
        that.scene.add(elcard.model)
    }
    this.Start = function(){
        that.camera = new THREE.PerspectiveCamera(
            35, // kąt patrzenia kamery (FOV - field of view)
            window.innerWidth / window.innerHeight, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1, // minimalna renderowana odległość
            100000 // maxymalna renderowana odległość
        );
        var pkolor = [];
        var pionki = [];
        that.scene = new THREE.Scene();
        that.renderer = new THREE.WebGLRenderer();
        that.renderer.setClearColor(0x000000);
        that.renderer.setSize(window.innerWidth, window.innerHeight);
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
            //new THREE.MeshFaceMaterial(materials1),
            //new THREE.MeshFaceMaterial(materials2),
            //new THREE.MeshFaceMaterial(materials3),
            //new THREE.MeshFaceMaterial(materials3),
            //new THREE.MeshFaceMaterial(materials2),
            //new THREE.MeshFaceMaterial(materials1),
            new THREE.MeshBasicMaterial({ color: 0x7F7E7D, side: THREE.DoubleSide, wireframe: false, map: THREE.ImageUtils.loadTexture('gfx/1.png') }),
            new THREE.MeshBasicMaterial({ color: 0x7F7E7D, side: THREE.DoubleSide, wireframe: false, map: THREE.ImageUtils.loadTexture('gfx/2.png') }),
            new THREE.MeshBasicMaterial({ color: 0x7F7E7D, side: THREE.DoubleSide, wireframe: false, map: THREE.ImageUtils.loadTexture('gfx/3.png') }),
            new THREE.MeshBasicMaterial({ color: 0x7F7E7D, side: THREE.DoubleSide, wireframe: false, map: THREE.ImageUtils.loadTexture('gfx/3.png')}),
            new THREE.MeshBasicMaterial({ color: 0x7F7E7D, side: THREE.DoubleSide, wireframe: false, map: THREE.ImageUtils.loadTexture('gfx/2.png') }),
            new THREE.MeshBasicMaterial({ color: 0x7F7E7D, side: THREE.DoubleSide, wireframe: false, map: THREE.ImageUtils.loadTexture('gfx/1.png') }),
            new THREE.MeshBasicMaterial({ color: 0x7F7E7D, side: THREE.DoubleSide, wireframe: false })
        ]
        var material = new THREE.MeshBasicMaterial({
            color: 0xff0000, side: THREE.DoubleSide, wireframe: false
        });
        function rzedy() {
            for (var i = 0; i < 7;i++){
                var rzadg = new THREE.PlaneGeometry(2000, 240);
                var rzadm = rzadmat[i]
                var rzad = new THREE.Mesh(rzadg, rzadm);
                rzad.name = "Rząd " + i;
                rzad.actUnits = 0;
                that.scene.add(rzad)
                if (i > 2 && i < 6) {
                    that.actRows.push(rzad);
                }
                rzad.position.y = 10
                rzad.position.x = 0
                rzad.position.z = -650+(240*i)
                rzad.rotateX(Math.radians(stopnie));
            }
        }
        rzedy();
        that.camera.position.x = 0;
        that.camera.position.y = 3000;
        that.camera.position.z = 0;
        var materials = []
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/woodtext.jpg') }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/woodtext.jpg') }));
        var planszag = new THREE.PlaneGeometry(4000, 4000);
        var planszam = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('gfx/woodtext.jpg') });
        var plansza = new THREE.Mesh(planszag, planszam);
        plansza.name = "Back";
        that.scene.add(plansza)
        plansza.position.y = -10
        plansza.rotateX(Math.radians(stopnie));
        var testCard = {
            pkt:13,
            img:'img/KatarzynaSlusarczyk.jpg',
            row:"Medium"
        }
        var genkarta = new Card.get(testCard)
        that.cards.push(genkarta.model);
        that.scene.add(genkarta.model)
        genkarta.model.position.x = 0;
        genkarta.model.rotateX(Math.PI/2);
        //genkarta.model.rotateZ(Math.radians(2*stopnie));

        that.raycaster = new THREE.Raycaster();
        function init() {
            document.getElementById("Scene").appendChild(that.renderer.domElement);
            that.camera.lookAt(new THREE.Vector3(0,0,0));
            function animateScene() {
                requestAnimationFrame(animateScene);
                that.renderer.render(that.scene, that.camera);
            }
            animateScene();
            try
            {
                UI.Hidden("Loading");
            }
            catch(ex)
            {

            }
            document.getElementById("Scene").onmousedown = that.Click;
        }
        init();

    }
    
    this.Click = function(e){
        var mousevector = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1,-(e.clientY / window.innerHeight) * 2 + 1);
        that.raycaster.setFromCamera(mousevector,that.camera);
        var intersects = that.raycaster.intersectObjects(that.scene.children);
        console.log(that.scene.children, intersects, that.raycaster);
        if(intersects.length > 0)
        {
            var cards = that.raycaster.intersectObjects(that.cards);
            if(cards.length > 0)
            {
                var card = cards[0].object;
                var oldCardP = new THREE.Vector3(card.position.x, card.position.y, card.position.z);
                function MoveCard(em)
                {
                    var temmousevector = new THREE.Vector2((em.clientX / window.innerWidth) * 2 - 1, -(em.clientY / window.innerHeight) * 2 + 1);
                    that.raycaster.setFromCamera(temmousevector, that.camera);
                    var back = that.raycaster.intersectObjects([that.scene.getObjectByName("Back")]);
                    card.position.setX(back[0].point.x);
                    card.position.setZ(back[0].point.z);
                }
                document.getElementById("Scene").addEventListener("mousemove", MoveCard);
                function MoveUp(er) {
                    document.getElementById("Scene").removeEventListener("mousemove", MoveCard);
                    var temmousevector = new THREE.Vector2((er.clientX / window.innerWidth) * 2 - 1, -(er.clientY / window.innerHeight) * 2 + 1);
                    that.raycaster.setFromCamera(temmousevector, that.camera);
                    var fields = that.raycaster.intersectObjects(that.actRows);
                    if (fields.length > 0) {
                        var field = fields[0].object;
                        card.position.setX((50 * field.actUnits)-850);
                        field.actUnits++;
                        card.position.setZ(field.position.z);
                    }
                    document.getElementById("Scene").removeEventListener("mouseup", MoveUp);
                }
                document.getElementById("Scene").addEventListener("mouseup", MoveUp);
            }
        }
        else
        {
        }
    }
}
Game = new _Game();
