const initialPath = location.pathname;
const loginPath = initialPath + '/login';

const userName = sessionStorage.name;
let greeting = document.getElementById('greeting');
if (userName === undefined) location.href = loginPath;
greeting.innerHTML = 'Konnichiwa ' + userName;

const logoutBtn = document.getElementById('logout');
if (logoutBtn !== null) {
    logoutBtn.addEventListener('click', () => {
        location.href = loginPath;
    });
};

