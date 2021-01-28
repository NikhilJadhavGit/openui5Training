sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
], function (Controller, MessageToast, Fragment,JSONModel) {
	"use strict";

	return Controller.extend("Project.Controller.App", {

		onOpenDialog : function () {
			var oView = this.getView();

			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "Project.View.EmployeeDetail",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},

		onCloseDialog : function () {
			// note: We don't need to chain to the pDialog promise, since this event-handler
			// is only called from within the loaded dialog itself.
			this.byId("EmployeeDetailDialogue").close();
		},

		add: function(){
			let dId=document.getElementById("container-Project---app--dId-inner").value
			let dName=document.getElementById("container-Project---app--dName-inner").value
			let dSallary=document.getElementById("container-Project---app--dsallary-inner").value
			let dPhno=document.getElementById("container-Project---app--dPhno-inner").value
			let dAddress=document.getElementById("container-Project---app--dAddress-inner").value
			this.getView().getModel("emplst").getProperty("/companies").push({
				"Employee":dId,
				"name":dName,
				"sallary":dSallary,
				"Phno":dPhno,
				"address":dAddress
			})
			this.byId("AddCompanyDialogue").close();
			this.byId("grid1").getBinding("items").refresh();
			console.log(this.getView().getModel("emplst").getProperty("/companies"))
		},
		detailViewDialogue: function(oEvent) {
			
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext("emplst");
			var sPath = oContext.getPath();
			var oView = this.getView();
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "Project.View.EmployeeDetail",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					var oProductDetailPanel = oDialog//Fragment.byId("EmployeeDetailDialogue");
					oProductDetailPanel.bindElement({ path: sPath, model: "emplst" })
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
				var oProductDetailPanel = oDialog//Fragment.byId("EmployeeDetailDialogue");
				oProductDetailPanel.bindElement({ path: sPath, model: "emplst" })
				
			});

					
			
						
					
					
		},

		//formatters
		titleFormatter:function(Name,LastName,gender){
			if(gender=="M"){
				return "Mr. "+Name+" "+LastName;
			}
			else{
				return "Ms. " +Name+" "+LastName;
			}
			
		},

		currencyFormatter:function(Money){
			let output=""
			let c=1
			for(let i=Money.length-1;i>=0;i--){
				if(c%4==0){
					output=","+output
					c=1
				}
				c=c+1
				output=Money[i]+output
			}
			return output
		},

		tenKFormatter:function(Money){
			if(Money>10000){
				return "Success";
			}
			else{
				return "Warning";
			}
		},
		genderFormat:function(Gender){
			if(Gender=="M")
				return "Male"
			else
				return "Female"
		}

	});

});