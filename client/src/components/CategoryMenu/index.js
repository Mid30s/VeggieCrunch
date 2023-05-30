import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function CategoryMenu() {
  console.log("Rendering CategoryMenu");
  const [state, dispatch] = useStoreContext();

  const { categories = [] } = state;

  const { loading, error, data: categoryData } = useQuery(QUERY_CATEGORIES);
  if (error) {
    console.error("Error fetching categories", error);
    console.log("Error:", error.message);
  }

  useEffect(() => {
    console.log("Inside useEffect");
    console.log("categoryData:", categoryData);
    console.log("loading:", loading);

    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories?.length > 0 &&
        categories.map((item) => {
          console.log("Rendering button for category:", item.name);
          return (
            <button
              key={item._id}
              onClick={() => {
                handleClick(item._id);
              }}
            >
              {item.name}
            </button>
          );
        })}
    </div>
  );
}

export default CategoryMenu;
