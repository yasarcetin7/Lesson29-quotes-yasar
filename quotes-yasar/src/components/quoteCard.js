// src/components/QuoteCard.js

export default function QuoteCard({ quote, author, likeCount, onLike }) {
  return (
    <div style={{ 
      border: '1px solid #e2e8f0', 
      padding: '20px', 
      marginBottom: '15px', 
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
      <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#333' }}>
        "{quote}"
      </p>
      
      <p style={{ textAlign: 'right', fontWeight: 'bold', color: '#666' }}>
        - {author}
      </p>
      
      {/* Alt Kısım: Beğeni Sayısı ve Buton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <span style={{ fontWeight: 'bold', color: '#e53e3e' }}>
          ❤️ {likeCount} Beğeni
        </span>
        
        <button 
          onClick={onLike}
          style={{ 
            backgroundColor: '#e53e3e', 
            color: 'white', 
            border: 'none', 
            padding: '4px 10px', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Beğen
        </button>
      </div>
    </div>
  );
}