// display recipes in UI
export const displayRecipes = (data,recipe_container)=>{

    // recipe_container.innerHTML = "";

    data?.forEach((recipe)=>{
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

        text_container.append(recipe_name,rating,instruction);

        image_container.append(image);

        card_container.append(image_container,text_container);

        recipe_container.append(card_container);
    });
}