const githubBase = 'https://github.com/cryptape/cita/blob/develop/docs/zh-CN/'

function addEditOnGithub() {
  const match = window.location.pathname.split(/zh-CN\/next\/cita\//)
  if (match.length === 2) {
    const hEl = document.querySelector('header.postHeader')
    const eBtn = document.createElement('a')
    eBtn.textContent = '编辑'
    eBtn.setAttribute('href', `${githubBase}${match[1]}.md`)
    eBtn.setAttribute('target', '_blank')
    eBtn.setAttribute('rel', 'noreferrer noopener')
    eBtn.className = 'edit-page-link button'
    eBtn.style.marginLeft = '15px'
    hEl.prepend(eBtn)
  }
}

function translateEnUs() {
  const l = document.querySelector('.postHeader a[href$=en-US]')
  if (l) {
    l.setAttribute('href', l.href.slice(0, -3))
  }
}


function addGA() {
  if(window.location.href.indexOf('docs.citahub.com') > -1){
    var googleScript = document.createElement("script");
    googleScript.src = "https://www.googletagmanager.com/gtag/js?id=UA-134504127-3"
    googleScript.async = true;
    googleScript.onload = function(){
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-134504127-3');
    }
    document.body.append(googleScript)
  }
}

window.onload = () => {
  const welcome = '/welcome'
  const logoEl =
    document.querySelector(".fixedHeaderContainer a[href='/en-US']") ||
    document.querySelector(".fixedHeaderContainer a[href='/zh-CN']")
  logoEl.setAttribute('href', logoEl.href + welcome)

  // add edit on github
  addEditOnGithub()
  translateEnUs()

  // add Google Analytics
  addGA()
}
