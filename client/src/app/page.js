<<<<<<< Updated upstream
import styles from './page.module.css'
import Navbar from './navbar.js'
import Home from './home.js'

export default function Page() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Home />
    </main>
  )
}

/* OG NEXT.JS SITE DIV SETUP
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
=======
'use client';

import styles from './page.module.css';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { motion as m } from "framer-motion";

// NOTES ABOUT THE HOME PAGE:

// @ <Marquee> :
// marquee will need to be aligned behind following div.
export default function Home() {
    return(
        <m.div className={styles.front}
          initial={{opacity: 0, height: 0 }}
          animate={{opacity: 1, height: "75vh" }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          exit={{ opacity: 1 }}
        >
          <div>
            <Marquee>
              future marquee image here... for background...
            </Marquee>
          </div>
          <div>
            <p>
                Plan, log, and share<br></br>
                your trip all in one place with
            </p>
>>>>>>> Stashed changes
            <Image
                src="/geogurufulllogo.svg"
                alt="Geoguru Full Logo"
                className={styles.logoimg}
                width={142}
                height={51}
                priority
            />
<<<<<<< Updated upstream
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
*/
=======
          </div>
        </m.div>
  );
}
>>>>>>> Stashed changes
