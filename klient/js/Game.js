
function _Game() {
    var that = this;
    var yourCards = [];
    var enemyCards = [];
    this.hand = [];
    this.actRows = [];
    this.enemyRows = [];
    this.battleData = {
        eUpRow:new MyDriver.Object("text",{font:"Calibri",color:0xffffff,text:"0",fontSize:"60px"}),
        eMeRow:new MyDriver.Object("text",{font:"Calibri",color:0xffffff,text:"0",fontSize:"60px"}),
        eDownRow:new MyDriver.Object("text",{font:"Calibri",color:0xffffff,text:"0",fontSize:"60px"}),
        oUpRow:new MyDriver.Object("text",{font:"Calibri",color:0xffffff,text:"0",fontSize:"60px"}),
        oMeRow:new MyDriver.Object("text",{font:"Calibri",color:0xffffff,text:"0",fontSize:"60px"}),
        oDownRow:new MyDriver.Object("text",{font:"Calibri",color:0xffffff,text:"0",fontSize:"60px"}),
    }
    this.ymObj = new MyDriver.Object("text",{font:"Calibri",color:0xffffff,text:"Twój ruch",fontSize:"45px"});
    this.GenerateData = function(){
        document.getElementById("Driver2").style.display = "block";
        var i=0;
        for(var key in that.battleData)
        {
            Driver.Scene.AddToScene(that.battleData[key]);
            that.battleData[key].Position.Set(300,110+90*i);
            i++;
        }
        that.ymObj.visible = false;
        that.ymObj.Position.Set(90,300)
        Driver.Scene.AddToScene(that.ymObj);
    }
    this.ActData = function(){
        for(var key in that.battleData)
        {
            that.battleData[key].Text = GameData.stat[key];
        }
    }
    this.MoveEnemyCard = function(id,field){
        var card = enemyCards.find(function(d){
            return d.CardId == id;
        })
        console.log(card);
        if(card)
        {
            var actRow;
            switch(field)
            {
                case "Siege":
                    actRow = that.enemyRows[0];
                    break;
                case "Distanse":
                    actRow = that.enemyRows[1];
                    break;
                case "Short":
                    actRow = that.enemyRows[2];
                    break;
            }
            console.log(field,actRow);
            card.model.position.z = actRow.position.z;
            card.model.position.x = (50 * actRow.actUnits)-850;
            actRow.actUnits++;
        }
    }
    this.GenerateFromDeck = function (params) {
        for (var i = 0; i < params.oDeck.Cards.length; i++)
        {
            var id = params.oDeck.Cards[i];
            params.oDeck.Cards[i] = Data.cards.find(function (elem) { return elem.Id == id });
            var karta = new Card.get({ pkt: params.oDeck.Cards[i].Power, img: params.oDeck.Cards[i].Image,id:params.oDeck.Cards[i].Id });
            karta.model.position.y = 50 + 10 * i
            karta.model.position.x = 1500
            karta.model.position.z = 600;
            karta.model.rotateX(Math.PI /2);
            yourCards.push(karta);
            that.scene.add(karta.model)
        }
        var leaderId = params.oDeck.Leader;
        var lunit = Data.cards.find(function (elem) { return elem.Id == leaderId });
        var lcard = new Card.get({ pkt: lunit.Power, img: lunit.Image });
        lcard.model.position.set(-1500,50,800);
        lcard.model.rotateX(Math.PI /2);
        that.scene.add(lcard.model);
        for (var i = 0; i < params.eDeck.Cards.length; i++)
        {
            var id = params.eDeck.Cards[i];
            params.eDeck.Cards[i] = Data.cards.find(function (elem) { return elem.Id == id });
            var karta = new Card.get({ pkt: params.eDeck.Cards[i].Power, img: params.eDeck.Cards[i].Image,id:params.eDeck.Cards[i].Id });
            karta.model.position.y = 50 + 10 * i
            karta.model.position.x = 1500
            karta.model.position.z = -600;
            karta.model.rotateX(Math.PI /2);
            enemyCards.push(karta)
            that.scene.add(karta.model)
        }
        var eleaderId = params.eDeck.Leader;
        var elunit = Data.cards.find(function (elem) { return elem.Id == eleaderId });
        var elcard = new Card.get({ pkt: elunit.Power, img: elunit.Image });
        elcard.model.position.set(-1500,50,-800);
        elcard.model.rotateX(Math.PI /2);
        that.scene.add(elcard.model)
    }
    this.ToHand = function(){
        for(var i=0;i<yourCards.length;i++)
        {
            var actCard = yourCards[i];
            actCard.model.position.set(-880+100*i,100,750);
            that.hand.push(actCard.model);
        }
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
                if(i == 0 || i == 5)
                {
                    rzad.name = "Siege";
                }
                else if(i == 1 || i == 4)
                {
                    rzad.name = "Distanse";
                }
                else if(i == 2 || i == 3)
                {
                    rzad.name = "Short";
                }
                rzad.actUnits = 0;
                that.scene.add(rzad)
                if (i > 2 && i < 6) {
                    that.actRows.push(rzad);
                }
                else if(i >= 0 && i< 3)
                {
                    that.enemyRows.push(rzad);
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
        /*var testCard = {
            pkt:13,
            img:'img/KatarzynaSlusarczyk.jpg',
            row:"Medium"
        }
        var genkarta = new Card.get(testCard)
        that.cards.push(genkarta.model);
        that.scene.add(genkarta.model)
        genkarta.model.position.x = 0;
        genkarta.model.rotateX(Math.PI/2);*/
        //genkarta.model.rotateZ(Math.radians(2*stopnie));

        that.raycaster = new THREE.Raycaster();
        that.stop = false;
        function init() {
            document.getElementById("Scene").appendChild(that.renderer.domElement);
            that.camera.lookAt(new THREE.Vector3(0,0,0));
            that.GenerateData();
            function animateScene() {
                Driver.RenderScene();
                if(!that.stop)
                {
                    requestAnimationFrame(animateScene);
                }
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
        if(!GameData.ym)
        {
            return false;
        }
        var mousevector = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1,-(e.clientY / window.innerHeight) * 2 + 1);
        that.raycaster.setFromCamera(mousevector,that.camera);
        var intersects = that.raycaster.intersectObjects(that.scene.children);
        //console.log(that.scene.children, intersects, that.raycaster);
        if(intersects.length > 0)
        {
            var cards = that.raycaster.intersectObjects(that.hand);
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
                        RemoveObjectFromArray(card,that.hand);
                        var pass = that.hand.length <= 0
                        Net.socket.emit("action",{x:(50 * field.actUnits)-850,z:field.position.z,field:field.name,card:{id:card.owner.CardId,power:card.owner.pkt},pass:pass});
                        
                        GameData.ym = false;
                    }
                    else
                    {
                        card.position.set(oldCardP.x,oldCardP.y,oldCardP.z);
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
    this.Stop = function(){
        that.stop = true;
    }
    this.End = function(){
        var Winning = new MyDriver.Object("shape",{shapetype:"rectangle",sideX:200,sideY:200,color:""})
    }
}
Game = new _Game();
