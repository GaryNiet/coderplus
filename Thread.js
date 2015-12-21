var Thread = function(pos_x, pos_y, dest_x, dest_y)
{
	this.position_x = pos_x;//pixels
	this.position_y = pos_y;//pixels
	this.destination_x = dest_x;//pixels
	this.destination_y = dest_y; //pixels
	this.strokeColor = "grey";
	this.direction = 3; //0 = still // 1 = N // 2 = E // 3 = S // 4 = W
	this.pickedUpVariable = null;
	this.hasVariable = false;

}

Thread.prototype.update = function()
{
	if(this.destination_x > this.position_x)
	{
		this.position_x += 1;
	}
	else if(this.destination_x < this.position_x)
	{
		this.position_x -= 1;
	}

	if(this.destination_y > this.position_y)
	{
		this.position_y += 1;
	}
	else if(this.destination_y < this.position_y)
	{
		this.position_y -= 1;
	}

	if(this.destination_x == this.position_x && this.destination_y == this.position_y)
	{
		var next_dest = gameGrid.getNextDestination(this.direction, this.destination_x, this.destination_y);
		this.activateCell();
		this.pickUpVariable();
		this.destination_x = next_dest[0];
		this.destination_y = next_dest[1];
		this.direction = next_dest[2];
	}

	if(this.pickedUpVariable !== null)
	{
		this.pickedUpVariable.x = this.position_x;
		this.pickedUpVariable.y = this.position_y;
	}

}

Thread.prototype.draw = function()
{
	ctx = myGameArea.context;
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
	ctx.arc(this.position_x + cellSize/2, this.position_y + cellSize/2, cellSize/2, 0, 2 * Math.PI);
	ctx.stroke();
}

Thread.prototype.activateCell = function()
{
	var point = gameGrid.getSquare(this.position_x, this.position_y);
	var cell = gameGrid.table[point[0]][point[1]];
	cell.makeOperation(this);
}

Thread.prototype.pickUpVariable = function()
{
	var point = gameGrid.getSquare(this.position_x, this.position_y);
	var cell = gameGrid.table[point[0]][point[1]];
	gameGrid.variables.forEach(function(variable)
	{
		if(variable.x == cell.x && variable.y == cell.y)
		{
			this.pickedUpVariable = variable;
			this.hasVariable = true;
		}
	}.bind(this));
}

Thread.prototype.dropVariable = function()
{
	this.hasVariable = false;
	this.pickedUpVariable = null;
}
