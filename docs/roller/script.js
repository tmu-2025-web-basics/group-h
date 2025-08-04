// スライド機能
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// ハンバーガーメニューの機能
    function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');
    let isMenuOpen = false;

    function openMenu() {
        if (hamburgerBtn) hamburgerBtn.classList.add('active');
        if (sideMenu) sideMenu.classList.add('open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // ← ここから条件を削除
        isMenuOpen = true;
    }

    function closeMenu() {
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        if (sideMenu) sideMenu.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = ''; // ← ここから条件を削除
        isMenuOpen = false;
    }

        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (isMenuOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        }

        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }

        // サブメニューの設定
        const playgroundToggle = document.getElementById('playground-toggle');
        const playgroundSubmenu = document.getElementById('playground-submenu');
        
        if (playgroundToggle && playgroundSubmenu) {
            playgroundToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                playgroundToggle.classList.toggle('active');
                playgroundSubmenu.classList.toggle('open');
            });
        }

        // メニューリンククリック時にメニューを閉じる
        const menuLinks = document.querySelectorAll('.menu-list a, .submenu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // ESCキーでメニューを閉じる
        document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) { // introState.hasScrolledを削除
            closeMenu();
        }
    });
}

function changeSlide(direction) {
    // 現在のスライドを非表示
    slides[currentSlide].classList.remove('active');
    
    // 次のスライドを計算
    currentSlide += direction;
    
    // 最初または最後のスライドでループ
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    // 新しいスライドを表示
    slides[currentSlide].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの初期化
    setupHamburgerMenu();
    
    // スライド機能の初期化
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
    
    // ボタンにイベントリスナーを追加
    const prevButton = document.querySelector('.nav-arrow.prev');
    const nextButton = document.querySelector('.nav-arrow.next');
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            changeSlide(-1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            changeSlide(1);
        });
    }
    
    // 地図ズーム機能の初期化
    const mapImage = document.getElementById('mapImage');
    console.log('Map image element:', mapImage); // デバッグ用
    
    if (mapImage) {
        let zoom = 1;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let translateX = 0;
        let translateY = 0;
        
        // 移動制限の計算
        function getMovementLimits() {
            const container = mapImage.parentElement; // pattern-area
            const containerRect = container.getBoundingClientRect();
            const imageSize = Math.min(containerRect.width, containerRect.height);
            
            // ズームレベルに応じて制限を計算
            const scaledSize = imageSize * zoom;
            const maxMove = (scaledSize - imageSize) / 2;
            
            return {
                maxX: Math.max(maxMove, 50), // 最小50pxの移動は許可
                maxY: Math.max(maxMove, 50)
            };
        }
        
        // 移動範囲を制限する関数
        function constrainMovement(x, y) {
            const limits = getMovementLimits();
            
            const constrainedX = Math.max(-limits.maxX, Math.min(limits.maxX, x));
            const constrainedY = Math.max(-limits.maxY, Math.min(limits.maxY, y));
            
            return { x: constrainedX, y: constrainedY };
        }
        
        // ホイールでズーム
        mapImage.addEventListener('wheel', function(e) {
            e.preventDefault();
            
            if (e.deltaY < 0) {
                zoom = Math.min(zoom * 1.1, 3); // ズームイン（最大3倍）
            } else {
                zoom = Math.max(zoom * 0.9, 1); // ズームアウト（最小1倍 = デフォルトサイズ）
            }
            
            // ズーム変更時に移動範囲を再制限
            const constrained = constrainMovement(translateX, translateY);
            translateX = constrained.x;
            translateY = constrained.y;
            
            mapImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoom})`;
        });
        
        // ドラッグで移動
        mapImage.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            mapImage.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const newX = e.clientX - startX;
            const newY = e.clientY - startY;
            
            // 移動範囲を制限
            const constrained = constrainMovement(newX, newY);
            translateX = constrained.x;
            translateY = constrained.y;
            
            mapImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoom})`;
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
            mapImage.style.cursor = 'grab';
        });
        
        // ダブルクリックでリセット
        mapImage.addEventListener('dblclick', function() {
            zoom = 1;
            translateX = 0;
            translateY = 0;
            mapImage.style.transform = 'translate(0px, 0px) scale(1)';
        });
        
        console.log('Map zoom functionality initialized'); // デバッグ用
    } else {
        console.error('Map image element not found'); // デバッグ用
    }
});