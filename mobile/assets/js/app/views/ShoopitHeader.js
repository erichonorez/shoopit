define(["jquery", "backbone"], function($, Backbone) {

	var ShoopitHeader = Backbone.View.extend({
		events: {
			'click #shoopit-header-add-btn': 'addList'
		},
		initialize: function() {
			this.template = _.template($('#shoopit-header').html());
		},
		render: function() {
			this.$el.html(this.template());
		},
		addList: function() {
			Backbone.history.navigate('add/', true);
			$.mobile.changePage('#add-list' , { reverse: false, changeHash: false } );
		}
	});
	return ShoopitHeader;

});