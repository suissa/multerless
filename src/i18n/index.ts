export type Locale = 'en' | 'de' | 'nl' | 'es' | 'fr' | 'it' | 'ja' | 'zh' | 'hi';

export type ErrorMessages = {
  LIMIT_PART_COUNT: string;
  LIMIT_FILE_SIZE: string;
  LIMIT_FILE_COUNT: string;
  LIMIT_FIELD_KEY: string;
  LIMIT_FIELD_VALUE: string;
  LIMIT_FIELD_COUNT: string;
  LIMIT_UNEXPECTED_FILE: string;
  MISSING_FIELD_NAME: string;
  INVALID_MULTIPART: string;
  INVALID_CONTENT_TYPE: string;
  INVALID_BOUNDARY: string;
  [key: string]: string;
};

const translations: Record<Locale, ErrorMessages> = {
  en: {
    LIMIT_PART_COUNT: 'Too many parts',
    LIMIT_FILE_SIZE: 'File too large',
    LIMIT_FILE_COUNT: 'Too many files',
    LIMIT_FIELD_KEY: 'Field name too long',
    LIMIT_FIELD_VALUE: 'Field value too long',
    LIMIT_FIELD_COUNT: 'Too many fields',
    LIMIT_UNEXPECTED_FILE: 'Unexpected field',
    MISSING_FIELD_NAME: 'Field name missing',
    INVALID_MULTIPART: 'Invalid multipart form data',
    INVALID_CONTENT_TYPE: 'Invalid content type',
    INVALID_BOUNDARY: 'Invalid boundary'
  },
  de: {
    LIMIT_PART_COUNT: 'Zu viele Teile',
    LIMIT_FILE_SIZE: 'Datei zu groß',
    LIMIT_FILE_COUNT: 'Zu viele Dateien',
    LIMIT_FIELD_KEY: 'Feldname zu lang',
    LIMIT_FIELD_VALUE: 'Feldwert zu lang',
    LIMIT_FIELD_COUNT: 'Zu viele Felder',
    LIMIT_UNEXPECTED_FILE: 'Unerwartetes Feld',
    MISSING_FIELD_NAME: 'Feldname fehlt',
    INVALID_MULTIPART: 'Ungültige Multipart-Formulardaten',
    INVALID_CONTENT_TYPE: 'Ungültiger Inhaltstyp',
    INVALID_BOUNDARY: 'Ungültige Begrenzung'
  },
  nl: {
    LIMIT_PART_COUNT: 'Te veel delen',
    LIMIT_FILE_SIZE: 'Bestand te groot',
    LIMIT_FILE_COUNT: 'Te veel bestanden',
    LIMIT_FIELD_KEY: 'Veldnaam te lang',
    LIMIT_FIELD_VALUE: 'Veldwaarde te lang',
    LIMIT_FIELD_COUNT: 'Te veel velden',
    LIMIT_UNEXPECTED_FILE: 'Onverwacht veld',
    MISSING_FIELD_NAME: 'Veldnaam ontbreekt',
    INVALID_MULTIPART: 'Ongeldige multipart form data',
    INVALID_CONTENT_TYPE: 'Ongeldig inhoudstype',
    INVALID_BOUNDARY: 'Ongeldige grens'
  },
  es: {
    LIMIT_PART_COUNT: 'Demasiadas partes',
    LIMIT_FILE_SIZE: 'Archivo demasiado grande',
    LIMIT_FILE_COUNT: 'Demasiados archivos',
    LIMIT_FIELD_KEY: 'Nombre del campo demasiado largo',
    LIMIT_FIELD_VALUE: 'Valor del campo demasiado largo',
    LIMIT_FIELD_COUNT: 'Demasiados campos',
    LIMIT_UNEXPECTED_FILE: 'Campo inesperado',
    MISSING_FIELD_NAME: 'Falta el nombre del campo',
    INVALID_MULTIPART: 'Datos de formulario multipart no válidos',
    INVALID_CONTENT_TYPE: 'Tipo de contenido no válido',
    INVALID_BOUNDARY: 'Límite no válido'
  },
  fr: {
    LIMIT_PART_COUNT: 'Trop de parties',
    LIMIT_FILE_SIZE: 'Fichier trop volumineux',
    LIMIT_FILE_COUNT: 'Trop de fichiers',
    LIMIT_FIELD_KEY: 'Nom du champ trop long',
    LIMIT_FIELD_VALUE: 'Valeur du champ trop longue',
    LIMIT_FIELD_COUNT: 'Trop de champs',
    LIMIT_UNEXPECTED_FILE: 'Champ inattendu',
    MISSING_FIELD_NAME: 'Nom du champ manquant',
    INVALID_MULTIPART: 'Données de formulaire multipart non valides',
    INVALID_CONTENT_TYPE: 'Type de contenu non valide',
    INVALID_BOUNDARY: 'Limite non valide'
  },
  it: {
    LIMIT_PART_COUNT: 'Troppe parti',
    LIMIT_FILE_SIZE: 'File troppo grande',
    LIMIT_FILE_COUNT: 'Troppi file',
    LIMIT_FIELD_KEY: 'Nome del campo troppo lungo',
    LIMIT_FIELD_VALUE: 'Valore del campo troppo lungo',
    LIMIT_FIELD_COUNT: 'Troppi campi',
    LIMIT_UNEXPECTED_FILE: 'Campo inatteso',
    MISSING_FIELD_NAME: 'Nome del campo mancante',
    INVALID_MULTIPART: 'Dati modulo multipart non validi',
    INVALID_CONTENT_TYPE: 'Tipo di contenuto non valido',
    INVALID_BOUNDARY: 'Limite non valido'
  },
  ja: {
    LIMIT_PART_COUNT: 'パート数が多すぎます',
    LIMIT_FILE_SIZE: 'ファイルサイズが大きすぎます',
    LIMIT_FILE_COUNT: 'ファイル数が多すぎます',
    LIMIT_FIELD_KEY: 'フィールド名が長すぎます',
    LIMIT_FIELD_VALUE: 'フィールド値が長すぎます',
    LIMIT_FIELD_COUNT: 'フィールド数が多すぎます',
    LIMIT_UNEXPECTED_FILE: '予期しないフィールド',
    MISSING_FIELD_NAME: 'フィールド名がありません',
    INVALID_MULTIPART: '無効なマルチパートフォームデータです',
    INVALID_CONTENT_TYPE: '無効なコンテンツタイプです',
    INVALID_BOUNDARY: '無効な境界です'
  },
  zh: {
    LIMIT_PART_COUNT: '部分过多',
    LIMIT_FILE_SIZE: '文件过大',
    LIMIT_FILE_COUNT: '文件过多',
    LIMIT_FIELD_KEY: '字段名过长',
    LIMIT_FIELD_VALUE: '字段值过长',
    LIMIT_FIELD_COUNT: '字段过多',
    LIMIT_UNEXPECTED_FILE: '意外的字段',
    MISSING_FIELD_NAME: '缺少字段名',
    INVALID_MULTIPART: '无效的多部分表单数据',
    INVALID_CONTENT_TYPE: '无效的内容类型',
    INVALID_BOUNDARY: '无效的边界'
  },
  hi: {
    LIMIT_PART_COUNT: 'बहुत सारे भाग',
    LIMIT_FILE_SIZE: 'फ़ाइल बहुत बड़ी है',
    LIMIT_FILE_COUNT: 'बहुत सारी फ़ाइलें',
    LIMIT_FIELD_KEY: 'फ़ील्ड का नाम बहुत लंबा है',
    LIMIT_FIELD_VALUE: 'फ़ील्ड का मान बहुत लंबा है',
    LIMIT_FIELD_COUNT: 'बहुत सारे फ़ील्ड',
    LIMIT_UNEXPECTED_FILE: 'अप्रत्याशित फ़ील्ड',
    MISSING_FIELD_NAME: 'फ़ील्ड का नाम गायब है',
    INVALID_MULTIPART: 'अमान्य मल्टीपार्ट फॉर्म डेटा',
    INVALID_CONTENT_TYPE: 'अमान्य सामग्री प्रकार',
    INVALID_BOUNDARY: 'अमान्य सीमा'
  }
};

let currentLocale: Locale = 'en';

export function setLocale(locale: Locale): void {
  if (translations[locale]) {
    currentLocale = locale;
  }
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t(code: string): string {
  const locale = translations[currentLocale];
  return locale[code] || translations['en'][code] || `Multer error: ${code}`;
}
