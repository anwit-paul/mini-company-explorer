// src/api/productApi.ts

const FETCH_LIMIT = 10;

const fetchProducts = async ({ pageParam = 0, searchTerm = "" }) => {
  if (searchTerm) {
    // If a search term exists, hit the search endpoint and fetch all matching data.
    const res = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  } else {
    // If no search term, use the paginated endpoint for infinite scroll.
    const skip = pageParam * FETCH_LIMIT;
    const res = await fetch(`https://dummyjson.com/products?limit=${FETCH_LIMIT}&skip=${skip}`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  }
};

export default fetchProducts;
