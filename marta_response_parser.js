var ResponseParser = function() {}

ResponseParser.prototype.getResultsByStation = function (apiResponse, station, callback) {
	parsedResponse = JSON.parse(apiResponse)
	result = parsedResponse.filter(function (event) {
		return event.DESTINATION === station
	})
	callback(result)
}

ResponseParser.prototype.getResultsByDirection = function (apiResponse, direction, callback) {
	parsedResponse = JSON.parse(apiResponse)
	result = parsedResponse.filter(function (event) {
		return event.DIRECTION === direction[0]
	})
	callback(result)
}

ResponseParser.prototype.getResultsByDirectionAndStation = function (apiResponse, direction, station, callback) {
	parsedResponse = JSON.parse(apiResponse)
	filteredByDirection = parsedResponse.filter(function (event) {
		return event.DIRECTION === direction[0]
	})
	filteredByDirectionAndStation = parsedResponse.filter(function (event) {
		return event.DESTINATION === station
	})
	callback(filteredByDirectionAndStation)
}

ResponseParser.prototype.getArrivalTimeFromEvent = function (event, callback) {
	time = event.NEXT_ARR.split(/[\s:]+/)
	date = event.EVENT_TIME.split(/[\/\s]+/)
	isPM = (time[3] == 'PM') ? 12:0
	month = parseInt(date[0]) - 1
	day = parseInt(date[1])
	year = parseInt(date[2])
	hour = parseInt(time[0]) + isPM
	minute = parseInt(time[1])
	second = parseInt(time[2])
	millisecond = 0
	callback(null, new Date(year, month, day, hour, minute, second, millisecond))
}

ResponseParser.prototype.getMinutesUntilArrival = function (time, callback) {
	now = new Date()
	callback(null, time.getUTCMinutes() - now.getUTCMinutes())
}

module.exports = ResponseParser