export default function Home() {
  return (
    <div>
      <div>
        <h2>Oběšenec</h2>V této hře si zahrajete známou hru oběšenec nebo-li
        šibenice.Hra je pouze v angličtině. Zde je úkolem uhodnout slovo dřív
        než se na obrazovku vykreslí oběšený panáček.Na obrazovce se vykreslí
        slovíčko, které musí uživatel uhodnout.Akorát že místo písmen jsou
        prázdné místa,teda kromě prvního písmena , které slouží jako malá
        nápověda V případě že by si někdo nevěděl se slovíčkem rady, tak si může
        zobrazit nápovědu, která mu zobrazí český překlad slovíčka, které hádá.
        Tato hra je především určena k učení nových slovíček která jsou ve
        slovníku
        <img src={"./obrazky/obrazek_obesenec.PNG"} />
      </div>
      <hr></hr>
      <div>
        <h2>Pexeso</h2>
        Tuto hru je možné si zahrát jak v angličtině tak i v němčině. Princip
        této hry je velmi prostý. Najít dvojice slovíček(české a překlad).Ve hře
        máme 16 kartiček, což znamená 8 dvojic. Jeden tah této hry znamená
        otočit 2 kartičky.Při otočených kartičkách se na obrazovce změní tyto
        dvě kartičky z červené na zelenou. Pokud dvojici trefíme, tak obě
        kartičky zešednou a už s nimi nemůžeme nijak pracovat. Pokud slovíčka
        netrefí, tak tak se po určitém časovém intervalu kartičky otočí zpět.
        Tato hra bude taktéž jako oběšenec především pro naučení a procvičování
        slovíček, které jsou ve slovníku.
        <img src={"./obrazky/obrazek_pexeso.PNG"} />
      </div>
      <hr></hr>
      <div>
        <h2>Spojování odpovídajících se slov</h2>
        Zde jak už je z názvu vypovídající, tak úkolem bude spojit sobě
        odpovídající slovíčka. Tato hra bude také možno hrát buď v angličtině
        nebo v němčině. Budou zobrazeny čtyři cizí slovíčka a pod každým z nich
        bude na výběr z těch samých slovíček akorát přeložených do češtiny. Po
        vyplnění každé dvojice slovíčka odešleme ke kontrole. V případě, že
        slovíčko spojíme se svým českým překladem správně, tak se zbarví zeleně.
        V případě, že slovíčko nespojíme se svým českým překladem správně, tak
        se zbarví červeně. Tato hra bude už na vyšší úrovni, kde to bude taková
        příprava na test.
        <img src={"./obrazky/obrazek_spojovacka.PNG"} />
      </div>
      <hr></hr>
      <div>
        <h2>Test</h2>
        Tato hra bude zkoušet naše znalosti z předešlých her. Opět bude možnost
        si jí vyzkoušet jak v angličtině tak i v němčině. Uživatel si před
        začátkem hry zvolí jazyk a počet slov ze kterých se chce testovat.
        Minimální počet je 5 slovíček a maximální počet je počet všech slovíček
        z databáze. V této hře se budou generovat cizí slovíčka a uživatel bude
        psát jejich překlad bez jakékoliv nápovědy. Pokud slovíčko uhodne , tak
        se barva slovíčka změní na zelenou. Pokud neuhodne ,tak se barva změní
        na červenou. Slovíčko je obarvené po určitou dobu a pak se vygeneruje
        nové se základní černou barvou. Z tohoto testu už uživatel ve svém
        profilu nalezne statistiky. Tyto statistiky bude mít možnost vidět i
        administrátor.<br></br>
        <img src={"./obrazky/obrazek_test.PNG"} />
      </div>
    </div>
  );
}
