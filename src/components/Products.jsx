import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "../api/productsAPI";

export default function Products() {
  const queryClient = useQueryClient();
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  const handleDelete = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  console.log("data de prod", data);

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button>Eliminar</button>
          <input type="checkbox" />
          <label>In Stock</label>
          <button onClick={() => handleDelete.mutate(product.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
