/*
 * Copyright (C) 2023 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import TimeExtentWidget from "./TimeExtentWidget.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding from "apprt-binding/Binding";

const _binding = Symbol("_binding");

export default class TimeExtentWidgetFactory {

    activate() {
        this._initComponent();
    }

    deactivate() {
        this[_binding].unbind();
        this[_binding] = undefined;
    }

    createInstance() {
        return new VueDijit(this.vm);
    }

    _initComponent() {
        const vm = this.vm = new Vue(TimeExtentWidget);
        const model = this._timeExtentWidgetModel;
        vm.i18n = this._i18n.get().ui;

        // listen to view model methods
        vm.$on('startup', () => {

        });
        vm.$on('setFilter', () => {
            model.setFilter();
        });
        vm.$on('resetFilter', () => {
            model.resetFilter();
        });

        this[_binding] = Binding.for(vm, model)
            .syncAll("selectedLayerIds", "start", "end", "activeTool")
            .syncAllToLeft("layers", "locale")
            .enable()
            .syncToLeftNow();
    }
}
