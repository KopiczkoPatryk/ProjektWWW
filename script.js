function ZmienMotyw() {
    document.body.classList.toggle("tryb-ciemny");
}
const MotywPrzycisk = document.getElementById("motyw-przycisk")
MotywPrzycisk.addEventListener("click", ZmienMotyw);