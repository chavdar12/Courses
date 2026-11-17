import { useState, type ReactNode } from 'react';

type Decision = 'pending' | 'approved' | 'rejected';

export default function ApprovalCard({ children }: { children: ReactNode }) {
    const [decision, setDecision] = useState<Decision>('pending');
    return (
        <div className="card">
            {children}
            {decision === 'pending' ? (
                <div className="actions">
                    <button onClick={() => setDecision('approved')}>Approve</button>
                    <button onClick={() => setDecision('rejected')}>Reject</button>
                </div>
            ) : (
                <p role="status">{decision === 'approved' ? 'Approved' : 'Rejected'}</p>
            )}
        </div>
    );
}
