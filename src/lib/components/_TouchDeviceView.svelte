<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    // ...
	import { amp, browser, dev, mode, prerendering } from '$app/env';
    // ...
    import starbased_logo from '$lib/starbased-icon.svg'
</script>


<!-- ===================
	COMPONENT HTML
=================== -->

<section
    class='column-space-center'
    style="width: auto;">
    <!-- ... website-and-brand-info ... -->
    <div 
        id='intro-hero' 
        class='column-space-center m-b-55'>
        <!-- ... brand-image ... -->
        <img src={starbased_logo} alt='star-based-logo-cyan' width="52.75px" height="32.92px" />
        <!-- ... brand-text ... -->
        <h1>
            <b>STAR-<span class='color-secondary'>BASED</span></b>
        </h1>
        <!-- ...sep ... -->
        <hr />
        <!-- ... brand-slogan ... -->
        <p class='s-16'>
            Learn <b>space</b> using
            <br />
            artificial intelligence and 3D models
        </p>
    </div>

    <!-- ... warning-error container ... -->
    <div
        class='column-space-center'>
        <!-- ... image-icon ... -->
        <img 
            src='./assets/svg/warning-icon.svg' 
            alt='star-based-logo-cyan' 
            width="52.75px" height="32.92px" 
            class='m-b-5'
        />
        <!-- ... ... -->
        <p 
            class='s-14 color-grey'>
            uh-oh!
        </p>
        <!-- ... text-error ... -->
        <p 
            class='s-14 color-grey text-center'>
            STAR-BASED cannot be used on mobile devices,
            please access via a laptop to proceed
        </p>
    </div>
</section>


<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    #intro-hero {
        max-width: 282px;
        width: 100%;
        text-align: center;
    }
</style>