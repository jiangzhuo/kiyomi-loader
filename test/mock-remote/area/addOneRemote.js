/**
 * Mock remote service
 */
module.exports = function(app) {
	return {
		doService: function(value) {
			return value + 1;
		}, 

		doAddTwo: function(value) {
			return value + 2;
		}
	};
};