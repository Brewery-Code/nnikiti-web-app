// src/Tiptap.tsx
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";

export function Tiptap() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class: "bg-white text-black p-4",
      },
    }, // initial content
  });

  // Memoize the provider value to avoid unnecessary re-renders

  return <EditorContent editor={editor} />;
}
