package com.datamanipulation.pawsonality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryManagmentService {

    @Autowired
    private InventoryManagmentRepository productRepository;

    public void uploadInventoryImage(Long productId, byte[] imageData) {
        InventoryManagmentProducts product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setImage(imageData);
        productRepository.save(product);
    }
    public void saveInventoryProduct(String name , Long price, byte[] imageData) {
        InventoryManagmentProducts product = new InventoryManagmentProducts();
        product.setName(name);
        product.setImage(imageData);

        product.setPrice(price);

        productRepository.save(product);
    }

    public List<InventoryManagmentProducts> getAllInventoryProducts() {
        return productRepository.findAll();
    }

    public void updateInventoryProduct(Long productId, InventoryManagmentProducts product) {
        InventoryManagmentProducts existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

        existingProduct.setName(product.getName());

        existingProduct.setPrice(product.getPrice());


        if(product.getImage()!=null)
            existingProduct.setImage(product.getImage());

        productRepository.save(existingProduct);
    }

    public void deleteInventoryProduct(Long productId) {
        InventoryManagmentProducts existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

        productRepository.delete(existingProduct);
    }
}
