// Telegram bot sozlamalari
const BOT_TOKEN = '8753080952:AAFI-QxhUNaMwFHy6pREl2uWxUZfsFIP_EI';
const CHAT_ID = '8114476248';

// Form elementini olish
const form = document.getElementById('WebEditor');

// Form yuborilganda ishlaydigan funksiya
form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Formni odatdagi yuborilishini to'xtatamiz
    
    // Inputlardan ma'lumotlarni olish
    const ism = document.getElementById('ism').value.trim();
    const telefon = document.getElementById('tel').value.trim();
    
    // Validatsiya
    if (!ism || !telefon) {
        alert('Iltimos, barcha maydonlarni to\'ldiring!');
        return;
    }
    
    // Telegramga yuboriladigan xabar matni
    const message = `🆕 Yangi foydalanuvchi ma'lumotlari:\n\n👤 Ism: ${ism}\n📞 Telefon: ${telefon}\n🕒 Vaqt: ${new Date().toLocaleString('uz-UZ')}`;
    
    // Telegram API ga so'rov yuborish
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    try {
        // Yuborish tugmasini o'chirib, yuklanayotganini ko'rsatish
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Yuborilmoqda... ⏳';
        submitBtn.disabled = true;
        
        // Telegramga so'rov yuborish
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const result = await response.json();
        
        if (result.ok) {
            // Muvaffaqiyatli yuborildi
            alert('✅ Xabar muvaffaqiyatli yuborildi!');
            form.reset(); // Formni tozalash
        } else {
            throw new Error('Xabar yuborilmadi');
        }
        
    } catch (error) {
        console.error('Xatolik:', error);
        alert('❌ Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
    } finally {
        // Tugmani qayta tiklash
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Yuborish 🚀';
        submitBtn.disabled = false;
    }
});