import {declare} from "apprt-core/Mutable";

export default declare({
    layers: [],
    selectedLayerId: "",

    activate() {
        let layers = this.layers = this._getLayers();
        if (layers.length) {
            this.selectedLayerId = layers[0].id;
        }

        let mapWidgetModel = this._mapWidgetModel;
        let map = mapWidgetModel.map;
        map.layers.on("after-changes", () => {
            this.layers = this._getLayers();
            this.selectedLayerId = this.layers[0].id;
        });
    },

    setFilter() {
        // filter the FeatureLayer
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
    }
})
