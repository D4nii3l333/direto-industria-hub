
// Dados centralizados da aplicação
export interface Supplier {
  id: number;
  name: string;
  location: string;
  rating: number;
  specialties: string[];
  image: string;
  verified: boolean;
  description?: string;
  phone?: string;
  email?: string;
}

export interface Category {
  id: number;
  name: string;
  count: number;
  icon: string;
  slug: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  company: string;
  description: string;
  minQuantity: number;
  price: number;
  categoryId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  type: 'buyer' | 'supplier';
  createdAt: string;
  lastLogin: string;
  verified: boolean;
}

// Dados padrão
const defaultSuppliers: Supplier[] = [
  {
    id: 1,
    name: "MetalTech Ind.",
    location: "São Paulo, SP",
    rating: 4.8,
    specialties: ["Aço Inoxidável", "Metalurgia", "Soldas Especiais"],
    image: "https://via.placeholder.com/150",
    verified: true,
    description: "Especializada em produtos metalúrgicos de alta qualidade",
    phone: "(11) 99999-9999",
    email: "contato@metaltech.com.br"
  },
  {
    id: 2,
    name: "PlastiCorp",
    location: "Rio de Janeiro, RJ",
    rating: 4.6,
    specialties: ["Plásticos Industriais", "Moldagem", "Extrusão"],
    image: "https://via.placeholder.com/150",
    verified: true,
    description: "Líder em soluções de plásticos para a indústria",
    phone: "(21) 88888-7777",
    email: "vendas@plasticorp.com.br"
  },
  {
    id: 3,
    name: "FerramentasBR",
    location: "Belo Horizonte, MG",
    rating: 4.5,
    specialties: ["Ferramentas Elétricas", "Manuais", "Medição"],
    image: "https://via.placeholder.com/150",
    verified: false,
    description: "Ampla variedade de ferramentas para profissionais e hobbistas",
    phone: "(31) 77777-6666",
    email: "info@ferramentasbr.com.br"
  },
  {
    id: 4,
    name: "QuímicoLab",
    location: "Campinas, SP",
    rating: 4.7,
    specialties: ["Produtos Químicos", "Laboratório", "Análises"],
    image: "https://via.placeholder.com/150",
    verified: true,
    description: "Fornecimento de produtos químicos para indústria",
    phone: "(19) 66666-5555",
    email: "lab@quimicolab.com.br"
  },
  {
    id: 5,
    name: "EletroForte",
    location: "Porto Alegre, RS",
    rating: 4.4,
    specialties: ["Componentes Eletrônicos", "Automação", "Controle"],
    image: "https://via.placeholder.com/150",
    verified: true,
    description: "Especialista em automação industrial",
    phone: "(51) 55555-4444",
    email: "vendas@eletroforte.com.br"
  }
];

const defaultCategories: Category[] = [
  { 
    id: 1, 
    name: "Equipamentos Industriais", 
    count: 1, 
    icon: "🏭", 
    slug: "equipamentos-industriais",
    products: [
      {
        id: 1,
        name: "Compressor de Ar Industrial",
        company: "MetalTech Ind.",
        description: "Compressor de alta capacidade para uso industrial",
        minQuantity: 1,
        price: 15000,
        categoryId: 1
      }
    ]
  },
  { 
    id: 2, 
    name: "Matérias-Primas", 
    count: 0, 
    icon: "⚡", 
    slug: "materias-primas",
    products: []
  },
  { 
    id: 3, 
    name: "Ferramentas", 
    count: 0, 
    icon: "🔧", 
    slug: "ferramentas",
    products: []
  },
  { 
    id: 4, 
    name: "Componentes Eletrônicos", 
    count: 0, 
    icon: "💻", 
    slug: "componentes-eletronicos",
    products: []
  },
  { 
    id: 5, 
    name: "Embalagens", 
    count: 0, 
    icon: "📦", 
    slug: "embalagens",
    products: []
  },
  { 
    id: 6, 
    name: "Segurança Industrial", 
    count: 0, 
    icon: "🛡️", 
    slug: "seguranca-industrial",
    products: []
  }
];

const defaultUsers: User[] = [
  {
    id: 1,
    name: "Isac",
    email: "isac@empresa.com.br",
    phone: "(11) 99999-8888",
    company: "Empresa Industrial Ltda",
    location: "São Paulo, SP",
    type: "buyer",
    createdAt: "2024-01-15",
    lastLogin: "2024-01-30",
    verified: true
  }
];

// Funções para gerenciar dados no localStorage
export const getSuppliers = (): Supplier[] => {
  const stored = localStorage.getItem('suppliers');
  return stored ? JSON.parse(stored) : defaultSuppliers;
};

export const setSuppliers = (suppliers: Supplier[]): void => {
  localStorage.setItem('suppliers', JSON.stringify(suppliers));
};

export const getCategories = (): Category[] => {
  const stored = localStorage.getItem('categories');
  return stored ? JSON.parse(stored) : defaultCategories;
};

export const setCategories = (categories: Category[]): void => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem('users');
  return stored ? JSON.parse(stored) : defaultUsers;
};

export const setUsers = (users: User[]): void => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Inicializar dados se não existirem
export const initializeData = (): void => {
  if (!localStorage.getItem('suppliers')) {
    setSuppliers(defaultSuppliers);
  }
  if (!localStorage.getItem('categories')) {
    setCategories(defaultCategories);
  }
  if (!localStorage.getItem('users')) {
    setUsers(defaultUsers);
  }
};

// Funções de backup
export interface BackupData {
  suppliers: Supplier[];
  categories: Category[];
  users: User[];
  timestamp: string;
  version: string;
}

export const createBackup = (): BackupData => {
  const backup: BackupData = {
    suppliers: getSuppliers(),
    categories: getCategories(),
    users: getUsers(),
    timestamp: new Date().toISOString(),
    version: '1.0'
  };
  
  localStorage.setItem('system_backup', JSON.stringify(backup));
  return backup;
};

export const restoreBackup = (): boolean => {
  try {
    const backupData = localStorage.getItem('system_backup');
    if (!backupData) {
      return false;
    }
    
    const backup: BackupData = JSON.parse(backupData);
    
    // Restaura todos os dados
    setSuppliers(backup.suppliers);
    setCategories(backup.categories);
    setUsers(backup.users);
    
    return true;
  } catch (error) {
    console.error('Erro ao restaurar backup:', error);
    return false;
  }
};

export const getBackupInfo = (): BackupData | null => {
  try {
    const backupData = localStorage.getItem('system_backup');
    return backupData ? JSON.parse(backupData) : null;
  } catch (error) {
    console.error('Erro ao obter informações do backup:', error);
    return null;
  }
};

export const restoreToDefaults = (): void => {
  setSuppliers(defaultSuppliers);
  setCategories(defaultCategories);
  setUsers(defaultUsers);
};
