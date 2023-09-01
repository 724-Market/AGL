<template>
  <NuxtLayout
    :name="layout"
    :layout-class="layoutClass"
    :page-title="pageTitle"
    :page-category="pageCategory"
    :show-page-steps="showPageSteps"
    :show-page-header="showPageHeader"
  >
    <div class="row">
      <div class="col">
        <OrderHistorySearch></OrderHistorySearch>

        <OrderHistoryFilter></OrderHistoryFilter>

        <div class="card">
          <div class="card-body card-table">
            <DataTable
              id="datatables"
              class="table table-transaction nowrap"
              data-order='[[ 2, "asc" ]]'
              :options="datatableOptions"
            >
              <thead>
                <tr>
                  <th data-orderable="false"></th>
                  <th data-orderable="false"></th>
                  <th>เลขที่คำสั่งซื้อ</th>
                  <th data-orderable="false">รายการ</th>
                  <!--<th>จำนวนเงิน (บาท)</th>
                  <th data-orderable="false">ผู้เอาประกัน</th>
                  <th>สถานะ</th>
                  <th class="meta-head" data-orderable="false">รูปแบบการทำรายการ</th> -->
                </tr>
              </thead>

              <!-- <tbody>
                <tr class="">
                  <td>
                    <div class="dropdown">
                      <a
                        class="btn btn-ellipsis dropdown-toggle"
                        href="#"
                        role="button"
                        title="เครื่องมือจัดการเพิ่มเติม"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#" title="ทำรายการต่อ"
                            ><span class="icon-edit">ทำรายการต่อ</span></a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" title="ชำระเงิน"
                            ><span class="icon-payment">ชำระเงิน</span></a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" title="ติดตามสถานะ"
                            ><span class="icon-tracking">ติดตามสถานะ</span></a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" title="รายละเอียดกรมธรรม์"
                            ><span class="icon-policy">รายละเอียดกรมธรรม์</span></a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" title="ดาวน์โหลดกรมธรรม์"
                            ><span class="icon-download-file">ดาวน์โหลดกรมธรรม์</span></a
                          >
                        </li>
                        <li>
                          <hr class="dropdown-divider" />
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" title="ติดต่อเจ้าหน้าที่"
                            ><span class="icon-help">ติดต่อเจ้าหน้าที่</span></a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" title="ลบแบบร่างนี้"
                            ><span class="icon-trash">ลบแบบร่างนี้</span></a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="has-child"></td>
                  <td class="order">
                    #200300033675<time datetime="2023-05-05 08:08">2023-05-05 08:08</time>
                  </td>
                  <td class="subject">ก-9999 (ป้ายแดง)<span>MG MG3 ปี 2018</span></td>
                  <td class="amount">645.21<span>ส่วนลด 0.00</span></td>
                  <td class="name">ปฐมพงศ์ สังคจิตต์<span>089-xxx-x478</span></td>
                  <td class="status">
                    <div class="badge-dot badge">แบบร่าง</div>
                    <div class="badge-dot badge-warning">รอชำระเงิน</div>
                    <div class="badge-dot badge-warning">รับแจ้งงาน</div>
                    <div class="badge-dot badge-warning">กำลังจัดส่ง</div>
                    <div class="badge-dot badge-success">สำเร็จ</div>
                    <span
                      ><a class="attached" href="#" title="ดาวน์โหลดกรมธรรม์"
                        >กรมธรรม์ TR-4635-453-32-1</a
                      ></span
                    >
                    <div class="badge-dot badge-danger">ไม่สำเร็จ</div>
                  </td>
                  <td>
                    <div class="meta">
                      <span
                        class="badge meta-online"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ online<br>โดย ปฐมพงศ์ สังคจิตต์"
                        data-bs-html="true"
                        ><em>On</em></span
                      >
                      <span
                        class="badge meta-offline"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ offline<br>โดย ปฐมพงศ์ สังคจิตต์"
                        data-bs-html="true"
                        ><em>Off</em></span
                      >
                      <span
                        class="badge meta-new"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานใหม่"
                        ><em>N</em></span
                      >
                      <span
                        class="badge meta-renew"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานต่ออายุ"
                        ><em>R</em></span
                      >
                      <span
                        class="badge meta-company"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทิพยประกันภัย"
                        ><em>TIP</em></span
                      >
                      <span
                        class="badge meta-company"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ไทยศรี"
                        ><em>ERGO</em></span
                      >
                      <span
                        class="badge meta-product"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="พ.ร.บ."
                        ><em>พรบ</em></span
                      >
                      <span
                        class="badge meta-product"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ประกันภัย ประเภท 1"
                        ><em>ป.1</em></span
                      >
                      <span
                        class="badge meta-product"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ประกันภัย ประเภท 3+"
                        ><em>ป.3+</em></span
                      >
                      <span
                        class="badge meta-product meta-include"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ป.1 & พ.ร.บ."
                        ><em>ควบ</em></span
                      >
                      <span
                        class="badge meta-qr"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย QR"
                        ><em>QR</em></span
                      >
                      <span
                        class="badge meta-card"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย บัตรเครดิต/บัตรเดบิต"
                        ><em>บัตรเครดิต/บัตรเดบิต</em></span
                      >
                      <span
                        class="badge meta-installment"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย บัตรเครดิต/บัตรเดบิต ผ่อน 6 เดือน"
                        ><em>/ 6</em></span
                      >
                      <span
                        class="badge meta-installment-cash"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย เงินสด ผ่อน 12 เดือน"
                        ><em>/ 12</em></span
                      >
                      <span
                        class="badge meta-pledge"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย วงเงินมัดจำ"
                        ><em>วงเงินมัดจำ</em></span
                      >
                      <span
                        class="badge meta-fulldiscount"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="หักส่วนลดเต็มจำนวน"
                        ><em>หักเต็ม</em></span
                      >
                      <span
                        class="badge meta-partialdiscount"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="หักส่วนลดบางส่วน"
                        ><em>หักบางส่วน</em></span
                      >
                      <span
                        class="badge meta-fullpay"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระเบี้ยเต็มจำนวน"
                        ><em>จ่ายเต็ม</em></span
                      >
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="dropdown">
                      <a
                        class="btn btn-ellipsis dropdown-toggle"
                        href="#"
                        role="button"
                        title="เครื่องมือจัดการเพิ่มเติม"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#" title="ติดตามสถานะ"
                            ><span class="icon-tracking">ติดตามสถานะ</span></a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" title="ติดต่อเจ้าหน้าที่"
                            ><span class="icon-help">ติดต่อเจ้าหน้าที่</span></a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td></td>
                  <td class="order">
                    #210700947105<time datetime="2022-02-05 02:08">2022-02-05 02:08</time>
                  </td>
                  <td class="subject">นก-987<span>HONDA BRV ปี 2020</span></td>
                  <td class="amount">645.21<span>ส่วนลด 0.00</span></td>
                  <td class="name">วิทยา อภิมหาบุณย์<span>089-xxx-x464</span></td>
                  <td class="status">
                    <div class="badge-dot badge-danger">ไม่สำเร็จ</div>
                  </td>
                  <td>
                    <div class="meta">
                      <span
                        class="badge meta-online"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ online"
                        ><em>On</em></span
                      >
                      <span
                        class="badge meta-new"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานใหม่"
                        ><em>N</em></span
                      >
                      <span
                        class="badge meta-company"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ไทยศรี"
                        ><em>ERGO</em></span
                      >
                      <span
                        class="badge meta-product"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="พ.ร.บ."
                        ><em>พรบ</em></span
                      >
                      <span
                        class="badge meta-qr"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย QR"
                        ><em>QR</em></span
                      >
                      <span
                        class="badge meta-partialdiscount"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="หักส่วนลดบางส่วน"
                        ><em>หักบางส่วน</em></span
                      >
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="dropdown">
                      <a
                        class="btn btn-ellipsis dropdown-toggle"
                        href="#"
                        role="button"
                        title="เครื่องมือจัดการเพิ่มเติม"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#" title="ชำระเงิน"
                            ><span class="icon-payment">ชำระเงิน</span></a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" title="ติดตามสถานะ"
                            ><span class="icon-tracking">ติดตามสถานะ</span></a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td></td>
                  <td class="order">
                    #200300034435<time datetime="2022-02-05 02:08">2022-02-05 02:08</time>
                  </td>
                  <td class="subject">นก-9876<span>HONDA BRV ปี 2020</span></td>
                  <td class="amount">645.21<span>ส่วนลด 0.00</span></td>
                  <td class="name">วิทยา อภิมหาบุณย์<span>089-xxx-x464</span></td>
                  <td class="status">
                    <div class="badge-dot badge-warning">รอชำระเงิน</div>
                  </td>
                  <td>
                    <div class="meta">
                      <span
                        class="badge meta-online"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ online"
                        ><em>On</em></span
                      >
                      <span
                        class="badge meta-new"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานใหม่"
                        ><em>N</em></span
                      >
                      <span
                        class="badge meta-company"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ไทยศรี"
                        ><em>ERGO</em></span
                      >
                      <span
                        class="badge meta-product"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="พ.ร.บ."
                        ><em>พรบ</em></span
                      >
                      <span
                        class="badge meta-qr"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย QR"
                        ><em>QR</em></span
                      >
                      <span
                        class="badge meta-partialdiscount"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="หักส่วนลดบางส่วน"
                        ><em>หักบางส่วน</em></span
                      >
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="dropdown">
                      <a
                        class="btn btn-ellipsis dropdown-toggle"
                        href="#"
                        role="button"
                        title="เครื่องมือจัดการเพิ่มเติม"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#" title="ติดตามสถานะ"
                            ><span class="icon-tracking">ติดตามสถานะ</span></a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td></td>
                  <td class="order">
                    #200300034466<time datetime="2023-03-15 03:08">2023-03-15 03:08</time>
                  </td>
                  <td class="subject">ฏก-1234<span>PORCHE ปี 2010</span></td>
                  <td class="amount">56,789.12<span>ส่วนลด 1,200.00</span></td>
                  <td class="name">วิทยา อภิมหาบุณย์<span>089-xxx-x464</span></td>
                  <td class="status">
                    <div class="badge-dot badge-warning">กำลังจัดส่ง</div>
                  </td>
                  <td>
                    <div class="meta">
                      <span
                        class="badge meta-online"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ offline"
                        ><em>Off</em></span
                      >
                      <span
                        class="badge meta-new"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานใหม่"
                        ><em>N</em></span
                      >
                      <span
                        class="badge meta-company"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ไทยศรี"
                        ><em>ERGO</em></span
                      >
                      <span
                        class="badge meta-product"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ป.1"
                        ><em>ป.1</em></span
                      >
                      <span
                        class="badge meta-installment-cash"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย เงินสด ผ่อน 12 เดือน"
                        ><em>/ 12</em></span
                      >
                      <span
                        class="badge meta-partialdiscount"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="หักส่วนลดบางส่วน"
                        ><em>หักบางส่วน</em></span
                      >
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="dropdown">
                      <a
                        class="btn btn-ellipsis dropdown-toggle"
                        href="#"
                        role="button"
                        title="เครื่องมือจัดการเพิ่มเติม"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#" title="ทำรายการต่อ"
                            ><span class="icon-edit">ทำรายการต่อ</span></a
                          >
                        </li>
                        <li>
                          <hr class="dropdown-divider" />
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" title="ลบแบบร่างนี้"
                            ><span class="icon-trash">ลบแบบร่างนี้</span></a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td></td>
                  <td class="order">
                    #220700017966<time datetime="2023-03-25 10:23">2023-03-25 10:23</time>
                  </td>
                  <td class="subject">9กต-3420<span>MG MG3 ปี 2018</span></td>
                  <td class="amount">645.21<span>ส่วนลด 93.00</span></td>
                  <td class="name">ปฐมพงศ์ สังคจิตต์<span>089-xxx-x478</span></td>
                  <td class="status">
                    <div class="badge-dot badge">แบบร่าง</div>
                  </td>
                  <td>
                    <div class="meta">
                      <span
                        class="badge meta-online"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ online"
                        ><em>On</em></span
                      >
                      <span
                        class="badge meta-renew"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานต่ออายุ"
                        ><em>R</em></span
                      >
                      <span
                        class="badge meta-company"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ซมโปะประกันภัย"
                        ><em>SJNK</em></span
                      >
                      <span
                        class="badge meta-product"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ประกันภัย ประเภท 1"
                        ><em>ป.1</em></span
                      >
                    </div>
                  </td>
                </tr>

                <tr class="is-parent is-open">
                  <td>
                    <div class="dropdown">
                      <a
                        class="btn btn-ellipsis dropdown-toggle"
                        href="#"
                        role="button"
                        title="เครื่องมือจัดการเพิ่มเติม"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#" title="รายละเอียดกรมธรรม์"
                            ><span class="icon-policy">รายละเอียดกรมธรรม์</span></a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" title="ดาวน์โหลดกรมธรรม์"
                            ><span class="icon-download-file">ดาวน์โหลดกรมธรรม์</span></a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="has-child"></td>
                  <td class="order">
                    #210700947101<time datetime="2023-03-25 10:23">2023-04-12 11:06</time>
                  </td>
                  <td class="subject">4กท-4720<span>TOYOTA INNOVA ปี 2015</span></td>
                  <td class="amount">1,899.25<span>ส่วนลด 245.07</span></td>
                  <td class="name">พัชราภรณ์ โภชนะวนิชย์<span>089-xxx-x077</span></td>
                  <td class="status">
                    <div class="badge-dot badge-success">สำเร็จ</div>
                    <span
                      ><a class="attached" href="#" title="ดาวน์โหลดกรมธรรม์"
                        >กรมธรรม์ TR-4635-453-32-1</a
                      ></span
                    >
                  </td>
                  <td>
                    <div class="meta">
                      <span
                        class="badge meta-offline"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ offline"
                        ><em>Off</em></span
                      >
                      <span
                        class="badge meta-renew"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานต่ออายุ"
                        ><em>R</em></span
                      >
                      <span
                        class="badge meta-company"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทิพยประกันภัย"
                        ><em>TIP</em></span
                      >
                      <span
                        class="badge meta-product meta-include"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ประกันภัย ประเภท 1"
                        ><em>ป.1</em></span
                      >
                      <span
                        class="badge meta-pledge"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย วงเงินมัดจำ"
                        ><em>วงเงินมัดจำ</em></span
                      >
                      <span
                        class="badge meta-fulldiscount"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="หักส่วนลดเต็มจำนวน"
                        ><em>หักเต็ม</em></span
                      >
                    </div>
                  </td>
                </tr>
                <tr class="is-child">
                  <td>
                    <div class="dropdown">
                      <a
                        class="btn btn-ellipsis dropdown-toggle"
                        href="#"
                        role="button"
                        title="เครื่องมือจัดการเพิ่มเติม"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#" title="ติดตามสถานะ"
                            ><span class="icon-tracking">ติดตามสถานะ</span></a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="the-child"></td>
                  <td class="order">
                    #210700947102<time datetime="2023-03-25 10:23">2023-04-12 11:06</time>
                  </td>
                  <td class="subject">4กท-4720<span>TOYOTA INNOVA ปี 2015</span></td>
                  <td class="amount">645.21<span>ส่วนลด 34.87</span></td>
                  <td class="name">พัชราภรณ์ โภชนะวนิชย์<span>089-xxx-x077</span></td>
                  <td class="status">
                    <div class="badge-dot badge-warning">รับแจ้งงาน</div>
                  </td>
                  <td>
                    <div class="meta">
                      <span
                        class="badge meta-offline"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ offline"
                        ><em>Off</em></span
                      >
                      <span
                        class="badge meta-renew"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานต่ออายุ"
                        ><em>R</em></span
                      >
                      <span
                        class="badge meta-company"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทิพยประกันภัย"
                        ><em>TIP</em></span
                      >
                      <span
                        class="badge meta-product meta-include"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="พ.ร.บ."
                        ><em>พรบ</em></span
                      >
                      <span
                        class="badge meta-pledge"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย วงเงินมัดจำ"
                        ><em>วงเงินมัดจำ</em></span
                      >
                      <span
                        class="badge meta-fulldiscount"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="หักส่วนลดเต็มจำนวน"
                        ><em>หักเต็ม</em></span
                      >
                    </div>
                  </td>
                </tr>

                <tr class="is-parent is-open">
                  <td>
                    <div class="dropdown">
                      <a
                        class="btn btn-ellipsis dropdown-toggle"
                        href="#"
                        role="button"
                        title="เครื่องมือจัดการเพิ่มเติม"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#" title="ติดตามสถานะ"
                            ><span class="icon-tracking">ติดตามสถานะ</span></a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="has-child"></td>
                  <td class="order">
                    #210700947108<time datetime="2023-03-25 10:23">2023-04-12 11:06</time>
                  </td>
                  <td class="subject">4กท-4720<span>TOYOTA INNOVA ปี 2015</span></td>
                  <td class="amount">645.21<span>ส่วนลด 34.87</span></td>
                  <td class="name">พัชราภรณ์ โภชนะวนิชย์<span>089-xxx-x077</span></td>
                  <td class="status">
                    <div class="badge-dot badge-warning">รับแจ้งงาน</div>
                  </td>
                  <td>
                    <div class="meta">
                      <span
                        class="badge meta-offline"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ offline"
                        ><em>Off</em></span
                      >
                      <span
                        class="badge meta-renew"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานต่ออายุ"
                        ><em>R</em></span
                      >
                      <span
                        class="badge meta-company"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทิพยประกันภัย"
                        ><em>TIP</em></span
                      >
                      <span
                        class="badge meta-product meta-include"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="พ.ร.บ."
                        ><em>พรบ</em></span
                      >
                      <span
                        class="badge meta-pledge"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย วงเงินมัดจำ"
                        ><em>วงเงินมัดจำ</em></span
                      >
                      <span
                        class="badge meta-fulldiscount"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="หักส่วนลดเต็มจำนวน"
                        ><em>หักเต็ม</em></span
                      >
                    </div>
                  </td>
                </tr>
                <tr class="is-child">
                  <td>
                    <div class="dropdown">
                      <a
                        class="btn btn-ellipsis dropdown-toggle"
                        href="#"
                        role="button"
                        title="เครื่องมือจัดการเพิ่มเติม"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#" title="รายละเอียดกรมธรรม์"
                            ><span class="icon-policy">รายละเอียดกรมธรรม์</span></a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" title="ดาวน์โหลดกรมธรรม์"
                            ><span class="icon-download-file">ดาวน์โหลดกรมธรรม์</span></a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="the-child"></td>
                  <td class="order">
                    #210700947109<time datetime="2023-03-25 10:23">2023-04-12 11:06</time>
                  </td>
                  <td class="subject">4กท-4720<span>TOYOTA INNOVA ปี 2015</span></td>
                  <td class="amount">1,899.25<span>ส่วนลด 245.07</span></td>
                  <td class="name">พัชราภรณ์ โภชนะวนิชย์<span>089-xxx-x077</span></td>
                  <td class="status">
                    <div class="badge-dot badge-success">สำเร็จ</div>
                    <span
                      ><a class="attached" href="#" title="ดาวน์โหลดกรมธรรม์"
                        >กรมธรรม์ TR-4635-453-32-1</a
                      ></span
                    >
                  </td>
                  <td>
                    <div class="meta">
                      <span
                        class="badge meta-offline"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ offline"
                        ><em>Off</em></span
                      >
                      <span
                        class="badge meta-renew"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานต่ออายุ"
                        ><em>R</em></span
                      >
                      <span
                        class="badge meta-company"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทิพยประกันภัย"
                        ><em>TIP</em></span
                      >
                      <span
                        class="badge meta-product meta-include"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ประกันภัย ประเภท 1"
                        ><em>ป.1</em></span
                      >
                      <span
                        class="badge meta-pledge"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย วงเงินมัดจำ"
                        ><em>วงเงินมัดจำ</em></span
                      >
                      <span
                        class="badge meta-fulldiscount"
                        data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip"
                        data-bs-title="หักส่วนลดเต็มจำนวน"
                        ><em>หักเต็ม</em></span
                      >
                    </div>
                  </td>
                </tr>
              </tbody> -->
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// Define import
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import OrderHistoryGridMenu from "~/components/order/history/grid/menu.vue";
import { renderToString } from "@vue/server-renderer";
// Define Variables
// Loading state after form submiting
const isLoading = ref(false);

