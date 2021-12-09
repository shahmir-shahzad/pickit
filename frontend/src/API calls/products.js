import axios from "axios";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };

//fetches users product
export const fetchMyProducts = async (userId) => {
  const response = await axios.get(
    `http://192.168.100.4:5000/users/${userId}/get_products`,
    header
  );
  return response;
};

//Creates a product
export const createProduct = async (data) => {
  const response = await axios.post(
    "http://192.168.100.4:5000/products/create_new",
    data,
    header
  );
  return response;
};

//fetch a product's detail
export const fetchProductDetails = async (_id) => {
  const response = await axios.get(
    `http://192.168.100.4:5000/products/${_id}`,
    header
  );
  return response;
};

//Updates a product
export const updateProduct = async (data) => {
  const response = await axios.post(
    "http://192.168.100.4:5000/products/update",
    data,
    header
  );
  return response;
};

//delete a product
export const deleteProduct = async (_id) => {
  const response = await axios.delete(
    `http://192.168.100.4:5000/products/${_id}`,
    header
  );
  return response;
};

//unapproves pending products
export const unapprove = async (productId) => {
  const response = await axios.delete(
    `http://192.168.100.4:5000/products/${productId}`,
    header
  );
  return response;
};

//fetches pending products for the moderator
export const fetchPendingProducts = async () => {
  const response = await axios.get(
    `http://192.168.100.4:5000/products/unapproved`,
    header
  );
  const exchangeableProducts = response.data.data.filter(
    (item) => item.transactionType === "exchange"
  );
  return exchangeableProducts;
};

//approves products by moderator
export const approve = async (data) => {
  const response = await axios.post(
    `http://192.168.100.4:5000/products/approve`,
    data,
    header
  );
  return response;
};

//fetches image upload link
export const getUploadLink = async () => {
  const response = await axios.get(`http://192.168.100.4:5000/products/upload_image`);
  return response
}

//uploads to s3 bucket
export const uploadImage = async (URL, file) => {
 const options = {
   headers: {
     "Content-Type": file.type,
   },
 };
  const response = await axios.put(URL, file, options);
  return response;
};

//allows moderator to update price
export const updatePrice = async data => {
  const response = await axios.post(
    `http://192.168.100.4:5000/products/update`,
    data,
    header
  );
  return response;
};

//Fetch contents of user cart
export const fetchCart = async (userId) => {
  const response = await axios.get(
    `http://192.168.100.4:5000/products/cart/${userId}`,
    header
  );
  return response;
}

//Add a product to user's cart
export const addToCart = async productId => {
  const response = await axios.post(
    `http://192.168.100.4:5000/products/addToCart/${productId}`,
    {},
    header
  );
  return response;
}

//Remove a product to user's cart
export const removeFromCart = async (productId) => {
  const response = await axios.post(
    `http://localhost:5000/products/removeFromCart/${productId}`,{},header
  );
  return response;
}

//sell a product
export const sellProduct = async (_id) => {  
  const response = await axios.post(
    `http://localhost:5000/products/sell_product`,{_id},header
  );
  return response;
}
