// typing effect animation
const typingText = document.getElementById('typing-text');
const roles = ['B.Tech-CSE Student','Python Programmer', 'Frontend Developer'];

let roleIndex = 0;
let charIndex =0;
let isDeleting =false;

function typeText() {
    let currentRole = roles[roleIndex];
    typingText.textContent = currentRole.slice(0, charIndex);

    charIndex += isDeleting ? -1 : 1 ;

    if (!isDeleting && charIndex > currentRole.length){
        isDeleting = true;
        charIndex -= 1;
        setTimeout(typeText, 500);
    }else if (isDeleting && charIndex === 0 ){
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeText, 100);
    }else {
        setTimeout(typeText, isDeleting? 50 : 150);
    }
}

setTimeout(typeText, 1000);


//-----------------------------------------------------------------------------------------------------------------------

// skillBars Animation

const skillBars = document.querySelectorAll('.ss-progress');

// Set initial width to 0 for all bars
document.addEventListener('DOMContentLoaded', function() {
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
});

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight &&
        rect.bottom >= 0
    );
}


const animatedBars = new Set();

function checkAndAnimateBars() {
    skillBars.forEach(bar => {
        
        if (isInViewport(bar) && !animatedBars.has(bar)) {
            const progress = bar.getAttribute("data-progress");
            bar.style.width = progress + '%';
            animatedBars.add(bar); 
        } 

        else if (!isInViewport(bar) && animatedBars.has(bar)) {
            bar.style.width = '0';
            animatedBars.delete(bar);
        }
    });
}


window.addEventListener('scroll', checkAndAnimateBars);


//--------------------------------------------------------------------------------------------------------------------------


// Resume Section download Resume button and resume animation


document.addEventListener('DOMContentLoaded', function() {

    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        // Trigger when element is 20% visible from the bottom
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Select the resume section and r-content
    const resumeSection = document.querySelector('#resume');
    const resumeContent = document.querySelector('.r-content');
    let hasAnimated = false;
    
    // Function to handle scroll event
    function handleScroll() {
        if (isElementInViewport(resumeSection)) {
            if (!hasAnimated) {
                resumeContent.classList.add('animate');
                hasAnimated = true;
            }
        } else {
            // Reset animation when element is out of view
            if (resumeSection.getBoundingClientRect().top > window.innerHeight) {
                resumeContent.classList.remove('animate');
                hasAnimated = false;
            }
        }
    }
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);

    const downloadButton = document.querySelector('#resume button');
    
    downloadButton.addEventListener('click', function() {
        // Create a link to the PDF file
        const link = document.createElement('a');
        link.href = 'My_Resume_Priyanshu_Jangir.pdf'; // Path to your PDF file
        link.download = 'Priyanshu_Jangir_Resume.pdf'; // Name for the downloaded file
        
        // Append to the document, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

//--------------------------------------------------------------------------------------------------------------------------


// toggles button logic

document.addEventListener('DOMContentLoaded', function() {
    
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const projectItems = document.querySelectorAll('.my-projects-content');
    
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            
            this.classList.add('active');
            
            const filterCategory = this.getAttribute('data-toggle').toLowerCase();
          
            projectItems.forEach(item => {
                
                const itemCategories = item.getAttribute('data-category').toLowerCase().split(' ');
                
                if (filterCategory === 'all' || itemCategories.includes(filterCategory)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});