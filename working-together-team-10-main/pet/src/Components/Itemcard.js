import React from 'react';

const ItemCard = ({ item }) => (
    <div className="item-card" style={styles.card}>
        <img src={item.imageUrl} alt={item.name} style={styles.image} />
        <h3 style={styles.title}>{item.name}</h3>
        <p style={styles.price}>${item.price}</p>
    </div>
);

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px',
        width: '200px',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 'auto',
        marginBottom: '10px',
    },
    title: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    price: {
        fontSize: '14px',
        color: 'green',
        marginTop: '5px',
    },
};

export default ItemCard;
