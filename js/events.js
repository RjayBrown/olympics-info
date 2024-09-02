getData()

async function getData() {
  try {
    const res = await fetch('https://apis.codante.io/olympic-games/disciplines')
    const data = await res.json()
    console.log(data)
  } catch {
    const err = 'Error: Could not retrieve data'
    console.log(err)
  }
}