import TimeExtentWidget from "./TimeExtentWidget.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding from "apprt-binding/Binding";

export default class TimeExtentWidgetFactory {

    activate() {
        this._initComponent();
    }

    createInstance() {
        return new VueDijit(this.widget);
    }

    _initComponent() {
        const widget = this.widget = new Vue(TimeExtentWidget);
        let model = this._timeExtentWidgetModel;
        widget.i18n = this._i18n.get().ui;

        // listen to view model methods
        vm.$on('startup', () => {

        });
        widget.$on('setFilter', () => {
            model.setFilter();
        });

        Binding.for(widget, model)
            .syncAll("layers", "selectedLayerId")
            .enable()
            .syncToLeftNow();
    }
}
