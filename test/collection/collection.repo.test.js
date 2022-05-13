//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
import userModel from '../../src/resources/user/user.model.js';
//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index.js';
chai.use(chaiHttp);
chai.should();
//Our parent block
describe('Collection Repo', () => {
    before((done) => { //Before each test we empty the database
        userModel.collection.drop({}, (err) => { 
          done();           
        });        
    });
  /*
  * Test the /GET route
  */
  const validCollection = {collectionName: 'test01'};
  let token='';
  let id = '';
  describe('/create collection', () => {
    //create valid user => ok
      it('it should create a collection', async (done) => {
        
      });
  });

after((done) => { //Before each test we empty the database
  userModel.collection.drop({}, (err) => { 
    done();           
  });        
});
});