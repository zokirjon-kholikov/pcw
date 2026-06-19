# Product Comparison Widget — Mahsulotlarni taqqoslash vidjeti

Foydalanuvchi 3 tagacha mahsulotni tanlab, ularni jadval ko'rinishida yonma-yon
solishtira oladigan vidjet. Farq qiladigan xususiyatlar vizual ravishda ajratib
ko'rsatiladi, tanlangan mahsulot esa sahifa qayta yuklanganda ham saqlanib qoladi.


## 🚀 Ishga tushirish

Talab: **Node.js 18+**

```bash
npm install      # install packages
npm run dev      # run dev environment → http://localhost:5173
npm run build    # production build (tsc type-check + vite build)
npm run preview  # preview build version
```

---

## 🧩 Texnologiyalar

| Soha | Tanlov | Sabab (qisqacha) |
|------|--------|------------------|
| Asos | **React 18 + TypeScript** | Talab; tip-xavfsizlik xatolarni erta tutadi |
| Build | **Vite** | Tez HMR, minimal konfiguratsiya, zamonaviy standart |
| Stillar | **TailwindCSS** | Utility-first, tez responsive, `class` strategiyasi bilan oson dark mode |
| Jadval | **TanStack Table v8** | Headless — markup va stilizatsiya ustidan to'liq nazorat |
| Holat | **Zustand + `persist`** | Minimal boilerplate; localStorage’ga avtomatik saqlash |
| Ikonlar | **lucide-react** | Yengil, izchil, tree-shakable SVG ikonlar |

---

## 🏛️ Arxitektura

Loyiha qatlamlarga ajratilgan — har bir narsa o'z mas’uliyat sohasida turadi:

```
src/
├── types/product.ts          # Domen modellari (Product, SpecRow)
├── data/products.ts          # Hardcode ma'lumotlar + jadval qatorlari ta'rifi
├── store/
│   ├── useComparisonStore.ts # Tanlash holati (persist bilan)
│   └── useThemeStore.ts       # Light/Dark tema (persist bilan)
├── components/
│   ├── Header/index.tsx             # Sarlavha + tema almashtirgich
│   ├── Products/ProductGrid.tsx     # Mahsulotlar katalogi
│   ├── Products/ProductCard.tsx     # Bitta tanlanadigan karta
│   ├── Table/index.tsx              # TanStack jadval + diff mantiqi
│   ├── Empty/index.tsx              # Bo'sh holat
│   └── ThemeToggle/index.tsx        # Tema tugmasi
├── lib/utils.ts              # cn() — klasslarni xavfsiz birlashtirish
└── App.tsx                   # Sahifa kompozitsiyasi
```

### 1. Nega Zustand (Redux Toolkit emas)?

Topshiriqdan kleib chiqgan holatda Redux Toolkit **yoki** Zustand tanlash mumkin edi. Men **Zustand**ni
tanladim, chunki:

- **Asosiy talab — refresh’da saqlanish.** Zustand’ning `persist` middleware’i
  buni deyarli nol kod bilan hal qiladi: holat har o'zgarganda localStorage’ga
  avtomatik yoziladi va ilova ochilganda tiklanadi. Redux’da buni qo'lda yoki
  qo'shimcha kutubxona (`redux-persist`) bilan sozlash kerak bo'lardi.
- **Loyiha ko'lami kichik.** Bu yerda bitta global holat (tanlangan id’lar) bor.
  Redux’ning slice/reducer/store provayder boilerplate’i bu masshtab uchun ortiqcha.
- **`partialize`** orqali faqat kerakli qism (`selectedIds`) saqlanadi —
  funksiyalar emas.

### 2. Holatda **id’lar** saqlanadi, butun obyektlar emas

`selectedIds: string[]` saqlanadi, `Product[]` emas. Sabab:

- **Single source of truth** Mahsulot ma’lumoti faqat
  `data/products.ts`da yashaydi. Agar narx yangilansa, localStorage’dagi eski
  nusxa bilan kelishmovchilik bo'lmaydi.
- localStorage yengilroq bo'ladi.
- Tartib ham saqlanadi — `selectedIds` tartibi jadval ustunlari tartibini belgilaydi.

### 3. Jadval **transpozitsiya** qilingan (xususiyatlar — qatorlar)

Topshiriqda aniq talab mavjud edi: *xususiyatlar qatorlar bo'yicha, mahsulotlar ustunlar
bo'yicha*. Klassik jadval esa odatda "bir yozuv = bir qator". Yechim:

- TanStack Table’ga **`data = SPEC_ROWS`** beriladi (har bir qator — bitta xususiyat).
- **Ustunlar dinamik quriladi:** 1-ustun — xususiyat nomi, qolganlari tanlangan
  har bir mahsulot uchun bittadan (`useMemo` bilan, faqat tanlov o'zgarganda).
- Har bir mahsulot ustunining katagi o'sha xususiyatning shu mahsulotdagi
  qiymatini formatlab ko'rsatadi.

`SpecRow`da `accessor` (xom qiymat, taqqoslash uchun) va `format` (ko'rsatish
uchun matn) ajratilgan — bu diff mantig'ini ko'rinishdan mustaqil qiladi.

### 4. Farqlarni ajratish (diff highlighting)

Har bir qator uchun tanlangan mahsulotlarning **qiymatlari** to'planadi va
`new Set(values).size > 1` bo'lsa, qator farqli deb belgilanadi:

```ts
function rowHasDiff(spec, products) {
  if (products.length < 2) return false;        // bitta mahsulotda taqqoslash yo'q
  return new Set(products.map(spec.accessor)).size > 1;
}
```

Farqli qatorlar sariq fon va kichik nuqta indikatori bilan belgilanadi —
diqqatni tortadi, lekin o'qishni qiyinlashtirmaydi.

### 5. Light / Dark mode

- Tailwind’ning **`class` strategiyasi** ishlatilgan (`<html class="dark">`).
- Tanlov `useThemeStore` orqali localStorage’ga saqlanadi.
- `index.html`da kichik inline skript sahifa chizilishidan **oldin** temani
  qo'llaydi — bu **FOUC** (noto'g'ri tema bilan miltillash) muammosini oldini oladi.
- Boshlang'ich qiymat sifatida tizim sozlamasi (`prefers-color-scheme`) hisobga olinadi.

### 6. Mobile-first

- Katalog grid mobil/planshet/desktopda moslashadi (`grid-cols-2 → 3 → 4`).
- Jadval mobil ekranda gorizontal scroll bo'ladi, **xususiyat nomi ustuni esa
  `sticky` holda yopishib turadi** — foydalanuvchi qaysi qatorni ko'rayotganini
  yo'qotmaydi.
- Limit boshqaruvi: 3 ta mahsulot tanlangach, qolgan kartalar o'chiriladi
  (disabled) — foydalanuvchi nega tanlay olmasligini ko'radi.