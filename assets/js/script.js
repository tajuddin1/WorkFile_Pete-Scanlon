gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/* Main navigation */
const panelsSection = document.querySelector("#panels"),
  panelsContainer = document.querySelector("#panels-container"),
  navItems = document.querySelectorAll(".nav-item"),
  panels = gsap.utils.toArray("#panels-container .panel");

let horizontalTween; // Store the horizontal tween for cleanup

function setupScrollBehavior() {
  const isHorizontal = window.innerWidth >= 992;

  if (isHorizontal) {
    // Clean up existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Horizontal scrolling
    horizontalTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top",
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1000),
          duration: { min: 0.2, max: 0.5 },
          ease: "power1.inOut",
        },
        end: () => "+=" + (panelsContainer.offsetWidth - window.innerWidth),
      },
    });
  } else {
    // Clean up horizontal tween
    if (horizontalTween) {
      horizontalTween.scrollTrigger.kill();
      horizontalTween.kill();
      horizontalTween = null;
    }

    // Reset panel container transform for vertical scrolling
    gsap.set(panelsContainer, { clearProps: "all" });

    // Allow default vertical scrolling
    panels.forEach((panel) => {
      gsap.set(panel, { clearProps: "all" });
    });
  }
}

// Call setup on load and resize
window.addEventListener("load", setupScrollBehavior);
window.addEventListener("resize", setupScrollBehavior);

