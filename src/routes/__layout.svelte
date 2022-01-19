<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { dev } from '$app/env';

    import TouchDeviceView from '$lib/components/_TouchDeviceView.svelte';

	import '../app.css';

    if (dev) console.debug('page', $page)

    let light_bg: boolean = false;
    // ... check what page the user is on:
    $: if ($page.path.includes('/quiz') || $page.path.includes('/questionnaire') || $page.path.includes('/thank-you')) {
        // ... trigger the `class` for the `main` color-change;
        light_bg = true
    } else {
        light_bg = false
    }

    let touchDevice: boolean = false

    // ~~~~~~~~~~~~~~~~~~~~~
	// VIEWPORT CHANGES
	// ~~~~~~~~~~~~~~~~~~~~~

    // ... validation that the user does not have a touch screen enabled;
	onMount(async () => {
		var wInit = document.documentElement.clientWidth;
		// INACESSIBLE DEVICE
		if (wInit > 1023) {
			touchDevice = false;
		} else {
			touchDevice = true;
		}
		window.addEventListener('resize', function () {
			var w = document.documentElement.clientWidth;
		    // INACESSIBLE DEVICE
            if (w > 1023) {
				touchDevice = false;
			} else {
				touchDevice = true;
			}
		});
	});
</script>

<!-- ===================
	COMPONENT HTML
=================== -->

<!-- <Header /> -->

{#if !touchDevice}
    <main
        class:light-bg={light_bg}>
        <slot />
    </main>
{:else}
    <main>
        <TouchDeviceView />
    </main>
{/if}


<!-- <Footer /> -->

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
	main {
        /* 
        so nothing exceeds the main-page-boundries */
        position: relative;
        z-index: 0;
        margin: 0 auto;
        width: 100%;
        overflow: hidden;
        /* 
        make sure the initial page height is always full-device-height as a minumim */
        min-height: 100vh;
    }

    .light-bg {
        background-color: aliceblue;
    }
</style>
