<template>
  <div v-if="props.field && props.field == 'createdate' && props.row">
    <time :datetime="props.row.CreateDate">{{ useUtility().formatDate(props.row.CreateDate, "D MMM BBBB HH:mm") }}</time>
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

  <div v-if="props.field && props.field == 'isactive' && props.row">
    <div class="status" v-if="props.row.IsActive == true">
      <form class="formkit-form">
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
      </form>
    </div>
    <div class="status" v-if="props.row.IsActive == false">
      <form class="formkit-form">
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
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Define import
import { UsersHistoryResponse } from "~/shared/entities/user-entity"

// Define props
const props = defineProps({
  row: {
    type: Object as () => UsersHistoryResponse
  },
  field: String
})
</script>