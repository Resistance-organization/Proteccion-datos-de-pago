import {
  Apple, BarChart3, Bot, Briefcase, Camera, CircleCheck, Clock, CircleX, ClipboardList, Compass,
  Contact, CreditCard, Eye, FileText, Fish, FolderOpen, Gamepad2, Gift, Globe, GraduationCap, Handshake, Key, Landmark,
  Laptop, LifeBuoy, Link, Lock, LockOpen, Mail, Megaphone, MessageCircle, Monitor, Package,
  PartyPopper, Phone, Receipt, RefreshCw, Scale, Search, ShieldAlert, ShieldCheck, ShoppingCart,
  Smartphone, SmartphoneNfc, ThumbsUp, TrendingUp, TriangleAlert, Truck, Tv, Users, VenetianMask,
  Wifi,
} from 'lucide-react'

// Íconos que el contenido (src/data/modules.js) puede pedir por nombre.
// Para agregar uno: impórtalo de lucide-react y súmalo aquí.
const ICONS = {
  'apple': Apple,
  'bank': Landmark,
  'bot': Bot,
  'briefcase': Briefcase,
  'camera': Camera,
  'chart': BarChart3,
  'check': CircleCheck,
  'clipboard': ClipboardList,
  'clock': Clock,
  'compass': Compass,
  'contact': Contact,
  'credit-card': CreditCard,
  'eye': Eye,
  'file': FileText,
  'fish': Fish,
  'folder': FolderOpen,
  'gamepad': Gamepad2,
  'gift': Gift,
  'globe': Globe,
  'graduation': GraduationCap,
  'handshake': Handshake,
  'key': Key,
  'laptop': Laptop,
  'life-buoy': LifeBuoy,
  'link': Link,
  'lock': Lock,
  'lock-open': LockOpen,
  'mail': Mail,
  'mask': VenetianMask,
  'megaphone': Megaphone,
  'message': MessageCircle,
  'monitor': Monitor,
  'package': Package,
  'party': PartyPopper,
  'phone': Phone,
  'police': ShieldAlert,
  'receipt': Receipt,
  'refresh': RefreshCw,
  'scale': Scale,
  'search': Search,
  'shield': ShieldCheck,
  'shopping-cart': ShoppingCart,
  'smartphone': Smartphone,
  'sms-code': SmartphoneNfc,
  'thumbs-up': ThumbsUp,
  'trending-up': TrendingUp,
  'truck': Truck,
  'tv': Tv,
  'users': Users,
  'warning': TriangleAlert,
  'wifi': Wifi,
  'x': CircleX,
}

// Renderiza un ícono del contenido por nombre. Un número ('1', '2'…) se muestra
// como insignia numerada; un nombre desconocido se muestra tal cual, para que
// un emoji antiguo no desaparezca en silencio.
export default function Icon({ name, size = 16, className = '' }) {
  if (!name) return null
  if (/^\d+$/.test(name)) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full border-[1.5px] border-current font-title font-bold leading-none ${className}`}
        style={{ width: size + 4, height: size + 4, fontSize: size * 0.7 }}
      >
        {name}
      </span>
    )
  }
  const Component = ICONS[name]
  if (!Component) return <span className={className}>{name}</span>
  return <Component size={size} className={className} aria-hidden="true" />
}
