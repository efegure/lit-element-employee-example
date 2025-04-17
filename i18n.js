let language = document.documentElement.lang;

const translations = {
  en: {
    firstName: 'First Name',
    lastName: 'Last Name',
    dateOfBirth: 'Date of Birth',
    dateOfEmployment: 'Date of Employment',
    email: 'Email',
    phone: 'Phone',
    department: 'Department',
    employee: 'Employee',
    employees: 'Employees',
    employeeList: 'Employee List',
    addEmployee: 'Add Employee',
    editEmployee: 'Edit Employee',
    addNew: 'Add New',
    actions: 'Actions',
    analytics: 'Analytics',
    tech: 'Tech',
    edit: 'Edit',
    delete: 'Delete',
    proceed: 'Proceed',
    confirm: 'Confirm',
    cancel: 'Cancel',
    areYouSure: 'Are you sure you want to delete?',
  },
  tr: {
    firstName: 'İsim',
    lastName: 'Soyisim',
    dateOfBirth: 'Doğum Tarihi',
    dateOfEmployment: 'İşe Başlama Tarihi',
    email: 'Email',
    phone: 'Telefon',
    department: 'Departman',
    employeeList: 'Çalışan Listesi',
    employee: 'Çalışan',
    employees: 'Çalışanlar',
    addEmployee: 'Çalışan Ekle',
    editEmployee: 'Çalışanı Düzenle',
    addNew: 'Yeni Ekle',
    actions: 'İşlemler',
    analytics: 'Analitik',
    tech: 'Teknoloji',
    edit: 'Düzenle',
    delete: 'Sil',
    proceed: 'Devam Et',
    confirm: 'Onayla',
    cancel: 'İptal Et',
    areYouSure: 'Silmek istediğinize emin misiniz?',
  },
};

export function i18n(key) {
  return translations[language][key];
}
