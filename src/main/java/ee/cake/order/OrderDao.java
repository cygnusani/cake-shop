package ee.cake.order;

import ee.cake.cake.Cake;
import ee.cake.cake.CakeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.math.BigDecimal;
import java.util.List;

@Repository
@Transactional
public class OrderDao {

    @Autowired
    private EntityManager em;

    @Autowired
    private CakeDao cakeDao;

    public void insert(NewOrderJson json) {
        Long orderId = insertOrder(json.getCustomerName(), findTotalOrderPrice(json));
        insertOrderCake(orderId, json.getCakeId(), json.getAmount());
    }

    public List<Order> findAllOrders() {
        TypedQuery<Order> query = em.createQuery("select o from Order o", Order.class);
        return query.getResultList();
    }

    public void updateStatus(Long orderId, Order.StatusCode statusCode) {
        TypedQuery<Order> query = em.createQuery("select o from Order o where o.id = :id", Order.class);
        Order temp = query.setParameter("id", orderId).getSingleResult();
        temp.setStatusCode(statusCode.toString());
        em.merge(temp);
    }

    private List<OrderCake> findOrderedCakesByOrder(Long orderId) {
        TypedQuery<OrderCake> query = em.createQuery("select oc from OrderCake oc where oc.orderId = :id", OrderCake.class);
        return query.setParameter("id", orderId).getResultList();

    }

    private BigDecimal findTotalOrderPrice(NewOrderJson json) {
        Cake cake = cakeDao.findById(json.getCakeId());
        return cake.getPrice().multiply(BigDecimal.valueOf(json.getAmount().longValue()));
    }

    void insertOrderCake(Long orderId, Long cakeId, Integer amount) {
        em.persist(new OrderCake(orderId, cakeId, amount));
    }

    // https://stackoverflow.com/questions/9732453/jpa-returning-an-auto-generated-id-after-persist/9734002
    Long insertOrder(String customerName, BigDecimal amount) {
        Order order = new Order(customerName, amount, "SUBMITTED");
        em.persist(order);
        em.flush();
        return order.getId();
    }

}
