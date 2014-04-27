var observeit = require('../index.js');

var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon');

chai.use(require('sinon-chai'));

describe("Observe It", function () {
  it("attach and fires events", function () {
    var observer = observeit(),
        stub = sinon.stub();

    observer.addEventListener('foo', stub);
    observer.trigger('foo', 'a', 'b');

    expect(stub).calledWithExactly('a', 'b');
  });

  it("can make an object an event delegator", function () {
    var observer = observeit(),
        stub = sinon.stub(),
        object = {};

    observer.attach(object);

    object.addEventListener('foo', stub);
    object.trigger('foo', 'a', 'b');
    object.removeEventListener('foo', stub);

    expect(stub).calledWithExactly('a', 'b');
  });

  it("can remove observers", function () {
    var observer = observeit(),
      stub = sinon.stub();

    observer.addEventListener('foo', stub);
    observer.removeEventListener('foo', stub);
    observer.trigger('foo', 'a', 'b');

    expect(stub).not.calledWithExactly('a', 'b');
  })
});
