import { getSingleRecipeById } from "../components/fetch-recipes.js";
import { displaySingleRecipe } from "../components/display-single-recipe.js";

// Parse the URL query parameters
let query_Parameters = new URLSearchParams(window.location.search);

// Get the ID from the query parameters
let id = query_Parameters.get("id");

let recipe_container = document.querySelector(".recipe-card-container");

let singleRecipeArray = [];

async function showSingleRecipeById(id){
    const single_recipe_by_id = await getSingleRecipeById(id);
    singleRecipeArray.push(single_recipe_by_id);

    displaySingleRecipe(singleRecipeArray,recipe_container);
}
showSingleRecipeById(id)