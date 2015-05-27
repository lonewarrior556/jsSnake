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
    this.bodySegments = [12,13];
    this.lastPosition = [14];
    this.currentDirection = -1;
    this.score = 0
  }


  snake.prototype.move = function() {
    var headPos = (this.bodySegments[0] + this.currentDirection)%256 ;
    if (headPos < 0){ headPos = headPos + 256}

    if (this.bodySegments.indexOf(headPos) !== -1){
      $(".score").removeClass("score")
      $(".plane").remove()
      $("ul, a, img").addClass("final")
      return


    }
    else{
    }
      this.bodySegments.unshift(headPos)

    if (this.board.cherry === headPos)
    {
      while ( this.bodySegments.indexOf(this.board.eat())!= -1){};
    }
    else {
      this.lastPosition = [this.bodySegments.pop()];
    }
    this.score = this.score + Math.floor(this.bodySegments.length * 1.1)
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
      $(".cherry").removeClass("cherry");

      var i = that.snake.bodySegments[0] + 1

      var direction;
      if (that.snake.currentDirection === -1){ direction = "left" }
      else if (that.snake.currentDirection === 1){ direction = "right"  }
      else if (that.snake.currentDirection === 16){ direction = "down" }
      else {direction = "up"}

      $(".plane li:nth-child("+ i + ")").addClass("snake head "+direction );


      var z = that.snake.bodySegments[1] + 1
      $(".plane li:nth-child("+ z + ")").removeClass().addClass("snake");
      var j = that.snake.lastPosition[0] + 1
      $(".plane li:nth-child("+ j + ")").removeClass("snake");

      var cher = that.snake.board.cherry;
        $(".plane li:nth-child("+(cher +1) +")").addClass("cherry");
      $(".score").text(that.snake.score)
      that.snake.move()
      $(".plane").off("click", "li");
    },80)

  };



  View.prototype.bindEvents = function() {
    var that = this;
    $(document).keydown(function(e){
      var n = e.keyCode;
      if (n === 37){
        if (that.snake.currentDirection !== 1){
          that.snake.currentDirection = -1;
      }}

      else if (n === 38){
        if (that.snake.currentDirection !== 16){
        that.snake.currentDirection = -16;
      }}
      else if (n === 39){
        if (that.snake.currentDirection !== -1){
        that.snake.currentDirection = 1;
      }}
      else if (n === 40){
        if (that.snake.currentDirection !== -16){
        that.snake.currentDirection = 16;
      }}

    })


  };




})();
