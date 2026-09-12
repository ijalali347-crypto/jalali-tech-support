/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
  document.querySelector(".menu-toggle");

const navLinks =
  document.querySelector(".nav-links");


if (menuButton && navLinks) {

  menuButton.addEventListener(
    "click",
    function () {

      navLinks.classList.toggle("open");

      const isOpen =
        navLinks.classList.contains("open");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen
      );

    }
  );


  /* Close menu after clicking a link */

  document
    .querySelectorAll(".nav-links a")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          navLinks.classList.remove(
            "open"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
  document.querySelectorAll(".reveal");


if (
  revealElements.length > 0 &&
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    function (element) {

      revealObserver.observe(
        element
      );

    }
  );

}



/* =====================================================
   FREE QUOTE FORM
===================================================== */

const quoteForm =
  document.getElementById(
    "quoteForm"
  );

const formMessage =
  document.getElementById(
    "formMessage"
  );


if (quoteForm) {

  quoteForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const formData =
        new FormData(
          quoteForm
        );


      const name =
        formData.get("name") || "";

      const email =
        formData.get("email") || "";

      const whatsapp =
        formData.get("whatsapp") || "";

      const project =
        formData.get("project") || "";

      const budget =
        formData.get("budget") || "";

      const details =
        formData.get("details") || "";


      /*
        WhatsApp is used instead of
        a paid backend.

        This keeps the website free.
      */


      const message =
`Hello Jalali Tech Support!

I would like to request a free quote.

Name: ${name}

Email: ${email}

WhatsApp: ${whatsapp}

Project Type: ${project}

Budget: ${budget}

Project Details:
${details}`;


      const whatsappURL =
        "https://wa.me/971508751737?text=" +
        encodeURIComponent(
          message
        );


      if (formMessage) {

        formMessage.textContent =
          "Your quote is ready. Opening WhatsApp so you can send it directly.";

      }


      window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );


      quoteForm.reset();

    }
  );

}
