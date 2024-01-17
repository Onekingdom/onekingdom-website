import styled from "@emotion/styled";

const EditorStyled = styled.div`
  /* Basic editor styles */

  div[contenteditable="true"] {
    @apply border-none bg-gray-900 outline-none text-white;
  }

  code {
    @apply bg-gray-100 rounded px-2 py-1;
  }

  /* Color swatches */
  .color {
    @apply whitespace-nowrap;

    &::before {
      @apply inline-block w-4 h-4 border border-gray-300 rounded mr-1 mb-1;
      background-color: var(--color);
    }
  }

  /* Placeholder (at the top) */
  .ProseMirror p.is-editor-empty:first-of-type::before {
    @apply float-left text-gray-400 pointer-events-none h-0;
    content: attr(data-placeholder);
  }

  .draggable-item {
    @apply flex p-2 m-2 rounded cursor-grab transition duration-300;

    &:hover {
      @apply bg-white shadow-md;
    }

    .drag-handle {
      @apply flex-none relative top-1 mr-2 cursor-grab bg-center bg-no-repeat;
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16"><path fill-opacity="0.2" d="M4 14c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM2 6C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>');
      background-size: contain;
    }

    .content {
      @apply flex-auto;
    }
  }

  .ProseMirror {
    > * + * {
      @apply mt-4;
    }

    img {
      @apply max-w-full h-auto mx-auto;

      &.ProseMirror-selectednode {
        @apply outline-2 outline-green-500;
      }
    }

    blockquote {
      @apply pl-4 border-l-2 border-green-500;
    }
    ul,
    ol {
      @apply pl-6;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      @apply leading-tight;
    }

    code {
      @apply bg-gray-100 text-gray-600;
    }

    pre {
      @apply bg-gray-900 text-white font-mono py-3 px-4 rounded;

      code {
        @apply color-inherit p-0 bg-none text-sm;
      }
    }

    img {
      @apply max-w-full h-auto;
    }

    hr {
      @apply border-t border-gray-900 mx-auto w-1/2 my-4;
    }
  }
`;

export default EditorStyled;
