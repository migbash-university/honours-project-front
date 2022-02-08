// ... ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ... contains the TRANSLATION LANG SELECTED by the USER;
// ... ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { dev } from '$app/env';
import { writable } from 'svelte/store';

// ... interface-parameters-data;
interface Test_Data {
    timer_data: {
        timer_total: number     // ... UNIX;
        reading: number         // ... UNIX;
        quiz: number            // ... UNIX;
        questionnaire: number   // ... UNIX;
    }
    quiz: {
    }
    questionnaire: {
    }
}

// ... interface-parameters-data-test-2+;
interface Test_Data_Agent {
	timer_data: {
        timer_total: number     // ... UNIX;
        reading: number         // ... UNIX;
        quiz: number            // ... UNIX;
        questionnaire: number   // ... UNIX;
    }
	conversation_history: {
		total_ex_messages: number
		history: []
	}
    quiz: {
    }
    questionnaire: {
    }
}

// ... interface-user-data;
interface User_Setting {
    userUID: string
    test_data: {
        test_1: Test_Data
        test_2: Test_Data_Agent
        test_3: Test_Data_Agent
    }
}

// ... initialize-object-data;
const user_settings: User_Setting = {
    // ... USER unique ID;
    userUID: undefined,
    // ... complete-particiapnt-test-data;
    test_data: {
        // ... test number 1;
        test_1: {
            timer_data: {
                timer_total: 0,
                reading: 0,
                quiz: 0,
                questionnaire: 0
            },
            quiz: undefined,
            questionnaire: undefined
        },
        // ... test number 2;
        test_2: {
            timer_data: {
                timer_total: 0,
                reading: 0,
                quiz: 0,
                questionnaire: 0
            },
            conversation_history: {
                total_ex_messages: 0,
                history: []
            },
            quiz: undefined,
            questionnaire: undefined
        },
        // ... test number 3;
        test_3: {
            timer_data: {
                timer_total: 0,
                reading: 0,
                quiz: 0,
                questionnaire: 0
            },
            conversation_history: {
                total_ex_messages: 0,
                history: []
            },
            quiz: undefined,
            questionnaire: undefined
        }
    }
}

