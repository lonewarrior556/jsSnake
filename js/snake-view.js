(function() {
  if (typeof Snake === "undefined") {
    window.Snake = {};

  }


  var Board = Snake.Board = function(){
    this.grid = new Array(16*16);
    this.cherry = 125;
  };

  Board.prototype.eat= function(){
    this.cherry =  Math.floor(Math.random()*256);
    return this.cherry;
  };

  Board.prototype.show = function(pos){
    if (this.cherry === pos ){
      return " Q ";
    }
    else{ return " _ "; }
  };

  var snake = Snake.snake = function(board) {
    this.board = board;
    this.bodySegments = [12];
    this.currentDirection = -1;
  }


  snake.prototype.move = function() {
    var headPos = (this.bodySegments[0] + this.currentDirection)%256 ;
    if (headPos <= 0){ headPos = headPos + 256}
    this.bodySegments.unshift(headPos);

    if (this.board.cherry === headPos)
    {
      while ( this.bodySegments.indexOf(this.board.eat())!= -1){};
    }
    else {
      this.bodySegments.pop();
    }
  }

  snake.prototype.render = function(){
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






  var View = Snake.View = function(snake) {
    this.snake = snake;
  };

  View.prototype.run = function() {
    var that=this;
    setInterval(function() {
      console.log(that.snake.bodySegments[0])
      for (var i =0; i < 257; i++){
        $(".plane li:nth-child("+ i + ")").removeClass("snake");
        $(".plane li:nth-child("+ i + ")").removeClass("cherry");
      }
      that.snake.bodySegments.forEach(function(i) {
        $(".plane li:nth-child("+ i + ")").addClass("snake");
      });
      var cher = that.snake.board.cherry;
        $(".plane li:nth-child("+cher+")").addClass("cherry");
      that.snake.move()
      $(".plane").off("click", "li");
    },1)
  };


  View.prototype.bindEvents = function() {
    var that = this;
    $(document).keydown(function(e){
      var n = e.keyCode;
      if (n === 37){
        that.snake.currentDirection = -1;
      }
      else if (n === 38){
        that.snake.currentDirection = -16;
      }
      else if (n === 39){
        that.snake.currentDirection = 1;
      }
      else if (n === 40){
        that.snake.currentDirection = 16;
      }

    })


  };




})();
