define([
	"jquery",
	"backbone",
	"/assets/js/app/collections/ShoopitItemCollection.js",
	"/assets/js/app/views/ShoopitView.js",
	"/assets/js/app/views/ShoopitItemEditView.js",
	"/assets/js/app/views/ShoopitNewListDialogView.js"
], function($, Backbone , ShoopitItemCollection, ShoopitView, ShoopitItemEditView, ShoopitNewListDialogView) {

	var ShoopitRouter = Backbone.Router.extend({

		initialize: function() {
			this.collection = new ShoopitItemCollection();
			Backbone.history.start();
		},

		routes: {
			'': 'home',
			'edit/:id': 'edit',
			'new': 'create'
		},

		home: function() {
			$.mobile.changePage("#shoopit-page-container" , { reverse: false, changeHash: false } );
			//if the view is already instantiated don't instantiate it once again
			if (this.shoopitView) {
				return;
			}

			this.shoopitView = new ShoopitView({
				collection: this.collection
			});
		},

		edit: function(id) {
			$.mobile.changePage("#shoopit-edit-page-container" , { reverse: false, changeHash: false } );

			this.shoopitItemEditView = new ShoopitItemEditView({
				model: this.collection.get(id)
			});
		},

		create: function() {
			$.mobile.changePage("#shoopit-new-list-page-container", { reverse: false, changeHash: false } );
			if (this.shoopitNewListDialogView) {
				return;
			}
			this.shoopitNewListDialogView = new ShoopitNewListDialogView({
				collection: this.collection
			});
		}
	});
	return ShoopitRouter;
});