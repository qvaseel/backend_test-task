import jsonServer from "json-server";
import { generateData } from "./db.js";
import checkAuth from "./checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as ProductController from "./controllers/ProductController.js";
import * as ManufacturersController from "./controllers/ManufacturersController.js";

const server = jsonServer.create();
const router = jsonServer.router(generateData());
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

//авторизация
server.post("/login", UserController.login);
server.get("/me", checkAuth, UserController.getMe);

//пример пагинации
//products?_limit=10&_page=2&q=п - 10 товаров, вторая страница,
//вывод всех товаров где в названии присутсвует "п"

//пагинация и поиск товаров
server.get("/products", checkAuth, ProductController.getAllProducts);
//получение одного товара по id
server.get("/products/:id", checkAuth, ProductController.getOneProductById);
//добавление товара
server.post("/products", checkAuth, ProductController.addProduct);
//обновление товара по id
server.patch("/products/:id", checkAuth, ProductController.updateProductById);
//удаление товара по id
server.delete("/products/:id", checkAuth, ProductController.deleteProductById);

//получение всех производителей
server.get("/manufacturers", checkAuth, ManufacturersController.getAllManufacturers);

server.use(router);
server.listen(3001, () => {
  console.log("server start");
});
