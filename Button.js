var Button = function(posx, posy, width, height, text)
{
	this.posx = posx;
	this.posy = posy;
	this.width = width;
	this.height = height;
	this.text = text;

	this.fillColor = "grey";
  	this.strokeColor = "black";
  	this.textColor = "white";
  	this.lineWidth = 3;
}

Button.prototype.draw = function()
{
	ctx = myGameArea.context;
	ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.lineWidth;
    ctx.fillRect(this.posx,this.posy,this.width,this.height);
    ctx.strokeRect(this.posx,this.posy,this.width,this.height);

    ctx.font = "30px Arial";
    ctx.fillStyle = this.textColor;
    ctx.fillText(this.text,this.posx + this.width/3,this.height/2 +this.posy,this.width,this.height);
}

Button.prototype.click = function(x,y)
{
	if(x >= this.posx && x<=this.posx + this.width && y >= this.posy && y<= this.posy + this.height)
	{
		console.log("clicked");
	}
}