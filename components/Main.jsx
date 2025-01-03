import React from "react";
import ClaudeRecipe from "./components/claudeRecipe";
import IngredientsList from "./components/IngredientsList";
import { getRecipeFromMistral } from "./ai";
export default function Main() {
    //const ingredients = ["oregano", "pepper", "salt", "sugar", "tomato", "olive oil", "garlic", "chili flakes"];
    const [ingredients, setIngredients] = React.useState([]);
    
  

    const [recipe, setRecipe] = React.useState(false);

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);
    }
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }


    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
           { ingredients.length > 0 && <IngredientsList getRecipe={getRecipe} ingredients={ingredients} />
            }

           {recipe  && <ClaudeRecipe recipe={recipe}   />}
           
        </main>
    )
}