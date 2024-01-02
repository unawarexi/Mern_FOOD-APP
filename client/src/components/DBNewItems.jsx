import React from "react";
import { useState } from "react";
import { statuses } from "../utils/Styles";
import { Spinner } from "./ExpComp";
import { FaCloudUploadAlt, MdDelete } from "../assets/icons/Icons";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDanger,
  AlertNull,
  AlertSuccess,
} from "../context/actions/AlertActions";
import { motion } from "framer-motion";
import { buttonClick } from "../animations/Animation";
import LinearWithValueLabel from "./ProgressBar";
import { addNewProducts } from "../api/IndexApi";




const DBNewItems = () => {
  const [itemName, setitemName] = useState("");
  const [Category, setCategory] = useState(null);
  const [Price, setPrice] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [Progress, setProgress] = useState(null);
  const [imgDownloadUrl, setimgDownloadUrl] = useState(null);

  {
    /**============= REDUX FUNCTIONS FOR ALERT MESSAGES ================ */
  }
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  {
    /**============= FUNCTION FOR UPLOAD IMAGE ================ */
  }
  const uploadImage = (e) => {
    setisLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => { // HANDLES THE PROGESS LEVEL COUNTDOWN
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(`Upload is  ${Progress} % done`);
      },
      
      (error) => { // HANDLES THE ERROR AND DISPLAYS ALERT DANGER 3S
        dispatch(AlertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(AlertNull());
        }, 3000);
      },

      () => { // GETS THE UPLOAD AND NOTIFY SUCESS
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimgDownloadUrl(downloadURL);
          setisLoading(false);
          setProgress(null);
          dispatch(AlertSuccess("Image is successfully Uploaded"));
          setTimeout(() => {
            dispatch(AlertNull());
          }, 3000);
        });
      }
    );
  };

  {
    /**============= FUNCTION FOR DELETE UPLOADED IMAGE ================ */
  }

  const deleteImageFromFirebase = () => {
    setisLoading(true);
    const deleteRef =  ref(storage, imgDownloadUrl)

    deleteObject(deleteRef).then(() => {
      setimgDownloadUrl(null)
      setisLoading(false)

      dispatch(AlertSuccess("Image is successfully Deleted"));
      setTimeout(() => {
        dispatch(AlertNull());
      }, 3000);
    })
  };

  const submitNewData = () => {
     const data = {
        product_name: itemName,
        product_category: Category,
        product_price: Price,
        imageURL: imgDownloadUrl,
     }

     addNewProducts(data).then(res => {
      console.log(res)
      dispatch(AlertSuccess("New Product Added"))
      setTimeout(() => {
        dispatch(AlertNull());
      }, 3000);

      setimgDownloadUrl(null)
      setitemName("")
      setPrice("")
      setCategory(null)

     })

     console.log(data)

  }

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div
        className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center
       justify-center gap-4"
      >
        <InputValueField
          type="text"
          placeholder={"Item name here"}
          stateFunc={setitemName}
          stateValue={itemName}
        />

        {/**============= STATE SELECTION FOR DIFFERENT CATEGORIES ================ */}

        <div className="w-full flex items-center justify-around gap-3 flex-wrap ">
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-4 py-3 rounded-md text-xl text-textColor
                font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md
                ${
                  data.category === Category
                    ? "bg-red-400 text-white"
                    : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>

        {/**============= INPUT FIELD FOR PRICE  ================ */}
        <InputValueField
          type="number"
          placeholder={"Item price here"}
          stateFunc={setPrice}
          stateValue={Price}
        />

        <div
          className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2
       border-gray-300 cursor-pointer border-dotted"
        >
          {/**============= LOADING SVG SPINNER INDICATING PROGRSS TIME ================ */}
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Spinner />
              <LinearWithValueLabel progress={Progress} />
            </div>
          ) : (
            <>
              {/**============= PROMPT TO UPLOAD IMAGE ================ */}
              {!imgDownloadUrl ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudUploadAlt />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an image
                        </p>
                      </div>
                    </div>

                    {/**============= INPUT TAG TO COLLECT THE IMAGE FILE ================ */}
                    <input
                      type="file"
                      name="Upload-Image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  {/**============= DISPLAYS THE UPLOADED IMAGE ================ */}
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      WhileHover={{ scale: 1.15 }}
                      className="w-auto h-full object-cover mx-auto my-auto"
                      src={imgDownloadUrl}
                    />

                    {/**============= DELETE BUTTON ================ */}

                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 transition-all
                     ease-in-out duration-500 hover:shadow-md cursor-pointer outline-none text-xl"
                      onClick={() => deleteImageFromFirebase(imgDownloadUrl)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        
        <motion.button
                      {...buttonClick}
                      type="button"
                      className=" w-9/12 py-2 rounded-md bg-red-400 transition-all text-primary
                     ease-in-out duration-500 hover:shadow-md hover:bg-red-500 cursor-pointer text-xl"
                      onClick={submitNewData}
                    >
                     Save
                    </motion.button>

      </div>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeholder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-cardOverlay shadow-md outline-none rounded-md border
       border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

export default DBNewItems;
