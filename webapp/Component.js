sap.ui.define([
    "sap/ui/core/UIComponent",
    "app/demoplugin/model/models",
    "sap/ushell/Container",
    "sap/m/Button",
    "sap/ui/core/Fragment"
], function (UIComponent, models, Container, Button, Fragment) {
    "use strict";

    return UIComponent.extend("app.demoplugin.Component", {
        metadata: {
            manifest: "json",
            interfaces: ["sap.ui.core.IAsyncContentCreation"]
        },

        init: function () {
            jQuery.sap.registerModulePath("my.component", "https://93ba30e2trial.launchpad.cfapps.us10.hana.ondemand.com/218d5e29-caf1-49e9-8b53-a5db19e7d577.appmainapp.appmainapp");
            
            UIComponent.prototype.init.apply(this, arguments);

            this.setModel(models.createDeviceModel(), "device");
            
            this.getRouter().initialize();

            sap.m.MessageToast.show("Hello from plugin. updated", { duration: 5000 });

            var oRenderer = Container.getRenderer("fiori2");

            if (oRenderer) {
                var oFloatingButton = new Button({
                    text: "",
                    icon: "sap-icon://ai",
                    type: sap.m.ButtonType.Emphasized,
                    tooltip: "Click me",
                    press: this.onOpenDialog.bind(this) // Attach dialog opening function
                });

                // Add style class
                oFloatingButton.addStyleClass("floatingButton");

                // Add button to the UI
                oRenderer.setFooter(oFloatingButton);
            }
        },

        onOpenDialog: function () {
            var that = this;

            if (!this._oDialog) {
                Fragment.load({
                    name: "app.demoplugin.view.fragments.componentContainer", // Path to the fragment
                    controller: this,
                    ownerComponent: that

                }).then(function (oDialog) {
                    that._oDialog = oDialog;
                    sap.ui.core.Component.create({
                        name: "my.component",
                        url: "https://93ba30e2trial.launchpad.cfapps.us10.hana.ondemand.com/218d5e29-caf1-49e9-8b53-a5db19e7d577.appmainapp.appmainapp",
                        manifestFirst: true
                    }).then(function (oComponent) {
                        that._oDialog.getContent()[0].setComponent(oComponent);
                        that._oDialog.open();
                    }).catch(function (oError) {
                        console.error("Failed to load component:", oError);
                    });
                });
            } else {
                this._oDialog.open();
            }
        },

        onCloseDialog: function () {
            if (this._oDialog) {
                this._oDialog.close();
            }
        
        }
    });
});
