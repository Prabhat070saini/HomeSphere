import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { startloading, endloading, setError } from "../redux/user/userSlice";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const CreateListing = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [errors, setErrors] = useState("");
  const [imageUploadError, setImageUploadError] = useState(false);
  const [files, setFile] = useState([]);
  const [imageloading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  // console.log(files);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  //   console.log("under update lisitnformData=>", formData);
  const params = useParams();
  const listingid = params.listingid;

  useEffect(() => {
    const fetchListing = async () => {
      const res = await axios.get(`/v1/listing/getlist/${listingid}`);
      setFormData(res.data.listing);
    };
    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
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
    // console.log(`main h `);
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    try {
      if (formData.imageUrls.length === 0) {
        setImageUploadError(`Minimum 1 image needed to create listing`);
        return;
      }
      if (formData.regularPrice < formData.discountPrice) {
        console.log(`Submit`);
        setErrors(`RegularPrice not less than DiscountPrice`);
        return;
      }
      dispatch(startloading());
      console.log(`under update lis${listingid}`);
      const res = await axios.post(`/v1/listing/update/${listingid}`, {
        ...formData,
      });
      console.log(res, "on submit lisitng");
      dispatch(endloading());
      //   navigate(`/listing/${currentUser._id}`);
    } catch (error) {
      dispatch(setError(error));
      dispatch(endloading());
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
        {/* ---------------------------------left side  div ---------------------------------------------------------------------- */}
        <div className="flex flex-col gap-4  flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="5"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="border p-3 rounded-lg"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="border p-3 rounded-lg"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
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
              onChange={handleChange}
              className="p-3 border border-gray-300"
              value={formData.bathrooms}
            />
            <span>Baths</span>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max={500000}
                required
                onChange={handleChange}
                className="p-3 border border-gray-300"
                value={formData.regularPrice}
              />
              <div className="flex flex-col">
                <p>Regular Price</p>
                <span> {`$/ months`}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="beds"
                min="1"
                max={10}
                required
                onChange={handleChange}
                className="p-3 border border-gray-300"
                value={formData.beds}
              />
              <span>Beds</span>
            </div>
            {formData.offer ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min={0}
                  max={5000}
                  required
                  onChange={handleChange}
                  className="p-3 border border-gray-300"
                  value={formData.discountPrice}
                />
                <div className="flex flex-col">
                  {" "}
                  <p>Discount Price</p>
                  <span> {`$/ months`}</span>
                </div>
              </div>
            ) : (
              <></>
            )}
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
              disabled={imageloading}
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
            disabled={imageloading || loading}
          >
            {loading ? "Creating..." : "Update Listing"}
          </button>
          {error ? (
            <p className="text-red-500 p-3 rounded-lg uppercase hover:opacity-75">
              {errors}
            </p>
          ) : (
            <></>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
