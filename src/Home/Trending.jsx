import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../hook/useAxiosOpen";
import ProductCard from "../shared/ProductCard";
import { Link } from "react-router-dom"; // Assuming you are using react-router-dom

const Trending = () => {
  const axiosOpen = useAxiosOpen();

  const { data: topVotedProducts = [] } = useQuery({
    queryKey: ["topVotedProducts"],
    queryFn: async () => {
      const res = await axiosOpen.get("/products");
      const accepted = res.data.filter((re) => re.status !== "rejected");
      const sortedTopVoted = accepted.sort((a, b) => b.vote - a.vote);
      return sortedTopVoted.slice(0, 6);
    },
  });

  return (
    <div>
      <div className="text-center mt-8">
        <h2>Trending Products</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {topVotedProducts.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/products">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Show All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Trending;
