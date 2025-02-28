import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
	const [gameWordInputs, setGameWordInputs] = useState<{ 
		letter: string;
		input: string;
		index: number;
	}[]>([]);
	const [remainingLetters, setRemainingLetters] = useState<string[]>([]);
	const [hintCount, setHintCount] = useState<number>(0);
	const [hasGivenUp, setHasGivenUp] = useState<boolean>(false);

	async function getRandomAnimal() {
		try {
			const response = await fetch("http://localhost:3000/home");
			if(response.ok) {
				const animalData = await response.json();
				addGameInputs(animalData.name.toLowerCase());
			}
		} catch(error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getRandomAnimal();
	}, []);

	function addGameInputs(animalName) {
		console.log(animalName);

		const animalNameChars = [...animalName];
		setRemainingLetters([...animalName]);
		const charArray = animalNameChars.map((char, index) => ({ letter: char, input: "", index: index}));
		setGameWordInputs(charArray);
	}

	function giveHint() {
		if(hintCount < 5) {
			setHintCount(hintCount + 1);
			let randIndex = -1;

			while(randIndex === -1 || remainingLetters[randIndex] === " ") {
				randIndex = Math.floor(Math.random() * remainingLetters.length);
			}
			
			setGameWordInputs((prev) => 
				prev.map((char) => ((char.index === randIndex) && (char.letter !== " ")) ? {
					...char, input: char.letter } : char 
				)
			);
			setRemainingLetters((prev) => prev.map((char, index) => index === randIndex ? " " : char));
		}
	}

	function retryGame() {
		setHasGivenUp(false);
		setHintCount(0);
		getRandomAnimal();
	}

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
								{gameWordInputs.map((input) => ( input.letter !== " " ?
									<input type="text" size="1" className={styles.gameInputs} 
										placeholder="__" maxLength="1" key={input.index} value={!hasGivenUp ? (input.input ?? "") : input.letter}
											onChange={(e) => { setGameWordInputs((prev) => prev.map((i) => 
												i.index === input.index ? {
													...i, input: e.target.value } : i
												)
											)}}/>
									:
									<input type="text" size="1" className={styles.emptySpace} 
										key={input.index} disabled/>
								))}
							</div>

							<div className={styles.gameBtnContainer}>
								{ !hasGivenUp ? (
									<>
									<button className={styles.hintBtn} onClick={() => giveHint()} >? Hint {hintCount}/5</button>
									<button className={styles.giveupBtn} onClick={() => setHasGivenUp(true)}>Give Up</button>
									</>
								) : <button className={styles.tryAgainBtn} onClick={() => retryGame()}>Try Again</button>
								}
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
