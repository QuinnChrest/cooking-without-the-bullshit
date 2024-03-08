<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let recipes: any[] = [];
    let page: any;
    let searchValue: string = "";

    onMount(async () => {
        fetch("/api/recipes?" + new URLSearchParams({ page: "1" }))
            .then(response => response.json())
            .then(data => {
                recipes = data.recipes;
                page = data.page;
            }).catch(error => {
                console.log(error);
            });
    });

    async function getPage(pageNumber: number){
        fetch("/api/recipes?" + new URLSearchParams({ page: pageNumber.toString() }))
            .then(response => response.json())
            .then(data => {
                recipes = data.recipes;
                updatePage(data.page);
            }).catch(error => {
                console.log(error);
            });
    }

    async function search(event: any){
        if(event.key === "Enter") {
            fetch("/api/recipes/search?" + new URLSearchParams({ search: searchValue }))
            .then(response => response.json())
            .then(data => {
                recipes = data.recipes;
                updatePage(data.page);
            }).catch(error => {
                console.log(error);
            });
        }
    }
    
    function updatePage(object: any){
        page.current = object.current
        page.has_next = object.has_next
        page.has_previous = object.has_previous
        page.count = object.count
    }
</script>

<svelte:head>
    <title>No BS Cooking</title> 
</svelte:head>

<main>
    <div class="d-flex justify-content-between mb-4">
        <button type="button" class="btn" on:click={() => {goto("/add")}}><i class="bi bi-plus-lg"></i> Add</button>
        <input type="text" class="form-control searchBar" style="width: 250px;" placeholder="Search" id="Search" bind:value={searchValue} on:keyup={(event) => search(event)}/>
    </div>

    <div class="mb-4">
        <div class="row mb-2">
            <div class="col-6 fw-bold">Name</div>
            <div class="col-6 text-end fw-bold">Author</div>
        </div>

        {#each recipes as recipe, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-interactive-supports-focus -->
            <div class="row recipeListItem {recipes.length == i+1 ? 'mb-0' : 'mb-2'} {i % 2 ? '' : 'alt'}" on:click={() => goto("/recipe/" + recipe.id)} aria-label="{recipe.title}" role="button">
                <div class="col-6">{recipe.title}</div>
                <div class="col-6 text-end">{recipe.author}</div>
            </div>
            {:else}
            No results found.
        {/each}
    </div>

    {#if page != null && page.count > 1}
        <nav>
            <ul class="pagination justify-content-center" style="cursor: pointer;">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-missing-attribute -->
                <li class="page-item {page.has_previous ? '' : 'disabled'}"><a class="page-link" on:click={() => {if(page.has_previous){getPage(page.current - 1)}}}>Previous</a></li>
                {#each Array(page.count) as _, i}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <li class="page-item {page.current == i+1 ? 'active' : ''}"><a class="page-link" on:click={() => getPage(i+1)}>{i + 1}</a></li>
                {/each}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-missing-attribute -->
                <li class="page-item {page.has_next ? '' : 'disabled'}"><a class="page-link" on:click={() => {if(page.has_next){getPage(page.current + 1)}}}>Next</a></li>
            </ul>
        </nav>
    {/if}
</main>

<style>
.recipeListItem {
    cursor: pointer;
    border-radius: 5px;
    padding: 10px;
    background-color: rgba(0,0,0, .07);
    transition: background-color 0.3s ease-in-out;
}

.recipeListItem.alt {
    background-color: rgba(0,0,0, .04);
}

.recipeListItem:hover {
    background-color: #d2e7d6a8;
    border-color: #b8d8be;
    transition: background-color 0.3s ease-in-out;
}

.page-link {
    color: #4F5D66;
    border-color: #4a6741;
}

.active>.page-link {
    background-color: #e8f4ea;
}

.page-item.disabled .page-link{
    background-color: rgba(214, 214, 214, 0.5);
}

.page-item.disabled {
    cursor: default;
}

button {
    background-color: #e8f4ea;
}
</style>