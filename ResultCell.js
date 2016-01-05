var ResultCell = function(width, height, x, y, buildable)
{
	this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "pink";
    this.fillColor = "pink";
    this.isActive = true;
    this.cellType = 10;
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
inheritsFrom(ResultCell, PathCell);

ResultCell.prototype.twoVariableOperation = function(thread) 
{
    if(thread.variable.value == this.variable.value)
    {
        alert("win");
    }
}

ResultCell.prototype.cellVariableOperation = function(thread)
{
    //move along
}