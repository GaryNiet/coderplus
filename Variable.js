var Variable = function(width, height, x, y, value) {
    this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.textColor = "white";
    this.fillColor = "blue";
    this.value = value;
}

Variable.prototype.draw = function()
{
    this.drawSimpleVariable();
    ctx.font = "20px Arial";
    ctx.fillText(String(this.value),this.x + cellSize/3, this.y + 3*cellSize/4);
}

Variable.prototype.customDraw = function(value)
{
    this.drawSimpleVariable();
    ctx.font = "12px Arial";
    ctx.fillText(value + " " + String(this.value),this.x + cellSize/3, this.y + 3*cellSize/4);
}

Variable.prototype.drawSimpleVariable = function()
{
    ctx = myGameArea.context;
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fillColor;
    ctx.beginPath();
    ctx.arc(this.x + cellSize/2, this.y + cellSize/2, cellSize*0.45, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = this.textColor;
}

Variable.prototype.copy = function(variable)
{
    var variable = new Variable(this.width, this.height, this.pos_x, this.pos_y, this.value);
    return variable;

}