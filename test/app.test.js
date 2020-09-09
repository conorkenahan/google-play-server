const supertest = require("supertest");
const app = require("../app");
const { expect } = require("chai");

describe("GET /apps", () => {
  it("should return all 20 apps", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.lengthOf(20);
      });
  });
  it("should be 400 if sort is incorrect", () => {
    return supertest(app).get("/apps").query({ sort: "MISTAKE" }).expect(400);
  });
  it("should return 4 results when filtered by 'casual'", () => {
    return supertest(app)
      .get("/apps")
      .query({ genre: "Casual" })
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.lengthOf.at.least(4);
      });
  });
  it("should return 'Angry Birds Rio' first when sorted by 'app'", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "App" })
      .expect(200)
      .then((res) => {
        expect(res.body[0].App).to.eql("Angry Birds Rio");
      });
  });
});
