import styles from './Navbar.module.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<>
		<header className={styles.header}>
				<img className={styles.logo} src="/lapwing.png" alt="Silhouette of a northern lapwing"/>
				<h1 className={styles.siteTitle}>IRISH CRITTERS</h1>
		</header>

		<nav className={styles.navbar}>
			<ul className={styles.navList}>
				<li> <Link to="/critters" className={location.pathname === "/critters" ? 
					styles.active : styles.inactive }>CRITTERS</Link> </li>

				<li> <Link to="/" className={location.pathname === "/" ? 
					styles.active : styles.inactive }>HOME</Link> </li>

				<li> <Link to="/conservation" className={location.pathname === "/conservation" ? 
					styles.active : styles.inactive }>CONSERVATION</Link> </li>

				<li> <Link to="/quiz" className={location.pathname === "/quiz" ? 
					styles.active : styles.inactive }>QUIZ</Link> </li>
			</ul>
			<input type="text" className={styles.searchbar} placeholder="Search"/>
		</nav>
		</>
	);
};

export default Navbar;