<template>
    <div v-if="props.field && props.field == 'createdate' && props.row">
      <time datetime="2023-05-05 08:08">{{ useUtility().formatDate(props.row.CreateDate,"D MMM BBBB HH:mm") }}</time>
    </div>
    <div v-if="props.field && props.field == 'username' && props.row">
      #{{ props.row.UserName
      }}
    </div>
    <div v-if="props.field && props.field == 'firstname' && props.row">
      {{ props.row.FirstName }} {{ props.row.LastName
    }}<span v-if="props.row.Phone != ''"
      >{{ props.row.Phone
      }}<!--089-xxx-x478--></span
    >
    </div>
    <div v-if="props.field && props.field == 'usergroupname' && props.row">
      {{ props.row.UserGroupName }} 
    </div>
    <div v-if="props.field && props.field == 'creditlimitamount' && props.row">
      {{ useUtility().getCurrency(props.row.CreditLimitAmount, 2) }}
    </div>
    <div v-if="props.field && props.field == 'isactive' && props.row">
      <div class="status" v-if="props.row.IsActive == true">
        True
      </div>
      <div class="toggle" v-if="props.row.IsActive == false">
        False
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import { UsersHistoryResponse } from "~/shared/entities/user-entity";
  

  const props = defineProps({
    row: {
      type: Object as () => UsersHistoryResponse,
    },
    field: String,
    click:Function
  });
  
  </script>
  