const { usersCollection } = require('../../../constants');
const { DB } = require('../../database');
const { validateKeysExist } = require('../../helpers');

const userDocumentKeys = ['firstname', 'lastname', 'email', 'password'];
class UserService {
    static get collection() {
        return DB.collection(usersCollection);
    }

    async create(user) {
        validateKeysExist(userDocumentKeys, user);
        await UserService.collection.insertOne(user);
    }
    async findByEmail(email) {}
    async findById(id) {}
    async update(user) {}
}

module.exports = new UserService();