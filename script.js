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

// Atrybuty polecancyh produktów
const polecaneProdukty = [
    { img: "iko-cbp.jpg", alt: "Cyberpunk 2077", nazwa: "Cyberpunk 2077", cena: "49,99 zł" },
    { img: "iko-eldenring.jpg", alt: "Elden Ring", nazwa: "Elden Ring", cena: "59,99 zł" },
    { img: "iko-witcher.jpg", alt: "Wiedźmin 3: Dziki Gon", nazwa: "Wiedźmin 3: Dziki Gon", cena: "29,99 zł" },
    { img: "gta6.jpg", alt: "GTA 6", nazwa: "GTA 6", cena: "599,99 zł" },
    { img: "fh5.jpg", alt: "Forza Horizon 5", nazwa: "Forza Horizon 5", cena: "149,99 zł" },
];

// Atrybuty doładowań
const doladowaniaProdukty = [
    { img: "v-dolce.jpg", alt: "V-Bucks", nazwa: "1000 V-Dolców", cena: "36,99 zł" },
    { img: "robux.jpg", alt: "Robux", nazwa: "800 Robux", cena: "45,00 zł" },
    { img: "riot-points.jpg", alt: "LoL RP", nazwa: "575 Riot Points", cena: "21,50 zł" },
    { img: "steam-wallet.jpg", alt: "Steam", nazwa: "Steam 20 PLN", cena: "20,00 zł" },
    { img: "psn-card.jpg", alt: "PSN", nazwa: "Karta PSN 50 PLN", cena: "50,00 zł" }
];

// Funkcja wstawiająca produkt do HTML
function wstawProdukt(produkt) {
    return `
        <div class="produkt">
            <img src="${produkt.img}" alt="${produkt.alt}">
            <h3>${produkt.nazwa}</h3>
            <p class="cena">${produkt.cena}</p>
        </div>
    `;
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

    const polecaneContainer = document.getElementById("produkty-polecane");
    if (polecaneContainer) {
        polecaneContainer.innerHTML = polecaneProdukty.map(wstawProdukt).join("");
    }

    const doladowaniaContainer = document.getElementById("produkty-doladowania");
    if (doladowaniaContainer) {
        doladowaniaContainer.innerHTML = doladowaniaProdukty.map(wstawProdukt).join("");
    }
});