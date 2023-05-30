<template>
    <FormKit type="text" label="รหัสผ่านใหม่" name="password" placeholder="รหัสผ่านใหม่" :validation="[['required'],
    ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
    ],
    ['length', 8, 128],
    ]" :validation-messages="{
    required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร'
}" autocomplete="off" />
    <FormKit type="text" label="ทวนรหัสผ่านใหม่อีกครั้ง" name="password_confirm" placeholder="ทวนรหัสผ่านใหม่" :validation="[['required'],
    ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
    ],
    ['length', 8, 128],
    ['confirm'],
    ]" :validation-messages="{
    required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร', confirm: 'รหัสผ่านไม่ตรงกัน'
}" autocomplete="off" />
</template>