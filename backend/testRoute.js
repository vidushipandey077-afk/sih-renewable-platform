async function testRoute() {
  const response = await fetch('http://localhost:5000/api/feasibility', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: { lat: 28.6, lon: 77.2 },
      area: 500,
      tariff: 9,
      operatingStart: "09:00",
      operatingEnd: "18:00"
    })
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

testRoute();