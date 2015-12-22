var Grid = function(width, height, strokeColor, fillColor, x, y) {
  this.cellWidth = width;
  this.cellHeight = height;
  this.nbCell_x = myGameArea.canvas.width/width;
  this.nbCell_y = myGameArea.canvas.height/height;

  this.table = [];
  this.variables = [];
  
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
    newBorderCell.createLinks();
    newBorderCell.links.forEach(function(cell)
    {
      cell.createLinks();
    });
  }
  else
  {
    if(myGameArea.key_1 == true)
    {
      var newPathCell = new AddCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
      this.table[cell_x][cell_y] = newPathCell;
      newPathCell.createLinks();
      newPathCell.links.forEach(function(cell)
      {
        cell.createLinks();
      });
    }
    else
    {
      var newPathCell = new PathCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
      this.table[cell_x][cell_y] = newPathCell;
      newPathCell.createLinks();
      newPathCell.links.forEach(function(cell)
      {
        cell.createLinks();
      });
    }
  }
  //this.detectErrors(cell);
  this.passVariable(cell);

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
  if(typeof this.table[point[0]][point[1]].direction != 'undefined' && this.table[point[0]][point[1]].direction != 0)
  {
    if(this.table[point[0]][point[1]].direction == 1)
    {
      return [this.table[point[0]][point[1]-1].x,this.table[point[0]][point[1]-1].y, this.table[point[0]][point[1]].direction]
    }
    if(this.table[point[0]][point[1]].direction == 2)
    {
      return [this.table[point[0]+1][point[1]].x,this.table[point[0]+1][point[1]].y, this.table[point[0]][point[1]].direction]
    }
    if(this.table[point[0]][point[1]].direction == 3)
    {
      return [this.table[point[0]][point[1]+1].x,this.table[point[0]][point[1]+1].y, this.table[point[0]][point[1]].direction]
    }
    if(this.table[point[0]][point[1]].direction == 4)
    {
      return [this.table[point[0]-1][point[1]].x,this.table[point[0]-1][point[1]].y, this.table[point[0]][point[1]].direction]
    }
  }

  var cellLinks = this.table[point[0]][point[1]].links;

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
      alert("error");
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

Grid.prototype.detectErrors = function(cell)
{
  cell.detectErrors();
  cell.links.forEach(function(cell)
  {
    var err =  cell.detectErrors();
    if(err == true)
    {
      cell.fillColor = "blue";
    }
  });
}

Grid.prototype.addVariable = function()
{
  var variable = new Variable(this.cellWidth, this.cellHeight, 2, 2,3);
  this.table[2][2].variable = variable;
  this.variables.push(variable);
  var variable = new Variable(this.cellWidth, this.cellHeight, 5, 5, 6);
  this.table[5][5].variable = variable;
  this.variables.push(variable);
}

Grid.prototype.passVariable = function(cell)
{
  if(cell.hasVariable())
  {
      this.table[cell.pos_x][cell.pos_y].variable = cell.variable;
  }
}