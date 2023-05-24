const name = sessionStorage.name;
let greeting = document.getElementById('greeting');
greeting.innerHTML = 'Konnichiwa ' + name;

const logoutBtn = document.getElementById('logout');
if (logoutBtn !== null) {
    logoutBtn.addEventListener('click', () => {
        location.href = '/login';
    });
};

