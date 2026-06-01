let polecane = [];

const menuRozwijaneAtrybut = [
    { href: "#", icon: "fa-circle-user", text: "Konto"},
    { href: "#/koszyk", icon: "fa-basket-shopping", text: "Koszyk"},
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

async function PobierzPopularneGry() {
    try {
        const response = await fetch('gry.json');
        if (!response.ok) throw new Error("Błąd ładowania Mock API");
        
        const bazaGier = await response.json();
        const wszystkieIds = Object.keys(bazaGier);

        for (let i = wszystkieIds.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wszystkieIds[i], wszystkieIds[j]] = [wszystkieIds[j], wszystkieIds[i]];
        }

        const wylosowaneIds = wszystkieIds.slice(0, 5);

        polecane = wylosowaneIds.map(id => {
            const gra = bazaGier[id];
            
            return {
                id: parseInt(id),
                nazwa: gra.name,
                cena: gra.price || "Brak ceny"
            };
        });

    } catch (e) {
        console.error("Mock API nie działa, ładowanie listy awaryjnej:", e);
        polecane = [
            { id: 1091500, nazwa: "Cyberpunk 2077", cena: "199,00 zł" },
            { id: 1174180, nazwa: "Red Dead Redemption 2", cena: "249,00 zł" },
            { id: 271590, nazwa: "Grand Theft Auto V", cena: "129,90 zł" },
            { id: 271590, nazwa: "Wiedźmin 3: Dziki Gon", cena: "149,99 zł" }
        ];
    }
}

async function BodyStronaGlowna() {
    const tresc = document.getElementById("tresc");
    tresc.innerHTML = `<div class="kontener"><h2>Ładowanie najlepszych ofert...</h2></div>`;
    await PobierzPopularneGry();
    
    tresc.innerHTML = `
        <header class="glowny-header">
            <div class="pasek-gorny">
                <div class="kontener">
                    <a href="#" class="przekierowanie-mainpage">
                        <img src="logo.png" width="80" height="80" alt="GameStation - Strona Główna"
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
        <div id="banery-reklamowe" class="banery-reklamowe"></div>
        <div class="jasna-kategoria">
            <div class="kategoria">
                <h2>Polecane</h2>
                <div class="produkty" id="polecane"></div> 
            </div>
        </div>
        <div class="ciemna-kategoria">
            <div class="kategoria"></div>
        </div>
        <div class="kontener">
            <div class="naglowek">
                <h1>Taniej gier nie znajdziesz, nie no stary mówie ci.</h1>
                <h2>No chyba, że wujek Gaben powie inaczej...</h2>
            </div>
        </div>

        <div class="stopka">
            <footer>Copyright © 2026 GameStation. Wszelkie prawa zastrzeżone.</footer>
        </div>
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
        <header class="glowny-header">
            <div class="pasek-gorny">
                <div class="kontener">
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
            <div class="pasek-dolny">
                <div class="kontener">
                    <div class="kafelki">
                        <ul id="menu-dolne"></ul>
                    </div>
                </div>
            </div>
        </header>

        <div class="kontener">
            <div class="szczegoly-produktu">
                <div class="okladka-duza">
                    <img src="${ZwrocOkladke(produkt.id)}" alt="${produkt.nazwa}">
                </div>
                <div class="info-produktu">
                    <h1>${produkt.nazwa}</h1>
                    <p class="cena">${produkt.cena}</p>
                    <p>To jest szczegółowy opis gry ${produkt.nazwa}. Kupując u nas masz gwarancję najniższej ceny oraz błyskawicznej dostawy klucza cyfrowego!</p>
                    <button>Kup teraz</button>
                    <button id="przycisk-koszyk">Dodaj do koszyka</button>
                </div>
            </div>
            <div class="kontener">
                <a class="przycisk-powrot" href="#"><i class="fa-solid fa-arrow-left"></i> Powrót do sklepu</a>
            </div>
        </div>
        <div class="kontener">
            <div class="naglowek">
                <h1>Taniej gier nie znajdziesz, nie no stary mówie ci.</h1>
                <h2>No chyba, że wujek Gaben powie inaczej...</h2>
            </div>
        </div>

        <div class="stopka">
            <footer>Copyright © 2026 GameStation. Wszelkie prawa zastrzeżone.</footer>
        </div>
    `;

    LadujWpolneElem();
}

function BodyKoszyk() {
    const tresc = document.getElementById("tresc");

    tresc.innerHTML = `
        <header class="glowny-header">
            <div class="pasek-gorny">
                <div class="kontener">
                    <a href="#" class="przekierowanie-mainpage">
                        <img src="logo.png" width="80" height="80" alt="GameStation - Strona Główna"
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
        <div class="kontener">
            <div class="koszyk-kontener">
                <h1>Twój Koszyk</h1>
                <div id="zawartosc-koszyka">
                    <p>Koszyk jest pusty.</p>
                </div>
                <br>
                <a class="przycisk-powrot" href="#"><i class="fa-solid fa-arrow-left"></i> Powrót do sklepu</a>
            </div>
        </div>
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
    LadujWpolneElem();
}

// Przechwytywanie i wstawianie banerów z zewnętrznej strony.
function ZwrocBaner(id) {
    let baner = `https://cdn.akamai.steamstatic.com/steam/apps/${id}/capsule_616x353.jpg`;
    return `<a href="#" class="baner"><img src="${baner}" alt="Baner ${id}"></a>`;
}

function WstawBanery() {
    let kod = ZwrocBaner(1091500) + ZwrocBaner(1174180) + ZwrocBaner(271590);
    
    
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
    const limit = Math.min(lista.length, 5);
    for (let i = 0; i < limit; i++) {
        kod += WstawProdukt(lista[i].id, lista[i].nazwa, lista[i].cena);
    }
    return kod;
}

function LadujWpolneElem() {
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

// Renderowanie na stronie
document.addEventListener("DOMContentLoaded", () => {
    ZmianaStrony();
    window.addEventListener("hashchange", ZmianaStrony);
});

