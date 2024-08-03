async function getData() {
  const response = await fetch(
    'https://apis.codante.io/olympic-games/countries'
  );
  const medals = await response.json();
  return medals;
}
