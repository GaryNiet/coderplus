var CopyCell = function(width, height, x, y)
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
    this.cellType = 6;
    this.direction = 0;
    this.isBorder = false;
    this.setDirection();
    this.variable = null;

    this.buildable = true;
}

var inheritsFrom = function (child, parent)
{
    child.prototype = Object.create(parent.prototype);
};
inheritsFrom(CopyCell, PathCell);


CopyCell.prototype.threadVariableOperation = function(thread)//copy
{
    this.variable = thread.variable.copy();
    this.variable.x = this.x;
    this.variable.y = this.y;
}

Cell.prototype.twoVariableOperation = function(thread) //switch variables
{
    var switchVar = thread.variable;
    thread.variable = this.variable;
    this.variable = switchVar;

    this.variable.x = this.x;
    this.variable.y = this.y;
}


