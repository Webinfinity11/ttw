'use client';

import { LEAD_STATUS_LABELS, type LeadStatus } from '@/lib/types';
import { Badge } from './ui';

const TONE: Record<LeadStatus, 'clay' | 'amber' | 'sky' | 'green'> = {
  new: 'clay',
  in_progress: 'amber',
  contacted: 'sky',
  done: 'green',
};

export const LEAD_STATUSES: LeadStatus[] = ['new', 'in_progress', 'contacted', 'done'];

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <Badge tone={TONE[status]}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {LEAD_STATUS_LABELS[status]}
    </Badge>
  );
}
