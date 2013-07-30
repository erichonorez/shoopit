define(['jquery', 'backbone'], function($, Backbone) {

	var ShoopitNewListDialogView = Backbone.View.extend({

		el: $('#dialog-content-container'),
		
		events: {
			'click #dialog-back-btn': 'back',
			'click #dialog-new-btn': 'new'
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
	return ShoopitNewListDialogView;

});