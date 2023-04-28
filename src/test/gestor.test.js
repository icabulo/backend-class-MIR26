import request from "supertest";
import app from "../app.js";

describe("Gestor Test /gestor", () => {
  let token = "";
  beforeAll(async () => {
    const res = await request(app).post("/user/login").send({
      username: "mockemail@test.com",
      passwd: "1234567",
    });
    token = res.body.token;
  });

  it("It should return all gestores", async () => {
    const res = await request(app)
      .get("/gestor")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(200);
  });
});
