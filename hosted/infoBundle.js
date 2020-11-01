"use strict";

var DomoInfo = function DomoInfo(props) {
  console.log('reached');

  if (props.domos.length === 0 || props.oldest === null) {
    return /*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyDomo"
    }, "No Domos yet, create a domo to see domo info"));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "infoBox"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "info"
  }, "Info:"), /*#__PURE__*/React.createElement("p", null, "You have ", props.domos.length, " domo(s)."), /*#__PURE__*/React.createElement("p", null, "The oldest domo you have is ", props.oldest.name, ", who is ", props.oldest.age, " years old."));
};

var getDomoInfo = function getDomoInfo() {
  sendAjax('GET', '/getDomoInfo', null, function (data) {
    console.log(data);
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoInfo, {
      domos: data.domos,
      oldest: data.oldest
    }), document.querySelector("#domos"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoInfo, {
    domos: [],
    oldest: []
  }), document.querySelector("#domos"));
  getDomoInfo();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (results) {
    setup(results.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);
  window.location.href = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
