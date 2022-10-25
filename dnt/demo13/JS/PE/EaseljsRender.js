/// <reference path="../PE.js" />

/// <reference path="../Math/Vector2.js" />
/// <reference path="class.min.js" />

var TestClass = Class.create((function () {
        var 
          _private_prop1,
          _private_prop2,
          public_prop;

        function _privateFunc1(a, b) { return a + b }

        function _privateFunc2() { }

        function publicStaticFunc1() {
            alert(_privateFunc1(1, 2));
        }

        function publicFunc2() { }

        return {

            public_prop: public_prop,

            publicStaticFunc1: publicStaticFunc1.setStatic(),

            publicFunc2: publicFunc2
        };

    } ()));

    TestClass.staticPro = "staticPro";

var TestClassSub = Class.create(TestClass, function () { 
    
})