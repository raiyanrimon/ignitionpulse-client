import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../hook/useAxiosOpen";
import ProductCard from "../shared/ProductCard";

const Products = () => {
  const axiosOpen = useAxiosOpen();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", page, searchTerm],
    queryFn: async () => {
      const res = await axiosOpen.get("/products", {
        params: {
          page,
          searchTerm,
        },
      });
      const accepted = res.data.filter(
        (product) =>
          product.status !== "rejected" &&
          (product.tags.includes(searchTerm) ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
      return accepted;
    },
  });

  const handleSearch = (searchTerm) => {
    setPage(1);
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products by tag, name, or description..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Product Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="mx-4">{page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Products;
