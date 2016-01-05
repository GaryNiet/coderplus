var OperationCell = function(width, height, x, y, buildable)
{
	this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "grey";
    this.isActive = true;
    this.cellType = 9;
    this.direction = 0;
    this.isBorder = false;
    this.setDirection();
    this.variable = null;
    this.textColor = "black";
    this.value = "-";

    this.buildable = buildable;
}

var inheritsFrom = function (child, parent)
{
   	child.prototype = Object.create(parent.prototype);
};
inheritsFrom(OperationCell, PathCell);

OperationCell.prototype.threadVariableOperation = function(thread)
{
	this.variable = thread.variable;
	thread.dropVariable();
}

OperationCell.prototype.draw = function()
{
	ctx = myGameArea.context;
	ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.textColor;
    ctx.font = "20px Arial";
    ctx.fillText(this.value,this.x + cellSize/3, this.y + 3*cellSize/4);
    this.drawVariable();
}

OperationCell.prototype.drawVariable = function()
{
	if(this.hasVariable())
    {
    	this.variable.customDraw(this.value);
    }
}
