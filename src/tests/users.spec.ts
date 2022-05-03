import request from 'supertest';
import { expressLoader, mongooseLoader } from "../app/loaders";
import { seedDb } from "../app/utils/seed.db";
import { User } from "../modules/users/user.entity";

const app = expressLoader();

beforeEach(async () => {
    await mongooseLoader();
    await seedDb();
});

afterEach(async () => {
    await User.deleteMany();
});

test('should sign up a new user', (done) => {
    request(app)
        .post('/auth/signup')
        .send({
            "email": "fred@dev.com",
            "password": "PassWord",
            "fullname": "Fred Frandky",
            "birthdate": new Date().toLocaleDateString()
        })
        .expect(200)
        .then((res) => {
            // console.log(res.body);
            expect(res.body.email).toBe('fred@dev.com');
            expect(res.body.fullname).toBe('Fred Frandky');
            done();
        });
});

test('should sign in with email and password', (done) => {
    request(app)
        .post('/auth/signin')
        .send({
            "email": "peter@dev.com",
            "password": "PassWord"
        })
        .expect(200)
        .then((res) => {
            // console.log(res.body);
            expect(typeof res.body['X-AUTH-TOKEN']).toBe('string');
            done();
        });
});