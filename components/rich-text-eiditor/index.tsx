'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar'
import TextAlign from "@tiptap/extension-text-align";
import { Image } from '@tiptap/extension-image'

export default function RichTextEiditor(
    { setContent, setImageContent }: {
        setContent: (content: string) => void;
        // setImageContent: (imageContent: string | string[]) => void;
        setImageContent: (imageContent: string | string[]) => void;
    }) {
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
        }),
        Image.configure({
            inline: true, // Set image as inline (optional, depending on your need)
        }),
        ],
        content: 'Write your content here...',
        editorProps: {
            attributes: {
                class: 'max-w-[80vw] mx-auto text-black border rounded-md bg-slate-50 py-2 px-3 ',
            }
        },
        onUpdate: ({ editor }) => {
            // setContent(editor.getHTML());
            // Save the text content
            const html = editor.getHTML();
            setContent(html); // saves full HTML content

            const imageUrls = extractImageUrls(html); // extract multiple image srcs
            setImageContent(imageUrls); // save as array
        }
    })

    // Helper function to extract image URLs
    const extractImageUrls = (content: string): string[] => {
        const regex = /<img[^>]+src="([^">]+)"/g;
        const images: string[] = [];
        let match;
        while ((match = regex.exec(content)) !== null) {
            images.push(match[1]);
        }
        return images;
    };

    // console.log('Drawer:--->', editor?.getHTML())

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor}
                className="max-w-[80vw] mx-auto bg-gray-800 text-white h-[200px] resize-y overflow-auto rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />
        </div>
    )
}