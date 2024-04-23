import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new EventEmitter<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('PavBhaji', 'This is delicious', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4wJltHLOJR6av1aT1yQsP_unSuNJPRxvyzQ&usqp=CAU',[
            new Ingredient('Cauliflower', 1),
            new Ingredient('Capsicum', 5),
            new Ingredient('Tomato', 10)
        ]),
        new Recipe('Steam Momos', 'This is tasty and juicy momos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDIziuXbKqrfDDJBbuuU21VoPtRkYFxyf6jQ&usqp=CAU',[
            new Ingredient('All purpose floor', 1),
            new Ingredient('Cabbage', 2),
            new Ingredient('Carrot', 4)
        ]),
        new Recipe('Puran Poli','Sweet and Tastier Puran Poli', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLddq2l9y5TW-JkTiEo3CiSQOAVI3-jnxsiw&usqp=CAU',[
            new Ingredient('All purpose floor',1),
            new Ingredient('Jaggery',1),
            new Ingredient('Ghee',1),
            new Ingredient('split chickpea lentils',1)
        ])
    ];

    constructor(private slService: ShoppingListService) {}
    
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
    
    addIngredientsToList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.emit(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.emit(this.recipes.slice());
    }
    
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.emit(this.recipes.slice());
    }
}