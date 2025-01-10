gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/* Main navigation */
let panelsSection = document.querySelector("#panels"),
  panelsContainer = document.querySelector("#panels-container"),
  tween;

const navItems = document.querySelectorAll(".nav-item");
const panels = gsap.utils.toArray("#panels-container .panel");

// Function to reset to the first panel and set the first navigation link as active
function resetToFirstPanel() {
  // Set the first navigation item as active
  navItems.forEach(item => {
    item.classList.remove("is--active");
  });
  navItems[0].classList.add("is--active");

  // Scroll to the first panel
  gsap.to(window, {
    scrollTo: {
      y: panels[0],  // Scroll to the first panel
      autoKill: false
    },
    duration: 1
  });
}

// Call this function when the page loads to ensure the first panel is shown
window.addEventListener("load", resetToFirstPanel); // Ensures it's called after the page fully loads

// Set up the click event listener for navigation items
navItems.forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    
    // Remove 'active' class from all nav-items
    navItems.forEach(item => {
      item.classList.remove("is--active");
    });
    
    // Add 'active' class to the clicked nav-item
    anchor.classList.add("is--active");

    let targetElem = document.querySelector(e.target.getAttribute("href")),
        y = targetElem;

    // Ensure targetElem exists
    if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
      let totalScroll = tween?.scrollTrigger?.end - tween?.scrollTrigger?.start,
          totalMovement = (panels.length - 1) * targetElem.offsetWidth;
      if (totalScroll && totalMovement) {
        y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
      }
    }

    gsap.to(window, {
      scrollTo: {
        y: y,
        autoKill: false
      },
      duration: 1
    });
  });
});

/* Panels */
tween = gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#panels-container",
    pin: true,
    start: "top top",
    scrub: 1,
    snap: {
      snapTo: 1 / (panels.length - 1000),
      inertia: true,
      duration: { min: 0.1, max: 0.1 }
    },
    end: () => "+=" + (panelsContainer.offsetWidth - innerWidth)
  }
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