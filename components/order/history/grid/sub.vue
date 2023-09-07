
<template>
    <tr class="is-child"  v-for="item in props.row" :key="item.OrderNo">
            <td>
              <OrderHistoryGridMenu :row="item"></OrderHistoryGridMenu>
            </td>
            <td class="the-child"></td>
            <td class="order"><OrderHistoryGridColumn :field="'order'" :row="item"></OrderHistoryGridColumn></td>
            <td class="subject"><OrderHistoryGridColumn :field="'subject'" :row="item"></OrderHistoryGridColumn></td>
            <td class="amount"><OrderHistoryGridColumn :field="'amount'" :row="item"></OrderHistoryGridColumn></td>
            <td class="name"><OrderHistoryGridColumn :field="'name'" :row="item"></OrderHistoryGridColumn></td>
            <td class="status"><OrderHistoryGridColumn :field="'status'" :row="item"></OrderHistoryGridColumn></td>
            <td>
                <OrderHistoryGridColumn :field="'meta'" :row="item"></OrderHistoryGridColumn>
            </td>
          </tr>
</template>
<script lang="ts" setup>
import { HistoryResponse } from "~/shared/entities/order-entity";

const props = defineProps({
  row: {
    type: Object as () => HistoryResponse[],
  },
});

</script>