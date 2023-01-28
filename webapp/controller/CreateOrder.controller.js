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

            // standard 14 days from today
            this.getView().byId("RDD").setValue(this.getCurrentDatePlusDays(14));

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
            // set date to current date + 14 days
            this.getView().byId("RDD").setValue(this.getCurrentDatePlusDays(14));
        },

        /* =========================================================== */
        /* begin: Crud Methodes                                 */
        /* =========================================================== */

        addSalesOrder: function (oEvent) {
           
            const FULL_LENGHT_OF_STP_NUM = 10;

            const oSalesOrder = {
                "SalesDoc":"",
                "CustomerRef": this.getView().byId("Cust_ref").getValue(),
                "SoldToParty": this.addZerosBefore(this.getView().byId("STP").getValue(), FULL_LENGHT_OF_STP_NUM),
                "ReqDelivDate": this.convertToJSONDateValue(this.getView().byId("RDD").getValue())       
            }
            
            console.log(oSalesOrder);

            this.getModel().create("/SalesOrderSet", oSalesOrder, {
                succes: function (oFeedback) {
                    console.log(oFeedback);
                },
                error: function (oError) {
                    console.error(oError);
                }
            });

            this.clearInput();
            this.getOwnerComponent().getRouter().navTo("list", {}, true);
            window.location.reload();
        },

        /* =========================================================== */
        /* begin: Helper Methodes for Crud operations                  */
        /* =========================================================== */

        addZerosBefore : function (inputSTP, desiredLengthSTP) {
            // adds zeros befort the string to reach the desired length for bapi
            return inputSTP.padStart(desiredLengthSTP, '0');
        },

        convertToJSONDateValue :  function (str) {
            var year = str.substring(0, 4);
            var month = str.substring(4, 6);
            var day = str.substring(6, 8);
            var date = new Date(Date.UTC(year, month - 1, day));
            var timestamp = date.getTime();
            return '\/Date(' + timestamp + ')\/';
        },

        getCurrentDatePlusDays : function(plus_days) {
            var date = new Date();
            date.setDate(date.getDate() + plus_days);
            var year = date.getFullYear();
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');
            return year + month + day;
        }
    

    });

 
});