// Write your tests here
const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).toBe(true);
});

it("is the correct env", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("auth router", () => {
  describe("[Post] /api/auth/register", () => {
    let user = { username: "Prison", password: "Mike" };
    let response;
    request(server)
      .post("/api/auth/register")
      .send(user)
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err;
      });
    it("responds with 200 OK", async () => {
      expect(response.status).toEqual(200);
    });
    it("responds with correct username", async () => {
      expect(response.body.username).toEqual("Prison");
    });
  });
  describe("[Post] /api/auth/login", () => {
    let user = { username: "MrJohn", password: "Smith" };
    request(server)
      .post("/api/auth/login")
      .send(user)
      .then((res) => {
        expected = res;
      })
      .catch((err) => {
        expected = err;
      });
    it("responds with 401", async () => {
      expect(expected.status).toEqual(401);
    });
    it("responds with invalid credentials", async () => {
      expect(expected.text).toContain("invalid credentials");
    });
  });
})
;
describe("jokes", () => {
  describe("[get] /api/jokes", () => {
    let response;
    request(server)
      .post("/api/jokes")
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err;
      });
    it("responds with 401 OK", async () => {
      expect(response.status).toEqual(401);
    });
    it("responds with message", async () => {
      expect(response.text).toContain("token required");
    });
  });
});