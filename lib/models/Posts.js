import { Class } from 'meteor/jagi:astronomy';

const Posts = new Mongo.Collection('posts');


export const Post = Class.create({
	name: 'Post',
	collection: Posts,
	fields: {
		content: {
			type: String,
			validators: [{
				type: 'minLength',
				param: 3
			}, {
				type: 'maxLength',
				param: 5000
			}]
		},
		upVotes: {
			type: Number,
			default: 0
		},
		publishedAt: {
			type: Date,
			default: new Date()
		},
		name: String
	},
	secured: false
});