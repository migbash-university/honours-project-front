
<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    import Header from '$lib/components/header/Header.svelte'
</script>

<!-- ===================
	SVELTE INJECTION TAGS
=================== -->

<!-- adding SEO title and meta-tags to the /basket page -->
<svelte:head>
    <!--
    ~~~~~~~~~~~~
    Primary Meta Tags;
    https://metatags.io/ -->
    <title> STAR-BASED | Thank You </title>
    <meta name="title" content="STAR-BASED | Thank You">
    <meta name="description" content="STAR-BASED | Thank You">
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
    <meta property="og:title" content="STAR-BASED | Thank You">
    <meta property="og:description" content="STAR-BASED | Thank You">
	<meta property="og:image" content="<link-goes-here>">
    <!--
    ~~~~~~~~~~~~
    Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="<link-goes-here>">
    <meta property="twitter:title" content="STAR-BASED | Thank You">
    <meta property="twitter:description" content="STAR-BASED | Thank You">
	<meta property="twitter:image" content="<link-goes-here>">
</svelte:head>

<!-- ===================
	COMPONENT HTML
=================== -->

<Header />

<section>

    <div
        id='intro-hero'
        class='column-space-center'>

        <!-- ... title-section-h1 ... -->
        <h1  
            id='quiz-title'
            class='s-42 color-black bold text-center m-b-20'>
            Thank you for taking part! 
        </h1>

        <!-- ... text info thank you ... -->
        <p
            class='s-20 color-black m-b-40'>
            Your responses have been recorded and you can now close and exit this website
        </p>

        <!-- ... test-reminder ... -->
        <div
            id='test-id-container'>
            <p 
                class='s-14'>
                <b>THIS IS TEST NUMBER</b>
                <span
                    style='
                    color: black;
                    background-color: #00FFB2;
                    padding: 9px 5px;'>
                    {import.meta.env.VITE_TEST_NUMBER.toString()}
                </span>
                <span>
                    /
                </span>
                <span>
                    3
                </span>
            </p>
        </div>

        <!-- ... further extra-info ... -->
        <div>
            <p 
                class='s-16 color-black'>
                The next test will take place on the ?? / ?? / ?? 
            </p>
            <p
                class='s-16 color-black'>
                Accessible on the following link - _____________________
            </p>
        </div>

    </div>

</section>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    h1#quiz-title {
        position: relative;
    }

    #intro-hero {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 0;
        left: 0;
        text-align: center;
    }

    #test-id-container {
        background-color: #000000;
        padding: 9px 14px;
        width: fit-content;
    }
</style>