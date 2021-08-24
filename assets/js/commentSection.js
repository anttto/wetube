/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/commentSection.js":
/*!*****************************************!*\
  !*** ./src/client/js/commentSection.js ***!
  \*****************************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar form = document.getElementById(\"commentForm\");\nvar deleteBtns = document.querySelectorAll(\".delete__comment\");\n\nvar addComment = function addComment(text, id) {\n  var videoComments = document.querySelector(\".video__comments ul\");\n  var newComment = document.createElement(\"li\");\n  newComment.className = \"video__comment\";\n  newComment.dataset.id = id;\n  var icon = document.createElement(\"i\");\n  var span = document.createElement(\"span\");\n  var deleteSpan = document.createElement(\"span\");\n  span.innerText = \" \".concat(text);\n  deleteSpan.innerText = \"Delete\";\n  icon.className = \"fas fa-comment\";\n  deleteSpan.className = \"delete__comment\";\n  newComment.appendChild(icon);\n  newComment.appendChild(span);\n  newComment.appendChild(deleteSpan);\n  videoComments.prepend(newComment);\n};\n\nvar handleSubmit = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {\n    var textarea, text, videoId, response, _yield$response$json, newCommentId;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            e.preventDefault();\n            textarea = form.querySelector(\"textarea\");\n            text = textarea.value;\n            videoId = videoContainer.dataset.id;\n\n            if (!(text === \"\")) {\n              _context.next = 6;\n              break;\n            }\n\n            return _context.abrupt(\"return\");\n\n          case 6:\n            _context.next = 8;\n            return fetch(\"/api/videos/\".concat(videoId, \"/comment\"), {\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                text: text\n              })\n            });\n\n          case 8:\n            response = _context.sent;\n\n            if (!(response.status === 201)) {\n              _context.next = 16;\n              break;\n            }\n\n            _context.next = 12;\n            return response.json();\n\n          case 12:\n            _yield$response$json = _context.sent;\n            newCommentId = _yield$response$json.newCommentId;\n            addComment(text, newCommentId);\n            textarea.value = \"\";\n\n          case 16:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function handleSubmit(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nif (form) {\n  form.addEventListener(\"submit\", handleSubmit);\n}\n\nvar deleteComment = function deleteComment(delBtn, commentId) {\n  var comment = delBtn.target.parentNode;\n  comment.classList.add(commentId);\n  comment.remove();\n};\n\nvar handleDelete = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(delBtn) {\n    var commentId, response;\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            commentId = delBtn.target.parentNode.dataset.id;\n            _context2.next = 3;\n            return fetch(\"/api/videos/\".concat(commentId, \"/delete\"), {\n              method: \"DELETE\"\n            });\n\n          case 3:\n            response = _context2.sent;\n\n            if (response.status === 201) {\n              deleteComment(delBtn, commentId);\n            }\n\n          case 5:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n\n  return function handleDelete(_x2) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\ndeleteBtns.forEach(function (deleteBtn) {\n  deleteBtn.addEventListener(\"click\", handleDelete);\n});\n\n//# sourceURL=webpack://wetube/./src/client/js/commentSection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/commentSection.js"]();
/******/ 	
/******/ })()
;