var AddCell = function(width, height, x, y)
{
	this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "grey";
    this.isActive = true;
    this.links = [];
    this.cellType = 2;
    this.direction = 0;
    this.isBorder = false;
    this.setDirection();
    this.variable = null;
    this.hasVariable = false;
}

var inheritsFrom = function (child, parent)
{
   	child.prototype = Object.create(parent.prototype);
};
inheritsFrom(AddCell, PathCell);

AddCell.prototype.makeOperation = function(thread)
{
	if(thread.hasVariable && this.hasVariable)
	{
		//add
	}
	else if(thread.hasVariable)
	{
		this.variable = thread.pickedUpVariable;
		thread.dropVariable();
		this.hasVariable = true;
	}
	else if(this.hasVariable)
	{
		//pick up
	}
}

