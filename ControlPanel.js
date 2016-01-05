var ControlPanel = function(width, height, offset) {
  this.width = width;
  this.height = height;
  this.offset_x = offset;

  this.buttons = [];
  this.buttons.push(new Button(this.offset_x, 0, 100,100, "start", start));
  this.buttons.push(new Button(this.offset_x + 100, 0, 100,100, "stop", stop));
  this.buttons.push(new Button(this.offset_x, 100, 100,100, "save", saveLevel));
  this.buttons.push(new Button(this.offset_x + 100, 100, 100,100, "reset", resetLevel));

  this.buttons.push(new LevelButton(this.offset_x, 300, 200,50, "level 1", 1));
  this.buttons.push(new LevelButton(this.offset_x, 350, 200,50, "level 2", 2));

  

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
