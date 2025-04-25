async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherResult = document.getElementById("weatherResult");
    const apiKey = "6b29168ef4f4dbe61c7dec77d16a9a2c"; 
  
    if (!city) {
      weatherResult.innerHTML = "<p class='error'>Please enter a city name.</p>";
      return;
    }
  
    weatherResult.innerHTML = "<p>Loading...</p>";
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
  
      if (!response.ok) {
        throw new Error("City not found");
      }
  
      const data = await response.json();
  
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  
      weatherResult.innerHTML = `
        <h2>${city}</h2>
        <img src="${iconUrl}" alt="${description}">
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Condition:</strong> ${description}</p>
      `;
    } catch (error) {
      weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
    }
  }
  