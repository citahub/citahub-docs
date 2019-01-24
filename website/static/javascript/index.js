const githubBase = 'https://github.com/cryptape/cita/blob/develop/docs/zh-CN/'

function addEditOnGithub() {
  const match = window.location.pathname.split(/zh-CN\/cita\//)
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
window.onload = () => {
  const welcome = '/welcome'
  const logoEl = document.querySelector(".fixedHeaderContainer a[href^='/citahub-docs/']")
  logoEl.setAttribute('href', logoEl.href + welcome)

  // add edit on github
  addEditOnGithub()

  // add coppase effect to sidebar
  // const sidebarNavs = document.querySelectorAll('.navGroup.subNavGroup')
  // sidebarNavs.forEach(nav => {
  //   const title = nav.querySelector('h4')
  //   title.addEventListener('click', () => {
  //     title.classList.toggle('expand')
  //   })
  //   if (
  //     Array.from(nav.querySelectorAll('a')).some(link => link.href === window.location.href)
  //   ) {
  //     title.classList.add('expand')
  //   }
  // })
}
