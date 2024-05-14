'use client';

import styles from './../page.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { motion as m } from 'framer-motion';

export default function LoginInfo() {
    
    const [useEmail, setEmail] = useState(" ");
    const changeEmail = event => {
        setEmail(event.target.value)
    }

    const [usePass, setPass] = useState(" ");
    const changePass = event => {
        setPass(event.target.value)
    }

    const clickLogin = () => {
        console.log("Email: ", useEmail, " Password: ", usePass);
    }

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