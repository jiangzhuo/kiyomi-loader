/**
 * Mock remote service
 */
module.exports = function(app) {
	return {
		doService: function() {
			return app.id;
		}, 
		name: 'whoAmIRemote'
	};
};