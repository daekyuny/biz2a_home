/* Golf Jokes - Common JavaScript Functions */

// =================================
// PAGINATION CONFIGURATION
// =================================
const JOKES_PER_PAGE = 15;
const TOTAL_JOKES = 65;
const TOTAL_PAGES = Math.ceil(TOTAL_JOKES / JOKES_PER_PAGE);
let currentPage = 1;

// All 65 golf jokes data
const allJokes = [
    { num: 1, title: "Can you stop this golfer?" },
    { num: 2, title: "Difference between a golf course and a whorehouse" },
    { num: 3, title: "A Golfer's nightmare" },
    { num: 4, title: "Handicap" },
    { num: 5, title: "Like golfer like caddy" },
    { num: 6, title: "Fairy tale (1)" },
    { num: 7, title: "Fairy tale (2)" },
    { num: 8, title: "Jesus!, What a golfer! (1)" },
    { num: 9, title: "Doctor's Problem" },
    { num: 10, title: "The rules of bedroom golf" },
    { num: 11, title: "Heavenly golf (1)" },
    { num: 12, title: "The fate of a golfer's wife" },
    { num: 13, title: "You can't keep your head down!" },
    { num: 14, title: "'F' word (1)" },
    { num: 15, title: "Golf Lesson 101 (1)" },
    { num: 16, title: "What's in the bag?" },
    { num: 17, title: "Golf widow" },
    { num: 18, title: "A foursome of golfers" },
    { num: 19, title: "Golf and sex" },
    { num: 20, title: "Heavenly golf (2)" },
    { num: 21, title: "Jesus!, What a golfer! (2)" },
    { num: 22, title: "Golf ball in the rough" },
    { num: 23, title: "The golf pro's advice" },
    { num: 24, title: "Bad golf day" },
    { num: 25, title: "Golf course etiquette" },
    { num: 26, title: "The perfect golf shot" },
    { num: 27, title: "Golf lessons from hell" },
    { num: 28, title: "Country club membership" },
    { num: 29, title: "Golf cart troubles" },
    { num: 30, title: "The golf bet" },
    { num: 31, title: "Golf ball physics" },
    { num: 32, title: "Caddy's wisdom" },
    { num: 33, title: "Golf course romance" },
    { num: 34, title: "The golf tournament" },
    { num: 35, title: "Golf equipment salesman" },
    { num: 36, title: "Golf club gossip" },
    { num: 37, title: "The golf lesson" },
    { num: 38, title: "Golf and marriage" },
    { num: 39, title: "Golf course wildlife" },
    { num: 40, title: "The golf handicap system" },
    { num: 41, title: "Golf psychology" },
    { num: 42, title: "Golf course maintenance" },
    { num: 43, title: "The golf pro shop" },
    { num: 44, title: "Golf and weather" },
    { num: 45, title: "The golf foursome" },
    { num: 46, title: "Golf course design" },
    { num: 47, title: "Golf etiquette lessons" },
    { num: 48, title: "The golf caddy's story" },
    { num: 49, title: "Golf ball technology" },
    { num: 50, title: "Golf course conditions" },
    { num: 51, title: "The golf swing analysis" },
    { num: 52, title: "Golf and business" },
    { num: 53, title: "Golf course hazards" },
    { num: 54, title: "The golf scorecard" },
    { num: 55, title: "Golf club selection" },
    { num: 56, title: "Golf course membership dues" },
    { num: 57, title: "The golf practice range" },
    { num: 58, title: "Golf and retirement" },
    { num: 59, title: "Golf course architecture" },
    { num: 60, title: "The golf putting green" },
    { num: 61, title: "Golf and friendship" },
    { num: 62, title: "Golf course management" },
    { num: 63, title: "The golf equipment review" },
    { num: 64, title: "Golf and patience" },
    { num: 65, title: "The ultimate golf joke" }
];

// =================================
// PAGINATION FUNCTIONS
// =================================
function displayCurrentPage() {
    const startIdx = (currentPage - 1) * JOKES_PER_PAGE;
    const endIdx = Math.min(startIdx + JOKES_PER_PAGE, TOTAL_JOKES);
    const currentJokes = allJokes.slice(startIdx, endIdx);
    
    const jokesList = document.getElementById('jokesList');
    if (!jokesList) return;
    
    // Clear existing content with fade out effect
    jokesList.style.opacity = '0';
    
    setTimeout(() => {
        jokesList.innerHTML = '';
        
        currentJokes.forEach(joke => {
            const jokeRow = document.createElement('div');
            jokeRow.className = 'joke-row';
            jokeRow.setAttribute('tabindex', '0');
            jokeRow.innerHTML = `
                <div class="joke-num">${String(joke.num).padStart(2, '0')}</div>
                <div class="joke-content">
                    <h4>${joke.title}</h4>
                </div>
            `;
            
            // Add click event
            jokeRow.addEventListener('click', function() {
                const jokeNumber = String(joke.num).padStart(4, '0');
                const jokeUrl = `gj${jokeNumber}.html`;
                window.location.href = jokeUrl;
            });
            
            // Add keyboard accessibility
            jokeRow.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    jokeRow.click();
                }
            });
            
            jokesList.appendChild(jokeRow);
        });
        
        // Fade in new content
        jokesList.style.opacity = '1';
        
        // Update page info
        updatePageInfo();
        updatePaginationControls();
        
    }, 150); // Small delay for smooth transition
}

