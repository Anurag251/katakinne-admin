import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/product.context";
import { editUrl } from "../urls";

const ProductsComponent = ({ dectedChanges, somethingsChages }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const deleteConfirm = document.querySelectorAll("#delete_confirm");
    const deleteBtns = document.querySelectorAll("#delete_btn");
    const deleteBtnsBg = document.querySelectorAll(".delete_confirm_bg");
    const deleteBtnsClose = document.querySelectorAll(".popup-delete-close");

    deleteBtns.forEach((deleteBtn, idx) => {
      deleteBtn.addEventListener("click", () => {
        deleteConfirm[idx].classList.add("active");
        deleteBtnsBg[idx].classList.add("active");
      });

      deleteBtnsClose[idx].addEventListener("click", () => {
        deleteConfirm[idx].classList.remove("active");
        deleteBtnsBg[idx].classList.remove("active");
      });

      deleteBtnsBg[idx].addEventListener("click", () => {
        deleteConfirm[idx].classList.remove("active");
        deleteBtnsBg[idx].classList.remove("active");
      });
    });
  });

  const [products, setProducts] = useContext(ProductContext);

  const deleteProduct = (e) => {
    fetch(editUrl + `/product/${e}/`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => dectedChanges(somethingsChages));
  };

  return (
    <>
      <div className="all_products">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0 flex-title">
                  <h4>Products</h4>

                  <form action="">
                    <select name="" className="form-control">
                      <option value="">Select</option>
                      <option value="">Select2</option>
                      <option value="">Select3</option>
                    </select>
                    <button className="btn btn-primary" type="submit">
                      Filter
                    </button>
                  </form>
                </div>

                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Product
                          </th>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Date
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Category
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Price
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Discount
                          </th>

                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Quantity
                          </th>

                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {products.length !== 0 ? (
                          products.map((data, idx) => (
                            <tr key={data.id}>
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

                              <td>
                                <span className="text-secondary text-xs font-weight-bold">
                                  23/04/2018
                                </span>
                              </td>

                              <td className="align-middle text-center FULLFILLMENT">
                                <h4 className="text-xs font-weight-bold mb-0">
                                  {data.category.name}
                                </h4>
                              </td>

                              <td className="align-middle text-center ">
                                <h4
                                  className="text-xs font-weight-bold mb-0"
                                  style={{ color: "#a10000" }}
                                >
                                  {data.price}
                                </h4>
                              </td>

                              <td className="align-middle text-center">
                                <h4 className="text-xs font-weight-bold mb-0">
                                  <del>{data.discount}</del>
                                </h4>
                              </td>

                              <td className="align-middle text-center">
                                <h4 className="text-xs font-weight-bold mb-0">
                                  {data.quantity}
                                </h4>
                              </td>

                              <td className="align-middle flex-center">
                                <div
                                  className="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  <button
                                    type="button"
                                    className="btn btn-secondary btn-sm mb-0"
                                    onClick={() => {
                                      navigate(`/edit-product/${data.id}`, {
                                        state: data.id,
                                      });
                                    }}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                </div>

                                <div
                                  className="text-danger font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm mb-0 delete_btn"
                                    id="delete_btn"
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>

                                  <div className="delete_confirm_bg"></div>

                                  <div
                                    className="delete_confirm"
                                    id="delete_confirm"
                                  >
                                    <div className="inner">
                                      <h4>Are you sure you want to delete</h4>

                                      <div className="btn-group">
                                        <button className="popup-delete-close">
                                          Cancel
                                        </button>

                                        <button
                                          onClick={() => deleteProduct(data.id)}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
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
    </>
  );
};

export default ProductsComponent;
