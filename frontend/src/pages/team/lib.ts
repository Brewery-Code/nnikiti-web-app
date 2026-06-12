import { profilePlaceholder } from "@/shared/icons";

export function avatar(url?: string | null) {
  return url ?? profilePlaceholder;
}
