/* ─── NAV HAMBURGER ─── */
document.getElementById('ham').addEventListener('click',function(){
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open'));
});

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
const sections=document.querySelectorAll('section[id],.sec[id]');
const chLinks=document.querySelectorAll('.ch-link');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id});
  chLinks.forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')==='#'+cur);
  });
},{passive:true});

/* ─── SCROLL FADE IN ─── */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:0.08});
document.querySelectorAll('.sec').forEach(s=>observer.observe(s));

/* ─── OUTREACH TABS ─── */
document.getElementById('otTabs').addEventListener('click',function(e){
  const btn=e.target.closest('.ot-btn');if(!btn)return;
  this.querySelectorAll('.ot-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.ot-pane').forEach(p=>p.classList.remove('active'));
  document.getElementById('ot-'+btn.dataset.tab).classList.add('active');
});

/* ─── DOC CHECKLIST PROGRESS ─── */
const cbs=document.querySelectorAll('.pcb');
const total=cbs.length;
function updateProgress(){
  const done=[...cbs].filter(c=>c.checked).length;
  const pct=Math.round(done/total*100);
  document.getElementById('progTxt').textContent=done+' of '+total+' completed';
  document.getElementById('progPct').textContent=pct+'%';
  document.getElementById('progFill').style.width=pct+'%';
}
cbs.forEach(c=>c.addEventListener('change',updateProgress));

/* ─── 30-DAY PLAN DATA ─── */
const days=[
  {w:'w1',title:'Research Day',tasks:'Choose your export product. Study top 5 competitors on Alibaba. Check Google Trends for USA/Europe demand. Decide on exactly 1 product to start with.'},
  {w:'w1',title:'Supplier Hunt',tasks:'Visit 3–5 local suppliers or manufacturers. Get samples and price quotes. Compare quality, MOQ, lead time. Choose your primary supplier.'},
  {w:'w1',title:'Brand + Domain',tasks:'Finalize your business name. Check domain availability on GoDaddy. Register your .com domain (₹800). Create dedicated business Gmail account.'},
  {w:'w1',title:'PAN + Aadhaar',tasks:'Ensure PAN and Aadhaar are fully up to date. Download e-PAN and Aadhaar PDF copies. These are mandatory for all upcoming registrations.'},
  {w:'w1',title:'Udyam Register',tasks:'Register on udyamregistration.gov.in — takes 10 minutes. Completely free. Download Udyam Certificate immediately. This unlocks government export schemes.'},
  {w:'w1',title:'Apply for IEC',tasks:'Register on dgft.gov.in. Start IEC application. Upload PAN, Aadhaar, bank details, photo, digital signature. Pay ₹500. IEC arrives in 1–3 business days.'},
  {w:'w1',title:'Bank Account',tasks:'Visit bank with PAN + Aadhaar + Udyam certificate. Open current account with export facility. Ask specifically for AD Code letter from bank manager.'},
  {w:'w2',title:'GST Register',tasks:'Apply on gst.gov.in. Complete Part A and Part B forms. Upload all supporting documents. GSTIN arrives in 3–7 working days. Save your GSTIN certificate.'},
  {w:'w2',title:'AD Code Setup',tasks:'Submit AD Code letter from your bank to nearest Customs ICD or Airport/Seaport. This enables foreign remittance credit. Takes 1–2 working days. Free.'},
  {w:'w2',title:'FSSAI / Spices',tasks:'If food product: apply for FSSAI on foscos.fssai.gov.in. If spices: apply on indianspices.com. Submit documents and pay applicable fees.'},
  {w:'w2',title:'Build Website',tasks:'Create free Wix or Carrd website. Add 5 pages: Home, Products, About, Certifications, Contact. Upload product photos and certificate scans.'},
  {w:'w2',title:'Product Photos',tasks:'Take 20–30 professional product photos using your phone with natural light and a white background. These go on your website and all B2B platforms.'},
  {w:'w2',title:'IndiaMART Live',tasks:'Register on IndiaMART. Create detailed product listing with all photos, specs, certifications, export capacity details. Fill every single field for maximum visibility.'},
  {w:'w2',title:'Alibaba Profile',tasks:'Register on Alibaba.com as a Supplier (free). Complete 100% of your profile. List product with a keyword-rich detailed title and full specifications.'},
  {w:'w3',title:'Spec Sheet PDF',tasks:'Create a 1-page product specification PDF using Canva: product name, grade, HS code, specifications, certifications, origin region, MOQ, packaging options.'},
  {w:'w3',title:'LinkedIn Setup',tasks:'Update LinkedIn profile: "Exporter | [Product] | India". Create company page. Post your first content piece: a useful fact about Indian [product] exports.'},
  {w:'w3',title:'Cold Emails',tasks:'Identify 20 targeted buyers from Alibaba/LinkedIn/Trade directories. Send customized cold emails using the Chapter 13 template. Personalize each one.'},
  {w:'w3',title:'LinkedIn DMs',tasks:'Send 10 personalized connection requests to importers in USA, Europe, Middle East. Use the LinkedIn template from Chapter 13. No generic messages.'},
  {w:'w3',title:'Follow Ups',tasks:'Follow up on all Day 17 emails that had no reply yet. Use the follow-up email template. Also respond promptly to any B2B platform enquiries received.'},
  {w:'w3',title:'Pricing Sheet',tasks:'Create your FOB + CIF price list for 3 quantity tiers: 100 kg, 500 kg, 1000 kg. Factor in all costs carefully. This becomes your negotiation baseline.'},
  {w:'w3',title:'Proforma Invoice',tasks:'Create a Proforma Invoice template in Word or Google Docs. Include IEC, GSTIN, HS code, Incoterms, validity date. Ready to send when buyer requests quote.'},
  {w:'w4',title:'Buyer Calls',tasks:'Schedule video or phone calls with interested buyers who responded. Present your product, certifications, and sample offer professionally and confidently.'},
  {w:'w4',title:'Send Samples',tasks:'Ship product samples to interested buyers via DHL/FedEx at their cost. Label properly: "Commercial Sample — No Commercial Value". Follow up after 5 days.'},
  {w:'w4',title:'Freight Quotes',tasks:'Get freight quotes from 2–3 forwarders for your first actual shipment via LCL sea to USA or EU destination. Understand the complete cost breakdown.'},
  {w:'w4',title:'Negotiate',tasks:'Respond to buyer feedback on samples. Negotiate price, MOQ, and payment terms. Target: 50% advance + 50% before shipment for your first order.'},
  {w:'w4',title:'First PO',tasks:'If buyer confirms the order, ask for a formal Purchase Order on their company letterhead. Review all PO terms carefully before issuing your Proforma Invoice.'},
  {w:'w4',title:'Advance Payment',tasks:'Share bank details only after PO is received and verified. Receive 50% advance payment via SWIFT. Get FIRC from bank immediately. Begin production or sourcing.'},
  {w:'w4',title:'Pack + Ship',tasks:'Pack goods to export standards. Prepare Commercial Invoice, Packing List, Certificate of Origin. Coordinate with your CHA to file the Shipping Bill on ICEGATE.'},
  {w:'w4',title:'Document Set',tasks:'Compile complete document set: CI, Packing List, B/L, COO, Shipping Bill. Send to buyer and bank as per agreed payment terms (LC or balance wire).'},
  {w:'w4',title:'Review + Grow',tasks:'Collect balance payment. File GST refund claim (GSTR-1). Review entire process: what worked, what to improve. Set your 90-day growth targets and next market.'}
];