// Navigation item click logic
navItems.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    navItems.forEach((item) => item.classList.remove("is--active"));
    anchor.classList.add("is--active");

    const targetElem = document.querySelector(e.target.getAttribute("href"));

    if (window.innerWidth >= 992 && targetElem) {
      // Horizontal scrolling
      const totalScroll =
          horizontalTween.scrollTrigger.end -
          horizontalTween.scrollTrigger.start,
        totalMovement = (panels.length - 1) * targetElem.offsetWidth,
        scrollPos =
          horizontalTween.scrollTrigger.start +
          (targetElem.offsetLeft / totalMovement) * totalScroll;

      gsap.to(window, {
        scrollTo: { y: scrollPos, autoKill: false },
        duration: 1,
      });
    } else if (targetElem) {
      // Vertical scrolling
      targetElem.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Reset to the first panel on page load
function resetToFirstPanel() {
  navItems.forEach((item) => item.classList.remove("is--active"));
  navItems[0].classList.add("is--active");

  if (window.innerWidth >= 992) {
    gsap.to(window, {
      scrollTo: { y: panels[0], autoKill: false },
      duration: 1,
    });
  }
}
window.addEventListener("load", resetToFirstPanel);


    $(document).ready(function () {
      let currentItemId = null;

      $('.gallery-item').click(function () {
        const itemId = $(this).data('id');
        currentItemId = itemId;
        openModal(itemId);
      });

      function openModal(itemId) {
        const item = items[itemId];

        const imagesHtml = item.images.map(img => {
          return `<div class="works-details-item border border-1_5 border-black overflow-hidden rounded-3"><img src="${img}" alt="Item Image" class="img-fluid w-100 h-100 object-fit-cover"></div>`;
        }).join('');

        const cardHtml = `
          <div class="works-details-item border border-1_5 border-black overflow-hidden rounded-3 d-flex">
            <div class="card flex-grow-1">
              <div class="card-body d-flex gap-2 flex-column justify-content-center">
                <p class="card-text fw-bold mb-0">${item.card.title}</p>
                <p class="card-text mb-0">${item.card.description}</p>
                <p class="card-text mb-0">${item.card.footer}</p>
              </div>
            </div>
          </div>
        `;

        const modalContent = `
          <h4 class="mb-2 fw-bold f-p text-center">${item.description}</h4>
          <div class="works-details-grid d-grid">
            ${imagesHtml}
            ${cardHtml}
          </div>
        `;

        $('#modalDetails').html(modalContent);
        $('#itemModal').modal('show');
      }

      $('#prevBtn').click(function () {
        currentItemId = currentItemId === 1 ? 8 : currentItemId - 1;
        openModal(currentItemId);
      });

      $('#nextBtn').click(function () {
        currentItemId = currentItemId === 8 ? 1 : currentItemId + 1;
        openModal(currentItemId);
      });
    });






    const inputCheckbox = window.document.querySelector('.switcher-input');
    const documentBody = document.body;
    
    // Initialize theme on page load
    checkTheme();
    
    // Toggle theme on checkbox change
    inputCheckbox.addEventListener('change', () => {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    // Function to apply the background based on the theme
    function changeBackground() {
        const theme = getTheme();
        if (theme === 'dark') {
            documentBody.classList.add('dark');
        } else {
            documentBody.classList.remove('dark');
        }
    }
    
    // Check theme on page load and ensure the `dark` class is removed if necessary
    function checkTheme() {
        let theme = getTheme();
        if (!theme || typeof theme !== 'string') {
            theme = 'light'; // Default theme
            setTheme(theme);
        }
        inputCheckbox.checked = theme === 'dark'; // Sync checkbox state
        documentBody.classList.remove('dark'); // Remove the dark class by default
        if (theme === 'dark') {
            documentBody.classList.add('dark'); // Re-add if necessary
        }
    }
    
    // Save theme to localStorage and apply changes
    function setTheme(theme = 'light') {
        window.localStorage.setItem('theme', theme);
        changeBackground();
    }
    
    // Retrieve theme from localStorage
    function getTheme() {
        return window.localStorage.getItem('theme') ?? 'light'; // Default to 'light' if not set
    }
    

    $(".nav-toggler").click(function () {
      $(this).toggleClass("is--active");
      $(".nav-menu").toggleClass("is--active");
    });
    $(".nav-item").click(function () {
      $(".nav-toggler").removeClass("is--active");
      $(".nav-menu").removeClass("is--active");
    });


// gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// /* Main navigation */
// let panelsSection = document.querySelector("#panels"),
//   panelsContainer = document.querySelector("#panels-container"),
//   tween;

// document.querySelectorAll(".nav-item").forEach(anchor => {
//   anchor.addEventListener("click", function(e) {
//     e.preventDefault();
//     let targetElem = document.querySelector(e.target.getAttribute("href")),
//         y = targetElem;
    
//     // Ensure targetElem exists
//     if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
//       let totalScroll = tween?.scrollTrigger?.end - tween?.scrollTrigger?.start,
//           totalMovement = (panels.length - 1) * targetElem.offsetWidth;
//       if (totalScroll && totalMovement) {
//         y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
//       }
//     }

//     gsap.to(window, {
//       scrollTo: {
//         y: y,
//         autoKill: false
//       },
//       duration: 1
//     });
//   });
// });

// /* Panels */
// const panels = gsap.utils.toArray("#panels-container .panel");
// tween = gsap.to(panels, {
//   xPercent: -100 * (panels.length - 1),
//   ease: "none",
//   scrollTrigger: {
//     trigger: "#panels-container",
//     pin: true,
//     start: "top top",
//     scrub: 1,
//     snap: {
//       snapTo: 1 / (panels.length - 1000),
//       inertia: false,
//       duration: { min: 0.1, max: 0.1 }
//     },
//     end: () => "+=" + (panelsContainer.offsetWidth - innerWidth),

//     // Add onUpdate for active class logic
//     onUpdate: (self) => {
//       panels.forEach((panel, index) => {
//         const link = document.querySelector(`.nav-item[href="#panel-${index + 1}"]`);
        
//         // Ensure the link exists before accessing classList
//         if (link) {
//           // Check if the panel is in view based on scroll progress
//           const panelInView = self.progress >= index / panels.length && self.progress < (index + 1) / panels.length;

//           // Add or remove active class based on whether the panel is in view
//           if (panelInView) {
//             link.classList.add("is--active");
//           } else {
//             link.classList.remove("is--active");
//           }
//         }
//       });

//       // Keep the active class on the last navigation link when scrolling to the end
//       if (self.progress === 1) {
//         const lastLink = document.querySelector(`.nav-item[href="#panel-${panels.length}"]`);
//         if (lastLink) {
//           lastLink.classList.add("is--active");
//         }
//       }
//     }
//   }
// });
