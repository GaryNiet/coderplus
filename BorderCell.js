var BorderCell = function(width, height, x, y)
{
	this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "black";
    this.isActive = true;
    this.readyThreads = 1;
    this.links = [];
    this.cellType = 1;
    this.variable = null;

    this.isBorder = true;

}

var inheritsFrom = function (child, parent)
{
   	child.prototype = Object.create(parent.prototype);
};
inheritsFrom(BorderCell, Cell);

