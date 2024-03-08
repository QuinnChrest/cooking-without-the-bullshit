<script>
    import "../app.pcss";
    import 'bootstrap/dist/css/bootstrap.min.css'
    import '@fontsource-variable/source-code-pro';
    import swearingEmoji from "$lib/images/swearingEmoji.png";
</script>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-xl-7 col-xs-12">
            <div class="mb-4">
                <a class="logo" href="/">
                    <div class="d-flex align-items-center">
                        <img src={swearingEmoji} alt="Swearing Emoji" height="40" width="40" class="me-2">
                        COOKING WITHOUT THE BULLSH*T
                    </div>
                </a>
            </div>
            
            <slot></slot>
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
