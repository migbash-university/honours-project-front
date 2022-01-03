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
</script>

<!-- ===================
	COMPONENT HTML
=================== -->

<header class='column-space-center' style='width: fit-content;'>
	<img 
		id='brand-img'
		src={star_based_logo}
		alt='star-based-logo'
	/>
</header>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
	header {
		position: absolute;
		top: 28px;
		left: 31px;
	} 

	/* 
    RESPONSIVE FOR TABLET (&+) [768px] */
    @media screen and (min-width: 768px) {
		/* ... empty ... */
    }
</style>