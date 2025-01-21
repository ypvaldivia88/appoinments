import { useEffect } from "react";
import { CategoryStore } from "@/stores/CategoryStore";

const useCategories = () => {
  const { categories, category, setCategories, setCategory } = CategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createCategory = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      await response.json();
      setCategory(null);
      await fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const updateCategory = async () => {
    try {
      if (!category?._id) return;
      const id = category._id.toString();
      await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      await fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return {
    categories,
    category,
    setCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useCategories;
