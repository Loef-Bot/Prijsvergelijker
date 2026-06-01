import { useEffect, useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch('/api/products?q=' + encodeURIComponent(query), {
          signal: controller.signal,
        });
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
    return () => controller.abort();
  }, [query]);

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <h1>Prijsvergelijker</h1>
      <p>Zoek producten en klik door naar de winkel (met affiliate links).</p>

      <input
        placeholder="Zoek een product..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          margin: '1rem 0',
          fontSize: '1rem',
        }}
      />

      {loading && <p>Bezig met laden...</p>}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {products.map(p => (
          <div
            key={p.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: '1rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            {p.image_url && (
              <img
                src={p.image_url}
                alt={p.name}
                style={{ width: 120, height: 120, objectFit: 'cover' }}
              />
            )}
            <div>
              <h2 style={{ margin: '0 0 0.5rem' }}>{p.name}</h2>
              <p style={{ margin: '0.25rem 0' }}>
                <strong>€ {p.price}</strong>
              </p>
              <p style={{ margin: '0.25rem 0' }}>Bij: {p.shop}</p>
              <a
                href={p.affiliate_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  padding: '0.4rem 0.8rem',
                  background: '#0070f3',
                  color: 'white',
                  borderRadius: 4,
                  textDecoration: 'none',
                }}
              >
                Bekijk bij {p.shop}
              </a>
            </div>
          </div>
        ))}
        {!loading && products.length === 0 && (
          <p>Geen producten gevonden. Voeg eerst producten toe in Supabase.</p>
        )}
      </div>
    </main>
  );
}
