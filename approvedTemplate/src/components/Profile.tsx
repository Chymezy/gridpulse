import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaCog, FaSave } from 'react-icons/fa';

interface UserProfile {
  displayName: string;
  email: string;
  phoneNumber: string;
  company: string;
  role: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    displayName: '',
    email: '',
    phoneNumber: '',
    company: '',
    role: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setProfile({
            displayName: auth.currentUser.displayName || '',
            email: auth.currentUser.email || '',
            phoneNumber: userDoc.data().phoneNumber || '',
            company: userDoc.data().company || '',
            role: userDoc.data().role || '',
          });
        }
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (auth.currentUser) {
      setIsSaving(true);
      try {
        await updateProfile(auth.currentUser, { displayName: profile.displayName });
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          phoneNumber: profile.phoneNumber,
          company: profile.company,
          role: profile.role,
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <img
              src={auth.currentUser?.photoURL || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">{profile.displayName}</h2>
              <p className="text-gray-600 text-sm sm:text-base">{profile.role} at {profile.company}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            {isEditing ? <FaSave className="inline mr-2" /> : <FaCog className="inline mr-2" />}
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaUser className="inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="displayName"
              value={profile.displayName}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaEnvelope className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaPhone className="inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaBuilding className="inline mr-2" />
              Company
            </label>
            <input
              type="text"
              name="company"
              value={profile.company}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaUser className="inline mr-2" />
              Role
            </label>
            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>
        {isEditing && (
          <div className="mt-6">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-300 text-sm sm:text-base"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
