import React, { useState } from 'react';
import { PAYMENT_UPI_ID, WHATSAPP_NUMBER, WHATSAPP_LINK } from '../constants';
import { X, Lock, CheckCircle, Smartphone, Send, Key } from 'lucide-react';

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (code: string) => boolean; // Returns true if success
}

const AccessModal: React.FC<AccessModalProps> = ({ isOpen, onClose, onUnlock }) => {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const isValid = onUnlock(inputCode);
    if (isValid) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setInputCode('');
      }, 1500);
    } else {
      setError('Invalid Access Code. Please check and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-ayur-base w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border-2 border-ayur-primary relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-ayur-primary hover:text-ayur-accent"
        >
          <X size={24} />
        </button>

        <div className="bg-ayur-secondary p-6 text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-1">Unlock Course Access</h2>
          <p className="text-emerald-100 text-sm">Join the legacy of Ayurveda</p>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Step 1: Payment */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-ayur-primary flex items-center gap-2">
              <span className="bg-ayur-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
              Payment Details
            </h3>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-sm text-gray-700 mb-2">Send your enrollment fee via UPI to:</p>
              <div className="flex items-center justify-between bg-white p-3 rounded border border-orange-200 shadow-sm">
                <span className="font-mono font-bold text-lg text-ayur-text">{PAYMENT_UPI_ID}</span>
                <span className="text-xs text-ayur-accent font-semibold px-2 py-1 bg-orange-100 rounded">UPI</span>
              </div>
            </div>
          </div>

          {/* Step 2: Verification */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-ayur-primary flex items-center gap-2">
              <span className="bg-ayur-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
              Verify & Get Code
            </h3>
            <p className="text-sm text-gray-600">
              Send the payment screenshot to our WhatsApp number to receive your unique Access Code.
            </p>
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
            >
              <Smartphone size={18} />
              WhatsApp: {WHATSAPP_NUMBER}
            </a>
          </div>

          {/* Step 3: Enter Code */}
          <div className="space-y-3 pt-2 border-t border-gray-200">
            <h3 className="font-serif font-bold text-ayur-primary flex items-center gap-2">
              <span className="bg-ayur-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
              Enter Access Code
            </h3>
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter Code here..."
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-ayur-primary focus:ring-0 outline-none transition-colors font-mono uppercase"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={success}
                  className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
                    success ? 'bg-green-600' : 'bg-ayur-primary hover:bg-ayur-accent'
                  }`}
                >
                  {success ? <CheckCircle size={20} /> : 'Unlock'}
                </button>
              </div>
              {error && <p className="text-red-600 text-xs mt-2 absolute -bottom-6 left-0">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessModal;