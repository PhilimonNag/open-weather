const OpenAI = require("openai");
const apiKey = process.env.API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;
const openai = new OpenAI({ apiKey });
const axios = require("axios");
const weatherImage = async (req, res) => {
  try {
    let city = req.params.city;
    city = encodeURIComponent(city);
    const baseUrl =
      "https://api.weatherapi.com/v1/forecast.json?key=" +
      weatherApiKey +
      "%20&days=10&aqi=yes&alerts=yes&q=" +
      city;
    const result = await axios.get(baseUrl);
    const weather = result.data;
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: `unrealistic image of ${weather.location.name} with ${weather.current.text} weather condition`,
    });
    res.json({ image: image.data[0].url, weather });
  } catch (error) {
    console.log("catch err", error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = weatherImage;
