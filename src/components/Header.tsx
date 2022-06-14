import logo from "../images/spotify-logo.svg";

export default function Header(props: { searchValue: string, onSearchCallback: (value: string) => void }) {
    return (
      <header className="header">
        <a href="./" className="header__logo">
          <img src={logo} alt="logo" width="240" height="46" />
        </a>
        <input type="search" className="header__search" placeholder="Исполнитель, трек или альбом" 
        value={props.searchValue} onChange={(event) => props.onSearchCallback(event.target.value)} />
      </header>
    );
}