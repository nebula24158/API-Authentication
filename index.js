import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "nebura";
const yourPassword = "nene";
const yourAPIKey = "dcd4a1e8-79e0-4b42-afb0-8fcfe624f00c";
const yourBearerToken = "6787c3b8-56dc-4e1a-b9dc-7e206e03b6d3";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}random`);
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
  const response = await axios.get(`${API_URL}all?page=2`, {
    auth: {
        username: yourUsername,
        password: yourPassword
    },
  })
  res.render("index.ejs",{ content: JSON.stringify(response.data)});
} catch (error) {
  res.status(404).send(error.message);
}
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}filter?score=5&apiKey=${yourAPIKey}`);
    res.render("index.ejs", {content : JSON.stringify(response.data)});
  }catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}secrets/42`, {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}` 
      },
    });
    res.render("index.ejs", {content: JSON.stringify(response.data)});
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
