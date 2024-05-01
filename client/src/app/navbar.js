import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className={styles.navbar}>
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
        </div>
    )
}
