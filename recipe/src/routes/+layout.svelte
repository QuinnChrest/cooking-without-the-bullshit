<script>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import '@fontsource-variable/source-code-pro';
</script>

<div class="container">
    <div class="row justify-content-md-center">
        <div class="col-md-6">
            <div class="mb-4">
                <a class="logo" href="/">COOKING WITHOUT THE BULLSH*T</a>
            </div>
            
            <slot/>
        </div>
    </div>
</div>

<style>
    :global(body) {
        font-family: 'Source Code Pro Variable', monospace;
        background-color: #f6eee3;
        color: #4F5D66;
    }

    .logo {
        font-weight: bold;
        font-size: xx-large;
        text-decoration: none;
        color: #4F5D66;
    }
</style>
