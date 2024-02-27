<script>
    import { onMount } from "svelte";

    /**
   * @type {{ 
   *    title: string;
   *    author: string;
   *    source: string;
   *    pub_date: string;
   *    description: string;
   *    recipe: string;
   * }}
   */
    let recipe;

    onMount(async () => {
        fetch("http://127.0.0.1:8000/recipes/" + data.recipe_id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                recipe = data;
            }).catch(error => {
                console.log(error);
            });
    });

    export let data;
</script>

<main>
    {#if recipe != null}

        <div>{recipe.title}</div>
        <div>{recipe.author} - {recipe.pub_date}</div>
        <div>{recipe.source}</div>
        <div>{recipe.source}</div>
    {/if}
</main>