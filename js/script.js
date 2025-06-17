// 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('active')) {
        hamburger.innerHTML = '<span></span><span></span><span></span>';
    } else {
        hamburger.innerHTML = '×';
        hamburger.style.fontSize = '24px';
        hamburger.style.color = 'var(--text-dark)';
    }
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 메뉴 링크 클릭 시 모바일 메뉴 닫기
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// 문의 폼 제출 처리
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

// 폼 제출 전에 제목 업데이트
contactForm.addEventListener('submit', function(e) {
    // 개인정보 동의 체크 확인
    const privacyConsent = document.getElementById('privacy-consent');
    if (!privacyConsent.checked) {
        e.preventDefault();
        alert('개인정보 수집 및 이용에 동의해주세요.');
        privacyConsent.focus();
        return;
    }
    
    // 폼 데이터 가져오기
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    
    // 제목 필드들 업데이트
    const emailSubject = document.getElementById('email-subject');
    const emailSubjectAlt = document.getElementById('email-subject-alt');
    
    const subjectText = `[biz2a 문의] ${company} - ${name}`;
    
    emailSubject.value = subjectText;
    emailSubjectAlt.value = subjectText;
    
    // 디버깅용 (필요시 주석 해제)
    // console.log('Email subject set to:', subjectText);
});

// Formspree AJAX 제출 (선택사항 - 페이지 새로고침 없이 제출)
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 버튼 비활성화 및 로딩 상태 표시
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = '전송 중...';
    
    // 제목 업데이트
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const emailSubject = document.getElementById('email-subject');
    emailSubject.value = `[biz2a 문의] ${company} - ${name}`;
    
    // FormData 객체 생성
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // 성공 메시지 표시
            formMessage.innerHTML = '<div class="alert alert-success">문의가 성공적으로 전송되었습니다.</div>';
            formMessage.style.display = 'block';
            
            // 폼 초기화
            contactForm.reset();
            
            // 3초 후 메시지 숨기기
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 3000);
        } else {
            // 에러 메시지 표시
            formMessage.innerHTML = '<div class="alert alert-error">전송에 실패했습니다. 잠시 후 다시 시도해주세요.</div>';
            formMessage.style.display = 'block';
        }
    } catch (error) {
        // 네트워크 에러 등 처리
        formMessage.innerHTML = '<div class="alert alert-error">전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>';
        formMessage.style.display = 'block';
        console.error('Error:', error);
    } finally {
        // 버튼 상태 복원
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션 적용할 요소들
document.querySelectorAll('.feature, .service-card, .ceo-highlights').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});