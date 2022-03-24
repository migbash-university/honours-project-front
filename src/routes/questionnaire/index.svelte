
<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    import { goto } from '$app/navigation';
    import { onDestroy, onMount } from 'svelte';
    import { browser, dev } from '$app/env';

    import { post } from '$lib/utils/api';
    import { starbased_user_settings } from '$lib/store/userData';
    import { first_test_data } from '$lib/data/1st-test'
    import { second_test_data } from '$lib/data/2nd-test'
    import { third_test_data } from '$lib/data/3rd-test'

    // ... import-appropiate-test-number-data;
    let data: any;
    // ...
    onMount(async() => {
        if (browser) {
            if ($starbased_user_settings.current_test_status.toString() === '1') {
                data = first_test_data
            } else if ($starbased_user_settings.current_test_status.toString() === '2') {
                data = second_test_data
            } else if ($starbased_user_settings.current_test_status.toString() === '3') {
                data = third_test_data
            }
        }
    })

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // INTERVAL COUNTRER-TIMER
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    let interval: NodeJS.Timer;
    // ... user-time-to-interact-with-test;
    onMount(() => {
        // ... run every 1000ms (1-second)
        interval = setInterval(() => {
            // ... increment-QUIZ-timer;
            starbased_user_settings.addTimer(
                1,
                'test_' + $starbased_user_settings.current_test_status.toString(),
                'questionnaire'
            )
            // ... increment-total-timer;
            starbased_user_settings.addTimer(
                1,
                'test_' + $starbased_user_settings.current_test_status.toString(),
                'timer_total'
            )
        }, 1000)
    })
    // ... on page change;
    onDestroy(() => {
        // ... destroy setInterval()
        clearInterval(interval)
    })

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // PAGE USER-ACTIONS
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // ... submit FORM DATA;
    async function onSubmit(e) {
        // ... intercept-form-data;
        const formData = new FormData(e.target);
        // ... DEBUGGING;
        if (dev) console.info('formData', formData)
        // ... extract-form-data;
        let data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        // ... DEBUGGING;
        if (dev) console.info(data)
        if (dev) console.info($starbased_user_settings)
        // ... add other-data;
        // ... update-localstorage;
        starbased_user_settings.setUserQA(
            'test_' + $starbased_user_settings.current_test_status.toString(),
            'questionnaire', 
            data
        )
        // starbased_user_settings.updateTestProgressCompletionStatus('')
        starbased_user_settings.updateUserLastPage('/thank-you')
        starbased_user_settings.updateLastCompletedTest(Date.now())
        starbased_user_settings.toggleEmailSent()
        data = $starbased_user_settings
        // ... pass-on-the-data-to-the-backend-server;
        const response = await post(`/api/record-test.json`, {
            data
        })
        // ... DEBUGGING;
        if (dev) console.info('Date.now()', Date.now())
        // ... navigate to the next page;
        await goto('/thank-you');
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
    <title> STAR-BASED | Questionnaire </title>
    <meta name="title" content="STAR-BASED | Questionnaire">
    <meta name="description" content="STAR-BASED | Questionnaire">
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
    <meta property="og:title" content="STAR-BASED | Questionnaire">
    <meta property="og:description" content="STAR-BASED | Questionnaire">
	<meta property="og:image" content="<link-goes-here>">
    <!--
    ~~~~~~~~~~~~
    Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="<link-goes-here>">
    <meta property="twitter:title" content="STAR-BASED | Questionnaire">
    <meta property="twitter:description" content="STAR-BASED | Questionnaire">
	<meta property="twitter:image" content="<link-goes-here>">
</svelte:head>

<!-- ===================
	COMPONENT HTML
=================== -->

<section>
    <!-- ... title-section-h1 ... -->
    <h1  
        id='quiz-title'
        class='s-42 color-black bold text-center m-b-55'>
            End-Questionnaire 
    </h1>

    <!-- ... questionnaire-grid ... -->
    <form 
        on:submit|preventDefault={(e) => onSubmit(e)}
        id='questionnaire-grid'>

        {#if data}
            <!-- content here -->
            {#each data.questionnaire.questions as item}
                <!-- ... [question-X] ... -->
                <div
                    class='row-space-start'>
                    <!-- ... question-number ... -->
                    <div
                        class='circle-question-number m-r-20'>
                        <p
                            class='s-18 bold color-black'>
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
                        <!-- ... question numbers meaning ... -->
                        <p
                            class='s-12 color-grey m-b-15'>
                            {item.question_range_meaning}
                        </p>
                        <!-- ... likert-scale-input ... -->
                        <ul 
                            class='likert row-space-start'>
                            {#each item.options as option}
                                <li>
                                    <label 
                                        class="container">
                                        <input 
                                            type="radio"
                                            name={item.question_num.toString()} 
                                            value={option}
                                            required />
                                        <span 
                                            class="checkmark color-black">
                                            {option}
                                        </span>
                                    </label>
                                </li>
                            {/each}
                        </ul>
                </div>
                </div>
            {/each}
        {/if}
    </form>


    <!-- ... termination-button ... -->
    <button 
        form="questionnaire-grid"
        class='continuation-btn'>
        <h1 
            class='s-18 color-white'>
            <b>FINISH</b>
        </h1>
    </button>

</section>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    :global(body) {
        background-color: white
    }

    h1#quiz-title {
        position: relative;
    } h1#quiz-title::after {
        content: "";
        position: absolute;
        height: 5px;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #EB00FF 51.31%, rgba(0, 0, 0, 0) 102.61%);
        width: 100%;
        top: 125%;
        right: 0;
        left: 0;
    }
    
    form#questionnaire-grid {
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
        background-color: #FF0000 !important;
    }

    /* 
    likert-scale */
    form .likert {
        list-style: none;
        margin: 0;
        padding: 0;
    } form .likert li label {
        width:100%;
    }

    /* ... the container ... */
    .container {
        position: relative;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    /* ... hide the browser's default radio button ... */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }
    /* ... create a custom radio button ... */
    .checkmark {
        padding: 10px 18px;
        background: #FAFAFA;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    /* ... on mouse-over, add a grey background color ... */
    .container:hover input ~ .checkmark {
        background-color: #cccccc;
    }
    /* ... when the radio button is checked, add a blue background ... */
    .container input:checked ~ .checkmark {
        background-color: #00FFB2;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    /* ... create the indicator (the dot/circle - hidden when not checked) ... */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    /* ... show the indicator (dot/circle) when checked ... */
    .container input:checked ~ .checkmark:after {
        display: block;
    }
</style>