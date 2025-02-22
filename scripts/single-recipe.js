import { getSingleRecipeById } from "../components/fetch-recipes.js";
import { displayRecipes } from "../components/display-recipes.js";
// Parse the URL query parameters
let query_Parameters = new URLSearchParams(window.location.search);

console.log("queryParams:",query_Parameters);

// Get the ID from the query parameters
let id = query_Parameters.get("id");
console.log("id:",id);

let recipe_container = document.querySelector(".recipe-card-container");

let arr = [];

async function showSingleRecipeById(id){
    const single_recipe_by_id = await getSingleRecipeById(id);
    console.log(single_recipe_by_id);
    arr.push(single_recipe_by_id);

    displayRecipes(arr,recipe_container);
}
showSingleRecipeById(id)