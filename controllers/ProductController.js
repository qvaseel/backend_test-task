import { generateData } from "../db.js";
import jsonServer from "json-server";

const router = jsonServer.router(generateData());

//пример пагинации
//products?_limit=10&_page=2&q=п - 10 товаров, вторая страница,
//вывод всех товаров где в названии присутсвует "п"
export const getAllProducts = async (req, res) => {
  try {
    const { _page = 1, _limit = 8, q = "" } = req.query;

    const products = await router.db
      .get("products")
      .filter((product) => product.name.toLowerCase().includes(q.toLowerCase()))
      .value();

    const start = (_page - 1) * _limit;
    const end = _page * _limit;
    const paginatedProducts = products.slice(start, end);

    res.setHeader("X-Total-Count", products.length);
    res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
    res.json(paginatedProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить список товаров",
    });
  }
};

export const getOneProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await router.db
      .get("products")
      .find({ id: Number(id) })
      .value();
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Продукт не найден" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить информацию о товаре",
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await router.db.get("products").insert(req.body).write();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось добавить информацию о товаре",
    });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await router.db
      .get("products")
      .find({ id: Number(id) })
      .assign(req.body)
      .write();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить информацию о товаре",
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await router.db
      .get("products")
      .remove({ id: Number(id) })
      .write();
    res.json({
      message: "Товар успешно удален"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить информацию о товаре",
    });
  }
};
