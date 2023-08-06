import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "@/lib/utils/axiosInstanse";
import Image from "next/image";

const ProfileDetails = ({ name, direct, status, image }) => {
  const [avatar, setAvatar] = useState(null);

  // Function to handle the file selection
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // You can perform additional checks on the file if needed
      setAvatar(URL.createObjectURL(file));

      // Create a FormData object
      const formData = new FormData();
      formData.append("input", file);

      try {
        // Make the PATCH request using Axios
        await axiosInstance.patch("http://localhost:8000/auth/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // If the request is successful, you can perform any further actions here
      } catch (error) {
        // Handle errors here
        console.error("Error updating avatar:", error);
      }
    }

  };

  return (
  
      <div className="flex justify-start mb-4">
      <div className="w-24 h-24 rounded-lg overflow-hidden relative mr-4">
        <div className="group w-full h-full">
          {avatar ? (
            <Image src={avatar} alt="Profile Picture" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              <img src={image} alt="" />
            </div>
          )}
          <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity bg-white flex items-center justify-center rounded-lg cursor-pointer">
            <label htmlFor="avatarInput" className="cursor-pointer">
              <FontAwesomeIcon icon={faUpload} className="text-blue-500 text-2xl transition-transform transform group-hover:scale-110" />
            </label>
          </div>
        </div>
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>
      <div>
        <h2 className="text-2xl text-white font-bold mb-1">{name}</h2>
        <div className="text-start">
            
          <p className="text-gray-100">{direct} developer</p>
        </div>
      </div>
    </div>

  );
};

export default ProfileDetails;
