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
module.exports = {
    root: {
        bundleName: "Time Extent",
        bundleDescription: "The Time Extent bundle allows users to filter FeatureLayer for a specific time extent.",
        windowTitle: "Time Extent",
        tool: {
            title: "Time Extent",
            tooltip: "Time Extent"
        },
        ui: {
            layer: "Layer:",
            start: "Starttime:",
            end: "Endtime:",
            ok: "OK",
            cancel: "Cancel",
            setFilter: "Set filter",
            resetFilter: "Reset",
            errors: {
                required: "Required value!",
                wrongDate: "The end date is before the start date!"
            }
        }
    },
    de: true
};
