import { Meteor } from 'meteor/meteor';

import '../lib/collections.js';


Meteor.startup(() => {
	Meteor.publish('notes', function(){
		return Notes.find();
	});
  // code to run on server at startup

});
