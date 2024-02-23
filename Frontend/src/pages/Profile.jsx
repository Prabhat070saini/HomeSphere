import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  console.log(file);
  const [filepercentage, setFilepercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData.avatar, "upload");
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilepercentage(Math.round(progress));
        console.log(`Upload is ${progress} done`);
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={filepercentage === 100 ? formData.avatar : currentUser.avatar}
          alt="avatar image.."
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Image upload</span>
          ) : filepercentage > 0 && filepercentage < 100 ? (
            <span className="text-slate-700">{`Image Uploading${filepercentage}%`}</span>
          ) : filepercentage == 100 ? (
            <span className="text-green-700">Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="usename"
        />
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="text"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {" "}
          Update
        </button>
      </form>
      <div className="flex flex-row justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
