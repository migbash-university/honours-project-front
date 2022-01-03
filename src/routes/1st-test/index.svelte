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

    // ~~~~~~~~~~~~~~
    // SPACEKIT-JS SIMULATION INTEGRATION
    // ~~~~~~~~~~~~~~

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
            textureUrl: './assets/img/planets/earth-spread.jpg',
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

<section class='row-space-out'>

    <!-- ... interactive-model-galaxy ... -->
    <div id='model-galaxy'>
        <!-- ... canvas for interactive visualization ... -->
        <div 
            in:fade
            out:fade 
            id='main-container' 
        />
    </div>

    <!-- ... text-chunck-box-container ... -->
    <div id='text-learning-container'>

        <!-- ... info / help btn ... -->
        <div id='more-info-container'>
            <button class='help-btn'>
                <h1 class='s-18'>
                    <b>HELP</b>
                </h1>
            </button>
        </div>

        <!-- ... INFORMATION START ... -->
        <h1 class='s-42'> 
            { first_test_data.title } 
        </h1>

        <p class='s-14'>
            {@html first_test_data.text}
        </p>

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
</style>