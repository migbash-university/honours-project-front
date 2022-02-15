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

    import mercury_texture from './assets/mercury-texture.jpg'

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
        viz = new Spacekit.Simulation(document.getElementById('main-container-mercury'), {
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
            textureUrl: mercury_texture,
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
    id='main-container-mercury' 
    >
    <!-- ... planet-name ... -->
    <div
        id='planet-name-box'>
        <p
            class='s-14 bold color-white'>
            Mercury
        </p>
    </div>
    <!-- ... planet-info-stats ... -->
    <div
        id='planet-dimensions-box'
        class='row-space-out'
        style="width: fit-content;">
        <!-- ... radius ... -->
        <p
            class='s-12 m-r-10 bold color-secondary'>
            Radius
        </p>
        <p
            class='s-12 m-r-10 color-white'>
            2,439.7 km
        </p>
        <!-- ... diameter ... -->
        <p
            class='s-12 m-r-10 bold color-secondary'>
            Diameter
        </p>
        <p
            class='s-12 color-white'>
            4,879.4 km
        </p>
    </div>
</div>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    #main-container-mercury {
		height: 100%;
        width: 100%;
        position: relative;
    }
    div#planet-name-box {
        position: absolute;
        bottom: 0;
        right: 0;
        background: #0085FF;
        box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
        border-radius: 5px 0px 0px 0px;
        padding: 10px 16px;
    }
    div#planet-dimensions-box {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        padding: 10px;
        background: #292929;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
    }
</style>