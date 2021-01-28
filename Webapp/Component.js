sap.ui.define([
    "sap/ui/core/UIComponent",
    "./Controller/AddCompany"
 ], function (UIComponent,AddCompany) {
    "use strict";
    return UIComponent.extend("Project.Component", {
      metadata : {
         manifest: "json"
   },

 
       init : function () {
          
          // call the init function of the parent
          UIComponent.prototype.init.apply(this, arguments);
          // set dialog
			this._helloDialog = new AddCompany(this.getRootControl());
		},


		exit : function() {
			this._helloDialog.destroy();
			delete this._helloDialog;
		},

		openHelloDialog : function () {
			this._helloDialog.open();
       }
    });
 });