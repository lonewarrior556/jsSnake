function (board) Snake = {
    this.board = board;
    this.bodySegments = [128];
    this.currentDirection = -1;
  }

  Snake.prototype.move = function() {
    var headPos = (this.bodySegments[0] + this.currentDirection)%256 ;
    if (headPos < 0){ headPos + 256}
    this.bodySegments.unshift(headPos);

    if (this.board.cherry === headPos)
    {
      while ( this.bodySegments.indexOf(this.board.eat())!= -1){};
    }
    else {
      this.bodySegments.pop();
    }
  }

  Snake.prototype.render = function(){
    var display = [];
    for (var i = 0; i < 256; i++){
      if (this.bodySegments.indexOf(i) === -1)
      {
        display.push(this.board.show(i));
      }
      else
      {
        if (i === this.bodySegments[0]){
          display.push(" H ")
        }else{
        display.push(" + ");
      }
      }
    };
    var rend = display.join("").match(/.{1,48}/g).join("\n");
    console.log(rend);
  };
  module.exports = Snake;
