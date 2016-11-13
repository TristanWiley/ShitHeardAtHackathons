import { Template } from 'meteor/templating';

import './main.html';

import { Post } from '../lib/models/Posts';

$.material.init()

Template.body.events({
    'submit form': function(event) {
        event.preventDefault();

        var newPost = new Post({
            content: $('#content').val(),
            name: $('#posterName').val()
        });

        newPost.save();
    },
    'click .fa-arrow-up': function(event) {
        var id = event.target.id;
        var post = Post.findOne(id);
        post.upVotes++;
        post.save();
    },
    'click .fa-arrow-down': function(event) {
        var id = event.target.id;
        var post = Post.findOne(id);
        post.upVotes--;
        post.save();
    }
});

Template.body.helpers({
    'posts': function() {
        return Post.find({}, { sort: { "publishedAt": -1 } })
    }
});