import React from "react";
import { useQuery } from "@apollo/client";

import { QUERY_CATEGORIES } from "../../utils/queries";

import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

function CategoryMenu({ selectedCategory, onSelectCategory }) {
  const { loading, error, data: categoryData } = useQuery(QUERY_CATEGORIES);
  console.log("Category data:", categoryData);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List component="nav" aria-label="product categories">
      {categoryData.categories.map(({ id, name }) => (
        <ListItem key={id}>
          <ListItemButton
            selected={selectedCategory === name}
            onClick={() => onSelectCategory(name)}
          >
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default CategoryMenu;
