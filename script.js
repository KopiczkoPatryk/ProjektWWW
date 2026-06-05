let polecane = [];
let koszyk = [];

const menuRozwijaneAtrybut = [
    { href: "#", icon: "fa-circle-user", text: "Konto" },
    { href: "#/koszyk", icon: "fa-basket-shopping", text: "Koszyk" },
    { href: "#", icon: "fa-arrow-right-from-bracket", text: "Wyloguj" }
];

const menuAtrybut = [
    { href: "#", icon: "fa-bars", text: "Kategorie" },
    { href: "#", icon: "fa-piggy-bank", text: "Tanie gry" },
    { href: "#", icon: "fa-key", text: "Klucze" },
    { href: "#", icon: "fa-dice", text: "Losowe klucze" },
    { href: "#", icon: "fa-hand-holding-dollar", text: "Prepaid" },
];


async function PobierzPopularneGry() {
    try {
        const response = await fetch('http://localhost:3000/api/steam-games');
        if (!response.ok) throw new Error(`Status: ${response.status}`);

        const bazaGier = await response.json();
        const wyniki = [];

        for (const gra of bazaGier) {

            if (wyniki.length >= 12) break;
            const id = gra.appid;
            let cena = "Brak ceny";

            try {
                const responseGG = await fetch(`http://localhost:3000/api/game/${id}`);
                if (responseGG.ok) {
                    const daneGG = await responseGG.json();
                    if (daneGG.data && daneGG.data[id]) {
                        const ceny = daneGG.data[id].prices;
                        const klucze = ceny.currentKeyshops;
                        const sklep = ceny.currentRetail;

                        if (klucze && klucze != "null") {
                            cena = `${klucze} PLN`;
                        } else if (sklep && sklep != "null") {
                            cena = `${sklep} PLN`;
                        }
                    }
                }
            } catch (errorGG) {
                console.warn(`Brak ceny dla ID ${id}`);
            }

            wyniki.push({
                id: parseInt(id),
                nazwa: gra.name,
                cena: cena
            });
        }

        polecane = wyniki;

    } catch (e) {
        console.error("Główny błąd PobierzPopularneGry, ładuję listę awaryjną:", e);
        polecane = [
            { id: 1091500, nazwa: "Cyberpunk 2077", cena: "199,00 zł" },
            { id: 1174180, nazwa: "Red Dead Redemption 2", cena: "249,00 zł" },
            { id: 271590, nazwa: "Grand Theft Auto V", cena: "129,90 zł" },
            { id: 1245620, nazwa: "Elden Ring", cena: "249,00 zł" }
        ];
    }
}

async function BodyStronaGlowna() {
    const tresc = document.getElementById("tresc");
    
    if (polecane.length === 0) {
        tresc.innerHTML = `<div class="kontener"><h2>Ładowanie najlepszych ofert...</h2></div>`;
        return;
    }

    tresc.innerHTML = `
        <header class="glowny-header" id="glowny-header"></header>

        <div id="banery-reklamowe" class="banery-reklamowe"></div>
        <div class="jasna-kategoria">
            <div class="kategoria">
                <h2>Wyróżnione oferty</h2>
                <div class="produkty" id="polecane"></div> 
            </div>
        </div>
        
        <div id="dolna-sekcja"></div>
    `;

    LadujWpolneElem();
    WstawBanery();
    document.getElementById("polecane").innerHTML = WstawProdukty(polecane);
}

function BodySczegolyProduktu(produktId) {
    const produkt = polecane.find(p => p.id === parseInt(produktId));

    if (!produkt) {
        document.getElementById("tresc").innerHTML = `<h1>Nie znaleziono produktu</h1><a href="#">Powrót do strony głównej</a>`;
        return;
    }

    const tresc = document.getElementById("tresc");
    tresc.innerHTML = `
        <header class="glowny-header" id="glowny-header"></header>

        <div class="kontener">
            <div class="karta-produktu">
                <div class="szczegoly-produktu">
                    <div class="okladka-duza">
                        <img src="${ZwrocOkladke(produkt.id)}" alt="${produkt.nazwa}">
                    </div>
                    <div class="info-produktu">
                        <h1>${produkt.nazwa}</h1>
                        <p class="cena">${produkt.cena}</p>
                        <p>To jest szczegółowy opis gry ${produkt.nazwa}. Kupując u nas masz gwarancję najniższej ceny oraz błyskawicznej dostawy klucza cyfrowego!</p>
                        <button>Kup teraz</button>
                        <button id="przycisk-koszyk" onclick="DodajDoKoszyka(${produkt.id})">Dodaj do koszyka</button>
                    </div>
                </div>
                <div class="info-stopka">
                    <a class="przycisk-powrot" href="#"><i class="fa-solid fa-arrow-left"></i> Powrót do sklepu</a>
                </div>
            </div>
        </div>

        <div id="dolna-sekcja"></div>
    `;

    LadujWpolneElem();
}

