const apiKey = "4a0088c190062dab701ea818c2c578c4";

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  const background = document.getElementById("container");
  if (city === "") {
    resultDiv.innerHTML = "please enter a city Name";
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found!");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const city = data.name;
      const temp = data.main.temp;
      const weather = data.weather[0].description;
      //   console.log(data.weather[0].main);
      resultDiv.innerHTML = `City: ${city} Weather: ${weather} temprature: ${temp}`;
      const weatherType = data.weather[0].main;
      console.log(weatherType);
      const video = document.getElementById("bgVideo").querySelector("source");

      if (weatherType === "Clouds") {
        container.classList.remove("bg-white");
        container.classList.add("bg-transparent");
        video.src =
          "https://videos.pexels.com/video-files/3129769/3129769-uhd_2560_1440_30fps.mp4";
      } else if (weatherType === "Clear") {
        video.src =
          "https://cdn.pixabay.com/video/2020/10/23/53141-472583449_large.mp4";
      } else if (weatherType === "Rain") {
        video.src =
          "https://cdn.pixabay.com/video/2023/02/26/152265-802516290_large.mp4";
      } else {
        video.src = "";
      }

      // Reload video after changing source
      document.getElementById("bgVideo").load();
    })
    .catch((e) => {
      resultDiv.innerHTML = e.message;
    });
});
