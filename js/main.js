let medals;

async function getData() {
  const response = await fetch(
    'https://apis.codante.io/olympic-games/countries'
  );
  medals = await response.json();
  console.log(medals)
}
