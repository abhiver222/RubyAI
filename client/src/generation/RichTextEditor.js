import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { forwardRef } from 'react';

export const RichTextEditor = forwardRef((props, ref) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      // whenever the editor updates, tell React to catch up with the DOM
      props.onEditorUpdate(editor.getHTML());
    }
  });

  React.useImperativeHandle(ref, () => ({
    setContent: (content) => {
      if (editor) {
        editor.commands.setContent(content);
      }
    },
  }), [editor]);

  return <EditorContent editor={editor} />
});

