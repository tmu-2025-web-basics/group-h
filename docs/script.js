// グローバル変数（DOMContentLoaded外で定義）
let isPaused = false;
let introState = {
    hasScrolled: false,
    isHiding: false,
    wheelThreshold: 0,
    lastScrollTop: 0,
    scrollDirection: 'down',
    isScrolling: false, // スクロール中かどうか
    scrollTimeout: null, // スクロール停止検知用
    lastUserScroll: 0 // ユーザーによる最後のスクロール時刻
};


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded!');
    
   // 要素の取得
    const introBackground = document.getElementById('intro-bg');
    const introContentSection = document.getElementById('intro-content');
    
    // セッションストレージで前置き表示制御
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro === 'true') {
        // 既に表示済み：前置きをスキップ
        skipIntroAndShowMain();
    } else {
        // 初回またはリロード：前置きを表示
        sessionStorage.setItem('hasSeenIntro', 'true');
        initializeIntro();
    }
    
    // イベントリスナーは常に設定（重複しないよう1回だけ）
    setupEventListeners();
    setupScrollReset();
    setupHamburgerMenu();
    setupNavArrows();
    setupScrollBasedVisibility(); // 追加：スクロール基準の表示制御
    setupScrollPrompt(); // 追加：スクロール促進矢印

    console.log('All initialization complete');

    // 初期状態の設定
    function initializeIntro() {
    document.documentElement.classList.add('intro-active');
    document.body.classList.add('intro-active');
    
    // 背景の初期化
    if (introBackground) {
        introBackground.style.opacity = '1';
        introBackground.style.visibility = 'visible';
        introBackground.style.zIndex = '9000';
        introBackground.classList.remove('hidden', 'fading-out');
    }
    
    // コンテンツの初期化
    if (introContentSection) {
        introContentSection.style.opacity = '1';
        introContentSection.style.visibility = 'visible';
        introContentSection.style.zIndex = '10000';
        introContentSection.classList.remove('hidden', 'fading-out');
    }
    
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // 段階的表示を開始
    startIntroSequence();
    
    console.log('Intro initialized');
}

// fadeOutLogo関数を追加
function fadeOutLogo() {
    const introLogo = document.getElementById('intro-logo');
    
    if (introLogo) {
        console.log('Fading out logo...');
        introLogo.classList.add('fade-out');
        
        // フェードアウト完了後のログ
        setTimeout(() => {
            console.log('Logo fade out completed');
        }, 800); // CSSアニメーション時間と合わせる
    } else {
        console.log('Logo element not found!');
    }
}

// 前置きをスキップしてメインページを表示
function skipIntroAndShowMain() {
    const introBackground = document.getElementById('intro-bg');
    const introContentSection = document.getElementById('intro-content');
    const mainTitleLink = document.getElementById('main-title-link');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    
    // 前置き要素を即座に非表示
    if (introBackground) {
        introBackground.style.display = 'none';
    }
    if (introContentSection) {
        introContentSection.style.display = 'none';
    }
    
    // タイトルロゴとハンバーガーメニューを初期状態（非表示）に設定
    if (mainTitleLink) {
        mainTitleLink.classList.add('hidden');
        mainTitleLink.classList.remove('visible');
    }
    if (hamburgerMenu) {
        hamburgerMenu.classList.add('hidden');
        hamburgerMenu.classList.remove('visible');
    }
    
    // body固定を解除してスクロール可能に
    document.documentElement.classList.remove('intro-active');
    document.body.classList.remove('intro-active');
    
    // 状態をメインページ表示済みに設定
    introState.hasScrolled = true;
    introState.isHiding = false;
    
    
    console.log('Intro skipped - already seen this session');
}


