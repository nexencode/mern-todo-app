const { MongoClient } = require('mongodb');
const config = require('../../config');
const { usersCollection } = require('../../constants');

const connectionString = `mongodb://${config.db.username}:${config.db.password}@localhost/${config.db.dbname}`;

class Database {
    async connect() {
        const client = new MongoClient(
            connectionString,
            {
                useUnifiedTopology: true,
                authSource: config.db.dbname
            }
        );
        
        // Open Connection
        this.connection = await client.connect();

        //Users: firstname, lastname, password, email (Should be uniqe)
        //unique indexes
        await this.DB
            .collection(usersCollection)
            .createIndex({ email: 1 }, { unique: true }); // can'ot add users with sam email!
    }

    async disconnect() {
        // Close connection
        this.connect.close();
    }

    // Return Database
    get DB() {
        try {
            return this.connection.db(config.db.dbname);
        } catch (error) {
            console.log('Database unavailable: ', error);
            return null;
        }
    }

}

//Export singlton instance of Database
module.exports = new Database();
