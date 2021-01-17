const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    database: 'bundesliga',
    user: 'Cemile',
    password: 'newPassword'
});

exports.connection = connection;

async function clubs(){
    try{
        let querydata = await connection.query(`select V_ID, Name from Verein`);
        let rows = querydata[0];

        if (rows !== null){
            return rows;
        }
    }
    catch (error){
        await Promise.reject('Es ist ein Fehler aufgetreten: ' + error);
    }
}

exports.clubs = clubs;

async function players(clubid){
    try{
        let querydata = await connection.query(`select Spieler_Name, Trikot_Nr from Spieler where Vereins_ID=${clubid}`);
        let rows = querydata[0];

        if (rows !== null){
            return rows;
        }
    }
    catch (error){
        await Promise.reject('Es ist ein Fehler aufgetreten: ' + error);
    }
}

exports.players = players;
exports.clubs = clubs;
