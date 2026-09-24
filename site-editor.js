/* Jalali Tech owner editor — local browser editor.
   Changes are saved on this device. Use Export/Import to move them between devices.
   A server/database can later add secure account login and one-click global publishing. */
(()=>{
 const KEY="jalaliSiteEditsV1";
 const editable=[
  ["Hero title",".hero-content h1"],["Hero subtitle",".hero-content h2"],["Hero description",".hero-content > p"],
  ["Services heading","#services .section-heading h2"],["Services description","#services .section-heading p"],
  ["Pricing heading","#pricing .section-heading h2"],["Pricing description","#pricing .section-heading p"],
  ["Portfolio heading","#portfolio .section-heading h2"],["About heading","#about .about-text h2"],
  ["About paragraph","#about .about-text p"],["Contact heading","#contact h2"],["Contact description","#contact p"]
 ];
 function load(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){return {}}}
 function apply(){
   const data=load();
   Object.keys(data).forEach(sel=>{const el=document.querySelector(sel);if(el)el.innerHTML=data[sel]});
 }
 function build(){
   const wrap=document.createElement("div");wrap.className="owner-editor";wrap.id="ownerEditor";
   wrap.innerHTML='<div class="owner-editor-head"><div><b>⚙️ Jalali Site Editor</b><small>Edit this website on your phone</small></div><button id="editorClose">×</button></div><div class="owner-editor-body"><p class="editor-note">Tap a field, change the text, then Save. Changes are stored on this device.</p><div id="editorFields"></div><div class="editor-actions"><button id="editorSave">Save changes</button><button id="editorReset" class="secondary">Reset</button><button id="editorExport" class="secondary">Export</button><label class="editor-import">Import<input id="editorImport" type="file" accept="application/json"></label></div><p id="editorStatus"></p></div>';
   document.body.appendChild(wrap);
   const fields=wrap.querySelector("#editorFields");
   editable.forEach(([label,sel])=>{const el=document.querySelector(sel);if(!el)return;const row=document.createElement("label");row.className="editor-field";const span=document.createElement("span");span.textContent=label;const ta=document.createElement("textarea");ta.dataset.selector=sel;ta.value=el.innerHTML.trim().replace(/\s+/g," ");row.append(span,ta);fields.appendChild(row)});
   wrap.querySelector("#editorClose").onclick=()=>wrap.classList.remove("open");
   wrap.querySelector("#editorSave").onclick=()=>{const data=load();wrap.querySelectorAll("textarea").forEach(t=>{data[t.dataset.selector]=t.value;const el=document.querySelector(t.dataset.selector);if(el)el.innerHTML=t.value});localStorage.setItem(KEY,JSON.stringify(data));status("Saved on this device ✓")};
   wrap.querySelector("#editorReset").onclick=()=>{if(confirm("Reset your saved edits on this device?")){localStorage.removeItem(KEY);location.reload()}};
   wrap.querySelector("#editorExport").onclick=()=>{const blob=new Blob([JSON.stringify(load(),null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="jalali-tech-edits.json";a.click();URL.revokeObjectURL(a.href)};
   wrap.querySelector("#editorImport").onchange=e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{localStorage.setItem(KEY,JSON.stringify(JSON.parse(r.result)));location.reload()}catch(x){status("That file is not valid.")}};r.readAsText(file)};
   function status(t){wrap.querySelector("#editorStatus").textContent=t}
 }
 function button(){const b=document.createElement("button");b.className="owner-editor-button";b.textContent="✏️ Edit Site";b.onclick=()=>document.getElementById("ownerEditor").classList.add("open");document.body.appendChild(b)}
 document.addEventListener("DOMContentLoaded",()=>{apply();build();button()});
})();