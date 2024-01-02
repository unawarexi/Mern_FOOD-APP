import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api/IndexApi'
import { setAllProucts } from '../context/actions/ProductAction'

const DbHome = () => {
 const products =  useSelector(state => state.products)

 const dispatch = useDispatch();

 useEffect(() => {
   if(!products){
    getAllProducts().then(data => {
      dispatch(setAllProucts(data));
      
    })
   }
 }, [])
 


  return (
    <div>

    </div>
  )
}

export default DbHome