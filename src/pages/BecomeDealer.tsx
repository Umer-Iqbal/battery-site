import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, BarChart3, Users, Send } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  companyName: z.string().min(2, 'Company name is required'),
  city: z.string().min(2, 'City is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Invalid email address'),
  businessVolume: z.string().min(1, 'Please select your business volume'),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BecomeDealer() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    console.log('Dealer Application:', data);
    await new Promise(r => setTimeout(r, 2000));
    alert('Application submitted successfully! Our team will contact you soon.');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen bg-background"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8 leading-tight text-foreground">
              Join the <span className="text-primary">Energy Revolution</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Enersol is expanding its network across Pakistan. Partner with
              the region&apos;s most innovative LiFePO4 battery brand.
            </p>

            <div className="space-y-8">
              <BenefitItem icon={<ShieldCheck className="text-primary" />} title="Premium Quality" desc="Access to Grade-A LiFePO4 cells and custom BMS technology." />
              <BenefitItem icon={<BarChart3 className="text-accent" />} title="Profit Margins" desc="Industry-leading margins and exclusive dealer protected territories." />
              <BenefitItem icon={<Truck className="text-energy-grid" />} title="Fast Logistics" desc="Consistent stock availability and nationwide shipping support." />
              <BenefitItem icon={<Users className="text-primary" />} title="Technical Training" desc="Comprehensive training for your sales and installation teams." />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface-elevated p-10 md:p-14 relative">
            <h2 className="text-2xl font-semibold mb-8 text-foreground">Dealer Application</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Name" error={errors.fullName?.message}>
                  <input {...register('fullName')} className="form-input" placeholder="e.g. Ali Ahmed" />
                </InputGroup>
                <InputGroup label="Company Name" error={errors.companyName?.message}>
                  <input {...register('companyName')} className="form-input" placeholder="e.g. Solar Tech Ltd" />
                </InputGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="City" error={errors.city?.message}>
                  <input {...register('city')} className="form-input" placeholder="e.g. Lahore" />
                </InputGroup>
                <InputGroup label="Phone Number" error={errors.phone?.message}>
                  <input {...register('phone')} className="form-input" placeholder="e.g. 03001234567" />
                </InputGroup>
              </div>

              <InputGroup label="Email Address" error={errors.email?.message}>
                <input {...register('email')} type="email" className="form-input" placeholder="ali@company.pk" />
              </InputGroup>

              <InputGroup label="Anticipated Monthly Sales" error={errors.businessVolume?.message}>
                <select {...register('businessVolume')} className="form-input">
                  <option value="">Select Volume</option>
                  <option value="1-5">1-5 Units</option>
                  <option value="5-20">5-20 Units</option>
                  <option value="20-50">20-50 Units</option>
                  <option value="50+">50+ Units</option>
                </select>
              </InputGroup>

              <InputGroup label="Additional Information (Optional)">
                <textarea {...register('notes')} className="form-input min-h-[120px]" placeholder="Tell us about your current business..." />
              </InputGroup>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BenefitItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0 border border-border">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2 text-foreground">{title}</h4>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{label}</label>
      {children}
      {error && <span className="text-xs text-destructive font-medium">{error}</span>}
    </div>
  );
}
