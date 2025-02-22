import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
	console.log(Math.random());

	return (
		<>
			<section className={styles.homeContainer}>
				<div className={styles.homeLeftColumn}>
					<article className={styles.callToAction}>
						<h2 className={styles.callToActionText}>Help protect Ireland’s wildlife - every small action can make a big impact.</h2>
						<button className={styles.callToActionBtn}> <Link to={"/conservation"}>TAKE ACTION</Link></button>
					</article>

					<article className={styles.animalGameContainer}>
						<div className={styles.sectionHeadingContainer}> 
							<div className={styles.sectionHeadingLine}></div>
							<h2 className={styles.sectionHeading}>Can you name this critter?</h2>
							<div className={styles.sectionHeadingLine}></div>
						</div>
						<div className={styles.animalGameMainContainer}>
							<div className={styles.gameWordContainer}>
								<pre className={styles.gameWordText}>________ ________</pre>
							</div>

							<div className={styles.gameBtnContainer}>
								<button className={styles.hintBtn}>? Hint 0/5</button>
								<button className={styles.giveupBtn}>Give Up</button>
							</div>
							<img className={styles.animalGameImg} src="/placeholder.png" alt="American Woodcock facing towards the camera"/>
						</div>
					</article>
				</div>

				<div className={styles.homeRightColumn}>
					<article className={styles.creatureFeatureContainer}>
						<div className={styles.sectionHeadingContainer}> 
							<div className={styles.sectionHeadingLine}></div>
							<h2 className={styles.sectionHeading}>Creature Feature</h2>
							<div className={styles.sectionHeadingLine}></div>
						</div>
						<img className={styles.creatureFeatureImg} src="/placeholder.png" alt="American Woodcock facing towards the camera"/>
					</article>

					<article className={styles.wildFactContainer}>
						<div className={styles.sectionHeadingContainer}> 
							<div className={styles.sectionHeadingLine}></div>
								<h2 className={styles.sectionHeading}>Wild Fact</h2>
							<div className={styles.sectionHeadingLine}></div>
						</div>
						<p className={styles.wildFactText}>Ireland is home to over 11,000 species of insects!</p>
					</article>
				</div>

			</section>
		</>
	);
};

export default Home;
