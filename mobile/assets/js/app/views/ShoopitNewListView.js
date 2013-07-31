define(['jquery', 'backbone'], function($, Backbone) {

	var ShoopitNewListView = Backbone.View.extend({

		el: $('#shoopit-new-list-page-container'),
		
		events: {
			'click #back-new-list-btn': 'back',
			'click #new-list-btn': 'new'
		},

		back: function(event) {
			Backbone.history.navigate('/', true);
			return false;
		},

		new: function(event) {
			_.each(this.collection.toArray(), function(item) {
				item.destroy();
			});
			Backbone.history.navigate('/', true);
			return false;
		}

	});
	return ShoopitNewListView;

});