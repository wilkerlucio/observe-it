module.exports = function () {
  var listeners = {};

  return {
    listenersFor: function (event) {
      if (!listeners[event])
        listeners[event] = [];

      return listeners[event];
    },

    addEventListener: function (event, callback) {
      this.listenersFor(event).push(callback);
    },

    removeEventListener: function (event, callback) {
      listeners[event] = this.listenersFor(event).filter(function (value) {
        return value != callback;
      });
    },

    trigger: function () {
      var args = Array.prototype.slice.call(arguments, 0);
      var event = args.shift();

      var listeners = this.listenersFor(event);

      for (var i = 0; i < listeners.length; i++) {
        listeners[i].apply(listeners[i], args);
      }
    },

    attach: function (object) {
      object.addEventListener = this.addEventListener.bind(this);
      object.trigger = this.trigger.bind(this);
      object.removeEventListener = this.removeEventListener.bind(this);
    }
  };
};
