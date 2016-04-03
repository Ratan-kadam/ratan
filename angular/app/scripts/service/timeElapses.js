/**
 * Created by ratan kadam on 4/3/2016.
 */
angular.module('timeElapseService', [])
  .factory('timeElapseService', function () {

    var myfunctions = {};
    myfunctions.scope = {};


    myfunctions.HandleUI = function (data) {
      var scopeLen = 0;
      var newdata = [];
      /* Converting received data in array if received data is not array */
      if (!Array.isArray(data)) {
        newdata.push(data);
      } else {
        newdata = data;
      }
      // Capturing current time for comparision to comment's time stamp
      var currentTime = new Date().getTime();

      /* In scope.data[] only newly fetched records are appended i.e.  previously receievd comments are ignored  */
      /* this will save screen redraw operation for previous comments */

      if (myfunctions.scope.data == undefined || myfunctions.scope.data.length == null) {
        scopeLen = 0;
        myfunctions.scope.data = [];
      } else {
        scopeLen = myfunctions.scope.data.length;
      }
      for (var i = scopeLen; i < newdata.length; i++) {
        myfunctions.scope.data.push(newdata[i]);
      }

      /* calculating timeElapses logic */
      myfunctions.scope.data = newdata.map(function (row) {

        row.timeStamp = myfunctions.calculate(currentTime, row.timeStamp);
        return row;
      });
      //
    };
    myfunctions.calculate = function (currTime, rowTime) {
      // converting into seconds :
      var seconds = Math.round((currTime - rowTime) / 1000);
      if (seconds <= 59) {
        return '1 minute ago'
      } else if (seconds > 59 && seconds <= 3599) {
        return Math.floor(seconds / 60) + " minuts ago";
      } else if (seconds > 3599 && seconds <= 86399) {
        return Math.floor(seconds / 3600) + " hours ago";
      } else if (seconds >= 86400) {
        return Math.floor(seconds / 86400) + " days ago";
      }


    };

    return myfunctions;

  });
