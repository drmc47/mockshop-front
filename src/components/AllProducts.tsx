import { Box } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import { categoryFilterAtom, filterAtom, productsAtom, ratingFilterAtom } from "../state/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { productsFilteredSelector } from "../state/selector";
import Loading from "./Loading/Loading";

const AllProducts = () => {
  const { isLoading } = useProducts();
  const allProducts = useRecoilValue(productsAtom);
  const products = useRecoilValue(productsFilteredSelector);
  const categories = [...new Set(allProducts?.map(({ category }) => category))];
  const [search, setSearch] = useRecoilState(filterAtom);
  const setCategoryFilter = useSetRecoilState(categoryFilterAtom);
  const setRatingFilter = useSetRecoilState(ratingFilterAtom);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") setCategoryFilter("");
    setCategoryFilter(e.target.value);
  };

  const handleRatingFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRatingFilter(+e.target.value);
  };

  return (
    <>
      <Box className="flex flex-col w-full justify-center items-center mx-auto">
        <input
          type="text"
          placeholder="Search..."
          className="mt-4 w-[40%] p-2 rounded-md"
          onChange={handleSearch}
          value={search}
        />
        <div className="flex gap-4 m-4">
          <label htmlFor="Category">Category</label>
          <select name="categoryFilter" id="categoryFilter" onChange={handleCategoryFilter}>
            <option value="">All</option>
            {categories?.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          <label htmlFor="Rating">Rating</label>

          <select name="ratingFilter" id="ratingFilter" onChange={handleRatingFilter}>
            <option value={0} key={0}>
              {"All"}
            </option>
            <option value={4} key={4}>
              {"Higher than 4 stars"}
            </option>
            <option value={3} key={3}>
              {"Higher than 3 stars"}
            </option>
            <option value={2} key={2}>
              {"Higher than 2 stars"}
            </option>
          </select>
        </div>
      </Box>
      <Box className="grid grid-flow-row grid-cols-3 xl:grid-cols-5  gap-4 m-3">
        {isLoading ? (
          <div className="flex items-center justify-center w-screen">
            <Loading />
          </div>
        ) : products?.length ? (
          products.map(({ title, id, price, image, rating, category }) => (
            <ProductCard
              key={id}
              title={title}
              rating={rating}
              price={price}
              image={image}
              category={category}
              id={id}
            />
          ))
        ) : (
          <h1>Nothing here</h1>
        )}
      </Box>
    </>
  );
};

export default AllProducts;
