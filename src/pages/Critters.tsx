import { useState, useEffect } from 'react';

const Critters = () => {
	const [animals, setAnimals] = useState<{ 
		id: number; 
		name: string; 
		type: string; 
		scientific_name: string; 
		is_native: boolean;
	}[]>([]);

	async function getAllAnimals() {
		const response = await fetch("http://localhost:3003/critters");
		const animalData = await response.json;
		setAnimals(animalData);
	}

	useEffect(() => {
		getAllAnimals();
	}, []);

	return (
		<pre></pre>
	);
};

export default Critters;
 
