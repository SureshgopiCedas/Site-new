/* Manage Automation — shared site behaviour (all pages) */
(function(){
  /* mobile navigation */
  const header=document.querySelector('.top');
  const toggle=document.querySelector('.nav-toggle');
  if(header&&toggle){
    toggle.addEventListener('click',()=>{
      const open=header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded',open);
    });
    header.querySelectorAll('.menu a').forEach(a=>a.addEventListener('click',()=>{
      header.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');
    }));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&header.classList.contains('nav-open')){
        header.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');toggle.focus();
      }
    });
  }

  /* highlight the current page in the main menu (product pages also light up "Products") */
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const section={'capp.html':'products.html','build-it.html':'products.html'}[page]||page;
  document.querySelectorAll('.menu > a, .menu .dd > a').forEach(a=>{
    if(a.getAttribute('href')===section)a.setAttribute('aria-current','page');
  });

  /* footer year */
  document.querySelectorAll('[data-year]').forEach(n=>n.textContent=new Date().getFullYear());

  /* contact form */
  const form=document.getElementById('contactForm');
  if(!form)return;

  // Preselect the topic from ?topic=demo|capp|buildit|book|coaching
  const topic=new URLSearchParams(location.search).get('topic');
  const sel=form.querySelector('#topic');
  if(topic&&sel&&sel.querySelector('option[value="'+topic+'"]'))sel.value=topic;

  const note=document.getElementById('formNote');
  const show=(cls,msg)=>{note.className='form-note show '+cls;note.textContent=msg;};

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    let firstBad=null;
    form.querySelectorAll('.field').forEach(f=>{
      const input=f.querySelector('input,select,textarea');
      const bad=input&&!input.checkValidity();
      f.classList.toggle('invalid',bad);
      if(bad&&!firstBad)firstBad=input;
    });
    if(firstBad){firstBad.focus();return;}

    // Set data-endpoint on the <form> (e.g. a Formspree / Kajabi / CRM form URL) to send submissions.
    const endpoint=form.dataset.endpoint;
    if(!endpoint){
      show('info','Thanks! Online sending is not switched on yet. Please reach us through manageautomation.com/contact or Facebook in the meantime.');
      return;
    }
    const btn=form.querySelector('button[type="submit"]');
    btn.disabled=true;
    try{
      const res=await fetch(endpoint,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if(!res.ok)throw new Error(res.status);
      form.reset();
      show('ok','Thank you. Your message has been sent and we will get back to you shortly.');
    }catch(err){
      show('info','Sorry, the message could not be sent. Please try again, or contact us through manageautomation.com/contact.');
    }finally{btn.disabled=false;}
  });
})();
