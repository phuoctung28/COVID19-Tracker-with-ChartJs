const labels = ["Confirmed", "Deaths"];
const url = "https://covid19.mathdro.id/api/countries";
const submitBtn = document.getElementById("country-btn");
let countries = document.getElementById("country-inp");
let country_data = [];
let configChart = (data1, data2, lastUpdate) => {
  let data = {
    labels: [`Covid19 - ${lastUpdate}`],
    datasets: [
      {
        label: "Confirmed",
        backgroundColor: ["rgb(255, 205, 86)"],
        data: [data1]
      },
      {
        label: "Deaths",
        backgroundColor: ["rgb(255, 99, 132)"],
        data: [data2]
      },
    ],
  };
  return {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: `Covid-19 Tracker`,
        },
      },
    },
  };
};
const getCountryData = () => {
  fetch(`${url}/${countries.value}`)
    .then((response) => response.json())
    .then((data) => {
      myChart.destroy();
      myChart = new Chart(
        document.getElementById("chart"),
        configChart(data.confirmed.value, data.deaths.value, data.lastUpdate)
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

submitBtn.addEventListener("click", () => {
  getCountryData();
  console.log(countries);
});

let myChart = new Chart(document.getElementById("chart"), configChart(4, 5));
