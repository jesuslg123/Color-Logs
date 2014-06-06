Node.js module to get better logs.

Color-log works as console.log logger on Node.js but with extra data and colors to make easier find the lines on your log files.

You can use simple as:

- log.Debug();
- log.Info();
- log.Warning();
- log.Error();

You can use all of them as console.log(), send just a string, multiple strings or mix strings and objects.

- 06 Jun 15:40:36.045 - [file_name.js] DEBUG: debug text: {object to value also} -> BLUE
- 06 Jun 15:40:36.045 - [file_name.js] INFO: debug text: {object to value also} -> GREEN
- 06 Jun 15:40:36.045 - [file_name.js] WARNING: debug text: {object to value also} -> YELLOW
- 06 Jun 15:40:36.045 - [file_name.js] ERROR: debug text: {object to value also} -> RED
