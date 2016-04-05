/**
 * Created by ratan_000 on 4/5/2016.
 */

'use strict';

describe('timeElapses:Service', function () {

  beforeEach(module('timeElapseService'));
  beforeEach(module('commentForm'));

  var element, scope, time,
    arr=[{author: 'Santiago', msg: 'Msg 1', id: 1, timeStamp: '1 days ago'},
          {author: 'ratan', msg: 'Msg 2', id: 2, timeStamp: '9 days ago'},
          {author: 'kadam', msg: 'Msg 3', id: 3, timeStamp: '6 days ago'}],
    currentTime = 1459848381557,
    RowTime = 1459666800000;

  beforeEach(inject(function ($rootScope, $compile, $httpBackend, timeElapseService) {
    scope = $rootScope.$new();
    time = timeElapseService;
    scope.$digest();
  }));


  it('calculate function return type ', function () {
    expect((typeof(time.calculate(currentTime, RowTime))) == 'string').toBeTruthy();
  });

  it('irrespective of data type the resultant output should be array', function () {
    var result = time.HandleUI({author: 'Santiago', msg: 'Msg 1', id: 1, timeStamp: 12345678});
    console.log(result);
    expect(result).toEqual([{author: 'Santiago', msg: 'Msg 1', id: 1, timeStamp: '16896 days ago'}]);

  });

  it('first record addition to service variable scope', function () {
    expect(time.scope.data).toBe(undefined);
    time.HandleUI({author: 'Santiago', msg: 'Msg 1', id: 1, timeStamp: 12345678});
    expect(time.scope.data.length).toBe(1);
  });

  it('calculate time elapses', function () {
    expect(time.calculate(currentTime, RowTime)).toBe('2 days ago');
  });

  it('Length of the mapped (returned) array must be equal to passed data', function () {

    expect(time.HandleUI(arr).length == arr.length).toBeTruthy();
  });

});

