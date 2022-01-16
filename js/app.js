var splash = document.getElementById("splash")
var main = document.getElementById("main")
setTimeout(() => {
    splash.style = "display:none";
    main.style = "display:block";
    AOS.init();
}, 100);

