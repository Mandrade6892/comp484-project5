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
  }
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