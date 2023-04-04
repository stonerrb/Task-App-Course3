// CRUD create read update delete
//jshint esversion: 6

console.log("its starting?")

const mongodb = require('mongodb');
const assert = require('assert');
const { error } = require('console');

const MongoClient = mongodb.MongoClient;7
const connectionURL = 'mongodb://localhost:27017/test';
const databaseName = 'taskmanager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log('Cant connect DBS')
    }

    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'Andrew',
        age: 69
    }, (error,result) => {
        if(error) {
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    })
})