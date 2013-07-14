define([
	"jquery",
	"backbone",
	"/assets/js/app/models/ShoppingList.js",
	"/assets/js/app/views/ShoopitListItemView.js"], function($, Backbone, ShoppingList, ShoopitListItemView) {

	var ShoppingListIndexView = Backbone.View.extend({
		initialize: function() {
			this.template = _.template($('#shopping-list-index').html());
		},
		render: function() {
			this.$el.html(this.template(
				this.model
			));
			//iterate over the collection and render an instance of 
			//ShoopitListItemView for each
			_.each(this.collection.models, function(list) {
				var shoopitListItemView = new ShoopitListItemView({
					model: list
				});
				this.$('.ui-listview').append(shoopitListItemView.render().el);
			}, this);

			return this;
		}
	});
	return ShoppingListIndexView;

});