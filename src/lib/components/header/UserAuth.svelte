<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
	import { amp, browser, dev, mode, prerendering } from '$app/env';

    import { onMount } from "svelte"
	import { page } from '$app/stores'

    import { starbased_user_settings } from '$lib/store/userData';
    import { post } from '$lib/utils/api';

	let light_bg: boolean = false;
    // ... check what page the user is on:
    $: if ($page.url.pathname.includes('/quiz') || $page.url.pathname.includes('/questionnaire') || $page.url.pathname.includes('/thank-you')) {
        // ... trigger the `class` for the `main` color-change;
        light_bg = true
    } else {
        light_bg = false
    }

    let showAuthBox: boolean = false;
    let userUID: string;
    // ...
    async function authUser() {
        const response = await post(`/api/auth.json`, {
            userUID: userUID
        })
        // ... DEBUGGING;
        if (dev) console.debug('response', response)
        // ...
        if (response.auth === true) {
            starbased_user_settings.reloadUserData(response.user_data)
        }
        // ...
        else {
            if (dev) console.debug('No user found!')
        }
    }
</script>

<!-- ===================
	COMPONENT HTML
=================== -->

<div
    id='user-auth-box'
    class='row-space-start'
    style='width: fit-content;'>
    <!-- ... reminder text ... -->
    <p
        class='s-12 color-white m-r-20'
        style="background-color: black;
                padding: 10px;
                border-radius: 5px;">
        Accessing from a different device ?
        <br>
        Already completed a previous test ?
        <br>
        <span class='color-secondary'>
            <u>Login using your UID!</u>
        </span>
        ⭜
    </p>
    <!-- ... button-login ... -->
    <button
        id='login-btn'
        on:click={() => showAuthBox = !showAuthBox}>
        LOGIN
    </button>
    <!-- ... input-login-form ... -->
    {#if showAuthBox}
        <!-- content here -->
        <div
            id='submit-login-form'>
            <input 
                type="text"
                placeholder="Enter userUID"
                bind:value={userUID}
                required>
            <button
                on:click={() => authUser()}>
                Submit
            </button>
        </div>
    {/if}

</div>

<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
	div#user-auth-box {
		position: absolute;
		top: 28px;
        right: 31px;
        margin: auto;
		z-index: 50000;
        box-sizing: border-box;
	} button#login-btn {
        padding: 8px 32px 8px 8px !important;
        background: #FFFFFF;
        border-radius: 5px;
        background-image: url('/static/assets/svg/account-vector.svg');
        background-repeat: no-repeat;
        background-position: 90% 50%;
    } div#submit-login-form {
        position: absolute;
        top: 100%;
        right: 0;
    }

	/* 
    RESPONSIVE FOR TABLET (&+) [768px] */
    @media screen and (min-width: 768px) {
		/* ... empty ... */
    }
</style>