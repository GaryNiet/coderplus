var IfCell = function(width, height, x, y)
{
	this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "#44C958";
    this.isActive = true;
    this.links = [];
    this.cellType = 2;
    this.direction = 0;
    this.isBorder = false;
    this.setDirection();
    this.variable = null;

    this.buildable = true;
    this.textColor = "black";
    this.value = ">";
}

var inheritsFrom = function (child, parent)
{
   	child.prototype = Object.create(parent.prototype);
};
inheritsFrom(IfCell, OperationCell);


IfCell.prototype.twoVariableOperation = function(thread) //if operation
{
    if(thread.variable.value > this.variable.value)
    {
        //go through
    }
    else
    {
        var bestDirection = (thread.direction %4)+1;
        var otherDirection = ((bestDirection + 1)%4)+1;
        if(this.links[bestDirection] !== 'undefined' && this.links[bestDirection].cellType >= 2)
        {
            thread.direction = bestDirection;
        }
        else if(this.links[otherDirection] !== 'undefined' && this.links[otherDirection].cellType >= 2)
        {
            thread.direction = otherDirection;
        }
        else
        {
            thread.direction = ((thread.direction + 1)%4)+1;
        }
    }
}






