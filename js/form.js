const form = document.getElementById("form");

setTimeout(() => {
    form.style.opacity = 1;
}, 100);


// form validation
const validateForm = () => {
    const formType = document.getElementById('formType').innerText;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (formType === 'Log In') {
        let user = {
            email: email.value,
            password: password.value
        };
        let option = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        };
        let fetchedData = fetch('/login-user', option);
        fetchedData.then(res => {
            if (res.ok) {
                return res.json();
            }
            throw Error(res.status);})
            .then(data => {
                alert(data);
                if (data.includes('Successful')) {
                    // divert to login page
                    location.href = '/';
                }
            })
            .catch(err => {
                alert(`Failed to login, ${err}`);
            });
    } else if (formType === 'Register') {
        let user = {
            name: name.value,
            email: email.value,
            password: password.value
        };
        let option = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        };
        let fetchedData = fetch('/register-user', option);
        fetchedData.then(res => {
            if (res.ok) {
                return res.json();
            }
            throw Error(res.status);})
            .then(data => {
                const {name, email} = data;
                alert(`Registration successful for user: ${name}`);
            })
            .catch(err => {
                alert(`Failed to register, ${err}`);
            });
    } else {
        console.log(`Invalid Form Type ${formType}, is it not supported`);
    }
}

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', () => {
    validateForm();
});