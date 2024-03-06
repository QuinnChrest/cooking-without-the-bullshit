<script lang="ts">
    import { goto } from "$app/navigation";
    import { marked } from "marked";
    import { onMount } from "svelte";

    onMount(async () => {
        let token = localStorage.getItem("Auth.Token");
        if(!token){
            goto("/login");
        }
    });

    /**
     * @type {{ 
     *    title: string;
     *    author: string;
     *    source: string;
     *    description: string;
     *    recipe: string;
     * }}
     */
    let recipe = {
        title: "",
        author: "",
        source: "",
        description: "",
        recipe: ""
    };

    async function addRecipe() {
        let body = {
            title: recipe.title,
            author: recipe.author,
            source: recipe.source,
            description: recipe.description,
            recipe: recipe.recipe
        }

        const response = await fetch("http://127.0.0.1:8000/recipes/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + localStorage.getItem("Auth.Token")
            },
            body: JSON.stringify(body)
        });
    }
</script>

<main>
    <form>
        <!-- Title -->
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="Title" bind:value={recipe.title}>
            <label for="floatingInput">Title</label>
        </div>
        <!-- Source -->
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="Source" bind:value={recipe.source}>
            <label for="floatingInput">Source</label>
        </div>
        <!-- Author -->
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="Author" bind:value={recipe.author}>
            <label for="floatingInput">Author</label>
        </div>
        <!-- Description -->
        <div class="form-floating mb-3">
            <textarea class="form-control" id="floatingTextarea" placeholder="Description" style="height: 100px;" bind:value={recipe.description}></textarea>
            <label for="floatingTextarea">Description</label>
        </div>
        <!-- Recipe -->
        <div class="form-floating mb-3">
            <textarea class="form-control" id="floatingTextarea" placeholder="Recipe" bind:value={recipe.recipe} style="height: 400px;"></textarea>
            <label for="floatingTextarea">Recipe</label>
        </div>
        <button on:click={addRecipe}>Add Recipe</button>
        <!-- Markdown Recipe Preview -->
        <pre>{@html marked(recipe.recipe)}</pre>
    </form>
</main>