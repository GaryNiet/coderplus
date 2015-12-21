var Grid = function(width, height, strokeColor, fillColor, x, y) {
  this.cellWidth = width;
  this.cellHeight = height;
  this.nbCell_x = myGameArea.canvas.width/width;
  this.nbCell_y = myGameArea.canvas.height/height;

  this.table = [];
  
  for(var i = 0; i<this.nbCell_x; i++)
  {
    this.table.push([]);
    for(var j = 0; j<this.nbCell_y; j++)
    {
      var newCell = new Cell(width,height, i, j);
      this.table[i][j] = newCell;
      if(i == 0 || i==this.nbCell_x -1 || j == 0 || j== this.nbCell_y-1)
      {
        newCell.isBorder = true;
      }
    }
  }
}

Grid.prototype.draw = function()
{
  this.table.forEach(function(array)
  {
    array.forEach(function(cell)
    {
      cell.draw();
    });
  });
}

Grid.prototype.getSquare = function(x,y)
{
  var x_axis = parseInt(x/this.cellWidth);
  var y_axis = parseInt(y/this.cellHeight);
  return [x_axis, y_axis];
}

Grid.prototype.fill = function(cell_x, cell_y)
{
  var cell = this.table[cell_x][cell_y];
  if(cell.isBorder)
  {
    var newBorderCell = new BorderCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
    this.table[cell_x][cell_y] = newBorderCell;
  }
  else
  {
    var newPathCell = new PathCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
    this.table[cell_x][cell_y] = newPathCell;
  }

  this.createCellLinks();//can be made more local for performance boost

}

Grid.prototype.getActiveBorders = function()
{
  var activeBorderCells = [];

  this.table.forEach(function(array)
  {
    array.forEach(function(cell)
    {
      if(cell.isBorder)
      {
        if(cell.isActive)
        {
          activeBorderCells.push(cell);
        }
      }
    });
  });

  return activeBorderCells;
}

Grid.prototype.getNextDestination = function(direction, pos_x, pos_y)
{
  var point = this.getSquare(pos_x, pos_y);
  var cellLinks = this.table[point[0]][point[1]].links;

  console.log(cellLinks[direction]);
  if(typeof cellLinks[direction] !== 'undefined' && cellLinks[direction].cellType == 2)
  {
    return [cellLinks[direction].x, cellLinks[direction].y, direction];
  }

  if(direction%2 == 0)//horizontal
  {
    var marker = 0;
    if(typeof cellLinks[1] !== 'undefined' && cellLinks[1].cellType == 2)
    {
      marker += 1;
    }
    if(typeof cellLinks[3] !== 'undefined' && cellLinks[3].cellType == 2)
    {
      marker += 2;
    }

    if(marker == 3)
    {
      console.log("error");
    }
    else if(marker == 1)
    {
      return [this.table[point[0]][point[1]-1].x,this.table[point[0]][point[1]-1].y, 1];
    }
    else if(marker == 2)
    {
      return [this.table[point[0]][point[1]+1].x,this.table[point[0]][point[1]+1].y, 3];
    }

  }
  else//vertical
  {
    var marker = 0;
    if(typeof cellLinks[2] !== 'undefined' && cellLinks[2].cellType == 2)
    {
      marker += 1;
    }
    if(typeof cellLinks[4] !== 'undefined' && cellLinks[4].cellType == 2)
    {
      marker += 2;
    }

    if(marker == 3)
    {
      alert("error");
    }
    else if(marker == 1)
    {
      return [this.table[point[0]+1][point[1]].x,this.table[point[0]+1][point[1]].y, 2];
    }
    else if(marker == 2)
    {
      return [this.table[point[0]-1][point[1]].x,this.table[point[0]-1][point[1]].y, 4];
    }
  }

}

Grid.prototype.getBordingCells = function(pos_x, pox_y)
{

}

Grid.prototype.createCellLinks = function()
{
  this.table.forEach(function(array)
  {
    array.forEach(function(cell)
    {
      cell.createLinks();
    });
  });
}

