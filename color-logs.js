(function(){
	"use strict";

	var colors = require('colors');

	var ColorLogs = function(isLogEnable, isDebugMode, parentName)
	{
		this.inizializate(isLogEnable, isDebugMode, parentName);
	}

	var p = ColorLogs.prototype;

	p._logEnable;
	p._debugMode;
	p._parentName;
	p._monthNames;

	var textColor = null;
	var bgColor = null;

	p.inizializate = function(isLogEnable, isDebugMode, parentName)
	{
		this._logEnable = isLogEnable;
        this._debugMode = isDebugMode;

        var isWin = /^win/.test(process.platform);
        var separator = '/';
        if (isWin)
            separator = '\\';

		var fileSplit = parentName.split(separator);
		this._parentName = fileSplit[fileSplit.length-1];
		this._monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dece" ];
	}

	// available colors:
	// black, red, green, yellow, blue, cyan, magenta, white
	p.Colors = function(){
		textColor = arguments[0];
		bgColor = arguments[1];
		return this;
	}
	p.colors = p.Colors;

	p.Info = function()
	{
		this.info.apply(this, arguments);
	}

	p.Debug = function()
	{
		this.debug.apply(this, arguments);
	}

	p.Warning = function()
	{
		this.warning.apply(this, arguments);
	}

	p.Error = function()
	{
		this.error.apply(this, arguments);
	}

	p.Log = function()
	{
		this.log.apply(this, arguments);
	}

	p.Dir = function()
	{
		this.dir.apply(this, arguments);
	}

	p.info = function()
	{
		if(typeof(arguments[0]) == 'string')
		{
			var message = 'Info: '.green + this.colorize(arguments[0], "green");
			arguments[0] = message;
		}
		this._log(arguments);
	}

	p.debug = function()
	{
		if(this._debugMode)
		{
			if(typeof(arguments[0]) == 'string')
			{
				var message = 'DEBUG: '.blue + this.colorize(arguments[0], "blue");
				arguments[0] = message;
			}
			this._log(arguments);
		}
	}

	p.warning = function()
	{
		if(typeof(arguments[0]) == 'string')
		{
			var message = 'WARNING: '.yellow + this.colorize(arguments[0], "yellow");
			arguments[0] = message;
		}
		this._log( arguments);
	}

	p.error = function()
	{
		if(typeof(arguments[0]) == 'string')
		{
			var message = 'ERROR: '.red.bold + this.colorize(arguments[0], "red");
			arguments[0] = message;
		}
		this._log(arguments);
	}

	p.log = function()
	{
		this._log(arguments);
	}

	p.dir = function(object)
	{
		if(this._logEnable && this._debugMode)
		{
			this.Debug('Object value:');
			console.dir(object);
		}
	}

	p.colorize = function(message, defaultColor){
		if(!textColor) textColor = defaultColor;
		switch(textColor){
			case "black":
				message = message.toString().black;
				break;
			case "red":
				message = message.toString().red;
				break;
			case "green":
				message = message.toString().green;
				break;
			case "yellow":
				message = message.toString().yellow;
				break;
			case "blue":
				message = message.toString().blue;
				break;
			case "cyan":
				message = message.toString().cyan;
				break;
			case "magenta":
				message = message.toString().magenta;
				break;
			case "white":
				message = message.toString().white;
				break;
			default:
				message = message.toString();
		}
		switch(bgColor){
			case "black":
				message = message.bgBlack;
				break;
			case "red":
				message = message.bgRed;
				break;
			case "green":
				message = message.bgGreen;
				break;
			case "yellow":
				message = message.bgYellow;
				break;
			case "blue":
				message = message.bgBlue;
				break;
			case "cyan":
				message = message.bgCyan;
				break;
			case "magenta":
				message = message.bgMagenta;
				break;
			case "white":
				message = message.bgWhite;
				break;
			default:
		}
		textColor = null;
		bgColor = null;
		return message;
	};

	p._log = function(argumentsCall)
	{
		//console.dir(arguments);
		//console.log.apply(console.log, arguments);

		if(this._logEnable)
		{
			var now = new Date();
			var calledFrom = '[' + this._getCurrentFileName().toString() + ']';
			var startLog = this._getDate(now) +  ' - ' + calledFrom.toString().bold + ' ';

			//console.dir(argumentsCall);
			//console.log(typeof(argumentsCall[0]));

			if(typeof(argumentsCall[0]) != 'object')
			{	
				//console.log('NO OBJECT');
				//console.dir(argumentsCall);
				argumentsCall[0] = startLog + argumentsCall[0];
			}
			else
			{
				//argumentsCall.push(startLog);
				//console.log('Argssss OBJECT ONLY');
				//console.dir(argumentsCall);
				argumentsCall = this._addArgDate(argumentsCall, startLog);
				//console.dir(argumentsCall);
				//argumentsCall[0] = startLog + argumentsCall[0];
			}
			console.log.apply(console.log, argumentsCall);
		}
	}

	p._addArgDate = function(argumentsCall, stringDate)
	{
		var argWithDate = new Array();
		argWithDate[0] = stringDate;

		//console.dir(argumentsCall);

		for(var i=0; i<argumentsCall.length; i++)
		{
			argWithDate[i + 1] = argumentsCall[i];
		}

		return argWithDate;
	}

	/*
	*Log info format methods
	*/
	p._getDate = function(date)
	{
		//30 Apr 12:54:53.324

		//Pading left
		var day = String('000'+date.getDate()).slice(-2)
		var hours = String('000'+date.getHours()).slice(-2);
		var minutes = String('000'+date.getMinutes()).slice(-2);
		var seconds = String('000'+date.getSeconds()).slice(-2);
		var milliseconds = String('000'+date.getMilliseconds()).slice(-3);

		return day +  ' ' + this._monthNames[date.getMonth()] + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
	}

	p._getCurrentFileName = function()
	{
	    return  this._parentName;	
	}

	module.exports = function(isLogEnable, isDebugMode, parentName)
	{
		return new ColorLogs(isLogEnable, isDebugMode, parentName);
	};

}());