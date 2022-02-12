<!-- 
    Description:
    This is just the Questions and data about the planet temperature 
    readings and surface readings
-->

<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    import planet_stats from './assets/planet-stats.svg'
    import temperature_data from './assets/temperature-data.svg'

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
        toggleTitan()
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

    let titan;              // ... global paramater for satellite selection and targeting,
    let all_obj = []        // ... all visualization objects,
    let planet_info;
    let sat_info;
    let sat_counter = 0;

    /**
     * Function - Renders the Earth alone
    */
    const toggleTitan = () => {
        viz_option = 'titan'
        clearSimulation()
        titan = viz.createSphere('titan', {
            textureUrl: './assets/img/planets/titan-texture.png',
            radius: 2.5, /* default to 1 */
            rotation: {
                speed: 0.25
            },
            debug: {
                showAxes: false,
            },
        });
        all_obj.push(titan)
        titan.startRotation();
    }
    
    /**
     * Function - Renders the Galaxy (Solar System) Visualization
    */
    const toggleGalaxy = () => {
        viz_option = 'solar_sys'
        clearSimulation()
        const titan =  viz.createObject('titan', Spacekit.SpaceObjectPresets.EARTH);
        all_obj.push(titan)
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
	COMPONENT HTML
=================== -->

<div 
    in:fade
    out:fade 
    id='main-container' 
    />

<!-- Temperature Reading Data -->
<img 
    id='planet-stats'
    src={planet_stats} 
    alt="planet_stats">

<img 
    id='temp-stats'
    src={temperature_data}
    alt="temperature_data">

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    #main-container {
		height: 100vh;
    }
    img#planet-stats,
    img#temp-stats {
        position: absolute;
        z-index: 5000;
    }
    img#planet-stats {
        top: 28px;
        right: 0;
        left: 0;
        margin: auto;
    }
    img#temp-stats {
        top: 25%;
        right: 25%;
    }
</style>