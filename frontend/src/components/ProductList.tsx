// src/components/ProductList.tsx
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, Fragment } from "react";
import fetchProducts from "../api/productApi";
import { productList, show } from "../counterSlice";

// Types remain the same as before
type Product = {
  id: number;
  title: string;
  description: string;
};

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const ProductList = () => {
  const dispatch = useDispatch();
  const filteredData = useSelector((state: any) => state.counter.filteredData);
  const searchTerm = useSelector((state: any) => state.counter.searchTerm);
  const tableRef = useRef<HTMLTableElement>(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ProductsResponse, Error>({
    queryKey: ["products", searchTerm],
    queryFn: ({ pageParam = 0 }) => fetchProducts({ pageParam, searchTerm }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (searchTerm) {
        return undefined;
      }

      if (allPages.length * lastPage.limit < lastPage.total) {
        return allPages.length;
      }
      return undefined;
    },
  });

  // Effect to dispatch the combined product list to Redux
  useEffect(() => {
    if (data?.pages) {
      // Flatten the pages array into a single list
      const combinedProducts = data.pages.flatMap((page) => page.products);
      dispatch(productList(combinedProducts));
    }
  }, [data?.pages, dispatch]);

  // Handle manual scroll to load more
  const handleScroll = () => {
    if (!tableRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      tableRef.current.parentElement!;
    // Check if user has scrolled to the bottom
    if (
      scrollTop + clientHeight >= scrollHeight - 200 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const parent = tableRef.current?.parentElement;
    if (parent) {
      parent.addEventListener("scroll", handleScroll);
      return () => parent.removeEventListener("scroll", handleScroll);
    }
  }, [hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
        {" "}
        {/* Add a wrapper with scroll */}
        <Table striped bordered hover ref={tableRef}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          {filteredData && (
            <tbody>
              {filteredData?.map((product) => (
                <tr
                  key={product.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(show(product))}
                >
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                </tr>
              ))}
            </tbody>
          )}
          {filteredData?.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  No products found.
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>
      {(isFetching || isFetchingNextPage) && (
        <div>Loading more products...</div>
      )}
    </>
  );
};

export default ProductList;
