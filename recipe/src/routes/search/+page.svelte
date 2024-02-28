<script>
    import { onMount } from "svelte";

    /**
   * @type {any[]}
   */
    let recipes = [];

    /**
   * @type {{
   *    current: number;
   *    has_next: boolean;
   *    next: number;
   *    has_previous: boolean;
   *    previous: number;
   *    count: number;
   * }}
   */
    let page;

    onMount(async () => {
        fetch("http://127.0.0.1:8000/recipes/?" + new URLSearchParams({ page: "1" }))
            .then(response => response.json())
            .then(data => {
                recipes = data.recipes;
                page = data.page;
            }).catch(error => {
                console.log(error);
            });
    });

    /**
   * @param {number} page
   */
    async function getPage(page){
        fetch("http://127.0.0.1:8000/recipes/?" + new URLSearchParams({ page: page.toString() }))
            .then(response => response.json())
            .then(data => {
                recipes = data.recipes;
                updatePage(data.page);
            }).catch(error => {
                console.log(error);
            });
    }

    /**
   * @param {{
   *    current: number;
   *    has_next: boolean;
   *    has_previous: boolean;
   *    count: number;
   * }} object
   */
    function updatePage(object){
        page.current = object.current
        page.has_next = object.has_next
        page.has_previous = object.has_previous
        page.count = object.count
    }
</script>

<main>
    <ul>
        {#each recipes as recipe}
            <li><a href="/recipe/{recipe.id}">{recipe.title}</a></li>
        {/each}
    </ul>

    <nav>
        <ul class="pagination justify-content-center">
            {#if page != null}
                <li class="page-item {page.has_previous ? '' : 'disabled'}"><a class="page-link">Previous</a></li>
                {#each Array(page.count) as _, i}
                    <li class="page-item {page.current == i+1 ? 'active' : ''}"><a class="page-link" on:click={() => getPage(i+1)}>{i + 1}</a></li>
                {/each}
                <li class="page-item {page.has_next ? '' : 'disabled'}"><a class="page-link">Next</a></li>
            {/if}
        </ul>
    </nav>
</main>