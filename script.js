// Variables globales du jeu
let gameState = {
    pizzas: 0,
    pizzasPerSecond: 0,
    totalPizzasClicked: 0,
    upgrades: {},
    lastSave: Date.now(),
    popupLastShown: 0,
    popupInterval: 45000 // 45 secondes entre les pop-ups pour un bon équilibre
};

// Définition des améliorations
const upgradeDefinitions = [
    {
        id: 'chef',
        name: '👨‍🍳 Chef Cuisinier',
        description: 'Un chef expérimenté pour faire plus de pizzas',
        baseCost: 15,
        pizzasPerSecond: 0.1,
        pizzasmultiplier: 1.15,
        costMultiplier: 1.15
    },
    {
        id: 'supplement',
        name: '🧀 supplement cheddar',
        description: 'du supplement pour plus de production',
        baseCost: 30,
        pizzasPerSecond: 0.5,
        costMultiplier: 1.15
    },
    {
        id: 'oven',
        name: '🔥 Four à Pizza',
        description: 'Un four traditionnel pour cuire plus rapidement',
        baseCost: 100,
        pizzasPerSecond: 1,
        costMultiplier: 1.15
    },
    {
        id: 'assistant',
        name: '👩‍🍳 Assistant Cuisinier',
        description: 'Un assistant pour aider en cuisine',
        baseCost: 500,
        pizzasPerSecond: 5,
        costMultiplier: 1.15
    },
    {
        id: 'delivery',
        name: '🛵 Service de Livraison',
        description: 'Livraison rapide pour plus de commandes',
        baseCost: 2000,
        pizzasPerSecond: 20,
        costMultiplier: 1.15
    },
    {
        id: 'restaurant',
        name: '🏪 Agrandissement du Restaurant',
        description: 'Plus de place pour plus de clients',
        baseCost: 10000,
        pizzasPerSecond: 100,
        costMultiplier: 1.15
    },
    {
        id: 'franchise',
        name: '🌟 Franchise Pizza Montano',
        description: 'Ouvrir une nouvelle pizzeria',
        baseCost: 50000,
        pizzasPerSecond: 500,
        costMultiplier: 1.15
    }
];

// Messages publicitaires amusants
const adMessages = [
    {
        title: "🍕 Offre Spéciale Margherita!",
        text: "Notre pizza Margherita authentique vous attend! Tomates fraîches, mozzarella fondante et basilic... Mamma mia! 😋",
        image: "assets/pizza_margherita.png"
    },
    {
        title: "🔥 Pizza du Jour - 20% de Réduction!",
        text: "Aujourd'hui seulement: notre pizza spéciale du chef avec des ingrédients secrets de Nonna! Ne ratez pas cette occasion! 🤌",
        image: "assets/pizza_margherita.png"
    },
    {
        title: "🚀 Livraison Express en 15 minutes!",
        text: "Plus rapide qu'un scooter italien dans les rues de Naples! Commandez maintenant et régalez-vous! 🛵💨",
        image: "assets/delivery_scooter.png"
    },
    {
        title: "👨‍🍳 Le Secret du Chef Montano",
        text: "30 ans d'expérience, des ingrédients importés d'Italie, et beaucoup d'amore! Goûtez la différence! ❤️",
        image: "assets/chef_montano.png"
    },
    {
        title: "🧀 Fromage Extra - Gratuit!",
        text: "Parce qu'on ne peut jamais avoir trop de fromage! Ajout gratuit de mozzarella sur toutes nos pizzas aujourd'hui! 🧀✨",
        image: "assets/cheese_pizza.png"
    }
];

// Initialisation du jeu
document.addEventListener('DOMContentLoaded', function() {
    loadGame();
    initializeUpgrades();
    updateDisplay();
    startGameLoop();
    setupEventListeners();
});

// Configuration des événements
function setupEventListeners() {
    // Clic principal sur la pizza
    document.getElementById('main-pizza').addEventListener('click', function(e) {
        clickPizza(e);
    });

    // Boutons de partage et screenshot
    document.getElementById('screenshot-btn').addEventListener('click', takeScreenshot);
    document.getElementById('share-facebook').addEventListener('click', shareToFacebook);
    document.getElementById('share-twitter').addEventListener('click', shareToTwitter);

    // Pop-up modal
    document.getElementById('popup-close').addEventListener('click', closePopup);
    document.getElementById('popup-action').addEventListener('click', closePopup);
    document.getElementById('popup-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closePopup();
        }
    });

    // Sauvegarde automatique toutes les 10 secondes
    setInterval(saveGame, 10000);
}

