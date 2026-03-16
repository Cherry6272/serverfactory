const fs = require('fs');
const path = require('path');

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

const template = (p) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${p.name} - Server Factory</title>
    <link rel="icon" type="image/x-icon" href="logo1.png">
    <link rel="stylesheet" href="./css/index.css">
    <link rel="stylesheet" href="./css/product-detail.css">
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
        <div class="Nav_toggle">
            <span>&#9776;</span>
        </div>
        <div class="Nav_links">
            <ul>
                <li><a href="./index.html">Home</a></li>
                <li><a href="./servers.html">Servers</a></li>
                <li><a href="./workstations.html">Workstations</a></li>
                <li><a href="./components.html">Components</a></li>
                <li><a href="./About.html">About</a></li>
                <li><a href="./Contact.html">Contact</a></li>
            </ul>
        </div>
    </nav>

    <div class="product-detail-container">
        <div class="product-main-info">
            <div class="product-gallery">
                <div class="sale-badge">Sale</div>
                <img src="${p.image}" alt="${p.name}">
            </div>
            
            <div class="product-essentials">
                <h1>${p.name}</h1>
                <div class="price-box">
                    <span class="old-price">₹${p.oldPrice}</span>
                    <span class="new-price">₹${p.newPrice}</span>
                </div>
                <ul class="specs-list">
                    ${p.specs.map(s => `<li><b>${s.label}:</b> ${s.value}</li>`).join('')}
                </ul>
                <div class="action-links">
                    <a href="#">♡ Add to wishlist</a>
                    <a href="#">⇄ Compare</a>
                </div>
                <div class="meta-info">
                    <p><b>Categories:</b> ${p.categories.join(', ')}</p>
                    <div class="share-icons">
                        <b>Share:</b>
                        <a href="#">f</a> <a href="#">𝕏</a> <a href="#">🅿</a> <a href="#">in</a> <a href="#">✆</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="product-tabs">
            <div class="tab-headers">
                <button class="tab-header active">Description</button>
                <button class="tab-header">Reviews (${p.reviews ? p.reviews.length : 2})</button>
            </div>
        </div>

        <div class="comparison-section">
            <h2>${p.name} – Professional ${p.type} Solution</h2>
            <p class="description-text">${p.description}</p>
            <div class="comparison-grid">
                ${['Budget', 'Business', 'Enterprise'].map(tier => `
                <div class="comparison-card">
                    <div class="plan-header"><h3>${tier}</h3></div>
                    <div class="plan-price">Rs. ${tier === 'Budget' ? p.newPrice : (tier === 'Business' ? p.businessPrice : p.enterprisePrice)}</div>
                    <ul class="plan-specs">
                        <li>${p.name}</li>
                        ${p.tierSpecs[tier].map(ts => `<li>${ts}</li>`).join('')}
                    </ul>
                    <div class="plan-footer"><button class="buy-btn">BUY NOW</button></div>
                </div>`).join('')}
            </div>
        </div>

        ${p.additionalPoints ? `
        <div class="additional-info" style="margin-top: 50px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
            ${p.additionalPoints.map(point => `
            <div>
                <h3 style="font-size: 1.2rem; color: #333; margin-bottom: 15px;">${point.title}</h3>
                <p style="color: #666; line-height: 1.6; font-size: 0.95rem;">${point.content}</p>
            </div>`).join('')}
        </div>` : ''}

        <div class="reviews-section" style="margin-top: 60px; border-top: 1px solid #eee; padding-top: 40px;">
            <h2 style="margin-bottom: 30px;">Customer Reviews</h2>
            ${(p.reviews || [
                { author: "TechAdmin", rating: 5, date: "2 months ago", text: "Solid performance and very reliable build quality. Perfect for our production environment." },
                { author: "EnterpriseBuyer", rating: 4, date: "1 month ago", text: "Great value for the price. The configuration options are exactly what we needed." }
            ]).map(rev => `
            <div class="review-item" style="margin-bottom: 30px; border-bottom: 1px solid #fafafa; padding-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="font-weight: bold; color: #333;">${rev.author}</span>
                    <span style="color: #999; font-size: 0.85rem;">${rev.date}</span>
                </div>
                <div style="color: #ffb400; margin-bottom: 8px;">${'★'.repeat(rev.rating)}${'☆'.repeat(5-rev.rating)}</div>
                <p style="color: #666; font-style: italic;">"${rev.text}"</p>
            </div>`).join('')}
        </div>
    </div>

    <div class="footer-main">
        <div class="footer-content">
            <div class="footer-section"><h3>About Us</h3><p>We provide exceptional solutions tailored to meet your needs.</p></div>
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
        </div>
        <div class="footer-bottom"><p>&copy; 2024 Your Company. All rights reserved.</p></div>
    </div>
