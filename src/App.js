import './App.css';
import { db } from './firebase-config';
import { React, useEffect, useState } from 'react';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

function App() {
	const [newName, setNewName] = useState('');
	const [newAge, setNewAge] = useState(0);

	// populate with content
	const [users, setUsers] = useState([]);

	// collection(database, collection)
	const usersRef = collection(db, 'users');

	// Create
	const createUser = async () => {
		await addDoc(usersRef, { name: newName, age: Number(newAge) });
	};

	// Update
	const updateUser = async (id, age) => {
		const userDoc = doc(db, 'users', id);
		const newFields = { age: age + 1 };

		await updateDoc(userDoc, newFields);
	};

	// Delete
	const deleteUser = async (id) => {
		const userDoc = doc(db, 'users', id);
		await deleteDoc(userDoc);
	};

	// Read
	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersRef);
			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUsers();
	}, [usersRef]);

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
						<div style={{ border: '2px solid red', width: '400px', margin: '25px auto' }}>
							<h1>name:{user.name}</h1>
							<h1>name:{user.age}</h1>
							<button
								onClick={() => {
									updateUser(user.id, user.age);
								}}
							>
								increase age
							</button>
							<button
								onClick={() => {
									deleteUser(user.id);
								}}
							>
								Delete User
							</button>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default App;
