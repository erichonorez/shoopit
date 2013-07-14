define(["backbone", "/assets/js/app/models/ShoopitItem.js", "localstorage"], function(Backbone, ShoopitItem) {
	
	var ShoopitItemCollection = Backbone.Collection.extend({
		
		model: ShoopitItem,

		localStorage: new Backbone.LocalStorage('shoopit'),

		//Get completed items
		completed: function() {
			this.filter(function(item) {
				this.get('isCompleted')
			});
		},

		remaining: function() {
			this.without.apply(this, this.completed);
		}
	});
	return ShoopitItemCollection;
	
});