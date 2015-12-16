var Grid = function(width, height, color, x, y) {
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
      var newCell = new Cell(width,height, color, i*width, j*height);
      this.table[i][j] = newCell;
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

  console.log(x_axis + " " + y_axis);
}