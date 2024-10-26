const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

let hotels = require('./hotels');

const app = express();
const port = 3000;

app.use(cors());

function sortHotelsOnParam(a, b, sortParam, sortOrder) {
  if (sortOrder === 'low-to-high' || sortOrder === 'least-to-most') {
    return a[sortParam] - b[sortParam];
  } else if (sortOrder === 'high-to-low' || sortOrder === 'most-to-least') {
    return b[sortParam] - a[sortParam];
  }
  return 0;
}

function filterHotelsOnParam(a, filterParam, filterValue) {
  return a[filterParam].toLowerCase() == filterValue.toLowerCase();
}

// routes

app.get('/hotels/sort/pricing', (req, res) => {
  let pricing = req.query.pricing;
  let hotelsCopy = hotels.slice();
  let sortedResponse = hotelsCopy.sort((a, b) =>
    sortHotelsOnParam(a, b, 'price', pricing)
  );
  res.json(sortedResponse);
});

app.get('/hotels/sort/rating', (req, res) => {
  let rating = req.query.rating;
  let hotelsCopy = hotels.slice();
  let sortedResponse = hotelsCopy.sort((a, b) =>
    sortHotelsOnParam(a, b, 'rating', rating)
  );
  res.json(sortedResponse);
});

app.get('/hotels/sort/reviews', (req, res) => {
  let reviews = req.query.reviews;
  let hotelsCopy = hotels.slice();
  let sortedResponse = hotelsCopy.sort((a, b) =>
    sortHotelsOnParam(a, b, 'reviews', reviews)
  );
  res.json(sortedResponse);
});

app.get('/hotels/filter/amenity', (req, res) => {
  let amenity = req.query.amenity;
  let filteredResponse = hotels.filter((hotel) =>
    filterHotelsOnParam(hotel, 'amenity', amenity)
  );
  res.json(filteredResponse);
});

app.get('/hotels/filter/country', (req, res) => {
  let country = req.query.country;
  let filteredResponse = hotels.filter((hotel) =>
    filterHotelsOnParam(hotel, 'country', country)
  );
  res.json(filteredResponse);
});

app.get('/hotels/filter/category', (req, res) => {
  let category = req.query.category;
  let filteredResponse = hotels.filter((hotel) =>
    filterHotelsOnParam(hotel, 'category', category)
  );
  res.json(filteredResponse);
});

app.get('/hotels', (req, res) => {
  res.json(hotels);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
