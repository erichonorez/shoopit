define([
	"jquery",
	"backbone",
	"/assets/js/app/models/ShoopitItem.js",
	"/assets/js/app/collections/ShoopitItemCollection.js",
	"/assets/js/app/views/ShoopitItemView.js"
], function($, Backbone, ShoopitItem, ShoopitItemCollection, ShoopitItemView) {

	var ShoopitView = Backbone.View.extend({
		el: $('#page-container'),

		events: {
			'keypress #new-item': 'createOnEnter',
			'change input[type=checkbox]': 'completeItem',
			'click a#filter-remaining': 'filterRemaining',
			'click a#filter-all': 'addAllItems',
			'click a#filter-bought': 'filterBought'
		},

		initialize: function() {
			this.$input = this.$('#new-item');
			this.$list = this.$('ul');

			this.listenTo(this.collection, 'add', this.addItem);
			this.listenTo(this.collection, 'reset', this.addAllItems);
			this.collection.fetch();
		},

		addItem: function(item) {
			var itemView = new ShoopitItemView({
				model: item
			});
			var element = itemView.render().el;
			this.$list.prepend(element);
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
			this.collection.add(item);
			item.save();

			this.$input.val('');
		},

		completeItem: function(event) {
			var id = $(event.target).attr('data-id');
			var item = this.collection.get(id);
			if (!item) {
				return;
			}
			item.toggle();
		},

		filterRemaining: function() {
			this.$list.html('');
			_.each(this.collection.remaining(), this.addItem, this);
		},

		filterBought: function() {
			this.$list.html('');
			_.each(this.collection.completed(), this.addItem, this);
		}
	});
	return ShoopitView;
});