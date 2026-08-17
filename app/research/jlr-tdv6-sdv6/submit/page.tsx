'use client';

import { FormEvent, useState } from 'react';
import { ArrowLeft, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { jlrSupabase } from '@/lib/jlr-research-supabase';

const evidenceOptions = ['Invoice / repair estimate','Diagnostic report','Warranty decision','JLR correspondence','Engine photographs','Service history','Video / audio','Other records'];

export default function JlrSubmitPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true); setError('');
    const fd = new FormData(e.currentTarget);
    const evidence_available = evidenceOptions.filter(x => fd.getAll('evidence_available').includes(x));
    const payload = {
      contributor_type: fd.get('contributor_type'), contributor_name: fd.get('contributor_name'), organisation: fd.get('organisation') || null,
      email: fd.get('email'), phone: fd.get('phone') || null, postcode: fd.get('postcode') || null,
      consent_to_contact: fd.get('consent_to_contact') === 'on', consent_research_use: fd.get('consent_research_use') === 'on',
      vehicle_model: fd.get('vehicle_model') || null, vehicle_year: fd.get('vehicle_year') ? Number(fd.get('vehicle_year')) : null,
      registration: fd.get('registration') || null, vin_last6: fd.get('vin_last6') || null, engine_variant: fd.get('engine_variant') || null,
      engine_code: fd.get('engine_code') || null, mileage: fd.get('mileage') ? Number(fd.get('mileage')) : null,
      failure_date: fd.get('failure_date') || null, failure_description: fd.get('failure_description'), symptoms: fd.get('symptoms') || null,
      diagnosis: fd.get('diagnosis') || null, diagnostic_source: fd.get('diagnostic_source') || null, repair_outcome: fd.get('repair_outcome') || null,
      repair_cost_gbp: fd.get('repair_cost_gbp') ? Number(fd.get('repair_cost_gbp')) : null,
      warranty_provider: fd.get('warranty_provider') || null, warranty_outcome: fd.get('warranty_outcome') || null,
      replacement_engine: fd.get('replacement_engine') === 'yes' ? true : fd.get('replacement_engine') === 'no' ? false : null,
      replacement_engine_type: fd.get('replacement_engine_type') || null,
      prior_engine_failures: fd.get('prior_engine_failures') ? Number(fd.get('prior_engine_failures')) : 0,
      evidence_available, document_links: fd.get('document_links') || null, additional_notes: fd.get('additional_notes') || null,
    };
    const { error } = await jlrSupabase.from('jlr_evidence_submissions').insert(payload);
    setSubmitting(false);
    if (error) { setError('We could not save your submission. Please check the required fields and try again.'); return; }
    setDone(true);
  }

  if (done) return <main className="min-h-screen bg-[#eef3f7] px-5 py-16 text-[#0b1e36]"><div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm"><CheckCircle2 className="h-12 w-12 text-emerald-600"/><h1 className="mt-5 text-3xl font-black">Evidence received</h1><p className="mt-4 leading-7 text-slate-600">Thank you. Your submission is now in the private Stage 2 evidence register. It will not be counted publicly until it has been reviewed for relevance, duplication and evidential quality.</p><a href="/research/jlr-tdv6-sdv6" className="mt-7 inline-block font-black text-[#a95835]">Return to research page</a></div></main>;

  const input = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#c56f47]';
  const label = 'text-sm font-black text-[#0b2746]';

  return <main className="min-h-screen bg-[#eef3f7] text-[#0b1e36]">
    <header className="bg-[#06192f] text-white"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5"><a href="/research/jlr-tdv6-sdv6" className="inline-flex items-center gap-2 text-sm font-bold text-slate-200"><ArrowLeft className="h-4 w-4"/> Research home</a><span className="text-xs font-black tracking-widest text-[#f0a06f] uppercase">Stage 2 evidence intake</span></div></header>
    <section className="mx-auto max-w-5xl px-5 py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <p className="text-xs font-black tracking-[.18em] text-[#c56f47] uppercase">Contribute evidence</p><h1 className="mt-3 text-4xl font-black tracking-tight">Help establish the true UK scale</h1><p className="mt-4 leading-7 text-slate-600">Submit one vehicle/failure record at a time. We use structured data so cases can be checked, deduplicated and graded before being included in Stage 2 findings.</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            <label className={label}>You are<select name="contributor_type" required className={input}><option value="owner">Vehicle owner</option><option value="garage">Garage / specialist</option><option value="engine_rebuilder">Engine rebuilder</option><option value="engineer">Engineer</option><option value="warranty">Warranty professional</option><option value="industry">Industry source</option><option value="other">Other</option></select></label>
            <label className={label}>Name<input name="contributor_name" required className={input}/></label>
            <label className={label}>Organisation<input name="organisation" className={input}/></label>
            <label className={label}>Email<input name="email" type="email" required className={input}/></label>
            <label className={label}>Phone<input name="phone" className={input}/></label><label className={label}>Postcode<input name="postcode" className={input}/></label>
          </div>
          <h2 className="mt-10 text-2xl font-black">Vehicle and engine</h2><div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className={label}>Vehicle model<input name="vehicle_model" placeholder="e.g. Range Rover Sport" className={input}/></label><label className={label}>Year<input name="vehicle_year" type="number" min="2004" max="2030" className={input}/></label>
            <label className={label}>Registration<input name="registration" className={input}/></label><label className={label}>Last 6 VIN characters<input name="vin_last6" maxLength={6} className={input}/></label>
            <label className={label}>Engine variant<input name="engine_variant" placeholder="3.0 TDV6 / SDV6" className={input}/></label><label className={label}>Engine code, if known<input name="engine_code" className={input}/></label>
            <label className={label}>Mileage at failure<input name="mileage" type="number" min="0" className={input}/></label><label className={label}>Failure date<input name="failure_date" type="date" className={input}/></label>
          </div>
          <h2 className="mt-10 text-2xl font-black">What happened?</h2><div className="mt-5 grid gap-5">
            <label className={label}>Describe the failure<textarea name="failure_description" required minLength={20} rows={5} className={input}/></label><label className={label}>Symptoms before or during failure<textarea name="symptoms" rows={3} className={input}/></label><label className={label}>Diagnosis<textarea name="diagnosis" rows={3} className={input}/></label><label className={label}>Who diagnosed it?<input name="diagnostic_source" placeholder="JLR retailer, independent specialist, rebuilder..." className={input}/></label>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2"><label className={label}>Repair / outcome<input name="repair_outcome" className={input}/></label><label className={label}>Repair cost £<input name="repair_cost_gbp" type="number" min="0" step="0.01" className={input}/></label><label className={label}>Warranty provider<input name="warranty_provider" className={input}/></label><label className={label}>Warranty outcome<input name="warranty_outcome" className={input}/></label><label className={label}>Was this engine already a replacement?<select name="replacement_engine" className={input}><option value="unknown">Unknown</option><option value="yes">Yes</option><option value="no">No</option></select></label><label className={label}>Replacement type, if known<input name="replacement_engine_type" placeholder="remanufactured / new / used" className={input}/></label><label className={label}>Previous engine failures on this vehicle<input name="prior_engine_failures" type="number" min="0" max="20" defaultValue="0" className={input}/></label></div>
          <h2 className="mt-10 text-2xl font-black">Evidence available</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{evidenceOptions.map(x=><label key={x} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-semibold"><input type="checkbox" name="evidence_available" value={x}/>{x}</label>)}</div>
          <label className={`${label} mt-5 block`}>Links to documents or photos<textarea name="document_links" rows={3} className={input}/></label><label className={`${label} mt-5 block`}>Anything else we should know?<textarea name="additional_notes" rows={4} className={input}/></label>
          <div className="mt-8 space-y-3 rounded-2xl bg-[#f6f8fb] p-5 text-sm leading-6 text-slate-700"><label className="flex gap-3"><input name="consent_research_use" type="checkbox" required className="mt-1"/><span>I consent to Sitora Research storing and using this submission for the JLR TDV6/SDV6 public-interest research project. Personal contact details will not be published without permission.</span></label><label className="flex gap-3"><input name="consent_to_contact" type="checkbox" className="mt-1"/><span>You may contact me to verify or request supporting evidence.</span></label></div>
          {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>}<button disabled={submitting} className="mt-7 rounded-xl bg-[#c56f47] px-6 py-3.5 font-black text-white disabled:opacity-50">{submitting ? 'Submitting…' : 'Submit evidence securely'}</button>
        </form>
        <aside className="space-y-4"><div className="rounded-2xl bg-[#06192f] p-6 text-white"><ShieldCheck className="h-6 w-6 text-[#f0a06f]"/><h2 className="mt-4 text-lg font-black">Private by default</h2><p className="mt-2 text-sm leading-6 text-slate-300">The public form can add records but cannot read the evidence database. Case-level information is reviewed before any aggregate figure is published.</p></div><div className="rounded-2xl border border-slate-200 bg-white p-6"><FileText className="h-6 w-6 text-[#c56f47]"/><h2 className="mt-4 font-black">Evidence grading</h2><p className="mt-2 text-sm leading-6 text-slate-600">Documents and verifiable professional records carry more weight than unverified online claims. Duplicate submissions are excluded from counts.</p></div></aside>
      </div>
    </section>
  </main>;
}
