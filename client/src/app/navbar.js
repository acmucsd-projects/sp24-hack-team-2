import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className={styles.navbar}>
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
        </div>
    )
}
