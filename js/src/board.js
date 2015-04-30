function () Board {
    this.grid = new Array(16*16);
    this.cherry = 125;
  };

  Board.prototype.eat= function(){
    this.cherry =  Math.floor(Math.random()*256);
    return this.cherry;
  }

  Board.prototype.show = function(pos){
    if (this.cherry === pos ){
      return " Q ";
    }
    else{ return " _ "; }
  };

  module.exports = Board;
