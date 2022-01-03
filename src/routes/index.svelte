<!-- ===================
	COMPONENT JS - MODULE 
    [TypeScript Written]
=================== -->

<script context="module" lang="ts">
	// ...
	export const prerender = true;
</script>

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
	SVELTE INJECTION TAGS
=================== -->

<!-- adding SEO title and meta-tags to the /basket page -->
<svelte:head>
    <!--
    ~~~~~~~~~~~~
    Primary Meta Tags;
    https://metatags.io/ -->
    <title> STAR-BASED </title>
    <meta name="title" content="STAR-BASED">
    <meta name="description" content="STAR-BASED">
    <meta name="keywords" content="STAR-BASED, 
        conversational agent,
        conversational ai,
        conversational artificial intelligence,
        artificial intelligence,
        education,
        education with conversational agent,
        education with artificial intelligence,
        education with ai,
        space education,
        space ai,
        space interactive model,
        space learning,
        space learning with ai,
        space,
        online education,
        ">
    <meta name="author" content="Miguel Bacharov">
    <!-- 
    ~~~~~~~~~~~~
    Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<link-goes-here>">
    <meta property="og:title" content="STAR-BASED">
    <meta property="og:description" content="STAR-BASED">
	<meta property="og:image" content="<link-goes-here>">
    <!--
    ~~~~~~~~~~~~
    Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="<link-goes-here>">
    <meta property="twitter:title" content="STAR-BASED">
    <meta property="twitter:description" content="STAR-BASED">
	<meta property="twitter:image" content="<link-goes-here>">
</svelte:head>

<!-- ===================
	COMPONENT HTML
=================== -->

<section>
    <!-- 
    ~~~~~~~~
    website introduction -->
    <div id='intro-hero'
        class='column-space-center'>
        <img 
            src={starbased_logo} 
            alt='star-based-logo-cyan'
            width="52.75px" height="32.92px"
        />
        
        <h1>
            <b>STAR-<span class='color-secondary'>BASED</span></b>
        </h1>

        <hr />

        <p class='s-16'> 
            Learn <b>space</b> using
            <br /> 
            artificial intelligence and 3D models
        </p>
    </div>

    <!-- ... website honours project warning message ... -->
    <div id='ethics-container'
        class='column-space-stretch'>
        
        <span class="row-space-start m-b-15">
            <img 
                src='/assets/svg/triangle-point.svg' 
                alt=""
                class='m-r-5'
            />
            <h1 class='s-14' style="color: #FF6464;">
                <b>THIS IS AN HONOURS PROJECT</b>
            </h1>
        </span>
        

        <p class='s-14 m-b-15'> 
            Before proceeding, please agree to the Edinburgh Napier 
            <br/>
            Universities Honours Project Ethics Regulations & GDPR:
        </p>

        <input 
            value="I agree to the Terms & Conditions"
            type="checkbox"
        />
    </div>

    <!-- ... continuation button ... -->
    <a sveltekit:prefetch
        href="/welcome-info"
        >
        <button class='continuation-btn'>
            <h1 class='s-18'>
                <b>START</b>
            </h1>
        </button>
    </a>
   
</section>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    #intro-hero {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 0;
        left: 0;
        width: 282px;
        text-align: center;
    }

    #ethics-container {
        position: absolute;
        bottom: 20%;
        left: 25%;
        width: fit-content;
    }

    /* 
    buttton */
    button.continuation-btn {
        position: absolute;
        bottom: 45px;
        right: 135px;
        height: 44px;
        padding: 0 52px 0 8px !important;
        background-image: url('/assets/svg/arrow-btn.svg');
        background-repeat: no-repeat;
        background-position: 95% 50%;
        background-size: auto;
    }
</style>