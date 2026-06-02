declare module 'lucide-react' {
  import { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';

  type LucideProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  };

  type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;

  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const Lock: LucideIcon;
  export const Mail: LucideIcon;
  export const Search: LucideIcon;
  export const Plus: LucideIcon;
  export const Minus: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Check: LucideIcon;
  export const X: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const Clock: LucideIcon;
  export const Users: LucideIcon;
  export const DollarSign: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const PieChart: LucideIcon;
  export const Building2: LucideIcon;
  export const Settings: LucideIcon;
  export const MoreVertical: LucideIcon;
  export const Pencil: LucideIcon;
  export const UsersRound: LucideIcon;
  export const BriefcaseBusiness: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const FileCheck2: LucideIcon;
  export const Scale: LucideIcon;
  export const Upload: LucideIcon;
  export const LucideIcon: LucideIcon;

  const _default: { LucideIcon: LucideIcon };
  export default _default;
}
