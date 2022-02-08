<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { browser, dev } from '$app/env';

    import { get } from '$lib/utils/api';

    import TouchDeviceView from '$lib/components/_TouchDeviceView.svelte';

    import { starbased_user_settings } from '$lib/store/userData'

	import '../app.css';

    // ... DEBUGGING;
    // if (dev) console.debug('page', $page)

    // ... on client-side-rendering;
    $: if (browser) {
        // ... kickstart the .localStorage();
        starbased_user_settings.useLocalStorage();
    }

    // ... background-color-check;
    let light_bg: boolean = false;
    // ... check what page the user is on:
    $: if ($page.url.pathname.includes('/quiz') || 
            $page.url.pathname.includes('/questionnaire') || 
            $page.url.pathname.includes('/thank-you')) {
        // ... trigger the `class` for the `main` color-change;
        light_bg = true
    } else {
        light_bg = false
    }

    // ... assign-user-uid;
    onMount(async() => {
        if (browser) {
            if ($starbased_user_settings.userUID === undefined) {
                // ... assign user-UID;
                const response = await get(`/api/assign-uid.json`)
                // ... extract userUID;
                let userUID: string = response.userUID;
                // ... save value for user-UID;
                starbased_user_settings.setUserUID(userUID)
            }
        }
    })

    // ~~~~~~~~~~~~~~~~~~~~~
	// VIEWPORT CHANGES
	// ~~~~~~~~~~~~~~~~~~~~~
    let touchDevice: boolean = false
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
        class:light-bg={light_bg === true}>
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
        background-color: white;
    }
</style>
