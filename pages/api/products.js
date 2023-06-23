import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, sort, phrase, ...filters } = req.query;
  let [sortField, sortOrder] = (sort || "_id-desc").split("_");

  // Criar um objeto de filtro para as propriedades
  const propertiesFilter = {};
  for (const [key, value] of Object.entries(filters)) {
    propertiesFilter[`properties.${key}`] = value;
  }

  // Filtrar os produtos com base nas categorias e nas propriedades
  let products = {};

  if (categories) {
    products = Product.find({
      category: categories.split(","),
      ...propertiesFilter,
    });
  }

  if (phrase) {
    products = Product.find({
      $or: [
        { title: { $regex: phrase, $options: "i" } },
        { description: { $regex: phrase, $options: "i" } },
      ],
    });
  }

  // Aplicar o filtro de ordenação
  if (sortField && sortOrder) {
    const sortOptions = {};
    sortOptions[sortField] = sortOrder === "asc" ? -1 : 1;
    products = products.sort(sortOptions);
  }

  products  = await products.exec();

  res.json(products);
}
