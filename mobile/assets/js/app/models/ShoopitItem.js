define(["jquery", "backbone"], function($, Backbone) {

	var ShoopitItem = Backbone.Model.extend({
		defaults: {
			name: '',
			isBought: false
		},
		toggleBought: function() {
			this.save({
				isBought: !this.get('isBought')
			});
		}
	});
	return ShoopitItem;

});