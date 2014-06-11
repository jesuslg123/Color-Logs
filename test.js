

var isLogEnabled = true;
var isDebugEnabled = true;

var log = require(__dirname + '/color-log.js')(isLogEnabled, isDebugEnabled, __filename);

log.Info('Testing color-log with an INFO message');
log.Info('Testing color-log with an INFO message and objects', __filename, isDebugEnabled);

log.Warning('Testing color-log with an WARNING message');
log.Warning('Testing color-log with an WARNING message and objects', isLogEnabled);

log.Error('Testing color-log with an ERROR message');
log.Error('Testing color-log with an ERROR message and objects', isLogEnabled, isDebugEnabled, __filename);

log.Debug('Testing color-log with an DEBUG message');
log.Debug('Testing color-log with an DEBUG message and objects', isLogEnabled);