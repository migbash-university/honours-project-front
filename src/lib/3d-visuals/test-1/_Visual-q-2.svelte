<!-- 
    Description:
    This is just the Questions and data about the panet-size
    comparison between each other;
-->

<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    import Titan from "./planets/_Titan.svelte";
    import Mercury from "./planets/_Mercury.svelte";
    import Pluto from "./planets/_Pluto.svelte";
    import Earth from "./planets/_Earth.svelte";
</script>

<!-- ===================
	COMPONENT HTML
=================== -->

<div
    id='grid-planets'>
    <Titan />
    <Mercury />
    <Pluto />
    <Earth />
</div>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    div#grid-planets {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 250px 250px 250px;
    }
</style>