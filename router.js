const session = require('express-session');
const databaseManager = require('./databaseManager');



async function start(req,res){
    if (!req.session.language){
        res.render('index');
        return;
    }
    showClubs(req,res);
}


async function showClubs(req, res){
    try{
        if (!req.session.language) {
            req.session.language = req.query.language;
        }


        let clubs = await databaseManager.clubs();

        let data = {
            clubs: clubs
        };

        if (req.session.language == "de"){
            res.render('players-de', data);
        }
        else {
            res.render('players-en', data);
        }

    }
    catch (error){
        res.send('<h3>Es ist ein Fehler aufgetreten: </h3>' + error);
        console.log(error)
    }
}

async function showPlayers(req, res){
    try{
        let selectedClub = Number(req.query.verein);

        let player = await databaseManager.players(selectedClub);
        let clubs = await databaseManager.clubs();

        for (let i=0; i<clubs.length; i++){
            if (clubs[i].V_ID === selectedClub) {
                clubs[i].selected = "selected";
            }
        }

        let data = {
            clubs: clubs,
            player: player
        };

        if (req.session.language === "de"){
            res.render('players-de.hbs', data)
        }
        else {
            res.render('players-en.hbs', data)
        }
    }

    catch (error){
        res.send('<h3>Es ist ein Fehler aufgetreten: </h3>' + error);
        console.log(error)
    }
}



exports.start = start;
exports.showClubs = showClubs;
exports.showPlayers = showPlayers;

