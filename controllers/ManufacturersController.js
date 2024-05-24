import { generateData } from "../db.js";
import jsonServer from "json-server";

const router = jsonServer.router(generateData());

export const getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await router.db.get("manufacturers").value();
    res.json(manufacturers);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить список производителей",
    });
  }
};
