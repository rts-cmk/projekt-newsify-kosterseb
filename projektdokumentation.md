# Projektdokumentation

**Navn:** Sebastian Aguiar Køster

**Hold:** WU14

**Uddannelse:** Webudvikler

**Uddannelsessted:** Roskilde Tekniske Skole

[Link til min applikaton](http://example.com/)


## Teknologier

-   HTML
-   Sass
-   Vite
-   Vitest
-   React (JS)
-   React Routing
-   API
-	Github Pages

---



### Redegørelse for oprindelsen af evt. tredjeparts kode anvendt i opgaveløsningen (Teknisk dokumentation)

## NYT API

- Har opsat bruger hos NYT og fået nøgle til deres API. Har lavet en envoirment fil til min API key.

```jsx
YOUR_API_KEY = "8o4A8yROWNlBDdA5xudbwcQdeUIIGhM8"
```

- Installeret vite + react, react-routing og sass.
```zsh
npm create vite@latest .
npm install react-router
npm install -D sass
```
- 

---

### Argumentation for de valg du selvstændigt har truffet under løsningen af opgaven

Har valgt at bruge *React-routing* til at navigere igennem de forskellige sider.

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

Så har jeg også valgt at lave alt seppareret i forhold til mapper. Filstrukturen giver et mere specifikt forhold til arbejdet, så man også kan skabe noget SOC (Sepperation of Concern)
```zsh
src/
├── contexts/
│   └── DarkModeContext.jsx         
├── components/
│   ├── BottomNav/                  
│   │   ├── BottomNav.jsx
│   │   └── BottomNav.sass
│   ├── Splash/
│   │   ├── SplashScreen.jsx        
│   │   └── SplashScreen.sass       
│   ├── Onboarding/
│   │   ├── OnBoarding.jsx          
│   │   └── OnBoarding.sass         
│   ├── Authentication/
│   │   ├── Authentication.jsx      
│   │   └── Authentication.sass     
│   ├── Home/
│   │   ├── Home.jsx                
│   │   └── Home.sass               
│   ├── Archive/
│   │   ├── Archive.jsx             
│   │   └── Archive.sass            
│   ├── Popular/
│   │   ├── Popular.jsx             
│   │   └── Popular.sass            
│   └── Settings/
│       ├── Settings.jsx            
│       └── Settings.sass           
├── App.jsx                         
└── main.jsx             
```           

---
### Vurdering af egen indsats & gennemførelse af opgaveforløbet (Arbejdsgangen)

GAG (God Arbejds Gang) er for mig at tilgå opgaven fra det fundementale. Umiddelbart starter jeg med at få installeret alle de redskaber jeg skal bruge og får det opsat så det fungere. Derefter tilgår jeg noget filstruktur som jeg kan forholde mig til igennem hele opgaven, en guideline til mig selv som jeg kan følge for at holde orden i mine filer.

---
### En beskrivelse af særlige punkter til bedømmelse

(er der en særlig detalje som du synes din underviser bør lægge mærke til når dit projekt evalueres)

Du kan vise kode i markdown på følgende måder: 
```js
function myFunction() {
	
}
```

```css
.my__css-rule {
	property: value;
}
```

