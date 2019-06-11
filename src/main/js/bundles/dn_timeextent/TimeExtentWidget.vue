<template>
    <v-container
        grid-list-md
        fluid
        class="pa-1">
        <div>{{ i18n.layer }}</div>
        <v-select
            :items="layers"
            item-value="id"
            item-text="title"
            multiple
            v-model="selectedLayerIds"
            class="pa-0"
            single-line
            hide-details
        />
        <date-selector-widget
            :locale="locale"
            :title="i18n.start"
            :date.sync="startDate"
            :time.sync="startTime"
            :i18n="i18n"/>
        <date-selector-widget
            :locale="locale"
            :title="i18n.end"
            :date.sync="endDate"
            :time.sync="endTime"
            :i18n="i18n"/>
        <v-layout
            row
            wrap>
            <v-flex
                md6
                xs6>
                <v-btn
                    block
                    ripple
                    color="primary"
                    @click="$emit('setFilter', {})">
                    <v-icon dark left>filter</v-icon>
                    {{ i18n.setFilter }}
                </v-btn>
            </v-flex>
            <v-flex
                md6
                xs6>
                <v-btn
                    block
                    ripple
                    color="primary"
                    @click="$emit('resetFilter', {})">
                    <v-icon dark left>restore</v-icon>
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
                    let isoString = date.toISOString();
                    this.startDate = isoString.split("T")[0];
                    let timeArray = isoString.split("T")[1].split(":");
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
                    let isoString = date.toISOString();
                    this.endDate = isoString.split("T")[0];
                    let timeArray = isoString.split("T")[1].split(":");
                    this.endTime = timeArray[0] + ":" + timeArray[1];
                }
            }
        },
        mounted: function () {
            this.$emit('startup');
        },
        methods: {
            formatDate(date) {
                if (!date) return null;

                const [year, month, day] = date.split('-');
                return `${day}.${month}.${year}`;
            }
        }
    };
</script>
