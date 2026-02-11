const Footer = () => {
  return (
    <footer className="bg-black border-t border-neutral-800 mt-16 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1: WORLD GOLD PRICES */}
          <div>
            <h4 className="text-yellow-500 font-bold mb-4 text-sm">WORLD GOLD PRICES</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-yellow-500">🇺🇸 Gold Price USA</a></li>
              <li><a href="#" className="hover:text-yellow-500">🇪🇺 Gold Price Europe</a></li>
              <li><a href="#" className="hover:text-yellow-500">🇦🇺 Gold Price Australia</a></li>
              <li><a href="#" className="hover:text-yellow-500">🇭🇰 Gold Price Hong Kong</a></li>
              <li><a href="#" className="hover:text-yellow-500">🇲🇽 Gold Price Mexico</a></li>
              <li><a href="#" className="hover:text-yellow-500">🇬🇧 Gold Price UK</a></li>
            </ul>
          </div>

          {/* Column 2: GOLD PRICE NEWS + CHARTS */}
          <div>
            <h4 className="text-yellow-500 font-bold mb-4 text-sm">GOLD PRICE NEWS</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="#" className="hover:text-yellow-500">News</a></li>
              <li><a href="#" className="hover:text-yellow-500">Authors</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">GOLD PRICE CHARTS</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-yellow-500">Spot Gold</a></li>
            </ul>
          </div>

          {/* Column 3: PRECIOUS METALS + PRICE OF GOLD */}
          <div>
            <h4 className="text-yellow-500 font-bold mb-4 text-sm">PRECIOUS METALS</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="#" className="hover:text-yellow-500">Gold Price</a></li>
              <li><a href="#" className="hover:text-yellow-500">Silver Price</a></li>
              <li><a href="#" className="hover:text-yellow-500">Platinum Price</a></li>
              <li><a href="#" className="hover:text-yellow-500">Palladium Price</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">PRICE OF GOLD</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-yellow-500">Best Gold Price</a></li>
              <li><a href="#" className="hover:text-yellow-500">Best Gold Price in United States</a></li>
              <li><a href="#" className="hover:text-yellow-500">Best Gold Price in Canada</a></li>
              <li><a href="#" className="hover:text-yellow-500">Best Gold Price in United Kingdom</a></li>
            </ul>
          </div>

          {/* Column 4: CRYPTOCURRENCY + BUY GOLD */}
          <div>
            <h4 className="text-yellow-500 font-bold mb-4 text-sm">CRYPTOCURRENCY</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="#" className="hover:text-yellow-500">Bitcoin Price</a></li>
              <li><a href="#" className="hover:text-yellow-500">Ethereum Price</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">BUY GOLD USA</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="#" className="hover:text-yellow-500">USA Gold Prices</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">BUY GOLD UK</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="#" className="hover:text-yellow-500">UK Gold Prices</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">BUY GOLD CANADA</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-yellow-500">Canadian Gold Prices</a></li>
            </ul>
          </div>

          {/* Column 5: CONTACT + MOBILE + ADVERTISING */}
          <div>
            <h4 className="text-yellow-500 font-bold mb-4 text-sm">CONTACT</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="#" className="hover:text-yellow-500">Gold Price Live</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">MOBILE APPS</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="#" className="hover:text-yellow-500">📱 Gold Price Android App</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">ADVERTISING</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-yellow-500">Gold Price Live Advertising</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
          <p>© 2026 Gold Price Live. Gold, Silver and Precious Metals Prices.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
