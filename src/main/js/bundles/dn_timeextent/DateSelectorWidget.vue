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
    <v-layout
        row
        wrap>
        <v-flex
            md12
            xs12>
            {{ title }}
        </v-flex>
        <v-flex
            md7
            xs7>
            <v-menu
                ref="menuDate"
                v-model="menuDate"
                :close-on-content-click="false"
                :return-value.sync="dateValue"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="dateFormatted"
                        prepend-icon="event"
                        class="pa-0"
                        single-line
                        readonly
                        v-on="on"
                        :rules="[rules.required]"
                    />
                </template>
                <v-date-picker
                    v-model="dateValue"
                    :locale="locale"
                    color="primary"
                    scrollable
                    full-width>
                    <v-spacer/>
                    <v-btn
                        flat
                        color="primary"
                        @click="menuDate = false">{{ i18n.cancel }}
                    </v-btn>
                    <v-btn
                        flat
                        color="primary"
                        @click="$refs.menuDate.save(dateValue)">{{ i18n.ok }}
                    </v-btn>
                </v-date-picker>
            </v-menu>
        </v-flex>
        <v-flex
            md5
            xs5>
            <v-menu
                ref="menuTime"
                v-model="menuTime"
                :close-on-content-click="false"
                :return-value.sync="timeValue"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="timeValue"
                        prepend-icon="access_time"
                        class="pa-0"
                        single-line
                        readonly
                        hide-details
                        v-on="on"
                        :rules="[rules.required]"
                    />
                </template>
                <v-time-picker
                    v-model="timeValue"
                    format="24hr"
                    color="primary"
                    scrollable
                    full-width>
                    <v-spacer/>
                    <v-btn
                        flat
                        color="primary"
                        @click="menuTime = false">{{ i18n.cancel }}
                    </v-btn>
                    <v-btn
                        flat
                        color="primary"
                        @click="$refs.menuTime.save(timeValue)">{{ i18n.ok }}
                    </v-btn>
                </v-time-picker>
            </v-menu>
        </v-flex>
    </v-layout>
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
                        resetFilter: "Reset",
                        errors: {
                            required: "Required value!",
                            wrongDate: "The end date is before the start date!"
                        }
                    }
                }
            },
            title: {
                type: String,
                default: ""
            },
            locale: {
                type: String,
                default: "en"
            },
            date: {
                type: String,
                default: ""
            },
            time: {
                type: String,
                default: ""
            },
            error: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                dateFormatted: "",
                dateValue: this.date,
                timeValue: this.time,
                menuDate: false,
                menuTime: false,
                rules: {
                    required: value => !!value || this.i18n.errors.required
                }
            }
        },
        watch: {
            date(date) {
                this.dateValue = date;
            },
            time(time) {
                this.timeValue = time;
            },
            dateValue() {
                this.dateFormatted = this.formatDate(this.dateValue);
                this.$emit('update:date', this.dateValue)
            },
            timeValue() {
                this.$emit('update:time', this.timeValue)
            }
        },
        beforeMount: function () {
            this.dateFormatted = this.formatDate(this.dateValue);
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
