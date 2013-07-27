define(["jquery", "backbone"], function($, Backbone) {

	var ShoopitItemEditView = Backbone.View.extend({
		el: $('#edit-page-container'),

		events: {
			'submit #edit-item-form': 'save'
		},

		initialize: function() {
			this.$('#item-name-input').val(this.model.get('name'));
		},

		save: function(event) {
			this.model.save({
				'name': this.$('#item-name-input').val()
			});
			this.trigger('goToHome');
			
			return false;
		}

	});
	return ShoopitItemEditView;

});