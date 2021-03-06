var KillCell = function(width, height, x, y, buildable)
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
    this.cellType = 7;
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
inheritsFrom(KillCell, PathCell);

KillCell.prototype.makeOperation = function(thread)
{
    thread.kill();
}