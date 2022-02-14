
<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    import { dev } from '$app/env';
    import { starbased_user_settings } from '$lib/store/userData';

    let convertedDate: Date;
    // ... 
    $: if ($starbased_user_settings != undefined &&
            $starbased_user_settings.last_test_completion_date != undefined) {
            // ...
            let convertedDateUNIX = new Date(parseInt($starbased_user_settings.last_test_completion_date.toString()));
            // ... determine-difference-in-days;
            convertedDate = new Date(convertedDateUNIX); // convert string date to Date object
            convertedDate.setDate(convertedDate.getDate() + 4);
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
    <title> STAR-BASED | Thank You </title>
    <meta name="title" content="STAR-BASED | Thank You">
    <meta name="description" content="STAR-BASED | Thank You">
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
    <meta property="og:title" content="STAR-BASED | Thank You">
    <meta property="og:description" content="STAR-BASED | Thank You">
	<meta property="og:image" content="<link-goes-here>">
    <!--
    ~~~~~~~~~~~~
    Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="<link-goes-here>">
    <meta property="twitter:title" content="STAR-BASED | Thank You">
    <meta property="twitter:description" content="STAR-BASED | Thank You">
	<meta property="twitter:image" content="<link-goes-here>">
</svelte:head>

<!-- ===================
	COMPONENT HTML
=================== -->

<section>

    <div
        id='intro-hero'
        class='column-space-center'>

        <!-- ... title-section-h1 ... -->
        <h1  
            id='quiz-title'
            class='s-42 color-black bold text-center m-b-20'>
            Thank you for taking part! 
        </h1>

        <!-- ... text info thank you ... -->
        <p
            class='s-20 color-black m-b-40'>
            Your responses have been recorded and you can now close and exit this website
        </p>

        <!-- ... test-end-reminder-container ... -->
        <div
            id='test-id-container'
            class='m-b-40'>
            <p 
                class='s-14'>
                <b>THIS IS THE END OF TEST NUMBER</b>
                <span
                    style='
                    color: black;
                    background-color: #00FFB2;
                    padding: 9px 5px;'>
                    <!-- {import.meta.env.VITE_TEST_NUMBER.toString()} -->
                    {#if $starbased_user_settings != undefined}
                        {$starbased_user_settings.current_test_status.toString()}
                    {/if}
                </span>
                <span>
                    /
                </span>
                <span>
                    {import.meta.env.VITE_TOTAL_TEST_NUMBER.toString()}
                </span>
            </p>
        </div>

        <!-- ... show only if tests 1 & 2 ... -->
        {#if $starbased_user_settings != undefined &&
            parseInt($starbased_user_settings.current_test_status.toString()) < 3}
            <!-- content here -->
            <!-- ... next-up-container-info ... -->
            <div
                id='extra-info-box'>
                <p
                    id='next-up-title'
                    class='s-20 color-secondary bold m-b-10'>
                    Next up!
                </p>
                <p 
                    class='s-16 color-black m-b-5'
                    style='padding: 0 20px;'>
                    The next test will be available to you in {import.meta.env.VITE_TEST_INTERVAL.toString()} days from now, on the
                    {#if convertedDate != undefined}
                        <b> {convertedDate.getDate()}/{convertedDate.getMonth()}/{convertedDate.getUTCFullYear()} </b>
                    {/if}
                </p>
                <p
                    class='s-16 color-black m-b-5'
                    style='padding: 0 20px;'>
                    Accessible on the following link, <a href="https://starbased-front.herokuapp.com/" style="text-decoration: underline; color: blue;"> https://starbased-front.herokuapp.com/ </a>
                </p>
                <p
                    class='s-16 color-black m-b-5'
                    style='padding: 0 20px;'>
                    You will be notified by email you provided at the start of this project. 
                </p>
            </div>
        <!-- ... show - no more tests ... -->
        {:else}
            <!-- content here -->
            <!-- ... next-up-container-info ... -->
            <div
                id='extra-info-box'>
                <p
                    id='next-up-title'
                    class='s-20 color-secondary bold m-b-10'>
                    Next up!
                </p>
                <p 
                    class='s-16 color-black m-b-5'
                    style='padding: 0 20px;'>
                    You are completely done!
                </p>
            </div>
        {/if}
            
        
    </div>
</section>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    h1#quiz-title {
        position: relative;
    }

    #intro-hero {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 0;
        left: 0;
        text-align: center;
    }

    #test-id-container {
        background-color: #000000;
        padding: 9px 14px;
        width: fit-content;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 2.5px;
    }

    div#extra-info-box {
        background-color: #FCFCFC;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        overflow: hidden;
        padding: 0 0 15px 0;
        text-align: left;
    } div#extra-info-box #next-up-title {
        background-color: #000000;
        width: 100%;
        padding: 8px 0;
        text-align: center;
    }
</style> 