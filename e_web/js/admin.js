// ==================== ADMIN DATA ====================
let products = [
    { id: 1, name: 'Raka AI Assistant Pro', category: 'AI Tools', price: 49, stock: 150, status: 'active', desc: 'Intelligent virtual assistant' },
    { id: 2, name: 'DataPulse Analytics', category: 'Analytics', price: 79, stock: 100, status: 'active', desc: 'Real-time BI dashboard' },
    { id: 3, name: 'AutoFlow Automator', category: 'Automation', price: 99, stock: 75, status: 'active', desc: 'No-code workflow platform' },
    { id: 4, name: 'Raka AI Enterprise', category: 'AI Tools', price: 299, stock: 30, status: 'active', desc: 'Full-suite enterprise AI' },
    { id: 5, name: 'VisionAI Recognition', category: 'AI Tools', price: 149, stock: 50, status: 'active', desc: 'AI image/video recognition' },
    { id: 6, name: 'SecureShield AI', category: 'Security', price: 199, stock: 40, status: 'active', desc: 'AI cybersecurity' }
];
let orders = [
    { id: 'ORD-001', customer: 'Sarah Khan', product: 'Raka AI Assistant Pro', total: 49, date: '2026-07-01', status: 'completed' },
    { id: 'ORD-002', customer: 'Ahmed Rahman', product: 'DataPulse Analytics', total: 79, date: '2026-07-02', status: 'completed' },
    { id: 'ORD-003', customer: 'Maria Islam', product: 'AutoFlow Automator', total: 99, date: '2026-07-03', status: 'pending' },
    { id: 'ORD-004', customer: 'John Doe', product: 'VisionAI Recognition', total: 149, date: '2026-07-04', status: 'pending' },
    { id: 'ORD-005', customer: 'Jane Smith', product: 'SecureShield AI', total: 199, date: '2026-07-05', status: 'completed' }
];
let users = [
    { id: 1, name: 'Admin Utama', email: 'admin@raka-ai.com', role: 'Super Admin', status: 'active' },
    { id: 2, name: 'Sarah Khan', email: 'sarah@techflow.com', role: 'Customer', status: 'active' },
    { id: 3, name: 'Ahmed Rahman', email: 'ahmed@greenleaf.com', role: 'Customer', status: 'active' },
    { id: 4, name: 'Maria Islam', email: 'maria@nexgen.com', role: 'Customer', status: 'active' },
    { id: 5, name: 'Budi Santoso', email: 'budi@example.com', role: 'Customer', status: 'inactive' }
];
let messages = [
    { id: 1, name: 'Ahmad Fauzi', email: 'ahmad@example.com', message: 'Saya tertarik dengan Raka AI Enterprise. Ada demo?', date: '2026-07-06' },
    { id: 2, name: 'Dewi Lestari', email: 'dewi@example.com', message: 'Apakah ada paket diskon untuk startup?', date: '2026-07-05' }
];
let activities = [
    { icon: '&#128179;', color: 'rgba(37,99,235,0.1)', iconColor: 'var(--primary)', text: '<strong>Sarah Khan</strong> placed order ORD-001', time: '2 hours ago' },
    { icon: '&#128230;', color: 'rgba(16,185,129,0.1)', iconColor: 'var(--green)', text: 'New product <strong>SecureShield AI</strong> added', time: '5 hours ago' },
    { icon: '&#128101;', color: 'rgba(139,92,246,0.1)', iconColor: 'var(--purple)', text: '<strong>Budi Santoso</strong> registered', time: '1 day ago' },
    { icon: '&#9993;', color: 'rgba(245,158,11,0.1)', iconColor: 'var(--orange)', text: 'New message from <strong>Dewi Lestari</strong>', time: '2 days ago' },
    { icon: '&#128176;', color: 'rgba(6,182,212,0.1)', iconColor: 'var(--accent)', text: 'Revenue reached <strong>$575</strong> milestone', time: '3 days ago' }
];
let notifications = [
    { icon: '&#128179;', color: 'rgba(37,99,235,0.1)', text: 'Pesanan baru dari Sarah Khan', time: '2m lalu' },
    { icon: '&#128101;', color: 'rgba(16,185,129,0.1)', text: 'Pengguna baru terdaftar', time: '15m lalu' },
    { icon: '&#128276;', color: 'rgba(245,158,11,0.1)', text: 'Server usage mencapai 75%', time: '1j lalu' }
];
let nextProdId = 7;
let editingProdId = null;
let clockInterval = null;
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ==================== OPEN / CLOSE ====================
function openAdmin() {
    document.getElementById('adminOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    if (localStorage.getItem('raka_admin_logged_in') === 'true') {
        document.getElementById('adminLoginOverlay').classList.add('hidden');
        init();
    } else {
        document.getElementById('adminLoginOverlay').classList.remove('hidden');
    }
}
function closeAdmin() {
    document.getElementById('adminOverlay').classList.remove('open');
    document.body.style.overflow = '';
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById('page-dashboard').classList.add('active');
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    document.querySelector('.sidebar-nav a[data-page="dashboard"]').classList.add('active');
    document.getElementById('adminPageTitle').innerHTML = 'Dashboard <small>Overview</small>';
}

