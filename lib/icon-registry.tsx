/**
 * Typed icon registry for safe dynamic icon rendering.
 * Maps string names from the database to Lucide React icon components.
 * Unknown names fall back to a default icon.
 *
 * NOTE: React 19 forbids creating components during render via dynamic lookups.
 * We export a DynamicIcon component that renders the icon directly.
 */
import {
  BookOpen,
  Brain,
  Code2,
  Trophy,
  Layers,
  Rocket,
  Sparkles,
  GraduationCap,
  Lightbulb,
  Target,
  Flame,
  Zap,
  BarChart3,
  Settings,
  User,
  LayoutDashboard,
  BookMarked,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

const iconRegistry: Record<string, LucideIcon> = {
  BookOpen,
  Brain,
  Code2,
  Trophy,
  Layers,
  Rocket,
  Sparkles,
  GraduationCap,
  Lightbulb,
  Target,
  Flame,
  Zap,
  BarChart3,
  Settings,
  User,
  LayoutDashboard,
  BookMarked,
};

/** Default fallback icon when the name is not found in the registry */
const FallbackIcon: LucideIcon = Layers;

/**
 * Get a Lucide icon component by its string name.
 * Returns a fallback icon if the name is not registered.
 */
export function getIcon(name: string): LucideIcon {
  return iconRegistry[name] ?? FallbackIcon;
}

/**
 * Check if an icon name exists in the registry.
 */
export function isValidIconName(name: string): boolean {
  return name in iconRegistry;
}

/**
 * Render a dynamic icon by name — avoids React 19's "cannot create
 * components during render" restriction by rendering the icon directly
 * instead of returning a component reference.
 */
export function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = iconRegistry[name] ?? FallbackIcon;
  return <Icon {...props} />;
}
