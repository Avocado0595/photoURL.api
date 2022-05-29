import request from 'supertest';
import app from '../../index.js';
import userModel from '../../src/resources/user/user.model.js';
describe("Test user path: api/user", () => {
  beforeAll((done) => {
    userModel.db.dropCollection();
    done();
});
  test("POST /create ----> {_id, userName, token} ", done => {
    request(app)
      .post("/api/user/create")
      .send({userName:"thanhxuan1", password:"Th@nhXu@n1"})
      .then(response => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });

  
});



// //During the test the env variable is set to test
// process.env.NODE_ENV = 'test';
// import userModel from '../../src/resources/user/user.model.js';
// //Require the dev-dependencies
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../index.js';
// chai.use(chaiHttp);
// chai.should();
// //Our parent block
// describe('User', () => {
//     before((done) => { //Before each test we empty the database
//         userModel.collection.drop({}, (err) => { 
//           done();           
//         });        
//     });
//   /*
//   * Test the /GET route
//   */
//   const validUser = {userName: 'thanhxuan01', password:'Th@nhXu@n01'};
//   let token='';
//   let id = '';
//   describe('/create user', () => {
//     //create valid user => ok
//       it('it should create a user', (done) => {
//         chai.request(app)
//             .post('/api/user/create')
//             .send(validUser)
//             .end((err, res) => {
//               res.should.have.status(201);
//               res.body.should.have.property('status').equal(true);
//               res.body.should.have.property('data').property('user').property('userName').equal(validUser.userName);
//               token = res.body.data.token;
//               id = res.body.data.user._id;
//               done();
//             });
//       });
      
//       it('it should not create a user without password', (done) => {
//         chai.request(app)
//             .post('/api/user/create')
//             .send({userName: validUser.userName})
//             .end((err, res) => {
//                   res.should.have.status(400);
//                   res.body.should.have.property('status').equal(false);
//                   res.body.should.have.property('message').equal('Invalid password');
//               done();
//             });
//       });
      
//       it('it should not create a user without username', (done) => {
//         chai.request(app)
//             .post('/api/user/create')
//             .send({password: validUser.password})
//             .end((err, res) => {
//                   res.should.have.status(400);
//                   res.body.should.have.property('status').equal(false);
//                   res.body.should.have.property('message').equal('Invalid user name');
//               done();
//             });
//       });
//       it('it should not create a user with invalid password', (done) => {
//         chai.request(app)
//             .post('/api/user/create')
//             .send({userName: validUser.userName, password: "password"})
//             .end((err, res) => {
//                   res.should.have.status(400);
//                   res.body.should.have.property('status').equal(false);
//                   res.body.should.have.property('message').equal('Invalid password');
//               done();
//             });
//       });

//       it('it should not create a user with invalid username', (done) => {
//         chai.request(app)
//             .post('/api/user/create')
//             .send({password: validUser.password, userName: "user 001"})
//             .end((err, res) => {
//                   res.should.have.status(400);
//                   res.body.should.have.property('status').equal(false);
//                   res.body.should.have.property('message').equal('Invalid user name');
//               done();
//             });
//       });
      
//   });

//   describe('/login user',()=>{
//     it('it should login a user', (done) => {
//       chai.request(app)
//           .post('/api/user/login')
//           .send(validUser)
//           .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.have.property('status').equal(true);
//             done();
//           });
//     });

//     it('it should not login a user wrong username', (done) => {
//       chai.request(app)
//           .post('/api/user/login')
//           .send({userName: 'user001',password: 'abc@@EF12'})
//           .end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.have.property('status').equal(false);
//                 res.body.should.have.property('message').equal('User not found.');
//             done();
//           });
//     });

//     it('it should not login a user wrong password', (done) => {
//       chai.request(app)
//           .post('/api/user/login')
//           .send({userName: validUser.userName,password: 'abc@@EF12'})
//           .end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.have.property('status').equal(false);
//                 res.body.should.have.property('message').equal('Password incorrect.');
//             done();
//           });
//     });
//   })

//   describe('/update user',()=>{
    
//     it('should: update display name, email, avatarPath', (done)=>{
//       chai.request(app)
//         .put(`/api/user/${id}`)
//         .set('authorization', token)
//         .send({displayName: "thanh xuân"})
//         .end((err, res)=>{
//           res.should.have.status(200);
//           res.body.should.have.property('status').equal(true);
//           done();
//         })
//     });

//     it('should: update password', (done)=>{
//       chai.request(app)
//         .put(`/api/user/password/${id}`)
//         .set('authorization', token)
//         .send({oldPassword: validUser.password, newPassword: "Th@nhXu@n02"})
//         .end((err, res)=>{
//           res.should.have.status(200);
//           res.body.should.have.property('status').equal(true);
//           done();
//         })
//     });

//     it('should not: update invalid display name', (done)=>{
//       chai.request(app)
//         .put(`/api/user/${id}`)
//         .set('authorization', token)
//         .send({displayName: ""})
//         .end((err, res)=>{
//           res.should.have.status(400);
//           res.body.should.have.property('status').equal(false);
//           res.body.should.have.property('message').equal('Invalid display name');
//           done();
//         })
//     })

//   })


// after((done) => { //Before each test we empty the database
//   userModel.collection.drop({}, (err) => { 
//     done();           
//   });        
// });
// });