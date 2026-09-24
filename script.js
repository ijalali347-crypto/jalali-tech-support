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
  if(includesAny(t,["bakery","cake","cakes","pastry","bread"]))return {type:"Bakery",icon:"🥐",hero:"Baked fresh. Made with love.",sub:"Fresh bread, cakes and pastries for every day and every celebration.",cta:"Order Now",items:["🥐 Croissants","🎂 Custom Cakes","🍞 Artisan Bread","🧁 Cupcakes"],features:["Fresh Daily","Custom Orders","Delivery"]};
  if(includesAny(t,["food delivery","delivery app","food app","takeaway"]))return {type:"Food Delivery",icon:"🛵",hero:"Your favorites, delivered fast.",sub:"Browse restaurants, order in seconds and track delivery to your door.",cta:"Order Food",items:["🍔 Burgers","🍕 Pizza","🍗 Chicken","🥗 Healthy"],features:["Live Tracking","Fast Delivery","Easy Checkout"]};
  if(includesAny(t,["grocery","groceries","supermarket","mart"]))return {type:"Grocery",icon:"🛒",hero:"Fresh groceries at your fingertips.",sub:"Shop everyday essentials, fresh produce and household favorites online.",cta:"Shop Groceries",items:["🥬 Fresh Produce","🥛 Dairy","🍎 Fruits","🧃 Drinks"],features:["Fresh Stock","Quick Delivery","Secure Checkout"]};
  if(includesAny(t,["restaurant","cafe","coffee","food","kitchen","grill","biryani"]))return {type:"Restaurant",icon:"🍽️",hero:"Great food. Great moments.",sub:"Explore our signature dishes, reserve a table or order your favorites.",cta:"View Menu",items:["🍛 Signature Dish","🥩 Grill Special","🥗 Fresh Salad","🍰 Dessert"],features:["Menu","Reservations","Online Orders"]};
  if(includesAny(t,["real estate","property","properties","homes","realty","realtor"]))return {type:"Real Estate",icon:"🏠",hero:"Find a place you’ll love.",sub:"Discover homes and properties selected for your lifestyle and investment goals.",cta:"View Properties",items:["🏡 Family Villa","🏢 City Apartment","🌇 Luxury Home","🏗️ New Project"],features:["Property Search","Agent Contact","Book Viewing"]};
  if(includesAny(t,["salon","beauty","spa","barber"]))return {type:"Beauty",icon:"✨",hero:"Look good. Feel confident.",sub:"Premium treatments and easy appointments designed around you.",cta:"Book Now",items:["✂️ Hair","💅 Nails","🧖 Spa","💆 Treatment"],features:["Services","Appointments","Offers"]};
  if(includesAny(t,["fitness","gym","coach"]))return {type:"Fitness",icon:"💪",hero:"Stronger starts today.",sub:"Training and programs built around your goals.",cta:"Join Now",items:["🏋️ Strength","🏃 Cardio","🧘 Classes","🥗 Coaching"],features:["Memberships","Classes","Trainers"]};
  if(includesAny(t,["shop","store","fashion","boutique","clothing"]))return {type:"Online Store",icon:"🛍️",hero:"Made to stand out.",sub:"Discover new arrivals and shop your favorites with confidence.",cta:"Shop Now",items:["👕 New Arrivals","👟 Best Sellers","👜 Accessories","🏷️ Offers"],features:["Catalog","Cart","Checkout"]};
  return {type:"Business",icon:"🌐",hero:"Built for what’s next.",sub:"A professional digital experience designed to turn visitors into customers.",cta:"Explore Services",items:["⭐ Featured","💼 Services","📸 Gallery","📞 Contact"],features:["About","Services","Contact"]};
}
function addDemoCard(name){
  if(!aiMessages)return;
  const copy=inferBusinessType(name);
  const card=document.createElement("section");card.className="ai-demo-card ai-demo-full";
  const tag=document.createElement("span");tag.className="ai-demo-tag";tag.textContent=copy.icon+" "+copy.type.toUpperCase()+" WEBSITE DEMO";
  const browser=document.createElement("div");browser.className="demo-browser";
  browser.innerHTML='<div class="demo-browser-bar"><span>● ● ●</span><b>'+name+'</b></div>';
  const hero=document.createElement("div");hero.className="demo-hero";
  const brand=document.createElement("div");brand.className="demo-brand";brand.textContent=copy.icon+" "+name;
  const h=document.createElement("h3");h.textContent=copy.hero;
  const p=document.createElement("p");p.textContent=copy.sub;
  const cta=document.createElement("button");cta.type="button";cta.textContent=copy.cta;
  hero.append(brand,h,p,cta);
  const featureRow=document.createElement("div");featureRow.className="demo-features";
  copy.features.forEach(x=>{const e=document.createElement("span");e.textContent="✓ "+x;featureRow.appendChild(e);});
  const sectionTitle=document.createElement("strong");sectionTitle.className="demo-section-title";sectionTitle.textContent=copy.type==="Real Estate"?"Featured properties":"Popular choices";
  const grid=document.createElement("div");grid.className="demo-products";
  copy.items.forEach((x,i)=>{const item=document.createElement("div");item.className="demo-product";const pic=document.createElement("div");pic.className="demo-product-pic";pic.textContent=x.split(" ")[0];const label=document.createElement("b");label.textContent=x.substring(x.indexOf(" ")+1);const small=document.createElement("small");small.textContent=i%2?"Popular choice":"Featured";item.append(pic,label,small);grid.appendChild(item);});
  const about=document.createElement("div");about.className="demo-about";about.innerHTML="<b>Why choose "+name+"?</b><span>Quality service • Easy ordering • Mobile friendly • Direct contact</span>";
  const contact=document.createElement("div");contact.className="demo-contact";contact.textContent="Home  •  "+(copy.type==="Real Estate"?"Properties":"Services")+"  •  About  •  Contact";
  browser.append(hero,featureRow,sectionTitle,grid,about,contact);
  const action=document.createElement("button");action.type="button";action.className="demo-request";action.textContent="I WANT A WEBSITE LIKE THIS";
  action.addEventListener("click",()=>{const q=document.getElementById("quote");if(q)q.scrollIntoView({behavior:"smooth"});closeAI();});
  card.append(tag,browser,action);aiMessages.appendChild(card);aiMessages.scrollTop=aiMessages.scrollHeight;
}
function startDemo(question){
  const name=cleanBusiness(question);
  if(!name){demoSession.waiting=true;addAIMessage("Yes — I can create a full visual demo. Send your business name AND type, for example: “Jalali Restaurant”, “Bella Bakery”, “Prime Real Estate”, “QuickBite Food Delivery” or “Fresh Mart Grocery”.","bot");return;}
  addAIMessage("Here is a larger multi-section "+inferBusinessType(name).type+" website concept for "+name+".","bot");addDemoCard(name);
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