// 段階的表示の関数を追加
function startIntroSequence() {
    const introLogo = document.getElementById('intro-logo');
    
    // 1. ロゴは既にCSSアニメーションで表示される
    
    // 2秒後にロゴをフェードアウト
    setTimeout(() => {
        fadeOutLogo();
    }, 1400);

    // ★★★ 3秒後に自動でトップページに移行 ★★★
    setTimeout(() => {
        if (!introState.hasScrolled && !introState.isHiding) {
            console.log('3 seconds passed, auto-hiding intro');
            hideIntro();
        }
    }, 3000);
    
    console.log('Intro sequence started (logo only)');
}


    // 前置きページを隠す
    function hideIntro() {
        if (introState.hasScrolled || introState.isHiding) {
        return;
    }

    function showIntro() {
    console.log('Showing intro...');
    introState.hasScrolled = false;
    introState.isHiding = false;
    
    document.documentElement.classList.add('intro-active');
    document.body.classList.add('intro-active');
    
    // 背景の表示
    if (introBackground) {
        introBackground.style.opacity = '1';
        introBackground.style.visibility = 'visible';
        introBackground.classList.remove('hidden', 'fading-out');
    }
    
    // コンテンツの表示
    if (introContentSection) {
        introContentSection.style.opacity = '1';
        introContentSection.style.visibility = 'visible';
        introContentSection.classList.remove('hidden', 'fading-out');
    }
    
    window.scrollTo(0, 0);
}
    
    introState.isHiding = true;
    console.log('Starting fade out...');
    
    window.scrollTo(0, 0);
    
    // 1. コンテンツを先にフェードアウト（0.5秒）
    if (introContentSection) {
        introContentSection.classList.add('fading-out');
        
        setTimeout(() => {
            introContentSection.classList.remove('fading-out');
            introContentSection.classList.add('hidden');
        }, 500);
    }
    // 2. 背景を遅れてフェードアウト（2秒）
    if (introBackground) {
        setTimeout(() => {
            introBackground.classList.add('fading-out');
        }, 300); // 0.3秒遅らせて開始
        
        setTimeout(() => {
            introBackground.classList.remove('fading-out');
            introBackground.classList.add('hidden');
            
            // すべて完了後に状態を更新
            document.documentElement.classList.remove('intro-active');
            document.body.classList.remove('intro-active');
            
            // タイトルロゴとハンバーガーメニューを初期状態（非表示）に設定
            const mainTitleLink = document.getElementById('main-title-link');
            const hamburgerMenu = document.getElementById('hamburger-menu');
            if (mainTitleLink) {
                mainTitleLink.classList.add('hidden');
                mainTitleLink.classList.remove('visible');
            }
            if (hamburgerMenu) {
                hamburgerMenu.classList.add('hidden');
                hamburgerMenu.classList.remove('visible');
            }
            
            introState.hasScrolled = true;
            introState.isHiding = false;
            introState.lastScrollTop = 0;
            introState.isScrolling = false;
            introState.lastUserScroll = Date.now();

            sessionStorage.setItem('hasSeenIntro', 'true'); // 表示済みマーク
            
            console.log('Fade out completed, scrolling enabled');
        }, 2300); // 2.3秒後に完了
    }

}

