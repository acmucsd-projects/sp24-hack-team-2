'use client';

import styles from './page.module.css';
import Image from 'next/image';
import LoginInfo from './COMPONENTS/login.js'
import Marquee from 'react-fast-marquee';
import { useState } from 'react';
import { motion as m } from "framer-motion";

export default function Home() {
    
    const [useLoginModal, setLoginModal] = useState(false);

    const toggleLoginModal = () => {
      setLoginModal(!useLoginModal)
    }
  
    return(
        <m.div className={styles.front}
          initial={{opacity: 0, height: "0%" }}
          animate={{opacity: 1, height: "75vh" }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          exit={{ opacity: 1 }}
        >
          <div className={styles.bannercontainer}>
            <div className={styles.banner}>
              <Marquee>
                <Image
                    src="/TEMPgeogurubanner.svg"
                    alt="Geoguru Full Banner [TEMPORARY]"
                    className={styles.logoimg}
                    width={1054}
                    height={525}
                    priority
                />
              </Marquee>
            </div>
            <div className={styles.landingtext}>
              <p>
                Plan, log, and share<br></br>
                your trip all in one place with
              </p>
              <Image
                  src="/geogurufulllogo.svg"
                  alt="Geoguru Full Logo"
                  className={styles.logoimg}
                  width={142}
                  height={51}
                  priority
              />
              <div className={styles.startbutton}>
                <button onClick={toggleLoginModal}>
                    <Image
                    src="/geogurustartbutton.svg"
                    alt="Geoguru Start Button"
                    width={75}
                    height={75}
                    />
                </button>
              </div>
            </div>
          </div>

          {/* the divs following can contain testimonials, extra info, etc. */}
          <div>
            <h1>
              
            </h1>
          </div>

          {useLoginModal && (
            <div className={styles.loginmodal}>
                <m.div onClick={toggleLoginModal} className={styles.loginshadow}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.75, ease: 'easeOut' }}
                />
                <m.div className={styles.logincontent}
                  initial={{ top: "150%" }}
                  animate={{ top: "43%" }}
                  transition={{ duration: 0.75, type: "spring" }}
                >
                    <Image
                      src="/geogurulogo.svg"
                      alt="Geoguru Logo"
                      className={styles.logoimg}
                      width={38}
                      height={54}
                      priority
                    />
                    <br/>
                    <h1>Welcome back!</h1>
                    <h2>Please enter your sign in details.</h2>
                    <br/>
                    <LoginInfo/>
                </m.div>
            </div>
          )}
        </m.div>
  );
}
