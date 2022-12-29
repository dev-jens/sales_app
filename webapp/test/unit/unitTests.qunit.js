/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"be/edu/ap/sales/zsd040salesapp/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});