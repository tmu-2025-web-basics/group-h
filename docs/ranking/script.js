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
        document.body.style.overflow = 'hidden';
        isMenuOpen = true;
    }

    function closeMenu() {
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        if (sideMenu) sideMenu.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
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
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
}

// ランキングサイトのJavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの初期化
    setupHamburgerMenu();
    
    // 初期状態でモーダルを確実に非表示にする
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // アニメーション効果の初期化
    initializeAnimations();
    
    // モーダル機能の初期化
    initializeModal();
    
    // ダミーデータの設定（必要に応じて）
    initializeDummyData();
});

// ページ読み込み完了後の追加チェック
window.addEventListener('load', function() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// アニメーション効果の初期化
function initializeAnimations() {
    // カテゴリカードの順次表示アニメーション
    const cards = document.querySelectorAll('.category-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // タイトルのアニメーション
    const title = document.querySelector('.main-header h1');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            title.style.transition = 'opacity 1s ease, transform 1s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // カテゴリ番号のアニメーション
    const categoryNumbers = document.querySelectorAll('.category-number');
    categoryNumbers.forEach((number, index) => {
        number.style.opacity = '0';
        number.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            number.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            number.style.opacity = '1';
            number.style.transform = 'scale(1)';
        }, (index + 10) * 50);
    });
}

// ダミーデータの初期化（テスト用）
function initializeDummyData() {
    // 開発時にダミー画像を表示する場合
    const isDevelopment = false; // 必要に応じてtrueに変更
    
    if (isDevelopment) {
        const images = document.querySelectorAll('.rank-image, .category-image');
        images.forEach((img, index) => {
            img.innerHTML = `<div style="width: 100%; height: 100%; background: linear-gradient(45deg, #f0f0f0, #e0e0e0); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #999;">画像 ${index + 1}</div>`;
        });
    }
}

// モーダル機能の初期化
function initializeModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalRanking = document.getElementById('modalRanking');
    const closeBtn = document.querySelector('.close');
    
    // 初期状態でモーダルを非表示にする
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    // 画像の名前マッピング
    const imageNames = {
        '1.png': 'たこ',
        '2.png': '汽車',
        '3.png': '鬼',
        '4.png': '大きな長靴',
        '5.png': '地球儀',
        '6.png': 'ローラー滑り台',
        '7.png': '虹のハンモック',
        '8.png': 'ドラゴンスライダー',
        // 旧ファイル名も対応
        'たこ.png': 'たこ',
        '鬼.png': '鬼',
        '汽車.png': '汽車'
    };
    
    // 遊具名とページパスのマッピング
    const playgroundPages = {
        'たこ': '../tako/index.html',
        '汽車': '../kisha/index.html',
        '鬼': '../oni/index.html',
        '大きな長靴': '../boots/index.html',
        '地球儀': '../earth/index.html',
        'ローラー滑り台': '../roller/index.html',
        '虹のハンモック': '../hammock/index.html',
        'ドラゴンスライダー': '../dragon/index.html'
    };
    
    // 遊具の紹介文データ
    const descriptions = {
        'たこ': '地域の子どもたちの秘密基地！？',
        '汽車': 'ちょっと豪華なくつろぎスペース',
        '鬼': '迫力がすごいだけの滑り台',
        '大きな長靴': 'まるで童話の中にいるような世界観',
        '地球儀': '球体回転型ジャングルジム',
        'ローラー滑り台': '滑る部分の鉄のローラがアチアチ！',
        '虹のハンモック': 'まるで空の上を歩いているかのような感覚',
        'ドラゴンスライダー': '目の前に現れたのはピラミッド！？'
    };
    
    // ランキングデータ
    const rankingData = {
        'たこ': {
            '総合ランキング': '2位',
            'ビジュアル部門': '-',
            '混雑度部門': '1位',
            '安全度部門': '-',
            'ワクワク度部門': '-'
        },
        '汽車': {
            '総合ランキング': '1位',
            'ビジュアル部門': '1位',
            '混雑度部門': '2位',
            '安全度部門': '1位',
            'ワクワク度部門': '-'
        },
        '鬼': {
            '総合ランキング': '4位',
            'ビジュアル部門': '1位',
            '混雑度部門': '-',
            '安全度部門': '-',
            'ワクワク度部門': '-'
        },
        '大きな長靴': {
            '総合ランキング': '2位',
            'ビジュアル部門': '1位',
            '混雑度部門': '-',
            '安全度部門': '2位',
            'ワクワク度部門': '-'
        },
        '地球儀': {
            '総合ランキング': '-',
            'ビジュアル部門': '-',
            '混雑度部門': '-',
            '安全度部門': '-',
            'ワクワク度部門': '1位'
        },
        'ローラー滑り台': {
            '総合ランキング': '-',
            'ビジュアル部門': '-',
            '混雑度部門': '-',
            '安全度部門': '-',
            'ワクワク度部門': '3位'
        },
        '虹のハンモック': {
            '総合ランキング': '3位',
            'ビジュアル部門': '-',
            '混雑度部門': '3位',
            '安全度部門': '3位',
            'ワクワク度部門': '-'
        },
        'ドラゴンスライダー': {
            '総合ランキング': '-',
            'ビジュアル部門': '-',
            '混雑度部門': '-',
            '安全度部門': '-',
            'ワクワク度部門': '2位'
        }
    };
    
    // すべての画像にクリックイベントを追加
    const images = document.querySelectorAll('.rank-image img, .category-image img');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            const imageSrc = this.src;
            const imageName = this.alt;
            
            // モーダルに画像と名前を設定
            modalImage.src = imageSrc;
            modalImage.alt = imageName;
            
            // 画像ファイル名から日本語名を取得
            const fileName = imageSrc.split('/').pop();
            const displayName = imageNames[fileName] || imageName || 'Unknown';
            modalTitle.textContent = displayName;
            
            // モーダルタイトルにクリックイベントを追加（遊具ページへの遷移）
            modalTitle.style.cursor = 'pointer';
            modalTitle.style.textDecoration = 'underline';
            modalTitle.onclick = function() {
                const pageUrl = playgroundPages[displayName];
                if (pageUrl) {
                    window.location.href = pageUrl;
                } else {
                    console.warn('遊具ページが見つかりません:', displayName);
                }
            };
            
            // 紹介文を表示
            const description = descriptions[displayName];
            if (description) {
                modalDescription.innerHTML = `<p>${description}</p>`;
            } else {
                modalDescription.innerHTML = '<p>紹介文がありません</p>';
            }
            
            // ランキング情報を表示
            displayRankingInfo(displayName, modalRanking, rankingData);
            
            // モーダルを表示
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // スクロールを無効化
        });
    });
    
    // 閉じるボタンのクリックイベント
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // スクロールを有効化
    });
    
    // モーダル背景をクリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // スクロールを有効化
        }
    });
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // スクロールを有効化
        }
    });
}

