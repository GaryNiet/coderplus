var SyncCell = function(width, height, x, y)
{
	this.width = width;
    this.height = height;
    this.x = x*width;
    this.y = y*height;
    this.pos_x = x;
    this.pos_y = y;
    this.strokeColor = "white";
    this.fillColor = "blue";
    this.isActive = true;
    this.cellType = 11;
    this.isBorder = false;
    
    this.variable = null;

    this.buildable = true;
    this.checkedForSync = false;
    this.pausedThread = null;
}

var inheritsFrom = function (child, parent)
{
   	child.prototype = Object.create(parent.prototype);
};
inheritsFrom(SyncCell, Cell);

SyncCell.prototype.makeOperation = function(thread)
{
	if(thread.hasVariable() && this.pausedThread != null)
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



SyncCell.prototype.threadVariableOperation = function(thread)//free
{
	thread.pause = true;
	this.pausedThread = thread;
	if(this.isSynced())//free all
	{
		var syncGroup = this.getSyncGroup();
		console.log(syncGroup);
		syncGroup.forEach(function(cell)
		{
			cell.pausedThread.pause = false;
			cell.pausedThread = null;
			cell.checkedForSync = false;
		});
	}
}

SyncCell.prototype.twoVariableOperation = function(thread) //send back
{
	 thread.direction = ((thread.direction + 1)%4)+1;
}


SyncCell.prototype.isSynced = function()
{
	var synced = true;
	var syncGroup = this.getSyncGroup();
	syncGroup.forEach(function(cell)
	{
		if(cell.pausedThread == null)
		{
			synced = false;
		}
		cell.checkedForSync = false;
	});
	return synced;
}

SyncCell.prototype.getSyncGroup = function()
{
	var group = [];
	group.push(this);
	this.checkedForSync = true;
	this.links.forEach(function(link)
	{
		if(link.cellType == 3 && link.checkedForSync == false)
		{
			link.getSyncGroup().forEach(function(cell)
			{
				group.push(cell);
			});
		}
	});
	return group;
}