const cal=document.getElementById('dayCal');
const panel=document.getElementById('dayPanel');
days.forEach((d,i)=>{
  const cell=document.createElement('div');
  cell.className='day-cell '+d.w;
  cell.innerHTML='<span class="dc-n">'+(i+1)+'</span><span class="dc-p">'+d.w.toUpperCase()+'</span>';
  cell.addEventListener('click',()=>{
    document.querySelectorAll('.day-cell').forEach(c=>c.classList.remove('sel'));
    cell.classList.add('sel');
    panel.innerHTML='<div class="dp-tag">DAY '+(i+1)+' / WEEK '+(Math.floor(i/7)+1)+'</div><div class="dp-title">'+d.title+'</div><div class="dp-tasks">'+d.tasks+'</div>';
  });
  cal.appendChild(cell);
});

/* ─── TEMPLATE TABS ─── */
document.getElementById('ttTabs').addEventListener('click',function(e){
  const btn=e.target.closest('.tt-btn');if(!btn)return;
  this.querySelectorAll('.tt-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tt-pane').forEach(p=>p.classList.remove('active'));
  document.getElementById('tt-'+btn.dataset.tab).classList.add('active');
});

/* ─── COPY TEMPLATE ─── */
function copyTpl(id){
  const text=document.getElementById(id).textContent;
  navigator.clipboard.writeText(text).then(()=>{
    const toast=document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),2200);
  });
}
