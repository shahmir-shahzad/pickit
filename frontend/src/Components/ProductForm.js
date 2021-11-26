import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { fetchCategories } from "../API calls/categories";
import {
  createProduct,
  updateProduct,
  getUploadLink,
  uploadImage,
} from "../API calls/products";
import { Form, Button } from "react-bootstrap";
import Input from "./UI/Input";
import DropdownSelector from "./UI/Dropdown";

const ProductForm = props => {
  const [type, setType] = useState(props.type);
  const [categories, setCategories] = useState([]);
  const [chosenCategoryId, setChosenCategoryId] = useState(props.categoryId);
  const [chosenCategoryName, setChosenCategoryName] = useState(
    props.categoryName
  );
  const [productName, setProductName] = useState(props.productName);
  const [price, setPrice] = useState(props.price);
  const [img, setImg] = useState([]);
  const [productDescription, setProductDescription] = useState(
    props.description
  );

  useEffect(() => {
    fetchCategories()
      .then(result => setCategories(result.data.data.categories))
      .catch("Error while fetching categories");
  }, []);

  useEffect(() => {
    setImg(props.file);
  }, [props.file]);

  const submit = async e => {
    e.preventDefault();
    props.setLoading();
    let data = {
      productName,
      categoryId: chosenCategoryId,
      username: localStorage.getItem("username"),
      description: productDescription,
      price,
      date: Date.now(),
      transactionType: type,
      // images: imgLink,
    };
    if (props.action === "Update") {
      data = { ...data, _id: props._id };
      updateProduct(data)
        .then(() =>
          props.history.push(`/${localStorage.getItem("user_id")}/get_products`)
        )
        .catch(() => console.log("error while updating"));
    } else {
      getUploadLink()
        .then(response => {
          const uploadUrl = response.data.data.uploadURL;

          uploadImage(uploadUrl, img)
            .then(() => {
              const imageUrl = uploadUrl.split("?")[0];
              data = { ...data, images: imageUrl };

              createProduct(data)
                .then(
                  props.history.push(
                    `/${localStorage.getItem("user_id")}/get_products`
                  )
                )
                .catch(err => console.log(err));
            })
            .catch(err => {
              console.log(err.message);
            });
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <React.Fragment>
      <Form onSubmit={submit}>
        <Input
          label="Product Name"
          type="Text"
          placeholder="Enter product name"
          val={productName}
          updateState={e => setProductName(e.target.value)}
        />
        <Input
          label="Price"
          type="number"
          val={price}
          placeholder="Enter price in PKR"
          updateState={e => setPrice(e.target.value)}
        />

        <Input
          label="Description"
          type="textarea"
          val={productDescription}
          placeholder="Add product description."
          updateState={e => setProductDescription(e.target.value)}
        />

        <div className="row mt-2">
          <Form.Group className=" col-md-3 mb-3 offset-md-4">
            <DropdownSelector
              variant="light"
              className=""
              label="Transaction type"
              labelRequired={true}
              chosen={type}
              options={["sell", "exchange"]}
              onSelect={type => setType(type)}
              dropdownOff="transactionType"
            />
          </Form.Group>

          <Form.Group className=" col-md-2 mb-3">
            <DropdownSelector
              variant="light"
              className=""
              label="Category"
              labelRequired={true}
              chosen={chosenCategoryName}
              options={categories}
              onSelect={cat => {
                setChosenCategoryId(cat._id);
                setChosenCategoryName(cat.categoryName);
              }}
              dropdownOff="category"
            />
          </Form.Group>
        </div>

        <div className="row mt-4">
          <div className="col-md-2 offset-md-4">
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
              disabled={
                productName === "" || price === "" || productDescription === ""
                  ? true
                  : false
              }
            >
              {props.action || "Create"}
            </Button>
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default withRouter(ProductForm);
