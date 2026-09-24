/* JALALI TECH SUPPORT — main interactions */
const menuButton=document.querySelector(".menu-toggle");
const navLinks=document.querySelector(".nav-links");
if(menuButton&&navLinks){
  menuButton.addEventListener("click",()=>{navLinks.classList.toggle("open");menuButton.setAttribute("aria-expanded",navLinks.classList.contains("open"));});
  document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>{navLinks.classList.remove("open");menuButton.setAttribute("aria-expanded","false");}));
}

const revealElements=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target);}}),{threshold:.12});
  revealElements.forEach(e=>observer.observe(e));
}

const quoteForm=document.getElementById("quoteForm");
const formMessage=document.getElementById("formMessage");
if(quoteForm){
  quoteForm.addEventListener("submit",event=>{
    event.preventDefault();
    const d=new FormData(quoteForm);
    const message=`Hello Jalali Tech Support!

I would like to request a free quote.

Name: ${d.get("name")}
Email: ${d.get("email")}
WhatsApp: ${d.get("whatsapp")}
Project Type: ${d.get("project")}
Budget: ${d.get("budget")}

Project Details:
${d.get("details")}`;
    if(formMessage) formMessage.textContent="Your quote is ready. Opening WhatsApp...";
    window.open("https://wa.me/971508751737?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
    quoteForm.reset();
  });
}

/* JALALI SMART ASSISTANT
   Runs entirely in the browser: no API key and no customer data sent to an AI provider. */
const aiButton=document.getElementById("aiButton");
const aiChat=document.getElementById("aiChat");
const aiClose=document.getElementById("aiClose");
const aiForm=document.getElementById("aiForm");
const aiInput=document.getElementById("aiInput");
const aiMessages=document.getElementById("aiMessages");
const demoSession={waiting:false};

function openAI(){if(!aiChat)return;aiChat.classList.add("open");aiChat.setAttribute("aria-hidden","false");setTimeout(()=>aiInput&&aiInput.focus(),200);}
function closeAI(){if(!aiChat)return;aiChat.classList.remove("open");aiChat.setAttribute("aria-hidden","true");}
if(aiButton) aiButton.addEventListener("click",openAI);
if(aiClose) aiClose.addEventListener("click",closeAI);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAI();});

function addAIMessage(message,type){
  if(!aiMessages)return;
  const box=document.createElement("div");box.className="ai-message "+type;
  const p=document.createElement("p");p.textContent=message;box.appendChild(p);
  aiMessages.appendChild(box);aiMessages.scrollTop=aiMessages.scrollHeight;
}

const services={
  website:{label:"Website",price:"$300+",description:"professional responsive business websites"},
  ecommerce:{label:"E-commerce",price:"$1,000+",description:"online stores with catalog, cart, checkout and order management"},
  mobile:{label:"Mobile App",price:"$2,000+",description:"Android and iOS applications"},
  ai:{label:"AI Solutions",price:"$500+",description:"chatbots, automation and intelligent business tools"},
  software:{label:"Custom Software",price:"$2,000+",description:"dashboards, booking systems, portals and business platforms"},
  design:{label:"UI/UX Design",price:"$200+",description:"modern website and app interface design"}
};

function includesAny(t,words){return words.some(w=>t.includes(w));}
function serviceFromText(t){
  if(includesAny(t,["ecommerce","e-commerce","online store","webshop","shopping cart"]))return services.ecommerce;
  if(includesAny(t,["mobile app","android","ios","iphone app"]))return services.mobile;
  if(includesAny(t,["chatbot","artificial intelligence"," ai ","ai solution","automation"]))return services.ai;
  if(includesAny(t,["software","dashboard","booking system","portal","management system"]))return services.software;
  if(includesAny(t,["ui/ux","ui ux","user interface","design"]))return services.design;
  if(includesAny(t,["website","web site","web development","landing page"]))return services.website;
  return null;
}

function getAIResponse(question){
  const t=(" "+question.toLowerCase().replace(/\s+/g," ").trim()+" ");
  const service=serviceFromText(t);
  const asksPrice=includesAny(t,["price","pricing","cost","how much","budget","rate"]);
  if(asksPrice&&service) return service.label+" projects start from "+service.price+". Final pricing depends on pages, features, integrations and project requirements. Tell me what you want to build and I can guide you.";
  if(asksPrice) return "Starting prices: Website $300+, E-commerce $1,000+, Mobile App $2,000+, AI Solutions $500+, Custom Software $2,000+, UI/UX $200+. Exact pricing depends on requirements.";
  if(includesAny(t,["discount","offer","50%","sale"])) return "Our launch offer is 50% off selected services. Eligibility and final pricing depend on the project requirements.";
  if(includesAny(t,["contact","whatsapp","email","phone","talk to","human"])) return "You can contact Jalali Tech Support on WhatsApp at +971 50 875 1737 or email ijalali347@gmail.com.";
  if(includesAny(t,["worldwide","international","which country","outside","europe","uk","usa"])) return "Yes. Jalali Tech Support works with businesses and entrepreneurs worldwide.";
  if(includesAny(t,["how long","timeline","delivery time","when ready"])) return "Delivery time depends on scope. A simple website is normally much faster than an e-commerce store, mobile app or custom platform. Share your requirements and we can estimate the timeline.";
  if(includesAny(t,["quote","hire","start project","get started"])) return "Great. Use the FREE QUOTE form on this page and include your project type, budget and requirements. You can also contact us directly on WhatsApp.";
  if(service) return "Yes. We build "+service.description+". "+service.label+" projects start from "+service.price+". Tell me the features you need, or ask me to create a demo.";
  if(/\b(hi|hello|hey|salam|assalam|good morning|good evening)\b/.test(t)) return "Hello! 👋 Welcome to Jalali Tech Support. I can explain our services and prices, help shape your idea, or create an instant website demo for your business.";
  if(includesAny(t,["what do you do","services","help me","can you do"])) return "We build websites, e-commerce stores, mobile apps, AI solutions, custom software and UI/UX designs. I can also create an instant website demo here—just say “create a demo”.";
  return "I can help with websites, e-commerce, mobile apps, AI, custom software, design, pricing and quotes. I can also create an instant website demo. Tell me your business name and type.";
}

