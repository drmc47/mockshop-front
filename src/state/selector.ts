import { selector } from "recoil";
import { categoryFilterAtom, filterAtom, productsAtom, ratingFilterAtom } from "./atom";

export const productsFilteredSelector = selector({
  key: "productsFilteredSelector",
  get: ({ get }) => {
    const products = get(productsAtom);
    const filter = get(filterAtom);
    const categoryFilter = get(categoryFilterAtom);
    const ratingFilter = get(ratingFilterAtom);
    let searchFiltered = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(filter.toLowerCase() || categoryFilter.toLowerCase()) ||
        product.price
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase() || categoryFilter.toLowerCase()) ||
        product.category.toLowerCase().includes(filter.toLowerCase() || categoryFilter.toLowerCase())
      );
    });

    if (categoryFilter) {
      searchFiltered = searchFiltered.filter((product) => product.category === categoryFilter);
    }
    if (ratingFilter) {
      searchFiltered = searchFiltered.filter((product) => product.rating.rate > ratingFilter);
    }
    return searchFiltered;
  },
});
