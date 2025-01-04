/* Request country data from olympic results API and display top 3 countries when the page loads */

displayCountryData();

/* MOBILE NAV MENU */
/*-----------------*/

const navMenu = document.querySelector('.mobile-menu');
const burgerIcon = document.querySelector('.burger');
burgerIcon.addEventListener('click', showMobileNav);
const closeMenuLink = document.querySelector('.close');
closeMenuLink.addEventListener('click', hideMobileNav);

function showMobileNav() {
  navMenu.style.zIndex = 4;
  burgerIcon.style.opacity = 0;
  if (window.innerWidth > 480) {
    navMenu.style.left = '50%';
  } else if (window.innerWidth < 480) {
    navMenu.style.left = '0%';
  }
}

function hideMobileNav() {
  navMenu.style.left = '100%';
  navMenu.style.zIndex = 0;
  setTimeout(() => { burgerIcon.style.opacity = 1 }, 250);
}

/* DOM ELEMENTS */
/*--------------*/

/* TOP 3 COUNTRY CARDS */
const goldCard = document.querySelector('.gold');
const silverCard = document.querySelector('.silver');
const bronzeCard = document.querySelector('.bronze');

const goldFlag = document.querySelector('.gold-flag');
const silverFlag = document.querySelector('.silver-flag');
const bronzeFlag = document.querySelector('.bronze-flag');

const goldCount = document.querySelector('.gold-TMC');
const silverCount = document.querySelector('.silver-TMC');
const bronzeCount = document.querySelector('.bronze-TMC');


/* SEARCH */
const searchField = document.querySelector('#search-field');
const searchBtn = document.querySelector('#search-btn');
const alert = document.querySelector('.alert');


/* COUNTRY CARD */
const countryCard = document.querySelector('.country-card');
const queryCountry = document.querySelector('.query-country');
const countryName = document.querySelector('.country-name');
const bronzeMedalCount = document.querySelector('.query-bronze');
const silverMedalCount = document.querySelector('.query-silver');
const goldMedalCount = document.querySelector('.query-gold');
const totalMedalCount = document.querySelector('.query-total-medals');


/* ASYNC-AWAIT FUNCTIONS */
/*-----------------------*/

/* MAIN API CALL TO GET & SORT OLYMPICS DATA */

async function getData() {
  try {
    const res = await fetch('https://apis.codante.io/olympic-games/countries');
    const countries = await res.json();
    const data = countries.data;

    /* Using total medal count to sort the array of countries in descending order (see console log in browser) */
    data.sort((a, b) => b.total_medals - a.total_medals);
    console.log(data);

    return data; // returns sorted array of countries for use in the displayCountryData function
  } catch {
    const err = 'Error: Could not retrieve data!';
    console.log(err);
  }
}

/* Async function to display country medal details on page load (function called at top of the file) */
async function displayCountryData() {
  const data = await getData(); // requests country data from API

  /* Displaying top 3 country cards (using index) */
  goldFlag.src = data[0].flag_url;
  silverFlag.src = data[1].flag_url;
  bronzeFlag.src = data[2].flag_url;

  goldCount.innerHTML = `${data[0].id} <br> Total Medals <br> ${data[0].total_medals}`;
  silverCount.innerHTML = `${data[1].id} <br> Total Medals <br> ${data[1].total_medals}`;
  bronzeCount.innerHTML = `${data[2].id} <br> Total Medals <br> ${data[2].total_medals}`;

  /* Add event listener to the top 3 country cards */
  goldCard.addEventListener('click', getGold);
  silverCard.addEventListener('click', getSilver);
  bronzeCard.addEventListener('click', getBronze);

  /* Show card in lower section when top 3 country card is clicked (using index) */
  function showFromTopCard(index) {
    alert.textContent = ''
    const foundCountry = data.find((item) => item.id === data[index].id);
    countryCard.classList.remove('hidden');
    queryCountry.scrollIntoView({ behavior: 'smooth' });
    queryCountry.src = foundCountry.flag_url;
    let ord = getOrdinal(foundCountry.rank_total_medals);
    countryName.textContent = `${foundCountry.id} - ${foundCountry.rank_total_medals}${ord}`;
    bronzeMedalCount.textContent = `BRONZE: ${foundCountry.bronze_medals}`;
    silverMedalCount.textContent = `SILVER: ${foundCountry.silver_medals}`;
    goldMedalCount.textContent = `GOLD: ${foundCountry.gold_medals}`;
    totalMedalCount.innerHTML = `TOTAL MEDALS <br> ${foundCountry.total_medals}`;
  }

  function getGold() {
    showFromTopCard(0);
  }

  function getSilver() {
    showFromTopCard(1);
  }

  function getBronze() {
    showFromTopCard(2);
  }

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

  /* Search by 3-letter country code */
  searchBtn.addEventListener('click', searchCountry);

  function searchCountry() {
    const input = searchField.value.toUpperCase();
    alert.textContent = '';
    if (input) {
      const foundCountry = data.find((item) => item.id === input);
      if (!foundCountry) {
        alert.textContent = 'Country code not found';
      } else {
        countryCard.classList.remove('hidden');
        queryCountry.scrollIntoView({ behavior: 'smooth' });
        queryCountry.src = foundCountry.flag_url;
        let ord = getOrdinal(foundCountry.rank_total_medals);
        countryName.textContent = `${foundCountry.id} - ${foundCountry.rank_total_medals}${ord}`;
        bronzeMedalCount.textContent = `BRONZE: ${foundCountry.bronze_medals}`;
        silverMedalCount.textContent = `SILVER: ${foundCountry.silver_medals}`;
        goldMedalCount.textContent = `GOLD: ${foundCountry.gold_medals}`;
        totalMedalCount.innerHTML = `TOTAL MEDALS: <br> ${foundCountry.total_medals}`;
        input.value = '';
      }
    } else {
      alert.textContent = 'Country code required';
    }
  }
}
