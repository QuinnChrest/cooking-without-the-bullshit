<script>
    import { onMount } from "svelte";
    import { marked } from 'marked';

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
        fetch("/api/recipes/" + data.recipe_id)
            .then(response => response.json())
            .then(data => {
                recipe = data;
            }).catch(error => {
                console.log(error);
            });
    });

    export let data;
</script>

<svelte:head>
    {#if recipe != null}
        <title>{recipe.title}</title> 
    {/if}
</svelte:head>

{#if recipe != null}
    <main>
        <h2 class="mb-0">{recipe.title}</h2>
        {#if recipe.description }
            <div class="fw-bold">{recipe.source}</div>
        {/if}
        <div class="fw-bold mb-4">
            {recipe.author} - {new Date(recipe.pub_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        {#if recipe.description }
            <div class="mb-4">{recipe.description}</div>
        {/if}
        <div>{@html marked(recipe.recipe)}</div>
    </main>
{/if}