/* =========================================
   JALALI TECH SUPPORT
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

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


  document
    .querySelectorAll(".nav-links a")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          navLinks.classList.remove("open");

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(function (element) {

    revealObserver.observe(element);

  });

}



/* =========================================
   FREE QUOTE FORM
========================================= */

const quoteForm =
  document.getElementById("quoteForm");

const formMessage =
  document.getElementById("formMessage");


if (quoteForm) {

  quoteForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const formData =
        new FormData(quoteForm);


      const name =
        formData.get("name");

      const email =
        formData.get("email");

      const whatsapp =
        formData.get("whatsapp");

      const project =
        formData.get("project");

      const budget =
        formData.get("budget");

      const details =
        formData.get("details");


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
        encodeURIComponent(message);


      if (formMessage) {

        formMessage.textContent =
          "Your quote is ready. Opening WhatsApp...";

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



/* =========================================
   JALALI AI ASSISTANT
   FREE RULE-BASED ASSISTANT
========================================= */

const aiButton =
  document.getElementById("aiButton");

const aiChat =
  document.getElementById("aiChat");

const aiClose =
  document.getElementById("aiClose");

const aiForm =
  document.getElementById("aiForm");

const aiInput =
  document.getElementById("aiInput");

const aiMessages =
  document.getElementById("aiMessages");


/* =========================================
   OPEN AI CHAT
========================================= */

if (aiButton && aiChat) {

  aiButton.addEventListener(
    "click",
    function () {

      aiChat.classList.add("open");

      aiChat.setAttribute(
        "aria-hidden",
        "false"
      );


      setTimeout(function () {

        if (aiInput) {
          aiInput.focus();
        }

      }, 250);

    }
  );

}



/* =========================================
   CLOSE AI CHAT
========================================= */

if (aiClose && aiChat) {

  aiClose.addEventListener(
    "click",
    function () {

      aiChat.classList.remove("open");

      aiChat.setAttribute(
        "aria-hidden",
        "true"
      );

    }
  );

}



/* =========================================
   ADD MESSAGE
========================================= */

function addAIMessage(
  message,
  type
) {

  if (!aiMessages) {
    return;
  }


  const messageElement =
    document.createElement("div");


  messageElement.className =
    "ai-message " + type;


  const paragraph =
    document.createElement("p");


  paragraph.textContent =
    message;


  messageElement.appendChild(
    paragraph
  );


  aiMessages.appendChild(
    messageElement
  );


  aiMessages.scrollTop =
    aiMessages.scrollHeight;

}



/* =========================================
   AI KNOWLEDGE
========================================= */

function getAIResponse(question) {

  const text =
    question
      .toLowerCase()
      .trim();


  /* WEBSITE */

  if (
    text.includes("website") ||
    text.includes("web site") ||
    text.includes("web development")
  ) {

    return (
      "Yes! We build professional, responsive " +
      "websites for businesses and entrepreneurs. " +
      "Website projects start from $300. " +
      "Exact pricing depends on your requirements."
    );

  }


  /* E-COMMERCE */

  if (
    text.includes("ecommerce") ||
    text.includes("e-commerce") ||
    text.includes("online store") ||
    text.includes("shop")
  ) {

    return (
      "Yes! We can build e-commerce stores with " +
      "product catalogs, shopping carts, checkout " +
      "and order management. Starting from $1,000."
    );

  }


  /* MOBILE APP */

  if (
    text.includes("mobile") ||
    text.includes("app") ||
    text.includes("android") ||
    text.includes("ios")
  ) {

    return (
      "Yes! We develop modern mobile applications " +
      "for Android and iOS. Mobile app projects " +
      "start from $2,000."
    );

  }


  /* AI */

  if (
    text.includes(" ai") ||
    text.startsWith("ai") ||
    text.includes("artificial intelligence") ||
    text.includes("chatbot")
  ) {

    return (
      "We provide AI solutions including chatbots, " +
      "automation and intelligent business tools. " +
      "AI projects start from $500 depending on " +
      "the features and technology required."
    );

  }


  /* SOFTWARE */

  if (
    text.includes("software") ||
    text.includes("dashboard") ||
    text.includes("system") ||
    text.includes("portal")
  ) {

    return (
      "We build custom software such as dashboards, " +
      "booking systems, portals and business management " +
      "platforms. Custom software starts from $2,000."
    );

  }


  /* UI UX */

  if (
    text.includes("ui") ||
    text.includes("ux") ||
    text.includes("design")
  ) {

    return (
      "We create clean and modern UI/UX designs " +
      "for websites and applications. UI/UX projects " +
      "start from $200."
    );

  }


  /* PRICE */

  if (
    text.includes("price") ||
    text.includes("pricing") ||
    text.includes("cost") ||
    text.includes("how much") ||
    text.includes("budget")
  ) {

    return (
      "Our starting prices are: Website $300+, " +
      "E-commerce $1,000+, Mobile App $2,000+, " +
      "AI Solutions $500+, Custom Software $2,000+ " +
      "and UI/UX Design $200+. Exact pricing depends " +
      "on your project."
    );

  }


  /* DISCOUNT */

  if (
    text.includes("discount") ||
    text.includes("offer") ||
    text.includes("50%") ||
    text.includes("sale")
  ) {

    return (
      "We currently have a launch offer: " +
      "50% OFF SELECTED SERVICES. Final pricing " +
      "depends on project requirements and the offer " +
      "applies only to selected services."
    );

  }


  /* WORLDWIDE */

  if (
    text.includes("worldwide") ||
    text.includes("international") ||
    text.includes("country") ||
    text.includes("outside")
  ) {

    return (
      "Yes! Jalali Tech Support provides digital " +
      "development services to businesses and " +
      "entrepreneurs worldwide."
    );

  }


  /* CONTACT */

  if (
    text.includes("contact") ||
    text.includes("whatsapp") ||
    text.includes("email") ||
    text.includes("talk")
  ) {

    return (
      "You can contact Jalali Tech Support on " +
      "WhatsApp at +971 50 875 1737 or email " +
      "ijalali347@gmail.com."
    );

  }


  /* QUOTE */

  if (
    text.includes("quote") ||
    text.includes("start") ||
    text.includes("project") ||
    text.includes("hire")
  ) {

    return (
      "Great! You can use the FREE QUOTE form " +
      "on this website. Tell us your project type, " +
      "budget and requirements, then we'll discuss " +
      "the best solution with you."
    );

  }


  /* GREETING */

  if (
    text === "hi" ||
    text === "hello" ||
    text === "hey" ||
    text.includes("good morning") ||
    text.includes("good evening")
  ) {

    return (
      "Hello! 👋 Welcome to Jalali Tech Support. " +
      "I can help you with websites, e-commerce, " +
      "mobile apps, AI, software, pricing and quotes."
    );

  }


  /* DEFAULT */

  return (
    "I can help with Jalali Tech Support services, " +
    "pricing, websites, e-commerce, mobile apps, " +
    "AI solutions, custom software and quotes. " +
    "What would you like to know?"
  );

}



/* =========================================
   AI FORM SUBMIT
========================================= */

if (aiForm && aiInput) {

  aiForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const question =
        aiInput.value.trim();


      if (!question) {
        return;
      }


      addAIMessage(
        question,
        "user"
      );


      aiInput.value = "";


      setTimeout(function () {

        const response =
          getAIResponse(question);


        addAIMessage(
          response,
          "bot"
        );

      }, 350);

    }
  );

}



/* =========================================
   QUICK AI BUTTONS
========================================= */

document
  .querySelectorAll(".ai-quick-buttons button")
  .forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        const questionType =
          button.dataset.question;


        let question = "";


        if (questionType === "website") {
          question =
            "How much does a website cost?";
        }

        else if (questionType === "ecommerce") {
          question =
            "Can you build an e-commerce store?";
        }

        else if (questionType === "mobile") {
          question =
            "Can you build a mobile app?";
        }

        else if (questionType === "ai") {
          question =
            "What AI solutions do you provide?";
        }

        else if (questionType === "pricing") {
          question =
            "What are your prices?";
        }

        else if (questionType === "contact") {
          question =
            "How can I contact you?";
        }


        if (!question) {
          return;
        }


        addAIMessage(
          question,
          "user"
        );


        setTimeout(function () {

          const response =
            getAIResponse(question);


          addAIMessage(
            response,
            "bot"
          );

        }, 350);

      }
    );

  });



/* =========================================
   CLOSE CHAT WITH ESCAPE
========================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      aiChat
    ) {

      aiChat.classList.remove(
        "open"
      );

      aiChat.setAttribute(
        "aria-hidden",
        "true"
      );

    }

  }
);
