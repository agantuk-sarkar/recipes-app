import { fetchAllRecipes } from "../components/fetch-recipes.js";
import { displayRecipes } from "../components/display-recipes.js";
import { searchRecipe } from "../components/fetch-recipes.js";
import { debounce } from "../utils/debounce.js";
import { navBar } from "../components/nav-bar.js";

// getting the navBar container html element into js
document.querySelector(".nav-bar").innerHTML = navBar();

// getting the html elements into js
const recipe_container = document.querySelector(".recipe-card-container");

const search_input = document.getElementById("search-input");

const sort_by_recipe = document.getElementById("sort-by-recipe");

// taking global values
let pageNo = 1;
let limit = 10;
let totalItems = 0;
let hasMoreData = true;
let searchQuery = "";

// function to resolve the promise for all rescipes
async function getAllRecipes(pageNo, limit) {
  let skip = (pageNo - 1) * limit;

  const recipes = await fetchAllRecipes(skip, limit);
  console.log("recipes2:", recipes);

  totalItems = recipes.total;

  if (skip + limit > totalItems) {
    hasMoreData = false;
  }

  showRecipes(recipes.recipes, hasMoreData);
}

loadRecipes(pageNo, limit);

// function to show recipes
function showRecipes(recipesList, hasMoreData) {
  if (recipesList && hasMoreData) {
    displayRecipes(recipesList, recipe_container);
  }
}

// to handle infinite scrolling
window.addEventListener("scroll", (event) => {
  const { clientHeight, scrollTop, scrollHeight } =
    event.target.documentElement;

  if (clientHeight + scrollTop + 10 >= scrollHeight) {
    pageNo = pageNo + 1;
    limit = 10;

    if (hasMoreData) {
      loadRecipes(pageNo, limit);
    }
  }
});

// search input event for searching all recipes
search_input.addEventListener("input", (event) => {
  const searchText = event.target.value;

  pageNo = 1;
  limit = 10;

  functionToPass(searchText, pageNo, limit);
});

const functionToPass = debounce(test, 2000);

// test function
function test(searchText) {
  recipe_container.innerHTML = "";

  searchQuery = searchText;

  pageNo = 1;
  limit = 10;

  loadRecipes(pageNo, limit);
}

// function to load recipes
function loadRecipes(pageNo, limit) {
  if (searchQuery) {
    searchAllRecipes(searchQuery, pageNo, limit);
  } else {
    getAllRecipes(pageNo, limit);
  }
}

// function to search recipes
async function searchAllRecipes(searchText, pageNo, limit) {
  let skip = (pageNo - 1) * limit;

  const searched_recipes = await searchRecipe(searchText, skip, limit);

  totalItems = searched_recipes.total;

  if (skip + limit > totalItems) {
    hasMoreData = false;
  }

  displayRecipes(searched_recipes.recipes, recipe_container);
}
