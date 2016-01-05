var LevelButton = function(posx, posy, width, height, text, value)
{
	this.posx = posx;
	this.posy = posy;
	this.width = width;
	this.height = height;
	this.text = text;
	this.value = value;

	this.fillColor = "grey";
  	this.strokeColor = "black";
  	this.textColor = "white";
  	this.lineWidth = 3;
}

var inheritsFrom = function (child, parent)
{
   	child.prototype = Object.create(parent.prototype);
};
inheritsFrom(LevelButton, Button);

LevelButton.prototype.click = function(x,y)
{
	if(x >= this.posx && x<=this.posx + this.width && y >= this.posy && y<= this.posy + this.height)
	{
		loadLevel(this.value);
	}
}