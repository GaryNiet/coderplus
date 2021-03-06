var PathCell = function(width, height, x, y, buildable)
{
	this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "#782EB0";
    this.isActive = true;
    this.cellType = 2;
    this.direction = 0;
    this.isBorder = false;
    this.setDirection();
    this.variable = null;

    this.buildable = buildable;
}

var inheritsFrom = function (child, parent)
{
   	child.prototype = Object.create(parent.prototype);
};
inheritsFrom(PathCell, Cell);

PathCell.prototype.detectErrors = function()
{
	var pathCounter = 0;
	this.links.forEach(function(link)
	{
		if(link.cellType >= 2)
		{
			pathCounter += 1;
		}
	});

	if(pathCounter >2)
	{
		return true;
	}
	return false;
}

PathCell.prototype.setDirection = function()
{
	if(myGameArea.key_W == true)
	{
		this.direction = 1;
		this.fillColor = "yellow";
	}
	if(myGameArea.key_A == true)
	{
		this.direction = 4;
		this.fillColor = "yellow";
	}
	if(myGameArea.key_S == true)
	{
		this.direction = 3;
		this.fillColor = "yellow";
	}
	if(myGameArea.key_D == true)
	{
		this.direction = 2;
		this.fillColor = "yellow";
	}
}

PathCell.prototype.draw = function()
{
	Cell.prototype.draw.call(this);
	if(this.direction != 0)
	{
		if(this.direction == 1)
		{
			ctx.drawImage(image_up, this.x, this.y, this.width, this.height);
		}
		else if(this.direction == 2)
		{
			ctx.drawImage(image_right, this.x, this.y, this.width, this.height);
		}
		else if(this.direction == 3)
		{
			ctx.drawImage(image_down, this.x, this.y, this.width, this.height);
		}
		else if(this.direction == 4)
		{
			ctx.drawImage(image_left, this.x, this.y, this.width, this.height);
		}
	}
	
	
}
