define([
	"jquery",
	"backbone",
	"/assets/js/app/collections/ShoopitItemCollection.js",
	"/assets/js/app/views/ShoopitView.js"
], function($, Backbone , ShoopitItemCollection, ShoopitView) {

	var ShoopitRouter = Backbone.Router.extend({

		initialize: function() {
			Backbone.history.start();
		},
		routes: {
			'': function() {
				this.shoopitView = new ShoopitView({
					collection: new ShoopitItemCollection()
				});
			}
		}
	});
	return ShoopitRouter;
});