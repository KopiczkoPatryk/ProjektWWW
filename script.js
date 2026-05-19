const MotywPrzycisk = document.getElementById("motyw-przycisk")
function ZmienMotyw() {
    document.body.classList.toggle("tryb-ciemny");
}

MotywPrzycisk.addEventListener("click", ZmienMotyw);
document.addEventListener('DOMContentLoaded', () => {

    const valid_login = "user1234"
    const valid_password = "1234"

    let isLoggedIn = false;

    const loginBtn = document.getElementById('loginBtn');
    const statusText = loginBtn.querySelector('span');

    loginBtn.addEventListener('click', () => {
        if (isLoggedIn === false) {
            let login = prompt("Podaj login:");
            let password = prompt("Podaj hasło:");

            if (login === valid_login && password === valid_password) {
                isLoggedIn = true;
                statusText.textContent = login;
                alert(`Pomyślnie zalogowano. Witaj ${login}`);
            } else {
                alert("Błędny login lub hasło!");
            }
        }
    });

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (isLoggedIn === true) {
            isLoggedIn = false;
            statusText.textContent = "Zaloguj";
            console.log("Użytkownik wylogowany");
            alert("Wylogowano pomyślnie. Do zobaczenia!");
        }
    });
});

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
document.addEventListener('DOMContentLoaded', () => {
    WstawPolecane(polecane);
});
