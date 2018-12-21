import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

import './main.html';

//Change sign-in option from email to username only
Accounts.ui.config ({
	passwordSignupFields: 'USERNAME_ONLY'

});

Meteor.subscribe('notes');

Template.body.helpers({

	notes() {
		return Notes.find({});
	}
});


Template.addNote.events ({
	'submit .add-form' : function(event){
	event.preventDefault();

	//stores input in value "text"
	const target=event.target;
	const text=target.text.value;

	
		Meteor.call('notes.insert', text);
		
		//clears form after submit
		target.text.value='';

		//closes the modal after submit
		$('#addModal').modal('close');

		return false;
	} 
});

//deletes an entry from collection after delete is clicked 
Template.note.events ({
	'click .delete-note': function(){
		if (confirm("Are you sure you want to delete this note?")){

         Meteor.call('notes.remove', this, function (error, result){
         	if (error) {
         		alert("You didn't create the note, so you can't delete it!");
         	}
         	else {
         		alert("Entry has been deleted!");
         	}
         });
    }
		return false;
	}
});







