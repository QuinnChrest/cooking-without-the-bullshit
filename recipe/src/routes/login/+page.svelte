<script>
    let credentials = {
        username: "",
        password: ""
    }

    async function login(){
        const response = await fetch("http://127.0.0.1:8000/recipes/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }).then(response => response.json())
          .then(data => {
              localStorage.setItem("Auth.Token", data.token);
          }).catch(error => {
              console.log(error);
          });
    }
</script>

<form on:submit={login}>
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
    <button type="submit" class="btn btn-primary">Login</button>
</form>