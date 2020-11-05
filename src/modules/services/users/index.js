const { ObjectID } = require('mongodb');
const { usersCollection } = require('../../../constants');
const { DB } = require('../../database');
const { validateKeysExist } = require('../../helpers');

const userRequireKeys = ['firstname', 'lastname', 'email', 'password'];
class UserService {
    static get collection() {
        return DB.collection(usersCollection);
    }

    async create(user) {
        validateKeysExist(userRequireKeys, user);
        await UserService.collection.insertOne(user);
    }
    
    async findByEmail(email) {
        return await UserService.collection.findOne({email});
    }

    async findById(id) {
        return await UserService.collection.findOne({
            _id: new ObjectID(id)
        })
    }

    async update(user) {}
}

module.exports = new UserService();