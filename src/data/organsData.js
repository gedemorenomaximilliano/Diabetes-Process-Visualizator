export const DIABETES_STAGES = [
  {
    id: 'stage_glucose_rise',
    stepNumber: 1,
    title: 'Glukosa Darah Meningkat',
    titleEn: 'Elevated Blood Glucose',
    color: '#ef4444',
    icon: 'TrendingUp',
    description: 'Kadar glukosa dalam sirkulasi darah melonjak tinggi setelah mengonsumsi makanan manis dan karbohidrat sederhana.'
  },
  {
    id: 'stage_insulin_resistance',
    stepNumber: 2,
    title: 'Resistensi Insulin',
    titleEn: 'Insulin Resistance',
    color: '#f59e0b',
    icon: 'ShieldAlert',
    description: 'Reseptor pada membran sel tubuh (otot dan lemak) menjadi kebal, tidak merespons sinyal insulin.'
  },
  {
    id: 'stage_prediabetes',
    stepNumber: 3,
    title: 'Prediabetes',
    titleEn: 'Prediabetes State',
    color: '#8b5cf6',
    icon: 'Activity',
    description: 'Kadar gula darah puasa berkisar 100–125 mg/dL. Sel beta pankreas mulai mengalami kelelahan kompensasi.'
  },
  {
    id: 'stage_type2_diabetes',
    stepNumber: 4,
    title: 'Diabetes Melitus Tipe 2',
    titleEn: 'Type 2 Diabetes Mellitus',
    color: '#0284c7',
    icon: 'Droplet',
    description: 'Gula darah puasa ≥ 126 mg/dL kronis. Disertai kegagalan sekresi insulin sel beta dan risiko komplikasi vaskular.'
  }
];

