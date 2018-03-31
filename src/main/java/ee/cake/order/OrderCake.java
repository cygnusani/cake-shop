package ee.cake.order;

import ee.cake.cake.Cake;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderCake {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(name = "order_id")
    private Long orderId;
    @Column(name = "cake_id")
    private Long cakeId;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "id")
    private Cake cake;
    private Integer amount;

    public OrderCake(Long orderId, Long cakeId, Integer amount) {
        this.orderId = orderId;
        this.cakeId = cakeId;
        this.amount = amount;
    }
}
