import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInputComponent from "../components/custom-input.component";
import { CategoriesContext } from "../context/categories.context";
import { TokenContext } from "../context/token.context";
import { editUrl } from "../urls";
import axios from "axios";

const AddProductComponent = ({
  dectedChanges,
  somethingsChages,
  recentProduct,
  setNotificationMessage,
}) => {
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

  const [image, setImage] = useState(null);

  const [categories] = useContext(CategoriesContext);
  const { token } = useContext(TokenContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValuse({ ...formValues, [name]: value });
  };

  const validate = (e) => {
    console.log(image);

    e.preventDefault();
    const formData = new FormData();

    let allData = {
      category: parseInt(formValues.productCategory),
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
    formData.append("category_id", allData.category);

    if (image) {
      formData.append("image", image, image.name);
    }

    console.log(editUrl + "/product/");
    console.log(token);

    fetch(editUrl + "/product/", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        dectedChanges(somethingsChages);
        setNotificationMessage("Product Added");

        // setFormValuse((previousInputs) => ({
        //   ...previousInputs,
        //   productCategory: "",
        //   productName: "",
        //   productDescription: "",
        //   productPrice: "",
        //   productDiscountPrice: "",
        //   productImage: "",
        //   productQuantity: "",
        //   productTag: "",
        //   productType: "",
        // }));

        // setImage(null);
      })
      .catch((err) => console.log(err));

    // axios
    //   .post(editUrl + "/product/", {
    //     headers: {
    //       // Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: formData,
    //   })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     dectedChanges(somethingsChages);
    //     setNotificationMessage("Product Added");

    //     setFormValuse((previousInputs) => ({
    //       ...previousInputs,
    //       productCategory: "",
    //       productName: "",
    //       productDescription: "",
    //       productPrice: "",
    //       productDiscountPrice: "",
    //       productImage: "",
    //       productQuantity: "",
    //       productTag: "",
    //       productType: "",
    //     }));

    //     setImage(null);
    //   })
    //   .catch((err) => console.log(err));
  };

  const imageFile = (e) => {
    setImage(e.target.files[0]);
  };

  // if (image) {
  //   console.log(image.name);
  // }

  return (
    <div className="add_new_product">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg-6">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h4>Add Product</h4>
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

                    <div className="divide-form">
                      <CustomInputComponent
                        label="Product Name"
                        type="text"
                        name="productName"
                        handleChange={handleChange}
                        value={formValues.productName}
                      />

                      <div className="group">
                        <label htmlFor="productImage">Product Iamge</label>
                        <input
                          className="form-control ImageFile"
                          id="productImage"
                          type="file"
                          onChange={imageFile}
                          name="image"
                          value={image ? image.filename : ""}
                        />
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
                      name="productTag"
                      onChange={handleChange}
                      value={formValues.productTag}
                      className="form-control"
                      style={{ marginBottom: "10px" }}
                    >
                      <option value="">--Select Tag--</option>
                      <option value="Sale">Sale</option>
                      <option value="New">New</option>
                    </select>

                    <select
                      name="productType"
                      onChange={handleChange}
                      value={formValues.productType}
                      className="form-control"
                    >
                      <option value="">--Select Type--</option>
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

          <div className="col-lg-6">
            <div className="all_products">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h4>Recent Added Product</h4>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="id text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">
                            Id
                          </th>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Product
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Price
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Add Multiple Images
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {recentProduct.length !== 0 ? (
                          recentProduct.map((data, idx) => (
                            <tr key={data.id}>
                              <td className="align-middle text-center ">
                                <span className="align-middle text-xs  font-weight-bold">
                                  {idx + 1}
                                </span>
                              </td>

                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                    <img
                                      src={data.image}
                                      className="avatar avatar-sm me-3"
                                      alt="user1"
                                    />
                                  </div>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                      {data.name}
                                    </h6>

                                    <p className="text-xs text-secondary mb-0">
                                      #{data.id}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="align-middle text-center ">
                                <h4
                                  className="text-xs font-weight-bold mb-0"
                                  style={{ color: "#a10000" }}
                                >
                                  {data.price}
                                </h4>
                              </td>

                              <td className="align-middle text-center ">
                                <button
                                  onClick={() => {
                                    navigate(`/add-image/${data.id}`, {
                                      state: data.id,
                                    });
                                  }}
                                  className="btn btn-primary"
                                  style={{
                                    marginBottom: "0",
                                    padding: ".4rem .6rem",
                                    fontSize: "12px",
                                  }}
                                >
                                  Add Images
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td>Loading...</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductComponent;
