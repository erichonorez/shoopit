define(["jquery", "backbone"], function($, Backbone) {

	var ShoopitItemEditView = Backbone.View.extend({
		el: $('#shoopit-edit-page-container'),

		events: {
			'submit #edit-item-form': 'save',
			'click a#cancel-btn': 'cancel'
		},

		initialize: function() {
			this.$('#item-name-input').val(this.model.get('name'));
		},

		save: function(event) {
			this.model.save({
				'name': this.$('#item-name-input').val()
			});
			Backbone.history.navigate('/', true);
			return false;
		},

		cancel: function() {
			Backbone.history.navigate('/', true);
			return false;
		}

	});
	return ShoopitItemEditView;

});