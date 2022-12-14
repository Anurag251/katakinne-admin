import React, { createContext, useEffect, useState } from "react";
import { url } from "../urls";

export const ProductContext = createContext();

export const ProductProvider = ({ children, somethingsChages }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url + "/product/", {
      signal: abortController.signal,
    })
      .then((res) => {
        if (res.status === 401) {
          throw Error("Something went wrong.Could not fetch data.");
        }

        return res.json();
      })
      .then((data) => {
        if (data !== null) {
          setProducts(data);
        } else {
          setProducts(null);
        }
      });

    // return () => {
    //   abortController.abort();
    // };
  }, [somethingsChages]);

  return (
    <React.Fragment>
      {products ? (
        <ProductContext.Provider value={[products, setProducts]}>
          {children}
        </ProductContext.Provider>
      ) : (
        "Loading"
      )}
    </React.Fragment>
  );
};
