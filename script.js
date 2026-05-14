const locations = [
  {
    name: "Bookstore",
    bounds: {
        north: 34.2378,
        south: 34.2369,
        east: -118.5277,
        west: -118.5287
    }
  },
  {
    
  name: "Bayramian Hall",
  bounds: {
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

let currentQuestion = 0;
let correct = 0;
let incorrect = 0;
let map;
let timer = 0;
let timerInterval;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.2397, lng: -118.5286 },
    zoom: 16.7,
    disableDefaultUI: true,
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  });

  map.addListener("dblclick", checkAnswer);
  loadQuestion();

  startTimer();
}
function startTimer() {
     timerInterval = setInterval(function () {
    timer++;
    document.getElementById("timer").textContent = `Time: ${timer} seconds`;
  }, 1000);
}

function loadQuestion() {
  if (currentQuestion < locations.length) {
    document.getElementById("question").textContent =
      `Where is ${locations[currentQuestion].name}?`;
  } else {
    clearInterval(timerInterval);

    document.getElementById("question").textContent = "Quiz complete!";
    document.getElementById("message").textContent =
      `Correct: ${correct}, Incorrect: ${incorrect}`;
    
  }
}

function checkAnswer(event) {
    if (currentQuestion >= locations.length) {
        return;
    }
    console.log("Double Click detected");

  const clickedLat = event.latLng.lat();
  const clickedLng = event.latLng.lng();

  console.log("Latitude:", clickedLat);
  console.log("Longitude:", clickedLng);


  const answer = locations[currentQuestion];

  const isCorrect =
    clickedLat <= answer.bounds.north &&
    clickedLat >= answer.bounds.south &&
    clickedLng <= answer.bounds.east &&
    clickedLng >= answer.bounds.west;

  new google.maps.Rectangle({
    bounds: answer.bounds,
    map: map,
    fillColor: isCorrect ? "green" : "red",
    fillOpacity: 0.35,
    strokeWeight: 2
  });

  if (isCorrect) {
    correct++;
    document.getElementById("message").textContent = "Correct!";
  } else {
    incorrect++;
    document.getElementById("message").textContent = "Sorry, wrong location.";
  }

  currentQuestion++;
  loadQuestion();
}