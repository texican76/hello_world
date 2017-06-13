var Project     = require("../models/project");
var Assignment  = require("../models/assignment");
var Member      = require("../models/member");

// all the middleare goes here    
var middlewareObj = {};

// =====================
//   PROJECT OWNERSHIP
// =====================

middlewareObj.checkProjectOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Project.findById(req.params.id, function(err, foundProject){
           if(err){
               req.flash("error", "Project not found");
               res.redirect("back");
           }  else {
               // does user own the project?
            if(foundProject.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

// =======================
//   ASSIGNMENT OWNERSHIP
// =======================

middlewareObj.checkAssignmentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Assignment.findById(req.params.id, function(err, foundAssignment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the assignment?
            if(foundAssignment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

// ====================
//   MEMBER OWNERSHIP
// ====================

middlewareObj.checkMemberOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Member.findById(req.params.id, function(err, foundMember){
           if(err){
               req.flash("error", "Member not found");
               res.redirect("back");
           }  else {
               // does user own the project?
            if(foundMember.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;