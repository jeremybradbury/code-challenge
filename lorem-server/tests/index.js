var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../app.js");
chai.use(chaiHttp);
chai.should();

describe("MockData", () => {
  describe("GET /users/list", () => {
    // Test to get all records
    it("should list all records", done => {
      chai
        .request(app)
        .get("/users/list")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });

    // Test to create a single record
    it("should create a single record", done => {
      var user = {
        id: 88888888,
        email: "test@user",
        message: "test message",
        foo: "test foo",
        bar: "test bar",
      };
      chai
        .request(app)
        .post(`/users/create`)
        .set("content-type", "application/json")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    // Test to update a single record
    it("should update a single record", done => {
      var user = {
        id: 88888888,
        email: "test2@user",
        message: "test2 message",
        foo: "test2 foo",
        bar: "test2 bar",
      };
      chai
        .request(app)
        .post(`/users/${user.id}/update`)
        .set("content-type", "application/json")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          chai.expect(JSON.stringify(res.body)).to.equal(JSON.stringify(user));
          done();
        });
    });

    // Test to get single record
    it("should read a single record", done => {
      const id = 88888888;
      chai
        .request(app)
        .get(`/users/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    // Test to delete a single record
    it("should delete a single record", done => {
      chai
        .request(app)
        .get(`/users/88888888/destroy`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.equal(1);
          done();
        });
    });

    // Test to get single record
    it("should not get a single record", done => {
      const id = 88888888;
      chai
        .request(app)
        .get(`/users/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          chai.expect(res.body).to.be.null;
          done();
        });
    });
  });
});
