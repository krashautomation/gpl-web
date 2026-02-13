const Footer = () => {
  return (
    <footer className="bg-black border-t border-neutral-800 mt-16 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1: WORLD GOLD PRICES */}
          <div>
            <h4 className="text-yellow-500 font-bold mb-4 text-sm">WORLD GOLD PRICES</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/#foreign-currency" className="hover:text-yellow-500"><span className="fi fi-eu"></span> Gold Price EUR</a></li>
              <li><a href="/#foreign-currency" className="hover:text-yellow-500"><span className="fi fi-au"></span> Gold Price AUD</a></li>
              <li><a href="/#foreign-currency" className="hover:text-yellow-500"><span className="fi fi-ca"></span> Gold Price CAD</a></li>
              <li><a href="/#foreign-currency" className="hover:text-yellow-500"><span className="fi fi-gb"></span> Gold Price GBP</a></li>
            </ul>
          </div>

          {/* Column 2: GOLD PRICE NEWS + CHARTS */}
          <div>
            <h4 className="text-yellow-500 font-bold mb-4 text-sm">GOLD PRICE NEWS</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="/news" className="hover:text-yellow-500">Gold Price News</a></li>
              <li><a href="/about" className="hover:text-yellow-500">About Us</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">GOLD PRICE CHARTS</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/charts" className="hover:text-yellow-500">Gold Price Charts</a></li>
               <li><a href="/gold-price-history" className="hover:text-yellow-500">Gold Price History</a></li>
                <li><a href="/gold-silver-ratio" className="hover:text-yellow-500">Gold Silver Ratio</a></li>
            </ul>
          </div>

          {/* Column 3: PRECIOUS METALS + PRICE OF GOLD */}
          <div>
            <h4 className="text-yellow-500 font-bold mb-4 text-sm">PRECIOUS METALS</h4>
            <ul className="space-y-2 text-xs mb-6">
                  <li><a href="/silver-price" className="hover:text-yellow-500">Silver Price</a></li>
              <li><a href="/platinum-price" className="hover:text-yellow-500">Platinum Price</a></li>
              <li><a href="/palladium-price" className="hover:text-yellow-500">Palladium Price</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">BASE METALS</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="/copper-price" className="hover:text-yellow-500">Copper Price</a></li>
              <li><a href="/aluminum-price" className="hover:text-yellow-500">Aluminum Price</a></li>
            </ul>

          </div>

          {/* Column 4: CRYPTOCURRENCY + BUY GOLD */}
          <div>
         <h4 className="text-yellow-500 font-bold mb-4 text-sm">GOLD STOCKS</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="/gold-etfs" className="hover:text-yellow-500">Gold ETFs</a></li>
              <li><a href="/silver-etfs" className="hover:text-yellow-500">Silver ETFs</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">CRYPTOCURRENCY</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="/bitcoin-price" className="hover:text-yellow-500">Bitcoin Price</a></li>
              <li><a href="/ethereum-price" className="hover:text-yellow-500">Ethereum Price</a></li>
            </ul>

     
          </div>

          {/* Column 5: CONTACT + MOBILE + ADVERTISING */}
          <div>
            <h4 className="text-yellow-500 font-bold mb-4 text-sm">CONTACT</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="/contact" className="hover:text-yellow-500">Contact Us</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">MOBILE APPS</h4>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="/gold-price-live-app" className="hover:text-yellow-500">📱 Gold Price Live App</a></li>
            </ul>

            <h4 className="text-yellow-500 font-bold mb-4 text-sm">ADVERTISING</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/advertise" className="hover:text-yellow-500">Gold Price Live Advertising</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
          <p>© 2026 Gold Price Live. Gold, Silver and Precious Metals Prices.</p>
            <p>
              
<a href="/terms-of-service" className="hover:text-yellow-500">Terms of Service</a> &nbsp; 
<a href="/disclaimer" className="hover:text-yellow-500">Disclaimer</a> &nbsp; 
<a href="/risk-warning" className="hover:text-yellow-500">Risk Warning</a> &nbsp; 
<a href="/privacy" className="hover:text-yellow-500">Privacy</a>

            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
