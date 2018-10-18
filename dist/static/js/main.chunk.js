(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./client/src/App.js":
/*!***************************!*\
  !*** ./client/src/App.js ***!
  \***************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_socketIoService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/socketIoService */ "./client/src/services/socketIoService.js");
/* harmony import */ var _scraping_ScrapeForm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scraping/ScrapeForm.js */ "./client/src/scraping/ScrapeForm.js");
/* harmony import */ var _login_Login_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login/Login.js */ "./client/src/login/Login.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _redux_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./redux/store */ "./client/src/redux/store.js");





var _jsxFileName = "/Users/rislam/offshore/casey/scraping/client/src/App.js";






var App =
/*#__PURE__*/
function (_React$Component) {
  Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(App, _React$Component);

  function App(props) {
    var _this;

    Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, App);

    _this = Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(App).call(this, props));
    _this.state = _this.state || {};
    return _this;
  }

  Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(App, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      fetch('/users/session/validateMe', {
        method: 'GET'
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        _services_socketIoService__WEBPACK_IMPORTED_MODULE_6__["SocketIoService"].init('new-session');

        _this2.setState({
          isLoggedIn: true
        });
      }, function (error) {
        console.log(error);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var content;

      if (this.state.isLoggedIn) {
        content = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_scraping_ScrapeForm_js__WEBPACK_IMPORTED_MODULE_7__["ScrapeForm"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          },
          __self: this
        });
      } else if (this.state.isLoggedIn === false) {
        content = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_login_Login_js__WEBPACK_IMPORTED_MODULE_8__["Login"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          },
          __self: this
        });
      } else {
        content = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h1", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 36
          },
          __self: this
        }, "Loading...");
      }

      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_9__["Provider"], {
        store: _redux_store__WEBPACK_IMPORTED_MODULE_10__["store"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }, content);
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

/***/ }),

/***/ "./client/src/index.js":
/*!*****************************!*\
  !*** ./client/src/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scraping_ScrapeForm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scraping/ScrapeForm.js */ "./client/src/scraping/ScrapeForm.js");
/* harmony import */ var _App_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.js */ "./client/src/App.js");
/* harmony import */ var _services_socketIoService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/socketIoService */ "./client/src/services/socketIoService.js");
var _jsxFileName = "/Users/rislam/offshore/casey/scraping/client/src/index.js";





react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App_js__WEBPACK_IMPORTED_MODULE_3__["App"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8
  },
  __self: undefined
}), document.getElementById('root'));

/***/ }),

/***/ "./client/src/login/Login.js":
/*!***********************************!*\
  !*** ./client/src/login/Login.js ***!
  \***********************************/
/*! exports provided: Login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _services_utilService_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/utilService.js */ "./client/src/services/utilService.js");
/* harmony import */ var _services_socketIoService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/socketIoService */ "./client/src/services/socketIoService.js");






var _jsxFileName = "/Users/rislam/offshore/casey/scraping/client/src/login/Login.js";



var Login =
/*#__PURE__*/
function (_React$Component) {
  Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(Login, _React$Component);

  function Login(props) {
    var _this;

    Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Login);

    _this = Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Login).call(this, props));
    _this.state = {
      email: 'jmay@primefinance.com',
      password: 'newyork952'
    };
    return _this;
  }

  Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Login, [{
    key: "handleChange",
    value: function handleChange(event, prop) {
      this.setState(Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, prop, event.target.value));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this2 = this;

      event.preventDefault();
      var data = {
        email: this.state.email,
        password: _services_utilService_js__WEBPACK_IMPORTED_MODULE_7__["UtilService"].encryptText(this.state.password)
      };
      fetch("/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        // console.log(result);
        _services_socketIoService__WEBPACK_IMPORTED_MODULE_8__["SocketIoService"].init('new-session'); //.subscribe((value) => {
        // delete this.appData.sentNewSessionReq;
        // const sessionUser = payload;
        // this.appData.sessionUser = sessionUser;
        //});
      }, function (error) {
        _this2.setState({
          isLoaded: true,
          error: error
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("form", {
        onSubmit: function onSubmit(ev) {
          return _this3.handleSubmit(ev);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        class: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: this
      }, "Email:", react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        type: "text",
        value: this.state.email,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        class: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, "Password:", react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        type: "text",
        value: this.state.password,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        type: "submit",
        value: "Login",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      }));
    }
  }]);

  return Login;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

/***/ }),

/***/ "./client/src/redux/store.js":
/*!***********************************!*\
  !*** ./client/src/redux/store.js ***!
  \***********************************/
/*! exports provided: store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread */ "./node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");



var reducer = Object(redux__WEBPACK_IMPORTED_MODULE_2__["combineReducers"])({
  activeThreadId: activeThreadIdReducer,
  threads: threadsReducer
});

function activeThreadIdReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '1-fca2';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'OPEN_THREAD') {
    return action.id;
  } else {
    return state;
  }
}

function findThreadIndex(threads, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      {
        return threads.findIndex(function (t) {
          return t.id === action.threadId;
        });
      }

    case 'DELETE_MESSAGE':
      {
        return threads.findIndex(function (t) {
          return t.messages.find(function (m) {
            return m.id === action.id;
          });
        });
      }
  }
}

function threadsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_MESSAGE':
    case 'DELETE_MESSAGE':
      {
        var threadIndex = findThreadIndex(state, action);
        var oldThread = state[threadIndex];

        var newThread = Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, oldThread, {
          messages: [] //messagesReducer(oldThread.messages, action),

        });

        return Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.slice(0, threadIndex)).concat([newThread], Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.slice(threadIndex + 1, state.length)));
      }

    default:
      {
        return state;
      }
  }
}

