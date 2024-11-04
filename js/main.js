// MOSTRAR MENÚ
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Vlidar si la constante existe */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Validamos si la constante existe */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

// QUITAR MENÚ MÓVIL
const navLink = document.querySelectorAll('nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu') 

    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// ENCABEZADO DE SOMBRA
const shadowHeader = () => {
    const header = document.getElementById('header')
    //
    this.scrollY >= 50 ? header.classList.add('shadow-header')
                       : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();

    // Valores de ejemplo, asegúrate de reemplazarlos con tus propios datos
    const serviceID = 'service_haf2uq7';
    const templateID = 'template_u2cvmsp';
    const publicKey = 'B9oLSLIhbEVzXLPdj'; // Reemplaza con tu clave pública

    // Obtener valores del formulario usando el atributo name
    const formData = new FormData(contactForm);
    const userName = formData.get('user_name');
    const userEmail = formData.get('user_email');
    const userSubject = formData.get('user_subject');
    const userMessage = formData.get('user_message');

    // Envío del correo electrónico con EmailJS
    emailjs.send(serviceID, templateID, {
        user_name: userName,
        user_email: userEmail,
        user_subject: userSubject,
        user_message: userMessage
    }, publicKey)
    .then((response) => {
        console.error('Mensaje enviado correctamente', response);

        // Muestra mensaje de confirmación exitosa
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Mensaje enviado correctamente",
            showConfirmButton: false,
            timer: 1500
          });

        contactForm.reset();
    })
    .catch((error) => {
        console.error('Error al enviar el email:', error);

        // Muestra mensaje de error
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error al enviar el mensaje",
            showConfirmButton: false,
            timer: 1500
          });
    });
};

contactForm.addEventListener('submit', sendEmail);

// DESPLAZARSE POR SECCIONES ENLACE ACTIVO
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (sectionsClass) {
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// DARK LIGHT THEME
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if(selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurentTheme())
    localStorage.setItem('selected-icon', getCurentIcon())
})