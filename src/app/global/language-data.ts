export type LanguageContent = {
  code: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  tagline: string;
  intro: string;
  audiencesTitle: string;
  audiences: { name: string; description: string }[];
  pricingTitle: string;
  pricingText: string;
  contactTitle: string;
  contactText: string;
  contactCta: string;
};

export const LANGUAGES: LanguageContent[] = [
  {
    code: "zh",
    nativeName: "中文",
    dir: "ltr",
    tagline: "只要尝试，就能成功。",
    intro:
      "TRIELTS 为个人、机构和政府客户提供私人雅思（IELTS）辅导。授课教师持有 PGCE 教师资格证书，拥有 17 年国际教学经验，其中 7 年专注于雅思教学。",
    audiencesTitle: "适合谁",
    audiences: [
      { name: "个人与家庭", description: "为准备出国留学、工作或移民的学生、专业人士和家庭提供一对一辅导。" },
      { name: "机构与企业", description: "为团队和员工提供统一培训，最多 10 人的团体仍按同一课时费率收费。" },
      { name: "政府与机构", description: "提供结构化的备考方案，并可根据采购和人力资源要求提供发票和进度报告。" },
    ],
    pricingTitle: "费用",
    pricingText: "统一费率：每 60 分钟课程 195 英镑，最多可容纳 10 人。购买 5、10 或 20 节课程套餐可享受优惠。",
    contactTitle: "联系方式",
    contactText: "请联系我们安排咨询。欢迎使用任何语言进行咨询。",
    contactCta: "联系我们",
  },
  {
    code: "ja",
    nativeName: "日本語",
    dir: "ltr",
    tagline: "努力すれば、必ず成功する。",
    intro:
      "TRIELTSは、個人、法人、政府機関のお客様向けに、プライベートIELTSコーチングを提供しています。指導を担当するのは、PGCE（教員資格）を持ち、17年間の国際的な指導経験を持つ講師で、そのうち7年間はIELTS指導に特化しています。",
    audiencesTitle: "対象となる方",
    audiences: [
      { name: "個人・ご家族", description: "留学、就労、海外移住を目指す学生、社会人、ご家族向けのマンツーマン指導です。" },
      { name: "法人・団体", description: "チームやスタッフ向けの統一研修で、最大10名までのグループでも同じセッション料金です。" },
      { name: "政府・公的機関", description: "調達や人事の要件に対応した、請求書発行や進捗報告を伴う体系的な指導プログラムです。" },
    ],
    pricingTitle: "料金",
    pricingText: "料金は一律です。60分セッションあたり195ポンド、最大10名まで同料金でご利用いただけます。5回・10回・20回のパッケージにはお得な割引があります。",
    contactTitle: "お問い合わせ",
    contactText: "ご相談のご予約はお問い合わせください。どの言語でのお問い合わせも歓迎いたします。",
    contactCta: "お問い合わせ",
  },
  {
    code: "ar",
    nativeName: "العربية",
    dir: "rtl",
    tagline: "إن حاولت فستنجح.",
    intro:
      "تقدم TRIELTS دروسًا خصوصية في اختبار الآيلتس (IELTS) للأفراد والمؤسسات والجهات الحكومية. يقود التدريب معلم حاصل على شهادة PGCE، ويتمتع بخبرة تدريس دولية تمتد 17 عامًا، منها 7 سنوات مخصصة لتدريس الآيلتس.",
    audiencesTitle: "لمن هذه الخدمة",
    audiences: [
      { name: "الأفراد والعائلات", description: "دروس فردية للطلاب والمهنيين والعائلات المستعدين للدراسة أو العمل أو الانتقال إلى الخارج." },
      { name: "المؤسسات والشركات", description: "تدريب منسق للفرق والموظفين، بنفس سعر الجلسة الواحدة لمجموعات تصل إلى 10 أشخاص." },
      { name: "الجهات الحكومية والمؤسسات", description: "إعداد منظم مع إصدار فواتير وتقارير تناسب متطلبات المشتريات والموارد البشرية." },
    ],
    pricingTitle: "الأسعار",
    pricingText: "سعر ثابت واحد: 195 جنيهًا إسترلينيًا لكل جلسة مدتها 60 دقيقة، لمجموعة تصل إلى 10 أشخاص معًا. تتوفر باقات مخفضة لـ 5 أو 10 أو 20 جلسة.",
    contactTitle: "التواصل",
    contactText: "تواصل معنا لترتيب استشارة. نرحب بالاستفسارات بأي لغة.",
    contactCta: "تواصل معنا",
  },
  {
    code: "ko",
    nativeName: "한국어",
    dir: "ltr",
    tagline: "노력하면 반드시 성공합니다.",
    intro:
      "TRIELTS는 개인, 기업, 정부 고객을 위한 프라이빗 아이엘츠(IELTS) 코칭을 제공합니다. PGCE 자격을 보유한 강사가 17년간의 국제 교육 경력을 바탕으로 지도하며, 그중 7년은 아이엘츠 지도에 집중해 왔습니다.",
    audiencesTitle: "이런 분들께 적합합니다",
    audiences: [
      { name: "개인 및 가족", description: "유학, 취업, 해외 이주를 준비하는 학생, 전문가, 가족을 위한 1:1 코칭입니다." },
      { name: "기업 및 단체", description: "팀과 직원을 위한 체계적인 교육으로, 최대 10명까지 동일한 세션 요금이 적용됩니다." },
      { name: "정부 및 기관", description: "조달 및 인사 요건에 맞춘 청구서 발행과 진행 보고가 가능한 체계적인 준비 과정입니다." },
    ],
    pricingTitle: "요금",
    pricingText: "단일 요금제: 60분 세션당 195파운드, 최대 10명까지 함께 참여 가능합니다. 5회, 10회, 20회 패키지 구매 시 할인이 적용됩니다.",
    contactTitle: "문의하기",
    contactText: "상담 예약은 언제든 문의해 주세요. 어떤 언어로도 문의 가능합니다.",
    contactCta: "문의하기",
  },
  {
    code: "vi",
    nativeName: "Tiếng Việt",
    dir: "ltr",
    tagline: "Cố gắng, bạn sẽ thành công.",
    intro:
      "TRIELTS cung cấp các buổi luyện thi IELTS riêng cho cá nhân, tổ chức và khách hàng chính phủ. Chương trình được giảng dạy bởi một giáo viên có chứng chỉ PGCE với 17 năm kinh nghiệm giảng dạy quốc tế, trong đó có 7 năm tập trung vào IELTS.",
    audiencesTitle: "Dành cho ai",
    audiences: [
      { name: "Cá nhân & gia đình", description: "Kèm 1-1 cho học sinh, người đi làm và gia đình chuẩn bị du học, làm việc hoặc định cư ở nước ngoài." },
      { name: "Tổ chức & doanh nghiệp", description: "Đào tạo phối hợp cho nhóm và nhân viên, với cùng mức giá mỗi buổi cho nhóm tối đa 10 người." },
      { name: "Chính phủ & tổ chức", description: "Chương trình luyện thi có cấu trúc, kèm hóa đơn và báo cáo phù hợp với yêu cầu mua sắm và nhân sự." },
    ],
    pricingTitle: "Học phí",
    pricingText: "Một mức giá cố định: 195 bảng Anh cho mỗi buổi học 60 phút, dành cho nhóm tối đa 10 người. Có gói giảm giá cho 5, 10 hoặc 20 buổi học.",
    contactTitle: "Liên hệ",
    contactText: "Liên hệ để sắp xếp buổi tư vấn. Chúng tôi hoan nghênh liên hệ bằng bất kỳ ngôn ngữ nào.",
    contactCta: "Liên hệ",
  },
  {
    code: "es",
    nativeName: "Español",
    dir: "ltr",
    tagline: "Si lo intentas, tendrás éxito.",
    intro:
      "TRIELTS ofrece clases particulares de preparación para el IELTS para particulares, organizaciones y clientes gubernamentales. Las clases están impartidas por un profesor cualificado con PGCE, con 17 años de experiencia docente internacional, incluidos 7 años centrados en el IELTS.",
    audiencesTitle: "Para quién es",
    audiences: [
      { name: "Particulares y familias", description: "Clases individuales para estudiantes, profesionales y familias que se preparan para estudiar, trabajar o mudarse al extranjero." },
      { name: "Organizaciones y empresas", description: "Formación coordinada para equipos y personal, con la misma tarifa por sesión para grupos de hasta 10 personas." },
      { name: "Gobierno e instituciones", description: "Preparación estructurada con facturación e informes adaptados a los requisitos de contratación pública y recursos humanos." },
    ],
    pricingTitle: "Precios",
    pricingText: "Una tarifa única: 195 libras esterlinas por sesión de 60 minutos, para grupos de hasta 10 personas. Hay paquetes con descuento disponibles para 5, 10 o 20 sesiones.",
    contactTitle: "Contacto",
    contactText: "Póngase en contacto para concertar una consulta. Las consultas son bienvenidas en cualquier idioma.",
    contactCta: "Contactar",
  },
  {
    code: "de",
    nativeName: "Deutsch",
    dir: "ltr",
    tagline: "Wer es versucht, wird Erfolg haben.",
    intro:
      "TRIELTS bietet privates IELTS-Coaching für Einzelpersonen, Organisationen und öffentliche Auftraggeber. Der Unterricht wird von einer PGCE-qualifizierten Lehrkraft mit 17 Jahren internationaler Unterrichtserfahrung geleitet, davon 7 Jahre mit Schwerpunkt IELTS.",
    audiencesTitle: "Für wen ist das geeignet",
    audiences: [
      { name: "Einzelpersonen & Familien", description: "Einzelunterricht für Studierende, Berufstätige und Familien, die sich auf ein Studium, eine Arbeit oder einen Umzug im Ausland vorbereiten." },
      { name: "Organisationen & Unternehmen", description: "Koordinierte Schulungen für Teams und Mitarbeitende, zum gleichen Sitzungspreis für Gruppen bis zu 10 Personen." },
      { name: "Regierung & Institutionen", description: "Strukturierte Vorbereitung mit Rechnungsstellung und Berichterstattung, die den Anforderungen von Beschaffung und Personalabteilungen entspricht." },
    ],
    pricingTitle: "Preise",
    pricingText: "Ein einheitlicher Preis: 195 £ pro 60-minütiger Sitzung, für bis zu 10 Personen gemeinsam. Vergünstigte Pakete sind für 5, 10 oder 20 Sitzungen erhältlich.",
    contactTitle: "Kontakt",
    contactText: "Kontaktieren Sie uns, um eine Beratung zu vereinbaren. Anfragen sind in jeder Sprache willkommen.",
    contactCta: "Kontakt aufnehmen",
  },
  {
    code: "fr",
    nativeName: "Français",
    dir: "ltr",
    tagline: "Essayez, et vous réussirez.",
    intro:
      "TRIELTS propose un coaching IELTS privé pour les particuliers, les organisations et les clients gouvernementaux. Les cours sont dispensés par un enseignant certifié PGCE, fort de 17 ans d'expérience internationale dans l'enseignement, dont 7 ans consacrés à l'IELTS.",
    audiencesTitle: "À qui s'adresse ce service",
    audiences: [
      { name: "Particuliers et familles", description: "Cours individuels pour étudiants, professionnels et familles se préparant à étudier, travailler ou s'installer à l'étranger." },
      { name: "Organisations et entreprises", description: "Formation coordonnée pour les équipes et le personnel, au même tarif par séance pour des groupes allant jusqu'à 10 personnes." },
      { name: "Gouvernement et institutions", description: "Préparation structurée avec facturation et rapports adaptés aux exigences des achats publics et des ressources humaines." },
    ],
    pricingTitle: "Tarifs",
    pricingText: "Un tarif unique : 195 £ par séance de 60 minutes, pour un groupe pouvant aller jusqu'à 10 personnes. Des forfaits à prix réduit sont disponibles pour 5, 10 ou 20 séances.",
    contactTitle: "Contact",
    contactText: "Contactez-nous pour organiser une consultation. Les demandes sont bienvenues dans n'importe quelle langue.",
    contactCta: "Nous contacter",
  },
  {
    code: "pt",
    nativeName: "Português",
    dir: "ltr",
    tagline: "Se tentar, terá sucesso.",
    intro:
      "A TRIELTS oferece aulas particulares de preparação para o IELTS para particulares, organizações e clientes governamentais. As aulas são ministradas por um professor qualificado com PGCE, com 17 anos de experiência internacional em ensino, incluindo 7 anos dedicados ao IELTS.",
    audiencesTitle: "Para quem é",
    audiences: [
      { name: "Particulares e famílias", description: "Aulas individuais para estudantes, profissionais e famílias que se preparam para estudar, trabalhar ou mudar-se para o exterior." },
      { name: "Organizações e empresas", description: "Formação coordenada para equipas e colaboradores, com a mesma tarifa por sessão para grupos de até 10 pessoas." },
      { name: "Governo e instituições", description: "Preparação estruturada com faturação e relatórios adequados aos requisitos de contratação pública e de recursos humanos." },
    ],
    pricingTitle: "Preços",
    pricingText: "Uma tarifa única: 195 libras por sessão de 60 minutos, para um grupo de até 10 pessoas. Estão disponíveis pacotes com desconto para 5, 10 ou 20 sessões.",
    contactTitle: "Contacto",
    contactText: "Entre em contacto para marcar uma consulta. As perguntas são bem-vindas em qualquer idioma.",
    contactCta: "Contactar",
  },
];
