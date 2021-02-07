'use strict';
const searchButton = document.getElementById('search-button');
const foodContainer = document.getElementById('foods');
const warningMessage = document.getElementById('warning-message');
// add even handler
searchButton.addEventListener('click', function () {
    const inputValue = document.getElementById('input-value').value;
    foodContainer.innerHTML = '';
    if (inputValue === '') {
        warningMessage.style.display = 'block';
    } else {
        getFoodItem(inputValue);
        warningMessage.style.display = 'none';
    }
});

const displayMealDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderMealInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};

const renderMealInfo = food => {
    const foodItemDetailsDiv = document.getElementById('foodsDetails');

    foodItemDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    
    <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
    <ul class="list-check mb-0">
        <li><i class="icon-check icons"></i>${food.strMeasure1}, ${food.strIngredient1}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure2}, ${food.strIngredient2}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure3}, ${food.strIngredient3}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure4}, ${food.strIngredient4}</li>
    </ul>
`;
};

function getFoodItem(mealId) {
    const mainUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(mainUrl)
        .then(res => res.json())
        .then(data => {
            displayFoodsItem(data.meals);
        });

    const displayFoodsItem = foods => {
        const foodsDiv = document.getElementById('foods');
        if (foods != null) {
            foods.map(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-3';
                const mealInfo = `
                        <div onclick="displayMealDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                    `;
                foodDiv.innerHTML = mealInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            warningMessage.style.display = 'block';
        }
    };
}

