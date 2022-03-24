<!-- ===================
	COMPONENT JS - MODULE 
    [TypeScript Written]
=================== -->

<script context="module" lang="ts">
	// ...
	// export const prerender = true;
</script>

<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    import { goto } from '$app/navigation';
	import { amp, browser, dev, mode, prerendering } from '$app/env';
    import { starbased_user_settings } from '$lib/store/userData';
    import starbased_logo from '$lib/starbased-icon.svg'

    // ... next-page;
    async function nextPage() {
        let test_page: string = "/test-" + $starbased_user_settings.current_test_status.toString()
        starbased_user_settings.updateUserLastPage(test_page)
        await goto(test_page)
    }
</script>

<!-- ===================
	SVELTE INJECTION TAGS
=================== -->

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
    <!-- ... website introduction ... -->
    <div 
        id='intro-hero'
        class='column-space-start m-b-55'
        style="width: fit-content;"
        >
        <img 
            src={starbased_logo} 
            alt='star-based-logo-cyan'
            width="52.75px" height="32.92px"
        />
        <h1>
            <b>STAR-<span class='color-secondary'>BASED</span></b>
        </h1>
        <hr />
        <p 
            class='s-16'> 
            Learn <b>space</b> using
            <br /> 
            artificial intelligence and 3D models
        </p>
    </div>

    <!-- ... further-in-depth-infromation ... -->
    <p 
        class='s-14 m-b-30' 
        style="color: #FF6464; letter-spacing: 0.05em;">
        <b>What is S T A R - B A S E D ?</b>
    </p>

    <p 
        class='s-14 m-b-15' 
        style="letter-spacing: 0.05em;">
        It is a technological approach to identify the most preferred method of online-learning using a mix of visual interctive 3D space models, 
        simple passage reading and conversational agents (AI) to deliver knowledge on the topic of outer space. 
        <br />
        <br />
        In this project, <b>S T A R - B A S E D </b> will be teaching you on the topic of outer space on 2 different celestial objects (planet) : <b>TItan</b>
        <br />
        <br />
        During this process, you will attempt 3 different test in the span of 4 days. 1 test now, another in 2 days and then in another 2 days since the last test attempted test. Before each test, you will be presented with the information necessary to understand the upcoming procedure and what is to be expected to be done.
        <br />
        <br />
        As a base-skeleton for these procedures, each test will have the same general outline procedure:
    </p>

    <p 
        class='m-l-30 s-14 m-b-40' 
        style="letter-spacing: 0.05em;">
        1. Spend 15 minutes interacting with the test and learning on a given nice topic on Titan,
        <br/>
        2. Answer end of topic questions curated for the learned material,
        <br/>
        3. Answer end of test questionnaire on the system that has been used for learning the material.
    </p>

    <!-- ... test-reminder ... -->
    <div
        id='test-id-container'>
        <p 
            class='s-14'>
            <b>THIS IS TEST NUMBER</b>
            <span
                style='
                color: black;
                background-color: #00FFB2;
                padding: 9px 5px;'>
                <!-- {import.meta.env.VITE_TEST_NUMBER.toString()} -->
                {$starbased_user_settings.current_test_status.toString()}
            </span>
            <span>
                /
            </span>
            <span>
                {import.meta.env.VITE_TOTAL_TEST_NUMBER.toString()}
            </span>
        </p>
    </div>

    <!-- ... continuation button ... -->
    <button 
        class='continuation-btn'
        on:click={() => nextPage()}>
        <h1 
            class='s-18 color-white'>
            <b>BEGIN</b>
        </h1>
    </button>

</section>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    section {
        margin: 141px auto;
        max-width: 904px;
    }

    #intro-hero {

    }

    #test-id-container {
        background-color: #000000;
        padding: 9px 14px;
        width: fit-content;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 2.5px;
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
        background-color: #676767 !important;
        background-size: auto;
    }
</style>