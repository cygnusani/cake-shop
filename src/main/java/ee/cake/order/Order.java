package ee.cake.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(name = "customer_name")
    private String customerName;
    private BigDecimal price;
    @Column(name = "status_code")
    private String statusCode;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private List<OrderCake> orderedCakes;

    public Order(String customerName, BigDecimal amount, String statusCode) {
        this.customerName = customerName;
        this.price = amount;
        this.statusCode = statusCode;
    }

    public Order(Long orderId, String statusCode) {
        this.id = orderId;
        this.statusCode = statusCode;
    }

    public enum StatusCode {
        SUBMITTED, READY, DELIVERED, CANCELLED
    }
}
