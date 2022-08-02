process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/User');

chai.use(chaiHttp);

let database = [
    { name: "test", role: "student", email: "test@gmail.com", password: "$2a$10$oR2x1fm1/KhiCDZHn0OzFObRahFdOE95RVsAEM0f8lS865S.u2d2m" },
    { name: "test2", role: "both", email: "test2@gmail.com", password: "$2a$10$P/VX8aiAYO8F4RbzfrCck.08Ax4gH8GQastHe6EFviYJ4yYhrHgTW" },
    { name: "test3", role: "tutor", email: "test3@email.com", password: "$2a$10$IhQp0O4JA7XmQEwIct47Te6vkoyxwr4CUxrUwqR0huTdMp9CE5wIe" }
];

//user tests:

//Can I create a user
describe('POST /api/users/', () => {
    it('Create user', () => {
        let user = {name: "something", role: "both", email: "t@gmail.com", password: "1234"}
        /*if (database.includes(user)){

        }*/
        database.push(user);
        //database.should.be.a('object');
        database[database.length-1].should.have.property('name').equal(user.name);
        database[database.length-1].should.have.property('role').equal(user.role);
        database[database.length-1].should.have.property('email').equal(user.email);
        database[database.length-1].should.have.property('password');
        //console.log(database);
    });
});

//Get the list of users // see if it matches users you created
describe('GET list of users in database', () => {
    it('Get users', () => {
        console.log(database);
        for (var i = 0; i < database.length; i++){
            database[i].should.have.property('name');
            database[i].should.have.property('role');
            database[i].should.have.property('email');
        }
    })
})

//POST api/users test
describe('POST api/users', function() {
    it('Should post fake user into database', () => {
        User.collection.drop();
        beforeEach(function(done){
            var newUser = new User({
                name: "testing",
                role: "Both",
                email: "testing@gmail.com",
                password: "testing"
            });
            newUser.save(function(err) {
                done();
            })
        });
        afterEach(function(done){
            User.collection.drop();
            done();
        })
    })
})


//POST api/users edge case 1
/*describe('POST api/users', function() {
    it('Should not post properly', () => {
        chai.request(server)
        .post('/api/users')
    })
})*/

//GET api/auth
/*describe('GET /api/auth', () => {
    it('Should return user by id', () => {

    })
})*/