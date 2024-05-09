<<<<<<< Updated upstream
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
=======
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
>>>>>>> Stashed changes

export default function Navbar() {
    return (
        <div className={styles.navbar}>
<<<<<<< Updated upstream
            <a className={styles.logo}>
            <Image
                src="/geogurulogo.svg"
                alt="Geoguru Logo"
                className={styles.logoimg}
                width={25}
                height={36}
                priority
                />
            </a>
            <a className={styles.navbuttons}>
            <Link href={"/about"}>ABOUT</Link>
            </a>
            <a className={styles.navbuttons}>
            <Link href={"/resources"}>RESOURCES</Link>
            </a>
            <a className={styles.navbuttons}>
            <Link href={"/itinerary"}>ITINERARY</Link>
            </a>
=======
            <Link className={styles.logo} href={"/"}>
                <Image
                    src="/geogurulogo.svg"
                    alt="Geoguru Logo"
                    className={styles.logoimg}
                    width={25}
                    height={36}
                    priority
                />
            </Link>
            <Link className={styles.navbuttons} href={"/about"}>ABOUT</Link>
            <Link className={styles.navbuttons} href={"/resources"}>RESOURCES</Link>
            <Link className={styles.navbuttons} href={"/itinerary"}>ITINERARY</Link>
>>>>>>> Stashed changes
        </div>
    )
}
