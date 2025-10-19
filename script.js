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