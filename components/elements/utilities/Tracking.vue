<template>
    <div class="col col-main">
        <div class="has-sticky">
            <div class="card">
                <div class="card-body">
                    <section class="timeline is-vertical">

                        <div class="timeline-list"
                            v-for="(item, i) in orderTrack.slice($props.indexSequence, orderTrack.length)" :key="i">
                            <!-- Reverse the Child array outside of v-for -->
                            <template v-if="item.Child && item.Child.length > 0">
                                <template v-if="i !== 0 || (i === 0 && $props.isShowchild)">
                                    <!-- Reverse the Child array -->
                                    <template v-for="(child, j) in item.Child.slice().reverse()" :key="j">
                                        <div :class="useUtility().getClassFromStatusOrder(child?.StatusCode)">
                                            <div class="datetime">
                                                <time datetime="2022-02-08 12:10">{{
                                                    useUtility().formatDate(child?.TrackDate, "D MMM BBBB") }}<span>{{
                                                    useUtility().formatDate(child?.TrackDate, "HH:mm") }}</span></time>
                                            </div>
                                            <figure class="timeline-icon">
                                                <div :class="useUtility().getIconFromStatusOrder(child?.StatusCode)"></div>
                                            </figure>
                                            <div class="detail">
                                                <h4 class="title"> {{ child?.StatusText }}</h4>
                                                <p v-for="(text, k) in child?.FullText.split('\\n')" :key="k">
                                                    <span v-html="useUtility().formatText(text)"></span>
                                                </p>
                                            </div>
                                        </div>
                                    </template>
                                </template>
                            </template>

                                <div class="timeline-item is-success"
                                    v-if="item.Parent?.Type !== 'OrderComplete' || (item.Parent?.Type === 'OrderComplete' && $props.isShowchild !== true)">
                                    <div class="datetime">
                                        <!-- <time datetime="2022-02-09 09:30">2022-02-09<span>09:30</span></time> -->
                                    </div>
                                    <figure class="timeline-icon">
                                        <div class="icon check"></div>
                                    </figure>
                                    <div class="detail">
                                        <h4 class="title"> {{ item.Parent?.Name }} </h4>
                                    </div>
                                </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type {
    TrackOrderRes
} from "~/shared/entities/track-entity";
import { IconType } from "~/shared/entities/enum-entity";

const orderTrack: globalThis.Ref<TrackOrderRes[] | undefined> = ref([]);

// Example usage
const iconClass = ref("");
console.log(iconClass);

const props = defineProps({
    indexSequence: Number,
    indexCurrent: Number,
    isShowchild: Boolean,
    orderTrack: {
        type: Array<TrackOrderRes>,
        default: Array<TrackOrderRes>,
    },
    IconType: Object as () => IconType,
    IconTitle: String,
    IconText: String,
    IconPshow: Boolean,
});

const onLoad = onMounted(async () => {
    if (props.indexSequence) {
        orderTrack.value = props.orderTrack
        console.log("$props.indexSequence " + props.indexSequence)
        console.log("orderTrack.length " + orderTrack.value.length)
    }
});

watch(
    () => props.orderTrack,
    () => {
        orderTrack.value = props.orderTrack
        console.log("prop isShowchild value changed", props.isShowchild);
        console.log("prop indexSequence value changed", props.indexSequence);
        console.log("prop indexCurrent value changed", props.indexCurrent);
    }
);
</script>