<script lang="ts">
    import { marked } from "marked";
    import {
        type DateValue,
        DateFormatter,
        getLocalTimeZone
    } from "@internationalized/date";
    import { cn } from "$lib/utils";
    import { Button } from "$lib/components/ui/button";
    import { Calendar } from "$lib/components/ui/calendar";
    import * as Popover from "$lib/components/ui/popover";

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

    let pub_date: DateValue | undefined = undefined;

    const df = new DateFormatter("en-US", {
        dateStyle: "long"
    });

    async function addRecipe() {
        let body = {
            title: recipe.title,
            author: recipe.author,
            source: recipe.source,
            description: recipe.description,
            recipe: recipe.recipe,
            pub_date: pub_date?.toString()
        }

        const response = await fetch("http://127.0.0.1:8000/recipes/add", {
            method: "POST",
            credentials: "omit",
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
        <div class="row">
            <!-- Author -->
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Author" bind:value={recipe.author}>
                    <label for="floatingInput">Author</label>
                </div>
            </div>
            <!-- Publish Date -->
            <div class="mb-3 col-md-6">
                <Popover.Root>
                    <Popover.Trigger asChild let:builder>
                    <Button
                        variant="outline"
                        class={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !pub_date && "text-muted-foreground"
                        )}
                        style="width: 100%; height: 58px; background-color: #f6eee3"
                        builders={[builder]}
                    >
                        <i class="bi bi-calendar"></i>
                        {pub_date ? df.format(pub_date.toDate(getLocalTimeZone())) : "Pick a date"}
                    </Button>
                    </Popover.Trigger>
                    <Popover.Content class="w-auto p-0" align="start">
                    <Calendar bind:value={pub_date} />
                    </Popover.Content>
                </Popover.Root>
            </div>
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

<style>
    input, button, textarea{
        background-color: #f6eee3;
    }
</style>