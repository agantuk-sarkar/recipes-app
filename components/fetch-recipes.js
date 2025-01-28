// fetch all recipes
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