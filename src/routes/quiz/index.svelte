
<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    import { dev } from '$app/env';
    import { goto } from '$app/navigation';
    import { onDestroy, onMount } from 'svelte';

    import { starbased_user_settings } from '$lib/store/userData';
    import { first_test_data } from '$lib/data/1st-test'
    import { second_test_data } from '$lib/data/2nd-test'
    import { third_test_data } from '$lib/data/3rd-test'

    import Header from '$lib/components/header/Header.svelte'

    // ... import data;
    let data;
    $: if (import.meta.env.VITE_TEST_NUMBER.toString() === '1') {
        data = first_test_data
    } else if (import.meta.env.VITE_TEST_NUMBER.toString() === '2') {
        data = second_test_data
    } else if (import.meta.env.VITE_TEST_NUMBER.toString() === '3') {
        data = third_test_data
    }

    let interval: NodeJS.Timer;
    // ... user-time-to-interact-with-test;
    onMount(() => {
        // ... run every 1000ms (1-second)
        interval = setInterval(() => {
            // ... increment-QUIZ-timer;
            starbased_user_settings.addTimer(
                1,
                'test_' + import.meta.env.VITE_TEST_NUMBER.toString(),
                'quiz'
            )
            // ... increment-total-timer;
            starbased_user_settings.addTimer(
                1,
                'test_' + import.meta.env.VITE_TEST_NUMBER.toString(),
                'timer_total'
            )
        }, 1000)
    })
    // ... on page change;
    onDestroy(() => {
        // ... destroy setInterval()
        clearInterval(interval)
    })

    // ... submit FORM DATA;
    async function onSubmit(e) {
        // ... extract-form-data;
        const formData = new FormData(e.target);
        // ... DEBUGGING;
        if (dev) console.info('formData', formData)
        // ... pick-out-form-data;
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        // ... DEBUGGING;
        if (dev) console.info(data)
        // ... add other-data;
        starbased_user_settings.setUserQA('test_1', 'quiz', data)
        // ... navigate to the next page;
        await goto('/questionnaire');
    }
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
    <title> STAR-BASED | Quiz </title>
    <meta name="title" content="STAR-BASED | Quiz">
    <meta name="description" content="STAR-BASED | Quiz">
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
    <meta property="og:title" content="STAR-BASED | Quiz">
    <meta property="og:description" content="STAR-BASED | Quiz">
	<meta property="og:image" content="<link-goes-here>">
    <!--
    ~~~~~~~~~~~~
    Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="<link-goes-here>">
    <meta property="twitter:title" content="STAR-BASED | Quiz">
    <meta property="twitter:description" content="STAR-BASED | Quiz">
	<meta property="twitter:image" content="<link-goes-here>">
</svelte:head>

<!-- ===================
	COMPONENT HTML
=================== -->

<Header />

<section>

    <!-- ... title-section-h1 ... -->
    <h1  
        id='quiz-title'
        class='s-42 color-black bold text-center m-b-55'>
            Test | Knowledge 
    </h1>

    <!-- ... queiz-grid ... -->
    <form 
        on:submit|preventDefault={(e) => onSubmit(e)}
        id='quiz-grid'>

        {#each data.quiz.questions as item}
            <!-- content here -->

            <!-- ... [question-X] ... -->
            <div
                class='row-space-start'>
                <!-- ... question-number ... -->
                <div
                    class='circle-question-number m-r-20'>
                    <p
                        class='s-32 bold color-black'>
                        {item.question_num}
                    </p>
                </div>
                <!-- ... question-card ... -->
                <div 
                    class='column-space-start'>
                    <!-- ... question ... -->
                    <p
                        class='s-18 bold color-black m-b-10'>
                        {item.question_title}
                    </p>
                    <!-- ... question hint ... -->
                    <p
                        class='s-12 color-grey m-b-15'>
                        {item.question_hint}
                    </p>
                    <!-- ... question input ... -->
                    {#each item.options as option}
                        <!-- content here -->
                        <fieldset
                            class='row-space-out'>
                            <!-- ... label for the input ... -->
                            <label 
                                class="container">
                                <p class='s-16 color-black'>
                                    {option}
                                </p>
                                <input 
                                    type='radio' 
                                    name={item.question_num.toString()} 
                                    value={option}
                                    class='m-r-20' 
                                    required />
                                <span class="checkmark"></span>
                            </label>
                        </fieldset>
                    {/each}
                </div>
            </div>
        {/each}
        
    </form>

    <!-- ... continuation button ... -->
    <button
        form="quiz-grid"
        type='submit'
        class='continuation-btn'>
        <h1 
            class='s-18 color-white'>
            <b>SUBMIT</b>
        </h1>
    </button>
    
</section>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    /* :global(body) {
        background-color: white
    } */

    h1#quiz-title {
        position: relative;
    } h1#quiz-title::after {
        content: "";
        position: absolute;
        height: 5px;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #00FFB2 51.31%, rgba(0, 0, 0, 0) 102.61%);
        width: 100%;
        top: 125%;
        right: 0;
        left: 0;
    }
    
    form#quiz-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 36px;
    }

    div.circle-question-number {
        width: 50px;
        height: 50px;
        background: white;
        border-radius: 50%;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        /*  */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button.continuation-btn {
        position: absolute;
        bottom: 45px;
        right: 135px;
        height: 44px;
        padding: 0 52px 0 8px !important;
        background-image: url('/assets/svg/arrow-btn-white.svg') !important;
        background-repeat: no-repeat;
        background-position: 95% 50%;
        background-size: auto;
        background-color: #00AADF !important;
    }

    /* The container */
    .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    /* Hide the browser's default radio button */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }
    /* Create a custom radio button */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 21px;
        width: 21px;
        border-radius: 50%;
        background: #EFEFEF;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }
    /* When the radio button is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #00AADF;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    /* Create the indicator (the dot/circle - hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    /* Show the indicator (dot/circle) when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }
</style>