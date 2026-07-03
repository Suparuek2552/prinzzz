// ข้อมูลชุดแต่งงาน 10 ชุด (เจ้าสาว 5, เจ้าบ่าว 5)
const products = [
    { id: 1, type: 'bride', name: 'ชุดเจ้าสาว ลูกไม้ฝรั่งเศส', price: '4,500', img: 'https://jackmakeupdotcom.wordpress.com/wp-content/uploads/2015/07/fc817d61a02b6876268f38371d7f651a.jpg' },
    { id: 2, type: 'bride', name: 'ชุดเจ้าสาว ทรงหางปลา', price: '5,000', img: 'https://sc04.alicdn.com/kf/HTB1PURvaErrK1RkSne1q6ArVVXaa.jpg' },
    { id: 3, type: 'bride', name: 'ชุดเจ้าสาว สไตล์มินิมอล', price: '3,500', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xOmPq22N14Nw7MJ1FvgO08DkjCqEMLVvIoNx3ICrdym0YlhQYwYNpKiO&s=10' },
    { id: 4, type: 'bride', name: 'ชุดเจ้าสาว ทรงบอลกาวน์', price: '6,500', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDB0SQjhl-7yONFcCTMK4LZRFaL_Z2os0P8gp7jjpgGhKUKixWuQvBXObE&s=10' },
    { id: 5, type: 'bride', name: 'ชุดไทยศิวาลัย ประยุกต์', price: '4,000', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUdpdiEtBCJhuso2YlkYJbF7GRe5iDzyZE8-e2C8X1bRMjoRfkjmXWA9c&s=10' },
    { id: 6, type: 'groom', name: 'ชุดเจ้าบ่าวทักซิโด้ สีดำคลาสสิก', price: '2,500', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_SjmTc9h1kzmfgISiUABmPklVus722I2ukKG7eG2YVQGFMfdi7_Cp8I&s=10' },
    { id: 7, type: 'groom', name: 'ชุดเจ้าบ่าวสูทสากล สีน้ำเงินกรมท่า', price: '2,800', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeCJY9H2aAN_O7QwixNbvhI2b6CGm8r8tAmpUoJSF2EL4o1eukV9JSOXE&s=10' },
    { id: 8, type: 'groom', name: 'ชุดเจ้าบ่าวสูทสไตล์วินเทจ สีน้ำตาล', price: '3,000', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SQPBu6n60cMIIi52iqVNZVYVAeUv0IMB3UHX2FiPMPlG0wSiWEdvkJE&s=10' },
    { id: 9, type: 'groom', name: 'ชุดเจ้าบ่าวสูททางการ สีเทาอ่อน', price: '2,500', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh-ytr8b1HNfIH4PANrnLVGTwcwAP1m452CWpT8cbjmGTTBikna_bzwcs&s=10' },
    { id: 10, type: 'groom', name: 'ชุดเจ้าบ่าวชุดไทยราชปะแตน', price: '2,700', img: 'https://static.trueplookpanya.com/tppy/member/m_545000_547500/545916/cms/images/5f3e04105b27d03f6c7971b4248c1585.jpg' }
];

let favorites = [];

// ฟังก์ชันเปลี่ยนหน้าเว็บ
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');
    document.getElementById('nav-' + pageId).classList.add('active');

    if(pageId === 'favorite') renderFavorites();
}

// ฟังก์ชันเรนเดอร์สินค้าในหน้า Shop
function renderShop() {
    const shopContainer = document.getElementById('product-list');
    shopContainer.innerHTML = '';

    products.forEach(product => {
        const isFav = favorites.includes(product.id) ? 'active' : '';
        const heartIcon = favorites.includes(product.id) ? '❤️' : '🤍';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <button class="fav-btn ${isFav}" onclick="toggleFavorite(${product.id}, this)">${heartIcon}</button>
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">฿${product.price} / วัน</p>
            <button class="btn-primary" onclick="openModal(${product.id})">สนใจ</button>
        `;
        shopContainer.appendChild(card);
    });
}

// ฟังก์ชันเพิ่ม/ลบ รายการโปรด
function toggleFavorite(id, btnElement) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
        btnElement.classList.remove('active');
        btnElement.innerText = '🤍';
    } else {
        favorites.push(id);
        btnElement.classList.add('active');
        btnElement.innerText = '❤️';
    }
}

// ฟังก์ชันเรนเดอร์หน้า Favorite
function renderFavorites() {
    const favContainer = document.getElementById('favorite-list');
    const emptyMsg = document.getElementById('empty-fav');
    favContainer.innerHTML = '';

    if (favorites.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        const favProducts = products.filter(p => favorites.includes(p.id));
        
        favProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <button class="fav-btn active" onclick="toggleFavorite(${product.id}, this); renderFavorites(); renderShop();">❤️</button>
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">฿${product.price} / วัน</p>
                <button class="btn-primary" onclick="openModal(${product.id})">สนใจ</button>
            `;
            favContainer.appendChild(card);
        });
    }
}

// ฟังก์ชันเปิด Modal ข้อมูลชุด
function openModal(id) {
    const product = products.find(p => p.id === id);
    if(product) {
        document.getElementById('modal-title').innerText = product.name;
        document.getElementById('modal-price').innerText = `ราคาเช่า: ฿${product.price}`;
        document.getElementById('modal-img').src = product.img;
        
        // เคลียร์ค่า input
        document.getElementById('pickup-date').value = '';
        document.getElementById('return-date').value = '';
        
        document.getElementById('product-modal').style.display = 'block';
    }
}

// ฟังก์ชันปิด Modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// ปิด Modal เมื่อคลิกพื้นที่ว่างข้างนอก
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) {
        closeModal();
    }
}

// ฟังก์ชันยืนยันการจอง
function confirmBooking() {
    const pickup = document.getElementById('pickup-date').value;
    const returnDate = document.getElementById('return-date').value;
    const size = document.getElementById('size-select').value;

    if (!pickup || !returnDate) {
        alert("กรุณาเลือกวันรับและวันคืนชุดให้ครบถ้วน");
        return;
    }
    
    if (new Date(pickup) > new Date(returnDate)) {
        alert("วันคืนชุดต้องอยู่หลังวันรับชุด");
        return;
    }

    alert(`ยืนยันการจองสำเร็จ!\nไซส์: ${size}\nวันรับชุด: ${pickup}\nวันคืนชุด: ${returnDate}\n\nแอดมินจะติดต่อกลับเพื่อยืนยันคิวผ่านช่องทางติดต่อของคุณค่ะ`);
    closeModal();
}

// เริ่มต้นการทำงานเมื่อโหลดหน้าเว็บเสร็จ
window.onload = () => {
    renderShop();
};