
var isLogEnabled = true;
var isDebugEnabled = true;

var log = require('color-logs.js')(isLogEnabled, isDebugEnabled, __filename);

log.Info('Testing color-logs with an INFO message');
log.Info('Testing color-logs with an INFO message and objects', __filename, isDebugEnabled);

log.Warning('Testing color-logs with an WARNING message');
log.Warning('Testing color-logs with an WARNING message and objects', isLogEnabled);

log.Error('Testing color-logs with an ERROR message');
log.Error('Testing color-logs with an ERROR message and objects', isLogEnabled, isDebugEnabled, __filename);

log.Debug('Testing color-logs with an DEBUG message');
log.Debug('Testing color-logs with an DEBUG message and objects', isLogEnabled);