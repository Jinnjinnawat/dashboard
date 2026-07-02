// ข้อมูลตัวอย่างสำหรับตารางคำสั่งซื้อ
// สถานะที่รองรับ: "สำเร็จ" | "กำลังดำเนินการ" | "รอดำเนินการ" | "ยกเลิก"

export const orders = [
  { id: "ORD-10231", customer: "ณัฐวุฒิ ศรีสุข", email: "natthawut.s@example.com", date: "2026-06-27", items: 3, total: 4590, status: "สำเร็จ" },
  { id: "ORD-10232", customer: "พิมพ์ชนก เจริญวงศ์", email: "pimchanok.j@example.com", date: "2026-06-27", items: 1, total: 1290, status: "กำลังดำเนินการ" },
  { id: "ORD-10233", customer: "ธีรภัทร แก้วมณี", email: "theerapat.k@example.com", date: "2026-06-26", items: 5, total: 8990, status: "สำเร็จ" },
  { id: "ORD-10234", customer: "สุพิชญา รัตนกุล", email: "supitchaya.r@example.com", date: "2026-06-26", items: 2, total: 2150, status: "รอดำเนินการ" },
  { id: "ORD-10235", customer: "กิตติพงษ์ บุญมา", email: "kittipong.b@example.com", date: "2026-06-25", items: 4, total: 6740, status: "ยกเลิก" },
  { id: "ORD-10236", customer: "อรวรรณ ทองดี", email: "orawan.t@example.com", date: "2026-06-25", items: 1, total: 990, status: "สำเร็จ" },
  { id: "ORD-10237", customer: "ปิยะพงศ์ ชัยวัฒน์", email: "piyapong.c@example.com", date: "2026-06-24", items: 6, total: 12490, status: "กำลังดำเนินการ" },
  { id: "ORD-10238", customer: "ชนิดาภา วงศ์สวัสดิ์", email: "chanidapa.w@example.com", date: "2026-06-24", items: 2, total: 3280, status: "สำเร็จ" },
  { id: "ORD-10239", customer: "เอกชัย พรหมมา", email: "ekkachai.p@example.com", date: "2026-06-23", items: 3, total: 5390, status: "รอดำเนินการ" },
  { id: "ORD-10240", customer: "วราภรณ์ สายทอง", email: "waraporn.s@example.com", date: "2026-06-23", items: 1, total: 1490, status: "สำเร็จ" },
  { id: "ORD-10241", customer: "ภานุวัฒน์ ไชยเดช", email: "phanuwat.c@example.com", date: "2026-06-22", items: 4, total: 7120, status: "กำลังดำเนินการ" },
  { id: "ORD-10242", customer: "นภัสกร อินทร์แก้ว", email: "napatsakorn.i@example.com", date: "2026-06-22", items: 2, total: 2890, status: "สำเร็จ" },
  { id: "ORD-10243", customer: "ดวงใจ ศักดิ์สิทธิ์", email: "duangjai.s@example.com", date: "2026-06-21", items: 7, total: 15990, status: "ยกเลิก" },
  { id: "ORD-10244", customer: "อนุชา หาญกล้า", email: "anucha.h@example.com", date: "2026-06-21", items: 1, total: 690, status: "สำเร็จ" },
];

export const summary = {
  totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
  totalOrders: orders.length,
  pendingOrders: orders.filter((o) => o.status === "รอดำเนินการ").length,
  uniqueCustomers: new Set(orders.map((o) => o.customer)).size,
};
