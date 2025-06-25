/* Golf Jokes - Common JavaScript Functions */

// =================================
// ANALYTICS INITIALIZATION
// =================================
function initializeAnalytics() {
    try {
        if(typeof wcs_add !== 'undefined' && typeof wcs_do === 'function') {
            if(!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "5685fd50014b";
            wcs_do();
        }
    } catch(e) {
        console.log('Analytics script not available');
    }
}

// =================================
// IMAGE HANDLING FOR DETAIL PAGES
// =================================
function initializeJokeImages() {
    // 현재 페이지의 조크 번호 추출 (gj0001.html -> "gj0001")
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'gj0001';
    const imageContainer = document.getElementById('jokeImageContainer');
    
    if (!imageContainer) return; // 이미지 컨테이너가 없으면 종료
    
    // 가능한 이미지 확장자들
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
    let imageFound = false;
    
    // 각 확장자별로 이미지 존재 확인
    imageExtensions.forEach(ext => {
        if (imageFound) return; // 이미 이미지를 찾았으면 종료
        
        const img = new Image();
        const imagePath = `images/${currentPage}.${ext}`;
        
        img.onload = function() {
            if (!imageFound) {
                imageFound = true;
                displayJokeImage(imagePath, imageContainer);
            }
        };
        
        img.onerror = function() {
            // 이미지가 없으면 다음 확장자 시도
        };
        
        img.src = imagePath;
    });
}

// 조크 이미지 표시 함수
function displayJokeImage(imagePath, container) {
    container.innerHTML = `
        <img src="${imagePath}" alt="Golf joke illustration" style="cursor: pointer;" />
        <div class="image-caption">🏌️ Golf humor illustration</div>
    `;
    container.style.display = 'block';
    
    // 이미지 클릭 시 확대 보기
    const img = container.querySelector('img');
    img.onclick = function() {
        openImageModal(imagePath);
    };
}

// =================================
// IMAGE MODAL FUNCTIONALITY
// =================================
function openImageModal(imagePath) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    
    const img = document.createElement('img');
    img.src = imagePath;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    // 모달 닫기 - 배경 클릭
    modal.onclick = function() {
        closeImageModal(modal);
    };
    
    // ESC 키로 모달 닫기
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeImageModal(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function closeImageModal(modal) {
    if (document.body.contains(modal)) {
        document.body.removeChild(modal);
    }
}

// =================================
// INDEX PAGE FUNCTIONALITY
// =================================
function initializeIndexPage() {
    // 조크 행 클릭 이벤트 처리
    const jokeRows = document.querySelectorAll('.joke-row');
    
    jokeRows.forEach((row, index) => {
        row.addEventListener('click', function() {
            const jokeNumber = String(index + 1).padStart(4, '0');
            const jokeUrl = `gj${jokeNumber}.html`;
            
            // 같은 창에서 열기 (새 탭 대신)
            window.location.href = jokeUrl;
        });
        
        // 키보드 접근성
        row.setAttribute('tabindex', '0');
        row.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                row.click();
            }
        });
    });
}

// =================================
// SMOOTH SCROLLING
// =================================
function initializeSmoothScrolling() {
    // 부드러운 스크롤 효과
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =================================
// NAVIGATION HELPERS
// =================================
function navigateToJoke(jokeNumber) {
    const jokeUrl = `gj${String(jokeNumber).padStart(4, '0')}.html`;
    window.location.href = jokeUrl;
}

function navigateToIndex() {
    window.location.href = 'index.html';
}

// =================================
// SOCIAL SHARING (Facebook Like Button)
// =================================
function initializeFacebookLike() {
    // Facebook Like 버튼이 있는 경우에만 초기화
    const facebookLike = document.querySelector('iframe[src*="facebook.com"]');
    if (facebookLike) {
        // Facebook SDK 로딩 확인 및 처리 (필요시)
        console.log('Facebook Like button initialized');
    }
}

// =================================
// ACCESSIBILITY IMPROVEMENTS
// =================================
function enhanceAccessibility() {
    // 포커스 가능한 요소들에 대한 키보드 네비게이션 개선
    const focusableElements = document.querySelectorAll('button, a, input, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--secondary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// =================================
// MAIN INITIALIZATION
// =================================
document.addEventListener('DOMContentLoaded', function() {
    // 공통 초기화
    initializeAnalytics();
    initializeSmoothScrolling();
    enhanceAccessibility();
    initializeFacebookLike();
    
    // 페이지별 초기화
    const isIndexPage = window.location.pathname.includes('index.html') || 
                       window.location.pathname.endsWith('/') ||
                       window.location.pathname.endsWith('/golfjoke/');
    
    if (isIndexPage) {
        initializeIndexPage();
    } else {
        // 상세 페이지 (gj0001.html 등)
        initializeJokeImages();
    }
    
    console.log('Golf Jokes initialized successfully');
});

// =================================
// UTILITY FUNCTIONS
// =================================

// 현재 조크 번호 가져오기
function getCurrentJokeNumber() {
    const pathname = window.location.pathname;
    const match = pathname.match(/gj(\d+)\.html/);
    return match ? parseInt(match[1]) : null;
}

// 다음/이전 조크로 네비게이션
function navigateToNextJoke() {
    const currentJoke = getCurrentJokeNumber();
    if (currentJoke && currentJoke < 65) {
        navigateToJoke(currentJoke + 1);
    }
}

function navigateToPreviousJoke() {
    const currentJoke = getCurrentJokeNumber();
    if (currentJoke && currentJoke > 1) {
        navigateToJoke(currentJoke - 1);
    }
}

// 브라우저 호환성 확인
function checkBrowserCompatibility() {
    // ES6 기본 기능 확인
    if (!window.Promise || !Array.from) {
        console.warn('This browser may not support all features');
        return false;
    }
    return true;
}

// 초기화 시 브라우저 호환성 확인
document.addEventListener('DOMContentLoaded', function() {
    if (!checkBrowserCompatibility()) {
        // 구형 브라우저 알림 (필요시)
        console.log('Browser compatibility check completed');
    }
});