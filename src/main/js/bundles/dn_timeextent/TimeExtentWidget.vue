<template>
    <v-container
        grid-list-md
        fluid
        class="pa-1">
        <v-layout
            row
            wrap>
            <v-flex
                md12
                xs12>
                {{ i18n.layer }}
            </v-flex>
            <v-flex md12>
                <v-select
                    :items="layers"
                    v-model="selectedLayerIds"
                    class="pa-0"
                    item-value="id"
                    item-text="title"
                    multiple
                    single-line
                    hide-details
                />
            </v-flex>
            <v-flex
                md12
                xs12>
                {{ i18n.start }}
            </v-flex>
            <v-flex
                md7
                xs7>
                <v-menu
                    ref="menuStart"
                    v-model="menuStart"
                    :close-on-content-click="false"
                    :return-value.sync="dateStart"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="dateStart"
                            label="Date"
                            prepend-icon="event"
                            class="pa-0"
                            single-line
                            readonly
                            hide-details
                            v-on="on"
                        />
                    </template>
                    <v-date-picker
                        v-model="dateStart"
                        :locale="locale"
                        scrollable
                        full-width>
                        <v-spacer/>
                        <v-btn
                            flat
                            color="primary"
                            @click="menuStart = false">{{ i18n.cancel }}
                        </v-btn>
                        <v-btn
                            flat
                            color="primary"
                            @click="$refs.menuStart.save(dateStart)">{{ i18n.ok }}
                        </v-btn>
                    </v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex
                md5
                xs5>
                <v-menu
                    ref="menuStartTime"
                    v-model="menuStartTime"
                    :close-on-content-click="false"
                    :return-value.sync="timeStart"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="timeStart"
                            label="Date"
                            prepend-icon="access_time"
                            class="pa-0"
                            single-line
                            readonly
                            hide-details
                            v-on="on"
                        />
                    </template>
                    <v-time-picker
                        v-model="timeStart"
                        format="24hr"
                        scrollable
                        full-width>
                        <v-spacer/>
                        <v-btn
                            flat
                            color="primary"
                            @click="menuStartTime = false">{{ i18n.cancel }}
                        </v-btn>
                        <v-btn
                            flat
                            color="primary"
                            @click="$refs.menuStartTime.save(timeStart)">{{ i18n.ok }}
                        </v-btn>
                    </v-time-picker>
                </v-menu>
            </v-flex>
            <v-flex
                md12
                xs12>
                {{ i18n.end }}
            </v-flex>
            <v-flex
                md7
                xs7>
                <v-menu
                    ref="menuEnd"
                    v-model="menuEnd"
                    :close-on-content-click="false"
                    :return-value.sync="dateEnd"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="dateEnd"
                            label="Date"
                            prepend-icon="event"
                            class="pa-0"
                            single-line
                            readonly
                            hide-details
                            v-on="on"
                        />
                    </template>
                    <v-date-picker
                        v-model="dateEnd"
                        :locale="locale"
                        scrollable
                        full-width>
                        <v-spacer/>
                        <v-btn
                            flat
                            color="primary"
                            @click="menuEnd = false">{{ i18n.cancel }}
                        </v-btn>
                        <v-btn
                            flat
                            color="primary"
                            @click="$refs.menuEnd.save(dateEnd)">{{ i18n.ok }}
                        </v-btn>
                    </v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex
                md5
                xs5>
                <v-menu
                    ref="menuEndTime"
                    v-model="menuEndTime"
                    :close-on-content-click="false"
                    :return-value.sync="timeEnd"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="timeEnd"
                            label="Date"
                            prepend-icon="access_time"
                            class="pa-0"
                            single-line
                            readonly
                            hide-details
                            v-on="on"
                        />
                    </template>
                    <v-time-picker
                        v-model="timeEnd"
                        format="24hr"
                        scrollable
                        full-width>
                        <v-spacer/>
                        <v-btn
                            flat
                            color="primary"
                            @click="menuEndTime = false">{{ i18n.cancel }}
                        </v-btn>
                        <v-btn
                            flat
                            color="primary"
                            @click="$refs.menuEndTime.save(timeEnd)">{{ i18n.ok }}
                        </v-btn>
                    </v-time-picker>
                </v-menu>
            </v-flex>
            <v-flex
                md6
                xs6>
                <v-btn
                    block
                    ripple
                    color="primary"
                    @click="$emit('setFilter', {})">{{ i18n.setFilter }}
                </v-btn>
            </v-flex>
            <v-flex
                md6
                xs6>
                <v-btn
                    block
                    ripple
                    color="primary"
                    @click="$emit('resetFilter', {})">{{ i18n.resetFilter }}
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import Bindable from "apprt-vue/mixins/Bindable";

    export default {
        components: {},
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
            dateStart: {
                type: String,
                default: ""
            },
            timeStart: {
                type: String,
                default: ""
            },
            dateEnd: {
                type: String,
                default: ""
            },
            timeEnd: {
                type: String,
                default: ""
            },
            dateStartFormatted: {
                type: String,
                default: ""
            },
            dateEndFormatted: {
                type: String,
                default: ""
            },
            menuStart: {
                type: Boolean,
                default: false
            },
            menuStartTime: {
                type: Boolean,
                default: false
            },
            menuEnd: {
                type: Boolean,
                default: false
            },
            menuEndTime: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            dateStart() {
                this.dateStartFormatted = this.formatDate(this.dateStart)
            },
            dateEnd() {
                this.dateEndFormatted = this.formatDate(this.dateEnd)
            }
        },
        mounted: function () {
            this.$emit('startup');
        },
        methods: {
            formatDate(date) {
                if (!date) return null;

                const [year, month, day] = date.split('-');
                return `${month}/${day}/${year}`;
            }
        }
    };
</script>
