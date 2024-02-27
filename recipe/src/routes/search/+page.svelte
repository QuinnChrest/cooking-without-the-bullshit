<script>
    import { onMount } from "svelte";

    /**
   * @type {any[]}
   */
    let recipes = [];

    onMount(async () => {
        fetch("http://127.0.0.1:8000/recipes/")
            .then(response => response.json())
            .then(data => {
                recipes = data;
            }).catch(error => {
                console.log(error);
            });
    });
</script>

<main>
    <ul>
        {#each recipes as recipe}
            <li><a href="/recipe/{recipe.id}">{recipe.title}</a></li>
        {/each}
    </ul>
</main>