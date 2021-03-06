package ee.cake.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("orders")
public class OrderController {

    @Autowired
    private OrderDao orderDao;

    @PostMapping("new")
    public void createNewOrder(@RequestBody NewOrderJson json) {
        orderDao.insert(json);
    }

    @PostMapping("/{orderId}/cancel")
    public void cancelOrder(@PathVariable Long orderId) {
        orderDao.updateStatus(orderId, Order.StatusCode.CANCELLED);
    }

    @PostMapping("/{orderId}/ready")
    public void readyOrder(@PathVariable Long orderId) {
        orderDao.updateStatus(orderId, Order.StatusCode.READY);

    }

    @PostMapping("/{orderId}/deliver")
    public void deliverOrder(@PathVariable Long orderId) {
        orderDao.updateStatus(orderId, Order.StatusCode.DELIVERED);
    }

    @GetMapping("all")
    public List<Order> findAllOrders() {
        List<Order> temp = orderDao.findAllOrders();
        for (Order v: temp
             ) {
            System.out.println("Order id: " + v.getId() + " cakes:");
            for (OrderCake oc: v.getOrderedCakes()
                 ) {
                System.out.println(oc.getCake().getName());
            }
            System.out.println("END");
        }
        return orderDao.findAllOrders();
    }
}
