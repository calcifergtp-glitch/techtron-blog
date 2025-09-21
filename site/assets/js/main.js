
(function(){
  console.log("TechTron loaded");
  const t=document.querySelector('[data-theme-toggle]');
  if(t){
    t.addEventListener('click',()=>{
      document.documentElement.classList.toggle('light');
      localStorage.setItem('theme',document.documentElement.classList.contains('light')?'light':'dark');
    });
    const s=localStorage.getItem('theme');
    if(s==='light') document.documentElement.classList.add('light');
  }
  async function runSearch(q){
    try{
      const res=await fetch('./data/search-index.json');
      const items=await res.json();
      const out=document.getElementById('search-results');
      if(!out) return;
      const r=items.filter(it=>(it.title+it.tags+it.excerpt).toLowerCase().includes(q.toLowerCase()));
      out.innerHTML=r.map(r=>`<div class="card"><a href="${r.url}"><strong>${r.title}</strong></a><div class="byline">${r.excerpt}</div></div>`).join('')||'<div class="byline">No results.</div>';
    }catch(e){ console.error(e); }
  }
  const input=document.getElementById('search-input');
  if(input){ input.addEventListener('input',e=>runSearch(e.target.value)); runSearch(input.value||''); }
  window.loadComments=function(repo){
    const d=document.createElement('script');
    d.src='https://utteranc.es/client.js';
    d.setAttribute('repo',repo);
    d.setAttribute('issue-term','pathname');
    d.setAttribute('label','comments');
    d.setAttribute('theme','github-dark');
    d.crossOrigin='anonymous';
    d.async=true;
    (document.getElementById('comments')||document.body).appendChild(d);
  }
})();
