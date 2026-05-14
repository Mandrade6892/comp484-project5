const locations = [
    {
        name: "Bookstore",
        bounds: {
            north: 34.2419,
            south: 34.2414,
            east: -118.5272,
            west: -118.5280
        }
    },
    {
        name: "Bayramian Hall",
    bounds: {
      north: 34.2408,
      south: 34.2402,
      east: -118.5300,
      west: -118.5310
    }
  },
  {
  name: "Addie Klotz Student Health Center",
  grid: "F3",
  bounds: {
    north: 34.2407,
    south: 34.2399,
    east: -118.5253,
    west: -118.5264
  }
}
];
let currentQuestion = 0;
let correct = 0;
let incorrect = 0;
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.2407, lng: -118.5293 },
        zoom: 17,
        disableDefaultUI: true,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
    });

    map.addListener("dblclick", checkAnswer);
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion < locations.length) {
        document.getElementById("question").textContent = `Where is ${locations[currentQuestion].name}?`;
    } else {
        document.getElementById("question").textContent = "Quiz complete!";
        document.getElementById("message").textContent = `Correct: ${correct}, Incorrect: ${incorrect}`;
        map.removeListener("dblclick", checkAnswer);
    }

function checkAnswer(event) {
  const clickedLat = event.latLng.lat();
  const clickedLng = event.latLng.lng();

  const answer = locations[currentQuestion];

  const isCorrect =
    clickedLat <= answer.bounds.north &&
    clickedLat >= answer.bounds.south &&
    clickedLng <= answer.bounds.east &&
    clickedLng >= answer.bounds.west;

  if (isCorrect) {
    correct++;
    document.getElementById("message").textContent = "Correct!";
  } else {
    incorrect++;
    document.getElementById("message").textContent = "Sorry, wrong location.";
  }

  currentQuestion++;
}