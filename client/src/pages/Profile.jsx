import React, { useState, useEffect } from "react";
import "./profile.css";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const Profile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    username: user.username,
    bio: user.bio,
    password: "",
  });
  console.log(user, "user is here");
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  // Get the username from localStorage or state (assuming user is logged in)
  const username = localStorage.getItem("username");

  // Fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/profile/${username}`);
        const data = await response.json();
        if (data) {
          setUserData({
            name: data.name,
            email: data.email,
            username: data.username,
            profilePic: data.profilePic,
            bio: data.bio,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  //   const handleProfilePicChange = (e) => {
  //     const file = e.target.files[0];
  //     setProfilePic(file);
  //   };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("username", userData.username);
    formData.append("bio", userData.bio);
    if (newPassword) {
      formData.append("password", newPassword);
    }
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const response = await fetch(`/api/update/${user._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is stored in localStorage
        },
        body: formData,
      });

      const result = await response.json();
      if (result.user) {
        setUserData(result.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Welcome, {userData.name || "User"}!</h1>
        <p>Your profile details are below:</p>
      </header>
      <div className="profile-details">
        <div className="profile-section">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.name}</span>
          )}
        </div>

        <div className="profile-section">
          <label>Username:</label>
          <span>{userData.username}</span>
        </div>

        <div className="profile-section">
          <label>Email:</label>
          <span>{userData.email}</span>
        </div>

        <div className="profile-section">
          <label>Bio:</label>
          {isEditing ? (
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.bio || "No bio provided"}</span>
          )}
        </div>

        <div className="profile-section">
          {isEditing ? (
            <div>
              <label>New Password:</label>
              <input
                type="password"
                name="password"
                value={newPassword}
                onChange={handlePasswordChange}
              />
            </div>
          ) : null}
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <button onClick={handleSave}>Save Changes</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
