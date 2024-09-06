handleData()

/* MOBILE NAV */

const navEl = document.querySelector('.mobile-menu')
const burgerEl = document.querySelector('.burger')
burgerEl.addEventListener('click', showMobileNav)
const menuEl = document.querySelector('.close')
menuEl.addEventListener('click', hideMobileNav)

function showMobileNav() {
  if (window.innerWidth > 480) {
    navEl.style.left = '50%'
    navEl.style.zIndex = 4
    burgerEl.style.opacity = 0
  } else if (window.innerWidth < 480) {
    navEl.style.left = '40%'
    navEl.style.zIndex = 4
    burgerEl.style.opacity = 0
  }
}

function hideMobileNav() {
  navEl.style.left = '100%'
  // navEl.style.opacity = 0
  navEl.style.zIndex = 0
  burgerEl.style.opacity = 1
}

async function getData() {
  try {
    const res = await fetch('https://apis.codante.io/olympic-games/disciplines')
  } catch {
    const err = 'Error: Could not retrieve data'
    console.log(err)
  }
}

async function handleData() {
  const data = await getData()

  console.log(data)
}