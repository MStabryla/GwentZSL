function UI(scene) {

    document.getElementById("logowanie")
                .addEventListener("click", function () {
                    var user = document.getElementById("username").value
                    var polecenie = "DODAJ_UZYTKOWNIKA"
                    net.sendData(polecenie, user)
                })
}