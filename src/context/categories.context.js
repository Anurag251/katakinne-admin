import React, { createContext, useEffect, useState } from "react";
import { url } from "../urls";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children, somethingsChages }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url + "/category/", {
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
          setCategories(data);
        } else {
          setCategories(null);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [somethingsChages]);

  return (
    <React.Fragment>
      {categories ? (
        <CategoriesContext.Provider value={[categories, setCategories]}>
          {children}
        </CategoriesContext.Provider>
      ) : (
        "Loading"
      )}
    </React.Fragment>
  );
};
