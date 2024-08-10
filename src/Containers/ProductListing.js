import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Redux/actions/productsActions";
import ProductComponent from "./ProductComponent";

const ProductPage = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      if (response.data) {
        dispatch(setProducts(response.data));
      } else {
        console.log("No products found");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products :", products);

  return (
    <div className="ui grid container">
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ProductComponent />
      )}
    </div>
  );
};

export default ProductPage;
