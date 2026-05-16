"use client";

import { Download, ShieldCheck, CheckCircle2 } from "lucide-react";

const invoiceItems = [
  {
    description: "Premium Brand Identity System",
    details:
      "Brand direction, messaging, digital BrandBook guidance and agreed designed assets for Worsthorne Dental Clinic.",
    qty: 1,
    price: 5500,
  },
];

const subtotal = invoiceItems.reduce((sum, item) => sum + item.qty * item.price, 0);
const vat = 0;
const total = subtotal + vat;
const deposit = total / 2;
const balance = total / 2;

function money(amount: number) {
  return `£${amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function DownloadInvoiceButton() {
  return (
    <a
      href="/api/invoices/worsthorne-dental-brand-identity/pdf"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d8b66d] px-6 py-3 text-sm font-semibold text-[#101827] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e4c477] print:hidden"
    >
      <Download className="h-4 w-4" />
      Download Invoice PDF
    </a>
  );
}

export default function WorsthorneDentalInvoicePage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] px-5 py-10 text-[#101827] sm:px-8 lg:px-10 print:bg-white print:px-0 print:py-0">
      <style>{`
        @media print {
          body {
            background: white !important;
          }

          button,
          .print-hidden {
            display: none !important;
          }

          main {
            padding: 0 !important;
          }

          .invoice-sheet {
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div className="mx-auto mb-6 flex max-w-5xl justify-end print-hidden">
        <DownloadInvoiceButton />
      </div>

      <section className="invoice-sheet mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_90px_rgba(15,23,42,0.12)]">
        <div className="bg-[#101827] p-8 text-white sm:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d8b66d]">
                Pro Forma Invoice
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Worsthorne Dental Clinic
              </h1>
              <p className="mt-4 max-w-2xl leading-8 text-white/70">
                Premium brand identity investment for a calm, professional and
                clinically credible dental brand system.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-sm">
              <p className="font-semibold text-[#d8b66d]">Invoice No.</p>
              <p className="mt-1 text-lg font-semibold">SIT-WDC-001</p>

              <p className="mt-4 font-semibold text-[#d8b66d]">Invoice Date</p>
              <p className="mt-1">To be confirmed</p>

              <p className="mt-4 font-semibold text-[#d8b66d]">Due Date</p>
              <p className="mt-1">On receipt / before project start</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 border-b border-slate-200 p-8 sm:p-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              From
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Sitora</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Brand identity, website design and digital presence services.
            </p>
            <p className="mt-3 text-slate-600">
              Email: [your email]
              <br />
              Website: [your website]
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Bill To
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Worsthorne Dental Clinic
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              [Client address]
              <br />
              [Client email]
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-[#101827] text-white">
                <tr>
                  <th className="p-4 font-semibold">Description</th>
                  <th className="p-4 text-center font-semibold">Qty</th>
                  <th className="p-4 text-right font-semibold">Price</th>
                  <th className="p-4 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item) => (
                  <tr key={item.description} className="border-b border-slate-200">
                    <td className="p-4 align-top">
                      <p className="font-semibold text-[#101827]">
                        {item.description}
                      </p>
                      <p className="mt-2 max-w-2xl leading-6 text-slate-600">
                        {item.details}
                      </p>
                    </td>
                    <td className="p-4 text-center align-top">{item.qty}</td>
                    <td className="p-4 text-right align-top">
                      {money(item.price)}
                    </td>
                    <td className="p-4 text-right align-top font-semibold">
                      {money(item.qty * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_0.8fr]">
            <div className="rounded-2xl bg-[#f8f5ef] p-6">
              <div className="flex gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#256d85]" />
                <div>
                  <h3 className="font-semibold">Payment Terms</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    A 50% deposit is required to confirm the project and begin
                    work. The remaining 50% balance is due before final files are
                    released or before final handover.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  "Deposit required before project start",
                  "Final files released after balance is paid",
                  "Website work is not included in this invoice unless agreed separately",
                  "Printing, signage manufacturing and third-party costs are not included",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#256d85]" />
                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <div className="flex justify-between border-b border-slate-200 py-3">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold">{money(subtotal)}</span>
              </div>

              <div className="flex justify-between border-b border-slate-200 py-3">
                <span className="text-slate-600">VAT</span>
                <span className="font-semibold">{money(vat)}</span>
              </div>

              <div className="flex justify-between border-b border-slate-200 py-3">
                <span className="text-slate-600">Total</span>
                <span className="font-semibold">{money(total)}</span>
              </div>

              <div className="mt-5 rounded-2xl bg-[#101827] p-5 text-white">
                <div className="flex justify-between">
                  <span className="text-white/70">Deposit Due Now</span>
                  <span className="text-2xl font-semibold text-[#d8b66d]">
                    {money(deposit)}
                  </span>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-white/60">Balance Later</span>
                  <span className="font-semibold">{money(balance)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold">Bank / Payment Details</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <p>
                Account Name: [Sitora / Business Name]
                <br />
                Sort Code: [Insert]
                <br />
                Account Number: [Insert]
              </p>
              <p>
                Payment Reference: SIT-WDC-001
                <br />
                Payment Link: [Insert payment link]
                <br />
                Notes: Please use the invoice number as reference.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-[#f8f5ef] p-6">
            <p className="text-sm leading-7 text-slate-600">
              Note: This invoice is based on the agreed brand identity proposal
              for Worsthorne Dental Clinic. This document does not include a full
              website build unless confirmed separately in writing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}