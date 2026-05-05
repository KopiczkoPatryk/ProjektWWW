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

            if(login === valid_login && password === valid_password) {
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