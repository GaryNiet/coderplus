var Cell = function(width, height, strokeColor, fillColor, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;


    
}

Cell.prototype.draw = function()
{
	ctx = myGameArea.context;
	ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
}