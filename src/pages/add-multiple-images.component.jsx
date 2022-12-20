import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../context/product.context";
import { editUrl, url } from "../urls";

const AddMultipleImagesComponent = ({ somethingsChages, dectedChanges }) => {
  const [imageData, setImageData] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);

  const [product] = useContext(ProductContext);

  const location = useLocation();

  useEffect(() => {
    product.forEach((pro) => {
      if (pro.id === location.state) {
        setSingleProduct(pro);
      }
    });
  }, [product]);

  const validate = () => {
    const formData = new FormData();

    formData.append("product", location.state);

    formData.append("image", imageData, imageData.name);

    fetch(url + "/addproductimage/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    }).then((res) => dectedChanges(somethingsChages));
  };

  const selectFiles = (event) => {
    setImageData(event.target.files[0]);
  };

  const deleteImage = (e) => {
    fetch(editUrl + `/productimage/${e}/`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
    }).then((res) => dectedChanges(somethingsChages));
  };

  return (
    <div className="upload_image" id="upload_image">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h4>Upload Image</h4>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                <div className="demo-wrap upload-demo">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <strong>
                          Choose Multiple Images For This Product:
                        </strong>

                        <input
                          className="form-control ImageFile"
                          id="productImage"
                          type="file"
                          onChange={selectFiles}
                          accept="image/*"
                        />
                      </div>

                      <button
                        className="btn btn-success btn-block btn-upload-image"
                        style={{ marginTop: "2%", display: "inline-block" }}
                        onClick={validate}
                      >
                        Upload Image
                      </button>

                      <div className="col-md-12">
                        <div className="image-list">
                          {singleProduct !== null
                            ? singleProduct.productimage.map((data) => (
                                <div
                                  key={data.id}
                                  className="image"
                                  style={{
                                    backgroundImage: `url(${data.image})`,
                                  }}
                                >
                                  <h2>{data.id}</h2>
                                  <button
                                    className="delete_image"
                                    onClick={() =>
                                      deleteImage(parseInt(data.id))
                                    }
                                  >
                                    <span className="fas fa-times"></span>
                                  </button>
                                </div>
                              ))
                            : "Loading..."}
                        </div>
                      </div>
                    </div>
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

export default AddMultipleImagesComponent;
