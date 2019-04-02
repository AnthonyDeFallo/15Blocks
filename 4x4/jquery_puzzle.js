$(function(){	
	$("#start").on("click",function(){
		$(this).hide();
		$("#counter, #clock, #restart").show();
		startGame();
	});
});

$(function(){	
	$("#restart").on("click",function(){
		window.obj.Stop();
		startGame();
	});
});

var randomize = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

//Start game
function startGame()
{
	moves = 0;
	window.moves = 0;
	
	// Define the array, then run a shuffle
	var boardTemp = new Array(16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1);
	var board = randomize(boardTemp);
	var strClass = "";
	
	for(i=0; i<board.length; i++)
	{
		if(i == (board.length -1))
			strClass = " pointer";
			
		$("#image").append('<div id="pos' + (i +1) + '" class="sq' + board[i] + strClass +'"></div>');
	}
	$("#counter span").html("0");
	$("#clock span").html("00:00");
	
	var index;
	window.index = 0;
	var obj
	window.obj = new Timer();
	window.obj.Interval = 1000
	window.obj.Tick = timer_tick;
	window.obj.Start();	
	
	movePiece();
}

// Move square
function movePiece()
{
	$("#image div").on("click",function(){
		if(!$(this).hasClass("pointer"))
		{
			var $moveTo = $(this).attr("id").replace("pos","");
			var $pointer = $(".pointer").attr("id").replace("pos","");
			
			if(validMove($pointer,$moveTo))
			{
				// Swap classes
				var a = $(this);
				var b = $(".pointer");
				var aClass = a.attr("class");
				var bClass = b.attr("class");
				a.removeClass(aClass).addClass(bClass);
				b.removeClass(bClass).addClass(aClass);
				
				window.moves++;
				$("#counter span").html(window.moves);
				
				// Check if the puzzle is complete
				if(parseInt($moveTo) == 16)
					isGameOver();
			}
		}
	});	
}

// Validate user's move
function validMove(id,move)
{
	if(id == 1)
		var board = new Array(2,5);
	else if(id == 2)
		var board = new Array(1,3,6);
	else if(id == 3)
		var board = new Array(2,4,7);
	else if(id == 4)
		var board = new Array(3,8);
	else if(id == 5)
		var board = new Array(1,6,9);
	else if(id == 6)
		var board = new Array(2,5,7,10);
	else if(id == 7)
		var board = new Array(3,6,8,11);
	else if(id == 8)
		var board = new Array(4,7,12);
	else if(id == 9)
		var board = new Array(5,10,13);
	else if(id == 10)
		var board = new Array(6,9,11,14);
	else if(id == 11)
		var board = new Array(7,10,12,15);
	else if(id == 12)
		var board = new Array(8,11,16);
	else if(id == 13)
		var board = new Array(9,14);
	else if(id == 14)
		var board = new Array(10,13,15);
	else if(id == 15)
		var board = new Array(11,14,16);
	else if(id == 16)
		var board = new Array(12,15);

	if($.inArray(parseInt(move),board) > -1)
		return true;
}

// Work out if game is over
function isGameOver()
{
	for(i=1; i<=16; i++)
	{
		if(!$("#image #pos" + i).hasClass("sq" + i))
		{
			break;
		} else {
			if(i == 16)
			{
				$("#pos16").removeClass("pointer");
				$("#image div").off("click");
				window.obj.Stop();
			}				
		}
	}
}

// Declaring class "Timer"
var Timer = function()
{        
    // Property: Frequency of elapse event of the timer in millisecond
    this.Interval = 1000;
    
    // Property: Whether the timer is enable or not
    this.Enable = new Boolean(false);
    
    // Event: Timer tick
    this.Tick;
    
    // Member variable: Hold interval id of the timer
    var timerId = 0;
    
    // Member variable: Hold instance of this class
    var thisObject;
    
    // Function: Start the timer
    this.Start = function()
    {
        this.Enable = new Boolean(true);

        thisObject = this;
        if (thisObject.Enable)
        {
            thisObject.timerId = setInterval(
            function()
            {
                thisObject.Tick(); 
            }, thisObject.Interval);
        }
    };
    
    // Function: Stops the timer
    this.Stop = function()
    {            
        thisObject.Enable = new Boolean(false);
        clearInterval(thisObject.timerId);
    };

};

// Timer
function timer_tick()
{
	window.index = window.index + 1;
	$("#clock span").html(secondsTimeSpanToHMS(window.index));
}

// Format time
function secondsTimeSpanToHMS(s)
{
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60);   //Get remaining minutes
    s -= m*60;
	return (m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}