const locations = [
  {
    name: "Bookstore",
    bounds: {
        // basically the invisible square area for the bookstore
        north: 34.2378,
        south: 34.2369,
        east: -118.5277,
        west: -118.5287
    }
  },
  {
    
  name: "Bayramian Hall",
  bounds: {
    // same idea here, if the player double clicks inside this box it counts
    north: 34.2413,
    south: 34.2397,
    east: -118.5292,
    west: -118.5317
  }
},
{
  name: "Student Recreation Center",
  grid: "F3",
  bounds: {
    north: 34.2412,
    south: 34.2394,
    east: -118.5247,
    west: -118.5269
  }
},
{
    name: "Klotz Student Health Center",
    bounds: {
        north: 34.2386,
        south: 34.2378,
        east: -118.5259,
        west: -118.5269
    }
},
{
    name: "Jacaranda Hall",
    bounds: {
        north: 34.2419,
        south: 34.2409,
        east: -118.5278,
        west: -118.5288
    }
}
];

// keeps track of what question the user is on
let currentQuestion = 0;

// score tracking
let correct = 0;
let incorrect = 0;

// map variable
let map;

// timer stuff
let timer = 0;
let timerInterval;

function initMap() {

  // creates the actual Google map
  map = new google.maps.Map(document.getElementById("map"), {

    // centered around CSUN
    center: { lat: 34.2397, lng: -118.5286 },

    zoom: 16.7,

    styles: [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ],

    // removes extra UI because I wanted the map cleaner and more focused
    disableDefaultUI: true,

    // prevents the player from dragging around the map
    draggable: false,

    // disables zooming with the mouse wheel
    scrollwheel: false,

    // stops Google Maps from zooming in on double click
    // because double click is how we answer questions
    disableDoubleClickZoom: true
  });

  // listens for a double click on the map
  map.addListener("dblclick", checkAnswer);

  // loads the first question
  loadQuestion();

  // starts the timer as soon as the quiz starts
  startTimer();
}

function startTimer() {

  // setInterval runs every 1 second
  timerInterval = setInterval(function () {

    // increases timer by 1 each second
    timer++;

    // updates the timer text on screen
    document.getElementById("timer").textContent =
      `Time: ${timer} seconds`;

  }, 1000);
}

function loadQuestion() {

  // checks if there are still questions left
  if (currentQuestion < locations.length) {

    // updates the question text using the current location
    document.getElementById("question").textContent =
      `Where is ${locations[currentQuestion].name}?`;

  } else {

    // stops the timer once the quiz is over
    clearInterval(timerInterval);

    // final messages
    document.getElementById("question").textContent =
      "Quiz complete!";

    document.getElementById("message").textContent =
      `Correct: ${correct}, Incorrect: ${incorrect}`;
    
  }
}

function checkAnswer(event) {

    // prevents extra clicks after the quiz is already done
    if (currentQuestion >= locations.length) {
        return;
    }

    console.log("Double Click detected");

  // gets the latitude and longitude where the user clicked
  const clickedLat = event.latLng.lat();
  const clickedLng = event.latLng.lng();

  console.log("Latitude:", clickedLat);
  console.log("Longitude:", clickedLng);

  // gets the correct answer object from the array
  const answer = locations[currentQuestion];

  // checks if the click happened inside the invisible bounds box
  const isCorrect =
    clickedLat <= answer.bounds.north &&
    clickedLat >= answer.bounds.south &&
    clickedLng <= answer.bounds.east &&
    clickedLng >= answer.bounds.west;

  // draws a rectangle on the map to show the actual answer area
  new google.maps.Rectangle({
    bounds: answer.bounds,
    map: map,

    // green if correct, red if wrong
    fillColor: isCorrect ? "green" : "red",

    fillOpacity: 0.35,
    strokeWeight: 2
  });

  if (isCorrect) {

    // adds to correct score
    correct++;

    document.getElementById("message").textContent =
      "Correct!";

  } else {

    // adds to incorrect score
    incorrect++;

    document.getElementById("message").textContent =
      "Sorry, wrong location.";
  }

  // moves to next question
  currentQuestion++;

  // loads the next location
  loadQuestion();
}