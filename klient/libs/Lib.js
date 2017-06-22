function conn(target, params, func) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/" + target, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (func) {
                func(JSON.parse(this.responseText));
            }
        }
    };
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}