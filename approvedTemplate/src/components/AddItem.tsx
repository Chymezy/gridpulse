import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { FaPlus, FaExclamationCircle } from 'react-icons/fa';

const AddItem: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setError('You must be logged in to add an item.');
      return;
    }
    try {
      await addDoc(collection(db, 'items'), {
        title,
        description,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      setTitle('');
      setDescription('');
      setError(null);
    } catch (err) {
      setError('Failed to add item. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="add-item bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center">
          <FaPlus className="mr-2" /> Add Item
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-500 flex items-center">
          <FaExclamationCircle className="mr-2" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default AddItem;