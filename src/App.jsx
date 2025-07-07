import { useState } from "react";
import "./WeatherApp.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = "7e723657564a77020542c1958a8f776f";

  const getWeather = () => {
    if (!city) return alert("please enter a city");

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);
        } else {
          alert("City not found");
          setWeather(null);
        }
      })
      .catch(() => alert("Error fetching weather"));
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input-field"
      />
      <button onClick={getWeather} className="weather-button">
        Get Weather
      </button>
      {weather && (
        <div className="weather-result">
          <h2>
            {weather.name},{weather.sys.country}
          </h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
export default App;
