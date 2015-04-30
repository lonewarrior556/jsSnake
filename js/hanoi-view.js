(function() {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function(game) {
    this.game = game;
  };

  View.prototype.bindEvents = function() {

    var that = this;

    $(".towers").on("click", "ul", function(event) {
      var $tower = $(event.currentTarget);
      var currentTower = $tower.attr("class");

      var fromTower = currentTower[currentTower.length - 1];
      $(".towers").on("click", "ul", function(event2) {
        var $tower2 = $(event2.currentTarget);
        var currentTower2 = $tower2.attr("class");
        var toTower = currentTower2[currentTower2.length -1];
        if (that.game.move(fromTower-1, toTower-1)){
          var a = $("."+currentTower +" li:last-child").remove();
          $("."+currentTower2).append(a);
          $(".towers").off("click", "ul");
          if (that.game.isWon()){
            $("strong").addClass("message");
          }
          else{that.bindEvents();}
        }
        else{
          alert("wrong fool!");
          $(".towers").off("click", "ul");
          that.bindEvents();
        }


      });

    });

  };










})();
