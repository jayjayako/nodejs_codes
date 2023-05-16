// we can integrate this on workerthreads and socketio for realtime
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateimage = async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: req.params.inputdata,
      n: 1,
      size: "512x512",
    });
    const imageurl = response.data.data[0].url;
    console.log(imageurl);
    res.send("image generated");
    res.end();
  } catch (error) {
    res.send("error");
    res.end();
  }
};

module.exports = {
  generateimage,
};
