const fs = require('fs');

const servers = [
    { name: 'Dell PowerEdge R630', slug: 'dell-r630', brand: 'Dell', form: '1U Rack' },
    { name: 'Dell PowerEdge R640', slug: 'dell-r640', brand: 'Dell', form: '1U Rack' },
    { name: 'Dell PowerEdge R730', slug: 'dell-r730', brand: 'Dell', form: '2U Rack' },
    { name: 'Dell PowerEdge R730xd', slug: 'dell-r730xd', brand: 'Dell', form: '2U Rack' },
    { name: 'Dell PowerEdge R740', slug: 'dell-r740', brand: 'Dell', form: '2U Rack' },
    { name: 'Dell PowerEdge R740xd', slug: 'dell-r740xd', brand: 'Dell', form: '2U Rack' },
    { name: 'Dell PowerEdge R650', slug: 'dell-r650', brand: 'Dell', form: '1U Rack' },
    { name: 'Dell PowerEdge R750', slug: 'dell-r750', brand: 'Dell', form: '2U Rack' },
    { name: 'HP ProLiant DL360 G9', slug: 'hp-dl360-g9', brand: 'HP', form: '1U Rack' },
    { name: 'HP ProLiant DL380 G9', slug: 'hp-dl380-g9', brand: 'HP', form: '2U Rack' },
    { name: 'HP ProLiant DL360 G10', slug: 'hp-dl360-g10', brand: 'HP', form: '1U Rack' },
    { name: 'HP ProLiant DL380 G10', slug: 'hp-dl380-g10', brand: 'HP', form: '2U Rack' },
    { name: 'HP ProLiant DL380 G10 Plus', slug: 'hp-dl380-g10-plus', brand: 'HP', form: '2U Rack' }
];

const workstations = [
    { name: 'HP Z440 Workstation', slug: 'hp-z440', brand: 'HP', type: 'Tower' },
    { name: 'HP Z640 Workstation', slug: 'hp-z640', brand: 'HP', type: 'Tower' },
    { name: 'HP Z840 Workstation', slug: 'hp-z840', brand: 'HP', type: 'Tower' },
    { name: 'HP Z4 G4 Workstation', slug: 'hp-z4-g4', brand: 'HP', type: 'Tower' },
    { name: 'HP Z6 G4 Workstation', slug: 'hp-z6-g4', brand: 'HP', type: 'Tower' },
    { name: 'HP Z8 G4 Workstation', slug: 'hp-z8-g4', brand: 'HP', type: 'Tower' },
    { name: 'Dell Precision T5810', slug: 'dell-t5810', brand: 'Dell', type: 'Tower' },
    { name: 'Dell Precision T7810', slug: 'dell-t7810', brand: 'Dell', type: 'Tower' },
    { name: 'Dell Precision T7910', slug: 'dell-t7910', brand: 'Dell', type: 'Tower' },
    { name: 'Dell Precision T7820', slug: 'dell-t7820', brand: 'Dell', type: 'Tower' },
    { name: 'Dell Precision T7920', slug: 'dell-t7920', brand: 'Dell', type: 'Tower' },
    { name: 'Lenovo ThinkStation P720', slug: 'lenovo-p720', brand: 'Lenovo', type: 'Tower' },
    { name: 'Lenovo ThinkStation P920', slug: 'lenovo-p920', brand: 'Lenovo', type: 'Tower' }
];

const components = [
    { name: 'Intel Xeon Platinum 8380 Processor', slug: 'intel-platinum-8380' },
    { name: 'AMD EPYC 7763 Processor', slug: 'amd-epyc-7763' },
    { name: 'NVIDIA RTX A6000 GPU', slug: 'nvidia-rtx-a6000' },
    { name: 'NVIDIA A100 Tensor Core GPU', slug: 'nvidia-a100' },
    { name: '64GB DDR4-3200 ECC Reg RAM', slug: 'ram-64gb-ddr4' },
    { name: '32GB DDR5-4800 ECC Reg RAM', slug: 'ram-32gb-ddr5' },
    { name: 'Samsung PM1733 3.84TB NVMe SSD', slug: 'samsung-pm1733-3tb' },
    { name: 'WD Gold 18TB Enterprise HDD', slug: 'wd-gold-18tb' },
    { name: 'Supermicro H12DSi-NT6 Motherboard', slug: 'supermicro-h12dsi' },
    { name: 'Broadcom MegaRAID 9560-16i', slug: 'broadcom-9560' }
];

