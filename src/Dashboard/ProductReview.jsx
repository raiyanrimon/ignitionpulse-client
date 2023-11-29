const ProductReview = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>View Details</th>
              <th>Make Featured</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {/* {products.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product?.name}</td>
                <td>{product?.vote}</td>
                <td>{product?.status}</td>
                <td>
                  <Link to={`/update/${product._id}`}>
                    <GrUpdate></GrUpdate>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(product)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrash className="text-red-500"></FaTrash>
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReview;
