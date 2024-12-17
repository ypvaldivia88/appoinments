type ClassArray = Array<string | boolean | null | undefined>;

export default function cn(...classes: ClassArray): string {
  return classes.filter(Boolean).join(" ");
}
