<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
	import { amp, browser, dev, mode, prerendering } from '$app/env';

    import { onMount } from "svelte"
	import { page } from '$app/stores'

    import { starbased_user_settings } from '$lib/store/userData';

	let light_bg: boolean = false;
    // ... check what page the user is on:
    $: if ($page.url.pathname.includes('/quiz') || $page.url.pathname.includes('/questionnaire') || $page.url.pathname.includes('/thank-you')) {
        // ... trigger the `class` for the `main` color-change;
        light_bg = true
    } else {
        light_bg = false
    }
</script>

<!-- ===================
	COMPONENT HTML
=================== -->

<div
    id='user-uid'
    class='row-space-out'
    style='width: fit-content;'>
    <p 
        class="s-14 m-r-20"
        class:color-white={!light_bg}
        class:color-black={light_bg} >
        Your Unique User ID
    </p>
    <p
        class='bold color-secondary'
        style='color: #00AADF;'>
        {$starbased_user_settings.userUID}
    </p>
</div>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
	div#user-uid {
		position: absolute;
		top: 28px;
		right: 31px;
		z-index: 50000;
        border: 2px solid #FF6464;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 10px 12px;
	} 

	/* 
    RESPONSIVE FOR TABLET (&+) [768px] */
    @media screen and (min-width: 768px) {
		/* ... empty ... */
    }
</style>