function updatePageInfo() {
    const startJoke = (currentPage - 1) * JOKES_PER_PAGE + 1;
    const endJoke = Math.min(currentPage * JOKES_PER_PAGE, TOTAL_JOKES);
    
    const currentPageInfo = document.getElementById('currentPageInfo');
    const jokeRange = document.getElementById('jokeRange');
    
    if (currentPageInfo) {
        currentPageInfo.textContent = `Page ${currentPage} of ${TOTAL_PAGES}`;
    }
    
    if (jokeRange) {
        jokeRange.textContent = `${startJoke}-${endJoke}`;
    }
}

function updatePaginationControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageNumbers = document.getElementById('pageNumbers');
    
    // Update previous/next buttons
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === TOTAL_PAGES;
    }
    
    // Update page numbers
    if (pageNumbers) {
        pageNumbers.innerHTML = '';
        
        for (let i = 1; i <= TOTAL_PAGES; i++) {
            const pageBtn = document.createElement('div');
            pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.onclick = () => goToPage(i);
            
            // Add keyboard accessibility
            pageBtn.setAttribute('tabindex', '0');
            pageBtn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToPage(i);
                }
            });
            
            pageNumbers.appendChild(pageBtn);
        }
    }
}

function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
        goToPage(newPage);
    }
}

function goToPage(page) {
    if (page >= 1 && page <= TOTAL_PAGES && page !== currentPage) {
        currentPage = page;
        displayCurrentPage();
        
        // Smooth scroll to top of jokes section
        const tocSection = document.querySelector('.toc-section');
        if (tocSection) {
            tocSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
}

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
    // Initialize pagination
    displayCurrentPage();
    
    // Add keyboard navigation for pagination
    document.addEventListener('keydown', function(e) {
        // Only handle pagination keys when not in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                changePage(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                changePage(1);
                break;
            case 'Home':
                e.preventDefault();
                goToPage(1);
                break;
            case 'End':
                e.preventDefault();
                goToPage(TOTAL_PAGES);
                break;
        }
    });
    
    // Scroll to the joke if coming from a joke page
    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const fromJoke = urlParams.get('from');
        if (fromJoke) {
            scrollToJoke(parseInt(fromJoke));
        }
    }, 500); // Wait for animations to complete
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
// SMART NAVIGATION FROM JOKE PAGES
// =================================
function getPageForJoke(jokeNumber) {
    // Calculate which page contains this joke (1-based)
    return Math.ceil(jokeNumber / JOKES_PER_PAGE);
}

function handleSmartNavigation() {
    // Check if we're coming from a joke page
    const urlParams = new URLSearchParams(window.location.search);
    const fromJoke = urlParams.get('from');
    
    if (fromJoke) {
        const jokeNum = parseInt(fromJoke);
        if (jokeNum >= 1 && jokeNum <= TOTAL_JOKES) {
            const targetPage = getPageForJoke(jokeNum);
            if (targetPage !== currentPage) {
                currentPage = targetPage;
                // Remove the parameter from URL
                const newUrl = new URL(window.location);
                newUrl.searchParams.delete('from');
                history.replaceState(null, '', newUrl);
            }
        }
    }
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
        // Handle smart navigation before initializing
        handleSmartNavigation();
        initializeIndexPage();
    } else {
        // 상세 페이지 (gj0001.html 등)
        initializeJokeImages();
        
        // Modify "Back to List" links to include joke number
        modifyBackToListLinks();
    }
    
    console.log('Golf Jokes initialized successfully');
});

// =================================
// MODIFY BACK TO LIST LINKS
// =================================
function modifyBackToListLinks() {
    const currentJokeNum = getCurrentJokeNumber();
    if (currentJokeNum) {
        // Find all links that go to index.html
        const backLinks = document.querySelectorAll('a[href="index.html"]');
        backLinks.forEach(link => {
            // Add the joke number as a parameter
            link.href = `index.html?from=${currentJokeNum}`;
        });
    }
}

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

// =================================
// PAGINATION HELPER FUNCTIONS
// =================================

// Scroll to specific joke and highlight it
function scrollToJoke(jokeNumber) {
    // Find the joke row
    const jokeRows = document.querySelectorAll('.joke-row');
    const currentPageStart = (currentPage - 1) * JOKES_PER_PAGE + 1;
    const jokeIndex = jokeNumber - currentPageStart;
    
    if (jokeIndex >= 0 && jokeIndex < jokeRows.length) {
        const targetRow = jokeRows[jokeIndex];
        
        // Highlight the joke temporarily
        targetRow.style.backgroundColor = 'var(--accent-color)';
        targetRow.style.transform = 'scale(1.02)';
        targetRow.style.boxShadow = '0 4px 15px rgba(26, 76, 46, 0.2)';
        
        // Scroll to the joke
        targetRow.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Remove highlight after a few seconds
        setTimeout(() => {
            targetRow.style.backgroundColor = '';
            targetRow.style.transform = '';
            targetRow.style.boxShadow = '';
        }, 3000);
    }
}

// URL 파라미터로 페이지 상태 관리 (선택사항)
function updateURLWithPage(page) {
    if (history.pushState) {
        const newUrl = new URL(window.location);
        if (page === 1) {
            newUrl.searchParams.delete('page');
        } else {
            newUrl.searchParams.set('page', page);
        }
        history.pushState(null, '', newUrl);
    }
}

// URL에서 페이지 번호 읽기
function getPageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;
    return Math.max(1, Math.min(page, TOTAL_PAGES));
}

// 페이지 로드 시 URL 파라미터 확인
function initializePageFromURL() {
    const pageFromURL = getPageFromURL();
    if (pageFromURL !== currentPage) {
        currentPage = pageFromURL;
    }
}

// Make functions globally available
window.changePage = changePage;
window.goToPage = goToPage;