define(["backbone", "/assets/js/app/models/ShoppingList.js"], function(Backbone, ShoppingList) {
	
	var ShoppingListCollection = Backbone.Collection.extend({
		model: ShoppingList
	});
	return ShoppingListCollection;
	
});