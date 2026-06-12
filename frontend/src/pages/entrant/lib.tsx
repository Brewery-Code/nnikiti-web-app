export const isTouchDevice =
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

/** Renders a translated step body, linking occurrences of linkText to linkHref. */
export function linkedStepText(text: string, linkText: string, linkHref: string): React.ReactNode {
  return (
    <>
      {text.split(linkText).map((part, i, arr) =>
        i < arr.length - 1 ? (
          <span key={i}>
            {part}
            <ExternalLink href={linkHref}>{linkText}</ExternalLink>
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
