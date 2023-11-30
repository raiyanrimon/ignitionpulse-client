import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../hook/useAxiosOpen";
import ProductCard from "../shared/ProductCard";

const Featured = () => {
  const axiosOpen = useAxiosOpen();
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosOpen.get("/products");
      const featured = res.data.filter((re) => re.isFeatured === "featured");
      const sorted = [...featured].sort((a, b) => b.timestamp - a.timestamp);
      return sorted;
    },
  });
  return (
    <div>
      <div className="text-center text-2xl font-bold">
        <h2>Featured Products</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Featured;
