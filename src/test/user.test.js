import request from "supertest";
import app from "../app.js";

describe("user endpoints", () => {
  it("POST /user should registar an user", async () => {
    await request(app)
      .post("/user")
      .send({
        email: "mockemail@test.com",
        password: "1234567",
      })
      .expect(201);
  });

  describe("POST /user/login", () => {
    it("should allow login when user is valid", async () => {
      const res = await request(app).post("/user/login").send({
        username: "mockemail@test.com",
        passwd: "1234567",
      });
      expect(res.body.token).toBeDefined();
    });

    it("should deny access when user is wrong", async () => {
      const res = await request(app).post("/user/login").send({
        username: "mockemail@test.com",
        passwd: "12345671234",
      });
      expect(res.body.token).toBeUndefined();
      expect(res.status).toEqual(401);
    });

    it("should fail when request is incorrect", async () => {
      //lets pretent that whe have an invalid body syntax
      await request(app)
        .post("/user/login")
        .send({
          email: "mockemail@test.com",
          pass: "1234567",
        })
        .expect(500);
    });
  });
});

/* import request from "supertest";
import app from "../app.js";

describe("user endpoints", () => {
  it("POST /user should registar an user", async () => {
    await request(app)
      .post("/user")
      .send({
        email: "mockemail@test.com",
        password: "1234567",
      })
      .expect(201);
  });

  describe("POST /user/login", () => {
    it("Should allow login", async () => {
      const loginRequest = await request(app).post("/user/login").send({
        username: "tesdt2@test.com",
        passwd: "1234567",
      });
      console.log(loginRequest.body);

      expect(loginRequest.body.token).toBeDefined();
    });
    it("Should deny login when user in not valid", async () => {
      const login = await request(app).post("/user/login").send({
        username: "tesdt2@test.com",
        passwd: "12345567654321",
      });
      expect(login.body.token).toBeUndefined();
      expect(login.status).toEqual(401);
    });
  });
}); */
