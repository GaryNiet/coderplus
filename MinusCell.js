var MinusCell = function(width, height, x, y)
{
	this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "#0A92BF";
    this.isActive = true;
    this.links = [];
    this.cellType = 2;
    this.direction = 0;
    this.isBorder = false;
    this.setDirection();
    this.variable = null;

    this.buildable = true;
    this.textColor = "black";
    this.value = "-";
}

var inheritsFrom = function (child, parent)
{
   	child.prototype = Object.create(parent.prototype);
};
inheritsFrom(MinusCell, OperationCell);


MinusCell.prototype.twoVariableOperation = function(thread) //switch variables
{
	thread.variable.value -= this.variable.value;
}



