import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
const CreateListing = () => {
  const [imageUploadError, setImageUploadError] = useState(false);
  const [files, setFile] = useState([]);
  const [imageloading, setImageLoading] = useState(false);
  console.log(files);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  console.log("formData=>", formData);
  const handleImageSubmit = (e) => {
    console.log(imageloading);
    if (files.length === 0) {
      setImageUploadError(`You dont have any images selected`);
    } else if (
      files.length > 0 &&
      files.length + formData.imageUrls.length < 7
    ) {
      setImageLoading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setImageLoading(false);
        })
        .catch((error) => {
          setImageUploadError(`Image upload failed (2 mb max per image)`);
          setImageLoading(false);
        });
    } else {
      setImageUploadError(`( you can only upload 6 images )`);
      setImageLoading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   setFilepercentage(Math.round(progress));
          console.log(`Upload is ${progress} done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            resolve(downloadURL)
          );
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    console.log(`main h `);
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        {/* ---------------------------------left side  div ---------------------------------------------------------------------- */}
        <div className="flex flex-col gap-4  flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Address"
            id="description"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="number"
              id="bathrooms"
              min="1"
              max={10}
              required
              className="p-3 border border-gray-300"
            />
            <span>Baths</span>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max={10}
                required
                className="p-3 border border-gray-300"
              />
              <div className="flex flex-col">
                <p>Regular Price</p>
                <span> {`$/ months`}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max={10}
                required
                className="p-3 border border-gray-300"
              />
              <div className="flex flex-col">
                {" "}
                <p>Discoun tPrice</p>
                <span> {`$/ months`}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max={10}
                required
                className="p-3 border border-gray-300"
              />
              <span>Beds</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will b e the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              onChange={(e) => setFile(e.target.files)}
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              // disabled={imageloading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {imageloading ? "Uploading....." : "Upload"}
            </button>
          </div>
          <p className="text-sm text-red-700">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt="Listing image"
                    className="w-28 h-28 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    className="text-red-500 p-3 rounded-lg uppercase hover:opacity-75"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          <button
            className="p-3 disabled:opacity-80 bg-slate-700 text-white rounded-lg uppercase
        hover:opacity-95"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
