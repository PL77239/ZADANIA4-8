/** PL77239 */

const themeBtn = document.getElementById('theme-btn');
const themeStyle = document.getElementById('theme-style');

const toggleBtn = document.getElementById('toggle-btn');
const projectsSection = document.getElementById('projects-section');

themeBtn.addEventListener('click', () => {
    const currentTheme = themeStyle.getAttribute('href');

    if (currentTheme === 'red.css') {
        themeStyle.setAttribute('href', 'green.css');
        themeBtn.textContent = 'Zmień na Czerwony';
        themeBtn.style.backgroundColor = '#f44336';
    } else {
        themeStyle.setAttribute('href', 'red.css');
        themeBtn.textContent = 'Zmień na Zielony';
        themeBtn.style.backgroundColor = '#4caf50'; 
    }
});

toggleBtn.addEventListener('click', () => {
    projectsSection.classList.toggle('hidden');

    if (projectsSection.classList.contains('hidden')) {
        toggleBtn.textContent = 'Pokaż Projekty';
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
                const formData = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                };

                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Wysyłanie...';
                submitBtn.disabled = true;
                const endpointURL = 'https://webhook.site/064f1db8-70de-4804-84be-59d5e71f8e21'; 

                fetch(endpointURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    if (response.ok) {
                        alert('Dziękujemy! Twoja wiadomość została wysłana i zapisana na serwerze.');
                        form.reset();
                    } else {
                        throw new Error('Błąd serwera');
                    }
                })
                .catch(error => {
                    alert('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.');
                    console.error('Błąd:', error);
                })
                .finally(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
            }
            // --- TUTAJ KOŃCZY SIĘ NOWY KOD ---
        });
    }
});

async function loadDataAndRender() {
    try {
        const response = await fetch('data.json');

        if (!response.ok) {
            throw new Error(`Błąd HTTP: ${response.status}`);
        }
        
        const data = await response.json();

        const skillsList = document.getElementById('skills-list');
        if (skillsList) {
            data.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsList.appendChild(li);
            });
        }

        const projectsList = document.getElementById('projects-list');
        if (projectsList) {
            data.projects.forEach(project => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${project.title}</strong> - ${project.description}`;
                projectsList.appendChild(li);
            });
        }
        loadCustomProjects();

    } catch (error) {
        console.error('Wystąpił problem z pobieraniem danych: ', error);
    }
}

document.addEventListener('DOMContentLoaded', loadDataAndRender);


const addProjectBtn = document.getElementById('add-project-btn');
const newProjectTitle = document.getElementById('new-project-title');
const newProjectDesc = document.getElementById('new-project-desc');
const projectsList = document.getElementById('projects-list');

function getCustomProjects() {
    const projects = localStorage.getItem('myCustomProjects');
    return projects ? JSON.parse(projects) : [];
}

function saveCustomProjects(projects) {
    localStorage.setItem('myCustomProjects', JSON.stringify(projects));
}

function renderCustomProject(project) {
    const li = document.createElement('li');
    li.dataset.id = project.id; 
    
    li.innerHTML = `<strong>${project.title}</strong> - ${project.description}`;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Usuń';
    deleteBtn.className = 'delete-btn';
    
    deleteBtn.addEventListener('click', function() {
        removeCustomProject(project.id, li);
    });

    li.appendChild(deleteBtn);
    projectsList.appendChild(li);
}

function addCustomProject() {
    const title = newProjectTitle.value.trim();
    const desc = newProjectDesc.value.trim();

    if (!title || !desc) {
        alert('Tytuł oraz opis projektu:');
        return;
    }

    const newProject = {
        id: Date.now().toString(),
        title: title,
        description: desc
    };

    const projects = getCustomProjects();
    projects.push(newProject);
    saveCustomProjects(projects);

    renderCustomProject(newProject);

    newProjectTitle.value = '';
    newProjectDesc.value = '';
}

function removeCustomProject(id, liElement) {
    let projects = getCustomProjects();
    projects = projects.filter(p => p.id !== id);
    saveCustomProjects(projects);
    
    liElement.style.opacity = '0';
    setTimeout(() => liElement.remove(), 300);
}

function loadCustomProjects() {
    const projects = getCustomProjects();
    projects.forEach(project => renderCustomProject(project));
}

if (addProjectBtn) {
    addProjectBtn.addEventListener('click', addCustomProject);
}
