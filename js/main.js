getData();

async function getData() {
  const goldFlagEl = document.querySelector('.gold-TM');
  const silverFlagEl = document.querySelector('.silver-TM');
  const bronzeFlagEl = document.querySelector('.bronze-TM');

  const goldCountEl = document.querySelector('.gold-TMC');
  const silverCountEl = document.querySelector('.silver-TMC');
  const bronzeCountEl = document.querySelector('.bronze-TMC');
  try {
    const res = await fetch('https://apis.codante.io/olympic-games/countries');
    const countries = await res.json();
    const data = countries.data;
    data.sort((a, b) => b.total_medals - a.total_medals);

    goldFlagEl.src = data[0].flag_url;
    silverFlagEl.src = data[1].flag_url;
    bronzeFlagEl.src = data[2].flag_url;

    goldCountEl.textContent = data[0].total_medals;
    silverCountEl.textContent = data[1].total_medals;
    bronzeCountEl.textContent = data[2].total_medals;
    return data;
  } catch {
    const err = 'Error: Could not retrieve data';
    console.log(err);
  }
}
