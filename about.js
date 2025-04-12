document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.about-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

      if (currentScrollY > 100) { // เริ่มทำงานเมื่อเลื่อนลงมามากกว่า 100px (ปรับค่าได้)
        header.style.opacity = 1 - (currentScrollY - 100) / 400; // ค่อยๆ จางลง (ปรับค่า 300 เพื่อกำหนดความเร็วในการจาง)
        header.style.transform = `translateY(-${(currentScrollY - 100) / 5}px)`; // เลื่อนขึ้น (ปรับค่า 2 เพื่อกำหนดความเร็วในการเลื่อน)

        if (header.style.opacity <= 0) {
          header.style.opacity = 0; // ป้องกัน opacity ติดลบลบ
          header.style.transform = 'translateY(-100)'; // เลื่อนขึ้นไปจนสุด
        }
    } else {
        header.style.opacity = 1;
        header.style.transform = 'translateY(0)';
    }

        lastScrollY = currentScrollY;
    });
});