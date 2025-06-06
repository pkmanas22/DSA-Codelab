import { CopyCheck, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success('Copied to clipboard');

      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <>
      {isCopied ? (
        <CheckCircle2 className="w-4 cursor-pointer text-primary" />
      ) : (
        <Copy onClick={() => copyToClipBoard(text)} className="w-4 cursor-pointer text-primary" />
      )}
    </>
  );
};

export default CopyButton;
