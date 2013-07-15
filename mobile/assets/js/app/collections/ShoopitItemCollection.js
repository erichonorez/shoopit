define(["backbone", "/assets/js/app/models/ShoopitItem.js", "localstorage"], function(Backbone, ShoopitItem) {
	
	var ShoopitItemCollection = Backbone.Collection.extend({
		
		model: ShoopitItem,

		localStorage: new Backbone.LocalStorage('shoopit'),

		//Get completed items
		completed: function() {
			return this.filter(function(item) {
				return item.get('isCompleted')
			});
		},

		remaining: function() {
			return this.without.apply(this, this.completed());
		}
	});
	return ShoopitItemCollection;
	
});