// Fonction de clic sur la pizza
function clickPizza(event) {
    const pizzasGained = 1;
    gameState.pizzas += pizzasGained;
    gameState.totalPizzasClicked++;

    // Effet visuel de clic
    createClickEffect(event, `+${pizzasGained}`);

    // Animation du bouton
    const button = event.currentTarget;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 100);

    updateDisplay();
    checkPopupTrigger();
}

// Création d'effet visuel lors du clic
function createClickEffect(event, text) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = text;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    
    document.getElementById('click-effects').appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 1000);
}

// Initialisation des améliorations
function initializeUpgrades() {
    const container = document.getElementById('upgrades-container');
    
    upgradeDefinitions.forEach(upgrade => {
        if (!gameState.upgrades[upgrade.id]) {
            gameState.upgrades[upgrade.id] = { count: 0 };
        }
        
        const upgradeElement = createUpgradeElement(upgrade);
        container.appendChild(upgradeElement);
    });
}

// Création d'un élément d'amélioration
function createUpgradeElement(upgrade) {
    const element = document.createElement('div');
    element.className = 'upgrade-item';
    element.dataset.upgradeId = upgrade.id;
    
    const cost = calculateUpgradeCost(upgrade);
    const owned = gameState.upgrades[upgrade.id].count;
    
    element.innerHTML = `
        <div class="upgrade-info">
            <div class="upgrade-name">${upgrade.name}</div>
            <div class="upgrade-description">${upgrade.description}</div>
            <div class="upgrade-stats">+${upgrade.pizzasPerSecond}/sec | Possédé: ${owned}</div>
        </div>
        <div class="upgrade-cost">${formatNumber(cost)} 🍕</div>
    `;
    
    element.addEventListener('click', () => buyUpgrade(upgrade.id));
    
    return element;
}

// Calcul du coût d'une amélioration
function calculateUpgradeCost(upgrade) {
    const owned = gameState.upgrades[upgrade.id].count;
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, owned));
}

// Achat d'une amélioration
function buyUpgrade(upgradeId) {
    const upgrade = upgradeDefinitions.find(u => u.id === upgradeId);
    const cost = calculateUpgradeCost(upgrade);
    
    if (gameState.pizzas >= cost) {
        gameState.pizzas -= cost;
        gameState.upgrades[upgradeId].count++;
        gameState.pizzasPerSecond += upgrade.pizzasPerSecond;
        
        updateDisplay();
        updateUpgradeDisplay(upgradeId);
    }
}

// Mise à jour de l'affichage d'une amélioration
function updateUpgradeDisplay(upgradeId) {
    const upgrade = upgradeDefinitions.find(u => u.id === upgradeId);
    const element = document.querySelector(`[data-upgrade-id="${upgradeId}"]`);
    const cost = calculateUpgradeCost(upgrade);
    const owned = gameState.upgrades[upgradeId].count;
    
    element.querySelector('.upgrade-stats').textContent = `+${upgrade.pizzasPerSecond}/sec | Possédé: ${owned}`;
    element.querySelector('.upgrade-cost').textContent = `${formatNumber(cost)} 🍕`;
    
    // Mise à jour de la classe CSS selon l'accessibilité
    if (gameState.pizzas >= cost) {
        element.className = 'upgrade-item affordable';
    } else {
        element.className = 'upgrade-item unaffordable';
    }
}

// Mise à jour de l'affichage général
function updateDisplay() {
    document.getElementById('pizza-count').textContent = formatNumber(Math.floor(gameState.pizzas));
    document.getElementById('pizzas-per-second').textContent = formatNumber(gameState.pizzasPerSecond.toFixed(1));
    
    // Mise à jour de toutes les améliorations
    upgradeDefinitions.forEach(upgrade => {
        updateUpgradeDisplay(upgrade.id);
    });
}

// Formatage des nombres
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Boucle principale du jeu
function startGameLoop() {
    setInterval(() => {
        // Gain automatique de pizzas
        gameState.pizzas += gameState.pizzasPerSecond / 10; // Divisé par 10 car appelé toutes les 100ms
        updateDisplay();
    }, 100);
}

// Vérification pour déclencher un pop-up
function checkPopupTrigger() {
    const now = Date.now();
    if (now - gameState.popupLastShown > gameState.popupInterval && Math.random() < 0.15) {
        showRandomAd();
        gameState.popupLastShown = now;
    }
}

// Affichage d'une publicité aléatoire
function showRandomAd() {
    const ad = adMessages[Math.floor(Math.random() * adMessages.length)];
    
    document.getElementById('popup-title').textContent = ad.title;
    document.getElementById('popup-text').textContent = ad.text;
    
    // Affichage de l'image
    const popupImage = document.getElementById('popup-image');
    popupImage.style.backgroundImage = `url('${ad.image}')`;
    popupImage.style.backgroundSize = 'cover';
    popupImage.style.backgroundPosition = 'center';
    popupImage.textContent = ''; // Supprimer le texte emoji
    
    document.getElementById('popup-modal').classList.remove('hidden');
}

