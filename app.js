const getInputValue = () => {
    const inputValue = document.getElementById("input-value").value;
    const foodDetails = document.getElementById("food-Details");
    foodDetails.style.display = "none";

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const foodsDiv = document.getElementById("food-list");
      let foodInputValue = data.meals;
      let foodList = "";
      foodInputValue.forEach((element) => {
        foodList += ` 
          <div onClick="getDetails('${element.strMeal}')" class="meal-card">
            <img class="card-img-top" src="${element.strMealThumb}" />
            <div class="card-body">
              <h5 class="card-title text-center">${element.strMeal}</h5>
            </div>
          </div>
          `;
      });
      foodsDiv.innerHTML = foodList;
    });

    // Get meal details
}
const getDetails = (mealsDetails) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealsDetails}`;
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const meal = data.meals;
        mealDetails(meal[0]);
      });
  };

  // input  meal item

const mealDetails = (mealsDetails) => {
    const ingredientsDiv = document.getElementById("food-Details");
    ingredientsDiv.style.display = "block";
    ingredientsDiv.innerHTML = `
    <div class="meal-details">
       <img src="${mealsDetails.strMealThumb}" alt="" />
          <h2>${mealsDetails.strMeal}</h2>
           <h3>Details</h3>
          <ul >
            <li>${mealsDetails.strIngredient1}</li>
            <li>${mealsDetails.strIngredient2}</li>
            <li>${mealsDetails.strIngredient3}</li>
            <li>${mealsDetails.strIngredient4}</li>
            <li>${mealsDetails.strIngredient5}</li>
            <li>${mealsDetails.strIngredient6}</li>
            <li>${mealsDetails.strIngredient7}</li>
            <li>${mealsDetails.strIngredient8}</li>
            <li>${mealsDetails.strIngredient9}</li>
            <li>${mealsDetails.strIngredient10}</li>
          </ul>
         
          <h3>Instructions</h3>
          <p>${mealsDetails.strInstructions}</p>
    </div>
    
    `;
};