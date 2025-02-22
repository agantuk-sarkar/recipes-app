// display recipes in UI
export const displaySingleRecipe = (data, recipe_container) => {
  // recipe_container.innerHTML = "";

  data?.forEach((recipe, index) => {
    const card_container = document.createElement("div");
    card_container.classList.add("card-container");

    const image_container = document.createElement("div");
    image_container.classList.add("image-container");

    const image = document.createElement("img");
    image.classList.add("image");
    image.src = recipe.image;

    const text_container = document.createElement("div");
    text_container.classList.add("text-container");

    const recipe_name = document.createElement("p");
    recipe_name.classList.add("recipe-name");
    recipe_name.textContent = recipe.name;

    const rating = document.createElement("p");
    rating.classList.add("rating");
    rating.textContent = `Rating : ${recipe.rating}`;

    const instruction = document.createElement("p");
    instruction.classList.add("instruction");
    instruction.textContent = recipe.instructions;

    const tags_container = document.createElement("div");
    tags_container.classList.add("tags-container");

    const tags = recipe.tags;
    tags.forEach((tag) => {
      const tag_text = document.createElement("p");
      tag_text.textContent = tag;
      tag_text.classList.add("tag-text");
      tags_container.append(tag_text);
    });

    const ingredients = document.createElement("p");
    ingredients.classList.add("ingredients");
    ingredients.textContent = `Ingredients: ${recipe.ingredients}`;

    const cuisine = document.createElement("p");
    cuisine.classList.add("cuisine");
    cuisine.textContent = `Cuisine: ${recipe.cuisine}`;

    const prep_time = document.createElement("p");
    prep_time.classList.add("prep-time");
    prep_time.textContent = `Preparation Time: ${recipe.prepTimeMinutes} mins`;

    const meal_type = document.createElement("p");
    meal_type.classList.add("meal-type");
    meal_type.textContent = `Meal Type: ${recipe.mealType}`;

    const home_button = document.createElement("div");
    home_button.classList.add("home-button");
    home_button.textContent = "Go To Home Page";
    home_button.addEventListener("click", () => {
      window.location.href = "./index.html";
    });

    text_container.append(
      recipe_name,
      tags_container,
      rating,
      ingredients,
      instruction,
      cuisine,
      prep_time,
      meal_type,
      home_button
    );

    image_container.append(image);

    card_container.append(image_container, text_container);

    recipe_container.append(card_container);
  });
};
