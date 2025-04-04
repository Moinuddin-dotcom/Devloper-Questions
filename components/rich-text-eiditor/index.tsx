'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar'
import TextAlign from "@tiptap/extension-text-align";

export default function RichTextEiditor({ setContent }: { setContent: (content: string) => void }) {
    const editor = useEditor({
        extensions: [StarterKit.configure({
            bulletList: {
                HTMLAttributes: {
                    class: 'list-disc ml-4'
                }
            },
            orderedList: {
                HTMLAttributes: {
                    class: 'list-decimal ml-4'
                }
            }
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        })
        ],
        content: 'Write your content here...',
        editorProps: {
            attributes: {
                class: 'max-w-[80vw] mx-auto text-black border rounded-md bg-slate-50 py-2 px-3 ',
            }
        },
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        }
    })

    // console.log('Drawer:--->', editor?.getHTML())

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}