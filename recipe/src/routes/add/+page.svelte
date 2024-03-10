<script lang="ts">
    import { goto } from "$app/navigation";
    import { marked } from "marked";
    import { onMount } from "svelte";

    let token: string | null;
    let showLogin: boolean = false;
    let showMarkdownPreview: boolean = false;
    let showLoginErrorMessage: boolean = false;

    let credentials = {
        username: "",
        password: ""
    }

    let recipe: any = {
        title: "",
        author: "",
        source: "",
        description: "",
        recipe: ""
    };

    onMount( () => {
        token = localStorage.getItem("Auth.Token");
        if(!token){
            showLoginModal(true);
        }
    });

    function showLoginModal(show: boolean){
        if(show){
            showLogin = true;
        } else {
            if(token){
                showLogin = false;
            } else {
                goto("/");
            }
        }
    }

    async function login(){
        showLoginErrorMessage = false;

        if(!credentials.username || !credentials.password){
            return;
        }

        await fetch("/api/recipes/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then(data => {
            if(!data.token){
                showLoginErrorMessage = true;
            } else {
                localStorage.setItem("Auth.Token", data.token);
                token = data.token;
                showLoginModal(false);
                resetObject(credentials);
            }
        }).catch(error => {
            showLoginErrorMessage = true;
        });
    }
    

    async function addRecipe() {
        if(!token) {
            showLoginModal(true);
            return;
        }

        await fetch("/api/recipes/add", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify(recipe)
        }).then(response => response.json())
          .then(success => {
            resetObject(recipe);
          }).catch(error => {
              console.log(error);
          });
    }

    function resetObject(object: any) {
        Object.keys(object).forEach(key => {
            switch(object[key].type){
                case 'string':
                    object[key] = "";
                    break;
            }
        });
    }
</script>

<svelte:head>
    <title>Add Recipe</title> 
</svelte:head>

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
    <div class="mb-3">
        {#if !showMarkdownPreview}
            <button class="btn" on:click={() => {showMarkdownPreview = true;}}><i class="bi bi-eye"></i> Markdown Preview</button>
            {:else}
            <button class="btn mb-3" on:click={() => {showMarkdownPreview = false;}}><i class="bi bi-eye-slash"></i> Markdown Preview</button>
            <!-- Markdown Recipe Preview -->
            <pre>{@html marked(recipe.recipe)}</pre>
        {/if}
    </div>
    <div>
        <button class="btn" on:click={addRecipe}><i class="bi bi-plus-lg"></i> Add Recipe</button>
    </div>
</form>

{#if showLogin}
    <!-- Modal -->
    <div class="modal fade show" id="loginModel" tabindex="-1" role="dialog" aria-labelledby="sampleModalLabel" aria-hidden={false} style="display:block">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Login</h1>
                </div>
                <div class="modal-body">
                    {#if showLoginErrorMessage}
                        <div class="alert alert-danger mb-3" role="alert">
                            <div class="fw-bold fs-5"><i class="bi bi-exclamation-circle-fill"></i> UH OH</div>
                            <div>Couldn't log you in! Please check your credentials and try again.</div>
                        </div>
                    {/if}
                    <!-- Username -->
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="Username" bind:value={credentials.username}/>
                        <label for="floatingInput">Username</label>
                    </div>
                    <!-- Password -->
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" bind:value={credentials.password}/>
                        <label for="floatingPassword">Password</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" on:click={() => showLoginModal(false)}>Cancel</button>
                    <button type="button" class="btn btn-primary" on:click={login}>Login</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop show" />
{/if}

<style>
    .modal {
        display: block;
    }

    button {
        color: #f6eee3;
        background-color: #4F5D66;
    }

    button:hover {
        color: #f6eee3;
        background-color: #6d808b;
    }
</style>
  