var Grid = function(width, height, strokeColor, fillColor, x, y) {
  this.cellWidth = width;
  this.cellHeight = height;
  this.nbCell_x = myGameArea.canvas.width/width;
  this.nbCell_y = myGameArea.canvas.height/height;
  this.currentLevel = 1;

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
  if(cell.buildable == false)
  {
    console.log("cannot build");
  }
  else if(myGameArea.which == 3)
  {
      var newCell = new Cell(this.cellWidth,this.cellHeight, cell_x, cell_y);
      this.table[cell_x][cell_y] = newCell;
  }
  else
  {
  
    if(cell.isBorder)
    {
      console.log("here");
      var newBorderCell = new BorderCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
      this.table[cell_x][cell_y] = newBorderCell;
    }
    else
    {
      if(myGameArea.key_P == true)
      {
        var newPathCell = new AddCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
        this.table[cell_x][cell_y] = newPathCell;
      }
      else if(myGameArea.key_M == true)
      {
        var newPathCell = new MinusCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
        this.table[cell_x][cell_y] = newPathCell;
      }
      else if(myGameArea.key_I == true)
      {
        var newPathCell = new IfCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
        this.table[cell_x][cell_y] = newPathCell;
      }
      else if(myGameArea.key_R == true)
      {
        var newPathCell = new ResultCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
        this.table[cell_x][cell_y] = newPathCell;
      }
      else if(myGameArea.key_B == true)
      {
        var newPathCell = new BlockCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
        this.table[cell_x][cell_y] = newPathCell;
      }
      else if(myGameArea.key_C == true)
      {
        var newPathCell = new CopyCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
        this.table[cell_x][cell_y] = newPathCell;
      }
      else if(myGameArea.key_K == true)
      {
        var newPathCell = new KillCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
        this.table[cell_x][cell_y] = newPathCell;
      }
      else if(myGameArea.key_H == true)
      {
        var newPathCell = new SyncCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
        this.table[cell_x][cell_y] = newPathCell;
      }
      else if(myGameArea.key_1 == true)
      {
        this.addVariable(cell_x, cell_y, 1);
      }
      else if(myGameArea.key_2 == true)
      {
        this.addVariable(cell_x, cell_y, 2);
      }
      else if(myGameArea.key_3 == true)
      {
        this.addVariable(cell_x, cell_y, 3);
      }
      else if(myGameArea.key_4 == true)
      {
        this.addVariable(cell_x, cell_y, 4);
      }
      else if(myGameArea.key_5 == true)
      {
        this.addVariable(cell_x, cell_y, 5);
      }
      else if(myGameArea.key_6 == true)
      {
        this.addVariable(cell_x, cell_y, 6);
      }
      else if(myGameArea.key_7 == true)
      {
        this.addVariable(cell_x, cell_y, 7);
      }
      else if(myGameArea.key_8 == true)
      {
        this.addVariable(cell_x, cell_y, 8);
      }
      else if(myGameArea.key_9 == true)
      {
        this.addVariable(cell_x, cell_y, 9);
      }
      else if(myGameArea.key_0 == true)
      {
        this.addVariable(cell_x, cell_y, 0);
      }

      else
      {
        var newPathCell = new PathCell(this.cellWidth,this.cellHeight, cell_x, cell_y);
        this.table[cell_x][cell_y] = newPathCell;
      }
      this.passVariable(cell);
    }
  }
  //this.detectErrors(cell);
  

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

  var cellLinks = this.table[point[0]][point[1]].links();

  if(typeof cellLinks[direction] !== 'undefined' && cellLinks[direction].cellType >= 2)
  {
    return [cellLinks[direction].x, cellLinks[direction].y, direction];
  }

  if(direction%2 == 0)//horizontal
  {
    var marker = 0;
    if(typeof cellLinks[1] !== 'undefined' && cellLinks[1].cellType >= 2)
    {
      marker += 1;
    }
    if(typeof cellLinks[3] !== 'undefined' && cellLinks[3].cellType >= 2)
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
    if(typeof cellLinks[2] !== 'undefined' && cellLinks[2].cellType >= 2)
    {
      marker += 1;
    }
    if(typeof cellLinks[4] !== 'undefined' && cellLinks[4].cellType >= 2)
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

Grid.prototype.detectErrors = function(cell)
{
  cell.detectErrors();
  cell.links().forEach(function(cell)
  {
    var err =  cell.detectErrors();
    if(err == true)
    {
      cell.fillColor = "blue";
    }
  });
}

Grid.prototype.addVariable = function(x,y,value)
{
  var variable = new Variable(this.cellWidth, this.cellHeight, x, y,value);
  this.table[x][y].variable = variable;
}

Grid.prototype.passVariable = function(cell)
{
  if(cell.hasVariable())
  {
      this.table[cell.pos_x][cell.pos_y].variable = cell.variable;
  }
}

Grid.prototype.getLevel = function(levelNB)
{
  var cookie = getCookie(String(levelNB));
  if(cookie == "")
  {
    return level;
  }
  else
  {
    return cookie;
  }
}

Grid.prototype.resetLevel = function()
{
  var cookie = "";
  setCookie(String(this.currentLevel), cookie, 365);
  this.loadLevel(this.currentLevel);
}

Grid.prototype.loadLevel = function(levelNB)
{
    var level = this.getLevel(levelNB);
    
    var values = level.split(" ");
    for(var i = 0; i<values.length; i++)
    {
      var split = values[i].split("");
      var len = split.length;
      var value = "";
      for(var j = 0; j<len; j++)
      {
        value += split[j];
      }
      value = parseInt(value);
      var direction = split[len-1];
      if(value == 0)//Cell
      {
        this.table[parseInt(i/20)][i%20] = new Cell(this.cellWidth,this.cellHeight, parseInt(i/20), i%20);
      }
      else if(value == 1)//BorderCell
      {
        this.table[parseInt(i/20)][i%20] = new BorderCell(this.cellWidth,this.cellHeight, parseInt(i/20), i%20);
      }
      else if(value == 2)//PathCell
      {
        this.table[parseInt(i/20)][i%20] = new PathCell(this.cellWidth,this.cellHeight, parseInt(i/20), i%20);
      }
      else if(value == 3)//BlockCell
      {
        this.table[parseInt(i/20)][i%20] = new BlockCell(this.cellWidth,this.cellHeight, parseInt(i/20), i%20);
      }
      else if(value == 4)//IfCell
      {
        this.table[parseInt(i/20)][i%20] = new IfCell(this.cellWidth,this.cellHeight, parseInt(i/20), i%20);
      }
      else if(value == 5)//AddCell
      {
        this.table[parseInt(i/20)][i%20] = new AddCell(this.cellWidth,this.cellHeight, parseInt(i/20), i%20);
      }
      else if(value == 6)//CopyCell
      {
        this.table[parseInt(i/20)][i%20] = new CopyCell(this.cellWidth,this.cellHeight, parseInt(i/20), i%20);
      }
      else if(value == 7)//KillCell
      {
        this.table[parseInt(i/20)][i%20] = new KillCell(this.cellWidth,this.cellHeight, parseInt(i/20), i%20);
      }
      else if(value == 8)//MinusCell
      {
        this.table[parseInt(i/20)][i%20] = new MinusCell(this.cellWidth,this.cellHeight, parseInt(i/20), i%20);
      }
      else if(value == 10)//ResultCell
      {
        this.table[parseInt(i/20)][i%20] = new ResultCell(this.cellWidth,this.cellHeight, parseInt(i/20), i%20);
      }
      else if(value == 11)//SyncCell
      {
        this.table[parseInt(i/20)][i%20] = new SyncCell(this.cellWidth,this.cellHeight, parseInt(i/20), i%20);
      }
      if(this.table[parseInt(i/20)][i%20].direction == 0)
      {
        if(direction == "u")
        {
          this.table[parseInt(i/20)][i%20].direction = 1;
        }
        else if(direction == "r")
        {
          this.table[parseInt(i/20)][i%20].direction = 2;
        }
        else if(direction == "d")
        {
          this.table[parseInt(i/20)][i%20].direction = 3;
        }
        else if(direction == "l")
        {
          this.table[parseInt(i/20)][i%20].direction = 4;
        }
      }
    }
}

Grid.prototype.saveLevel = function(levelNB)
{
  var cookie = this.stringifyTable();
  console.log(cookie);
  setCookie(String(levelNB), cookie, 365);
}

Grid.prototype.stringifyTable = function()
{
  var string = "";
  this.table.forEach(function(array)
  {
    array.forEach(function(cell)
    {
      string += cell.cellType;
      if(typeof cell.direction != 'undefined')
      {
        if(cell.direction == 0)
        {
          string += "m";
        }
        else if(cell.direction == 1)
        {
          string += "u";
        }
        else if(cell.direction == 2)
        {
          string += "r";
        }
        else if(cell.direction == 3)
        {
          string += "d";
        }
        else if(cell.direction == 4)
        {
          string += "l";
        }
      }
      else
      {
        string += "n";
      }
      string += " ";
    });
  });
  return string;
}