function generateListing(title, products, listType, activePage) {
    const isServer = listType === 'server';
    const isComponent = listType === 'component';
    
    const grid = products.map(p => {
        let imgSrc = './server.jpg';
        if (isComponent) imgSrc = './assets/storage350x200-01.png';
        if (listType === 'workstation') imgSrc = './assets/cat_assets/workstation350x200-01.png';

        let desc = 'Enterprise-grade server solution for critical business workloads.';
        if (isComponent) desc = 'High-performance hardware component for mission-critical systems.';
        if (listType === 'workstation') desc = 'Pro-grade workstation for CAD, rendering, and complex engineering.';

        return `
            <div class="product-card">
                <div class="product-image"><img src="${imgSrc}" alt="${p.name}"></div>
                <div class="product-info">
                    <h3 class="product-title">${p.name}</h3>
                    <p class="product-desc">${desc}</p>
                    <a href="./product-${p.slug}.html" class="product-action">View Details &rarr;</a>
                </div>
            </div>`;
    }).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Factory - ${title}</title>
    <link rel="icon" type="image/x-icon" href="logo1.png">
    <link rel="stylesheet" href="./css/index.css">
    <link rel="stylesheet" href="./css/products.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const navLinks = document.querySelector(".Nav_links ul");
            const toggleButton = document.querySelector(".Nav_toggle");
            toggleButton.addEventListener("click", () => {
                navLinks.classList.toggle("show");
            });
        });
    </script>

    <nav class="Nav_container">
        <div class="Nav_logo">
            <a href="index.html"><img src="./logo1.png" alt="Logo"></a>
        </div>
        <div class="Nav_search">
            <input type="text" id="site-search" placeholder="Search servers, workstations, components...">
            <div id="search-results"></div>
        </div>
        <div class="Nav_toggle">
            <span>&#9776;</span>
        </div>
        <div class="Nav_links">
            <ul>
                <li><a href="./index.html">Home</a></li>
                <li><a href="./servers.html" class="${activePage === 'servers' ? 'active' : ''}">Servers</a></li>
                <li><a href="./workstations.html" class="${activePage === 'workstations' ? 'active' : ''}">Workstations</a></li>
                <li><a href="./components.html" class="${activePage === 'components' ? 'active' : ''}">Components</a></li>
                <li><a href="./About.html">About</a></li>
                <li><a href="./Contact.html">Contact</a></li>
            </ul>
        </div>
    </nav>

    <div class="products-header">
        <h1>${title}</h1>
        <p>${isServer ? 'Explore our high-performance rackmount, storage, and specialized server solutions.' : (isComponent ? 'Premium hardware components for your enterprise infrastructure.' : 'Unlock your creative potential with our range of high-performance workstations.')}</p>
    </div>

    <div class="products-container">
        <div class="products-grid">
${grid}
        </div>
    </div>

    <div class="footer-main">
        <div class="footer-content">
            <div class="footer-section"><h3>About Us</h3><p>We provide exceptional solutions tailored to meet your needs. Trusted by businesses worldwide.</p></div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="./index.html">Home</a></li>
                    <li><a href="./servers.html">Servers</a></li>
                    <li><a href="./workstations.html">Workstations</a></li>
                    <li><a href="./components.html">Components</a></li>
                    <li><a href="./About.html">About</a></li>
                    <li><a href="./Contact.html">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Follow Us</h3>
                <div class="social-icons">
                    <a href="#" class="icon">Facebook</a>
                    <a href="#" class="icon">Twitter</a>
                    <a href="#" class="icon">LinkedIn</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom"><p>&copy; 2024 Your Company. All rights reserved.</p></div>
    </div>
    <script src="search-index.js"></script>
    <script src="search.js"></script>
</body>
</html>`;
}

fs.writeFileSync('servers.html', generateListing('Enterprise Servers', servers, 'server', 'servers'));
fs.writeFileSync('workstations.html', generateListing('Professional Workstations', workstations, 'workstation', 'workstations'));
fs.writeFileSync('components.html', generateListing('Hardware Components', components, 'component', 'components'));
console.log('Fixed all listing pages.');

console.log('Fixed listing pages.');
