import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProducts } from "../api/productsAPI";

export default function ProductForm() {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProducts,
    onSuccess: () => {
      console.log("Producto creado");
      queryClient.invalidateQueries("products");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({
      ...product,
      inStock: true,
    });
    console.log("submit");
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="name">nombre</label>
      <input type="text" name="name" placeholder="nombre" />
      <label htmlFor="description">descripcion</label>
      <input type="text" name="description" placeholder="descripcion" />
      <label htmlFor="price">precio</label>
      <input type="number" name="price" placeholder="precio" />
      <button>Add product</button>
    </form>
  );
}
