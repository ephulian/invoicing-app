import './App.css';
import { db } from './firebase-config';
import { React, useEffect, useState } from 'react';
import { collection, doc, getDocs, addDoc } from 'firebase/firestore';

function App() {
	const [newName, setNewName] = useState('');
	const [newAge, setNewAge] = useState(0);

	// populate with content
	const [users, setUsers] = useState([]);

	// collection(database, collection)
	const usersRef = collection(db, 'users');

	// Create
	const createUser = async () => {
		await addDoc(usersRef, { name: newName, age: newAge });
	};

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersRef);
			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUsers();
	}, []);

	return (
		<>
			<div className='App'>
				<input
					type='text'
					placeholder='name'
					onChange={(e) => {
						setNewName(e.target.value);
					}}
				/>
				<input
					type='number'
					placeholder='age'
					onChange={(e) => {
						setNewAge(e.target.value);
					}}
				/>
				<button onClick={createUser}>CREATE USER</button>
				{users.map((user) => {
					return (
						<div>
							<h1>name:{user.name}</h1>
							<h1>name:{user.age}</h1>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default App;
