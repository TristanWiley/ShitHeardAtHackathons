import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

import './main.html';

import { Post } from '../lib/models/Posts';

Template.body.events({
	'submit form': function(event) {
		event.preventDefault();

		var newPost = new Post({
			content: $('#content').val(),
			name: $('#posterName').val()
		});

		$('#content').val("");
		$('#posterName').val("");

		newPost.save();
	},
	'click .fa-arrow-up': function(event) {
		var id = event.target.id;
		console.log(id, localStorage.getItem(id));
		if (!localStorage.getItem(id)) {
			var post = Post.findOne(id);
			post.upVotes++;
			$(event.target).css('color', 'green');
			post.save({fields: ['upVotes']});

			localStorage.setItem(id, 'up');
		}
	},
	'click .fa-arrow-down': function(event) {
		var id = event.target.id;

		if (!localStorage.getItem(id)) {
			var post = Post.findOne(id);
			post.upVotes--;
			$(event.target).css('color', 'red');
			post.save({fields: ['upVotes']});

			localStorage.setItem(id, 'down');
		}
	},
	'click #sortDate': function(event){
		event.preventDefault();
		Session.set('sortBy', 'date');
	},
	'click #sortUp': function(){
		event.preventDefault();
		Session.set('sortBy', 'up');
	}
});

Template.body.helpers({
	'posts': function() {
		if (Session.get('sortBy') == 'up'){
			return Post.find({}, { sort: { "upVotes": -1 } })
		} else {
			return Post.find({}, {sort: {"createdAt": -1}})
		}
	}
});

Tracker.autorun(function () {
	setTimeout(()=>{
		for (var i = 0; i < localStorage.length; i++){
			const id = localStorage.key(i);
			const type = localStorage.getItem(id);

			if (id && id.length==17) {
				if (type === "up") {
					const selector = '.fa-arrow-up'+'#' + id;
					$(selector).css('color', 'green');
				} else {
					const selector = '.fa-arrow-down'+'#' + id;
					$(selector).css('color', 'red');
				}
			}
		}
	}, 10);
});

Handlebars.registerHelper('breaklines', function(text){
	return new Handlebars.SafeString(text.replace(/(\r\n|\n|\r)/gm, '<br>'));
});