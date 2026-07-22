package com.ecommerce.backend.config;

import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.ProductImage;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;

    public DataSeeder(
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            ObjectMapper objectMapper
    ) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() > 0 || productRepository.count() > 0) {
            log.info("Seed skipped: database already has data");
            return;
        }

        seedCategories();
        seedProducts();
        log.info(
                "Seed completed: {} categories, {} products",
                categoryRepository.count(),
                productRepository.count()
        );
    }

    private void seedCategories() throws Exception {
        try (InputStream input = new ClassPathResource("data/categories.json").getInputStream()) {
            JsonNode root = objectMapper.readTree(input);
            // PowerShell export sometimes wraps the array as { "value": [ ... ] }
            JsonNode categories = root.isArray() ? root : root.get("value");

            if (categories == null || !categories.isArray()) {
                throw new IllegalStateException("categories.json format is invalid");
            }

            for (JsonNode node : categories) {
                Category category = new Category();
                category.setId(node.get("id").asLong());
                category.setCode(text(node, "code"));
                category.setTitle(text(node, "title"));
                category.setImg(text(node, "img"));
                category.setRating(node.has("rating") && !node.get("rating").isNull()
                        ? node.get("rating").asDouble()
                        : null);
                category.setGender(text(node, "gender"));
                categoryRepository.save(category);
            }
        }
    }

    private void seedProducts() throws Exception {
        try (InputStream input = new ClassPathResource("data/products.json").getInputStream()) {
            JsonNode root = objectMapper.readTree(input);
            JsonNode products = root.get("products");

            if (products == null || !products.isArray()) {
                throw new IllegalStateException("products.json format is invalid");
            }

            for (JsonNode node : products) {
                Product product = new Product();
                product.setId(node.get("id").asLong());
                product.setName(text(node, "name"));
                product.setDescription(text(node, "description"));
                product.setPrice(new BigDecimal(node.get("price").asText()));
                product.setStock(node.has("stock") && !node.get("stock").isNull()
                        ? node.get("stock").asInt()
                        : 0);
                product.setStoreId(node.has("store_id") && !node.get("store_id").isNull()
                        ? node.get("store_id").asLong()
                        : null);
                product.setCategoryId(node.get("category_id").asLong());
                product.setRating(node.has("rating") && !node.get("rating").isNull()
                        ? node.get("rating").asDouble()
                        : null);
                product.setSellCount(node.has("sell_count") && !node.get("sell_count").isNull()
                        ? node.get("sell_count").asInt()
                        : 0);

                JsonNode images = node.get("images");
                if (images != null && images.isArray()) {
                    for (JsonNode imageNode : images) {
                        ProductImage image = new ProductImage();
                        image.setUrl(text(imageNode, "url"));
                        image.setIndex(imageNode.has("index") && !imageNode.get("index").isNull()
                                ? imageNode.get("index").asInt()
                                : 0);
                        product.addImage(image);
                    }
                }

                productRepository.save(product);
            }
        }
    }

    private static String text(JsonNode node, String field) {
        JsonNode value = node.get(field);
        return value == null || value.isNull() ? null : value.asText();
    }
}
