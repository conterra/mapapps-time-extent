<!--

    Copyright (C) 2019 con terra GmbH (info@conterra.de)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<template>
    <v-container
        grid-list-md
        fluid
        class="pa-1"
    >
        <div>{{ i18n.layer }}</div>
        <v-select
            ref="selectedLayerIdsSelect"
            v-model="selectedLayerIds"
            :items="layers"
            item-value="id"
            item-text="title"
            multiple
            class="pa-0"
            single-line
            hide-details
        />
        <date-selector-widget
            :locale="locale"
            :title="i18n.start"
            :date.sync="startDate"
            :time.sync="startTime"
            :error="error"
            :i18n="i18n"
        />
        <date-selector-widget
            :locale="locale"
            :title="i18n.end"
            :date.sync="endDate"
            :time.sync="endTime"
            :error="error"
            :i18n="i18n"
        />
        <v-alert
            :value="error"
            type="error"
        >
            {{ this.i18n.errors.wrongDate }}
        </v-alert>
        <v-layout
            row
            wrap
        >
            <v-flex
                md6
                xs6
            >
                <v-btn
                    block
                    ripple
                    color="primary"
                    :disabled="error"
                    @click="$emit('setFilter', {})"
                >
                    <v-icon
                        dark
                        left
                    >
                        filter
                    </v-icon>
                    {{ i18n.setFilter }}
                </v-btn>
            </v-flex>
            <v-flex
                md6
                xs6
            >
                <v-btn
                    block
                    ripple
                    color="primary"
                    @click="$emit('resetFilter', {})"
                >
                    <v-icon
                        dark
                        left
                    >
                        restore
                    </v-icon>
                    {{ i18n.resetFilter }}
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import Bindable from "apprt-vue/mixins/Bindable";

    import DateSelectorWidget from "./DateSelectorWidget.vue";

    export default {
        components: {
            "date-selector-widget": DateSelectorWidget
        },
        mixins: [Bindable],
        props: {
            i18n: {
                type: Object,
                default: function () {
                    return {
                        layer: "Layer:",
                        start: "Starttime:",
                        end: "Endtime:",
                        ok: "OK",
                        cancel: "Cancel",
                        setFilter: "Set filter",
                        resetFilter: "Reset"
                    }
                }
            },
            layers: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            locale: {
                type: String,
                default: "en"
            },
            selectedLayerIds: {
                type: Array,
                default: () => []
            },
            startDate: {
                type: String,
                default: ""
            },
            startTime: {
                type: String,
                default: ""
            },
            endDate: {
                type: String,
                default: ""
            },
            endTime: {
                type: String,
                default: ""
            },
            error: {
                type: Boolean,
                default: false
            },
            activeTool: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            start: {
                get: function () {
                    if (this.startDate === "" || this.startTime === "") {
                        return new Date();
                    } else {
                        return new Date(this.startDate + "T" + this.startTime);
                    }
                },
                set: function (date) {
                    const isoString = date.toISOString();
                    this.startDate = isoString.split("T")[0];
                    const timeArray = isoString.split("T")[1].split(":");
                    this.startTime = timeArray[0] + ":" + timeArray[1];
                }
            },
            end: {
                get: function () {
                    if (this.endDate === "" || this.endTime === "") {
                        return new Date();
                    } else {
                        return new Date(this.endDate + "T" + this.endTime);
                    }
                },
                set: function (date) {
                    const isoString = date.toISOString();
                    this.endDate = isoString.split("T")[0];
                    const timeArray = isoString.split("T")[1].split(":");
                    this.endTime = timeArray[0] + ":" + timeArray[1];
                }
            }
        },
        watch: {
            start: function () {
                this.checkDates(this.start, this.end);
            },
            end: function () {
                this.checkDates(this.start, this.end);
            },
            activeTool: function (value) {
                if (!value) {
                    this.$refs.selectedLayerIdsSelect.isMenuActive = false;
                }
            }
        },
        mounted: function () {
            this.$emit('startup');
        },
        methods: {
            checkDates(start, end) {
                this.error = start.getTime() > end.getTime();
            }
        }
    };
</script>
