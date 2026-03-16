const fs = require('fs');

const servers = [
    { name: 'Dell PowerEdge R630', slug: 'dell-r630', brand: 'Dell', category: 'Servers' },
    { name: 'Dell PowerEdge R640', slug: 'dell-r640', brand: 'Dell', category: 'Servers' },
    { name: 'Dell PowerEdge R730', slug: 'dell-r730', brand: 'Dell', category: 'Servers' },
    { name: 'Dell PowerEdge R730xd', slug: 'dell-r730xd', brand: 'Dell', category: 'Servers' },
    { name: 'Dell PowerEdge R740', slug: 'dell-r740', brand: 'Dell', category: 'Servers' },
    { name: 'Dell PowerEdge R740xd', slug: 'dell-r740xd', brand: 'Dell', category: 'Servers' },
    { name: 'Dell PowerEdge R650', slug: 'dell-r650', brand: 'Dell', category: 'Servers' },
    { name: 'Dell PowerEdge R750', slug: 'dell-r750', brand: 'Dell', category: 'Servers' },
    { name: 'HP ProLiant DL360 G9', slug: 'hp-dl360-g9', brand: 'HP', category: 'Servers' },
    { name: 'HP ProLiant DL380 G9', slug: 'hp-dl380-g9', brand: 'HP', category: 'Servers' },
    { name: 'HP ProLiant DL360 G10', slug: 'hp-dl360-g10', brand: 'HP', category: 'Servers' },
    { name: 'HP ProLiant DL380 G10', slug: 'hp-dl380-g10', brand: 'HP', category: 'Servers' },
    { name: 'HP ProLiant DL380 G10 Plus', slug: 'hp-dl380-g10-plus', brand: 'HP', category: 'Servers' }
];

const workstations = [
    { name: 'HP Z440 Workstation', slug: 'hp-z440', brand: 'HP', category: 'Workstations' },
    { name: 'HP Z640 Workstation', slug: 'hp-z640', brand: 'HP', category: 'Workstations' },
    { name: 'HP Z840 Workstation', slug: 'hp-z840', brand: 'HP', category: 'Workstations' },
    { name: 'HP Z4 G4 Workstation', slug: 'hp-z4-g4', brand: 'HP', category: 'Workstations' },
    { name: 'HP Z6 G4 Workstation', slug: 'hp-z6-g4', brand: 'HP', category: 'Workstations' },
    { name: 'HP Z8 G4 Workstation', slug: 'hp-z8-g4', brand: 'HP', category: 'Workstations' },
    { name: 'Dell Precision T5810', slug: 'dell-t5810', brand: 'Dell', category: 'Workstations' },
    { name: 'Dell Precision T7810', slug: 'dell-t7810', brand: 'Dell', category: 'Workstations' },
    { name: 'Dell Precision T7910', slug: 'dell-t7910', brand: 'Dell', category: 'Workstations' },
    { name: 'Dell Precision T7820', slug: 'dell-t7820', brand: 'Dell', category: 'Workstations' },
    { name: 'Dell Precision T7920', slug: 'dell-t7920', brand: 'Dell', category: 'Workstations' },
];

const components = [
    { name: 'Intel Xeon Processor', slug: 'intel-xeon', category: 'Components' },
    { name: 'NVIDIA Quadro GPU', slug: 'nvidia-quadro', category: 'Components' },
    { name: 'DDR4 ECC Memory', slug: 'ddr4-memory', category: 'Components' },
    { name: 'SAS/SATA SSDs', slug: 'ssds', category: 'Components' },
    { name: 'Server Motherboards', slug: 'motherboards', category: 'Components' },
    { name: 'Power Supplies', slug: 'psu', category: 'Components' },
    { name: 'Network Cards', slug: 'nic', category: 'Components' },
    { name: 'RAID Controllers', slug: 'raid', category: 'Components' },
    { name: 'Rack Chassis', slug: 'chassis', category: 'Components' },
    { name: 'Cooling Systems', slug: 'cooling', category: 'Components' }
];

const allProducts = [...servers, ...workstations, ...components].map(p => ({
    name: p.name,
    url: p.category === 'Components' ? `product-${p.slug}.html` : `product-${p.slug}.html`,
    category: p.category
}));

const content = `const searchIndex = ${JSON.stringify(allProducts, null, 4)};`;

fs.writeFileSync('search-index.js', content);
console.log('Search index generated successfully!');
