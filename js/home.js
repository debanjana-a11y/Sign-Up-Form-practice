const loginPath = location.pathname + 'login';
console.log(loginPath);

const userName = sessionStorage.name;
let greeting = document.getElementById('greeting');
if (userName === undefined) location.href = './login';
greeting.innerHTML = 'Konnichiwa ' + userName;

const logoutBtn = document.getElementById('logout');
if (logoutBtn !== null) {
    logoutBtn.addEventListener('click', () => {
        location.href = loginPath;
    });
};

