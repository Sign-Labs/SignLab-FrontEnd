"use client"
import { useState } from "react";
import "./../css/profile.css"; 

export default function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({
        username: "ThirdTZ",
        firstname: "ชยธร",
        lastname: "รุ่งเรือง",
        gender: "ชาย",
        dob: "01 / 07 / 2003",
        email: "chayathonzaza@gmail.com",
        password: "password"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleEdit = () => setEditMode(true);
    const handleSave = () => setEditMode(false);

    return (
        <div className="profileContainer">
            <div className="profileAvatar">
                <div className="profileAvatarCircle">
                    <svg width="90" height="90" fill="#fff">
                        <circle cx="45" cy="33" r="22"/>
                        <ellipse cx="45" cy="70" rx="36" ry="22"/>
                    </svg>
                </div>
            </div>
            <form className="profileForm">
                <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="profileInput profileInputLarge editMode ? editable : ''}` "
                />
                <div className="profileInputGroup">
                    <input
                        type="text"
                        name="firstname"
                        value={profile.firstname}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="profileInput editMode ? editable : ''"
                    />
                    <input
                        type="text"
                        name="lastname"
                        value={profile.lastname}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="profileInput} {editMode ? editable : ''}"
                    />
                </div>
                <div className="profileInputGroup">
                    <input
                        type="text"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="profileInput editMode ? editable : ''}"
                    />
                    <input
                        type="text"
                        name="dob"
                        value={profile.dob}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="profileInput editMode ? editable : ''}"
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="profileInput editMode ? editable : ''}"
                />
                <input
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                    disabled={!editMode}
                    className= "profileInput editMode ? editable : ''}" />
                <button
                    type="button"
                    onClick={editMode ? handleSave : handleEdit}
                    className="profileButton"
                >
                    {editMode ? "บันทึก" : "แก้ไข"}
                </button>
            </form>
        </div>
    );
}