if (introContentSection) {
    introContentSection.addEventListener('click', hideIntro);
}

    // ユーザースクロール時刻を記録する関数
    function recordUserScroll() {
        introState.lastUserScroll = Date.now();
        console.log('User scroll detected at', introState.lastUserScroll);
    }

    // スクロール静止状態を管理する関数（簡略化）
    function handleScrollingState() {
        introState.isScrolling = true;
        
        // 既存のタイマーをクリア
        if (introState.scrollTimeout) {
            clearTimeout(introState.scrollTimeout);
        }
        
        // 200ms後にスクロール停止と判定（短縮）
        introState.scrollTimeout = setTimeout(() => {
            introState.isScrolling = false;
            console.log('Scrolling stopped');
        }, 200);
    }

    // スクロール方向を記録（ユーザースクロール記録を追加）
    function updateScrollDirection() {
        if (!introState.hasScrolled) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // ユーザースクロール時刻を記録
        recordUserScroll();
        
        // スクロール中フラグを立てる
        handleScrollingState();
        
        if (scrollTop < introState.lastScrollTop) {
            introState.scrollDirection = 'up';
        } else if (scrollTop > introState.lastScrollTop) {
            introState.scrollDirection = 'down';
        }
        
        introState.lastScrollTop = scrollTop;
    }

    // マウスホイール検知（条件を緩和）
    function handleWheel(e) {
        if (!introState.hasScrolled && !introState.isHiding) {
            // 前置きページ表示中
            e.preventDefault();
            e.stopPropagation();
            
            window.scrollTo(0, 0);
            
            if (e.deltaY > 0) {
                console.log('Wheel down detected, hiding intro');
                hideIntro();
            }
            return false;
        } else if (introState.hasScrolled) {
            // メインページ表示中
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // ユーザースクロール時刻を記録
            recordUserScroll();
            
            // 完全に一番上（0px）にいて、上方向ホイールの場合
            if (scrollTop === 0 && e.deltaY < 0) {
                // 500ms後にチェック（ユーザースクロール記録ベース）
                setTimeout(() => {
                    const newScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const timeSinceScroll = Date.now() - introState.lastUserScroll;
                    
                    if (newScrollTop === 0 && timeSinceScroll >= 500) {
                        console.log('At exact top, stationary for', timeSinceScroll, 'ms, showing intro');
                        showIntro();
                    } else {
                        console.log('Conditions not met - scroll:', newScrollTop, 'time:', timeSinceScroll);
                    }
                }, 500);
                e.preventDefault();
                return false;
            }
            
            // スクロール方向を更新（通常のスクロール時）
            updateScrollDirection();
        }
    }

    // スクロールイベント（ユーザースクロール記録を追加）
    function handleScroll(e) {
        if (!introState.hasScrolled) {
            e.preventDefault();
            window.scrollTo(0, 0);
            return false;
        } else {
            // スクロール方向を更新（ユーザースクロール記録含む）
            updateScrollDirection();
        }
    }

    // タッチ検知（条件を緩和）
    let touchStartY = 0;
    let touchStartScrollTop = 0;

    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
        touchStartScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this.touchMoved = false;
        
        // タッチ開始時もユーザー操作として記録
        recordUserScroll();
    }

    function handleTouchMove(e) {
        const touchY = e.touches[0].clientY;
        const deltaY = Math.abs(touchStartY - touchY);
        
        if (deltaY > 10) {
            this.touchMoved = true;
            // タッチ移動時もユーザー操作として記録
            recordUserScroll();
        }

        if (!introState.hasScrolled && !introState.isHiding) {
            // 前置きページ表示中
            e.preventDefault();
            
            const swipeY = touchStartY - touchY;
            if (swipeY > 50) {
                console.log('Swipe up detected, hiding intro');
                hideIntro();
            }
            return false;
        } else if (introState.hasScrolled) {
            // メインページ表示中
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const swipeY = touchStartY - touchY;
            
            // 開始時と現在の両方が完全に上端（0px）で、下方向スワイプの場合
            if (touchStartScrollTop === 0 && 
                currentScrollTop === 0 && 
                swipeY < -50) {
                // 500ms後にチェック
                setTimeout(() => {
                    const newScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const timeSinceScroll = Date.now() - introState.lastUserScroll;
                    
                    if (newScrollTop === 0 && timeSinceScroll >= 500) {
                        console.log('At exact top, stationary for', timeSinceScroll, 'ms, showing intro');
                        showIntro();
                    }
                }, 500);
                e.preventDefault();
                return false;
            }
        }
    }

    function handleTouchEnd(e) {
        if (!introState.hasScrolled && !introState.isHiding && !this.touchMoved) {
            e.preventDefault();
            console.log('Tap detected, hiding intro');
            hideIntro();
        }
    }

    // クリック検知
    function handleClick(e) {
        if (!introState.hasScrolled && !introState.isHiding) {
            e.preventDefault();
            console.log('Click detected, hiding intro');
            hideIntro();
        }
    }

    // キーボード検知（条件を緩和）
    function handleKeydown(e) {
        if (!introState.hasScrolled && !introState.isHiding) {
            if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Enter'].includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) {
                    hideIntro();
                }
                return false;
            }
        } else if (introState.hasScrolled) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // キーボード操作もユーザー操作として記録
            recordUserScroll();
            
            // 完全に上端（0px）にいる場合
            if (scrollTop === 0 && ['ArrowUp', 'PageUp', 'Home'].includes(e.key)) {
                // 500ms後にチェック
                setTimeout(() => {
                    const newScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const timeSinceScroll = Date.now() - introState.lastUserScroll;
                    
                    if (newScrollTop === 0 && timeSinceScroll >= 500) {
                        console.log('At exact top, stationary for', timeSinceScroll, 'ms, showing intro');
                        showIntro();
                    }
                }, 500);
                e.preventDefault();
                return false;
            }
        }
        
        if (introState.isHiding && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
    }

    // デバッグ用関数（ユーザースクロール時刻を追加）
    function debugScrollPosition() {
        if (introState.hasScrolled) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const timeSinceScroll = Date.now() - introState.lastUserScroll;
            console.log('Scroll:', scrollTop, 'TimeSinceUserScroll:', timeSinceScroll, 'ms');
        }
    }

    // イベントリスナーの設定
    function setupEventListeners() {
        const options = { passive: false, capture: true };
        
        if (introContentSection) {
        introContentSection.addEventListener('click', handleClick, options);        }
        
        document.addEventListener('wheel', handleWheel, options);
        document.addEventListener('touchstart', handleTouchStart, options);
        document.addEventListener('touchmove', handleTouchMove, options);
        document.addEventListener('touchend', handleTouchEnd, options);
        document.addEventListener('keydown', handleKeydown, options);
        window.addEventListener('scroll', handleScroll, options);
        
        // デバッグ用（開発中のみ）
        setInterval(debugScrollPosition, 2000);
        
        console.log('Event listeners setup complete');
    }

    
});


    // スクロール位置の定期リセット
    function setupScrollReset() {
        const resetInterval = setInterval(() => {
            if (!introState.hasScrolled || introState.isHiding) {
                window.scrollTo(0, 0);
            } else {
                clearInterval(resetInterval);
            }
        }, 16);
    }

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
            if (introState.hasScrolled) {
                document.body.style.overflow = 'hidden';
            }
            isMenuOpen = true;
        }

        function closeMenu() {
            if (hamburgerBtn) hamburgerBtn.classList.remove('active');
            if (sideMenu) sideMenu.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            if (introState.hasScrolled) {
                document.body.style.overflow = '';
            }
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
            if (e.key === 'Escape' && isMenuOpen && introState.hasScrolled) {
                closeMenu();
            }
        });
    }

    // ナビゲーション矢印の機能
    function setupNavArrows() {
        const prevArrow = document.getElementById('prev-arrow');
        const nextArrow = document.getElementById('next-arrow');
        
        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                if (isPaused) {
                    resumeAnimation();
                } else {
                    pauseAnimation();
                    setTimeout(resumeAnimation, 3000);
                }
            });
        }
        
        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                if (isPaused) {
                    resumeAnimation();
                } else {
                    pauseAnimation();
                    setTimeout(resumeAnimation, 3000);
                }
            });
        }
    }

    // スクロール基準の表示制御機能
    function setupScrollBasedVisibility() {
        const mainTitleLink = document.getElementById('main-title-link');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const introTextSection = document.getElementById('intro-text-section');
        
        if (!mainTitleLink || !hamburgerMenu || !introTextSection) {
            console.log('Required elements not found for scroll-based visibility');
            return;
        }

            let scrollActivity = false;
            let autoShowTimer;
    
        
        function updateVisibility() {
            // 前置きが表示中は何もしない
            if (!introState.hasScrolled) {
                return;
            }
            // スクロール活動を記録
            scrollActivity = true;

            const introTextRect = introTextSection.getBoundingClientRect();
            const introTextTop = introTextRect.top;
            const windowHeight = window.innerHeight;
            
            // 前置きテキストセクションが画面の上半分を過ぎたら表示
            const shouldShow = introTextTop <= windowHeight * 0.5;
            
            if (shouldShow) {
                mainTitleLink.classList.remove('hidden');
                mainTitleLink.classList.add('visible');
                hamburgerMenu.classList.remove('hidden');
                hamburgerMenu.classList.add('visible');
            } else {
                mainTitleLink.classList.add('hidden');
                mainTitleLink.classList.remove('visible');
                hamburgerMenu.classList.add('hidden');
                hamburgerMenu.classList.remove('visible');
            }
        }
        
        // 自動表示機能
    // 自動表示機能
function startAutoShowMonitoring() {
    console.log('Starting auto-show monitoring...');
    
    autoShowTimer = setTimeout(() => {
        // 5秒間スクロールがなく、まだタイトルが非表示の場合
        if (!scrollActivity && mainTitleLink.classList.contains('hidden')) {
            console.log('Auto-showing elements - no scroll detected for 5 seconds');
            
            mainTitleLink.classList.remove('hidden');
            mainTitleLink.classList.add('visible');
            
            setTimeout(() => {
                hamburgerMenu.classList.remove('hidden');
                hamburgerMenu.classList.add('visible');
            }, 300); // 0.3秒後にハンバーガーメニュー表示
        }
    }, 5000); // 5秒待機
}

// スクロールイベントリスナー
window.addEventListener('scroll', updateVisibility);

// 初期状態設定
updateVisibility();

// 前置きページ完了後に自動表示監視を開始（条件を修正）
setTimeout(() => {
    console.log('Checking if should start auto-show monitoring...');
    console.log('introState.hasScrolled:', introState.hasScrolled);
    console.log('mainTitleLink hidden:', mainTitleLink.classList.contains('hidden'));
    
    // メインページが表示されていて、タイトルがまだ非表示の場合
    if (introState.hasScrolled && mainTitleLink.classList.contains('hidden')) {
        startAutoShowMonitoring();
    } else {
        console.log('Auto-show monitoring not started - conditions not met');
    }
}, 4000); // 4秒後に開始（前置きページ3秒 + 余裕1秒）

console.log('Scroll-based visibility with auto-show setup complete');
    }

// スクロール促進矢印の機能
function setupScrollPrompt() {
    const scrollPrompt = document.getElementById('scroll-prompt');
    const mapContainer = document.querySelector('.map-container');
    
    if (scrollPrompt && mapContainer) {
        scrollPrompt.addEventListener('click', function() {
            mapContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
        console.log('Scroll prompt click handler added');
    }
}


