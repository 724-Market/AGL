<template>
  <div class="summary-table">
    <table class="table no-striped">
      <thead>
        <tr>
          <th scope="col">รายการกระดาษ</th>
          <th scope="col" class="text-end">ราคามัดจำ (บาท)</th>
        </tr>
      </thead>
      <tbody>
        <tr class="spacer">
          <td colspan="2"></td>
        </tr>
        <tr class="product">
          <th scope="row">
            ราคามัดจำ 500<span>พ.ร.บ. • ทิพยประกันภัย</span
            ><a class="btn-delete" href="#" title="ลบรายการนี้"
              ><i class="fa-regular fa-trash-can"></i>ลบรายการนี้</a
            >
          </th>
          <td class="text-end price">
            5,000.00

            <FormKit
              type="stepNumber"
              label="ราคามัดจำ"
              validation="required|between:1,3000"
              validation-label="Number"
              value="10"
              min="1"
              max="3000"
              step="1"
              :validation-messages="{ between: 'จำนวนไม่ถูกต้อง' }"
              readonly
            />
          </td>
        </tr>
        <tr class="product">
          <th scope="row">
            ราคามัดจำ 1,000<span>ประเภท • ไทยศรีเออโก้</span
            ><a class="btn-delete" href="#" title="ลบรายการนี้"
              ><i class="fa-regular fa-trash-can"></i>ลบรายการนี้</a
            >
          </th>
          <td class="text-end price">
            2,000.00

            <FormKit
              type="stepNumber"
              label="ราคามัดจำ"
              validation="required|between:1,10"
              validation-label="Number"
              value="5"
              min="1"
              max="10"
              step="1"
              :validation-messages="{ between: 'จำนวนไม่ถูกต้อง' }"
              readonly
            />
          </td>
        </tr>
        <tr class="shipping">
          <th scope="row">ค่าจัดส่ง<span>DHL Express</span></th>
          <td class="text-end price">50.00</td>
        </tr>
        <tr class="spacer">
          <td colspan="2"></td>
        </tr>
        <tr class="subtotal">
          <th scope="row">รวมราคามัดจำ</th>
          <td class="text-end price">7,050.00</td>
        </tr>
        <tr class="discount">
          <th scope="row">หักส่วนลดค่าจัดส่ง<span>แลกกระดาษเกิน 5,000 บาท</span></th>
          <td class="text-end price">-50.00</td>
        </tr>
        <tr class="spacer">
          <td colspan="2"></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td scope="col">รวมยอดมัดจำที่ต้องใช้</td>
          <td scope="col" class="text-end price">6,000.00</td>
        </tr>
        <tr>
          <td scope="col">เงินมัดจำคงเหลือ</td>
          <td scope="col" class="text-end price">275,334.00</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
