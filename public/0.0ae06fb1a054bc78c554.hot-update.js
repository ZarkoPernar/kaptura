webpackHotUpdate(0,{

/***/ "./src/web/shared/form/Input.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("./node_modules/prop-types/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




let EnhancedInput = class EnhancedInput extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.state = {
            isDirty: false
        }, this.onChange = e => {
            console.log(e);
            this.setState({ isDirty: true });
            this.props.onChange(e.target.value, this.props.name);
        }, _temp;
    }

    render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({ style: { color: this.state.isDirty ? '' : 'red' }, className: 'form-control' }, this.props, { onChange: this.onChange }));
    }
};


EnhancedInput.propTypes = {};

/* harmony default export */ __webpack_exports__["a"] = (EnhancedInput);

/***/ })

})
//# sourceMappingURL=0.0ae06fb1a054bc78c554.hot-update.js.map