// Submitted state after submit
const submitted = ref(false);

let values = reactive({});

// Submit form event
const submitSearch = async (formData: any) => {
  // Add waiting time for debug
  await new Promise((r) => setTimeout(r, 1000));
};

onMounted(() => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
});

// DataTable

DataTable.use(DataTablesCore);
// Column options in datatable
const columns = [
  {
    targets: 0,
    data: "OrderNo",
    title: "",
    // render:async function (data, type,row) {
    //   console.log('type=',type)
    //   if (type === "display") {
    //     console.log(row)
    //     const html = await renderToString(h(OrderHistorySearch))
    //     console.log(html)
    //     return html
    //   }

    //   return data;
    // },
  },
  { data: "OrderNo", title: "", targets: 1 },
  { data: "OrderNo", title: "เลขที่คำสั่งซื้อ", targets: 2,  },
  { data: "OrderGroupType", title: "รายการ", targets: 3, },
  // { data: 'office', title: 'Office' },
  // { data: 'extn', title: 'Extension' },
  // { data: 'start_date', title: 'Start date' },
  // { data: 'salary', title: 'Salary' },
];

// DataTable ajax options
const token = await useUtility().getToken();
const datatableAjax = {
  url: "/api/grid",
  method: "post",
  data: (d) => {
    return {
      ...d,
      URL: "/Order/grid/history/list",
      Token: token,
    };
  },
};
// DataTable options
const datatableOptions = {
  columnDefs: columns,

  processing: true,
  serverSide: true,
  ajax: datatableAjax,
  filter: false,
  searchCols: [{},{}, { search: "My filter" }, { search: "^[0-9]", regex: true }],
  language: {
    paginate: {
      previous: "ก่อนหน้า",
      next: "ถัดไป",
    },
    info: "แสดง _START_ ถึง _END_ จาก _TOTAL_ รายการ",
    infoEmpty: "ไม่มีรายการ",
    infoFiltered: "(จากทั้งหมด _MAX_ รายการ)",
    lengthMenu: "แสดง _MENU_ รายการ",
    search: "ค้นหา",
    emptyTable: "ไม่มีรายการ",
    zeroRecords: "ไม่มีรายการ",
  },
  rowCallback: async function (row, data) {
    console.log("rowCallback [data]=", data);
    const menu = await renderToString(h(OrderHistoryGridMenu));
    var tds = row.getElementsByTagName("td");
    var TdId1 = tds[0];
    var TdId2 = tds[1];
    TdId1.innerHTML = menu;
    TdId2.className = "has-child";
    TdId2.innerHTML = "";
  },
};
const continute = () => {
  alert("ทำรายการต่อ");
};
// Define layout
const layout = "monito";
const layoutClass = "page-monito";
const showPageSteps = false;
const showPageHeader = true;

// Define page meta
const pageTitle = "ประวัติการทำรายการ";
const pageCategory = "ข้อมูลประวัติ";
const pageDescription = "";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-history category-datatable single-transaction",
  },
});
</script>
