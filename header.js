function Header() {
  var dom = document.getElementById('root');
  var header = document.createElement('div');
  header.innerText = 'header';
  header.className = 'red'
  dom.append(header);


}

export default Header;