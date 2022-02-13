<!-- ===================
	COMPONENT JS - MODULE 
    [TypeScript Written]
=================== -->

<!-- <script lang='ts' context="module">
	// export const prerender = true;

    // ... redirect directly to the UPCOMING LAUNCHES;
	export async function load() {
		// ...
		return {
			status: 302,
			redirect: '/upcoming-launches'
		};
	}
</script> -->

<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    // ...
	import { amp, browser, dev, mode, prerendering } from '$app/env'
    import { fade, slide } from 'svelte/transition'
    import { onDestroy, onMount } from 'svelte'
    import { goto } from '$app/navigation';

    import { post } from '$lib/utils/api'

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
                'test_2',
                'reading'
            )
            // ... increment-total-timer;
            starbased_user_settings.addTimer(
                1,
                'test_2',
                'timer_total'
            )
        }, 1000)
    })
    // ... on page change;
    onDestroy(async() => {
        // ... destroy setInterval()
        clearInterval(interval)
    })

    let startModelViewTimer: NodeJS.Timer
    async function incrementVisualTimerSection() {
        console.debug('console! Incrementing Timer!')
        // ...
        startModelViewTimer = setInterval(async() => {
            starbased_user_settings.addTimerTestSections(
                1,
                'test_2',
                'model_view_timer'
            )
        }, 1000)
    }

    function stopModelVisualTimer() {
        console.debug('Timer Stopped!')
        clearInterval(startModelViewTimer)
    }

    let startTextViewTimer: NodeJS.Timer
    async function incrementTextTimerSection() {
        console.debug('console! Incrementing Timer!')
        // ...
        startTextViewTimer = setInterval(async() => {
            starbased_user_settings.addTimerTestSections(
                1,
                'test_2',
                'text_bot_timer'
            )
        }, 1000)
    }

    function stopModelTextTimer() {
        console.debug('Timer Stopped!')
        clearInterval(startTextViewTimer)
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // PAGE USER-ACTIONS
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    let helpTipsShow: boolean = false;
    // ... toggle-hide-show-button-info;
    function toggleHelpTips() {
        helpTipsShow = !helpTipsShow
    }

    // ...
    let processing: boolean = false
    let user_input: string
    let conversationData: ResponseData[] = []
    // ...
    interface ResponseData {
        text: string
        user: 'agent' | 'user'
        response_time: number
    }
    // ...
    let responseData: ResponseData;
    // ... send-over-the-response-to-website-server;
    // ... and further processing of data;
    async function sendResponse(): Promise < void > {
        // ...
        processing = true
        starbased_user_settings.incTotalMessagesExchanged('test_2')
        let timerCounter: number = 0
        let responseInterval: NodeJS.Timer = setInterval(async () => {
            timerCounter = timerCounter + 1
        }, 1000)
        // ...
        responseData = {
            text: user_input,
            user: 'user',
            response_time: null
        }
        conversationData = [...conversationData, responseData]
        // ...
        starbased_user_settings.addToConversationHistory('test_2', conversationData)
        // ...
        scrollBottom()
        // ...
        let endpointBackend: string = import.meta.env.VITE_BACKEND_URL.toString()
        // if (dev) endpointBackend = 'http://192.168.0.40:9000'
        const resposne = await post(endpointBackend + `/post_question`, {
            user_input: user_input
        })
        // ... DEBUGGING;
        if (dev) console.debug('resposne', resposne)
        // ...
        responseData = {
            text: resposne['data'],
            user: 'agent',
            response_time: timerCounter
        }
        // ...
        conversationData = [...conversationData, responseData]
        starbased_user_settings.addToConversationHistory('test_2', conversationData)
        // ... reset;
        processing = false
        scrollBottom()
        clearInterval(responseInterval)
    }

    // ...
    function submitReading(): void {
        // ...
        // starbased_user_settings.updatePageCompletionStatus('test_2')
        // ... update-last-page-visit;
        starbased_user_settings.updateUserLastPage('/quiz')
    }

    // ... [REACTIVITY]
    // ... re-load-conversation-if-stored-in-local-storage;
    $: if ($starbased_user_settings != undefined &&
            $starbased_user_settings['test_data']['test_2']['conversation_history']['history'].length != 0 &&
            conversationData.length == 0) {
        conversationData = $starbased_user_settings['test_data']['test_2']['conversation_history']['history']
        // ...
        scrollBottom()
    }

    // ... function keep-scroll-bottom;
    function scrollBottom() {
        setTimeout(async() => {
            var element = document.getElementById("text-learning-container");
            element.scrollTop = element.scrollHeight;
        }, 50)
    }
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
        on:mouseleave={() => stopModelVisualTimer()}>
        <!-- ... no visual galaxy interaction ... -->
        <img 
            id='no-visual-img'
            src='/assets/svg/no-visual.svg' 
            alt='no-visual'
            aria-label='no-visual'
            width="115.84px" height="114px"
            />
    </div>

    <!-- ... conversational-agent-interaction-chunck-box-container ... -->
    <div 
        id='text-learning-container'
        on:mouseenter={() => incrementTextTimerSection()}
        on:mouseleave={() => stopModelTextTimer()}>

        <!-- ... info / help btn ... -->
        <div 
            id='more-info-container'>
            <!-- ... action-btn ... -->
            <button 
                on:click={() => toggleHelpTips()}
                class='help-btn'>
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
                        please interact with the Conversational agent using the input text box below, and prepare for an upcoming short quiz from the knowledge you have gathered from the conversations with the AI;
                        <br />
                        <br />
                        The following questions will be asked on the quiz:
                        <br />
                        <br />
                        • What is the temperature on Titan ?
                        <br />
                        • Is Titan larger than the planet Mercury ?
                        <br />
                        • How long is the day on Titan (in Earth days) ?
                        <br />
                        • What is the atmospheric pressure on Titan ? 
                        <br />
                        • What is Titan's atmosphere composed of ?
                        <br />
                        <br />
                        You may ask these questions to prepare for the test, or ask them in your own way.
                    </p>
                </div>
            {/if}
        </div>

        <!-- ... INFORMATION START ... -->
        <h1 
            id='test-title'
            class='s-42'> 
            Conversational Agent
        </h1>

        <!-- ... conversational=agent-user-interaction ... -->
        <div
            id='conversation-grid'>
            {#each conversationData as item}
                <div
                    class:user_chat_bubble={item.user === 'user'}
                    class:agent_chat_bubble={item.user === 'agent'}>
                    <p
                        class='s-16 color-white'>
                        {item.text} 
                    </p>
                    <!-- ... response-timer ... -->
                    {#if item.user === 'agent'}
                        <!-- content here -->
                        <div
                            id='response-time'
                            class='row-space-out m-t-10'>
                            <p
                                class='s-12 color-white m-r-5'>
                                response time
                            </p>
                            <p
                                class='s-12'
                                style="color: #EB00FF;">
                                {item.response_time} s
                            </p>
                        </div>
                    {/if}
                </div>
            {/each}
            <!-- ... bot-is-processing-response ... -->
            {#if processing}
                <!-- content here -->
                <img 
                    src='/assets/svg/loading/loading-bot-res-animated.svg' 
                    alt='bot-loading'
                    aria-label='bot-loading'
                    class='m-t-20'
                    width="93px" height="40px" />
            {/if}
        </div>
    </div>    

    <!-- ... container `div` next step ... -->
    <div
        id='contuniation-container'
        class='column-space-stretch'>
        <div
            class='m-b-20 row-space-end'>
            <!-- ... text btn procedure ... -->
            <p
                class='m-r-20 s-14 color-white'>
                Are you ready to undertake a 
                <br/> 
                end of reading test ?
            </p>
            <!-- ... continuation button ... -->
            <a 
                sveltekit:prefetch
                href='/quiz'>
                <button 
                    on:click={() => submitReading()}
                    class='continuation-btn'>
                    <h1 
                        class='s-18'>
                        <b>BEGIN TEST</b>
                    </h1>
                </button>
            </a>
        </div>
        <!-- ... submit-user-input ... -->
        <form 
            action="" 
            on:submit|preventDefault={sendResponse}
            class='row-space-end'>
            <fieldset
                class='m-r-10'
                style="width: -webkit-fill-available;
                        position: relative;">
                <input 
                    id='user-input'
                    class="s-14 color-black bold"
                    placeholder="Enter a question for the conversational agent..."
                    bind:value={user_input}
                    style='width: 100%'
                    type="text" 
                    required 
                    autocomplete="off" />
                {#if user_input != ''}
                    <!-- content here -->
                    <img 
                        id='clear-input-btn'
                        src="./assets/svg/cross-vector.svg" 
                        alt="cross-vector" 
                        width="24px" height="24px" 
                        on:click={() => user_input = ''}/>
                {/if}
            </fieldset>
            <button
                id='submit-response'
                type="submit"
                disabled={processing}
                >
            </button>
        </form>
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
        background: rgba(193, 189, 189, 0.5);
        width: 50vw;
        height: 100vh;
        position: relative;
    } img#no-visual-img {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 0;
        left: 0;
        width: 282px;
        text-align: center;
    }

    section #text-learning-container {
        width: 50vw;
        height: 100vh;
        padding: 31px 62px 225px 62px;
        overflow-y: scroll;
        position: relative;
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
        padding: 45px 62px;
        background-color: #2D2D2D;
        box-shadow: 0px -5px 5px rgb(0 0 0 / 25%);
    }

    h1#test-title {
        font-style: normal;
        font-weight: bold;
        line-height: 49px;
        letter-spacing: 0.17em;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    div#conversation-grid {
        gap: 5px;
        grid-template-columns: 1fr;
        display: grid;
    }

    div.user_chat_bubble {
        padding: 16px;
        background: rgba(0, 255, 178, 0.5);
        border-radius: 5px;
        text-align: right;
    }
    div.agent_chat_bubble {
        padding: 16px;
        background-color: none;
        border-radius: 5px;
    }

    input#user-input {
        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        height: 44px;
        padding: 12px 18px;
    }

    div#response-time {
        background: #000000;
        border-radius: 2.5px;
        padding: 2.5px 5px;
        width: fit-content;
    }

    img#clear-input-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 500;
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

    button#submit-response {
        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        height: 44px;
        width: 50px;
        background-image: url('/assets/svg/input-vector.svg');
        background-position: 50% 50%;
        background-repeat: no-repeat;
    } button#submit-response:disabled {
        opacity: 0.5;
    }
</style>