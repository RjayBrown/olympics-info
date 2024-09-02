/* Request and store API data on page load */

handleData();

/* DOM ELEMENTS */

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


/* COUNTRY CARD */

const countryCardEl = document.querySelector('.country-card')
const queryCountry = document.querySelector('.query-country');
const queryName = document.querySelector('.country-name');
const queryBronze = document.querySelector('.query-bronze');
const querySilver = document.querySelector('.query-silver');
const queryGold = document.querySelector('.query-gold');
const queryTotal = document.querySelector('.query-total-medals');

const searchField = document.querySelector('#search-field');
const searchBtn = document.querySelector('#search-btn');


/* API call */

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

    goldCountEl.innerHTML = `${data[0].total_medals}  <br> TOTAL MEDALS`;
    silverCountEl.innerHTML = `${data[1].total_medals}  <br> TOTAL MEDALS`;
    bronzeCountEl.innerHTML = `${data[2].total_medals}  <br> TOTAL MEDALS`;

    return data;
  } catch {
    const err = 'Error: Could not retrieve data!';
    console.log(err);
  }
}

/* Functions to handle country data  */

/* Getting proper ordinal value for country leaderboard position */
let getOrdinal = (num) => {
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

  let getCountry = () => {
    const input = searchField.value.toUpperCase();
    const foundObject = data.find((item) => item.id === input);
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

  let getTop3 = (i) => {
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
  searchBtn.addEventListener('click', getCountry);
}
