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
    import { fade, slide } from 'svelte/transition'
    import { onDestroy, onMount } from 'svelte'

    import { post } from '$lib/utils/api'

    import Header from '$lib/components/header/Header.svelte'

    import { first_test_data } from '$lib/data/1st-test'
    import { starbased_user_settings } from '$lib/store/userData';

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // TIMER COUNTER [AUTO]
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    let interval;
    // ... user-time-to-interact-with-test;
    onMount(async() => {
        // ... run every 1000ms (1-second)
        interval = setInterval(() => {
            // ... increment-QUIZ-timer;
            starbased_user_settings.addTimer(
                1,
                'test_' + import.meta.env.VITE_TEST_NUMBER.toString(),
                'reading'
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
    onDestroy(async() => {
        // ... destroy setInterval()
        clearInterval(interval)
    })

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // PAGE USER-ACTIONS
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    let helpTipsShow: boolean = false;
    // ... toggle-hide-show-button-info;
    function toggleHelpTips() {
        helpTipsShow = !helpTipsShow
    }

    // ...
    let processing: boolean = false
    let user_input: string
    let conversationData: ResponseData[] = []
    interface ResponseData {
        text: string
        user: 'agent' | 'user'
    }
    let responseData: ResponseData;
    // ... send-over-the-response-to-website-server;
    // ... and further processing of data;
    async function sendResponse(): Promise < void > {
        // ...
        processing = true
        starbased_user_settings.incTotalMessagesExchanged('test_2')
        // ...
        responseData = {
            text: user_input,
            user: 'user'
        }
        conversationData = [...conversationData, responseData]
        // ...
        starbased_user_settings.addToConversationHistory('test_2', conversationData)
        // ...
        const resposne = await post(`http://192.168.0.40:9000/post_question`, {
            user_input: user_input
        })
        // ... DEBUGGING;
        if (dev) console.debug('resposne', resposne)
        // ...
        responseData = {
            text: resposne['data'],
            user: 'agent'
        }
        // ...
        conversationData = [...conversationData, responseData]
        starbased_user_settings.addToConversationHistory('test_2', conversationData)
        // ...
        processing = false
    }

    // ... re-load-conversation-if-stored-in-local-storage;
    onMount(async() => {
        if (browser) {
            if ($starbased_user_settings['test_data']['test_2']['conversation_history']['history'].length != 0) {
                conversationData = $starbased_user_settings['test_data']['test_2']['conversation_history']['history']
                // ... TODO: Make the scroll of the container to the bottom on message input;
                // var scrollingElement = (document.scrollingElement || document.body);
                // scrollingElement.scrollTop = scrollingElement.scrollHeight;
            }
        }
    })

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // SPACEKIT-JS SIMULATION INTEGRATION
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    let viz, n;
    let viz_option;
    let earthPinsView = false;

    // ... re-draw the simulation onMount() PAGE;
    onMount(async () => {
        recreateSimulation()
        toggleGalaxy()
        toggleEarth()
    });

    // ... 
    const recreateSimulation = () => {
        // ... create the visualization and put it in our div.
        viz = new Spacekit.Simulation(document.getElementById('main-container'), {
            basePath: 'https://typpo.github.io/spacekit/src',
            jdPerSecond: 1
        });
        viz.createStars();
    }

    let earth;       // ... global paramater for satellite selection and targeting,
    let all_obj = [] // ... all visualization objects,
    let planet_info;
    let sat_info;
    let sat_counter = 0;

    /**
     * Function - Renders the Earth alone
    */
    const toggleEarth = () => {
        viz_option = 'earth'
        clearSimulation()
        earth = viz.createSphere('earth', {
            textureUrl: './assets/img/planets/titan-texture.png',
            rotation: {
                speed: 0.25
            },
            debug: {
                showAxes: false,
            },
        });
        all_obj.push(earth)
        earth.startRotation();
    }
    
    /**
     * Function - Renders the Galaxy (Solar System) Visualization
    */
    const toggleGalaxy = () => {
        viz_option = 'solar_sys'
        clearSimulation()
        const earth =  viz.createObject('earth', Spacekit.SpaceObjectPresets.EARTH);
        all_obj.push(earth)
    }

    /**
     * clear off the current interactive SpaceKitJs Simulation of off the
     * planets visualized and their images, ready for the next visualizations,
     */
    const clearSimulation = () => {
        for (n in all_obj) {
            viz.removeObject(all_obj[n])
        }
        planet_info = undefined
        // Make sure that the other simulation is hidden:
        if (earthPinsView != false) {
            earthPinsView = false
            setTimeout(() => {
                recreateSimulation()
            }, 2000)
        }
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

<section 
    class='row-space-out'>

    <!-- ... interactive-model-galaxy ... -->
    <div 
        id='model-galaxy'>
        <!-- ... canvas for interactive visualization ... -->
        <div 
            in:fade
            out:fade 
            id='main-container' 
        />
    </div>

    <!-- ... conversational-agent-interaction-chunck-box-container ... -->
    <div 
        id='text-learning-container'>

        <!-- ... info / help btn ... -->
        <div 
            id='more-info-container'>
            <!-- ... action-btn ... -->
            <button 
                on:click={() => toggleHelpTips()}
                class='help-btn'>
                <h1 
                    class='s-18 color-white'>
                    <b>HELP</b>
                </h1>
            </button>
            <!-- ... action-display-btn-data ... -->
            {#if helpTipsShow}
                <div
                    id='helpTipsContainer'
                    transition:slide>
                    <p
                        class='s-14 color-secondary m-b-15'
                        style='
                            background-color: #000000;
                            padding: 3px 10px;
                            width: fit-content;'>
                        <b>
                            YOUR TASKS
                        </b>
                    </p>
                    <p
                        class='color-white s-14'>
                        please read through the given passage / information on the planet TITAN below
                        and identify information that you believe to be critical,
                        <br />
                        <br />
                        when ready, proceed to the next page to answer some end of test questions based on the passage below
                        <br />
                        <br />
                        once you complete the end of topic test, you will be promted to answering a simple 4 question questionnaire on your experience.
                    </p>
                </div>
            {/if}
        </div>

        <!-- ... INFORMATION START ... -->
        <h1 
            id='test-title'
            class='s-42'> 
            Conversational Agent
        </h1>

        <!-- ... conversational=agent-user-interaction ... -->
        <div
            id='conversation-grid'>
            {#each conversationData as item}
                <div
                    class:user_chat_bubble={item.user === 'user'}
                    class:agent_chat_bubble={item.user === 'agent'}>
                    <p
                        class='s-14 color-white'>
                        {item.text} 
                    </p>
                </div>
            {/each}
        </div>
    </div>    

    <!-- ... container `div` next step ... -->
    <div
        id='contuniation-container'
        class='column-space-stretch'>
        <div
            class='m-b-20 row-space-end'>
            <!-- ... text btn procedure ... -->
            <p
                class='m-r-20 s-14 color-white'>
                Are you ready to undertake a 
                <br/> 
                end of reading test ?
            </p>
            <!-- ... continuation button ... -->
            <a 
                sveltekit:prefetch
                href='/quiz'>
                <button 
                    class='continuation-btn'>
                    <h1 
                        class='s-18'>
                        <b>BEGIN TEST</b>
                    </h1>
                </button>
            </a>
        </div>
        <!-- ... submit-user-input ... -->
        <form 
            action="" 
            on:submit|preventDefault={sendResponse}
            class='row-space-end'>
            <fieldset
                class='m-r-10'
                style="width: -webkit-fill-available;">
                <input 
                    id='user-input'
                    class="s-14 color-black bold"
                    placeholder="Enter a question for the conversational agent..."
                    bind:value={user_input}
                    style='width: 100%'
                    type="text" 
                    required 
                    autocomplete="off"/>
            </fieldset>
            <button
                id='submit-response'
                type="submit"
                disabled={processing}
                >
            </button>
        </form>
    </div>

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
        position: relative;
    } section #model-galaxy #main-container {
		height: 100vh;
    }

    section #text-learning-container {
        width: 50vw;
        height: 100vh;
        padding: 31px 62px 225px 62px;
        overflow-y: scroll;
        position: relative;
    }

    div#helpTipsContainer {
        background: #4D4D4D;
        border-radius: 0px 2.5px 2.5px 2.5px;
        padding: 20px 15px;
    }

    div#contuniation-container {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 50vw;
        z-index: 10;
        padding: 45px 62px;
        background-color: #2D2D2D;
        box-shadow: 0px -5px 5px rgb(0 0 0 / 25%);
    }

    h1#test-title {
        font-style: normal;
        font-weight: bold;
        line-height: 49px;
        letter-spacing: 0.17em;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    div#conversation-grid {
        gap: 5px;
        grid-template-columns: 1fr;
        display: grid;
    }

    div.user_chat_bubble {
        padding: 16px;
        background: rgba(0, 255, 178, 0.5);
        border-radius: 5px;
        text-align: right;
    }
    div.agent_chat_bubble {
        padding: 16px;
        background-color: none;
        border-radius: 5px;
    }

    input#user-input {
        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        height: 44px;
        padding: 12px 18px;
    }

    /*
    ~~~~~~~~~~~~~~~~ 
    scrollbar STYLE */

    ::-webkit-scrollbar {
        width: 7px;
        z-index: 1000;
    } ::-webkit-scrollbar-track {
        background-color: #574E4E;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        margin: 100px 0 200px 0;
    } ::-webkit-scrollbar-thumb {
        background-color: #C4C4C4;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
    }

    /* 
    ~~~~~~~~~~~~~~~~ 
    buttton */
    button.help-btn {
        height: 44px;
        padding: 0 52px 0 8px !important;
        background-image: url('/assets/svg/help-icon.svg');
        background-repeat: no-repeat;
        background-position: 95% 50%;
        background-color: #676767 !important;
        background-size: auto;
    }

    button.continuation-btn {
        height: 44px;
        padding: 0 52px 0 8px !important;
        background-image: url('/assets/svg/arrow-red-btn.svg');
        background-repeat: no-repeat;
        background-position: 95% 50%;
        background-size: auto;
    }

    button#submit-response {
        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        height: 44px;
        width: 50px;
        background-image: url('/assets/svg/input-vector.svg');
        background-position: 50% 50%;
        background-repeat: no-repeat;
    }
</style>