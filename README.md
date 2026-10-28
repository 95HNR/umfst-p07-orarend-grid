# AOK II. Evfolyam Orarend - CSS Grid & Container Query

Projekt repo: `umfst-p07-orarend-grid`
Elo demo: https://username.github.io/95HNR/umfst-p07-orarend-grid

## 1. A racs koordinata-rendszere

A heti orarend racsa 6 oszlopbol es 25 sorbol all:

- **Oszlopok (grid-column):**
  - `1. oszlop`: Idotengely (`4rem` szelesseg)
  - `2. - 6. oszlop`: Hetfo - Pentek napok (`1fr` / egyenlo szelessegu oszlopok)
  - A CSS valtozoban megadott `--nap` ertekhez (1-5) 1-et adunk hozza: `grid-column: calc(var(--nap) + 1);`

- **Sorok (grid-row):**
  - `1. sor`: Fejlec (Napok nevei)
  - `2. - 25. sor`: 8:00 es 20:00 kozott feloras idosavok (`1.5rem` / sor)
  - Egy 1.5 oras eloadas hossza 3 sor (`--hossz: 3`), a kezdo sor indexe 8:00-kor 2 (`--kezd: 2`).
  - Elhelyezes: `grid-row: var(--kezd) / span var(--hossz);`

  +--------------+----------+----------+----------+----------+----------+
|  Idopont     |  Hetfo   |   Kedd   |  Szerda  | Csutortok|  Pentek  |
| (grid-col 1) | (col 2)  | (col 3)  | (col 4)  | (col 5)  | (col 6)  |
+--------------+----------+----------+----------+----------+----------+
| 08:00 (row 2)|          |          |          |          |          |
| 08:30 (row 3)|          |          |          |          |          |
| 09:00 (row 4)|          |          |          |          |          |
+--------------+----------+----------+----------+----------+----------+

## 2. Container Query vs. Media Query indoklas

A feladatban **Container Query-t (`@container`)** hasznaltunk Media Query (`@media`) helyett.

- **Miert jobb a Container Query?**
  A Media Query kizilag a bongeszoablak (viewport) szelessegere tud reagalni. Ha az orarend komponenst egy keskeny oldalsavba (`<aside>`) helyezzuk egy egyebkent szeles kepernyon (lasd `sidebar.html`), a Media Query tovabbra is a szeles heti racsot jelenitene meg, ami teljesen osszenyomna az elemeket.
  A Container Query ezzel szemben kozvetlenul a komponens szulo kontenerenek szelesseget meri (`container-type: inline-size`). Ha a kontener 600px ala csokken, a komponens barhol az oldalon automatikusan atvalt a jol olvashato fuggoleges listanezetre.

## 3. Telepites es futtatas

1. Klonozd a repozitoriumot:
   ```bash
   git clone https://github.com/95HNR/umfst-p07-orarend-grid.git
   cd umfst-p07-orarend-grid
