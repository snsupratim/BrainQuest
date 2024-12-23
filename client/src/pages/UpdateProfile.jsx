import React, { useRef, useState } from "react";
import "./updateprofile.css";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";

export default function UpdateProfile() {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: "",
  });
  const fileRef = useRef(null);
  const { handleImageChange, imgUrl } = usePreviewImg();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user._id) {
      console.error("User ID is missing");
      return;
    }
    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilepic: imgUrl }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await res.json();
      console.log("Profile updated successfully:", data);
      // Optionally update user state here
      setUser(data);
      localStorage.setItem("user-quest", JSON.stringify(data));
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="update-profile-container">
        <div className="update-profile-stack">
          <div className="form-control">
            <div className="avatar-section">
              <div className="avatar-placeholder">
                <img
                  className="avatar"
                  src={imgUrl || user.profilepic}
                  alt="Avatar"
                />
              </div>
              <button
                className="change-icon-button"
                onClick={(e) => {
                  e.preventDefault();
                  fileRef.current.click();
                }}
              >
                Change Icon
              </button>
              <input
                type="file"
                hidden
                ref={fileRef}
                onChange={handleImageChange}
              />
            </div>
          </div>
          {/* Input Fields */}
          <div className="form-control" required>
            <label className="form-label">Full name</label>
            <input
              className="form-input"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              placeholder="FullName"
              type="text"
            />
          </div>
          <div className="form-control" required>
            <label className="form-label">User name</label>
            <input
              className="form-input"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              placeholder="UserName"
              type="text"
            />
          </div>
          <div className="form-control" required>
            <label className="form-label">Email address</label>
            <input
              className="form-input"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              placeholder="your-email@example.com"
              type="email"
            />
          </div>
          <div className="form-control" required>
            <label className="form-label">Bio</label>
            <input
              className="form-input"
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              placeholder="your bio"
              type="text"
            />
          </div>
          <div className="form-control" required>
            <label className="form-label">Password</label>
            <input
              className="form-input"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              placeholder="password"
              type="password"
            />
          </div>
          <div className="button-group">
            <button
              className="cancel-button"
              type="button"
              onClick={() => console.log("Cancelled")}
            >
              Cancel
            </button>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
