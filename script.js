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

// Atrybuty rozwijanego menu
const menuRozwijaneAtrybut = [
    { href: "#", icon: "fa-circle-user", text: "Konto"},
    { href: "#", icon: "fa-basket-shopping", text: "Koszyk"},
    { href: "#", icon: "fa-arrow-right-from-bracket", text: "Wyloguj"}
];

// Atrybuty menu dolnego
const menuAtrybut = [
    { href: "#", icon: "fa-bars", text: "Kategorie" },
    { href: "#", icon: "fa-piggy-bank", text: "Tanie gry" },
    { href: "#", icon: "fa-key", text: "Klucze" },
    { href: "#", icon: "fa-dice", text: "Losowe klucze" },
    { href: "#", icon: "fa-hand-holding-dollar", text: "Prepaid" },
];

function WstawProdukt(id, nazwa, cena) {
    let okladka = ZwrocOkladke(id);
    let response = `<div class="produkt">
                    <img src="${okladka}" alt="Cyberpunk 2077">
                    <h3>${nazwa}</h3>
                    <p class="cena">${cena}</p>
                </div>`;
    return response;
}
let polecane = [
    { id: 730, nazwa: "Counter-Strike: Global Offensive", cena: "Darmowa" },
    { id: 570, nazwa: "Dota 2", cena: "Darmowa" },
    { id: 440, nazwa: "Team Fortress 2", cena: "Darmowa" },
    { id: 1091500, nazwa: "Cyberpunk 2077", cena: "199,99 zł" },
    { id: 1174180, nazwa: "Red Dead Redemption 2", cena: "249,99 zł" },
    { id: 271590, nazwa: "Grand Theft Auto V", cena: "99,99 zł" },
    { id: 292030, nazwa: "The Witcher 3: Wild Hunt", cena: "89,99 zł" },
    { id: 578080, nazwa: "PLAYERUNKNOWN'S BATTLEGROUNDS", cena: "89,99 zł" }
]
function WstawProdukty(lista) {
    let kod = "";
    for (let i = 0; i < 5; i++) {
        kod += WstawProdukt(lista[i].id, lista[i].nazwa, lista[i].cena);
    }
    return kod;
}
function WstawPolecane(polecane) {
    document.getElementById("polecane").innerHTML = WstawProdukty(polecane);
}

// Renderowanie na stronie
document.addEventListener("DOMContentLoaded", () => {
    
    const menuRozwijane = document.getElementById("rozwijane-menu");
    if (menuRozwijane) {
        menuRozwijane.innerHTML = menuRozwijaneAtrybut.map(item => `
            <a href="${item.href}">
                <i class="fa-solid ${item.icon}"></i>
                <span>${item.text}</span>
            </a>
        `).join("");
    }
    
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
    WstawPolecane(polecane);
});

