define(["jquery", "backbone", "/assets/js/app/models/ShoopitItem.js"], function($, Backbone, ShoopitItem) {

	var ShoopitItemView = Backbone.View.extend({
		tagName: 'li',

		events: {
			'change input[type=checkbox]': 'isBoughtChangeEventHandler',
		},
		
		initialize: function() {
			this.template = this.options.template;
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.attr({
				'data-role': 'fieldcontain',
				'data-filer': true
			});
			return this;
		},

		/**
		 * Handler executed when the isBought property
		 * need to be toggled.
		 * Called each time a checkbox is checked or unchecked
		 */
		isBoughtChangeEventHandler: function(event) {
			this.model.toggleBought();
		},

	});
	return ShoopitItemView;

});