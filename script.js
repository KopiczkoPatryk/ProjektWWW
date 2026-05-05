document.addEventListener('DOMContentLoaded', () => {
    let isLoggedIn = false; 
    
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const statusText = loginBtn.querySelector('span');

    loginBtn.addEventListener('click', () => {
        // Operator identyczności (strict comparison)
        if (isLoggedIn === false) {
            isLoggedIn = true;
            statusText.textContent = "User1234";
            alert("Zalogowano pomyślnie!");
        }
    });

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (isLoggedIn === true) {
            isLoggedIn = false;
            statusText.textContent = "Zaloguj";
            console.log("Użytkownik wylogowany");
        }
    });
});