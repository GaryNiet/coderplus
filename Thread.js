var Thread = function(pos_x, pos_y, dest_x, dest_y)
{
	this.position_x = pos_x;//pixels
	this.position_y = pos_y;//pixels
	this.destination_x = dest_x;//pixels
	this.destination_y = dest_y; //pixels
	this.strokeColor = "white";
	this.direction = 3; //0 = still // 1 = N // 2 = E // 3 = S // 4 = W
	this.variable = null;
	this.lineWidth = 4;

}

Thread.prototype.update = function()
{
	if(this.destination_x > this.position_x)
	{
		this.position_x += 2;
	}
	else if(this.destination_x < this.position_x)
	{
		this.position_x -= 2;
	}

	if(this.destination_y > this.position_y)
	{
		this.position_y += 2;
	}
	else if(this.destination_y < this.position_y)
	{
		this.position_y -= 2;
	}

	if(this.destination_x == this.position_x && this.destination_y == this.position_y)
	{
		this.activateCell();
		var next_dest = gameGrid.getNextDestination(this.direction, this.destination_x, this.destination_y);

		if(typeof next_dest !== 'undefined')
		{
			this.destination_x = next_dest[0];
			this.destination_y = next_dest[1];
			this.direction = next_dest[2];
		}
		else
		{
			this.direction = ((this.direction + 1)%4)+1;
			
		}
		
	}

	if(this.variable !== null)
	{
		this.variable.x = this.position_x;
		this.variable.y = this.position_y;
	}

}

Thread.prototype.draw = function()
{
	ctx = myGameArea.context;
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
	ctx.arc(this.position_x + cellSize/2, this.position_y + cellSize/2, cellSize/2, 0, 2 * Math.PI);
	ctx.lineWidth = this.lineWidth;
	ctx.stroke();

	if(this.hasVariable())
	{
		this.variable.draw();
	}
}

Thread.prototype.activateCell = function()
{
	var point = gameGrid.getSquare(this.position_x, this.position_y);
	var cell = gameGrid.table[point[0]][point[1]];
	cell.makeOperation(this);
}

Thread.prototype.pickUpVariable = function(variable)
{
	this.variable = variable;
}

Thread.prototype.dropVariable = function()
{
	this.variable = null;
}

Thread.prototype.hasVariable = function()
{
	if(this.variable == null)
	{
		return false;
	}
	else
	{
		return true;
	}
}

Thread.prototype.kill = function()
{
	this.variable= null;

	var index = threadPool.indexOf(this);
	if (index > -1)
	{
    	threadPool.splice(index, 1);
	}
}
