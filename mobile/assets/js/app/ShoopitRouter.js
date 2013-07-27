define([
	"jquery",
	"backbone",
	"/assets/js/app/collections/ShoopitItemCollection.js",
	"/assets/js/app/views/ShoopitView.js",
	"/assets/js/app/views/ShoopitItemEditView.js"
], function($, Backbone , ShoopitItemCollection, ShoopitView, ShoopitItemEditView) {

	var ShoopitRouter = Backbone.Router.extend({

		initialize: function() {
			this.collection = new ShoopitItemCollection();
			Backbone.history.start();
		},

		routes: {
			'': 'home',
			'edit/:id': 'edit'
		},

		home: function() {
			$.mobile.changePage("#page-container" , { reverse: false, changeHash: false } );
			//console.log('fuck');
			this.shoopitView = new ShoopitView({
				collection: this.collection
			});
		},

		edit: function(id) {
			$.mobile.changePage("#edit-page-container" , { reverse: false, changeHash: false } );
			this.collection.fetch();

			this.shoopitItemEditView = new ShoopitItemEditView({
				model: this.collection.get(id)
			});

			this.listenTo(this.shoopitItemEditView, 'goToHome', function() {
				this.navigate('/', true);
			});
		}
	});
	return ShoopitRouter;
});