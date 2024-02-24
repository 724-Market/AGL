<template>
  <div class="col col-main">
    <div class="has-sticky">

      <div class="card">
        <div class="card-body">

          <section class="timeline is-vertical">

            <template v-if="orderTrack" v-for="(item, i) in orderTrack.slice($props.indexSequence, orderTrack.length)"
              :key="i">

              <!-- Reverse the Child array outside of v-for -->
              <template v-if="item.Child && item.Child.length > 0">
                <template v-if="i !== 0 || (i === 0 && $props.isShowchild)">

                  <!-- Reverse the Child array -->
                  <template v-for="(child, j) in item.Child.slice().reverse()" :key="j">

                    <div class="timeline-list">

                      <!-- Display Child information -->
                      <div :class="['timeline-item', useUtility().getClassFromStatusOrder(child?.StatusCode)]">
                        <div class="datetime">
                          <time :datetime="child?.TrackDate">
                            {{ useUtility().formatDate(child?.TrackDate, "ShortDate") }}
                            <span>{{ useUtility().formatDate(child?.TrackDate, "ShortTime") }}</span>
                          </time>
                        </div>
                        <figure class="timeline-icon">
                          <div :class="['icon', useUtility().getIconFromStatusOrder(child?.StatusCode)]"></div>
                        </figure>
                        <div class="detail">
                          <h4 class="title">{{ child?.StatusText }}</h4>
                          <p v-for="(text, k) in child?.FullText.split('\\n')" :key="k">
                            <span v-html="useUtility().formatText(text)"></span>
                          </p>
                        </div>
                      </div>

                    </div>

                  </template>
                </template>
              </template>

              <div class="timeline-list">

                <div :class="['timeline-item', 'is-success']"
                  v-if="item.Parent?.Type !== 'OrderComplete' || (item.Parent?.Type === 'OrderComplete' && $props.isShowchild !== true)">
                  <div class="datetime">
                    <time :datetime="item.Parent?.TrackDate" v-if="item.Parent?.TrackDate">
                      {{ useUtility().formatDate(item.Parent?.TrackDate, "ShortDate") }}
                      <span>{{ useUtility().formatDate(item.Parent?.TrackDate, "ShortTime") }}</span>
                    </time>
                  </div>
                  <figure class="timeline-icon">
                    <div class="icon check"></div>
                  </figure>
                  <div class="detail">
                    <h4 class="title">{{ item.Parent?.Name }}</h4>
                  </div>
                </div>

              </div>

            </template>

          </section>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { TrackOrderRes } from "~/shared/entities/track-entity"
import { IconType } from "~/shared/entities/enum-entity"

const orderTrack = ref<TrackOrderRes[] | undefined>(undefined)

/////////////////////////////////////////
// Define props for the component
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
  IconPshow: Boolean
})

/////////////////////////////////////////
// On component mount, set the value of orderTrack based on props
onMounted(() => {
  if (props.indexSequence) {
    orderTrack.value = props.orderTrack
  }
})

/////////////////////////////////////////
// Watch for changes in the orderTrack prop and update the ref accordingly
watch(
  () => props.orderTrack,
  () => {
    orderTrack.value = props.orderTrack
  }
)
</script>