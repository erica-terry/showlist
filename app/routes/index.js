// app/routes.js
'use strict';

var path = process.cwd();
var ShowHandler = require('../controllers/showHandler.server.js');

module.exports = function(app, passport) {

    app.get('/', isLoggedIn, function(req, res) {
        res.redirect('/showlist')  // load the index.ejs file
    });

    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login', { message: req.flash('loginMessage'), user : req.user }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : 'showlist', // redirect to the secure profile section
        failureRedirect : 'login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage'), user : req.user });
    });

    // process the signup form
     app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : 'profile', // redirect to the secure profile section
        failureRedirect : 'signup', // redirect back to the signup page if there is an error
        failureFlash    : true // allow flash messages
    }));

   
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    
    
    /////////////// Routes for showlist ////////////////
    
    var showHandler = new ShowHandler();
    
    app.get('/showlist', isLoggedIn, function(req, res) {
        res.render('showlist', { user : req.user});
    });

    app.route('/api/showlist')
        .get(isLoggedIn, showHandler.getShows)
        .post(isLoggedIn, showHandler.addShow);
        
        
    app.route('/api/showlist/delete/:_id')
        .delete(isLoggedIn, showHandler.deleteShow);
        
    /*
    app.get('/api/showlist/:id', function(req, res) {
        User.get(req.params.id, function(err, user) {
            res.render('showlist', { otherUser : true });
        })
    }); 
    */


    /*
    app.route('/showlist/edit/:_id')
        .getUpdate(isLoggedIn, showHandler.editShow)
        .editUpdate(isLoggedIn, showHandler.editShow);

    */
    
    //The 404 Route (ALWAYS Keep this as the last route)
    app.use(function(req, res, next){
      res.status(404).render('notfound');
    });
    
   
}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

     // if they aren't redirect them to the home page
    else res.render('index', { user : req.user });
}



