define([
	"jquery",
	"backbone",
	"/assets/js/app/views/AppView.js"
], function($, Backbone , AppView) {

	var ShoopitRouter = Backbone.Router.extend({

		initialize: function() {
			Backbone.history.start();
		},
		routes: {
			'': function() {
				this.appView = new AppView();
				this.appView.render();
				//this.shoppingListIndexView.render();
				$.mobile.changePage('#main' , { reverse: false, changeHash: false } );
			},
			'add': function() {
				$.mobile.changePage('#add-list' , { reverse: false, changeHash: false } );
			}
		}
	});
	return ShoopitRouter;
});