/**
 * Description:
 * ~~~~~~~~~~~~~~
 * ... initialize the .localStorage();
 * ... @param {*} key
 * ... @returns
*/
function createLocalStore(key: any): any {
	
	const { subscribe, set, update } = writable(user_settings);

	return {
		subscribe,
		set,
		update,

		/**
		 * Description:
		 * ~~~~~~~~~~~~~~~~~
		 * ... [START]
		 * ... Method for rendering the .localStorage() form
		 * ... the start of the page,
		*/
		useLocalStorage: () => {
			// ... reset the writable to the localStorage if localStorage already exists,
			const existing: string = localStorage.getItem(key);
			// ... validation of the data existing;
			const exisitng_data: User_Setting = existing
				? // ... if data exists, then use the existing data;
				  JSON.parse(existing)
				: // ... otherwise, instantiate default config;
                    user_settings
				;
			// ... DEBUGGING;
			if (dev) console.debug('-- exisitng_data --', exisitng_data);
			// ... SET ITEM DATA TO LOCALSTORAGE();
			localStorage.setItem(key, JSON.stringify(exisitng_data));
			// ... SET DATA TO SUBSCRIBED METHOD;
			set(exisitng_data);
		},

        /**
		 * Description:
		 * ~~~~~~~~~~~~~~~~~
		 * ... [WORKING]
		 * ... method to add the user UID value
		 * ... to the localStoage & application store
		 *
		 * ... @param {*} userUID
		*/
        setUserUID: (userUID: string) => {
            // ... GET DATA FROM LOCALSTORAGE();
			const existing: string = localStorage.getItem(key);
            // ... CONVERT TO JSON;
			const existing_data: User_Setting = JSON.parse(existing);
            // ... set the userUID;
            existing_data.userUID = userUID
            // ... UPDATE THE LOCALSTORAGE();
			localStorage.setItem(key, JSON.stringify(existing_data));
			// ... update the `set()` data;
			set(existing_data);
        },

        /**
		 * Description:
		 * ~~~~~~~~~~~~~~~~~
		 * ... [WORKING]
		 * ... method to add the user Q&A values
		 * ... to the localStoage & application store
		 *
		 * ... @param {*} test_uid
		 * ... @param {*} test_type
		 * ... @param {*} test_answers
		*/
        setUserQA: (test_uid: 'test_1' | 'test_2' | 'test_3',
                    test_type: 'quiz' | 'questionnaire', 
                    test_answers: any) => {
            // ... GET DATA FROM LOCALSTORAGE();
			const existing: string = localStorage.getItem(key);
            // ... CONVERT TO JSON;
			const existing_data: User_Setting = JSON.parse(existing);
            // ... set the userUID;
            existing_data['test_data'][test_uid][test_type] = test_answers
            // ... UPDATE THE LOCALSTORAGE();
			localStorage.setItem(key, JSON.stringify(existing_data));
			// ... update the `set()` data;
			set(existing_data);
        },

		/**
		 * Description:
		 * ~~~~~~~~~~~~~~~~~
		 * ... [WORKING]
		 * ... method to add the user seleted language
		 * ... to the localStoage & application store
		 *
		 * ... @param {*} inc_timer
		 * ... @param {*} test_uid
		 * ... @param {*} test_type
		*/
		addTimer: (inc_timer: number, 
                    test_uid: 'test_1' | 'test_2' | 'test_3',
                    test_type: 'reading' | 'quiz' | 'questionnaire' | 'timer_total'
                ) => {
			// ... DEBUGGING;
			// if (dev) console.info('ℹ incrementing timer by', inc_timer, ' for ', );
			// ... GET DATA FROM LOCALSTORAGE();
			const existing: string = localStorage.getItem(key);
			// ... CONVERT TO JSON;
			const existing_data: User_Setting = JSON.parse(existing);
			// ... UPDATE THE DATA FOR LANG;
            existing_data['test_data'][test_uid]['timer_data'][test_type] = parseInt(existing_data['test_data'][test_uid]['timer_data'][test_type].toString()) + inc_timer
			// ... UPDATE THE LOCALSTORAGE();
			localStorage.setItem(key, JSON.stringify(existing_data));
			// ... update the `set()` data;
			set(existing_data);
		},

        /**
		 * Description:
		 * ~~~~~~~~~~~~~~~~~
		 * ... [WORKING]
		 * ... method to add the user seleted language
		 * ... to the localStoage & application store
		 *
		 * ... @param {*} test_uid
		*/
		incTotalMessagesExchanged: (test_uid: 'test_2' | 'test_3') => {
            // ... DEBUGGING;
            // if (dev) console.info('ℹ incrementing timer by', inc_timer, ' for ', );
            // ... GET DATA FROM LOCALSTORAGE();
            const existing: string = localStorage.getItem(key);
            // ... CONVERT TO JSON;
            const existing_data: User_Setting = JSON.parse(existing);
            // ... UPDATE THE DATA FOR LANG;
            existing_data['test_data'][test_uid]['conversation_history']['total_ex_messages'] = parseInt(existing_data['test_data'][test_uid]['conversation_history']['total_ex_messages'].toString()) + 2
            // ... UPDATE THE LOCALSTORAGE();
            localStorage.setItem(key, JSON.stringify(existing_data));
            // ... update the `set()` data;
            set(existing_data);
        },

        /**
		 * Description:
		 * ~~~~~~~~~~~~~~~~~
		 * ... [WORKING]
		 * ... method to add the user seleted language
		 * ... to the localStoage & application store
		 *
		 * ... @param {*} test_uid
		*/
		addToConversationHistory: (test_uid: 'test_2' | 'test_3',
                                    udpated_chat_array: []) => {
            // ... DEBUGGING;
            // if (dev) console.info('ℹ incrementing timer by', inc_timer, ' for ', );
            // ... GET DATA FROM LOCALSTORAGE();
            const existing: string = localStorage.getItem(key);
            // ... CONVERT TO JSON;
            const existing_data: User_Setting = JSON.parse(existing);
            // ... UPDATE THE DATA FOR LANG;
            existing_data['test_data'][test_uid]['conversation_history']['history'] = udpated_chat_array
            // ... UPDATE THE LOCALSTORAGE();
            localStorage.setItem(key, JSON.stringify(existing_data));
            // ... update the `set()` data;
            set(existing_data);
        },

	};
}

// ... if .localStorage() has the key then it will be used,
// ... if not the default will be used. Format:
// ... export const var = createLocalStore(key, default)
export const starbased_user_settings = createLocalStore('starbased_user_settings');