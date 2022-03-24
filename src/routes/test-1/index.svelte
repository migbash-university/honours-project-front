<!-- ===================
	COMPONENT JS - MODULE 
    [TypeScript Written]
=================== -->

<script context="module" lang="ts">
	// ...
	export const prerender = true;
</script>

<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    // ...
	import { amp, browser, dev, mode, prerendering } from '$app/env'
  import { fade, fly, slide } from 'svelte/transition'
  import { onDestroy, onMount } from 'svelte'
  import { goto } from '$app/navigation';

  import VisualQ_1 from '$lib/3d-visuals/test-1/_Visual-q-1.svelte';
  import VisualQ_2 from '$lib/3d-visuals/test-1/_Visual-q-2.svelte';
  import PlanetWithMarkers_2 from '$lib/3d-visuals/test-1/_Planet_with_Markers-2.svelte';

  import { first_test_data } from '$lib/data/1st-test'
  import { starbased_user_settings } from '$lib/store/userData';

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // TIMER COUNTER [AUTO]
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  let interval;
  // ... user-time-to-interact-with-test;
  onMount(async() => {
      // ... run every 1000ms (1-second)
      interval = setInterval(() => {
          // ... increment-QUIZ-timer;
          starbased_user_settings.addTimer(
              1,
              'test_1',
              'reading'
          )
          // ... increment-total-timer;
          starbased_user_settings.addTimer(
              1,
              'test_1',
              'timer_total'
          )
      }, 1000)
  })
  // ... on page change;
  onDestroy(async() => {
      // ... destroy setInterval()
      clearInterval(interval)
      clearInterval(startModelViewTimer)
      clearInterval(startTextViewTimer)
  })

  let startModelViewTimer: NodeJS.Timer
  async function incrementVisualTimerSection() {
      if (dev) console.debug('console! Incrementing Timer!')
      // ...
      startModelViewTimer = setInterval(async() => {
          starbased_user_settings.addTimerTestSections(
              1,
              'test_1',
              'model_view_timer'
          )
      }, 1000)
  }

  function stopModelVisualTimer() {
      if (dev) console.debug('Timer Stopped!')
      clearInterval(startModelViewTimer)
  }

  let startTextViewTimer: NodeJS.Timer
  async function incrementTextTimerSection() {
      if (dev) console.debug('console! Incrementing Timer!')
      // ...
      startTextViewTimer = setInterval(async() => {
          starbased_user_settings.addTimerTestSections(
              1,
              'test_1',
              'text_bot_timer'
          )
      }, 1000)
  }

  function stopModelTextTimer() {
      if (dev) console.debug('Timer Stopped!')
      clearInterval(startTextViewTimer)
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // PAGE USER-ACTIONS
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  let helpTipsShow: boolean = false;
  // ...
  function toggleHelpTips() {
      helpTipsShow = !helpTipsShow
  }

  // ...
  let viewMode: string = 'interactive'
  // ...
  function toggleViewMode(viewSet: string) {
      viewMode = viewSet;
  }

  // ...
  async function nextPage() {
      // ... update-last-page-visit;
      starbased_user_settings.updateUserLastPage('/quiz')
      // ... redirect
      await goto('/quiz')
  }

  let selectedQuestion: number = 1
  // ...
  function selectOptionQ(opt: number) {
      // ...
      // if (selectedQuestion == opt) {
      //     selectedQuestion = undefined
      // } else {
      selectedQuestion = opt
      // }
  }

  let hiddenBtnPhoto = false
</script>

<!-- ===================
	SVELTE INJECTION TAGS
=================== -->

<svelte:head>
    <!--
    ~~~~~~~~~~~~
    Primary Meta Tags;
    https://metatags.io/ -->
    <title> STAR-BASED </title>
    <meta name="title" content="STAR-BASED">
    <meta name="description" content="STAR-BASED">
    <meta name="keywords" content="STAR-BASED, 
        conversational agent,
        conversational ai,
        conversational artificial intelligence,
        artificial intelligence,
        education,
        education with conversational agent,
        education with artificial intelligence,
        education with ai,
        space education,
        space ai,
        space interactive model,
        space learning,
        space learning with ai,
        space,
        online education,
        ">
    <meta name="author" content="Miguel Bacharov">
    <!-- 
    ~~~~~~~~~~~~
    Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<link-goes-here>">
    <meta property="og:title" content="STAR-BASED">
    <meta property="og:description" content="STAR-BASED">
	<meta property="og:image" content="<link-goes-here>">
    <!--
    ~~~~~~~~~~~~
    Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="<link-goes-here>">
    <meta property="twitter:title" content="STAR-BASED">
    <meta property="twitter:description" content="STAR-BASED">
	<meta property="twitter:image" content="<link-goes-here>">
</svelte:head>

<!-- ===================
	COMPONENT HTML
=================== -->

<section 
    class='row-space-out'>

    <!-- ... interactive-model-galaxy ... -->
    <div 
        id='model-galaxy'
        on:mouseenter={() => incrementVisualTimerSection()}
        on:mouseleave={() => stopModelVisualTimer()} >
        <!-- ... canvas for interactive visualization ... -->
        {#if selectedQuestion == 1}
            <!-- content here -->
            <PlanetWithMarkers_2 />
        {:else}
            <!-- content here -->
            <VisualQ_2 />
        {/if}
        <!-- ... planet-view-info-option-box ... -->
        {#if selectedQuestion == 1}
            <div
                id='option-view-box'>
                <p>
                    Planet Info Stats View
                </p>
            </div>
        {:else if selectedQuestion == 2} 
            <div
                id='option-view-box'>
                <p>
                    Planet Size Comparison View
                </p>
            </div>
        {/if}
        <!-- ... planet-view-3D-toggle-info ... -->
        <div
            id='options-questions-box'>
            <!-- ... option-view-text ... -->
            <p
                class='s-14 text-center color-white m-b-10 bold'>
                Toggle
                <br>
                3D 
                <br>
                Views
            </p>
            <!-- ... option-view-1 -->
            <div
                on:click={() => selectOptionQ(1)}
                class='row-space-center m-b-10 option-3d-toggle-view'
                class:active-view={selectedQuestion === 1}>
                <img 
                    src="./assets/svg/planet-info-icon.svg" 
                    alt=""
                    title="Planet Info Stats View" />
            </div>
            <!-- ... option-view-2 -->
            <div
                on:click={() => selectOptionQ(2)}
                class='row-space-center m-b-10 option-3d-toggle-view'
                class:active-view={selectedQuestion === 2}>
                <img 
                    src="./assets/svg/planet-size-icon.svg" 
                    alt=""
                    title="Planet Size Comparison View" />
            </div>
        </div>
        <!-- ... change view types ... -->
        <div
            id='change-interactive-views'
            class='row-space-out'>
            <!-- ... interactive toggle ... -->
            <button
                on:click={() => toggleViewMode('interactive')}
                class:selectedView={viewMode === 'interactive'}
                class='toggle-view-btn column-space-center m-r-10'>
                <!-- ... image-asset ... -->
                {#if viewMode === 'interactive'}
                    <img 
                        src="./assets/svg/3D-icon-selected.svg" 
                        alt="" 
                        class='m-b-10'
                        width="39.38px" height="39.38px"
                    />
                {:else}
                    <img 
                        src="./assets/svg/3D-icon-idle.svg" 
                        alt="" 
                        class='m-b-10'
                        width="39.38px" height="39.38px"
                    />
                {/if}
                <!-- ... button-text-action ... -->
                <p>
                    interactive 3D 
                    <br/>
                    model
                </p>
            </button>
            <!-- ... photo gallery toggle ... -->
            {#if hiddenBtnPhoto}
                 <!-- content here -->
                <button
                    on:click={() => toggleViewMode('photo')}
                    class:selectedView={viewMode === 'photo'}
                    class='toggle-view-btn column-space-center'>
                    <!-- ... image-asset ... -->
                    {#if viewMode === 'photo'}
                        <img 
                            src="./assets/svg/photo-gallery-icon-selected.svg" 
                            alt=""
                            class='m-b-10'
                            width="38px" height="32px"
                        />
                    {:else}
                        <img 
                            src="./assets/svg/photo-gallery-icon-idle.svg" 
                            alt="" 
                            class='m-b-10'
                            width="38px" height="32px"
                        />
                    {/if}
                    <!-- ... button-text-action ... -->
                    <p>
                        photo gallery
                    </p>
                </button>
            {/if}
        </div>
    </div>

    <!-- ... text-chunck-box-container ... -->
    <div 
        id='text-learning-container'
        on:mouseenter={() => incrementTextTimerSection()}
        on:mouseleave={() => stopModelTextTimer()} >

        <!-- ... info / help btn ... -->
        <div 
            id='more-info-container'>
            <!-- ... action-btn ... -->
            <button 
                on:click={() => toggleHelpTips()}
                class='help-btn help-button-pulsate'>
                <h1 
                    class='s-18 color-white'>
                    <b>HELP</b>
                </h1>
            </button>
            <!-- ... action-display-btn-data ... -->
            {#if helpTipsShow}
                <div
                    id='helpTipsContainer'
                    transition:slide>
                    <p
                        class='s-14 color-secondary m-b-15'
                        style='
                            background-color: #000000;
                            padding: 3px 10px;
                            width: fit-content;'>
                        <b>
                            YOUR TASKS
                        </b>
                    </p>
                    <p
                        class='color-white s-14'>
                        1. please read through the given passage / information on the planet TITAN below and identify information answering the following questions on the quiz:
                        <br />
                        <br />

                        <span
                          class='color-secondary underline'>
                          • Which planets and moons is Titan larger/smaller than ?
                          <br />
                          • How long does Titan take to make a single rotation around Saturn ?
                          <br />
                          • The atmospheric pressure on Titan is roughly… ?
                          <br />
                          • The surface temperature of Titan is … ?
                          <br />
                          • What is Titan's atmosphere composed of ?
                        </span>

                        <br />
                        <br />
                        2. when ready, proceed to the next page to answer some end of test questions based on the passage below
                        <br />
                        <br />
                        3. once you complete the end of the topic test, you will be prompted to answer a simple 4 question questionnaire on your experience.

                    </p>
                </div>
            {/if}
        </div>

        <!-- ... INFORMATION START ... -->
        <h1 
            id='test-title'
            class='s-42'> 
            { first_test_data.title } 
        </h1>

        <p 
            class='s-14'>
            {@html first_test_data.text}
        </p>
    </div>    

    <!-- ... container `div` next step ... -->
    <div
        id='contuniation-container'
        class='row-space-end'>
        <!-- ... text btn procedure ... -->
        <p
            class='m-r-20 s-14 color-white'>
            Are you ready to undertake a 
            <br/> 
            end of reading test ?
        </p>
        <!-- ... continuation button ... -->
        <button 
            class='continuation-btn'
            on:click={() => nextPage()}>
            <h1 
                class='s-18'>
                <b>BEGIN TEST</b>
            </h1>
        </button>
    </div>

</section>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    section {
        margin: 0 !important;
    }

    section #model-galaxy {
        background-color: #000000;
        width: 50vw;
        height: 100vh;
        position: relative;
    }

    section #text-learning-container {
        width: 50vw;
        height: 100vh;
        padding: 31px 62px 150px 62px;
        overflow-y: scroll;
        position: relative;
    }

    div#options-questions-box {
        position: absolute;
        right: 10px;
        top: 35%;
    }

    div#helpTipsContainer {
        background: #4D4D4D;
        border-radius: 0px 2.5px 2.5px 2.5px;
        padding: 20px 15px;
    }

    div#contuniation-container {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 50vw;
        z-index: 10;
        padding: 45px 62px 45px 0;
        background-color: #4D4D4D;
        box-shadow: 0px -5px 5px rgb(0 0 0 / 25%);
    }

    div#change-interactive-views {
        position: absolute;
        bottom: 27px;
        margin: auto;
        right: 0;
        left: 0;
        width: fit-content;
    }

    h1#test-title {
        font-style: normal;
        font-weight: bold;
        line-height: 49px;
        letter-spacing: 0.17em;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    div#option-view-box {
        position: absolute;
        top: 28px;
        right: 0;
        left: 0;
        width: fit-content;
        margin: auto;
        padding: 10px 22px;
        background: #005BAF;
        border: 2px solid #0085FF;
        box-sizing: border-box;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
    }

    div.option-3d-toggle-view {
        background: #141414;
        border: 2.5px solid #373737;
        box-sizing: border-box;
        border-radius: 2.5px 0px 0px 2.5px;
        padding: 12px 8px;
        transition: all ease 0.3s;
        cursor: pointer;
    } div.option-3d-toggle-view:hover {
        background-color: white;
    }
    div.active-view {
        border: 2.5px solid #00FFB2;
        background-color: black;
    }

    
    div#options-questions-box {
        position: absolute;
        padding: 15px 7px;
        right: 0px;
        top: 50%;
        transform: translate(-0, -50%);
        background: #2D2D2D;
        border-radius: 5px 0px 0px 5px;
    }

    /*
    ~~~~~~~~~~~~~~~~ 
    scrollbar STYLE */

    ::-webkit-scrollbar {
        width: 7px;
        z-index: 1000;
    } ::-webkit-scrollbar-track {
        background-color: #574E4E;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        margin: 100px 0 200px 0;
    } ::-webkit-scrollbar-thumb {
        background-color: #C4C4C4;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
    }

    /* 
    ~~~~~~~~~~~~~~~~ 
    buttton */
    button.toggle-view-btn {
        background-color: transparent;
        border: 1px solid #FFFFFF !important;
        border-radius: 5px;
        padding: 10px;
        width: 109px;
        height: 98px;
    }
    button.toggle-view-btn.selectedView,
    button.toggle-view-btn:hover {
        border: none !important;
        background-color: #252525;
    }
    button.toggle-view-btn.selectedView p,
    button.toggle-view-btn:hover p {
        color: #00FFB2;
    }

    button.help-btn {
        height: 44px;
        padding: 0 52px 0 8px !important;
        background-image: url('/assets/svg/help-icon.svg');
        background-repeat: no-repeat;
        background-position: 95% 50%;
        background-color: #676767 !important;
        background-size: auto;
    }

    button.continuation-btn {
        height: 44px;
        padding: 0 52px 0 8px !important;
        background-image: url('/assets/svg/arrow-red-btn.svg');
        background-repeat: no-repeat;
        background-position: 95% 50%;
        background-size: auto;
    }
</style>