export const REFERENCE_POINTS = [
  {
    id: 'step1_mouth',
    stepNumber: 1,
    name: 'Mulut & Rongga Mulut',
    nameEn: 'Oral Cavity',
    badgeText: 'Langkah 1: Makan Makanan Manis',
    color: '#ef4444',
    pinPosition: [-0.24, 1.15, 0.35],
    cameraLookAt: [-0.24, 1.12, 0.0],
    cameraPosition: [-0.24, 1.12, 1.8],
    unexplodedPinPosition: [-0.24, 1.15, 0.35],
    unexplodedCameraLookAt: [-0.24, 1.12, 0.0],
    unexplodedCameraPosition: [-0.24, 1.12, 1.8],
    mechanism:
      'Saat makanan manis dan berpati masuk mulut, gigi mengunyahnya menjadi potongan kecil, dan enzim amilase saliva mulai memecah pati menjadi maltosa. Rasa manis juga memberi sinyal awal ke otak, sehingga pankreas bersiap melepas sedikit insulin. Setelah itu makanan ditelan lewat faring dan esofagus menuju lambung.',
    diabetes: [
      'Pada diabetes: gula darah yang tinggi dapat mengurangi produksi saliva dan memicu mulut kering, sehingga risiko gigi berlubang dan radang gusi meningkat.'
    ]
  },
  {
    id: 'step2_stomach_intestine',
    stepNumber: 2,
    name: 'Lambung & Usus Halus',
    nameEn: 'Stomach & Small Intestine',
    badgeText: 'Langkah 2: Pencernaan dan Penyerapan Glukosa',
    color: '#f59e0b',
    pinPosition: [-0.10, -0.28, 0.28],
    cameraLookAt: [-0.10, -0.28, 0.0],
    cameraPosition: [-0.10, -0.28, 1.8],
    unexplodedPinPosition: [-0.08, -0.25, 0.30],
    unexplodedCameraLookAt: [-0.08, -0.25, 0.0],
    unexplodedCameraPosition: [-0.08, -0.25, 1.8],
    mechanism:
      'Di lambung, asam (HCl) dan gerakan peristaltik mengaduk makanan menjadi cairan kental (kimus) yang dilepas sedikit demi sedikit ke usus halus. Lambung juga menghasilkan ghrelin yang memengaruhi nafsu makan. Di usus halus, amilase pankreas dan enzim di dinding usus memecah karbohidrat menjadi glukosa. Glukosa diserap melalui transporter SGLT1 dan GLUT2 ke kapiler darah, sehingga gula darah mulai naik. Setelah makan, usus melepas hormon inkretin (GLP-1, GIP) yang merangsang pelepasan insulin sesuai kadar glukosa.',
    diabetes: [
      'Pada diabetes: penyerapan tetap berjalan normal, tetapi insulin tidak cukup atau tidak efektif, jadi lonjakan gula darah lebih tinggi dan bertahan lebih lama. Pola makan tinggi lemak dan karbohidrat memperberat kenaikan glukosa dan lipoprotein kaya trigliserida dalam darah.'
    ]
  },
  {
    id: 'step3_pancreas',
    stepNumber: 3,
    name: 'Pankreas',
    nameEn: 'Pancreas',
    badgeText: 'Langkah 3: Pelepasan Insulin',
    color: '#0284c7',
    pinPosition: [-0.68, -0.34, 0.30],
    cameraLookAt: [-0.65, -0.34, 0.0],
    cameraPosition: [-0.65, -0.32, 1.6],
    unexplodedPinPosition: [-0.22, -0.46, 0.32],
    unexplodedCameraLookAt: [-0.22, -0.46, 0.0],
    unexplodedCameraPosition: [-0.22, -0.44, 1.6],
    mechanism:
      'Glukosa yang naik di darah masuk ke sel beta pankreas lewat GLUT2 dan diubah menjadi energi (ATP). Peningkatan ATP menutup kanal kalium dan membuka kanal kalsium, sehingga kalsium masuk dan memicu pelepasan insulin ke darah. Insulin bekerja seperti "kunci" yang membuka jalan agar glukosa masuk ke sel tubuh.',
    diabetes: [
      'Pada diabetes tipe 1: kondisi autoimun dengan onset dini, sehingga insulin sangat sedikit diproduksi.',
      'Pada diabetes tipe 2: disfungsi sel beta dan resistensi insulin terjadi bersamaan. Pada awalnya sel beta bekerja ekstra karena sel tubuh kurang peka, tetapi respons ini lama-kelamaan tidak memadai. Kelebihan asam lemak bebas dan gula darah tinggi juga memicu stres oksidatif dan stres ER yang merusak sel beta.'
    ]
  },
  {
    id: 'step4_large_intestine',
    stepNumber: 4,
    name: 'Usus Besar',
    nameEn: 'Large Intestine',
    badgeText: 'Langkah 4: Fermentasi dan Mikrobiota Usus',
    color: '#8b5cf6',
    pinPosition: [0.42, -0.92, 0.24],
    cameraLookAt: [0.60, -0.90, 0.0],
    cameraPosition: [0.60, -0.90, 1.8],
    unexplodedPinPosition: [-0.52, -0.86, 0.24],
    unexplodedCameraLookAt: [-0.35, -0.86, 0.0],
    unexplodedCameraPosition: [-0.35, -0.86, 1.8],
    mechanism:
      'Sisa karbohidrat dan serat yang tidak tercerna difermentasi oleh bakteri baik menjadi asam lemak rantai pendek (misalnya butirat dan propionat). Zat ini meningkatkan sensitivitas insulin dan merangsang hormon GLP-1, serta menjaga dinding usus tetap sehat dan mendukung produksi insulin.',
    diabetes: [
      'Pada diabetes: pola makan tinggi lemak dan rendah serat dapat mengubah keseimbangan bakteri usus (disbiosis). Dinding usus menjadi lebih mudah bocor, sehingga zat bakteri (lipopolisakarida) masuk ke darah dan memicu peradangan sistemik. Peradangan ringan yang kronis ini diduga memperburuk resistensi insulin.'
    ]
  },
  {
    id: 'liver',
    stepNumber: 5,
    name: 'Hati',
    nameEn: 'Liver',
    badgeText: 'Langkah 5: Penyimpanan dan Produksi Glukosa',
    color: '#b45309',
    pinPosition: [-0.92, -0.20, 0.30],
    cameraLookAt: [-0.85, -0.20, 0.0],
    cameraPosition: [-0.85, -0.18, 1.7],
    unexplodedPinPosition: [-0.45, -0.15, 0.30],
    unexplodedCameraLookAt: [-0.45, -0.15, 0.0],
    unexplodedCameraPosition: [-0.45, -0.14, 1.7],
    mechanism:
      'Glukosa dari usus dibawa ke hati lewat vena porta. Saat insulin tinggi, hati menyimpan glukosa sebagai glikogen, mengubah kelebihannya menjadi lemak, dan menekan produksi glukosa baru . Sel otot dan lemak juga memakai glukosa dengan bantuan transporter GLUT4, sehingga gula darah turun kembali.',
    diabetes: [
      'Pada diabetes tipe 2 (resistensi insulin): hati dan sel tubuh tidak lagi merespons insulin dengan baik. Hati gagal menyimpan glikogen, tetap memproduksi glukosa meski gula darah sudah tinggi, dan meningkatkan pembentukan lemak sehingga lemak menumpuk di hati. Resistensi insulin pada otot disebut sebagai faktor terpenting di luar pankreas, sedangkan pada jaringan lemak, resistensi insulin melepas asam lemak bebas yang mendorong hati memproduksi glukosa [1. Akibatnya gula darah tetap tinggi, dan kondisi ini dapat berkembang dari prediabetes menjadi diabetes melitus tipe 2.'
    ]
  }
];
