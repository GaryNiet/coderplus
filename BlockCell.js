var BlockCell = function(width, height, x, y,buildable)
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
    this.cellType = 3;
    this.direction = 0;
    this.isBorder = false;
    
    this.buildable = buildable;

}

var inheritsFrom = function (child, parent)
{
    child.prototype = Object.create(parent.prototype);
};
inheritsFrom(BlockCell, Cell);

BlockCell.prototype.draw = function()
{

}

