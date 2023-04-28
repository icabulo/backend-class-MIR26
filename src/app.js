// const express = require("express");
import express from "express";
import jwt from "jsonwebtoken";
import gestorRoutes from "./routes/gestor.route.js";
import projectRoutes from "./routes/project.route.js";
import gestorProjectRoutes from "./routes/gestor_project.route.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import { sendEmail } from "./controllers/email.control.js";

const app = express();
app.use(cors());
// const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.json({ message: "Hello API Prisma" });
});

app.get("/token", (req, res) => {
  const user = { id: 1, name: "maria" };
  const secret = "$2a$12$V9TcJzy49ylH16DAgaOo.uIPeGAiXC0v7Tf2kAjJ4GSt//ALyBSB6";

  const token = jwt.sign(user, secret);
  res.send(token);
});

//Middleware
app.use(express.json()); //esto es un midleware para que se pueda inyectar el json en el body del request y asi actualizar la base de datos
app.use("/gestor", gestorRoutes);
app.use("/project", projectRoutes);
app.use("/gestor-project", gestorProjectRoutes);
app.use("/user", userRouter);
app.get("/email", sendEmail);

/* app.get("/", (req, res) => {
  res.send("<h1>Hello!!!</h1>");
}); */

/* app.listen(PORT, () => {
  console.log("served initialized...");
}); */

export default app;
