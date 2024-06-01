'use client';

import styles from './../page.module.css';
import { motion as m } from 'framer-motion';

// This is the Start page. Our goal is to make this a page that you get
// redirected to after clicking on the start button on the homepage *if*
// the user is logged in.

export default function Start() {
    return (
      <m.div className={styles.itinerary}
        initial={{opacity: 0, height: 0}}
        animate={{opacity: 1, height: "75vh"}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        exit={{ opacity: 1 }}
      >
          <h1>
          placeholder for start
          </h1>
      </m.div>
    );
}