// ==================== AUTH ====================
function handleAdminLogin() {
    const u = document.getElementById('loginUser').value;
    const p = document.getElementById('loginPass').value;
    if (u === 'admin' && p === 'admin123') {
        document.getElementById('adminLoginOverlay').classList.add('hidden');
        localStorage.setItem('raka_admin_logged_in', 'true');
        init();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}
function handleAdminLogout() {
    localStorage.removeItem('raka_admin_logged_in');
    document.getElementById('adminLoginOverlay').classList.remove('hidden');
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById('page-dashboard').classList.add('active');
}

// ==================== INIT ====================
function init() {
    renderDashboard(); renderProducts(); renderOrders(); renderUsers(); renderMessages();
    renderActivity(); renderNotifications(); updateBadges();
    updateClock();
    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(updateClock, 1000);
    const ham = document.getElementById('adminHamburger');
    if (window.innerWidth <= 768) ham.style.display = 'flex'; else ham.style.display = 'none';
    window.addEventListener('resize', () => { if (window.innerWidth <= 768) ham.style.display = 'flex'; else { ham.style.display = 'none'; document.getElementById('adminSidebar').classList.remove('open'); } });
}

// ==================== NAV ====================
document.querySelectorAll('.sidebar-nav a[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
        const page = this.dataset.page;
        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
        document.getElementById('page-' + page).classList.add('active');
        const titles = { dashboard: 'Dashboard', analytics: 'Analytics', products: 'Produk', orders: 'Pesanan', users: 'Pengguna', messages: 'Pesan', settings: 'Pengaturan' };
        document.getElementById('adminPageTitle').innerHTML = (titles[page]||'') + ' <small>' + (page === 'dashboard' ? 'Overview' : 'Management') + '</small>';
        if (page === 'dashboard') renderDashboard();
        if (window.innerWidth <= 768) document.getElementById('adminSidebar').classList.remove('open');
    });
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.topbar-btn') && !e.target.closest('.notif-dropdown')) {
        document.getElementById('notifDropdown').classList.remove('open');
    }
});

// ==================== DASHBOARD ====================
function renderDashboard() {
    const totalRev = orders.reduce((s,o) => s + (o.status==='completed'?o.total:0), 0);
    document.getElementById('statRevenue').textContent = '$' + totalRev;
    document.getElementById('statRevenueChange').textContent = '+' + (orders.length*12) + '%';
    document.getElementById('statProducts').textContent = products.length;
    document.getElementById('statOrders').textContent = orders.length;
    document.getElementById('statOrdersChange').textContent = orders.filter(o=>o.status==='pending').length + ' pending';
    document.getElementById('statUsers').textContent = users.length;

    const chart = document.getElementById('revenueChart');
    chart.innerHTML = '';
    const revData = [4200,5800,6300,7100,8400,totalRev>0?totalRev:9200];
    const maxRev = Math.max(...revData);
    revData.forEach((v,i) => {
        const h = (v/maxRev)*160;
        chart.innerHTML += '<div class="bar-group"><div class="bar-value">$'+v+'</div><div class="bar" style="height:'+h+'px"></div><div class="bar-label">'+months[i]+'</div></div>';
    });
    document.getElementById('donutTotal').textContent = products.length;

    const recentBody = document.getElementById('recentOrdersBody');
    recentBody.innerHTML = '';
    orders.slice(0,5).forEach(o => {
        recentBody.innerHTML += '<tr><td><strong>'+o.id+'</strong></td><td>'+o.product+'</td><td>'+o.customer+'</td><td>$'+o.total+'</td><td><span class="status '+o.status+'">'+o.status+'</span></td></tr>';
    });
    document.getElementById('recentOrderCount').textContent = orders.length;
}

