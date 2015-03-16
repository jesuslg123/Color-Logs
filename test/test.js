
var isLogEnabled = true;
var isDebugEnabled = true;

var log = require('../color-logs.js')(isLogEnabled, isDebugEnabled, __filename);

log.Info('Testing color-logs with an INFO message');
log.info('Testing color-logs with an INFO message and objects', __filename, isDebugEnabled);

log.Warning('Testing color-logs with an WARNING message');
log.warning('Testing color-logs with an WARNING message and objects', isLogEnabled);

log.Error('Testing color-logs with an ERROR message');
log.error('Testing color-logs with an ERROR message and objects', isLogEnabled, isDebugEnabled, __filename);

log.Debug('Testing color-logs with an DEBUG message');
log.debug('Testing color-logs with an DEBUG message and objects', isLogEnabled);

log.Colors("red", "white").Debug("Test debugging with bg color");
log.Colors("cyan").Error("Error in Cyan");

log.Debug('Testing color-logs with an DEBUG message');

