import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginMain, Login } from "./containers/LoginExport";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { validateUserJWTToken } from "./api/IndexApi";
import { setUserDetails } from "./context/actions/UserAction.jsx";
import { motion } from "framer-motion";
import { FadeInOut } from "./animations/Animation";
import MainLoader from "./components/MainLoader.jsx";
import Alert from "./components/Alert.jsx";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoadiing, setisLoadiing] = useState(false);

  const dispatch = useDispatch();

  {
    /**===== DISPACTHES USER DATA TO STORE ==== */
  }

  useEffect(() => {
    setisLoadiing(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            dispatch(setUserDetails(data));
          });
        });
      }

      {
        /**===== TIME FOR LOADING ANIMATION ==== */
      }

      setInterval(() => {
        setisLoadiing(false);
      }, 3000);
    });
  }, []);

  return (
    <div className=" w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoadiing && (
        <motion.div
          {...FadeInOut}
          className=" w-full fixed z-50 inset-0 bg-cardOverlay backdrop-blur-md flex items-center justify-center "
        >
         <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/#" element={<LoginMain />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Alert type = {"warning"} message={"hi there"} />
    </div>
  );
};

export default App;
