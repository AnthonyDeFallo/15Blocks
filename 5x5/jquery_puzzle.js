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

// Shuffle function
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
	var arrTemp = new Array(25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1);
	var arr = randomize(arrTemp);
	var strClass = "";
	
	for(i=0; i<arr.length; i++)
	{
		if(i == (arr.length -1))
			strClass = " pointer";
			
		$("#image").append('<div id="pos' + (i +1) + '" class="sq' + arr[i] + strClass +'"></div>');
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
				if(parseInt($moveTo) == 25)
					isGameOver();
			}
		}
	});	
}

// Validate user's move
function validMove(id,move)
{
	if(id == 1) 
		var arr = new Array(2,6);
	else if(id == 2) 
		var arr = new Array(1,3,7);
	else if(id == 3) 
		var arr = new Array(2,4,8);
	else if(id == 4) 
		var arr = new Array(3,5,9);
	else if(id == 5) 
		var arr = new Array(4,10);
	else if(id == 6) 
		var arr = new Array(1,7,11);
	else if(id == 7) 
		var arr = new Array(2,6,8,12);
	else if(id == 8) 
		var arr = new Array(3,7,9,13);
	else if(id == 9) 
		var arr = new Array(4,8,10,14);
	else if(id == 10) 
		var arr = new Array(5,9,15);
	else if(id == 11) 
		var arr = new Array(6,12,16);
	else if(id == 12) 
		var arr = new Array(7,11,13,17);
	else if(id == 13) 
		var arr = new Array(8,12,14,18);
	else if(id == 14) 
		var arr = new Array(9,13,15,19);
	else if(id == 15) 
		var arr = new Array(10,14,20);
	else if(id == 16) 
		var arr = new Array(11,17,21);
	else if(id == 17) 
		var arr = new Array(12,16,18,22);
	else if(id == 18) 
		var arr = new Array(13,17,19,23);
	else if(id == 19) 
		var arr = new Array(14,18,20,24);
	else if(id == 20) 
		var arr = new Array(15,19,21);
	else if(id == 21) 
		var arr = new Array(16,22);
	else if(id == 22) 
		var arr = new Array(17,21,23);
	else if(id == 23) 
		var arr = new Array(18,22,24);
	else if(id == 24) 
		var arr = new Array(19,23,25);
	else if(id == 25) 
		var arr = new Array(20,24);

	if($.inArray(parseInt(move),arr) > -1)
		return true;
}

// Work out if game is over
function isGameOver()
{
	for(i=1; i<=25; i++)
	{
		if(!$("#image #pos" + i).hasClass("sq" + i))
		{
			break;
		} else {
			if(i == 25)
			{
				$("#pos25").removeClass("pointer");
				$("#image div").off("click");
				window.obj.Stop();
				alert("CONGRATULATIONS! YOU WIN!");
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