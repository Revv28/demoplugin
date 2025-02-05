sap.ui.define([
    "sap/ui/core/UIComponent",
    "app/demoplugin/model/models",
    "sap/ushell/Container",
    "sap/m/Button"
], function (UIComponent, models, Container, Button) {
    "use strict";

    return UIComponent.extend("app.demoplugin.Component", {
        metadata: {
            manifest: "json",
            interfaces: ["sap.ui.core.IAsyncContentCreation"]
        },

        init: function () {
            
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(models.createDeviceModel(), "device");
            this.getRouter().initialize();

            sap.m.MessageToast.show("Hello from plugin. updated", { duration: 5000 });

            var oRenderer = Container.getRenderer("fiori2");

            if (oRenderer) {
                var oFloatingButton = new Button({
                    text: "",
                    icon: "sap-icon://ai",
                    type:sap.m.ButtonType.Emphasized,
                    tooltip: "Click me",
                    press: function () {
                        sap.m.MessageToast.show("Floating Button Clicked!");
                    }
                });

                // Add style class
                oFloatingButton.addStyleClass("floatingButton");

                // Add button to the UI
                oRenderer.setFooter(oFloatingButton);
            }
           
            
        }
    });
});
