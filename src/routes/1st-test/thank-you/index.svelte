
<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
    import Header from '$lib/header/Header.svelte'
</script>

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

        <!-- ... further extra-info ... -->
        <div>
            <p
                class='s-20 color-black'>
                <b>This is the end of Test 1 / 3</b>
            </p>
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
</style>