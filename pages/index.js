export default function Home() {
  return (
    <div>
      <div>
        <h2>Úvod</h2>
        <strong>
          WORDGAME je aplikace pro procvičování a testování slovíček v němčině a
          v angličtině. Aplikace obsahuje několik her, které jsou uvedeny níže.
          Stačí pouhá registrace, přihlásit se a to je vše. Po přihlášení máte
          možnost si zahrát všechny hry. Ve svém profilu si navíc můžete
          zobrazit statistiky z testů, takže uvidíte zda se lepšíte či nikoliv.
        </strong>
      </div>
      <hr></hr>
      <div class="container mt-3">
        <div id="accordion">
          <div class="card">
            <div class="card-header">
              <a class="btn" data-bs-toggle="collapse" href="#collapseOne">
                Oběšenec
              </a>
            </div>
            <div
              id="collapseOne"
              class="collapse show"
              data-bs-parent="#accordion"
            >
              <div class="card-body">
                <p>
                  V této hře si zahrajete známou hru oběšenec nebo-li
                  šibenice.Hra je pouze v angličtině. Zde je úkolem uhodnout
                  slovo dřív než se na obrazovku vykreslí oběšený panáček.Na
                  obrazovce se vykreslí slovíčko, které musí uživatel
                  uhodnout.Akorát že místo písmen jsou prázdné místa,teda kromě
                  prvního písmena , které slouží jako malá nápověda V případě že
                  by si někdo nevěděl se slovíčkem rady, tak si může zobrazit
                  nápovědu, která mu zobrazí český překlad slovíčka, které hádá.
                  Tato hra je především určena k učení nových slovíček která
                  jsou ve slovníku
                </p>
                <img
                  src={"./obrazky/obrazek_obesenec.PNG"}
                  width="600"
                  height="300"
                />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <a
                class="collapsed btn"
                data-bs-toggle="collapse"
                href="#collapseTwo"
              >
                Pexeso
              </a>
            </div>
            <div id="collapseTwo" class="collapse" data-bs-parent="#accordion">
              <div class="card-body">
                <p>
                  Tuto hru je možné si zahrát jak v angličtině tak i v němčině.
                  Princip této hry je velmi prostý. Najít dvojice slovíček(české
                  a překlad).Ve hře máme 16 kartiček, což znamená 8 dvojic.
                  Jeden tah této hry znamená otočit 2 kartičky.Při otočených
                  kartičkách se na obrazovce změní tyto dvě kartičky z červené
                  na zelenou. Pokud dvojici trefíme, tak obě kartičky zešednou a
                  už s nimi nemůžeme nijak pracovat. Pokud slovíčka netrefí, tak
                  tak se po určitém časovém intervalu kartičky otočí zpět. Tato
                  hra bude taktéž jako oběšenec především pro naučení a
                  procvičování slovíček, které jsou ve slovníku.
                </p>

                <img
                  src={"./obrazky/obrazek_pexeso.PNG"}
                  width="400"
                  height="400"
                />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <a
                class="collapsed btn"
                data-bs-toggle="collapse"
                href="#collapseThree"
              >
                Spojování odpovídajících se slov
              </a>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              data-bs-parent="#accordion"
            >
              <div class="card-body">
                <p>
                  Zde jak už je z názvu vypovídající, tak úkolem bude spojit
                  sobě odpovídající slovíčka. Tato hra bude také možno hrát buď
                  v angličtině nebo v němčině. Budou zobrazeny čtyři cizí
                  slovíčka a pod každým z nich bude na výběr z těch samých
                  slovíček akorát přeložených do češtiny. Po vyplnění každé
                  dvojice slovíčka odešleme ke kontrole. V případě, že slovíčko
                  spojíme se svým českým překladem správně, tak se zbarví
                  zeleně. V případě, že slovíčko nespojíme se svým českým
                  překladem správně, tak se zbarví červeně. Tato hra bude už na
                  vyšší úrovni, kde to bude taková příprava na test.
                </p>

                <img src={"./obrazky/obrazek_spojovacka.PNG"} />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <a
                class="collapsed btn"
                data-bs-toggle="collapse"
                href="#collapseFour"
              >
                Test
              </a>
            </div>
            <div id="collapseFour" class="collapse" data-bs-parent="#accordion">
              <div class="card-body">
                <p>
                  Tato hra bude zkoušet naše znalosti z předešlých her. Opět
                  bude možnost si jí vyzkoušet jak v angličtině tak i v němčině.
                  Uživatel si před začátkem hry zvolí jazyk a počet slov ze
                  kterých se chce testovat. Minimální počet je 5 slovíček a
                  maximální počet je počet všech slovíček z databáze. V této hře
                  se budou generovat cizí slovíčka a uživatel bude psát jejich
                  překlad bez jakékoliv nápovědy. Pokud slovíčko uhodne , tak se
                  barva slovíčka změní na zelenou. Pokud neuhodne ,tak se barva
                  změní na červenou. Slovíčko je obarvené po určitou dobu a pak
                  se vygeneruje nové se základní černou barvou. Z tohoto testu
                  už uživatel ve svém profilu nalezne statistiky. Tyto
                  statistiky bude mít možnost vidět i administrátor.
                </p>

                <img src={"./obrazky/obrazek_test.PNG"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
