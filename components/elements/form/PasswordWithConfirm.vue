<template>
  <div class="row-password-with-confirm">
    <div class="col-password">
      <FormKit type="password" label="กำหนดรหัสผ่าน" name="password" placeholder="ใส่รหัสผ่านที่ปลอดภัย" :validation="[['required'],
      ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
      ],
      ['length', 8, 128],
      ]" :validation-messages="{
  required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร'
}" autocomplete="off" />
    </div>
    <div class="col-password col-password-confirm">
      <FormKit type="password" label="ทวนรหัสผ่านอีกครั้ง" name="password_confirm" placeholder="กรุณาทวนรหัสผ่าน"
        :validation="[['required'],
        ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
        ],
        ['length', 8, 128],
        ['confirm'],
        ]" :validation-messages="{
  required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร', confirm: 'รหัสผ่านไม่ตรงกัน'
}" autocomplete="off" />
    </div>
  </div>
</template>