var karta = {
    funkcja: function () {
        var x = 4
        var kartageo1 = new THREE.PlaneGeometry(200, 240);
        var materials = []
        var pkt = 4
        var rzad 
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: THREE.ImageUtils.loadTexture('Zdjęcia/Dariusz Stefańczyk.jpg') }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.FrontSide, map: THREE.ImageUtils.loadTexture('gfx/tyl.jpg') }));
        for (var i = 0, len = kartageo1.faces.length; i < len; i++) {
            var face = kartageo1.faces[i].clone();
            face.materialIndex = 1;
            kartageo1.faces.push(face);
            kartageo1.faceVertexUvs[0].push(kartageo1.faceVertexUvs[0][i].slice(0));
        }
        var kartamat1 = new THREE.MeshFaceMaterial(materials)
        var genkarta = new THREE.Mesh(kartageo1, kartamat1);
        var card = new THREE.Object3D();
        card.add(genkarta);
        karta.funkcja2(pkt, function (data) {
            var textmesh = new THREE.Mesh(data, new THREE.MeshBasicMaterial({ color: 0xffffff }));
            textmesh.rotation.y = Math.PI;
            if (rzad == "Down") {
                textmesh.translateX(-90)
                textmesh.translateY(50)
                

            }
            else if (rzad == "Medium") {
                textmesh.translateX(-90)
                //textmesh.translateZ(-7)
                textmesh.translateY(50)

            }
            if (rzad == "Up") {
                textmesh.translateX(-90)
                //textmesh.translateZ(-7)
                textmesh.translateY(50)

            }
            textmesh.translateX(-90)
            textmesh.translateY(60)
            
            card.add(textmesh);
        })
        var wygenerowana = {
            grafika: card,
            rzad: rzad,

        }
        
        return wygenerowana
    },
    funkcja2: function czcionka(x,callback) {
        var punkty
        var loader = new THREE.FontLoader()
        loader.load("font/Fjalla One_Regular.json", function (obj) {
            var textGeometry = new THREE.TextGeometry(x,
            {
                font: obj,
                height: 5,
                size: 40
            })
            if(callback && callback instanceof Function)
            {
                callback(textGeometry);
            }
        })

        
    },
    funkcja3: function() {
         var x = 4
         var kartageo1 = new THREE.PlaneGeometry(200, 240);
         var materials = []
         var pkt = 4
         var rzad 
         materials.push(new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: THREE.ImageUtils.loadTexture('Zdjęcia/Dariusz Stefańczyk.jpg') }));
         materials.push(new THREE.MeshBasicMaterial({ side: THREE.FrontSide, map: THREE.ImageUtils.loadTexture('gfx/tyl.jpg') }));
       
         for (var i = 0, len = kartageo1.faces.length; i < len; i++) {
             var face = kartageo1.faces[i].clone();
             face.materialIndex = 1;
             kartageo1.faces.push(face);
             kartageo1.faceVertexUvs[0].push(kartageo1.faceVertexUvs[0][i].slice(0));
         }
         var kartamat1 = new THREE.MeshFaceMaterial(materials)
         var genkarta = new THREE.Mesh(kartageo1, kartamat1);
            return genkarta
    }



    
}