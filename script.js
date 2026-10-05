// Week 7: Interactive Portfolio
// Your mission: Add JavaScript interactivity to your static portfolio!

// ============================================
// PART 1: SMOOTH SCROLL NAVIGATION (15 min)
// ============================================

// TODO: Select all navigation links
// Hint: Use querySelectorAll with the class '.nav-link'
const navLinks = document.querySelectorAll('.nav-link');

// TODO: Add click event listeners to each nav link
// Hint: Use forEach to loop through navLinks
// For each link:
//   1. Add 'click' event listener
//   2. Prevent default link behavior (preventDefault)
//   3. Get the href attribute to find target section
//   4. Use scrollIntoView() to smoothly scroll to that section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// BONUS: Update active nav link on scroll
// TODO: Add scroll event listener to window
// Hint: As user scrolls, highlight the nav link for the current section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));

            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});


// ============================================
// PART 2: PROJECT FILTERING (20 min)
// ============================================

// TODO: Select all filter buttons
// Hint: Use querySelectorAll with the class '.filter-btn'
const filterButtons = document.querySelectorAll('.filter-btn');

// TODO: Select all project cards
// Hint: Use querySelectorAll with the class '.project-card'
const projectCards = document.querySelectorAll('.project-card');

// TODO: Add click event listeners to filter buttons
// For each button:
//   1. Add 'click' event listener
//   2. Remove 'active' class from all buttons
//   3. Add 'active' class to clicked button
//   4. Get the data-filter attribute from clicked button
//   5. Filter project cards based on their data-category attribute
//      - If filter is 'all', show all cards
//      - Otherwise, show only cards matching the filter
//   6. Use style.display to show ('block') or hide ('none') cards

// Hint: To get a data attribute, use element.dataset.filter or element.getAttribute('data-filter')
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        filterProjects(filterValue);
    });
});


// ============================================
// PART 3: MOBILE MENU TOGGLE (10 min)
// ============================================

// TODO: Select the mobile menu toggle button
// Hint: Use querySelector with the class '.nav-toggle'
const navToggle = document.querySelector('.nav-toggle');

// TODO: Select the navigation menu
// Hint: Use querySelector with the class '.nav-menu'
const navMenu = document.querySelector('.nav-menu');

// TODO: Add click event listener to toggle button
// When clicked:
//   1. Toggle 'active' class on navMenu
//   2. Toggle 'active' class on navToggle (for hamburger animation)
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// BONUS: Close menu when a nav link is clicked
// TODO: Add click listeners to nav links to close the mobile menu
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    });
});


// ============================================
// PART 4: SKILL ANIMATIONS (15 min)
// ============================================

// TODO: Select all skill progress bars
// Hint: Use querySelectorAll with the class '.skill-progress'
const skillBars = document.querySelectorAll('.skill-progress');

// TODO: Create a function to animate skills when they come into view
// Hint: Add a scroll event listener
// When skills section is visible:
//   1. For each skill bar, animate its width from 0 to the --skill-level value
//   2. Use the style property to set the width
//   3. Add a CSS transition for smooth animation
function animateSkills() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;

    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (skillsPosition < screenPosition) {
        skillBars.forEach(bar => {
            const skillLevel = bar.style.getPropertyValue('--skill-level');
            bar.style.width = skillLevel;
        });
    }
}

window.addEventListener('scroll', animateSkills);
animateSkills(); // Run once on load in case skills are already visible

// Advanced: Use Intersection Observer for better performance (optional)


// ============================================
// PART 5: FORM VALIDATION (20 min)
// ============================================

// TODO: Select the contact form
// Hint: Use querySelector with the id '#contact-form'
const contactForm = document.querySelector('#contact-form');

// TODO: Select form inputs
const nameInput = document.querySelector('#name'); // querySelector for #name
const emailInput = document.querySelector('#email'); // querySelector for #email
const messageInput = document.querySelector('#message'); // querySelector for #message

// TODO: Create validation functions

// Function to validate email format
function isValidEmail(email) {
    // Hint: Use a simple regex or check for @ and .
    // Example: return email.includes('@') && email.includes('.');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show error message
function showError(input, message) {
    // TODO:
    // 1. Create a span element for error message
    // 2. Set its textContent to the message
    // 3. Add a class 'error-message' for styling
    // 4. Append it after the input field
    // Hint: Use createElement, classList.add, and appendChild
    clearError(input); // remove any existing error first

    const error = document.createElement('span');
    error.textContent = message;
    error.classList.add('error-message');

    input.classList.add('error');
    input.classList.remove('success');

    input.parentElement.appendChild(error);
}

// Function to clear error message
function clearError(input) {
    // TODO:
    // 1. Find the error message element (next sibling)
    // 2. Remove it from the DOM
    // Hint: Use querySelector or nextElementSibling and remove()
    const error = input.parentElement.querySelector('.error-message');
    if (error) {
        error.remove();
    }
    input.classList.remove('error');
}

// Function to show success state
function showSuccess(input) {
    clearError(input);
    input.classList.add('success');
}

// TODO: Add 'input' event listeners for real-time validation
// For name input:
//   - Check if value length > 0
//   - Show/clear error accordingly
if (nameInput) {
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
        } else {
            showSuccess(nameInput);
        }
    });
}

// For email input:
//   - Check if email is valid using isValidEmail()
//   - Show/clear error accordingly
if (emailInput) {
    emailInput.addEventListener('input', () => {
        if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
        } else {
            showSuccess(emailInput);
        }
    });
}

// For message input:
//   - Check if value length > 10
//   - Show/clear error accordingly
if (messageInput) {
    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
        } else {
            showSuccess(messageInput);
        }
    });
}

// TODO: Add 'submit' event listener to form
// When submitted:
//   1. Prevent default form submission
//   2. Validate all fields
//   3. If all valid:
//      - Show success message
//      - Clear form fields
//   4. If invalid:
//      - Show error messages
//      - Don't submit
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        }

        if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }

        if (isValid) {
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.appendChild(successMsg);

            setTimeout(() => {
                contactForm.reset();
                successMsg.remove();
                document.querySelectorAll('.success').forEach(input => {
                    input.classList.remove('success');
                });
            }, 3000);
        }
    });
}


// ============================================
// EXTENSION ACTIVITIES (after Parts 1 to 5)
// ============================================

// See the README's "Extension Activities" section: three tiers of tasks with
// the requirement, what done looks like, one hint, and why it matters.
// No code is given for them on purpose. Add your extension code below Part 5.


// ============================================
// HELPFUL TIPS & REMINDERS
// ============================================

// DOM Selection:
// - querySelector() returns first matching element
// - querySelectorAll() returns NodeList of all matching elements
// - Use forEach() to loop through NodeList

// Event Listeners:
// - addEventListener('event', function)
// - Common events: 'click', 'submit', 'input', 'scroll'
// - Use event.preventDefault() to stop default behavior

// Class Manipulation:
// - classList.add('classname')
// - classList.remove('classname')
// - classList.toggle('classname')

// Style Manipulation:
// - element.style.property = 'value'
// - element.style.display = 'none' or 'block'

// Data Attributes:
// - HTML: data-category="frontend"
// - JS: element.dataset.category or element.getAttribute('data-category')

// Creating Elements:
// - document.createElement('tagname')
// - element.textContent = 'text'
// - element.classList.add('classname')
// - parentElement.appendChild(element)

// Good luck! Remember to test frequently and use console.log() to debug!