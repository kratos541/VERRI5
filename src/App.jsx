import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

/* ── SUPABASE CLIENT ──────────────────────────────────────── */
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/* ── TRANSLATIONS ─────────────────────────────────────────── */
const T = {
  en: {
    step:"Step", of:"of",
    s0:"Who You Are", s1:"Business & Location", s2:"Size & Registration", s3:"Your Licences",
    bizName:"Business / Shop name", ownerName:"Owner / Manager name",
    phone:"WhatsApp / Phone", role:"Your role",
    bizType:"Type of business", province:"Province", city:"City", address:"Full address",
    regType:"Registration type", revenue:"Annual revenue", employees:"Number of employees",
    ntn:"NTN (if you have one)", licences:"Licences you already have",
    whatSell:"What do you sell / do?",
    fillAll:"Please fill in all fields.",
    back:"← Back", next:"Continue →", finish:"✓ Build My Profile →",
    home:"Home", news:"News", laws:"Laws", profile:"Profile",
    myLaws:"Laws that apply to you", seeAll:"See all →",
    latestNews:"Latest news for you", newsFeed:"News Feed →",
    lawBook:"Pakistan Law Book", allLaws:"All Laws", myLawsTab:"My Laws",
    search:"Search any law…", applies:"Applies",
    urgent:"URGENT", overdue:"OVERDUE", daysLeft:"days left",
    about:"About", steps:"Steps", letter:"Letter",
    whyApplies:"Why this applies to you",
    penalty:"Penalty", copy:"Copy Letter", copied:"Copied!",
    done:"done", closingTime:"Your mandatory closing time tonight",
    fine:"fine if open after this time",
    calendar:"Calendar", fineCalc:"Fine Calc", scanDoc:"Scan Doc", findCA:"Find CA",
    calTitle:"Compliance Calendar", calSub:"All your deadlines in one place",
    noDeadlines:"No deadlines this month",
    fineTitle:"Fine Calculator", fineSub:"See exactly how much you owe if overdue",
    selectLaw:"Select a law", daysOverdue:"Days overdue",
    yourFine:"Your current fine:", notOverdue:"You are not overdue — great work!",
    scanTitle:"Scan Document", scanSub:"Upload a licence photo to detect expiry date",
    upload:"Upload Photo", scanning:"Scanning…", expiry:"Expiry date detected:",
    caTitle:"Find a CA / Lawyer", caSub:"Verified professionals near you",
    kitTitle:"Compliance Kit", kitSub:"All your letters in one place",
    generate:"Generate My Compliance Kit", kitReady:"Your kit is ready",
    copyAll:"Copy All Letters", updateSave:"Save & Re-scan All Laws",
    saved:"Saved! Dashboard updated.",
    compliance:"Compliance", score:"Score",
  },
  ur: {
    step:"مرحلہ", of:"میں سے",
    s0:"آپ کون ہیں", s1:"کاروبار اور مقام", s2:"سائز اور رجسٹریشن", s3:"آپ کے لائسنس",
    bizName:"کاروبار / دکان کا نام", ownerName:"مالک / مینیجر کا نام",
    phone:"واٹس ایپ / فون", role:"آپ کا کردار",
    bizType:"کاروبار کی قسم", province:"صوبہ", city:"شہر", address:"مکمل پتہ",
    regType:"رجسٹریشن کی قسم", revenue:"سالانہ آمدنی", employees:"ملازمین کی تعداد",
    ntn:"NTN (اگر ہو)", licences:"آپ کے پاس موجود لائسنس",
    whatSell:"آپ کیا بیچتے / کرتے ہیں؟",
    fillAll:"براہ کرم تمام خانے پُر کریں۔",
    back:"← واپس", next:"جاری رکھیں →", finish:"✓ میرا پروفائل بنائیں →",
    home:"ہوم", news:"خبریں", laws:"قوانین", profile:"پروفائل",
    myLaws:"آپ پر لاگو قوانین", seeAll:"سب دیکھیں →",
    latestNews:"آپ کے لیے تازہ خبریں", newsFeed:"خبریں →",
    lawBook:"پاکستان قانون کتاب", allLaws:"تمام قوانین", myLawsTab:"میرے قوانین",
    search:"کوئی بھی قانون تلاش کریں…", applies:"لاگو",
    urgent:"فوری", overdue:"میعاد گزر گئی", daysLeft:"دن باقی",
    about:"تفصیل", steps:"مراحل", letter:"خط",
    whyApplies:"یہ آپ پر کیوں لاگو ہے",
    penalty:"جرمانہ", copy:"خط کاپی کریں", copied:"کاپی ہو گئی!",
    done:"مکمل", closingTime:"آج رات آپ کا لازمی بند ہونے کا وقت",
    fine:"جرمانہ اگر اس وقت کے بعد کھلا",
    calendar:"کیلنڈر", fineCalc:"جرمانہ", scanDoc:"اسکین", findCA:"CA تلاش",
    calTitle:"کمپلائنس کیلنڈر", calSub:"آپ کی تمام ڈیڈ لائنیں ایک جگہ",
    noDeadlines:"اس مہینے کوئی ڈیڈ لائن نہیں",
    fineTitle:"جرمانہ کیلکولیٹر", fineSub:"دیکھیں کتنا جرمانہ بنتا ہے",
    selectLaw:"قانون منتخب کریں", daysOverdue:"کتنے دن دیر",
    yourFine:"آپ کا موجودہ جرمانہ:", notOverdue:"آپ نے میعاد نہیں گزاری — شاباش!",
    scanTitle:"دستاویز اسکین", scanSub:"لائسنس کی تصویر اپلوڈ کریں",
    upload:"تصویر اپلوڈ کریں", scanning:"اسکین ہو رہا ہے…", expiry:"میعاد ختم ہونے کی تاریخ:",
    caTitle:"CA / وکیل تلاش کریں", caSub:"آپ کے قریب تصدیق شدہ پیشہ ور",
    kitTitle:"کمپلائنس کٹ", kitSub:"آپ کے تمام خطوط ایک جگہ",
    generate:"میری کمپلائنس کٹ بنائیں", kitReady:"آپ کی کٹ تیار ہے",
    copyAll:"تمام خطوط کاپی کریں", updateSave:"محفوظ کریں اور دوبارہ اسکین کریں",
    saved:"محفوظ! ڈیش بورڈ اپڈیٹ ہو گیا۔",
    compliance:"کمپلائنس", score:"اسکور",
  },
};

