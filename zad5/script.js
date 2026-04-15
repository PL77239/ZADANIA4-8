/** PL77239 */

const themeBtn = document.getElementById('theme-btn');
const themeStyle = document.getElementById('theme-style');

const toggleBtn = document.getElementById('toggle-btn');
const projectsSection = document.getElementById('projects-section');

themeBtn.addEventListener('click', () => {
    const currentTheme = themeStyle.getAttribute('href');

    if (currentTheme === 'red.css') {
        themeStyle.setAttribute('href', 'green.css');
        themeBtn.textContent = 'Zmieñ na Czerwony';
        themeBtn.style.backgroundColor = '#f44336';
    } else {
        themeStyle.setAttribute('href', 'red.css');
        themeBtn.textContent = 'Zmieñ na Zielony';
        themeBtn.style.backgroundColor = '#4caf50'; 
    }
});

toggleBtn.addEventListener('click', () => {
    projectsSection.classList.toggle('hidden');

    if (projectsSection.classList.contains('hidden')) {
        toggleBtn.textContent = 'Poka¿ Projekty';
    } else {
        toggleBtn.textContent = 'Ukryj Projekty';
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            let isValid = true;

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
//regex
            const hasNumber = /\d/; 
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

            if (!firstName) {
                document.getElementById('firstNameError').textContent = 'Imię jest wymagane.';
                isValid = false;
            } else if (hasNumber.test(firstName)) {
                document.getElementById('firstNameError').textContent = 'Imię nie może zawierać cyfr.';
                isValid = false;
            }

            if (!lastName) {
                document.getElementById('lastNameError').textContent = 'Nazwisko jest wymagane.';
                isValid = false;
            } else if (hasNumber.test(lastName)) {
                document.getElementById('lastNameError').textContent = 'Nazwisko nie może zawierać cyfr.';
                isValid = false;
            }

            if (!email) {
                document.getElementById('emailError').textContent = 'Adres e-mail jest wymagany.';
                isValid = false;
            } else if (!emailPattern.test(email)) {
                document.getElementById('emailError').textContent = 'Podaj poprawny format e-mail (np. jan@domena.pl).';
                isValid = false;
            }

            if (!message) {
                document.getElementById('messageError').textContent = 'Treść wiadomości jest wymagana.';
                isValid = false;
            }

            if (isValid) {
                alert('Formularz został poprawnie zwalidowany! (Frontend działa, brak wysyłki na serwer)');
                form.reset();
            }
        });
    }
});
