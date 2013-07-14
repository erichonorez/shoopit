define(["jquery", "backbone"], function($, Backbone) {

	var ShoopitItem = Backbone.Model.extend({
		defaults: {
			name: '',
			isCompleted: false
		},
		toggle: function() {
			this.save({
				isCompleted: !this.get('isCompleted')
			})
		}
	});
	return ShoopitItem;

});