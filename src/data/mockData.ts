export interface Product {
  id: string;
  name: string;
  category: string;
  company: string;
}

export interface Company {
  id: string;
  name: string;
  image: string;
  products: Product[];
}

export const companies: Company[] = [
  {
    id: '1',
    name: 'SteelTech Industries',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: [
      { id: 'p1', name: 'Hex Bolts M8', category: 'Bolts', company: 'SteelTech Industries' },
      { id: 'd1', name: 'Socket Screws', category: 'Screws', company: 'SteelTech Industries' },
      { id: 'c1', name: 'Washers Set', category: 'Washers', company: 'SteelTech Industries' },
      { id: 'c2', name: 'Nuts Assorted', category: 'Nuts', company: 'SteelTech Industries' },
      { id: 'c3', name: 'Anchor Bolts', category: 'Bolts', company: 'SteelTech Industries' },
      { id: 'p2', name: 'Carriage Bolts', category: 'Bolts', company: 'SteelTech Industries' },
      { id: 'd2', name: 'Machine Screws', category: 'Screws', company: 'SteelTech Industries' },
      { id: 'c4', name: 'Lock Washers', category: 'Washers', company: 'SteelTech Industries' },
    ]
  },
  {
    id: '2',
    name: 'ProFast Hardware',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: [
      { id: 'x1', name: 'Stainless Bolts', category: 'Bolts', company: 'ProFast Hardware' },
      { id: 'y1', name: 'Wing Nuts', category: 'Nuts', company: 'ProFast Hardware' },
      { id: 'z1', name: 'Flat Washers', category: 'Washers', company: 'ProFast Hardware' },
      { id: 'x2', name: 'Thumb Screws', category: 'Screws', company: 'ProFast Hardware' },
      { id: 'y2', name: 'Cap Nuts', category: 'Nuts', company: 'ProFast Hardware' },
      { id: 'z2', name: 'U-Bolts', category: 'Bolts', company: 'ProFast Hardware' },
    ]
  },
  {
    id: '3',
    name: 'Precision Fasteners',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: [
      { id: 'a1', name: 'Precision Bolts', category: 'Bolts', company: 'Precision Fasteners' },
      { id: 'b1', name: 'Metric Screws', category: 'Screws', company: 'Precision Fasteners' },
      { id: 'c5', name: 'Spring Washers', category: 'Washers', company: 'Precision Fasteners' },
      { id: 'a2', name: 'Flange Nuts', category: 'Nuts', company: 'Precision Fasteners' },
      { id: 'b2', name: 'Set Screws', category: 'Screws', company: 'Precision Fasteners' },
      { id: 'c6', name: 'Eye Bolts', category: 'Bolts', company: 'Precision Fasteners' },
      { id: 'a3', name: 'Fender Washers', category: 'Washers', company: 'Precision Fasteners' },
    ]
  },
  {
    id: '4',
    name: 'Industrial Supply Co',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: [
      { id: 'm1', name: 'Heavy Duty Bolts', category: 'Bolts', company: 'Industrial Supply Co' },
      { id: 'n1', name: 'Torx Screws', category: 'Screws', company: 'Industrial Supply Co' },
      { id: 'o1', name: 'Locking Nuts', category: 'Nuts', company: 'Industrial Supply Co' },
      { id: 'm2', name: 'Structural Bolts', category: 'Bolts', company: 'Industrial Supply Co' },
      { id: 'n2', name: 'Phillips Screws', category: 'Screws', company: 'Industrial Supply Co' },
      { id: 'o2', name: 'Split Washers', category: 'Washers', company: 'Industrial Supply Co' },
      { id: 'm3', name: 'Threaded Rods', category: 'Rods', company: 'Industrial Supply Co' },
      { id: 'n3', name: 'Coupling Nuts', category: 'Nuts', company: 'Industrial Supply Co' },
    ]
  },
  {
    id: '5',
    name: 'BoltMaster Pro',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
    products: [
      { id: 'q1', name: 'Grade 8 Bolts', category: 'Bolts', company: 'BoltMaster Pro' },
      { id: 'r1', name: 'Allen Screws', category: 'Screws', company: 'BoltMaster Pro' },
      { id: 's1', name: 'Nylon Nuts', category: 'Nuts', company: 'BoltMaster Pro' },
      { id: 'q2', name: 'Shoulder Bolts', category: 'Bolts', company: 'BoltMaster Pro' },
      { id: 'r2', name: 'Wood Screws', category: 'Screws', company: 'BoltMaster Pro' },
      { id: 's2', name: 'Rubber Washers', category: 'Washers', company: 'BoltMaster Pro' },
    ]
  }
];

export const getAllProducts = (): Product[] => {
  return companies.flatMap(company => company.products);
};

export const searchProducts = (query: string, companyId?: string): Product[] => {
  const products = companyId 
    ? companies.find(c => c.id === companyId)?.products || []
    : getAllProducts();
    
  if (!query.trim()) return products;
  
  return products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
};