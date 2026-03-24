document.getElementById('przycisk-motywu')?.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
});

function wezUlubione() {
    let dane = localStorage.getItem('lista_ulubionych');
    if (dane) {
        return JSON.parse(dane);
    } else {
        return [];
    }
}

function zapiszUlubione(lista) {
    localStorage.setItem('lista_ulubionych', JSON.stringify(lista));
    aktualizujLicznik();
}

function aktualizujLicznik() {
    let lista = wezUlubione();
    let licznikElement = document.getElementById('licznik-ulubionych');
    if (licznikElement) {
        licznikElement.innerText = lista.length;
    }
}

function dodajUsunUlubione(id) {
    let lista = wezUlubione();
    let pozycja = lista.indexOf(id);

    if (pozycja === -1) {
        lista.push(id);
    } else {
        lista.splice(pozycja, 1);
    }

    zapiszUlubione(lista);
    startAplikacji();
}

async function startAplikacji() {
    aktualizujLicznik();
    let kontener = document.getElementById('miejsce-na-produkty');
    if (!kontener) return;

    let response = await fetch('produkty.json');
    let dane = await response.json();
    let produkty = dane.oferty;

    let ulubioneIds = wezUlubione();
    let widok = document.querySelector('main').id;
    let wynikHtml = "";

    for (let i = 0; i < produkty.length; i++) {
        let produkt = produkty[i];
        let czyWyswietlic = false;

        if (widok === "widok-glowny" && i < 4) {
            czyWyswietlic = true;
        } else if (widok === "widok-ulubionych" && ulubioneIds.includes(produkt.id)) {
            czyWyswietlic = true;
        } else if (widok === "widok-szukania") {
            let szukanaFraza = new URLSearchParams(window.location.search).get('q') || "";
            let nazwaMala = produkt.nazwa.toLowerCase();
            let kategoriaMala = produkt.kategoria.toLowerCase();
            let frazaMala = szukanaFraza.toLowerCase();

            if (nazwaMala.includes(frazaMala) || kategoriaMala.includes(frazaMala)) {
                czyWyswietlic = true;
                document.getElementById('napis-wynikow').innerText = "Wyniki dla: " + szukanaFraza;
            }
        }

        if (czyWyswietlic) {
            let tekstPrzycisku = ulubioneIds.includes(produkt.id) ? "USUŃ" : "DO ULUBIONYCH";
            wynikHtml += `
                <div class="karta-produktu">
                    <div class="obrazek-box">
                        <img src="https://loremflickr.com/200/200/${produkt.fotoTag}">
                    </div>
                    <div class="info-box">
                        <h3>${produkt.nazwa}</h3>
                        <div class="cechy">
                            <span class="etykieta">${produkt.kategoria}</span>
                            <span class="etykieta-portal">${produkt.portal}</span>
                            <span class="etykieta">${produkt.lokalizacja}</span>
                        </div>
                    </div>
                    <div class="akcje-box">
                        <span class="cena-tekst">${produkt.cena}</span>
                        <button class="przycisk-zakup">KUP TERAZ</button>
                        <button class="przycisk-ulubione" onclick="dodajUsunUlubione(${produkt.id})">
                            <i class="fa-solid fa-heart"></i> ${tekstPrzycisku}
                        </button>
                    </div>
                </div>
            `;
        }
    }

    if (wynikHtml === "") {
        kontener.innerHTML = "<p style='text-align:center; padding:20px;'>Brak produktów do wyświetlenia.</p>";
    } else {
        kontener.innerHTML = wynikHtml;
    }
}

document.addEventListener('DOMContentLoaded', startAplikacji);