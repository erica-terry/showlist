'user strict';

var User = require('../models/users.js');
var Show = require('../models/shows.js');
var path = process.cwd() + '/views/showlist.html';


function UserHandler () {

    /*this.getShows = function (req, res) {
        
    User.get(req.params.id, function(err, user) {
            res.render('showlist', { otherUser : true });
        })
        
        User
            .findOne({ '_id': req.user._id })
            .exec(function (err, result) {
                if (err) throw err; 
                console.log('Get show for: '+req.user._id);
                
                res.json(result.shows);
            }
        );
    };*/
}

module.exports = UserHandler;