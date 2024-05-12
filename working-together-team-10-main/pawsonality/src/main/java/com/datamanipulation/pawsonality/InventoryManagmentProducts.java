package com.datamanipulation.pawsonality;



import jakarta.persistence.*;

@Entity
@Table(name = "InventoryManagmentProducts")
public class InventoryManagmentProducts {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="name")
    private String name;

    @Lob
    @Column(name="image")
    private byte[] image;

    @Column(name="price")
    private Long price;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    }


