package com.datamanipulation.pawsonality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public void uploadImage(Long productId, byte[] imageData) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setImage(imageData);
        productRepository.save(product);
    }

    public void saveProduct( byte[] imageData,String description,Long price,Long quantity,String name,String category) {
        Product product = new Product();
        product.setName(name);
        product.setImage(imageData);
        product.setDescription(description);
        product.setPrice(price);
        product.setQuantity(quantity);
        product.setCategory(category);
        productRepository.save(product);
    }
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(String keyword) {
        return productRepository.findByCategoryContaining(keyword);
    }
    public void updateProduct(Long productId, Product product) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

        existingProduct.setName(product.getName());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setCategory(product.getCategory());
        if(product.getImage()!=null)
        existingProduct.setImage(product.getImage());

        productRepository.save(existingProduct);
    }

    public void deleteProduct(Long productId) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

        productRepository.delete(existingProduct);
    }
}
