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
	import { amp, browser, dev, mode, prerendering } from '$app/env';
    import { goto } from '$app/navigation';
    import { starbased_user_settings } from '$lib/store/userData';
    
    import starbased_logo from '$lib/starbased-icon.svg'

    let userEmail: string;
    
    // ... submit FORM DATA;
    async function onSubmit(e?) {
        // ... persist-user-email;
        // starbased_user_settings.setUserEmail(userEmail);
        // ...
        await goto("/welcome-info");
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

<section>
    <!-- ... website introduction ... -->
    <div 
        id='intro-hero'
        class='column-space-center m-b-55'>
        <img 
            src={starbased_logo} 
            alt='star-based-logo-cyan'
            width="52.75px" height="32.92px"
        />
        
        <h1>
            <b>STAR-<span class='color-secondary'>BASED</span></b>
        </h1>

        <hr />

        <p 
            class='s-16'> 
            Learn <b>space</b> using
            <br /> 
            artificial intelligence and 3D models
        </p>
    </div>

    <!-- ... website honours project warning message ... -->
    <div 
        id='ethics-container'
        class='column-space-stretch'>
        
        <!-- ... warning-headline-honours-project ... -->
        <span 
            class="row-space-initial-start m-b-15">
            <img 
                src='/assets/svg/triangle-point.svg' 
                alt=""
                class='m-r-5'
            />
            <p 
                class='s-14 color-secondary'>
                <b>THIS IS AN HONOURS PROJECT</b>
            </p>
        </span>
        
        <!-- ... warning-headline-ethics ... -->
        <p 
            class='s-14 m-b-25 bold'> 
            Before proceeding, please agree to the Edinburgh Napier 
            Universities Honours Project Ethics Regulations & GDPR:
        </p>

        <!-- ... ethics-clause ... -->
        <p 
            class='s-14 color-white m-b-30'>
            
            <span class='color-primary'>
                <b> What is the Experiment? </b>
            </span>

            <br/>
            <br/>

            This is an Honours Project. This experiment is an educational test. It tests the participants capability in learning using technology, without a personal human mentor to guide the user in the learning process.
            In this experiment, you will be educated in depth of the celestial object (natural-satellite) - Titan. 
            This experiment is a series of 3 separate experiments, which all involve an interactive galaxy-model, a text passage or an artificial intelligence bot that will respond to your questions about Titan. 
            Each experiment is broken down into 3 parts:
            <br/>
            <br/>
            a) … a reading, or (conversational-bot) section where the user interacts with a passage and or the conversational agent, to extract the answers from the passage, and or bot, answering the questions presented in the “HELP” button on the `”reading-page”
            <br/>
            b) … a quiz page, which will allow you the opportunity to answer the questions that you have obtained from the previous-reading section of the website,
            <br/>
            c) … a questionnaire, which will allow you to express your opinion on the conducted test in the form of a likert-scale.

            <br/>
            <br/>

            <span class='color-primary'>
                <b> Do I have to take part? </b>
            </span>

            <br/>
            <br/>

            No - participation is entirely voluntary. You can also choose to withdraw at any time, without giving any reason, and without any negative consequences. 

            <br/>
            <br/>

            <span class='color-primary'>
                <b> What data will you collect and what will you do with it? </b>
            </span>

            <br/>
            <br/>

            If you choose to use the Conversational Bot provided by this test, an anonymised transcription of your conversation will be stored by Edinburgh Napier University (ENU). Similarly, if you choose to take part in the optional feedback survey, ENU will store an anonymous record of your responses.
            The textual content of any question you ask the Bot will be used to match our knowledge base of questions to find an appropriate answer. We will provide the answer back to you through the chat window. The data you provide will also be used to assess and improve the Bot, and to inform the development of other healthcare bots.
            Results from the research may be summarised and published in scientific conferences and/or journal papers and presentations. No identifying information will be included.

            <br/>
            <br/>
            
            <span class='color-primary'>
                <b> How will you protect my data? </b>
            </span>

            <br/>
            <br/>

            All data will be stored anonymously and securely on a firewall-protected University server, or on the University's secure encrypted cloud storage services (Dropbox Enterprise or Sharepoint). In line with ENU policy, the anonymous data collected will be retained for a minimum period of 10 years following project completion.
            When interacting with the Conversational Bot you may choose (but are not required) to include personal information in your question, including special category personal data. For example, you may provide information that discloses any health, disability or ethnic status. It is important to note that you can use the Conversational Bot without sharing any such information in your question.
            The lawful basis for processing your data will be your explicit consent, which you can withdraw at any time. For example, if you ask the Bot a question and later decide that you no longer wish to converse with the Bot, you can delete the conversation history from your browser. You can also request that your data be withdrawn from the experiment by contacting the researchers in charge of the study (see below). Please note that since the data is anonymised this will only be possible in some circumstances e.g. you are able to pinpoint the exact date and time of your interaction and/or identify accurately the content of the enquiries you wish deleted.
            The data controller is Napier University. As such, Napier has the responsibility to comply and to demonstrate compliance with, data protection law. Further information, including details of who to contact if you would like more information or have any concerns, is available here.
            
            <br/>
            <br/>

            <span class='color-primary'>
                <b> Who can I contact for more information? </b>
            </span>

            <br/>
            <br/>
            For questions regarding the research study, please contact at 40416445@live.napier.ac.uk.

            <br/>
            <br/>
            P.S.: This survey contains a completion code for SurveySwap.io
        </p>

        <!-- ... consent-form-submit ... -->
        <form
            action=""
            id='ethics-consent-form'
            on:submit|preventDefault={() => onSubmit()}>
            <!-- ... label-for-ethics-input ... -->
            <label 
                id='terms-and-agreement-checkbox'
                class="container row-space-start m-b-30">
                <p
                    class='color-white s-14 bold'>
                    I have read and understood the information above, and agree to proceed on this basis.
                </p>
                <input 
                    type='checkbox' 
                    name='tems_and_cond'
                    value='tems_and_cond'
                    class='m-r-20' 
                    required />
                <span class="checkmark"></span>
            </label>
        </form>
    </div>

    <!-- ... continuation button ... -->
    <button
        form="ethics-consent-form"
        type="submit" 
        class='continuation-btn'>
        <h1 
            class='s-18 color-white'>
            <b>NEXT</b>
        </h1>
    </button>
</section>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    #intro-hero {
        margin: auto;
        width: 282px;
        text-align: center;
    }

    #ethics-container {
    }

    label#terms-and-agreement-checkbox {
        background-color: black;
        padding: 2.5px 10px 2.5px 35px;
        border-radius: 2.5px;
        width: fit-content;
    }

    input#email-input {
        background: #FFFFFF;
        border-radius: 2.5px;
        padding: 11px;
        width: 357px;
        height: 44px;
    }

    /* 
    buttton */
    button.continuation-btn {
        position: absolute;
        bottom: 45px;
        right: 135px;
        height: 44px;
        padding: 0 52px 0 8px !important;
        background-image: url('/assets/svg/arrow-btn.svg');
        background-repeat: no-repeat;
        background-position: 95% 50%;
        background-color: #676767 !important;
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
    }

    /* 
    input-checkbox-radio-btn */
    
    /* The container */
    .container {
        display: block;
        position: relative;
        padding-left: 35px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>