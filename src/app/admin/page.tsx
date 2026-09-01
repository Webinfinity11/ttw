'use client';

import Link from 'next/link';
import { ArrowUpRight, Images, Inbox, Layers, Star } from 'lucide-react';
import { useAdminData } from '@/components/admin/data-provider';
import { LeadStatusBadge } from '@/components/admin/lead-status';
import { AdminPageHeader, Badge, Card, StatCard, Thumb } from '@/components/admin/ui';
import { formatDateTime } from '@/lib/cn';
import { LEAD_STATUS_LABELS, type LeadStatus } from '@/lib/types';

export default function AdminDashboardPage() {
  const { projects, services, leads, reviews, prices, faq } = useAdminData();

  const newLeads = leads.filter((lead) => lead.status === 'new');
  const publishedProjects = projects.filter((project) => project.published);
  const publishedServices = services.filter((service) => service.published);
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : '—';

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const recentProjects = [...projects].sort((a, b) => a.order - b.order).slice(0, 4);

  const statusCounts = (['new', 'in_progress', 'contacted', 'done'] as LeadStatus[]).map(
    (status) => ({
      status,
      count: leads.filter((lead) => lead.status === status).length,
    }),
  );

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Сводка по сайту: контент, заявки и отзывы."
        action={
          <Link href="/admin/leads" className="btn-dark px-5 py-2.5">
            Заявки
            {newLeads.length > 0 && (
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px]">
                {newLeads.length}
              </span>
            )}
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Всего проектов"
          value={projects.length}
          hint={`${publishedProjects.length} опубликовано`}
          icon={Images}
        />
        <StatCard
          label="Всего услуг"
          value={services.length}
          hint={`${publishedServices.length} опубликовано`}
          icon={Layers}
        />
        <StatCard
          label="Новые заявки"
          value={newLeads.length}
          hint={`${leads.length} всего за период`}
          icon={Inbox}
          tone="dark"
        />
        <StatCard
          label="Отзывы"
          value={reviews.length}
          hint={`средняя оценка ${averageRating}`}
          icon={Star}
          tone="accent"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <div className="flex items-center justify-between border-b border-graphite-100 px-6 py-5">
            <div>
              <h2 className="text-base font-semibold tracking-tight">Последние заявки</h2>
              <p className="mt-0.5 text-xs text-graphite-300">
                Свежие обращения с форм сайта
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1.5 text-sm text-accent-600 transition hover:text-accent-500"
            >
              Все заявки <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-graphite-100">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex flex-wrap items-center gap-3 px-6 py-4 transition-colors hover:bg-graphite-50/60"
              >
                <div className="min-w-[160px] flex-1">
                  <p className="text-sm font-medium text-graphite-900">{lead.name}</p>
                  <p className="mt-0.5 text-xs text-graphite-300">{lead.phone}</p>
                </div>
                <p className="hidden min-w-[200px] flex-1 text-sm text-graphite-500 md:block">
                  {lead.service}
                </p>
                <p className="text-xs text-graphite-300">{formatDateTime(lead.date)}</p>
                <LeadStatusBadge status={lead.status} />
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="border-b border-graphite-100 px-6 py-5">
              <h2 className="text-base font-semibold tracking-tight">Статусы заявок</h2>
            </div>
            <div className="divide-y divide-graphite-100">
              {statusCounts.map((item) => (
                <div key={item.status} className="flex items-center justify-between px-6 py-3.5">
                  <span className="text-sm text-graphite-500">
                    {LEAD_STATUS_LABELS[item.status]}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-graphite-900">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between border-b border-graphite-100 px-6 py-5">
              <h2 className="text-base font-semibold tracking-tight">Последние проекты</h2>
              <Link
                href="/admin/projects"
                className="text-sm text-accent-600 transition hover:text-accent-500"
              >
                Все
              </Link>
            </div>
            <div className="divide-y divide-graphite-100">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center gap-3.5 px-6 py-4">
                  <Thumb src={project.image} alt={project.title} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-graphite-900">
                      {project.title}
                    </p>
                    <p className="mt-0.5 text-xs text-graphite-300">
                      {project.category} · {project.area} м²
                    </p>
                  </div>
                  {project.published ? (
                    <Badge tone="green">Опубликован</Badge>
                  ) : (
                    <Badge>Скрыт</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Позиций в прайсе', value: prices.length, href: '/admin/prices' },
          { label: 'Вопросов в FAQ', value: faq.length, href: '/admin/faq' },
          {
            label: 'Опубликованных отзывов',
            value: reviews.filter((review) => review.published).length,
            href: '/admin/reviews',
          },
          {
            label: 'Скрытого контента',
            value:
              services.filter((s) => !s.published).length +
              projects.filter((p) => !p.published).length +
              reviews.filter((r) => !r.published).length,
            href: '/admin/services',
          },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex items-center justify-between rounded-2xl border border-graphite-100 bg-white px-6 py-5 transition hover:border-graphite-300"
          >
            <div>
              <p className="text-2xl font-light tracking-tight">{item.value}</p>
              <p className="mt-1 text-xs text-graphite-300">{item.label}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-graphite-300 transition group-hover:text-graphite-900" />
          </Link>
        ))}
      </div>
    </div>
  );
}
