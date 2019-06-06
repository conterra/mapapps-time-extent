<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-select
            :items="layers"
            v-model="selectedLayerId"
            class="pa-0"
            item-value="id"
            item-text="title"
            single-line
            hide-details
        />
        <v-btn
            block
            ripple
            color="primary"
            @click="$emit('setFilter', {})">
            {{ i18n.filter }}
        </v-btn>
    </div>
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
                        filter: "Set Filter"
                    }
                }
            },
            layers: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            selectedLayerId: {
                type: String,
                default: ""
            }
        }
    };
</script>
