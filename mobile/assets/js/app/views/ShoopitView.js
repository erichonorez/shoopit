define([
	"jquery",
	"backbone",
	"/assets/js/app/models/ShoopitItem.js",
	"/assets/js/app/collections/ShoopitItemCollection.js",
	"/assets/js/app/views/ShoopitItemView.js"
], function($, Backbone, ShoopitItem, ShoopitItemCollection, ShoopitItemView) {

	var ShoopitView = Backbone.View.extend({
		el: $('#content-container'),

		events: {
			'keypress #new-item': 'createOnEnter'
		},

		initialize: function() {
			this.$input = this.$('#new-item');
			this.$list = this.$('ul');

			this.listenTo(this.collection, 'add', this.addItem);
			this.listenTo(this.collection, 'reset', this.addAllItems);
		},

		addItem: function(item) {
			var itemView = new ShoopitItemView({
				model: item
			});
			var element = itemView.render().el;
			this.$list.append(element);
			//refresh the list to rendre the new element
			this.$list.listview('refresh');
			this.$list.trigger('create');
		},

		addAllItems: function() {
			this.$list.html('');
			this.collection.each(this.addItem, this);
		},

		createOnEnter: function(event) {
			var name = this.$input.val().trim();
			if (event.which !== 13 || !name) {
				return;
			}

			var item = new ShoopitItem({
				id: this.collection.length + 1,
				name: name
			});
			this.collection.create(item.toJSON());
			console.log(this.collection.length);

			this.$input.val('');
		}
	});
	return ShoopitView;
});