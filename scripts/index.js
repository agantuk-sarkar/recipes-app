import { fetchAllRecipes } from "../components/fetch-recipes.js";
import { displayRecipes } from "../components/display-recipes.js";


// getting the html elements into js
const recipe_container = document.querySelector(".recipe-card-container");

// taking global values
let pageNo = 1;
let limit = 10;
let totalItems = 0;
let hasMoreData = true;

// function to resolve the promise for all rescipes
async function getAllRecipes(pageNo,limit){
    let skip = (pageNo - 1) * limit;

    const recipes = await fetchAllRecipes(skip,limit);

    totalItems = recipes.total;

    if(skip + limit > totalItems){
        hasMoreData = false;
    }

    console.log("recipes:",recipes.recipes);

    showRecipes(recipes.recipes);

}
getAllRecipes(pageNo,limit);

// function to show recipes
function showRecipes(recipesList){
    if(recipesList){
        displayRecipes(recipesList,recipe_container);
    }
}