require("dotenv").config();
const express = require("express");
const axios = require("axios");

const news = express.Router();

//endpoint is /news/top-headlines?country=country&apiKey=key
news.get("/top-headlines", ({ query: { country } }, res) => {
  axios
    .get(`${process.env.NEWSAPI_URL}/top-headlines`, {
      params: {
        country: country,
      },
      headers: {
        "X-Api-Key": process.env.API_KEY,
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
      console.log("error occured for /top-headlines ", err);
    });
});

// endpoint is /news/everything?q=keyword
//defaulting page and pageSize to max value for dev account
news.get("/everything", ({ query: { q, page = 1, pageSize = 100 } }, res) => {
  axios
    .get(`${process.env.NEWSAPI_URL}/everything`, {
      params: {
        q: q,
        page: page,
        pageSize: pageSize,
      },
      headers: {
        "X-Api-Key": process.env.API_KEY,
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
      console.log("Error occurred for /everything ", err);
    });
});

module.exports = news;
