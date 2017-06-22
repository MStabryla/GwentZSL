/*var st
function Net() {
    /*
        funkcja publiczna możliwa do uruchomienia 
        z innych klas
    */
/*
    this.sendData = function (polecenie, value, kolor) {
        var obj = { komenda: polecenie, value: value, tablica: kolor }
        //console.log("Wysylam na serwer : ")
        //console.log(obj)
        $.ajax({
            url: "http://localhost:3000/",
            data: obj,
            type: "POST",
            success: function (odpo) {

                //console.log("Odbieram z serwera : ")
                //.log(JSON.parse(odp),odp.odp)
                var odp = JSON.parse(odpo)
                if (odp.odp == "add1") {
                    document.getElementById("front").style.display = "none";
                    game.pionki();
                    game.user1();
                    check();
                    st = 1
                    document.getElementById("komunikat").innerHTML = "Grasz białymi! Oczekiwanie na przeciwnika!"

                }
                else if (odp.odp == "add2") {
                    document.getElementById("start").style.display = "none";
                    game.pionki();
                    game.user2();
                    st = 2;
                    document.getElementById("komunikat").innerHTML = "Grasz czarnymi!"
                    document.getElementById("move").innerHTML = "Ruch przeciwnka!"
                    game.similar();

                }
                else if (odp.odp == "badname") {
                    document.getElementById("komunikat").innerHTML = "Niestety,ktoś ma taki sam nick!"
                }
                else if (odp.odp == "toomuch") {
                    document.getElementById("komunikat").innerHTML = "W warcaby gra 2 a nie 3!"
                }
                else if (odp.odp == "reset") {
                    document.getElementById("komunikat").innerHTML = "RESET!"
                }
                else if (odp.odp == "start") {
                    document.getElementById("start").style.display = "none";
                    document.getElementById("komunikat").innerHTML = "Grasz białymie"
                    clearInterval(spr);
                    document.getElementById("move").innerHTML = "Rusz się!"
                    //similar();
                }
                else if (odp.odp == "change") {
                    //clearInterval(sim);
                    game.tab_update(odp.tab);
                }
                else if (odp.odp == "update") {
                    game.similar();
                }
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    }
    var spr;
    function check() {
        spr = setInterval(function () {
            var polecenie = "SPRAWDZANIE"
            net.sendData(polecenie)
        }, 500);
    }

}
*/