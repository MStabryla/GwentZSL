var Card = {
    get: function (cardData) {
        //var x = 4
        var that = this;
        var kartageo1 = new THREE.PlaneGeometry(200, 240);
        this.CardId = cardData.id;
        this.pkt = cardData.pkt;
        //this.row = cardData.row;
        var met = [
            
            new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map: THREE.ImageUtils.loadTexture(cardData.img) }),
            
            new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map: THREE.ImageUtils.loadTexture(cardData.img) }),
            
            new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map: THREE.ImageUtils.loadTexture(cardData.img) }),
            new THREE.MeshBasicMaterial({side:THREE.DoubleSide,color:0x0000ff }),
            new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map: THREE.ImageUtils.loadTexture(cardData.img) }),
            new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map: THREE.ImageUtils.loadTexture(cardData.img) }),
        ]
        var kartamat1 = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture(cardData.img) })
        //var kartamat1 = new THREE.MeshFaceMaterial(met);
        var genkarta = new THREE.Mesh(kartageo1, kartamat1);
        //genkarta.rotateX(Math.PI);
        //this.model = new THREE.Object3D();
        this.model = genkarta;
        this.model.owner = this;
        this.model.position.y = 100;
        //this.model.add(genkarta);
        /*switch(this.row)
        {
            case "Up":
                this.model.position.z = 50
                break;
            case "Medium":
                this.model.position.z = 300
                break;
            case "Down":
                this.model.position.z = 550
                break;
        }*/
        Card.font(this.pkt, function (data) {
            var textback = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshBasicMaterial({ color: 0X808080 }));
            var textmesh = new THREE.Mesh(data, new THREE.MeshBasicMaterial({ color: 0xffffff }));
            //textmesh.rotation.z = Math.PI;
            textback.rotation.x = Math.PI;
            textback.translateX(-60)
            textback.translateY(80)
            textmesh.translateX(-30)
            textmesh.translateY(-30)
            //textmesh.position.z = 5;
            //textback.position.z = 4;
            textback.add(textmesh);
            that.model.add(textback);
        })
    },
    font: function czcionka(x,callback) {
        var punkty
        var loader = new THREE.FontLoader()
        loader.load("font/FjallaOne_Regular.json", function (obj) {
            var textGeometry = new THREE.TextGeometry(x,
            {
                font: obj,
                height: 5,
                size: 50
            })
            if(callback && callback instanceof Function)
            {
                callback(textGeometry);
            }
        })

        
    }



    
}