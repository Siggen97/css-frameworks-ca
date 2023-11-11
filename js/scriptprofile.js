document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const runningDataApi = "http://localhost:3000/posts";
let allRunningData = [];

async function fetchData() {
    try {
        let response = await fetch(runningDataApi);
        let data = await response.json();
        allRunningData = data;
        displayData(data, 'running-data');

    }catch (error){
        console.error("Error fetching data:", error);
    }
}

function displayData(data, containerClass) {
    const container = document.querySelector(`.running-data`); 
    if (container) {
        container.innerHTML = '';
        const reversedData = [...data].reverse(); 

        reversedData.forEach((run) => {
            displayRun(run, container);
        });
    }
}


function displayRun(run, container) {
    console.log("Displaying run:", run); 
    let runDiv = document.createElement("div");
    runDiv.className = "run"; 

let title = document.createElement("h5");
title.textContent = run.title;

let date = document.createElement("p");
date.textContent = run.date;

let day = document.createElement("p");
day.textContent = run.day;

let month = document.createElement("p");
month.textContent = run.month;

let distance = document.createElement("p");
distance.textContent = run.distance;

let time = document.createElement("p");
time.textContent = run.time;

let average_pace = document.createElement("p");
average_pace.textContent = run.average_pace;

let city = document.createElement("p");
city.textContent = run.city;

let calories = document.createElement("p");
calories.textContent = run.calories;

let description = document.createElement("p");
description.textContent = run.description;
description.className = "description";


    runDiv.appendChild(title);
    runDiv.appendChild(date);
    runDiv.appendChild(day);
    runDiv.appendChild(month);
    runDiv.appendChild(distance);
    runDiv.appendChild(time);
    runDiv.appendChild(average_pace);
    runDiv.appendChild(city);
    runDiv.appendChild(calories);
    runDiv.appendChild(description);

    container.appendChild(runDiv);
}

