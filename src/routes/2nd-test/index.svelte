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
	import { amp, browser, dev, mode, prerendering } from '$app/env'
    import { fade } from 'svelte/transition'
    import { onMount } from 'svelte'

    import starbased_logo from '$lib/starbased-icon.svg'
    import Header from '$lib/header/Header.svelte'

    import { first_test_data } from '$lib/data/1st-test'
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

<Header />

<section class='row-space-out'>

    <!-- ... interactive-model-galaxy ... -->
    <div 
        id='model-galaxy'>
        <!-- ... change view types ... -->
        <div>

        </div>
    </div>

    <!-- ... text-chunck-box-container ... -->
    <div 
        id='text-learning-container'>

        <!-- ... info / help btn ... -->
        <div 
            id='more-info-container'>
            <button 
                class='help-btn'>
                <h1 
                    class='s-18'>
                    <b>HELP</b>
                </h1>
            </button>
        </div>

        <!-- ... INFORMATION START ... -->
        <h1 
            class='s-42'> 
            { first_test_data.title } 
        </h1>

        <p 
            class='s-14'>
            {@html first_test_data.text}
        </p>

    </div>

    <!-- ... continuation button ... -->
    <a 
        sveltekit:prefetch
        href="/1st-test/quiz"
        >
        <button 
            class='continuation-btn'>
            <h1 
                class='s-18'>
                <b>BEGIN TEST</b>
            </h1>
        </button>
    </a>

</section>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    section {
        margin: 0 !important;
    }

    section #model-galaxy {
        background-color: #000000;
        width: 50vw;
        height: 100vh;
    } section #model-galaxy #main-container {
		height: 100vh;
    }

    section #text-learning-container {
        width: 50vw;
        height: 100vh;
        padding: 31px 62px;
    }

    /* 
    buttton */
    button.help-btn {
        height: 44px;
        padding: 0 52px 0 8px !important;
        background-image: url('/assets/svg/arrow-btn.svg');
        background-repeat: no-repeat;
        background-position: 95% 50%;
        background-size: auto;
    }

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