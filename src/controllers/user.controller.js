import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const user = {
  username: "email@test.com",
  passwd: "secret_passwd",
};

export const generateToken = (req, res) => {
  // console.log("generateToken", req.body);
  try {
    const { user } = req.body;
    // const payload = { ...user, exp: Date.now() + Date.now() * 60000 };
    const payload = { ...user };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });

    res.status(200).json({ ...user, token });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

//Middleware - se convierte en middleware cuando se usa el argumento next
export const login = async (req, res, next) => {
  const { username: email, passwd: password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    // console.log("user", user);
    const isValidUser = bcrypt.compareSync(password, user.password);
    // console.log("isValidUser", isValidUser);
    if (isValidUser) {
      next();
    } else {
      res
        .status(401)
        .json({ error: true, message: "user or password is wrong" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

// Middleware
export const verifyToken = (req, res, next) => {
  // console.log("**********", req.header("Authorization"));
  const token = req.header("Authorization").split(" ")[1]; //el formato es "Bearer token" por eso el split

  try {
    const decode = jwt.verify(token, process.env.SECRET);
    // console.log("token decoded", decode);
    const { exp: expDate } = decode;
    //expired?
    if (Date.now() / 1000 > expDate) {
      // console.log("expired");
      res.status(401).send();
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send();
  }
  // next();
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  const user = await prisma.user.create({
    data: { email, password: hash },
  });
  res.status(201).json(user);
};
