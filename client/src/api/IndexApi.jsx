import  axios from "axios"

export const baseURL = "http://127.0.0.1:5001/fullstack-food-app-e6f26/us-central1/app";

export const validateUserJWTToken = async(token) => {
    try {

        const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
            headers : {Authorization : "Bearer " + token}
        })

        return res.data.data
        
    } catch (error) {
        return null;
        
    }
}



export const addNewProducts = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/api/products/create`, {...data})
        return res.data.data
    } catch (error) {

        return null;
        
    }
}


export const getAllProducts = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/products/all`)
        return res.data.data
    } catch (error) {

        return null;
        
    }
}