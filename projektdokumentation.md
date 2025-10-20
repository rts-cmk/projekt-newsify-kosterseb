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
-   React (JS)
-   React Routing
-   Tailwind
-	Github Pages
-   Vitest

---



### Redegørelse for oprindelsen af evt. tredjeparts kode anvendt i opgaveløsningen (Teknisk dokumentation)

## NYT API

- Har opsat bruger hos NYT og fået nøgle til deres API. Har lavet en envoirment fil til min API key.

```jsx
YOUR_API_KEY = "8o4A8yROWNlBDdA5xudbwcQdeUIIGhM8"
```

- Installeret vite + react, react-routing, sass og tailwind.
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

---
### Vurdering af egen indsats & gennemførelse af opgaveforløbet (Arbejdsgangen)

(Hvad gik godt. Hvor prioriterede du forkert. Klagesange fra de varme lande om halvfærdigt produkt, på grund af manglende nattesøvn, fordi din kæle-skildpadde havde tandpine er IKKE interessante.)

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

