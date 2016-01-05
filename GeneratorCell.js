var GeneratorCell = function(width, height, x, y, buildable)
{
    this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "blue";
    this.isActive = true;
    this.cellType = 13;
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
inheritsFrom(GeneratorCell, PathCell);


GeneratorCell.prototype.threadVariableOperation = function(thread)//copy
{
    this.variable = thread.variable;
    thread.dropVariable();
}

GeneratorCell.prototype.cellVariableOperation = function(thread)//pick up
{
    thread.pickUpVariable(this.variable.copy());
}




