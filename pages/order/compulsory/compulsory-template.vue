<template>
  <NuxtLayout :name="layout">

    <!-- Content -->
    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">

      <div class="row">
        <div class="col-lg-8 col-xl-9">

          <div class="card">
            <div class="card-body">

              <div class="summary-detail">
                <header class="topic">
                  <h5 class="label"><i class="fa-duotone fa-car"></i>ข้อมูลรถของท่าน:</h5>
                  <h6 class="detail">TOYOTA Yaris 1.2 Smart Auto 2019</h6>
                </header>
                <div class="meta">
                  <!-- TODO Change focus ring position -->
                  <a class="edit fa-icon no-icon" href="#">แก้ไข</a>
                  <div class="validate is-success"><i class="fa-solid fa-circle-check"></i></div>
                </div>
              </div>

            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">ระบุข้อมูลรถยนต์</h3>
            </div>
            <div class="card-body">
              <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>

              <div class="form-inline">
                <ElementsFormRadioCarUse />
              </div>

              <div class="form-inline">
                <ElementsFormSelectCarType />
              </div>

              <div class="form-inline">
                <FormKit type="select" label="ขนาดรถยนต์" name="CarSize" placeholder="เลือกข้อมูล" :options="{
                  1: '1',
                  2: '2',
                  3: '3',
                }" validation="required" :validation-messages="{
  required: 'กรุณาเลือกข้อมูล',
}" />
              </div>

              <div class="form-inline">
                <FormKit type="select" label="ปีที่จดทะเบียน" name="CarYear" placeholder="เลือกข้อมูล" :options="{
                  1: '1',
                  2: '2',
                  3: '3',
                }" validation="required" :validation-messages="{
  required: 'กรุณาเลือกข้อมูล',
}" />
              </div>

              <div class="form-inline">
                <FormKit type="text" label="ขนาดเครื่องยนต์" name="CarCC" placeholder="ระบุ cc ของเครื่องยนต์" />
              </div>

            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">เลือกวันคุ้มครอง</h3>
            </div>
            <div class="card-body">
              <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>

              <div class="form-inline">
                <ElementsFormUsername />
              </div>

              <div class="form-inline">
                <ElementsFormIdCard />
              </div>

            </div>
          </div>

          <div class="card">
            <div class="card-body">

              <div class="your-first-form">
                <img src="https://pro.formkit.com/logo.svg" alt="FormKit Logo" width="244" height="50" class="logo">
                <FormKit type="form" #default="{ value }" @submit="submit">

                  <FormKit type="autocomplete" name="country" label="Search for a country"
                    placeholder="Example: United States" :options="countries" />

                  <FormKit type="slider" value="33" step="0.1" label="A single slider with a visible input"
                    help="I have a single linked input" show-input tooltip="true" />

                  <FormKit label="Primary Label" type="toggle" />

                  <FormKit type="text" name="name" label="Name" help="What do people call you?" />
                  <FormKit type="checkbox" name="flavors" label="Favorite ice cream flavors" :options="{
                    'vanilla': 'Vanilla',
                    'chocolate': 'Chocolate',
                    'strawberry': 'Strawberry',
                    'mint-chocolate-chip': 'Mint Chocolate Chip',
                    'rocky-road': 'Rocky Road',
                    'cookie-dough': 'Cookie Dough',
                    'pistachio': 'Pistachio',
                  }" validation="required|min:2" />

                  <FormKit type="repeater" name="invitees" label="Invitees" help="Who else should we invite to FormKit?">
                    <FormKit type="text" name="email" label="Email" validation="required|email" />
                  </FormKit>
                  <FormKit type="checkbox" name="agree" label="I agree FormKit is the best form authoring framework." />
                  <pre>{{ value }}</pre>
                </FormKit>
              </div>

            </div>
          </div>

        </div>

        <!-- Sidebar -->
        <div class="col-lg-4 col-xl-3">

          <aside class="card">
            <div class="card-header">
              <h3 class="card-title">รายการที่ท่านเลือก</h3>
            </div>

          </aside>

          <FormKit type="submit" label="ต่อไป" name="order-submit" id="order-submit" :classes="{
            input: 'btn-primary',
            outer: 'form-actions'
          }" :disabled="isLoading" :loading="isLoading" />

          <a href="#" class="btn btn-back btn-primary-outline">ย้อนกลับ</a>

        </div>
      </div>

    </FormKit>

  </NuxtLayout>
</template>

