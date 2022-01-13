
<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">

</script>

<!-- ===================
	COMPONENT HTML
=================== -->

<section>
    <!-- ... title-section-h1 ... -->
    <h1  
        id='quiz-title'
        class='s-42 color-black bold text-center m-b-55'>
            Test | Knowledge 
    </h1>

    <!-- ... queiz-grid ... -->
    <div
        id='quiz-grid'>

        <!-- ... 1st column questions ... -->
        <div>
            <!-- ... [question-1] ... -->
            <div
                class='row-space-start'>
                <!-- ... question-number ... -->
                <div
                    class='circle-question-number m-r-20'>
                    <p
                        class='s-18 bold color-black'>
                        1
                    </p>
                </div>
                <!-- ... question-card ... -->
                <div 
                    class='column-space-start'>
                    <!-- ... question ... -->
                    <p
                        class='s-18 bold color-black m-b-10'>
                        What was the distance between the Earth and Mars at the shortest distance from one another ?
                    </p>
                    <!-- ... question hint ... -->
                    <p
                        class='s-12 color-grey'>
                        please select one of the following:
                    </p>
                    <!-- ... question input ... -->
                </div>
            </div>
        </div>

        <!-- ... 2nd column questions ... -->
        <div>
            <!-- ... [question-n] ... -->
            <div
                class='row-space-start'>
                <!-- ... question-number ... -->
                <div
                    class='circle-question-number m-r-20'>
                    <p
                        class='s-18 bold color-black'>
                        1
                    </p>
                </div>
                <!-- ... question-card ... -->
                <div 
                    class='column-space-start'>
                    <!-- ... question ... -->
                    <p
                        class='s-18 bold color-black m-b-10'>
                        What was the distance between the Earth and Mars at the shortest distance from one another ?
                    </p>
                    <!-- ... question hint ... -->
                    <p
                        class='s-12 color-grey'>
                        please select one of the following:
                    </p>
                    <!-- ... question input ... -->
                </div>
            </div>
        </div>
    </div>

    <!-- ... continuation button ... -->
    <a 
        sveltekit:prefetch
        href="/1st-test/questionnaire">
        <button 
            class='continuation-btn'>
            <h1 
                class='s-18 color-white'>
                <b>SUBMIT</b>
            </h1>
        </button>
    </a>

</section>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
    :global(body) {
        background-color: white
    }

    h1#quiz-title {
        position: relative;
    } h1#quiz-title::after {
        content: "";
        position: absolute;
        height: 5px;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #00FFB2 51.31%, rgba(0, 0, 0, 0) 102.61%);
        width: 100%;
        top: 125%;
        right: 0;
        left: 0;
    }
    
    div#quiz-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 200px;
        grid-auto-flow: column;
    }

    div.circle-question-number {
        width: 50px;
        height: 50px;
        background: white;
        border-radius: 50%;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        /*  */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button.continuation-btn {
        position: absolute;
        bottom: 45px;
        right: 135px;
        height: 44px;
        padding: 0 52px 0 8px !important;
        background-image: url('/assets/svg/arrow-btn-white.svg') !important;
        background-repeat: no-repeat;
        background-position: 95% 50%;
        background-size: auto;
        background-color: #00AADF !important;
    }
</style>