// ==================== ANALYTICS CHART ====================
function renderAnalytics() {
    const chart = document.getElementById('trafficChart');
    if (!chart) return;
    chart.innerHTML = '';
    const data = [{l:'Direct',v:35},{l:'Organic',v:55},{l:'Social',v:28},{l:'Referral',v:18},{l:'Email',v:22},{l:'Paid',v:42}];
    const mx = Math.max(...data.map(d=>d.v));
    data.forEach(d => {
        const h = (d.v/mx)*160;
        chart.innerHTML += '<div class="bar-group"><div class="bar-value">'+d.v+'%</div><div class="bar" style="height:'+h+'px;background:var(--gradient)"></div><div class="bar-label">'+d.l+'</div></div>';
    });
}

// ==================== PRODUCTS ====================
function renderProducts() {
    const tbody = document.getElementById('productsBody');
    const empty = document.getElementById('productsEmpty');
    tbody.innerHTML = '';
    if (!products.length) { empty.style.display='block'; return; }
    empty.style.display='none';
    products.forEach(p => {
        tbody.innerHTML += '<tr><td><strong>'+p.name+'</strong><br><span style="font-size:0.7rem;color:var(--gray-400)">'+p.desc+'</span></td><td>'+p.category+'</td><td><strong>$'+p.price+'</strong></td><td>'+p.stock+'</td><td><span class="status '+p.status+'">'+p.status+'</span></td><td><button class="btn-sm edit" onclick="editProduct('+p.id+')">Edit</button> <button class="btn-sm delete" onclick="deleteProduct('+p.id+')">Hapus</button></td></tr>';
    });
}
function filterProducts(q) {
    const rows = document.querySelectorAll('#productsBody tr');
    rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q.toLowerCase()) ? '' : 'none'; });
}
function openProductModal(data) {
    editingProdId = data ? data.id : null;
    document.getElementById('productModalTitle').textContent = data ? 'Edit Produk' : 'Tambah Produk';
    document.getElementById('prodName').value = data ? data.name : '';
    document.getElementById('prodCategory').value = data ? data.category : 'AI Tools';
    document.getElementById('prodPrice').value = data ? data.price : '';
    document.getElementById('prodStock').value = data ? data.stock : '';
    document.getElementById('prodDesc').value = data ? data.desc : '';
    document.getElementById('productModal').classList.add('open');
}
function closeProductModal() { document.getElementById('productModal').classList.remove('open'); editingProdId = null; }
function saveProduct() {
    const name = document.getElementById('prodName').value.trim();
    const category = document.getElementById('prodCategory').value;
    const price = parseFloat(document.getElementById('prodPrice').value);
    const stock = parseInt(document.getElementById('prodStock').value);
    const desc = document.getElementById('prodDesc').value.trim();
    if (!name||!price) { showToast('Lengkapi data!'); return; }
    if (editingProdId) {
        const idx = products.findIndex(p=>p.id===editingProdId);
        if (idx!==-1) products[idx] = {...products[idx],name,category,price,stock,desc};
        showToast('Produk diperbarui!');
    } else {
        products.push({id:nextProdId++,name,category,price,stock,status:'active',desc});
        showToast('Produk ditambahkan!');
        addActivity('&#128230;','rgba(16,185,129,0.1)','var(--green)','New product <strong>'+name+'</strong> added','just now');
    }
    closeProductModal(); renderProducts(); renderDashboard();
}
function editProduct(id) { const p = products.find(x=>x.id===id); if(p) openProductModal(p); }
function deleteProduct(id) { if(!confirm('Hapus produk ini?'))return; products=products.filter(p=>p.id!==id); renderProducts(); renderDashboard(); showToast('Produk dihapus!'); }

// ==================== ORDERS ====================
function renderOrders() {
    const filter = document.getElementById('orderFilter').value;
    const tbody = document.getElementById('ordersBody');
    const empty = document.getElementById('ordersEmpty');
    tbody.innerHTML = '';
    const filtered = filter==='all'?orders:orders.filter(o=>o.status===filter);
    if (!filtered.length) { empty.style.display='block'; return; }
    empty.style.display='none';
    filtered.forEach(o => {
        tbody.innerHTML += '<tr><td><strong>'+o.id+'</strong></td><td>'+o.customer+'</td><td>'+o.product+'</td><td><strong>$'+o.total+'</strong></td><td>'+o.date+'</td><td><span class="status '+o.status+'">'+o.status+'</span></td><td><button class="btn-sm view" onclick="showToast(\'Detail '+o.id+'\')">Detail</button></td></tr>';
    });
}
function filterOrders(q) {
    const rows = document.querySelectorAll('#ordersBody tr');
    rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q.toLowerCase()) ? '' : 'none'; });
}

