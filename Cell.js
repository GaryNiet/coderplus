var Cell = function(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "black";
    this.isActive = false;
    this.isBorder = false;
    this.links = [];
    this.cellType = 0;
}

Cell.prototype.draw = function()
{
	ctx = myGameArea.context;
	ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
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


