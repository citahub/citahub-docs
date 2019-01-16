window.onload = () => {
  const welcome = '/welcome'
  const logoEl = document.querySelector(".fixedHeaderContainer a[href^='/citahub-docs/']")
  logoEl.setAttribute('href', logoEl.href + welcome)

  // add coppase effect to sidebar
  const sidebarNavs = document.querySelectorAll('.navGroup.subNavGroup')
  sidebarNavs.forEach(nav => {
    const title = nav.querySelector('h4')
    title.addEventListener('click', () => {
      title.classList.toggle('expand')
    })
    if (
      Array.from(nav.querySelectorAll('a')).some(link => link.href === window.location.href)
    ) {
      title.classList.add('expand')
    }
  })
}
