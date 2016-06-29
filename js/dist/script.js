'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function () {
    function Task() {
        var title = arguments.length <= 0 || arguments[0] === undefined ? Task.getDefaultTitle() : arguments[0];

        _classCallCheck(this, Task);

        this.title = title;
        this._done = false;
        Task.count++;
        console.log('creating task');
    }

    _createClass(Task, [{
        key: 'complete',
        value: function complete() {
            this.done = true;
            console.log(this.title + ' is done');
        }
    }, {
        key: 'showTitle',
        value: function showTitle() {
            console.log('Task: ' + this.title);
        }
    }, {
        key: 'done',
        get: function get() {
            return this._done === true ? 'Done' : 'Undone';
        },
        set: function set(value) {
            console.log('getting value: ' + value);
            if (value !== undefined && typeof value === 'boolean') {
                this._done = value;
            } else {
                console.log('Error! Set val true or false');
            }
        }
    }], [{
        key: 'getDefaultTitle',
        value: function getDefaultTitle() {
            return 'Задача';
        }
    }]);

    return Task;
}();

Task.count = 0;

var task = new Task('include babel 4');
task.showTitle();