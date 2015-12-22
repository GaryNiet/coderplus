var IfCell = function(width, height, x, y)
{
	this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "purple";
    this.isActive = true;
    this.links = [];
    this.cellType = 2;
    this.direction = 0;
    this.isBorder = false;
    this.setDirection();
    this.variable = null;
}

var inheritsFrom = function (child, parent)
{
   	child.prototype = Object.create(parent.prototype);
};
inheritsFrom(IfCell, OperationCell);


IfCell.prototype.twoVariableOperation = function(thread) //if operation
{
    if(thread.variable.value >= this.variable.value)
    {
        //go through
    }
    else
    {
        thread.direction = (thread.direction %4)+1;
    }
}






