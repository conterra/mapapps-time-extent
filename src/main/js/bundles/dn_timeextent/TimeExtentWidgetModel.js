/*
 * Copyright (C) 2019 con terra GmbH (info@conterra.de)
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
import FeatureFilter from "esri/views/layers/support/FeatureFilter";
import Locale from "ct/Locale";
import moment from "esri/moment";

export default declare({

    locale: "en",
    layers: [],
    selectedLayerIds: [],
    start: new Date(),
    end: new Date(),

    activate() {
        this.locale = Locale.getCurrent().getLanguage();
        let layers = this.layers = this._getLayers();
        if (layers.length) {
            this.selectedLayerIds = [layers[0].id];
        }

        let mapWidgetModel = this._mapWidgetModel;
        let map = mapWidgetModel.map;
        map.layers.on("after-changes", () => {
            this.layers = this._getLayers();
            this.selectedLayerIds = [this.layers[0].id];
        });

        let properties = this._properties;
        this.start = moment(properties.start).toDate();
        this.end = moment(properties.end).toDate();
    },

    setFilter() {
        const timeExtent = new TimeExtent({
            start: this.start,
            end: this.end
        });

        let filter = new FeatureFilter({
            timeExtent: timeExtent
        });

        let layerIds = this.selectedLayerIds;
        layerIds.forEach((layerId) => {
            this._setFilterToLayer(layerId, filter);
        })
    },

    resetFilter() {
        let filter = new FeatureFilter();

        let layerIds = this.selectedLayerIds;
        layerIds.forEach((layerId) => {
            this._setFilterToLayer(layerId, filter);
        })
    },

    _setFilterToLayer(layerId, filter) {
        let layer = this._getLayerById(layerId);
        if (layer) {
            let mapWidgetModel = this._mapWidgetModel;
            let view = mapWidgetModel.view;
            view.whenLayerView(layer).then(function (layerView) {
                layerView.filter = filter;
            });
        }
    },

    _getLayers() {
        let mapWidgetModel = this._mapWidgetModel;
        let map = mapWidgetModel.map;
        let layers = map.layers.toArray();
        let featureLayers = layers.filter((layer) => {
            return layer.type === "feature";
        });
        return featureLayers.map((layer) => {
            return {
                id: layer.id,
                title: layer.title
            }
        })
    },

    _getLayerById(layerId) {
        let mapWidgetModel = this._mapWidgetModel;
        let map = mapWidgetModel.map;
        return map.findLayerById(layerId);
    }
})