// ==================== USERS ====================
function renderUsers() {
    const tbody = document.getElementById('usersBody');
    tbody.innerHTML = '';
    users.forEach(u => {
        tbody.innerHTML += '<tr><td><strong>'+u.name+'</strong></td><td>'+u.email+'</td><td>'+u.role+'</td><td><span class="status '+u.status+'">'+u.status+'</span></td><td><button class="btn-sm edit">Edit</button> <button class="btn-sm delete">Hapus</button></td></tr>';
    });
}
function filterUsers(q) {
    const rows = document.querySelectorAll('#usersBody tr');
    rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q.toLowerCase()) ? '' : 'none'; });
}

// ==================== MESSAGES ====================
function renderMessages() {
    const tbody = document.getElementById('messagesBody');
    const empty = document.getElementById('messagesEmpty');
    tbody.innerHTML = '';
    if (!messages.length) { empty.style.display='block'; return; }
    empty.style.display='none';
    messages.forEach(m => {
        tbody.innerHTML += '<tr><td><strong>'+m.name+'</strong></td><td>'+m.email+'</td><td>'+m.message.slice(0,40)+'...</td><td>'+m.date+'</td><td><button class="btn-sm view" onclick="showToast(\'Pesan dari '+m.name+'\')">Baca</button></td></tr>';
    });
}

// ==================== ACTIVITY ====================
function renderActivity() {
    const list = document.getElementById('activityList');
    list.innerHTML = '';
    activities.forEach(a => {
        list.innerHTML += '<li class="activity-item"><div class="act-icon" style="background:'+a.color+';color:'+a.iconColor+'">'+a.icon+'</div><div class="act-text"><p>'+a.text+'</p><div class="act-time">'+a.time+'</div></div></li>';
    });
}
function addActivity(icon,color,iconColor,text,time) {
    activities.unshift({icon,color,iconColor,text,time});
    if (activities.length > 10) activities.pop();
    renderActivity();
}

// ==================== NOTIFICATIONS ====================
function renderNotifications() {
    const list = document.getElementById('notifList');
    list.innerHTML = '';
    if (!notifications.length) { list.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--gray-400);font-size:0.85rem">No notifications</div>'; return; }
    notifications.forEach(n => {
        list.innerHTML += '<div class="notif-item"><div class="ni-icon" style="background:'+n.color+'">'+n.icon+'</div><div class="ni-text"><p>'+n.text+'</p><div class="ni-time">'+n.time+'</div></div></div>';
    });
}
function clearNotifications() { notifications = []; renderNotifications(); document.querySelector('.notif-dot').style.display='none'; }
function updateBadges() {
    document.getElementById('sidebarOrderBadge').textContent = orders.filter(o=>o.status==='pending').length;
    document.getElementById('sidebarMsgBadge').textContent = messages.length;
}

// ==================== SEARCH ====================
function handleGlobalSearch(q) {
    if (!q) return;
    q = q.toLowerCase();
    if (products.some(p=>p.name.toLowerCase().includes(q))) {
        document.querySelector('.sidebar-nav a[data-page="products"]').click();
        setTimeout(()=>filterProducts(q),100);
    } else if (orders.some(o=>o.id.toLowerCase().includes(q)||o.customer.toLowerCase().includes(q))) {
        document.querySelector('.sidebar-nav a[data-page="orders"]').click();
        setTimeout(()=>filterOrders(q),100);
    } else if (users.some(u=>u.name.toLowerCase().includes(q)||u.email.toLowerCase().includes(q))) {
        document.querySelector('.sidebar-nav a[data-page="users"]').click();
        setTimeout(()=>filterUsers(q),100);
    }
}

// ==================== CLOCK ====================
function updateClock() {
    const now = new Date();
    document.getElementById('adminClock').textContent = now.toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});
}

// ==================== TOAST ====================
function showToast(msg) {
    const t = document.getElementById('adminToast');
    t.textContent = '\u2713 '+msg;
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),2500);
}

// ==================== EXPORT / RESET ====================
function exportData() {
    const data = {products,orders,users,messages};
    const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'raka-ai-data.json';
    a.click();
    showToast('Data di-export!');
}
function resetData() {
    if(!confirm('Reset semua data?')) return;
    if(!confirm('Benar-benar yakin?')) return;
    products=[]; orders=[]; users=[{id:1,name:'Admin Utama',email:'admin@raka-ai.com',role:'Super Admin',status:'active'}]; messages=[];
    renderDashboard(); renderProducts(); renderOrders(); renderUsers(); renderMessages(); updateBadges();
    showToast('Semua data direset!');
}

// ==================== ENTER LOGIN ====================
document.addEventListener('keydown', function(e) {
    if (e.key==='Enter' && !document.getElementById('adminLoginOverlay').classList.contains('hidden')) handleAdminLogin();
});