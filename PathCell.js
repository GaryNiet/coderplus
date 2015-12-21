var PathCell = function(width, height, x, y)
{
	this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "red";
    this.isActive = true;
    this.links = [];
    this.cellType = 2;
    this.direction = 0;
    this.isBorder = false;
    this.setDirection();
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
		if(link.cellType == 2)
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
	}
	if(myGameArea.key_A == true)
	{
		this.direction = 4;
	}
	if(myGameArea.key_S == true)
	{
		this.direction = 3;
	}
	if(myGameArea.key_D == true)
	{
		this.direction = 2;
	}
}