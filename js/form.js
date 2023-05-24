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
            return res.json();
            })
            .then(data => {
                if (data.warning !== undefined) {
                    alert(data.warning);
                    return;
                }
                if (data.error !== undefined) {
                    const err = new Error();
                    err.message = data.error;
                    throw err;
                }
                // divert to logged in page
                location.href = '/home';
                sessionStorage.name = data.retVal.name;
                return;
            })
            .catch(err => {
                alert(`Failed to login, ${err.message}`);
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
            return res.json();
        }).then(data => {
            if (data.warning !== undefined) {
                alert(data.warning);
                return;
            }
            if (data.error !== undefined) {
                const err = new Error();
                err.message = data.error;
                throw err;
            }
            const {name, email} = data.data;
            alert(`Registration successful for user: ${name}`);
        }).catch(err => {
            alert(`Failed to register, ${err.message}`);
        });
    } else {
        console.log(`Invalid Form Type ${formType}, is it not supported`);
    }
}

// This works but want to avoid if()
const submitBtn = document.getElementById('submit');
if (submitBtn !== null) {
    submitBtn.addEventListener('click', () => {
        validateForm();
    });
};