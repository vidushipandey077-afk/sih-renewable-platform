// NASA API se solar irradiance aur wind speed data laana

async function getClimateData(lat, lon) {
  const url = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN,WS50M&community=RE&longitude=${lon}&latitude=${lat}&format=JSON`;

  const response = await fetch(url);
  const data = await response.json();

  // Annual average nikal rahe hain (ANN = Annual)
  const irradiance = data.properties.parameter.ALLSKY_SFC_SW_DWN.ANN;
  const windSpeed = data.properties.parameter.WS50M.ANN;

  return { irradiance, windSpeed };
}

module.exports = getClimateData;