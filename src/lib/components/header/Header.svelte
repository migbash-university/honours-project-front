<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
	import { amp, browser, dev, mode, prerendering } from '$app/env';
	// ...
	import { onMount } from "svelte"
	import { page } from '$app/stores'
	// ...
	import star_based_logo from './assets/star-based-logo.svg'
	import star_based_black_logo from './assets/star-based-black-logo.svg'
	// ...

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

<header class='column-space-center' style='width: fit-content;'>
	{#if !light_bg}
		 <!-- content here -->
		<img 
			id='brand-img'
			src={star_based_logo}
			alt='star-based-logo'
			/>
	{:else}
		<img 
			id='brand-img'
			src={star_based_black_logo}
			alt='star-based-logo'
			/>
	{/if}

</header>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
	header {
		position: absolute;
		top: 28px;
		left: 31px;
		z-index: 50000;
	} 

	/* 
    RESPONSIVE FOR TABLET (&+) [768px] */
    @media screen and (min-width: 768px) {
		/* ... empty ... */
    }
</style>