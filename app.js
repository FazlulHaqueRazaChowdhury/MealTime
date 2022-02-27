const inputField = document.getElementById('search');
const button = document.getElementById('searchBtn');
let errorField = document.getElementById('error');
document.getElementById('spinner').style.display = 'block';

let loadQoutes = () => {
    fetch('https://api.kanye.rest/')
        .then(response => response.json())
        .then(data => displayData(data, 'quotes', 3));
}
let loadDate = () => {
    fetch('http://worldclockapi.com/api/json/utc/now')
        .then(response => response.json())
        .then(data => displayData(data, 'date', 2))
}
let loadWeather = () => {
    fetch('http://api.weatherapi.com/v1/current.json?key=36c0a86441864d8e9ee154028222702&q=Sylhet&aqi=no')
        .then(response => response.json())
        .then(data => displayData(data, 'weather', 1));
}
let loadFood = inputTexts => {
    document.querySelectorAll('.card-disabled').forEach(x => x.style.display = 'block');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputTexts}`)
        .then(response => response.json())
        .then(data => dispFood(data));
}
let displayData = (textInput, id, isTrue) => {
    const texts = document.getElementById(id);

    if (isTrue == 1) {
        texts.innerText = `${textInput.current.temp_c}`;
    } else if (isTrue == 2) {
        texts.innerText = `${textInput.dayOfTheWeek} `;

    } else if (isTrue == 3) {
        texts.innerHTML = `"${textInput.quote}" `;
    }
    document.getElementById('spinner').style.display = 'none';
}
let dispFood = foods => {

    let foodContent = document.getElementById('foodConetent');
    foodContent.textContent = ' ';

    if (foods.meals === null) {

        errorField.setAttribute('class', 'text-center text-danger');
        errorField.innerText = 'No result found';

    } else {

        let stat = document.getElementById('status');

        errorField.setAttribute('class', 'text-center text-success');
        errorField.innerText = `${foods.meals.length} results found`;
        for (const food of foods.meals) {

            let createCards = document.createElement('div');
            createCards.setAttribute('class', 'card cols');
            createCards.setAttribute('style', 'width: 18rem');
            createCards.innerHTML = `

        <img src="${food.strMealThumb}" class="card-img-top " alt="...">
        <div class="card-body">
          <h5 class="card-title ">${food.strMeal}</h5>
          <p class="card-text " style="height:100px">${food.strInstructions}....</p>
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "displayModal(${food.idMeal})">
            Instructions
        </button>
        </div>`;
            foodContent.appendChild(createCards);
        }
        document.querySelectorAll('.card-disabled').forEach(x => x.style.display = 'none');
    }
}
let displayModal = urlID => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlID}`)
        .then(res => res.json())
        .then(data => modifyModal(data.meals[0]));
}
let modifyModal = details => {
    let body = document.getElementById('modal-bd');
    let title = document.getElementById('exampleModalLabel');
    let ytLink = document.getElementById('ytlink');
    ytLink.href = `${details.strYoutube}`
    title.innerText = `${details.strMeal}`
    body.innerHTML = `
    <p class='d-inline px-4 py-2 shadow '>Origin: <span class="text-danger">${details.strArea}</span></p>
    <p class='d-inline px-4 py-2 shadow '>Category: <span class="text-danger">${details.strCategory}</span></p>
    <p class = 'my-4'>    ${details.strInstructions}</p>
    `
}
let emptyIT = () => {
    let body = document.getElementById('modal-bd');
    let title = document.getElementById('exampleModalLabel');
    title.innerText = ` `
    body.innerHTML = `


    `
}
button.addEventListener('click', function() {

    let inputValue = inputField.value;
    if (inputValue === '') {
        errorField.setAttribute('class', 'text-center text-danger');
        errorField.innerText = `Please search something!`;
    } else {
        document.querySelectorAll('.card-disabled').forEach(x => x.style.display = 'block');
        loadFood(inputValue);
    }
    inputField.value = '';
})
loadDate();
loadWeather();
loadQoutes();