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
    console.log("recipes2:",recipes);

    totalItems = recipes.total;
    console.log("totalItems:",totalItems);

    if(skip + limit > totalItems){
        hasMoreData = false;
    }

    console.log("recipes:",recipes.recipes);

    showRecipes(recipes.recipes,hasMoreData);

}
getAllRecipes(pageNo,limit);

// function to show recipes
function showRecipes(recipesList,hasMoreData){
    if(recipesList && hasMoreData){
        displayRecipes(recipesList,recipe_container);
    }
}

// to handle infinite scrolling
window.addEventListener("scroll", (event) => {
  
    const { clientHeight, scrollTop, scrollHeight } =
      event.target.documentElement;

      console.log("clientHeight:",clientHeight);
      console.log("scrollTop:",scrollTop);
      console.log("scrollHeight:",scrollHeight);

  
    if (clientHeight + scrollTop === scrollHeight) {
      pageNo = pageNo + 1;
      limit = 10;
  
      if (hasMoreData) {
        getAllRecipes(pageNo, limit);
      }
    }
  });