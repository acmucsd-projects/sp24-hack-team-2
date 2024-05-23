'use client';

import styles from './../page.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { motion as m } from 'framer-motion';

export default function LoginInfo() {
    
    // here is the login modal, which serves as a popup after clicking on the
    // homepage's start button if you're not already logged in.

    // here, we use useState from React to get (useEmail) and
    // to set (setEmail) the user's email and password.
    
    // arrow functions are then used to set the email value to something
    // new whenever the function is called with a given event.

    const [useEmail, setEmail] = useState(" ");
    const changeEmail = event => {
        setEmail(event.target.value)
    }

    // same is done here with Paswords
    const [usePass, setPass] = useState(" ");
    const changePass = event => {
        setPass(event.target.value)
    }

    // this function when called will eventually request the given
    // email and password data from a matching userID in MongoDB.
    const clickLogin = () => {
        console.log("Email: ", useEmail, " Password: ", usePass);
    }

    // here is the returned HTML, where we have an <input> box that holds the
    // get value for email and password, and that can also call its respective
    // arrow function, changeEmail or changePass, to set the value to something
    // different whenever the user types something.

    // then there is a <button> component, that when onClick, will call the
    // clickLogin arrow function to send a request to the database.
    return (
      <div className={styles.logininfo}>
        <h3>
          Email Address
        </h3>
        <input onChange={changeEmail}
        value = {useEmail}>
        </input>
        <h2></h2>
        <h3>
          Password
        </h3>
        <input onChange={changePass}
        value = {usePass}>
        </input>
        <h3></h3>
        <br/>
        <button onClick={clickLogin}>Sign in</button>
      </div>
    );
}