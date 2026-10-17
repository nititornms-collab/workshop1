import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

class Drink {
    private final String drinkId;
    private final String name;
    private final BigDecimal price;

    public Drink(String drinkId, String name, BigDecimal price) {
        if (price.signum() < 0) throw new IllegalArgumentException("Price cannot be negative");
        this.drinkId = drinkId; this.name = name; this.price = price;
    }
    public String getName() { return name; }
    public BigDecimal getPrice() { return price; }
}

class OrderItem {
    private final Drink drink;
    private final int quantity;

    public OrderItem(Drink drink, int quantity) {
        if (quantity <= 0) throw new IllegalArgumentException("Quantity must be positive");
        this.drink = drink; this.quantity = quantity;
    }
    public BigDecimal getSubtotal() {
        return drink.getPrice().multiply(BigDecimal.valueOf(quantity));
    }
}

abstract class Payment {
    protected final BigDecimal amount;
    protected final LocalDateTime paidAt;
    protected Payment(BigDecimal amount) {
        this.amount = amount; this.paidAt = LocalDateTime.now();
    }
    public abstract boolean pay(BigDecimal amount);
}

class CashPayment extends Payment {
    public CashPayment(BigDecimal amount) { super(amount); }
    @Override public boolean pay(BigDecimal amount) { return amount.compareTo(this.amount) >= 0; }
}

class QRPayment extends Payment {
    private final String transactionId = UUID.randomUUID().toString();
    public QRPayment(BigDecimal amount) { super(amount); }
    public String generateQR() { return "QR-PAY:" + transactionId + ":" + amount; }
    @Override public boolean pay(BigDecimal amount) { return amount.compareTo(this.amount) == 0; }
}

class Order {
    private final String orderNumber;
    private final LocalDate date;
    private final List<OrderItem> items = new ArrayList<>();
    public Order(String orderNumber) {
        this.orderNumber = orderNumber; this.date = LocalDate.now();
    }
    public void addDrink(Drink drink, int quantity) { items.add(new OrderItem(drink, quantity)); }
    public BigDecimal calculateTotal() {
        return items.stream().map(OrderItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    public String getOrderNumber() { return orderNumber; }
    public LocalDate getDate() { return date; }
}

class Customer {
    private final String customerId;
    private final String name;
    private final String phone;
    public Customer(String customerId, String name, String phone) {
        this.customerId = customerId; this.name = name; this.phone = phone;
    }
    public Order createOrder(String orderNumber) { return new Order(orderNumber); }
    public boolean pay(Order order, Payment payment) {
        return payment.pay(order.calculateTotal());
    }
}
