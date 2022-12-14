import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomInputComponent from "../components/custom-input.component";
import { CategoriesContext } from "../context/categories.context";
import { editUrl } from "../urls";

const EditProductComponent = () => {
  const [formValues, setFormValuse] = useState({
    productCategory: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    productDiscountPrice: "",
    productImage: "",
    productQuantity: "",
    productTag: "",
    productType: "",
  });

  const [categories] = useContext(CategoriesContext);

  const [imageUrl, setImageUrl] = useState(null);

  const [cate, setCate] = useState(null);

  const [editProduct, setEditProduct] = useState([]);

  const [image, setImage] = useState(null);

  const { state } = useLocation();

  useEffect(() => {
    fetch(editUrl + `/product/${state}/`)
      .then((res) => res.json())
      .then((data) => setEditProduct(data));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValuse({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (editProduct) {
      if (editProduct.category !== undefined) {
        setCate(editProduct.category);

        setFormValuse((previousInputs) => ({
          ...previousInputs,
          productCategory: editProduct.category.id || "",
        }));
      }

      setImageUrl(editProduct.image);

      setFormValuse((previousInputs) => ({
        ...previousInputs,
        productName: editProduct.name || "",
      }));

      setFormValuse((previousInputs) => ({
        ...previousInputs,
        productDescription: editProduct.description || "",
      }));

      setFormValuse((previousInputs) => ({
        ...previousInputs,
        productPrice: editProduct.price || "",
      }));

      setFormValuse((previousInputs) => ({
        ...previousInputs,
        productDiscountPrice: editProduct.discount || "",
      }));

      // setFormValuse((previousInputs) => ({
      //   ...previousInputs,
      //   productImage: editProduct.image || "",
      // }));

      setFormValuse((previousInputs) => ({
        ...previousInputs,
        productQuantity: editProduct.quantity || "",
      }));

      setFormValuse((previousInputs) => ({
        ...previousInputs,
        productTag: editProduct.tag || "",
      }));

      setFormValuse((previousInputs) => ({
        ...previousInputs,
        productType: editProduct.type || "",
      }));
    }
  }, [editProduct, cate]);

  const validate = (e) => {
    e.preventDefault();

    const formData = new FormData();

    let allData = {
      category: {
        id: parseInt(formValues.productCategory),
      },

      name: formValues.productName,
      description: formValues.productDescription,
      price: formValues.productPrice,
      discount: formValues.productDiscountPrice,
      quantity: formValues.productQuantity,
      tag: formValues.productTag,
      type: formValues.productType,
    };

    formData.append("name", allData.name);
    formData.append("description", allData.description);
    formData.append("price", allData.price);
    formData.append("discount", allData.discount);
    formData.append("quantity", allData.quantity);
    formData.append("tag", allData.tag);
    formData.append("type", allData.type);
    formData.append("category", allData.category.id);

    if (image) {
      formData.append("image", image, image.name);
    }

    fetch(editUrl + `/product/${state}/`, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setEditProduct(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const ImageFile = document.querySelector(".ImageFile");

    ImageFile.addEventListener("change", (e) => {
      setImage(e.target.files[0]);
      // console.log(e.target.files[0]);
    });
  }, []);

  // console.log(editProduct);

  return (
    <div className="add_new_product">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h4>Edit Product</h4>
              </div>

              <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  <form action="" onSubmit={(e) => validate(e)}>
                    <select
                      name="productCategory"
                      onChange={handleChange}
                      value={formValues.productCategory}
                      className="form-control"
                    >
                      <option value="">--Select Categories--</option>

                      {categories &&
                        categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </select>

                    {imageUrl && (
                      <div className="product-image">
                        <img src={imageUrl} alt="" />
                      </div>
                    )}

                    <div className="divide-form">
                      <CustomInputComponent
                        label="Product Name"
                        type="text"
                        name="productName"
                        handleChange={handleChange}
                        value={formValues.productName}
                      />

                      <div className="group">
                        <input className="form-control ImageFile" type="file" />
                      </div>

                      <CustomInputComponent
                        label="Product Price"
                        type="number"
                        name="productPrice"
                        handleChange={handleChange}
                        value={formValues.productPrice}
                      />

                      <CustomInputComponent
                        label="Discount Price"
                        type="number"
                        name="productDiscountPrice"
                        handleChange={handleChange}
                        value={formValues.productDiscountPrice}
                      />

                      <CustomInputComponent
                        label="Tag"
                        type="text"
                        name="productTag"
                        handleChange={handleChange}
                        value={formValues.productTag}
                      />

                      <CustomInputComponent
                        label="Quantity"
                        type="number"
                        name="productQuantity"
                        handleChange={handleChange}
                        value={formValues.productQuantity}
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="product-desc">Product Description</label>
                      <textarea
                        className="form-control"
                        name="productDescription"
                        id="product-desc"
                        cols="30"
                        rows="10"
                        onChange={handleChange}
                        value={formValues.productDescription}
                      ></textarea>
                    </div>

                    <select
                      name="productType"
                      onChange={handleChange}
                      value={formValues.productType}
                      className="form-control"
                    >
                      <option value="1">--Select Type--</option>
                      <option value="Offer">Offer</option>
                      <option value="Feature">Feature</option>
                    </select>

                    <div className="divide-form"></div>

                    <div className="group">
                      <button
                        type="submit"
                        className="btn bg-gradient-info mt-4 mb-0"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductComponent;