// ランキング情報を表示する関数
function displayRankingInfo(itemName, container, rankingData) {
    const data = rankingData[itemName];
    
    if (!data) {
        container.innerHTML = '<p>ランキング情報がありません</p>';
        return;
    }
    
    let html = '<h3>🏆 ランキング情報</h3>';
    
    for (const [department, rank] of Object.entries(data)) {
        if (rank !== '-') {
            const rankClass = getRankClass(rank);
            html += `
                <div class="ranking-item">
                    <span class="department">${department}</span>
                    <span class="rank ${rankClass}">${rank}</span>
                </div>
            `;
        }
    }
    
    if (html === '<h3>🏆 ランキング情報</h3>') {
        html += '<p>このアイテムはランキング対象外です</p>';
    }
    
    container.innerHTML = html;
}

// 順位に応じたCSSクラスを取得
function getRankClass(rank) {
    if (rank.includes('1位')) return 'first';
    if (rank.includes('2位')) return 'second';
    if (rank.includes('3位')) return 'third';
    return '';
}

// ランキングデータの管理
class RankingManager {
    constructor() {
        this.data = {
            main: [],
            categories: {
                visual: [],
                crowding: [],
                safety: [],
                cleanliness: [],
                excitement: []
            }
        };
    }
    
    // メインランキングの更新
    updateMainRanking(data) {
        this.data.main = data;
        this.renderMainRanking();
    }
    
    // カテゴリランキングの更新
    updateCategoryRanking(category, data) {
        this.data.categories[category] = data;
        this.renderCategoryRanking(category);
    }
    
    // メインランキングの描画
    renderMainRanking() {
        // 実装は必要に応じて追加
    }
    
    // カテゴリランキングの描画
    renderCategoryRanking(category) {
        // 実装は必要に応じて追加
    }
}

// グローバルインスタンス
const rankingManager = new RankingManager();

// ユーティリティ関数
const utils = {
    // ローカルストレージへの保存
    saveToLocalStorage: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn('ローカルストレージへの保存に失敗しました:', e);
        }
    },
    
    // ローカルストレージからの読み込み
    loadFromLocalStorage: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn('ローカルストレージからの読み込みに失敗しました:', e);
            return null;
        }
    }
};

// エクスポート（必要に応じて）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RankingManager, utils };
}
