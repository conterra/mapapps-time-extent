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
import {declare} from "apprt-core/Mutable";
import TimeExtent from "esri/TimeExtent";
import FeatureFilter from "esri/layers/support/FeatureFilter";
import Locale from "ct/Locale";
import Connect from "ct/_Connect";

export default declare({

    locale: "en",
    layers: [],
    selectedLayerIds: [],
    start: new Date(),
    end: new Date(),
    activeTool: false,

    activate() {
        this.locale = Locale.getCurrent().getLanguage();
        const layers = this.layers = this._getLayers();
        if (layers.length) {
            this.selectedLayerIds = [layers[0].id];
        }

        const mapWidgetModel = this._mapWidgetModel;
        const map = mapWidgetModel.map;
        map.layers.on("after-changes", () => {
            this.layers = this._getLayers();
            this.selectedLayerIds = [this.layers[0].id];
        });

        const properties = this._properties;
        this.start = new Date(properties.start);
        this.end = new Date(properties.end);

        const connect = new Connect();
        connect.connect(this._tool, "onActivate", () => {
            this.activeTool = true;
            this.setFilter();
        });
        connect.connect(this._tool, "onDeactivate", () => {
            this.activeTool = false;
            this.removeFilter();
        });
        this.activeTool = true;
    },

    setFilter() {
        const timeExtent = new TimeExtent({
            start: this.start,
            end: this.end
        });

        const filter = new FeatureFilter({
            timeExtent: timeExtent
        });

        const layerIds = this.selectedLayerIds;
        layerIds.forEach((layerId) => {
            this._setFilterToLayer(layerId, filter);
        });
    },

    resetFilter() {
        const properties = this._properties;
        this.start = new Date(properties.start);
        this.end = new Date(properties.end);
        this.setFilter();
    },

    removeFilter() {
        const filter = new FeatureFilter();

        const layerIds = this.selectedLayerIds;
        layerIds.forEach((layerId) => {
            this._setFilterToLayer(layerId, filter);
        });
    },

    _setFilterToLayer(layerId, filter) {
        const layer = this._getLayerById(layerId);
        if (layer) {
            const mapWidgetModel = this._mapWidgetModel;
            const view = mapWidgetModel.view;
            view.whenLayerView(layer).then(function (layerView) {
                layerView.filter = filter;
            });
        }
    },

    _getLayers() {
        const mapWidgetModel = this._mapWidgetModel;
        const map = mapWidgetModel.map;
        const layers = map.layers.toArray();
        const featureLayers = layers.filter((layer) => layer.type === "feature");
        return featureLayers.map((layer) => {
            return {
                id: layer.id,
                title: layer.title
            };
        });
    },

    _getLayerById(layerId) {
        const mapWidgetModel = this._mapWidgetModel;
        const map = mapWidgetModel.map;
        return map.findLayerById(layerId);
    }
});
