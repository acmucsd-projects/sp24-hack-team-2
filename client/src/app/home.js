import styles from './page.module.css'
import Image from 'next/image'

export default function Home() {
    return(
        <div className={styles.front}>
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
      </div> 
    )
}