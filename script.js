const words = ["designer", "photographer", "editor", "cameraman", "Media"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-span');
const typingContainer = document.querySelector('.typing-text');

// Độ delay (ms)
const typingSpeed = 50; // Delay gõ chữ
const deletingSpeed = 50; // Delay xóa chữ
const pauseBetweenWords = 1500; // Nghỉ giữa các từ

function typeWord() {
    if (isDeleting) {
        // Xóa chữ
        typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Chuyển từ tiếp theo
            typingContainer.classList.remove('typing-cursor'); // Tắt cursor khi xóa xong
            setTimeout(typeWord, pauseBetweenWords); // Nghỉ trước khi gõ từ mới
        } else {
            setTimeout(typeWord, deletingSpeed);
        }
    } else {
        // Gõ chữ
        typingElement.textContent = words[wordIndex].substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === words[wordIndex].length) {
            // Gõ xong từ, bắt đầu xóa sau pause
            isDeleting = true;
            typingContainer.classList.add('typing-cursor'); // Bật cursor
            setTimeout(typeWord, pauseBetweenWords);
        } else {
            setTimeout(typeWord, typingSpeed);
        }
    }
}

// Bắt đầu animation
setTimeout(typeWord, 1000); // Delay khởi động
document.addEventListener('DOMContentLoaded', () => {

    // Lấy tất cả các link trong thanh điều hướng (nav)
    const navLinks = document.querySelectorAll('nav a');
    
    // Lấy tất cả các section
    const sections = document.querySelectorAll('section');

    // Lặp qua từng link và gán sự kiện click
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Ngăn hành vi nhảy trang mặc định của thẻ <a>
            event.preventDefault();

            // Lấy ID mục tiêu từ href (ví dụ: '#services')
            const targetId = this.getAttribute('href');
            
            // --- 1. Xử lý Active Class cho Link ---
            // Xóa class 'active' khỏi link đang active hiện tại
            document.querySelector('nav a.active').classList.remove('active');
            // Thêm class 'active' cho link vừa được click
            this.classList.add('active');

            // --- 2. Xử lý Hiển thị Section ---
            // Ẩn tất cả các section
            sections.forEach(sec => {
                sec.style.display = 'none';
            });

            // Lấy section mục tiêu
            const targetSection = document.querySelector(targetId);

            // Hiển thị section mục tiêu
            if (targetSection) {
                // KIỂM TRA ĐẶC BIỆT: Section 'home' dùng 'flex',
                // các section khác dùng 'block'
                if (targetId === '#home') {
                    targetSection.style.display = 'flex';
                } else {
                    targetSection.style.display = 'block';
                }
            }
        });
    });
});