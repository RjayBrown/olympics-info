/* Request and store API data on page load */

handleData();

/* DOM ELEMENTS */

/* MOBILE NAV */

const navEl = document.querySelector('.mobile-menu')
const burgerEl = document.querySelector('.burger')
burgerEl.addEventListener('click', showMobileNav)
const menuEl = document.querySelector('.close')
menuEl.addEventListener('click', hideMobileNav)

function showMobileNav() {
  navEl.style.zIndex = 4
  burgerEl.style.opacity = 0
  if (window.innerWidth > 480) {
    navEl.style.left = '50%'
  } else if (window.innerWidth < 480) {
    navEl.style.left = '40%'
  }
}

function hideMobileNav() {
  navEl.style.left = '100%'
  navEl.style.zIndex = 0
  burgerEl.style.opacity = 1
}


/* TOP 3 */

const goldEl = document.querySelector('.gold');
const silverEl = document.querySelector('.silver');
const bronzeEl = document.querySelector('.bronze');

const goldFlagEl = document.querySelector('.gold-flag');
const silverFlagEl = document.querySelector('.silver-flag');
const bronzeFlagEl = document.querySelector('.bronze-flag');

const goldCountEl = document.querySelector('.gold-TMC');
const silverCountEl = document.querySelector('.silver-TMC');
const bronzeCountEl = document.querySelector('.bronze-TMC');

/* SEARCH */

const searchField = document.querySelector('#search-field');
const searchBtn = document.querySelector('#search-btn');
const alert = document.querySelector('.alert')


/* COUNTRY CARD */

const countryCardEl = document.querySelector('.country-card')
const queryCountry = document.querySelector('.query-country');
const queryName = document.querySelector('.country-name');
const queryBronze = document.querySelector('.query-bronze');
const querySilver = document.querySelector('.query-silver');
const queryGold = document.querySelector('.query-gold');
const queryTotal = document.querySelector('.query-total-medals');


/* API CALL */

async function getData() {
  try {
    const res = await fetch('https://apis.codante.io/olympic-games/countries');
    const countries = await res.json();
    const data = countries.data;
    data.sort((a, b) => b.total_medals - a.total_medals);
    // console.log(data)

    goldFlagEl.src = data[0].flag_url;
    silverFlagEl.src = data[1].flag_url;
    bronzeFlagEl.src = data[2].flag_url;

    goldCountEl.innerHTML = `${data[0].id} <br> Total Medals <br> ${data[0].total_medals}`;
    silverCountEl.innerHTML = `${data[1].id} <br> Total Medals <br> ${data[1].total_medals}`;
    bronzeCountEl.innerHTML = `${data[2].id} <br> Total Medals <br> ${data[2].total_medals}`;

    return data;
  } catch {
    const err = 'Error: Could not retrieve data!';
    console.log(err);
  }
}

/* HANDLE COUNTRY DATA  */

/* Getting proper ordinal string value ('st' || 'nd' || 'rd' || 'th') for country leaderboard position */

const getOrdinal = (num) => {
  let ordinal
  if (num === 1 || +String(num)[0] > 1 && +String(num)[1] === 1 || +String(num)[2] === 1) {
    ordinal = 'st';
  } else if (num === 2 || +String(num)[0] > 1 && +String(num)[1] === 2 || +String(num)[2] === 2) {
    ordinal = 'nd';
  } else if (num === 3 || +String(num)[0] > 1 && +String(num)[1] === 3 || +String(num)[2] === 3) {
    ordinal = 'rd';
  } else {
    ordinal = 'th';
  }
  return ordinal;
}

/* Displaying country medal details */

async function handleData() {
  const data = await getData();

  let searchCountry = () => {
    const input = searchField.value.toUpperCase();
    alert.textContent = ''
    if (input) {
      const foundObject = data.find((item) => item.id === input);
      if (!foundObject) {
        alert.textContent = '*Country not found'
      } else {
        countryCardEl.classList.remove('hidden');
        queryCountry.scrollIntoView({ behavior: 'smooth' });
        queryCountry.src = foundObject.flag_url;
        let ord = getOrdinal(foundObject.rank_total_medals)
        queryName.textContent = `${foundObject.id} - ${foundObject.rank_total_medals}${ord}`
        queryBronze.textContent = `BRONZE: ${foundObject.bronze_medals}`
        querySilver.textContent = `SILVER: ${foundObject.silver_medals}`
        queryGold.textContent = `GOLD: ${foundObject.gold_medals}`
        queryTotal.innerHTML = `TOTAL MEDALS: <br> ${foundObject.total_medals}`;
        input.value = '';
      }
    } else {
      alert.textContent = '*Country code required'
    }
  }

  let getTop3 = (i) => {
    alert.textContent = ''
    const foundObject = data.find((item) => item.id === data[i].id);
    countryCardEl.classList.remove('hidden');
    queryCountry.scrollIntoView({ behavior: 'smooth' });
    queryCountry.src = foundObject.flag_url;
    let ord = getOrdinal(foundObject.rank_total_medals);
    queryName.textContent = `${foundObject.id} - ${foundObject.rank_total_medals}${ord}`;
    queryBronze.textContent = `BRONZE: ${foundObject.bronze_medals}`;
    querySilver.textContent = `SILVER: ${foundObject.silver_medals}`;
    queryGold.textContent = `GOLD: ${foundObject.gold_medals}`;
    queryTotal.innerHTML = `TOTAL MEDALS <br> ${foundObject.total_medals}`;
  }

  let getGold = () => {
    getTop3(0);
  }

  let getSilver = () => {
    getTop3(1);
  }

  let getBronze = () => {
    getTop3(2);
  }

  goldEl.addEventListener('click', getGold);
  silverEl.addEventListener('click', getSilver);
  bronzeEl.addEventListener('click', getBronze);
  searchBtn.addEventListener('click', searchCountry);
}
