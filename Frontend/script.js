document.addEventListener('DOMContentLoaded', () => {

    const BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:9009' 
    : 'https://cyberpal.onrender.com';


    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');
    const nistForm = document.getElementById('nistForm');
    const saveButton = document.getElementById('saveButton');
    const finishButton = document.getElementById('finishScoring');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const ciobtn = document.getElementById('cio-btn');
    const techbtn = document.getElementById('tech-btn');
    const isobtn = document.getElementById('iso-btn');
  
    
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${BASE_URL}/api/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    message.textContent = 'Registration successful!';
                    message.className = 'success';
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                } else {
                    message.textContent = data.message || 'Registration failed.';
                    message.className = 'error';
                }
            } catch (error) {
                console.error('Error:', error);
                message.textContent = 'An error occurred. Please try again.';
                message.className = 'error';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${BASE_URL}/api/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    message.textContent = 'Login successful!';
                    message.className = 'success';
                    localStorage.setItem('token', data.token);
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 2000);
                } else {
                    message.textContent = data.message || 'Login failed.';
                    message.className = 'error';
                }
            } catch (error) {
                console.error('Error:', error);
                message.textContent = 'An error occurred. Please try again.';
                message.className = 'error';
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            console.log('Button clicked');
            window.location.href = 'Identify.html';
        });
    }

    if (nistForm) {
        nistForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                identify: document.getElementById('identify').value,
                protect: document.getElementById('protect').value,
                detect: document.getElementById('detect').value,
                respond: document.getElementById('respond').value,
                recover: document.getElementById('recover').value,
                comments: document.getElementById('comments').value
            };

            try {
                const response = await fetch(`${BASE_URL}/api/users/response`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Form submitted successfully!');
                    nistForm.reset();
                } else {
                    const errorData = await response.json();
                    alert('Form submission failed: ' + (errorData.message || 'Please try again.'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    if (saveButton) {
        saveButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const category = document.getElementById('category').value;
            const subcategory = document.getElementById('subcategory').value;
            const score = document.getElementById('score').value;
            const comments = document.getElementById('comments').value;

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${BASE_URL}/api/scores`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ category, subcategory, score, comments })
                });

                if (response.ok) {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        const data = await response.json();
                        alert(data.message);
                    } else {
                        alert('Score saved successfully!');
                    }
                } else {
                    const errorText = await response.text();
                    alert(`Failed to save score. Server response: ${errorText}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    if (ciobtn) {
        ciobtn.addEventListener('click', () => {
            window.location.href = 'cio.html';
        });
    } else {
        console.error('Element with ID "cio-btn" not found');
    }

    if (isobtn) {
        isobtn.addEventListener('click', () => {
            window.location.href = 'iso.html';
        });
    } else {
        console.error('Element with ID "iso-btn" not found');
    }

    if (techbtn) {
        techbtn.addEventListener('click', () => {
            window.location.href = 'Tech.html';
        });
    } else {
        console.error('Element with ID "tech-btn" not found');
    }
});