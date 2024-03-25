<template>
  <div v-if="props.field && props.field == 'createdate' && props.row">
    <time :datetime="props.row.CreateDate">{{ useUtility().formatDate(props.row.CreateDate) }}</time>
  </div>

  <div v-if="props.field && props.field == 'username' && props.row">
    {{ props.row.UserName }}
  </div>

  <div v-if="props.field && props.field == 'firstname' && props.row">
    {{ props.row.FirstName }} {{ props.row.LastName }}
    <span v-if="props.row.Phone != ''">{{ props.row.Phone }}</span>
  </div>

  <div v-if="props.field && props.field == 'usergroupname' && props.row">
    {{ props.row.UserGroupName }}
  </div>

  <div v-if="props.field && props.field == 'creditlimitamount' && props.row">
    {{ useUtility().getCurrency(parseInt(props.row.CreditLimitAmount, 10), 0) }}
  </div>

  <template v-if="props.field && props.field == 'isactive' && props.row">
    <template v-if="props.row.IsActive == true">
      <div class="formkit-form">
        <div class="formkit-outer" data-type="toggle">
          <div class="formkit-wrapper">
            <label class="formkit-inner">
              <input class="formkit-input" type="checkbox" value="active" checked readonly>
              <div class="formkit-track">
                <div class="formkit-thumb"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </template>
    <template v-if="props.row.IsActive == false">
      <div class="formkit-form">
        <div class="formkit-outer" data-type="toggle">
          <div class="formkit-wrapper">
            <label class="formkit-inner">
              <input class="formkit-input" type="checkbox" value="active" readonly>
              <div class="formkit-track">
                <div class="formkit-thumb"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </template>
  </template>
</template>

<script lang="ts" setup>
// Define import
import type { UsersHistoryResponse } from "~/shared/entities/user-entity"

// Define props
const props = defineProps({
  row: {
    type: Object as () => UsersHistoryResponse
  },
  field: String
})
</script>