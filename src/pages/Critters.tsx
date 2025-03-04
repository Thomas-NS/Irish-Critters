import { useState, useEffect } from 'react';
import styles from './Critters.module.css'

const Critters = () => {
	const [animals, setAnimals] = useState<{ 
		id: number; 
		name: string; 
		type: string; 
		scientific_name: string; 
		is_native: boolean;
	}[]>([]);

	async function getAllAnimals() {
		try {
			const response = await fetch("http://localhost:3000/critters");
			if(response.ok) {
				const animalData = await response.json();
				setAnimals(animalData);
			}
		} catch(error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getAllAnimals();
	}, []);

	return (
		<>
			<section className={styles.allAnimalsContainer}>
				{animals.map((animal) => (
					<article className={styles.animalContainer} key={animal.id}>
						<div className={styles.animalNameContainer}>
							<h2> {animal.name} </h2>
							<h3><i> {animal.scientific_name} </i></h3>
						</div>
						<img className={styles.animalImage} src="/placeholder.png" alt="American Woodcock facing towards the camera"/>
					</article>
				))}
			</section>
		</>
	);
};

export default Critters;
 