</body>
</html>`;

const generate = (list, isServer, isComponent) => {
    list.forEach(prod => {
        let p = {
            name: prod.name,
            image: isServer ? './server.jpg' : (isComponent ? './assets/storage350x200-01.png' : './assets/cat_assets/workstation350x200-01.png'),
            oldPrice: '1,50,000.00',
            newPrice: '1,25,000.00',
            businessPrice: '1,45,000',
            enterprisePrice: '1,65,000',
            type: isServer ? 'Server' : (isComponent ? 'Component' : 'Workstation'),
            categories: isServer ? ['Dell PowerEdge Servers', 'Dell Rack Servers', 'Dell Servers', 'Refurbished Dell Rack Servers', 'Refurbished Dell Servers', 'Refurbished Servers', 'Servers'] : (isComponent ? ['Components', prod.brand] : [prod.brand + ' Workstations', 'Professional Towers']),
            specs: isServer ? [
                { label: 'Processor', value: 'Intel Xeon Scalable Processors' },
                { label: 'Memory', value: 'ECC Registered DDR4' },
                { label: 'Storage', value: 'Hot-swap SAS/SATA/NVMe' },
                { label: 'Form Factor', value: prod.form }
            ] : (isComponent ? [
                { label: 'Type', value: prod.type },
                { label: 'Manufacturer', value: prod.brand },
                { label: 'Compatibility', value: 'Enterprise Servers/Workstations' },
                { label: 'Warranty', value: '3 Years Limited' }
            ] : [
                { label: 'Processor', value: 'High-end Workstation Processor' },
                { label: 'Graphics', value: 'Pro-grade Graphics Card' },
                { label: 'Memory', value: 'ECC Memory Support' },
                { label: 'Type', value: prod.type }
            ]),
            description: `The ${prod.name} is a high-performance ${isComponent ? 'component' : 'system'} designed for demanding enterprise environments.`,
            tierSpecs: {
                Budget: ['Standard Configuration', 'Reliable Performance'],
                Business: ['Optimized Configuration', 'High Throughput'],
                Enterprise: ['Premium Configuration', 'Maximum Reliability']
            }
        };

        // Specific overrides for R640
        if (prod.slug === 'dell-r640') {
            p.oldPrice = '1,32,000.00';
            p.newPrice = '97,000.00';
            p.businessPrice = '1,07,000.00';
            p.enterprisePrice = '1,27,000.00';
            p.specs = [
                { label: 'Product', value: 'Refurbished Dell PowerEdge R640 Server' },
                { label: 'Form Factor', value: '1U Rack Server' },
                { label: 'Processors', value: 'Intel Xeon Scalable Processor Family' },
                { label: 'Chipset', value: 'Intel C620 Chipset' },
                { label: 'Memory', value: '24 DIMM slots, Supports Up to 3TB Memory' },
                { label: 'Hard Drive', value: 'Up to Eight x 2.5" SAS/SATA hard drives' },
                { label: 'Warranty', value: '1 Year on RAM & Processor, 3 Months Hardware Warranty on Other Parts' }
            ];
            p.description = "Refurbished Dell R640 Server – High Performance and Scalability. The Refurbished Dell PowerEdge R640 Server delivers powerful performance for enterprise workloads. Moreover, its 1U rack design ensures efficient space utilization. In addition, it provides flexibility and scalability for growing businesses. Buy Refurbished Dell PowerEdge R640 Server to enjoy a high-performance solution for virtualization, cloud applications, and data-intensive tasks.";
            p.tierSpecs = {
                Budget: [
                    'Refurbished Dell PowerEdge R640 Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Total 40 Cores & 80 vCPUs',
                    '16 GB DDR4 Memory',
                    '900 GB SAS 10K RPM Hard Drive',
                    'Drive Bays: 8 x 2.5" Hard Drive',
                    '4 x 10Gb Gigabit Network Lan Ports',
                    'Dual Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ],
                Business: [
                    'Refurbished Dell PowerEdge R640 Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Total 40 Cores & 80 vCPUs',
                    '32 GB DDR4 Memory',
                    '1.2 TB SAS 10K RPM Hard Drive',
                    'Drive Bays: 8 x 2.5" Hard Drive',
                    '4 x 10Gb Gigabit Network Lan Ports',
                    'Dual Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ],
                Enterprise: [
                    'Refurbished Dell PowerEdge R640 Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Total 40 Cores & 80 vCPUs',
                    '64 GB DDR4 Memory',
                    '1.2 TB SAS 10K RPM Hard Drive',
                    'Drive Bays: 8 x 2.5" Hard Drive',
                    '4 x 10Gb Gigabit Network Lan Ports',
                    'Dual Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Dual Intel Xeon Processors",
                    content: "Equipped with dual Intel Xeon Scalable processors, the R640 provides fast and stable computing. Furthermore, its multi-core architecture supports heavy workloads and smooth multitasking. Therefore, the Refurbished Dell R640 is perfect for demanding enterprise environments."
                },
                {
                    title: "High-Speed Memory",
                    content: "The server supports DDR4 ECC memory, improving data accuracy and reducing errors. Additionally, memory can be expanded up to 3TB, allowing seamless operation for virtualization and large-scale applications. Consequently, users benefit from consistent and reliable performance on the Dell PowerEdge R640 Server."
                },
                {
                    title: "Flexible Storage Options - R640",
                    content: "The Dell PowerEdge R640 supports multiple HDD and SSD configurations. Moreover, SSDs deliver faster boot and application times, while HDDs provide larger capacity. Therefore, when you Buy Refurbished Dell PowerEdge R640 Server, you can configure storage to balance speed and capacity based on your business needs."
                },
                {
                    title: "Graphics & PCIe Expansion",
                    content: "With multiple PCIe slots, the R640 allows expansion for GPUs, network cards, or storage controllers. Additionally, remote management via iDRAC ensures efficient monitoring. Thus, the Refurbished Dell R640 is easy to manage and upgrade."
                }
            ];
        }

        // Specific overrides for R650
        if (prod.slug === 'dell-r650') {
            p.oldPrice = '5,20,000.00';
            p.newPrice = '3,70,000.00';
            p.businessPrice = '3,90,000.00';
            p.enterprisePrice = '4,50,000.00';
            p.specs = [
                { label: 'Product', value: 'Dell PowerEdge R650 Server' },
                { label: 'Form Factor', value: '1U Rack' },
                { label: 'Processor', value: 'Intel Xeon Scalable Processor Family' },
                { label: 'Memory', value: '32 DDR4 DIMM Slots, Supports up to 8TB Memory' },
                { label: 'Hard Drive', value: '4 x 3.5" or 10 x 2.5" SAS/SATA Hand Drives' },
                { label: 'Warranty', value: '3 Years Hardware Warranty' }
            ];
            p.description = "Dell R650 Server – High-Performance 1U Rack Server for Data Centers. Buy Dell PowerEdge R650 to get a high-performance 1U rack server designed for modern data centers and enterprise IT environments. Therefore, businesses benefit from its advanced architecture, scalability, and security. Moreover, the Dell R650 Server is an ideal solution for virtualization, cloud computing, and mission-critical workloads that require consistent performance.";
            p.tierSpecs = {
                Budget: ['Base Configuration', 'Scalable Performance', 'Standard NVMe Support'],
                Business: ['Optimized for Virtualization', 'High-Speed Connectivity', 'Enhanced Storage'],
                Enterprise: ['Mission Critical Ready', 'Maximum Memory Capacity', 'Premium PCIe Gen4 Support']
            };
            p.additionalPoints = [
                {
                    title: "Intel Xeon Scalable Processors",
                    content: "Supports Intel Xeon Scalable processors for fast and efficient computing. Therefore, it handles demanding enterprise applications smoothly."
                },
                {
                    title: "High-Speed DDR4 Memory",
                    content: "Offers scalable DDR4 memory for improved system performance. As a result, multitasking and virtual workloads run efficiently."
                },
                {
                    title: "Flexible NVMe Storage",
                    content: "Supports NVMe, SAS, and SATA drives for fast data access. Hence, it suits storage-intensive workloads."
                },
                {
                    title: "PCIe Gen4 Expansion - Dell PowerEdge R650",
                    content: "Includes PCIe Gen4 slots for higher bandwidth. Moreover, it supports expansion cards and accelerators."
                }
            ];
        }

        // Specific overrides for R730
        if (prod.slug === 'dell-r730') {
            p.oldPrice = '82,000.00';
            p.newPrice = '62,000.00';
            p.businessPrice = '72,000.00';
            p.enterprisePrice = '92,000.00';
            p.specs = [
                { label: 'Product', value: 'Dell PowerEdge R730 Server' },
                { label: 'Form Factor', value: '2U Rack server' },
                { label: 'Processors', value: 'Intel Xeon E5-2600 V3 & V4 Processor Family' },
                { label: 'Chipset', value: 'Intel C610 Chipset' },
                { label: 'Memory', value: '24 DIMM slots, Up to 3TB DDR4 Memory' },
                { label: 'Drive Bays', value: '8 x 3.5" SAS, SATA, SSD Hard Drive' },
                { label: 'Condition', value: 'Refurbished' },
                { label: 'Warranty', value: '1 Year on RAM & Processor, 3 Months Hardware Warranty on Other Parts' }
            ];
            p.description = "Dell PowerEdge R730 Server: Buy Dell R730 Server for dependable and high-performance computing. The Dell PowerEdge R730 Server delivers strong enterprise level performance, efficiency and reliability in a 2U rack design. Moreover, it offers flexible scaling and timely uptime for growing businesses. As a result, it runs virtualization, databases, and analytics workloads smoothly while maintaining fast and consistent performance.";
            p.tierSpecs = {
                Budget: [
                    '2 x Intel Xeon E5-2670 v3 Processors',
                    '30 MB Cache, 2.30 GHz',
                    'Total 24 Cores & 48 vCPUs',
                    '16 GB DDR4 Memory',
                    '1.2 TB ( 2 x 600 GB 10K RPM )',
                    'Drive Bays: 8 x 2.5" Hard Drive',
                    '4 x 1Gb Gigabit Network Lan Ports',
                    '2 x 495W/750W Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ],
                Business: [
                    '2 x Intel Xeon E5-2680 v3 Processors',
                    '30 MB Cache, 2.50 GHz',
                    'Total 24 Cores & 48 vCPUs',
                    '32 GB DDR4 Memory',
                    '1.8 TB ( 2 x 900 GB 10K RPM )',
                    'Drive Bays: 8 x 2.5" Hard Drive',
                    '4 x 1Gb Gigabit Network Lan Ports',
                    '2 x 495W/750W Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ],
                Enterprise: [
                    '2 x Intel Xeon E5-2690 v3 Processors',
                    '30 MB Cache, 2.60 GHz',
                    'Total 24 Cores & 48 vCPUs',
                    '64 GB DDR4 Memory',
                    '1.8 TB ( 2 x 900 GB 10K RPM )',
                    'Drive Bays: 8 x 2.5" Hard Drive',
                    '4 x 1Gb Gigabit Network Lan Ports',
                    '2 x 495W/750W Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Powerful Multi-Core Processing",
                    content: "Powered by Intel Xeon E5-2600 v3/v4 processors with up to 44 cores, the Dell PowerEdge R730 Server delivers fast multitasking and strong performance, making it ideal for virtualization, databases, and other business-critical workloads. Moreover, its scalable design supports future expansion, ensuring reliable and consistent performance for demanding enterprise environments."
                },
                {
                    title: "High Memory Capacity for Intensive Workloads",
                    content: "Dell R730 Server features 24 DIMM slots that support up to 3TB of DDR4 memory, offering exceptional speed and responsiveness. Furthermore, DDR4 technology boosts memory performance by up to 50% compared to previous generations. Therefore, this server can effortlessly handle demanding workloads, large-scale databases, and virtualization tasks with remarkable stability and speed."
                }
            ];
        }

        // Specific overrides for R730xd
        if (prod.slug === 'dell-r730xd') {
            p.oldPrice = '89,000.00';
            p.newPrice = '69,000.00';
            p.businessPrice = '79,000.00';
            p.enterprisePrice = '99,000.00';
            p.specs = [
                { label: 'Product', value: 'Dell PowerEdge R730xd Server' },
                { label: 'Form Factor', value: '2U Rack Server' },
                { label: 'Processors', value: 'Intel Xeon E5-2600 V3 & V4 Series Processor' },
                { label: 'RAM', value: '24 x DDR4 RDIMM and LRDIMM Up to 3TB' },
                { label: 'Drive Bays', value: '26 x 2.5" SAS, SATA SSD/HDD' },
                { label: 'Condition', value: 'Refurbished' },
                { label: 'Warranty', value: '1 Year on RAM & Processor, 3 Months Hardware Warranty on Other Parts' }
            ];
            p.description = "Dell PowerEdge R730xd Server: The Dell PowerEdge R730xd features an exceptional blend of performance and flexibility in a low-socket, 2U form factor, featuring impressive storage and memory. Engineered in a 2U rack mount form factor, this low-socket server offers the perfect balance between storage capacity, processing power, and memory scalability—making it an excellent choice for demanding workloads such as virtualization, file storage, and data analytics.";
            p.tierSpecs = {
                Budget: [
                    'Dell PowerEdge R730xd Server',
                    'Intel Xeon E5 Core Processor v.3',
                    'Total 24 Cores & 48 vCPUs',
                    '16 GB PC4 2133 MT/s RAM',
                    '2 x 900 GB 10K RPM SAS 2.5" Hard Drive',
                    'Drive Bays: 24 x 2.5" Hard Drive',
                    '4 x 1GbE LOM Network Adapter',
                    '495W Redundant Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ],
                Business: [
                    'Dell PowerEdge R730xd Server',
                    'Intel Xeon E5 Core Processor v.3',
                    'Total 24 Cores & 48 vCPUs',
                    '32 GB PC4 2133 MT/s RAM',
                    '2 x 900 GB 10K RPM SAS 2.5" Hard Drive',
                    'Drive Bays: 24 x 2.5" Hard Drive',
                    '4 x 1GbE LOM Network Adapter',
                    '495W Redundant Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ],
                Enterprise: [
                    'Dell PowerEdge R730xd Server',
                    'Intel Xeon E5 Core Processor v.3',
                    'Total 24 Cores & 48 vCPUs',
                    '64 GB PC4 2133 MT/s RAM',
                    '2 x 900 GB 10K RPM SAS 2.5" Hard Drive',
                    'Drive Bays: 24 x 2.5" Hard Drive',
                    '4 x 1GbE LOM Network Adapter',
                    '495W Redundant Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Dual Intel Xeon Processor Performance",
                    content: "The R730xd uses dual Intel Xeon E5-2600 v3 and v4 processors, supporting up to 44 cores for powerful parallel processing. Moreover, the Intel C610 chipset delivers fast I/O, lower latency, and smart workload distribution for enterprise and virtualization tasks."
                },
                {
                    title: "Exceptional Memory Architecture - Dell R730xd Server",
                    content: "The R730xd has 24 DDR4 DIMM slots and supports up to 3TB of RDIMM or LRDIMM memory for fast and low latency performance. Moreover, ECC (Error Correcting Code) technology keeps data accurate. As a result, this server works well for virtualization, high-performance computing, and large database management."
                }
            ];
        }

        // Specific overrides for R740
        if (prod.slug === 'dell-r740') {
            p.oldPrice = '1,85,000.00';
            p.newPrice = '1,45,000.00';
            p.businessPrice = '1,55,000.00';
            p.enterprisePrice = '1,75,000.00';
            p.specs = [
                { label: 'Processor', value: 'Up to 2 Intel Xeon Processors (28 cores per processor)' },
                { label: 'Memory', value: 'Up to 3TB DDR4, 24 DIMM slots' },
                { label: 'Storage', value: 'Up to 8 or 16 x 2.5" drives' },
                { label: 'RAID', value: 'PERC H330, H730P, or H740P RAID controllers' },
                { label: 'I/O Slots', value: 'Up to 8 PCIe 3.0 slots' },
                { label: 'Network', value: 'Integrated Broadcom or Intel Quad Port' },
                { label: 'Power Supply', value: 'Redundant hot-plug PSUs (495W/750W/1100W)' },
                { label: 'Management', value: 'iDRAC9 with Lifecycle Controller' },
                { label: 'Form Factor', value: '2U Rack server' },
                { label: 'Ideal Use', value: 'Virtualization, AI/ML, VDI, business critical applications' }
            ];
            p.description = "Dell PowerEdge R740 Server – Powerful & Scalable 2U Rack Solution. Dell PowerEdge R740 Server is a high-performance 2U rack platform designed to maximize application speed and workload efficiency. Moreover, many businesses choose to Buy Dell PowerEdge R740 because it delivers the perfect balance of compute power, storage flexibility, and GPU scalability. As a result, Buy Dell PowerEdge R740 Server stands out as an ideal solution for virtualization, AI workloads, and enterprise-level applications.";
            p.tierSpecs = {
                Budget: [
                    'Dell PowerEdge R740 Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Max Turbo 3.70 GHz, Base 2.00 GHz',
                    '27.5M Cache, TDP 125 W',
                    'Total 40 Cores & 80 vCPUs',
                    '16 GB DDR4 Memory',
                    '2 x 300 GB SAS 10K RPM Hard Drive',
                    'Drive Bays: 8 x 2.5" Hard Drive',
                    '4 x 10Gb Gigabit Network Lan Ports',
                    '2 x 495W or 750W Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ],
                Business: [
                    'Dell PowerEdge R740 Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Max Turbo 3.70 GHz, Base 2.00 GHz',
                    '27.5M Cache, TDP 125 W',
                    'Total 40 Cores & 80 vCPUs',
                    '32 GB DDR4 Memory',
                    '2 x 600 GB SAS 10K RPM Hard Drive',
                    'Drive Bays: 8 x 2.5" Hard Drive',
                    '4 x 10Gb Gigabit Network Lan Ports',
                    '2 x 495W or 750W Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ],
                Enterprise: [
                    'Dell PowerEdge R740 Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Max Turbo 3.70 GHz, Base 2.00 GHz',
                    '27.5M Cache, TDP 125 W',
                    'Total 40 Cores & 80 vCPUs',
                    '64 GB DDR4 Memory',
                    '2 x 900 GB SAS 10K RPM Hard Drive',
                    'Drive Bays: 8 x 2.5" Hard Drive',
                    '4 x 10Gb Gigabit Network Lan Ports',
                    '2 x 495W or 750W Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Dual Intel Xeon Scalable Processors",
                    content: "The R740 runs on dual Intel Xeon Scalable processors, delivering fast and stable performance. Additionally, its multi-core design supports heavy multitasking and demanding workloads. Therefore, the Dell R740 Server performs well in cloud, database, and virtualized environments."
                },
                {
                    title: "High-Capacity DDR4 Memory - Dell R740 Server",
                    content: "This Dell R740 memory server supports up to 3TB of DDR4 RAM. Moreover, the advanced memory architecture improves speed and responsiveness. Consequently, businesses running large datasets or multiple VMs experience smoother operations."
                }
            ];
        }

        // Specific overrides for R740xd
        if (prod.slug === 'dell-r740xd') {
            p.oldPrice = '1,89,000.00';
            p.newPrice = '1,49,000.00';
            p.businessPrice = '1,59,000.00';
            p.enterprisePrice = '1,79,000.00';
            p.specs = [
                { label: 'Product', value: 'Dell EMC PowerEdge R740xd Server' },
                { label: 'Form Factor', value: '2U Rack Server' },
                { label: 'Processors', value: 'Intel Xeon Scalable Processor family' },
                { label: 'Chipset', value: 'Intel C620 Chipset' },
                { label: 'Memory', value: '24 DIMM slots, Supports Up to 3TB Memory' },
                { label: 'Hard Drive', value: '24 x 2.5" SAS/SATA/SSD Hard Drives' },
                { label: 'Warranty', value: '1 Year on RAM & Processor, 3 Months Hardware Warranty on Other Parts' }
            ];
            p.description = "Dell PowerEdge R740xd Server: The Dell EMC PowerEdge R740xd is a powerful 2U rack server built for high storage capacity and strong compute performance. It delivers excellent flexibility for data-driven workloads such as software-defined storage, virtualization, databases, and high performance computing. Moreover, its balanced architecture ensures smooth performance, high productivity, and reliable operation for modern enterprises.";
            p.tierSpecs = {
                Budget: [
                    'Dell EMC PowerEdge R740xd Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Max Turbo 3.70 GHz, Base 2.00 GHz',
                    '27.5M Cache, TDP 125 W',
                    'Total 40 Cores & 80 vCPUs',
                    '32 GB DDR4 Memory',
                    '2 x 600 GB SAS 10K RPM Hard Drive',
                    'Drive Bays: 24 x 2.5" Hard Drive',
                    '4 x 10Gb Gigabit Network Lan Ports',
                    '2 x 495W or 750W Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ],
                Business: [
                    'Dell EMC PowerEdge R740xd Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Max Turbo 3.70 GHz, Base 2.00 GHz',
                    '27.5M Cache, TDP 125 W',
                    'Total 40 Cores & 80 vCPUs',
                    '64 GB DDR4 Memory',
                    '2 x 1.2 TB SAS 10K RPM Hard Drive',
                    'Drive Bays: 24 x 2.5" Hard Drive',
                    '4 x 10Gb Gigabit Network Lan Ports',
                    '2 x 495W or 750W Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ],
                Enterprise: [
                    'Dell EMC PowerEdge R740xd Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Max Turbo 3.70 GHz, Base 2.00 GHz',
                    '27.5M Cache, TDP 125 W',
                    'Total 40 Cores & 80 vCPUs',
                    '128 GB DDR4 Memory',
                    '2 x 1.2 TB SAS 10K RPM Hard Drive',
                    'Drive Bays: 24 x 2.5" Hard Drive',
                    '4 x 10Gb Gigabit Network Lan Ports',
                    '2 x 495W or 750W Hot Plug Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Warranty on Other Parts'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Exceptional Multi-Core Processing Power",
                    content: "Powered by the Intel Xeon Scalable Processor family, the Dell R740xd supports up to 28 cores per processor, enabling parallel processing and smooth multitasking. Additionally, with support for up to two CPUs, it delivers exceptional performance for compute-intensive workloads. Therefore, businesses can run applications faster, process large datasets efficiently, and scale operations effortlessly."
                },
                {
                    title: "Massive Memory for Intensive Workloads",
                    content: "The PowerEdge R740xd supports up to 3TB DDR4 ECC memory across 24 DIMM slots, ensuring top-tier performance, reduced latency, and improved bandwidth. Because ECC memory automatically corrects data errors, it enhances system stability and reliability. Furthermore, this memory capacity allows organizations to run multiple virtual machines, databases, and enterprise applications simultaneously without performance drops."
                }
            ];
        }

        // Specific overrides for R750
        if (prod.slug === 'dell-r750') {
            p.oldPrice = '5,49,000.00';
            p.newPrice = '3,70,000.00';
            p.businessPrice = '3,90,000.00';
            p.enterprisePrice = '4,60,000.00';
            p.specs = [
                { label: 'Product', value: 'Dell PowerEdge R750 Server' },
                { label: 'Form Factor', value: '2U Rack' },
                { label: 'Processors', value: 'Intel Xeon Scalable Processors' },
                { label: 'Memory', value: '32 DDR4 DIMM Slots, Supports up to 8TB Memory' },
                { label: 'Disk Bays', value: 'Up to 12 x 3.5" or 16 x 2.5" SAS/SATA/NVMe Hard Drives' },
                { label: 'Warranty', value: '3 Years Hardware Warranty' }
            ];
            p.description = "Dell PowerEdge R750 Server – Powerful, Scalable, and Efficient. The Dell PowerEdge R750 Server is a high-performance 2U rack server designed for modern data center needs. It delivers strong processing power, flexible expansion options, and exceptional efficiency for virtualization, cloud workloads, and enterprise applications. Moreover, its balanced architecture ensures smooth performance even during demanding operations.";
            p.tierSpecs = {
                Budget: ['Base Configuration', 'High-Speed Networking Ready', 'Storage Optimized'],
                Business: ['Virtualization Focused', 'Increased RAM Capacity', 'Redundant Power'],
                Enterprise: ['Mission Critical Ready', 'Maximum Scalability', 'Next-Gen PCIe Gen4 Support']
            };
            p.additionalPoints = [
                {
                    title: "Powerful Processor Performance",
                    content: "The R750 runs on 3rd Gen Intel Xeon Scalable processors with up to 40 cores per CPU. As a result, it delivers fast, reliable performance for multi-threaded workloads, AI tasks, and heavy virtualization."
                },
                {
                    title: "High-Speed Memory Capacity",
                    content: "This server supports up to 8TB of DDR4/DDR5 ECC memory across 32 DIMM slots. Additionally, ECC protection ensures data accuracy, making the R750 ideal for analytics and memory-intensive workloads."
                },
                {
                    title: "Flexible Storage Options",
                    content: "The R750 offers SAS, SATA, and NVMe support, with configurations of up to 24 front drives. Furthermore, Dell PERC RAID controllers enhance reliability and deliver smooth data management."
                },
                {
                    title: "Advanced Graphics and PCIe Expansion",
                    content: "With PCIe Gen4 slots, the server supports GPUs, high-speed NICs, and storage accelerators. Moreover, when you Buy Dell PowerEdge R750, you get a system that allows businesses to easily scale performance as their needs grow."
                }
            ];
        }

        // Specific overrides for HP DL360 G9
        if (prod.slug === 'hp-dl360-g9') {
            p.oldPrice = '85,000.00';
            p.newPrice = '57,000.00';
            p.businessPrice = '67,000';
            p.enterprisePrice = '95,000';
            p.specs = [
                { label: 'Product', value: 'HPE ProLiant DL360 Gen9 Server' },
                { label: 'Form Factor', value: '1U Rack Server' },
                { label: 'Processors', value: 'Intel Xeon E5-2600 v3, v4 Family' },
                { label: 'Chipset', value: 'Intel C610' },
                { label: 'Memory', value: '24 DIMM Slots, Supports up to 1.5TB DDR4' },
                { label: 'Hard Drive', value: '8 x SAS, SATA, SSD 2.5" Drives' },
                { label: 'Condition', value: 'Refurbished' },
                { label: 'Warranty', value: '1 Year Warranty on RAM & Processor, 3 Months Hardware Warranty on Other Parts' }
            ];
            p.description = "HP ProLiant DL360 Gen9 Server – High-Performance 1U Rack Server. HPE ProLiant DL360 Gen9 Server is a compact 1U rack server built for strong speed, stable work, and low power use. Moreover, it saves space in modern data centers while delivering reliable performance. In addition, the server handles virtual machines, cloud apps, and database work with ease. Therefore, many companies choose to buy HP ProLiant DL360 Gen9 Server systems for daily business tasks. As a result, high-performance rack server India remains a trusted choice for data centers and growing IT systems.";
            p.tierSpecs = {
                Budget: [
                    '2 x Intel Xeon E5 Core Processors',
                    'Intel Xeon E5-2670 v3',
                    '30MB Cache, 2.30 GHz',
                    'Total 24 Cores & 48 vCPUs',
                    '16 GB PC4 Memory',
                    '900GB SAS 10k RPM Hard Disk Drive',
                    'Hard Drive Bays: 8 x 2.5" Hard Drive',
                    '4 Port HPE Embedded 1Gb Ethernet 331i Adapter',
                    'Redundant Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ],
                Business: [
                    '2 x Intel Xeon E5 Core Processors',
                    'Intel Xeon E5-2670 v3',
                    '30MB Cache, 2.30 GHz',
                    'Total 24 Cores & 48 vCPUs',
                    '32 GB PC4 Memory',
                    '900GB SAS 10k RPM Hard Disk Drive',
                    'Hard Drive Bays: 8 x 2.5" Hard Drive',
                    '4 Port HPE Embedded 1Gb Ethernet 331i Adapter',
                    'Redundant Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ],
                Enterprise: [
                    '2 x Intel Xeon E5 Core Processors',
                    'Intel Xeon E5-2680 v3',
                    '30MB Cache, 2.50 GHz',
                    'Total 24 Cores & 48 vCPUs',
                    '64 GB PC4 Memory',
                    '1.8TB (2 x 900GB) SAS 10k RPM Hard Disk Drive',
                    'Hard Drive Bays: 8 x 2.5" Hard Drive',
                    '4 Port HPE Embedded 1Gb Ethernet 331i Adapter',
                    'Redundant Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Exceptional Intel Xeon Processor Performance",
                    content: "The HP ProLiant DL360 Gen9 Server supports Intel Xeon E5-2600 v3 and v4 processors. Moreover, each CPU can offer up to 22 cores, which helps run many tasks at the same time. In addition, Intel Turbo Boost and Hyper-Threading improve system speed and task flow. Therefore, the server performs well during heavy workloads."
                },
                {
                    title: "High-Capacity – HPE DL360 Gen9 Server",
                    content: "The HP DL360 Gen9 Server supports up to 1.5TB DDR4 Smart Memory across 24 DIMM slots. Moreover, HP SmartMemory helps improve speed and system stability. In addition, it reduces errors and keeps the system running smoothly. Therefore, high-performance rack server India supports many apps and virtual machines at the same time."
                }
            ];
        }

        // Specific overrides for HP DL380 G9
        if (prod.slug === 'hp-dl380-g9') {
            p.oldPrice = '92,000.00';
            p.newPrice = '63,000.00';
            p.businessPrice = '73,000';
            p.enterprisePrice = '93,000';
            p.specs = [
                { label: 'Product', value: 'HPE ProLiant DL380 Gen9 Server' },
                { label: 'Form Factor', value: '2U Rack Server' },
                { label: 'Processor', value: 'Intel Xeon E5-2600 v3, v4 Processor Family' },
                { label: 'Chipset', value: 'Intel C610' },
                { label: 'Memory', value: '3TB (24 x 128GB LRDIMM @2400MHz)' },
                { label: 'Hard Drive', value: '8 x 3.5" (LFF), SFF Drives' },
                { label: 'Condition', value: 'Refurbished' },
                { label: 'Warranty', value: '1 Year on RAM & Processor, 3 Months Hardware Warranty on Other Parts' }
            ];
            p.description = "HPE DL380 Gen9 Server – Reliable 2U Enterprise Rack Server. The HPE DL380 Gen9 Server is one of the most trusted and widely used enterprise servers from Hewlett Packard Enterprise. Moreover, the HPE ProLiant DL380 Gen9 Server offers strong speed, flexible storage, and easy setup for businesses. In addition, this 2U rack server works well for virtual machines, business apps, and data-heavy tasks. Therefore, many companies choose to buy HPE ProLiant DL380 Gen9 Server systems for stable and long-term use.";
            p.tierSpecs = {
                Budget: [
                    '2 x Intel Xeon E5-2670 v3 Processors',
                    '30 MB Cache, 2.30 GHz',
                    'Total 24 Cores & 48 vCPUs',
                    '16 GB DDR4 Memory',
                    '2 TB SAS Hard Disk',
                    'Drive Bays: 8 x 3.5" Hard Drive',
                    '4 Port HPE Embedded 1Gb Ethernet 331i Adapter',
                    'HPE 500W Flex Slot Platinum Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ],
                Business: [
                    '2 x Intel Xeon E5-2670 v3 Processors',
                    '30 MB Cache, 2.30 GHz',
                    'Total 24 Cores & 48 vCPUs',
                    '32 GB DDR4 Memory',
                    '2 TB SAS Hard Disk',
                    'Drive Bays: 8 x 3.5" Hard Drive',
                    '4 Port HPE Embedded 1Gb Ethernet 331i Adapter',
                    'HPE 500W Flex Slot Platinum Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ],
                Enterprise: [
                    '2 x Intel Xeon E5-2670 v3 Processors',
                    '30 MB Cache, 2.30 GHz',
                    'Total 24 Cores & 48 vCPUs',
                    '64 GB DDR4 Memory',
                    '2 TB SAS Hard Disk',
                    'Drive Bays: 8 x 3.5" Hard Drive',
                    '4 Port HPE Embedded 1Gb Ethernet 331i Adapter',
                    'HPE 500W Flex Slot Platinum Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Exceptional Intel Xeon Processor Performance",
                    content: "The HP DL380 Gen9 Server supports Intel Xeon E5-2600 v3 and v4 processors. Moreover, each CPU can offer up to 22 cores, which helps run many tasks at the same time. In addition, Intel Turbo Boost and Hyper-Threading improve system speed and task flow. Therefore, the server performs well during heavy workloads."
                },
                {
                    title: "High-Speed DDR4 Memory Support",
                    content: "The HP ProLiant DL380 Gen9 Server supports up to 3TB DDR4 SmartMemory across 24 DIMM slots. Moreover, HP SmartMemory helps improve speed and system stability. In addition, it lowers power use while keeping the server stable. As a result, businesses get reliable performance for daily operations."
                }
            ];
        }

        // Specific overrides for HP DL360 G10
        if (prod.slug === 'hp-dl360-g10') {
            p.oldPrice = '1,65,000.00';
            p.newPrice = '1,15,000.00';
            p.businessPrice = '1,25,000';
            p.enterprisePrice = '1,45,000';
            p.specs = [
                { label: 'Product', value: 'HPE ProLiant DL360 Gen10 Server' },
                { label: 'Form Factor', value: '1U Rack Server' },
                { label: 'Chipset', value: 'Intel C621' },
                { label: 'Processors', value: 'Intel Xeon Scalable Processor Family' },
                { label: 'Memory', value: 'Support Up to 3TB, 24 DIMM slots' },
                { label: 'Disk drives', value: '8 x 2.5" SAS/SATA/SSD hard driver' },
                { label: 'Condition', value: 'Refurbished' },
                { label: 'Warranty', value: '3 Months Hardware Warranty' }
            ];
            p.description = "HPE ProLiant DL360 Gen10 Server – Compact, Fast, and Reliable 1U Server. The HPE ProLiant DL360 Gen10 Server is a compact 1U rack server built for speed, security, and steady performance. Moreover, it fits easily into any data center setup. In addition, it delivers strong power for daily and heavy workloads. Therefore, this ProLiant DL360 G10 server is a trusted choice for virtualization, cloud tasks, and core business apps.";
            p.tierSpecs = {
                Budget: [
                    'HPE ProLiant DL360 Gen10 Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Total 40 Cores & 80 vCPUs',
                    '16GB DDR4 Memory',
                    '600 GB SAS',
                    '8 x 2.5" Hard Drive bays',
                    'Embedded 4 X 1GbE Ethernet Adapter',
                    '2 x 800W Flex Slot Platinum Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ],
                Business: [
                    'HPE ProLiant DL360 Gen10 Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Total 40 Cores & 80 vCPUs',
                    '32GB DDR4 Memory',
                    '1 TB SAS',
                    '8 x 2.5" Hard Drive bays',
                    'Embedded 4 X 1GbE Ethernet Adapter',
                    '2 x 800W Flex Slot Platinum Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ],
                Enterprise: [
                    'HPE ProLiant DL360 Gen10 Server',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Total 40 Cores & 80 vCPUs',
                    '64GB DDR4 Memory',
                    '1 TB SAS',
                    '8 x 2.5" Hard Drive bays',
                    'Embedded 4 X 1GbE Ethernet Adapter',
                    '2 x 800W Flex Slot Platinum Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '3 Months Hardware Warranty'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Fast and Efficient Intel Xeon Scalable Processors",
                    content: "The HP DL360 G10 Server runs on Intel Xeon Scalable processors. Therefore, it delivers fast speed and smooth multitasking. Moreover, it handles both daily tasks and advanced work with ease. As a result, businesses enjoy steady and reliable performance at all times."
                },
                {
                    title: "Large Memory Capacity for HPE DL360 Gen10 Server",
                    content: "This HP DL360 G10 rack server supports up to 3TB of memory across 24 DIMM slots. Therefore, it is ideal for virtual machines, databases, and memory-heavy apps. Moreover, smart memory support keeps the system stable. As a result, performance stays smooth even during long work hours."
                },
                {
                    title: "Flexible 8-Bay Storage Configuration",
                    content: "The HPE ProLiant DL360 Gen10 supports 8 x 2.5-inch SAS, SATA, or SSD drives. Therefore, users can choose storage for speed or space. Moreover, SSDs improve speed while HDDs add capacity. As a result, the server offers a strong mix of speed, space, and flexibility."
                },
                {
                    title: "PCIe Expansion for Future Growth",
                    content: "The HP DL360 G10 rack server includes multiple PCIe Gen3 slots. Therefore, users can add network cards, RAID controllers, or GPUs easily. Moreover, these slots allow simple upgrades. As a result, the server stays ready for future needs."
                }
            ];
        }

        // Specific overrides for HP DL380 G10 (Plus specs from image)
        if (prod.slug === 'hp-dl380-g10') {
            p.oldPrice = '7,00,000.00';
            p.newPrice = '5,39,000.00';
            p.businessPrice = '5,60,000.00';
            p.enterprisePrice = '6,20,000.00';
            p.specs = [
                { label: 'Form Factor', value: '2U Rackmount' },
                { label: 'CPU', value: 'Up to 2x 3rd Gen Intel Xeon Scalable (40 cores each)' },
                { label: 'Memory', value: 'Up to 8TB DDR4 (32 DIMM slots, 3200 MT/s)' },
                { label: 'Storage', value: 'Up to 20 SFF / 12 LFF; SAS, SATA, NVMe supported' },
                { label: 'RAID', value: 'HPE Smart Array Controllers' },
                { label: 'Expansion', value: 'Up to 8x PCIe Gen4 slots' },
                { label: 'Networking', value: 'OCP 3.0, up to 100GbE' },
                { label: 'Power', value: 'Redundant 800W/1600W Flex Slot PSUs' },
                { label: 'Management', value: 'HPE iLO 5, HPE InfoSight' },
                { label: 'Security', value: 'Silicon Root of Trust, TPM 2.0' },
                { label: 'OS Support', value: 'Windows, VMware, Linux' }
            ];
            p.description = "HPE ProLiant DL380 Gen10 Plus Server – Powerful, Secure, and Scalable Enterprise Server. The HPE ProLiant DL380 Gen10 Plus Server, also known as the HPE DL380 G10 Plus Server, HPE DL380 Plus DDR4 8TB server, and 2U dual-socket Gen10+ chassis, is a high-performance enterprise rack solution built for modern data centers. First, this 2U dual-socket Gen10+ chassis delivers strong computing power and flexible expansion. Moreover, it supports virtualization, cloud platforms, analytics, and database workloads.";
            p.tierSpecs = {
                Budget: ['HPE ProLiant DL380 Gen10 Plus Server', 'High-Speed Networking Ready', 'Storage Optimized'],
                Business: ['Virtualization Focused', 'Increased RAM Capacity', 'Redundant Power'],
                Enterprise: ['Mission Critical Ready', 'Maximum Scalability', 'Next-Gen PCIe Gen4 Support']
            };
            p.additionalPoints = [
                {
                    title: "Powerful Dual-Socket Performance",
                    content: "HPE DL380 Gen10 Plus Server supports up to 2x 3rd Gen Intel Xeon Scalable processors, with up to 40 cores per processor. Because of this, it delivers high multi-core performance for heavy workloads. As a result, the HPE ProLiant DL380 Gen10 Plus Server handles enterprise apps, virtualization, and data processing smoothly."
                },
                {
                    title: "High-Capacity DDR4 Memory Support",
                    content: "HPE DL380 Plus DDR4 8TB server supports up to 8TB DDR4 memory across 32 DIMM slots with speeds up to 3200 MT/s. Because of this large memory capacity, it manages memory-intensive tasks. In addition, faster DDR4 memory improves system response time. Therefore, this HPE DL380 Gen10 Plus Server is ideal for large databases and analytics workloads."
                },
                {
                    title: "Flexible Storage – HPE DL380 Gen10 Plus Server",
                    content: "The server supports up to 20 SFF or 12 LFF drives, including SAS, SATA, and NVMe options. Because of this, businesses can choose between high capacity or high speed. In addition, HPE Smart Array controllers manage data efficiently. As a result, the 2U dual-socket Gen10+ chassis provides scalable storage for growing data needs."
                },
                {
                    title: "Expansion, Networking, and Power Efficiency",
                    content: "HPE DL380 Gen10 Plus Server includes up to 8 PCIe Gen4 slots for expansion. Moreover, it supports OCP 3.0 networking with speeds up to 100GbE."
                }
            ];
        }

        // Specific overrides for HP Z440
        if (prod.slug === 'hp-z440') {
            p.oldPrice = '49,000.00';
            p.newPrice = '39,000.00';
            p.businessPrice = '49,000.00';
            p.enterprisePrice = '69,000.00';
            p.specs = [
                { label: 'Product', value: 'HP Z440 Workstation' },
                { label: 'Form Factor', value: 'Tower Model' },
                { label: 'Processors', value: 'Intel Xeon E5-1600 v3/v4 & E5-2600 v3/v4 Series Processor' },
                { label: 'Memory', value: '8 DIMM slots' },
                { label: 'RAM', value: 'Support up to 512GB of Memory' },
                { label: 'Hard Drive', value: 'Two 5.25", One slim ODD & Two 3.5"' },
                { label: 'Graphics', value: 'NVIDIA Quadro (up to P6000, 24GB), AMD FirePro (e.g., W7100, 8GB)' },
                { label: 'Slots', value: '2 PCIe Gen3 x16, 1 PCIe Gen3 x8, 1 PCIe Gen2 x2' },
                { label: 'Condition', value: 'Refurbished' },
                { label: 'Warranty', value: '1 Year on RAM & Processor, 3 Months Hardware Warranty' }
            ];
            p.description = "HP Z440 – Professional Workstation. The HP Z440 Workstation delivers strong speed, stable performance, and flexible upgrade options for professional users. First, it is built for engineers, designers, architects, and content creators who handle heavy workloads. Moreover, it supports smooth multitasking for 3D design, video editing, rendering, and data tasks. Therefore, many professionals now choose to buy HP Z440 Workstation in India for powerful and cost-effective performance.";
            p.tierSpecs = {
                Budget: [
                    'HP Z440 Workstation',
                    'Intel Xeon E5-1650 v3 Processor',
                    'Total 14 Cores & 28 vCPUs',
                    '16 GB DDR4 Memory',
                    '240GB SSD Hard Drive',
                    '1TB 3.5" SATA Hard Drive',
                    'NVIDIA Quadro K620 Graphics Card',
                    'Integrated Intel I217 Gigabit Network controller',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Business: [
                    'HP Z440 Workstation',
                    'Intel Xeon E5-2680 v3 Processor',
                    'Total 14 Cores & 28 vCPUs',
                    '32 GB DDR4 Memory',
                    '240GB SSD Hard Drive',
                    '1TB 3.5" SATA Hard Drive',
                    'NVIDIA Quadro K2200 Graphics Card',
                    'Integrated Intel I217 Gigabit Network controller',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Enterprise: [
                    'HP Z440 Workstation',
                    'Intel Xeon E5-2680 v3 Processor',
                    'Total 14 Cores & 28 vCPUs',
                    '64 GB DDR4 Memory',
                    '480GB SSD Hard Drive',
                    '1TB 3.5" SATA Hard Drive',
                    'NVIDIA Quadro M4000 Graphics Card',
                    'Integrated Intel I217 Gigabit Network controller',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Powerful Intel Xeon Performance",
                    content: "The HP Z440 Engineering Workstation supports Intel Xeon E5-1650 v3/v4 and E5-2600 v3/v4 processors. As a result, it delivers strong multi-core power for heavy tasks. Moreover, it handles demanding software with ease. In addition, the advanced processor support ensures stable speed during long working hours. Therefore, it is ideal for design studios and technical offices."
                },
                {
                    title: "High DDR4 Memory Capacity",
                    content: "The HP Z440 includes 8 DIMM slots and supports up to 512GB DDR4 ECC memory. Moreover, large memory capacity allows smooth handling of large files and complex projects. In addition, ECC memory helps detect and correct small errors. As a result, users experience reliable and accurate performance. Therefore, it supports high-end professional workflows."
                },
                {
                    title: "Flexible and Expandable Storage",
                    content: "The HP Engineering Workstation comes with two 5.25 inch bays, one slim ODD, and two 3.5-inch drive bays. Moreover, users can install multiple HDDs or SSDs for better speed and storage space. In addition, flexible storage setup allows easy upgrades as business needs grow. As a result, it supports both high performance and large data storage."
                },
                {
                    title: "PCIe Expansion for Buy HP Z440 Workstation",
                    content: "The HP Z440 includes two PCIe Gen3 x16 slots, one PCIe Gen3 x8 slot, and one PCIe Gen2 x2 slot. Therefore, users can add professional GPUs and expansion cards easily. Moreover, these slots support future upgrades. In addition, better GPU support improves design and rendering performance. As a result, the workstation stays ready for new technology needs."
                }
            ];
        }

        // Specific overrides for HP Z640
        if (prod.slug === 'hp-z640') {
            p.oldPrice = '83,000.00';
            p.newPrice = '63,000.00';
            p.businessPrice = '73,000.00';
            p.enterprisePrice = '93,000.00';
            p.specs = [
                { label: 'Product', value: 'HP Z640 Workstation' },
                { label: 'Form Factor', value: 'Tower Model' },
                { label: 'Processors', value: '2 Intel Xeon E5-2600 v3 & v4 Family' },
                { label: 'Chipset', value: 'Intel C612 Chipset' },
                { label: 'Memory', value: '8 DIMM Slots' },
                { label: 'RAM', value: 'Support up to 512GB DDR4 Memory' },
                { label: 'Hard Drive Two', value: '3.5" SATA, Two 5.25"' },
                { label: 'Slots', value: '2 PCIe x16 (Gen3) Slots, 1 PCIe x16 (x8) Gen3' },
                { label: 'Condition', value: 'New' },
                { label: 'Warranty', value: '1 Year on RAM & Processor, 1 Months Hardware Warranty' }
            ];
            p.description = "HP Z640 Workstation – Dual Intel Xeon Workstation for Professionals. The HP Z640 Workstation is a fast and reliable dual-Intel Xeon workstation built for professional users who need speed and trust every day. In addition, it is often sold as the HP Z640 Intel Xeon E5 workstation for users who need more power. Furthermore, many professionals also refer to it as the HP Z640 dual CPU workstation or HP Z640 scalable workstation. Therefore, with strong flexibility, upgrade options, and a competitive HP Z640 Workstation price, it delivers excellent value for professional buyers.";
            p.tierSpecs = {
                Budget: [
                    'HP Z640 Workstation',
                    'Intel Xeon E5-2620 v3 Processor x 2',
                    'Total 36 Cores & 24 vCPUs',
                    '16 GB DDR4 Memory',
                    '240 GB SSD',
                    '1 TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro K620 Graphics Card',
                    'Dual integrated Intel GbE LAN',
                    '925 W 90% efficient, active PFC SMPS',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Business: [
                    'HP Z640 Workstation',
                    'Intel Xeon E5-2620 v3 Processor x 2',
                    'Total 36 Cores & 24 vCPUs',
                    '32GB DDR4 Memory',
                    '240 GB SSD',
                    '1 TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro K2200 Graphics Card',
                    'Dual integrated Intel GbE LAN',
                    '925 W 90% efficient, active PFC SMPS',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Enterprise: [
                    'HP Z640 Workstation',
                    'Intel Xeon E5-2620 v3 Processor x 2',
                    'Total 36 Cores & 24 vCPUs',
                    '64 GB DDR4 Memory',
                    '240 GB SSD',
                    '2 TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro M4000 Graphics Card',
                    'Dual integrated Intel GbE LAN',
                    '925 W 90% efficient, active PFC SMPS',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ]
            };
            p.additionalPoints = [
                {
                    title: "High-Performance Processing Power",
                    content: "The HP Z640 Workstation supports dual Intel Xeon E5-2600 v3 and v4 processors. Therefore, it delivers fast and stable performance for heavy tasks. Moreover, the dual Intel Xeon processors allow many programs to run at the same time. Furthermore, this makes the HP Z640 Intel Xeon E5 workstation a smart choice for business and creative use."
                },
                {
                    title: "Flexible Memory Support for Daily Work",
                    content: "The HP Z640 Workstation includes 8 memory slots and supports up to 512GB DDR4 memory. Therefore, users can run many programs and virtual machines at once. Moreover, large memory helps avoid slowdowns. In addition, memory upgrades are easy as work needs grow. As a result, the system stays ready for future tasks."
                },
                {
                    title: "Expandable Storage Options",
                    content: "The HP Z640 dual CPU workstation supports two 3.5-inch SATA drives and two 5.25-inch bays. Moreover, users can choose storage for speed or space. However, this setup allows mixing HDDs and SSDs. As a result, data access stays fast and safe. Consequently, this makes the HP Z640 Workstation a reliable option for daily work."
                },
                {
                    title: "PCIe Slots for Easy Expansion",
                    content: "The HP Z640 Intel Xeon E5 workstation offers three PCIe x16 (Gen3) slots and one PCIe x16 (x8) Gen3 slot. Therefore, users can add professional GPUs, RAID cards, or other add-on cards easily. Moreover, this keeps the workstation flexible. As a result, it stays future-ready for new projects. Therefore, the HP Z640 Workstation price is well suited for power users."
                }
            ];
        }

        // Specific overrides for HP Z840
        if (prod.slug === 'hp-z840') {
            p.oldPrice = '96,000.00';
            p.newPrice = '76,000.00';
            p.businessPrice = '86,000.00';
            p.enterprisePrice = '1,06,000.00';
            p.specs = [
                { label: 'Product', value: 'HP Z840 Workstation' },
                { label: 'Form Factor', value: 'Tower Model' },
                { label: 'Processors', value: '2 Intel Xeon E5-2600 v3 & v4 Family' },
                { label: 'Chipset', value: 'Intel C612 Chipset' },
                { label: 'Memory', value: '16 DIMM Slots' },
                { label: 'RAM', value: 'Support up to 1 TB DDR4 Memory' },
                { label: 'Hard Drive Four', value: '3.5" SATA, Three 5.25"' },
                { label: 'Slots', value: '2 PCIe x16 Gen3 Slots, 1 PCIe x16 (x8) Gen3' },
                { label: 'Condition', value: 'Refurbished' },
                { label: 'Warranty', value: '1 Year on RAM & Processor' }
            ];
            p.description = "HP Z840 Workstation – Ultimate Power and Expandability. The HP Z840 Workstation is a high-performance professional tower designed for engineers, designers, and content creators. Moreover, it provides incredible computing power with dual Intel Xeon E5-2600 v3 & v4 processors, ensuring smooth performance for CAD, 3D modeling, video editing, and visual effects. As a result, demanding applications run efficiently without lag, making it ideal for high-end computing environments.";
            p.tierSpecs = {
                Budget: [
                    'HP Z840 Workstation',
                    '2 x Intel Xeon E5-2620 v4 Processors',
                    'Total 36 Cores & 56 vCPUs',
                    '16 GB DDR4 Memory',
                    '240 GB SSD',
                    '1 TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro 4GB Graphics Card',
                    'Dual integrated Intel GbE LAN',
                    '850W 88% or 1125W 90% Efficient Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Business: [
                    'HP Z840 Workstation',
                    '2 x Intel Xeon E5-2620 v4 Processors',
                    'Total 36 Cores & 56 vCPUs',
                    '32 GB DDR4 Memory',
                    '240 GB SSD',
                    '1 TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro 4GB Graphics Card',
                    'Dual integrated Intel GbE LAN',
                    '850W 88% or 1125W 90% Efficient Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Enterprise: [
                    'HP Z840 Workstation',
                    '2 x Intel Xeon E5-2620 v4 Processors',
                    'Total 36 Cores & 56 vCPUs',
                    '64 GB DDR4 Memory',
                    '240 GB SSD',
                    '1 TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro 4GB Graphics Card',
                    'Dual integrated Intel GbE LAN',
                    '850W 88% or 1125W 90% Efficient Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ]
            };
            p.additionalPoints = [
                {
                    title: "High-Performance Processors",
                    content: "This workstation features dual Intel Xeon E5-2600 v3 & v4 processors, which allow high-speed multitasking and smooth operation of demanding software. Moreover, these configurations make it ideal for Buy HP Z840 workstation with dual Xeon processors, handling graphics-intensive tasks and large computations effortlessly."
                },
                {
                    title: "Massive Memory Support",
                    content: "The Buy HP Z840 workstation with dual Xeon processors includes 16 DIMM slots supporting up to 1 TB DDR4 memory, enabling multiple applications and virtual machines to run simultaneously. Moreover, memory expansion is simple as project demands grow."
                },
                {
                    title: "Expandable Storage Options",
                    content: "This system supports up to 10 storage devices, including four 3.5\" SATA drives and three 5.25\" bays. Moreover, it allows a mix of SSDs and HDDs for speed and capacity. In addition, hot swap support ensures drives can be replaced without shutting down the workstation."
                },
                {
                    title: "PCIe Expansion Slots",
                    content: "The workstation provides 2 PCIe x16 Gen3 slots and 1 PCIe x16 (x8) Gen3 slot, making it easy to add graphics cards, RAID controllers, or other expansion devices. Moreover, the total of seven expansion slots ensures the system remains scalable and future-ready."
                }
            ];
        }

        // Specific overrides for HP Z4 G4
        if (prod.slug === 'hp-z4-g4') {
            p.oldPrice = '89,000.00';
            p.newPrice = '69,000.00';
            p.businessPrice = '79,000.00';
            p.enterprisePrice = '99,000.00';
            p.specs = [
                { label: 'Product', value: 'HP Z4 G4 Tower Workstation' },
                { label: 'Form Factor', value: 'Tower' },
                { label: 'Processors', value: 'Intel Core X-series & Intel Xeon W Processors' },
                { label: 'Chipset', value: 'Intel C422' },
                { label: 'Memory', value: '8 DIMM slots' },
                { label: 'RAM', value: 'Support Up to 512GB DDR4 Memory' },
                { label: 'Hard Drive', value: 'Two x 2.5" or 3.5" SAS, SATA or SSD Hard Drive Bays' },
                { label: 'Slots', value: '2 PCIe x16 Gen3, 2 M.2 PCIe x4 slots' },
                { label: '24x7 Support', value: 'Standard' },
                { label: 'Instant Shipping', value: 'Across India' },
                { label: 'Exclusive of Taxes', value: '***' }
            ];
            p.description = "HP Z4 G4 Workstation: The HP Z4 G4 Workstation offers great value for professionals seeking speed, flexibility, and reliability. Moreover, it handles CAD, 3D rendering, simulations, and other data-intensive tasks efficiently. The HP Z4 workstation provides configurable options for memory, storage, and expansion, making it ideal for engineers, designers, and control centers.";
            p.tierSpecs = {
                Budget: ['Base Configuration', 'Scalable Memory', 'Standard Graphics Card'],
                Business: ['Enhanced Multi-Core CPU', 'Larger SSD Storage', 'Professional NVIDIA Quadro'],
                Enterprise: ['Top Tier Xeon W Processor', 'Maximum RAM Configuration', 'Dual Storage Setup (SSD+HDD)']
            };
            p.additionalPoints = [
                {
                    title: "High-Speed Intel Processing",
                    content: "The HP Workstation reflects its powerful Intel Core X-series and Intel Xeon W processors, which deliver fast, steady, and reliable performance. These processors also let you run multiple programs, and large projects, smoothly without delays."
                },
                {
                    title: "Flexible Memory Support",
                    content: "The HP Workstation includes 8 DIMM slots, supporting up to 512GB DDR4 memory. Moreover, this large memory capacity lets multiple virtual machines, simulations, and high-end applications run at the same time."
                },
                {
                    title: "Expandable Storage Options",
                    content: "This system supports two x 2.5\" or 3.5\" SAS, SATA, or SSD drives, providing flexibility for both speed and capacity. Moreover, users can mix storage types to suit project needs. In addition, hot swap support allows drives to be replaced without downtime."
                },
                {
                    title: "PCIe Slots for Expansion",
                    content: "The HP Workstation has 2 PCIe x16 slots and 2 M.2 PCIe x4 slots. These slots make it easy to add GPUs, RAID controllers, or other expansion cards. They also let you upgrade quickly as your professional needs change."
                },
                {
                    title: "Power Reliability",
                    content: "This workstation includes redundant power options, ensuring continuous operation even if one unit fails. Furthermore, its energy-efficient design saves power while maintaining strong performance. As a result, users enjoy maximum uptime and smooth daily work without interruptions."
                },
                {
                    title: "HP Z4 G4 Workstation Online from ServerCart?",
                    content: "Buying from ServerCart guarantees fully tested and certified HP Z4 G4 Workstation systems. Moreover, customers get fast delivery, competitive pricing, and expert support. In addition, setup guidance and warranty options provide peace of mind."
                }
            ];
        }

        // Specific overrides for HP Z6 G4
        if (prod.slug === 'hp-z6-g4') {
            p.oldPrice = '1,90,000.00';
            p.newPrice = '1,50,000.00';
            p.businessPrice = '1,65,000.00';
            p.enterprisePrice = '1,95,000.00';
            p.specs = [
                { label: 'Product', value: 'HP Z6 G4 Workstation' },
                { label: 'Form Factor', value: 'Tower' },
                { label: 'Processors', value: 'Intel Xeon Scalable Processor Family' },
                { label: 'Chipset', value: 'Intel C622' },
                { label: 'Memory', value: '12 DIMM slots' },
                { label: 'RAM', value: 'Support Up to 768GB DDR4 Memory' },
                { label: 'Hard Drive', value: 'Two x 2.5" or 3.5" or 2 x 5.25" SAS, SATA or SSD Hard Drive Bays' },
                { label: 'Slots', value: '2 PCIe x16, 3 PCIe x4, 1 PCIe x8' },
                { label: '24x7 Support', value: 'Standard' },
                { label: 'Instant Shipping', value: 'Across India' },
                { label: 'Exclusive of Taxes', value: '***' }
            ];
            p.description = "HP Z6 G4 Workstation – High-End Workstation. The HP Z6 G4 Workstation delivers strong speed, large memory, and flexible upgrade options for professional users. Moreover, it supports virtualization, which allows users to run multiple virtual machines for testing, development, and server-based tasks. Furthermore, the HP Z6 G4 with M.2 NVMe support gives faster storage speed. Therefore, many users now choose to buy HP Z6 G4 Workstation in India for smooth, powerful work output and reliable virtualization support.";
            p.tierSpecs = {
                Budget: ['HP Z6 G4 Workstation', 'Intel Xeon Scalable Bronze/Silver', '32GB DDR4 Memory', '500GB SSD', 'NVIDIA Quadro T1000'],
                Business: ['HP Z6 G4 Workstation', 'Intel Xeon Scalable Gold', '64GB DDR4 Memory', '1TB NVMe SSD', 'NVIDIA Quadro RTX 4000'],
                Enterprise: ['HP Z6 G4 Workstation', 'Dual Intel Xeon Scalable Gold', '128GB DDR4 Memory', '2TB NVMe SSD', 'NVIDIA Quadro RTX 5000']
            };
            p.additionalPoints = [
                {
                    title: "Dual Intel Xeon Power for Heavy Tasks",
                    content: "The HP Z6 G4 supports dual Intel Xeon Scalable processors with the Intel C622 chipset. As a result, it can deliver up to 52 cores for fast multi-task work. Moreover, Intel Turbo Boost increases speed up to 3.8 GHz when needed. In addition, this strong setup handles heavy apps and large tasks with ease. Therefore, it is ideal for design, render, and data work."
                },
                {
                    title: "Large DDR4 Memory for Smooth Workflow",
                    content: "The HP Z6 G4 supports up to 768GB DDR4 ECC memory across 12 DIMM slots. Moreover, large memory size allows smooth handling of big files. In addition, ECC memory helps find and fix small errors. As a result, users can work on complex jobs without delay. Therefore, it is perfect for long and heavy work sessions."
                },
                {
                    title: "Fast and Flexible Storage Options",
                    content: "The HP Z6 G4 with M.2 NVMe offers fast storage for quick data access. Moreover, it includes two internal bays for 2.5-inch or 3.5-inch SAS, SATA, or SSD drives. In addition, two external 5.25-inch bays allow extra storage space. As a result, users can set up RAID for better speed and data safety. Therefore, it supports both speed and storage growth."
                },
                {
                    title: "Easy Expansion – Buy HP Z6 G4 Workstation",
                    content: "The workstation includes six PCIe slots: three x4, one x8, and two x16. Therefore, users can add GPUs, RAID cards, and network cards easily. Moreover, this upgrade support keeps the system ready for future needs. In addition, strong GPU support helps with design and video tasks. As a result, the system grows with your business."
                },
                {
                    title: "Strong and Efficient Power Supply",
                    content: "The HP Z6 G4 comes with a 1000W power supply that offers high efficiency. Moreover, it delivers stable power for high-end graphics and heavy workloads. As a result, the workstation runs smoothly for long hours. Therefore, users get both power and energy savings."
                },
                {
                    title: "Buy HP Z6 G4 Workstation from ServerCart",
                    content: "When you buy the HP Z6 G4 Workstation from ServerCart, you get a fully tested system at a good price. Moreover, ServerCart offers best price deals and fast delivery across India. In addition, customers receive expert help before and after purchase with warranty support."
                }
            ];
        }

        // Specific overrides for HP Z8 G4
        if (prod.slug === 'hp-z8-g4') {
            p.oldPrice = '2,50,000.00';
            p.newPrice = '2,00,000.00';
            p.businessPrice = '2,30,000.00';
            p.enterprisePrice = '2,80,000.00';
            p.specs = [
                { label: 'Product', value: 'HP Z8 G4 Workstation' },
                { label: 'Form Factor', value: 'Tower' },
                { label: 'Processors', value: 'Intel Xeon Scalable Processor Family' },
                { label: 'Chipset', value: 'Intel C622' },
                { label: 'Memory', value: '24 DIMM slots' },
                { label: 'RAM', value: 'Support Up to 3TB DDR4 Memory' },
                { label: 'Hard Drive', value: 'Four x 3.5" or 2 x 5.25" SAS, SATA or SSD Hard Drive Bays' },
                { label: 'Slots', value: '4 PCIe x16 Gen3, 2 PCIe Gen3 x4' },
                { label: '24x7 Support', value: 'Standard' },
                { label: 'Instant Shipping', value: 'Across India' },
                { label: 'Exclusive of Taxes', value: '***' }
            ];
            p.description = "HP Z8 G4 Workstation – High-Performance, Expandable, and Future-Ready. The HP Z8 G4 Workstation is a powerful professional system built for users who need strong performance, easy upgrades, and long-term reliability. Moreover, it is designed for heavy and continuous workloads. In addition, many users also search for it as the HP Z8 G4 PC, HP Z8 G4 tower workstation, or Dual Intel Xeon Scalable workstation. Therefore, it is a trusted choice for creative studios, engineering teams, and technical businesses.";
            p.tierSpecs = {
                Budget: ['HP Z8 G4 Workstation', 'Intel Xeon Scalable Silver', '64GB DDR4 Memory', '1TB SSD', 'NVIDIA Quadro RTX 4000'],
                Business: ['HP Z8 G4 Workstation', 'Dual Intel Xeon Scalable Gold', '128GB DDR4 Memory', '2TB NVMe SSD', 'NVIDIA Quadro RTX 5000'],
                Enterprise: ['HP Z8 G4 Workstation', 'Dual Intel Xeon Scalable Platinum', '256GB DDR4 Memory', '4TB NVMe SSD', 'NVIDIA Quadro RTX 6000']
            };
            p.additionalPoints = [
                {
                    title: "High-Performance Processing for Demanding Tasks",
                    content: "The HP Z8 G4 dual Xeon workstation supports dual Intel Xeon Scalable processors, delivering fast and stable performance. Moreover, it easily runs multiple demanding applications at the same time. As a result, professionals can complete complex tasks without delays. Therefore, the workstation is ideal for rendering, simulations, data processing, and design work."
                },
                {
                    title: "Flexible Memory Support for Smooth Workflows",
                    content: "The HP Z8 G4 Workstation includes 24 DIMM slots and supports up to 3TB DDR4 memory. Moreover, this large memory capacity allows smooth multitasking and fast data handling. In addition, memory upgrades are simple as project needs grow. Therefore, the workstation remains flexible and ready for future workloads."
                },
                {
                    title: "Scalable Storage Options for Speed and Safety",
                    content: "The HP Z8 G4 tower workstation supports 4 x 3.5-inch or 2 x 5.25-inch SAS, SATA, or SSD drives. Moreover, users can choose storage for speed, capacity, or backup needs. Thus, data stays safe, work continues smoothly, and storage grows with business needs."
                },
                {
                    title: "PCIe Expansion for HP Z8 G4 Workstation",
                    content: "The HP Z8 G4 Workstation offers PCIe Gen3 x16 and PCIe Gen3 x8 slots for GPUs, RAID controllers, and other add-on cards. Moreover, these expansion options allow the system to grow with changing requirements. As a result, the workstation stays adaptable and ready for new projects."
                },
                {
                    title: "Power Reliability and Advanced Cooling",
                    content: "When you buy the HP Z8 G4 Workstation, you get a high-capacity and efficient power supply with redundant options. Moreover, advanced cooling and power management keep the system stable during heavy workloads. Therefore, the workstation delivers high uptime while also reducing energy use."
                },
                {
                    title: "Buy HP Z8 G4 Workstation from ServerCart",
                    content: "When you buy the HP Z8 G4 Workstation from ServerCart, you receive a fully tested and certified system ready to use. Additionally, customers benefit from fast delivery, expert technical support, and competitive pricing. Therefore, businesses and professionals can trust ServerCart for a smooth, reliable, and secure purchase."
                }
            ];
        }

        // Specific overrides for Dell Precision T5810
        if (prod.slug === 'dell-t5810') {
            p.oldPrice = '49,000.00';
            p.newPrice = '39,000.00';
            p.businessPrice = '49,000.00';
            p.enterprisePrice = '69,000.00';
            p.specs = [
                { label: 'Product', value: 'Dell Precision T5810 Workstation' },
                { label: 'Form Factor', value: 'Tower Model' },
                { label: 'Processors', value: 'intel Xeon processor E5-1600 v3 series' },
                { label: 'Memory', value: '8 DIMM slots' },
                { label: 'RAM', value: 'Support up to 256GB Memory' },
                { label: 'Hard Drive', value: 'Up to (3) 3.5" or (4) 2.5" SATA, SAS, SSD' },
                { label: 'Slots', value: '2 PCIe x16 Gen 2/3 graphics cards' },
                { label: 'Condition', value: 'Refurbished' },
                { label: 'Warranty', value: '1 Year on RAM & Processor, 24/7 Tech support, 3 Month Hardware Warranty' }
            ];
            p.description = "Refurbished Dell Precision T5810 Workstation. The Refurbished Dell Precision T5810 Workstation delivers reliable power and smooth performance for professional workloads. Moreover, its strong build and easy upgradeability make it ideal for designers, engineers, editors, and business users.";
            p.tierSpecs = {
                Budget: [
                    'Refurbished Dell Precision T5810 Workstation',
                    'Intel Xeon E5-1650 v3 Processor',
                    'Total 14 Cores & 28 vCPUs',
                    '16 GB DDR4 Memory',
                    '240GB New SSD Hard Drive',
                    'NVIDIA Quadro 2000 Graphics Card',
                    'Integrated Intel I217 Gigabit Network controller',
                    '1 Month Hardware Warranty',
                    '1 Year Warranty on RAM & Processor'
                ],
                Business: [
                    'Refurbished Dell Precision T5810 Workstation',
                    'Intel Xeon E5-2680 v4 Processor',
                    'Total 14 Cores & 28 vCPUs',
                    '32GB DDR4 Memory',
                    '240GB New SSD Hard Drive',
                    'NVIDIA Quadro 2000 Graphics Card',
                    'Integrated Intel I217 Gigabit Network controller',
                    '1 Month Hardware Warranty',
                    '1 Year Warranty on RAM & Processor'
                ],
                Enterprise: [
                    'Refurbished Dell Precision T5810 Workstation',
                    'Intel Xeon E5-2680 v4 Processor',
                    'Total 14 Cores & 28 vCPUs',
                    '64 GB DDR4 Memory',
                    '240GB New SSD Hard Drive',
                    'NVIDIA Quadro 2000 Graphics Card',
                    'Integrated Intel I217 Gigabit Network controller',
                    '1 Month Hardware Warranty',
                    '1 Year Warranty on RAM & Processor'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Advanced Xeon Processing Performance",
                    content: "This workstation is powered by Intel Xeon E5 processors, which ensure fast and stable performance. Furthermore, the multi-core architecture allows users to handle rendering, simulation, and multi-application tasks with ease."
                },
                {
                    title: "High-Speed ECC Memory Architecture",
                    content: "The T5810 supports DDR4 ECC memory, offering improved accuracy and fewer system errors. Additionally, the memory can be expanded up to 256GB, allowing smooth multitasking even during heavy workloads."
                },
                {
                    title: "Flexible Storage for Every Workflow",
                    content: "When you Buy Refurbished Dell Precision T5810, you get flexible storage options with both HDD and SSD support. Moreover, SSDs offer quick boot speeds while HDDs provide larger capacity. Therefore, you can easily choose a setup that fits your workflow."
                },
                {
                    title: "Professional Graphics and PCIe Upgrade Space",
                    content: "With support for NVIDIA Quadro and AMD FirePro graphics cards, the T5810 delivers professional-grade visual output. Also, multiple PCIe expansion slots allow users to upgrade graphics, add high-speed storage cards, or enhance connectivity."
                }
            ];
        }

        // Specific overrides for Dell Precision T7810
        if (prod.slug === 'dell-t7810') {
            p.oldPrice = '95,000.00';
            p.newPrice = '72,000.00';
            p.businessPrice = '88,000.00';
            p.enterprisePrice = '1,20,000.00';
            p.specs = [
                { label: 'Product', value: 'Dell Precision 7810 Workstation' },
                { label: 'Form Factor', value: 'Tower Model' },
                { label: 'Processors', value: '2 Intel Xeon E5-2600 v3 & v4 Processor Family' },
                { label: 'Chipset', value: 'Intel C612 Chipset' },
                { label: 'Memory', value: '8 DIMM Slots' },
                { label: 'RAM', value: 'Support Up to 512GB DDR4 Memory' },
                { label: 'Hard Drive', value: 'Three 3.5" (LFF), Four 2.5" Hard Drive' },
                { label: 'Condition', value: 'Refurbished' },
                { label: 'Warranty', value: '1 Year on RAM & Processor, 3 Month Hardware Warranty' }
            ];
            p.description = "Dell Precision Tower 7810 Workstation. The Dell 7810 is a high-performance workstation built for professionals who need speed, stability, and easy scalability. Moreover, its powerful design makes it ideal for engineers, designers, and creators working on heavy projects. In addition, you can Buy Dell Precision Tower 7810 to get reliable performance for 3D modeling, rendering, simulations, and other demanding tasks.";
            p.tierSpecs = {
                Budget: [
                    'Dell Precision 7810 Workstation',
                    '2 x Intel Xeon E5-2670 v3 Processors',
                    'Total 24 Cores & 48 vCPUs',
                    '16 GB DDR4 Memory',
                    '240 GB SSD',
                    '2TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro 4 GB Graphics Card',
                    'Intel I217 Gigabit Ethernet LAN',
                    '825W or 685W Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Business: [
                    'Dell Precision 7810 Workstation',
                    '2 x Intel Xeon E5-2680 v4 Processors',
                    'Total 28 Cores & 56 vCPUs',
                    '32 GB DDR4 Memory',
                    '240 GB SSD',
                    '2TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro 8 GB Graphics Card',
                    'Intel I217 Gigabit Ethernet LAN',
                    '825W or 685W Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Enterprise: [
                    'Dell Precision 7810 Workstation',
                    '2 x Intel Xeon E5-2680 v4 Processors',
                    'Total 28 Cores & 56 vCPUs',
                    '64 GB DDR4 Memory',
                    '240 GB SSD',
                    '2TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro 8 GB Graphics Card',
                    'Intel I217 Gigabit Ethernet LAN',
                    '825W or 685W Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Powerful Intel Xeon Processing",
                    content: "Intel Xeon E5-2600 v3 and v4 processors deliver fast and reliable performance. Moreover, the Intel C612 chipset ensures smooth multitasking and efficient system communication, so your workloads run without delays."
                },
                {
                    title: "High Memory Capacity for Heavy Workloads",
                    content: "With 8 DIMM slots supporting up to 512GB DDR4 memory, the Dell Tower 7810 efficiently manages large datasets and multiple applications."
                },
                {
                    title: "Flexible and Scalable Storage",
                    content: "Dell 7810 includes three 3.5-inch SATA bays, and four 2.5 inch bays, providing flexible storage options. Moreover, you can combine SSDs for speed or HDDs for capacity."
                },
                {
                    title: "PCIe Expansion for Growth - Dell 7810",
                    content: "This workstation comes equipped with seven PCIe slots, including four PCIe x16 Gen3 and three PCIe x8 slots, allowing multiple GPUs and expansion cards."
                },
                {
                    title: "Power Efficiency and Reliability",
                    content: "The Tower 7810 Workstation combines energy efficiency with dependable performance. In addition, its advanced thermal system keeps the workstation cool during long workloads."
                },
                {
                    title: "Buy Dell Precision Tower 7810",
                    content: "Buying from ServerCart guarantees warranty-backed authentic Dell 7810 Workstation units at competitive prices, along with expert advice and fast delivery across India."
                }
            ];
        }

        // Specific overrides for Dell Precision T7910
        if (prod.slug === 'dell-t7910') {
            p.oldPrice = '1,75,000.00';
            p.newPrice = '93,500.00';
            p.businessPrice = '1,00,500';
            p.enterprisePrice = '1,16,500';
            p.specs = [
                { label: 'Product', value: 'Dell Precision Tower 7910 Workstation' },
                { label: 'Form Factor', value: 'Tower Model' },
                { label: 'Processors', value: 'Intel Xeon E5-2600 v4 Series Processor Family' },
                { label: 'Chipset', value: 'Intel C612 Chipset' },
                { label: 'Memory', value: '24 DIMM Slots' },
                { label: 'RAM', value: 'Support Up to 1TB DDR4 Memory' },
                { label: 'Hard Drive', value: 'Up to (4) 3.5" or (8) 2.5" SATA/SAS or SSD drives' },
                { label: 'Slots', value: '2 PCIe x16, x16 Graphics Cards' },
                { label: '24x7 Tech support', value: 'Standard' },
                { label: 'Exclusive of Taxes', value: '***' }
            ];
            p.description = "Dell Precision Tower 7910 Workstation. The Dell Precision Tower 7910 Workstation is a powerful and reliable dual Intel Xeon E5-2600 processor workstation designed for demanding professional workloads. As a trusted Dell T7910 workstation desktop, it supports dual Intel Xeon E5 processors, scalable DDR4 memory, flexible storage options, and strong PCIe expansion. Buy Dell Precision T7910 Workstation for even higher scalable performance.";
            p.tierSpecs = {
                Budget: [
                    'Dell Precision Tower 7910 Workstation',
                    'Intel Xeon 12 Core Processor x 2 CPUs',
                    'Total 24 Cores & 48 vCPUs',
                    '32 GB DDR4 Memory',
                    'Crucial 240 GB SSD',
                    '1 TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro 2GB Graphics Card',
                    'Dual Port integrated Intel GbE LAN',
                    '1300W 90% Efficient Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Business: [
                    'Dell Precision Tower 7910 Workstation',
                    'Intel Xeon 12 Core Processor x 2 CPUs',
                    'Total 24 Cores & 48 vCPUs',
                    '64GB DDR4 Memory',
                    'Crucial 240 GB SSD',
                    '1 TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro 4GB Graphics Card',
                    'Dual Port integrated Intel GbE LAN',
                    '1300W 90% Efficient Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Enterprise: [
                    'Dell Precision Tower 7910 Workstation',
                    'Intel Xeon 12 Core Processor x 2 CPUs',
                    'Total 24 Cores & 48 vCPUs',
                    '128GB DDR4 Memory',
                    'Crucial 240 GB SSD',
                    '2TB 3.5" 7200 RPM SATA Hard Drive',
                    'NVIDIA Quadro 4GB Graphics Card',
                    'Dual Port integrated Intel GbE LAN',
                    '1300W 90% Efficient Power Supply',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Dual Xeon E5-2600 Processors for Superior Performance",
                    content: "The Dell Precision T7910 Tower Workstation supports one or two Intel Xeon E5-2600 processors, each featuring up to eight cores. Moreover, Intel Turbo Boost dynamically adjusts clock speeds for brisk multitasking and intense computing tasks."
                },
                {
                    title: "Scalable DDR4 Memory for Efficient Multitasking",
                    content: "Moreover, it offers eight DIMM slots supporting up to 1TB DDR4 ECC registered memory. Hence, users experience smooth multitasking and rapid data access, even during heavy workloads."
                },
                {
                    title: "Flexible Storage Options with RAID Support",
                    content: "The workstation includes four 3.5-inch or four 2.5-inch bays for SATA, SAS, or SSD drives. The Dell PERC H330 RAID controller supports RAID 0, 1, 5, and 10 configurations, providing enhanced data reliability and speed."
                },
                {
                    title: "Dell Precision Tower 7910 Workstation",
                    content: "It provides two PCIe x16 Gen3 slots, along with other PCI and PCIe slots. Therefore, it supports professional Nvidia Quadro and AMD FirePro graphics cards, RAID controllers, and additional hardware upgrades."
                },
                {
                    title: "Efficient and Certified Power Supply",
                    content: "The Dell Precision Tower 7910 system features an 80 Plus Gold certified 635W or 825W power supply. Moreover, it delivers stable and efficient power, supporting multiple GPUs and expansions quietly and reliably."
                },
                {
                    title: "Why Buy Dell Precision Tower 7910 from Servercart?",
                    content: "Buying from Servercart guarantees warranty-backed authentic Dell Precision T7910 Workstation units at competitive prices. Additionally, Servercart offers expert advice and fast delivery across India."
                }
            ];
        }

        // Specific overrides for Dell Precision 7820
        if (prod.slug === 'dell-t7820') {
            p.oldPrice = '2,10,000.00';
            p.newPrice = '1,34,000.00';
            p.businessPrice = '1,48,000';
            p.enterprisePrice = '1,76,000';
            p.specs = [
                { label: 'Product', value: 'Dell Precision 7820 Workstation' },
                { label: 'Form Factor', value: 'Tower Model' },
                { label: 'Processors', value: '1st or 2nd gen Intel Xeon Scalable Processor Family' },
                { label: 'Chipset', value: 'Intel C621 Chipset' },
                { label: 'Memory', value: '12 DIMM Slots' },
                { label: 'RAM', value: 'Support up to 768GB DDR4 Memory' },
                { label: 'Hard Drive', value: 'Up to (6) 2.5"/3.5" SATA, HDD/SSDs & up to (4) 2.5" & (4) 3.5" drives' },
                { label: 'Slots', value: '2 PCIe x16 (Gen3) Graphics Cards' },
                { label: '24/7 Tech support', value: 'Standard' },
                { label: 'Exclusive of Taxes', value: '***' }
            ];
            p.description = "Buy Dell Precision 7820 Tower Workstation. The Dell Precision 7820 Tower Workstation is a high-performance Dell Dual Socket Precision Workstation designed for professionals requiring exceptional computing power with scalability. Featuring one or two 1st or 2nd generation Intel Xeon Scalable processors, each with up to 28 cores, it delivers outstanding multi-threaded performance.";
            p.tierSpecs = {
                Budget: [
                    'Dell Precision 7820 Tower Workstation',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Total 40 Cores & 80 vCPUs',
                    '16 GB DDR4 Memory',
                    '240 GB SSD',
                    '4TB SATA 7.2k RPM HDD',
                    'Nvidia Quadro 8 GB GPU',
                    '1GbE Gigabit Network Lan Port',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Business: [
                    'Dell Precision 7820 Tower Workstation',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Total 40 Cores & 80 vCPUs',
                    '32 GB DDR4 Memory',
                    '240 GB SSD',
                    '4TB SATA 7.2k RPM HDD',
                    'Nvidia Quadro 8 GB GPU',
                    '1GbE Gigabit Network Lan Port',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ],
                Enterprise: [
                    'Dell Precision 7820 Tower Workstation',
                    '2 x Intel Xeon Gold 6138 Processor',
                    'Total 40 Cores & 80 vCPUs',
                    '64 GB DDR4 Memory',
                    '240 GB SSD',
                    '4TB SATA 7.2k RPM HDD',
                    'Nvidia Quadro 8 GB GPU',
                    '1GbE Gigabit Network Lan Port',
                    '1 Year Warranty on RAM & Processor',
                    '1 Month Hardware Warranty'
                ]
            };
            p.additionalPoints = [
                {
                    title: "Processor Performance and Advanced Features",
                    content: "The Dell Precision 7820 Workstation leverages dual Intel Xeon Scalable processors with Intel Advanced Vector Extensions, Trusted Execution Technology, AES New Instructions."
                },
                {
                    title: "Scalable DDR4 Memory for Efficient Multitasking",
                    content: "Moreover, the system's 12 DIMM slots deliver support for up to 768GB of DDR4 ECC Registered memory, facilitating large workload management with high bandwidth."
                },
                {
                    title: "Efficient and Serviceable Power Supply",
                    content: "The workstation houses an 80 Plus Gold certified power supply that is tool-less and externally accessible. This power supply is engineered for efficiency and reliability, especially under heavy workloads."
                },
                {
                    title: "Flexible PCIe Expansion Slots – Dell 7820",
                    content: "The Dell Precision 7820 Tower Workstation offers maximum flexibility with its PCIe expansion slots. Specifically, it features two PCI Express Gen 3 x16 slots."
                },
                {
                    title: "Versatile Storage Options - 7820",
                    content: "The workstation supports storage with front accessible FlexBays for four 2.5\" or 3.5\" SATA/SAS drives. Additionally, it includes extra drive bays, offering expanded capacity to meet diverse storage needs."
                },
                {
                    title: "Why Buy from Servercart?",
                    content: "Buying from Servercart guarantees warranty-backed authentic Dell Precision 7820 Tower Workstation units at competitive prices. Additionally, Servercart offers expert advice and fast delivery across India."
                }
            ];
        }

        // Specific overrides for Dell Precision 7920
        if (prod.slug === 'dell-t7920') {
            p.oldPrice = '2,25,000.00';
            p.newPrice = '1,45,000.00';
            p.businessPrice = '1,65,000.00';
            p.enterprisePrice = '1,95,000.00';
            p.specs = [
                { label: 'Product', value: 'Dell Precision 7920 Workstation' },
                { label: 'Form Factor', value: 'Tower Model' },
                { label: 'Processors', value: '1st or 2nd gen Intel Xeon Scalable Processor Family' },
                { label: 'Chipset', value: 'Intel C621 Chipset' },
                { label: 'Memory', value: '24 DIMM Slots' },
                { label: 'RAM', value: 'Support Up to 1.5TB DDR4 Memory' },
                { label: 'Hard Drive', value: 'Up to (8) 2.5"/3.5" SATA/SAS/SSD drives' },
                { label: 'Slots', value: 'PCIe 3.0 Gen3 all (Gen3) Graphics Cards' },
                { label: '24x7 Tech support', value: 'Standard' },
                { label: 'Exclusive of Taxes', value: '***' }
            ];
            p.description = "Dell Precision 7920 Tower Workstation – Ultimate Power for Professional Workflows. The Dell Precision 7920 Tower Workstation delivers powerful performance with 1st or 2nd Gen Intel Xeon Scalable processors and the Intel C621 chipset. Moreover, it supports up to 1.5TB DDR4 RAM and offers flexible storage for up to eight SATA or SAS drives. Additionally, its PCIe Gen3 slots enable high-end graphics cards, making it ideal for demanding professional workloads.";
            p.tierSpecs = {
                Budget: ['Base Configuration', '1st Gen Xeon Scalable', '64GB RAM', '1TB storage', 'Quadro RTX 4000'],
                Business: ['Enhanced Configuration', '2nd Gen Xeon Scalable', '128GB RAM', '2TB storage', 'Quadro RTX 5000'],
                Enterprise: ['Maximized Configuration', 'Dual 2nd Gen Xeon Scalable', '256GB RAM', '4TB NVMe storage', 'Quadro RTX 6000']
            };
            p.additionalPoints = [
                {
                    title: "High-Performance - Dell 7920 Tower Workstation",
                    content: "The Precision 7920 Tower supports 1st or 2nd Gen Intel Xeon Scalable Processor Family, offering exceptional multi-core performance for complex, heavy tasks. In addition, the Intel C621 chipset ensures fast data handling and efficient communication between components."
                },
                {
                    title: "Exceptional Memory Capacity for Intensive Applications",
                    content: "This workstation includes 24 DIMM slots, allowing support for up to 1.5TB DDR4 ECC memory. Thanks to such high memory capacity, it handles virtualization, massive datasets, and real-time analytics with ease."
                },
                {
                    title: "Flexible Storage with High Scalability",
                    content: "The Dell Precision 7920 Tower supports up to 8 x 2.5\"/3.5\" SATA/SAS drives, offering a perfect balance of high speed and large storage capacity. Additionally, users can configure SSDs for fast load times or mix HDDs for large offline storage. With RAID options available, your data stays protected, and overall performance improves significantly."
                },
                {
                    title: "Professional-Grade Graphics and PCIe Expansion",
                    content: "With support for PCIe Express all (Gen3) graphics cards, the Precision 7920 is ready for intense graphics workloads, including 3D modeling, animation, CAD, AI visualization, and GPU-accelerated applications. Moreover, the multiple PCIe slots allow users to expand with additional GPUs, capture cards, network cards, or NVMe storage adapters, ensuring long-term scalability."
                },
                {
                    title: "Reliable Power and 24x7 Support",
                    content: "To deliver consistent performance, the system comes with reliable power management for heavy operations. In addition, users get 24x7 technical support, ensuring quick help whenever needed. This makes the Precision 7920 a dependable choice for businesses running mission-critical tasks."
                },
                {
                    title: "Dell 7920 Tower Workstation",
                    content: "Dell Precision 7920 Workstation combines powerful processors, massive memory, flexible storage, and strong graphics options to deliver unbeatable workstation performance. Therefore, it remains one of the best choices for professionals who need high reliability, scalability, and long-term value."
                }
            ];
        }

        fs.writeFileSync(`product-${prod.slug}.html`, template(p));
    });
};

const components = [
    { name: 'Intel Xeon Platinum 8380 Processor', slug: 'intel-platinum-8380', brand: 'Intel', type: 'Processor' },
    { name: 'AMD EPYC 7763 Processor', slug: 'amd-epyc-7763', brand: 'AMD', type: 'Processor' },
    { name: 'NVIDIA RTX A6000 GPU', slug: 'nvidia-rtx-a6000', brand: 'NVIDIA', type: 'Graphics Card' },
    { name: 'NVIDIA A100 Tensor Core GPU', slug: 'nvidia-a100', brand: 'NVIDIA', type: 'Graphics Card' },
    { name: '64GB DDR4-3200 ECC Reg RAM', slug: 'ram-64gb-ddr4', brand: 'Crucial', type: 'Memory' },
    { name: '32GB DDR5-4800 ECC Reg RAM', slug: 'ram-32gb-ddr5', brand: 'Samsung', type: 'Memory' },
    { name: 'Samsung PM1733 3.84TB NVMe SSD', slug: 'samsung-pm1733-3tb', brand: 'Samsung', type: 'Storage' },
    { name: 'WD Gold 18TB Enterprise HDD', slug: 'wd-gold-18tb', brand: 'Western Digital', type: 'Storage' },
    { name: 'Supermicro H12DSi-NT6 Motherboard', slug: 'supermicro-h12dsi', brand: 'Supermicro', type: 'Motherboard' },
    { name: 'Broadcom MegaRAID 9560-16i', slug: 'broadcom-9560', brand: 'Broadcom', type: 'RAID Controller' }
];

generate(servers, true, false);
generate(workstations, false, false);
generate(components, false, true);
console.log('All product pages generated.');
