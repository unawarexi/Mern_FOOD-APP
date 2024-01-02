export const setAllProucts = (products) => {
    return {
      type: "SET_ALL_PRODUCT",
      products : products,
    };
  };
  
export const getAllProucts = (products) => {
    return {
      type: "GET_ALL_PRODUCT",
      products : products,
    };
  };
  