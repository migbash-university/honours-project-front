<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang='ts'>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import starbased_logo from './assets/logo-splash.svg'

    /**
     * Description:
     * ~~~~~~~~~~~~
     * ... set a Timer To Show/Hide the 
     * ... elements of the HTML Page
    */
    let show: boolean = true;
    onMount (() => {
        // ... itialiazing timer,
        // ... reset all of the values to its initial state;
        setTimeout(() => {
            show = false;
            document.documentElement.classList.remove("no-scrollbar");
            document.body.classList.remove("no-scrollbar");
        }, 1250);
    });
</script>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    /* 
    Hide scrollbar for Chrome, Safari and Opera */
    :global(body.no-scrollbar::-webkit-scrollbar) {
        display: none !important;
    }
    /* 
    Hide scrollbar for IE, Edge and Firefox */
    :global(body.no-scrollbar) {
        -ms-overflow-style: none !important;   /* IE and Edge */
        scrollbar-width: none !important;      /* Firefox */
    }
    /* 
    Container for the Displaying of the Splash-Screen */
    div {
        position: fixed;
        background-color: #2D2D2D;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 1000;
        display: grid;
        align-content: center;
        align-items: center;
        justify-items: center;
        grid-gap: 30px;
    }
    /* 
    ===================
    RESPONSIVNESS - DESKTOP COMPATABILITY
    ===================
    */
    @media only screen and (min-width: 1024px) {
        #brand-svg {
            height: 93.09px;
            width: 200.63px;
        }
        p {
            font-size: 21px;
        }
        #loading-svg {
            height: 63.36px;
            width: 91.79px;
        }
	}
</style>

<!-- ===================
	COMPONENT HTML
=================== -->

{#if show}
    <div transition:fade>
        <img 
            id='brand-svg'
            src={starbased_logo}
            alt='starbased-logo-img'
            width='139px' height='69.96px'
        />
    </div>
{/if}