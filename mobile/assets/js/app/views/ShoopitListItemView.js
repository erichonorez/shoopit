define(["jquery", "backbone", "/assets/js/app/models/ShoppingList.js"], function($, Backbone, ShoppingList) {

	var ShoopitListItemView = Backbone.View.extend({
		tagName: 'li',
		initialize: function() {
			this.template = _.template($('#shoopit-list-item').html());
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	return ShoopitListItemView;

});