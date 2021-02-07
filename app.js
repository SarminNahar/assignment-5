const searchButton = document.getElementById('search-button');
const mealsInfo = document.getElementById('mealDetail');
const mealItemInfo = document.getElementById('mealItems');

searchButton.addEventListener('click', function(){
    const inputValue = document.getElementById('input-value');
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f="+inputValue+"")
    .then(res => res.json)
    .then(data => {
        const mealImage = data.meals[0].strMealThumb;
        document.getElementById('foodImage').src = `https://www.themealdb.com/images/media/meals/${mealImage}.jpg/preview`
    })

})