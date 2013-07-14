define([
	"jquery",
	"backbone",
	"/assets/js/app/models/ShoppingList.js",
	"/assets/js/app/models/collections/ShoppingListCollection.js",
	"/assets/js/app/views/ShoppingListViews.js",
	"/assets/js/app/views/ShoopitHeader.js",
], function($, Backbone, ShoppingList, ShoppingListCollection, ShoppingListIndexView, ShoopitHeader) {

	var AppView = Backbone.View.extend({
		initialize: function() {
			this.shoppingListCollection = new ShoppingListCollection();
			this.shoppingListIndexView = new ShoppingListIndexView({
				el: $('#main-container'),
				collection: this.shoppingListCollection,
				model: {
					title: 'Hello, World!'
				}
			});
			this.shoopitHeader = new ShoopitHeader({
				el: $('#main div[data-role=header]')
			});
		},
		render: function() {
			this.shoopitHeader.render();
			this.shoppingListIndexView.render();
			return this;
		}
	});
	return AppView;

});