import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

/* ── SUPABASE CLIENT ──────────────────────────────────────── */
const supabase = createClient(
  "https://kyonlfvtwtunypbumtju.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5b25sZnZ0d3R1bnlwYnVtdGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNzM5NzMsImV4cCI6MjA2Mjc0OTk3M30.TXyDFGrxCNQDHulXQxSMNb7cOMXIBxEimXe7nnO-Gkc"
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
  /* ── TAX ── */
  { id:"ntn", title:"NTN Registration", titleUr:"NTN رجسٹریشن", cat:"Tax", sub:"Federal · Every business", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Mandatory for all", deadline:null, penalty:50000, penaltyPerDay:0, summaryEn:"Every business must obtain a National Tax Number (NTN) from FBR. Required for opening a bank account, government contracts, and all major transactions.", summaryUr:"ہر کاروبار کو FBR سے NTN لینا ضروری ہے۔", steps:["Register at iris.fbr.gov.pk with your CNIC","Obtain NTN certificate within 24–48 hours","Use NTN on all invoices"], authority:"FBR", phone:"051-111-772-772", url:"https://iris.fbr.gov.pk", letter:b=>`To: FBR\nSubject: NTN Registration\n\n${b.name}, ${b.city}\nNTN: ${b.ntn||'[NTN]'}\n${b.ownerName}` },
  { id:"income-tax", title:"Annual Income Tax Return", titleUr:"سالانہ انکم ٹیکس ریٹرن", cat:"Tax", sub:"Federal · All businesses", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Deadline: 30 Sep", deadline:"2025-09-30", penalty:100000, penaltyPerDay:1000, summaryEn:"Every business must file annual income tax return by 30 September. Non-filers pay 6x more withholding tax.", summaryUr:"ہر کاروبار کو 30 ستمبر تک سالانہ ریٹرن فائل کرنی ہوگی۔", steps:["Maintain books of accounts all year","File return at iris.fbr.gov.pk before 30 September","Check ATL status at fbr.gov.pk"], authority:"FBR", phone:"051-111-772-772", url:"https://iris.fbr.gov.pk", letter:b=>`To: FBR\nSubject: Income Tax Return\n\n${b.name} (NTN: ${b.ntn||'[NTN]'}), ${b.city}\n${b.ownerName}` },
  { id:"sales-tax", title:"Sales Tax Registration — STRN", titleUr:"سیلز ٹیکس رجسٹریشن", cat:"Tax", sub:"Federal · Turnover > PKR 10M", provinces:["All"], types:["retail","wholesale","food","manufacturing","trading"], minRevM:10, minEmp:1, badge:"Urgent", deadline:"2025-12-18", penalty:50000, penaltyPerDay:10000, summaryEn:"Businesses with turnover above PKR 10M must register for Sales Tax, obtain STRN, file monthly returns by 18th of each month.", summaryUr:"PKR 10M سے زیادہ آمدنی والے کاروباروں کو سیلز ٹیکس رجسٹریشن لازمی ہے۔", steps:["Register on iris.fbr.gov.pk","Buy FBR-certified POS machine","File monthly return by 18th"], authority:"FBR", phone:"051-111-772-772", url:"https://iris.fbr.gov.pk", letter:b=>`To: FBR\nSubject: STRN Compliance\n\n${b.name} (NTN: ${b.ntn||'[NTN]'}), ${b.city}\n${b.ownerName}` },
  { id:"advance-tax-imports", title:"Advance Tax on Imports", titleUr:"درآمدات پر ایڈوانس ٹیکس", cat:"Tax", sub:"Federal · Importers", provinces:["All"], types:["trading","manufacturing","wholesale"], minRevM:0, minEmp:1, badge:"Mandatory for importers", deadline:null, penalty:200000, penaltyPerDay:0, summaryEn:"All importers must pay advance tax at the time of importing goods. Rate varies 1% to 9% of import value.", summaryUr:"تمام درآمد کنندگان کو سامان درآمد کرتے وقت ایڈوانس ٹیکس ادا کرنا ہوگا۔", steps:["Register as importer with FBR","Pay advance tax at customs clearance","File monthly withholding tax statement"], authority:"FBR Customs", phone:"051-111-772-772", url:"https://customs.gov.pk", letter:b=>`To: FBR\nSubject: Advance Tax Compliance\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"withholding-tax", title:"Withholding Tax on Supplier Payments", titleUr:"سپلائر ادائیگیوں پر ود ہولڈنگ ٹیکس", cat:"Tax", sub:"Federal · Turnover > PKR 5M", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:5, minEmp:1, badge:"Deduct at source", deadline:null, penalty:100000, penaltyPerDay:0, summaryEn:"Businesses with turnover above PKR 5M must deduct withholding tax when paying suppliers. 4.5% for filers, 9% for non-filers.", summaryUr:"PKR 5M سے زیادہ کاروباروں کو سپلائرز کو ادائیگی پر ود ہولڈنگ ٹیکس کاٹنا ہوگا۔", steps:["Deduct withholding tax on payments above PKR 30,000","Deposit with FBR by 15th of following month","Issue withholding certificate to supplier"], authority:"FBR", phone:"051-111-772-772", url:"https://iris.fbr.gov.pk", letter:b=>`To: FBR\nSubject: Withholding Tax Compliance\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"professional-tax", title:"Professional Tax — Punjab", titleUr:"پروفیشنل ٹیکس — پنجاب", cat:"Tax", sub:"Punjab · All businesses", provinces:["Punjab"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Annual PKR 1,200", deadline:"2025-12-31", penalty:10000, penaltyPerDay:0, summaryEn:"Every business in Punjab must pay Professional Tax of PKR 1,200 annually to District Council.", summaryUr:"پنجاب میں ہر کاروبار کو سالانہ PKR 1,200 پروفیشنل ٹیکس ادا کرنا ہوگا۔", steps:["Visit District Council or Municipal Corporation","Pay PKR 1,200 annual professional tax","Keep receipt for trade licence renewal"], authority:"Punjab District Council", phone:"042-111-000-601", url:null, letter:b=>`To: District Council\nSubject: Professional Tax\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"pra-services-tax", title:"Sales Tax on Services — Punjab PRA", titleUr:"خدمات پر سیلز ٹیکس — PRA", cat:"Tax", sub:"Punjab · Service businesses > PKR 5M", provinces:["Punjab"], types:["services","it","education","medical","construction"], minRevM:5, minEmp:1, badge:"16% on services", deadline:"2025-12-18", penalty:50000, penaltyPerDay:5000, summaryEn:"Service businesses in Punjab with turnover above PKR 5M must register with PRA and charge 16% sales tax. File monthly returns.", summaryUr:"پنجاب میں PKR 5M سے زیادہ خدمات کاروباروں کو PRA کے ساتھ رجسٹر کرنا ہوگا۔", steps:["Register at pra.punjab.gov.pk","Charge 16% sales tax on all services","File monthly return by 15th"], authority:"Punjab Revenue Authority", phone:"042-111-111-772", url:"https://pra.punjab.gov.pk", letter:b=>`To: PRA\nSubject: PST Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"srb-services-tax", title:"Sindh Sales Tax on Services — SRB", titleUr:"سندھ خدمات سیلز ٹیکس", cat:"Tax", sub:"Sindh · Service businesses > PKR 5M", provinces:["Sindh"], types:["services","it","education","medical","construction"], minRevM:5, minEmp:1, badge:"13% on services", deadline:"2025-12-18", penalty:50000, penaltyPerDay:5000, summaryEn:"Service businesses in Sindh with turnover above PKR 5M must register with SRB and charge 13% sales tax.", summaryUr:"سندھ میں PKR 5M سے زیادہ خدمات کاروباروں کو SRB کے ساتھ رجسٹر کرنا ہوگا۔", steps:["Register at srb.gos.pk","Charge 13% sales tax on services","File monthly return by 18th"], authority:"Sindh Revenue Board", phone:"021-111-777-786", url:"https://srb.gos.pk", letter:b=>`To: SRB\nSubject: SST Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"pos-machine", title:"POS Machine Registration — FBR", titleUr:"POS مشین رجسٹریشن", cat:"Tax", sub:"Federal · Retailers > PKR 10M", provinces:["All"], types:["retail","wholesale","food","trading"], minRevM:10, minEmp:1, badge:"Mandatory", deadline:null, penalty:500000, penaltyPerDay:0, summaryEn:"Retailers with annual turnover above PKR 10M must install FBR integrated POS machines and issue computerized receipts.", summaryUr:"PKR 10M سے زیادہ خوردہ فروشوں کو FBR POS مشین لگانی ہوگی۔", steps:["Purchase FBR-approved POS machine","Register POS at iris.fbr.gov.pk","Issue computerized receipts for every sale"], authority:"FBR", phone:"051-111-772-772", url:"https://iris.fbr.gov.pk", letter:b=>`To: FBR\nSubject: POS Registration\n\n${b.name} (NTN: ${b.ntn||'[NTN]'}), ${b.city}\n${b.ownerName}` },
  { id:"advance-tax-quarterly", title:"Advance Tax Quarterly Payments", titleUr:"سہ ماہی ایڈوانس ٹیکس", cat:"Tax", sub:"Federal · Profitable businesses", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:5, minEmp:1, badge:"Sep 15, Dec 15, Mar 15, Jun 15", deadline:null, penalty:100000, penaltyPerDay:0, summaryEn:"Businesses that paid tax last year must pay advance tax quarterly. Each installment is 25% of last year total tax.", summaryUr:"گزشتہ سال ٹیکس ادا کرنے والوں کو سہ ماہی قسطوں میں ایڈوانس ٹیکس ادا کرنا ہوگا۔", steps:["Calculate 25% of last year total tax","Pay by Sep 15, Dec 15, Mar 15, Jun 15","Pay via iris.fbr.gov.pk or bank challan"], authority:"FBR", phone:"051-111-772-772", url:"https://iris.fbr.gov.pk", letter:b=>`To: FBR\nSubject: Advance Tax\n\n${b.name} (NTN: ${b.ntn||'[NTN]'}), ${b.city}\n${b.ownerName}` },
  { id:"freelancer-tax", title:"Freelancer Tax Exemption — FBR", titleUr:"فری لانسر ٹیکس چھوٹ", cat:"Tax", sub:"Federal · IT freelancers", provinces:["All"], types:["it","services"], minRevM:0, minEmp:1, badge:"Register to claim", deadline:"2025-09-30", penalty:0, penaltyPerDay:0, summaryEn:"Freelancers earning in foreign currency are exempt from income tax until 2026 if registered with PSEB. Must still file return.", summaryUr:"غیر ملکی کرنسی میں کمانے والے فری لانسرز PSEB کے ساتھ رجسٹرڈ ہونے پر ٹیکس سے مستثنیٰ ہیں۔", steps:["Register with PSEB as freelancer","Receive all foreign payments through Pakistani bank","File annual income tax return claiming exemption"], authority:"FBR / PSEB", phone:"051-111-772-772", url:"https://pseb.org.pk", letter:b=>`To: FBR\nSubject: Freelancer Tax Exemption\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  /* ── LABOUR ── */
  { id:"eobi", title:"EOBI Registration (5+ Employees)", titleUr:"EOBI رجسٹریشن", cat:"Labour", sub:"Federal · 5+ employees", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:5, badge:"Audits ongoing", deadline:null, penalty:50000, penaltyPerDay:500, summaryEn:"All businesses with 5+ employees must register with EOBI. Employer pays PKR 1,850 per employee monthly.", summaryUr:"5 یا زیادہ ملازمین والے کاروباروں کو EOBI رجسٹریشن لازمی ہے۔", steps:["Register at eobi.gov.pk","Register each employee","Pay PKR 1,850 per employee by 15th monthly"], authority:"EOBI", phone:"111-000-231", url:"https://eobi.gov.pk", letter:b=>`To: EOBI\nSubject: EOBI Registration\n\n${b.name}, ${b.city} — ${b.emp} employees\n${b.ownerName}` },
  { id:"punjab-wages", title:"Punjab Minimum Wage — PKR 37,000", titleUr:"پنجاب کم از کم اجرت", cat:"Labour", sub:"Punjab · All employers", provinces:["Punjab"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:2, badge:"Effective July 1", deadline:"2026-07-01", penalty:25000, penaltyPerDay:5000, summaryEn:"All Punjab employers must pay minimum PKR 37,000/month to unskilled workers.", summaryUr:"پنجاب میں تمام مزدوروں کو کم از کم PKR 37,000 ماہانہ دینا لازمی ہے۔", steps:["Review all employee salaries","Update payroll to minimum PKR 37,000","Post wage notice at entrance"], authority:"Punjab Labour Dept", phone:"042-111-000-601", url:"https://labour.punjab.gov.pk", letter:b=>`To: Punjab Labour Department\nSubject: Minimum Wage Compliance\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"sindh-wages", title:"Sindh Minimum Wage — PKR 37,000", titleUr:"سندھ کم از کم اجرت", cat:"Labour", sub:"Sindh · All employers", provinces:["Sindh"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:2, badge:"Effective 2025", deadline:null, penalty:20000, penaltyPerDay:0, summaryEn:"All Sindh employers must pay minimum PKR 37,000/month to unskilled workers.", summaryUr:"سندھ میں تمام مزدوروں کو کم از کم PKR 37,000 ماہانہ دینا لازمی ہے۔", steps:["Review all employee salaries","Update payroll to minimum PKR 37,000","Post wage notice"], authority:"Sindh Labour Department", phone:"021-111-000-601", url:null, letter:b=>`To: Sindh Labour Department\nSubject: Minimum Wage\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"kpk-wages", title:"KPK Minimum Wage — PKR 36,000", titleUr:"KPK کم از کم اجرت", cat:"Labour", sub:"KPK · All employers", provinces:["KPK"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:2, badge:"Effective 2025", deadline:null, penalty:20000, penaltyPerDay:0, summaryEn:"All KPK employers must pay minimum PKR 36,000/month to unskilled workers.", summaryUr:"KPK میں تمام مزدوروں کو کم از کم PKR 36,000 ماہانہ دینا لازمی ہے۔", steps:["Review all employee salaries","Update payroll to minimum PKR 36,000","Post wage notice"], authority:"KPK Labour Department", phone:"091-111-000-601", url:null, letter:b=>`To: KPK Labour Department\nSubject: Minimum Wage\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"pessi", title:"PESSI — Punjab Social Security", titleUr:"PESSI پنجاب سوشل سیکیورٹی", cat:"Labour", sub:"Punjab · 5+ employees", provinces:["Punjab"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:5, badge:"Mandatory", deadline:null, penalty:30000, penaltyPerDay:300, summaryEn:"Punjab businesses with 5+ employees must register with PESSI and pay 6% of wages monthly.", summaryUr:"پنجاب میں 5 یا زیادہ ملازمین والے کاروباروں کو PESSI رجسٹریشن لازمی ہے۔", steps:["Register at pessi.punjab.gov.pk","Register all eligible employees","Pay 6% of wages monthly by 15th"], authority:"PESSI", phone:"042-35761599", url:"https://pessi.punjab.gov.pk", letter:b=>`To: PESSI\nSubject: PESSI Compliance\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"sessi", title:"SESSI — Sindh Social Security", titleUr:"SESSI سندھ سوشل سیکیورٹی", cat:"Labour", sub:"Sindh · 5+ employees", provinces:["Sindh"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:5, badge:"Mandatory", deadline:null, penalty:30000, penaltyPerDay:300, summaryEn:"Sindh businesses with 5+ employees must register with SESSI and pay 6% of wages monthly.", summaryUr:"سندھ میں 5 یا زیادہ ملازمین والے کاروباروں کو SESSI رجسٹریشن لازمی ہے۔", steps:["Register at sessi.gos.pk","Register all eligible employees","Pay 6% of wages monthly by 15th"], authority:"SESSI", phone:"021-111-737-743", url:"https://sessi.gos.pk", letter:b=>`To: SESSI\nSubject: SESSI Compliance\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"gratuity", title:"Gratuity Act — End of Service", titleUr:"گریجویٹی ایکٹ", cat:"Labour", sub:"Federal · 5+ year employees", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:5, badge:"After 5 years service", deadline:null, penalty:100000, penaltyPerDay:0, summaryEn:"Every employee completing 5 years gets gratuity — one month salary per year of service. Must be paid within 30 days of leaving.", summaryUr:"ہر ملازم جو 5 سال مکمل کرے، ہر سال کی خدمت کے لیے ایک ماہ تنخواہ کا حقدار ہے۔", steps:["Maintain complete employment records","Calculate gratuity at one month salary per year","Pay within 30 days of employee leaving"], authority:"Provincial Labour Department", phone:"042-111-000-601", url:null, letter:b=>`To: Labour Department\nSubject: Gratuity Compliance\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"maternity", title:"Maternity Benefits Act", titleUr:"زچگی فوائد ایکٹ", cat:"Labour", sub:"Federal · All employers", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Mandatory", deadline:null, penalty:50000, penaltyPerDay:0, summaryEn:"Every employer must provide 12 weeks paid maternity leave to female employees. Cannot dismiss during pregnancy.", summaryUr:"ہر آجر کو خواتین ملازمین کو 12 ہفتے کی بامعاوضہ زچگی چھٹی دینی ہوگی۔", steps:["Create maternity leave policy","Ensure 12 weeks full paid leave","No dismissal during pregnancy or maternity leave"], authority:"Provincial Labour Department", phone:"042-111-000-601", url:null, letter:b=>`To: Labour Department\nSubject: Maternity Benefits\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"workmen-compensation", title:"Workmen Compensation Insurance", titleUr:"مزدور معاوضہ انشورنس", cat:"Labour", sub:"Federal · All employers", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Mandatory insurance", deadline:null, penalty:200000, penaltyPerDay:0, summaryEn:"All employers must compensate workers injured during employment. Must have workmen compensation insurance.", summaryUr:"تمام آجروں کو کام کے دوران زخمی مزدوروں کو معاوضہ دینا لازمی ہے۔", steps:["Purchase workmen compensation insurance","Post safety notices at workplace","Maintain accident register"], authority:"Provincial Labour Department", phone:"042-111-000-601", url:null, letter:b=>`To: Labour Department\nSubject: Workmen Compensation\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"shops-ordinance", title:"Shops & Establishments Ordinance", titleUr:"دکانیں اور اسٹیبلشمنٹ آرڈیننس", cat:"Labour", sub:"Punjab · All shops", provinces:["Punjab"], types:["retail","wholesale","food","services","trading","education"], minRevM:0, minEmp:1, badge:"Registration required", deadline:null, penalty:25000, penaltyPerDay:0, summaryEn:"All shops in Punjab must register under Shops and Establishments Ordinance. Must maintain attendance register and provide weekly rest day.", summaryUr:"پنجاب میں تمام دکانوں کو Shops and Establishments Ordinance کے تحت رجسٹر ہونا چاہیے۔", steps:["Register with Labour Department Punjab","Maintain daily attendance register","Provide one weekly rest day"], authority:"Punjab Labour Department", phone:"042-111-000-601", url:"https://labour.punjab.gov.pk", letter:b=>`To: Punjab Labour Department\nSubject: Shops Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"annual-bonus", title:"Annual Bonus Act", titleUr:"سالانہ بونس ایکٹ", cat:"Labour", sub:"Federal · 20+ employees", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:20, badge:"After profitable year", deadline:null, penalty:50000, penaltyPerDay:0, summaryEn:"Businesses with 20+ employees that earned profit must pay annual bonus — minimum 5% of annual wages.", summaryUr:"20 یا زیادہ ملازمین والے منافع بخش کاروباروں کو سالانہ بونس ادا کرنا ہوگا۔", steps:["Calculate profit for the year","Pay bonus 5-20% of annual wages","Pay within 8 months of year end"], authority:"Provincial Labour Department", phone:"042-111-000-601", url:null, letter:b=>`To: Labour Department\nSubject: Annual Bonus\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  /* ── OPERATIONS ── */
  { id:"punjab-closing", title:"Punjab Shop Closing Times", titleUr:"پنجاب دکان بند کرنے کا وقت", cat:"Operations", sub:"Punjab · All shops", provinces:["Punjab"], types:["retail","wholesale","food","services","trading","education","it","manufacturing","construction"], minRevM:0, minEmp:1, badge:"Nightly enforcement", deadline:null, penalty:25000, penaltyPerDay:25000, summaryEn:"Retail shops: 8 PM. Restaurants & food: 10 PM. Medical stores exempt. PKR 25,000 on-spot fine.", summaryUr:"خوردہ دکانیں: رات 8 بجے۔ ریستوران: رات 10 بجے۔ موقع پر PKR 25,000 جرمانہ۔", steps:["Know your closing time (retail: 8 PM, food: 10 PM)","Post notice at entrance","Close on time every night"], authority:"District Admin Punjab", phone:"042-111-000-601", url:null, closingTimes:{food:"10:00 PM",retail:"8:00 PM",wholesale:"8:00 PM",services:"8:00 PM",pharmacy:"24 hrs",medical:"24 hrs",it:"8:00 PM",education:"8:00 PM",manufacturing:"Anytime",construction:"Anytime",trading:"8:00 PM"}, letter:b=>`To: District Administration ${b.city}\nSubject: Closing Time Compliance\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"sindh-closing", title:"Sindh Shop Closing Times", titleUr:"سندھ دکان بند ہونے کا وقت", cat:"Operations", sub:"Sindh · All shops", provinces:["Sindh"], types:["retail","wholesale","food","services","trading","education","it"], minRevM:0, minEmp:1, badge:"Rangers enforcing", deadline:null, penalty:20000, penaltyPerDay:20000, summaryEn:"Karachi retail: 10 PM. Restaurants: 11 PM. Rangers conduct nightly enforcement.", summaryUr:"کراچی خوردہ: رات 10 بجے۔ ریستوران: رات 11 بجے۔", steps:["Know your zone closing time","Post notice at entrance","Ensure lights off at required time"], authority:"Sindh Admin / Rangers", phone:"021-111-000-101", url:null, closingTimes:{food:"11:00 PM",retail:"10:00 PM",wholesale:"10:00 PM",services:"10:00 PM",pharmacy:"24 hrs",medical:"24 hrs",it:"10:00 PM",education:"10:00 PM",manufacturing:"Anytime",construction:"Anytime",trading:"10:00 PM"}, letter:b=>`To: Sindh District Administration\nSubject: Closing Time Compliance\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"kpk-closing", title:"KPK Shop Closing Times", titleUr:"KPK دکان بند کرنے کا وقت", cat:"Operations", sub:"KPK · All shops", provinces:["KPK"], types:["retail","wholesale","food","services","trading"], minRevM:0, minEmp:1, badge:"Enforced nightly", deadline:null, penalty:15000, penaltyPerDay:0, summaryEn:"KPK retail shops must close by 9 PM. Restaurants by 11 PM.", summaryUr:"KPK میں خوردہ دکانیں رات 9 بجے اور ریستوران 11 بجے بند ہونی چاہئیں۔", steps:["Know your closing time: retail 9 PM, food 11 PM","Post notice at entrance","Close on time"], authority:"KPK District Administration", phone:"091-111-000-601", url:null, letter:b=>`To: KPK District Administration\nSubject: Closing Time Compliance\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"weights-measures", title:"Weights & Measures Verification", titleUr:"وزن اور پیمائش تصدیق", cat:"Operations", sub:"All provinces · Retail & wholesale", provinces:["All"], types:["retail","wholesale","food","manufacturing","trading"], minRevM:0, minEmp:1, badge:"Annual verification", deadline:"2025-12-31", penalty:10000, penaltyPerDay:0, summaryEn:"All businesses using weighing scales must have them verified by Weights and Measures Department annually.", summaryUr:"وزن کرنے والی مشینیں سالانہ محکمہ اوزان و پیمائش سے تصدیق کروانی ہوں گی۔", steps:["Visit local Weights and Measures office","Have all scales verified","Pay verification fee","Display verification seal"], authority:"Weights and Measures Department", phone:null, url:null, letter:b=>`To: Weights and Measures Department\nSubject: Scale Verification\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"cctv", title:"CCTV Registration — Safe City", titleUr:"CCTV رجسٹریشن", cat:"Operations", sub:"Punjab · Commercial businesses", provinces:["Punjab"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Lahore businesses", deadline:null, penalty:25000, penaltyPerDay:0, summaryEn:"Businesses in Lahore and Punjab cities are required to register CCTV systems with Safe City Authority.", summaryUr:"لاہور اور پنجاب شہروں میں کاروباروں کو CCTV سسٹم رجسٹر کرنا ہوگا۔", steps:["Install CCTV covering all entry/exit points","Register with Safe City Authority","Maintain footage for minimum 30 days"], authority:"Safe City Authority Punjab", phone:"042-111-111-112", url:null, letter:b=>`To: Safe City Authority\nSubject: CCTV Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"commercial-electricity", title:"Commercial Electricity Connection", titleUr:"تجارتی بجلی کنکشن", cat:"Operations", sub:"All provinces · All businesses", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Mandatory", deadline:null, penalty:50000, penaltyPerDay:0, summaryEn:"Businesses must have commercial electricity connection. Using residential connection for commercial purposes is illegal.", summaryUr:"کاروباروں کے پاس تجارتی بجلی کنکشن ہونا چاہیے۔ رہائشی کنکشن کا تجارتی استعمال غیر قانونی ہے۔", steps:["Apply for commercial electricity connection","Pay commercial connection fee","Get meter changed to commercial tariff"], authority:"WAPDA / LESCO / KESC", phone:"118", url:null, letter:b=>`To: WAPDA/LESCO\nSubject: Commercial Connection\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  /* ── LICENSING ── */
  { id:"trade-licence", title:"Trade Licence — Municipal Corporation", titleUr:"تجارتی لائسنس", cat:"Licensing", sub:"All provinces · Every business", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Annual renewal Dec 31", deadline:"2025-12-31", penalty:15000, penaltyPerDay:0, summaryEn:"Every business at a physical location needs a Trade Licence. Required for bank accounts. Can be sealed immediately without court order.", summaryUr:"ہر کاروبار کو تجارتی لائسنس ضروری ہے۔ بینک اکاؤنٹ کے لیے لازمی۔", steps:["Visit Municipal Corporation with documents","Pay annual fee (PKR 3,000–50,000)","Display licence at premises — renew by Dec 31"], authority:"City Municipal Corporation", phone:null, url:null, letter:b=>`To: ${b.city} Municipal Corporation\nSubject: Trade Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"secp", title:"SECP Annual Filing — Companies Act", titleUr:"SECP سالانہ فائلنگ", cat:"Licensing", sub:"Federal · Pvt Ltd / SMC", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Annual filing required", deadline:null, penalty:500000, penaltyPerDay:1000, summaryEn:"SECP-registered companies must hold AGM within 4 months of year end and file annual return within 30 days.", summaryUr:"SECP رجسٹرڈ کمپنیوں کو سالانہ AGM اور ریٹرن فائلنگ لازمی ہے۔", steps:["Hold AGM within 4 months of year end","File annual return at eservices.secp.gov.pk","File Form 29 for any changes"], authority:"SECP", phone:"051-921-0255", url:"https://eservices.secp.gov.pk", letter:b=>`To: SECP\nSubject: Annual Filing\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"fire-noc", title:"Fire NOC — Fire Department", titleUr:"فائر NOC", cat:"Licensing", sub:"All provinces · Commercial premises", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Before opening", deadline:null, penalty:100000, penaltyPerDay:0, summaryEn:"All commercial establishments must get NOC from Fire Department. Checks fire exits, extinguishers, and emergency procedures.", summaryUr:"تمام تجارتی اداروں کو فائر ڈیپارٹمنٹ سے NOC لینا ہوگا۔", steps:["Install fire extinguishers","Mark all fire exits clearly","Display emergency evacuation plan","Apply for Fire NOC","Renew annually"], authority:"Local Fire Department", phone:"16", url:null, letter:b=>`To: ${b.city} Fire Department\nSubject: Fire NOC Application\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"signboard-permit", title:"Outdoor Advertising / Signboard Permit", titleUr:"آؤٹ ڈور ایڈورٹائزنگ پرمٹ", cat:"Licensing", sub:"All provinces · All businesses", provinces:["All"], types:["retail","wholesale","food","manufacturing","services","it","medical","pharmacy","education","construction","trading"], minRevM:0, minEmp:1, badge:"Before installing", deadline:null, penalty:50000, penaltyPerDay:0, summaryEn:"Any business installing a signboard or banner must get permission from Municipal Corporation. Unauthorized signs are removed and business fined.", summaryUr:"عوامی جگہ پر سائن بورڈ لگانے کے لیے میونسپل کارپوریشن سے اجازت لینی ہوگی۔", steps:["Apply to Municipal Corporation","Pay annual permit fee","Follow size and placement regulations"], authority:"City Municipal Corporation", phone:null, url:null, letter:b=>`To: ${b.city} Municipal Corporation\nSubject: Signboard Permit\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"pseb", title:"PSEB Registration — IT Export", titleUr:"PSEB رجسٹریشن", cat:"Licensing", sub:"Federal · IT companies", provinces:["All"], types:["it"], minRevM:0, minEmp:1, badge:"For tax benefits", deadline:null, penalty:0, penaltyPerDay:0, summaryEn:"IT companies and freelancers must register with PSEB to get tax exemption on IT exports. 0% income tax on export income until 2026.", summaryUr:"IT کمپنیوں کو ٹیکس چھوٹ کے لیے PSEB کے ساتھ رجسٹر ہونا چاہیے۔", steps:["Register at pseb.org.pk","Submit proof of IT services","Get PSEB certificate"], authority:"PSEB", phone:"051-9106916", url:"https://pseb.org.pk", letter:b=>`To: PSEB\nSubject: PSEB Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"pta-telecom", title:"PTA Registration — Telecom", titleUr:"PTA رجسٹریشن", cat:"Licensing", sub:"Federal · Telecom and IT", provinces:["All"], types:["it","services"], minRevM:0, minEmp:1, badge:"Before operating", deadline:null, penalty:5000000, penaltyPerDay:0, summaryEn:"Any business providing internet or phone services must register with PTA. Fines can reach PKR 50 million.", summaryUr:"انٹرنیٹ یا فون سروسز فراہم کرنے والے کاروبار کو PTA رجسٹریشن لازمی ہے۔", steps:["Apply for PTA licence at pta.gov.pk","Meet technical requirements","Pay licence fee"], authority:"PTA", phone:"051-9225328", url:"https://pta.gov.pk", letter:b=>`To: PTA\nSubject: PTA Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"school-reg", title:"Private School Registration — Punjab", titleUr:"نجی اسکول رجسٹریشن", cat:"Licensing", sub:"Punjab · Private schools", provinces:["Punjab"], types:["education"], minRevM:0, minEmp:1, badge:"Before opening", deadline:null, penalty:500000, penaltyPerDay:0, summaryEn:"All private schools in Punjab must register with PPEIRA. Must meet building standards, teacher qualifications, and curriculum requirements.", summaryUr:"پنجاب میں تمام نجی اسکولوں کو PPEIRA کے ساتھ رجسٹر ہونا چاہیے۔", steps:["Apply at ppeira.punjab.gov.pk","Ensure building meets safety standards","Verify all teachers have required qualifications"], authority:"PPEIRA Punjab", phone:"042-99202665", url:"https://ppeira.punjab.gov.pk", letter:b=>`To: PPEIRA\nSubject: School Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"import-export-code", title:"Import Export Code — FBR", titleUr:"درآمد برآمد کوڈ", cat:"Licensing", sub:"Federal · Importers and exporters", provinces:["All"], types:["trading","manufacturing","wholesale"], minRevM:0, minEmp:1, badge:"Before first shipment", deadline:null, penalty:500000, penaltyPerDay:0, summaryEn:"All importers and exporters must register with FBR Customs and get Import Export Code.", summaryUr:"تمام درآمد اور برآمد کنندگان کو FBR کسٹمز کوڈ حاصل کرنا ہوگا۔", steps:["Register at customs.gov.pk","Submit NTN and business documents","Get Import Export Code","Register on WeBOC"], authority:"FBR Customs", phone:"051-9106916", url:"https://customs.gov.pk", letter:b=>`To: FBR Customs\nSubject: Import Export Code\n\n${b.name} (NTN: ${b.ntn||'[NTN]'}), ${b.city}\n${b.ownerName}` },
  { id:"pec", title:"Pakistan Engineering Council", titleUr:"پاکستان انجینئرنگ کونسل", cat:"Licensing", sub:"Federal · Engineering firms", provinces:["All"], types:["construction"], minRevM:0, minEmp:1, badge:"Before engineering work", deadline:null, penalty:1000000, penaltyPerDay:0, summaryEn:"Any firm providing engineering services must be registered with PEC. All engineers must have individual PEC registration.", summaryUr:"انجینئرنگ سروسز فراہم کرنے والی فرم کو PEC کے ساتھ رجسٹر ہونا چاہیے۔", steps:["Register firm at pec.org.pk","Ensure all engineers have PEC registration","Display PEC certificate at office"], authority:"Pakistan Engineering Council", phone:"051-2876221", url:"https://pec.org.pk", letter:b=>`To: PEC\nSubject: PEC Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"factory-act", title:"Factory Act Registration", titleUr:"فیکٹری ایکٹ رجسٹریشن", cat:"Licensing", sub:"All provinces · Factories 10+ workers", provinces:["All"], types:["manufacturing"], minRevM:0, minEmp:10, badge:"Before production", deadline:null, penalty:200000, penaltyPerDay:0, summaryEn:"Factories with 10 or more workers must register under Factories Act. Annual inspection by Labour Department.", summaryUr:"10 یا زیادہ کارکنوں والی فیکٹریوں کو فیکٹری ایکٹ کے تحت رجسٹر ہونا چاہیے۔", steps:["Register factory with provincial Labour Department","Ensure proper ventilation and lighting","Maintain first aid facilities"], authority:"Provincial Labour Department", phone:"042-111-000-601", url:null, letter:b=>`To: Labour Department\nSubject: Factory Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"rera", title:"Real Estate Agent Licence — RERA", titleUr:"رئیل اسٹیٹ ایجنٹ لائسنس", cat:"Licensing", sub:"Federal · Real estate agents", provinces:["All"], types:["construction","services"], minRevM:0, minEmp:1, badge:"Before brokerage", deadline:null, penalty:500000, penaltyPerDay:0, summaryEn:"Real estate agents and brokers must register with RERA. Operating without licence results in heavy fines.", summaryUr:"رئیل اسٹیٹ ایجنٹس کو RERA کے ساتھ رجسٹر ہونا چاہیے۔", steps:["Register at rera.gov.pk","Complete required training","Pass RERA examination"], authority:"RERA Pakistan", phone:"051-9106916", url:"https://rera.gov.pk", letter:b=>`To: RERA\nSubject: Real Estate Agent Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"hotel-reg", title:"Hotel Registration — Tourism", titleUr:"ہوٹل رجسٹریشن", cat:"Licensing", sub:"All provinces · Hotels", provinces:["All"], types:["services","food"], minRevM:0, minEmp:1, badge:"Before opening", deadline:null, penalty:200000, penaltyPerDay:0, summaryEn:"All hotels and guesthouses must register with provincial Tourism Department. Annual inspection conducted.", summaryUr:"تمام ہوٹلوں کو صوبائی محکمہ سیاحت کے ساتھ رجسٹر ہونا چاہیے۔", steps:["Register with provincial Tourism Department","Meet building and safety requirements","Display registration at reception"], authority:"PTDC", phone:"051-9205117", url:"https://tourism.gov.pk", letter:b=>`To: Tourism Department\nSubject: Hotel Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"tdap", title:"TDAP Export Registration", titleUr:"TDAP برآمد رجسٹریشن", cat:"Licensing", sub:"Federal · Exporters", provinces:["All"], types:["trading","manufacturing"], minRevM:0, minEmp:1, badge:"For export benefits", deadline:null, penalty:0, penaltyPerDay:0, summaryEn:"Exporters must register with TDAP to access export facilitation schemes and duty drawbacks.", summaryUr:"برآمد کنندگان کو TDAP کے ساتھ رجسٹر ہو کر برآمدی مراعات حاصل کرنی چاہئیں۔", steps:["Register at tdap.gov.pk","Submit proof of export business","Get TDAP registration certificate"], authority:"TDAP", phone:"021-99206450", url:"https://tdap.gov.pk", letter:b=>`To: TDAP\nSubject: Export Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"psqca", title:"PSQCA Manufacturing Licence", titleUr:"PSQCA مینوفیکچرنگ لائسنس", cat:"Licensing", sub:"Federal · Manufacturers", provinces:["All"], types:["manufacturing"], minRevM:0, minEmp:1, badge:"For regulated products", deadline:null, penalty:500000, penaltyPerDay:0, summaryEn:"Manufacturers of regulated products must get PSQCA licence. Products must meet Pakistan Standards.", summaryUr:"ریگولیٹڈ مصنوعات کے مینوفیکچررز کو PSQCA لائسنس لینا ہوگا۔", steps:["Apply at psqca.com.pk","Submit product samples for testing","Meet Pakistan Standards","Display PS mark on products"], authority:"PSQCA", phone:"051-9248916", url:"https://psqca.com.pk", letter:b=>`To: PSQCA\nSubject: Manufacturing Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"epa-punjab", title:"Environment Protection Licence — EPA", titleUr:"ماحولیاتی تحفظ لائسنس", cat:"Licensing", sub:"Punjab · Manufacturers", provinces:["Punjab"], types:["manufacturing","construction","food"], minRevM:0, minEmp:1, badge:"Before operations", deadline:null, penalty:1000000, penaltyPerDay:0, summaryEn:"Manufacturing businesses in Punjab producing emissions must get EPA licence.", summaryUr:"پنجاب میں اخراج پیدا کرنے والے مینوفیکچرنگ کاروباروں کو EPA لائسنس لینا ہوگا۔", steps:["Apply at environment.punjab.gov.pk","Conduct Environmental Impact Assessment","Install effluent treatment"], authority:"Punjab EPA", phone:"042-99205337", url:"https://environment.punjab.gov.pk", letter:b=>`To: Punjab EPA\nSubject: EPA Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"money-changer", title:"Money Changer Licence — SBP", titleUr:"منی چینجر لائسنس", cat:"Licensing", sub:"Federal · Currency exchange", provinces:["All"], types:["services","trading"], minRevM:0, minEmp:1, badge:"Before exchanging currency", deadline:null, penalty:10000000, penaltyPerDay:0, summaryEn:"Any business exchanging foreign currency must have SBP money changer licence.", summaryUr:"غیر ملکی کرنسی تبدیل کرنے والے کاروبار کو SBP لائسنس لازمی ہے۔", steps:["Apply at sbp.org.pk","Meet SBP capital requirements","Submit monthly returns to SBP"], authority:"State Bank of Pakistan", phone:"021-111-727-273", url:"https://www.sbp.org.pk", letter:b=>`To: SBP\nSubject: Money Changer Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"hajj-umrah", title:"Hajj and Umrah Operator Licence", titleUr:"حج اور عمرہ آپریٹر لائسنس", cat:"Licensing", sub:"Federal · Hajj/Umrah agents", provinces:["All"], types:["services"], minRevM:0, minEmp:1, badge:"Before operating", deadline:null, penalty:1000000, penaltyPerDay:0, summaryEn:"Any business organizing Hajj or Umrah packages must be licensed by Ministry of Religious Affairs.", summaryUr:"حج یا عمرہ پیکج منظم کرنے والے کاروبار کو وزارت مذہبی امور سے لائسنس لینا ہوگا۔", steps:["Apply at mora.gov.pk","Meet financial requirements","Register with MORA annually"], authority:"Ministry of Religious Affairs", phone:"051-9203451", url:"https://mora.gov.pk", letter:b=>`To: Ministry of Religious Affairs\nSubject: Hajj/Umrah Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"travel-agency", title:"Travel Agency Licence — IATA", titleUr:"ٹریول ایجنسی لائسنس", cat:"Licensing", sub:"Federal · Travel agencies", provinces:["All"], types:["services"], minRevM:0, minEmp:1, badge:"Before selling tickets", deadline:null, penalty:200000, penaltyPerDay:0, summaryEn:"Travel agencies selling airline tickets must be IATA accredited and registered with Civil Aviation Authority.", summaryUr:"ایئر لائن ٹکٹ فروخت کرنے والی ٹریول ایجنسیوں کو IATA سے منظور شدہ ہونا چاہیے۔", steps:["Apply for IATA accreditation","Register with Civil Aviation Authority","Maintain required financial guarantees"], authority:"Civil Aviation Authority", phone:"051-9280031", url:"https://caapakistan.com.pk", letter:b=>`To: CAA\nSubject: Travel Agency Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"security-company", title:"Private Security Company — NACTA", titleUr:"نجی سیکیورٹی کمپنی لائسنس", cat:"Licensing", sub:"Federal · Security companies", provinces:["All"], types:["services"], minRevM:0, minEmp:1, badge:"Before providing security", deadline:null, penalty:2000000, penaltyPerDay:0, summaryEn:"Private security companies must be licensed by NACTA. Guards must be trained and registered.", summaryUr:"نجی سیکیورٹی کمپنیوں کو NACTA سے لائسنس لینا ہوگا۔", steps:["Apply for NACTA security licence","Register all security guards","Ensure guards complete required training"], authority:"NACTA", phone:"051-9222742", url:"https://nacta.gov.pk", letter:b=>`To: NACTA\nSubject: Security Company Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"pemra", title:"PEMRA Broadcast Licence", titleUr:"PEMRA براڈکاسٹ لائسنس", cat:"Licensing", sub:"Federal · Media businesses", provinces:["All"], types:["services","it"], minRevM:0, minEmp:1, badge:"Before broadcasting", deadline:null, penalty:10000000, penaltyPerDay:0, summaryEn:"Any business broadcasting TV, radio, or digital content must have PEMRA licence.", summaryUr:"TV، ریڈیو، یا ڈیجیٹل مواد نشر کرنے والے کاروبار کو PEMRA لائسنس لینا ہوگا۔", steps:["Apply at pemra.gov.pk","Pay licence fee","Meet content standards"], authority:"PEMRA", phone:"051-2890882", url:"https://pemra.gov.pk", letter:b=>`To: PEMRA\nSubject: Broadcast Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"weboc", title:"WeBOC Registration — Customs", titleUr:"WeBOC رجسٹریشن", cat:"Licensing", sub:"Federal · Importers and exporters", provinces:["All"], types:["trading","manufacturing","wholesale"], minRevM:0, minEmp:1, badge:"For customs clearance", deadline:null, penalty:200000, penaltyPerDay:0, summaryEn:"All importers and exporters must register on WeBOC system. All import/export declarations filed through WeBOC.", summaryUr:"تمام درآمد اور برآمد کنندگان کو WeBOC سسٹم پر رجسٹر ہونا چاہیے۔", steps:["Register at weboc.gov.pk","Link WeBOC to NTN","File all declarations through WeBOC"], authority:"FBR Customs", phone:"051-9106916", url:"https://weboc.gov.pk", letter:b=>`To: FBR\nSubject: WeBOC Registration\n\n${b.name} (NTN: ${b.ntn||'[NTN]'}), ${b.city}\n${b.ownerName}` },
  /* ── FOOD SAFETY ── */
  { id:"pfa", title:"Punjab Food Authority (PFA) Licence", titleUr:"پنجاب فوڈ اتھارٹی لائسنس", cat:"Food Safety", sub:"Punjab · Food businesses", provinces:["Punjab"], types:["food"], minRevM:0, minEmp:1, badge:"8,000+ sealed 2025", deadline:"2025-12-31", penalty:100000, penaltyPerDay:0, summaryEn:"All Punjab food businesses must have a PFA licence. All food-handling staff need medical certificates. PFA conducts surprise inspections.", summaryUr:"تمام پنجاب فوڈ کاروباروں کو PFA لائسنس ضروری ہے۔", steps:["Apply at pfa.punjab.gov.pk","Get food handler medical certificates","Maintain temperature logs and pest control"], authority:"Punjab Food Authority", phone:"042-111-111-587", url:"https://pfa.punjab.gov.pk", letter:b=>`To: Punjab Food Authority\nSubject: PFA Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"sfa", title:"Sindh Food Authority (SFA) Licence", titleUr:"سندھ فوڈ اتھارٹی لائسنس", cat:"Food Safety", sub:"Sindh · Food businesses", provinces:["Sindh"], types:["food"], minRevM:0, minEmp:1, badge:"Before opening", deadline:"2025-12-31", penalty:100000, penaltyPerDay:0, summaryEn:"All Sindh food businesses must get SFA licence. All food handlers need medical certificates.", summaryUr:"تمام سندھ فوڈ کاروباروں کو SFA لائسنس لازمی ہے۔", steps:["Apply at sfa.gos.pk","Get food handler medical certificates","Display SFA licence at premises"], authority:"Sindh Food Authority", phone:"021-111-172-172", url:"https://sfa.gos.pk", letter:b=>`To: Sindh Food Authority\nSubject: SFA Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"kpk-food", title:"KPK Food Safety Authority Licence", titleUr:"KPK فوڈ سیفٹی اتھارٹی لائسنس", cat:"Food Safety", sub:"KPK · Food businesses", provinces:["KPK"], types:["food"], minRevM:0, minEmp:1, badge:"Before opening", deadline:"2025-12-31", penalty:50000, penaltyPerDay:0, summaryEn:"All KPK food businesses must obtain KPKFSA licence. Regular inspections of food establishments.", summaryUr:"تمام KPK فوڈ کاروباروں کو KPKFSA لائسنس لازمی ہے۔", steps:["Apply at kpkfsa.gov.pk","Ensure kitchen hygiene standards","Get food handler health certificates"], authority:"KPK Food Safety Authority", phone:"091-9210801", url:"https://kpkfsa.gov.pk", letter:b=>`To: KPK Food Safety Authority\nSubject: Licence Application\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"food-handler-cert", title:"Food Handler Medical Certificate", titleUr:"فوڈ ہینڈلر طبی سرٹیفکیٹ", cat:"Food Safety", sub:"All provinces · Food businesses", provinces:["All"], types:["food"], minRevM:0, minEmp:1, badge:"Annual renewal", deadline:"2025-12-31", penalty:50000, penaltyPerDay:0, summaryEn:"Every person handling food must have a valid medical certificate from a government hospital. Valid for 1 year. PFA sealed 400 restaurants — #1 reason was missing certificates.", summaryUr:"کھانا سنبھالنے والے ہر شخص کے پاس سرکاری ہسپتال کا طبی سرٹیفکیٹ ہونا چاہیے۔", steps:["Send all food handling staff to government hospital","Get chest X-ray and blood tests","Obtain medical fitness certificate","Renew annually"], authority:"Local Government Hospital", phone:null, url:null, letter:b=>`To: Food Authority\nSubject: Food Handler Certificates\n\n${b.name} confirms all food handlers have valid medical certificates.\n${b.ownerName}` },
  { id:"pest-control", title:"Pest Control Certificate", titleUr:"کیڑے مار دوا سرٹیفکیٹ", cat:"Food Safety", sub:"All provinces · Food businesses", provinces:["All"], types:["food"], minRevM:0, minEmp:1, badge:"Quarterly required", deadline:null, penalty:25000, penaltyPerDay:0, summaryEn:"All food businesses must have valid pest control contract with registered company. PFA and SFA inspect this during surprise visits.", summaryUr:"تمام فوڈ کاروباروں کو رجسٹرڈ کمپنی کے ساتھ کیڑے مار دوا کا معاہدہ ہونا چاہیے۔", steps:["Hire a registered pest control company","Get quarterly pest control treatment","Display pest control certificate"], authority:"Punjab Food Authority", phone:"042-111-111-587", url:"https://pfa.punjab.gov.pk", letter:b=>`To: Food Authority\nSubject: Pest Control Compliance\n\n${b.name} confirms valid pest control contract.\n${b.ownerName}` },
  { id:"halal-cert", title:"Halal Certification — PSQCA", titleUr:"حلال سرٹیفیکیشن", cat:"Food Safety", sub:"Federal · Food manufacturers", provinces:["All"], types:["food","manufacturing"], minRevM:0, minEmp:1, badge:"Required for export", deadline:null, penalty:500000, penaltyPerDay:0, summaryEn:"Food manufacturers and exporters must get Halal certification from PSQCA. Required for Muslim countries export.", summaryUr:"فوڈ مینوفیکچررز کو PSQCA سے حلال سرٹیفیکیشن لینی ہوگی۔", steps:["Apply at psqca.com.pk","Allow PSQCA inspection","Ensure all ingredients are Halal","Renew annually"], authority:"PSQCA", phone:"051-9248916", url:"https://psqca.com.pk", letter:b=>`To: PSQCA\nSubject: Halal Certification\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  /* ── MEDICAL ── */
  { id:"drap", title:"Drug Sale Licence — DRAP", titleUr:"دوائیں فروخت کرنے کا لائسنس", cat:"Medical", sub:"Federal · Pharmacies", provinces:["All"], types:["pharmacy","medical"], minRevM:0, minEmp:1, badge:"Before selling medicines", deadline:null, penalty:500000, penaltyPerDay:0, summaryEn:"Any business selling pharmaceutical drugs must have a DRAP Drug Sale Licence. A registered pharmacist must be present at all times.", summaryUr:"دوائیں فروخت کرنے والے کسی بھی کاروبار کو DRAP لائسنس ضروری ہے۔", steps:["Apply at dra.gov.pk","Hire a registered pharmacist","Display Drug Sale Licence at counter"], authority:"DRAP", phone:"051-9106316", url:"https://dra.gov.pk", letter:b=>`To: DRAP\nSubject: Drug Sale Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"pmc-clinic", title:"PMC Clinic Registration", titleUr:"PMC کلینک رجسٹریشن", cat:"Medical", sub:"Federal · Clinics", provinces:["All"], types:["medical"], minRevM:0, minEmp:1, badge:"Before opening", deadline:null, penalty:1000000, penaltyPerDay:0, summaryEn:"Every medical clinic must be registered with Pakistan Medical Commission. All doctors must have valid PMC registration.", summaryUr:"ہر میڈیکل کلینک کو PMC کے ساتھ رجسٹر ہونا چاہیے۔", steps:["Register clinic at pmc.gov.pk","Ensure all doctors have valid PMC registration","Display PMC certificate at reception"], authority:"Pakistan Medical Commission", phone:"051-111-107-107", url:"https://pmc.gov.pk", letter:b=>`To: PMC\nSubject: Clinic Registration\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  { id:"drug-storage", title:"Drug Storage Licence — Cold Chain", titleUr:"دوائیں ذخیرہ کرنے کا لائسنس", cat:"Medical", sub:"Federal · Pharmacies storing cold medicines", provinces:["All"], types:["pharmacy","medical"], minRevM:0, minEmp:1, badge:"Before storing medicines", deadline:null, penalty:200000, penaltyPerDay:0, summaryEn:"Pharmacies storing temperature-sensitive medicines must have DRAP cold chain licence. Requires refrigeration and temperature monitoring.", summaryUr:"درجہ حرارت کے لیے حساس دوائیں ذخیرہ کرنے والی فارمیسیوں کو DRAP کولڈ چین لائسنس لینا ہوگا۔", steps:["Install pharmaceutical grade refrigeration","Set up temperature monitoring system","Maintain temperature logs daily","Apply for DRAP cold chain licence"], authority:"DRAP", phone:"051-9106316", url:"https://dra.gov.pk", letter:b=>`To: DRAP\nSubject: Cold Chain Licence\n\n${b.name}, ${b.city}\n${b.ownerName}` },
  /* ── ANNUAL REMINDERS ── */
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

  /* Base matching — type, province, revenue, employees */
  const baseMatch =
    (law.provinces.includes("All") || law.provinces.includes(biz.province))
    && (law.types.includes(biz.type) || (biz.type==="pharmacy" && law.types.includes("medical")))
    && (biz.revM||0) >= (law.minRevM||0)
    && (biz.emp||1)  >= (law.minEmp||1);

  if (!baseMatch) return false;

  /* Step 4 — Business activities unlock extra laws */
  const id = law.id || "";
  const title = (law.title||"").toLowerCase();

  /* Import/export laws — only show if user imports or exports */
  const isImportLaw = id.includes("import") || id.includes("weboc") || title.includes("advance tax on import") || title.includes("import export code");
  if (isImportLaw && !biz.doesImport) return false;

  const isExportLaw = id.includes("export") || id.includes("tdap") || id.includes("form-e") || title.includes("export") || title.includes("form e");
  if (isExportLaw && !biz.doesExport && !biz.doesImport) return false;

  /* Food laws — only show if user handles food */
  const isFoodHandlingLaw = title.includes("food handler") || title.includes("pest control") || title.includes("hygiene certificate") || title.includes("halal");
  if (isFoodHandlingLaw && !biz.handlesFood && biz.type !== "food") return false;

  /* Factory laws — only show if user has a factory */
  const isFactoryLaw = title.includes("factory act") || title.includes("boiler") || id.includes("factory") || id.includes("boiler");
  if (isFactoryLaw && !biz.hasFactory) return false;

  /* Environmental laws — only show if factory */
  const isEnvLaw = title.includes("environment") || title.includes("epa");
  if (isEnvLaw && !biz.hasFactory && !biz.hasWarehouse) return false;

  /* Step 5 — Specific details */
  /* Generator/fuel storage — only if has generator */
  const isGeneratorLaw = title.includes("generator") || title.includes("petroleum storage") || title.includes("fuel storage");
  if (isGeneratorLaw && !biz.hasGenerator) return false;

  /* Signboard permit — only if has signboard */
  const isSignboardLaw = title.includes("signboard") || title.includes("outdoor advertising");
  if (isSignboardLaw && !biz.hasSignboard) return false;

  /* Gratuity — only if has long-term employees */
  const isGratuityLaw = title.includes("gratuity");
  if (isGratuityLaw && !biz.hasLongTermEmployees) return false;

  /* Boiler — only if has boiler */
  const isBoilerLaw = title.includes("boiler") || title.includes("pressure vessel");
  if (isBoilerLaw && !biz.hasBoiler) return false;

  /* Commercial vehicles — only if has vehicles */
  const isVehicleLaw = title.includes("commercial vehicle") || title.includes("route permit");
  if (isVehicleLaw && !biz.hasVehicles) return false;

  /* PSEB / Freelancer — only IT businesses */
  const isPsebLaw = title.includes("pseb") || title.includes("freelancer tax");
  if (isPsebLaw && biz.type !== "it" && biz.type !== "services") return false;

  /* PTA Telecom — only if IT/telecom */
  const isPtaLaw = title.includes("pta registration") || title.includes("telecom business");
  if (isPtaLaw && biz.type !== "it" && biz.type !== "services") return false;

  /* Money changer — only if deals in foreign currency */
  const isMoneyChangerLaw = title.includes("money changer");
  if (isMoneyChangerLaw && !biz.dealsForeignCurrency) return false;

  /* Foreign currency — only if exports or deals foreign */
  const isFxLaw = title.includes("form e") || title.includes("foreign currency");
  if (isFxLaw && !biz.doesExport && !biz.dealsForeignCurrency) return false;

  return true;
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
  darkBorder:"rgba(140,95,10,.22)",
  /* Light theme */
  card:"#ffffff", surface:"#f5f3ef", lightBorder:"#d8d2c8", lightCard:"#fdf8ef",
  /* Gold — phone-app palette */
  gold:"#8c5f0a", goldDark:"#6e4a07", goldFaint:"rgba(140,95,10,.08)",
  goldBorder:"rgba(140,95,10,.35)",
  /* Semantic */
  red:"#c0392b", redFaint:"rgba(192,57,43,.1)", redBorder:"rgba(192,57,43,.45)",
  green:"#1a7a4a", muted:"#3d3428", lightMuted:"#7a7060",
  /* Legacy compat */
  navy:"#1a1510", border:"#d8d2c8", pk:"#8c5f0a", indigo:"#8c5f0a", violet:"#6e4a07", green2:"#1a7a4a",
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
      <div style={{maxWidth:"100%",margin:"0 auto",padding:"24px 20px 60px",animation:"up .4s ease"}}>

        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:12,background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:16,padding:"10px 20px",marginBottom:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#01411C,#059669)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>✓</div>
            <div>
              <div style={{fontFamily:G.h,fontSize:26,color:"#fff",letterSpacing:"-1px",lineHeight:1}}>Paaband</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,.3)",letterSpacing:".15em",textTransform:"uppercase",marginTop:1}}>پابند · قانون</div>
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
                  <button key={tp.v} onClick={()=>upd("type",tp.v)} style={{padding:"8px 8px",borderRadius:10,border:`2px solid ${form.type===tp.v?G.indigo:G.border}`,background:form.type===tp.v?G.goldFaint:"#fff",color:form.type===tp.v?G.indigo:G.navy,fontSize:11,fontWeight:500,cursor:"pointer",textAlign:"left",fontFamily:G.b,display:"flex",alignItems:"center",gap:5,transition:"all .15s"}}>
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
                  <button key={r.v} onClick={()=>upd("regType",r.v)} style={{padding:"9px 12px",borderRadius:10,border:`2px solid ${form.regType===r.v?G.indigo:G.border}`,background:form.regType===r.v?G.goldFaint:"#fff",color:form.regType===r.v?G.indigo:G.navy,fontSize:12,fontWeight:500,cursor:"pointer",textAlign:"left",fontFamily:G.b,transition:"all .15s"}}>
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
function Dashboard({ biz, laws, allLawsCount, news, onNav, onLaw, onNews, lang, setLang, user, signOut, dark, setDark, TH, paid }) {
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
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <line x1="11" y1="2" x2="11" y2="20" stroke={TH.gold} strokeWidth="1.5"/>
                <line x1="4" y1="6" x2="18" y2="6" stroke={TH.gold} strokeWidth="1.5"/>
                <line x1="4" y1="6" x2="1" y2="13" stroke={TH.gold} strokeWidth="1"/>
                <line x1="18" y1="6" x2="21" y2="13" stroke={TH.gold} strokeWidth="1"/>
                <path d="M0 13 Q1 17 2 13" fill="none" stroke={TH.gold} strokeWidth="1"/>
                <path d="M20 13 Q21 17 22 13" fill="none" stroke={TH.gold} strokeWidth="1"/>
                <line x1="8" y1="20" x2="14" y2="20" stroke={TH.gold} strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <div style={{fontSize:16,fontWeight:500,color:TH.gold,letterSpacing:".5px"}}>Paaband</div>
              <div style={{fontSize:9,color:TH.text3,letterSpacing:".15em",textTransform:"uppercase"}}>پابند · قانون</div>
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

        {/* Greeting + avatar */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div>
            <div style={{fontSize:22,fontWeight:800,color:TH.text,letterSpacing:"-.5px",marginBottom:3}}>
              {(()=>{const h=new Date().getHours();return h<12?"Good morning":h<17?"Good afternoon":"Good evening"})()}, {(biz?.ownerName||biz?.name||"").split(" ")[0]}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:TH.text3}}>
              <i className={`ti ${icon}`} style={{fontSize:14,color:TH.gold}}/>
              {biz?.typeLabel||""} · {biz?.city||""}
            </div>
          </div>
          <div style={{width:40,height:40,borderRadius:20,background:`linear-gradient(135deg,${TH.gold},${TH.goldFaint})`,border:`2px solid ${TH.border2}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>{(biz?.ownerName||biz?.name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}</span>
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
          ].map(q=>(
            <div key={q.nav} onClick={()=>onNav(q.nav)} style={{background:TH.bg,border:`0.5px solid ${TH.border}`,borderRadius:14,padding:"16px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
              <i className={`ti ${q.icon}`} style={{fontSize:24,color:TH.gold,flexShrink:0}}/>
              <span style={{fontSize:13,color:TH.text2}}>{q.label}</span>
            </div>
          ))}
        </div>

        {/* Upgrade banner for free users */}
        {!paid && allLawsCount > 5 && (
          <div onClick={()=>onNav("upgrade")} style={{background:`linear-gradient(135deg,${TH.gold},${TH.goldFaint})`,borderRadius:14,padding:"14px 16px",marginBottom:16,cursor:"pointer",display:"flex",gap:12,alignItems:"center"}}>
            <i className="ti ti-crown" style={{fontSize:24,color:"#000",flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:"#000",marginBottom:2}}>
                {allLawsCount-5} more laws hidden — Upgrade to Pro
              </div>
              <div style={{fontSize:11,color:"rgba(0,0,0,.6)"}}>PKR 999/month · All {allLawsCount} laws unlocked</div>
            </div>
            <i className="ti ti-arrow-right" style={{fontSize:18,color:"#000"}}/>
          </div>
        )}

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
          const isDone = (() => { try { return localStorage.getItem(`paaband_done_${law.id}`) === "true"; } catch(e){ return false; } })();
          const catIcon={Tax:"ti-receipt-tax",Labour:"ti-moneybag","Food Safety":"ti-tools-kitchen-2",Licensing:"ti-license",Operations:"ti-clock",Medical:"ti-medical-cross"}[law.cat]||"ti-scale";
          return (
            <div key={law.id} onClick={()=>onLaw(law)} style={{background:TH.bg,border:isDone?`0.5px solid rgba(5,150,105,.3)`:urg?`1px solid ${TH.redBorder}`:`0.5px solid ${TH.border}`,borderRadius:14,padding:"14px 16px",marginBottom:10,display:"flex",gap:14,alignItems:"center",cursor:"pointer",boxShadow:urg&&!isDone?`0 0 0 3px ${TH.redFaint}`:"none",opacity:isDone?.7:1}}>
              <div style={{width:44,height:44,borderRadius:12,background:isDone?"rgba(5,150,105,.08)":urg?TH.redFaint:TH.goldFaint,border:`1px solid ${isDone?"rgba(5,150,105,.2)":urg?TH.redBorder:TH.border2}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <i className={`ti ${isDone?"ti-circle-check":catIcon}`} style={{fontSize:22,color:isDone?"#059669":urg?TH.red:TH.gold}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:500,color:TH.text,marginBottom:3,lineHeight:1.3}}>
                  {lang==="ur"?law.titleUr:law.title}
                </div>
                <div style={{fontSize:11,color:TH.text3}}>{law.sub}</div>
                {isDone && <div style={{fontSize:11,color:"#059669",marginTop:3}}>✓ Marked as complied</div>}
                {urg && !isDone && (
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

      </div>
    </div>
  );
}
/* ── PAGE HEADER ──────────────────────────────────────────── */
function PageHeader({ title, sub, icon, onBack, TH }) {
  return (
    <div style={{background:TH.bg,padding:"16px 18px 18px",borderBottom:`0.5px solid ${TH.border}`,flexShrink:0}}>
      <button onClick={onBack} style={{background:"transparent",border:`0.5px solid ${TH.border2}`,color:TH.gold,borderRadius:8,padding:"5px 12px",cursor:"pointer",fontSize:12,marginBottom:12,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
        <i className="ti ti-arrow-left" style={{fontSize:14}}/> Back
      </button>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:40,height:40,borderRadius:11,border:`0.5px solid ${TH.border2}`,background:TH.goldFaint,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <i className={`ti ${icon}`} style={{fontSize:22,color:TH.gold}}/>
        </div>
        <div>
          <div style={{fontSize:18,fontWeight:500,color:TH.text,letterSpacing:"-.3px"}}>{title}</div>
          {sub && <div style={{fontSize:10,color:TH.text3,marginTop:2}}>{sub}</div>}
        </div>
      </div>
    </div>
  );
}

/* ── LAW BOOK ─────────────────────────────────────────────── */
function LawBook({ biz, onSelect, lang, allLaws, onNav, TH }) {
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
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:TH.bg,direction:lang==="ur"?"rtl":"ltr"}}>
      <div style={{background:TH.bg,padding:"16px 18px 14px",flexShrink:0,borderBottom:`0.5px solid ${TH.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:36,height:36,borderRadius:10,border:"0.5px solid rgba(201,168,76,.25)",background:TH.goldFaint,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <i className="ti ti-scale" style={{fontSize:20,color:TH.gold}}/>
          </div>
          <div>
            <div style={{fontSize:17,fontWeight:500,color:TH.text}}>{t.lawBook}</div>
            <div style={{fontSize:9,color:TH.text3}}>{allLaws.length} laws · tap any to read</div>
          </div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:10}}>
          {[["mine",`${t.myLawsTab} (${myLaws.length})`],["all",`All (${allLaws.length})`]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{padding:"6px 14px",borderRadius:20,border:`0.5px solid ${view===v?TH.gold:TH.border}`,background:view===v?TH.goldFaint:"transparent",color:view===v?TH.gold:TH.text3,fontSize:10,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>{l}</button>
          ))}
        </div>
        <div style={{position:"relative"}}>
          <i className="ti ti-search" style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",fontSize:15,color:TH.text3}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search} style={{width:"100%",padding:"9px 12px 9px 33px",borderRadius:10,border:`0.5px solid ${TH.border}`,background:TH.bg2,color:TH.text2,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:5,overflowX:"auto",padding:"10px 16px",background:TH.bg2,borderBottom:`0.5px solid ${TH.border}`,flexShrink:0}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{padding:"5px 12px",borderRadius:20,border:`0.5px solid ${cat===c?TH.gold:TH.border}`,background:cat===c?TH.goldFaint:"transparent",color:cat===c?TH.gold:TH.text3,fontSize:10,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",flexShrink:0}}>{c}</button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 16px 20px",background:TH.bg2}}>
        {filtered.map(law=>{
          const d=daysUntil(law.deadline); const urg=d!==null&&d<60;
          const isMine=matchLaw(law,biz);
          const ci = catIcon[law.cat]||"ti-scale";
          return (
            <div key={law.id} onClick={()=>onSelect(law)} style={{background:TH.bg2,border:urg?`1px solid ${TH.redBorder}`:`0.5px solid ${TH.border}`,boxShadow:urg?`0 0 0 2px ${TH.redFaint}`:"none",borderRadius:12,padding:"12px 14px",marginBottom:8,cursor:"pointer",display:"flex",gap:11,alignItems:"center"}}>
              <div style={{width:36,height:36,borderRadius:10,background:urg?"rgba(239,68,68,.08)":"rgba(201,168,76,.08)",border:`0.5px solid ${urg?"rgba(239,68,68,.3)":"rgba(201,168,76,.25)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <i className={`ti ${ci}`} style={{fontSize:18,color:urg?TH.red:TH.gold}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",gap:6,marginBottom:2}}>
                  <div style={{fontSize:12,fontWeight:500,color:isMine?TH.text:TH.text2,lineHeight:1.3}}>{lang==="ur"?law.titleUr:law.title}</div>
                  {isMine && <span style={{fontSize:8,background:"rgba(201,168,76,.1)",color:TH.gold,border:"0.5px solid rgba(201,168,76,.2)",borderRadius:6,padding:"2px 6px",fontWeight:500,flexShrink:0,alignSelf:"flex-start"}}>{t.applies}</span>}
                </div>
                <div style={{fontSize:9,color:TH.text3,marginBottom:urg?3:0}}>{law.sub}</div>
                {urg && <div style={{fontSize:9,color:TH.red,fontWeight:500}}><i className="ti ti-alert-triangle" style={{fontSize:9,verticalAlign:"-1px",marginRight:3}}/>{d>0?`${d} days`:"Overdue"} · PKR {(law.penalty||0).toLocaleString()} fine</div>}
              </div>
              <i className="ti ti-chevron-right" style={{fontSize:15,color:TH.text3,flexShrink:0}}/>
            </div>
          );
        })}
        {filtered.length===0 && <div style={{textAlign:"center",padding:"40px 20px",color:TH.text3}}><i className="ti ti-search" style={{fontSize:32,display:"block",marginBottom:10,color:TH.text3}}/><div style={{fontSize:13}}>No laws found</div></div>}
      </div>
    </div>
  );
}

/* ── LAW DETAIL ───────────────────────────────────────────── */
function LawDetail({ law, biz, onBack, lang, TH }) {
  const t = T[lang];
  const [tab, setTab] = useState("about");
  const [chks, setChks] = useState(()=>{
    try { return JSON.parse(localStorage.getItem(`paaband_chk_${law.id}`)||"[]") || (law.steps||[]).map(()=>false); } catch(e){ return (law.steps||[]).map(()=>false); }
  });
  const [done, setDone] = useState(()=>{
    try { return localStorage.getItem(`paaband_done_${law.id}`) === "true"; } catch(e){ return false; }
  });
  const [copied, setCopied] = useState(false);
  const stepsCompleted = chks.filter(Boolean).length;
  const total = (law.steps||[]).length;
  const d = daysUntil(law.deadline);
  const urg = !done && d!==null && d<60;
  const catIcon = {Tax:"ti-receipt-tax",Labour:"ti-moneybag","Food Safety":"ti-tools-kitchen-2",Licensing:"ti-license",Operations:"ti-clock",Medical:"ti-medical-cross"}[law.cat]||"ti-scale";

  const toggleStep = (i) => {
    const n = [...chks]; n[i]=!n[i];
    setChks(n);
    try { localStorage.setItem(`paaband_chk_${law.id}`, JSON.stringify(n)); } catch(e){}
  };

  const markDone = () => {
    const newDone = !done;
    setDone(newDone);
    try { localStorage.setItem(`paaband_done_${law.id}`, newDone?"true":"false"); } catch(e){}
  };

  /* Build why it applies */
  const reasons = [];
  if (law.provinces.includes("All")) reasons.push({icon:"ti-world",text:"Federal law — applies to all provinces in Pakistan"});
  else reasons.push({icon:"ti-map-pin",text:`Applies in ${law.provinces.join(", ")} — your business is in ${biz.province}`});
  if (law.types.includes(biz.type)) reasons.push({icon:"ti-building-store",text:`Applies to ${biz.typeLabel||biz.type} businesses — that is your business type`});
  if ((law.minRevM||0)>0) reasons.push({icon:"ti-currency-rupee",text:`Required for businesses with revenue above PKR ${(law.minRevM*1000000).toLocaleString()} — your revenue qualifies`});
  if ((law.minEmp||1)>1) reasons.push({icon:"ti-users",text:`Required for businesses with ${law.minEmp}+ employees — your business has ${biz.emp}+ employees`});
  if ((law.minRevM||0)===0 && (law.minEmp||1)===1 && law.types.includes(biz.type)) reasons.push({icon:"ti-check",text:"Applies to every business of your type — no minimum size required"});

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:TH.bg,direction:lang==="ur"?"rtl":"ltr"}}>
      {/* Header */}
      <div style={{background:TH.bg,padding:"16px 18px 14px",borderBottom:`0.5px solid ${TH.border}`,flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <button onClick={onBack} style={{background:"transparent",border:`0.5px solid ${TH.border2}`,color:TH.gold,borderRadius:8,padding:"5px 12px",cursor:"pointer",fontSize:12,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
            <i className="ti ti-arrow-left" style={{fontSize:14}}/> {t.back}
          </button>
          {/* Mark as Done toggle */}
          <button onClick={markDone} style={{background:done?"rgba(5,150,105,.1)":TH.goldFaint,border:`1px solid ${done?"rgba(5,150,105,.3)":TH.border2}`,color:done?"#059669":TH.gold,borderRadius:8,padding:"5px 14px",cursor:"pointer",fontSize:12,fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,fontWeight:500}}>
            <i className={`ti ${done?"ti-circle-check":"ti-circle"}`} style={{fontSize:15}}/>
            {done ? "Complied ✓" : "Mark Complied"}
          </button>
        </div>

        <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:10}}>
          <div style={{width:46,height:46,borderRadius:12,border:`0.5px solid ${done?"rgba(5,150,105,.3)":urg?"rgba(239,68,68,.4)":TH.border2}`,background:done?"rgba(5,150,105,.08)":urg?"rgba(239,68,68,.08)":TH.goldFaint,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <i className={`ti ${catIcon}`} style={{fontSize:22,color:done?"#059669":urg?TH.red:TH.gold}}/>
          </div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
              <span style={{fontSize:10,background:done?"rgba(5,150,105,.1)":urg?TH.redFaint:TH.goldFaint,color:done?"#059669":urg?TH.red:TH.gold,border:`0.5px solid ${done?"rgba(5,150,105,.3)":urg?TH.redBorder:TH.border2}`,borderRadius:5,padding:"1px 7px",fontWeight:500}}>{law.cat}</span>
              {done && <span style={{fontSize:10,background:"rgba(5,150,105,.1)",color:"#059669",border:"0.5px solid rgba(5,150,105,.2)",borderRadius:5,padding:"1px 7px",fontWeight:500}}>✓ Complied</span>}
              {urg && !done && <span style={{fontSize:10,background:TH.redFaint,color:TH.red,border:`0.5px solid ${TH.redBorder}`,borderRadius:5,padding:"1px 7px",fontWeight:500}}>⚠ Urgent</span>}
            </div>
            <div style={{fontSize:15,fontWeight:500,color:TH.text,lineHeight:1.3,marginBottom:6}}>{lang==="ur"?law.titleUr:law.title}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {law.penalty>0 && <span style={{fontSize:10,border:`0.5px solid ${TH.redBorder}`,color:TH.red,borderRadius:6,padding:"2px 8px",fontWeight:500}}>Fine: PKR {law.penalty.toLocaleString()}</span>}
              {law.deadline && !done && <span style={{fontSize:10,border:`0.5px solid ${TH.border2}`,color:TH.gold,borderRadius:6,padding:"2px 8px"}}>{d!==null&&d>0?`${d} days left`:d===0?"Due today!":d!==null&&d<0?"Overdue":law.deadline}</span>}
            </div>
          </div>
        </div>

        {law.phone && (
          <a href={`tel:${law.phone}`} style={{display:"flex",alignItems:"center",gap:8,background:TH.bg2,border:`0.5px solid ${TH.border}`,borderRadius:8,padding:"7px 12px",textDecoration:"none",marginBottom:6}}>
            <i className="ti ti-phone" style={{fontSize:14,color:TH.gold}}/>
            <span style={{fontSize:11,color:TH.text2}}>{law.phone}</span>
            {law.url && <span style={{fontSize:11,color:TH.gold,marginLeft:"auto"}}>{law.url} →</span>}
          </a>
        )}

        <div style={{background:TH.goldFaint,border:`0.5px solid ${TH.border2}`,borderRadius:8,padding:"6px 12px",fontSize:10,color:"rgba(201,168,76,.7)"}}>
          <i className="ti ti-info-circle" style={{fontSize:11,verticalAlign:"-1px",marginRight:5}}/>
          {lang==="ur"?"ہمیشہ اپنے اکاؤنٹنٹ سے تصدیق کریں۔":"Always verify with your CA. Laws change — Paaband shows best available info."}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",background:TH.bg,borderBottom:`0.5px solid ${TH.border}`,flexShrink:0}}>
        {[["about","About","ti-info-circle"],["why","Why Me","ti-help-circle"],["steps","Steps","ti-list-check"],["letter","Letter","ti-file-text"]].map(([id,lbl,ic])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"11px 2px",border:"none",borderBottom:`2px solid ${tab===id?TH.gold:"transparent"}`,background:"transparent",color:tab===id?TH.gold:TH.text3,fontSize:10,fontWeight:tab===id?600:400,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
            <i className={`ti ${ic}`} style={{fontSize:13}}/>{lbl}
          </button>
        ))}
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 30px",background:TH.bg2}}>

        {/* ABOUT TAB */}
        {tab==="about" && (
          <div>
            <div style={{background:TH.bg,border:`0.5px solid ${TH.border}`,borderRadius:12,padding:16,marginBottom:14,fontSize:13,color:TH.text2,lineHeight:1.9}}>
              {lang==="ur"?law.summaryUr:law.summaryEn}
            </div>
            {law.penalty>0 && (
              <div style={{background:TH.redFaint,border:`0.5px solid ${TH.redBorder}`,borderRadius:12,padding:"12px 14px",marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:500,color:TH.red,marginBottom:6}}>
                  <i className="ti ti-alert-triangle" style={{fontSize:12,marginRight:5,verticalAlign:"-1px"}}/>Penalty for non-compliance
                </div>
                <div style={{fontSize:20,fontWeight:500,color:TH.red}}>PKR {law.penalty.toLocaleString()}</div>
                {law.penaltyPerDay>0 && <div style={{fontSize:11,color:TH.red,opacity:.7,marginTop:3}}>+ PKR {law.penaltyPerDay.toLocaleString()} per day overdue</div>}
              </div>
            )}
          </div>
        )}

        {/* WHY ME TAB */}
        {tab==="why" && (
          <div>
            <div style={{background:TH.bg,border:`0.5px solid ${TH.border}`,borderRadius:12,padding:14,marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:500,color:TH.gold,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
                <i className="ti ti-help-circle" style={{fontSize:14}}/>
                Why this law applies to {biz.name}
              </div>
              {reasons.map((r,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<reasons.length-1?`0.5px solid ${TH.border}`:"none",alignItems:"flex-start"}}>
                  <div style={{width:30,height:30,borderRadius:8,background:TH.goldFaint,border:`0.5px solid ${TH.border2}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <i className={`ti ${r.icon}`} style={{fontSize:14,color:TH.gold}}/>
                  </div>
                  <span style={{fontSize:13,color:TH.text2,lineHeight:1.6,paddingTop:4}}>{r.text}</span>
                </div>
              ))}
            </div>
            <div style={{background:TH.bg,border:`0.5px solid ${TH.border}`,borderRadius:12,padding:14}}>
              <div style={{fontSize:11,fontWeight:500,color:TH.text3,marginBottom:10,textTransform:"uppercase",letterSpacing:".08em"}}>Your profile that matched</div>
              {[
                ["Business type", biz.typeLabel||biz.type],
                ["Province", biz.province],
                ["City", biz.city],
                ["Monthly revenue", biz.revLabel||"—"],
                ["Employees", biz.empLabel||"—"],
              ].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`0.5px solid ${TH.border}`,fontSize:12}}>
                  <span style={{color:TH.text3}}>{k}</span>
                  <span style={{color:TH.text,fontWeight:500}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEPS TAB */}
        {tab==="steps" && (
          <div>
            <div style={{background:TH.bg,border:`0.5px solid ${TH.border}`,borderRadius:12,padding:12,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:12,fontWeight:500,color:TH.gold}}>{stepsCompleted} / {total} steps done</span>
                <span style={{fontSize:12,color:TH.text3}}>{total?Math.round((stepsCompleted/total)*100):0}%</span>
              </div>
              <div style={{height:6,background:TH.bg3,borderRadius:3,overflow:"hidden"}}>
                <div style={{width:`${total?(stepsCompleted/total)*100:0}%`,height:"100%",background:TH.gold,borderRadius:3,transition:"width .3s"}}/>
              </div>
            </div>
            {(law.steps||[]).map((step,i)=>(
              <div key={i} onClick={()=>toggleStep(i)} style={{display:"flex",gap:12,padding:"14px",marginBottom:6,background:chks[i]?TH.goldFaint:TH.bg,border:`0.5px solid ${chks[i]?TH.border2:TH.border}`,borderRadius:12,cursor:"pointer"}}>
                <div style={{width:24,height:24,borderRadius:7,border:`1.5px solid ${chks[i]?TH.gold:TH.border}`,background:chks[i]?TH.gold:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                  {chks[i] && <i className="ti ti-check" style={{fontSize:13,color:"#000"}}/>}
                </div>
                <div style={{flex:1}}>
                  <span style={{fontSize:13,color:chks[i]?TH.text3:TH.text,textDecoration:chks[i]?"line-through":"none",lineHeight:1.6}}>{step}</span>
                </div>
              </div>
            ))}
            {total===0 && <div style={{textAlign:"center",padding:24,color:TH.text3,fontSize:13}}>No steps available for this law.</div>}
          </div>
        )}

        {/* LETTER TAB */}
        {tab==="letter" && (
          <div>
            {law.letter ? <>
              <div style={{background:TH.goldFaint,border:`0.5px solid ${TH.border2}`,borderRadius:10,padding:12,marginBottom:12,fontSize:11,color:"rgba(201,168,76,.8)"}}>
                <i className="ti ti-bulb" style={{fontSize:12,marginRight:5,verticalAlign:"-1px"}}/>Pre-filled with your business details. Replace anything in [BRACKETS].
              </div>
              <div style={{background:TH.bg,border:`0.5px solid ${TH.border}`,borderRadius:12,padding:16,marginBottom:12,fontSize:12,color:TH.text2,lineHeight:2,whiteSpace:"pre-wrap",fontFamily:"'DM Mono',monospace"}}>{law.letter(biz)}</div>
              <button onClick={()=>{navigator.clipboard.writeText(law.letter(biz));setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:copied?TH.bg3:`linear-gradient(135deg,${TH.gold},${TH.goldFaint})`,color:copied?TH.gold:"#000",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <i className={`ti ${copied?"ti-check":"ti-copy"}`} style={{fontSize:16}}/>{copied?"Copied!":"Copy Letter"}
              </button>
            </> : (
              <div style={{textAlign:"center",padding:32,color:TH.text3,fontSize:13}}>
                <i className="ti ti-file-x" style={{fontSize:32,display:"block",marginBottom:10,color:TH.text3}}/>
                No letter template for this law.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


/* ── NEWS FEED ────────────────────────────────────────────── */
function NewsFeed({ biz, onSelect, lang, TH }) {
  const [filter, setFilter] = useState("all");
  const applicable = NEWS.filter(n=>matchNews(n,biz));
  const notAppl = NEWS.filter(n=>!matchNews(n,biz));
  const cats = ["all",...[...new Set(NEWS.map(n=>n.cat))]];
  const shown = filter==="all" ? applicable : applicable.filter(n=>n.cat===filter);
  return (
    <div style={{height:"100vh",overflowY:"auto",fontFamily:"inherit",background:TH.bg,direction:lang==="ur"?"rtl":"ltr"}}>
      <div style={{background:TH.bg,padding:"16px 18px 0",position:"sticky",top:0,zIndex:20,borderBottom:`0.5px solid ${TH.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <i className="ti ti-news" style={{fontSize:22,color:TH.gold}}/>
            <div style={{fontSize:17,fontWeight:500,color:TH.text}}>News Feed</div>
          </div>
          <div style={{fontSize:9,color:TH.text3,border:`0.5px solid ${TH.border}`,borderRadius:6,padding:"3px 8px"}}>🇵🇰 Pakistan</div>
        </div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:12}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setFilter(c)} style={{padding:"5px 13px",borderRadius:20,border:`0.5px solid ${filter===c?TH.gold:TH.border}`,background:filter===c?TH.goldFaint:"transparent",color:filter===c?TH.gold:TH.text3,fontSize:10,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",flexShrink:0}}>
              {c==="all"?(lang==="ur"?"سب":"All"):c}
            </button>
          ))}
        </div>
      </div>
      <div style={{paddingBottom:80}}>
        {shown.map(n=><NewsCard key={n.id} n={n} biz={biz} onClick={()=>onSelect(n)} lang={lang} TH={TH}/>)}
        {notAppl.length>0 && <>
          <div style={{padding:"12px 18px",fontSize:9,color:TH.text3,fontWeight:500,textTransform:"uppercase",letterSpacing:".1em"}}>Not affecting your business</div>
          {notAppl.map(n=>(
            <div key={n.id} style={{background:TH.bg,margin:"0 0 1px",padding:"12px 16px",display:"flex",gap:12,alignItems:"center",opacity:.35}}>
              <div style={{width:44,height:44,borderRadius:8,background:`url(${n.img}) center/cover`,flexShrink:0}}/>
              <div>
                <div style={{fontSize:11,fontWeight:500,color:TH.text,marginBottom:1}}>{lang==="ur"?n.headlineUr:n.headline}</div>
                <div style={{fontSize:9,color:TH.text3}}>{n.source}</div>
              </div>
            </div>
          ))}
        </>}
      </div>
    </div>
  );
}

function NewsCard({ n, biz, onClick, lang, TH }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(n.likes);
  return (
    <div style={{background:TH.bg,marginBottom:1,borderBottom:`0.5px solid ${TH.border}`}}>
      <div style={{padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:TH.goldFaint,border:"0.5px solid rgba(201,168,76,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <i className="ti ti-news" style={{fontSize:16,color:TH.gold}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:12,fontWeight:500,color:TH.text2}}>{n.source}</div>
          <div style={{fontSize:9,color:TH.text3}}>{n.h}h ago · Pakistan</div>
        </div>
        <div style={{fontSize:8,background:TH.goldFaint,color:TH.gold,border:"0.5px solid rgba(201,168,76,.2)",padding:"2px 8px",borderRadius:6,fontWeight:500}}>{n.cat}</div>
      </div>
      <div onClick={onClick} style={{width:"100%",aspectRatio:"16/9",background:`url(${n.img}) center/cover`,cursor:"pointer",position:"relative"}}>
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.9)",padding:"24px 16px 14px"}}>
          <div style={{fontSize:16,fontWeight:500,color:TH.text,lineHeight:1.35}}>{lang==="ur"?n.headlineUr:n.headline}</div>
        </div>
      </div>
      <div style={{padding:"10px 16px 4px",display:"flex",gap:14,alignItems:"center"}}>
        <button onClick={e=>{e.stopPropagation();setLiked(l=>!l);setLikes(l=>liked?l-1:l+1);}} style={{background:"none",border:"none",cursor:"pointer",padding:0,color:liked?TH.gold:TH.text3}}>
          <i className={`ti ${liked?"ti-heart-filled":"ti-heart"}`} style={{fontSize:22}}/>
        </button>
        <button onClick={onClick} style={{background:"none",border:"none",cursor:"pointer",padding:0,color:TH.text3}}>
          <i className="ti ti-message-circle" style={{fontSize:22}}/>
        </button>
        <button style={{background:"none",border:"none",cursor:"pointer",padding:0,color:TH.text3}}>
          <i className="ti ti-share" style={{fontSize:22}}/>
        </button>
      </div>
      <div style={{padding:"2px 16px 8px",fontSize:11,fontWeight:500,color:TH.text2}}>{likes.toLocaleString()} interested</div>
      <div style={{padding:"0 16px",display:"flex",gap:6,marginBottom:10}}>
        {n.stats.map((s,i)=>(
          <div key={i} style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,borderRadius:8,padding:"6px 8px",flex:1,textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:500,color:TH.gold}}>{s.n}</div>
            <div style={{fontSize:8,color:TH.text3,marginTop:1}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div onClick={onClick} style={{margin:"0 16px 14px",background:TH.bg2,border:"0.5px solid rgba(201,168,76,.15)",borderRadius:10,padding:"10px 13px",cursor:"pointer"}}>
        <div style={{fontSize:8,color:TH.text3,textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>What to do — {biz.name}</div>
        <div style={{fontSize:11,color:TH.text2,lineHeight:1.6}}>{lang==="ur"?n.actionUr:n.action}</div>
        <div style={{fontSize:9,color:TH.gold,marginTop:5,fontWeight:500}}>Read full article <i className="ti ti-arrow-right" style={{fontSize:9,verticalAlign:"-1px"}}/></div>
      </div>
    </div>
  );
}

/* ── NEWS DETAIL ──────────────────────────────────────────── */
function NewsDetail({ news: n, biz, onBack, lang, TH }) {
  return (
    <div style={{height:"100vh",overflowY:"auto",fontFamily:"inherit",background:TH.bg,direction:lang==="ur"?"rtl":"ltr"}}>
      <div style={{height:240,background:`url(${n.img}) center/cover`,position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 30%,#060606)"}}/>
        <button onClick={onBack} style={{position:"absolute",top:16,left:16,background:"rgba(0,0,0,.6)",border:"0.5px solid rgba(201,168,76,.3)",color:TH.gold,borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:12,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
          <i className="ti ti-arrow-left" style={{fontSize:14}}/> Back
        </button>
        <div style={{position:"absolute",bottom:16,left:18,right:18}}>
          <div style={{fontSize:8,background:"rgba(201,168,76,.25)",color:TH.gold,border:"0.5px solid rgba(201,168,76,.3)",borderRadius:6,padding:"2px 8px",display:"inline-block",marginBottom:8,fontWeight:500}}>{n.cat}</div>
          <div style={{fontSize:18,fontWeight:500,color:TH.text,lineHeight:1.35}}>{lang==="ur"?n.headlineUr:n.headline}</div>
          <div style={{fontSize:10,color:TH.text2,marginTop:5}}>{n.source} · {n.h}h ago</div>
        </div>
      </div>
      <div style={{padding:"16px 18px 100px"}}>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${n.stats.length},1fr)`,gap:8,marginBottom:16}}>
          {n.stats.map((s,i)=>(
            <div key={i} style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,borderRadius:10,padding:"11px",textAlign:"center"}}>
              <div style={{fontSize:17,fontWeight:500,color:TH.gold}}>{s.n}</div>
              <div style={{fontSize:9,color:TH.text3,marginTop:3}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:13,color:TH.text2,lineHeight:1.8,marginBottom:16}}>{lang==="ur"?n.captionUr:n.caption}</div>
        <div style={{background:TH.goldFaint,border:"0.5px solid rgba(201,168,76,.2)",borderRadius:12,padding:"14px"}}>
          <div style={{fontSize:11,fontWeight:500,color:TH.gold,marginBottom:7}}>
            <i className="ti ti-circle-check" style={{fontSize:13,marginRight:5,verticalAlign:"-1px"}}/>Action for {biz.name}
          </div>
          <div style={{fontSize:13,color:TH.text2,lineHeight:1.75}}>{lang==="ur"?n.actionUr:n.action}</div>
        </div>
      </div>
    </div>
  );
}

/* ── COMPLIANCE CALENDAR ──────────────────────────────────── */
function ComplianceCalendar({ laws, lang, onNav, TH }) {
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
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:TH.bg,direction:lang==="ur"?"rtl":"ltr"}}>
      <PageHeader title={t.calTitle} sub={t.calSub} icon="ti-calendar-event" onBack={()=>onNav("dash")} TH={TH}/>
      <div style={{background:TH.bg2,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`0.5px solid ${TH.border}`,flexShrink:0}}>
        <button onClick={()=>{if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1);}} style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,color:TH.gold,borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>‹</button>
        <span style={{fontSize:14,fontWeight:500,color:TH.text}}>{MONTHS[month]} {year}</span>
        <button onClick={()=>{if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1);}} style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,color:TH.gold,borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>›</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 16px 80px",background:TH.bg2}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:16}}>
          {["S","M","T","W","T","F","S"].map((d,i)=><div key={i} style={{textAlign:"center",fontSize:9,fontWeight:500,color:TH.text3,padding:"4px 0"}}>{d}</div>)}
          {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
          {Array.from({length:daysInMonth}).map((_,i)=>{
            const day=i+1;
            const hasDeadline=thisMonth.some(d=>d.day===day);
            const isToday=day===now.getDate()&&month===now.getMonth()&&year===now.getFullYear();
            return (
              <div key={day} style={{textAlign:"center",padding:"7px 2px",borderRadius:8,background:hasDeadline?"rgba(239,68,68,.1)":isToday?"rgba(201,168,76,.1)":"transparent",border:hasDeadline?"0.5px solid rgba(239,68,68,.3)":isToday?"0.5px solid rgba(201,168,76,.3)":"none"}}>
                <span style={{fontSize:11,fontWeight:isToday||hasDeadline?500:400,color:hasDeadline?TH.red:isToday?TH.gold:TH.text3}}>{day}</span>
                {hasDeadline&&<div style={{width:4,height:4,borderRadius:"50%",background:"#ef4444",margin:"2px auto 0"}}/>}
              </div>
            );
          })}
        </div>
        <div style={{fontSize:9,fontWeight:500,color:TH.text3,marginBottom:10,textTransform:"uppercase",letterSpacing:".1em"}}>{deadlines.length===0?t.noDeadlines:`${deadlines.length} deadlines`}</div>
        {deadlines.sort((a,b)=>a.date-b.date).map(law=>{
          const d=daysUntil(law.deadline);
          const passed=d!==null&&d<0; const near=d!==null&&d>=0&&d<=14;
          return (
            <div key={law.id} style={{background:TH.bg2,border:passed||near?`1px solid ${passed?"rgba(239,68,68,.4)":"rgba(201,168,76,.25)"}`:"0.5px solid #161616",borderRadius:12,padding:"13px 14px",marginBottom:8,display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:36,height:36,borderRadius:10,background:passed?"rgba(239,68,68,.08)":near?"rgba(201,168,76,.08)":"#111111",border:`0.5px solid ${passed?"rgba(239,68,68,.3)":near?"rgba(201,168,76,.25)":"#1e1e1e"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <i className="ti ti-calendar-event" style={{fontSize:18,color:passed?TH.red:near?TH.gold:TH.text3}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:500,color:TH.text2,marginBottom:2}}>{lang==="ur"?law.titleUr:law.title}</div>
                <div style={{fontSize:9,color:TH.text3}}>{new Date(law.deadline).toLocaleDateString("en-PK",{day:"numeric",month:"long",year:"numeric"})}</div>
                <div style={{fontSize:9,fontWeight:500,color:passed?TH.red:near?TH.gold:TH.text3,marginTop:2}}>
                  {passed?"Overdue":d===0?"Today!!!":`${d} days left`}
                </div>
              </div>
              <a href={gcalLink(law)} target="_blank" rel="noreferrer" style={{fontSize:9,background:TH.goldFaint,color:TH.gold,border:"0.5px solid rgba(201,168,76,.2)",borderRadius:7,padding:"4px 9px",textDecoration:"none",fontWeight:500,flexShrink:0,display:"flex",alignItems:"center",gap:4}}>
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
function FineCalculator({ laws, lang, onNav, TH }) {
  const t = T[lang];
  const [selId, setSelId] = useState("");
  const [days, setDays] = useState(0);
  const [history, setHistory] = useState([]);
  const lawsWithPenalty = laws.filter(l=>l.penalty>0);
  const sel = lawsWithPenalty.find(l=>l.id===selId);
  const fine = sel ? Math.round(sel.penalty + (sel.penaltyPerDay||0)*days) : 0;
  const calc = () => { if(sel&&days>0) setHistory(h=>[{law:lang==="ur"?sel.titleUr:sel.title,days,fine,date:new Date().toLocaleDateString()},...h.slice(0,4)]); };

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:TH.bg,direction:lang==="ur"?"rtl":"ltr"}}>
      <PageHeader title={t.fineTitle} sub={t.fineSub} icon="ti-calculator" onBack={()=>onNav("dash")} TH={TH}/>
      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 80px",background:TH.bg2}}>
        <div style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,borderRadius:14,padding:18,marginBottom:14}}>
          <label style={{fontSize:10,fontWeight:500,color:TH.text3,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".08em"}}>{t.selectLaw}</label>
          <select value={selId} onChange={e=>setSelId(e.target.value)} style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`0.5px solid ${TH.border}`,background:TH.bg3,color:TH.text2,fontSize:12,fontFamily:"inherit",outline:"none",appearance:"none",marginBottom:14}}>
            <option value="">{lang==="ur"?"قانون منتخب کریں…":"Select a law…"}</option>
            {lawsWithPenalty.map(l=><option key={l.id} value={l.id}>{lang==="ur"?l.titleUr:l.title}</option>)}
          </select>
          <label style={{fontSize:10,fontWeight:500,color:TH.text3,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".08em"}}>{t.daysOverdue}</label>
          <input type="number" min="0" max="1825" value={days} onChange={e=>setDays(Math.max(0,parseInt(e.target.value)||0))} style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`0.5px solid ${TH.border}`,background:TH.bg3,color:TH.text,fontSize:12,fontFamily:"inherit",outline:"none",marginBottom:14}}/>
          <button onClick={calc} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#C9A84C,#B8922A)",color:"#000",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <i className="ti ti-calculator" style={{fontSize:16}}/>{lang==="ur"?"جرمانہ حساب کریں":"Calculate Fine"}
          </button>
        </div>
        {sel && days>0 && (
          <div style={{background:TH.bg2,border:`1px solid ${fine>100000?"rgba(239,68,68,.4)":"rgba(201,168,76,.3)"}`,borderRadius:14,padding:"20px 18px",marginBottom:14,textAlign:"center"}}>
            <div style={{fontSize:10,color:TH.text3,marginBottom:8,textTransform:"uppercase",letterSpacing:".1em"}}>{t.yourFine}</div>
            <div style={{fontSize:36,fontWeight:500,color:fine>100000?"#ef4444":"#C9A84C",letterSpacing:"-1px"}}>PKR {fine.toLocaleString()}</div>
            <div style={{fontSize:10,color:TH.text3,marginTop:6}}>{lang==="ur"?sel.titleUr:sel.title} · {days} days overdue</div>
            {sel.penaltyPerDay>0 && <div style={{fontSize:9,color:TH.text3,marginTop:4}}>Daily penalty: PKR {sel.penaltyPerDay.toLocaleString()}</div>}
          </div>
        )}
        {sel && days===0 && <div style={{background:TH.goldFaint,border:"0.5px solid rgba(201,168,76,.15)",borderRadius:12,padding:16,textAlign:"center",fontSize:12,color:TH.gold}}><i className="ti ti-circle-check" style={{fontSize:18,display:"block",marginBottom:6}}/>{t.notOverdue}</div>}
        {history.length>0 && (
          <div>
            <div style={{fontSize:9,fontWeight:500,color:TH.text3,marginBottom:8,marginTop:10,textTransform:"uppercase",letterSpacing:".1em"}}>Recent calculations</div>
            {history.map((h,i)=>(
              <div key={i} style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,borderRadius:11,padding:"11px 14px",marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,fontWeight:500,color:TH.text2}}>{h.law}</div>
                  <div style={{fontSize:9,color:TH.text3}}>{h.days} days · {h.date}</div>
                </div>
                <div style={{fontSize:14,fontWeight:500,color:TH.red}}>PKR {h.fine.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── DOCUMENT SCANNER ─────────────────────────────────────── */
function DocScanner({ lang, onNav, TH }) {
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
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:TH.bg,direction:lang==="ur"?"rtl":"ltr"}}>
      <PageHeader title={t.scanTitle} sub="Claude AI reads your licence automatically" icon="ti-scan" onBack={()=>onNav("dash")}/>
      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 80px",background:TH.bg2}}>
        <div onClick={()=>fileRef.current?.click()} style={{background:TH.bg2,border:"1px dashed #1a1a1a",borderRadius:14,padding:"32px 20px",textAlign:"center",marginBottom:16,cursor:"pointer"}}>
          <i className="ti ti-cloud-upload" style={{fontSize:44,color:TH.text3,display:"block",marginBottom:12}}/>
          <div style={{fontSize:14,fontWeight:500,color:TH.text2,marginBottom:6}}>{t.upload}</div>
          <div style={{fontSize:11,color:TH.text3,marginBottom:4}}>Trade Licence · PFA · NTN · EOBI · Any govt doc</div>
          <div style={{fontSize:10,color:TH.text3}}>Claude AI extracts the expiry date</div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:"none"}}/>
        </div>
        {state==="scanning" && (
          <div style={{background:TH.bg2,border:"0.5px solid rgba(201,168,76,.2)",borderRadius:12,padding:24,textAlign:"center"}}>
            <div style={{width:40,height:40,border:"2px solid #1a1a1a",borderTopColor:"#C9A84C",borderRadius:"50%",animation:"spin .7s linear infinite",margin:"0 auto 14px"}}/>
            <div style={{fontSize:14,fontWeight:500,color:TH.gold,marginBottom:4}}>Claude AI is reading your document…</div>
            <div style={{fontSize:11,color:TH.text3}}>Extracting licence type, expiry date, and authority</div>
          </div>
        )}
        {state==="done" && result && (
          <div style={{marginBottom:14}}>
            <div style={{background:TH.bg2,border:`1px solid ${result.isExpired?"rgba(239,68,68,.4)":result.daysLeft!==null&&result.daysLeft<30?"rgba(201,168,76,.3)":"rgba(201,168,76,.25)"}`,borderRadius:14,padding:18,marginBottom:10}}>
              <div style={{fontSize:13,fontWeight:500,color:result.isExpired?"#ef4444":result.daysLeft!==null&&result.daysLeft<30?"#C9A84C":"#C9A84C",marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
                <i className={`ti ${result.isExpired?"ti-alert-circle":"ti-circle-check"}`} style={{fontSize:16}}/>
                {result.isExpired?"EXPIRED — Renew immediately":result.daysLeft!==null&&result.daysLeft<30?"Expiring soon":"Valid document"}
              </div>
              {[["Document type",result.docType],["Business name",result.bizName],["Issued by",result.authority],["Licence number",result.licenceNo],["City",result.city],["Expiry date",result.expDate],[result.daysLeft!==null?"Days remaining":null,result.daysLeft!==null?(result.daysLeft>0?`${result.daysLeft} days`:`Expired ${Math.abs(result.daysLeft)} days ago`):null]].filter(([k,v])=>k&&v).map(([k,v],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`0.5px solid ${TH.border}`,fontSize:12}}>
                  <span style={{color:TH.text3}}>{k}</span>
                  <span style={{color:TH.text2,fontWeight:500,textAlign:"right",maxWidth:"60%"}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize:10,color:TH.text3,textAlign:"center"}}>
              <i className="ti ti-info-circle" style={{fontSize:10,marginRight:4,verticalAlign:"-1px"}}/>Always verify with the original document.
            </div>
          </div>
        )}
        {docs.length>0 && (
          <div>
            <div style={{fontSize:9,fontWeight:500,color:TH.text3,marginBottom:8,textTransform:"uppercase",letterSpacing:".1em"}}>
              <i className="ti ti-files" style={{fontSize:11,color:TH.gold,marginRight:5,verticalAlign:"-1px"}}/>Scanned documents
            </div>
            {docs.map((d,i)=>(
              <div key={i} style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,borderRadius:11,padding:"11px 13px",marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,fontWeight:500,color:TH.text2}}>{d.docType||d.name}</div>
                  <div style={{fontSize:9,color:TH.text3}}>Expires: {d.expDate} · {d.scanned}</div>
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
function FindCA({ biz, lang, onNav, TH }) {
  const t = T[lang];
  const nearby = CA_LISTINGS.filter(ca=>ca.city===biz.city).concat(CA_LISTINGS.filter(ca=>ca.city!==biz.city)).slice(0,6);
  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:TH.bg,direction:lang==="ur"?"rtl":"ltr"}}>
      <PageHeader title={t.caTitle} sub={`${t.caSub} · ${biz.city}`} icon="ti-user-check" onBack={()=>onNav("dash")}/>
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px 80px",background:TH.bg2}}>
        <div style={{background:TH.goldFaint,border:"0.5px solid rgba(201,168,76,.15)",borderRadius:10,padding:"10px 13px",marginBottom:14,fontSize:11,color:"rgba(201,168,76,.7)"}}>
          <i className="ti ti-info-circle" style={{fontSize:12,marginRight:5,verticalAlign:"-1px"}}/>Confirm fees before engaging. City-matched shown first.
        </div>
        {nearby.map((ca,i)=>(
          <div key={i} style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,borderRadius:14,padding:"15px 16px",marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:38,height:38,borderRadius:10,background:TH.goldFaint,border:"0.5px solid rgba(201,168,76,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <i className="ti ti-user-tie" style={{fontSize:19,color:TH.gold}}/>
                </div>
                <div>
                  <div style={{fontSize:12,fontWeight:500,color:TH.text2,marginBottom:1}}>{ca.name}</div>
                  <div style={{fontSize:9,color:TH.text3}}>{ca.area}, {ca.city}</div>
                </div>
              </div>
              <span style={{fontSize:8,background:TH.goldFaint,color:TH.gold,border:"0.5px solid rgba(201,168,76,.2)",borderRadius:6,padding:"2px 7px",fontWeight:500}}>Verified</span>
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
              <span style={{fontSize:9,background:TH.bg3,color:TH.text2,border:`0.5px solid ${TH.border}`,borderRadius:6,padding:"2px 8px"}}>{ca.speciality}</span>
              <span style={{fontSize:9,background:TH.bg3,color:TH.text2,border:`0.5px solid ${TH.border}`,borderRadius:6,padding:"2px 8px"}}>{ca.fee}</span>
              <span style={{fontSize:9,background:TH.bg3,color:TH.text2,border:`0.5px solid ${TH.border}`,borderRadius:6,padding:"2px 8px"}}>⭐ {ca.rating} ({ca.reviews})</span>
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
function ComplianceKit({ laws, biz, lang, onNav, TH }) {
  const t = T[lang];
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const lawsWithLetters = laws.filter(l=>l.letter);
  const kit = lawsWithLetters.map(l=>`════════════════════\n${lang==="ur"?l.titleUr:l.title}\n════════════════════\n\n${l.letter(biz)}\n\n`).join("\n");

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:TH.bg,direction:lang==="ur"?"rtl":"ltr"}}>
      <PageHeader title={t.kitTitle} sub={t.kitSub} icon="ti-package" onBack={()=>onNav("dash")}/>
      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 80px",background:TH.bg2}}>
        {!generated ? (
          <div>
            <div style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,borderRadius:14,padding:18,marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:500,color:TH.text3,marginBottom:12,textTransform:"uppercase",letterSpacing:".1em"}}>This kit includes</div>
              {lawsWithLetters.map((l,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"center",padding:"9px 0",borderBottom:i<lawsWithLetters.length-1?"0.5px solid #111":"none"}}>
                  <div style={{width:30,height:30,borderRadius:8,background:TH.goldFaint,border:"0.5px solid rgba(201,168,76,.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <i className="ti ti-file-text" style={{fontSize:15,color:TH.gold}}/>
                  </div>
                  <div>
                    <div style={{fontSize:11,fontWeight:500,color:TH.text2}}>{lang==="ur"?l.titleUr:l.title}</div>
                    <div style={{fontSize:9,color:TH.text3}}>Pre-filled compliance letter</div>
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
            <div style={{background:TH.goldFaint,border:"0.5px solid rgba(201,168,76,.2)",borderRadius:12,padding:14,marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
              <i className="ti ti-circle-check" style={{fontSize:24,color:TH.gold}}/>
              <div>
                <div style={{fontSize:12,fontWeight:500,color:TH.gold}}>{t.kitReady}</div>
                <div style={{fontSize:10,color:TH.text3}}>{lawsWithLetters.length} letters · {biz.name}</div>
              </div>
            </div>
            <button onClick={()=>{navigator.clipboard.writeText(kit);setCopied(true);setTimeout(()=>setCopied(false),2500);}} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:copied?TH.bg3:`linear-gradient(135deg,${TH.gold},${TH.goldFaint})`,color:copied?TH.gold:"#000",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <i className={`ti ${copied?"ti-check":"ti-copy"}`} style={{fontSize:16}}/>{copied?`${lang==="ur"?"کاپی ہو گئی!":"Copied!"}`:t.copyAll}
            </button>
            <div style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,borderRadius:12,padding:"14px 16px",maxHeight:300,overflowY:"auto"}}>
              <pre style={{fontSize:10,color:TH.text2,lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"'DM Mono',monospace",margin:0}}>{kit}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── PROFILE ──────────────────────────────────────────────── */
function ProfileScreen({ biz, onUpdate, lang, TH }) {
  const t = T[lang];
  const [d, setD] = useState({...biz});
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const upd = (k,v) => setD(p=>({...p,[k]:v}));
  const toggleLic = l => setD(p=>({...p,licences:p.licences.includes(l)?p.licences.filter(x=>x!==l):[...p.licences,l]}));
  const save = () => {
    onUpdate({...d,typeLabel:bl(d.type,"en"),revLabel:REV_BANDS.find(b=>b.v===d.revM)?.l||"",empLabel:EMP_BANDS.find(b=>b.v===d.emp)?.l||""});
    setSaved(true); setEditing(false); setTimeout(()=>setSaved(false),2200);
  };
  const inp = {width:"100%",padding:"11px 13px",borderRadius:10,border:`1px solid ${TH.border}`,background:TH.bg,color:TH.text,fontSize:13,fontFamily:"inherit",outline:"none",marginBottom:12,boxSizing:"border-box"};
  const sel = {...inp,appearance:"none",cursor:"pointer"};
  const initials = (biz.ownerName||biz.name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  const Row = ({label, value}) => (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:`1px solid ${TH.border}`}}>
      <span style={{fontSize:13,color:TH.text3}}>{label}</span>
      <span style={{fontSize:13,color:TH.text,fontWeight:500,textAlign:"right",maxWidth:"60%"}}>{value||"—"}</span>
    </div>
  );

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"inherit",background:TH.bg2,direction:lang==="ur"?"rtl":"ltr"}}>
      {/* Header */}
      <div style={{background:TH.bg,padding:"20px 18px 16px",borderBottom:`1px solid ${TH.border}`,flexShrink:0}}>
        <div style={{fontSize:20,fontWeight:600,color:TH.text,marginBottom:2}}>Profile</div>
        <div style={{fontSize:12,color:TH.text3}}>Your business details</div>
      </div>

      <div style={{flex:1,overflowY:"auto",paddingBottom:100}}>

        {/* Avatar card */}
        <div style={{background:TH.bg,marginBottom:10,padding:"20px 18px",display:"flex",alignItems:"center",gap:14,borderBottom:`1px solid ${TH.border}`}}>
          <div style={{width:54,height:54,borderRadius:27,background:`linear-gradient(135deg,${TH.gold},${TH.goldFaint})`,border:`2px solid ${TH.border2}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontSize:20,fontWeight:700,color:"#fff"}}>{initials}</span>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:16,fontWeight:600,color:TH.text,marginBottom:2}}>{biz.ownerName||"—"}</div>
            <div style={{fontSize:12,color:TH.text3}}>{biz.designation} · {biz.name}</div>
            <div style={{fontSize:11,color:TH.text3,marginTop:2}}>{biz.city}, {biz.province}</div>
          </div>
        </div>

        {/* Business details card */}
        <div style={{background:TH.bg,marginBottom:10,padding:"0 18px",borderBottom:`1px solid ${TH.border}`,borderTop:`1px solid ${TH.border}`}}>
          <div style={{fontSize:11,fontWeight:600,color:TH.gold,textTransform:"uppercase",letterSpacing:".08em",padding:"14px 0 8px"}}>Business Details</div>
          <Row label="Business Name" value={biz.name}/>
          <Row label="Type" value={bl(biz.type,lang)}/>
          <Row label="Revenue" value={biz.revLabel}/>
          <Row label="Employees" value={biz.empLabel}/>
          <Row label="NTN" value={biz.ntn||"Not registered"}/>
          <Row label="Phone" value={biz.phone}/>
          <div style={{paddingBottom:4}}/>
        </div>

        {/* Licences card */}
        <div style={{background:TH.bg,marginBottom:10,padding:"0 18px",borderBottom:`1px solid ${TH.border}`,borderTop:`1px solid ${TH.border}`}}>
          <div style={{fontSize:11,fontWeight:600,color:TH.gold,textTransform:"uppercase",letterSpacing:".08em",padding:"14px 0 10px"}}>Your Licences</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,paddingBottom:14}}>
            {(biz.licences||[]).length===0
              ? <span style={{fontSize:12,color:TH.text3}}>None added yet</span>
              : (biz.licences||[]).map(l=>(
                <span key={l} style={{fontSize:11,background:TH.goldFaint,color:TH.gold,border:`1px solid ${TH.border2}`,borderRadius:20,padding:"4px 12px",fontWeight:500}}>{l}</span>
              ))
            }
          </div>
        </div>

        {/* Edit section */}
        {!editing ? (
          <div style={{padding:"0 18px"}}>
            <button onClick={()=>setEditing(true)} style={{width:"100%",padding:"14px",borderRadius:12,border:`1px solid ${TH.border2}`,background:TH.goldFaint,color:TH.gold,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:10}}>
              ✏️ Edit Profile
            </button>
          </div>
        ) : (
          <div style={{background:TH.bg,padding:"16px 18px",borderTop:`1px solid ${TH.border}`,borderBottom:`1px solid ${TH.border}`}}>
            <div style={{fontSize:13,fontWeight:600,color:TH.text,marginBottom:14}}>Edit Details</div>
            {[{l:"Business name",k:"name"},{l:"Owner name",k:"ownerName"},{l:"Phone",k:"phone"},{l:"NTN",k:"ntn"}].map(f=>(
              <div key={f.k}>
                <label style={{fontSize:11,fontWeight:500,color:TH.text3,display:"block",marginBottom:4}}>{f.l}</label>
                <input value={d[f.k]||""} onChange={e=>upd(f.k,e.target.value)} style={inp}/>
              </div>
            ))}
            <label style={{fontSize:11,fontWeight:500,color:TH.text3,display:"block",marginBottom:4}}>{t.bizType}</label>
            <select value={d.type} onChange={e=>upd("type",e.target.value)} style={sel}>
              {BIZ_TYPES.map(tp=><option key={tp.v} value={tp.v}>{lang==="ur"?tp.lUr:tp.l}</option>)}
            </select>
            <label style={{fontSize:11,fontWeight:500,color:TH.text3,display:"block",marginBottom:4}}>{t.province}</label>
            <select value={d.province} onChange={e=>{upd("province",e.target.value);upd("city","");}} style={sel}>
              {PROVINCES.map(p=><option key={p}>{p}</option>)}
            </select>
            <label style={{fontSize:11,fontWeight:500,color:TH.text3,display:"block",marginBottom:4}}>{t.city}</label>
            <select value={d.city} onChange={e=>upd("city",e.target.value)} style={sel}>
              {(CITIES[d.province]||[]).map(c=><option key={c}>{c}</option>)}
            </select>
            <label style={{fontSize:11,fontWeight:500,color:TH.text3,display:"block",marginBottom:4}}>{t.revenue}</label>
            <select value={d.revM} onChange={e=>upd("revM",parseFloat(e.target.value))} style={sel}>
              {REV_BANDS.map(b=><option key={b.v} value={b.v}>{lang==="ur"?b.lUr:b.l}</option>)}
            </select>
            <label style={{fontSize:11,fontWeight:500,color:TH.text3,display:"block",marginBottom:4}}>{t.employees}</label>
            <select value={d.emp} onChange={e=>upd("emp",parseInt(e.target.value))} style={{...sel,marginBottom:14}}>
              {EMP_BANDS.map(b=><option key={b.v} value={b.v}>{lang==="ur"?b.lUr:b.l}</option>)}
            </select>
            <label style={{fontSize:11,fontWeight:500,color:TH.text3,display:"block",marginBottom:8}}>{t.licences}</label>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
              {LICENCE_TYPES.map(l=>(
                <div key={l} onClick={()=>toggleLic(l)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,border:`1px solid ${d.licences.includes(l)?TH.border2:TH.border}`,background:d.licences.includes(l)?TH.goldFaint:TH.bg,cursor:"pointer"}}>
                  <div style={{width:18,height:18,borderRadius:5,border:`2px solid ${d.licences.includes(l)?TH.gold:TH.border}`,background:d.licences.includes(l)?TH.gold:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {d.licences.includes(l) && <span style={{color:"#fff",fontSize:11,fontWeight:700}}>✓</span>}
                  </div>
                  <span style={{fontSize:12,color:d.licences.includes(l)?TH.gold:TH.text2}}>{l}</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setEditing(false)} style={{flex:1,padding:"13px",borderRadius:12,border:`1px solid ${TH.border}`,background:"transparent",color:TH.text3,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
              <button onClick={save} style={{flex:2,padding:"13px",borderRadius:12,border:"none",background:`linear-gradient(135deg,${TH.gold},${TH.goldFaint})`,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                {saved ? "✓ Saved!" : t.updateSave}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


/* ── UPGRADE SCREEN ───────────────────────────────────────── */
function UpgradeScreen({ lang, TH, onActivate, onBack }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleActivate = () => {
    if (!code.trim()) { setError("Enter your licence code"); return; }
    const ok = onActivate(code);
    if (ok) { setSuccess(true); setError(""); }
    else { setError("Invalid code. Check and try again."); }
  };

  if (success) return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:TH.bg,padding:32,textAlign:"center"}}>
      <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(201,168,76,.1)",border:`1px solid ${TH.border2}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
        <i className="ti ti-check" style={{fontSize:36,color:TH.gold}}/>
      </div>
      <div style={{fontSize:24,fontWeight:500,color:TH.text,marginBottom:8}}>Paaband Pro Activated!</div>
      <div style={{fontSize:14,color:TH.text2,marginBottom:32,lineHeight:1.7}}>You now have access to all {`56`} laws, full calendar, and fine calculator.</div>
      <button onClick={onBack} style={{padding:"14px 32px",borderRadius:12,border:"none",background:`linear-gradient(135deg,${TH.gold},${TH.goldFaint})`,color:"#000",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
        Go to Dashboard
      </button>
    </div>
  );

  return (
    <div style={{height:"100vh",overflowY:"auto",background:TH.bg,fontFamily:"inherit"}}>
      {/* Header */}
      <div style={{background:TH.bg,padding:"20px 20px 0",borderBottom:`0.5px solid ${TH.border}`}}>
        <button onClick={onBack} style={{background:"transparent",border:`0.5px solid ${TH.border2}`,color:TH.gold,borderRadius:8,padding:"5px 12px",cursor:"pointer",fontSize:12,marginBottom:16,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
          <i className="ti ti-arrow-left" style={{fontSize:14}}/> Back
        </button>
      </div>

      <div style={{padding:"24px 20px 80px"}}>
        {/* Hero */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:64,height:64,borderRadius:16,background:TH.goldFaint,border:`1px solid ${TH.border2}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
            <i className="ti ti-crown" style={{fontSize:30,color:TH.gold}}/>
          </div>
          <div style={{fontSize:26,fontWeight:500,color:TH.text,marginBottom:6}}>Paaband Pro</div>
          <div style={{fontSize:14,color:TH.text2,lineHeight:1.7}}>Unlock all 56 laws and premium features</div>
        </div>

        {/* Price */}
        <div style={{background:TH.bg2,border:`1px solid ${TH.border2}`,borderRadius:14,padding:20,marginBottom:16,textAlign:"center"}}>
          <div style={{fontSize:36,fontWeight:500,color:TH.gold,letterSpacing:"-1px"}}>PKR 999</div>
          <div style={{fontSize:12,color:TH.text3,marginTop:4}}>per month · cancel anytime</div>
        </div>

        {/* Features */}
        <div style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,borderRadius:14,padding:18,marginBottom:20}}>
          {[
            ["ti-scale","All 56 Pakistan laws unlocked"],
            ["ti-calendar-event","Full compliance calendar"],
            ["ti-calculator","Fine calculator — all laws"],
            ["ti-bell","Deadline reminders (coming soon)"],
            ["ti-file-text","Pre-filled government letters"],
            ["ti-refresh","Lifetime updates — new laws added free"],
          ].map(([icon,text],i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<5?`0.5px solid ${TH.border}`:"none"}}>
              <i className={`ti ${icon}`} style={{fontSize:18,color:TH.gold,flexShrink:0,width:20}}/>
              <span style={{fontSize:13,color:TH.text2}}>{text}</span>
            </div>
          ))}
        </div>

        {/* Pay button */}
        <a href="https://paaband.gumroad.com/l/pro" target="_blank" rel="noreferrer" style={{display:"block",width:"100%",padding:"15px",borderRadius:12,background:`linear-gradient(135deg,${TH.gold},${TH.goldFaint})`,color:"#000",fontSize:15,fontWeight:600,textAlign:"center",textDecoration:"none",marginBottom:20,fontFamily:"inherit"}}>
          <i className="ti ti-credit-card" style={{fontSize:16,marginRight:8,verticalAlign:"-2px"}}/>
          Pay PKR 999 — Get Licence Code
        </a>

        {/* Divider */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <div style={{flex:1,height:"0.5px",background:TH.border}}/>
          <span style={{fontSize:11,color:TH.text3}}>Already have a code?</span>
          <div style={{flex:1,height:"0.5px",background:TH.border}}/>
        </div>

        {/* Licence code input */}
        <div style={{background:TH.bg2,border:`0.5px solid ${TH.border}`,borderRadius:14,padding:18}}>
          <label style={{fontSize:11,fontWeight:500,color:TH.text3,display:"block",marginBottom:8,textTransform:"uppercase",letterSpacing:".08em"}}>Enter licence code</label>
          <input
            value={code}
            onChange={e=>{ setCode(e.target.value.toUpperCase()); setError(""); }}
            placeholder="e.g. PAAB-2025-PRO"
            style={{width:"100%",padding:"12px 14px",borderRadius:10,border:`0.5px solid ${error?TH.red:TH.border}`,background:TH.bg,color:TH.text,fontSize:14,fontFamily:"'DM Mono',monospace",outline:"none",marginBottom:10,letterSpacing:"1px"}}
          />
          {error && <div style={{fontSize:11,color:TH.red,marginBottom:10}}><i className="ti ti-alert-circle" style={{fontSize:12,marginRight:4,verticalAlign:"-1px"}}/>{error}</div>}
          <button onClick={handleActivate} style={{width:"100%",padding:"13px",borderRadius:10,border:`1px solid ${TH.border2}`,background:"transparent",color:TH.gold,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <i className="ti ti-key" style={{fontSize:15}}/>Activate Licence
          </button>
        </div>

        <div style={{textAlign:"center",marginTop:16,fontSize:11,color:TH.text3,lineHeight:1.8}}>
          Questions? WhatsApp: <span style={{color:TH.gold}}>+92 300 0000000</span><br/>
          Your data is never sold or shared.
        </div>
      </div>
    </div>
  );
}

/* ── AUTH SCREEN ──────────────────────────────────────────── */
function AuthScreen({ TH, lang, setLang, onSuccess, onSkip }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleGoogle = async () => {
    setGLoading(true); setError("");
    const { error } = await supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo: window.location.origin } });
    if (error) { setError(error.message); setGLoading(false); }
  };

  const handleSubmit = async () => {
    setError(""); setSuccess("");
    if (!email.trim()) { setError("Enter your email"); return; }
    if (mode !== "forgot" && password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (mode === "signup" && !name.trim()) { setError("Enter your name"); return; }
    setLoading(true);
    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) { setError(error.message); setLoading(false); return; }
        onSuccess(data.user);
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options:{ data:{ name } } });
        if (error) { setError(error.message); setLoading(false); return; }
        if (data.user) onSuccess(data.user);
        else setSuccess("Check your email to confirm your account, then log in.");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin });
        if (error) { setError(error.message); } else { setSuccess("Password reset email sent. Check your inbox."); }
      }
    } catch(e) { setError("Something went wrong. Check your internet."); }
    setLoading(false);
  };

  const inp = { width:"100%", padding:"13px 14px", borderRadius:10, border:`1px solid ${TH.border}`, background:TH.bg, color:TH.text, fontSize:14, fontFamily:"inherit", outline:"none", marginBottom:12 };
  const Spinner = () => <div style={{width:18,height:18,border:"2px solid rgba(0,0,0,.2)",borderTopColor:"currentColor",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>;

  return (
    <div style={{height:"100vh",overflowY:"auto",background:TH.bg,fontFamily:"inherit"}}>
      <div style={{padding:"48px 24px 40px"}}>

        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(135deg,${TH.gold},${TH.goldFaint})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
            <svg width="28" height="28" viewBox="0 0 22 22" fill="none">
              <line x1="11" y1="2" x2="11" y2="20" stroke="#fff" strokeWidth="1.8"/>
              <line x1="4" y1="6" x2="18" y2="6" stroke="#fff" strokeWidth="1.8"/>
              <line x1="4" y1="6" x2="1" y2="13" stroke="#fff" strokeWidth="1.2"/>
              <line x1="18" y1="6" x2="21" y2="13" stroke="#fff" strokeWidth="1.2"/>
              <path d="M0 13 Q1 17 2 13" fill="none" stroke="#fff" strokeWidth="1.2"/>
              <path d="M20 13 Q21 17 22 13" fill="none" stroke="#fff" strokeWidth="1.2"/>
              <line x1="8" y1="20" x2="14" y2="20" stroke="#fff" strokeWidth="1.8"/>
            </svg>
          </div>
          <div style={{fontSize:24,fontWeight:700,color:TH.text,letterSpacing:"-.5px"}}>Paaband</div>
          <div style={{fontSize:11,color:TH.text3,marginTop:2}}>Pakistan Business Compliance</div>
        </div>

        {/* Google button */}
        <button onClick={handleGoogle} disabled={gLoading} style={{width:"100%",padding:"14px",borderRadius:12,border:`1px solid ${TH.border}`,background:TH.bg,color:TH.text,fontSize:14,fontWeight:500,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16,boxShadow:`0 1px 3px rgba(0,0,0,.08)`}}>
          {gLoading ? <Spinner/> : <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.59-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>}
          {gLoading ? "Signing in…" : "Continue with Google"}
        </button>

        {/* Divider */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <div style={{flex:1,height:"1px",background:TH.border}}/>
          <span style={{fontSize:12,color:TH.text3}}>or use email</span>
          <div style={{flex:1,height:"1px",background:TH.border}}/>
        </div>

        {/* Email form */}
        <div style={{background:TH.bg2,border:`1px solid ${TH.border}`,borderRadius:16,padding:"20px 16px",marginBottom:16}}>
          {mode==="signup" && <input value={name} onChange={e=>{setName(e.target.value);setError("");}} placeholder="Your full name" style={inp}/>}
          <input value={email} onChange={e=>{setEmail(e.target.value);setError("");}} placeholder="Email address" type="email" style={inp}/>
          {mode !== "forgot" && (
            <div style={{position:"relative",marginBottom:12}}>
              <input value={password} onChange={e=>{setPassword(e.target.value);setError("");}} placeholder="Password" type={showPass?"text":"password"} style={{...inp,marginBottom:0,paddingRight:46}}/>
              <button onClick={()=>setShowPass(s=>!s)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:TH.text3}}>
                <i className={`ti ${showPass?"ti-eye-off":"ti-eye"}`} style={{fontSize:18}}/>
              </button>
            </div>
          )}
          {error && <div style={{fontSize:12,color:TH.red,marginBottom:10,padding:"8px 12px",background:TH.redFaint,border:`1px solid ${TH.redBorder}`,borderRadius:8}}>{error}</div>}
          {success && <div style={{fontSize:12,color:"#1a7a4a",marginBottom:10,padding:"8px 12px",background:"rgba(26,122,74,.08)",border:"1px solid rgba(26,122,74,.2)",borderRadius:8}}>{success}</div>}
          <button onClick={handleSubmit} disabled={loading} style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:`linear-gradient(135deg,${TH.gold},${TH.goldFaint})`,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8,opacity:loading?.7:1}}>
            {loading ? <><Spinner/> Please wait…</> : mode==="login"?"Sign In":mode==="signup"?"Create Account":"Send Reset Link"}
          </button>
        </div>

        {/* Mode switcher */}
        <div style={{textAlign:"center"}}>
          {mode==="login" && <>
            <button onClick={()=>{setMode("forgot");setError("");setSuccess("");}} style={{background:"none",border:"none",color:TH.gold,fontSize:13,cursor:"pointer",fontFamily:"inherit",display:"block",width:"100%",marginBottom:10}}>Forgot password?</button>
            <button onClick={()=>{setMode("signup");setError("");setSuccess("");}} style={{background:"none",border:"none",color:TH.text3,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>No account? <span style={{color:TH.gold,fontWeight:600}}>Sign up free</span></button>
          </>}
          {mode==="signup" && <button onClick={()=>{setMode("login");setError("");setSuccess("");}} style={{background:"none",border:"none",color:TH.text3,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Already registered? <span style={{color:TH.gold,fontWeight:600}}>Sign in</span></button>}
          {mode==="forgot" && <button onClick={()=>{setMode("login");setError("");setSuccess("");}} style={{background:"none",border:"none",color:TH.gold,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>← Back to sign in</button>}
        </div>

        <div style={{textAlign:"center",marginTop:24,fontSize:11,color:TH.text3,lineHeight:1.8}}>
          🔒 Your data is never sold or shared
        </div>
      </div>
    </div>
  );
}

/* ── BOTTOM NAV ───────────────────────────────────────────── */
function BottomNav({ active, onNav, urgentCount, newsCount, lang, TH }) {
  const t = T[lang];
  const tabs = [
    {id:"dash",    emoji:"🏠", label:t.home},
    {id:"news",    emoji:"📰", label:t.news,   badge:newsCount},
    {id:"laws",    emoji:"⚖️", label:t.laws,   badge:urgentCount},
    {id:"profile", emoji:"👤", label:t.profile},
  ];
  return (
    <div style={{background:TH.bg,borderTop:`0.5px solid ${TH.border}`,display:"flex",padding:"10px 0 14px",flexShrink:0}}>
      {tabs.map(tab=>(
        <button key={tab.id} onClick={()=>onNav(tab.id)} style={{flex:1,background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative",padding:"2px 0"}}>
          <span style={{fontSize:22,opacity:active===tab.id?1:0.45,lineHeight:1}}>{tab.emoji}</span>
          <span style={{fontSize:10,fontWeight:active===tab.id?700:400,color:active===tab.id?TH.gold:TH.text3,fontFamily:"inherit"}}>{tab.label}</span>
          {active===tab.id && <div style={{position:"absolute",bottom:-14,width:16,height:2,background:TH.gold,borderRadius:1}}/>}
          {(tab.badge||0)>0 && <span style={{position:"absolute",top:0,right:"14%",background:TH.red,color:"#fff",fontSize:8,fontWeight:700,borderRadius:8,padding:"1px 4px",minWidth:13,textAlign:"center"}}>{tab.badge}</span>}
        </button>
      ))}
    </div>
  );
}

/* ── ROOT ─────────────────────────────────────────────────── */
/* Valid licence codes — add new ones here when someone pays */
const VALID_CODES = ["PAAB-2025-PRO","PAAB-1111","PAAB-2222","PAAB-3333","PAAB-4444","PAAB-5555"];

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
  const [paid, setPaid] = useState(false); /* Always checked from server */
  const [dark, setDark] = useState(()=>{
    try { const s = localStorage.getItem("paaband_dark"); return s === null ? false : s === "true"; } catch(e){ return false; }
  });

  /* Save dark mode preference */
  useEffect(()=>{
    try { localStorage.setItem("paaband_dark", dark ? "true" : "false"); } catch(e){}
  }, [dark]);

  /* Check paid status from Supabase whenever user changes */
  useEffect(()=>{
    if (!user) { setPaid(false); return; }
    supabase.from("user_profiles").select("paid").eq("id", user.id).single()
      .then(({ data }) => {
        if (data && data.paid === true) setPaid(true);
        else setPaid(false);
      }).catch(()=>setPaid(false));
  }, [user]);

  /* Activate licence — saves to Supabase AND locally */
  const activateLicence = async (code) => {
    const clean = code.trim().toUpperCase();
    if (!VALID_CODES.includes(clean)) return false;
    if (user) {
      await supabase.from("user_profiles").upsert({ id: user.id, paid: true, licence_code: clean, paid_at: new Date().toISOString() });
    }
    setPaid(true);
    try { localStorage.setItem("paaband_paid","true"); } catch(e){}
    return true;
  };

  /* Load saved profile from localStorage on first open */
  useEffect(()=>{
    try {
      const saved = localStorage.getItem("paaband_biz");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.type && parsed.province) {
          setBiz(parsed);
        }
      }
    } catch(e){}
    setReady(true);
  }, []);

  /* Theme colours — passed to all components */
  const TH = dark ? {
    bg:"#060606", bg2:"#0c0c0c", bg3:"#111111",
    border:"#1e1e1e", border2:"rgba(201,168,76,.25)",
    text:"#ffffff", text2:"#cccccc", text3:"#888888",
    gold:"#C9A84C", goldFaint:"rgba(201,168,76,.08)",
    red:"#ef4444", redFaint:"rgba(239,68,68,.08)", redBorder:"rgba(239,68,68,.4)",
  } : {
    bg:"#f5f3ef", bg2:"#ffffff", bg3:"#edeae4",
    border:"#d8d2c8", border2:"rgba(140,95,10,.35)",
    text:"#1a1510", text2:"#3d3428", text3:"#7a7060",
    gold:"#8c5f0a", goldFaint:"rgba(140,95,10,.08)",
    red:"#c0392b", redFaint:"rgba(192,57,43,.08)", redBorder:"rgba(192,57,43,.35)",
  };

  /* Auth */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    /* Detect session when app comes back into focus from browser */
    const handleFocus = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });
    };
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") handleFocus();
    });
    return () => {
      subscription.unsubscribe();
      window.removeEventListener("focus", handleFocus);
    };
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

  const signInWithGoogle = () => supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo:"https://verri-5.vercel.app" }});
  const signOut = () => supabase.auth.signOut().then(()=>setBiz(null));
  const saveProfile = async (b) => {
    if (!user) return;
    await supabase.from("user_profiles").upsert({ id:user.id, name:b.name, owner_name:b.ownerName, designation:b.designation, phone:b.phone, type:b.type, province:b.province, city:b.city, address:b.address, reg_type:b.regType, ntn:b.ntn, rev_m:b.revM, emp:b.emp, licences:b.licences, products:b.products, updated_at:new Date().toISOString() });
  };

  const LAWS = dbLaws.length > 0 ? dbLaws : ALL_LAWS;
  const allMyLaws = biz && biz.type ? LAWS.filter(l => matchLaw(l, biz)) : [];
  const myLaws = paid ? allMyLaws : allMyLaws.slice(0, 5);
  const myNews = biz && biz.type ? NEWS.filter(n => matchNews(n, biz)) : [];
  const nav = s => { setSelLaw(null); setSelNews(null); setScreen(s); };

  /* 1. Show loading ONLY on first open before laws are ready */
  if (!ready && !biz) return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:TH.bg,gap:16,fontFamily:"inherit"}}>
      <div style={{fontSize:16,fontWeight:500,color:TH.gold,letterSpacing:"1px"}}>Paaband</div>
      <div style={{width:28,height:28,border:`2px solid ${TH.border}`,borderTopColor:TH.gold,borderRadius:"50%",animation:"spin .7s linear infinite"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  /* 2. Show sign in if no user and no biz */
  if (!user && !biz) return (
    <AuthScreen TH={TH} lang={lang} setLang={setLang}
      onSuccess={u=>setUser(u)}
      onSkip={()=>setBiz("onboard")}
    />
  );

  /* 3. Show onboarding if no real profile yet */
  if (!biz || biz === "onboard" || !biz.type || !biz.province) return (
    <Onboarding
      onDone={b => {
        const safeBiz = { ...b, typeLabel: bl(b.type,"en"), revLabel: REV_BANDS.find(r=>r.v===b.revM)?.l||"", empLabel: EMP_BANDS.find(r=>r.v===b.emp)?.l||"", licences: b.licences||[], products: b.products||"", ntn: b.ntn||"" };
        setBiz(safeBiz);
        try { localStorage.setItem("paaband_biz", JSON.stringify(safeBiz)); } catch(e){}
        saveProfile(safeBiz);
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
      case "dash":     return <Dashboard     biz={biz} laws={myLaws} allLawsCount={allMyLaws.length} news={myNews} onNav={nav} onLaw={setSelLaw} onNews={setSelNews} lang={lang} setLang={setLang} user={user} signOut={signOut} dark={dark} setDark={setDark} TH={TH} paid={paid}/>;
      case "news":     return <NewsFeed      biz={biz} onSelect={setSelNews} lang={lang} TH={TH}/>;
      case "laws":     return <LawBook       biz={biz} onSelect={setSelLaw} lang={lang} allLaws={paid?LAWS:LAWS.slice(0,20)} onNav={nav} TH={TH}/>;
      case "profile":  return <ProfileScreen biz={biz} onUpdate={b=>{ setBiz(b); try{localStorage.setItem("paaband_biz",JSON.stringify(b));}catch(e){} saveProfile(b); nav("dash"); }} lang={lang} TH={TH}/>;
      case "calendar": return <ComplianceCalendar laws={myLaws} lang={lang} onNav={nav} TH={TH}/>;
      case "finecalc": return <FineCalculator     laws={myLaws} lang={lang} onNav={nav} TH={TH}/>;
      case "upgrade":  return <UpgradeScreen lang={lang} TH={TH} onActivate={activateLicence} onBack={()=>nav("dash")}/>;
      case "scandoc":  return <Dashboard biz={biz} laws={myLaws} allLawsCount={allMyLaws.length} news={myNews} onNav={nav} onLaw={setSelLaw} onNews={setSelNews} lang={lang} setLang={setLang} user={user} signOut={signOut} dark={dark} setDark={setDark} TH={TH} paid={paid}/>;
      case "findca":   return <Dashboard biz={biz} laws={myLaws} allLawsCount={allMyLaws.length} news={myNews} onNav={nav} onLaw={setSelLaw} onNews={setSelNews} lang={lang} setLang={setLang} user={user} signOut={signOut} dark={dark} setDark={setDark} TH={TH} paid={paid}/>;
      default:         return <Dashboard biz={biz} laws={myLaws} allLawsCount={allMyLaws.length} news={myNews} onNav={nav} onLaw={setSelLaw} onNews={setSelNews} lang={lang} setLang={setLang} user={user} signOut={signOut} dark={dark} setDark={setDark} TH={TH} paid={paid}/>;
    }
  };

  return (
    <div style={{width:"100%",maxWidth:"100%",margin:0,height:"100vh",background:TH.bg,position:"relative",fontFamily:"inherit",display:"flex",flexDirection:"column"}}>
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
