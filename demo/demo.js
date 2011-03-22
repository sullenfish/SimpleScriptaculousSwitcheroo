var SimpleScriptaculousSwitcheroo = new Class.create({
	initialize: function(classPrefix) {
		this.triggerClass = classPrefix + 'Trigger';
		this.contentClass = classPrefix + 'Content';
		this.activeClass = classPrefix + 'Active';
		this.inactiveClass = classPrefix + 'Inactive';
		this.wrapperClass = classPrefix + 'Wrapper';
		this.trigger = $$('.' + this.triggerClass); // array of triggers, presumably buttons
		this.content = $$('.' + this.contentClass); // array of content elements, presumably divs but could be anything
		this.active = $$('.' + this.activeClass)[0]; // grab the currently active element
		this.wrapper = $$('.' + this.wrapperClass)[0]; // grab the wrapper element
		if (this.wrapper) {
			this.wrapper.setStyle({
				height: this.active.getHeight() + 'px',
				position: 'relative'
			});
		}
		this.active.setStyle({
			position: 'absolute'
		});
		this.content.each( function(item) { // prep inactive content for effects
			if (item.hasClassName(this.inactiveClass)) {
				item.setStyle({
					display: 'none',
					position: 'absolute'
				});
				item.removeClassName(this.inactiveClass);
			}
		}, this);
		this.trigger.each( function(item, index) {
			item.observe('click', function(event) {
				event.stop();
				this.switcheroo(this.content[index]);
			}.bind(this));
		}, this);
	},
	switcheroo: function(element) {
		if (element !== this.active) { // do not allow self-switching
			this.active.fade({
				duration: 0.5
			});
			element.appear({
				duration: 0.5
			});
			this.active = element;
			if (this.wrapper) {
				this.wrapper.morph({
					height: this.active.getHeight() + 'px'
				});
			}
		}
	}
});

var sssDemo = new SimpleScriptaculousSwitcheroo('sss');
var otherDemo = new SimpleScriptaculousSwitcheroo('other');