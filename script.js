/* =====================================================
   JALALI TECH SUPPORT
   MAIN JAVASCRIPT
===================================================== */


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


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
  document.querySelectorAll(".service-card, .price-card, .project, .step, .why-grid > div");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "reveal-visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.08
      }
    );


  revealElements.forEach(
    function (element) {

      element.classList.add(
        "reveal-ready"
      );

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


/* =====================================================
   JALALI AI ASSISTANT
===================================================== */

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


/* =====================================================
   OPEN AI CHAT
===================================================== */

function openAIChat() {

  if (!aiChat || !aiButton) {
    return;
  }


  aiChat.classList.add("open");

  aiChat.setAttribute(
    "aria-hidden",
    "false"
  );

  aiButton.setAttribute(
    "aria-expanded",
    "true"
  );


  setTimeout(
    function () {

      if (aiInput) {
        aiInput.focus();
      }

    },
    250
  );

}


/* =====================================================
   CLOSE AI CHAT
===================================================== */

function closeAIChat() {

  if (!aiChat || !aiButton) {
    return;
  }


  aiChat.classList.remove("open");

  aiChat.setAttribute(
    "aria-hidden",
    "true"
  );

  aiButton.setAttribute(
    "aria-expanded",
    "false"
  );

}


if (aiButton) {

  aiButton.addEventListener(
    "click",
    function () {

      if (
        aiChat &&
        aiChat.classList.contains("open")
      ) {

        closeAIChat();

      } else {

        openAIChat();

      }

    }
  );

}


if (aiClose) {

  aiClose.addEventListener(
    "click",
    closeAIChat
  );

}


/* =====================================================
   AI MESSAGE FUNCTION
===================================================== */

function addAIMessage(
  message,
  sender = "bot"
) {

  if (!aiMessages) {
    return;
  }


  const wrapper =
    document.createElement("div");


  wrapper.className =
    "ai-message " + sender;


  if (sender === "bot") {

    wrapper.innerHTML = `

      <div class="message-avatar">
        🤖
      </div>

      <div class="message-bubble">
        ${message}
      </div>

    `;

  } else {

    wrapper.innerHTML = `

      <div class="message-bubble">
        ${message}
      </div>

    `;

  }


  aiMessages.appendChild(
    wrapper
  );


  aiMessages.scrollTop =
    aiMessages.scrollHeight;

}


/* =====================================================
   CLEAN USER TEXT
===================================================== */

function cleanText(text) {

  return text
    .toLowerCase()
    .trim();

}


/* =====================================================
   FREE JALALI AI KNOWLEDGE
===================================================== */

function getAIResponse(question) {

  const q =
    cleanText(question);


  /* GREETING */

  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hey") ||
    q.includes("salam") ||
    q.includes("assalam")
  ) {

    return `
      Hello! 👋<br><br>

      Welcome to <strong>Jalali Tech Support</strong>.

      I can help you with our services,
      pricing, website development,
      e-commerce, mobile apps, AI solutions
      and free quotes.
    `;

  }


  /* SERVICES */

  if (
    q.includes("service") ||
    q.includes("what do you do") ||
    q.includes("what can you") ||
    q.includes("offer")
  ) {

    return `
      We provide six main digital services:

      <br><br>

      💻 <strong>Website Development</strong> — from $300<br>
      🛒 <strong>E-commerce Development</strong> — from $1,000<br>
      📱 <strong>Mobile Apps</strong> — from $2,000<br>
      🤖 <strong>AI Solutions</strong> — from $500<br>
      ⚙️ <strong>Custom Software</strong> — from $2,000<br>
      🎨 <strong>UI/UX Design</strong> — from $200

      <br><br>

      Exact pricing depends on your project requirements.
    `;

  }


  /* WEBSITE */

  if (
    q.includes("website") ||
    q.includes("web site") ||
    q.includes("web development")
  ) {

    return `
      Yes! 💻 We build professional,
      responsive business websites.

      <br><br>

      <strong>Starting price: $300+</strong>

      <br><br>

      We can build company websites,
      landing pages, restaurant websites,
      real-estate websites and custom websites.

      <br><br>

      <a href="#quote"
         onclick="closeAIChat()"
         style="color:#65c1ff;font-weight:800;">
         REQUEST A FREE QUOTE →
      </a>
    `;

  }


  /* E-COMMERCE */

  if (
    q.includes("ecommerce") ||
    q.includes("e-commerce") ||
    q.includes("online store") ||
    q.includes("shop")
  ) {

    return `
      Yes! 🛒 We can build online stores.

      <br><br>

      Features can include:

      <br>

      ✓ Product catalog<br>
      ✓ Shopping cart<br>
      ✓ Checkout<br>
      ✓ Order management<br>
      ✓ Mobile responsive design

      <br><br>

      <strong>Starting price: $1,000+</strong>

      <br><br>

      Exact pricing depends on the store requirements.
    `;

  }


  /* MOBILE APP */

  if (
    q.includes("mobile") ||
    q.includes("android") ||
    q.includes("ios") ||
    q.includes("app")
  ) {

    return `
      Yes! 📱 We develop mobile applications
      for Android and iOS.

      <br><br>

      <strong>Starting price: $2,000+</strong>

      <br><br>

      The final price depends on the number
      of screens, features, backend requirements
      and integrations.
    `;

  }


  /* AI */

  if (
    q.includes("ai") ||
    q.includes("artificial intelligence") ||
    q.includes("chatbot") ||
    q.includes("automation")
  ) {

    return `
      Absolutely! 🤖

      We can develop AI solutions such as:

      <br><br>

      ✓ AI customer-support chatbots<br>
      ✓ Business automation<br>
      ✓ AI assistants<br>
      ✓ Intelligent tools<br>
      ✓ AI integrations

      <br><br>

      <strong>AI solutions start from $500+</strong>

      <br><br>

      The exact cost depends on the AI features
      and technology required.
    `;

  }


  /* CUSTOM SOFTWARE */

  if (
    q.includes("custom software") ||
    q.includes("software") ||
    q.includes("dashboard") ||
    q.includes("booking system")
  ) {

    return `
      Yes! ⚙️ We build custom software
      for businesses.

      <br><br>

      Examples include:

      <br>

      ✓ Business dashboards<br>
      ✓ Booking systems<br>
      ✓ Customer portals<br>
      ✓ Management systems<br>
      ✓ Business automation

      <br><br>

      <strong>Starting price: $2,000+</strong>
    `;

  }


  /* UI UX */

  if (
    q.includes("ui") ||
    q.includes("ux") ||
    q.includes("design")
  ) {

    return `
      🎨 We provide modern UI/UX design
      for websites and applications.

      <br><br>

      <strong>Starting price: $200+</strong>

      <br><br>

      We focus on clean, modern and
      user-friendly interfaces.
    `;

  }


  /* PRICING */

  if (
    q.includes("price") ||
    q.includes("pricing") ||
    q.includes("cost") ||
    q.includes("how much") ||
    q.includes("budget")
  ) {

    return `
      Here are our starting prices:

      <br><br>

      💻 Website — <strong>$300+</strong><br>
      🛒 E-commerce — <strong>$1,000+</strong><br>
      📱 Mobile App — <strong>$2,000+</strong><br>
      🤖 AI Solutions — <strong>$500+</strong><br>
      ⚙️ Custom Software — <strong>$2,000+</strong><br>
      🎨 UI/UX Design — <strong>$200+</strong>

      <br><br>

      🔥 We currently advertise
      <strong>50% OFF SELECTED SERVICES</strong>.

      <br><br>

      Final pricing depends on project requirements
      and the offer applies to selected services.
    `;

  }


  /* OFFER */

  if (
    q.includes("50%") ||
    q.includes("discount") ||
    q.includes("offer") ||
    q.includes("sale")
  ) {

    return `
      🔥 We have a launch offer:

      <br><br>

      <strong>50% OFF SELECTED SERVICES</strong>

      <br><br>

      Please note that final pricing depends
      on your project requirements and the offer
      applies to selected services.

      <br><br>

      Contact us for exact pricing.
    `;

  }


  /* QUOTE */

  if (
    q.includes("quote") ||
    q.includes("quotation") ||
    q.includes("free quote") ||
    q.includes("start project") ||
    q.includes("hire")
  ) {

    return `
      Getting a free quote is easy! 🚀

      <br><br>

      You can use our <strong>FREE QUOTE</strong>
      form on this website.

      <br><br>

      You can also contact us directly:

      <br><br>

      📱 WhatsApp:
      <strong>+971 50 875 1737</strong>

      <br><br>

      ✉️ Email:
      <strong>ijalali347@gmail.com</strong>

      <br><br>

      <a
        href="#quote"
        onclick="closeAIChat()"
        style="color:#65c1ff;font-weight:800;"
      >
        GO TO FREE QUOTE →
      </a>
    `;

  }


  /* WHATSAPP */

  if (
    q.includes("whatsapp") ||
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("number")
  ) {

    return `
      📱 You can contact Jalali Tech Support
      directly on WhatsApp:

      <br><br>

      <strong>+971 50 875 1737</strong>

      <br><br>

      <a
        href="https://wa.me/971508751737"
        target="_blank"
        rel="noopener"
        style="color:#65c1ff;font-weight:800;"
      >
        CHAT ON WHATSAPP →
      </a>
    `;

  }


  /* EMAIL */

  if (
    q.includes("email") ||
    q.includes("gmail")
  ) {

    return `
      ✉️ You can email Jalali Tech Support at:

      <br><br>

      <strong>
        ijalali347@gmail.com
      </strong>

      <br><br>

      <a
        href="mailto:ijalali347@gmail.com"
        style="color:#65c1ff;font-weight:800;"
      >
        SEND EMAIL →
      </a>
    `;

  }


  /* WORLDWIDE */

  if (
    q.includes("worldwide") ||
    q.includes("international") ||
    q.includes("country") ||
    q.includes("location")
  ) {

    return `
      🌍 Yes!

      Jalali Tech Support is designed
      to serve businesses, entrepreneurs
      and startups worldwide.

      <br><br>

      You can contact us from anywhere.
    `;

  }


  /* PORTFOLIO */

  if (
    q.includes("portfolio") ||
    q.includes("projects") ||
    q.includes("examples") ||
    q.includes("demo")
  ) {

    return `
      🚀 Our website currently showcases
      concept/demo projects including:

      <br><br>

      🍽️ Restaurant Website<br>
      👗 Fashion E-commerce Store<br>
      🏠 Real Estate Website<br>
      🛵 Food Delivery App<br>
      📊 Business Dashboard<br>
      🤖 AI Customer Support

      <br><br>

      These are <strong>DEMO PROJECTS</strong>
      created to demonstrate our capabilities.
    `;

  }


  /* TIME */

  if (
    q.includes("how long") ||
    q.includes("timeline") ||
    q.includes("days") ||
    q.includes("time")
  ) {

    return `
      ⏱️ Development time depends on the
      project scope, content, revisions and
      technical requirements.

      <br><br>

      We'll discuss an estimated schedule
      during your consultation.
    `;

  }


  /* MAINTENANCE */

  if (
    q.includes("maintenance") ||
    q.includes("support after") ||
    q.includes("after launch")
  ) {

    return `
      🔧 Yes. Ongoing support can be arranged
      depending on the project and your
      requirements.

      <br><br>

      Ask us about support options when
      requesting your quote.
    `;

  }


  /* PAYMENT */

  if (
    q.includes("payment") ||
    q.includes("upfront") ||
    q.includes("pay")
  ) {

    return `
      💳 Payment schedules depend on the
      project scope and agreement.

      <br><br>

      Payment terms will be clarified
      before development begins.
    `;

  }


  /* THANK YOU */

  if (
    q.includes("thank") ||
    q.includes("thanks")
  ) {

    return `
      You're very welcome! 😊

      <br><br>

      We're ready to help you
      <strong>Build Your Digital Future.</strong>

      🚀
    `;

  }


  /* DEFAULT */

  return `
    I'm here to help with Jalali Tech Support. 🤖

    <br><br>

    You can ask me things like:

    <br>

    • What services do you offer?<br>
    • How much does a website cost?<br>
    • Can you build an online store?<br>
    • How much is a mobile app?<br>
    • Do you provide AI solutions?<br>
    • How can I get a free quote?<br>
    • What is your WhatsApp number?

    <br><br>

    Or contact our team directly on WhatsApp.
  `;

}


/* =====================================================
   AI FORM
===================================================== */

if (aiForm) {

  aiForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      if (!aiInput) {
        return;
      }


      const question =
        aiInput.value.trim();


      if (!question) {
        return;
      }


      addAIMessage(
        escapeHTML(question),
        "user"
      );


      aiInput.value = "";


      setTimeout(
        function () {

          const answer =
            getAIResponse(question);

          addAIMessage(
            answer,
            "bot"
          );

        },
        350
      );

    }
  );

}


/* =====================================================
   QUICK BUTTONS
===================================================== */

document
  .querySelectorAll(".ai-quick-buttons button")
  .forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const question =
            button.getAttribute(
              "data-question"
            );


          if (!question) {
            return;
          }


          addAIMessage(
            escapeHTML(question),
            "user"
          );


          setTimeout(
            function () {

              const answer =
                getAIResponse(question);

              addAIMessage(
                answer,
                "bot"
              );

            },
            300
          );

        }
      );

    }
  );


/* =====================================================
   ESCAPE HTML
   Prevents user input from being interpreted as HTML.
===================================================== */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      aiChat &&
      aiChat.classList.contains("open")
    ) {

      closeAIChat();

    }

  }
);
