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
			$.mobile.changePage("#page-container" , { reverse: false, changeHash: false } );
			this.shoopitView = new ShoopitView({
				collection: this.collection
			});
			
			//routing events
			this.listenTo(this.shoopitView, 'create', function() {
				this.navigate('/new', true);
			});
		},

		edit: function(id) {
			$.mobile.changePage("#edit-page-container" , { reverse: false, changeHash: false } );
			this.collection.fetch();

			this.shoopitItemEditView = new ShoopitItemEditView({
				model: this.collection.get(id)
			});

			//routing events
			this.listenTo(this.shoopitItemEditView, 'goToHome', function() {
				this.navigate('/', true);
			});
		},

		create: function() {
			$.mobile.changePage( "#dialog-container", { transition: "none", role: "dialog"} );

			this.shoopitNewListDialogView = new ShoopitNewListDialogView({
				collection: this.collection
			});
			
			//routing events
			this.listenTo(this.shoopitNewListDialogView, 'back', function() {
				this.navigate('/', true);
			});

			this.listenTo(this.shoopitNewListDialogView, 'new', function() {
				this.navigate('/', true);
				this.collection.trigger('reset');
			});
		}
	});
	return ShoopitRouter;
});