<script setup>
async function submit() {
  await new Promise(r => setTimeout(r, 1000))
  alert('Submitted! 🎉')
}
const countries = [{ label: 'Afghanistan', value: 'AF' }, { label: 'Åland Islands', value: 'AX' }, { label: 'Albania', value: 'AL' }, { label: 'Algeria', value: 'DZ' }, { label: 'American Samoa', value: 'AS' }, { label: 'AndorrA', value: 'AD' }, { label: 'Angola', value: 'AO' }, { label: 'Anguilla', value: 'AI' }, { label: 'Antarctica', value: 'AQ' }, { label: 'Antigua and Barbuda', value: 'AG' }, { label: 'Argentina', value: 'AR' }, { label: 'Armenia', value: 'AM' }, { label: 'Aruba', value: 'AW' }, { label: 'Australia', value: 'AU' }, { label: 'Austria', value: 'AT' }, { label: 'Azerbaijan', value: 'AZ' }, { label: 'Bahamas', value: 'BS' }, { label: 'Bahrain', value: 'BH' }, { label: 'Bangladesh', value: 'BD' }, { label: 'Barbados', value: 'BB' }, { label: 'Belarus', value: 'BY' }, { label: 'Belgium', value: 'BE' }, { label: 'Belize', value: 'BZ' }, { label: 'Benin', value: 'BJ' }, { label: 'Bermuda', value: 'BM' }, { label: 'Bhutan', value: 'BT' }, { label: 'Bolivia', value: 'BO' }, { label: 'Bosnia and Herzegovina', value: 'BA' }, { label: 'Botswana', value: 'BW' }, { label: 'Bouvet Island', value: 'BV' }, { label: 'Brazil', value: 'BR' }, { label: 'British Indian Ocean Territory', value: 'IO' }, { label: 'Brunei Darussalam', value: 'BN' }, { label: 'Bulgaria', value: 'BG' }, { label: 'Burkina Faso', value: 'BF' }, { label: 'Burundi', value: 'BI' }, { label: 'Cambodia', value: 'KH' }, { label: 'Cameroon', value: 'CM' }, { label: 'Canada', value: 'CA' }, { label: 'Cape Verde', value: 'CV' }, { label: 'Cayman Islands', value: 'KY' }, { label: 'Central African Republic', value: 'CF' }, { label: 'Chad', value: 'TD' }, { label: 'Chile', value: 'CL' }, { label: 'China', value: 'CN' }, { label: 'Christmas Island', value: 'CX' }, { label: 'Cocos (Keeling) Islands', value: 'CC' }, { label: 'Colombia', value: 'CO' }, { label: 'Comoros', value: 'KM' }, { label: 'Congo', value: 'CG' }, { label: 'Congo, The Democratic Republic of the', value: 'CD' }, { label: 'Cook Islands', value: 'CK' }, { label: 'Costa Rica', value: 'CR' }, { label: "Cote D'Ivoire", value: 'CI' }, { label: 'Croatia', value: 'HR' }, { label: 'Cuba', value: 'CU' }, { label: 'Cyprus', value: 'CY' }, { label: 'Czech Republic', value: 'CZ' }, { label: 'Denmark', value: 'DK' }, { label: 'Djibouti', value: 'DJ' }, { label: 'Dominica', value: 'DM' }, { label: 'Dominican Republic', value: 'DO' }, { label: 'Ecuador', value: 'EC' }, { label: 'Egypt', value: 'EG' }, { label: 'El Salvador', value: 'SV' }, { label: 'Equatorial Guinea', value: 'GQ' }, { label: 'Eritrea', value: 'ER' }, { label: 'Estonia', value: 'EE' }, { label: 'Ethiopia', value: 'ET' }, { label: 'Falkland Islands (Malvinas)', value: 'FK' }, { label: 'Faroe Islands', value: 'FO' }, { label: 'Fiji', value: 'FJ' }, { label: 'Finland', value: 'FI' }, { label: 'France', value: 'FR' }, { label: 'French Guiana', value: 'GF' }, { label: 'French Polynesia', value: 'PF' }, { label: 'French Southern Territories', value: 'TF' }, { label: 'Gabon', value: 'GA' }, { label: 'Gambia', value: 'GM' }, { label: 'Georgia', value: 'GE' }, { label: 'Germany', value: 'DE' }, { label: 'Ghana', value: 'GH' }, { label: 'Gibraltar', value: 'GI' }, { label: 'Greece', value: 'GR' }, { label: 'Greenland', value: 'GL' }, { label: 'Grenada', value: 'GD' }, { label: 'Guadeloupe', value: 'GP' }, { label: 'Guam', value: 'GU' }, { label: 'Guatemala', value: 'GT' }, { label: 'Guernsey', value: 'GG' }, { label: 'Guinea', value: 'GN' }, { label: 'Guinea-Bissau', value: 'GW' }, { label: 'Guyana', value: 'GY' }, { label: 'Haiti', value: 'HT' }, { label: 'Heard Island and Mcdonald Islands', value: 'HM' }, { label: 'Holy See (Vatican City State)', value: 'VA' }, { label: 'Honduras', value: 'HN' }, { label: 'Hong Kong', value: 'HK' }, { label: 'Hungary', value: 'HU' }, { label: 'Iceland', value: 'IS' }, { label: 'India', value: 'IN' }, { label: 'Indonesia', value: 'ID' }, { label: 'Iran, Islamic Republic Of', value: 'IR' }, { label: 'Iraq', value: 'IQ' }, { label: 'Ireland', value: 'IE' }, { label: 'Isle of Man', value: 'IM' }, { label: 'Israel', value: 'IL' }, { label: 'Italy', value: 'IT' }, { label: 'Jamaica', value: 'JM' }, { label: 'Japan', value: 'JP' }, { label: 'Jersey', value: 'JE' }, { label: 'Jordan', value: 'JO' }, { label: 'Kazakhstan', value: 'KZ' }, { label: 'Kenya', value: 'KE' }, { label: 'Kiribati', value: 'KI' }, { label: "Korea, Democratic People'S Republic of", value: 'KP' }, { label: 'Korea, Republic of', value: 'KR' }, { label: 'Kuwait', value: 'KW' }, { label: 'Kyrgyzstan', value: 'KG' }, { label: "Lao People'S Democratic Republic", value: 'LA' }, { label: 'Latvia', value: 'LV' }, { label: 'Lebanon', value: 'LB' }, { label: 'Lesotho', value: 'LS' }, { label: 'Liberia', value: 'LR' }, { label: 'Libyan Arab Jamahiriya', value: 'LY' }, { label: 'Liechtenstein', value: 'LI' }, { label: 'Lithuania', value: 'LT' }, { label: 'Luxembourg', value: 'LU' }, { label: 'Macao', value: 'MO' }, { label: 'Macedonia, The Former Yugoslav Republic of', value: 'MK' }, { label: 'Madagascar', value: 'MG' }, { label: 'Malawi', value: 'MW' }, { label: 'Malaysia', value: 'MY' }, { label: 'Maldives', value: 'MV' }, { label: 'Mali', value: 'ML' }, { label: 'Malta', value: 'MT' }, { label: 'Marshall Islands', value: 'MH' }, { label: 'Martinique', value: 'MQ' }, { label: 'Mauritania', value: 'MR' }, { label: 'Mauritius', value: 'MU' }, { label: 'Mayotte', value: 'YT' }, { label: 'Mexico', value: 'MX' }, { label: 'Micronesia, Federated States of', value: 'FM' }, { label: 'Moldova, Republic of', value: 'MD' }, { label: 'Monaco', value: 'MC' }, { label: 'Mongolia', value: 'MN' }, { label: 'Montenegro', value: 'ME' }, { label: 'Montserrat', value: 'MS' }, { label: 'Morocco', value: 'MA' }, { label: 'Mozambique', value: 'MZ' }, { label: 'Myanmar', value: 'MM' }, { label: 'Namibia', value: 'NA' }, { label: 'Nauru', value: 'NR' }, { label: 'Nepal', value: 'NP' }, { label: 'Netherlands', value: 'NL' }, { label: 'Netherlands Antilles', value: 'AN' }, { label: 'New Caledonia', value: 'NC' }, { label: 'New Zealand', value: 'NZ' }, { label: 'Nicaragua', value: 'NI' }, { label: 'Niger', value: 'NE' }, { label: 'Nigeria', value: 'NG' }, { label: 'Niue', value: 'NU' }, { label: 'Norfolk Island', value: 'NF' }, { label: 'Northern Mariana Islands', value: 'MP' }, { label: 'Norway', value: 'NO' }, { label: 'Oman', value: 'OM' }, { label: 'Pakistan', value: 'PK' }, { label: 'Palau', value: 'PW' }, { label: 'Palestinian Territory, Occupied', value: 'PS' }, { label: 'Panama', value: 'PA' }, { label: 'Papua New Guinea', value: 'PG' }, { label: 'Paraguay', value: 'PY' }, { label: 'Peru', value: 'PE' }, { label: 'Philippines', value: 'PH' }, { label: 'Pitcairn', value: 'PN' }, { label: 'Poland', value: 'PL' }, { label: 'Portugal', value: 'PT' }, { label: 'Puerto Rico', value: 'PR' }, { label: 'Qatar', value: 'QA' }, { label: 'Reunion', value: 'RE' }, { label: 'Romania', value: 'RO' }, { label: 'Russian Federation', value: 'RU' }, { label: 'RWANDA', value: 'RW' }, { label: 'Saint Helena', value: 'SH' }, { label: 'Saint Kitts and Nevis', value: 'KN' }, { label: 'Saint Lucia', value: 'LC' }, { label: 'Saint Pierre and Miquelon', value: 'PM' }, { label: 'Saint Vincent and the Grenadines', value: 'VC' }, { label: 'Samoa', value: 'WS' }, { label: 'San Marino', value: 'SM' }, { label: 'Sao Tome and Principe', value: 'ST' }, { label: 'Saudi Arabia', value: 'SA' }, { label: 'Senegal', value: 'SN' }, { label: 'Serbia', value: 'RS' }, { label: 'Seychelles', value: 'SC' }, { label: 'Sierra Leone', value: 'SL' }, { label: 'Singapore', value: 'SG' }, { label: 'Slovakia', value: 'SK' }, { label: 'Slovenia', value: 'SI' }, { label: 'Solomon Islands', value: 'SB' }, { label: 'Somalia', value: 'SO' }, { label: 'South Africa', value: 'ZA' }, { label: 'South Georgia and the South Sandwich Islands', value: 'GS' }, { label: 'Spain', value: 'ES' }, { label: 'Sri Lanka', value: 'LK' }, { label: 'Sudan', value: 'SD' }, { label: 'Suriname', value: 'SR' }, { label: 'Svalbard and Jan Mayen', value: 'SJ' }, { label: 'Swaziland', value: 'SZ' }, { label: 'Sweden', value: 'SE' }, { label: 'Switzerland', value: 'CH' }, { label: 'Syrian Arab Republic', value: 'SY' }, { label: 'Taiwan, Province of China', value: 'TW' }, { label: 'Tajikistan', value: 'TJ' }, { label: 'Tanzania, United Republic of', value: 'TZ' }, { label: 'Thailand', value: 'TH' }, { label: 'Timor-Leste', value: 'TL' }, { label: 'Togo', value: 'TG' }, { label: 'Tokelau', value: 'TK' }, { label: 'Tonga', value: 'TO' }, { label: 'Trinidad and Tobago', value: 'TT' }, { label: 'Tunisia', value: 'TN' }, { label: 'Turkey', value: 'TR' }, { label: 'Turkmenistan', value: 'TM' }, { label: 'Turks and Caicos Islands', value: 'TC' }, { label: 'Tuvalu', value: 'TV' }, { label: 'Uganda', value: 'UG' }, { label: 'Ukraine', value: 'UA' }, { label: 'United Arab Emirates', value: 'AE' }, { label: 'United Kingdom', value: 'GB' }, { label: 'United States', value: 'US' }, { label: 'United States Minor Outlying Islands', value: 'UM' }, { label: 'Uruguay', value: 'UY' }, { label: 'Uzbekistan', value: 'UZ' }, { label: 'Vanuatu', value: 'VU' }, { label: 'Venezuela', value: 'VE' }, { label: 'Viet Nam', value: 'VN' }, { label: 'Virgin Islands, British', value: 'VG' }, { label: 'Virgin Islands, U.S.', value: 'VI' }, { label: 'Wallis and Futuna', value: 'WF' }, { label: 'Western Sahara', value: 'EH' }, { label: 'Yemen', value: 'YE' }, { label: 'Zambia', value: 'ZM' }, { label: 'Zimbabwe', value: 'ZW' }]
// Define Variables
// Loading state after form submiting
const isLoading = ref(false)

// Submitted state after submit
const submitted = ref(false)

// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

// Binding default value
// case 1
// const values = reactive({
//   username: 'AM00371908',
//   idcard: '1100400284852'
// })
// case 2
// const values = reactive({
//   username: 'AM00125633',
//   idcard: '3909900809081'
// })

// Submit form event
const submitOrder = async (formData) => {
  console.log('%cOrder%cformData', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(222, 125, 44);padding:3px;border-radius:2px', formData)

  // Add waiting time for debug
  await new Promise((r) => setTimeout(r, 1000))

  const response = await useCallApi().get({
    URL: '/Agent/user/check',
    AgentCode: formData.username,
    IDCard: formData.idcard,
  })

  statusMessage.value = response.statusMessage
  statusMessageType.value = response.statusMessageType
  submitted.value = false // Form submitted status
}

// Define layout
const layout = "monito"

// Define meta seo
useHead({
  title: "Compulsory Template",
  meta: [{ name: "description", content: "Compulsory Template" }],
  bodyAttrs: {
    class: "page-order single-name",
  },
})
</script>