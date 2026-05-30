const polecane = [
    { id: 730, nazwa: "Counter-Strike: Global Offensive", cena: "Darmowa" },
    { id: 570, nazwa: "Dota 2", cena: "Darmowa" },
    { id: 440, nazwa: "Team Fortress 2", cena: "Darmowa" },
    { id: 1091500, nazwa: "Cyberpunk 2077", cena: "199,99 zł" },
    { id: 1174180, nazwa: "Red Dead Redemption 2", cena: "249,99 zł" },
    { id: 271590, nazwa: "Grand Theft Auto V", cena: "99,99 zł" },
    { id: 292030, nazwa: "The Witcher 3: Wild Hunt", cena: "89,99 zł" },
    { id: 578080, nazwa: "PLAYERUNKNOWN'S BATTLEGROUNDS", cena: "89,99 zł" }
]

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

function renderBody() {
    const body = document.getElementById("body");
    body.innerHTML = `
        <header class="glowny-header">
            <div class="pasek-gorny">
                <div class="kontener">
                    <a href="index.html" class="przekierowanie-mainpage">
                        <img src="logo.png" href="index.html" width="80" height="80" alt="GameStation - Strona Główna"
                            class="logo-img">
                    </a>
                    <form class="wyszukiwarka">
                        <input type="text" placeholder="Wyszukaj..">
                        <button type="submit">Szukaj</button>
                    </form>
                    <div class="konto-menu">
                        <button><span>User</span></button>
                        <div class="rozwijane-menu" id="rozwijane-menu"></div>
                    </div>
                    <div class="konto-menu">
                        <Button id="motyw-przycisk"><span>Motyw</span></Button>
                    </div>
                </div>
            </div>
            <div class="pasek-dolny">
                <div class="kontener">
                    <div class="kafelki">
                        <ul id="menu-dolne"></ul>
                    </div>
                </div>
            </div>
        </header>
        <div id="banery-reklamowe" class="banery-reklamowe">
        </div>
        <div class="jasna-kategoria">
            <div class="kategoria" id="">
                <h2>Polecane</h2>
                <div class="produkty" id="polecane"></div> 
            </div>
        </div>
        <div class="ciemna-kategoria">
            <div class="kategoria" id=""></div>
        </div>
        <div class="kontener">
            <div class="naglowek">
                <h1>Taniej gier nie znajdziesz, nie no stary mówie ci.</h1>
                <h2>No chyba, że wujek Gaben powie inaczej...</h2>
            </div>
        </div>

        <footer class="stopka">
            Copyright © 2026 GameStation. Wszelkie prawa zastrzeżone.
        </footer>
    `;
}

// Przechwytywanie i wstawianie banerów z zewnętrznej strony.
function ZwrocBaner(id) {
    let baner = `https://cdn.akamai.steamstatic.com/steam/apps/${id}/capsule_616x353.jpg`;
    return `<a href="#" class="baner"><img src="${baner}" alt="Baner ${id}"></a>`;
}

function WstawBanery() {
    let kod = ZwrocBaner(730) + ZwrocBaner(570) + ZwrocBaner(440);
    document.getElementById("banery-reklamowe").innerHTML = kod;
}

function ZwrocOkladke(id) { 
    return `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_600x900.jpg`;
}

function WstawProdukt(id, nazwa, cena) {
    let okladka = ZwrocOkladke(id);
    return `<div class="produkt">
                <img src="${okladka}" alt="Cyberpunk 2077">
                <h3>${nazwa}</h3>
                <p class="cena">${cena}</p>
            </div>`;
}

function WstawProdukty(lista) {
    let kod = "";
    for (let i = 0; i < 5; i++) {
        kod += WstawProdukt(lista[i].id, lista[i].nazwa, lista[i].cena);
    }
    return kod;
}

// Renderowanie na stronie
document.addEventListener("DOMContentLoaded", () => {
    
    renderBody();
    
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
    
    WstawBanery();
    document.getElementById("polecane").innerHTML = WstawProdukty(polecane);
    
    const MotywPrzycisk = document.getElementById("motyw-przycisk")
    if (MotywPrzycisk) {
        MotywPrzycisk.addEventListener("click", () => {
            document.body.classList.toggle("tryb-ciemny")
        });
    }
});