function cleanBusiness(text){
  let s=text.replace(/\b(create|make|build|show|generate|give|please|me|a|an|the|website|site|demo|preview|for|my)\b/gi," ").replace(/\s+/g," ").trim();
  if(!s||s.length<2)return "";
  return s.split(" ").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ");
}
function isDemoRequest(t){return includesAny(t,["create a demo","make a demo","build a demo","website demo","demo website","create a website","make a website","generate a website","preview website"]);}

function inferBusinessType(name){
  const t=name.toLowerCase();
  if(includesAny(t,["restaurant","cafe","coffee","bakery","food","kitchen"]))return {hero:"Fresh flavor. Memorable moments.",sub:"Discover our menu, story and signature experience.",cta:"View Menu"};
  if(includesAny(t,["real estate","property","homes","realty"]))return {hero:"Find a place you’ll love.",sub:"Explore selected properties and connect with our team.",cta:"View Properties"};
  if(includesAny(t,["salon","beauty","spa","barber"]))return {hero:"Look good. Feel confident.",sub:"Professional care, easy booking and a premium experience.",cta:"Book Now"};
  if(includesAny(t,["fitness","gym","coach"]))return {hero:"Stronger starts today.",sub:"Training, coaching and programs built around your goals.",cta:"Join Now"};
  if(includesAny(t,["shop","store","fashion","boutique"]))return {hero:"Made to stand out.",sub:"Explore our latest products and shop with confidence.",cta:"Shop Now"};
  return {hero:"Built for what’s next.",sub:"Professional service, trusted quality and a better customer experience.",cta:"Explore Services"};
}
function addDemoCard(name){
  if(!aiMessages)return;
  const copy=inferBusinessType(name);
  const card=document.createElement("section");card.className="ai-demo-card";
  const tag=document.createElement("span");tag.className="ai-demo-tag";tag.textContent="INSTANT WEBSITE CONCEPT";
  const title=document.createElement("h4");title.textContent=name;
  const subtitle=document.createElement("p");subtitle.textContent="Custom demo generated in your browser.";
  const mini=document.createElement("div");mini.className="ai-demo-site";
  const brand=document.createElement("strong");brand.textContent=name;
  const hero=document.createElement("strong");hero.textContent=copy.hero;
  const desc=document.createElement("span");desc.textContent=copy.sub;
  const cta=document.createElement("i");cta.textContent=copy.cta+" →";
  mini.append(brand,hero,desc,cta);
  const action=document.createElement("button");action.type="button";action.textContent="REQUEST THIS WEBSITE";
  action.addEventListener("click",()=>{const q=document.getElementById("quote");if(q)q.scrollIntoView({behavior:"smooth"});closeAI();});
  card.append(tag,title,subtitle,mini,action);aiMessages.appendChild(card);aiMessages.scrollTop=aiMessages.scrollHeight;
}
function startDemo(question){
  const name=cleanBusiness(question);
  if(!name){demoSession.waiting=true;addAIMessage("Absolutely. Tell me your business name and type—for example: “Bella Bakery”, “Nova Fitness Studio” or “Prime Real Estate”.","bot");return;}
  addAIMessage("I created a quick website concept for "+name+".","bot");addDemoCard(name);
}

if(aiForm&&aiInput){
  aiForm.addEventListener("submit",event=>{
    event.preventDefault();
    const q=aiInput.value.trim();if(!q)return;
    addAIMessage(q,"user");aiInput.value="";
    setTimeout(()=>{
      if(demoSession.waiting){demoSession.waiting=false;const name=cleanBusiness(q)||q.trim();addAIMessage("Great — here is a website concept for "+name+".","bot");addDemoCard(name);return;}
      if(isDemoRequest(q.toLowerCase())){startDemo(q);return;}
      addAIMessage(getAIResponse(q),"bot");
    },250);
  });
}

document.querySelectorAll(".ai-quick-buttons button").forEach(button=>{
  button.addEventListener("click",()=>{
    const map={website:"How much does a website cost?",ecommerce:"Can you build an e-commerce store?",mobile:"Can you build a mobile app?",ai:"What AI solutions do you provide?",pricing:"What are your prices?",contact:"How can I contact you?"};
    const q=map[button.dataset.question];if(!q)return;
    addAIMessage(q,"user");setTimeout(()=>addAIMessage(getAIResponse(q),"bot"),200);
  });
});
const quickButtons=document.querySelector(".ai-quick-buttons");
if(quickButtons&&!quickButtons.querySelector('[data-question="demo"]')){
  const b=document.createElement("button");b.type="button";b.dataset.question="demo";b.textContent="✨ Create demo";
  b.addEventListener("click",()=>startDemo("create a demo"));quickButtons.appendChild(b);
}
