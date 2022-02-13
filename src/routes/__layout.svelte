<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { browser, dev } from '$app/env';
    import { goto } from '$app/navigation';

    import { get } from '$lib/utils/api';
    import { starbased_user_settings } from '$lib/store/userData'

    import MainSplashScreen from '$lib/components/transition/_MainSplashScreen.svelte';
    import TouchDeviceView from '$lib/components/_TouchDeviceView.svelte';
    import UserUid from '$lib/components/header/UserUID.svelte';
    import UserAuth from '$lib/components/header/UserAuth.svelte';
    import Header from '$lib/components/header/Header.svelte';

	import '../app.css';

    // ... DEBUGGING;
    // if (dev) console.debug('page', $page)

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ON-LOAD INSTANT
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

    // ... INITIAL on client-side-rendering of LOCAL-STORAGE();
    onMount(async() => {
        if (browser) {
            // ... kickstart the .localStorage();
            starbased_user_settings.useLocalStorage();
        }
    })

    // ... assign-user-uid;
    // ... if they do not have one yet;
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

    // ... [REACTIVIY]
    // ... check for user last accessed-page-and redirect accordingly
    // ... to the most updated current page progress status;
    // $: if ($starbased_user_settings != undefined &&
    //         $starbased_user_settings.current_page != undefined &&
    //         $starbased_user_settings.current_page != $page.url.pathname) {
    //     // ... redirect; 
    //     // ... DEBUGGING;
    //     if (dev) console.debug(`redirecting user to '${$starbased_user_settings.current_page}' page`)
    //     // ... REDIRECTING USER;
    //     goto($starbased_user_settings.current_page)
    // }

    // ... [REACTIVIY]
    // ... check-user-has-waited-X-days-before-next-test;
    // let currentDateUNIX: number = Date.now()
    // $: if ($starbased_user_settings != undefined &&
    //         $starbased_user_settings.last_test_completion_date != undefined &&
    //         $starbased_user_settings.current_page != undefined &&
    //         $starbased_user_settings.current_page.toString() === '/thank-you') {
    //         let lastDateUNIX: number = parseInt($starbased_user_settings.last_test_completion_date.toString())
    //         // ...
    //         let lastDate = new Date(lastDateUNIX * 1000);
    //         // ... determine-difference-in-days;
    //         let newDate = new Date(lastDate).getDate(); //convert string date to Date object
    //         let currentDate = new Date().getDate();
    //         let diff = currentDate - newDate;
    //         // ... DEBUGGING;
    //         if (dev) console.debug('date difference from last-test is', diff)
    //         // ... act-accordingly;
    //         if (diff > parseInt(import.meta.env.VITE_TEST_INTERVAL.toString())) {
    //             // ... next-test;
    //             starbased_user_settings.updateTestCounter()
    //             starbased_user_settings.updateUserLastPage('/welcome-info')
    //             // ... redirect-user-to-new-test-start;
    //             goto('/welcome-info')
    //         }
    // }

    // ... [REACTIVIY]
    // ... check that the header-logo to be shown;
    // ... on certain-pages;
    let showHeaderLogo: boolean = false;
    $: if ($page.url.pathname === '/' ||
            $page.url.pathname === '/welcome-info') {
            // ...
            showHeaderLogo = false
    } else {
        showHeaderLogo = true
    }

    // ... [REACTIVIY]
    // ... check that the user-auth to be shown;
    // ... on certain-pages;
    let showUserAuth: boolean = false;
    $: if (($starbased_user_settings != undefined &&
            starbased_user_settings.last_test_completion_date == undefined) &&
            $page.url.pathname === '/' ||
            $page.url.pathname === '/welcome-info') {
            // ...
            showUserAuth = true
    } else {
        showUserAuth = false
    }

    // ~~~~~~~~~~~~~~~~~~~~~
	// USER VIEWPORT CHANGES
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

<MainSplashScreen />

{#if !showUserAuth}
    <UserUid />
{/if}

<!-- ... User-Auth when no LocalStorage() found -->
{#if showUserAuth}
    <!-- ... content-here ... -->
    <UserAuth />
{/if}

{#if showHeaderLogo}
    <Header />
{/if}

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
        background-color: var(--dark);
        /* 
        make sure the initial page height is always full-device-height as a minumim */
        min-height: 100vh;
    }

    .light-bg {
        background-color: white;
    }
</style>
