define([
	"jquery",
	"backbone",
	"/assets/js/app/models/ShoopitItem.js",
	"/assets/js/app/collections/ShoopitItemCollection.js",
	"/assets/js/app/views/ShoopitItemView.js"
], function($, Backbone, ShoopitItem, ShoopitItemCollection, ShoopitItemView) {

	var ShoopitView = Backbone.View.extend({
		el: $('#page-container'),
		currentFilter: 'all',
		currentMode: 'view',

		events: {
			'keypress #new-item': 'createOnEnter',
			'change input[type=checkbox]': 'completeItem',
			'click a#filter-remaining': 'filterRemaining',
			'click a#filter-all': 'addAllItems',
			'click a#filter-bought': 'filterBought',
			'click a#edit-btn': 'edit',
			'click a#new-btn': 'create',
			'click a#cancel-btn': 'cancel',
			'click a#save-btn': 'save',
			'click a.remove-icon': 'displayRemoveButton',
			'click a.remove-btn': 'remove',
			'click a.edit-item-link': 'goToEditPage'
		},

		initialize: function() {
			this.$input = this.$('#new-item');
			this.$list = this.$('ul');

			//event listeners on collection
			this.listenTo(this.collection, 'add', this.addItem);
			this.listenTo(this.collection, 'reset', this.addAllItems);

			this.collection.fetch();
		},
		/**
		 * Methods called to render a new item in the listview
		 */
		addItem: function(item) {
			//getCurrentItemTemplate is called to retrieve the
			//template the ShoopitItemView has to use to render
			//the item. It depends on the current mode : edit or view
			var itemView = new ShoopitItemView({
				model: item,
				template: this.getCurrentItemTemplate()
			});
			//prepend the element to the list (-> like sort desc)
			var element = itemView.render().el;
			this.$list.prepend(element);
			
			//listen for event
			this.stopListening(item, 'change:isCompleted'); //to be sure to not attach two time the same event
			this.listenTo(item, 'change:isCompleted', this.hideItem); //see comment on hideItem function

			//refresh the list to rendre the new element - JQM specific
			this.$list.listview().listview('refresh');
			this.$list.trigger('create');
		},

		/**
		 * When a item change sometimes this one shouldn't be visible anymore
		 * in the list (-> if you are on the remaining, you check the item, this one
		 * should disappear.)
		 *
		 * Better performance than re-rendering the list.
		 */
		hideItem: function(item) {
			//never hide item when 'all' filter is active
			if (this.currentFilter == 'all') {
				return;
			}
			//otherwise
			$('.item-' + item.get('id') + '-container')
				.closest('li')
				.hide(500);
		},
		/**
		 * Display all elements
		 */
		addAllItems: function() {
			this.currentFilter = 'all';
			$('.filter').removeClass('ui-btn-active');
			$('#filter-all').addClass('ui-btn-active');

			this.$list.html('');
			this.collection.each(this.addItem, this);
		},
		/**
		 * Create an element when the user fill in the input
		 * box and press return button
		 */
		createOnEnter: function(event) {
			var name = this.$input.val().trim();
			//if the pressed button isn't return or if the name
			//is empty -> exit
			if (event.which !== 13 || !name) {
				return;
			}
			//create a new item and save it
			var item = new ShoopitItem({
				id: this.collection.length + 1,
				name: name
			});
			this.collection.add(item);
			item.save();

			this.$input.val('');
		},
		/**
		 * Mark an item as bought
		 */
		completeItem: function(event) {
			var id = $(event.target).attr('data-id');
			var item = this.collection.get(id);
			if (!item) {
				return;
			}
			item.toggle();
		},
		/**
		 * Display only item to buy
		 */
		filterRemaining: function(event) {
			this.currentFilter = 'remaining';
			$('.filter').removeClass('ui-btn-active');
			$('#filter-remaining').addClass('ui-btn-active');

			this.$list.html('');
			_.each(this.collection.remaining(), this.addItem, this);
		},
		/**
		 * Display item bought
		 */
		filterBought: function(event) {
			this.currentFilter = 'bought';
			$('.filter').removeClass('ui-btn-active');
			$('#filter-bought').addClass('ui-btn-active');

			this.$list.html('');
			_.each(this.collection.completed(), this.addItem, this);
		},
		/**
		 * Enter in the edit mode
		 */
		edit: function(event) {
			this.currentMode = 'edit';
			//replace the header
			$('#header-container').html(
				$('#shoopit-header-edit-tpl').html()
			);
			//re-render the header by JQM
			$('#header-container').trigger('create');
			//re-render the list
			this.renderView();
		},
		/**
		 * Remove the item
		 */
		remove: function(event) {
			var btn = $(event.target).closest('.remove-btn');
			var id = btn.attr('data-id');
			//get item from the persistence layer
			var item = this.collection.get(id);
			//hide item from the list
			$('.item-' + item.get('id') + '-container')
				.closest('li')
				.hide(500);
			//remove the item from persistence layer
			item.destroy();
		},
		/**
		 * Display the error button
		 */
		displayRemoveButton: function(event) {
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

		create: function(event) {
			this.trigger('create');
			return false;
		},
		/**
		 * Go bacl to the view mode
		 */
		cancel: function(event) {
			this.currentMode = 'view';
			//change the header
            $('#header-container').html(
 	            $('#shoopit-header-tpl').html()
			);
            $('#header-container').trigger('create');
            //re-render list
			this.renderView();
		},
		/**
		 * Render the list item according to the current
		 * filter
		 */
		renderView: function() {
			switch(this.currentFilter) {
				case 'remaining':
					this.filterRemaining();
					break;
				case 'bought':
					this.filterBought();
					break;
				default:
					this.addAllItems();
					break;
			}
		},
		/**
		 * Return the template object to use to render
		 * list item according to the active mode: view or edit
		 */
		getCurrentItemTemplate: function() {
			switch (this.currentMode) {
				case 'edit':
					if (!this.itemEditTemplate) {
						this.itemEditTemplate = 
							_.template($('#shoopit-item-edit-tpl').html());
					}
					return this.itemEditTemplate;
					break;
				default:
					if (!this.itemViewTemplate) {
						this.itemViewTemplate = 
							_.template($('#shoopit-item-tpl').html());
					}
					return this.itemViewTemplate;
					break;
			}
		},

		goToEditPage: function(event) {
			var id = $(event.target).closest('a').attr('data-id');
			Backbone.history.navigate('#/edit/' + id);

		}
	});
	return ShoopitView;
});