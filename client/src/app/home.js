'use client';

import styles from './page.module.css';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { motion as m } from "framer-motion";

export default function Home() {
    return(
        <m.div className={styles.front}
          initial={{opacity: 0, height: 0 }}
          animate={{opacity: 1, height: "75vh" }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          exit={{ opacity: 1 }}
        >
            <Marquee>
              test marquee
            </Marquee>
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
        </m.div>
  );
}
