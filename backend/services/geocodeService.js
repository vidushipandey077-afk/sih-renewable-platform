// Address ko lat-long mein convert karna (OpenStreetMap Nominatim API)

async function getCoordinates(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

  const response = await fetch(url, {
    headers: { 'User-Agent': 'SIH-Renewable-Platform' }
  });

  const data = await response.json();

  if (data.length === 0) {
    throw new Error("Location nahi mili, dobara try karo");
  }

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon)
  };
}

module.exports = getCoordinates;