var Cell = function(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;


    
}

Cell.prototype.draw = function()
{
	ctx = myGameArea.context;
    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
}