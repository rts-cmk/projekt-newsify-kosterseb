# Projektdokumentation

**Navn:** Sebastian Aguiar Køster

**Hold:** WU14

**Uddannelse:** Webudvikler

**Uddannelsessted:** Roskilde Tekniske Skole

[Link til min applikation](https://kosterseb.github.io/newsify-app/)

---

## Teknologier

- HTML
- Sass
- Vite
- Vitest
- React 19 (JS)
- React Router 7
- API (New York Times)
- GitHub Pages
- GitHub Actions (CI/CD)
- Context API (React)
- Custom Hooks
- localStorage

---

## Nye Opdateringer og Forbedringer

### React Router v7 Migration (Efter aflevering)

Har opdateret projektet til at bruge den nyeste React Router v7, da `react-router-dom` er blevet deprecated. I version 7 er alle routing funktioner konsolideret i hovedpakken `react-router`.

**Ændringer:**
```bash
# Før
npm install react-router-dom

# Efter
npm install react-router
```

**Opdaterede imports i alle komponenter:**
```jsx
// Før
import { useNavigate } from 'react-router-dom';

// Efter
import { useNavigate } from 'react-router';
```

Dette sikrer at projektet bruger den nyeste og supporterede version af React Router.

### GitHub Pages Deployment Fix

Løste deployment problemer hvor GitHub Pages ikke kunne opdateres via `gh-pages` npm pakken (HTTP 403 fejl). Implementerede i stedet GitHub Actions workflow for automatisk deployment.

**Ny deployment workflow** (`.github/workflows/deploy.yml`):
- Automatisk build og deploy ved push til main branch
- Miljøvariabler (API keys) håndteres sikkert via GitHub Secrets
- Native GitHub Pages integration
- Bedre fejlhåndtering og logging

**Fordele:**
- Automatisk deployment ved hver push
- Ingen manuel `npm run deploy` nødvendig
- Sikker håndtering af API nøgler
- Fuld CI/CD pipeline


## Redegørelse for oprindelsen af evt. tredjeparts kode anvendt i opgaveløsningen

### NYT API

Har opsat bruger hos New York Times Developer Portal og fået nøgle til deres API. API'et bruges til at hente nyheder fra forskellige kategorier som Health, Sport, Travel, Business og Europe (World).

```env
VITE_NYT_API_KEY="your_api_key_here"
```

**API Service Implementation:**
Har lavet en service fil (`newsApi.js`) der håndterer alle API kald:
- `getTopStories()` - Henter top historier fra en given kategori
- `searchArticles()` - Søger efter specifikke artikler
- `formatArticles()` - Formaterer data til en konsistent struktur

```js
export const newsApi = {
  async getTopStories(section = 'home') {
    const response = await fetch(
      `${BASE_URL}/topstories/v2/${section}.json?api-key=${API_KEY}`
    );
    const data = await response.json();
    return this.formatArticles(data.results);
  }
}
```

### React og Dependencies

Har installeret følgende dependencies via npm:

```bash
npm create vite@latest .
npm install react-router
npm install -D sass
npm install -D vitest
```

**React Router v7** bruges til navigation mellem sider uden page reload, hvilket giver en bedre brugeroplevelse. Projektet er migrated fra den deprecerede `react-router-dom` pakke til den nye konsoliderede `react-router` pakke.

**Sass** bruges til styling med nested rules, variables og mixins for mere maintainable CSS.

---

## Argumentation for de valg du selvstændigt har truffet under løsningen af opgaven

### 1. React Router v7

Har valgt at bruge **React Router 7** til at navigere gennem de forskellige sider. Dette giver en Single Page Application (SPA) oplevelse hvor siden ikke reloader ved navigation. Bruger den nyeste version (v7) hvor alle routing funktioner er konsolideret i `react-router` pakken.

```jsx
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/home" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}
```

### 2. Filstruktur og Separation of Concerns

Har valgt at lave alt separeret i forhold til mapper. Filstrukturen giver et mere specifikt forhold til arbejdet, så man også kan skabe SOC (Separation of Concerns). Hver komponent har sin egen mappe med både JSX og Sass fil, hvilket gør det nemt at vedligeholde og finde kode.

```
src/
├── contexts/
│   ├── DarkModeContext.jsx
│   └── ArchiveContext.jsx
├── hooks/
│   ├── useSwipe.js
│   └── usePullToRefresh.js
├── services/
│   └── newsApi.js
├── components/
│   ├── BottomNav/
│   ├── NewsCard/
│   ├── Splash/
│   ├── Onboarding/
│   ├── Authentication/
│   ├── Home/
│   ├── Archive/
│   ├── Popular/
│   └── Settings/
├── assets/
├── App.jsx
└── main.jsx
```

### 3. Context API til State Management

Har valgt at bruge **React Context API** i stedet for Redux eller andre state management libraries. Dette giver en simplere løsning til at dele state mellem komponenter uden prop drilling.

**DarkModeContext** - Håndterer dark mode state:
```jsx
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('newsify-dark-mode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
```

**ArchiveContext** - Håndterer gemte artikler:
```jsx
export const ArchiveProvider = ({ children }) => {
  const [archivedArticles, setArchivedArticles] = useState(() => {
    const saved = localStorage.getItem('newsify-archived-articles');
    return saved ? JSON.parse(saved) : [];
  });
  
  const addToArchive = (article) => {
    setArchivedArticles(prev => [...prev, article]);
  };
  
  return (
    <ArchiveContext.Provider value={{ archivedArticles, addToArchive }}>
      {children}
    </ArchiveContext.Provider>
  );
};
```

### 4. Custom Hooks til Genanvendelig Logik

Har lavet custom hooks for at genbruge logik på tværs af komponenter:

**useSwipe** - Håndterer swipe gestures:
```js
export const useSwipe = (onSwipeLeft, onSwipeRight, threshold = 100) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchEnd = () => {
    const distance = touchStart - touchEnd;
    if (distance > threshold && onSwipeRight) {
      onSwipeRight();
    }
    if (distance < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }
  };
  
  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
```

**usePullToRefresh** - Håndterer pull-to-refresh funktionalitet:
```js
export const usePullToRefresh = (onRefresh, threshold = 80) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  // ... logik til at håndtere touch events
  
  return { containerRef, isPulling, isRefreshing, pullDistance };
};
```

### Test af `useSwipe`-hook med Vitest ###

Her bruges *`Vitest`* og *`react-testing`* for at bekræfte at `useSwipe` reagerer korrekt på, hvor langt der bliver trukket, før funktionen aktiveres, ved at observere rendering.

Jeg bruger her de forskellige test-calls til at afklare, hvilke parametre jeg vil teste:
- it: Her beskriver jeg hvad jeg tester.
- act: Bruges til at simulere brugerinteraktion (fra et UX-perspektiv) og se, om funktionen reagerer korrekt.
- expect: Bruges til at definere, hvad vi forventer skal ske og verificere om kravene bliver opfyldt.

Det er vigtigt, at vi altid refererer til det output, den rigtige fil faktisk eksporterer.

```js
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useSwipe } from './useSwipe';
import { describe, it, expect, vi } from 'vitest';
import "@testing-library/jest-dom/vitest";

describe('useSwipe', () => {
    it('should detect left swipe', () => {
        const onSwipeLeft = vi.fn();
        const onSwipeRight = vi.fn();
        const { result } = renderHook(() => useSwipe(onSwipeLeft, onSwipeRight, 50));

        act(() => {
            result.current.handleTouchStart({ targetTouches: [{ clientX: 200 }] });
        });

        act(() => {
            result.current.handleTouchMove({ targetTouches: [{ clientX: 100 }] });
        });

        act(() => {
            result.current.handleTouchEnd();
        });

        expect(onSwipeLeft).toHaveBeenCalled();
        expect(onSwipeRight).not.toHaveBeenCalled();
    })

    it('should detect right swipe', () => {
        const onSwipeLeft = vi.fn();
        const onSwipeRight = vi.fn();
        const { result } = renderHook(() => useSwipe(onSwipeLeft, onSwipeRight, 50));
      
        act(() => {
          result.current.handleTouchStart({ targetTouches: [{ clientX: 100 }] });
        });
      
        act(() => {
          result.current.handleTouchMove({ targetTouches: [{ clientX: 200 }] });
        });
      
        act(() => {
          result.current.handleTouchEnd();
        });
      
        expect(onSwipeRight).toHaveBeenCalled();
        expect(onSwipeLeft).not.toHaveBeenCalled();
      });
      
}
);

```
## Hvis alle tests består, får vi denne besked i terminalen: ##

```zsh
✓ src/hooks/useSwipe.test.js (2 tests) 10ms
   ✓ useSwipe > should detect left swipe 8ms
   ✓ useSwipe > should detect right swipe 1ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  10:33:11
   Duration  72ms

 PASS  Waiting for file changes...
```

Dette hjælper os med at identificere, om noget fungerer korrekt og hvis ikke, får vi direkte feedback i terminalen.

Et konkret og lidt mere abstrakt eksempel på, hvordan testen afslører fejl, er her:
```js
act(() => {
            result.current.handleTouchStart({ targetTouches: [{ clientX: 200 }] });
        });
```
Det vigtigste her er værdien `clientX: 200`.
Jeg fandt ud af, at jeg kunne hæve værdien helt op til fx clientX: 1200, og testen ville stadig `PASS` — hvilket egentlig ikke var hensigten.
Det afslørede en logisk fejl i min kode, selvom testen teknisk set bestod.

På den måde kan tests virke abstrakte, men stadig give værdifuld indsigt i, hvordan funktionaliteten faktisk opfører sig i praksis.

### 5. localStorage til Data Persistence

Bruger localStorage til at gemme brugerens præferencer og data lokalt i browseren:

- `newsify-onboarding-complete` - Om brugeren har set onboarding
- `newsify-dark-mode` - Dark mode preference
- `newsify-categories` - Valgte kategorier
- `newsify-archived-articles` - Gemte artikler

Dette gør at brugerens data bevares mellem sessions uden behov for en database.

### 6. Mobile-First Design med Sass

Har designet appen mobile-first da det er en mobile app. Bruger Sass til:
- **Nested selectors** for bedre læsbarhed
- **Variables** til farver og spacing
- **Mixins** til genbrugeligt styling
- **Dark mode** styling med `body.dark-mode` klasse

```sass
.news-card
    display: flex
    gap: 15px
    padding: 15px 20px
    transition: background-color 0.2s ease
    
    &:hover
        background-color: #f9f9f9
    
    .news-info
        h3
            font-size: 1rem
            color: #333
        
        p
            font-size: 0.85rem
            color: #666

// Dark mode
body.dark-mode
    .news-card
        background-color: #1a1a1a
        
        .news-info
            h3
                color: #ffffff
            p
                color: #b0b0b0
```

### 7. Komponent Genanvendelighed

Har lavet en **NewsCard** komponent som genbruges på tværs af Home, Archive og Popular pages. Dette følger DRY princippet (Don't Repeat Yourself).

```jsx
<NewsCard
  article={article}
  onSwipeRight={() => addToArchive(article)}
  showBookmark={true}
/>
```

---

## Vurdering af egen indsats & gennemførelse af opgaveforløbet

### Arbejdsgang (GAG - God Arbejds Gang)

Min tilgang til projektet har været systematisk og struktureret:

**1. Planlægning og Setup (dag 1)**
- Installeret alle nødvendige dependencies
- Opsat projekt struktur med mapper og filer
- Registreret NY Times API og fået API key
- Lavet mockups og wireframes til design

**2. Fundament (dag 2)**
- Implementeret React Router setup
- Lavet basis komponenter (SplashScreen, OnBoarding, Authentication)
- Implementeret dark mode context
- Styling med Sass (farver, typografi, layout)

**3. Core Features (dag 3)**
- Integreret NY Times API
- Implementeret Home, Archive og Popular pages
- Lavet custom hooks (useSwipe, usePullToRefresh)
- Archive system med localStorage

**4. Polish og Testing (dag 4)**
- Finpudset animationer (splash screen, swipe gestures)
- Implementeret pull-to-refresh
- Søgefunktionalitet
- Bug fixes og responsive design
- Testing på mobile devices

**5. Final Touches og Deployment (dag 5)**
- Testet hos andre personer som gav feedback på UX.
- Lavede de sidste rettelser i dokumentation og components efter feedback.
- Deployment til github og aflevering af projektet.

### Udfordringer

**API Rate Limiting:**
NY Times API har en rate limit på 500 requests per dag. Har løst dette ved at cache data i state og kun fetche når nødvendigt (pull-to-refresh).

**Touch Gestures:**
Swipe gestures var udfordrende at implementere smooth. Løste det ved at lave en custom hook der håndterer touch events og beregner swipe distance.

**Dark Mode:**
At få dark mode til at fungere konsistent på tværs af alle komponenter krævede god planlægning. Løste det med Context API og CSS klasser på body elementet.

### Hvad Gik Godt

- God struktur fra start gjorde det nemt at tilføje nye features
- Context API fungerede perfekt til state management
- Custom hooks gjorde koden genbrugelig og DRY
- Mobile-first approach sikrede god UX på mobile

### Hvad Kunne Forbedres

- Kunne have lavet unit tests med Vitest
- Offline funktionalitet med Service Workers
- Bedre error handling ved API fejl
- Animationer kunne være endnu mere polished
- Accessibility (ARIA labels, keyboard navigation)

---

## En beskrivelse af særlige punkter til bedømmelse

### 1. Swipe Gestures Implementation

Har implementeret smooth swipe gestures med visuel feedback. Når man swiper højre vises en grøn baggrund (gem), og når man swiper venstre vises en rød baggrund (slet). Dette giver god UX feedback.

```jsx
const {
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  swipeDistance
} = useSwipe(handleSwipeLeft, handleSwipeRight, 100);

const getBackgroundColor = () => {
  if (swipeDistance > 100) return '#5a7f3e'; // Green
  if (swipeDistance < -100) return '#e74c3c'; // Red
  return 'transparent';
};
```

### 2. Pull-to-Refresh Feature

Har lavet en custom pull-to-refresh implementation der føles native på mobile. Viser en indikator mens man puller og trigger refresh når threshold nås.

```jsx
const { containerRef, isPulling, isRefreshing, pullDistance } = 
  usePullToRefresh(fetchNews, 80);

{(isPulling || isRefreshing) && (
  <div className="refresh-indicator" style={{ height: pullDistance }}>
    {isRefreshing ? '⟳ Refreshing...' : '↓ Pull to refresh'}
  </div>
)}
```

### 3. Animated Splash Screen

Har lavet en smooth animation sequence på splash screen:
1. Logo floater/hopper (1 sekund)
2. Logo vokser 2.5x (0.5 sekunder)
3. Titel fader ind fra bunden (0.5 sekunder)

```sass
@keyframes logoFloat
    0%
        transform: translateY(0px)
    50%
        transform: translateY(-15px)
    100%
        transform: translateY(0px)

@keyframes logoGrow
    0%
        transform: scale(1)
    100%
        transform: scale(2.5)

@keyframes titleAppear
    0%
        opacity: 0
        transform: translateY(20px)
    100%
        opacity: 1
        transform: translateY(0px)
```

### 4. Smart localStorage Integration

Bruger localStorage smart til at gemme user preferences og data. Alle Context providers loader initial state fra localStorage og gemmer automatisk ved ændringer.

```jsx
const [archivedArticles, setArchivedArticles] = useState(() => {
  const saved = localStorage.getItem('newsify-archived-articles');
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem('newsify-archived-articles', 
    JSON.stringify(archivedArticles));
}, [archivedArticles]);
```

### 5. Responsive Design System

Har lavet et konsistent design system med:
- Farvepalette (primær grøn, baggrund, tekst)
- Typografi (Playfair Display for headers, Open Sans for body)
- Spacing system (konsistent padding/margin)
- Dark mode support på alle komponenter

### 6. Code Organization

Koden er meget velorganiseret med:
- Separation of Concerns (komponenter, contexts, hooks, services)
- Genbrugelige komponenter (NewsCard, BottomNav)
- Custom hooks for kompleks logik
- Context API for global state
- Service layer for API calls

---

## Konklusion

Projektet har været en god læringsoplevelse hvor jeg har arbejdet med moderne React patterns og best practices. Jeg er særligt stolt af swipe gestures implementationen og den overordnede code struktur. Appen føles smooth og native på mobile enheder, hvilket var målet fra start.

**Teknisk niveau:** Har brugt avancerede React concepts som Context API, custom hooks, og lifecycle management. God forståelse for state management og data flow.

**Design:** Mobile-first approach med fokus på UX. Smooth animationer og transitions. Konsistent design system med dark mode support.

**Code Quality:** Ren og velstruktureret kode med god separation of concerns. Genbrugelige komponenter og DRY princippet. God dokumentation i koden.

---
