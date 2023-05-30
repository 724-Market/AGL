<template>
    <FormKit type="select" label="ประเภทรถยนต์" name="CarType" placeholder="เลือกข้อมูล" :options="{
        car: 'รถเก๋ง',
        pickup: 'รถกระบะ',
        taxi: 'รถแท๊กซี่',
        van: 'รถตู้',
        others: 'ให้สนู้ปปี้ไชโยที่กุ้ง',
    }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
</template>