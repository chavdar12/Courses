import java.util.Iterator;

public class ChainblockImpl implements Chainblock {
    @Override
    public int getCount() {
        return 0;
    }

    @Override
    public void add(Transaction transaction) {}

    @Override
    public boolean contains(Transaction transaction) {
        return false;
    }

    @Override
    public boolean contains(int id) {
        return false;
    }

    @Override
    public void changeTransactionStatus(int id, TransactionStatus newStatus) {}

    @Override
    public void removeTransactionById(int id) {}

    @Override
    public Transaction getById(int id) {
        return null;
    }

    @Override
    public Iterable<Transaction> getByTransactionStatus(TransactionStatus status) {
        return null;
    }

    @Override
    public Iterable<String> getAllSendersWithTransactionStatus(TransactionStatus status) {
        return null;
    }

    @Override
    public Iterable<String> getAllReceiversWithTransactionStatus(TransactionStatus status) {
        return null;
    }

    @Override
    public Iterable<Transaction> getAllOrderedByAmountDescendingThenById() {
        return null;
    }

    @Override
    public Iterable<Transaction> getBySenderOrderedByAmountDescending(String sender) {
        return null;
    }

    @Override
    public Iterable<Transaction> getByReceiverOrderedByAmountThenById(String receiver) {
        return null;
    }

    @Override
    public Iterable<Transaction> getByTransactionStatusAndMaximumAmount(
            TransactionStatus status, double amount) {
        return null;
    }

    @Override
    public Iterable<Transaction> getBySenderAndMinimumAmountDescending(
            String sender, double amount) {
        return null;
    }

    @Override
    public Iterable<Transaction> getByReceiverAndAmountRange(
            String receiver, double lo, double hi) {
        return null;
    }

    @Override
    public Iterable<Transaction> getAllInAmountRange(double lo, double hi) {
        return null;
    }

    @Override
    public Iterator<Transaction> iterator() {
        return null;
    }
}