var store = Object(redux__WEBPACK_IMPORTED_MODULE_2__["createStore"])(reducer);


/***/ }),

/***/ "./client/src/scraping/ScrapeForm.js":
/*!*******************************************!*\
  !*** ./client/src/scraping/ScrapeForm.js ***!
  \*******************************************/
/*! exports provided: ScrapeForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrapeForm", function() { return ScrapeForm; });
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _services_dataService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/dataService */ "./client/src/services/dataService.js");






var _jsxFileName = "/Users/rislam/offshore/casey/scraping/client/src/scraping/ScrapeForm.js";
 // import './form.scss';


var ScrapeForm =
/*#__PURE__*/
function (_React$Component) {
  Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(ScrapeForm, _React$Component);

  function ScrapeForm(props) {
    var _this;

    Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ScrapeForm);

    _this = Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(ScrapeForm).call(this, props));
    debugger;
    _this.state = {
      findText: 'General Contractor',
      location: 'Hartford, CT'
    };
    return _this;
  }

  Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ScrapeForm, [{
    key: "handleChange",
    value: function handleChange(event, prop) {
      this.setState(Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, prop, event.target.value));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this2 = this;

      // console.log('submitted: ' + this.state.findText, this.state.location);
      event.preventDefault();
      fetch("/dataGenerator?findText=" + this.state.findText + '&location=' + this.state.location, {
        method: 'GET'
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log(result);
      }, // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      function (error) {
        _this2.setState({
          isLoaded: true,
          error: error
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("form", {
        onSubmit: function onSubmit(ev) {
          return _this3.handleSubmit(ev);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        class: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }, "Find:", react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        type: "text",
        value: this.state.findText,
        onChange: function onChange(ev) {
          return _this3.handleChange(ev, 'findText');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        class: "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      }, "location:", react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        type: "text",
        value: this.state.location,
        onChange: function onChange(ev) {
          return _this3.handleChange(ev, 'location');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        type: "submit",
        value: "Submit",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }));
    }
  }]);

  return ScrapeForm;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

/***/ }),

/***/ "./client/src/services/dataService.js":
/*!********************************************!*\
  !*** ./client/src/services/dataService.js ***!
  \********************************************/
/*! exports provided: add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
function add(x, y) {
  return x + y;
}

/***/ }),

/***/ "./client/src/services/socketIoService.js":
/*!************************************************!*\
  !*** ./client/src/services/socketIoService.js ***!
  \************************************************/
/*! exports provided: SocketIoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketIoService", function() { return SocketIoService; });
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);



var SocketIoService =
/*#__PURE__*/
function () {
  function SocketIoService() {
    Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SocketIoService);
  }

  Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SocketIoService, null, [{
    key: "init",
    value: function init() {
      debugger;
      var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2___default.a.connect('/', {
        autoConnect: true,
        reconnectionAttempts: Infinity,
        rejectUnauthorized: true
      });
      ;
      socket.on('scraping-update', function (data) {
        console.log('scraping-update', data);
      });
      socket.on('socket-pub-sub-connected', function () {
        console.log('yes.....socket-pub-sub-connected'); // if (sessionType) {
        //     if (sessionType === 'new-session') {
        //         this.socket.emit('user:clean-duplicate-sessions');
        //     }
        //     this.conEmitter.emit(true);
        //     observer.next(sessionType);
        //     observer.complete();
        //     sessionType = null;
        // }
        // this.processUnprocessedEvents();
      });
    }
  }]);

  return SocketIoService;
}(); // export {socket};

/***/ }),

/***/ "./client/src/services/utilService.js":
/*!********************************************!*\
  !*** ./client/src/services/utilService.js ***!
  \********************************************/
/*! exports provided: UtilService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilService", function() { return UtilService; });
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var endcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! endcrypt */ "./node_modules/endcrypt/endcrypt.js");
/* harmony import */ var endcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(endcrypt__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);





var UtilService =
/*#__PURE__*/
function () {
  function UtilService() {
    Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, UtilService);
  }

  Object(_Users_rislam_offshore_casey_scraping_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(UtilService, null, [{
    key: "encryptText",
    value: function encryptText(msg) {
      var ciphertext = new endcrypt__WEBPACK_IMPORTED_MODULE_2__["Endcrypt"]().encryptWithKey(msg, 'sdf!3#d44kk45jk;45kjk3nmp[dsfp45k');
      return ciphertext;
    }
  }, {
    key: "decryptText",
    value: function decryptText(cipher) {
      var text = new endcrypt__WEBPACK_IMPORTED_MODULE_2__["Endcrypt"]().decryptWithKey(cipher, 'sdf!3#d44kk45jk;45kjk3nmp[dsfp45k');
      return text;
    } // private methods

  }]);

  return UtilService;
}(); // module.exports.UtilService = new UtilService();

/***/ }),

/***/ 0:
/*!*****************************************************************************************!*\
  !*** multi ./node_modules/react-dev-utils/webpackHotDevClient.js ./client/src/index.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/rislam/offshore/casey/scraping/node_modules/react-dev-utils/webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
module.exports = __webpack_require__(/*! /Users/rislam/offshore/casey/scraping/client/src/index.js */"./client/src/index.js");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime~main",0]]]);
//# sourceMappingURL=main.chunk.js.map