import { create } from "zustand";
import { ICategory } from "@/models/Category";

interface CategoryState {
  categories: ICategory[];
  category: ICategory | null;
  setCategories: (categories: ICategory[]) => void;
  setCategory: (category: ICategory | null) => void;
  addCategory: (category: ICategory) => void;
  updateCategory: (id: string, updatedCategory: ICategory) => void;
  removeCategory: (id: string) => void;
}

export const CategoryStore = create<CategoryState>((set) => ({
  categories: [],
  category: null,
  setCategories: (categories) => set({ categories }),
  setCategory: (category) => set({ category }),
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  updateCategory: (id, updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category._id.toString() === id ? updatedCategory : category
      ),
    })),
  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter(
        (category) => category._id.toString() !== id
      ),
    })),
}));
