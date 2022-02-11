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
    import { goto } from '$app/navigation';

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
                'test_1',
                'reading'
            )
            // ... increment-total-timer;
            starbased_user_settings.addTimer(
                1,
                'test_1',
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
    // ...
    function toggleHelpTips() {
        helpTipsShow = !helpTipsShow
    }

    // ...
    let viewMode: string = 'interactive'
    // ...
    function toggleViewMode(viewSet: string) {
        viewMode = viewSet;
    }

    // ...
    async function nextPage() {
        // ... update-last-page-visit;
        starbased_user_settings.updateUserLastPage('/quiz')
        // ... redirect
        await goto('/quiz')
    }

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
        <!-- ... change view types ... -->
        <div
            id='change-interactive-views'
            class='row-space-out'>
            <!-- ... interactive toggle ... -->
            <button
                on:click={() => toggleViewMode('interactive')}
                class:selectedView={viewMode === 'interactive'}
                class='toggle-view-btn column-space-center m-r-10'>
                <!-- ... image-asset ... -->
                {#if viewMode === 'interactive'}
                    <img 
                        src="./assets/svg/3D-icon-selected.svg" 
                        alt="" 
                        class='m-b-10'
                        width="39.38px" height="39.38px"
                    />
                {:else}
                    <img 
                        src="./assets/svg/3D-icon-idle.svg" 
                        alt="" 
                        class='m-b-10'
                        width="39.38px" height="39.38px"
                    />
                {/if}
                <!-- ... button-text-action ... -->
                <p>
                    interactive 3D 
                    <br/>
                    model
                </p>
            </button>
            <!-- ... photo gallery toggle ... -->
            <button
                on:click={() => toggleViewMode('photo')}
                class:selectedView={viewMode === 'photo'}
                class='toggle-view-btn column-space-center'>
                <!-- ... image-asset ... -->
                {#if viewMode === 'photo'}
                    <img 
                        src="./assets/svg/photo-gallery-icon-selected.svg" 
                        alt=""
                        class='m-b-10'
                        width="38px" height="32px"
                    />
                {:else}
                    <img 
                        src="./assets/svg/photo-gallery-icon-idle.svg" 
                        alt="" 
                        class='m-b-10'
                        width="38px" height="32px"
                    />
                {/if}
                <!-- ... button-text-action ... -->
                <p>
                    photo gallery
                </p>
            </button>
        </div>
    </div>

    <!-- ... text-chunck-box-container ... -->
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
                        please read through the given passage / information on the planet TITAN below and identify information answering the following questions on the quiz:
                        <br />
                        <br />
                        • What is the approximate radius of Titan ?
                        <br />
                        • Which of the following statements is correct ?
                        <br />
                        • How long does Titan take to make a rotation around the Sun ?
                        <br />
                        • The atmospheric pressure on Titan is roughly… ?
                        <br />
                        • The surface temperature of Titan is … ?
                        <br />
                        • What is Titan's atmosphere composed of ?
                        <br />
                        • Titans atmosphere is mostly composed of … ?
                        <br />
                        when ready, proceed to the next page to answer some end of test questions based on the passage below
                        <br />
                        <br />
                        once you complete the end of the topic test, you will be prompted to answer a simple 4 question questionnaire on your experience.

                    </p>
                </div>
            {/if}
        </div>

        <!-- ... INFORMATION START ... -->
        <h1 
            id='test-title'
            class='s-42'> 
            { first_test_data.title } 
        </h1>

        <p 
            class='s-14'>
            {@html first_test_data.text}
        </p>
    </div>    

    <!-- ... container `div` next step ... -->
    <div
        id='contuniation-container'
        class='row-space-end'>
        <!-- ... text btn procedure ... -->
        <p
            class='m-r-20 s-14 color-white'>
            Are you ready to undertake a 
            <br/> 
            end of reading test ?
        </p>
        <!-- ... continuation button ... -->
        <button 
            class='continuation-btn'
            on:click={() => nextPage()}>
            <h1 
                class='s-18'>
                <b>BEGIN TEST</b>
            </h1>
        </button>
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
        padding: 31px 62px 150px 62px;
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
        padding: 45px 62px 45px 0;
        background-color: #4D4D4D;
        box-shadow: 0px -5px 5px rgb(0 0 0 / 25%);
    }

    div#change-interactive-views {
        position: absolute;
        bottom: 27px;
        margin: auto;
        right: 0;
        left: 0;
        width: fit-content;
    }

    h1#test-title {
        font-style: normal;
        font-weight: bold;
        line-height: 49px;
        letter-spacing: 0.17em;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
    button.toggle-view-btn {
        background-color: transparent;
        border: 1px solid #FFFFFF !important;
        border-radius: 5px;
        padding: 10px;
        width: 109px;
        height: 98px;
    }
    button.toggle-view-btn.selectedView,
    button.toggle-view-btn:hover {
        border: none !important;
        background-color: #252525;
    }
    button.toggle-view-btn.selectedView p,
    button.toggle-view-btn:hover p {
        color: #00FFB2;
    }

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
</style>