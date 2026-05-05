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

