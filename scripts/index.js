import { fetchAllRecipes } from "../components/fetch-recipes.js";
import { displayRecipes } from "../components/display-recipes.js";
import { searchRecipe } from "../components/fetch-recipes.js";
import { debounce } from "../utils/debounce.js";
import { navBar } from "../components/nav-bar.js";
import { getRecipeByTagName } from "../components/fetch-recipes.js";
import { getSingleRecipeByTagName } from "../components/fetch-recipes.js";

// getting the navBar container html element into js
document.querySelector(".nav-bar").innerHTML = navBar();

// getting the html elements into js
const recipe_container = document.querySelector(".recipe-card-container");

const search_input = document.getElementById("search-input");

const select_by_recipe = document.getElementById("select-by-recipe");

// getting the theme icon container from html
const theme_icon = document.querySelector(".theme-icon");

// taking global values
let pageNo = 1;
let limit = 10;
let totalItems = 0;
let hasMoreData = true;
let searchQuery = "";

// function to resolve the promise for all recipes
async function getAllRecipes(pageNo, limit) {
  let skip = (pageNo - 1) * limit;

  const recipes = await fetchAllRecipes(skip, limit);

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

// event to handle infinite scrolling
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

// function to get all recipes by tag name
async function getRecipesTag() {
  const recipe_tag = await getRecipeByTagName();

  if (recipe_tag) {
    recipe_tag.map((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      option.textContent = tag;

      select_by_recipe.append(option);
    });
  }
}
getRecipesTag();

// function to get single recipe by tag name
function getSingleRecipeByTag() {
  select_by_recipe.addEventListener("change", async (event) => {
    recipe_container.innerHTML = "";
    hasMoreData = false;

    const single_recipe_by_tag = await getSingleRecipeByTagName(
      event.target.value
    );

    console.log("singleTag:", single_recipe_by_tag);

    displayRecipes(single_recipe_by_tag.recipes, recipe_container);
  });
}
getSingleRecipeByTag();

//<--- Code to toggle theme from dark to light and vice versa --->

let moon_icon = document.querySelector(".theme-icon > i");

applyThemePreference();

// click event for dark theme icon
moon_icon.addEventListener("click", toggleDarkTheme);

// function to toggle dark theme
function toggleDarkTheme() {
  theme_icon.innerHTML = "";

  setTheme("dark");

  let sun_icon = document.createElement("span");
  sun_icon.innerHTML = `<i class="lni lni-sun-1"></i>`;

  let sun_icon_text = document.createElement("span");
  sun_icon_text.textContent = "Light Mode";

  theme_icon.append(sun_icon, sun_icon_text);

  // click event for light theme icon
  sun_icon.addEventListener("click", toggleLightTheme);
}

// function to toggle light theme
function toggleLightTheme() {
  theme_icon.innerHTML = "";

  setTheme("light");

  const moon_icon_text = document.createElement("span");
  moon_icon_text.textContent = "Dark Mode";

  theme_icon.append(moon_icon, moon_icon_text);
}

// function to set a given theme
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.setAttribute("data-theme", themeName);
}

// function which will be invoked when the page is refreshed
function applyThemePreference() {
  let storedTheme = localStorage.getItem("theme") || "light";
  setTheme(storedTheme);

  theme_icon.innerHTML = "";

  // condition to check if dark or light theme is present then once the page is refreshed it will take the corresponding theme icon and behave accordingly
  if (storedTheme === "dark") {
    let sun_icon = document.createElement("span");
    sun_icon.innerHTML = `<i class="lni lni-sun-1"></i>`;

    let sun_icon_text = document.createElement("span");
    sun_icon_text.textContent = "Light Mode";
    theme_icon.append(sun_icon, sun_icon_text);

    sun_icon.addEventListener("click", toggleLightTheme);
  } else if (storedTheme === "light") {
    const moon_icon_text = document.createElement("span");
    moon_icon_text.textContent = "Dark Mode";
    theme_icon.append(moon_icon, moon_icon_text);

    moon_icon.addEventListener("click", toggleDarkTheme);
  }
}
