define(['jquery', 'backbone'], function($, Backbone) {

	var ShoopitNewListDialogView = Backbone.View.extend({

		el: $('#dialog-content-container'),
		
		events: {
			'click #dialog-back-btn': 'back',
			'click #dialog-new-btn': 'new'
		},

		back: function(event) {
			this.trigger('back');
			return false;
		},

		new: function(event) {
			_.each(this.collection.toArray(), function(item) {
				item.destroy();
			});
			this.trigger('new');
			return false;
		}

	});
	return ShoopitNewListDialogView;

});