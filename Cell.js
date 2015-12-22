var Cell = function(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "#3C464A";
    this.isActive = false;
    this.isBorder = false;
    this.links = [];
    this.cellType = 0;
    this.variable = null;
    this.buildable = true;
    this.lineWidth = 2;
}

Cell.prototype.draw = function()
{
	ctx = myGameArea.context;
	ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.lineWidth;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    this.drawVariable();
    
}

Cell.prototype.drawVariable = function()
{
	if(this.hasVariable())
    {
    	this.variable.draw();
    }
}

Cell.prototype.createLinks = function()
{
	if(typeof gameGrid.table[this.pos_x+1] !== 'undefined')
	{
		this.links[2]=(gameGrid.table[this.pos_x+1][this.pos_y]);
	}
	if(typeof gameGrid.table[this.pos_x][this.pos_y+1] !== 'undefined')
	{
		this.links[3]=(gameGrid.table[this.pos_x][this.pos_y+1]);
	}
	if(typeof gameGrid.table[this.pos_x-1] !== 'undefined')
	{
		this.links[4]=(gameGrid.table[this.pos_x-1][this.pos_y]);
	}
	if(typeof gameGrid.table[this.pos_x][this.pos_y-1] !== 'undefined')
	{
		this.links[1]=(gameGrid.table[this.pos_x][this.pos_y-1]);
	}
	
}

Cell.prototype.detectErrors = function()
{
	return false;
}

Cell.prototype.makeOperation = function(thread)
{
	if(thread.hasVariable() && this.hasVariable())
	{
		this.twoVariableOperation(thread);
	}
	else if(thread.hasVariable())
	{
		this.threadVariableOperation(thread);
	}
	else if(this.hasVariable())
	{
		this.cellVariableOperation(thread);
	}
}

Cell.prototype.twoVariableOperation = function(thread) //switch variables
{
	var switchVar = thread.variable;
	thread.variable = this.variable;
	this.variable = switchVar;
}

Cell.prototype.threadVariableOperation = function(thread)
{
	//move along
}

Cell.prototype.cellVariableOperation = function(thread)//pick up
{
	thread.pickUpVariable(this.variable);
	this.variable = null;
}

Cell.prototype.hasVariable = function()
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


