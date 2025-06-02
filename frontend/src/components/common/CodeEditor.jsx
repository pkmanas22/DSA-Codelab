import Editor from '@monaco-editor/react';

const CodeEditor = ({ language }) => {
  return (
    <Editor
      height="300px"
      language={language.toLowerCase()}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        roundedSelection: true,
        wordWrap: 'on', // wraps long lines
        wrappingIndent: 'indent', // indents wrapped lines
        cursorSmoothCaretAnimation: 'on', // smoother cursor
        cursorBlinking: 'phase', // better cursor visibility
        tabSize: 2,
        insertSpaces: true,
        formatOnType: true,
        formatOnPaste: true,
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        renderWhitespace: 'boundary',
        renderLineHighlight: 'all',
        smoothScrolling: true,
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        contextmenu: true,
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
      }}
    />
  );
};

export default CodeEditor;
