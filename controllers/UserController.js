import { generateData } from "../db.js";
import jsonServer from "json-server";
import jwt from "jsonwebtoken";

const router = jsonServer.router(generateData());

export function generateToken(user) {
  const payload = { id: user.id };
  return jwt.sign(payload, "akunamatata", { expiresIn: "1d" });
}

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get("users").find({ email }).value();

  if (!user) {
    res.status(404).json({ error: "Пользователь не существует" });
  } else if (user.password !== password) {
    res.status(400).json({ error: "Неверный пароль" });
  } else {
    const token = generateToken(user);
    res.json({ user, token });
  }
};

export const getMe = (req, res) => {
  try {
    const user = router.db.get("users").find({ id: req.userId }).value();
    const roles = user.roles.map(roleId => router.db.get('roles').find({ id: roleId}).value());

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    res.json({ user, roles });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