// Fermeture du pop-up
function closePopup() {
    document.getElementById('popup-modal').classList.add('hidden');
}

// Fonction de screenshot
function takeScreenshot() {
    // Vérifier si html2canvas est disponible
    if (typeof html2canvas !== 'undefined') {
        const gameContainer = document.querySelector('.game-container');
        
        html2canvas(gameContainer, {
            backgroundColor: '#2c1810',
            scale: 1,
            useCORS: true
        }).then(canvas => {
            // Créer un lien de téléchargement
            const link = document.createElement('a');
            link.download = `pizza-montano-score-${Math.floor(gameState.pizzas)}.png`;
            link.href = canvas.toDataURL();
            link.click();
            
            // Aussi copier le message dans le presse-papier
            const score = Math.floor(gameState.pizzas);
            const message = `🍕 J'ai fait ${formatNumber(score)} pizzas dans Pizza Montano Clicker! 🍕\n\n#PizzaMontano #IdleClicker\n\nVenez goûter nos vraies pizzas: https://www.facebook.com/pizzamontano/?locale=fr_FR`;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(message);
            }
            
            alert('Screenshot sauvegardé et message copié dans le presse-papier!');
        }).catch(err => {
            console.error('Erreur lors du screenshot:', err);
            fallbackScreenshot();
        });
    } else {
        fallbackScreenshot();
    }
}

// Fonction de screenshot de secours
function fallbackScreenshot() {
    const score = Math.floor(gameState.pizzas);
    const message = `🍕 J'ai fait ${formatNumber(score)} pizzas dans Pizza Montano Clicker! 🍕\n\n#PizzaMontano #IdleClicker\n\nVenez goûter les vraies pizzas: https://www.facebook.com/pizzamontano/?locale=fr_FR`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(message).then(() => {
            alert('Score copié dans le presse-papier! Vous pouvez maintenant le partager.');
        });
    } else {
        alert(`Votre score: ${formatNumber(score)} pizzas!\n\nPartagez avec #PizzaMontano`);
    }
}

// Partage sur Facebook
function shareToFacebook() {
    const score = Math.floor(gameState.pizzas);
    const text = `🍕 J'ai fait ${formatNumber(score)} pizzas dans Pizza Montano Clicker! 🍕 #PizzaMontano`;
    const url = 'https://www.facebook.com/pizzamontano/?locale=fr_FR';
    
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Partage sur Twitter
function shareToTwitter() {
    const score = Math.floor(gameState.pizzas);
    const text = `🍕 J'ai fait ${formatNumber(score)} pizzas dans Pizza Montano Clicker! 🍕 #PizzaMontano\n\nVenez goûter nos vraies pizzas: https://www.facebook.com/pizzamontano/?locale=fr_FR`;
    
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Sauvegarde du jeu
function saveGame() {
    gameState.lastSave = Date.now();
    localStorage.setItem('pizzaClickerSave', JSON.stringify(gameState));
}

// Chargement du jeu
function loadGame() {
    const saved = localStorage.getItem('pizzaClickerSave');
    if (saved) {
        try {
            const loadedState = JSON.parse(saved);
            
            // Calcul du temps hors ligne
            const offlineTime = Date.now() - loadedState.lastSave;
            const offlineHours = offlineTime / (1000 * 60 * 60);
            
            // Gain hors ligne (maximum 8 heures)
            const maxOfflineHours = 8;
            const effectiveOfflineHours = Math.min(offlineHours, maxOfflineHours);
            const offlineGain = loadedState.pizzasPerSecond * effectiveOfflineHours * 3600;
            
            gameState = { ...gameState, ...loadedState };
            gameState.pizzas += offlineGain;
            
            if (offlineGain > 0) {
                setTimeout(() => {
                    alert(`Bienvenue! Pendant votre absence, vous avez gagné ${formatNumber(Math.floor(offlineGain))} pizzas! 🍕`);
                }, 1000);
            }
        } catch (e) {
            console.error('Erreur lors du chargement de la sauvegarde:', e);
        }
    }
}

// Réinitialisation du jeu (pour debug)
function resetGame() {
    if (confirm('Êtes-vous sûr de vouloir recommencer le jeu?')) {
        localStorage.removeItem('pizzaClickerSave');
        location.reload();
    }
}

// Fonction utilitaire pour debug (accessible depuis la console)
window.debugAddPizzas = function(amount) {
    gameState.pizzas += amount;
    updateDisplay();
};

