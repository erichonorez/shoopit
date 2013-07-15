define([
	"jquery",
	"backbone",
	"/assets/js/app/collections/ShoopitItemCollection.js",
	"/assets/js/app/views/ShoopitView.js"
], function($, Backbone , ShoopitItemCollection, ShoopitView, ShoopitFooter) {

	var ShoopitRouter = Backbone.Router.extend({

		initialize: function() {
			Backbone.history.start();
		},
		routes: {
			'': function() {
				var collection = new ShoopitItemCollection();
				this.shoopitView = new ShoopitView({
					collection: collection
				});
			}
		}
	});
	return ShoopitRouter;
});