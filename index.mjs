const apiKey = import.meta.env.VITE_API_KEY;
let interval;

const today = new Date().toISOString().split("T")[0];
document.getElementById("date_of_birth").setAttribute("max", today);

document.getElementById("calculateBtn").addEventListener("click", calculateAge);
document.getElementById("resetBtn").addEventListener("click", resetCalculator);

function calculateAge() {
  clearInterval(interval);
  const dob = new Date(document.getElementById("date_of_birth").value);
  const output = document.getElementById("output");
  const output_section = document.querySelector(".output-section");

  getFact(dob.getDate(), dob.getMonth() + 1);
  getWeather(`${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`);
  interval = setInterval(() => {
    const today = new Date();
    if (isNaN(dob.getTime())) {
      clearInterval(interval);
      alert("please enter a valid date !!!");

      return;
    }
    const ageInMilli = today - dob;
    const seconds = Math.floor(ageInMilli / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    output.textContent = `Your  age is: ${years % 365} years ${
      days % 24
    } days ${hours % 60} hours ${minutes % 60} minutes ${
      seconds % 1000
    } seconds `;
    output_section.style.display = "block";
  }, 1000);
}

function resetCalculator() {
  clearInterval(interval);
  const date_field = document.getElementById("date_of_birth");
  const output_section = document.querySelector(".output-section");
  const fact = document.getElementById("fact-output");
  const weather = document.getElementById("weather-output");
  output_section.style.display = "none";
  date_field.value = "";
  fact.textContent = "";
  weather.textContent = "";
}

let getFact = async (date, month) => {
  const fact = document.getElementById("fact-output");
  try {
    //const response = await fetch(`http://numbersapi.com/${month}/${date}/date`);
    const response = await fetch(
      `https://history.muffinlabs.com/date/${month}/${date}`
    );
    const complete_data = await response.json();
    const data = complete_data.data;
    const events = data.Events;
    const one_event = events[events.length - 2];
    const text = one_event.text;
    const year = one_event.year;

    fact.textContent = `On ${year} , ${text}`;
  } catch {
    fact.textContent = `Opps , Nothing happened on your birthday`;
  }
};

let getWeather = async (date) => {
  const weather = document.getElementById("weather-output");
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/${date}?key=A2JRCDDMBJLHEV5BFA3Q2PJTM`
    );
    const data = await response.json();
    const info = data.days[0];
    const description = info.description;
    const temp = info.temp;
    const humidity = info.humidity;
    const icon = info.icon;
    weather.textContent = `On your birthday it was ${description}, the temperature was ${temp} degree celsius and the humidity was ${humidity}`;
  } catch {
    weather.textContent =
      "Opps, May be your birth date weather information is not available";
  }
};
