sap.ui.define([
    "sap/ui/core/UIComponent",
    "app/demoplugin/model/models",
    "sap/ushell/Container"
], (UIComponent, models, Container) => {
    "use strict";

    return UIComponent.extend("app.demoplugin.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            sap.m.MessageToast.show("Hello from plugin. updated",{
                duration : 100000
            });

            // new sap.m.Button("button1",{
            //     text : "hello from plugin"
            // }).placeAt('content');

            var bar = new sap.m.Bar({
                contentLeft: [
                    // Dummy button
                    new sap.m.Button({
                        text: "Game Work Space",
                        press: function () {
                            sap.m.MessageToast.show("To be implemented");
                        }
                    }),
                    // Label to show current points from Game Engine Service
                    new sap.m.Label({
                        id: "myPoints",
                        text: "retrieving your points..."
                    })
                ]
            });

            // Retrieve Fiori2 renderer
            var oRenderer = sap.ushell.container.getRenderer("fiori2");

            // Ask renderer to set the custom bar as new footer
            oRenderer.setFooter(bar);


        }
    });
});