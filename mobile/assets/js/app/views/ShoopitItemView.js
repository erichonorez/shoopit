define(["jquery", "backbone", "/assets/js/app/models/ShoopitItem.js"], function($, Backbone, ShoopitItem) {

	var ShoopitItemView = Backbone.View.extend({
		tagName: 'li',

		events: {
			'change input[type=checkbox]': 'isBoughtChangeEventHandler',
			'click a.remove-btn': 'removeItemEventHandler',
			'click a.remove-icon': 'displayRemoveButtonEventHandler',
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
		/**
		 * Handler executed when the remove button is pushed.
		 */
		removeItemEventHandler: function(event) {
			//hide item from the list
			$('.item-' + this.model.get('id') + '-container')
				.closest('li')
				.hide(500);
			//remove the item from persistence layer
			this.model.destroy();
		},

		/**
		 * Handler executed to display the remove button
		 * associated to the item
		 */
		displayRemoveButtonEventHandler: function(event) {
			var icon = event.target;
			if ($(icon).closest('.ui-grid-b').find('.remove-btn').is(':visible')){
				$(icon).css('transform', 'rotate(180deg)');
				$(icon).closest('.ui-grid-b').find('.remove-btn').hide();
				$(icon).closest('.ui-grid-b').find('.edit-item-btn').show();
			} else {
				$(icon).css('transform', 'rotate(90deg)');
				$(icon).closest('.ui-grid-b').find('.remove-btn').show();
				$(icon).closest('.ui-grid-b').find('.edit-item-btn').hide();
			}
		},

	});
	return ShoopitItemView;

});