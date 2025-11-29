# 🔐 PWA Generátor Hesiel

> Bezpečná offline aplikácia na generovanie silných hesiel. Funguje na desktope, mobile a úplne bez internetu.

## ✨ Funkcie

- 🎲 **Bezpečné generovanie** - používa `crypto.getRandomValues()` s rejection sampling
- 🔐 **Customizovateľné heslo** - dĺžka 8-30 znakov, viacero typov znakov
- 📋 **Jednoklikové kopírovanie** - okamžité kopírovanie do schránky
- 📱 **Responzívny dizajn** - funguje na všetkých zariadeniach
- 🔌 **Offline režim** - funguje bez internetového pripojenia
- 🏠 **Inštalovateľná PWA** - pridaj na plochu ako natívna appka
- 🔒 **Žiadne ukladanie** - heslo sa nikde neukladá ani neposiela

## 🚀 Demo

**Live aplikácia:** [https://ViktorBoc.github.io/password-generator-pwa](https://ViktorBoc.github.io/password-generator-pwa)

## 📱 Ako to funguje?

### Bezpečnosť
1. **Cryptographically secure RNG** - `window.crypto.getRandomValues()`
2. **Rejection sampling** - eliminuje modulo bias
3. **Fisher-Yates shuffle** - zaručuje uniformné rozloženie znakov
4. **Žiadne storage** - heslo existuje len v pamäti počas generovania

### Princíp generovania
```javascript
1. Vyber typy znakov (malé, veľké, čísla, špeciálne)
2. Zostav pool dostupných znakov
3. Zabezpeč aspoň 1 znak z každého typu
4. Vygeneruj zvyšné znaky náhodne (crypto.getRandomValues)
5. Zamieš Fisher-Yates algoritmom
6. Zobraz heslo + silu (entropia)
```

## 🛠️ Technológie

- **Vanilla JavaScript** (ES6+)
- **Bootstrap 5** - UI komponenty
- **Vite** - build tool & dev server
- **Service Workers** - offline podpora
- **Web Crypto API** - bezpečná náhoda
- **Clipboard API** - kopírovanie

## 💻 Lokálna inštalácia

### Požiadavky
- Node.js 18+ a npm

### Inštalácia
```bash
# Klonuj repozitár
git clone https://github.com/TVOJE_GITHUB_MENO/password-generator-pwa.git

# Prejdi do priečinka
cd password-generator-pwa

# Nainštaluj závislosti
npm install

# Spusti dev server
npm run dev
```

Aplikácia bude dostupná na `http://localhost:3000`

### Testovanie na mobile
```bash
# Spusti server s network prístupom
npm run dev
```

Otvor zobrazené **Network** URL na mobile (oba zariadenia musia byť v rovnakej WiFi).

### Produkčný build
```bash
# Build
npm run build

# Preview buildu
npm run preview
```

Output bude v priečinku `dist/`.

## 📱 Inštalácia PWA

### Android (Chrome)
1. Otvor aplikáciu v Chrome
2. Menu (⋮) → **"Add to Home screen"**
3. Potvrď inštaláciu
4. Otvor z plochy

### iOS (Safari)
1. Otvor aplikáciu v Safari
2. **Share** → **"Add to Home Screen"**
3. Potvrď
4. Otvor z plochy

### Desktop (Chrome/Edge)
1. V adresnom riadku klikni na **ikonu inštalácie** (⊕)
2. **"Install"**
3. Appka sa otvorí ako samostatné okno

## 🧪 Testovanie offline režimu

### Mobile
1. Otvor appku z plochy
2. Vygeneruj heslo (načíta sa do cache)
3. Zapni **Airplane mode**
4. Zavri a otvor appku
5. ✅ Musí fungovať

### Desktop
1. DevTools (F12) → **Network** → **Offline**
2. Obnov stránku
3. ✅ Musí fungovať

## 📁 Štruktúra projektu
```
password-generator-pwa/
├── public/
│   ├── icons/              # PWA ikony (192x192, 512x512)
│   ├── manifest.webmanifest # PWA manifest
│   └── service-worker.js   # Service worker pre offline
├── src/
│   ├── main.js            # Hlavná logika aplikácie
│   └── styles.css         # Custom štýly
├── index.html             # Hlavný HTML súbor
├── vite.config.js         # Vite konfigurácia
├── package.json           # Závislosti a scripty
└── README.md              # Tento súbor
```

## 🔐 Bezpečnostné best practices

✅ Používa Web Crypto API (CSPRNG)  
✅ Rejection sampling (bez modulo bias)  
✅ Fisher-Yates shuffle  
✅ Žiadne ukladanie hesiel  
✅ Žiadne externé API volania  
✅ Funguje úplne offline  
✅ Content Security Policy ready  
✅ HTTPS deployment

