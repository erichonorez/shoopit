define(["jquery", "backbone"], function($, Backbone) {

	var ShoppingList = Backbone.Model.extend({
		defaults: {
			name: function() {
				var date = new Date();
				return date.getTime() + "new list";
			},
			isCompleted: false
		}
	});
	return ShoppingList;

});