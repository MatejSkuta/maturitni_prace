import React, { useContext } from "react";
import UserContext from "../components/userContext";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <div class="jumbotron">
        <h1 class="display-4">WORDGAME</h1>
        <p class="lead">
          WORDGAME je aplikace pro procvičování a testování slovíček v němčině a
          v angličtině. Aplikace obsahuje několik her, které jsou uvedeny níže.
        </p>
        {!user && (
          <>
            <hr class="my-4" />
            <p>
              Stačí pouhá registrace, přihlásit se a to je vše. Po přihlášení
              máte možnost si zahrát všechny hry. Ve svém profilu si navíc
              můžete zobrazit statistiky z testů, takže uvidíte zda se lepšíte
              či nikoliv.
            </p>
            <p class="lead">
              <a class="btn btn-primary btn-lg" href="/login" role="button">
                Začni hned
              </a>
            </p>
          </>
        )}
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
