define(["jquery", "backbone", "/assets/js/app/models/ShoopitItem.js"], function($, Backbone, ShoopitItem) {

	var ShoopitItemView = Backbone.View.extend({
		tagName: 'li',
		
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
		}

	});
	return ShoopitItemView;

});