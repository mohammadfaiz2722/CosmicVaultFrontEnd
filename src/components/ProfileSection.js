import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const email = localStorage.getItem('email');
const navigate=useNavigate();
  useEffect(()=>{
if(!localStorage.getItem('token'))
{
  navigate("/")
}
  },[navigate])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });

        const result = await response.json();
        setUser(result.user);
        setNewName(result.user.name); // Initialize newName with user's current name
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (email) {
      fetchUser();
    }
  }, [email]);

  const formatDate = (isoDate) => {
    if (!isoDate) return ''; // Return empty string if isoDate is undefined
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const newDate = formatDate(user.date);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/updateuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.email, name: newName })
      });

      const result = await response.json();
      if (response.ok) {
        setUser(prevUser => ({ ...prevUser, name: newName })); // Update user state with new name
        setIsEditing(false);
      } else {
        console.error('Error updating user:', result.error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[rgba(7, 7, 20, 0.8)] flex items-center justify-center p-4">
      <div className="w-full max-w-lg relative">
        {/* Cosmic background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2722&q=80')] bg-cover bg-center rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                  {user.name ? user.name.charAt(0) : ''}
                </span>
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">
              {isEditing ? (
                <input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                  className="bg-transparent border-b-2 border-white text-white text-center focus:outline-none"
                />
              ) : (
                user.name
              )}
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-md">
              <p className="text-sm text-purple-300 mb-1">Cosmic Email</p>
              <p className="text-lg text-white">{user.email}</p>
            </div>

            <div className="flex justify-between">
              <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-md w-[48%]">
                <p className="text-sm text-purple-300 mb-1">Cosmic Captures</p>
                <p className="text-2xl font-bold text-white">{user.photoCount}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-md w-[48%]">
                <p className="text-sm text-purple-300 mb-1">Joined</p>
                <p className="text-lg text-white">
                  {newDate}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={isEditing ? handleSave : handleEditClick}
            className="mt-8 w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            {isEditing ? 'Save Changes' : 'Edit Cosmic Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