function BodyKoszyk() {
    const tresc = document.getElementById("tresc");

    tresc.innerHTML = `
        <header class="glowny-header" id="glowny-header"></header>
        <div class="kontener">
            <div class="koszyk-kontener">
                <h1>Twój Koszyk</h1>
                <div id="zawartosc-koszyka">
                    ${WstawProduktKoszyk()}
                </div>
                <div class="koszyk-stopka">
                    <a class="przycisk-powrot" href="#"><i class="fa-solid fa-arrow-left"></i> Powrót do sklepu</a>
                    ${koszyk.length > 0 ? '<button class="przycisk-kup">Przejdź do płatności</button>' : ''}
                </div>
            </div>
        </div>
        
        <div id="dolna-sekcja"></div>
    `
    LadujWpolneElem();
}

function ZwrocBaner(id) {
    let baner = `https://cdn.akamai.steamstatic.com/steam/apps/${id}/capsule_616x353.jpg`;
    return `<a href="#/produkt/${id}" class="baner"><img src="${baner}" alt="Baner ${id}"></a>`;
}

function WstawBanery() {
    let baner1 = ZwrocBaner(polecane[0].id);
    let baner2 = ZwrocBaner(polecane[1].id);
    let baner3 = ZwrocBaner(polecane[2].id);

    let kod = baner1 + baner2 + baner3;
    document.getElementById("banery-reklamowe").innerHTML = kod;
}

function ZwrocOkladke(id) {
    return `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_600x900.jpg`;
}

function WstawProdukt(id, nazwa, cena) {
    let okladka = ZwrocOkladke(id);
    let obrazekZastepczy = "https://placehold.co/600x900?text=Brak+Okładki";
    return `
            <div class="produkt" style="cursor: pointer;" onclick="window.location.hash='#/produkt/${id}'">
                <img src="${okladka}" alt="${nazwa}" onerror="this.onerror=null; this.src='${obrazekZastepczy}';">
                <h3>${nazwa}</h3>
                <p class="cena">${cena}</p>
            </div>
            `;
}

function WstawProdukty(lista) {
    let kod = "";
    const limit = Math.min(lista.length, 12);
    for (let i = 0; i < limit; i++) {
        kod += WstawProdukt(lista[i].id, lista[i].nazwa, lista[i].cena);
    }
    return kod;
}

function LadujWpolneElem() {
    const glownyHeader = document.getElementById("glowny-header");
    if (glownyHeader) {
        glownyHeader.innerHTML = `
                <div class="pasek-gorny">
                    <div class ="kontener">
                        <a href="#" class="przekierowanie-mainpage">
                            <img src="logo.png" width="80" height="80" alt="GameStation - Strona Główna" class="logo-img">
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
                         
            `
    }

    const dolnaSekcja = document.getElementById("dolna-sekcja");
    if (dolnaSekcja) {
        dolnaSekcja.innerHTML = `
                <div class="kontener">
                    <div class="naglowek">
                        <h1>Taniej gier nie znajdziesz, nie no stary mówie ci.</h1>
                        <h2>No chyba, że wujek Gaben powie inaczej...</h2>
                    </div>
                </div>

                <div class="stopka">
                    <footer>Copyright © 2026 GameStation. Wszelkie prawa zastrzeżone.</footer>
                </div>           
            `
    }

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

    const MotywPrzycisk = document.getElementById("motyw-przycisk");
    if (MotywPrzycisk) {
        MotywPrzycisk.addEventListener("click", () => {
            document.body.classList.toggle("tryb-ciemny");
        });
    }
}

function DodajDoKoszyka(produktId) {
    const produkt = polecane.find(p => p.id == parseInt(produktId));
    if (produkt) {
        koszyk.push(produkt);
        alert("Dodano produkt do koszyka.")
    } else {
        alert("Nie udało się dodać produktu.")
    }
}

function UsunZKoszyka(produktId) {
    const produkt = koszyk.findIndex(p => p.id === parseInt(produktId));

    if (produkt !== -1) {
        koszyk.splice(produkt, 1);

        const zawartosc = document.getElementById("zawartosc-koszyka");
        if (zawartosc) {
            zawartosc.innerHTML = WstawProduktKoszyk();
        }

        BodyKoszyk();
    }
}

function WstawProduktKoszyk() {
    if (koszyk.length === 0) {
        return '<p class="koszyk-pusty">Twój koszyk jest pusty.</p>';
    }

    return koszyk.map(gra => `
        <div class="koszyk-element">
            <div class="koszyk-produkt-info">
                <img src="${ZwrocOkladke(gra.id)}" alt="${gra.nazwa}" class="koszyk-okladka">
                <span class="koszyk-nazwa">${gra.nazwa}</span>
            </div>
            <span class="koszyk-cena">${gra.cena}</span>
            <button class="usun-z-koszyka" onclick="UsunZKoszyka(${gra.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
    `).join('');
}

function ZmianaStrony() {
    const hash = window.location.hash;

    if (hash.startsWith("#/produkt/")) {
        const id = hash.split("/")[2];
        BodySczegolyProduktu(id);
    } else if (hash === "#/koszyk") {
        BodyKoszyk();
    } else {
        BodyStronaGlowna();
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    ZmianaStrony();
    await PobierzPopularneGry();
    ZmianaStrony();
    window.addEventListener("hashchange", ZmianaStrony);
});