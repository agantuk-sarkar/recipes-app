// fetch all recipes API
export const fetchAllRecipes = async (skip,limit)=>{
    try{
        const response = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`);

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("Bad Gateway");
        }
    } catch(error){
        console.log("error:",error);
    }
}

// search recipe API
export const searchRecipe = async (searchText,skip,limit)=>{
    try{
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchText}&limit=${limit}&skip=${skip}`);

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("Invalid request");
        }
    } catch(error){
        console.log("error:",error);
    }
}

// get all recipes by tag
export const getRecipeByTagName = async ()=>{
    try{
        const response = await fetch(`https://dummyjson.com/recipes/tags`);

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("404 error");
        }
    } catch (error){
        console.log("error:",error);
    }
}

// get single recipe by tag
export const getSingleRecipeByTagName = async (tagName)=>{
    try{
        const response = await fetch(`https://dummyjson.com/recipes/tag/${tagName}`);

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("Bad Gateway");
        }
    } catch (error){
        console.log("error:",error);
    }
}