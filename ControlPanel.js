var ControlPanel = function(width, height, offset) {
  this.width = width;
  this.height = height;
  this.offset_x = offset;

  this.buttons = [];
  this.buttons.push(new Button(this.offset_x, 0, 100,100, "start"));

  

  this.drawButtons();
}

ControlPanel.prototype.drawButtons = function()
{
	this.buttons.forEach(function(button)
	{
		button.draw();
	});
}

ControlPanel.prototype.buttonClicked = function(x,y)
{
	this.buttons.forEach(function(button)
	{
		button.click(x,y);
	});
}
