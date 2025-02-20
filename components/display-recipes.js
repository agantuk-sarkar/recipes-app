// display recipes in UI
export const displayRecipes = (data,recipe_container)=>{

    // recipe_container.innerHTML = "";

    data?.forEach((recipe,index)=>{
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
        tags.forEach((tag)=>{
            const tag_text = document.createElement("p");
            tag_text.textContent = tag;
            tag_text.classList.add("tag-text");
            tags_container.append(tag_text);
        });

        const view_details_button = document.createElement("div");
        view_details_button.classList.add("view-details");
        view_details_button.textContent = "View Details";

        text_container.append(recipe_name,tags_container,rating,instruction,view_details_button);

        image_container.append(image);

        card_container.append(image_container,text_container);

        recipe_container.append(card_container);
    });
}