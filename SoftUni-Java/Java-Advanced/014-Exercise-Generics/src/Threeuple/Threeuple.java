package Threeuple;

public record Threeuple<T1, T2, T3>(T1 item1, T2 item2, T3 item3) {
    @Override
    public String toString() {
        return item1 + " -> " + item2 + " -> " + item3;
    }
}
