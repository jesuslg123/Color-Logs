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

	p.inizializate = function(isLogEnable, isDebugMode, parentName)
	{
		this._logEnable = true;
		this._debugMode = true;
		var fileSplit = parentName.split('/');
		this._parentName = fileSplit[fileSplit.length-1];
		this._monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dece" ];
	}

	p.Info = function()
	{
		if(typeof(arguments[0]) == 'string')
		{
			var message = 'Info: '.green + arguments[0].toString().green;
			arguments[0] = message;
		}
		this._log(arguments);
	}

	p.Debug = function()
	{
		if(this._debugMode)
		{
			if(typeof(arguments[0]) == 'string')
			{
				var message = 'DEBUG: '.blue + arguments[0].toString().blue;
				arguments[0] = message;
			}
			this._log(arguments);
		}
	}

	p.Warning = function()
	{
		if(typeof(arguments[0]) == 'string')
		{
			var message = 'WARNING: '.yellow + arguments[0].toString().yellow;
			arguments[0] = message;
		}
		this._log( arguments);
	}

	p.Error = function()
	{
		if(typeof(arguments[0]) == 'string')
		{
			var message = 'ERROR: '.red.bold + arguments[0].toString().red;
			arguments[0] = message;
		}
		this._log(arguments);
	}

	p.Log = function()
	{
		this._log(arguments);
	}

	p.Dir = function(object)
	{
		if(this._logEnable && this._debugMode)
		{
			this.Debug('Object value:');
			console.dir(object);
		}
	}

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