/* ── LAWS ─────────────────────────────────────────────────── */
const ALL_LAWS = [
  { id:"ntn", title:"NTN Registration", titleUr:"NTN رجسٹریشن", cat:"Tax", sub:"Federal · Every business", icon:"🪪", color:"#1e40af", bg:"#dbeafe", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Mandatory for all", deadline:null, penalty:50000, penaltyPerDay:0, summaryEn:"Every business must obtain a National Tax Number (NTN) from FBR. Required for opening a bank account, government contracts, and all major transactions.", summaryUr:"ہر کاروبار کو FBR سے نیشنل ٹیکس نمبر (NTN) لینا ضروری ہے۔", steps:["Register at iris.fbr.gov.pk with your CNIC","Obtain NTN certificate within 24–48 hours","Use NTN on all invoices and correspondence"], authority:"FBR", phone:"051-111-772-772", url:"https://iris.fbr.gov.pk", letter:b=>`To: Federal Board of Revenue\nSubject: NTN Registration Confirmation\n\n${b.name}, ${b.address}, ${b.city} confirms NTN registration.\nNTN: ${b.ntn||'[ENTER NTN]'}\nOwner: ${b.ownerName}\nContact: ${b.phone||'[PHONE]'}` },
  { id:"income-tax", title:"Annual Income Tax Return", titleUr:"سالانہ انکم ٹیکس ریٹرن", cat:"Tax", sub:"Federal · All businesses", icon:"📊", color:"#1e40af", bg:"#dbeafe", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Deadline: 30 Sep", deadline:"2025-09-30", penalty:100000, penaltyPerDay:1000, summaryEn:"Every business must file annual income tax return by 30 September. Filing keeps you on the Active Taxpayer List — non-filers pay 6× more withholding tax.", summaryUr:"ہر کاروبار کو 30 ستمبر تک سالانہ ریٹرن فائل کرنی ہوگی۔ غیر فائلرز 6 گنا زیادہ ٹیکس ادا کرتے ہیں۔", steps:["Maintain books of accounts all year","File return at iris.fbr.gov.pk before 30 September","Check ATL status at fbr.gov.pk/atu"], authority:"FBR", phone:"051-111-772-772", url:"https://iris.fbr.gov.pk", letter:b=>`To: FBR Regional Tax Office ${b.city}\nSubject: Income Tax Return Confirmation\n\n${b.name} (NTN: ${b.ntn||'[NTN]'}), ${b.city} confirms annual income tax return filing for FY 2024–25.\n${b.ownerName}, ${b.designation}` },
  { id:"sales-tax", title:"Sales Tax Registration — STRN", titleUr:"سیلز ٹیکس رجسٹریشن", cat:"Tax", sub:"Federal · Turnover > PKR 10M", icon:"🧾", color:"#1e40af", bg:"#dbeafe", provinces:["All"], types:["retail","wholesale","food","manufacturing","trading"], minRevM:10, minEmp:1, badge:"Urgent — sealing ongoing", deadline:"2025-06-18", penalty:50000, penaltyPerDay:10000, summaryEn:"Businesses with turnover above PKR 10M must register for Sales Tax, obtain STRN, file monthly returns by 18th of each month, and issue computerised invoices for sales above PKR 50,000.", summaryUr:"PKR 10M سے زیادہ آمدنی والے کاروباروں کو سیلز ٹیکس رجسٹریشن لازمی ہے۔", steps:["Register on iris.fbr.gov.pk — get STRN in 24–48 hours","Buy FBR-certified POS machine (PKR 35,000–80,000)","File monthly return by 18th of each month"], authority:"FBR", phone:"051-111-772-772", url:"https://iris.fbr.gov.pk", letter:b=>`To: Federal Board of Revenue\nSubject: Sales Tax Compliance — STRN Confirmation\n\n${b.name} (NTN: ${b.ntn||'[NTN]'}), ${b.address}, ${b.city}, ${b.province} confirms STRN registration.\nSTRN: [ENTER STRN]\n${b.ownerName}, ${b.designation}\nContact: ${b.phone||'[PHONE]'}` },
  { id:"eobi", title:"EOBI Registration (5+ Employees)", titleUr:"EOBI رجسٹریشن", cat:"Labour", sub:"Federal · 5+ employees", icon:"👴", color:"#7c3aed", bg:"#ede9fe", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:5, badge:"Audits ongoing", deadline:null, penalty:50000, penaltyPerDay:500, summaryEn:"All businesses with 5+ employees must register with EOBI. Employer pays PKR 1,850 per employee monthly. Provides pension to workers.", summaryUr:"5 یا زیادہ ملازمین والے کاروباروں کو EOBI رجسٹریشن لازمی ہے۔ فی ملازم PKR 1,850 ماہانہ ادا کریں۔", steps:["Register at eobi.gov.pk","Register each employee and get EOBI cards","Pay PKR 1,850 per employee by 15th monthly"], authority:"EOBI", phone:"111-000-231", url:"https://eobi.gov.pk", letter:b=>`To: EOBI Regional Office\nSubject: EOBI Registration Confirmation\n\n${b.name} (NTN: ${b.ntn||'[NTN]'}), ${b.city} confirms EOBI registration for all ${b.emp} employees.\n${b.ownerName}, ${b.designation}` },
  { id:"punjab-wages", title:"Punjab Minimum Wage — PKR 37,000", titleUr:"پنجاب کم از کم اجرت", cat:"Labour", sub:"Punjab · All employers", icon:"💵", color:"#7c3aed", bg:"#ede9fe", provinces:["Punjab"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:2, badge:"Effective July 1", deadline:"2025-07-01", penalty:25000, penaltyPerDay:5000, summaryEn:"All Punjab employers must pay minimum PKR 37,000/month to unskilled workers from July 1, 2025.", summaryUr:"یکم جولائی 2025 سے پنجاب میں تمام مزدوروں کو کم از کم PKR 37,000 ماہانہ دینا لازمی ہے۔", steps:["Review ALL employee salaries before July 1","Update payroll — every worker minimum PKR 37,000","Post minimum wage notice at your entrance"], authority:"Punjab Labour Dept", phone:"042-111-000-601", url:"https://labour.punjab.gov.pk", letter:b=>`To: Punjab Labour Department\nSubject: Minimum Wage Compliance\n\n${b.name}, ${b.city} declares all ${b.emp} employees receive at least PKR 37,000/month from July 1, 2025.\n${b.ownerName}, ${b.designation}` },
  { id:"punjab-closing", title:"Punjab Shop Closing Times", titleUr:"پنجاب دکان بند کرنے کا وقت", cat:"Operations", sub:"Punjab · All shops", icon:"🕙", color:"#059669", bg:"#d1fae5", provinces:["Punjab"], types:["retail","wholesale","food","services","trading","education","it","manufacturing","construction"], minRevM:0, minEmp:1, badge:"Nightly enforcement", deadline:null, penalty:25000, penaltyPerDay:25000, summaryEn:"Retail shops: 8 PM. Restaurants & food: 10 PM. Medical stores: exempt (24h). Rangers and district admin conduct nightly raids. PKR 25,000 on-spot fine.", summaryUr:"خوردہ دکانیں: رات 8 بجے۔ ریستوران: رات 10 بجے۔ میڈیکل اسٹور: مستثنیٰ۔ رات کو چھاپے۔ موقع پر PKR 25,000 جرمانہ۔", steps:["Know your category closing time (retail: 8 PM, food: 10 PM)","Post closing time notice at entrance","Train all staff — close on time every night"], authority:"District Admin Punjab", phone:"042-111-000-601", url:null, closingTimes:{food:"10:00 PM",retail:"8:00 PM",wholesale:"8:00 PM",services:"8:00 PM",pharmacy:"24 hrs",medical:"24 hrs",it:"8:00 PM",education:"8:00 PM",manufacturing:"Anytime",construction:"Anytime",trading:"8:00 PM"}, letter:b=>`To: District Administration ${b.city}\nSubject: Closing Time Compliance\n\n${b.name}, ${b.address}, ${b.city} confirms compliance with Punjab closing time regulations.\n${b.ownerName}, ${b.designation}` },
  { id:"sindh-closing", title:"Sindh / Karachi Shop Closing Times", titleUr:"سندھ دکان بند ہونے کا وقت", cat:"Operations", sub:"Sindh · Zone-wise", icon:"🌙", color:"#059669", bg:"#d1fae5", provinces:["Sindh"], types:["retail","wholesale","food","services","trading","education","it"], minRevM:0, minEmp:1, badge:"Rangers enforcing", deadline:null, penalty:20000, penaltyPerDay:20000, summaryEn:"Karachi retail: 10 PM. Restaurants in Defence/Clifton: midnight. Restaurants elsewhere: 11 PM. Rangers conduct nightly enforcement.", summaryUr:"کراچی خوردہ: رات 10 بجے۔ ڈیفینس/کلفٹن ریستوران: آدھی رات۔ دیگر: رات 11 بجے۔", steps:["Know your zone closing time","Post notice at entrance","Ensure lights off at required time"], authority:"Sindh Admin / Rangers", phone:"021-111-000-101", url:null, closingTimes:{food:"11:00 PM",retail:"10:00 PM",wholesale:"10:00 PM",services:"10:00 PM",pharmacy:"24 hrs",medical:"24 hrs",it:"10:00 PM",education:"10:00 PM",manufacturing:"Anytime",construction:"Anytime",trading:"10:00 PM"}, letter:b=>`To: Sindh District Administration ${b.city}\nSubject: Closing Time Compliance\n\n${b.name}, ${b.city}, Sindh confirms compliance.\n${b.ownerName}, ${b.designation}` },
  { id:"trade-licence", title:"Trade Licence — Municipal Corporation", titleUr:"تجارتی لائسنس", cat:"Licensing", sub:"All provinces · Every business", icon:"📋", color:"#d97706", bg:"#fef3c7", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Annual renewal Dec 31", deadline:"2025-12-31", penalty:15000, penaltyPerDay:0, summaryEn:"Every business at a physical location needs a Trade Licence. Required for bank accounts. Fee: PKR 3,000–50,000/year. Can be sealed immediately without court order.", summaryUr:"ہر کاروبار کو تجارتی لائسنس ضروری ہے۔ بینک اکاؤنٹ کے لیے لازمی۔", steps:["Visit city Municipal Corporation with documents","Pay annual fee (PKR 3,000–50,000)","Display licence at premises — renew by Dec 31"], authority:"City Municipal Corporation", phone:null, url:null, letter:b=>`To: ${b.city} Municipal Corporation\nSubject: Trade Licence Application/Renewal\n\n${b.name}, ${b.typeLabel}, ${b.address}, ${b.city} requests Trade Licence. NTN: ${b.ntn||'[NTN]'}.\n${b.ownerName}, ${b.designation}\nContact: ${b.phone||'[PHONE]'}` },
  { id:"pfa", title:"Punjab Food Authority (PFA) Licence", titleUr:"پنجاب فوڈ اتھارٹی لائسنس", cat:"Food Safety", sub:"Punjab · Food businesses", icon:"🍽️", color:"#dc2626", bg:"#fee2e2", provinces:["Punjab"], types:["food"], minRevM:0, minEmp:1, badge:"8,000+ sealed 2025", deadline:"2025-12-31", penalty:100000, penaltyPerDay:0, summaryEn:"All Punjab food businesses must have a PFA licence. All food-handling staff need medical certificates. PFA conducts surprise inspections — 400 sealed in Lahore in one week.", summaryUr:"تمام پنجاب فوڈ کاروباروں کو PFA لائسنس ضروری ہے۔ کھانا سنبھالنے والے عملے کو طبی سرٹیفکیٹ چاہیے۔", steps:["Apply at pfa.punjab.gov.pk","Get food handler medical certificates for ALL staff","Maintain temperature logs and pest control"], authority:"Punjab Food Authority", phone:"042-111-111-587", url:"https://pfa.punjab.gov.pk", letter:b=>`To: Punjab Food Authority — ${b.city} Region\nSubject: PFA Licence Application\n\n${b.name}, ${b.address}, ${b.city} applies for PFA licence. All food handlers have valid medical certificates.\n${b.ownerName}, ${b.designation}\nContact: ${b.phone||'[PHONE]'}` },
  { id:"secp", title:"SECP Annual Filing — Companies Act 2017", titleUr:"SECP سالانہ فائلنگ", cat:"Licensing", sub:"Federal · Pvt Ltd / SMC", icon:"🏛️", color:"#d97706", bg:"#fef3c7", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Annual filing required", deadline:null, penalty:500000, penaltyPerDay:1000, summaryEn:"SECP-registered companies must hold AGM within 4 months of year end and file annual return within 30 days. Non-filing results in strike-off.", summaryUr:"SECP رجسٹرڈ کمپنیوں کو سالانہ AGM اور ریٹرن فائلنگ لازمی ہے۔", steps:["Hold AGM within 4 months of year end","File annual return at eservices.secp.gov.pk","File Form 29 for any director or address changes"], authority:"SECP", phone:"051-921-0255", url:"https://eservices.secp.gov.pk", letter:b=>`To: SECP\nSubject: Annual Compliance Filing — ${b.name}\n\n${b.name}, ${b.city} confirms annual return filing for FY 2024–25.\n${b.ownerName}, ${b.designation}` },
  { id:"pessi", title:"PESSI — Punjab Social Security", titleUr:"PESSI پنجاب سوشل سیکیورٹی", cat:"Labour", sub:"Punjab · 5+ employees", icon:"🏥", color:"#7c3aed", bg:"#ede9fe", provinces:["Punjab"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:5, badge:"Mandatory", deadline:null, penalty:30000, penaltyPerDay:300, summaryEn:"Punjab businesses with 5+ employees must register with PESSI and pay 6% of wages monthly. Provides free healthcare to workers.", summaryUr:"پنجاب میں 5 یا زیادہ ملازمین والے کاروباروں کو PESSI رجسٹریشن لازمی ہے۔", steps:["Register at pessi.punjab.gov.pk","Register all eligible employees","Pay 6% of wages monthly by 15th"], authority:"PESSI", phone:"042-35761599", url:"https://pessi.punjab.gov.pk", letter:b=>`To: PESSI Regional Office, Punjab\nSubject: PESSI Compliance — ${b.name}\n\n${b.name}, ${b.city} confirms PESSI registration.\n${b.ownerName}, ${b.designation}` },
  { id:"drap", title:"Drug Sale Licence — DRAP", titleUr:"دوائیں فروخت کرنے کا لائسنس", cat:"Medical", sub:"Federal · Pharmacies", icon:"💊", color:"#0891b2", bg:"#e0f2fe", provinces:["All"], types:["pharmacy","medical"], minRevM:0, minEmp:1, badge:"Before selling any medicine", deadline:null, penalty:500000, penaltyPerDay:0, summaryEn:"Any business selling pharmaceutical drugs must have a DRAP Drug Sale Licence. A registered pharmacist must be present at all times.", summaryUr:"دوائیں فروخت کرنے والے کسی بھی کاروبار کو DRAP لائسنس ضروری ہے۔", steps:["Apply at dra.gov.pk","Hire a registered pharmacist (B.Pharm or Pharm.D)","Display Drug Sale Licence at counter"], authority:"DRAP", phone:"051-9106316", url:"https://dra.gov.pk", letter:b=>`To: Drug Regulatory Authority of Pakistan\nSubject: Drug Sale Licence Application — ${b.name}\n\n${b.name}, ${b.address}, ${b.city}. Owner: ${b.ownerName}\nContact: ${b.phone||'[PHONE]'}` },
];

/* ── NEWS ─────────────────────────────────────────────────── */
const NEWS = [
  { id:"n1", img:"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80", headline:"FBR Seals 1,200 Shops Nationwide", headlineUr:"FBR نے 1,200 دکانیں سیل کیں", caption:"FBR deployed 1,200 field officers sealing retail businesses without STRN across Lahore, Karachi, and Islamabad.", captionUr:"FBR نے STRN کے بغیر خوردہ کاروباروں کو سیل کیا۔", source:"Dawn", h:2, cat:"Tax", catColor:"#ef4444", mag:"high", provinces:["All"], types:["retail","wholesale","trading","food"], stats:[{n:"1,200",l:"Shops sealed"},{n:"PKR 200K",l:"Fine"},{n:"All cities",l:"Affected"}], action:"Register on FBR IRIS at iris.fbr.gov.pk today.", actionUr:"آج ہی iris.fbr.gov.pk پر رجسٹر کریں۔", likes:2847 },
  { id:"n2", img:"https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=80", headline:"Punjab Minimum Wage PKR 37,000 — July 1", headlineUr:"پنجاب کم از کم اجرت PKR 37,000", caption:"Punjab government notified PKR 37,000 as the new minimum wage. Labour inspectors checking payroll from July 5th.", captionUr:"پنجاب حکومت نے PKR 37,000 کو نئی کم از کم اجرت قرار دیا۔", source:"The News", h:5, cat:"Labour", catColor:"#3b82f6", mag:"high", provinces:["Punjab"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], stats:[{n:"PKR 37K",l:"New minimum"},{n:"July 1",l:"Effective"},{n:"PKR 25K",l:"Per worker fine"}], action:"Update ALL salaries before July 1.", actionUr:"یکم جولائی سے پہلے تمام تنخواہیں اپ ڈیٹ کریں۔", likes:1923 },
  { id:"n3", img:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", headline:"PFA Seals 400 Restaurants in Lahore in One Week", headlineUr:"PFA نے ایک ہفتے میں 400 ریستوران سیل کیے", caption:"Punjab Food Authority sealed 400 food establishments. #1 reason: staff without medical certificates.", captionUr:"سب سے بڑی وجہ: بغیر طبی سرٹیفکیٹ کے عملہ۔", source:"Geo News", h:8, cat:"Food Safety", catColor:"#f59e0b", mag:"high", provinces:["Punjab"], types:["food"], stats:[{n:"400",l:"Sealed"},{n:"8,000+",l:"In 2025"},{n:"PKR 100K",l:"Max fine"}], action:"Get food handler medical certificates for ALL food-handling staff this week.", actionUr:"اس ہفتے تمام فوڈ ہینڈلنگ عملے کے طبی سرٹیفکیٹ حاصل کریں۔", likes:3102 },
  { id:"n4", img:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80", headline:"Shops Fined PKR 25,000 for Opening After 8 PM", headlineUr:"رات 8 بجے کے بعد کھلی دکانوں پر PKR 25,000 جرمانہ", caption:"District administrations across Punjab conducting nightly operations. PKR 25,000 fine on spot for shops open after closing time.", captionUr:"پنجاب بھر میں ضلعی انتظامیہ رات کو آپریشن کر رہی ہے۔", source:"ARY News", h:3, cat:"Operations", catColor:"#059669", mag:"high", provinces:["All"], types:["retail","food","services","trading","wholesale"], stats:[{n:"PKR 25K",l:"On-spot fine"},{n:"8–10 PM",l:"Closing"},{n:"Nightly",l:"Raids"}], action:"Know your closing time. Retail: 8 PM. Restaurants: 10 PM.", actionUr:"اپنا بند ہونے کا وقت جانیں۔ خوردہ: 8 بجے۔ ریستوران: 10 بجے۔", likes:4521 },
  { id:"n5", img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80", headline:"2.8M Non-Filers Face Double Bank Tax", headlineUr:"2.8 ملین غیر فائلرز کو دوگنا بینک ٹیکس", caption:"FBR updated ATL. Non-filers pay 0.6% withholding on cash withdrawals vs 0.1% for filers — 6x more expensive.", captionUr:"غیر فائلرز بینک سے نکالنے پر 6 گنا زیادہ ٹیکس ادا کرتے ہیں۔", source:"Express Tribune", h:18, cat:"Tax", catColor:"#ef4444", mag:"medium", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], stats:[{n:"2.8M",l:"Non-filers"},{n:"6×",l:"More tax"},{n:"Sep 30",l:"Deadline"}], action:"File your return at iris.fbr.gov.pk before September 30. It is free.", actionUr:"30 ستمبر سے پہلے ریٹرن فائل کریں۔ یہ مفت ہے۔", likes:1654 },
  { id:"n6", img:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", headline:"EOBI Auditing Businesses with 5+ Employees", headlineUr:"EOBI 5 یا زیادہ ملازمین والے کاروباروں کا آڈٹ", caption:"EOBI cross-referencing FBR payroll data. Unregistered employers receiving audit notices — 3 years backdated contributions plus PKR 50,000 fine.", captionUr:"غیر رجسٹرڈ آجروں کو 3 سال کی پچھلی ادائیگی کا نوٹس۔", source:"Business Recorder", h:12, cat:"Labour", catColor:"#7c3aed", mag:"high", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], stats:[{n:"3 years",l:"Backdated"},{n:"PKR 50K",l:"Fine"},{n:"5+ staff",l:"Threshold"}], action:"Register at eobi.gov.pk now if you have 5+ employees.", actionUr:"اگر 5 یا زیادہ ملازمین ہیں تو ابھی eobi.gov.pk پر رجسٹر کریں۔", likes:987 },
];

/* ── CA LISTINGS ──────────────────────────────────────────── */
const CA_LISTINGS = [
  { name:"Ahmad & Co Chartered Accountants", city:"Lahore", area:"Gulberg", rating:4.8, reviews:127, speciality:"Tax & FBR", phone:"0300-1234567", fee:"PKR 5,000–15,000" },
  { name:"Karachi Tax Consultants", city:"Karachi", area:"Clifton", rating:4.7, reviews:89, speciality:"Sales Tax & SECP", phone:"0321-7654321", fee:"PKR 8,000–20,000" },
  { name:"Islamabad Law Associates", city:"Islamabad", area:"F-7", rating:4.9, reviews:203, speciality:"Corporate & SECP", phone:"0311-9876543", fee:"PKR 10,000–30,000" },
  { name:"FBR Filing Experts", city:"Lahore", area:"DHA Phase 5", rating:4.6, reviews:54, speciality:"Income Tax Returns", phone:"0333-1112222", fee:"PKR 3,000–10,000" },
  { name:"Rawalpindi CA Firm", city:"Rawalpindi", area:"Satellite Town", rating:4.5, reviews:41, speciality:"All Tax Services", phone:"0345-5556666", fee:"PKR 4,000–12,000" },
  { name:"Faisalabad Tax Office", city:"Faisalabad", area:"D-Ground", rating:4.7, reviews:67, speciality:"Labour & Tax", phone:"0301-7778888", fee:"PKR 3,000–8,000" },
];

/* ── REFERENCE DATA ───────────────────────────────────────── */
const BIZ_TYPES = [
  {v:"retail", l:"Retail / General Store", lUr:"خوردہ / جنرل اسٹور", i:"🛍️"},
  {v:"wholesale", l:"Wholesale / Distribution", lUr:"تھوک", i:"📦"},
  {v:"food", l:"Restaurant / Food", lUr:"ریستوران / کھانا", i:"🍽️"},
  {v:"manufacturing", l:"Manufacturing", lUr:"مینوفیکچرنگ", i:"🏭"},
  {v:"services", l:"Professional Services", lUr:"پیشہ ورانہ خدمات", i:"💼"},
  {v:"it", l:"IT / Software", lUr:"IT / سافٹ ویئر", i:"💻"},
  {v:"medical", l:"Medical / Clinic", lUr:"میڈیکل / کلینک", i:"🏥"},
  {v:"pharmacy", l:"Pharmacy", lUr:"فارمیسی", i:"💊"},
  {v:"education", l:"School / Academy", lUr:"اسکول / اکیڈمی", i:"🎓"},
  {v:"construction", l:"Construction", lUr:"تعمیرات", i:"🏗️"},
  {v:"trading", l:"Import / Export", lUr:"درآمد / برآمد", i:"🚢"},
];
const PROVINCES = ["Punjab","Sindh","KPK","Balochistan","Islamabad"];
const CITIES = { Punjab:["Lahore","Rawalpindi","Faisalabad","Multan","Gujranwala","Sialkot"], Sindh:["Karachi","Hyderabad","Sukkur","Larkana"], KPK:["Peshawar","Abbottabad","Mardan"], Balochistan:["Quetta","Gwadar"], Islamabad:["Islamabad"] };
const REG_TYPES = [{v:"sole",l:"Sole Proprietorship",lUr:"واحد ملکیت"},{v:"partnership",l:"Partnership",lUr:"شراکت داری"},{v:"pvt",l:"Private Limited",lUr:"پرائیویٹ لمیٹڈ"},{v:"smc",l:"Single Member Company",lUr:"سنگل ممبر کمپنی"}];
const REV_BANDS = [{l:"Under PKR 1M",lUr:"PKR 1M سے کم",v:0.5},{l:"PKR 1M–5M",lUr:"PKR 1M–5M",v:3},{l:"PKR 5M–10M",lUr:"PKR 5M–10M",v:7.5},{l:"PKR 10M–30M",lUr:"PKR 10M–30M",v:20},{l:"PKR 30M–100M",lUr:"PKR 30M–100M",v:65},{l:"Above PKR 100M",lUr:"PKR 100M سے زیادہ",v:150}];
const EMP_BANDS = [{l:"Just me (1)",lUr:"صرف میں",v:1},{l:"2–4",lUr:"2–4",v:3},{l:"5–10",lUr:"5–10",v:7},{l:"11–25",lUr:"11–25",v:18},{l:"26–50",lUr:"26–50",v:38},{l:"51–100",lUr:"51–100",v:75},{l:"100+",lUr:"100+",v:150}];
const LICENCE_TYPES = ["NTN","STRN (Sales Tax)","Trade Licence","EOBI","PESSI","PFA Licence","SECP","Drug Licence (DRAP)","Import/Export Licence"];
const DESIGNATIONS = ["Owner","Director","CEO","Managing Partner","Manager","Proprietor"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* ── HELPERS ──────────────────────────────────────────────── */
const bl = (v,lg) => BIZ_TYPES.find(t=>t.v===v)?.[lg==="ur"?"lUr":"l"] || v;
const bi = v => BIZ_TYPES.find(t=>t.v===v)?.i || "🏢";
const daysUntil = d => d ? Math.ceil((new Date(d)-new Date())/86400000) : null;

function matchLaw(law, biz) {
  if (!biz || !biz.type || !biz.province) return false;
  return (law.provinces.includes("All") || law.provinces.includes(biz.province))
    && (law.types.includes(biz.type) || (biz.type==="pharmacy" && law.types.includes("medical")))
    && (biz.revM||0) >= (law.minRevM||0)
    && (biz.emp||1)  >= (law.minEmp||1);
}
function matchNews(n, biz) {
  if (!biz || !biz.type || !biz.province) return false;
  return (n.provinces.includes("All") || n.provinces.includes(biz.province))
    && (n.types.includes(biz.type) || (biz.type==="pharmacy" && n.types.includes("medical")));
}
function riskColor(s) { return s>=70?"#ef4444":s>=40?"#f59e0b":"#10b981"; }

/* ── DESIGN ───────────────────────────────────────────────── */
const G = {
  h: "'DM Sans',system-ui,sans-serif",
  b: "'DM Sans',system-ui,sans-serif",
  mono: "'DM Mono',monospace",
  /* Dark theme */
  night:"#060606", dark1:"#0c0c0c", dark2:"#111111", dark3:"#161616",
  darkBorder:"rgba(201,168,76,.22)",
  /* Light theme */
  card:"#ffffff", surface:"#faf6ed", lightBorder:"#f0e8cc", lightCard:"#fdf8ef",
  /* Gold */
  gold:"#C9A84C", goldDark:"#B8922A", goldFaint:"rgba(201,168,76,.08)",
  goldBorder:"rgba(201,168,76,.25)",
  /* Semantic */
  red:"#ef4444", redFaint:"rgba(239,68,68,.1)", redBorder:"rgba(239,68,68,.45)",
  green:"#059669", muted:"#2a2a2a", lightMuted:"#bbb",
  /* Legacy compat */
  navy:"#111111", border:"#f0e8cc", pk:"#C9A84C", indigo:"#C9A84C", violet:"#B8922A", green2:"#059669",
};

/* Dark vs Light helpers */
const isDark = () => document.documentElement.classList.contains("dark") || window.matchMedia("(prefers-color-scheme: dark)").matches;

function injectFonts() {
  if (document.getElementById("vf-fonts")) return;
  const l = document.createElement("link");
  l.id="vf-fonts"; l.rel="stylesheet";
  l.href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono&display=swap";
  document.head.appendChild(l);
  /* Tabler icons */
  const t = document.createElement("link");
  t.rel="stylesheet";
  t.href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.8.0/dist/tabler-icons.min.css";
  document.head.appendChild(t);
}
/* ── SHARED INPUT / BUTTON STYLES ─────────────────────────── */
const IS = {width:"100%",padding:"11px 13px",borderRadius:10,border:"1px solid #1e1e1e",fontSize:13,fontFamily:"inherit",color:"#fff",background:"#0c0c0c",outline:"none",boxSizing:"border-box"};
const SS = {...IS,appearance:"none",cursor:"pointer"};
const BP = {width:"100%",padding:"13px",borderRadius:12,border:"none",background:`linear-gradient(135deg,${G.gold},${G.goldDark})`,color:"#000",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",letterSpacing:".02em"};
const BS = {...BP,background:"#0c0c0c",color:G.gold,border:`1px solid ${G.goldBorder}`,boxShadow:"none"};

/* ── ONBOARDING ───────────────────────────────────────────── */
function Onboarding({ onDone, lang, setLang }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name:"", ownerName:"", designation:"Owner", phone:"",
    type:"", province:"", city:"", address:"",
    regType:"sole", ntn:"", revM:3, emp:3,
    licences:[], products:"",
    /* NEW — business activities */
    doesImport:false, doesExport:false, handlesFood:false,
    hasFactory:false, hasWarehouse:false, sellsOnline:false,
    hasMultipleLocations:false, dealsForeignCurrency:false,
    /* NEW — specific details */
    hasLongTermEmployees:false, hasGenerator:false,
    hasSignboard:false, acceptsDigitalPayments:false,
    hasBoiler:false, hasVehicles:false,
  });
  const [err, setErr] = useState("");
  const t = T[lang];
  const upd = (k,v) => setForm(p => ({...p, [k]:v}));
  const toggleLic = l => setForm(p => ({...p, licences: p.licences.includes(l) ? p.licences.filter(x=>x!==l) : [...p.licences,l]}));
  const toggleBool = k => setForm(p => ({...p, [k]:!p[k]}));

  function handleNext() {
    setErr("");
    if (step === 0) {
      if (!form.name.trim() || !form.ownerName.trim() || !form.phone.trim()) { setErr(t.fillAll); return; }
      setStep(1); return;
    }
    if (step === 1) {
      if (!form.type || !form.province || !form.city || !form.address.trim()) { setErr(t.fillAll); return; }
      setStep(2); return;
    }
    if (step === 2) { setStep(3); return; }
    if (step === 3) { setStep(4); return; }
    if (step === 4) { setStep(5); return; }
    if (step === 5) {
      const revM  = parseFloat(form.revM) || 3;
      const emp   = parseInt(form.emp)    || 3;
      onDone({
        ...form, revM, emp,
        typeLabel: bl(form.type,"en"),
        revLabel:  REV_BANDS.find(b=>b.v===revM)?.l || "",
        empLabel:  EMP_BANDS.find(b=>b.v===emp)?.l  || "",
      });
      return;
    }
  }

  const STEP_LABELS = [t.s0, t.s1, t.s2, t.s3,
    lang==="ur"?"کاروباری سرگرمیاں":"Business Activities",
    lang==="ur"?"مخصوص تفصیلات":"Specific Details",
  ];

  /* Reusable toggle button */
  const ToggleBtn = ({k, label, icon}) => (
    <div onClick={()=>toggleBool(k)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,border:`1.5px solid ${form[k]?G.green:G.border}`,background:form[k]?"#f0fdf4":"#fff",cursor:"pointer",transition:"all .15s",marginBottom:6}}>
      <div style={{width:18,height:18,borderRadius:5,border:`2px solid ${form[k]?G.green:G.border}`,background:form[k]?G.green:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        {form[k] && <span style={{color:"#fff",fontSize:11}}>✓</span>}
      </div>
      <span style={{fontSize:13}}>{icon}</span>
      <span style={{fontSize:12,color:G.navy,fontWeight:form[k]?600:400}}>{label}</span>
    </div>
  );

  return (
    <div style={{height:"100vh",overflowY:"auto",background:"radial-gradient(ellipse at 20% 10%,#01411C,#070714 60%)",fontFamily:G.b,direction:lang==="ur"?"rtl":"ltr"}}>
      <style>{`@keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} @keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{maxWidth:480,margin:"0 auto",padding:"24px 20px 60px",animation:"up .4s ease"}}>

        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:12,background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:16,padding:"10px 20px",marginBottom:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#01411C,#059669)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>✓</div>
            <div>
              <div style={{fontFamily:G.h,fontSize:26,color:"#fff",letterSpacing:"-1px",lineHeight:1}}>Verifill</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,.3)",letterSpacing:".15em",textTransform:"uppercase",marginTop:1}}>Pakistan Compliance AI 🇵🇰</div>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:8}}>
            {["en","ur"].map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{padding:"4px 14px",borderRadius:12,border:`1px solid ${lang===l?"#fff":"rgba(255,255,255,.3)"}`,background:lang===l?"rgba(255,255,255,.15)":"transparent",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:G.b}}>
                {l==="en"?"English":"اردو"}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div style={{display:"flex",gap:3,marginBottom:5}}>
          {STEP_LABELS.map((_,i)=>(
            <div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=step?"#059669":"rgba(255,255,255,.1)",transition:"background .3s"}}/>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
          <span style={{fontSize:11,color:"rgba(255,255,255,.3)"}}>{t.step} {step+1} {t.of} 6</span>
          <span style={{fontSize:11,color:"#6ee7b7",fontWeight:600}}>{STEP_LABELS[step]}</span>
        </div>

        {/* Card */}
        <div style={{background:G.card,borderRadius:20,padding:"22px 20px",boxShadow:"0 32px 80px rgba(0,0,0,.5)"}}>

          {/* STEP 0 — Identity */}
          {step===0 && (
            <div>
              <h2 style={{fontFamily:G.h,fontSize:20,color:G.navy,marginBottom:4}}>{t.s0}</h2>
              <p style={{fontSize:12,color:G.muted,marginBottom:18,lineHeight:1.6}}>We pre-fill government letters using these details.</p>
              {[{l:t.bizName,k:"name",ph:"e.g. Al-Noor General Store"},{l:t.ownerName,k:"ownerName",ph:"e.g. Muhammad Ahmad"},{l:t.phone,k:"phone",ph:"e.g. 0300-1234567"}].map(f=>(
                <div key={f.k} style={{marginBottom:12}}>
                  <label style={{fontSize:12,fontWeight:600,color:G.navy,display:"block",marginBottom:4}}>{f.l}</label>
                  <input value={form[f.k]} onChange={e=>upd(f.k,e.target.value)} placeholder={f.ph} style={IS}/>
                </div>
              ))}
              <label style={{fontSize:12,fontWeight:600,color:G.navy,display:"block",marginBottom:4}}>{t.role}</label>
              <select value={form.designation} onChange={e=>upd("designation",e.target.value)} style={SS}>
                {DESIGNATIONS.map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
          )}

          {/* STEP 1 — Business type and location */}
          {step===1 && (
            <div>
              <h2 style={{fontFamily:G.h,fontSize:20,color:G.navy,marginBottom:4}}>{t.s1}</h2>
              <p style={{fontSize:12,color:G.muted,marginBottom:14,lineHeight:1.6}}>Laws differ by province — closing times, wages, and food rules depend on where you are.</p>
              <label style={{fontSize:12,fontWeight:600,color:G.navy,display:"block",marginBottom:5}}>{t.bizType}</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14}}>
                {BIZ_TYPES.map(tp=>(
                  <button key={tp.v} onClick={()=>upd("type",tp.v)} style={{padding:"8px 8px",borderRadius:10,border:`2px solid ${form.type===tp.v?G.indigo:G.border}`,background:form.type===tp.v?"#eef2ff":"#fff",color:form.type===tp.v?G.indigo:G.navy,fontSize:11,fontWeight:500,cursor:"pointer",textAlign:"left",fontFamily:G.b,display:"flex",alignItems:"center",gap:5,transition:"all .15s"}}>
                    <span style={{fontSize:14}}>{tp.i}</span>{lang==="ur"?tp.lUr:tp.l}
                  </button>
                ))}
              </div>
              <label style={{fontSize:12,fontWeight:600,color:G.navy,display:"block",marginBottom:4}}>{t.province}</label>
              <select value={form.province} onChange={e=>{upd("province",e.target.value);upd("city","");}} style={{...SS,marginBottom:10}}>
                <option value="">Select province…</option>
                {PROVINCES.map(p=><option key={p}>{p}</option>)}
              </select>
              {form.province && (
                <>
                  <label style={{fontSize:12,fontWeight:600,color:G.navy,display:"block",marginBottom:4}}>{t.city}</label>
                  <select value={form.city} onChange={e=>upd("city",e.target.value)} style={{...SS,marginBottom:10}}>
                    <option value="">Select city…</option>
                    {(CITIES[form.province]||[]).map(c=><option key={c}>{c}</option>)}
                  </select>
                </>
              )}
              <label style={{fontSize:12,fontWeight:600,color:G.navy,display:"block",marginBottom:4}}>{t.address}</label>
              <input value={form.address} onChange={e=>upd("address",e.target.value)} placeholder="e.g. Shop 5, Main Market, Gulberg" style={IS}/>
            </div>
          )}

          {/* STEP 2 — Size and registration */}
          {step===2 && (
            <div>
              <h2 style={{fontFamily:G.h,fontSize:20,color:G.navy,marginBottom:4}}>{t.s2}</h2>
              <p style={{fontSize:12,color:G.muted,marginBottom:14,lineHeight:1.6}}>Many laws only apply above certain employee or revenue thresholds.</p>
              <label style={{fontSize:12,fontWeight:600,color:G.navy,display:"block",marginBottom:5}}>{t.regType}</label>
              <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
                {REG_TYPES.map(r=>(
                  <button key={r.v} onClick={()=>upd("regType",r.v)} style={{padding:"9px 12px",borderRadius:10,border:`2px solid ${form.regType===r.v?G.indigo:G.border}`,background:form.regType===r.v?"#eef2ff":"#fff",color:form.regType===r.v?G.indigo:G.navy,fontSize:12,fontWeight:500,cursor:"pointer",textAlign:"left",fontFamily:G.b,transition:"all .15s"}}>
                    {lang==="ur"?r.lUr:r.l}
                  </button>
                ))}
              </div>
              <label style={{fontSize:12,fontWeight:600,color:G.navy,display:"block",marginBottom:4}}>{t.revenue}</label>
              <select value={form.revM} onChange={e=>upd("revM",parseFloat(e.target.value))} style={{...SS,marginBottom:10}}>
                {REV_BANDS.map(b=><option key={b.v} value={b.v}>{lang==="ur"?b.lUr:b.l}</option>)}
              </select>
              <label style={{fontSize:12,fontWeight:600,color:G.navy,display:"block",marginBottom:4}}>{t.employees}</label>
              <select value={form.emp} onChange={e=>upd("emp",parseInt(e.target.value))} style={{...SS,marginBottom:10}}>
                {EMP_BANDS.map(b=><option key={b.v} value={b.v}>{lang==="ur"?b.lUr:b.l}</option>)}
              </select>
              <label style={{fontSize:12,fontWeight:600,color:G.navy,display:"block",marginBottom:4}}>{t.ntn}</label>
              <input value={form.ntn} onChange={e=>upd("ntn",e.target.value)} placeholder="e.g. 1234567-8" style={IS}/>
            </div>
          )}

          {/* STEP 3 — Licences you already have */}
          {step===3 && (
            <div>
              <h2 style={{fontFamily:G.h,fontSize:20,color:G.navy,marginBottom:4}}>{t.s3}</h2>
              <p style={{fontSize:12,color:G.muted,marginBottom:14,lineHeight:1.6}}>Tick what you already have — we show you what is MISSING.</p>
              <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:14}}>
                {LICENCE_TYPES.map(l=>(
                  <div key={l} onClick={()=>toggleLic(l)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,border:`1.5px solid ${form.licences.includes(l)?G.green:G.border}`,background:form.licences.includes(l)?"#f0fdf4":"#fff",cursor:"pointer",transition:"all .15s"}}>
                    <div style={{width:18,height:18,borderRadius:5,border:`2px solid ${form.licences.includes(l)?G.green:G.border}`,background:form.licences.includes(l)?G.green:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {form.licences.includes(l) && <span style={{color:"#fff",fontSize:11}}>✓</span>}
                    </div>
                    <span style={{fontSize:12,color:G.navy}}>{l}</span>
                  </div>
                ))}
              </div>
              <label style={{fontSize:12,fontWeight:600,color:G.navy,display:"block",marginBottom:4}}>{t.whatSell}</label>
              <input value={form.products} onChange={e=>upd("products",e.target.value)} placeholder="e.g. clothing, biryani, web design, medicines" style={IS}/>
            </div>
          )}

          {/* STEP 4 — Business activities (NEW) */}
          {step===4 && (
            <div>
              <h2 style={{fontFamily:G.h,fontSize:20,color:G.navy,marginBottom:4}}>
                {lang==="ur"?"کاروباری سرگرمیاں":"Business Activities"}
              </h2>
              <p style={{fontSize:12,color:G.muted,marginBottom:14,lineHeight:1.6}}>
                {lang==="ur"?"یہ ہمیں آپ پر لاگو مزید قوانین ڈھونڈنے میں مدد کرتا ہے۔":"This helps us find additional laws that apply to you. Tick everything that applies."}
              </p>
              <ToggleBtn k="doesImport"            icon="🚢" label={lang==="ur"?"میں سامان درآمد کرتا ہوں":"I import goods from abroad"}/>
              <ToggleBtn k="doesExport"            icon="📦" label={lang==="ur"?"میں سامان برآمد کرتا ہوں":"I export goods to other countries"}/>
              <ToggleBtn k="handlesFood"           icon="🍽️" label={lang==="ur"?"میں کھانا بناتا / سنبھالتا ہوں":"I prepare or handle food (even partly)"}/>
              <ToggleBtn k="hasFactory"            icon="🏭" label={lang==="ur"?"میرے پاس فیکٹری یا پروڈکشن یونٹ ہے":"I have a factory or production unit"}/>
              <ToggleBtn k="hasWarehouse"          icon="🏗️" label={lang==="ur"?"میرے پاس گودام یا ذخیرہ ہے":"I have a warehouse or storage facility"}/>
              <ToggleBtn k="sellsOnline"           icon="💻" label={lang==="ur"?"میں آن لائن بیچتا ہوں":"I sell products or services online"}/>
              <ToggleBtn k="hasMultipleLocations"  icon="📍" label={lang==="ur"?"میرے ایک سے زیادہ مقامات ہیں":"I have more than one business location"}/>
              <ToggleBtn k="dealsForeignCurrency"  icon="💱" label={lang==="ur"?"میں غیر ملکی کرنسی میں لین دین کرتا ہوں":"I deal in foreign currency or receive payments from abroad"}/>
            </div>
          )}

          {/* STEP 5 — Specific details (NEW) */}
          {step===5 && (
            <div>
              <h2 style={{fontFamily:G.h,fontSize:20,color:G.navy,marginBottom:4}}>
                {lang==="ur"?"مخصوص تفصیلات":"A Few More Details"}
              </h2>
              <p style={{fontSize:12,color:G.muted,marginBottom:14,lineHeight:1.6}}>
                {lang==="ur"?"آخری چند سوالات — یہ بہت ضروری ہیں۔":"Last few questions — these unlock important compliance requirements."}
              </p>
              <ToggleBtn k="hasLongTermEmployees" icon="👷" label={lang==="ur"?"کچھ ملازمین 5 سال سے زیادہ سے کام کر رہے ہیں":"Some employees have worked here 5+ years (gratuity applies)"}/>
              <ToggleBtn k="hasGenerator"         icon="⚡" label={lang==="ur"?"میرے پاس جنریٹر ہے":"I have a generator (200L+ fuel storage)"}/>
              <ToggleBtn k="hasSignboard"         icon="🪧" label={lang==="ur"?"میرے پاس باہر سائن بورڈ ہے":"I have an outdoor signboard or banner"}/>
              <ToggleBtn k="acceptsDigitalPayments" icon="📱" label={lang==="ur"?"میں ڈیجیٹل ادائیگیاں قبول کرتا ہوں":"I accept digital payments (Raast, JazzCash, Easypaisa)"}/>
              <ToggleBtn k="hasBoiler"            icon="♨️" label={lang==="ur"?"میری فیکٹری میں بوائلر ہے":"My factory uses a boiler or pressure vessel"}/>
              <ToggleBtn k="hasVehicles"          icon="🚛" label={lang==="ur"?"میرے پاس کاروباری گاڑیاں ہیں":"I operate commercial vehicles for business"}/>
            </div>
          )}

          {err && <p style={{color:G.red,fontSize:12,marginTop:10,fontWeight:600}}>⚠ {err}</p>}

          <div style={{display:"flex",gap:10,marginTop:20}}>
            {step > 0 && (
              <button onClick={()=>setStep(s=>s-1)} style={{...BS,flex:1}}>{t.back}</button>
            )}
            <button onClick={handleNext} style={{...BP,flex:2,background:step===5?`linear-gradient(135deg,${G.pk},${G.green})`:`linear-gradient(135deg,${G.indigo},${G.violet})`}}>
              {step===5 ? t.finish : t.next}
            </button>
          </div>
        </div>

        <p style={{textAlign:"center",color:"rgba(255,255,255,.18)",fontSize:11,marginTop:14}}>
          🇵🇰 56 Pakistan laws · Free
        </p>
      </div>
    </div>
  );
}

/* ── DASHBOARD ────────────────────────────────────────────── */
function Dashboard({ biz, laws, news, onNav, onLaw, onNews, lang, setLang, user, signOut, dark, setDark, TH }) {
  const urgent = laws.filter(l=>{const d=daysUntil(l.deadline);return d!==null&&d<60;});
  const closingLaw = laws.find(l=>l.id==="punjab-closing"||l.id==="sindh-closing");
  const CT = {food:"10:00 PM",retail:"8:00 PM",wholesale:"8:00 PM",services:"8:00 PM",pharmacy:"24 hrs",medical:"24 hrs",it:"8:00 PM",education:"8:00 PM",manufacturing:"Anytime",construction:"Anytime",trading:"8:00 PM"};
  const myClosing = closingLaw?.closingTimes?.[biz?.type] || CT[biz?.type] || "8:00 PM";
  const bizIcon = {retail:"ti-building-store",wholesale:"ti-package",food:"ti-tools-kitchen-2",manufacturing:"ti-building-factory-2",services:"ti-briefcase",it:"ti-device-laptop",medical:"ti-medical-cross",pharmacy:"ti-pill",education:"ti-school",construction:"ti-crane",trading:"ti-ship"};
  const icon = bizIcon[biz?.type] || "ti-building";

  return (
    <div style={{height:"100vh",overflowY:"auto",background:TH.bg,fontFamily:"inherit"}}>
      {/* TOP BAR */}
      <div style={{background:TH.bg,padding:"20px 20px 16px",borderBottom:`0.5px solid ${TH.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:10,border:`1px solid ${TH.border2}`,background:TH.goldFaint,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <i className="ti ti-shield-check" style={{fontSize:18,color:TH.gold}}/>
            </div>
            <div>
              <div style={{fontSize:16,fontWeight:500,color:TH.gold,letterSpacing:".5px"}}>Verifill</div>
              <div style={{fontSize:9,color:TH.text3,letterSpacing:".15em",textTransform:"uppercase"}}>Pakistan Compliance</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {/* Theme toggle */}
            <button onClick={()=>setDark(d=>!d)} style={{background:TH.goldFaint,border:`1px solid ${TH.border2}`,borderRadius:8,padding:"6px 8px",cursor:"pointer",color:TH.gold,display:"flex",alignItems:"center"}}>
              <i className={`ti ${dark?"ti-sun":"ti-moon"}`} style={{fontSize:16}}/>
            </button>
            {["en","ur"].map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{padding:"4px 10px",borderRadius:8,border:`1px solid ${lang===l?TH.gold:TH.border}`,background:lang===l?TH.goldFaint:"transparent",color:lang===l?TH.gold:TH.text3,fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>
                {l==="en"?"EN":"اردو"}
              </button>
            ))}
            {user && (
              <button onClick={signOut} style={{background:"transparent",border:"none",cursor:"pointer",color:TH.text3}}>
                <i className="ti ti-logout" style={{fontSize:18}}/>
              </button>
            )}
          </div>
        </div>

        {/* Business info */}
        <div style={{marginBottom:16}}>
          <div style={{fontSize:22,fontWeight:500,color:TH.text,letterSpacing:"-.3px",marginBottom:4}}>
            {(biz?.name||"").length>22?(biz?.name||"").slice(0,22)+"…":biz?.name||""}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:TH.text2}}>
            <i className={`ti ${icon}`} style={{fontSize:16,color:TH.gold}}/>
            {biz?.typeLabel||""} · {biz?.city||""}{biz?.province?`, ${biz.province}`:""}
          </div>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
          {[
            {n:laws.length,   l:lang==="ur"?"قوانین":"Laws"},
            {n:urgent.length, l:lang==="ur"?"فوری":"Urgent"},
            {n:news.length,   l:lang==="ur"?"خبریں":"News"},
            {n:`${laws.length?Math.max(0,100-Math.round((urgent.length/laws.length)*50)):100}%`, l:lang==="ur"?"اسکور":"Score"},
          ].map((s,i)=>(
            <div key={i} style={{border:`1px solid ${TH.border2}`,borderRadius:12,padding:"10px 6px",textAlign:"center",background:"transparent"}}>
              <div style={{fontSize:20,fontWeight:500,color:TH.gold,lineHeight:1,marginBottom:4}}>{s.n}</div>
              <div style={{fontSize:10,color:TH.text3,letterSpacing:".06em"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{padding:"16px 18px 110px",background:TH.bg2}}>

        {/* Closing time */}
        {closingLaw && (
          <div onClick={()=>onLaw(closingLaw)} style={{background:TH.bg,border:`1px solid ${TH.border2}`,borderRadius:14,padding:"16px",marginBottom:16,cursor:"pointer"}}>
            <div style={{fontSize:11,color:TH.gold,letterSpacing:".12em",textTransform:"uppercase",marginBottom:8,opacity:.8}}>
              <i className="ti ti-clock" style={{fontSize:12,marginRight:6,verticalAlign:"-1px"}}/>
              {lang==="ur"?"آج رات بند کرنے کا وقت":"Closing time tonight"}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:32,fontWeight:500,color:TH.text,letterSpacing:"-1px"}}>{myClosing}</div>
              <div style={{border:`1px solid ${TH.border2}`,borderRadius:20,padding:"5px 14px",fontSize:11,color:TH.gold}}>PKR 25,000 fine</div>
            </div>
          </div>
        )}

        {/* Quick tools */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {[
            {icon:"ti-calendar-event", label:lang==="ur"?"کیلنڈر":"Calendar",  nav:"calendar"},
            {icon:"ti-calculator",     label:lang==="ur"?"جرمانہ":"Fine Calc", nav:"finecalc"},
            {icon:"ti-scan",           label:lang==="ur"?"اسکین":"Scan Doc",   nav:"scandoc"},
            {icon:"ti-user-check",     label:lang==="ur"?"CA تلاش":"Find CA",  nav:"findca"},
          ].map(q=>(
            <div key={q.nav} onClick={()=>onNav(q.nav)} style={{background:TH.bg,border:`0.5px solid ${TH.border}`,borderRadius:14,padding:"16px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
              <i className={`ti ${q.icon}`} style={{fontSize:24,color:TH.gold,flexShrink:0}}/>
              <span style={{fontSize:13,color:TH.text2}}>{q.label}</span>
            </div>
          ))}
        </div>

        {/* My Laws */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontSize:14,fontWeight:500,color:TH.text}}>
            <i className="ti ti-scale" style={{fontSize:16,color:TH.gold,marginRight:8,verticalAlign:"-2px"}}/>
            {lang==="ur"?"آپ کے قوانین":"Your Laws"} ({laws.length})
          </span>
          <span onClick={()=>onNav("laws")} style={{fontSize:12,color:TH.gold,cursor:"pointer"}}>
            {lang==="ur"?"سب دیکھیں":"See all"} <i className="ti ti-arrow-right" style={{fontSize:12,verticalAlign:"-1px"}}/>
          </span>
        </div>

        {laws.length===0 && (
          <div style={{textAlign:"center",padding:"30px",background:TH.bg,borderRadius:14,fontSize:13,color:TH.text3,border:`0.5px solid ${TH.border}`,marginBottom:14}}>
            No laws matched. Update your profile.
          </div>
        )}

        {laws.slice(0,5).map(law=>{
          const d=daysUntil(law.deadline);
          const urg=d!==null&&d<60;
          const catIcon={Tax:"ti-receipt-tax",Labour:"ti-moneybag","Food Safety":"ti-tools-kitchen-2",Licensing:"ti-license",Operations:"ti-clock",Medical:"ti-medical-cross"}[law.cat]||"ti-scale";
          return (
            <div key={law.id} onClick={()=>onLaw(law)} style={{background:TH.bg,border:urg?`1px solid ${TH.redBorder}`:`0.5px solid ${TH.border}`,borderRadius:14,padding:"14px 16px",marginBottom:10,display:"flex",gap:14,alignItems:"center",cursor:"pointer",boxShadow:urg?`0 0 0 3px ${TH.redFaint}`:"none"}}>
              <div style={{width:44,height:44,borderRadius:12,background:urg?TH.redFaint:TH.goldFaint,border:`1px solid ${urg?TH.redBorder:TH.border2}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <i className={`ti ${catIcon}`} style={{fontSize:22,color:urg?TH.red:TH.gold}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:500,color:urg?TH.text:TH.text2,marginBottom:3,lineHeight:1.3}}>
                  {lang==="ur"?law.titleUr:law.title}
                </div>
                <div style={{fontSize:11,color:TH.text3}}>{law.sub}</div>
                {urg && (
                  <div style={{fontSize:11,color:TH.red,marginTop:4,fontWeight:500}}>
                    <i className="ti ti-alert-triangle" style={{fontSize:11,marginRight:4,verticalAlign:"-1px"}}/>
                    {d>0?`${d} days left`:"Overdue"} · PKR {(law.penalty||0).toLocaleString()} fine
                  </div>
                )}
              </div>
              <i className="ti ti-chevron-right" style={{fontSize:18,color:TH.text3,flexShrink:0}}/>
            </div>
          );
        })}

        {laws.length>5 && (
          <div onClick={()=>onNav("laws")} style={{textAlign:"center",padding:"12px",fontSize:13,color:TH.gold,cursor:"pointer",border:`1px solid ${TH.border2}`,borderRadius:12,marginBottom:16}}>
            <i className="ti ti-plus" style={{fontSize:13,marginRight:5,verticalAlign:"-1px"}}/>
            {laws.length-5} more laws
          </div>
        )}

        {/* News */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"20px 0 12px"}}>
          <span style={{fontSize:14,fontWeight:500,color:TH.text}}>
            <i className="ti ti-news" style={{fontSize:16,color:TH.gold,marginRight:8,verticalAlign:"-2px"}}/>
            {lang==="ur"?"تازہ خبریں":"Latest News"}
          </span>
          <span onClick={()=>onNav("news")} style={{fontSize:12,color:TH.gold,cursor:"pointer"}}>
            {lang==="ur"?"خبریں":"News feed"} <i className="ti ti-arrow-right" style={{fontSize:12,verticalAlign:"-1px"}}/>
          </span>
        </div>
        <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>
          {news.slice(0,5).map(n=>(
            <div key={n.id} onClick={()=>onNews(n)} style={{flexShrink:0,width:180,borderRadius:14,overflow:"hidden",cursor:"pointer",border:`0.5px solid ${TH.border}`}}>
              <div style={{height:100,background:`url(${n.img}) center/cover`}}/>
              <div style={{padding:"10px 12px",background:TH.bg}}>
                <div style={{fontSize:9,background:TH.goldFaint,color:TH.gold,border:`0.5px solid ${TH.border2}`,borderRadius:5,padding:"2px 7px",display:"inline-block",marginBottom:5,fontWeight:500}}>{n.cat}</div>
                <div style={{fontSize:12,fontWeight:500,color:TH.text,lineHeight:1.4}}>{lang==="ur"?n.headlineUr:n.headline}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Kit */}
        <div onClick={()=>onNav("kit")} style={{marginTop:16,background:TH.bg,border:`1px solid ${TH.border2}`,borderRadius:14,padding:"16px",cursor:"pointer",display:"flex",gap:14,alignItems:"center"}}>
          <div style={{width:44,height:44,borderRadius:12,background:TH.goldFaint,border:`1px solid ${TH.border2}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <i className="ti ti-package" style={{fontSize:22,color:TH.gold}}/>
          </div>
          <div>
            <div style={{fontSize:14,fontWeight:500,color:TH.gold,marginBottom:3}}>Compliance Kit</div>
            <div style={{fontSize:12,color:TH.text2}}>All your letters in one place</div>
          </div>
          <i className="ti ti-arrow-right" style={{marginLeft:"auto",fontSize:18,color:TH.text3}}/>
        </div>
      </div>
    </div>
  );
}
/* ── LAW BOOK ─────────────────────────────────────────────── */
function LawBook({ biz, onSelect, lang, allLaws, onNav }) {
  const t = T[lang];
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [view, setView] = useState("mine");
  const myLaws = allLaws.filter(l=>matchLaw(l,biz));
  const source = view==="mine" ? myLaws : allLaws;
  const filtered = source.filter(l=>{
    const mCat = cat==="All" || l.cat===cat;
    const mSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || (l.summaryEn||"").toLowerCase().includes(search.toLowerCase());
    return mCat && mSearch;
  });
  const cats = ["All",...[...new Set(allLaws.map(l=>l.cat))]];
  const catIcon = {Tax:"ti-receipt-tax",Labour:"ti-moneybag","Food Safety":"ti-tools-kitchen-2",Licensing:"ti-license",Operations:"ti-clock",Medical:"ti-medical-cross"};

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:"#060606",direction:lang==="ur"?"rtl":"ltr"}}>
      <div style={{background:"#060606",padding:"16px 18px 14px",flexShrink:0,borderBottom:"0.5px solid #111"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:36,height:36,borderRadius:10,border:"0.5px solid rgba(201,168,76,.25)",background:"rgba(201,168,76,.08)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <i className="ti ti-scale" style={{fontSize:20,color:"#C9A84C"}}/>
          </div>
          <div>
            <div style={{fontSize:17,fontWeight:500,color:"#ffffff"}}>{t.lawBook}</div>
            <div style={{fontSize:9,color:"#333333"}}>{allLaws.length} laws · tap any to read</div>
          </div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:10}}>
          {[["mine",`${t.myLawsTab} (${myLaws.length})`],["all",`All (${allLaws.length})`]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{padding:"6px 14px",borderRadius:20,border:`0.5px solid ${view===v?"#C9A84C":"#1e1e1e"}`,background:view===v?"rgba(201,168,76,.1)":"transparent",color:view===v?"#C9A84C":"#333333",fontSize:10,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>{l}</button>
          ))}
        </div>
        <div style={{position:"relative"}}>
          <i className="ti ti-search" style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",fontSize:15,color:"#333333"}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search} style={{width:"100%",padding:"9px 12px 9px 33px",borderRadius:10,border:"0.5px solid #1a1a1a",background:"#0c0c0c",color:"#888888",fontSize:12,fontFamily:"inherit",outline:"none"}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:5,overflowX:"auto",padding:"10px 16px",background:"#0c0c0c",borderBottom:"0.5px solid #111",flexShrink:0}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{padding:"5px 12px",borderRadius:20,border:`0.5px solid ${cat===c?"#C9A84C":"#1e1e1e"}`,background:cat===c?"rgba(201,168,76,.1)":"transparent",color:cat===c?"#C9A84C":"#333333",fontSize:10,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",flexShrink:0}}>{c}</button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 16px 20px",background:"#0c0c0c"}}>
        {filtered.map(law=>{
          const d=daysUntil(law.deadline); const urg=d!==null&&d<60;
          const isMine=matchLaw(law,biz);
          const ci = catIcon[law.cat]||"ti-scale";
          return (
            <div key={law.id} onClick={()=>onSelect(law)} style={{background:"#0c0c0c",border:urg?`1px solid rgba(239,68,68,.45)`:"0.5px solid #161616",boxShadow:urg?"0 0 0 2px rgba(239,68,68,.07)":"none",borderRadius:12,padding:"12px 14px",marginBottom:8,cursor:"pointer",display:"flex",gap:11,alignItems:"center"}}>
              <div style={{width:36,height:36,borderRadius:10,background:urg?"rgba(239,68,68,.08)":"rgba(201,168,76,.08)",border:`0.5px solid ${urg?"rgba(239,68,68,.3)":"rgba(201,168,76,.25)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <i className={`ti ${ci}`} style={{fontSize:18,color:urg?"#ef4444":"#C9A84C"}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",gap:6,marginBottom:2}}>
                  <div style={{fontSize:12,fontWeight:500,color:isMine?"#ffffff":"#888888",lineHeight:1.3}}>{lang==="ur"?law.titleUr:law.title}</div>
                  {isMine && <span style={{fontSize:8,background:"rgba(201,168,76,.1)",color:"#C9A84C",border:"0.5px solid rgba(201,168,76,.2)",borderRadius:6,padding:"2px 6px",fontWeight:500,flexShrink:0,alignSelf:"flex-start"}}>{t.applies}</span>}
                </div>
                <div style={{fontSize:9,color:"#333333",marginBottom:urg?3:0}}>{law.sub}</div>
                {urg && <div style={{fontSize:9,color:"#ef4444",fontWeight:500}}><i className="ti ti-alert-triangle" style={{fontSize:9,verticalAlign:"-1px",marginRight:3}}/>{d>0?`${d} days`:"Overdue"} · PKR {(law.penalty||0).toLocaleString()} fine</div>}
              </div>
              <i className="ti ti-chevron-right" style={{fontSize:15,color:"#1c1c1c",flexShrink:0}}/>
            </div>
          );
        })}
        {filtered.length===0 && <div style={{textAlign:"center",padding:"40px 20px",color:"#333333"}}><i className="ti ti-search" style={{fontSize:32,display:"block",marginBottom:10,color:"#1e1e1e"}}/><div style={{fontSize:13}}>No laws found</div></div>}
      </div>
    </div>
  );
}

/* ── LAW DETAIL ───────────────────────────────────────────── */
function LawDetail({ law, biz, onBack, lang }) {
  const t = T[lang];
  const [tab, setTab] = useState("about");
  const [chks, setChks] = useState((law.steps||[]).map(()=>false));
  const [copied, setCopied] = useState(false);
  const done = chks.filter(Boolean).length;
  const total = (law.steps||[]).length;
  const d = daysUntil(law.deadline);
  const urg = d!==null&&d<60;
  const catIcon = {Tax:"ti-receipt-tax",Labour:"ti-moneybag","Food Safety":"ti-tools-kitchen-2",Licensing:"ti-license",Operations:"ti-clock",Medical:"ti-medical-cross"}[law.cat]||"ti-scale";

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:"#060606",direction:lang==="ur"?"rtl":"ltr"}}>
      {/* Header */}
      <div style={{background:"#060606",padding:"16px 18px 18px",borderBottom:"0.5px solid #111",flexShrink:0}}>
        <button onClick={onBack} style={{background:"transparent",border:"0.5px solid rgba(201,168,76,.25)",color:"#C9A84C",borderRadius:8,padding:"5px 12px",cursor:"pointer",fontSize:12,marginBottom:12,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
          <i className="ti ti-arrow-left" style={{fontSize:14}}/> {t.back}
        </button>
        <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{width:44,height:44,borderRadius:12,border:`0.5px solid ${urg?"rgba(239,68,68,.4)":"rgba(201,168,76,.25)"}`,background:urg?"rgba(239,68,68,.08)":"rgba(201,168,76,.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <i className={`ti ${catIcon}`} style={{fontSize:22,color:urg?"#ef4444":"#C9A84C"}}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:16,fontWeight:500,color:"#ffffff",lineHeight:1.3,marginBottom:6}}>{lang==="ur"?law.titleUr:law.title}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {law.penalty>0 && <span style={{fontSize:9,border:"0.5px solid rgba(239,68,68,.3)",color:"#ef4444",borderRadius:6,padding:"2px 8px",fontWeight:500}}>{t.penalty}: PKR {law.penalty.toLocaleString()}</span>}
              {law.deadline && <span style={{fontSize:9,border:"0.5px solid rgba(201,168,76,.25)",color:"#C9A84C",borderRadius:6,padding:"2px 8px"}}>{d>0?`${d} ${t.daysLeft}`:t.overdue}</span>}
            </div>
          </div>
        </div>
        {law.phone && <div style={{marginTop:10,background:"#0c0c0c",border:"0.5px solid #1a1a1a",borderRadius:8,padding:"7px 12px",fontSize:11,color:"#888888",display:"flex",alignItems:"center",gap:8}}>
          <i className="ti ti-phone" style={{fontSize:14,color:"#C9A84C"}}/>{law.phone}{law.url && <><i className="ti ti-world" style={{fontSize:14,color:"#C9A84C",marginLeft:8}}/>{law.url}</>}
        </div>}
        <div style={{marginTop:8,background:"rgba(201,168,76,.08)",border:"0.5px solid rgba(201,168,76,.15)",borderRadius:8,padding:"6px 12px",fontSize:10,color:"rgba(201,168,76,.6)"}}>
          <i className="ti ti-info-circle" style={{fontSize:11,verticalAlign:"-1px",marginRight:5}}/>{lang==="ur"?"ہمیشہ اپنے اکاؤنٹنٹ سے تصدیق کریں۔ قوانین بدل سکتے ہیں۔":"Always verify with your accountant. Laws change — Verifill shows best available information."}
        </div>
      </div>
      {/* Tabs */}
      <div style={{display:"flex",background:"#0c0c0c",borderBottom:"0.5px solid #111",flexShrink:0}}>
        {[["about",t.about,"ti-info-circle"],["steps",t.steps,"ti-list-check"],["letter",t.letter,"ti-file-text"]].map(([id,lbl,ic])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"12px 4px",border:"none",borderBottom:`2px solid ${tab===id?"#C9A84C":"transparent"}`,background:"transparent",color:tab===id?"#C9A84C":"#333333",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
            <i className={`ti ${ic}`} style={{fontSize:14}}/>{lbl}
          </button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 30px",background:"#0c0c0c"}}>
        {tab==="about" && (
          <div>
            <div style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:12,padding:14,marginBottom:14,fontSize:13,color:"#888888",lineHeight:1.8}}>{lang==="ur"?law.summaryUr:law.summaryEn}</div>
            {matchLaw(law,biz) && (
              <div style={{background:"rgba(201,168,76,.08)",border:"0.5px solid rgba(201,168,76,.15)",borderRadius:12,padding:"12px 14px"}}>
                <div style={{fontSize:11,fontWeight:500,color:"#C9A84C",marginBottom:8}}>
                  <i className="ti ti-check" style={{fontSize:12,marginRight:5}}/>{t.whyApplies}
                </div>
                {["Business type matches",law.provinces.includes("All")?"Federal — applies nationwide":`${biz.province} is in scope`,biz.revM>=(law.minRevM||0)?"Revenue threshold met":null,biz.emp>=(law.minEmp||1)?"Employee count qualifies":null].filter(Boolean).map((r,i)=>(
                  <div key={i} style={{fontSize:11,color:"#888888",padding:"5px 0",borderBottom:"0.5px solid #111",display:"flex",gap:8,alignItems:"center"}}>
                    <i className="ti ti-circle-check" style={{fontSize:13,color:"#C9A84C",flexShrink:0}}/>{r}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab==="steps" && (
          <div>
            <div style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:12,padding:12,marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:11,fontWeight:500,color:"#C9A84C"}}>{done} / {total} {t.done}</span>
                <span style={{fontSize:11,color:"#333333"}}>{total?Math.round((done/total)*100):0}%</span>
              </div>
              <div style={{height:4,background:"#1e1e1e",borderRadius:2,overflow:"hidden"}}>
                <div style={{width:`${total?(done/total)*100:0}%`,height:"100%",background:"#C9A84C",borderRadius:2,transition:"width .3s"}}/>
              </div>
            </div>
            {(law.steps||[]).map((step,i)=>(
              <div key={i} onClick={()=>setChks(c=>{const n=[...c];n[i]=!n[i];return n;})} style={{display:"flex",gap:12,padding:"13px 14px",borderBottom:"0.5px solid #111",cursor:"pointer",background:chks[i]?"rgba(201,168,76,.04)":"transparent",borderRadius:i===0?"12px 12px 0 0":i===(law.steps.length-1)?"0 0 12px 12px":"0",border:"0.5px solid #111",marginBottom:i<(law.steps.length-1)?1:0}}>
                <div style={{width:22,height:22,borderRadius:6,border:`1px solid ${chks[i]?"#C9A84C":"#1e1e1e"}`,background:chks[i]?"#C9A84C":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                  {chks[i] && <i className="ti ti-check" style={{fontSize:12,color:"#000"}}/>}
                </div>
                <span style={{flex:1,fontSize:12,color:chks[i]?"#333333":"#888888",textDecoration:chks[i]?"line-through":"none",lineHeight:1.6}}>{step}</span>
              </div>
            ))}
          </div>
        )}
        {tab==="letter" && law.letter && (
          <div>
            <div style={{background:"rgba(201,168,76,.08)",border:"0.5px solid rgba(201,168,76,.15)",borderRadius:10,padding:12,marginBottom:12,fontSize:11,color:"rgba(201,168,76,.7)"}}>
              <i className="ti ti-bulb" style={{fontSize:12,marginRight:5,verticalAlign:"-1px"}}/>Pre-filled with your profile. Replace [BRACKETS].
            </div>
            <div style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:12,padding:16,marginBottom:12,fontSize:12,color:"#888888",lineHeight:1.9,whiteSpace:"pre-wrap",fontFamily:"'DM Mono',monospace"}}>{law.letter(biz)}</div>
            <button onClick={()=>{navigator.clipboard.writeText(law.letter(biz));setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:copied?"#1e1e1e":"linear-gradient(135deg,#C9A84C,#B8922A)",color:copied?"#C9A84C":"#000",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <i className={`ti ${copied?"ti-check":"ti-copy"}`} style={{fontSize:16}}/>{copied?t.copied:t.copy}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── NEWS FEED ────────────────────────────────────────────── */
function NewsFeed({ biz, onSelect, lang }) {
  const [filter, setFilter] = useState("all");
  const applicable = NEWS.filter(n=>matchNews(n,biz));
  const notAppl = NEWS.filter(n=>!matchNews(n,biz));
  const cats = ["all",...[...new Set(NEWS.map(n=>n.cat))]];
  const shown = filter==="all" ? applicable : applicable.filter(n=>n.cat===filter);
  return (
    <div style={{height:"100vh",overflowY:"auto",fontFamily:"inherit",background:"#060606",direction:lang==="ur"?"rtl":"ltr"}}>
      <div style={{background:"#060606",padding:"16px 18px 0",position:"sticky",top:0,zIndex:20,borderBottom:"0.5px solid #111"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <i className="ti ti-news" style={{fontSize:22,color:"#C9A84C"}}/>
            <div style={{fontSize:17,fontWeight:500,color:"#ffffff"}}>News Feed</div>
          </div>
          <div style={{fontSize:9,color:"#333333",border:"0.5px solid #1a1a1a",borderRadius:6,padding:"3px 8px"}}>🇵🇰 Pakistan</div>
        </div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:12}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setFilter(c)} style={{padding:"5px 13px",borderRadius:20,border:`0.5px solid ${filter===c?"#C9A84C":"#1e1e1e"}`,background:filter===c?"rgba(201,168,76,.1)":"transparent",color:filter===c?"#C9A84C":"#333333",fontSize:10,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",flexShrink:0}}>
              {c==="all"?(lang==="ur"?"سب":"All"):c}
            </button>
          ))}
        </div>
      </div>
      <div style={{paddingBottom:80}}>
        {shown.map(n=><NewsCard key={n.id} n={n} biz={biz} onClick={()=>onSelect(n)} lang={lang}/>)}
        {notAppl.length>0 && <>
          <div style={{padding:"12px 18px",fontSize:9,color:"#1e1e1e",fontWeight:500,textTransform:"uppercase",letterSpacing:".1em"}}>Not affecting your business</div>
          {notAppl.map(n=>(
            <div key={n.id} style={{background:"#0a0a0a",margin:"0 0 1px",padding:"12px 16px",display:"flex",gap:12,alignItems:"center",opacity:.35}}>
              <div style={{width:44,height:44,borderRadius:8,background:`url(${n.img}) center/cover`,flexShrink:0}}/>
              <div>
                <div style={{fontSize:11,fontWeight:500,color:"#ffffff",marginBottom:1}}>{lang==="ur"?n.headlineUr:n.headline}</div>
                <div style={{fontSize:9,color:"#333333"}}>{n.source}</div>
              </div>
            </div>
          ))}
        </>}
      </div>
    </div>
  );
}

function NewsCard({ n, biz, onClick, lang }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(n.likes);
  return (
    <div style={{background:"#060606",marginBottom:1,borderBottom:"0.5px solid #111"}}>
      <div style={{padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(201,168,76,.08)",border:"0.5px solid rgba(201,168,76,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <i className="ti ti-news" style={{fontSize:16,color:"#C9A84C"}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:12,fontWeight:500,color:"#888888"}}>{n.source}</div>
          <div style={{fontSize:9,color:"#333333"}}>{n.h}h ago · Pakistan</div>
        </div>
        <div style={{fontSize:8,background:"rgba(201,168,76,.08)",color:"#C9A84C",border:"0.5px solid rgba(201,168,76,.2)",padding:"2px 8px",borderRadius:6,fontWeight:500}}>{n.cat}</div>
      </div>
      <div onClick={onClick} style={{width:"100%",aspectRatio:"16/9",background:`url(${n.img}) center/cover`,cursor:"pointer",position:"relative"}}>
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.9)",padding:"24px 16px 14px"}}>
          <div style={{fontSize:16,fontWeight:500,color:"#ffffff",lineHeight:1.35}}>{lang==="ur"?n.headlineUr:n.headline}</div>
        </div>
      </div>
      <div style={{padding:"10px 16px 4px",display:"flex",gap:14,alignItems:"center"}}>
        <button onClick={e=>{e.stopPropagation();setLiked(l=>!l);setLikes(l=>liked?l-1:l+1);}} style={{background:"none",border:"none",cursor:"pointer",padding:0,color:liked?"#C9A84C":"#333333"}}>
          <i className={`ti ${liked?"ti-heart-filled":"ti-heart"}`} style={{fontSize:22}}/>
        </button>
        <button onClick={onClick} style={{background:"none",border:"none",cursor:"pointer",padding:0,color:"#333333"}}>
          <i className="ti ti-message-circle" style={{fontSize:22}}/>
        </button>
        <button style={{background:"none",border:"none",cursor:"pointer",padding:0,color:"#333333"}}>
          <i className="ti ti-share" style={{fontSize:22}}/>
        </button>
      </div>
      <div style={{padding:"2px 16px 8px",fontSize:11,fontWeight:500,color:"#888888"}}>{likes.toLocaleString()} interested</div>
      <div style={{padding:"0 16px",display:"flex",gap:6,marginBottom:10}}>
        {n.stats.map((s,i)=>(
          <div key={i} style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:8,padding:"6px 8px",flex:1,textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:500,color:"#C9A84C"}}>{s.n}</div>
            <div style={{fontSize:8,color:"#333333",marginTop:1}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div onClick={onClick} style={{margin:"0 16px 14px",background:"#0c0c0c",border:"0.5px solid rgba(201,168,76,.15)",borderRadius:10,padding:"10px 13px",cursor:"pointer"}}>
        <div style={{fontSize:8,color:"#333333",textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>What to do — {biz.name}</div>
        <div style={{fontSize:11,color:"#888888",lineHeight:1.6}}>{lang==="ur"?n.actionUr:n.action}</div>
        <div style={{fontSize:9,color:"#C9A84C",marginTop:5,fontWeight:500}}>Read full article <i className="ti ti-arrow-right" style={{fontSize:9,verticalAlign:"-1px"}}/></div>
      </div>
    </div>
  );
}

/* ── NEWS DETAIL ──────────────────────────────────────────── */
function NewsDetail({ news: n, biz, onBack, lang }) {
  return (
    <div style={{height:"100vh",overflowY:"auto",fontFamily:"inherit",background:"#060606",direction:lang==="ur"?"rtl":"ltr"}}>
      <div style={{height:240,background:`url(${n.img}) center/cover`,position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 30%,#060606)"}}/>
        <button onClick={onBack} style={{position:"absolute",top:16,left:16,background:"rgba(0,0,0,.6)",border:"0.5px solid rgba(201,168,76,.3)",color:"#C9A84C",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:12,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
          <i className="ti ti-arrow-left" style={{fontSize:14}}/> Back
        </button>
        <div style={{position:"absolute",bottom:16,left:18,right:18}}>
          <div style={{fontSize:8,background:"rgba(201,168,76,.25)",color:"#C9A84C",border:"0.5px solid rgba(201,168,76,.3)",borderRadius:6,padding:"2px 8px",display:"inline-block",marginBottom:8,fontWeight:500}}>{n.cat}</div>
          <div style={{fontSize:18,fontWeight:500,color:"#ffffff",lineHeight:1.35}}>{lang==="ur"?n.headlineUr:n.headline}</div>
          <div style={{fontSize:10,color:"#888888",marginTop:5}}>{n.source} · {n.h}h ago</div>
        </div>
      </div>
      <div style={{padding:"16px 18px 100px"}}>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${n.stats.length},1fr)`,gap:8,marginBottom:16}}>
          {n.stats.map((s,i)=>(
            <div key={i} style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:10,padding:"11px",textAlign:"center"}}>
              <div style={{fontSize:17,fontWeight:500,color:"#C9A84C"}}>{s.n}</div>
              <div style={{fontSize:9,color:"#333333",marginTop:3}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:13,color:"#888888",lineHeight:1.8,marginBottom:16}}>{lang==="ur"?n.captionUr:n.caption}</div>
        <div style={{background:"rgba(201,168,76,.08)",border:"0.5px solid rgba(201,168,76,.2)",borderRadius:12,padding:"14px"}}>
          <div style={{fontSize:11,fontWeight:500,color:"#C9A84C",marginBottom:7}}>
            <i className="ti ti-circle-check" style={{fontSize:13,marginRight:5,verticalAlign:"-1px"}}/>Action for {biz.name}
          </div>
          <div style={{fontSize:13,color:"#888888",lineHeight:1.75}}>{lang==="ur"?n.actionUr:n.action}</div>
        </div>
      </div>
    </div>
  );
}

/* ── COMPLIANCE CALENDAR ──────────────────────────────────── */
function ComplianceCalendar({ laws, lang, onNav }) {
  const t = T[lang];
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const deadlines = laws.filter(l=>l.deadline).map(l=>{const d=new Date(l.deadline);return{...l,date:d,day:d.getDate(),month:d.getMonth(),year:d.getFullYear()};});
  const thisMonth = deadlines.filter(d=>d.month===month&&d.year===year);
  const daysInMonth = new Date(year,month+1,0).getDate();
  const firstDay = new Date(year,month,1).getDay();
  const gcalLink = l=>{const d=new Date(l.deadline);const f=dt=>dt.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";return`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(l.title)}&dates=${f(d)}/${f(d)}`;};

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:"#060606",direction:lang==="ur"?"rtl":"ltr"}}>
      <PageHeader title={t.calTitle} sub={t.calSub} icon="ti-calendar-event" onBack={()=>onNav("dash")}/>
      <div style={{background:"#0c0c0c",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"0.5px solid #111",flexShrink:0}}>
        <button onClick={()=>{if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1);}} style={{background:"#0c0c0c",border:"0.5px solid #1a1a1a",color:"#C9A84C",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>‹</button>
        <span style={{fontSize:14,fontWeight:500,color:"#ffffff"}}>{MONTHS[month]} {year}</span>
        <button onClick={()=>{if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1);}} style={{background:"#0c0c0c",border:"0.5px solid #1a1a1a",color:"#C9A84C",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>›</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 16px 80px",background:"#0c0c0c"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:16}}>
          {["S","M","T","W","T","F","S"].map((d,i)=><div key={i} style={{textAlign:"center",fontSize:9,fontWeight:500,color:"#1e1e1e",padding:"4px 0"}}>{d}</div>)}
          {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
          {Array.from({length:daysInMonth}).map((_,i)=>{
            const day=i+1;
            const hasDeadline=thisMonth.some(d=>d.day===day);
            const isToday=day===now.getDate()&&month===now.getMonth()&&year===now.getFullYear();
            return (
              <div key={day} style={{textAlign:"center",padding:"7px 2px",borderRadius:8,background:hasDeadline?"rgba(239,68,68,.1)":isToday?"rgba(201,168,76,.1)":"transparent",border:hasDeadline?"0.5px solid rgba(239,68,68,.3)":isToday?"0.5px solid rgba(201,168,76,.3)":"none"}}>
                <span style={{fontSize:11,fontWeight:isToday||hasDeadline?500:400,color:hasDeadline?"#ef4444":isToday?"#C9A84C":"#333333"}}>{day}</span>
                {hasDeadline&&<div style={{width:4,height:4,borderRadius:"50%",background:"#ef4444",margin:"2px auto 0"}}/>}
              </div>
            );
          })}
        </div>
        <div style={{fontSize:9,fontWeight:500,color:"#333333",marginBottom:10,textTransform:"uppercase",letterSpacing:".1em"}}>{deadlines.length===0?t.noDeadlines:`${deadlines.length} deadlines`}</div>
        {deadlines.sort((a,b)=>a.date-b.date).map(law=>{
          const d=daysUntil(law.deadline);
          const passed=d!==null&&d<0; const near=d!==null&&d>=0&&d<=14;
          return (
            <div key={law.id} style={{background:"#0c0c0c",border:passed||near?`1px solid ${passed?"rgba(239,68,68,.4)":"rgba(201,168,76,.25)"}`:"0.5px solid #161616",borderRadius:12,padding:"13px 14px",marginBottom:8,display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:36,height:36,borderRadius:10,background:passed?"rgba(239,68,68,.08)":near?"rgba(201,168,76,.08)":"#111111",border:`0.5px solid ${passed?"rgba(239,68,68,.3)":near?"rgba(201,168,76,.25)":"#1e1e1e"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <i className="ti ti-calendar-event" style={{fontSize:18,color:passed?"#ef4444":near?"#C9A84C":"#333333"}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:500,color:"#888888",marginBottom:2}}>{lang==="ur"?law.titleUr:law.title}</div>
                <div style={{fontSize:9,color:"#333333"}}>{new Date(law.deadline).toLocaleDateString("en-PK",{day:"numeric",month:"long",year:"numeric"})}</div>
                <div style={{fontSize:9,fontWeight:500,color:passed?"#ef4444":near?"#C9A84C":"#333333",marginTop:2}}>
                  {passed?"Overdue":d===0?"Today!!!":`${d} days left`}
                </div>
              </div>
              <a href={gcalLink(law)} target="_blank" rel="noreferrer" style={{fontSize:9,background:"rgba(201,168,76,.08)",color:"#C9A84C",border:"0.5px solid rgba(201,168,76,.2)",borderRadius:7,padding:"4px 9px",textDecoration:"none",fontWeight:500,flexShrink:0,display:"flex",alignItems:"center",gap:4}}>
                <i className="ti ti-brand-google" style={{fontSize:11}}/>Google
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── FINE CALCULATOR ──────────────────────────────────────── */
function FineCalculator({ laws, lang, onNav }) {
  const t = T[lang];
  const [selId, setSelId] = useState("");
  const [days, setDays] = useState(0);
  const [history, setHistory] = useState([]);
  const lawsWithPenalty = laws.filter(l=>l.penalty>0);
  const sel = lawsWithPenalty.find(l=>l.id===selId);
  const fine = sel ? Math.round(sel.penalty + (sel.penaltyPerDay||0)*days) : 0;
  const calc = () => { if(sel&&days>0) setHistory(h=>[{law:lang==="ur"?sel.titleUr:sel.title,days,fine,date:new Date().toLocaleDateString()},...h.slice(0,4)]); };

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:"#060606",direction:lang==="ur"?"rtl":"ltr"}}>
      <PageHeader title={t.fineTitle} sub={t.fineSub} icon="ti-calculator" onBack={()=>onNav("dash")}/>
      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 80px",background:"#0c0c0c"}}>
        <div style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:14,padding:18,marginBottom:14}}>
          <label style={{fontSize:10,fontWeight:500,color:"#333333",display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".08em"}}>{t.selectLaw}</label>
          <select value={selId} onChange={e=>setSelId(e.target.value)} style={{width:"100%",padding:"11px 13px",borderRadius:10,border:"0.5px solid #1a1a1a",background:"#111111",color:"#888888",fontSize:12,fontFamily:"inherit",outline:"none",appearance:"none",marginBottom:14}}>
            <option value="">{lang==="ur"?"قانون منتخب کریں…":"Select a law…"}</option>
            {lawsWithPenalty.map(l=><option key={l.id} value={l.id}>{lang==="ur"?l.titleUr:l.title}</option>)}
          </select>
          <label style={{fontSize:10,fontWeight:500,color:"#333333",display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".08em"}}>{t.daysOverdue}</label>
          <input type="number" min="0" max="1825" value={days} onChange={e=>setDays(Math.max(0,parseInt(e.target.value)||0))} style={{width:"100%",padding:"11px 13px",borderRadius:10,border:"0.5px solid #1a1a1a",background:"#111111",color:"#ffffff",fontSize:12,fontFamily:"inherit",outline:"none",marginBottom:14}}/>
          <button onClick={calc} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#C9A84C,#B8922A)",color:"#000",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <i className="ti ti-calculator" style={{fontSize:16}}/>{lang==="ur"?"جرمانہ حساب کریں":"Calculate Fine"}
          </button>
        </div>
        {sel && days>0 && (
          <div style={{background:"#0c0c0c",border:`1px solid ${fine>100000?"rgba(239,68,68,.4)":"rgba(201,168,76,.3)"}`,borderRadius:14,padding:"20px 18px",marginBottom:14,textAlign:"center"}}>
            <div style={{fontSize:10,color:"#333333",marginBottom:8,textTransform:"uppercase",letterSpacing:".1em"}}>{t.yourFine}</div>
            <div style={{fontSize:36,fontWeight:500,color:fine>100000?"#ef4444":"#C9A84C",letterSpacing:"-1px"}}>PKR {fine.toLocaleString()}</div>
            <div style={{fontSize:10,color:"#333333",marginTop:6}}>{lang==="ur"?sel.titleUr:sel.title} · {days} days overdue</div>
            {sel.penaltyPerDay>0 && <div style={{fontSize:9,color:"#1e1e1e",marginTop:4}}>Daily penalty: PKR {sel.penaltyPerDay.toLocaleString()}</div>}
          </div>
        )}
        {sel && days===0 && <div style={{background:"rgba(201,168,76,.08)",border:"0.5px solid rgba(201,168,76,.15)",borderRadius:12,padding:16,textAlign:"center",fontSize:12,color:"#C9A84C"}}><i className="ti ti-circle-check" style={{fontSize:18,display:"block",marginBottom:6}}/>{t.notOverdue}</div>}
        {history.length>0 && (
          <div>
            <div style={{fontSize:9,fontWeight:500,color:"#333333",marginBottom:8,marginTop:10,textTransform:"uppercase",letterSpacing:".1em"}}>Recent calculations</div>
            {history.map((h,i)=>(
              <div key={i} style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:11,padding:"11px 14px",marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,fontWeight:500,color:"#888888"}}>{h.law}</div>
                  <div style={{fontSize:9,color:"#333333"}}>{h.days} days · {h.date}</div>
                </div>
                <div style={{fontSize:14,fontWeight:500,color:"#ef4444"}}>PKR {h.fine.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── DOCUMENT SCANNER ─────────────────────────────────────── */
function DocScanner({ lang, onNav }) {
  const t = T[lang];
  const [state, setState] = useState("idle");
  const [result, setResult] = useState(null);
  const [docs, setDocs] = useState([]);
  const fileRef = useRef();

  const handleFile = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setState("scanning");
    try {
      const base64 = await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result.split(",")[1]);r.onerror=reject;r.readAsDataURL(file);});
      const mediaType = file.type||"image/jpeg";
      const response = await fetch("/api/scan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({imageBase64:base64,mediaType})});
      const json = await response.json();
      if(!json.success) throw new Error(json.error||"Scan failed");
      const ex = json.data;
      let daysLeft=null,expDate=null;
      if(ex.expiry_date){const exp=new Date(ex.expiry_date);daysLeft=Math.ceil((exp-new Date())/86400000);expDate=exp.toLocaleDateString("en-PK",{day:"numeric",month:"long",year:"numeric"});}
      const r={name:file.name,docType:ex.doc_type||"Document",bizName:ex.business_name||"",authority:ex.issuing_authority||"",licenceNo:ex.licence_number||"",city:ex.city||"",expDate:expDate||"Not found",daysLeft,isExpired:ex.is_expired||false,scanned:new Date().toLocaleDateString()};
      setResult(r);setDocs(d=>[r,...d.slice(0,4)]);setState("done");
    } catch(err){
      setResult({name:file.name,docType:"Error",expDate:"Could not read — try a clearer photo",daysLeft:null,isExpired:false,scanned:new Date().toLocaleDateString()});
      setState("done");
    }
  };

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:"#060606",direction:lang==="ur"?"rtl":"ltr"}}>
      <PageHeader title={t.scanTitle} sub="Claude AI reads your licence automatically" icon="ti-scan" onBack={()=>onNav("dash")}/>
      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 80px",background:"#0c0c0c"}}>
        <div onClick={()=>fileRef.current?.click()} style={{background:"#0c0c0c",border:"1px dashed #1a1a1a",borderRadius:14,padding:"32px 20px",textAlign:"center",marginBottom:16,cursor:"pointer"}}>
          <i className="ti ti-cloud-upload" style={{fontSize:44,color:"#1e1e1e",display:"block",marginBottom:12}}/>
          <div style={{fontSize:14,fontWeight:500,color:"#888888",marginBottom:6}}>{t.upload}</div>
          <div style={{fontSize:11,color:"#333333",marginBottom:4}}>Trade Licence · PFA · NTN · EOBI · Any govt doc</div>
          <div style={{fontSize:10,color:"#1e1e1e"}}>Claude AI extracts the expiry date</div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:"none"}}/>
        </div>
        {state==="scanning" && (
          <div style={{background:"#0c0c0c",border:"0.5px solid rgba(201,168,76,.2)",borderRadius:12,padding:24,textAlign:"center"}}>
            <div style={{width:40,height:40,border:"2px solid #1a1a1a",borderTopColor:"#C9A84C",borderRadius:"50%",animation:"spin .7s linear infinite",margin:"0 auto 14px"}}/>
            <div style={{fontSize:14,fontWeight:500,color:"#C9A84C",marginBottom:4}}>Claude AI is reading your document…</div>
            <div style={{fontSize:11,color:"#333333"}}>Extracting licence type, expiry date, and authority</div>
          </div>
        )}
        {state==="done" && result && (
          <div style={{marginBottom:14}}>
            <div style={{background:"#0c0c0c",border:`1px solid ${result.isExpired?"rgba(239,68,68,.4)":result.daysLeft!==null&&result.daysLeft<30?"rgba(201,168,76,.3)":"rgba(201,168,76,.25)"}`,borderRadius:14,padding:18,marginBottom:10}}>
              <div style={{fontSize:13,fontWeight:500,color:result.isExpired?"#ef4444":result.daysLeft!==null&&result.daysLeft<30?"#C9A84C":"#C9A84C",marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
                <i className={`ti ${result.isExpired?"ti-alert-circle":"ti-circle-check"}`} style={{fontSize:16}}/>
                {result.isExpired?"EXPIRED — Renew immediately":result.daysLeft!==null&&result.daysLeft<30?"Expiring soon":"Valid document"}
              </div>
              {[["Document type",result.docType],["Business name",result.bizName],["Issued by",result.authority],["Licence number",result.licenceNo],["City",result.city],["Expiry date",result.expDate],[result.daysLeft!==null?"Days remaining":null,result.daysLeft!==null?(result.daysLeft>0?`${result.daysLeft} days`:`Expired ${Math.abs(result.daysLeft)} days ago`):null]].filter(([k,v])=>k&&v).map(([k,v],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"0.5px solid #111",fontSize:12}}>
                  <span style={{color:"#333333"}}>{k}</span>
                  <span style={{color:"#888888",fontWeight:500,textAlign:"right",maxWidth:"60%"}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize:10,color:"#1e1e1e",textAlign:"center"}}>
              <i className="ti ti-info-circle" style={{fontSize:10,marginRight:4,verticalAlign:"-1px"}}/>Always verify with the original document.
            </div>
          </div>
        )}
        {docs.length>0 && (
          <div>
            <div style={{fontSize:9,fontWeight:500,color:"#333333",marginBottom:8,textTransform:"uppercase",letterSpacing:".1em"}}>
              <i className="ti ti-files" style={{fontSize:11,color:"#C9A84C",marginRight:5,verticalAlign:"-1px"}}/>Scanned documents
            </div>
            {docs.map((d,i)=>(
              <div key={i} style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:11,padding:"11px 13px",marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,fontWeight:500,color:"#888888"}}>{d.docType||d.name}</div>
                  <div style={{fontSize:9,color:"#333333"}}>Expires: {d.expDate} · {d.scanned}</div>
                </div>
                <div style={{fontSize:10,fontWeight:500,color:d.isExpired?"#ef4444":d.daysLeft!==null&&d.daysLeft<30?"#C9A84C":"#888888"}}>
                  {d.isExpired?"Expired":d.daysLeft!==null?`${d.daysLeft}d`:"—"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── FIND CA ──────────────────────────────────────────────── */
function FindCA({ biz, lang, onNav }) {
  const t = T[lang];
  const nearby = CA_LISTINGS.filter(ca=>ca.city===biz.city).concat(CA_LISTINGS.filter(ca=>ca.city!==biz.city)).slice(0,6);
  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:"#060606",direction:lang==="ur"?"rtl":"ltr"}}>
      <PageHeader title={t.caTitle} sub={`${t.caSub} · ${biz.city}`} icon="ti-user-check" onBack={()=>onNav("dash")}/>
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px 80px",background:"#0c0c0c"}}>
        <div style={{background:"rgba(201,168,76,.08)",border:"0.5px solid rgba(201,168,76,.15)",borderRadius:10,padding:"10px 13px",marginBottom:14,fontSize:11,color:"rgba(201,168,76,.7)"}}>
          <i className="ti ti-info-circle" style={{fontSize:12,marginRight:5,verticalAlign:"-1px"}}/>Confirm fees before engaging. City-matched shown first.
        </div>
        {nearby.map((ca,i)=>(
          <div key={i} style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:14,padding:"15px 16px",marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(201,168,76,.08)",border:"0.5px solid rgba(201,168,76,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <i className="ti ti-user-tie" style={{fontSize:19,color:"#C9A84C"}}/>
                </div>
                <div>
                  <div style={{fontSize:12,fontWeight:500,color:"#888888",marginBottom:1}}>{ca.name}</div>
                  <div style={{fontSize:9,color:"#333333"}}>{ca.area}, {ca.city}</div>
                </div>
              </div>
              <span style={{fontSize:8,background:"rgba(201,168,76,.08)",color:"#C9A84C",border:"0.5px solid rgba(201,168,76,.2)",borderRadius:6,padding:"2px 7px",fontWeight:500}}>Verified</span>
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
              <span style={{fontSize:9,background:"#111111",color:"#888888",border:"0.5px solid #1a1a1a",borderRadius:6,padding:"2px 8px"}}>{ca.speciality}</span>
              <span style={{fontSize:9,background:"#111111",color:"#888888",border:"0.5px solid #1a1a1a",borderRadius:6,padding:"2px 8px"}}>{ca.fee}</span>
              <span style={{fontSize:9,background:"#111111",color:"#888888",border:"0.5px solid #1a1a1a",borderRadius:6,padding:"2px 8px"}}>⭐ {ca.rating} ({ca.reviews})</span>
            </div>
            <a href={`tel:${ca.phone}`} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,textAlign:"center",background:"linear-gradient(135deg,#C9A84C,#B8922A)",color:"#000",borderRadius:10,padding:"10px",fontSize:12,fontWeight:600,textDecoration:"none"}}>
              <i className="ti ti-phone" style={{fontSize:15}}/>{ca.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── COMPLIANCE KIT ───────────────────────────────────────── */
function ComplianceKit({ laws, biz, lang, onNav }) {
  const t = T[lang];
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const lawsWithLetters = laws.filter(l=>l.letter);
  const kit = lawsWithLetters.map(l=>`════════════════════\n${lang==="ur"?l.titleUr:l.title}\n════════════════════\n\n${l.letter(biz)}\n\n`).join("\n");

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:"#060606",direction:lang==="ur"?"rtl":"ltr"}}>
      <PageHeader title={t.kitTitle} sub={t.kitSub} icon="ti-package" onBack={()=>onNav("dash")}/>
      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 80px",background:"#0c0c0c"}}>
        {!generated ? (
          <div>
            <div style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:14,padding:18,marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:500,color:"#333333",marginBottom:12,textTransform:"uppercase",letterSpacing:".1em"}}>This kit includes</div>
              {lawsWithLetters.map((l,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"center",padding:"9px 0",borderBottom:i<lawsWithLetters.length-1?"0.5px solid #111":"none"}}>
                  <div style={{width:30,height:30,borderRadius:8,background:"rgba(201,168,76,.08)",border:"0.5px solid rgba(201,168,76,.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <i className="ti ti-file-text" style={{fontSize:15,color:"#C9A84C"}}/>
                  </div>
                  <div>
                    <div style={{fontSize:11,fontWeight:500,color:"#888888"}}>{lang==="ur"?l.titleUr:l.title}</div>
                    <div style={{fontSize:9,color:"#333333"}}>Pre-filled compliance letter</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={()=>setGenerated(true)} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#C9A84C,#B8922A)",color:"#000",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <i className="ti ti-package" style={{fontSize:16}}/>{t.generate}
            </button>
          </div>
        ) : (
          <div>
            <div style={{background:"rgba(201,168,76,.08)",border:"0.5px solid rgba(201,168,76,.2)",borderRadius:12,padding:14,marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
              <i className="ti ti-circle-check" style={{fontSize:24,color:"#C9A84C"}}/>
              <div>
                <div style={{fontSize:12,fontWeight:500,color:"#C9A84C"}}>{t.kitReady}</div>
                <div style={{fontSize:10,color:"#333333"}}>{lawsWithLetters.length} letters · {biz.name}</div>
              </div>
            </div>
            <button onClick={()=>{navigator.clipboard.writeText(kit);setCopied(true);setTimeout(()=>setCopied(false),2500);}} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:copied?"#1e1e1e":"linear-gradient(135deg,#C9A84C,#B8922A)",color:copied?"#C9A84C":"#000",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <i className={`ti ${copied?"ti-check":"ti-copy"}`} style={{fontSize:16}}/>{copied?`${lang==="ur"?"کاپی ہو گئی!":"Copied!"}`:t.copyAll}
            </button>
            <div style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:12,padding:"14px 16px",maxHeight:300,overflowY:"auto"}}>
              <pre style={{fontSize:10,color:"#888888",lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"'DM Mono',monospace",margin:0}}>{kit}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── PROFILE ──────────────────────────────────────────────── */
function ProfileScreen({ biz, onUpdate, lang }) {
  const t = T[lang];
  const [d, setD] = useState({...biz});
  const [saved, setSaved] = useState(false);
  const upd = (k,v) => setD(p=>({...p,[k]:v}));
  const toggleLic = l => setD(p=>({...p,licences:p.licences.includes(l)?p.licences.filter(x=>x!==l):[...p.licences,l]}));
  const save = () => {
    onUpdate({...d,typeLabel:bl(d.type,"en"),revLabel:REV_BANDS.find(b=>b.v===d.revM)?.l||"",empLabel:EMP_BANDS.find(b=>b.v===d.emp)?.l||""});
    setSaved(true);setTimeout(()=>setSaved(false),2200);
  };
  const inp = {width:"100%",padding:"11px 13px",borderRadius:10,border:"0.5px solid #1a1a1a",background:"#0c0c0c",color:"#888888",fontSize:12,fontFamily:"inherit",outline:"none",marginBottom:12};
  const sel = {...inp,appearance:"none",cursor:"pointer"};

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:"#060606",direction:lang==="ur"?"rtl":"ltr"}}>
      <div style={{background:"#060606",padding:"16px 18px 18px",borderBottom:"0.5px solid #111",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:38,height:38,borderRadius:10,border:"0.5px solid rgba(201,168,76,.25)",background:"rgba(201,168,76,.08)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <i className="ti ti-user" style={{fontSize:20,color:"#C9A84C"}}/>
          </div>
          <div>
            <div style={{fontSize:17,fontWeight:500,color:"#ffffff"}}>Business Profile</div>
            <div style={{fontSize:9,color:"#333333"}}>Update to re-filter all laws</div>
          </div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px 100px",background:"#0c0c0c"}}>
        {/* Summary */}
        <div style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:12,padding:14,marginBottom:14}}>
          {[["Business",biz.name],["Owner",`${biz.ownerName} (${biz.designation})`],["Type",bl(biz.type,lang)],["Location",`${biz.city}, ${biz.province}`],["Revenue",biz.revLabel||"—"],["Employees",biz.empLabel||"—"],["NTN",biz.ntn||"Not registered"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"0.5px solid #111",fontSize:12}}>
              <span style={{color:"#333333"}}>{k}</span>
              <span style={{color:"#888888",fontWeight:500,textAlign:"right",maxWidth:"65%",fontSize:11}}>{v}</span>
            </div>
          ))}
        </div>
        {/* Edit */}
        <div style={{background:"#0c0c0c",border:"0.5px solid #161616",borderRadius:12,padding:16}}>
          {[{l:"Business name",k:"name"},{l:"Owner name",k:"ownerName"},{l:"Phone",k:"phone"},{l:"NTN",k:"ntn"}].map(f=>(
            <div key={f.k} style={{marginBottom:0}}>
              <label style={{fontSize:9,fontWeight:500,color:"#333333",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:".08em"}}>{f.l}</label>
              <input value={d[f.k]||""} onChange={e=>upd(f.k,e.target.value)} style={inp}/>
            </div>
          ))}
          <label style={{fontSize:9,fontWeight:500,color:"#333333",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:".08em"}}>{t.bizType}</label>
          <select value={d.type} onChange={e=>upd("type",e.target.value)} style={sel}>
            {BIZ_TYPES.map(tp=><option key={tp.v} value={tp.v}>{lang==="ur"?tp.lUr:tp.l}</option>)}
          </select>
          <label style={{fontSize:9,fontWeight:500,color:"#333333",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:".08em"}}>{t.province}</label>
          <select value={d.province} onChange={e=>{upd("province",e.target.value);upd("city","");}} style={sel}>
            {PROVINCES.map(p=><option key={p}>{p}</option>)}
          </select>
          <label style={{fontSize:9,fontWeight:500,color:"#333333",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:".08em"}}>{t.city}</label>
          <select value={d.city} onChange={e=>upd("city",e.target.value)} style={sel}>
            {(CITIES[d.province]||[]).map(c=><option key={c}>{c}</option>)}
          </select>
          <label style={{fontSize:9,fontWeight:500,color:"#333333",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:".08em"}}>{t.revenue}</label>
          <select value={d.revM} onChange={e=>upd("revM",parseFloat(e.target.value))} style={sel}>
            {REV_BANDS.map(b=><option key={b.v} value={b.v}>{lang==="ur"?b.lUr:b.l}</option>)}
          </select>
          <label style={{fontSize:9,fontWeight:500,color:"#333333",display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:".08em"}}>{t.employees}</label>
          <select value={d.emp} onChange={e=>upd("emp",parseInt(e.target.value))} style={{...sel,marginBottom:14}}>
            {EMP_BANDS.map(b=><option key={b.v} value={b.v}>{lang==="ur"?b.lUr:b.l}</option>)}
          </select>
          <label style={{fontSize:9,fontWeight:500,color:"#333333",display:"block",marginBottom:8,textTransform:"uppercase",letterSpacing:".08em"}}>{t.licences}</label>
          <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:16}}>
            {LICENCE_TYPES.map(l=>(
              <div key={l} onClick={()=>toggleLic(l)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,border:`0.5px solid ${d.licences.includes(l)?"rgba(201,168,76,.3)":"#1e1e1e"}`,background:d.licences.includes(l)?"rgba(201,168,76,.08)":"transparent",cursor:"pointer"}}>
                <div style={{width:18,height:18,borderRadius:5,border:`1.5px solid ${d.licences.includes(l)?"#C9A84C":"#1e1e1e"}`,background:d.licences.includes(l)?"#C9A84C":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {d.licences.includes(l) && <i className="ti ti-check" style={{fontSize:11,color:"#000"}}/>}
                </div>
                <span style={{fontSize:11,color:d.licences.includes(l)?"#C9A84C":"#888888"}}>{l}</span>
              </div>
            ))}
          </div>
          <button onClick={save} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:saved?"#1e1e1e":"linear-gradient(135deg,#C9A84C,#B8922A)",color:saved?"#C9A84C":"#000",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <i className={`ti ${saved?"ti-check":"ti-device-floppy"}`} style={{fontSize:16}}/>{saved?t.saved:t.updateSave}
          </button>
        </div>
      </div>
    </div>
  );
}


/* ── BOTTOM NAV ───────────────────────────────────────────── */
function BottomNav({ active, onNav, urgentCount, newsCount, lang, TH }) {
  const t = T[lang];
  const tabs = [
    {id:"dash",    icon:"ti-home",  label:t.home},
    {id:"news",    icon:"ti-news",  label:t.news,   badge:newsCount},
    {id:"laws",    icon:"ti-scale", label:t.laws,   badge:urgentCount},
    {id:"profile", icon:"ti-user",  label:t.profile},
  ];
  return (
    <div style={{background:TH.bg,borderTop:`0.5px solid ${TH.border}`,display:"flex",padding:"10px 0 14px",flexShrink:0}}>
      {tabs.map(tab=>(
        <button key={tab.id} onClick={()=>onNav(tab.id)} style={{flex:1,background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative",padding:"2px 0"}}>
          <i className={`ti ${tab.icon}`} style={{fontSize:26,color:active===tab.id?"#C9A84C":"#2a2a2a",fontWeight:900}}/>
          <span style={{fontSize:10,fontWeight:active===tab.id?700:400,color:active===tab.id?"#C9A84C":"#2a2a2a",fontFamily:"inherit"}}>{tab.label}</span>
          {active===tab.id && <div style={{position:"absolute",bottom:-14,width:16,height:2,background:TH.gold,borderRadius:1}}/>}
          {(tab.badge||0)>0 && <span style={{position:"absolute",top:0,right:"14%",background:TH.red,color:"#ffffff",fontSize:8,fontWeight:700,borderRadius:8,padding:"1px 4px",minWidth:13,textAlign:"center"}}>{tab.badge}</span>}
        </button>
      ))}
    </div>
  );
}

/* ── ROOT ─────────────────────────────────────────────────── */
export default function App() {
  injectFonts();
  const [lang, setLang] = useState("en");
  const [biz,  setBiz]  = useState(null);
  const [screen, setScreen] = useState("dash");
  const [selLaw,  setSelLaw]  = useState(null);
  const [selNews, setSelNews] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [dbLaws, setDbLaws] = useState([]);
  const [dark, setDark] = useState(true);

  /* Theme colours — passed to all components */
  const TH = dark ? {
    bg:"#060606", bg2:"#0c0c0c", bg3:"#111111",
    border:"#1e1e1e", border2:"rgba(201,168,76,.25)",
    text:"#ffffff", text2:"#cccccc", text3:"#888888",
    gold:"#C9A84C", goldFaint:"rgba(201,168,76,.08)",
    red:"#ef4444", redFaint:"rgba(239,68,68,.08)", redBorder:"rgba(239,68,68,.4)",
  } : {
    bg:"#ffffff", bg2:"#fdf8ef", bg3:"#f5ede0",
    border:"#ede8d8", border2:"rgba(184,146,42,.3)",
    text:"#111111", text2:"#333333", text3:"#666666",
    gold:"#B8922A", goldFaint:"rgba(184,146,42,.08)",
    red:"#dc2626", redFaint:"rgba(220,38,38,.06)", redBorder:"rgba(220,38,38,.35)",
  };

  /* Auth */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  /* Laws from Supabase */
  useEffect(() => {
    supabase.from("laws").select("*").eq("active", true).order("cat")
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const mapped = data.map(l => ({
            id: l.id, title: l.title, titleUr: l.title_ur,
            cat: l.cat, sub: l.sub, icon: l.icon,
            color: l.color, bg: l.bg,
            provinces: l.provinces || ["All"],
            types: l.types || [],
            minRevM: l.min_rev_m || 0,
            minEmp: l.min_emp || 1,
            badge: l.badge, deadline: l.deadline,
            penalty: l.penalty || 0,
            penaltyPerDay: l.penalty_per_day || 0,
            summaryEn: l.summary_en, summaryUr: l.summary_ur,
            steps: l.steps || [],
            authority: l.authority, phone: l.phone, url: l.url,
            letter: l.letter_template ? (b) => l.letter_template
              .replace(/\[BUSINESS_NAME\]/g, b.name||"")
              .replace(/\[OWNER_NAME\]/g, b.ownerName||"")
              .replace(/\[DESIGNATION\]/g, b.designation||"")
              .replace(/\[PHONE\]/g, b.phone||"[PHONE]")
              .replace(/\[ADDRESS\]/g, b.address||"")
              .replace(/\[CITY\]/g, b.city||"")
              .replace(/\[PROVINCE\]/g, b.province||"")
              .replace(/\[NTN\]/g, b.ntn||"[NTN]")
              .replace(/\[TYPE\]/g, b.typeLabel||"")
              .replace(/\[STRN\]/g, "[ENTER STRN]") : null,
          }));
          setDbLaws(mapped);
        }
        setReady(true);
      })
      .catch(() => setReady(true));
  }, []);

  /* Load saved profile when user logs in */
  useEffect(() => {
    if (!user || biz) return;
    supabase.from("user_profiles").select("*").eq("id", user.id).single()
      .then(({ data }) => {
        if (data && data.type && data.province) {
          setBiz({
            name: data.name||"", ownerName: data.owner_name||"",
            designation: data.designation||"Owner", phone: data.phone||"",
            type: data.type||"", province: data.province||"",
            city: data.city||"", address: data.address||"",
            regType: data.reg_type||"sole", ntn: data.ntn||"",
            revM: data.rev_m||3, emp: data.emp||3,
            licences: data.licences||[], products: data.products||"",
            typeLabel: bl(data.type,"en"),
            revLabel: REV_BANDS.find(b=>b.v===data.rev_m)?.l||"",
            empLabel: EMP_BANDS.find(b=>b.v===data.emp)?.l||"",
          });
        }
      }).catch(()=>{});
  }, [user]);

  const signInWithGoogle = () => supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo: window.location.origin }});
  const signOut = () => supabase.auth.signOut().then(()=>setBiz(null));
  const saveProfile = async (b) => {
    if (!user) return;
    await supabase.from("user_profiles").upsert({ id:user.id, name:b.name, owner_name:b.ownerName, designation:b.designation, phone:b.phone, type:b.type, province:b.province, city:b.city, address:b.address, reg_type:b.regType, ntn:b.ntn, rev_m:b.revM, emp:b.emp, licences:b.licences, products:b.products, updated_at:new Date().toISOString() });
  };

  const LAWS = dbLaws.length > 0 ? dbLaws : ALL_LAWS;
  const myLaws = biz && biz.type ? LAWS.filter(l => matchLaw(l, biz)) : [];
  const myNews = biz && biz.type ? NEWS.filter(n => matchNews(n, biz)) : [];
  const nav = s => { setSelLaw(null); setSelNews(null); setScreen(s); };

  /* 1. Show loading ONLY on first open before laws are ready */
  if (!ready && !biz) return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#060606",gap:16,fontFamily:"inherit"}}>
      <div style={{fontSize:16,fontWeight:500,color:"#C9A84C",letterSpacing:"1px"}}>Verifill</div>
      <div style={{width:28,height:28,border:"2px solid #1a1a1a",borderTopColor:"#C9A84C",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  /* 2. Show sign in if no user and no biz */
  if (!user && !biz) return (
    <div style={{height:"100vh",overflowY:"auto",background:"#060606",fontFamily:"inherit"}}>
      <div style={{maxWidth:480,margin:"0 auto",padding:"60px 24px",textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:32}}>
          <div style={{width:40,height:40,borderRadius:11,border:"1px solid rgba(201,168,76,.4)",background:"rgba(201,168,76,.08)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <i className="ti ti-shield-check" style={{fontSize:20,color:"#C9A84C"}}/>
          </div>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:18,fontWeight:500,color:"#C9A84C",letterSpacing:"1px"}}>Verifill</div>
            <div style={{fontSize:9,color:"rgba(201,168,76,.3)",letterSpacing:".2em",textTransform:"uppercase"}}>Pakistan Compliance</div>
          </div>
        </div>
        <div style={{background:"#0c0c0c",border:"0.5px solid #1a1a1a",borderRadius:16,padding:"28px 22px"}}>
          <div style={{fontSize:18,fontWeight:500,color:"#ffffff",marginBottom:8}}>Welcome</div>
          <div style={{fontSize:12,color:"#333333",marginBottom:24,lineHeight:1.7}}>Sign in to save your profile permanently.</div>
          <button onClick={signInWithGoogle} style={{width:"100%",padding:"13px 16px",borderRadius:12,border:"0.5px solid #2a2a2a",background:"#ffffff",color:"#3c4043",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:14}}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
              <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
              <path fill="#FBBC05" d="M24 46c5.6 0 10.6-1.9 14.5-5.1l-6.7-5.5C29.8 37 27 38 24 38c-5.8 0-10.7-3.1-11.8-7.5l-7 5.4C9.7 42.6 16.3 46 24 46z"/>
              <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-1 3-3.5 5.5-6.8 7l6.7 5.5C40.8 37.3 44.5 31 44.5 24c0-1.3-.2-2.7-.5-4z"/>
            </svg>
            Continue with Google
          </button>
          <div style={{display:"flex",alignItems:"center",gap:10,margin:"4px 0 14px"}}>
            <div style={{flex:1,height:"0.5px",background:"#1e1e1e"}}/>
            <span style={{fontSize:11,color:"#333333"}}>or</span>
            <div style={{flex:1,height:"0.5px",background:"#1e1e1e"}}/>
          </div>
          <button onClick={()=>setBiz("onboard")} style={{width:"100%",padding:"12px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#C9A84C,#B8922A)",color:"#000",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
            Continue without saving
          </button>
        </div>
      </div>
    </div>
  );

  /* 3. Show onboarding if no real profile yet */
  if (!biz || biz === "onboard" || !biz.type || !biz.province) return (
    <Onboarding
      onDone={b => {
        setBiz({ ...b, typeLabel: bl(b.type,"en"), revLabel: REV_BANDS.find(r=>r.v===b.revM)?.l||"", empLabel: EMP_BANDS.find(r=>r.v===b.emp)?.l||"", licences: b.licences||[], products: b.products||"", ntn: b.ntn||"" });
        saveProfile(b);
        setScreen("dash");
      }}
      lang={lang}
      setLang={setLang}
    />
  );

  /* 4. Main app */
  const inDetail = selLaw || selNews;
  const mainScreens = ["dash","news","laws","profile"];

  const renderScreen = () => {
    if (selLaw)  return <LawDetail  law={selLaw}  biz={biz} onBack={()=>setSelLaw(null)}  lang={lang} TH={TH}/>;
    if (selNews) return <NewsDetail news={selNews} biz={biz} onBack={()=>setSelNews(null)} lang={lang} TH={TH}/>;
    switch(screen) {
      case "dash":     return <Dashboard     biz={biz} laws={myLaws} news={myNews} onNav={nav} onLaw={setSelLaw} onNews={setSelNews} lang={lang} setLang={setLang} user={user} signOut={signOut} dark={dark} setDark={setDark} TH={TH}/>;
      case "news":     return <NewsFeed      biz={biz} onSelect={setSelNews} lang={lang} TH={TH}/>;
      case "laws":     return <LawBook       biz={biz} onSelect={setSelLaw} lang={lang} allLaws={LAWS} onNav={nav} TH={TH}/>;
      case "profile":  return <ProfileScreen biz={biz} onUpdate={b=>{ setBiz(b); saveProfile(b); nav("dash"); }} lang={lang} TH={TH}/>;
      case "calendar": return <ComplianceCalendar laws={myLaws} lang={lang} onNav={nav} TH={TH}/>;
      case "finecalc": return <FineCalculator     laws={myLaws} lang={lang} onNav={nav} TH={TH}/>;
      case "scandoc":  return <DocScanner         lang={lang} onNav={nav} TH={TH}/>;
      case "findca":   return <FindCA             biz={biz} lang={lang} onNav={nav} TH={TH}/>;
      case "kit":      return <ComplianceKit      laws={myLaws} biz={biz} lang={lang} onNav={nav} TH={TH}/>;
      default:         return <Dashboard          biz={biz} laws={myLaws} news={myNews} onNav={nav} onLaw={setSelLaw} onNews={setSelNews} lang={lang} setLang={setLang} user={user} signOut={signOut} dark={dark} setDark={setDark} TH={TH}/>;
    }
  };

  return (
    <div style={{maxWidth:480,margin:"0 auto",height:"100vh",background:TH.bg,position:"relative",fontFamily:"inherit",display:"flex",flexDirection:"column"}}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0}
        select,input,button{font-family:inherit}
        ::-webkit-scrollbar{display:none}
        .ti{font-family:"tabler-icons"!important}
      `}</style>
      <div style={{flex:1,overflowY:"auto"}}>
        {renderScreen()}
      </div>
      {!inDetail && mainScreens.includes(screen) && (
        <BottomNav active={screen} onNav={nav}
          urgentCount={myLaws.filter(l=>{const d=daysUntil(l.deadline);return d!==null&&d<60;}).length}
          newsCount={myNews.filter(n=>n.mag==="high").length}
          lang={lang} TH={TH}
        />
      )}
    </div>
  );
}
