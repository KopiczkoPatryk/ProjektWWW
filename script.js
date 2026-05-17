// Przycisk zmiany motywu
const MotywPrzycisk = document.getElementById("motyw-przycisk")
function ZmienMotyw() {
    document.body.classList.toggle("tryb-ciemny");
}

MotywPrzycisk.addEventListener("click", ZmienMotyw);

// Przechwytywanie i wstawianie banerów z zewnętrznej strony.
function ZwrocBaner(id) {
    let baner = `https://cdn.akamai.steamstatic.com/steam/apps/${id}/capsule_616x353.jpg`;
    let response = `<a href="#" class="baner">
            <img src="${baner}" alt="Baner ${id}">
        </a>`;
    return response;
}

function WstawBanery() {
    let kod = ZwrocBaner(730) + ZwrocBaner(570) + ZwrocBaner(440);
    document.getElementById("banery-reklamowe").innerHTML = kod;

}
document.addEventListener('DOMContentLoaded', WstawBanery);

function ZwrocOkladke(id) {
    let okladka = `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_600x900.jpg`;
    return okladka;
}

// Optymalizacja/minimalizacja HTML

// Menu dolne
const menuAtrybut = [
    { href: "#", icon: "fa-bars", text: "Kategorie" },
    { href: "#", icon: "fa-piggy-bank", text: "Tanie gry" },
    { href: "#", icon: "fa-key", text: "Klucze" },
    { href: "#", icon: "fa-dice", text: "Losowe klucze" },
    { href: "#", icon: "fa-hand-holding-dollar", text: "Prepaid" },
];

// Renderowanie na stronie
document.addEventListener("DOMContentLoaded", () => {
    const menuKontener = document.getElementById("menu-dolne");
    if (menuKontener) {
        menuKontener.innerHTML = menuAtrybut.map(item => `
            <li>
                <a href="${item.href}">
                    <i class="fa-solid ${item.icon}"></i>
                    <span>${item.text}</span>
                </a>
            </li>
        `).join("");
    }
});