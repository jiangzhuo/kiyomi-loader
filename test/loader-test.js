var test = require("test");
test.setup();

var Loader = require('../');
// todo __dirname sames not have an equalisation in fibjs
var __dirname = '/Users/jiangzhuo/Downloads/pomelo-loader-master/test';
var path = __dirname + '/mock-remote/area/';

describe('loader', function () {
    describe('#load', function () {
        it('should load all modules under the path but sub-directory', function () {
            var services = Loader.load(path);
            assert.exist(services);

            assert.property(services, 'addOneRemote');
            assert.typeOf(services.addOneRemote, 'object');
            assert.property(services.addOneRemote, 'doService');
            assert.typeOf(services.addOneRemote.doService, 'function');
            assert.property(services.addOneRemote, 'doAddTwo');
            assert.typeOf(services.addOneRemote.doService, 'function');
            assert.property(services, 'addThreeRemote');
            assert.typeOf(services.addThreeRemote, 'object');
            assert.property(services.addThreeRemote, 'doService');
            assert.typeOf(services.addThreeRemote.doService, 'function');

            // should use the name as module name if the module has a name property
            assert.property(services, 'whoAmIRemote');
            assert.typeOf(services.whoAmIRemote, 'object');
            assert.property(services.whoAmIRemote, 'doService');
            assert.typeOf(services.whoAmIRemote.doService, 'function');
            assert.property(services.whoAmIRemote, 'name');
            assert.typeOf(services.whoAmIRemote.name, 'string');
        });

        it('should invoke functions of loaded object successfully', function (done) {
            var sid = 'area-server-1';
            var context = {id: sid};
            var services = Loader.load(path, context);
            assert.exist(services);
            assert.equal(services.addOneRemote.doService(1), 2);
            assert.equal(services.addOneRemote.doAddTwo(1), 3);
            assert.equal(services.addThreeRemote.doService(1), 4);

            // context should be pass to factory function for each module
            assert.equal(services.whoAmIRemote.doService(), sid);
        });

        it('should throw an error if file parse error',function () {
            var path = __dirname + '/mock-remote/connector';
            assert.throws(function () {
                Loader.load(path);
            });
        });

        it('should throw an error if the path is empty', function () {
            var path = __dirname + '/mock-remote/connector1';
            assert.throws(function () {
                Loader.load(path);
            });
        });

        it('should throw exception if the path dose not exist', function () {
            var path = __dirname + '/some/error/path';
            assert.throws(function () {
                Loader.loadPath(path);
            });
        });
    });
});