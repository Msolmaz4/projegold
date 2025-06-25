# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
Verwaltung der Entitäten
'########Unternehmen
Auflisten: Die Unternehmen werden als Quadrate auf der Startseite aufgeführt. In jedem Quadrat gibt es lediglich das Logo und die Bezeichnung.
Hinzufügen: Es gibt rechts oben ein Hinzufügen-Button, aber kein Quadrat nach dem Stil der Unternehmen, mit dem man hinzufügen kann.
Detail-Ansicht: Oben sind Logo und Bezeichnung. Per Klick auf die Links Eckdaten, Unternehmensgegenstand, Vision und Cross-Funktion werden entsprechende Informationen aufgerufen. Die Aufgabengebiete werden darunter ebenfalls als Quadrate aufgelistet. Unterhalb der Aufgabengebiete werden die Meilensteine je in einer Zeile untereinander aufgelistet.
Bearbeiten und Löschen: Beide werden hinter dem 3-Pünktchen-Symbol rechts oben versteckt. Löschen wird nicht zugelassen, wenn Aufgabengebiete oder Meilensteine existieren.
######Aufgabengebiete
Hinzufügen: Es gibt rechts oben ein Hinzufügen-Button, aber kein Quadrat, mit dem man hinzufügen kann.
Detail-Ansicht: Oben sind Symbol und Bezeichnung. Unterhalb der Bezeichnung ist die Beschreibung. Die Aufgabenuntergebiete werden als Quadrate aufgeführt.
Bearbeiten und Löschen: Beide werden hinter dem 3-Pünktchen-Symbol rechts oben versteckt. Löschen wird nicht zugelassen, wenn Aufgabenuntergebiete existieren.
######Aufgabenuntergebiete
Hinzufügen: Es gibt rechts oben ein Hinzufügen-Button, aber kein Quadrat, mit dem man hinzufügen kann.
Detail-Ansicht: Oben sind Symbol und Bezeichnung. Unterhalb der Bezeichnung ist die Beschreibung. Die Aufgaben werden in Meilensteinen unterteilt untereinander aufgelistet.
Bearbeiten und Löschen: Beide werden hinter dem 3-Pünktchen-Symbol rechts oben versteckt. Löschen wird nicht zugelassen, wenn Aufgaben existieren.
Aufgaben
Hinzufügen: Aufgaben können lediglich innerhalb eines Meilensteins hinzugefügt werden.
Auflisten: Aufgaben werden sowohl innerhalb von Meilensteinen als auch innerhalb von Aufgabenuntergebieten aufgeführt. Im Falle von Aufgabenuntergebieten werden sie optisch in die Meilensteile unterteilt.
Tabellenfilter beim Auflisten:
Bezeichnung: Textsuche
Aufgabenuntergebiet: Unter den in der aktuellen Liste vertretenen Untergebieten auswählen
Meilenstein: Unter den existierenden Meilensteinen, automatisch der erste nicht abgeschlossene Meilenstein
Minuten Vorarbeit: Kleiner, Größer, Gleich, Zwischen
Minuten Umsetzung: Kleiner, Größer, Gleich, Zwischen
Minuten Kontrolle: Kleiner, Größer, Gleich, Zwischen
Benötigtes Geld: Kleiner, Größer, Gleich, Zwischen
Status: Multi-Select Dropdown
Bearbeiten: Bei Mouse Over erscheint auf der rechten Seite ein Stiftssymbol.
Löschen: Bei Mouse Over erscheint auf der rechten Seite ein 3-Punkte Symbol, unter dem das Löschen versteckt ist.
Verschieben: Das Verschieben in einen anderen Meilenstein ist ebenfalls hinter den 3 Pünktchen versteckt.
Status ändern: Die Statusänderung ist ebenfalls hinter den 3 Pünktchen versteckt. Hier werden die einzelnen Stati direkt im Menü untereinander aufgelistet. Der aktuelle Status ist mit einem Haken gekennzeichnet.