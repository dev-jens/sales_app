sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/m/library"
], function (BaseController, JSONModel, formatter, mobileLibrary) {
    "use strict";

    // shortcut for sap.m.URLHelper
    var URLHelper = mobileLibrary.URLHelper;

    return BaseController.extend("be.edu.ap.sales.zsd040salesapp.controller.CreateOrder", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        onInit: function () {
            // Model used to manipulate control states. The chosen values make sure,
            // detail page is busy indication immediately so there is no break in
            // between the busy indication for loading the view's meta data
            var oViewModel = new JSONModel({
                isFilterBarVisible: true,
                filterBarLabel: "",
                busy: false,
                delay: 0
            });

            this.setModel(oViewModel, "CreateOrderView");

            // this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
            // const oModel = new sap.ui.model.json.JSONModel();
            // this.getView().setModel(oModel, 'json');
        },
        /**
         * Event handler for navigating back.
         * We navigate back in the browser history
         * @public
         */
        onNavBack: function () {
            // eslint-disable-next-line sap-no-history-manipulation
            history.go(-1);
        },

        /* =========================================================== */
        /* begin: internal methods                                     */
        /* =========================================================== */

        /**
         * Event handler for the bypassed event, which is fired when no routing pattern matched.
         * If there was an object selected in the list, that selection is removed.
         * @public
         */
        onBypassed: function () {
            this._oList.removeSelections(true);
        },


        /**
         * Toggle between full and non full screen mode.
         */
        toggleFullScreen: function () {
            var bFullScreen = this.getModel("appView").getProperty("/actionButtonsInfo/endColumn/fullScreen");
            this.getModel("appView").setProperty("/actionButtonsInfo/endColumn/fullScreen", !bFullScreen);
            if (!bFullScreen) {
                // store current layout and go full screen
                this.getModel("appView").setProperty("/previousLayout", this.getModel("appView").getProperty("/layout"));
                this.getModel("appView").setProperty("/layout", "EndColumnFullScreen");
            } else {
                // reset to previous layout
                this.getModel("appView").setProperty("/layout", this.getModel("appView").getProperty("/previousLayout"));
            }
        },

        /**
         * Set the full screen mode to false and navigate to master page
         */
        onCloseCreateOrderPress: function () {
            var oModel = this.getView().getModel("app");
            this.getOwnerComponent().getRouter().navTo("list", {}, true);
        },

        clearInput: function () {
            this.getView().byId("Cust_ref").setValue("");
            // this.getView().byId("STP").setValue("");
            this.getView().byId("RDD").setValue("");
        },

        /* =========================================================== */
        /* begin: Crud Methodes                                 */
        /* =========================================================== */

        addSalesOrder: function (oEvent) {
           
            const oSalesOrder = {
                "cust_ref": this.getView().byId("Cust_ref").getValue(""),
                "sold_to": this.getView().byId("STP").getSelectedKey(),
                "deliv_date": this.getView().byId("RDD").getValue("").toISOString()
            };

            console.log(oSalesOrder);

            // this.getModel().create("/salesorderset", oSalesOrder, {
            //     succes: function (oFeedback) {
            //         console.log(oFeedback);
            //     },
            //     error: function (oError) {
            //         console.error(oError);
            //     }
            // });

            // this.clearInput();
            // this.getOwnerComponent().getRouter().navTo("list", {}, true);
            // window.location.reload();
        }

    });

});