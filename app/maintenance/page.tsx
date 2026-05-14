export default function MaintenancePage() {
  return (
    <html lang="en">
      <head>
        <title>Site Under Maintenance</title>
        <meta name="robots" content="noindex" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
            padding: 2rem;
          }
          h1 { font-size: 2rem; margin-bottom: 1rem; }
          p { color: #94a3b8; font-size: 1.1rem; }
        `}</style>
      </head>
      <body>
        <div>
          <h1>Under Maintenance</h1>
          <p>We&apos;re making some improvements. Check back soon.</p>
        </div>
      </body>
    </html>
  );
}
