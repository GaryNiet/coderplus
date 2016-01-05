var DropCell = function(width, height, x, y, buildable)
{
    this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "yellow";
    this.isActive = true;
    this.cellType = 12;
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
inheritsFrom(DropCell, PathCell);


DropCell.prototype.threadVariableOperation = function(thread)
{
    this.variable = thread.variable;
    thread.dropVariable();
}




