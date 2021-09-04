const express = require("express");

const app = express();
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));

function makeLink(string) {
  return string
    .split(" ")
    .join("-")
    .split(".")
    .join("")
    .split("'")
    .join("")
    .split(",")
    .join("")
    .split("’")
    .join("")
    .split("?")
    .join("")
    .toLowerCase();
}

const jokesArr = [
  "Light travels faster than sound. That's why some people appear bright until they speak",
  "I was wondering why the ball was getting bigger. Then it hit me",
  "I have a few jokes about unemployment. But they dont work",
  "How do you make holy water? You boil the hell out of it",
  "Last night, I dreamed I was swimming in an ocean of orange soda. But it was just a Fanta Sea",
  "When life gives you melons, you're probably dyslexic",
  "What do you call a bee that can’t make up its mind? A maybe",
  "England doesn't have a kidney bank, but it does have a Liverpool",
  "Did you hear about the guy that had is whole left side cut off? He's all right now",
  "My dad, unfortunately, passed away when we couldn’t remember his blood type… His last words to us were, “Be positive!”",
  "I wasn’t originally going to get a brain transplant, but then I changed my mind",
  "There was a kidnapping at school yesterday. Don’t worry, though - he woke up",
  "What do you call the wife of a hippie? A Mississippi",
];

app.get("/", (req, res) => {
  console.log(req.params);
  res.render("home-page");
});

app.get("/about", (req, res) => {
  res.render("about-page");
});

app.get("/jokes", (req, res) => {
  res.render("jokes", {
    jokes: jokesArr.map((joke) => {
      return {
        joke,
        link: makeLink(joke),
      };
    }),
  });
});

app.get("/joke/:chosenJoke", (req, res) => {
  console.log(req.params);

  const theOneJokeChosen = jokesArr.find((joke) => {
    return makeLink(joke) === req.params.chosenJoke;
  });

  res.render("single-joke", { chosenJoke: theOneJokeChosen });
});

app.get("/jokes/random", (req, res) => {
  const randomJoke = Math.floor(Math.random() * jokesArr.length);
  res.render("jokes", { randomJoke: jokesArr[randomJoke] });
});

app.get("/search", (req, res) => {
  console.log("REQUEST REACHED HERE", req.query);
  if (req.query.location && req.query.money) {
    res.render("search-page", {
      location: req.query.location,
      money: req.query.money,
      currency: req.query.currency,
    });
    return;
  }
  res.render("search-page");
});

app.get("/add-joke", (req, res) => {
  res.render("add-joke");
});

app.post("/add-joke", (req, res) => {
  const { newJoke } = req.body;
  jokesArr.unshift(newJoke);

  res.redirect("/jokes");
});

app.get("/results", (req, res) => {
  console.log("REQUEST REACHED HERE", req.query);
  res.render("home-page");
});

// /s/Florence--Italie/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_dates%5B%5D=october&flexible_trip_dates%5B%5D=september&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=calendar&query=Florence%2C%20Italie&place_id=ChIJrdbSgKZWKhMRAyrH7xd51ZM&checkin=2021-09-10&checkout=2021-09-17&adults=8&children=1&infants=1&source=structured_search_input_header&search_type=autocomplete_click
// app.get("/s/Florence--Italie/homes")
// /s/New-York--NY--United-States/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_dates%5B%5D=october&flexible_trip_dates%5B%5D=september&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=calendar&checkin=2021-09-10&checkout=2021-09-17&adults=8&children=1&infants=1&source=structured_search_input_header&search_type=autocomplete_click&query=New%20York%2C%20NY%2C%20United%20States&place_id=ChIJOwg_06VPwokRYv534QaPC8g
// app.get("/s/New-York--NY--UnitedStates/homes")
// the dynamic part of a url construction is called url parameters
// https://www.skyscanner.nl/transport/flights/ams/flr/210910/210917/?adults=8&adultsv2=8&cabinclass=economy&children=0&childrenv2=&destinationentityid=27541640&inboundaltsenabled=false&infants=0&originentityid=27536561&outboundaltsenabled=false&preferdirects=true&preferflexible=true&ref=home&rtn=1
// app.get("/transport/flights/ams/flr/210910/210917/>?")
// https://www.skyscanner.nl/transport/flights/mad/dps/210916/211007/?adults=8&adultsv2=8&cabinclass=economy&children=0&childrenv2=&destinationentityid=27540795&inboundaltsenabled=false&infants=0&originentityid=27544850&outboundaltsenabled=false&preferdirects=false&preferflexible=true&ref=home&rtn=1
// app./get("/transport/flights/mad/:origin/:destination/:goDate/:returnDate")

app.get(
  "/transport/flights/:origin/:destination/:goDate/:returnDate",
  (req, res) => {
    console.log("the params:", req.params);

    res.render("home-page");
  }
);

app.get("/s/:mufasa/homes", (req, res) => {
  //   console.log("this is a dynamic area", req);
  res.render("home-page");
});

app.listen(8000, () => {
  console.log(`Server is 🏃‍♂️ on PORT 🚣‍♀️ (Port, boat, get it? 🤙) 8️⃣ 0️⃣ 0️⃣ 0️⃣ `);
});

// JAVASCRIPT
// Falsy Values
// 0, undefined, NaN, null,  "" , -0
// all of these values are, for javascript, considered when doing if statements as if they are all behaving as false

// Truthy Values
// any string thats not empty, any number thats $ne 0 or  -0, [],

// Moustaches / Handlebars
// Falsy Values
// 0, undefined, NaN, null,  "" , -0, []
// all of these values are, for javascript, considered when doing if statements as if they are all behaving as false

// Truthy Values
// any string thats not empty, any number thats $ne 0 or  -0, any array thats not empty

// GOALS FOR THE REST OF THE DAY
// BE ABLE TO HAVE NEW JOKES BE ADDED FROM THE CLIENT SIDE
// UNDERSTAND THE SYNTAX
// AND ALSO HAVE SOME KIND OF DYNAMIC SECTION IN OUR APP
