import { Template } from 'meteor/templating';

import './main.html';

import { Post } from '../lib/models/Posts';

Template.body.events({
	'submit form': function(event){
		event.preventDefault();

		var newPost = new Post({
			content: $('#content').val(),
			name: $('#posterName').val()
		});

		newPost.save();
	}
});

Template.body.helpers({
	'posts': function(){
		return Post.find({}, {sort: {"publishedAt": -1}})
	}
});
