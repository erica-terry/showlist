'user strict';

var Users = require('../models/users.js');
var Show = require('../models/shows.js');


function ShowHandler () {

    this.getShows = function (req, res) {
        Users
            .findOne({ '_id': req.user._id })
            .exec(function (err, result) {
                if (err) throw err; 
                console.log('Get show for: ' + req.user._id);
                
                res.json(result.shows)
            }
        );
    };

    
   this.addShow = function (req, res) {
       
        var show = new Show(req.body);
       
        Users
            .findById(req.user._id)
            .exec(function(err, user) {
                if(err) throw err;
                
                // If shows hasn't been created yet, create it
                if(!user.shows)
                    user.shows = [show];
                else user.shows.push(show);
                
                user.save(function(err, docs) {
                    if(err) throw err;
                    
                    res.json(docs);
                });
                
            });
    };
    
    this.deleteShow = function (req, res) {
        Users
            .findById(req.user._id)
            .exec(function(err, user){
                if(err) throw err;
                
                // Prevents server from crashing if item doesnt exist
                try {
                    user.shows.id(req.params._id).remove();
                } catch(e) {
                    res.send('Something went wrong!');
                }
                
                user.save(function(err,docs) {
                    if(err) throw err;
                    
                    res.json(docs);
                });
            })
    };
}

module.exports = ShowHandler;