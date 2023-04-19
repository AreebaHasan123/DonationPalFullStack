import { useState } from 'react';

export default function useInfo() {
    // Function that retrieves an accessToken in LocalStorage
    function getEmail() {
        const emailString = localStorage.getItem('email');
        const userEmail = JSON.parse(emailString);
        if (userEmail) {
            console.log(`Found email`);
            return userEmail;
        } else {
            return null;
        }
    }

    const [email, setEmail] = useState(getEmail());

    // Function that sets accessToken in LocalStorage
    function saveEmail(userEmail) {
        localStorage.setItem('email', JSON.stringify(userEmail));
        setEmail(userEmail);
    }

    // Return an object that allows to invoke the custom hook
    return {
       email,
        setEmail: saveEmail
    }

}