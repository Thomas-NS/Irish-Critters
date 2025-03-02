import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Home = () => {
	type GameWordInput = {
		letter: string;
		input: string;
		index: number;
	}
	const [gameWordInputs, setGameWordInputs] = useState<GameWordInput[]>([]);
	const [remainingLetters, setRemainingLetters] = useState<string[]>([]);
	const [hintCount, setHintCount] = useState<number>(0);
	const [hasGivenUp, setHasGivenUp] = useState<boolean>(false);
	const [hasWon, setHasWon] = useState<boolean>(false);
	const inputRef = useRef([]);

	async function getRandomAnimal(): Promise<void> {
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

	function addGameInputs(animalName: string): void {
		console.log(animalName);
		const animalNameChars = [...animalName];
		setRemainingLetters([...animalName]);
		const charArray = animalNameChars.map((char, index) => ({ letter: char, input: "", index: index}));
		setGameWordInputs(charArray);
	}

	function giveHint(): void {
		if(hintCount < 5) {
			setHintCount(hintCount + 1);
			let randIndex = -1;

			while(randIndex === -1 || remainingLetters[randIndex] === " " || remainingLetters[randIndex] === "-") {
				randIndex = Math.floor(Math.random() * remainingLetters.length);
			}
			
			setGameWordInputs((prev) => 
				prev.map((char) => (char.index === randIndex && char.letter !== " ") ? {
					...char, input: char.letter } : char 
				)
			);
			setRemainingLetters((prev) => prev.map((char, index) => index === randIndex ? " " : char));
		}
	}

	function handleInput(newInput: string, inputObject: gameWordInputs): void {
		setGameWordInputs((prev) => prev.map((prevInput) => 
		prevInput.index === inputObject.index ? {
			...prevInput, input: newInput } : prevInput
		)); 

		if(newInput === inputObject.letter) {
			checkIfWon(inputObject.index);
		}
	}

	function checkIfWon(index: number): void {
		setRemainingLetters((prev) => {
			const updatedLetters = prev.map((char, i) => i === index ? " " : char);
			let tempHasWon = updatedLetters.every((char) => (char === " " || char === "-"));
			setHasWon(tempHasWon);
			return updatedLetters;
		});
	}

	function retryGame(): void {
		setRemainingLetters([]);
		setGameWordInputs([]);
		setHasGivenUp(false);
		setHintCount(0);
		setHasWon(false);
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
								{gameWordInputs.map((input) => ( (input.letter !== " " && input.letter !== "-") ?
									<input type="text" size="1" className={!hasWon ? styles.gameInputs : styles.gameInputCorrect} 
										placeholder="__" maxLength="1" key={input.index} value={!hasGivenUp ? (input.input ?? "") : input.letter}
											disabled={(hasGivenUp || hasWon)}
												ref={el => inputRef.current[input.index] = el}
													onChange={(e) => { handleInput(e.target.value, input); }}/>
									:
									<input type="text" size="1" className={!hasWon ? styles.emptySpace : styles.gameInputCorrect} 
										key={input.index} value={input.letter} disabled/>
								))}
							</div>

							<div className={styles.gameBtnContainer}>
								{ (!hasGivenUp && !hasWon) ? (
									<>
									<button className={styles.hintBtn} onClick={() => giveHint()} >? Hint {hintCount}/5</button>
									<button className={styles.giveupBtn} onClick={() => setHasGivenUp(true)}>Give Up</button>
									</>
								) : <button className={styles.tryAgainBtn} onClick={() => retryGame()}>Play Again</button>
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
